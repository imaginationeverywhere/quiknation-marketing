"use client";

import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectBoard() {
  const internal = PROJECTS.filter((p) => p.type === "internal");
  const clients = PROJECTS.filter((p) => p.type === "client");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white">Project Board</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#888888]">
          Open a Heru workspace to collaborate with the AI marketing team on live campaigns.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#888888]">Internal</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {internal.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-[#888888]">
          Clients &amp; Partners
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
