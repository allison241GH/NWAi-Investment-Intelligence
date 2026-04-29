// Stage color palette per Session 2 Brief #1.
// Tailwind v4 default color tokens (mid-shade hues), tuned for WCAG AA contrast.
// All class names are full literals so the JIT scanner picks them up.

import type { PipelineStage } from "@/types";

export interface StageStyle {
  bar: string; // column-header band — bg only
  badge: string; // stage badge on cards / Detail header — bg + text, full sat
  pill: string; // sticky-nav pill — full color shape; opacity controlled externally
  tint: string; // light-tint callout background (Decision/Memo banners on Deal Detail)
  fill: string; // engagement-bar segment fill — bg only
}

export const STAGE_STYLES: Record<PipelineStage, StageStyle> = {
  Inbox: {
    bar: "bg-red-500",
    badge: "bg-red-500 text-red-50",
    pill: "bg-red-500 text-red-50",
    tint: "bg-red-500/15 text-red-700 border-red-500/30",
    fill: "bg-red-500",
  },
  Screening: {
    bar: "bg-orange-600",
    badge: "bg-orange-600 text-orange-50",
    pill: "bg-orange-600 text-orange-50",
    tint: "bg-orange-600/15 text-orange-800 border-orange-600/30",
    fill: "bg-orange-600",
  },
  Scout: {
    bar: "bg-amber-500",
    badge: "bg-amber-500 text-amber-950",
    pill: "bg-amber-500 text-amber-950",
    tint: "bg-amber-500/15 text-amber-800 border-amber-500/30",
    fill: "bg-amber-500",
  },
  Diligence: {
    bar: "bg-yellow-400",
    badge: "bg-yellow-400 text-yellow-950",
    pill: "bg-yellow-400 text-yellow-950",
    tint: "bg-yellow-400/15 text-yellow-800 border-yellow-400/30",
    fill: "bg-yellow-400",
  },
  "DD Report": {
    bar: "bg-yellow-500",
    badge: "bg-yellow-500 text-yellow-950",
    pill: "bg-yellow-500 text-yellow-950",
    tint: "bg-yellow-500/15 text-yellow-900 border-yellow-500/30",
    fill: "bg-yellow-500",
  },
  Decision: {
    bar: "bg-green-400",
    badge: "bg-green-400 text-green-950",
    pill: "bg-green-400 text-green-950",
    tint: "bg-green-400/15 text-green-800 border-green-400/30",
    fill: "bg-green-400",
  },
  Memo: {
    bar: "bg-green-600",
    badge: "bg-green-600 text-green-50",
    pill: "bg-green-600 text-green-50",
    tint: "bg-green-600/15 text-green-700 border-green-600/30",
    fill: "bg-green-600",
  },
};

// Full-Pipeline view-toggle pill. Neutral zinc — explicitly NOT in the
// stage palette so it doesn't read as an 8th stage. Theme-aware via
// dark: modifiers; the divider visually separates it from stage pills.
export const FULL_PIPELINE_PILL =
  "bg-zinc-800 text-zinc-50 dark:bg-zinc-300 dark:text-zinc-900";

export function stageAnchorId(stage: PipelineStage): string {
  return `stage-${stage.toLowerCase().replace(/\s+/g, "-")}`;
}

// Slug used in /pipeline?stage=<slug> URLs. Inverse of slugify(stage).
export function stageSlug(stage: PipelineStage): string {
  return stage.toLowerCase().replace(/\s+/g, "-");
}

// Inverse: parse a slug back to a PipelineStage. Invalid slug → null.
const STAGE_BY_SLUG: Record<string, PipelineStage> = {
  inbox: "Inbox",
  screening: "Screening",
  scout: "Scout",
  diligence: "Diligence",
  "dd-report": "DD Report",
  decision: "Decision",
  memo: "Memo",
};

export function stageFromSlug(slug: string | undefined | null): PipelineStage | null {
  if (!slug) return null;
  return STAGE_BY_SLUG[slug] ?? null;
}

// Total deal count helper for the Full-Pipeline pill — kept here so the
// nav and any future view-toggle UI share one source of truth.
export function totalDealCount<T extends { id: string }>(deals: T[]): number {
  return deals.length;
}
