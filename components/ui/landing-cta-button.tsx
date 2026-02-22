"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Session-aware primary CTA used in the landing page's bottom blue section.
// Shows "Go to Dashboard" for signed-in users, "Get Started" for guests.
export function LandingCtaButton() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  return (
    <Link href={isSignedIn ? "/dashboard" : "/auth/signup"}>
      <Button
        size="lg"
        className="bg-white text-blue-600 hover:bg-blue-50 px-8 h-12 font-semibold"
      >
        {isSignedIn ? "Go to Dashboard" : "Get Started"}
      </Button>
    </Link>
  );
}
