"use client";

import { AGENTS } from "@/lib/agents";

type AgentPanelProps = {
  selectedId: string | null;
  onSelectAgent: (id: string) => void;
};

export function AgentPanel({ selectedId, onSelectAgent }: AgentPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-[#1A1A1A] bg-[#151515]">
      <div className="border-b border-[#1A1A1A] px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-[#888888]">Agents</p>
        <p className="text-sm font-medium text-white">Marketing team</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {AGENTS.map((agent) => {
            const active = selectedId === agent.id;
            return (
              <li key={agent.id}>
                <button
                  type="button"
                  onClick={() => onSelectAgent(agent.id)}
                  title={`${agent.name} — ${agent.role}`}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    active
                      ? "bg-[#7BC8D8]/15 ring-1 ring-[#7BC8D8]/40"
                      : "hover:bg-[#0F0F0F]"
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0F0F0F] text-xs font-semibold text-[#7BC8D8] ring-1 ring-[#1A1A1A]">
                    {agent.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-white">{agent.name}</span>
                    <span className="block truncate text-xs text-[#888888]">{agent.role}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
