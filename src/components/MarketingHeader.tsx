"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function MarketingHeader() {
  return (
    <header className="border-b border-[#1A1A1A] bg-[#050505]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/projects" className="group flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">QN Marketing Hub</span>
          <span className="hidden text-xs text-[#888888] sm:inline">marketing.quiknation.com</span>
        </Link>
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "h-9 w-9 ring-1 ring-[#1A1A1A]",
            },
          }}
        />
      </div>
    </header>
  );
}
