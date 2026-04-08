export type AgentDef = {
  id: string;
  initials: string;
  name: string;
  role: string;
};

export const AGENTS: AgentDef[] = [
  { id: "vince", initials: "V", name: "Vince", role: "Copy + Targeted Ads" },
  { id: "barbara", initials: "B", name: "Barbara", role: "Brand Strategy" },
  { id: "eunice", initials: "E", name: "Eunice", role: "Experiential + Content" },
  { id: "moss", initials: "M", name: "Moss", role: "PR + B2B Partnerships" },
  { id: "don", initials: "D", name: "Don", role: "Cultural Marketing + Media" },
  { id: "melvin", initials: "Mv", name: "Melvin", role: "Short-Form Video" },
  { id: "gil", initials: "G", name: "Gil", role: "Long-Form Video + Audio" },
  { id: "ethel", initials: "Et", name: "Ethel", role: "Community + Conversations" },
  { id: "romare", initials: "R", name: "Romare", role: "Visual Brand + Discovery" },
  { id: "claude-b", initials: "Cb", name: "Claude B.", role: "B2B + Owned Audience" },
  { id: "dick", initials: "Dk", name: "Dick", role: "Live Streaming + Platforms" },
];

export const AGENT_DISPLAY_NAMES: Record<string, string> = {
  vince: "Vince",
  barbara: "Barbara",
  eunice: "Eunice",
  moss: "Moss",
  don: "Don",
  melvin: "Melvin",
  gil: "Gil",
  ethel: "Ethel",
  romare: "Romare",
  "claude-b": "Claude B.",
  dick: "Dick",
};
