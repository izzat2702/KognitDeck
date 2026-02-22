"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Play,
  Pencil,
  Trash2,
  Download,
  Lock,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Card {
  id: string;
  front: string;
  back: string;
  format: string;
  options: string | null;
  correctAnswer: string | null;
  order: number;
}

interface FlashcardSet {
  id: string;
  name: string;
  format: string;
  inputMethod: string;
  createdAt: string;
  cards: Card[];
  _count: { studySessions: number };
}

export default function SetDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [set, setSet] = useState<FlashcardSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [editName, setEditName] = useState("");
  const [showRename, setShowRename] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saving, setSaving] = useState(false);

  const plan = session?.user?.plan ?? "free";
  const isPremium = plan === "premium";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch(`/api/sets/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setSet(data);
        setEditName(data.name);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, session]);

  async function handleRename() {
    setSaving(true);
    const res = await fetch(`/api/sets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSet((prev) => prev ? { ...prev, name: updated.name } : prev);
    }
    setSaving(false);
    setShowRename(false);
  }

  async function handleDelete() {
    await fetch(`/api/sets/${id}`, { method: "DELETE" });
    router.push("/dashboard");
  }

  function exportCSV() {
    if (!set) return;
    const rows = [["Front", "Back", "Format"]];
    set.cards.forEach((card) => {
      rows.push([card.front, card.back, card.format]);
    });
    const csv = rows.map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${set.name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading || !set) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full" />
        </main>
      </div>
    );
  }

  const card = set.cards[currentCard];
  const options = card.options ? (JSON.parse(card.options) as string[]) : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Rename dialog */}
      <Dialog open={showRename} onOpenChange={setShowRename}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Set</DialogTitle>
          </DialogHeader>
          <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-2" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRename(false)}>Cancel</Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleRename}
              disabled={saving}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Set</DialogTitle>
          </DialogHeader>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete &ldquo;{set.name}&rdquo;? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Back + actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-1.5 text-gray-600">
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowRename(true)}
            >
              <Pencil className="w-3.5 h-3.5" />
              Rename
            </Button>
            {isPremium ? (
              <Button variant="outline" size="sm" className="gap-1.5" onClick={exportCSV}>
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="gap-1.5 opacity-60 cursor-not-allowed" disabled>
                <Lock className="w-3.5 h-3.5" />
                Export CSV
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => setShowDelete(true)}
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </Button>
            <Link href={`/sets/${id}/study`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                <Play className="w-3.5 h-3.5" />
                Study Mode
              </Button>
            </Link>
          </div>
        </div>

        {/* Set info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{set.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary">{set.cards.length} cards</Badge>
            <Badge variant="outline" className="capitalize">{set.format}</Badge>
            <span className="text-sm text-gray-400">
              {set._count.studySessions} study {set._count.studySessions === 1 ? "session" : "sessions"}
            </span>
          </div>
        </div>

        {/* Card preview */}
        {set.cards.length > 0 && (
          <Card className="mb-8 border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-gray-400 mb-2">
                  Card {currentCard + 1} of {set.cards.length}
                </p>
              </div>

              {/* Flip card */}
              <div
                className={`flip-card h-48 cursor-pointer ${flipped ? "flipped" : ""}`}
                onClick={() => setFlipped(!flipped)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front flex items-center justify-center p-8 bg-white rounded-xl border border-gray-200">
                    <p className="text-lg font-medium text-gray-900 text-center leading-relaxed">
                      {card.front}
                    </p>
                  </div>
                  <div className="flip-card-back flex items-center justify-center p-8 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-center">
                      {card.format === "mcq" && options.length > 0 ? (
                        <div className="space-y-2 text-left">
                          {options.map((opt, i) => (
                            <div
                              key={i}
                              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                opt === card.correctAnswer
                                  ? "bg-green-100 text-green-800 border border-green-300"
                                  : "bg-white text-gray-700 border border-gray-200"
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-lg text-blue-900 font-medium leading-relaxed">
                          {card.back}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentCard((p) => Math.max(0, p - 1));
                    setFlipped(false);
                  }}
                  disabled={currentCard === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFlipped(!flipped)}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {flipped ? "Show question" : "Show answer"}
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentCard((p) => Math.min(set.cards.length - 1, p + 1));
                    setFlipped(false);
                  }}
                  disabled={currentCard === set.cards.length - 1}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All cards list */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Cards</h2>
          <div className="space-y-3">
            {set.cards.map((c, i) => {
              const opts = c.options ? (JSON.parse(c.options) as string[]) : [];
              return (
                <Card
                  key={c.id}
                  className="border-gray-200 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => {
                    setCurrentCard(i);
                    setFlipped(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 mb-2 text-sm">{c.front}</p>
                        {c.format === "mcq" && opts.length > 0 ? (
                          <div className="grid grid-cols-2 gap-1.5">
                            {opts.map((opt, oi) => (
                              <div
                                key={oi}
                                className={`text-xs px-2 py-1 rounded-md ${
                                  opt === c.correctAnswer
                                    ? "bg-green-50 text-green-700 font-medium"
                                    : "bg-gray-50 text-gray-600"
                                }`}
                              >
                                {String.fromCharCode(65 + oi)}. {opt}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 truncate">{c.back}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
