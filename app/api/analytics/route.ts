import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPlanLimits } from "@/lib/utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, createdAt: true },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const limits = getPlanLimits(user.plan);
  if (!limits.analytics) {
    return NextResponse.json({ error: "Analytics requires Pro or Premium plan." }, { status: 403 });
  }

  const [studySessions, sets] = await Promise.all([
    prisma.studySession.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
      include: { set: { select: { name: true } } },
    }),
    prisma.flashcardSet.findMany({
      where: { userId: session.user.id },
      include: { _count: { select: { cards: true, studySessions: true } } },
    }),
  ]);

  // Calculate stats
  const totalSessions = studySessions.length;
  const totalCardsStudied = studySessions.reduce((sum, s) => sum + s.totalCards, 0);
  const totalCorrect = studySessions.reduce((sum, s) => sum + s.correctCards, 0);
  const totalEasy = studySessions.reduce((sum, s) => sum + s.easyCards, 0);
  const totalHard = studySessions.reduce((sum, s) => sum + s.hardCards, 0);
  const overallAccuracy = totalCardsStudied > 0
    ? Math.round((totalCorrect / totalCardsStudied) * 100)
    : 0;

  // Accuracy over time (last 14 sessions)
  const accuracyOverTime = studySessions.slice(-14).map((s) => ({
    date: s.createdAt.toISOString().split("T")[0],
    accuracy: s.totalCards > 0 ? Math.round((s.correctCards / s.totalCards) * 100) : 0,
    set: s.set.name,
  }));

  // Cards per day this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthSessions = studySessions.filter((s) => new Date(s.createdAt) >= startOfMonth);
  const cardsPerDay: Record<string, number> = {};
  for (let d = 1; d <= now.getDate(); d++) {
    const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cardsPerDay[dateKey] = 0;
  }
  monthSessions.forEach((s) => {
    const key = new Date(s.createdAt).toISOString().split("T")[0];
    if (key in cardsPerDay) cardsPerDay[key] += s.totalCards;
  });

  // Study streak
  const uniqueDays = Array.from(new Set(studySessions.map((s) =>
    new Date(s.createdAt).toISOString().split("T")[0]
  ))).sort().reverse();
  let streak = 0;
  const today = new Date().toISOString().split("T")[0];
  for (let i = 0; i < uniqueDays.length; i++) {
    const expected = new Date(today);
    expected.setDate(expected.getDate() - i);
    if (uniqueDays[i] === expected.toISOString().split("T")[0]) {
      streak++;
    } else {
      break;
    }
  }

  // Most studied sets
  const topSets = sets
    .sort((a, b) => b._count.studySessions - a._count.studySessions)
    .slice(0, 5)
    .map((s) => ({ name: s.name, sessions: s._count.studySessions, cards: s._count.cards }));

  return NextResponse.json({
    totalSessions,
    totalCardsStudied,
    overallAccuracy,
    totalEasy,
    totalHard,
    streak,
    accuracyOverTime,
    cardsPerDay: Object.entries(cardsPerDay).map(([date, cards]) => ({ date, cards })),
    topSets,
  });
}
