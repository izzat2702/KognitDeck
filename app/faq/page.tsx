import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqSections = [
  {
    id: "general",
    label: "General",
    badgeColor: "bg-blue-100 text-blue-700 border border-blue-200",
    questions: [
      {
        id: "what-is-kognitdeck",
        question: "What is KognitDeck?",
        answer:
          "KognitDeck is an AI-powered flashcard platform that lets you generate, study, and quiz yourself on any topic in seconds. Simply enter a subject or paste your notes and our AI will create a full set of flashcards tailored to your learning goals. Whether you are a student cramming for exams or a professional brushing up on new skills, KognitDeck makes studying faster and smarter.",
      },
      {
        id: "how-ai-generates",
        question: "How does AI generate flashcards?",
        answer:
          "KognitDeck uses large language models (LLMs) to analyze the topic or text you provide. The AI identifies key concepts, definitions, and relationships, then structures them into clear question-and-answer pairs or multiple-choice questions. The generation process typically takes 5 to 15 seconds and produces 10 to 20 cards per session.",
      },
      {
        id: "mobile-app",
        question: "Is there a mobile app?",
        answer:
          "KognitDeck is a fully responsive web application that works great on mobile browsers with no download required. Simply visit the app on your phone or tablet and you will get a native-like experience. A dedicated iOS and Android app is on our roadmap for 2026.",
      },
      {
        id: "languages-supported",
        question: "What languages are supported?",
        answer:
          "KognitDeck supports topic generation and flashcard creation in over 30 languages including English, Spanish, French, German, Portuguese, Mandarin, Japanese, Korean, Arabic, and more. Localization for additional interface languages is planned in upcoming releases.",
      },
      {
        id: "how-to-get-started",
        question: "How do I get started?",
        answer:
          "Getting started is simple. Create a free account using your email or Google sign-in, then click Generate Cards from your dashboard. Enter any topic and hit Generate. Your first set of flashcards will be ready in seconds. The free plan includes unlimited Q and A card generation, and you can upgrade to Pro for multiple-choice quizzes and advanced features.",
      },
    ],
  },
  {
    id: "features",
    label: "Features",
    badgeColor: "bg-purple-100 text-purple-700 border border-purple-200",
    questions: [
      {
        id: "qa-vs-mcq",
        question: "What is the difference between Q&A and MCQ modes?",
        answer:
          "Q&A mode presents you with a question and you recall the answer before flipping the card to check. This is great for open recall practice. MCQ (Multiple Choice Question) mode presents you with a question and four answer options simulating real exam conditions. MCQ mode is a Pro feature especially useful for standardized test prep.",
      },
      {
        id: "edit-generated-cards",
        question: "Can I edit generated cards?",
        answer:
          "Yes! Every generated flashcard is fully editable. After your set is generated, click on any card to open the editor where you can modify the question, answer, or answer choices. You can also delete cards, reorder them, or add new cards manually. Your edits are saved automatically.",
      },
      {
        id: "how-study-mode-works",
        question: "How does study mode work?",
        answer:
          "Study mode presents your flashcards one at a time in a clean, distraction-free interface. You can flip each card to reveal the answer, then mark it as Got it or Still learning. KognitDeck tracks your progress across sessions and prioritizes cards you struggle with using a spaced repetition algorithm, so your study time is always focused where it matters most.",
      },
      {
        id: "quiz-paywall",
        question: "What is behind the quiz paywall?",
        answer:
          "The Pro subscription unlocks the full Quiz mode, which includes timed multiple-choice quizzes, a score summary at the end, and a detailed breakdown of which questions you got right or wrong. It also unlocks unlimited saved decks, the ability to share decks publicly, advanced topic generation with subtopics, and priority AI generation speed.",
      },
      {
        id: "topic-generation",
        question: "What is topic generation?",
        answer:
          "Topic generation is KognitDeck's core feature. You type a subject, anything from Organic Chemistry basics to The French Revolution, and the AI generates a structured deck of flashcards on that topic from scratch. Pro users can generate cards with subtopic breakdowns, creating hierarchical decks covering a subject in depth.",
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    badgeColor: "bg-green-100 text-green-700 border border-green-200",
    questions: [
      {
        id: "cancel-anytime",
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, absolutely. You can cancel your Pro subscription at any time from your account settings under the Billing tab. When you cancel, you retain Pro access until the end of your current billing period. After that, your account reverts to the free plan. There are no cancellation fees or penalties.",
      },
      {
        id: "student-discount",
        question: "Is there a student discount?",
        answer:
          "Yes! Students with a valid .edu email address receive 30% off the Pro monthly plan and 40% off the annual plan. Sign up or log in with your .edu email and the discount will be applied automatically at checkout. If your institution uses a different email domain, contact our support team and we will verify your student status manually.",
      },
      {
        id: "payment-methods",
        question: "What payment methods do you accept?",
        answer:
          "KognitDeck accepts all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as Apple Pay and Google Pay. All payments are processed securely through Stripe, a PCI-compliant payment processor. We do not store your card details on our servers.",
      },
      {
        id: "data-after-cancel",
        question: "What happens to my data if I cancel?",
        answer:
          "Your account and all of your flashcard decks remain intact after cancellation. You simply lose access to Pro-only features like MCQ mode and timed quizzes. Your decks are never deleted automatically. If you choose to permanently delete your account, we will erase your data within 30 days. You can export all your decks as JSON or CSV at any time from account settings.",
      },
    ],
  },
  {
    id: "privacy-section",
    label: "Privacy",
    badgeColor: "bg-orange-100 text-orange-700 border border-orange-200",
    questions: [
      {
        id: "data-secure",
        question: "Is my data secure?",
        answer:
          "Yes. All data transmitted between your browser and our servers is encrypted using TLS 1.3. Your flashcard content and account information are stored in encrypted databases. We use industry-standard security practices including access controls, regular security audits, and vulnerability scanning. Payment data is handled entirely by Stripe and is never stored on our systems.",
      },
      {
        id: "sell-data",
        question: "Do you sell my data?",
        answer:
          "No. We do not sell, rent, or trade your personal information or flashcard content to any third parties. We use anonymized, aggregated usage data internally to improve the product, but this data cannot be traced back to you individually. For full details, please review our Privacy Policy.",
      },
      {
        id: "export-data",
        question: "Can I export my data?",
        answer:
          "Yes. You can export all of your flashcard decks at any time from the Account Settings page. Exports are available in JSON format (for re-importing into KognitDeck or other tools) and CSV format (for use in spreadsheets or other flashcard apps like Anki). You can also request a full copy of all data we hold about you by contacting our support team.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-gray-200 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about KognitDeck. Cannot find your answer?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                Contact our support team.
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="max-w-3xl mx-auto px-4 py-16 space-y-14">
          {faqSections.map((section) => (
            <div key={section.id}>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${section.badgeColor}`}
                >
                  {section.label}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {section.questions.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="bg-white border border-gray-200 rounded-lg px-5 shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-base font-medium text-gray-900 hover:text-blue-600 py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>

        {/* CTA Banner */}
        <section className="bg-blue-600 py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="w-10 h-10 text-blue-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Still have questions?</h2>
            <p className="text-blue-100 mb-8">
              Our support team typically responds within a few hours on business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-blue-300 text-white hover:bg-blue-700 font-semibold">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}