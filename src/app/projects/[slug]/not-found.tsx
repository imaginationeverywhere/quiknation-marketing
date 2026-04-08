export const runtime = 'edge';

import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-xl font-semibold text-white">Project not found</h1>
      <p className="mt-2 text-sm text-[#888888]">That workspace does not exist on this hub.</p>
      <Link href="/projects" className="mt-6 inline-block text-sm font-medium text-[#7BC8D8] hover:underline">
        ← Back to Project Board
      </Link>
    </div>
  );
}
