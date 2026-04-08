export const runtime = 'edge';

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center">
      <h1 className="text-2xl font-semibold text-white">404 — Page not found</h1>
      <p className="mt-2 text-sm text-[#888888]">This page does not exist on the Marketing Hub.</p>
      <Link href="/projects" className="mt-6 inline-block text-sm font-medium text-[#7BC8D8] hover:underline">
        ← Back to Project Board
      </Link>
    </div>
  );
}
