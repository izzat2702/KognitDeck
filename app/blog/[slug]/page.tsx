import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

interface BlogPostPageProps {
  params: { slug: string };
}

function SpacedRepetitionPost() {
  return (
    <article className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is the Forgetting Curve?</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        In 1885, German psychologist Hermann Ebbinghaus conducted a series of experiments on himself,
        memorising lists of nonsense syllables and tracking how quickly he forgot them. His findings
        produced the forgetting curve: a mathematical model showing that memory retention drops
        steeply in the hours and days after learning, then levels off over time. Without any review,
        roughly 50 percent of new information is forgotten within an hour, and up to 90 percent
        within a week.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        This sounds discouraging, but Ebbinghaus also discovered the solution: each time you
        successfully recall a piece of information, the forgetting curve resets — and it resets at a
        shallower slope. In other words, reviewing material makes it stick longer and longer with
        each subsequent review. This is the foundation of spaced repetition.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Spaced Repetition Works</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Spaced repetition systems (SRS) schedule reviews algorithmically. When you answer a
        flashcard correctly, the algorithm pushes the next review further into the future — perhaps
        in three days, then a week, then a month. When you answer incorrectly, the interval resets
        to a shorter period. The result is that you spend most of your review time on the cards you
        find hardest, and almost no time re-reviewing material you already know well.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Modern SRS implementations like SM-2 (the algorithm behind Anki and many other tools)
        calculate intervals based on your self-reported confidence rating. KognitDeck uses a
        neural-network-enhanced variant that also considers your historical performance patterns and
        time-of-day factors to optimise scheduling even further.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Flashcards Are the Perfect Vehicle</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Flashcards enforce active recall — the process of retrieving information from memory rather
        than passively re-reading it. Research consistently shows active recall is far more effective
        than passive review. A 2011 study published in Science found that students who used retrieval
        practice (i.e., testing themselves) retained 50 percent more information one week later than
        students who simply re-studied the same material.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        The combination of active recall and spaced repetition is particularly powerful. Key
        benefits include:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Significantly less total study time to achieve the same retention level</li>
        <li>Longer-lasting memories that do not fade after the exam</li>
        <li>Better performance under pressure due to more reliable retrieval pathways</li>
        <li>Reduced cognitive load per session, making daily study feel manageable</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Get Started with KognitDeck</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        KognitDeck combines AI-generated flashcards with a built-in spaced repetition engine. Upload
        your lecture notes, textbook chapters, or any study material, and the AI will extract key
        concepts and create question-answer pairs automatically. The review scheduler then tracks
        your performance and surfaces the right cards at the right time.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Start with a small deck of 20 to 30 cards and commit to a daily review session of just 10
        minutes. Within two weeks, you will notice a measurable improvement in recall speed and
        confidence. The science is clear: consistent, spaced practice beats marathon study sessions
        every single time.
      </p>
    </article>
  );
}

function AiInEducationPost() {
  return (
    <article className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Personalised Learning Paths</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        AI platforms now analyse a student's performance across thousands of data points to generate
        a unique learning path. Instead of following a fixed curriculum, students are guided through
        content at a pace and order that matches their existing knowledge gaps. Platforms like
        KognitDeck use this data to surface the most valuable flashcard decks for each individual.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Instant Feedback and Assessment</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Traditional assessment cycles — submit an essay, wait two weeks for a grade — are being
        replaced by real-time feedback loops. AI can now evaluate open-ended responses, identify
        misconceptions, and suggest targeted resources within seconds of submission. Students no
        longer have to wait to find out where they went wrong.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Automated Content Generation</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Perhaps the most visible change in 2026 is the rise of AI-generated study materials.
        Students and teachers can now transform raw source material — lecture slides, textbooks,
        research papers — into comprehensive flashcard decks, practice quizzes, and summaries in
        under a minute. KognitDeck processes uploaded PDFs and returns a full, review-ready deck with
        no manual effort required.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Accessibility and Language Support</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        AI translation and text-to-speech have dramatically lowered the barrier for non-native
        speakers and students with learning differences. Study materials can be translated into
        dozens of languages instantly, and audio narration is available for all card content. This
        levels the playing field in a way that was impossible five years ago.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Intelligent Tutoring Systems</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        AI tutors are now capable of sustained, pedagogically sound conversations with students.
        They can explain concepts from multiple angles, identify the root cause of a misconception,
        and adapt their explanation based on the student's response. Early studies suggest AI
        tutoring delivers learning outcomes comparable to one-on-one human tutoring.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Looking Ahead</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        The remaining five transformations — collaborative AI workspaces, predictive dropout
        detection, automated curriculum alignment, multimodal learning tools, and AI-powered
        teacher support — are each reshaping a different layer of the educational system. The
        common thread is a shift from one-size-fits-all instruction to deeply personalised,
        data-driven learning experiences. 2026 is not the beginning of this shift; it is the year
        it becomes mainstream.
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>AI-powered writing assistants that teach rather than write for students</li>
        <li>Predictive analytics that flag at-risk students weeks before they disengage</li>
        <li>Multimodal content that adapts format (text, audio, video) to learner preference</li>
        <li>Automated curriculum mapping that aligns decks to official exam objectives</li>
        <li>Real-time collaboration tools that pair learners based on complementary strengths</li>
      </ul>
    </article>
  );
}

function StudySmartGuidePost() {
  return (
    <article className="prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Problem with Re-Reading</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        When most students sit down to study, they open their notes and read through them — once,
        twice, sometimes three times. This feels productive. The material looks familiar. Confidence
        grows. But familiarity is not the same as recall. When exam day arrives and no prompts are
        available, that familiar material is often impossible to retrieve.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        Cognitive psychologists call this the fluency illusion: passive re-reading creates a false
        sense of mastery. The solution is to replace passive study with active retrieval — forcing
        yourself to recall information without looking at your notes. This is uncomfortable at first,
        but the discomfort is a sign that genuine learning is occurring.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technique 1: Active Recall with Flashcards</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Flashcards are the simplest active recall tool. Each card poses a question; you attempt to
        answer from memory before flipping to check. The key is to actually attempt the recall —
        not to flip the card after two seconds because the answer feels familiar. Sit with the
        question, retrieve as much as you can, then evaluate your answer honestly.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        KognitDeck generates flashcard decks from your own notes, so the questions are directly
        relevant to your syllabus. The built-in spaced repetition algorithm then schedules your
        reviews optimally, so you never waste time on cards you already know well.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technique 2: Interleaved Practice</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Most students study one topic at a time: an hour of biology, then an hour of history, then
        an hour of maths. Research shows that mixing topics within a single session — interleaving —
        produces better long-term retention, even though it feels harder in the moment. Difficulty
        is not a sign that the technique is failing; it is a sign that the brain is working harder
        to retrieve and organise information.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technique 3: The Pomodoro Technique</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Sustained concentration is finite. The Pomodoro technique structures study into 25-minute
        focused sprints separated by 5-minute breaks. After four cycles, take a longer break of 15
        to 30 minutes. This approach prevents the diminishing returns that come with long,
        uninterrupted sessions and keeps motivation high across an entire study day.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Putting It All Together</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        A practical study routine combining all three techniques looks like this:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>Start each session with a 10-minute spaced repetition review in KognitDeck</li>
        <li>Use Pomodoro timers to structure the rest of your session into focused sprints</li>
        <li>Interleave two or three subjects within each sprint rather than blocking by topic</li>
        <li>End every session by writing a brief summary from memory — no notes allowed</li>
        <li>Review that summary the following morning before opening any study material</li>
      </ul>
      <p className="text-gray-700 leading-relaxed mb-4">
        Students who adopt this system typically report the same or better exam results with 30 to
        40 percent less total study time. The key is consistency: short daily sessions outperform
        occasional marathon sessions every time.
      </p>
    </article>
  );
}

const postMeta: Record<
  string,
  { title: string; date: string; category: string; categoryColor: string; component: React.ReactNode }
> = {
  "spaced-repetition": {
    title: "The Science of Spaced Repetition: Why Flashcards Work",
    date: "January 15, 2026",
    category: "Study Science",
    categoryColor: "bg-green-100 text-green-700",
    component: <SpacedRepetitionPost />,
  },
  "ai-in-education": {
    title: "10 Ways AI is Transforming Education in 2026",
    date: "February 3, 2026",
    category: "AI & EdTech",
    categoryColor: "bg-purple-100 text-purple-700",
    component: <AiInEducationPost />,
  },
  "study-smarter-guide": {
    title: "How to Study Smarter: A Student's Complete Guide",
    date: "February 18, 2026",
    category: "Study Tips",
    categoryColor: "bg-blue-100 text-blue-700",
    component: <StudySmartGuidePost />,
  },
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = postMeta[params.slug];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-24 px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 — Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <Badge className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${post.categoryColor}`}>
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="border-b border-gray-100 mb-8" />

          {post.component}

          <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">Ready to put this into practice?</p>
              <p className="text-sm text-gray-500">Generate your first flashcard deck in under 60 seconds.</p>
            </div>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
