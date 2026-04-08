"use client";

import type { BriefData } from "@/lib/use-marketing-brief";
import { BriefSection } from "./BriefSection";

type PaperclipBriefProps = {
  projectSlug: string;
  brief: BriefData;
  hydrated: boolean;
  onFieldChange: (key: keyof BriefData, value: string) => void;
};

export function PaperclipBrief({
  projectSlug,
  brief,
  hydrated,
  onFieldChange,
}: PaperclipBriefProps) {
  if (!hydrated) {
    return (
      <div className="animate-pulse space-y-4 rounded-xl border border-[#1A1A1A] bg-[#151515] p-6">
        <div className="h-4 w-1/3 rounded bg-[#1A1A1A]" />
        <div className="h-24 rounded bg-[#0F0F0F]" />
        <div className="h-24 rounded bg-[#0F0F0F]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border border-[#1A1A1A] bg-[#151515] p-6">
      <div className="flex flex-col gap-1 border-b border-[#1A1A1A] pb-4">
        <p className="text-xs uppercase tracking-wide text-[#888888]">Paperclip</p>
        <h2 className="text-lg font-semibold text-white">Living brief</h2>
        <p className="text-sm text-[#888888]">
          Shared context for {projectSlug.replace(/-/g, " ")} — saves on blur on this device.
        </p>
      </div>

      <BriefSection
        title="Campaign Brief"
        description="What are we trying to achieve?"
        value={brief.campaign}
        onChange={(v) => onFieldChange("campaign", v)}
        onBlur={() => undefined}
      />
      <BriefSection
        title="Target Audience"
        description="Who are we talking to?"
        value={brief.audience}
        onChange={(v) => onFieldChange("audience", v)}
      />
      <BriefSection
        title="Key Messages"
        description="What do we need them to feel, know, or do?"
        value={brief.keyMessages}
        onChange={(v) => onFieldChange("keyMessages", v)}
      />
      <BriefSection
        title="AI Contributions"
        description="What the agents have suggested (timestamped)"
        value={brief.aiContributions}
        onChange={() => undefined}
        readOnly
      />
    </div>
  );
}
