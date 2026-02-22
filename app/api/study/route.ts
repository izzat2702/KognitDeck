import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { setId, totalCards, correctCards, easyCards, hardCards, duration } =
    await req.json();

  const studySession = await prisma.studySession.create({
    data: {
      userId: session.user.id,
      setId,
      totalCards,
      correctCards,
      easyCards,
      hardCards,
      completed: true,
      duration,
    },
  });

  return NextResponse.json(studySession);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const setId = searchParams.get("setId");

  const sessions = await prisma.studySession.findMany({
    where: {
      userId: session.user.id,
      ...(setId ? { setId } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      set: { select: { name: true } },
    },
  });

  return NextResponse.json(sessions);
}
