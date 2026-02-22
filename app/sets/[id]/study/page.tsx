"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Trophy,
  Lock,
  Zap,
} from "lucide-react";

interface Card {
  id: string;
  front: string;
  back: string;
  format: string;
  options: string | null;
  correctAnswer: string | null;
}

interface SetData {
  id: string;
  name: string;
  format: string;
  cards: Card[];
}

const FREE_QUIZ_LIMIT = 10;

export default function StudyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [set, setSet] = useState<SetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<Array<{ correct: boolean; easy: boolean }>>([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime] = useState(Date.now());
  const [sessionSaved, setSessionSaved] = useState(false);

  const plan = session?.user?.plan ?? "free";
  const isFree = plan === "free";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch(`/api/sets/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSet(data);
        setLoading(false);
      });
  }, [id, session]);

  const saveSession = useCallback(async (finalResults: typeof results) => {
    if (sessionSaved || !set) return;
    setSessionSaved(true);
    const correct = finalResults.filter((r) => r.correct).length;
    const easy = finalResults.filter((r) => r.easy).length;
    const hard = finalResults.filter((r) => !r.easy).length;
    await fetch("/api/study", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        setId: set.id,
        totalCards: finalResults.length,
        correctCards: correct,
        easyCards: easy,
        hardCards: hard,
        duration: Math.round((Date.now() - startTime) / 1000),
      }),
    });
  }, [sessionSaved, set, startTime]);

  function checkPaywall() {
    if (isFree && currentIndex >= FREE_QUIZ_LIMIT - 1) {
      setShowPaywall(true);
      return true;
    }
    return false;
  }

  function handleQARate(easy: boolean) {
    const newResults = [...results, { correct: easy, easy }];
    setResults(newResults);

    if (isFree && currentIndex + 1 >= FREE_QUIZ_LIMIT) {
      setShowPaywall(true);
      return;
    }

    if (currentIndex + 1 >= (set?.cards.length ?? 0)) {
      setFinished(true);
      saveSession(newResults);
    } else {
      setCurrentIndex((p) => p + 1);
      setFlipped(false);
    }
  }

  function handleMCQSelect(option: string) {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);
  }

  function handleMCQNext() {
    const card = set!.cards[currentIndex];
    const correct = selectedOption === card.correctAnswer;
    const newResults = [...results, { correct, easy: correct }];
    setResults(newResults);

    if (isFree && currentIndex + 1 >= FREE_QUIZ_LIMIT) {
      setShowPaywall(true);
      return;
    }

    if (currentIndex + 1 >= set!.cards.length) {
      setFinished(true);
      saveSession(newResults);
    } else {
      setCurrentIndex((p) => p + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  }

  if (loading || !set) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const card = set.cards[currentIndex];
  const options = card.options ? (JSON.parse(card.options) as string[]) : [];
  const progress = ((currentIndex) / set.cards.length) * 100;
  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  if (finished) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Session Complete!</h2>
            <p className="text-gray-500 mb-8">{set.name}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Cards", value: results.length, color: "text-gray-900" },
                { label: "Correct", value: correctCount, color: "text-green-600" },
                { label: "Accuracy", value: `${accuracy}%`, color: "text-blue-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8">
              {[
                { label: "Easy cards", value: results.filter((r) => r.easy).length, icon: "👍", color: "bg-green-50 text-green-700" },
                { label: "Hard cards", value: results.filter((r) => !r.easy).length, icon: "👎", color: "bg-red-50 text-red-700" },
              ].map((item) => (
                <div key={item.label} className={`flex items-center justify-between p-3 rounded-lg ${item.color}`}>
                  <span className="text-sm font-medium flex items-center gap-2">
                    {item.icon} {item.label}
                  </span>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">Back to Dashboard</Button>
              </Link>
              <Link href={`/sets/${id}/study`} className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Study Again</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Paywall Modal */}
      <Dialog open={showPaywall} onOpenChange={() => {}}>
        <DialogContent className="max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold text-center">
              You&apos;ve reached the free limit
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-2">
            <p className="text-gray-500 text-sm mb-6">
              Free plan users can only quiz on the first {FREE_QUIZ_LIMIT} questions per session.
              Upgrade to Pro or Premium to unlock unlimited quiz mode.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <p className="text-sm font-semibold text-gray-900 mb-3">What you&apos;ll get with Pro:</p>
              {[
                "Unlimited quiz mode — no card limits",
                "MCQ format support",
                "Full analytics dashboard",
                "250 cards generated per month",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/pricing" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                  <Zap className="w-4 h-4" />
                  Upgrade — $9/mo
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/sets/${id}`}>
              <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600">
                <ArrowLeft className="w-4 h-4" />
                Exit
              </Button>
            </Link>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                {set.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isFree && (
              <Badge variant="secondary" className="text-xs">
                {Math.min(currentIndex, FREE_QUIZ_LIMIT)}/{FREE_QUIZ_LIMIT} free
              </Badge>
            )}
            <span className="text-sm text-gray-500">
              {currentIndex + 1} / {set.cards.length}
            </span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-3">
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {card.format === "qa" ? (
            /* Q&A Mode */
            <div className="space-y-6">
              <div
                className={`flip-card h-72 cursor-pointer ${flipped ? "flipped" : ""}`}
                onClick={() => !flipped && setFlipped(true)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-blue-400" />
                      </div>
                      <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                        {card.front}
                      </p>
                      <p className="text-sm text-gray-400 mt-4">Click to reveal answer</p>
                    </div>
                  </div>
                  <div className="flip-card-back bg-blue-50 rounded-2xl border border-blue-200 shadow-sm flex items-center justify-center p-8">
                    <p className="text-xl text-blue-900 font-medium leading-relaxed text-center">
                      {card.back}
                    </p>
                  </div>
                </div>
              </div>

              {flipped && (
                <div className="flex gap-4">
                  <Button
                    onClick={() => handleQARate(false)}
                    variant="outline"
                    className="flex-1 h-14 gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    Hard
                  </Button>
                  <Button
                    onClick={() => handleQARate(true)}
                    className="flex-1 h-14 gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Easy
                  </Button>
                </div>
              )}

              {!flipped && (
                <Button
                  onClick={() => setFlipped(true)}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Reveal Answer
                </Button>
              )}
            </div>
          ) : (
            /* MCQ Mode */
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <p className="text-xl font-semibold text-gray-900 leading-relaxed text-center">
                  {card.front}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {options.map((option, i) => {
                  let className =
                    "w-full text-left p-4 rounded-xl border-2 font-medium text-sm transition-all";
                  if (!answered) {
                    className += " border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white cursor-pointer";
                  } else if (option === card.correctAnswer) {
                    className += " border-green-500 bg-green-50 text-green-900 cursor-default";
                  } else if (option === selectedOption) {
                    className += " border-red-400 bg-red-50 text-red-900 cursor-default";
                  } else {
                    className += " border-gray-200 bg-gray-50 text-gray-400 cursor-default";
                  }

                  return (
                    <button
                      key={i}
                      className={className}
                      onClick={() => handleMCQSelect(option)}
                      disabled={answered}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{option}</span>
                        {answered && option === card.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                        )}
                        {answered && option === selectedOption && option !== card.correctAnswer && (
                          <XCircle className="w-4 h-4 text-red-400 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <Button
                  onClick={handleMCQNext}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next Question →
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
