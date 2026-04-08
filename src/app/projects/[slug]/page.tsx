export const runtime = 'edge';

import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { ProjectWorkspace } from "@/components/ProjectWorkspace";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectWorkspacePage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return <ProjectWorkspace project={project} />;
}
