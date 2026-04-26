// NWAi Investment Intelligence Platform — Phase 1 Demo
// Shared TypeScript interfaces. JSON-deserializable (ISO date strings, plain objects).
// Mirrors the Phase 2 MVP data model in Scoping.md §6 where applicable, extended for
// the demo's UI surface area (Phase 1 §5 screens 1–8).

export type PipelineStage =
  | "Inbox"
  | "Screening"
  | "Scout"
  | "Diligence"
  | "DD Report"
  | "Decision"
  | "Memo";

export const PIPELINE_STAGES: PipelineStage[] = [
  "Inbox",
  "Screening",
  "Scout",
  "Diligence",
  "DD Report",
  "Decision",
  "Memo",
];

export type NWAGroup =
  | "TechGroup"
  | "MedicalGroup"
  | "SpaceGroup"
  | "ConsumerGroup"
  | "IndustrialGroup"
  | "FintechGroup";

export type Sector =
  | "AI Infrastructure"
  | "Medical Device"
  | "DTC Consumer"
  | string; // open-ended; the three above are the demo's seed sectors

// ---------------------------------------------------------------------------
// Deal — Track 1 entity. Mirrors a Dealum application as it moves through the
// 7-stage pipeline. Carries a member-engagement summary (Track 2 overlay) so
// the Pipeline Dashboard can show the integrated story at a glance.
// ---------------------------------------------------------------------------

export interface Deal {
  id: string;
  company_name: string;
  sector: Sector;
  group: NWAGroup;
  stage: PipelineStage;
  one_liner: string;
  hq_location: string;
  stage_round: string; // e.g. "Seed", "Series A"
  raise_amount_usd: number;
  recent_activity: {
    label: string;
    at: string; // ISO datetime
  };
  // Track 2 overlay shown on every deal card in the Pipeline Dashboard.
  member_engagement: {
    matched: number;
    engaged: number; // outreach sent
    responded: number;
    pool_size: number; // total members in the relevant group
  };
  scout_assessment_summary: {
    verdict: string; // one-sentence verdict
    biggest_risk: string;
    diligence_questions: string[]; // 3–5 targeted questions
  };
  dd_artifacts: DealArtifact[];
  matched_member_ids: string[];
  // Right-panel synthesis on /deals/[id]. Mirrors the Scoping §6
  // MemberIntelligenceSection.content shape so Phase 2 can swap a real
  // synthesis in without changing this contract.
  synthesis_preview: SynthesisPreview;
  founders?: string[];
  decision?: DecisionRecord;
  memo?: MemoRecord;
  triage_assessment?: TriageAssessment;
}

// TechGroup live triage-with-scoring framework. Per CLAUDE.md and the
// production nwai-tech-pipeline plugin: 3 hard gates + Opportunity (5×0–5)
// + Readiness (4×0–5). ADVANCE ≥ 18/25 Opportunity. Same shape applied to
// Screening-stage cards regardless of group (forward-state framework for
// Phase 2 multi-group rollout).
export interface TriageAssessment {
  hard_gates: TriageGate[]; // exactly 3: Structure, Geography, Stage
  opportunity: ScoredDimension[]; // exactly 5 dimensions, each 0–5
  readiness: ScoredDimension[]; // exactly 4 dimensions, each 0–5
  verdict: "ADVANCE" | "WATCH" | "KILL";
  red_flags: string[]; // ❌ — rendered as Red
  yellow_flags: string[]; // ⚠️ — rendered as Yellow
  generated_at: string; // ISO
}

export interface TriageGate {
  name: "Structure" | "Geography" | "Stage";
  passed: boolean;
  rationale: string; // one line
}

export interface ScoredDimension {
  name: string;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  rationale: string; // 1–2 sentences
}

export interface DecisionRecord {
  verdict: "invest" | "pass" | "watch";
  rationale: string;
  decided_at: string; // ISO
  conditions?: string[];
}

export interface MemoRecord {
  finalized_at: string; // ISO
  summary: string;
  distributed_to_ic_at?: string; // ISO
  closing_scheduled_at?: string; // ISO
}

export interface SynthesisPreview {
  consensus: string; // 1–2 sentences; what most members converged on
  dissent: string; // 1–2 sentences; where members disagreed
  new_risks: string[]; // bullets surfaced by members, not in prior agent reports
  new_opportunities: string[]; // bullets surfaced by members
  synthesized_from_member_input_ids: string[]; // pointers; renders "Synthesized from N member responses"
}

export interface DealArtifact {
  id: string;
  name: string;
  artifact_type:
    | "Triage Report"
    | "Scout Assessment"
    | "DD Kickoff Package"
    | "Post-Meeting Reconciliation"
    | "DD Investment Report"
    | "Investment Memo";
  generated_at: string; // ISO
  summary: string; // short one-liner
}

// ---------------------------------------------------------------------------
// Member — Track 2 entity. Extends Scoping.md §6 data model with the fields
// needed by Member Directory faceted search and Member Profile views.
// ---------------------------------------------------------------------------

export interface Member {
  id: string;
  name: string;
  email: string;
  linkedin_url: string;
  group: NWAGroup; // primary affiliation
  location: string; // city, state — for geography facet
  expertise_tags: string[]; // e.g. ["LLM infra", "MLOps", "Vertical SaaS"]
  prior_employers: string[];
  current_role: string;
  sectors_of_interest: Sector[];
  stage_preference: ("Pre-Seed" | "Seed" | "Series A" | "Series B+")[];
  check_size_range: {
    min_usd: number;
    max_usd: number;
  };
  past_investments: PastInvestment[];
  expertise_profile: string; // 3–5 sentence narrative; the LLM-generated bio
  participation: {
    deals_matched: number;
    deals_contributed: number;
    response_rate: number; // 0–1
    last_contribution_at: string | null; // ISO
  };
}

export interface PastInvestment {
  company: string;
  sector: Sector;
  year: number;
  stage_at_entry: string; // "Seed", "Series A", etc.
  outcome?: "Active" | "Acquired" | "IPO" | "Wound Down";
  is_portfolio_company?: boolean; // for Portfolio View screen
}

// ---------------------------------------------------------------------------
// Match — Track 2 output of /match-members. Ranked binding between deal and
// member with the rationale that drove the rank.
// ---------------------------------------------------------------------------

export interface Match {
  id: string;
  deal_id: string;
  member_id: string;
  rank: number; // 1 = best fit
  score: number; // 0–100
  rationale: string; // 2–4 sentence explanation
  expertise_signals: ExpertiseSignal[];
  suggested_dd_questions: SuggestedDDQuestion[];
  status: "matched" | "outreach_sent" | "responded" | "declined" | "no_response";
  generated_at: string; // ISO
}

export interface ExpertiseSignal {
  label: string; // e.g. "Operator at OpenAI 2019–2023"
  weight: number; // 0–1; contribution to rank
  category: "domain" | "stage" | "geography" | "operator" | "investor" | "network";
}

export interface SuggestedDDQuestion {
  folder_id: string; // 1..17 in the DD checklist
  folder_name: string;
  question: string;
}

// ---------------------------------------------------------------------------
// MemberInput — Track 2 captured response. Mirrors Scoping.md §6 verbatim,
// with a status flag for the Orchestrator screen.
// ---------------------------------------------------------------------------

export interface MemberInput {
  id: string;
  match_id: string;
  member_id: string;
  deal_id: string;
  raw_text: string;
  extracted: {
    themes: string[];
    concerns: string[];
    recommendations: string[];
    open_questions: string[];
    folder_evidence: FolderEvidence[];
  };
  scored_signal: 1 | 2 | 3 | 4 | 5; // feeds the new DD Report dimension
  captured_at: string; // ISO
}

export interface FolderEvidence {
  folder_id: string;
  folder_name: string;
  finding: string;
}

// ---------------------------------------------------------------------------
// EcosystemSignal — Track 3 placeholder content for Screen 7. Real sourcing
// agents are Phase 4; the demo only renders a believable feed.
// ---------------------------------------------------------------------------

export interface EcosystemSignal {
  id: string;
  source_type:
    | "incubator"
    | "accelerator"
    | "university"
    | "operator_network"
    | "market_signal"
    | "thematic_report";
  source_name: string; // e.g. "Y Combinator W26"
  signal_label: string; // headline
  summary: string; // 1–2 sentence
  relevance_themes: string[]; // tags that map to TechGroup themes
  surfaced_at: string; // ISO
  candidate_company?: string; // optional pointer to a future deal
}
