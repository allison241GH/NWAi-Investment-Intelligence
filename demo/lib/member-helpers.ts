// Member helpers shared across /members, /members/[id], and /deals/[id]/matching.
// Pure functions over JSON seed data — no I/O, no side effects.

import type { Member, Match, MemberInput, NWAGroup } from "@/types";

// ---------------------------------------------------------------------------
// Geography — NWA is a Florida-based syndicate. Bucket each member into one of
// FL's top-10 cities by population (or "Other" for non-FL outliers). The bucket
// is used as the Region facet on /members and shown on Member Profile headers.
// ---------------------------------------------------------------------------

export type Region =
  | "Jacksonville"
  | "Miami"
  | "Tampa"
  | "Orlando"
  | "St. Petersburg"
  | "Boca Raton"
  | "West Palm Beach"
  | "Naples"
  | "Daytona"
  | "Fort Lauderdale"
  | "Other";

// Listed in the brief's prescribed order. Used as the Region facet's options
// list so the buttons render in the documented sequence.
export const FL_CITIES: Region[] = [
  "Jacksonville",
  "Miami",
  "Tampa",
  "Orlando",
  "St. Petersburg",
  "Boca Raton",
  "West Palm Beach",
  "Naples",
  "Daytona",
  "Fort Lauderdale",
];

// Match a member's "City, ST" location to a Region by city-name prefix.
// "Daytona Beach, FL" → "Daytona"; "St. Petersburg, FL" → "St. Petersburg";
// anything that doesn't start with one of the 10 → "Other".
export function regionFromLocation(location: string): Region {
  for (const city of FL_CITIES) {
    if (location.startsWith(city)) return city;
  }
  return "Other";
}

// ---------------------------------------------------------------------------
// Formatting helpers — kept for /members/[id] right-rail "At a glance" card
// (check-size facet was removed from /members per the FL-cities revision).
// ---------------------------------------------------------------------------

export function formatCheckSize(usd: number): string {
  if (usd >= 1_000_000) {
    const m = usd / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${Math.round(usd / 1000)}K`;
}

export function formatCheckSizeRange(range: { min_usd: number; max_usd: number }): string {
  return `${formatCheckSize(range.min_usd)}–${formatCheckSize(range.max_usd)}`;
}

const GROUP_LABELS: Record<NWAGroup, string> = {
  TechGroup: "Tech",
  MedicalGroup: "Medical",
  SpaceGroup: "Space",
  ConsumerGroup: "Consumer",
  IndustrialGroup: "Industrial",
  FintechGroup: "Fintech",
};

export function groupLabel(group: NWAGroup): string {
  return GROUP_LABELS[group] ?? group;
}

export const NWA_GROUPS: NWAGroup[] = [
  "TechGroup",
  "MedicalGroup",
  "SpaceGroup",
  "ConsumerGroup",
  "IndustrialGroup",
  "FintechGroup",
];

// ---------------------------------------------------------------------------
// Photo placeholder — initials from a member name. Avoids external assets.
// ---------------------------------------------------------------------------

export function memberInitials(name: string): string {
  // Strip honorifics so "Dr. Anika Reddy" → "AR" not "DA".
  const stripped = name.replace(/^(Dr|Mr|Ms|Mrs|Prof)\.\s+/i, "");
  const parts = stripped.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

// ---------------------------------------------------------------------------
// Cross-references between members, matches, and member inputs.
// ---------------------------------------------------------------------------

export function memberMatchedDealCount(memberId: string, matches: Match[]): number {
  const ids = new Set<string>();
  for (const m of matches) {
    if (m.member_id === memberId) ids.add(m.deal_id);
  }
  return ids.size;
}

export function memberContributedDealCount(
  memberId: string,
  inputs: MemberInput[]
): number {
  const ids = new Set<string>();
  for (const inp of inputs) {
    if (inp.member_id === memberId) ids.add(inp.deal_id);
  }
  return ids.size;
}

export function memberPortfolioCount(member: Member): number {
  return member.past_investments.filter((p) => p.is_portfolio_company).length;
}

// ---------------------------------------------------------------------------
// Faceted-search support — collect unique values across the directory so the
// filter UI doesn't hardcode the lists.
// ---------------------------------------------------------------------------

export function uniqueExpertiseTags(members: Member[]): string[] {
  const set = new Set<string>();
  for (const m of members) for (const t of m.expertise_tags) set.add(t);
  return Array.from(set).sort();
}

export function uniqueSectorsOfInterest(members: Member[]): string[] {
  const set = new Set<string>();
  for (const m of members) for (const s of m.sectors_of_interest) set.add(s);
  return Array.from(set).sort();
}

// Past-investment count buckets shared between facet labels and filter logic.
export type InvestmentBucket = "any" | "1+" | "3+" | "5+";
export const INVESTMENT_BUCKETS: { value: InvestmentBucket; label: string; min: number }[] = [
  { value: "any", label: "Any", min: 0 },
  { value: "1+", label: "1+", min: 1 },
  { value: "3+", label: "3+", min: 3 },
  { value: "5+", label: "5+", min: 5 },
];
