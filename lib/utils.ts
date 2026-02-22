import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PLAN_LIMITS = {
  free: {
    cardsPerMonth: 50,
    formats: ["qa"],
    inputMethods: ["text", "pdf"],
    quizLimit: 10,
    analytics: false,
    csvExport: false,
    topicGeneration: false,
  },
  pro: {
    cardsPerMonth: 250,
    formats: ["qa", "mcq"],
    inputMethods: ["text", "pdf"],
    quizLimit: Infinity,
    analytics: true,
    csvExport: false,
    topicGeneration: false,
  },
  premium: {
    cardsPerMonth: Infinity,
    formats: ["qa", "mcq"],
    inputMethods: ["text", "pdf", "topic"],
    quizLimit: Infinity,
    analytics: true,
    csvExport: true,
    topicGeneration: true,
  },
} as const;

export type Plan = keyof typeof PLAN_LIMITS;

export function getPlanLimits(plan: string) {
  return PLAN_LIMITS[plan as Plan] ?? PLAN_LIMITS.free;
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
