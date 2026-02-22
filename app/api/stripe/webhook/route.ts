import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia",
});

// Map a Stripe price ID back to a plan name.
// Both the monthly and annual price IDs map to the same plan — only the
// billing interval differs, which Stripe handles on its side.
function planFromPriceId(priceId: string): "pro" | "premium" | "free" {
  if (
    priceId === process.env.STRIPE_PRO_PRICE_ID ||
    priceId === process.env.STRIPE_PRO_ANNUAL_PRICE_ID
  )
    return "pro";
  if (
    priceId === process.env.STRIPE_PREMIUM_PRICE_ID ||
    priceId === process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID
  )
    return "premium";
  return "free";
}

// The webhook needs the raw body for signature verification.
// In the App Router we get it via req.text() — no extra config needed.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ── Checkout completed ────────────────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (!userId || !plan) break;

        if (session.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan,
              stripeCustomerId: session.customer as string,
              stripeSubscriptionId: sub.id,
              stripePriceId: sub.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
            },
          });
        }
        break;
      }

      // ── Subscription created or changed (upgrade / downgrade) ─────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;
        if (!userId) break;

        const priceId = sub.items.data[0].price.id;
        const plan = planFromPriceId(priceId);
        const isActive = ["active", "trialing"].includes(sub.status);

        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: isActive ? plan : "free",
            stripeSubscriptionId: sub.id,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        });
        break;
      }

      // ── Subscription cancelled ────────────────────────────────────────────
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: "free",
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          },
        });
        break;
      }
    }
  } catch (err) {
    console.error(`Error handling Stripe event ${event.type}:`, err);
    // Return 200 so Stripe doesn't retry — log the error for investigation
    return NextResponse.json({ error: "Handler error" }, { status: 200 });
  }

  return NextResponse.json({ received: true });
}
