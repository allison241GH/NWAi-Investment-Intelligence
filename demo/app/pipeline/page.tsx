import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dealsData from "@/data/deals.json";
import { Deal, PIPELINE_STAGES, PipelineStage } from "@/types";
import { STAGE_STYLES, stageAnchorId, stageFromSlug } from "@/lib/stage-style";

const deals = dealsData as Deal[];

function formatRaise(amountUsd: number): string {
  if (amountUsd >= 1_000_000) {
    const m = amountUsd / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(amountUsd / 1000).toFixed(0)}K`;
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function dealsByStage(stage: PipelineStage): Deal[] {
  return deals.filter((d) => d.stage === stage);
}

function MemberEngagement({ deal }: { deal: Deal }) {
  const { matched, engaged, responded, pool_size } = deal.member_engagement;
  if (matched === 0) {
    return (
      <div className="text-xs text-muted-foreground">
        Members not yet matched
      </div>
    );
  }
  // Bar fill takes the stage palette color; the three segments use opacity
  // to distinguish responded / outreach-sent / matched. Track stays neutral
  // (bg-muted, theme-aware) per Change 4.
  const fill = STAGE_STYLES[deal.stage].fill;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Member engagement</span>
        <span className="font-medium tabular-nums">
          {responded}/{matched} responded
        </span>
      </div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={fill}
          style={{ width: `${(responded / pool_size) * 100}%` }}
          aria-label="Members responded"
        />
        <div
          className={`${fill} opacity-60`}
          style={{ width: `${((engaged - responded) / pool_size) * 100}%` }}
          aria-label="Members engaged but not responded"
        />
        <div
          className={`${fill} opacity-25`}
          style={{ width: `${((matched - engaged) / pool_size) * 100}%` }}
          aria-label="Members matched but not yet engaged"
        />
      </div>
      <div className="text-[11px] text-muted-foreground tabular-nums">
        {matched} matched · {engaged} outreach sent · pool of {pool_size}
      </div>
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/deals/${deal.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
    >
      <Card className="hover:border-foreground/40 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base leading-tight">
                {deal.company_name}
              </CardTitle>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {deal.group.replace("Group", " Group")}
              </div>
            </div>
            <span
              className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${STAGE_STYLES[deal.stage].badge}`}
            >
              {deal.stage}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
            {deal.one_liner}
          </p>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{deal.stage_round}</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-medium tabular-nums">
              {formatRaise(deal.raise_amount_usd)}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground truncate">
              {deal.hq_location}
            </span>
          </div>
          <div className="text-xs text-muted-foreground line-clamp-1">
            <span className="text-foreground/70">
              {formatRelative(deal.recent_activity.at)}:
            </span>{" "}
            {deal.recent_activity.label}
          </div>
          <MemberEngagement deal={deal} />
        </CardContent>
      </Card>
    </Link>
  );
}

function StageColumn({ stage }: { stage: PipelineStage }) {
  const stageDeals = dealsByStage(stage);
  return (
    <div
      id={stageAnchorId(stage)}
      className="flex flex-col gap-3 min-w-[240px] w-[240px] scroll-mt-24"
    >
      <div
        className={`h-1.5 rounded-full ${STAGE_STYLES[stage].bar}`}
        aria-hidden
      />
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold">{stage}</h2>
        <Badge variant="secondary" className="text-xs tabular-nums">
          {stageDeals.length}
        </Badge>
      </div>
      <div className="flex flex-col gap-3">
        {stageDeals.length === 0 ? (
          <div className="text-xs text-muted-foreground italic px-1 py-6 text-center border border-dashed rounded-md">
            No deals
          </div>
        ) : (
          stageDeals.map((deal) => <DealCard key={deal.id} deal={deal} />)
        )}
      </div>
    </div>
  );
}

export default function PipelinePage({
  searchParams,
}: {
  searchParams: { stage?: string };
}) {
  // ?stage=<slug> → render that single column. Invalid or absent → all 7.
  const filterStage = stageFromSlug(searchParams.stage);
  const stagesToRender: PipelineStage[] = filterStage
    ? [filterStage]
    : PIPELINE_STAGES;

  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          NWAi TechGroup · Track 1 + Track 2
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {filterStage ? `Pipeline · ${filterStage}` : "Pipeline Dashboard"}
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          {filterStage ? (
            <>
              Filtered to <span className="font-medium">{filterStage}</span>.
              Use the Full Pipeline pill above to return to all 7 stages.
            </>
          ) : (
            <>
              Live pipeline mirrors the production{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                nwai-tech-pipeline
              </code>{" "}
              plugin. Each card shows the deal&apos;s stage, recent activity,
              and (new) the Track 2 member engagement overlay.
            </>
          )}
        </p>
      </header>

      {/*
        Kanban region. Layout rule per Session 2 #3:
        - Each column 240px fixed; gutters 12px (gap-3) — bottom of the
          12–16 range to make 1760px viewport actually fit per spec.
        - Inner content width = 7×240 + 6×12 = 1752px.
        - Negative-margin trick (-mx-6 md:-mx-10) extends the scroll container
          to the viewport edges; minimal px-1 inner padding gives ~4px clearance
          before column edges. At 1760px: viewport(1760) − padding(8) = 1752 = kanban.
          mx-auto centers any extra space at wider viewports; columns don't stretch.
        - At narrower viewports the kanban region itself horizontal-scrolls,
          while page content (header + sticky nav above) stays full-width pinned.
      */}
      <div className="overflow-x-auto pb-4 -mx-6 px-1 md:-mx-10 md:px-1">
        <div className="flex gap-3 items-start w-fit mx-auto">
          {stagesToRender.map((stage) => (
            <StageColumn key={stage} stage={stage} />
          ))}
        </div>
      </div>
    </main>
  );
}
