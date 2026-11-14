import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, questions, userName } = await request.json();
    const transcript = (messages || [])
      .slice(-12)
      .map((message: { role: string; content: string }) =>
        `${message.role === "user" ? "Candidate" : "Interviewer"}: ${message.content}`
      )
      .join("\n");

    const { text } = await generateText({
      model: openai("gpt-4.1-mini"),
      system: `You are Clutch Prep Interviewer, a professional and encouraging mock job interviewer.
Ask one concise question at a time and wait for the candidate's answer. Never answer for the candidate.
Use the supplied interview questions in order. Ask a short follow-up only when an answer is vague.
If no questions are supplied, first ask for the target role, experience level, and skills, then conduct a tailored mock interview.
Candidate: ${userName || "Candidate"}
Questions: ${(questions || []).join(" | ") || "Not supplied"}`,
      prompt: transcript || "Begin the interview with a friendly greeting and your first question.",
    });

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Interviewer fallback failed:", error);
    return NextResponse.json(
      { error: "The interviewer is temporarily unavailable." },
      { status: 500 }
    );
  }
}
