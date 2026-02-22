import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    slug: "spaced-repetition",
    title: "The Science of Spaced Repetition: Why Flashcards Work",
    excerpt:
      "Cognitive science has studied memory for over a century. The forgetting curve, first mapped by Hermann Ebbinghaus in 1885, shows how information fades unless actively reviewed. Spaced repetition exploits this curve by scheduling reviews at precisely the right moment, just before you forget. The result is dramatically better long-term retention with far less study time.",
    date: "January 15, 2026",
    category: "Study Science",
    categoryColor: "bg-green-100 text-green-700",
  },
  {
    slug: "ai-in-education",
    title: "10 Ways AI is Transforming Education in 2026",
    excerpt:
      "From personalised learning paths to instant feedback on essays, artificial intelligence is reshaping every layer of education. In 2026, AI tutors handle millions of student queries daily, adaptive platforms adjust difficulty in real time, and tools like KognitDeck generate comprehensive study materials from raw notes in seconds. Here are the ten most significant shifts happening right now.",
    date: "February 3, 2026",
    category: "AI & EdTech",
    categoryColor: "bg-purple-100 text-purple-700",
  },
  {
    slug: "study-smarter-guide",
    title: "How to Study Smarter: A Student's Complete Guide",
    excerpt:
      "Most students study by re-reading notes and hoping the information sticks. Research consistently shows this is one of the least effective techniques available. This guide covers active recall, interleaving, the Pomodoro technique, and how to combine them with AI-powered flashcards to build a study system that actually produces results, without the burnout.",
    date: "February 18, 2026",
    category: "Study Tips",
    categoryColor: "bg-blue-100 text-blue-700",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 px-6 text-center overflow-hidden">
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
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-5">
            The KognitDeck Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Learning insights and study science
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Practical guides, research breakdowns, and product news to help you study more
            effectively and stay ahead of the curve.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-10">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${post.categoryColor}`}>
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 gap-2"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
