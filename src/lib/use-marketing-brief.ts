"use client";

import { useCallback, useEffect, useState } from "react";

export type BriefData = {
  campaign: string;
  audience: string;
  keyMessages: string;
  aiContributions: string;
};

const emptyBrief: BriefData = {
  campaign: "",
  audience: "",
  keyMessages: "",
  aiContributions: "",
};

function storageKey(projectSlug: string) {
  return `marketing-brief-${projectSlug}`;
}

export function useMarketingBrief(projectSlug: string) {
  const [brief, setBrief] = useState<BriefData>(emptyBrief);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(projectSlug));
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<BriefData>;
        setBrief({
          campaign: parsed.campaign ?? "",
          audience: parsed.audience ?? "",
          keyMessages: parsed.keyMessages ?? "",
          aiContributions: parsed.aiContributions ?? "",
        });
      } else {
        setBrief(emptyBrief);
      }
    } catch {
      setBrief(emptyBrief);
    }
    setHydrated(true);
  }, [projectSlug]);

  const updateField = useCallback(
    (key: keyof BriefData, value: string) => {
      setBrief((prev) => {
        const next = { ...prev, [key]: value };
        try {
          localStorage.setItem(storageKey(projectSlug), JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [projectSlug],
  );

  const appendAiContribution = useCallback(
    (agentName: string, text: string) => {
      const stamp = new Date().toISOString();
      const line = `[${stamp}] ${agentName}: ${text.trim()}`;
      setBrief((prev) => {
        const block = prev.aiContributions.trim();
        const nextText = block ? `${block}\n\n${line}` : line;
        const next = { ...prev, aiContributions: nextText };
        try {
          localStorage.setItem(storageKey(projectSlug), JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [projectSlug],
  );

  return { brief, hydrated, updateField, appendAiContribution };
}
