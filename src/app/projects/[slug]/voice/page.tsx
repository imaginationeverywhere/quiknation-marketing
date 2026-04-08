export const runtime = 'edge';

import Link from "next/link";
import { notFound } from "next/navigation";
import { VoiceStudioLink } from "@/components/VoiceStudioLink";
import { getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectVoicePage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm text-[#888888]">
        <Link href="/projects" className="text-[#7BC8D8] hover:underline">
          Project Board
        </Link>
        <span className="mx-2 text-[#444444]">/</span>
        <Link href={`/projects/${slug}`} className="text-[#7BC8D8] hover:underline">
          {project.name}
        </Link>
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-white">Voice Studio</h1>
      <p className="mt-2 text-sm text-[#888888]">
        Talk to the marketing team by voice — opens the Quik Nation voice experience in a new tab.
      </p>
      <div className="mt-8">
        <VoiceStudioLink />
      </div>
    </div>
  );
}
