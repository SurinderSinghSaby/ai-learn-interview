import React from "react";
import Image from "next/image";

type AgentProps = {
    userName: string;
};

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
    const isSpeaking = true;
    const classStatus: CallStatus = CallStatus.FINISHED;

    const messages: string[] = [
        "What's your name?",
        "My name is Dummy, nice to meet you!",
    ];
    const lastMessage = messages[messages.length - 1];

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/ai-avatar.png"
                            alt="AI interviewer avatar"
                            width={65}
                            height={54}
                            className="object-cover"
                        />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="user avatar"
                            width={120}
                            height={120}
                            className="rounded-full object-cover"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p className="transition-opacity duration-500 animate-fadeIn">
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {classStatus !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call">
                        <span className="absolute animate-ping rounded-full opacity-75" aria-hidden />
                        <span>
              {classStatus === CallStatus.INACTIVE || classStatus === CallStatus.FINISHED
                  ? "Call"
                  : "..."}
            </span>
                    </button>
                ) : (
                    <button className="btn-disconnect">End</button>
                )}
            </div>
        </>
    );
};

export default Agent;
