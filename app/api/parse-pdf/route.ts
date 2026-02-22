import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PDFParse } from "pdf-parse";

// Tell Vercel this function may use up to 9 s (free plan hard-limit is 10 s).
export const maxDuration = 9;

const TIMEOUT_MS = 8_000;  // 8 s — leaves a 1 s buffer before Vercel cuts the function
const MAX_PAGES = 10;      // first 10 pages is the main speed lever (pdfjs renders per-page)
const MAX_WORDS = 5_000;   // 5k words is plenty for flashcard generation

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "File must be a PDF." }, { status: 400 });
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum size is 10 MB." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const parser = new PDFParse({ data: buffer });

  let timedOut = false;

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => {
      timedOut = true;
      reject(new Error("timeout"));
    }, TIMEOUT_MS)
  );

  let result: Awaited<ReturnType<typeof parser.getText>>;
  try {
    // getText({ first: MAX_PAGES }) only processes pages 1–MAX_PAGES,
    // skipping the rest of the document entirely — the main speed-up.
    result = await Promise.race([
      parser.getText({ first: MAX_PAGES }),
      timeoutPromise,
    ]);
  } catch (err: unknown) {
    await parser.destroy().catch(() => {});
    if (timedOut) {
      return NextResponse.json(
        {
          error:
            "PDF parsing timed out after 15 seconds. Try a smaller file, or copy-paste the text directly into the Text tab.",
        },
        { status: 408 }
      );
    }
    throw err;
  }

  await parser.destroy().catch(() => {});

  let text = result.text?.trim() ?? "";

  if (!text) {
    return NextResponse.json(
      {
        error:
          "Could not extract text from this PDF. It may be a scanned image or password-protected.",
      },
      { status: 422 }
    );
  }

  // Truncate to MAX_WORDS — more than enough context for flashcard generation
  const words = text.split(/\s+/);
  const wasTruncated = words.length > MAX_WORDS;
  if (wasTruncated) {
    text = words.slice(0, MAX_WORDS).join(" ");
  }

  return NextResponse.json({
    text,
    pages: result.total,
    truncated: wasTruncated,
    parsedPages: Math.min(result.total, MAX_PAGES),
  });
}
