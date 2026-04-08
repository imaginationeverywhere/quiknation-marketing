export type ProjectType = "internal" | "client";

export type ProjectDef = {
  slug: string;
  name: string;
  type: ProjectType;
  color: string;
  emoji: string;
};

export const PROJECTS: ProjectDef[] = [
  { slug: "quik-nation", name: "Quik Nation", type: "internal", color: "#7BC8D8", emoji: "⚡" },
  { slug: "site-962", name: "Site 962", type: "internal", color: "#A78BFA", emoji: "🎵" },
  { slug: "quik-carry", name: "QuikCarry", type: "internal", color: "#34D399", emoji: "🚗" },
  { slug: "wcr", name: "World Cup Ready", type: "client", color: "#F59E0B", emoji: "⚽" },
  { slug: "fmo", name: "FMO", type: "client", color: "#60A5FA", emoji: "🏥" },
  { slug: "kls", name: "Kings Luxury Services", type: "client", color: "#C084FC", emoji: "👑" },
  { slug: "trackit", name: "TrackIt", type: "client", color: "#FB923C", emoji: "📋" },
];

export function getProjectBySlug(slug: string): ProjectDef | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
