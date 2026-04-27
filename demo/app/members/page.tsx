"use client";

import { ReactNode, useId, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import membersData from "@/data/members.json";
import matchesData from "@/data/matches.json";
import inputsData from "@/data/member_inputs.json";
import { Member, Match, MemberInput, NWAGroup } from "@/types";
import {
  FL_CITIES,
  Region,
  regionFromLocation,
  groupLabel,
  NWA_GROUPS,
  memberInitials,
  memberMatchedDealCount,
  memberContributedDealCount,
  uniqueExpertiseTags,
  uniqueSectorsOfInterest,
  INVESTMENT_BUCKETS,
  InvestmentBucket,
} from "@/lib/member-helpers";

const members = membersData as Member[];
const matches = matchesData as Match[];
const inputs = inputsData as MemberInput[];

// All 11 Region options shown in the facet — 10 FL cities in brief order plus
// "Other" for non-FL outliers.
const REGION_OPTIONS: Region[] = [...FL_CITIES, "Other"];

// ---------------------------------------------------------------------------
// Faceted search across the 25-member directory. Filter state lives on the
// client; everything is computed in-memory from the seed JSON.
// ---------------------------------------------------------------------------

interface MemberRow {
  member: Member;
  matchedDeals: number;
  contributedDeals: number;
  region: Region;
}

function precomputeRows(): MemberRow[] {
  return members.map((m) => ({
    member: m,
    matchedDeals: memberMatchedDealCount(m.id, matches),
    contributedDeals: memberContributedDealCount(m.id, inputs),
    region: regionFromLocation(m.location),
  }));
}

function MemberCard({ row }: { row: MemberRow }) {
  const m = row.member;
  return (
    <Link
      href={`/members/${m.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
    >
      <Card className="hover:border-foreground/40 transition-colors h-full">
        <CardContent className="p-5 flex flex-col gap-4 h-full">
          <div className="flex items-start gap-3">
            <div
              aria-hidden
              className="shrink-0 w-12 h-12 rounded-full bg-muted text-muted-foreground inline-flex items-center justify-center text-sm font-semibold tracking-wide"
            >
              {memberInitials(m.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-tight truncate">{m.name}</div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">
                {m.current_role}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>{groupLabel(m.group)} Group</span>
                <span aria-hidden>·</span>
                <span>{m.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {m.expertise_tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
            {m.expertise_tags.length > 3 && (
              <Badge variant="outline" className="text-[11px]">
                +{m.expertise_tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-3 border-t text-xs">
            <div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                Past inv.
              </div>
              <div className="font-medium tabular-nums mt-0.5">
                {m.past_investments.length}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                NWA deals
              </div>
              <div className="font-medium tabular-nums mt-0.5">
                {row.matchedDeals}
                {row.contributedDeals > 0 && (
                  <span className="text-muted-foreground font-normal">
                    {" "}/ {row.contributedDeals} contrib.
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Multi-select chip group — used inside FilterDropdown for the four chip-style
// facets. Label is provided by the dropdown header, so this just renders chips.
function ChipGroup<T extends string>({
  options,
  selected,
  onToggle,
  optionLabel,
}: {
  options: T[];
  selected: Set<T>;
  onToggle: (value: T) => void;
  optionLabel?: (value: T) => string;
}) {
  return (
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
  );
}

// Single-select segmented control — used inside FilterDropdown for Past
// Investment. Label is provided by the dropdown header.
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
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
  );
}

// Collapsible accordion wrapper for each facet. Default closed; expands inline
// to reveal its children. Header shows label + a count/value badge when active.
// Keyboard: Enter/Space toggles, Esc closes. Accessible: aria-expanded /
// aria-controls wired to the panel id.
function FilterDropdown({
  label,
  count,
  valueLabel,
  children,
}: {
  label: string;
  count?: number; // chip-group case: number of selected chips
  valueLabel?: string; // single-select case: visible label when not "Any"
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const hasActive =
    (count !== undefined && count > 0) ||
    (valueLabel !== undefined && valueLabel.length > 0);
  const badgeText =
    count !== undefined && count > 0
      ? String(count)
      : valueLabel !== undefined
        ? valueLabel
        : "";

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          {hasActive && (
            <Badge
              variant="secondary"
              className="text-[10px] leading-none px-1.5 py-0.5"
            >
              {badgeText}
            </Badge>
          )}
        </span>
        <span aria-hidden className="text-muted-foreground text-xs shrink-0">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open && (
        <div id={panelId} className="px-3 pb-3 pt-2 border-t">
          {children}
        </div>
      )}
    </div>
  );
}

export default function MembersPage() {
  const rows = useMemo(precomputeRows, []);
  const expertiseOptions = useMemo(() => uniqueExpertiseTags(members), []);
  const sectorOptions = useMemo(() => uniqueSectorsOfInterest(members), []);

  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<Set<NWAGroup>>(new Set());
  const [expertise, setExpertise] = useState<Set<string>>(new Set());
  const [sectors, setSectors] = useState<Set<string>>(new Set());
  const [regions, setRegions] = useState<Set<Region>>(new Set());
  const [investBucket, setInvestBucket] = useState<InvestmentBucket>("any");

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
    setSearch("");
    setGroups(new Set());
    setExpertise(new Set());
    setSectors(new Set());
    setRegions(new Set());
    setInvestBucket("any");
  }

  const investBucketMin = useMemo(
    () =>
      INVESTMENT_BUCKETS.find((b) => b.value === investBucket)?.min ?? 0,
    [investBucket]
  );

  const investBucketLabel = useMemo(() => {
    if (investBucket === "any") return undefined;
    return INVESTMENT_BUCKETS.find((b) => b.value === investBucket)?.label;
  }, [investBucket]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter(({ member, region }) => {
      if (groups.size > 0 && !groups.has(member.group)) return false;
      if (regions.size > 0 && !regions.has(region)) return false;
      if (
        expertise.size > 0 &&
        !member.expertise_tags.some((t) => expertise.has(t))
      )
        return false;
      if (
        sectors.size > 0 &&
        !member.sectors_of_interest.some((s) => sectors.has(s))
      )
        return false;
      if (member.past_investments.length < investBucketMin) return false;

      if (q) {
        const haystack = [
          member.name,
          member.current_role,
          member.expertise_profile,
          ...member.expertise_tags,
          ...member.prior_employers,
        ]
          .join(" • ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [rows, search, groups, expertise, sectors, regions, investBucketMin]);

  const activeFilterCount =
    groups.size +
    expertise.size +
    sectors.size +
    regions.size +
    (investBucket !== "any" ? 1 : 0) +
    (search.trim() ? 1 : 0);

  return (
    <main className="min-h-screen p-6 md:p-10">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
          NWAi · Track 2 — Member Intelligence
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Member Directory
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Faceted search across NWAi group, FL geography, expertise, sector of
          interest, and past investments.
        </p>
      </header>

      {/* Filter rail */}
      <div className="mb-6 rounded-lg border bg-card p-4 md:p-5 space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b">
          <h2 className="text-sm font-semibold tracking-tight">Filters</h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
            <span>
              {filtered.length} of {rows.length} member
              {rows.length === 1 ? "" : "s"}
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

        <div>
          <label htmlFor="member-search" className="sr-only">
            Search members
          </label>
          <input
            id="member-search"
            type="search"
            placeholder="Search name, expertise, prior employers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm bg-background border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="grid gap-2 lg:grid-cols-2 items-start">
          {/* 1. NWAi Group */}
          <FilterDropdown label="NWAi Group" count={groups.size}>
            <ChipGroup<NWAGroup>
              options={NWA_GROUPS}
              selected={groups}
              onToggle={toggleSet(setGroups)}
              optionLabel={groupLabel}
            />
          </FilterDropdown>

          {/* 2. Region */}
          <FilterDropdown label="Region" count={regions.size}>
            <ChipGroup<Region>
              options={REGION_OPTIONS}
              selected={regions}
              onToggle={toggleSet(setRegions)}
            />
          </FilterDropdown>

          {/* 3. Expertise */}
          <FilterDropdown label="Expertise" count={expertise.size}>
            <ChipGroup<string>
              options={expertiseOptions}
              selected={expertise}
              onToggle={toggleSet(setExpertise)}
            />
          </FilterDropdown>

          {/* 4. Sector of Interest */}
          <FilterDropdown label="Sector of Interest" count={sectors.size}>
            <ChipGroup<string>
              options={sectorOptions}
              selected={sectors}
              onToggle={toggleSet(setSectors)}
            />
          </FilterDropdown>

          {/* 5. Past Investment */}
          <FilterDropdown label="Past Investment" valueLabel={investBucketLabel}>
            <SegmentedControl<InvestmentBucket>
              options={INVESTMENT_BUCKETS.map((b) => ({
                value: b.value,
                label: b.label,
              }))}
              value={investBucket}
              onChange={setInvestBucket}
            />
          </FilterDropdown>
        </div>
      </div>

      {/* Member grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
          No members match the active filters.{" "}
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((row) => (
            <MemberCard key={row.member.id} row={row} />
          ))}
        </div>
      )}
    </main>
  );
}
