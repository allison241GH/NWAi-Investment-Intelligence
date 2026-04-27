import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import { StageNav } from "@/components/StageNav";
import { SectionNav } from "@/components/SectionNav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NWAi Investment Intelligence — Demo",
  description: "Phase 1 board demo. Demo data — not real deals or members.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense
          fallback={
            <div
              aria-hidden
              className="sticky top-0 z-40 h-24 bg-background/95 border-b"
            />
          }
        >
          {/*
            Unified sticky nav stack. Section nav (5 master sections) sits on
            top; the 7-stage StageNav renders only inside the Pipeline section
            (it returns null elsewhere) so the strip collapses cleanly to a
            single row on /members, /portfolio, /ecosystem, /orchestrator.
          */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
            <SectionNav />
            <StageNav />
          </div>
        </Suspense>
        {children}
        <div
          aria-label="Demo watermark"
          className="fixed bottom-3 right-4 z-50 pointer-events-none select-none text-[11px] font-medium tracking-wide text-muted-foreground/70 bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border/50"
        >
          Demo data — not real deals or members.
        </div>
      </body>
    </html>
  );
}
