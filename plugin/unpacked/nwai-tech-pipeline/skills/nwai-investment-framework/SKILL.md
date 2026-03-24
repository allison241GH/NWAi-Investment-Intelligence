---
name: nwai-investment-framework
description: >
  This skill should be used when the user asks to screen, scout, evaluate, or analyze
  a startup deal for New World Angels (NWA or NWAi). Trigger phrases include: "screen
  this deal", "run the gates", "scout this company", "assign to TechGroup", "run
  diligence", "write the investment memo", "check red flags", "apply AutoKill criteria",
  "map to a TechGroup theme", "suggest SME leads", and any workflow involving the
  NWAi TechGroup deal pipeline from Dealum intake through investment memo.
version: 0.1.0
---

# NWAi TechGroup Investment Framework

New World Angels (NWAi) is an angel investment syndicate at www.newworldangels.com. Deals
are managed in Dealum. The TechGroup is the first group deploying this AI-assisted pipeline.
Tech-tagged applications are the scope of this plugin.

## The Pipeline: 6 Stages

Every deal moves through these Dealum steps in order:

1. **Screening** — Apply AutoKill gates; assign to TechGroup theme
2. **Scout/IntroCall** — Run Scout Q assessment; match to member SMEs
3. **Diligence** — Execute 17-folder DD checklist with team assignments
4. **DD Report** — Generate scored synthesis document (11 sections, 1–5 scale) — IC briefing after diligence completes
5. **Decision** — Record invest / pass / watch recommendation
6. **Memo** — Produce full NWA Investment Memo (archival / external IC presentation)

## Stage 1: Screening — TechGroup Triage Screener

The TechGroup screener is a 3-layer framework (see `references/gates-and-flags-techgroup.md`):
- **Layer 1**: 3 hard gates (Foreign Entity/IP, Market Size, Commercialization Path) — binary kill
- **Layer 2**: Opportunity Score (5 dimensions, 0–5 each = 25 points) — ADVANCE ≥ 18/25
- **Layer 3**: Readiness Score (4 dimensions, 0–5 each = 20 points) — informs Scout, does not gate

SAFE structure and lead investor absence are **not** hard gates — they are Readiness signals
flagged for the founder IntroCall conversation. NWAi policy remains no SAFE at close; the
screen does not kill on structure because flexibility cannot be assessed from a pitch deck alone.

Target advance rate: ~11% (screen to Scout, not screen to find the diamond).

**Note:** Medical and Space verticals use separate hard-gate screener frameworks.

## Stage 1 (Legacy Reference): Original 6-Gate AutoKill

Apply all 6 gates. A single FAIL is an immediate pass. See `references/gates-and-flags.md` for full criteria.

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
| 1. Infrastructure & Foundational Stack | Data centers, networking, HPC chips/hardware, localized LLMs, Edge Computing | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 2. SW Enabled HW, Physical AI & Robotics | Drones, AV, smart industrial automation, additive manufacturing with real-time AI vision | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 3. WorkTech & Vertical Enterprise OS | Industry-specific "Operating Systems" (EdTech, MedTech, GovTech, Legal); vertical AI agents | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 4. Data Sovereignty, Security, Trust | Cybersecurity, cryptography, synthetic data, compliance; location intelligence; decision-grade data | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 5. FinTech (incl RE) | Crypto, AI financial companions, automated risk/underwriting, AI/DeFi intersection | TBD — Pending Dealum API | TBD — Pending Dealum API |

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

## NWA Investment Return Target

- Primary target: **10x return in 5 years**
- Acceptable range: 5–10x for verticals with strong early exit potential
- Reject anything where the venture math cannot plausibly support this threshold
