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
          className="bg-foreground"
          style={{ width: `${(responded / pool_size) * 100}%` }}
          aria-label="Members responded"
        />
        <div
          className="bg-foreground/40"
          style={{ width: `${((engaged - responded) / pool_size) * 100}%` }}
          aria-label="Members engaged but not responded"
        />
        <div
          className="bg-foreground/15"
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
            <CardTitle className="text-base leading-tight">
              {deal.company_name}
            </CardTitle>
            <Badge variant="outline" className="text-[10px] uppercase">
              {deal.group.replace("Group", "")}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
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
    <div className="flex flex-col gap-3 min-w-[280px] w-[280px]">
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

export default function PipelinePage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          NWAi TechGroup · Track 1 + Track 2
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Pipeline Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Live pipeline mirrors the production{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            nwai-tech-pipeline
          </code>{" "}
          plugin. Each card shows the deal&apos;s stage, recent activity, and
          (new) the Track 2 member engagement overlay.
        </p>
      </header>

      <div className="overflow-x-auto pb-4 -mx-6 px-6 md:-mx-10 md:px-10">
        <div className="flex gap-5 items-start">
          {PIPELINE_STAGES.map((stage) => (
            <StageColumn key={stage} stage={stage} />
          ))}
        </div>
      </div>
    </main>
  );
}
