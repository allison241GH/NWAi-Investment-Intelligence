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
import dealsData from "@/data/deals.json";
import membersData from "@/data/members.json";
import matchesData from "@/data/matches.json";
import { Deal, Member, Match } from "@/types";

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
      <Link
        href="/pipeline"
        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"
      >
        ← Pipeline
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant="default" className="text-xs">
            {deal.stage}
          </Badge>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — Track 1 (Dealflow Intelligence) */}
        <section className="space-y-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Track 1 — Dealflow Intelligence
          </div>

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
