import Link from "next/link";
import { notFound } from "next/navigation";
import { BriefPageClient } from "@/components/BriefPageClient";
import { getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectBriefPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm text-[#888888]">
        <Link href="/projects" className="text-[#7BC8D8] hover:underline">
          Project Board
        </Link>
        <span className="mx-2 text-[#444444]">/</span>
        <Link href={`/projects/${slug}`} className="text-[#7BC8D8] hover:underline">
          {project.name}
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-white">Paperclip brief</h1>
      <p className="mt-2 text-sm text-[#888888]">
        Same living brief as the workspace — stored locally per project.
      </p>
      <div className="mt-8">
        <BriefPageClient projectSlug={slug} />
      </div>
    </div>
  );
}
