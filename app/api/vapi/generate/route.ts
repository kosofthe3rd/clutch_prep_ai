import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
} 

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userId } = await request.json();

    // Validate required fields
    if (!type || !role || !level || !techstack || !amount || !userId) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const questionCount = Math.min(Math.max(Number(amount) || 5, 1), 20);
    const { object } = await generateObject({
      model: openai("gpt-4.1"),
      schema: z.object({
        questions: z.array(z.string()).min(1).max(20),
      }),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${questionCount}.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return exactly ${questionCount} concise questions.
    `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions: object.questions,
      userId: userId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    const interviewRef = await db.collection("interviews").add(interview);

    return Response.json({ success: true, interviewId: interviewRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating interview:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
