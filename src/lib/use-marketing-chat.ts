"use client";

import { useCallback, useEffect, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  agentId?: string;
  agentName?: string;
  createdAt: number;
};

function storageKey(projectSlug: string) {
  return `marketing-chat-${projectSlug}`;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useMarketingChat(projectSlug: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(projectSlug));
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } else {
        setMessages([]);
      }
    } catch {
      setMessages([]);
    }
    setHydrated(true);
  }, [projectSlug]);

  const persist = useCallback(
    (next: ChatMessage[]) => {
      setMessages(next);
      try {
        localStorage.setItem(storageKey(projectSlug), JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [projectSlug],
  );

  const addUserMessage = useCallback((content: string) => {
    const msg: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      createdAt: Date.now(),
    };
    setMessages((prev) => {
      const next = [...prev, msg];
      try {
        localStorage.setItem(storageKey(projectSlug), JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    return msg;
  }, [projectSlug]);

  const addAssistantMessage = useCallback(
    (content: string, agentId: string, agentName: string) => {
      const msg: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content,
        agentId,
        agentName,
        createdAt: Date.now(),
      };
      setMessages((prev) => {
        const next = [...prev, msg];
        try {
          localStorage.setItem(storageKey(projectSlug), JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
      return msg;
    },
    [projectSlug],
  );

  return {
    messages,
    hydrated,
    addUserMessage,
    addAssistantMessage,
    setMessages: persist,
  };
}

