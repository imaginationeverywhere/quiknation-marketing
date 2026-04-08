"use client";

import Link from "next/link";
import type { ProjectDef } from "@/lib/projects";

type ProjectCardProps = {
  project: ProjectDef;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isClient = project.type === "client";
  const borderColor = isClient ? "#F59E0B" : project.color;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block rounded-xl border bg-[#151515] p-5 transition hover:bg-[#1a1a1a]"
      style={{ borderColor }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden>
            {project.emoji}
          </span>
          <div>
            <h2 className="text-base font-semibold text-white">{project.name}</h2>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                isClient ? "bg-[#F59E0B]/15 text-[#FBBF24]" : "bg-[#7BC8D8]/15 text-[#7BC8D8]"
              }`}
            >
              {isClient ? "Client" : "Internal"}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#888888]">Last activity: Today</p>
      <p className="mt-3 text-sm font-medium text-[#7BC8D8] opacity-0 transition group-hover:opacity-100">
        Open workspace →
      </p>
    </Link>
  );
}
