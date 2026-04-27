"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Top-level section nav per Session 3 Brief Q5: a thin strip above the 7-stage
// pill bar. Five master sections — Pipeline · Members · Portfolio · Ecosystem ·
// Orchestrator. Pipeline is the default landing area; the 7-stage StageNav
// only renders inside the Pipeline section.

interface Section {
  label: string;
  href: string;
  // Pathname prefixes that mark this section as active. The first prefix is
  // the canonical entry route (used as `href`); additional prefixes catch
  // detail/sub-routes (e.g. /deals/* belongs to Pipeline).
  matchPrefixes: string[];
}

const SECTIONS: Section[] = [
  { label: "Pipeline", href: "/pipeline", matchPrefixes: ["/pipeline", "/deals", "/"] },
  { label: "Members", href: "/members", matchPrefixes: ["/members"] },
  { label: "Portfolio", href: "/portfolio", matchPrefixes: ["/portfolio"] },
  { label: "Ecosystem", href: "/ecosystem", matchPrefixes: ["/ecosystem"] },
  { label: "Orchestrator", href: "/orchestrator", matchPrefixes: ["/orchestrator"] },
];

function isSectionActive(section: Section, pathname: string): boolean {
  return section.matchPrefixes.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

export function SectionNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Workspace sections"
      className="bg-background"
    >
      <div className="px-6 md:px-10 pt-3 pb-2">
        <ul className="flex items-center gap-1 overflow-x-auto">
          {SECTIONS.map((section) => {
            const active = isSectionActive(section, pathname);
            return (
              <li key={section.href} className="shrink-0">
                <Link
                  href={section.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

// Helper exported so StageNav can decide whether to render. Keep route
// membership in one place to avoid drift.
export function isPipelineSection(pathname: string): boolean {
  return SECTIONS[0].matchPrefixes.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname === prefix || pathname.startsWith(prefix + "/")
  );
}
