import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      cardsGeneratedThisMonth: true,
      cardsResetDate: true,
      onboardingCompleted: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function PATCH() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { onboardingCompleted: true },
    select: { id: true, onboardingCompleted: true },
  });

  return NextResponse.json(user);
}
