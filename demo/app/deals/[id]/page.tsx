import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dealsData from "@/data/deals.json";
import membersData from "@/data/members.json";
import matchesData from "@/data/matches.json";
import { Deal, Member, Match, TriageAssessment, PipelineStage } from "@/types";
import { STAGE_STYLES } from "@/lib/stage-style";

const VERDICT_STYLE: Record<TriageAssessment["verdict"], string> = {
  ADVANCE: "bg-emerald-500 text-emerald-950",
  WATCH: "bg-amber-500 text-amber-950",
  KILL: "bg-red-600 text-red-50",
};

function TriageBlock({ triage }: { triage: TriageAssessment }) {
  const oppTotal = triage.opportunity.reduce((s, d) => s + d.score, 0);
  const readyTotal = triage.readiness.reduce((s, d) => s + d.score, 0);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <CardTitle className="text-base">Triage Assessment</CardTitle>
            <CardDescription className="text-xs">
              TechGroup live triage-with-scoring framework — runs at Screening.
            </CardDescription>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold tracking-wider ${VERDICT_STYLE[triage.verdict]}`}
          >
            {triage.verdict}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Hard gates
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {triage.hard_gates.map((g) => (
              <div
                key={g.name}
                className="rounded-md border bg-muted/30 px-3 py-2"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span
                    className={
                      g.passed ? "text-emerald-600" : "text-red-600"
                    }
                    aria-hidden
                  >
                    {g.passed ? "✓" : "✗"}
                  </span>
                  {g.name}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {g.rationale}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Opportunity
            </div>
            <div className="text-xs tabular-nums font-medium">
              {oppTotal} / 25 {oppTotal >= 18 && "· ADVANCE threshold met"}
            </div>
          </div>
          <ul className="space-y-2">
            {triage.opportunity.map((d) => (
              <li key={d.name} className="text-xs">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium">{d.name}</span>
                  <span className="tabular-nums text-muted-foreground shrink-0">
                    {d.score}/5
                  </span>
                </div>
                <div className="text-muted-foreground mt-0.5 leading-snug">
                  {d.rationale}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Readiness
            </div>
            <div className="text-xs tabular-nums font-medium">
              {readyTotal} / 20
            </div>
          </div>
          <ul className="space-y-2">
            {triage.readiness.map((d) => (
              <li key={d.name} className="text-xs">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium">{d.name}</span>
                  <span className="tabular-nums text-muted-foreground shrink-0">
                    {d.score}/5
                  </span>
                </div>
                <div className="text-muted-foreground mt-0.5 leading-snug">
                  {d.rationale}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {(triage.red_flags.length > 0 || triage.yellow_flags.length > 0) && (
          <div className="space-y-1.5 border-t pt-3">
            {triage.red_flags.map((f, i) => (
              <p key={`r-${i}`} className="text-xs leading-snug">
                <span className="text-red-600 font-semibold">❌ </span>
                {f}
              </p>
            ))}
            {triage.yellow_flags.map((f, i) => (
              <p key={`y-${i}`} className="text-xs leading-snug">
                <span className="text-amber-600 font-semibold">⚠️ </span>
                {f}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SummaryBlock({ deal }: { deal: Deal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{deal.one_liner}</p>
        <dl className="space-y-2.5">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Founders
            </dt>
            <dd className="text-sm">{deal.founders?.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Location
            </dt>
            <dd className="text-sm">{deal.hq_location}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Raise
            </dt>
            <dd className="text-sm">
              {deal.stage_round} — {formatRaise(deal.raise_amount_usd)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function TriageBlockEmpty({ stage }: { stage: PipelineStage }) {
  const copy =
    stage === "Inbox"
      ? "Triage Assessment will appear here once Screening is initiated."
      : "Triage was completed at an earlier pipeline stage.";
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Triage Assessment</CardTitle>
        <CardDescription className="text-xs">
          TechGroup live triage-with-scoring framework — runs at Screening.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground italic">{copy}</p>
      </CardContent>
    </Card>
  );
}

const deals = dealsData as Deal[];
const members = membersData as Member[];
const matches = matchesData as Match[];

function formatRaise(amountUsd: number): string {
  if (amountUsd >= 1_000_000) {
    const m = amountUsd / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(amountUsd / 1000).toFixed(0)}K`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ArtifactRow({ artifact }: { artifact: Deal["dd_artifacts"][number] }) {
  return (
    <div className="border-l-2 border-muted pl-3 py-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="font-medium text-sm">{artifact.name}</div>
        <div className="text-[11px] text-muted-foreground tabular-nums shrink-0">
          {formatDate(artifact.generated_at)}
        </div>
      </div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">
        {artifact.artifact_type}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {artifact.summary}
      </div>
    </div>
  );
}

function MatchedMemberRow({
  member,
  match,
}: {
  member: Member;
  match: Match | undefined;
}) {
  return (
    <div className="flex items-start gap-3 py-2 border-b last:border-b-0">
      <div className="shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold tabular-nums">
        {match?.rank ?? "—"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <div className="font-medium text-sm truncate">{member.name}</div>
          {match && (
            <div className="text-[11px] text-muted-foreground tabular-nums shrink-0">
              {match.score} fit
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {member.current_role}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {member.expertise_tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] py-0">
              {tag}
            </Badge>
          ))}
          {match && (
            <Badge
              variant={
                match.status === "responded"
                  ? "default"
                  : match.status === "outreach_sent"
                    ? "outline"
                    : "secondary"
              }
              className="text-[10px] py-0 ml-auto"
            >
              {match.status.replace("_", " ")}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return deals.map((d) => ({ id: d.id }));
}

export default function DealDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const deal = deals.find((d) => d.id === params.id);
  if (!deal) notFound();

  const matchedMembers = deal.matched_member_ids
    .map((mid) => ({
      member: members.find((m) => m.id === mid)!,
      match: matches.find(
        (mt) => mt.deal_id === deal.id && mt.member_id === mid,
      ),
    }))
    .filter((x) => x.member)
    .sort((a, b) => (a.match?.rank ?? 99) - (b.match?.rank ?? 99));

  const synth = deal.synthesis_preview;
  const synthIsPopulated =
    synth.consensus.length > 0 ||
    synth.dissent.length > 0 ||
    synth.new_risks.length > 0 ||
    synth.new_opportunities.length > 0;

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold ${STAGE_STYLES[deal.stage].badge}`}
          >
            {deal.stage}
          </span>
          <Badge variant="outline" className="text-xs">
            {deal.group}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {deal.sector}
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {deal.company_name}
        </h1>
        <p className="text-base text-muted-foreground mt-2">{deal.one_liner}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3 flex-wrap">
          <span>
            <span className="font-medium text-foreground">
              {deal.stage_round}
            </span>{" "}
            · {formatRaise(deal.raise_amount_usd)}
          </span>
          <span>{deal.hq_location}</span>
        </div>
      </header>

      {deal.decision && (
        <div
          className={`mb-6 border rounded-lg px-4 py-3 ${STAGE_STYLES.Decision.tint}`}
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-xs font-semibold uppercase tracking-wider">
              IC Decision · {deal.decision.verdict}
            </div>
            <div className="text-[11px] tabular-nums opacity-80">
              {formatDate(deal.decision.decided_at)}
            </div>
          </div>
          <p className="text-sm mt-1.5">{deal.decision.rationale}</p>
          {deal.decision.conditions && deal.decision.conditions.length > 0 && (
            <ul className="text-xs mt-2 space-y-0.5 list-disc list-inside">
              {deal.decision.conditions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {deal.memo && (
        <div
          className={`mb-6 border rounded-lg px-4 py-3 ${STAGE_STYLES.Memo.tint}`}
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-xs font-semibold uppercase tracking-wider">
              Investment Memo · finalized
            </div>
            <div className="text-[11px] tabular-nums opacity-80">
              {formatDate(deal.memo.finalized_at)}
              {deal.memo.closing_scheduled_at &&
                ` · closing ${formatDate(deal.memo.closing_scheduled_at)}`}
            </div>
          </div>
          <p className="text-sm mt-1.5">{deal.memo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — Track 1 (Dealflow Intelligence) */}
        <section className="space-y-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Track 1 — Dealflow Intelligence
          </div>

          <SummaryBlock deal={deal} />

          {deal.triage_assessment ? (
            <TriageBlock triage={deal.triage_assessment} />
          ) : (
            <TriageBlockEmpty stage={deal.stage} />
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Scout Assessment</CardTitle>
              <CardDescription className="text-xs">
                Generated by the live{" "}
                <code className="text-[10px]">nwai-tech-pipeline</code>{" "}
                plugin&apos;s Scout Q assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deal.scout_assessment_summary.verdict.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Scout Assessment runs after the deal clears Triage.
                </p>
              ) : (
                <>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      One-sentence verdict
                    </div>
                    <p className="text-sm">
                      {deal.scout_assessment_summary.verdict}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Single biggest risk
                    </div>
                    <p className="text-sm">
                      {deal.scout_assessment_summary.biggest_risk}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Targeted diligence questions
                    </div>
                    <ul className="text-sm space-y-1.5 list-decimal list-inside">
                      {deal.scout_assessment_summary.diligence_questions.map(
                        (q, i) => (
                          <li key={i}>{q}</li>
                        ),
                      )}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">DD Artifacts</CardTitle>
              <CardDescription className="text-xs">
                {deal.dd_artifacts.length} artifact
                {deal.dd_artifacts.length === 1 ? "" : "s"} generated by
                research agents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deal.dd_artifacts.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  No artifacts yet. Generated as the deal advances through the
                  pipeline.
                </p>
              ) : (
                deal.dd_artifacts.map((art) => (
                  <ArtifactRow key={art.id} artifact={art} />
                ))
              )}
            </CardContent>
          </Card>
        </section>

        {/* RIGHT — Track 2 (Member Intelligence) */}
        <section className="space-y-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Track 2 — Member Intelligence
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Matched Members</CardTitle>
              <CardDescription className="text-xs">
                {deal.member_engagement.matched} matched ·{" "}
                {deal.member_engagement.engaged} outreach sent ·{" "}
                {deal.member_engagement.responded} responded · pool of{" "}
                {deal.member_engagement.pool_size}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-4">
              {matchedMembers.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Members not yet matched.
                </p>
              ) : (
                <div>
                  {matchedMembers.map(({ member, match }) => (
                    <MatchedMemberRow
                      key={member.id}
                      member={member}
                      match={match}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Synthesis</CardTitle>
              <CardDescription className="text-xs">
                {synthIsPopulated
                  ? `Aggregated from ${synth.synthesized_from_member_input_ids.length} member responses.`
                  : "Synthesis populates as members respond."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!synthIsPopulated ? (
                <p className="text-xs text-muted-foreground italic">
                  No member responses yet.
                </p>
              ) : (
                <>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Consensus
                    </div>
                    <p className="text-sm">{synth.consensus}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Dissent
                    </div>
                    <p className="text-sm">{synth.dissent}</p>
                  </div>
                  {synth.new_risks.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        New risks surfaced
                      </div>
                      <ul className="text-sm space-y-1.5 list-disc list-inside marker:text-muted-foreground">
                        {synth.new_risks.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {synth.new_opportunities.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        New opportunities surfaced
                      </div>
                      <ul className="text-sm space-y-1.5 list-disc list-inside marker:text-muted-foreground">
                        {synth.new_opportunities.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
