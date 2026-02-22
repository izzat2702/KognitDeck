import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-lg">
          {/* Decorative icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-blue-300" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-lg font-bold text-gray-400 rotate-12">
                ?
              </div>
            </div>
          </div>

          {/* 404 number */}
          <p className="text-8xl font-black text-blue-600 mb-4 tracking-tight">404</p>

          {/* Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Looks like this page took the semester off
          </h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            We searched the whole library but couldn&apos;t find what you were looking for.
            The page may have moved, been deleted, or perhaps never existed in the first place.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="gap-2 border-gray-200 w-full sm:w-auto">
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>

          {/* Help link */}
          <p className="text-sm text-gray-400 mt-8">
            Need help?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
