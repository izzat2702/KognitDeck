"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Upload,
  Brain,
  Lock,
  Zap,
  AlertCircle,
  CheckCircle,
  X,
  FileUp,
} from "lucide-react";
import Link from "next/link";

export default function GeneratePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [inputMethod, setInputMethod] = useState<"text" | "pdf" | "topic">("text");
  const [inputText, setInputText] = useState("");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState<"qa" | "mcq">("qa");
  const [cardCount, setCardCount] = useState(10);
  const [setName, setSetName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ setId: string; count: number } | null>(null);

  // PDF state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState("");
  const [pdfPages, setPdfPages] = useState(0);
  const [pdfParsedPages, setPdfParsedPages] = useState(0);
  const [pdfTruncated, setPdfTruncated] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const plan = session?.user?.plan ?? "free";
  const isPro = plan === "pro" || plan === "premium";
  const isPremium = plan === "premium";

  async function handlePdfUpload(file: File) {
    if (file.type !== "application/pdf") {
      setPdfError("Please upload a PDF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setPdfError("File too large. Maximum size is 10 MB.");
      return;
    }

    setPdfFile(file);
    setPdfText("");
    setPdfPages(0);
    setPdfError("");
    setPdfUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-pdf", { method: "POST", body: formData });
    const data = await res.json();
    setPdfUploading(false);

    if (!res.ok) {
      setPdfError(data.error ?? "Failed to parse PDF.");
      setPdfFile(null);
    } else {
      setPdfText(data.text);
      setPdfPages(data.pages);
      setPdfParsedPages(data.parsedPages ?? data.pages);
      setPdfTruncated(data.truncated ?? false);
    }
  }

  function clearPdf() {
    setPdfFile(null);
    setPdfText("");
    setPdfPages(0);
    setPdfParsedPages(0);
    setPdfTruncated(false);
    setPdfError("");
  }

  async function handleGenerate() {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputMethod,
        inputText: inputMethod === "pdf" ? pdfText : inputText,
        topic,
        format,
        cardCount,
        setName: setName || undefined,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Failed to generate flashcards. Please try again.");
    } else {
      setSuccess({ setId: data.setId, count: data.cardCount });
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sign in to generate flashcards</h2>
            <Link href="/auth/signin">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Flashcards</h1>
          <p className="text-gray-500">
            Choose your input method and let AI create your study set.
          </p>
        </div>

        {success ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {success.count} cards generated!
              </h3>
              <p className="text-gray-500 mb-6">Your flashcard set is ready to study.</p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccess(null);
                    setInputText("");
                    setTopic("");
                    setSetName("");
                    clearPdf();
                  }}
                >
                  Generate Another
                </Button>
                <Link href={`/sets/${success.setId}/study`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Studying
                  </Button>
                </Link>
                <Link href={`/sets/${success.setId}`}>
                  <Button variant="outline">View Set</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Set name */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Set Name (optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="e.g., Biology Chapter 5 — Cell Division"
                  value={setName}
                  onChange={(e) => setSetName(e.target.value)}
                  className="h-11"
                />
              </CardContent>
            </Card>

            {/* Input method */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Input Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={inputMethod}
                  onValueChange={(v) => setInputMethod(v as "text" | "pdf" | "topic")}
                >
                  <TabsList className="w-full h-auto p-1 bg-gray-100">
                    <TabsTrigger value="text" className="flex-1 gap-1.5 py-2.5">
                      <FileText className="w-4 h-4" />
                      Text / Notes
                    </TabsTrigger>
                    <TabsTrigger value="pdf" className="flex-1 gap-1.5 py-2.5">
                      <Upload className="w-4 h-4" />
                      PDF Upload
                    </TabsTrigger>
                    <TabsTrigger
                      value="topic"
                      className="flex-1 gap-1.5 py-2.5 relative"
                      disabled={!isPremium}
                    >
                      <Brain className="w-4 h-4" />
                      Topic
                      {!isPremium && <Lock className="w-3 h-3 absolute top-1.5 right-1.5 text-gray-400" />}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="mt-4">
                    <Textarea
                      placeholder="Paste your notes, textbook passages, or any study material here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[200px] resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {inputText.length} characters
                    </p>
                  </TabsContent>

                  <TabsContent value="pdf" className="mt-4">
                    {pdfText ? (
                      /* Success state — PDF parsed */
                      <div className="border-2 border-green-200 rounded-xl p-5 bg-green-50">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                              <FileUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {pdfFile?.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {pdfTruncated || pdfParsedPages < pdfPages
                                  ? `${pdfParsedPages} of ${pdfPages} pages parsed`
                                  : `${pdfPages} ${pdfPages === 1 ? "page" : "pages"}`
                                } · {pdfText.length.toLocaleString()} characters extracted
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={clearPdf}
                            className="shrink-0 p-1 rounded-md hover:bg-green-100 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-green-700 font-medium mt-3">
                          ✓ Text extracted successfully — ready to generate flashcards
                        </p>
                        {(pdfTruncated || pdfParsedPages < pdfPages) && (
                          <p className="text-xs text-amber-600 mt-1">
                            Only the first {pdfParsedPages} pages / 10,000 words were used — sufficient for generating flashcards.
                          </p>
                        )}
                      </div>
                    ) : pdfUploading ? (
                      /* Uploading / parsing state */
                      <div className="border-2 border-dashed border-blue-200 rounded-xl p-10 text-center bg-blue-50">
                        <div className="w-10 h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-700">Parsing PDF…</p>
                        <p className="text-xs text-gray-400 mt-1">Extracting text from {pdfFile?.name}</p>
                      </div>
                    ) : (
                      /* Drop zone */
                      <label
                        className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                          dragOver
                            ? "border-blue-400 bg-blue-50"
                            : pdfError
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/40"
                        }`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const file = e.dataTransfer.files[0];
                          if (file) handlePdfUpload(file);
                        }}
                      >
                        <input
                          type="file"
                          accept="application/pdf"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePdfUpload(file);
                          }}
                        />
                        <Upload className={`w-10 h-10 mx-auto mb-3 ${dragOver ? "text-blue-400" : "text-gray-300"}`} />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Drop your PDF here, or <span className="text-blue-600">browse</span>
                        </p>
                        <p className="text-xs text-gray-400">PDF only · max 10 MB</p>
                        {pdfError && (
                          <p className="mt-3 text-xs text-red-600 font-medium">{pdfError}</p>
                        )}
                      </label>
                    )}
                  </TabsContent>

                  <TabsContent value="topic" className="mt-4">
                    {!isPremium ? (
                      <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50">
                        <Lock className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-900 mb-2">
                          Topic Generation — Premium Only
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Let AI generate flashcards on any topic from scratch, without any input material.
                        </p>
                        <Link href="/pricing">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            Upgrade to Premium
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Input
                          placeholder="e.g., The French Revolution, Quantum Physics, Organic Chemistry..."
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="h-11"
                        />
                        <p className="text-xs text-gray-400">
                          Enter any topic and AI will generate comprehensive flashcards from its knowledge.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Format & Count */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Card Format & Count</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Format</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFormat("qa")}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        format === "qa"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-semibold text-sm text-gray-900 mb-1">Q&A Cards</div>
                      <div className="text-xs text-gray-500">Classic front/back flashcards for all plans</div>
                    </button>
                    <button
                      onClick={() => {
                        if (!isPro) return;
                        setFormat("mcq");
                      }}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                        format === "mcq"
                          ? "border-blue-500 bg-blue-50"
                          : isPro
                            ? "border-gray-200 hover:border-gray-300"
                            : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                      }`}
                    >
                      {!isPro && (
                        <div className="absolute top-2 right-2">
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                      )}
                      <div className="font-semibold text-sm text-gray-900 mb-1">
                        MCQ
                        {!isPro && (
                          <Badge variant="secondary" className="ml-2 text-xs">Pro</Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">4-option multiple choice questions</div>
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Number of cards: <span className="text-blue-600 font-bold">{cardCount}</span>
                  </Label>
                  <input
                    type="range"
                    min={5}
                    max={plan === "free" ? 30 : 50}
                    step={5}
                    value={cardCount}
                    onChange={(e) => setCardCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5</span>
                    <span>{plan === "free" ? 30 : 50}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  {error}
                  {error.includes("limit") && (
                    <Link href="/pricing" className="block mt-2 font-medium underline">
                      Upgrade your plan →
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Generate button */}
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold text-base gap-2"
              onClick={handleGenerate}
              disabled={
                loading ||
                (inputMethod === "text" && !inputText.trim()) ||
                (inputMethod === "pdf" && (!pdfText || pdfUploading)) ||
                (inputMethod === "topic" && !topic.trim())
              }
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating {cardCount} cards...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Generate {cardCount} Flashcards
                </>
              )}
            </Button>

            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
