"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
    PROCESSING = "PROCESSING",
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
    const hasProcessedFeedback = useRef(false);

    useEffect(() => {
        const onCallStart = () => {
            console.log("Call started");
            setCallStatus(CallStatus.ACTIVE);
            hasProcessedFeedback.current = false;
        };

        const onCallEnd = () => {
            console.log("Call ended");
            setCallStatus(CallStatus.FINISHED);
        };

        const onMessage = (message: Message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = { role: message.role, content: message.transcript };
                console.log("New message:", newMessage);
                setMessages((prev) => [...prev, newMessage]);
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
            console.log("Error:", error);
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

    // Update last message when messages change
    useEffect(() => {
        if (messages.length > 0) {
            setLastMessage(messages[messages.length - 1].content);
        }
    }, [messages]);

    // Handle call end - separate effect with proper dependencies
    useEffect(() => {
        const handleGenerateFeedback = async (messages: SavedMessage[]) => {
            if (hasProcessedFeedback.current) {
                console.log("Feedback already processed, skipping...");
                return;
            }

            hasProcessedFeedback.current = true;
            
            console.log("Starting feedback generation...");
            console.log("Messages to process:", messages.length);
            
            setCallStatus(CallStatus.PROCESSING);

            try {
                const { success, feedbackId: id } = await createFeedback({
                    interviewId: interviewId!,
                    userId: userId!,
                    transcript: messages,
                    feedbackId,
                });

                console.log("Feedback result:", { success, id });

                if (success && id) {
                    console.log("Redirecting to feedback page...");
                    router.push(`/interview/${interviewId}/feedback`);
                } else {
                    console.log("Error saving feedback");
                    router.push("/");
                }
            } catch (error) {
                console.log("Exception in handleGenerateFeedback:", error);
                router.push("/");
            }
        };

        if (callStatus === CallStatus.FINISHED && !hasProcessedFeedback.current) {
            console.log("Processing finished call, type:", type);
            
            if (type === "generate") {
                console.log("Generate type, redirecting to home");
                router.push("/");
            } else {
                if (messages.length > 0) {
                    console.log("Processing interview feedback");
                    handleGenerateFeedback(messages);
                } else {
                    console.warn("No messages to generate feedback from");
                    router.push("/");
                }
            }
        }
    }, [callStatus]); // Only depend on callStatus

    const handleCall = async () => {
        console.log("Starting call...");
        setCallStatus(CallStatus.CONNECTING);
        setMessages([]);
        hasProcessedFeedback.current = false;

        try {
            if (type === "generate") {
                await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                    variableValues: {
                        username: userName,
                        userid: userId,
                    },
                });
            } else {
                let formattedQuestions = "";
                if (questions) {
                    formattedQuestions = questions
                        .map((question) => `- ${question}`)
                        .join("\n");
                }

                await vapi.start(interviewer, {
                    variableValues: {
                        questions: formattedQuestions,
                    },
                });
            }
        } catch (error) {
            console.error("Error starting call:", error);
            setCallStatus(CallStatus.INACTIVE);
        }
    };

    const handleDisconnect = () => {
        console.log("Disconnect button clicked");
        vapi.stop();
        // Don't set status here - let the onCallEnd event handle it
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

            <div className="w-full flex justify-center">
                {callStatus === CallStatus.PROCESSING ? (
                    <button className="btn-call opacity-50" disabled>
                        <span>Generating Feedback...</span>
                    </button>
                ) : callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call" onClick={handleCall} disabled={callStatus === CallStatus.CONNECTING}>
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
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;