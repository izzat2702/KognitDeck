import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateMockFlashcards } from "@/lib/mock-ai";
import { getPlanLimits } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { inputMethod, inputText, format, cardCount, setName, topic } =
    await req.json();

  // Validate plan limits
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      plan: true,
      cardsGeneratedThisMonth: true,
      cardsResetDate: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const limits = getPlanLimits(user.plan);

  // Check monthly reset
  const now = new Date();
  const resetDate = new Date(user.cardsResetDate);
  const needsReset =
    now.getMonth() !== resetDate.getMonth() ||
    now.getFullYear() !== resetDate.getFullYear();

  let currentCount = user.cardsGeneratedThisMonth;
  if (needsReset) {
    currentCount = 0;
    await prisma.user.update({
      where: { id: session.user.id },
      data: { cardsGeneratedThisMonth: 0, cardsResetDate: now },
    });
  }

  // Check card limit
  if (limits.cardsPerMonth !== Infinity && currentCount + cardCount > limits.cardsPerMonth) {
    const remaining = limits.cardsPerMonth - currentCount;
    return NextResponse.json(
      {
        error: `Monthly card limit reached. You have ${remaining} cards remaining this month.`,
        limitReached: true,
        remaining,
      },
      { status: 403 }
    );
  }

  // Check format permission
  if (!limits.formats.includes(format)) {
    return NextResponse.json(
      { error: `Your plan does not support ${format.toUpperCase()} format.` },
      { status: 403 }
    );
  }

  // Check topic generation permission
  if (inputMethod === "topic" && !limits.topicGeneration) {
    return NextResponse.json(
      { error: "Topic-based generation requires a Premium plan." },
      { status: 403 }
    );
  }

  // Generate cards (mock implementation)
  const input = inputMethod === "topic" ? topic : inputText;
  const cards = generateMockFlashcards(cardCount, format, input);

  // Save to database
  const setTitle = setName || (topic ? `Cards: ${topic}` : "New Flashcard Set");
  const flashcardSet = await prisma.flashcardSet.create({
    data: {
      name: setTitle,
      inputMethod,
      format,
      subject: topic ?? undefined,
      userId: session.user.id,
      cards: {
        create: cards.map((card, index) => ({
          front: card.front,
          back: card.back,
          format: card.format,
          options:
            card.format === "mcq"
              ? JSON.stringify((card as { options: string[] }).options)
              : null,
          correctAnswer:
            card.format === "mcq"
              ? (card as { correctAnswer: string }).correctAnswer
              : null,
          order: index,
        })),
      },
    },
    include: { cards: true },
  });

  // Update card count
  await prisma.user.update({
    where: { id: session.user.id },
    data: { cardsGeneratedThisMonth: { increment: cards.length } },
  });

  return NextResponse.json({
    setId: flashcardSet.id,
    cardCount: cards.length,
    set: flashcardSet,
  });
}
