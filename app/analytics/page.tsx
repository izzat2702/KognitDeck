"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Zap, TrendingUp, Target, Flame, BookOpen } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnalyticsData {
  totalSessions: number;
  totalCardsStudied: number;
  overallAccuracy: number;
  totalEasy: number;
  totalHard: number;
  streak: number;
  accuracyOverTime: Array<{ date: string; accuracy: number; set: string }>;
  cardsPerDay: Array<{ date: string; cards: number }>;
  topSets: Array<{ name: string; sessions: number; cards: number }>;
}

const COLORS = ["#2563EB", "#EF4444"];

function LockedAnalytics() {
  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="analytics-blur pointer-events-none select-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[{ label: "Cards Studied", value: "847" }, { label: "Accuracy", value: "73%" }, { label: "Study Streak", value: "12 days" }, { label: "Sessions", value: "34" }].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border p-6 text-center">
              <div className="text-3xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border p-6 h-64" />
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
        <div className="text-center max-w-sm mx-4">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Analytics</h3>
          <p className="text-gray-500 text-sm mb-6">
            Upgrade to Pro or Premium to access your full learning analytics dashboard.
          </p>
          <Link href="/pricing">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Zap className="w-4 h-4" />
              Upgrade from $9/month
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);

  const plan = session?.user?.plan ?? "free";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/analytics")
      .then((r) => {
        if (r.status === 403) {
          setLocked(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  const pieData = data
    ? [
        { name: "Easy", value: data.totalEasy },
        { name: "Hard", value: data.totalHard },
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 mt-1">Track your learning progress over time</p>
          </div>
          <Badge
            variant={plan === "free" ? "secondary" : "default"}
            className={plan !== "free" ? "bg-blue-600 text-white" : ""}
          >
            {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
          </Badge>
        </div>

        {locked ? (
          <LockedAnalytics />
        ) : loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Cards Studied", value: data.totalCardsStudied, icon: <BookOpen className="w-5 h-5 text-blue-600" />, color: "bg-blue-50" },
                { label: "Overall Accuracy", value: `${data.overallAccuracy}%`, icon: <Target className="w-5 h-5 text-green-600" />, color: "bg-green-50" },
                { label: "Study Streak", value: `${data.streak} days`, icon: <Flame className="w-5 h-5 text-orange-500" />, color: "bg-orange-50" },
                { label: "Sessions", value: data.totalSessions, icon: <TrendingUp className="w-5 h-5 text-purple-600" />, color: "bg-purple-50" },
              ].map((stat) => (
                <Card key={stat.label} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Accuracy over time */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Accuracy Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                {data.accuracyOverTime.length === 0 ? (
                  <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                    Complete some study sessions to see your accuracy trend
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data.accuracyOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
                      <Tooltip formatter={(v) => [`${v}%`, "Accuracy"]} />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#2563EB"
                        strokeWidth={2}
                        dot={{ fill: "#2563EB", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Cards per day + Easy/Hard pie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Cards Studied This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data.cardsPerDay.slice(-14)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.split("-")[2]} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="cards" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Easy vs Hard Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  {pieData.every((d) => d.value === 0) ? (
                    <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
                      No data yet — start studying!
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {pieData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Top sets */}
            {data.topSets.length > 0 && (
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Most Studied Sets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.topSets.map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{s.name}</p>
                            <p className="text-xs text-gray-400">{s.cards} cards</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{s.sessions} sessions</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400">No data available yet. Start studying to see analytics!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
