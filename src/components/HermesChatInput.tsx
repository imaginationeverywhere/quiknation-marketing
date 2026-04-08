"use client";

import { Loader2, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { AGENT_DISPLAY_NAMES } from "@/lib/agents";

type HermesChatInputProps = {
  projectSlug: string;
  selectedAgentId: string | null;
  onClearAgent: () => void;
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
};

export function HermesChatInput({
  projectSlug,
  selectedAgentId,
  onClearAgent,
  onSend,
  disabled,
}: HermesChatInputProps) {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);

  const submit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || sending || disabled) return;
    setSending(true);
    setValue("");
    try {
      await onSend(trimmed);
    } finally {
      setSending(false);
    }
  }, [value, sending, disabled, onSend]);

  const routingLabel = selectedAgentId
    ? `Direct: ${AGENT_DISPLAY_NAMES[selectedAgentId] ?? selectedAgentId}`
    : "Hermes routing (auto)";

  return (
    <div className="border-t border-[#1A1A1A] bg-[#050505] pt-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#888888]">
        <span>
          Project: <span className="text-[#AAAAAA]">{projectSlug}</span>
        </span>
        <span className="flex items-center gap-2">
          <span>{routingLabel}</span>
          {selectedAgentId ? (
            <button
              type="button"
              onClick={onClearAgent}
              className="text-[#7BC8D8] hover:underline"
            >
              Use Hermes
            </button>
          ) : null}
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void submit();
            }
          }}
          disabled={disabled || sending}
          placeholder="Message the team… (Enter to send)"
          className="min-w-0 flex-1 rounded-lg border border-[#1A1A1A] bg-[#0F0F0F] px-4 py-3 text-sm text-white placeholder:text-[#555555] focus:border-[#7BC8D8] focus:outline-none focus:ring-1 focus:ring-[#7BC8D8] disabled:opacity-50"
        />
        <button
          type="button"
          onClick={() => void submit()}
          disabled={disabled || sending || !value.trim()}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#7BC8D8] px-4 py-3 text-sm font-medium text-[#050505] transition hover:bg-[#6ab8c8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </button>
      </div>
    </div>
  );
}
