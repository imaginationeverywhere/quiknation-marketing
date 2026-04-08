import { MarketingHeader } from "@/components/MarketingHeader";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <MarketingHeader />
      {children}
    </div>
  );
}
