import os
B = "C:/claude27/Flashcardv1"
about = """
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Briefcase, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    { icon: <BookOpen className="h-8 w-8 text-blue-600" />, title: "Accessible Learning", description: "We believe every student deserves access to powerful study tools regardless of their background or resources. CardCraft is free to start and designed to scale with your ambitions." },
    { icon: <Zap className="h-8 w-8 text-blue-600" />, title: "AI-First Design", description: "Artificial intelligence is baked into every feature. From instant card generation to adaptive quiz logic, AI helps you study smarter, not harder." },
    { icon: <Users className="h-8 w-8 text-blue-600" />, title: "Student-Built", description: "CardCraft was created by students frustrated with existing tools. Every design decision is informed by real learning pain points, not corporate assumptions." },
  ];

  const steps = [
    { number: "01", title: "Upload or Paste Your Content", description: "Drop in a PDF, paste lecture notes, or type any topic. CardCraft accepts text, documents, and structured data." },
    { number: "02", title: "AI Generates Your Flashcards", description: "Our AI reads your content, identifies key concepts, and creates clear question-and-answer pairs optimised for retention." },
    { number: "03", title: "Study and Track Your Progress", description: "Use spaced repetition to review cards at the right time. Watch your mastery scores climb as the algorithm adapts to you." },
  ];
