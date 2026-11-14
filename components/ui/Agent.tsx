"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [generatedInterviewId, setGeneratedInterviewId] = useState<string | null>(null);
  const [callError, setCallError] = useState<string>("");
  const [fallbackMode, setFallbackMode] = useState(false);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    const onCallStart = () => {
      setCallError("");
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }

      // Handle function-call-result to get interview ID from workflow
      if (message.type === "function-call-result" && type === "generate") {
        try {
          const result = message.functionCallResult?.result as any;
          if (result?.interviewId) {
            console.log("Interview created with ID:", result.interviewId);
            setGeneratedInterviewId(result.interviewId);
          }
        } catch (error) {
          console.error("Error parsing function call result:", error);
        }
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.error("Vapi error:", error);
      setCallError("Voice connection is unavailable, so text interview mode is active.");
      setFallbackMode(true);
      setCallStatus(CallStatus.ACTIVE);
      setMessages((previous) =>
        previous.length
          ? previous
          : [{
              role: "assistant",
              content: questions?.[0] || `Hi ${userName}! What role would you like to practice for today?`,
            }]
      );
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        // If we have a generated interview ID, redirect to it
        if (generatedInterviewId) {
          router.push(`/interview/${generatedInterviewId}`);
        } else {
          // Otherwise, redirect to home (interview might still be processing)
          router.push("/");
        }
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId, generatedInterviewId]);

  const handleCall = async () => {
    setCallError("");
    setCallStatus(CallStatus.CONNECTING);

    try {
      if (type === "generate") {
        await vapi.start(interviewer, {
          variableValues: {
            username: userName,
            questions:
              "Ask the candidate for their target role, experience level, and preferred interview type, then conduct a short tailored mock interview.",
          },
        });
      } else {
        const formattedQuestions = (questions || [])
          .map((question) => `- ${question}`)
          .join("\n");

        await vapi.start(interviewer, {
          variableValues: { username: userName, questions: formattedQuestions },
        });
      }
    } catch (error) {
      console.error("Unable to start Vapi call:", error);
      setCallError("Voice connection is unavailable, so text interview mode is active.");
      setFallbackMode(true);
      setCallStatus(CallStatus.ACTIVE);
      setMessages((previous) =>
        previous.length
          ? previous
          : [{
              role: "assistant",
              content: questions?.[0] || `Hi ${userName}! What role would you like to practice for today?`,
            }]
      );
    }
  };

  const requestFallbackReply = async (nextMessages: SavedMessage[]) => {
    setIsReplying(true);
    try {
      const response = await fetch("/api/interviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, questions, userName }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const reply: SavedMessage = { role: "assistant", content: data.message };
      setMessages((previous) => [...previous, reply]);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.message));
      }
    } catch {
      setCallError("The AI interviewer is temporarily unavailable. Please try again.");
    } finally {
      setIsReplying(false);
    }
  };

  const handleAnswer = async () => {
    const answer = candidateAnswer.trim();
    if (!answer || isReplying) return;
    const userMessage: SavedMessage = { role: "user", content: answer };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setCandidateAnswer("");
    await requestFallbackReply(nextMessages);
  };
  
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {callError && (
        <p role="alert" className="text-center text-red-300 px-4">
          {callError}
        </p>
      )}

      {fallbackMode && callStatus === CallStatus.ACTIVE && (
        <div className="w-full max-w-2xl mx-auto flex gap-2 px-4">
          <input
            value={candidateAnswer}
            onChange={(event) => setCandidateAnswer(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleAnswer()}
            placeholder="Type your answer…"
            aria-label="Your interview answer"
            className="flex-1 rounded-full bg-dark-200 border border-gray-600 px-5 py-3 text-white"
          />
          <button
            onClick={handleAnswer}
            disabled={isReplying || !candidateAnswer.trim()}
            className="btn-primary px-5 disabled:opacity-50"
          >
            {isReplying ? "Thinking…" : "Send"}
          </button>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
