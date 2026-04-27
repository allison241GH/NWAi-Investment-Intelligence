"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import portfolioData from "@/data/portfolio.json";
import membersData from "@/data/members.json";
import {
  Member,
  NWAGroup,
  PortfolioCompany,
  PortfolioStage,
} from "@/types";
import {
  formatCheckSize,
  groupLabel,
  memberInitials,
  NWA_GROUPS,
} from "@/lib/member-helpers";

const portfolio = portfolioData as PortfolioCompany[];
const members = membersData as Member[];

// ---------------------------------------------------------------------------
// Lookup tables — built once. Member-id → Member; portfolio-id → company.
// ---------------------------------------------------------------------------

const MEMBERS_BY_ID = new Map<string, Member>(members.map((m) => [m.id, m]));

// ---------------------------------------------------------------------------
// Filter facets
// ---------------------------------------------------------------------------

const PORTFOLIO_STAGES: PortfolioStage[] = ["Seed", "Series A", "Series B", "Series C+"];

type InvestorCountBucket = "any" | "1+" | "2+" | "3+" | "4+";
const INVESTOR_BUCKETS: { value: InvestorCountBucket; label: string; min: number }[] = [
  { value: "any", label: "Any", min: 0 },
  { value: "1+", label: "1+", min: 1 },
  { value: "2+", label: "2+", min: 2 },
  { value: "3+", label: "3+", min: 3 },
  { value: "4+", label: "4+", min: 4 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRound(usd: number): string {
  if (usd >= 1_000_000) {
    const m = usd / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(usd / 1000).toFixed(0)}K`;
}

function formatCloseDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function totalNwaInvestedUsd(p: PortfolioCompany): number {
  return p.member_investments.reduce((s, mi) => s + mi.check_size_usd, 0);
}

// Status pill — same vocabulary as Member Profile past-investment badges.
const STATUS_STYLES: Record<PortfolioCompany["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  Acquired: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  IPO: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30",
  "Wound Down": "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
};

// ---------------------------------------------------------------------------
// Card — mirrors the visual vocabulary of pipeline DealCard.
// ---------------------------------------------------------------------------

function PortfolioCard({
  company,
  onSelect,
}: {
  company: PortfolioCompany;
  onSelect: (id: string) => void;
}) {
  const investorCount = company.member_investments.length;
  const boardSeats = company.board.filter((b) => b.member_id).length;
  const leadNames = company.lead_member_ids
    .map((id) => MEMBERS_BY_ID.get(id)?.name)
    .filter(Boolean) as string[];

  return (
    <button
      type="button"
      onClick={() => onSelect(company.id)}
      className="text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md w-full"
      aria-label={`Open ${company.company_name} drill-in`}
    >
      <Card className="hover:border-foreground/40 transition-colors h-full">
        <CardContent className="p-5 flex flex-col gap-3 h-full">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-base leading-tight truncate">
                {company.company_name}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {groupLabel(company.group)} Group · {company.sector}
              </div>
            </div>
            <span
              className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${STATUS_STYLES[company.status]}`}
            >
              {company.status}
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {company.description}
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium">{company.stage_at_close}</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-medium tabular-nums">
              {formatRound(company.round_size_usd)}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              Closed {formatCloseDate(company.close_date)}
            </span>
          </div>

          {leadNames.length > 0 && (
            <div className="text-xs">
              <span className="text-muted-foreground">Lead: </span>
              <span className="font-medium">{leadNames.join(" · ")}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mt-auto pt-3 border-t text-xs">
            <div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                NWA invested
              </div>
              <div className="font-medium tabular-nums mt-0.5">
                {investorCount} member{investorCount === 1 ? "" : "s"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                Board seats
              </div>
              <div className="font-medium tabular-nums mt-0.5">
                {boardSeats}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                Primary
              </div>
              <div className="font-medium truncate mt-0.5" title={company.primary_contact.name}>
                {company.primary_contact.name.replace(/^Dr\.\s+/, "")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Filter UI primitives — match the Member Directory styling so the Portfolio
// view feels like a sibling, not a transplant.
// ---------------------------------------------------------------------------

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
  optionLabel,
}: {
  label: string;
  options: T[];
  selected: Set<T>;
  onToggle: (value: T) => void;
  optionLabel?: (value: T) => string;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.has(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              aria-pressed={active}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {optionLabel ? optionLabel(opt) : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </div>
      <div className="inline-flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Slide-over drill-in — fixed-position right panel + scrim. Lists every NWA
// investor with check-size + board role, every board seat, and the warm-
// contact map for who-knows-whom-at-the-company.
// ---------------------------------------------------------------------------

function MemberInvestorRow({
  memberId,
  checkSize,
  boardRole,
}: {
  memberId: string;
  checkSize: number;
  boardRole?: "Director" | "Observer" | "Advisor";
}) {
  const member = MEMBERS_BY_ID.get(memberId);
  if (!member) {
    return (
      <div className="text-xs text-muted-foreground italic">
        Unknown member ({memberId})
      </div>
    );
  }
  return (
    <Link
      href={`/members/${member.id}`}
      className="flex items-center gap-3 p-3 rounded-md border bg-card hover:border-foreground/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        aria-hidden
        className="shrink-0 w-9 h-9 rounded-full bg-muted text-muted-foreground inline-flex items-center justify-center text-[11px] font-semibold tracking-wide"
      >
        {memberInitials(member.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm leading-tight truncate">
          {member.name}
        </div>
        <div className="text-[11px] text-muted-foreground truncate">
          {groupLabel(member.group)} · {member.location}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-sm font-medium tabular-nums">
          {formatCheckSize(checkSize)}
        </div>
        {boardRole && (
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
            {boardRole}
          </div>
        )}
      </div>
    </Link>
  );
}

const BOARD_ROLE_STYLES: Record<"Director" | "Observer" | "Chair", string> = {
  Director: "bg-foreground text-background",
  Observer: "bg-muted text-foreground",
  Chair: "border border-border bg-background text-foreground",
};

function PortfolioDrillIn({
  company,
  onClose,
}: {
  company: PortfolioCompany | null;
  onClose: () => void;
}) {
  // Esc closes; lock body scroll while open.
  useEffect(() => {
    if (!company) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [company, onClose]);

  if (!company) return null;

  const totalNwa = totalNwaInvestedUsd(company);
  const boardNwa = company.board.filter((b) => b.member_id);
  const boardExternal = company.board.filter((b) => !b.member_id);

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-drillin-title"
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close drill-in"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      {/* Panel */}
      <aside className="absolute right-0 top-0 bottom-0 w-full max-w-[640px] bg-background border-l shadow-2xl flex flex-col">
        {/* Header */}
        <header className="border-b px-6 py-5 flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {groupLabel(company.group)} Group · {company.sector}
            </div>
            <h2
              id="portfolio-drillin-title"
              className="text-xl font-semibold tracking-tight mt-1 truncate"
            >
              {company.company_name}
            </h2>
            <div className="text-xs text-muted-foreground mt-1">
              {company.stage_at_close} ·{" "}
              <span className="tabular-nums">{formatRound(company.round_size_usd)}</span>{" "}
              · Closed {formatCloseDate(company.close_date)}
            </div>
          </div>
          <span
            className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${STATUS_STYLES[company.status]}`}
          >
            {company.status}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 -mr-2 -mt-1 w-8 h-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <span aria-hidden className="text-xl leading-none">×</span>
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <p className="text-sm text-muted-foreground">{company.description}</p>

          {/* At-a-glance strip */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-md border bg-card p-3">
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                NWA investors
              </div>
              <div className="font-semibold text-base tabular-nums mt-0.5">
                {company.member_investments.length}
              </div>
            </div>
            <div className="rounded-md border bg-card p-3">
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                NWA invested
              </div>
              <div className="font-semibold text-base tabular-nums mt-0.5">
                {formatCheckSize(totalNwa)}
              </div>
            </div>
            <div className="rounded-md border bg-card p-3">
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                NWA board seats
              </div>
              <div className="font-semibold text-base tabular-nums mt-0.5">
                {boardNwa.length}
              </div>
            </div>
          </div>

          {/* NWA member investors */}
          <section>
            <h3 className="text-sm font-semibold mb-2">
              NWA member investors
              <span className="text-muted-foreground font-normal ml-1.5">
                ({company.member_investments.length})
              </span>
            </h3>
            <div className="space-y-2">
              {company.member_investments
                .slice()
                .sort((a, b) => b.check_size_usd - a.check_size_usd)
                .map((mi) => (
                  <MemberInvestorRow
                    key={mi.member_id}
                    memberId={mi.member_id}
                    checkSize={mi.check_size_usd}
                    boardRole={mi.board_role}
                  />
                ))}
            </div>
          </section>

          {/* Board */}
          <section>
            <h3 className="text-sm font-semibold mb-2">
              Board
              <span className="text-muted-foreground font-normal ml-1.5">
                ({company.board.length})
              </span>
            </h3>
            <div className="space-y-1.5">
              {[...boardNwa, ...boardExternal].map((seat, idx) => {
                const isNwa = !!seat.member_id;
                return (
                  <div
                    key={`${seat.name}-${idx}`}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-md border bg-card"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium leading-tight truncate">
                        {seat.member_id ? (
                          <Link
                            href={`/members/${seat.member_id}`}
                            className="hover:underline underline-offset-2"
                          >
                            {seat.name}
                          </Link>
                        ) : (
                          seat.name
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {seat.affiliation}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isNwa && (
                        <Badge variant="secondary" className="text-[10px]">
                          NWA
                        </Badge>
                      )}
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${BOARD_ROLE_STYLES[seat.role]}`}
                      >
                        {seat.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Primary contact */}
          <section>
            <h3 className="text-sm font-semibold mb-2">Primary contact</h3>
            <div className="rounded-md border bg-card p-3 text-sm">
              <div className="font-medium">{company.primary_contact.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {company.primary_contact.role}
              </div>
              {company.primary_contact.email_stub && (
                <div className="text-xs text-muted-foreground mt-1 font-mono">
                  {company.primary_contact.email_stub}
                </div>
              )}
            </div>
          </section>

          {/* Warm contacts — who-knows-whom */}
          {company.warm_contacts.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold mb-1">Warm contacts</h3>
              <p className="text-[11px] text-muted-foreground mb-2">
                Who-knows-whom-at-the-company — NWA members with a direct
                relationship for warm intros and references.
              </p>
              <div className="space-y-1.5">
                {company.warm_contacts.map((c, idx) => (
                  <div
                    key={`${c.name}-${idx}`}
                    className="flex items-start justify-between gap-3 px-3 py-2 rounded-md border bg-card"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium leading-tight">
                        {c.member_id ? (
                          <Link
                            href={`/members/${c.member_id}`}
                            className="hover:underline underline-offset-2"
                          >
                            {c.name}
                          </Link>
                        ) : (
                          c.name
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {c.role}
                      </div>
                    </div>
                    {c.member_id && (
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        NWA
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PortfolioPage() {
  const [groups, setGroups] = useState<Set<NWAGroup>>(new Set());
  const [stages, setStages] = useState<Set<PortfolioStage>>(new Set());
  const [investorBucket, setInvestorBucket] = useState<InvestorCountBucket>("any");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Sector facet — derived from data so it adapts if portfolio.json grows.
  const sectorOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of portfolio) set.add(p.sector);
    return Array.from(set).sort();
  }, []);
  const [sectors, setSectors] = useState<Set<string>>(new Set());

  function toggleSet<T>(setter: React.Dispatch<React.SetStateAction<Set<T>>>) {
    return (value: T) => {
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(value)) next.delete(value);
        else next.add(value);
        return next;
      });
    };
  }

  function clearAll() {
    setGroups(new Set());
    setStages(new Set());
    setSectors(new Set());
    setInvestorBucket("any");
  }

  const investorBucketMin = useMemo(
    () =>
      INVESTOR_BUCKETS.find((b) => b.value === investorBucket)?.min ?? 0,
    [investorBucket]
  );

  const filtered = useMemo(() => {
    return portfolio.filter((p) => {
      if (groups.size > 0 && !groups.has(p.group)) return false;
      if (stages.size > 0 && !stages.has(p.stage_at_close)) return false;
      if (sectors.size > 0 && !sectors.has(p.sector)) return false;
      if (p.member_investments.length < investorBucketMin) return false;
      return true;
    });
  }, [groups, stages, sectors, investorBucketMin]);

  const activeFilterCount =
    groups.size +
    stages.size +
    sectors.size +
    (investorBucket !== "any" ? 1 : 0);

  // Aggregate KPI strip for the page header.
  const totals = useMemo(() => {
    const memberSet = new Set<string>();
    let invested = 0;
    let boardSeats = 0;
    for (const p of filtered) {
      invested += totalNwaInvestedUsd(p);
      for (const mi of p.member_investments) memberSet.add(mi.member_id);
      for (const b of p.board) if (b.member_id) boardSeats += 1;
    }
    return {
      companies: filtered.length,
      uniqueMembers: memberSet.size,
      invested,
      boardSeats,
    };
  }, [filtered]);

  const selected = useMemo(
    () => (selectedId ? portfolio.find((p) => p.id === selectedId) ?? null : null),
    [selectedId]
  );

  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          NWAi · Track 2 — Unified Portfolio
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Portfolio
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Closed companies that at least one NWA member backed — across all six
          NWAi groups. Click any card for the full investor roster, board, and
          warm-contact map.
        </p>
      </header>

      {/* KPI strip */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Companies
          </div>
          <div className="text-2xl font-semibold tabular-nums mt-1">
            {totals.companies}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            NWA members invested
          </div>
          <div className="text-2xl font-semibold tabular-nums mt-1">
            {totals.uniqueMembers}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Total NWA invested
          </div>
          <div className="text-2xl font-semibold tabular-nums mt-1">
            {formatCheckSize(totals.invested)}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            NWA board seats
          </div>
          <div className="text-2xl font-semibold tabular-nums mt-1">
            {totals.boardSeats}
          </div>
        </div>
      </div>

      {/* Filter rail */}
      <div className="mb-6 rounded-lg border bg-card p-4 md:p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Filters
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
            <span>
              {filtered.length} of {portfolio.length} compan
              {portfolio.length === 1 ? "y" : "ies"}
            </span>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-foreground underline-offset-2 hover:underline"
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <ChipGroup<NWAGroup>
            label="NWAi Group"
            options={NWA_GROUPS}
            selected={groups}
            onToggle={toggleSet(setGroups)}
            optionLabel={groupLabel}
          />
          <ChipGroup<PortfolioStage>
            label="Stage at close"
            options={PORTFOLIO_STAGES}
            selected={stages}
            onToggle={toggleSet(setStages)}
          />
          <ChipGroup<string>
            label="Sector"
            options={sectorOptions}
            selected={sectors}
            onToggle={toggleSet(setSectors)}
          />
          <SegmentedControl<InvestorCountBucket>
            label="NWA investors"
            options={INVESTOR_BUCKETS.map((b) => ({ value: b.value, label: b.label }))}
            value={investorBucket}
            onChange={setInvestorBucket}
          />
        </div>
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
          No portfolio companies match the active filters.{" "}
          <button
            type="button"
            onClick={clearAll}
            className="text-foreground underline-offset-2 hover:underline"
          >
            Clear all
          </button>
          .
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filtered.map((company) => (
            <PortfolioCard
              key={company.id}
              company={company}
              onSelect={setSelectedId}
            />
          ))}
        </div>
      )}

      <PortfolioDrillIn company={selected} onClose={() => setSelectedId(null)} />
    </main>
  );
}
