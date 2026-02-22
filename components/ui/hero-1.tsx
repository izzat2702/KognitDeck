"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function Hero() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.07}
        duration={3}
        repeatDelay={0.8}
        className={cn(
          "text-blue-600",
          "[mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,white,transparent)]",
        )}
      />
      {/* Radial accent overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow badge */}
        <div
          className="flex justify-center mb-6"
          style={{ animation: "fadeIn 0.5s ease-out forwards", opacity: 0 }}
        >
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm font-medium border-blue-200 text-blue-700 bg-blue-50 gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Learning
          </Badge>
        </div>

        {/* Main title */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
          style={{
            animation: "fadeUp 0.6s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          Study Smarter,{" "}
          <span className="text-blue-600">Not Harder</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 leading-relaxed"
          style={{
            animation: "fadeUp 0.6s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          Generate flashcards from your notes, PDFs, or any topic in seconds.
          Powered by AI, built for students.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            animation: "fadeUp 0.6s ease-out 0.3s forwards",
            opacity: 0,
          }}
        >
          <Link href={isSignedIn ? "/dashboard" : "/auth/signup"}>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-blue-200 transition-all hover:shadow-blue-300 hover:scale-105"
            >
              {isSignedIn ? "Go to Dashboard" : "Get Started"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 text-base font-semibold rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
            >
              View Pricing
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <p
          className="mt-8 text-sm text-gray-400"
          style={{
            animation: "fadeIn 0.6s ease-out 0.4s forwards",
            opacity: 0,
          }}
        >
          No credit card required · Free plan available · Cancel anytime
        </p>
      </div>
    </div>
  );
}
