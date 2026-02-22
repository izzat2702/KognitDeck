import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/ui/pricing";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const kognitdeckPlans = [
  {
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    period: "month",
    features: [
      "50 cards per month",
      "Text & PDF input",
      "PDF extraction: up to 3,000 words",
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
      "PDF extraction: up to 10,000 words",
      "Q&A + MCQ formats",
      "Unlimited quiz mode",
      "Full analytics dashboard",
      "Priority support",
    ],
    description: "7-day money-back guarantee, no questions asked.",
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
      "PDF extraction: up to 20,000 words",
      "Q&A + MCQ formats",
      "Unlimited quiz mode",
      "Full analytics dashboard",
      "CSV export",
      "Priority support",
    ],
    description: "For power users, educators & researchers.",
    buttonText: "Go Premium",
    href: "/auth/signup",
    isPopular: false,
  },
];

const featureRows = [
  { label: "Cards per month", values: ["50", "250", "Unlimited"] },
  { label: "Input methods", values: ["Text & PDF", "Text & PDF", "Text, PDF & Topic"] },
  { label: "PDF word extraction", values: ["3,000 words", "10,000 words", "20,000 words"] },
  { label: "Card formats", values: ["Q&A only", "Q&A + MCQ", "Q&A + MCQ"] },
  { label: "Quiz mode", values: [false, "Unlimited", "Unlimited"] },
  { label: "Analytics dashboard", values: [false, true, true] },
  { label: "Topic generation", values: [false, false, true] },
  { label: "CSV export", values: [false, false, true] },
  { label: "Priority support", values: [false, true, true] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main>
        {/* Eyebrow */}
        <section className="pt-16 pb-2 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <Badge variant="outline" className="mb-4 border-blue-200 text-blue-700 bg-blue-50">
              Pricing
            </Badge>
            <p className="text-gray-500 text-lg">
              Start free. Upgrade when you need more. No hidden fees.
            </p>
          </div>
        </section>

        {/* Animated pricing cards */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto">
            <Pricing
              plans={kognitdeckPlans}
              title="Simple, honest pricing"
              description="Choose the plan that fits your study habits. Switch or cancel anytime."
            />
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Full feature comparison
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-6 text-sm font-semibold text-gray-500 w-2/5">
                      Feature
                    </th>
                    {["Free", "Pro", "Premium"].map((name, i) => (
                      <th key={name} className="text-center p-6">
                        <span className="text-sm font-bold text-gray-900">{name}</span>
                        {i === 1 && (
                          <Badge className="ml-2 bg-blue-600 text-white text-xs">
                            Popular
                          </Badge>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                      <td className="p-5 text-sm font-medium text-gray-700">{row.label}</td>
                      {row.values.map((val, j) => (
                        <td key={j} className="p-5 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Billing FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
              Billing FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. Cancel your subscription at any time from the billing page. You'll keep access until the end of your current billing period.",
                },
                {
                  q: "Do you offer a free trial for paid plans?",
                  a: "Our Free plan lets you try KognitDeck with no cost. If you upgrade and aren't satisfied within 7 days, contact us for a full refund, no questions asked.",
                },
                {
                  q: "What's the difference between monthly and annual billing?",
                  a: "Annual billing saves you 20% versus paying month-to-month. You're billed once per year for the full amount.",
                },
                {
                  q: "Can I upgrade or downgrade between plans?",
                  a: "Yes. Upgrade instantly and access new features right away. Downgrade takes effect at your next billing cycle with no penalty.",
                },
                {
                  q: "Is there a student discount?",
                  a: "We're working on an educational discount program. Contact us with your institutional email to be notified when it launches.",
                },
              ].map((item) => (
                <div key={item.q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
