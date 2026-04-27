import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import dealsData from "@/data/deals.json";
import matchesData from "@/data/matches.json";
import membersData from "@/data/members.json";
import inputsData from "@/data/member_inputs.json";
import {
  Deal,
  Match,
  Member,
  MemberInput,
} from "@/types";
import { groupLabel, memberInitials } from "@/lib/member-helpers";

// Server component — read-only admin overlay over Track 2 state. No mutations,
// no LLM calls. Mirrors the live Phase-2 Orchestrator surface area: matching
// jobs in flight, outreach queue, synthesis review backlog.

const deals = dealsData as Deal[];
const matches = matchesData as Match[];
const members = membersData as Member[];
const inputs = inputsData as MemberInput[];

const DEALS_BY_ID = new Map<string, Deal>(deals.map((d) => [d.id, d]));
const MEMBERS_BY_ID = new Map<string, Member>(members.map((m) => [m.id, m]));

// ---------------------------------------------------------------------------
// Time helpers — relative format that matches the pipeline DealCard.
// ---------------------------------------------------------------------------

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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// KPI strip — system-level state, top of page.
// ---------------------------------------------------------------------------

function KPIs() {
  const totalMatches = matches.length;
  const responded = matches.filter((m) => m.status === "responded").length;
  const queued = matches.filter((m) => m.status === "matched").length;
  const outreach = matches.filter((m) => m.status === "outreach_sent").length;
  const responseRate =
    outreach + responded === 0
      ? 0
      : Math.round((responded / (responded + outreach)) * 100);
  const synthesisReady = new Set(inputs.map((i) => i.deal_id)).size;

  const items = [
    { label: "Active matching jobs", value: activeMatchingJobs().length },
    { label: "Outreach queue", value: queued + outreach },
    { label: "Responded", value: responded },
    { label: "Response rate", value: `${responseRate}%` },
    { label: "Awaiting synthesis", value: synthesisReady },
    { label: "Total matches", value: totalMatches },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((it) => (
        <div key={it.label} className="rounded-lg border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {it.label}
          </div>
          <div className="text-2xl font-semibold tabular-nums mt-1">
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel 1 — Active matching jobs.
// ---------------------------------------------------------------------------

interface MatchingJob {
  deal: Deal;
  matched: number;
  outreach: number;
  responded: number;
  total: number;
  latestActivityAt: string;
  state: "matching" | "outreach_in_flight" | "awaiting_responses" | "complete";
}

function activeMatchingJobs(): MatchingJob[] {
  const byDeal = new Map<string, Match[]>();
  for (const m of matches) {
    if (!byDeal.has(m.deal_id)) byDeal.set(m.deal_id, []);
    byDeal.get(m.deal_id)!.push(m);
  }

  const jobs: MatchingJob[] = [];
  for (const [dealId, ms] of Array.from(byDeal.entries())) {
    const deal = DEALS_BY_ID.get(dealId);
    if (!deal) continue;
    const matched = ms.filter((m) => m.status === "matched").length;
    const outreach = ms.filter((m) => m.status === "outreach_sent").length;
    const responded = ms.filter((m) => m.status === "responded").length;
    const total = ms.length;

    let state: MatchingJob["state"];
    if (matched === total) state = "matching";
    else if (matched > 0 && responded === 0) state = "outreach_in_flight";
    else if (responded < total) state = "awaiting_responses";
    else state = "complete";

    const latestActivityAt = ms
      .map((m) => m.generated_at)
      .sort()
      .reverse()[0]!;

    jobs.push({ deal, matched, outreach, responded, total, latestActivityAt, state });
  }

  // Active jobs first (anything not "complete"), then by recency.
  return jobs.sort((a, b) => {
    const aActive = a.state !== "complete" ? 0 : 1;
    const bActive = b.state !== "complete" ? 0 : 1;
    if (aActive !== bActive) return aActive - bActive;
    return b.latestActivityAt.localeCompare(a.latestActivityAt);
  });
}

const STATE_LABEL: Record<MatchingJob["state"], string> = {
  matching: "Matching",
  outreach_in_flight: "Outreach in flight",
  awaiting_responses: "Awaiting responses",
  complete: "Complete",
};

const STATE_STYLES: Record<MatchingJob["state"], string> = {
  matching:
    "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  outreach_in_flight:
    "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  awaiting_responses:
    "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  complete:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
};

function ProgressBar({
  matched,
  outreach,
  responded,
  total,
}: {
  matched: number;
  outreach: number;
  responded: number;
  total: number;
}) {
  if (total === 0) return null;
  const respondedPct = (responded / total) * 100;
  const outreachPct = (outreach / total) * 100;
  const matchedPct = (matched / total) * 100;
  return (
    <div
      className="flex h-1.5 overflow-hidden rounded-full bg-muted"
      aria-label={`${responded} responded · ${outreach} outreach sent · ${matched} matched`}
    >
      <div className="bg-foreground" style={{ width: `${respondedPct}%` }} />
      <div className="bg-foreground/55" style={{ width: `${outreachPct}%` }} />
      <div className="bg-foreground/25" style={{ width: `${matchedPct}%` }} />
    </div>
  );
}

function MatchingJobsPanel() {
  const jobs = activeMatchingJobs();
  return (
    <PanelShell
      title="Active matching jobs"
      subtitle="Per-deal Track 2 matching, outreach, and response state"
      count={jobs.length}
    >
      <div className="space-y-2">
        {jobs.map((job) => (
          <Link
            key={job.deal.id}
            href={`/deals/${job.deal.id}/matching`}
            className="block rounded-md border bg-card p-3 hover:border-foreground/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate">
                  {job.deal.company_name}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                  {groupLabel(job.deal.group)} Group · {job.deal.stage} ·{" "}
                  {formatRelative(job.latestActivityAt)}
                </div>
              </div>
              <span
                className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${STATE_STYLES[job.state]}`}
              >
                {STATE_LABEL[job.state]}
              </span>
            </div>
            <div className="mt-3">
              <ProgressBar
                matched={job.matched}
                outreach={job.outreach}
                responded={job.responded}
                total={job.total}
              />
              <div className="mt-1.5 text-[11px] text-muted-foreground tabular-nums">
                {job.responded}/{job.total} responded · {job.outreach} in flight
                · {job.matched} queued
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Panel 2 — Outreach queue. Matches with status "matched" or "outreach_sent".
// ---------------------------------------------------------------------------

interface OutreachItem {
  match: Match;
  deal: Deal;
  member: Member;
}

function outreachQueue(): OutreachItem[] {
  const items: OutreachItem[] = [];
  for (const m of matches) {
    if (m.status !== "matched" && m.status !== "outreach_sent") continue;
    const deal = DEALS_BY_ID.get(m.deal_id);
    const member = MEMBERS_BY_ID.get(m.member_id);
    if (!deal || !member) continue;
    items.push({ match: m, deal, member });
  }
  // Outreach already sent → first; then by rank.
  return items.sort((a, b) => {
    if (a.match.status !== b.match.status) {
      return a.match.status === "outreach_sent" ? -1 : 1;
    }
    return a.match.rank - b.match.rank;
  });
}

const OUTREACH_STATUS_STYLES: Record<"matched" | "outreach_sent", string> = {
  matched: "bg-muted text-foreground",
  outreach_sent:
    "bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30",
};

function OutreachQueuePanel() {
  const items = outreachQueue();
  return (
    <PanelShell
      title="Outreach queue"
      subtitle="Matched members not yet responded"
      count={items.length}
    >
      <div className="space-y-1.5">
        {items.length === 0 ? (
          <div className="text-xs text-muted-foreground italic px-1 py-4 text-center border border-dashed rounded-md">
            Queue empty
          </div>
        ) : (
          items.map(({ match, deal, member }) => (
            <div
              key={match.id}
              className="flex items-center gap-3 rounded-md border bg-card p-2.5"
            >
              <div
                aria-hidden
                className="shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground inline-flex items-center justify-center text-[10px] font-semibold tracking-wide"
              >
                {memberInitials(member.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium leading-tight truncate">
                  <Link
                    href={`/members/${member.id}`}
                    className="hover:underline underline-offset-2"
                  >
                    {member.name}
                  </Link>
                  <span className="text-muted-foreground font-normal"> → </span>
                  <Link
                    href={`/deals/${deal.id}/matching`}
                    className="hover:underline underline-offset-2"
                  >
                    {deal.company_name}
                  </Link>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Rank #{match.rank} · {match.score}/100 ·{" "}
                  {formatRelative(match.generated_at)}
                </div>
              </div>
              <span
                className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                  OUTREACH_STATUS_STYLES[match.status as "matched" | "outreach_sent"]
                }`}
              >
                {match.status === "outreach_sent" ? "Sent" : "Queued"}
              </span>
            </div>
          ))
        )}
      </div>
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Panel 3 — Synthesis review. Deals with member inputs ready to roll up.
// ---------------------------------------------------------------------------

interface SynthesisItem {
  deal: Deal;
  inputs: MemberInput[];
  responded: number;
  matched: number;
  latestInputAt: string;
}

function synthesisQueue(): SynthesisItem[] {
  const byDeal = new Map<string, MemberInput[]>();
  for (const inp of inputs) {
    if (!byDeal.has(inp.deal_id)) byDeal.set(inp.deal_id, []);
    byDeal.get(inp.deal_id)!.push(inp);
  }
  const items: SynthesisItem[] = [];
  for (const [dealId, dealInputs] of Array.from(byDeal.entries())) {
    const deal = DEALS_BY_ID.get(dealId);
    if (!deal) continue;
    const dealMatches = matches.filter((m) => m.deal_id === dealId);
    const responded = dealMatches.filter((m) => m.status === "responded").length;
    const matched = dealMatches.length;
    const latestInputAt = dealInputs
      .map((i) => i.captured_at)
      .sort()
      .reverse()[0]!;
    items.push({ deal, inputs: dealInputs, responded, matched, latestInputAt });
  }
  return items.sort((a, b) => b.latestInputAt.localeCompare(a.latestInputAt));
}

function avgSignal(dealInputs: MemberInput[]): number {
  if (dealInputs.length === 0) return 0;
  const sum = dealInputs.reduce((s, i) => s + i.scored_signal, 0);
  return Math.round((sum / dealInputs.length) * 10) / 10;
}

function SynthesisPanel() {
  const items = synthesisQueue();
  return (
    <PanelShell
      title="Synthesis review"
      subtitle="Member inputs awaiting LLM rollup into deal synthesis"
      count={items.length}
    >
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-xs text-muted-foreground italic px-1 py-4 text-center border border-dashed rounded-md">
            No member inputs captured yet.
          </div>
        ) : (
          items.map((item) => (
            <Link
              key={item.deal.id}
              href={`/deals/${item.deal.id}`}
              className="block rounded-md border bg-card p-3 hover:border-foreground/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold truncate">
                    {item.deal.company_name}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                    {groupLabel(item.deal.group)} Group · {item.deal.stage} ·{" "}
                    Latest {formatRelative(item.latestInputAt)}
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  Ready for synthesis
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                    Inputs
                  </div>
                  <div className="font-medium tabular-nums mt-0.5">
                    {item.inputs.length} of {item.matched}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                    Avg signal
                  </div>
                  <div className="font-medium tabular-nums mt-0.5">
                    {avgSignal(item.inputs)}/5
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                    Responses
                  </div>
                  <div className="font-medium tabular-nums mt-0.5">
                    {item.responded}/{item.matched}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground line-clamp-2">
                Last input from{" "}
                <span className="font-medium text-foreground">
                  {MEMBERS_BY_ID.get(
                    item.inputs.sort((a, b) =>
                      b.captured_at.localeCompare(a.captured_at)
                    )[0]!.member_id
                  )?.name ?? "Unknown member"}
                </span>{" "}
                on {formatDate(item.latestInputAt)}.
              </div>
            </Link>
          ))
        )}
      </div>
    </PanelShell>
  );
}

// ---------------------------------------------------------------------------
// Shared panel shell.
// ---------------------------------------------------------------------------

function PanelShell({
  title,
  subtitle,
  count,
  children,
}: {
  title: string;
  subtitle: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold leading-tight">{title}</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {subtitle}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 text-xs tabular-nums">
            {count}
          </Badge>
        </div>
        <div className="flex-1 min-h-0">{children}</div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OrchestratorPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            NWAi · Track 2 — Admin Overlay
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Orchestrator
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Live read on every Track 2 job currently in flight — matching,
            outreach, and synthesis. Read-only in the demo; every row links
            into the underlying deal or member view.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] uppercase tracking-wider"
        >
          Read-only · Phase 1
        </Badge>
      </header>

      <KPIs />

      <div className="grid gap-4 lg:grid-cols-3 items-start">
        <MatchingJobsPanel />
        <OutreachQueuePanel />
        <SynthesisPanel />
      </div>
    </main>
  );
}
