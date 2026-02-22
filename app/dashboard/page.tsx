"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Plus,
  BookOpen,
  Clock,
  BarChart3,
  Trash2,
  Play,
  Lock,
  Zap,
  FileText,
  Brain,
  Upload,
  CheckCircle,
  X,
} from "lucide-react";
import { getPlanLimits } from "@/lib/utils";

interface FlashcardSet {
  id: string;
  name: string;
  format: string;
  inputMethod: string;
  createdAt: string;
  _count: { cards: number };
  studySessions: Array<{ createdAt: string; completed: boolean }>;
}

interface UserData {
  plan: string;
  cardsGeneratedThisMonth: number;
  onboardingCompleted: boolean;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(
    searchParams.get("upgraded") === "true"
  );

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      const [setsRes, userRes] = await Promise.all([
        fetch("/api/sets"),
        fetch("/api/user"),
      ]);
      if (setsRes.ok) setSets(await setsRes.json());
      if (userRes.ok) {
        const user = await userRes.json();
        setUserData(user);
        if (!user.onboardingCompleted) setShowOnboarding(true);
      }
      setLoading(false);
    }
    fetchData();
  }, [session]);

  async function dismissOnboarding() {
    setShowOnboarding(false);
    await fetch("/api/user", { method: "PATCH" });
  }

  async function deleteSet(id: string) {
    setDeletingId(id);
    await fetch(`/api/sets/${id}`, { method: "DELETE" });
    setSets((prev) => prev.filter((s) => s.id !== id));
    setDeletingId(null);
  }

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const plan = userData?.plan ?? "free";
  const limits = getPlanLimits(plan);
  const used = userData?.cardsGeneratedThisMonth ?? 0;
  const quota = limits.cardsPerMonth === Infinity ? null : limits.cardsPerMonth;
  const quotaPercent = quota ? Math.min((used / quota) * 100, 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Upgrade success banner */}
      {showUpgradeBanner && (
        <div className="bg-green-600 text-white px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">
                🎉 Your plan has been upgraded! Welcome to{" "}
                <span className="font-bold capitalize">{userData?.plan ?? "your new plan"}</span>.
                Enjoy your new features.
              </p>
            </div>
            <button
              onClick={() => setShowUpgradeBanner(false)}
              className="p-1 rounded hover:bg-green-700 transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Onboarding modal */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Welcome to KognitDeck! 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-500 text-center mb-6">
              Let&apos;s show you the 3 ways to create flashcards:
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: <FileText className="w-5 h-5 text-blue-600" />,
                  title: "Paste Your Notes",
                  desc: "Copy-paste any text, including lecture notes, textbook passages, or articles.",
                },
                {
                  icon: <Upload className="w-5 h-5 text-blue-600" />,
                  title: "Upload a PDF",
                  desc: "Upload lecture slides, chapter PDFs, or research papers.",
                },
                {
                  icon: <Brain className="w-5 h-5 text-blue-600" />,
                  title: "Enter a Topic",
                  desc: "Just type a subject (e.g. 'The French Revolution') and AI generates cards from scratch. Premium only.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={dismissOnboarding}
          >
            Get Started
          </Button>
        </DialogContent>
      </Dialog>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {session.user?.name?.split(" ")[0] ?? "there"}
            </h1>
            <p className="text-gray-500 mt-1">
              {sets.length} flashcard {sets.length === 1 ? "set" : "sets"} · {used} cards generated this month
            </p>
          </div>
          <Link href="/generate">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Plus className="w-4 h-4" />
              New Flashcard Set
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Quota */}
          <Card className="col-span-1 sm:col-span-2 border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Monthly Card Quota
                </CardTitle>
                <Badge
                  variant={plan === "free" ? "secondary" : "default"}
                  className={plan !== "free" ? "bg-blue-600 text-white" : ""}
                >
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {quota !== null ? (
                <>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-gray-900">{used}</span>
                    <span className="text-gray-500">/ {quota} cards</span>
                  </div>
                  <Progress value={quotaPercent} className="h-2" />
                  <p className="text-xs text-gray-400 mt-2">
                    {quota - used} cards remaining this month
                  </p>
                </>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{used}</span>
                  <span className="text-gray-500">cards this month · Unlimited</span>
                </div>
              )}
              {plan === "free" && (
                <div className="mt-3 flex items-center gap-2 text-xs text-blue-600">
                  <Zap className="w-3.5 h-3.5" />
                  <Link href="/pricing" className="hover:underline font-medium">
                    Upgrade to Pro for 250 cards/month
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick stats */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-500">
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(plan === "pro" || plan === "premium") ? (
                <Link href="/analytics">
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        View Analytics
                      </p>
                      <p className="text-xs text-gray-500">See your progress</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href="/pricing">
                  <div className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Unlock Analytics</p>
                      <p className="text-xs text-gray-500">Pro & Premium</p>
                    </div>
                  </div>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Flashcard sets */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Flashcard Sets</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-gray-200">
                  <CardContent className="p-6">
                    <Skeleton className="h-5 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-9 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sets.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 border-dashed">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No flashcard sets yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">
                Create your first set by uploading your notes or entering a topic.
              </p>
              <Link href="/generate">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Set
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sets.map((set) => (
                <Card
                  key={set.id}
                  className="border-gray-200 hover:shadow-md transition-shadow group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{set.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {set._count.cards} cards
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {set.format}
                          </Badge>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSet(set.id)}
                        disabled={deletingId === set.id}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"
                        aria-label="Delete set"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(set.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/sets/${set.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-gray-200 text-gray-700">
                          View
                        </Button>
                      </Link>
                      <Link href={`/sets/${set.id}/study`} className="flex-1">
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                          <Play className="w-3.5 h-3.5" />
                          Study
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
