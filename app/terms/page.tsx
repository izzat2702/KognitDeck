import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
            <p className="text-sm text-gray-500">Last updated: February 2026</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-10">
            {/* 1. Acceptance */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using KognitDeck (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service. By creating an account, you confirm that you are at least 13 years of age and have the legal capacity to enter into a binding agreement.
              </p>
            </section>

            {/* 2. Description */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed">
                KognitDeck is an AI-powered flashcard generation and study platform. The Service allows users to generate flashcard decks from topics or text, study cards in various modes, take quizzes, and manage their learning content. We offer both a free tier and a paid subscription plan ("Pro"). Features available under each plan are described on our Pricing page and are subject to change with reasonable notice.
              </p>
            </section>

            {/* 3. User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed">
                To access most features of the Service, you must create an account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account. KognitDeck will not be liable for any loss or damage arising from your failure to protect your account credentials.
              </p>
            </section>

            {/* 4. Subscription and Billing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Subscription and Billing</h2>
              <p className="text-gray-600 leading-relaxed">
                KognitDeck Pro is available on a monthly or annual subscription basis. By subscribing, you authorize us to charge the applicable fees to your payment method on a recurring basis until you cancel. Subscription fees are billed in advance. Prices are listed in USD and are subject to change with 30 days notice. You are responsible for any taxes applicable to your subscription. Payments are processed by Stripe, Inc. We do not store your payment card details on our servers.
              </p>
            </section>

            {/* 5. Acceptable Use */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                You agree to use the Service only for lawful purposes and in a manner that does not infringe the rights of others. You must not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>Use the Service to generate content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable.</li>
                <li>Attempt to gain unauthorized access to any part of the Service or its related systems.</li>
                <li>Use automated tools or scripts to scrape, crawl, or bulk-download content from the Service.</li>
                <li>Resell, sublicense, or commercially exploit the Service without our express written permission.</li>
                <li>Upload or transmit malware, viruses, or any other malicious code.</li>
              </ul>
            </section>

            {/* 6. Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of KognitDeck and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent. The flashcard content you generate through the Service using your own inputs remains your property. By using the Service, you grant KognitDeck a limited, non-exclusive, royalty-free license to store and display your content solely for the purpose of providing the Service to you.
              </p>
            </section>

            {/* 7. Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices. By using the Service, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </section>

            {/* 8. Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Disclaimers</h2>
              <p className="text-gray-600 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. KognitDeck does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. AI-generated flashcard content is provided for educational convenience and may contain errors or inaccuracies. You are responsible for verifying the accuracy of generated content.
              </p>
            </section>

            {/* 9. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL KOGNITDECK, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE. IN NO EVENT SHALL OUR AGGREGATE LIABILITY EXCEED THE GREATER OF ONE HUNDRED DOLLARS ($100) OR THE AMOUNT YOU PAID TO KOGNITDECK IN THE PAST SIX MONTHS.
              </p>
            </section>

            {/* 10. Refund Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Refund Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We offer a 7-day money-back guarantee on new Pro subscriptions. If you are not satisfied with your purchase, contact our support team within 7 days of your initial payment and we will issue a full refund, no questions asked. Refunds are not available for subsequent billing cycles or for accounts that have violated these Terms. Refunds are processed within 5 to 10 business days and will be returned to your original payment method.
              </p>
            </section>

            {/* 11. Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your account and access to the Service at our sole discretion, without prior notice, if we believe you have violated these Terms, engaged in fraudulent or illegal activity, or for any other reason we deem appropriate. Upon termination, your right to use the Service will immediately cease. You may terminate your account at any time by contacting our support team or through your account settings. Provisions of these Terms that by their nature should survive termination shall survive.
              </p>
            </section>

            {/* 12. Changes */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 14 days notice via email or a prominent notice on the Service before the new terms take effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use the Service after revisions become effective, you agree to be bound by the updated Terms.
              </p>
            </section>

            {/* 13. Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">13. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 font-medium">KognitDeck</p>
                <p className="text-gray-600">Email: legal@kognitdeck.app</p>
                <p className="text-gray-600 mt-3">
                  You can also reach us via the{" "}
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    contact form
                  </Link>
                  {" "}on our website.
                </p>
              </div>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-sm text-gray-500">
              Questions about our terms?{" "}
              <Link href="/faq" className="text-blue-600 hover:underline">
                View our FAQ
              </Link>
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}