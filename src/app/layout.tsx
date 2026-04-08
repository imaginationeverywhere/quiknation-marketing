import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QN Marketing Hub",
  description: "Quik Nation AI + human marketing workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-[#050505] font-sans text-white">{children}</body>
      </html>
    </ClerkProvider>
  );
}
