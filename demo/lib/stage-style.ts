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
    bar: "bg-slate-400",
    badge: "bg-slate-400 text-slate-950",
    pill: "bg-slate-400 text-slate-950",
    tint: "bg-slate-400/15 text-slate-700 border-slate-400/30",
    fill: "bg-slate-400",
  },
  Screening: {
    bar: "bg-amber-500",
    badge: "bg-amber-500 text-amber-950",
    pill: "bg-amber-500 text-amber-950",
    tint: "bg-amber-500/15 text-amber-800 border-amber-500/30",
    fill: "bg-amber-500",
  },
  Scout: {
    bar: "bg-sky-500",
    badge: "bg-sky-500 text-sky-950",
    pill: "bg-sky-500 text-sky-950",
    tint: "bg-sky-500/15 text-sky-800 border-sky-500/30",
    fill: "bg-sky-500",
  },
  Diligence: {
    bar: "bg-indigo-500",
    badge: "bg-indigo-500 text-indigo-950",
    pill: "bg-indigo-500 text-indigo-950",
    tint: "bg-indigo-500/15 text-indigo-800 border-indigo-500/30",
    fill: "bg-indigo-500",
  },
  "DD Report": {
    bar: "bg-violet-500",
    badge: "bg-violet-500 text-violet-950",
    pill: "bg-violet-500 text-violet-950",
    tint: "bg-violet-500/15 text-violet-800 border-violet-500/30",
    fill: "bg-violet-500",
  },
  Decision: {
    bar: "bg-emerald-500",
    badge: "bg-emerald-500 text-emerald-950",
    pill: "bg-emerald-500 text-emerald-950",
    tint: "bg-emerald-500/15 text-emerald-800 border-emerald-500/30",
    fill: "bg-emerald-500",
  },
  Memo: {
    bar: "bg-stone-700",
    badge: "bg-stone-700 text-stone-50",
    pill: "bg-stone-700 text-stone-50",
    tint: "bg-stone-700/15 text-stone-700 border-stone-700/30",
    fill: "bg-stone-700",
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
