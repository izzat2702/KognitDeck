import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "KognitDeck — AI-Powered Flashcard Generator",
    template: "%s | KognitDeck",
  },
  description:
    "Generate flashcards from your notes, PDFs, or any topic in seconds. Powered by AI, built for students and academics.",
  keywords: [
    "flashcards",
    "AI",
    "study",
    "learning",
    "education",
    "students",
    "quiz",
    "spaced repetition",
  ],
  authors: [{ name: "KognitDeck" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kognitdeck.app",
    title: "KognitDeck — AI-Powered Flashcard Generator",
    description:
      "Generate flashcards from your notes, PDFs, or any topic in seconds.",
    siteName: "KognitDeck",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
