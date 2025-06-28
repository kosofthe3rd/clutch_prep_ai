import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function POST(request: Request) {
    console.log("🔹 Step 1: Received request");

    let body;
    try {
        body = await request.json();
        console.log("🔹 Step 2: Parsed request body:", body);
    } catch (e) {
        console.error("❌ Failed to parse JSON:", e);
        return Response.json({ success: false, error: "Invalid JSON" }, { status: 400 });
    }

    const { type, role, level, techstack, amount, userid } = body;
    if (!type || !role || !level || !techstack || !amount || !userid) {
        console.error("❌ Missing required fields");
        return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    let rawQuestions;
    try {
        console.log("🔹 Step 3: Calling AI with prompt");
        const { text } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare questions for a job interview.
The job role is ${role}.
The job experience level is ${level}.
The tech stack used in the job is: ${techstack}.
The focus between behavioural and technical questions should lean towards: ${type}.
The amount of questions required is: ${amount}.
Please return only the questions, without any additional text.
The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
Return the questions formatted like this:
["Question 1", "Question 2", "Question 3"]

Thank you! <3`,
        });

        rawQuestions = text;
        console.log("🔹 Step 4: Received AI response:", rawQuestions);
    } catch (err) {
        console.error("❌ AI generation failed:", err);
        return Response.json({ success: false, error: "AI generation failed" }, { status: 500 });
    }

    let parsedQuestions;
    try {
        parsedQuestions = JSON.parse(rawQuestions);
        if (!Array.isArray(parsedQuestions)) throw new Error("Not an array");
        console.log("🔹 Step 5: Parsed AI response into array");
    } catch (err) {
        console.error("❌ JSON parsing of questions failed:", rawQuestions);
        return Response.json({ success: false, error: "Invalid AI response format" }, { status: 500 });
    }

    const interview = {
        role,
        type,
        level,
        techstack: techstack ? techstack.split(",").map(s => s.trim()) : [],
        questions: parsedQuestions,
        userId: userid,
        finalized: true,
        coverImage: getRandomInterviewCover(),
        createdAt: new Date().toISOString(),
    };

    try {
        console.log("🔹 Step 6: Writing to Firestore:", interview);
        await db.collection("interviews").add(interview);
        console.log("✅ Step 7: Firestore write successful");
        return Response.json({ success: true }, { status: 200 });
    } catch (dbError) {
        console.error("❌ Firestore error:", dbError);
        return Response.json({ success: false, error: "Database write failed" }, { status: 500 });
    }
}
