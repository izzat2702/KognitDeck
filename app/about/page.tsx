"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { GraduationCap, BookOpen, Briefcase, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  const values = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Accessible Learning",
      description:
        "We believe every student deserves access to powerful study tools regardless of background or resources. KognitDeck is free to start and designed to scale with your ambitions.",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-First Design",
      description:
        "Artificial intelligence is baked into every feature. From instant card generation to adaptive quiz logic, AI helps you study smarter, not harder.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Student-Built",
      description:
        "KognitDeck was created by a student frustrated with existing tools. Every design decision is informed by real learning pain points, not corporate assumptions.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload or Paste Your Content",
      description:
        "Drop in a PDF, paste lecture notes, or type any topic. KognitDeck accepts text, documents, and structured data.",
    },
    {
      number: "02",
      title: "AI Generates Your Flashcards",
      description:
        "Our AI reads your content, identifies key concepts, and creates question-and-answer pairs optimised for retention.",
    },
    {
      number: "03",
      title: "Study and Track Your Progress",
      description:
        "Use spaced repetition to review cards at the right time. Watch your mastery scores climb as the algorithm adapts to you.",
    },
  ];

  const personas = [
    {
      icon: <GraduationCap className="h-10 w-10 text-blue-600" />,
      title: "Students",
      description:
        "From high school exams to university finals, KognitDeck turns any syllabus into a personalised study programme in seconds.",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      title: "Teachers",
      description:
        "Create and share card sets with your entire class. Assign decks, track student progress, and reinforce lessons effortlessly.",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-blue-600" />,
      title: "Professionals",
      description:
        "Preparing for a certification or learning a new skill? KognitDeck helps working adults retain complex information efficiently.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="relative bg-gradient-to-br from-blue-50 to-white py-24 px-6 text-center overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.18}
          duration={3}
          repeatDelay={0.8}
          className={cn(
            "text-blue-600",
            "[mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,white,transparent)]",
          )}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            About KognitDeck
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Empowering the next generation of learners
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            KognitDeck sits at the intersection of artificial intelligence and education. We build
            tools that make deep, lasting learning accessible to every student, teacher, and lifelong
            learner on the planet, one flashcard at a time.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three principles guide every product decision we make at KognitDeck.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <Card key={v.title} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="mb-4">{v.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How KognitDeck Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps stand between you and a complete, personalised flashcard deck.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mb-5 shadow-md">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who KognitDeck Is For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you are studying for finals, running a classroom, or upskilling at work,
              KognitDeck was built with you in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {personas.map((p) => (
              <Card key={p.title} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardContent className="pt-10 pb-8 px-6">
                  <div className="flex justify-center mb-4">{p.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder quote */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-white leading-relaxed mb-6 font-medium italic">
            &ldquo;I built KognitDeck because I was spending hours every week making flashcards by
            hand. As a student, I knew AI could change that, so I built the tool I always wished
            I had.&rdquo;
          </p>
          <p className="text-blue-100 font-semibold">Izzat Zulqarnain</p>
          <p className="text-blue-300 text-sm mt-1">Founder of KognitDeck</p>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              KognitDeck is built and maintained by a solo developer passionate about making
              learning more effective for everyone.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 text-2xl font-bold flex items-center justify-center mb-4 shadow-sm">
                IZ
              </div>
              <h3 className="text-base font-semibold text-gray-900">Izzat Zulqarnain</h3>
              <p className="text-sm text-gray-500 mt-1">Founder &amp; Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to study smarter?</h2>
          <p className="text-gray-600 mb-8">
            Start for free. No credit card required.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={isSignedIn ? "/dashboard" : "/auth/signup"}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base">
                {isSignedIn ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-base">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
