import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconFileUpload,
  IconSchool,
  IconChartBar,
  IconCards,
  IconFileExport,
  IconLock,
  IconCreditCard,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "AI Flashcard Generation",
      description:
        "Paste your notes or any text and our AI instantly transforms them into perfectly structured flashcard sets ready to study.",
      icon: <IconBrain />,
    },
    {
      title: "PDF Upload Support",
      description:
        "Upload lecture slides, textbook chapters, or research papers — KognitDeck extracts and converts the content into study cards.",
      icon: <IconFileUpload />,
    },
    {
      title: "Quiz & Study Mode",
      description:
        "Interactive study sessions with flip animations for Q&A cards and instant feedback for multiple-choice questions.",
      icon: <IconSchool />,
    },
    {
      title: "Progress Analytics",
      description:
        "Track your accuracy, study streaks, and performance over time with beautiful charts and actionable insights.",
      icon: <IconChartBar />,
    },
    {
      title: "Multiple Formats",
      description:
        "Generate classic front/back Q&A flashcards or multiple-choice questions with four options and one correct answer.",
      icon: <IconCards />,
    },
    {
      title: "Export to CSV",
      description:
        "Download your flashcard sets as CSV files to import into Anki, Quizlet, or any other study tool you prefer.",
      icon: <IconFileExport />,
    },
    {
      title: "Secure Authentication",
      description:
        "Sign in securely with Google OAuth or create an account with email and password. Your data is always protected.",
      icon: <IconLock />,
    },
    {
      title: "3 Flexible Plans",
      description:
        "Free plan to get started, Pro for serious students, and Premium for power users with unlimited cards and all features.",
      icon: <IconCreditCard />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-200",
        (index === 0 || index === 4) && "lg:border-l border-neutral-200",
        index < 4 && "lg:border-b border-neutral-200"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-blue-600">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-200 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-500 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
