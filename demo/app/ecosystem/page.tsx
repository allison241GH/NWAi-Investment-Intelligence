import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ecosystemData from "@/data/ecosystem_signals.json";
import { EcosystemSignal } from "@/types";

// Phase 4 placeholder — Track 3 sourcing signals. The real agents that pull
// incubator batches, university spinouts, operator-network movements, and
// thematic reports are scheduled for Phase 4. The demo renders a believable
// feed so the IA, content density, and cross-link surface area can be reviewed
// today.

const signals = ecosystemData as EcosystemSignal[];

interface SectionConfig {
  key: string;
  title: string;
  description: string;
  sourceTypes: EcosystemSignal["source_type"][];
  bar: string;
  badge: string;
}

const SECTIONS: SectionConfig[] = [
  {
    key: "incubator",
    title: "Incubator & Accelerator",
    description:
      "Y Combinator, Techstars, MIT Sandbox, and similar programs. Surfaced when a batch contains companies that map to NWAi TechGroup themes.",
    sourceTypes: ["incubator", "accelerator"],
    bar: "bg-sky-500",
    badge: "bg-sky-500/15 text-sky-700 border-sky-500/30",
  },
  {
    key: "university",
    title: "University Spinouts",
    description:
      "Faculty-led companies graduating out of Stanford CRFM, CMU Robotics Institute, and other research labs whose IP fits TechGroup's themes.",
    sourceTypes: ["university"],
    bar: "bg-violet-500",
    badge: "bg-violet-500/15 text-violet-700 border-violet-500/30",
  },
  {
    key: "operator",
    title: "Operator Network",
    description:
      "Senior operator departures from frontier labs and category-leading consumer brands — the leading indicator for next-cycle founding teams.",
    sourceTypes: ["operator_network"],
    bar: "bg-teal-500",
    badge: "bg-teal-500/15 text-teal-700 border-teal-500/30",
  },
  {
    key: "thematic",
    title: "Thematic Reports & Market Signals",
    description:
      "Quantitative signals from PitchBook, Crunchbase, and Gartner — plus NWAi's own internal heatmaps — for theme prioritization and macro framing.",
    sourceTypes: ["market_signal", "thematic_report"],
    bar: "bg-indigo-500",
    badge: "bg-indigo-500/15 text-indigo-700 border-indigo-500/30",
  },
];

const SOURCE_LABELS: Record<EcosystemSignal["source_type"], string> = {
  incubator: "Incubator",
  accelerator: "Accelerator",
  university: "University",
  operator_network: "Operator Network",
  market_signal: "Market Signal",
  thematic_report: "Thematic Report",
};

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

function SignalCard({ signal }: { signal: EcosystemSignal }) {
  return (
    <div className="rounded-md border bg-card p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {SOURCE_LABELS[signal.source_type]} · {signal.source_name}
          </div>
          <div className="font-semibold text-sm leading-tight mt-1">
            {signal.signal_label}
          </div>
        </div>
        <Badge variant="outline" className="shrink-0 text-[10px]">
          Coming soon
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-3">
        {signal.summary}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {signal.relevance_themes.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px]">
            {t}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1.5 border-t">
        <span>{formatRelative(signal.surfaced_at)}</span>
        {signal.candidate_company && (
          <span>
            Candidate:{" "}
            <span className="text-foreground font-medium">
              {signal.candidate_company}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

function Section({ config }: { config: SectionConfig }) {
  const sectionSignals = signals.filter((s) =>
    config.sourceTypes.includes(s.source_type)
  );
  return (
    <Card>
      <div className={`-mt-4 h-1 ${config.bar}`} />
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h2 className="text-base md:text-lg font-semibold tracking-tight">
            {config.title}
          </h2>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs tabular-nums ${config.badge}`}
          >
            {sectionSignals.length}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-4 max-w-2xl">
          {config.description}
        </p>
        {sectionSignals.length === 0 ? (
          <div className="text-xs text-muted-foreground italic px-1 py-6 text-center border border-dashed rounded-md">
            No signals seeded for this section yet.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sectionSignals.map((s) => (
              <SignalCard key={s.id} signal={s} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function EcosystemPage() {
  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          NWAi · Track 3 — Ecosystem Sourcing
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Ecosystem
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Pre-pipeline sourcing signals — incubator batches, university
          spinouts, operator-network departures, and thematic reports. The feed
          below is a placeholder; the real sourcing agents ship in Phase 4.
        </p>
      </header>

      {/* Phase 4 banner */}
      <div className="mb-8 rounded-lg border border-dashed bg-muted/30 p-4 md:p-5 flex items-start gap-4">
        <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wider mt-0.5">
          Phase 4
        </Badge>
        <div className="text-sm">
          <div className="font-medium">
            Sourcing agents are scheduled for Phase 4.
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-3xl">
            Phase 1 surfaces the IA only. Each card below is a hand-seeded
            signal so the layout, taxonomy, and cross-linking can be reviewed
            today. In Phase 4, these sections will be populated by the
            <code className="text-[11px] bg-muted px-1 py-0.5 rounded mx-1">
              ecosystem-scout
            </code>
            agent suite — pulling from YC / Techstars batch lists, university
            tech-transfer feeds, LinkedIn signal monitoring, and licensed
            market-data sources — and rolled into the weekly TechGroup theme
            review.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 items-start">
        {SECTIONS.map((config) => (
          <Section key={config.key} config={config} />
        ))}
      </div>
    </main>
  );
}
