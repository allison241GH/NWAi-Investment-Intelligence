import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import membersData from "@/data/members.json";
import dealsData from "@/data/deals.json";
import matchesData from "@/data/matches.json";
import inputsData from "@/data/member_inputs.json";
import {
  Member,
  Deal,
  Match,
  MemberInput,
  PastInvestment,
} from "@/types";
import { STAGE_STYLES } from "@/lib/stage-style";
import {
  formatCheckSizeRange,
  groupLabel,
  memberInitials,
  memberPortfolioCount,
  regionFromLocation,
} from "@/lib/member-helpers";

const members = membersData as Member[];
const deals = dealsData as Deal[];
const matches = matchesData as Match[];
const inputs = inputsData as MemberInput[];

export function generateStaticParams() {
  return members.map((m) => ({ id: m.id }));
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = now - then;
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function formatRaiseUsd(amountUsd: number): string {
  if (amountUsd >= 1_000_000) {
    const m = amountUsd / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(amountUsd / 1000).toFixed(0)}K`;
}

const OUTCOME_STYLE: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  Acquired: "bg-violet-500/15 text-violet-700 border-violet-500/30",
  IPO: "bg-sky-500/15 text-sky-700 border-sky-500/30",
  "Wound Down": "bg-slate-500/15 text-slate-700 border-slate-500/30",
};

function PastInvestmentRow({ inv }: { inv: PastInvestment }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">
          {inv.company}
          {inv.is_portfolio_company && (
            <span className="ml-2 text-[10px] uppercase tracking-wider text-emerald-700 align-middle">
              · NWA portfolio
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {inv.sector} · {inv.stage_at_entry} · {inv.year}
        </div>
      </div>
      {inv.outcome && (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md border tabular-nums shrink-0 ${
            OUTCOME_STYLE[inv.outcome] ?? "bg-muted text-muted-foreground border-border"
          }`}
        >
          {inv.outcome}
        </span>
      )}
    </div>
  );
}

function MatchedDealRow({
  match,
  deal,
}: {
  match: Match;
  deal: Deal;
}) {
  return (
    <Link
      href={`/deals/${deal.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
    >
      <div className="rounded-md border p-3 hover:border-foreground/40 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-sm truncate">
              {deal.company_name}
            </div>
            <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {deal.one_liner}
            </div>
          </div>
          <span
            className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${STAGE_STYLES[deal.stage].badge}`}
          >
            {deal.stage}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground tabular-nums">
          <span>Rank #{match.rank}</span>
          <span aria-hidden>·</span>
          <span>Score {match.score}</span>
          <span aria-hidden>·</span>
          <span>
            {deal.stage_round} · {formatRaiseUsd(deal.raise_amount_usd)}
          </span>
          <span aria-hidden>·</span>
          <span className="capitalize">{match.status.replace(/_/g, " ")}</span>
        </div>
      </div>
    </Link>
  );
}

function ContributionCard({
  input,
  deal,
}: {
  input: MemberInput;
  deal: Deal;
}) {
  // Excerpt — first paragraph, or 280 chars, whichever is shorter.
  const firstPara = input.raw_text.split(/\n\n+/)[0] ?? input.raw_text;
  const excerpt =
    firstPara.length > 320 ? firstPara.slice(0, 320).trimEnd() + "…" : firstPara;
  return (
    <div className="rounded-md border p-4 bg-muted/20">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          On{" "}
          <Link
            href={`/deals/${deal.id}`}
            className="text-foreground font-semibold underline-offset-2 hover:underline"
          >
            {deal.company_name}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground tabular-nums">
          <span>{formatRelative(input.captured_at)}</span>
          <span
            className="inline-flex items-center px-1.5 py-0.5 rounded border bg-background"
            title="Scored signal"
          >
            Signal {input.scored_signal}/5
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
        {excerpt}
      </p>
      {input.extracted.themes.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {input.extracted.themes.slice(0, 3).map((t, i) => (
            <Badge key={i} variant="outline" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MemberProfilePage({ params }: { params: { id: string } }) {
  const member = members.find((m) => m.id === params.id);
  if (!member) notFound();

  const memberMatches = matches
    .filter((m) => m.member_id === member.id)
    .sort((a, b) => b.score - a.score);
  const matchedDeals = memberMatches
    .map((mtch) => {
      const deal = deals.find((d) => d.id === mtch.deal_id);
      return deal ? { match: mtch, deal } : null;
    })
    .filter((x): x is { match: Match; deal: Deal } => x !== null);

  const memberInputs = inputs
    .filter((i) => i.member_id === member.id)
    .sort(
      (a, b) =>
        new Date(b.captured_at).getTime() - new Date(a.captured_at).getTime()
    );

  const portfolioInvestments = member.past_investments.filter(
    (p) => p.is_portfolio_company
  );
  const otherInvestments = member.past_investments.filter(
    (p) => !p.is_portfolio_company
  );

  const region = regionFromLocation(member.location);

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link
          href="/members"
          className="hover:text-foreground underline-offset-2 hover:underline"
        >
          ← Member Directory
        </Link>
      </nav>

      <header className="flex items-start gap-5 mb-8">
        <div
          aria-hidden
          className="shrink-0 w-20 h-20 rounded-full bg-muted text-muted-foreground inline-flex items-center justify-center text-2xl font-semibold tracking-wide"
        >
          {memberInitials(member.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {groupLabel(member.group)} Group · {region}
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {member.name}
          </h1>
          <div className="text-sm text-muted-foreground mt-1">
            {member.current_role}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {member.location}
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main column */}
        <div className="space-y-6 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Expertise profile</CardTitle>
              <CardDescription>LLM-generated bio from member application + LinkedIn signals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-foreground/90">
                {member.expertise_profile}
              </p>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Expertise tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise_tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[11px]">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Prior employers
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.prior_employers.map((e) => (
                    <Badge key={e} variant="outline" className="text-[11px]">
                      {e}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {portfolioInvestments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  NWA portfolio companies
                </CardTitle>
                <CardDescription>
                  Past investments that are part of the NWAi portfolio (
                  {portfolioInvestments.length}).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {portfolioInvestments.map((p, i) => (
                    <PastInvestmentRow key={`pf-${i}`} inv={p} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {otherInvestments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Past investments</CardTitle>
                <CardDescription>
                  Other personal investments outside the NWA portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {otherInvestments.map((p, i) => (
                    <PastInvestmentRow key={`oi-${i}`} inv={p} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Deals matched to {member.name.split(" ")[0]}</CardTitle>
              <CardDescription>
                Active and recent deals where the member matched into the
                diligence pool.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {matchedDeals.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No active deal matches for this member yet.
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {matchedDeals.map(({ match, deal }) => (
                    <MatchedDealRow
                      key={match.id}
                      match={match}
                      deal={deal}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {memberInputs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent contributions</CardTitle>
                <CardDescription>
                  Member inputs captured during diligence — quoted excerpt with
                  themes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {memberInputs.slice(0, 3).map((input) => {
                  const deal = deals.find((d) => d.id === input.deal_id);
                  if (!deal) return null;
                  return (
                    <ContributionCard
                      key={input.id}
                      input={input}
                      deal={deal}
                    />
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right rail */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">At a glance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                  Sectors of interest
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.sectors_of_interest.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                  Stage preference
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.stage_preference.map((s) => (
                    <Badge key={s} variant="outline" className="text-[11px]">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                  Check size
                </div>
                <div className="text-sm font-medium tabular-nums">
                  {formatCheckSizeRange(member.check_size_range)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Past inv.
                  </div>
                  <div className="text-base font-semibold tabular-nums">
                    {member.past_investments.length}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    NWA portfolio
                  </div>
                  <div className="text-base font-semibold tabular-nums">
                    {memberPortfolioCount(member)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Deals matched
                  </div>
                  <div className="text-base font-semibold tabular-nums">
                    {member.participation.deals_matched}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Contributed
                  </div>
                  <div className="text-base font-semibold tabular-nums">
                    {member.participation.deals_contributed}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Response rate
                  </div>
                  <div className="text-base font-semibold tabular-nums">
                    {Math.round(member.participation.response_rate * 100)}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Last contrib.
                  </div>
                  <div className="text-sm font-medium">
                    {member.participation.last_contribution_at
                      ? formatRelative(member.participation.last_contribution_at)
                      : "—"}
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <a
                  href={member.linkedin_url}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="text-xs text-foreground underline-offset-2 hover:underline"
                >
                  LinkedIn ↗
                </a>
                <span className="mx-2 text-muted-foreground">·</span>
                <a
                  href={`mailto:${member.email}`}
                  className="text-xs text-foreground underline-offset-2 hover:underline"
                >
                  Email
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
