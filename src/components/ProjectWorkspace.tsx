"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { ProjectDef } from "@/lib/projects";
import { useMarketingBrief } from "@/lib/use-marketing-brief";
import { useMarketingChat } from "@/lib/use-marketing-chat";
import { AgentChatBubble } from "./AgentChatBubble";
import { AgentPanel } from "./AgentPanel";
import { ClaraChatInput } from "./ClaraChatInput";
import { PaperclipBrief } from "./PaperclipBrief";
import { VoiceStudioLink } from "./VoiceStudioLink";

type ProjectWorkspaceProps = {
  project: ProjectDef;
};

export function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const slug = project.slug;
  const [tab, setTab] = useState<"brief" | "conversation">("brief");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { brief, hydrated: briefHydrated, updateField, appendAiContribution } =
    useMarketingBrief(slug);
  const {
    messages,
    hydrated: chatHydrated,
    addUserMessage,
    addAssistantMessage,
  } = useMarketingChat(slug);

  const handleSend = useCallback(
    async (message: string) => {
      setError(null);
      addUserMessage(message);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            projectSlug: slug,
            agentId: selectedAgentId ?? undefined,
          }),
        });
        const data = (await res.json()) as {
          error?: string;
          agent?: string;
          agentName?: string;
          response?: string;
        };
        if (!res.ok) {
          setError(data.error ?? "Request failed");
          return;
        }
        if (data.response && data.agent && data.agentName) {
          addAssistantMessage(data.response, data.agent, data.agentName);
          setTab("conversation");
        }
      } catch {
        setError("Network error");
      }
    },
    [addAssistantMessage, addUserMessage, selectedAgentId, slug],
  );

  const typeLabel = project.type === "client" ? "Client" : "Internal";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl" aria-hidden>
              {project.emoji}
            </span>
            <h1 className="text-xl font-semibold text-white">{project.name}</h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                project.type === "client"
                  ? "bg-[#F59E0B]/15 text-[#FBBF24]"
                  : "bg-[#7BC8D8]/15 text-[#7BC8D8]"
              }`}
            >
              {typeLabel}
            </span>
          </div>
          <p className="mt-2 text-sm text-[#888888]">
            <Link href="/projects" className="text-[#7BC8D8] hover:underline">
              ← Project Board
            </Link>
            <span className="mx-2 text-[#444444]">/</span>
            <Link href={`/projects/${slug}/brief`} className="text-[#7BC8D8] hover:underline">
              Full brief page
            </Link>
            <span className="mx-2 text-[#444444]">/</span>
            <Link href={`/projects/${slug}/voice`} className="text-[#7BC8D8] hover:underline">
              Voice
            </Link>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <section className="flex min-h-[calc(100vh-12rem)] flex-[7] flex-col lg:min-h-[70vh]">
          <div className="mb-4 flex gap-2 rounded-lg border border-[#1A1A1A] bg-[#0F0F0F] p-1">
            <button
              type="button"
              onClick={() => setTab("brief")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                tab === "brief"
                  ? "bg-[#151515] text-white ring-1 ring-[#7BC8D8]/40"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              Brief
            </button>
            <button
              type="button"
              onClick={() => setTab("conversation")}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                tab === "conversation"
                  ? "bg-[#151515] text-white ring-1 ring-[#7BC8D8]/40"
                  : "text-[#888888] hover:text-white"
              }`}
            >
              Conversation
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-4">
            {tab === "brief" ? (
              <PaperclipBrief
                projectSlug={slug}
                brief={brief}
                hydrated={briefHydrated}
                onFieldChange={updateField}
              />
            ) : (
              <div className="space-y-4 rounded-xl border border-[#1A1A1A] bg-[#151515] p-4">
                <p className="text-sm text-[#888888]">
                  Chat history for this project (stored on this device).
                </p>
                {!chatHydrated ? (
                  <p className="text-sm text-[#888888]">Loading…</p>
                ) : messages.length === 0 ? (
                  <p className="text-sm text-[#888888]">No messages yet. Say hello below.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <AgentChatBubble
                        key={m.id}
                        role={m.role}
                        content={m.content}
                        agentName={m.agentName}
                        onSaveToBrief={
                          m.role === "assistant" && m.agentName
                            ? () =>
                                appendAiContribution(
                                  m.agentName ?? "Agent",
                                  m.content,
                                )
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
            <VoiceStudioLink />
            {error ? (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <ClaraChatInput
            projectSlug={slug}
            selectedAgentId={selectedAgentId}
            onClearAgent={() => setSelectedAgentId(null)}
            onSend={handleSend}
          />
        </section>

        <aside className="flex min-h-[320px] flex-[3] flex-col lg:max-w-md">
          <AgentPanel selectedId={selectedAgentId} onSelectAgent={setSelectedAgentId} />
        </aside>
      </div>
    </div>
  );
}
