"use client";

import { ExternalLink, Mic } from "lucide-react";

const VOICE_URL =
  process.env.NEXT_PUBLIC_QN_VOICE_URL ?? "https://develop.quiknation.com/voice";

export function VoiceStudioLink() {
  return (
    <a
      href={VOICE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-[#1A1A1A] bg-[#151515] p-5 transition hover:border-[#7BC8D8]/50"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0F0F0F] text-2xl ring-1 ring-[#1A1A1A]">
        <Mic className="h-6 w-6 text-[#7BC8D8]" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-white">Voice Studio</p>
        <p className="text-sm text-[#888888]">Talk to the marketing team by voice.</p>
        <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#7BC8D8]">
          Open Voice Studio
          <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" aria-hidden />
        </p>
      </div>
    </a>
  );
}
