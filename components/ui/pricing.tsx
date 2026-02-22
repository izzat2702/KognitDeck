"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Loader2, Star } from "lucide-react";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: number;
  yearlyPrice: number;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href?: string; // kept for type compatibility; routing is handled by handlePlanSelect
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you. No hidden fees, no surprise charges.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 60,
        spread: 70,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#2563EB", "#60A5FA", "#93C5FD", "#BFDBFE", "#1D4ED8"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  async function handlePlanSelect(planName: string) {
    const planKey = planName.toLowerCase();

    // Free plan: go to dashboard if signed in, sign-up page otherwise
    if (planKey === "free") {
      router.push(sessionStatus === "authenticated" ? "/dashboard" : "/auth/signup");
      return;
    }

    // Paid plan: must be signed in first
    if (sessionStatus !== "authenticated") {
      router.push("/auth/signin");
      return;
    }

    // Already on this plan — just go to dashboard
    if (session?.user?.plan === planKey) {
      router.push("/dashboard");
      return;
    }

    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, billing: isMonthly ? "monthly" : "annual" }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error ?? "Failed to start checkout. Please try again.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="py-16 px-4">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span className={cn("text-sm font-medium", isMonthly ? "text-gray-900" : "text-gray-400")}>
          Monthly
        </span>
        <Label htmlFor="billing-toggle" className="cursor-pointer">
          <Switch
            id="billing-toggle"
            ref={switchRef}
            checked={!isMonthly}
            onCheckedChange={handleToggle}
          />
        </Label>
        <span className={cn("text-sm font-medium flex items-center gap-1.5", !isMonthly ? "text-gray-900" : "text-gray-400")}>
          Annual
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
            Save 20%
          </span>
        </span>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => {
          const planKey = plan.name.toLowerCase();
          const isLoading = loadingPlan === planKey;
          const isCurrentPlan = session?.user?.plan === planKey;

          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -20 : index === 0 ? 20 : 0,
                      scale: index === 0 || index === 2 ? 0.95 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: index * 0.1 + 0.2,
              }}
              className={cn(
                "rounded-2xl border p-8 bg-white flex flex-col relative",
                plan.isPopular
                  ? "border-blue-500 border-2 shadow-lg shadow-blue-100"
                  : "border-gray-200 shadow-sm",
                !plan.isPopular && "mt-4 md:mt-5",
                index === 0 && "md:origin-right",
                index === 2 && "md:origin-left"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-blue-600 py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center gap-1">
                  <Star className="text-white h-3.5 w-3.5 fill-white" />
                  <span className="text-white text-xs font-semibold">Popular</span>
                </div>
              )}

              <div className="flex-1 flex flex-col">
                {/* Plan name */}
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {plan.name}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-black text-gray-900">
                    <NumberFlow
                      value={isMonthly ? plan.price : plan.yearlyPrice}
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      transformTiming={{ duration: 450, easing: "ease-out" }}
                      willChange
                    />
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    / {plan.period}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-6">
                  {isMonthly ? "billed monthly" : "billed annually"}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "h-4 w-4 mt-0.5 flex-shrink-0",
                          plan.isPopular ? "text-blue-500" : "text-green-500"
                        )}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="border-gray-100 mb-6" />

                {/* CTA button */}
                <button
                  onClick={() => handlePlanSelect(plan.name)}
                  disabled={isLoading || isCurrentPlan}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full h-11 text-sm font-semibold transition-all duration-200",
                    "hover:ring-2 hover:ring-blue-500 hover:ring-offset-1",
                    plan.isPopular
                      ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white"
                      : "bg-white text-gray-900 border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300",
                    (isLoading || isCurrentPlan) && "opacity-60 cursor-not-allowed hover:ring-0"
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting…
                    </span>
                  ) : isCurrentPlan ? (
                    "Current Plan"
                  ) : (
                    plan.buttonText
                  )}
                </button>

                {/* Description */}
                <p className="mt-4 text-xs text-center text-gray-400">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
