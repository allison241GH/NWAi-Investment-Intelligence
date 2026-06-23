---
name: nwai-investment-framework
description: >
  This skill should be used when the user asks to screen, scout, evaluate, or analyze
  a startup deal for New World Angels (NWA or NWAi). Trigger phrases include: "screen
  this deal", "run the gates", "scout this company", "assign to TechGroup", "run
  diligence", "write the investment memo", "check red flags", "apply AutoKill criteria",
  "map to a TechGroup theme", "suggest SME leads", and any workflow involving the
  NWAi TechGroup deal pipeline from Dealum intake through investment memo.
version: 0.3.0
---

# NWAi TechGroup Investment Framework

New World Angels (NWAi) is an angel investment syndicate at www.newworldangels.com. Deals
are managed in Dealum. The TechGroup is the first group deploying this AI-assisted pipeline.
Tech-tagged applications are the scope of this plugin.

## The Pipeline: 6 Stages

Every deal moves through these Dealum steps in order:

1. **Screening** — Apply Universal Triage screener (3 hard gates + scored Opportunity/Readiness); assign to TechGroup theme
2. **Scout/IntroCall** — Run Scout Q assessment; match to member SMEs
3. **Diligence** — Execute 17-folder DD checklist with team assignments
4. **DD Report** — Generate scored synthesis document (11 sections, 1–5 scale) — IC briefing after diligence completes
5. **Decision** — Record invest / pass / watch recommendation
6. **Memo** — Produce full NWA Investment Memo (archival / external IC presentation)

## Stage 1: Screening — TechGroup Triage Screener

The TechGroup screener applies the **NWAi Universal Triage Framework**. **`references/gates-and-flags.md` is the single source of truth** for all dimension counts, point totals, and verdict thresholds — read them there at screen time; do not restate the numbers in this overview (they drift). TechGroup Track A/B Opportunity rubrics: `references/gates-and-flags-techgroup.md`.
- **Layer 1 — Hard Gates**: 3 binary gates (Foreign Entity/IP, Market Size, Commercialization Path) — a single FAIL = DECLINE
- **Layer 2 — Opportunity Score**: scored across the universal opportunity dimensions → ADVANCE / WATCH / DECLINE bands (thresholds in `gates-and-flags.md`), with a Market Opportunity sub-floor
- **Layer 3 — Readiness Score**: informs Scout; does not independently DECLINE, but a low Readiness can downgrade an ADVANCE → WATCH (Readiness Downgrade Rule — including the Deal Structure & Syndication carve-out)
- **NWA Filter** (scoring-rigor overlay across all dimensions): Cynical Default, Goliath Test, LLM Ingestion Test, Revenue Quality Audit — these cap dimension scores

SAFE structure and lead-investor absence are **not** hard gates, and they are **not penalties** —
they are scored neutrally in Readiness and surfaced as IntroCall negotiation items. A SAFE is the
normal early-stage starting point; NWA prefers priced equity at close but negotiates structure
(to priced equity or convertible) rather than killing on it. On syndication, NWA may lead or
cross-syndicate — an external lead/co-investor is preferred for validation but not required.
Deal Structure and Syndication Readiness cannot, on their own, downgrade an ADVANCE (see the
carve-out in the Readiness Downgrade Rule). Flexibility cannot be assessed from a pitch deck alone.

Target advance rate: ~11% (screen to Scout, not screen to find the diamond).

**Note:** Medical and Space verticals use separate hard-gate screener frameworks.

## Stage 1 (Legacy Reference — SUPERSEDED): Original 6-Gate AutoKill

**Archived for historical context only — do not apply.** Replaced by the Universal Triage Framework above (April 2026). Full archived criteria: `references/_archive/gates-and-flags-6gate-legacy.md`. Note: Gates 1 (SAFE-only) and 5 (no lead investor) below are exactly the two that were retired into neutral Readiness scoring — see `pipeline-decisions-log.md` Decisions 1 and 8.

| Gate | Requirement | Auto-Kill If |
|------|-------------|--------------|
| 1. Deal Structure | Equity required; prefer priced round (Seed–Series A); convertible debt acceptable; NO SAFEs | SAFE-only structure |
| 2. Geography/IP | US-based HQ and IP; executive team must be US | Foreign HQ or foreign IP entities |
| 3. Commercialization | Real revenue or signed paying customers; no research projects or demo labs | Pre-revenue with no paying customers |
| 4. Product Stage | MVP with successful beta(s) or paid beta(s) | No MVP or no beta validation |
| 5. Syndication | Credible lead investor; clean cap table | No lead investor; messy cap table |
| 6. Exit | 10x return potential in 5 years; TAM must support 20x–100x | TAM too small; no plausible buyer list |

After gates: apply Red/Yellow flags (see references). Output: **PASS / CONDITIONAL PASS / FAIL** with flag summary.

## Stage 2: Scout/IntroCall — Assessment Framework

Two-phase Scout Q assessment. See `references/scout-questions.md` for full question sets.

**Phase 1 (Viability):** Big Idea? Structural discontinuity? Big Market (TAM/SAM)? Sustainable moat?
**Phase 2 (Depth):** Team SME credibility + venture experience; Technology/Business moat; Moat defensibility; Traction evidence; Growth/Stickiness/Retention; Path to commercialization; Exit plan

After Scout Qs: map company to one of 5 TechGroup investing themes. **Do not assign named Leads or SMEs — show as "TBD — Pending Dealum API" until member-to-domain mapping is available.**

### TechGroup Themes & Member SMEs

| Theme | Focus | Lead | Members |
|-------|-------|------|---------|
| 1. AI Infrastructure & Agent-Era Backbone | The compute, connectivity, data pipeline, and orchestration layers that AI systems and agent fleets run on. Inference infrastructure, edge compute, proprietary data pipelines (including location-based and geospatial data layers), memory systems, data centers, telco/networking, and foundational technology that makes agent-scale operations possible — regardless of which application-layer winners emerge. | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 2. SW Enabled HW, Physical AI & Robotics | Software-defined physical systems where the moat is irreducible. Drones, autonomous vehicles, robotics, spatial computing, edge AI devices, smart industrial automation, additive manufacturing with real-time AI vision. Physical systems that pure software cannot displace. | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 3. WorkTech & Vertical AI OS | AI-native workflow tools that reimagine how a vertical operates in the agent era — not tools that make existing human workflows incrementally faster. Sector-specific AI operating systems (EdTech, MedTech, LegalTech, GovTech, field services) that redefine the unit of production from human-hours to agent-tasks. | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 4. Data Sovereignty, Security & AI Trust | Privacy infrastructure, identity, AI governance, model security, compliance automation, hallucination guardrails, provenance, and authenticity in AI-generated content. The trust layer for the agentic economy — agent behavior monitoring, AI system auditability, and governance of what agents remember and do. | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 5. Agentic Systems & AI Ops | The infrastructure, tooling, and protocols that make multi-agent systems possible at enterprise and developer scale. Agent orchestration frameworks, agent-to-agent protocols, AI observability and monitoring, deployment pipelines for agent fleets, workflow automation at machine scale, and the manager-of-agents toolset for enterprises governing large agent deployments. | TBD — Pending Dealum API | TBD — Pending Dealum API |

To assign a theme: match the company's primary domain and technology to the theme with the best fit. A company may span themes — pick the primary fit and note the secondary.

## Stage 3: Diligence — 17-Folder DD Checklist

Full diligence covers 17 folders. See `references/dd-checklist.md` for all questions. Assign one team member per folder. Folders:

Cap Table & Term Sheet · Company Financial Model & NWA Assessment · Company Pitch Deck(s) & Business Plan · Competition · Customer Problem · DD Team Communications · Executive Summary · Exit Assessment & Risks · Go-to-Market Plan · Intellectual Property · Timeline to Market/Milestones · Management Team/Board/Advisors · Manufacturing Plans & Product Status · Market Size/Segments/Target Customers · Historical Financials/Balance Sheet/Taxes · Product Promise/Testing/Status · Recordings

## Stage 4: Decision

Record one of three outcomes:
- **Invest** → move to Investment Committee; update Dealum step
- **Watch** → revisit in 6 months; add "Watch" tag in Dealum
- **Pass** → close in Dealum with reason tag

## Stage 5: Investment Memo

Full memo structure: Executive Summary → Company Overview → Market Opportunity → Team Assessment → Technology & Moat Analysis (using AI Moats Framework) → Financial Analysis → Risks & Mitigants → Investment Recommendation.

Apply the AI Moats framework when analyzing defensibility. See `references/ai-moats-framework.md`.

## Always-Active Lens: Agent-Era Readiness

Across **every** stage (Screen → Scout → Diligence → Memo), apply the third always-active investing
lens alongside Structural Discontinuity and Memory Lock-in: **Agent-Era Readiness** — does the
founder solve the problem *as AI agents will reshape it*, or as it exists today? The doorway
question is *"Is this information for a human to act on, or a transaction for an agent to complete?"*
Classify the posture (Threatened / Riding / Enabling / Insulated). Lightweight triage trip-wire at
Screen (`references/gates-and-flags-techgroup.md`), scored at Scout (Q7) and Diligence (Moat Tier 3).
Full framework: `references/agent-era-readiness-framework.md`.

## NWA Investment Return Target

- Primary target: **10x return in 5 years**
- Acceptable range: 5–10x for verticals with strong early exit potential
- Reject anything where the venture math cannot plausibly support this threshold
