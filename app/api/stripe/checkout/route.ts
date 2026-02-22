import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",
});

// Nested by plan → billing period so the correct Stripe price ID is used
// depending on whether the user selected Monthly or Annual billing.
const PRICE_IDS: Record<string, Record<string, string | undefined>> = {
  pro: {
    monthly: process.env.STRIPE_PRO_PRICE_ID,
    annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID,
  },
  premium: {
    monthly: process.env.STRIPE_PREMIUM_PRICE_ID,
    annual: process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID,
  },
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan, billing = "monthly" } = await req.json();
  const priceId = PRICE_IDS[plan]?.[billing];

  if (!priceId || priceId === "placeholder") {
    return NextResponse.json(
      { error: "This plan is not yet available for purchase." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, stripeCustomerId: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Create or reuse the Stripe customer record for this user
  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: { userId: session.user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?upgraded=true`,
    cancel_url: `${appUrl}/pricing`,
    // Embed userId + plan in both the session and subscription metadata so the
    // webhook can update the DB without doing a customer→user lookup.
    metadata: { userId: session.user.id, plan },
    subscription_data: {
      metadata: { userId: session.user.id, plan },
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
