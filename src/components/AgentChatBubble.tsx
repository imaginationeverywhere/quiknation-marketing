"use client";

import { User } from "lucide-react";

type AgentChatBubbleProps = {
  role: "user" | "assistant";
  content: string;
  agentName?: string;
  onSaveToBrief?: () => void;
};

export function AgentChatBubble({
  role,
  content,
  agentName,
  onSaveToBrief,
}: AgentChatBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0F0F0F] text-xs font-semibold text-[#7BC8D8] ring-1 ring-[#1A1A1A]"
          title={agentName ? `${agentName}` : "Agent"}
        >
          <User className="h-4 w-4" aria-hidden />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-[#7BC8D8]/20 text-white ring-1 ring-[#7BC8D8]/30"
            : "bg-[#151515] text-[#EEEEEE] ring-1 ring-[#1A1A1A]"
        }`}
      >
        {!isUser && agentName && (
          <p className="mb-1 text-xs font-semibold text-[#7BC8D8]">{agentName}</p>
        )}
        <p className="whitespace-pre-wrap">{content}</p>
        {!isUser && onSaveToBrief ? (
          <button
            type="button"
            onClick={onSaveToBrief}
            className="mt-3 text-xs font-medium text-[#7BC8D8] underline-offset-2 hover:underline"
          >
            Save to Brief
          </button>
        ) : null}
      </div>
    </div>
  );
}
