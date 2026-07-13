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

1. **Screening** — Apply the TechGroup Six-Signal screener (3 hard gates + six qualitative signal verdicts + Triage Conviction — no numeric scores); assign to TechGroup theme
2. **Scout/IntroCall** — Run Scout Q assessment; match to member SMEs
3. **Diligence** — Execute 17-folder DD checklist with team assignments
4. **DD Report** — Generate scored synthesis document (11 sections, 1–5 scale) — IC briefing after diligence completes
5. **Decision** — Record invest / pass / watch recommendation
6. **Memo** — Produce full NWA Investment Memo (archival / external IC presentation)

## Stage 1: Screening — TechGroup Triage Screener

The TechGroup screener applies the **Six-Signal verdict model** (v3.0, July 2026 — design basis: the Craft Investing thesis, `docs/strategy/future-of-venture-investing/NWAi-Craft-Investing-Thesis-2026-06.md`). **`references/gates-and-flags-techgroup.md` is the single source of truth** for the verdict scales, weights, adverse definitions, compound rule, conviction mechanics, and calibrated rules ledger — read them there at screen time; do not restate the mechanics in this overview (they drift).
- **Hard Gates**: 3 binary gates (Entity/IP, Market Scale, Commercial Intent) — a single FAIL = DECLINE; FAIL only on clear evidence, silence = PASS + Yellow Flag
- **Six Signals** (qualitative verdicts + confidence tags, no numeric scores): Discontinuity · Market + Commercial Proof · Team · Moat + evidence tags · Agent-Era Posture · Protect Alpha (routing-only)
- **Conviction mechanics**: weighted judgment with an auditable roll-up → PRELIMINARY CALL (ADVANCE / WATCH / DECLINE) + TRIAGE CONVICTION (HIGH / MEDIUM / LOW)
- **NWA Filter** (evidence-rigor tests feeding the signals): Cynical Default → confidence tags; Goliath Test + LLM Ingestion Test → Moat evidence tags; Revenue Quality Audit → Commercial Proof quality
- **Screen→Scout seam**: numeric scoring begins at Scout — `/scout` translates the signal verdicts through the frozen conversion rubric (`references/screen-scout-conversion-rubric.md`); the number never appears at Screen

SAFE structure and lead-investor absence are **not** hard gates, and they are **not penalties** —
they are ungraded Deal Facts and IntroCall negotiation items that never pull down conviction. A
SAFE is the normal early-stage starting point; NWA prefers priced equity at close but negotiates
structure (to priced equity or convertible) rather than killing on it. On syndication, NWA may
lead or cross-syndicate — an external lead/co-investor is preferred for validation but not
required. Flexibility cannot be assessed from a pitch deck alone.

Target advance rate: ~11% (screen to Scout, not screen to find the diamond).

**Note:** Medical and Space verticals use separate hard-gate screener frameworks.

## Stage 1 (Legacy Reference — SUPERSEDED): Original 6-Gate AutoKill

**Archived for historical context only — do not apply.** Replaced by the numeric Universal Triage Framework (April 2026), itself superseded by the Six-Signal verdict model above (July 2026; numeric screeners archived in `references/_archive/`). Full archived criteria: `references/_archive/gates-and-flags-6gate-legacy.md`. Note: Gates 1 (SAFE-only) and 5 (no lead investor) below are exactly the two that were retired into neutral Readiness scoring — see `pipeline-decisions-log.md` Decisions 1 and 8.

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

## Always-Active Lenses: Agent-Era Readiness + Alpha-AI Sovereignty

Across **every** stage (Screen → Scout → Diligence → Memo), apply the third and fourth
always-active investing lenses alongside Structural Discontinuity and Memory Lock-in:

**Agent-Era Readiness** (third lens) — does the founder solve the problem *as AI agents will
reshape it*, or as it exists today? The doorway question is *"Is this information for a human to
act on, or a transaction for an agent to complete?"* Classify the posture (Threatened / Riding /
Enabling / Insulated). Weighted posture verdict at Screen (Signal 5 — upgraded July 2026 from the
trip-wire; `references/gates-and-flags-techgroup.md`), scored at Scout (Q7) and Diligence (Moat
Tier 3). Full framework: `references/agent-era-readiness-framework.md`.

**Alpha-AI Sovereignty** (fourth lens, installed July 2026) — does the company keep its alpha,
and its customers', out of the frontier labs' hands? The doorway question is *"When this product
runs, where does the alpha flow — does it stay home, or drain up to the lab?"* Classify the
posture (Leaking / Hedged / Sovereign / Enabler). Routing-only Protect Alpha read at Screen
(Signal 6), scored at Scout (Q8) and Diligence (Moat Tier 4, gated to model-supply-chain deals);
DD Report Section 3 companion line + standing Appendix A provider-terms item. Full framework:
`references/alpha-ai-sovereignty-framework.md`.

## NWA Investment Return Target

- Primary target: **10x return in 5 years**
- Acceptable range: 5–10x for verticals with strong early exit potential
- Reject anything where the venture math cannot plausibly support this threshold
