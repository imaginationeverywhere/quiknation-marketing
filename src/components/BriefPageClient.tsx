"use client";

import { useMarketingBrief } from "@/lib/use-marketing-brief";
import { PaperclipBrief } from "./PaperclipBrief";

type BriefPageClientProps = {
  projectSlug: string;
};

export function BriefPageClient({ projectSlug }: BriefPageClientProps) {
  const { brief, hydrated, updateField } = useMarketingBrief(projectSlug);
  return (
    <PaperclipBrief
      projectSlug={projectSlug}
      brief={brief}
      hydrated={hydrated}
      onFieldChange={updateField}
    />
  );
}
