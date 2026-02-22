import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: February 2026</p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                KognitDeck (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use
                our web application and services. Please read this policy carefully. If you disagree with its terms,
                please discontinue use of our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly to us and information generated through your use of our service:</p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Account Information</h3>
              <p className="mb-4">
                When you create an account, we collect your name, email address, and password (stored as a secure
                cryptographic hash). If you sign in via Google OAuth, we receive your name, email address, and
                profile picture from Google, subject to Google&apos;s privacy policy.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Content You Create</h3>
              <p className="mb-4">
                We store the flashcard sets, individual cards, and study session data you create while using KognitDeck.
                This includes any notes or text you paste into the generator, topics you specify, and your quiz results.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Usage Data</h3>
              <p className="mb-4">
                We collect information about how you use KognitDeck, including pages visited, features used, session
                duration, and device/browser information. This helps us improve the product.
              </p>

              <h3 className="text-base font-semibold text-gray-800 mb-2">Payment Information</h3>
              <p>
                Subscription payments are processed by Stripe. KognitDeck does not store your full credit card number,
                CVV, or payment details. We receive only a payment token, last four card digits, and billing metadata
                from Stripe. Stripe&apos;s use of your payment data is governed by Stripe&apos;s Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain the KognitDeck service</li>
                <li>Process your subscription and manage billing</li>
                <li>Personalize your experience and display your analytics dashboard</li>
                <li>Send transactional emails (account confirmation, billing receipts)</li>
                <li>Respond to your support requests and inquiries</li>
                <li>Monitor and analyze usage patterns to improve our product</li>
                <li>Detect, prevent, and address technical issues or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-3">
                We do not use your flashcard content to train AI models without your explicit consent, and we do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Storage and Security</h2>
              <p>
                Your data is stored on secure servers. We use industry-standard security measures including
                TLS/SSL encryption for data in transit, bcrypt hashing for passwords, and access controls
                limiting who within our team can access user data. While we take reasonable precautions, no
                method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookies</h2>
              <p className="mb-3">
                We use cookies and similar tracking technologies to maintain your session and remember your
                authentication state. Specifically, we use:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session cookies:</strong> Required to keep you logged in (NextAuth.js session token)</li>
                <li><strong>Persistent cookies:</strong> Remember your login across sessions</li>
                <li><strong>Analytics cookies:</strong> Help us understand how users interact with KognitDeck (anonymized)</li>
              </ul>
              <p className="mt-3">
                You can disable cookies in your browser settings, but some features of KognitDeck may not function correctly if you do so.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Services</h2>
              <p className="mb-3">We use the following third-party services that may receive your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Stripe</strong> — Payment processing for Pro and Premium subscriptions.
                  PCI-DSS compliant. KognitDeck never stores raw card data.
                </li>
                <li>
                  <strong>Google OAuth</strong> — Optional sign-in method. Google provides us with your
                  name, email, and profile picture per the OAuth consent you approve.
                </li>
                <li>
                  <strong>Anthropic Claude API</strong> — AI flashcard generation. Text you submit for
                  card generation is processed by Anthropic&apos;s servers. We do not send personally
                  identifiable information to the AI API beyond the content you provide for generation.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
              <p>
                We retain your account data and flashcard sets for as long as your account is active. Study session
                data is retained for analytics purposes for up to 24 months. If you delete your account, we will
                delete your personal data and flashcard content within 30 days, except where retention is required
                by law (e.g., billing records are retained for 7 years per tax regulations).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Your Rights</h2>
              <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
                <li><strong>Correction:</strong> Request that we correct inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Export:</strong> Premium users can export flashcard data as CSV; account data export available on request</li>
                <li><strong>Objection:</strong> Object to certain uses of your data</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:privacy@kognitdeck.app" className="text-blue-600 hover:underline">
                  privacy@kognitdeck.app
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Children&apos;s Privacy</h2>
              <p>
                KognitDeck is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you believe a child under 13 has provided us with personal
                information, please contact us immediately and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by
                posting the new policy on this page with an updated &ldquo;Last updated&rdquo; date and, for material changes,
                by sending an email to your registered address. Your continued use of KognitDeck after changes
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
              <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm">
                <p><strong>KognitDeck Privacy Team</strong></p>
                <p>Email: <a href="mailto:privacy@kognitdeck.app" className="text-blue-600 hover:underline">privacy@kognitdeck.app</a></p>
                <p className="mt-2">
                  <Link href="/contact" className="text-blue-600 hover:underline">Use our contact form</Link>
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}