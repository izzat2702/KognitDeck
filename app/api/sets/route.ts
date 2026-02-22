import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sets = await prisma.flashcardSet.findMany({
    where: { userId: session.user.id },
    include: {
      _count: { select: { cards: true } },
      studySessions: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true, completed: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(sets);
}
