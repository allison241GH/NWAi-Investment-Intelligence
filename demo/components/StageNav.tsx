"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import dealsData from "@/data/deals.json";
import { Deal, PIPELINE_STAGES, PipelineStage } from "@/types";
import {
  STAGE_STYLES,
  FULL_PIPELINE_PILL,
  stageSlug,
  stageFromSlug,
  totalDealCount,
} from "@/lib/stage-style";
import { isPipelineSection } from "@/components/SectionNav";

const deals = dealsData as Deal[];

function countByStage(stage: PipelineStage): number {
  return deals.filter((d) => d.stage === stage).length;
}

function dealStageFromPath(pathname: string): PipelineStage | null {
  const match = pathname.match(/^\/deals\/(deal-\d+)/);
  if (!match) return null;
  const deal = deals.find((d) => d.id === match[1]);
  return deal?.stage ?? null;
}

export function StageNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Only render inside the Pipeline section. Members / Portfolio / Ecosystem /
  // Orchestrator have no stage axis, so the 7-stage strip would be noise.
  if (!isPipelineSection(pathname)) return null;

  // Active stage = whichever pill should be at full saturation.
  // - On /deals/[id]: the deal's stage
  // - On /pipeline?stage=X: that stage
  // - On /pipeline (no filter) or /: null (full kanban — see allFullSat below)
  const dealStage = dealStageFromPath(pathname);
  const filterStage = stageFromSlug(searchParams.get("stage"));
  const activeStage: PipelineStage | null = dealStage ?? filterStage;

  // Full Pipeline pill is "active" only on /pipeline with no filter.
  const isFullPipeline =
    (pathname === "/pipeline" || pathname === "/") && !filterStage;

  // "All stages at full saturation" mode = unfiltered pipeline view.
  // Otherwise (Deal Detail or filtered pipeline), only the active pill is full.
  const allFullSat = isFullPipeline;

  return (
    <nav
      aria-label="Pipeline stages"
      className="bg-background border-t"
    >
      <div className="px-6 md:px-10 py-2.5">
        <ul className="flex items-center gap-2 overflow-x-auto">
          {/* Full Pipeline view-toggle pill */}
          <li className="shrink-0">
            <Link
              href="/pipeline"
              aria-current={isFullPipeline ? "page" : undefined}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-opacity ${FULL_PIPELINE_PILL} ${
                isFullPipeline ? "" : "opacity-60 hover:opacity-100"
              }`}
            >
              <span className="text-sm font-semibold leading-none">
                Full Pipeline
              </span>
              <span className="text-[11px] font-medium tabular-nums opacity-70 leading-none">
                {totalDealCount(deals)}
              </span>
            </Link>
          </li>

          {/* Subtle vertical divider — view toggle vs. stage filter */}
          <li
            aria-hidden
            className="shrink-0 h-6 w-px bg-border mx-1"
          />

          {/* 7 stage pills */}
          {PIPELINE_STAGES.map((stage) => {
            const count = countByStage(stage);
            const isActive = stage === activeStage;
            const dimmed = !allFullSat && !isActive;
            return (
              <li key={stage} className="shrink-0">
                <Link
                  href={`/pipeline?stage=${stageSlug(stage)}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-opacity ${STAGE_STYLES[stage].pill} ${
                    dimmed ? "opacity-60 hover:opacity-100" : ""
                  }`}
                >
                  <span className="text-sm font-semibold leading-none">
                    {stage}
                  </span>
                  <span className="text-[11px] font-medium tabular-nums opacity-70 leading-none">
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
