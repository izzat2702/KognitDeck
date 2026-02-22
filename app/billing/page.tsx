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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, CreditCard, Zap, Calendar, BarChart3 } from "lucide-react";
import { getPlanLimits } from "@/lib/utils";

interface UserData {
  plan: string;
  cardsGeneratedThisMonth: number;
  cardsResetDate: string;
  email: string;
  name: string;
}

const PLAN_DETAILS = {
  free: {
    name: "Free",
    price: "$0/month",
    color: "bg-gray-100 text-gray-700",
    features: ["50 cards/month", "Text & PDF input", "Q&A format", "Quiz (first 10 only)"],
  },
  pro: {
    name: "Pro",
    price: "$9/month",
    color: "bg-blue-100 text-blue-700",
    features: ["250 cards/month", "Text & PDF input", "Q&A + MCQ formats", "Unlimited quiz", "Analytics"],
  },
  premium: {
    name: "Premium",
    price: "$19/month",
    color: "bg-purple-100 text-purple-700",
    features: ["Unlimited cards", "All input methods", "All formats", "Unlimited quiz", "Analytics + CSV export"],
  },
};

export default function BillingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  async function openStripePortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Could not open billing portal. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch("/api/user")
      .then((r) => r.json())
      .then((d) => {
        setUserData(d);
        setLoading(false);
      });
  }, [session]);

  if (loading || !userData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-48 w-full" />
        </main>
      </div>
    );
  }

  const plan = userData.plan as keyof typeof PLAN_DETAILS;
  const planDetails = PLAN_DETAILS[plan] ?? PLAN_DETAILS.free;
  const limits = getPlanLimits(plan);
  const used = userData.cardsGeneratedThisMonth;
  const quota = limits.cardsPerMonth === Infinity ? null : limits.cardsPerMonth;
  const quotaPercent = quota ? Math.min((used / quota) * 100, 100) : 0;

  const resetDate = new Date(userData.cardsResetDate);
  const nextReset = new Date(resetDate.getFullYear(), resetDate.getMonth() + 1, 1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Billing & Plan</h1>

        {/* Current plan */}
        <Card className="border-gray-200 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Current Plan</CardTitle>
              <Badge className={planDetails.color}>{planDetails.name}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">{planDetails.price}</p>
                <p className="text-sm text-gray-500">Billed monthly</p>
              </div>
              {plan !== "free" && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  Renews {nextReset.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </div>
              )}
            </div>

            <ul className="space-y-2 mb-6">
              {planDetails.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-500" />
                  {f}
                </li>
              ))}
            </ul>

            {plan === "free" ? (
              <Link href="/pricing">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                  <Zap className="w-4 h-4" />
                  Upgrade to Pro — $9/month
                </Button>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={openStripePortal}
                  disabled={portalLoading}
                >
                  <CreditCard className="w-4 h-4" />
                  {portalLoading ? "Opening…" : "Manage via Stripe Portal"}
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={openStripePortal}
                  disabled={portalLoading}
                >
                  Cancel Plan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage */}
        <Card className="border-gray-200 mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            {quota !== null ? (
              <>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-gray-900">{used}</span>
                  <span className="text-gray-500">/ {quota} cards</span>
                </div>
                <Progress value={quotaPercent} className="h-3 mb-2" />
                <p className="text-sm text-gray-500">
                  {quota - used} cards remaining · Resets {nextReset.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                </p>
              </>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{used}</span>
                <span className="text-gray-500">cards used · Unlimited plan</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics teaser for free */}
        {plan === "free" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Unlock Analytics</p>
                  <p className="text-sm text-gray-500">
                    Track your accuracy, streaks, and study habits with Pro or Premium.
                  </p>
                </div>
                <Link href="/pricing">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Upgrade
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Billing info placeholder */}
        {plan !== "free" && (
          <Card className="border-gray-200 mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 text-gray-600">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm">•••• •••• •••• 4242</span>
                <Badge variant="secondary" className="text-xs">Visa</Badge>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Payment details are managed securely via Stripe. KognitDeck never stores your card information.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
