import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/hero-1";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { Pricing } from "@/components/ui/pricing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LandingCtaButton } from "@/components/ui/landing-cta-button";
import Link from "next/link";
import { Check, FileText, Brain, BookOpen, Star, Zap, Shield } from "lucide-react";

const landingPlans = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    period: "month",
    features: [
      "50 cards per month",
      "Text & PDF input",
      "Q&A format only",
      "Quiz mode (first 10 questions)",
      "Basic flashcard management",
    ],
    description: "No credit card required. Free forever.",
    buttonText: "Get Started",
    href: "/auth/signup",
    isPopular: false,
  },
  {
    name: "Pro",
    price: 9,
    yearlyPrice: 7,
    period: "month",
    features: [
      "250 cards per month",
      "Text & PDF input",
      "Q&A + MCQ formats",
      "Unlimited quiz mode",
      "Full analytics dashboard",
      "Priority support",
    ],
    description: "7-day money-back guarantee.",
    buttonText: "Start Pro",
    href: "/auth/signup",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 19,
    yearlyPrice: 15,
    period: "month",
    features: [
      "Unlimited cards",
      "All input methods + topic generation",
      "Q&A + MCQ formats",
      "Unlimited quiz mode",
      "Full analytics dashboard",
      "CSV export",
    ],
    description: "For power users, educators & researchers.",
    buttonText: "Go Premium",
    href: "/auth/signup",
    isPopular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        {/* Hero */}
        <Hero />

        {/* How it Works */}
        <section id="how-it-works" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">
                Simple Process
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                From notes to mastery in 3 steps
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                KognitDeck makes studying effortless. No more spending hours creating flashcards by hand.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: <FileText className="w-6 h-6 text-blue-600" />,
                  title: "Add Your Content",
                  description:
                    "Paste your notes, upload a PDF, or simply type a topic. KognitDeck accepts any study material.",
                },
                {
                  step: "02",
                  icon: <Brain className="w-6 h-6 text-blue-600" />,
                  title: "AI Generates Cards",
                  description:
                    "Our AI analyzes your content and generates perfectly structured Q&A or multiple-choice flashcards in seconds.",
                },
                {
                  step: "03",
                  icon: <BookOpen className="w-6 h-6 text-blue-600" />,
                  title: "Study & Track Progress",
                  description:
                    "Enter study mode, quiz yourself, rate your confidence, and watch your analytics improve over time.",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-5xl font-black text-gray-100 select-none">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">
                Everything You Need
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Built for serious learners
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Every feature designed to help you study more effectively and retain information longer.
              </p>
            </div>
            <FeaturesSectionWithHoverEffects />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pt-16">
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">
                Simple Pricing
              </Badge>
            </div>
            <Pricing
              plans={landingPlans}
              title="Choose your plan"
              description="Start free, upgrade when you need more. No hidden fees, no lock-in."
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">
                Student Reviews
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Loved by students worldwide
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Join thousands of students who use KognitDeck to ace their exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "KognitDeck completely changed how I study for med school. I used to spend 3 hours making flashcards — now it takes 30 seconds. My USMLE prep has never been more efficient.",
                  name: "Sarah Chen",
                  role: "Medical Student, Johns Hopkins",
                  rating: 5,
                },
                {
                  quote:
                    "As a high school AP teacher, I use KognitDeck to generate review sets for my students after every unit. The MCQ format is perfect for test prep and the kids love it.",
                  name: "Marcus Thompson",
                  role: "AP History Teacher",
                  rating: 5,
                },
                {
                  quote:
                    "I upload my lecture slides and KognitDeck generates a full study set instantly. The progress analytics help me focus on topics where I'm weakest. 10/10 would recommend.",
                  name: "Aisha Patel",
                  role: "Computer Science student, MIT",
                  rating: 5,
                },
                {
                  quote:
                    "The spaced repetition through the easy/hard ratings makes a real difference. I went from failing biochem to a B+ after using KognitDeck for just two months.",
                  name: "Jake Morrison",
                  role: "Undergraduate Biology Major",
                  rating: 5,
                },
                {
                  quote:
                    "I prep for certification exams while commuting. The mobile interface is clean and the MCQ mode feels exactly like the real test environment. Worth every penny.",
                  name: "Priya Nair",
                  role: "CPA Exam Candidate",
                  rating: 5,
                },
                {
                  quote:
                    "My study group uses the shared sets feature and our collective exam average jumped 12 points. The analytics dashboard showing our weak spots is incredibly useful.",
                  name: "David Okonkwo",
                  role: "Law Student, Columbia",
                  rating: 5,
                },
              ].map((testimonial) => (
                <Card key={testimonial.name} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">
                FAQ
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently asked questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
              {[
                {
                  q: "How does KognitDeck generate flashcards?",
                  a: "KognitDeck uses advanced AI to analyze your notes, PDFs, or topics and extracts the key concepts, definitions, and relationships to create structured flashcards. You choose the format (Q&A or MCQ) and how many cards you want.",
                },
                {
                  q: "What file formats are supported for PDF upload?",
                  a: "KognitDeck supports standard PDF files up to 10MB. Text-based PDFs work best. Scanned documents may have limited accuracy depending on the quality of the scan.",
                },
                {
                  q: "Can I edit the generated flashcards?",
                  a: "Yes! After generation, you can rename sets, reorder cards, and manage your collection. Full editing of individual cards is on our roadmap.",
                },
                {
                  q: "What is the difference between Q&A and MCQ formats?",
                  a: "Q&A cards show a question on the front and a written answer on the back — great for open-ended recall. MCQ (Multiple Choice) cards present a question with four options, perfect for test prep.",
                },
                {
                  q: "Is there a free trial for Pro or Premium?",
                  a: "Our Free plan lets you try KognitDeck with 50 cards per month at no cost. If you upgrade to Pro or Premium and aren't satisfied, we offer a 7-day money-back guarantee.",
                },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="px-4">
                  <AccordionTrigger className="text-left font-medium text-gray-900">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <p className="text-gray-500 mb-4">
                Still have questions? We&apos;re here to help.
              </p>
              <Link href="/faq">
                <Button variant="outline" className="border-gray-300">
                  View all FAQs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Zap className="w-12 h-12 text-blue-200" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to study smarter?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join over 50,000 students using KognitDeck to ace their exams.
              Start free — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LandingCtaButton />
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white border-2 hover:bg-white hover:text-blue-600 px-8 h-12 font-semibold transition-colors">
                  View Plans
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-blue-200 text-sm">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Secure & private
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
