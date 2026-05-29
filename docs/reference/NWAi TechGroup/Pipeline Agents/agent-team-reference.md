# NWAi TechGroup — Agent Team Reference

**Purpose:** A scannable reference covering the eight active research and analysis agents that power `/scout` and `/diligence`. Use this to review **role comprehensiveness** — is anything missing, is any role too narrow or too broad, and where might handoffs between agents lose signal?

**Audience:** TechGroup diligence team (deal leads, SMEs, IC reviewers).

**Version:** 1.0 — May 7, 2026 | Plugin v2.13.1 | Scope: 8 active agents (excludes dormant `pipeline-monitor`, deferred pending Dealum API access)

**Source documents (canonical):**
- Architecture: [`nwai-techgroup-pipeline-architecture.md`](../../nwai-techgroup-pipeline-architecture.md), Layer 4
- Agent definitions: [`.claude/agents/`](../../.claude/agents/) — full prompt body for each agent
- Frameworks referenced by the agents: [`.claude/skills/nwai-investment-framework/references/`](../../.claude/skills/nwai-investment-framework/references/)

---

## Team Architecture

The eight agents organize into two sub-teams with different operating models:

### 1. Diligence Research Team (5 agents — parallel)

`team-analyst`, `market-analyst`, `competitive-positioning-analyst`, `technology-analyst`, `risk-analyst`.

These run **in parallel** at both Scout (light scope — focused on top kill risks, thin wrapper, TRL, structural discontinuity) and Diligence (full scope). Each owns an independent research lane and produces a structured briefing with no scoring — scoring is applied separately by the `/scout` and `/diligence` commands using NWAi's published rubrics.

### 2. Financial Diligence Team (3 agents — sequential chain)

`pricing-analyst` → `forecasting-analyst` → `venture-analyst`.

Runs only at Diligence, in two stages. **Stage 2A:** `pricing-analyst` runs in parallel with the Research Team. **Stage 2B:** `forecasting-analyst` consumes pricing output to build the independent 5-year forecast; `venture-analyst` then consumes both upstream outputs (plus competitive, risk, and team-analyst briefings) to produce the valuation conclusion. The chain is sequential because each agent depends on upstream output.

### Operating Principles (Apply to Every Agent)

- **No AI slop.** Every agent applies an independent analyst point of view. Pitch decks are hypotheses to test, not facts to render.
- **McMurry method (financial team).** Build the proprietary forecast and valuation first, then compare to the company's submitted numbers.
- **18-month data freshness.** All agents flag stale data (>18 months) explicitly; market and competitive data older than 24 months is treated as low confidence.
- **Gather, don't score.** Research agents output structured briefings; scoring lives in the `/scout` and `/diligence` commands using `diligence-scoring-rubrics.md`.
- **Founder claim verification.** Specific exit / ARR / role claims are flagged as ✅ VERIFIED, ⚠️ PARTIAL, 🔴 UNVERIFIED, or ❌ CONTRADICTED — never assumed true.

---

## Master Agent Table

| Agent | Primary Mandate | Frameworks / Rubrics Applied | Key Outputs | Feeds → |
|---|---|---|---|---|
| **team-analyst** | Product Market Team Fit (PMTF) — assess whether the founding team has the right composition, depth, commitment, and market access. Verify founder claims. Distinguish full-time from advisor commitment; flag "stuck" advisors. | PMTF lens; Founder Claim Verification Protocol; 18-month freshness rule; supporting context on funding, traction, public red flags | People Verification Brief (claim-by-claim); skills-coverage and market-access gap map; commitment-depth roster; commercial validation context | Team Validation + Commercial Validation (DD Report S2, S5); `venture-analyst` for capital plan |
| **market-analyst** | Independent TAM/SAM/SOM validation. Test whether the Big Idea rides a genuine, irreversible market shift (Structural Discontinuity). Score market timing and "why now" signals. | Structural Discontinuity Test; independent TAM/SAM/SOM build; market timing assessment; 18-month freshness rule | Market Analysis Briefing — discontinuity verdict (REAL / INCREMENTAL / TOO EARLY), market sizing with vintage flags, timing signals | Market Validation (DD Report S4); Scout Phase 1 Q1 + Q2 |
| **competitive-positioning-analyst** | Map direct competitors, incumbent threats, and alternative solutions. Validate market sizing claims through the competitive lens. Surface positioning and moat input data. | Competitor mapping (well-funded startups + incumbents); positioning analysis; data-vintage flagging; moat input feeds [`ai-moats-framework.md`](../../.claude/skills/nwai-investment-framework/references/ai-moats-framework.md) | Competitive Positioning Analyst Briefing — competitor table with vintage flags, incumbent threat map, positioning narrative | Competitive Validation (DD Report S6); `pricing-analyst` for hyperscaler-as-competitor + competitor pricing |
| **technology-analyst** | Evaluate architecture and technology claims. Run NWAi thin wrapper test (3 sub-tests). Assess Technology Readiness Level. Search IP/patents and AI moat defensibility signals. | NWAi Thin Wrapper Test (API dependency / differentiation source / switching cost); TRL 1–9 scale (NWAi minimum 5 — deal-stopper below); IP search; [`ai-moats-framework.md`](../../.claude/skills/nwai-investment-framework/references/ai-moats-framework.md); TechGroup Track A/B [`gates-and-flags-techgroup.md`](../../.claude/skills/nwai-investment-framework/references/gates-and-flags-techgroup.md) | Technology Analyst Briefing — thin wrapper verdict, TRL with evidence, IP/patent inventory, architecture signals, technical team depth | Technical Validation (DD Report S3); Scout Phase 2 (light) |
| **risk-analyst** | Surface cross-domain risks not fully covered by other agents — regulatory, exit landscape, execution, and macro/financial risk signals. Identify the top kill risks. | Regulatory pathway research (FDA/FCC/FedRAMP/HIPAA/SOC2/SEC); exit landscape + acquirer dynamics; execution risk indicators; cross-domain risk overlay | Risk Assessment Briefing — regulatory risk level, top 3 acquirers with rationale, execution flags, kill-risk shortlist | Cross-cutting risk overlay across all DD Report sections; Scout "Single Biggest Risk" requirement |
| **pricing-analyst** ★ | Independent assessment of pricing strategy, unit economics, and channel economics. Test pricing maturity (most early-stage = DISCOVERY). Forecast channel margin compression. | Pricing maturity scale (PROVEN / EARLY SIGNALS / DISCOVERY / UNKNOWN); CAC / LTV / payback; channel margin compression model (3–8× distributor markup standard); value proposition validation; competitive pricing comparison | Pricing Analyst Briefing — maturity verdict, unit economics, defensible price band, channel pressure forecast, value-to-price ratio | `forecasting-analyst` (revenue model foundation); `venture-analyst` (valuation); DD Report S5 (GTM) |
| **forecasting-analyst** ★ | Build a proprietary, independent 5-year financial forecast — NOT a render of the company's submitted projections. Three scenarios with mandatory *because* clauses. P&L + cash flow + balance sheet. Capital plan. Founder financial literacy assessment. | McMurry Method ("write the financials yourself"); "no AI slop" rule (mandatory *because* clause per scenario); Bear/Base/Bull rubric ([`diligence-scoring-rubrics.md`](../../.claude/skills/nwai-investment-framework/references/diligence-scoring-rubrics.md)); three financial statements (P&L + cash flow + balance sheet) | Forecasting Analyst Briefing — 5-year Bear/Base/Bull with *because* clauses, capital plan with round timing, runway analysis, gap-vs-company report, founder literacy assessment | `venture-analyst`; DD Report S9 (Financials); Memo Slide 3 pro forma |
| **venture-analyst** ★ | Final synthesis layer of financial diligence. Defensible valuation today. Exit valuation Y3 + Y5 across scenarios. Capital + dilution. IRR / multiple. NWA hurdle and 10x test. Deal structure recommendation. | 3-method valuation reconciliation (revenue multiple / forward multiple / discounted future value); NWA 35% IRR hurdle; NWA 10x-in-5-years criterion; deal structure framework (priced equity / convertible w/ cap / participating preferred / re-priced / decline); [`gates-and-flags.md`](../../.claude/skills/nwai-investment-framework/references/gates-and-flags.md) Return criterion | Venture Analyst Briefing — defensible valuation with comps, exit scenarios, IRR test, 10x test verdict (CLEARS / STRETCH / UNLIKELY), deal structure recommendation, founder-vs-defensible gap analysis | DD Report S8 (Deal Structure), S9 (Financials), S11 (Exit); `/decision` command; Memo Slide 4 (Returns + Deal Terms) |

★ = Financial Diligence Team (sequential chain — pricing → forecasting → venture)

---

## Coverage Themes

A high-level read of what the team collectively covers — useful for spotting gaps in the comprehensiveness review.

### Team & PMTF
Owned by `team-analyst`. Covers founder backgrounds, claim verification, full-time vs. advisor commitment depth, skills coverage, market-access gaps, and "stuck" advisor flagging. The most-skipped part of diligence in NWAi's history; this agent exists specifically to ensure it isn't.

### Market & Competition
Owned jointly by `market-analyst` (market size, structural discontinuity, timing) and `competitive-positioning-analyst` (competitor mapping, incumbent threat, positioning). Together they answer "is this market real, is it now, and who else is going for it?" Their outputs are deliberately complementary — `market-analyst` validates *whether the market exists*, `competitive-positioning-analyst` validates *who already plays in it*.

### Technology & Moat
Owned by `technology-analyst`. Covers thin wrapper detection, TRL, IP/patent position, architecture signals, and AI moat defensibility. The thin wrapper test is the most consequential single check in TechGroup's framework — a thin wrapper triggers a Strong Yellow Flag and requires explicit moat justification to advance. Moat data inputs flow back to `competitive-positioning-analyst` and `venture-analyst` for moat scoring and valuation.

### Financial & Risk
Owned by the three-agent Financial Diligence Team plus `risk-analyst`. Pricing maturity, unit economics, channel pressure, independent 5-year forecast, capital plan, defensible valuation, exit math, and the NWA 35% IRR + 10x-in-5-years tests. `risk-analyst` overlays the regulatory pathway, exit landscape, and execution risk that the financial team's models depend on but do not themselves research.

---

## Review Questions for the Diligence Team

Use these to drive a focused review session — written so any one of them, answered "yes," should generate a concrete change request.

1. **Coverage gaps.** Is there a domain we expect to assess at every TechGroup deal that no agent currently owns? (Examples to consider: cybersecurity posture, data privacy / GDPR exposure, supply-chain dependency mapping for hardware deals, board / governance review.)
2. **Role boundaries.** Is any agent's mandate too narrow (missing important signal) or too broad (diluting focus)? Where would you split or merge roles?
3. **Handoff risk.** Where could signal be lost between agents? Specifically: between `pricing-analyst` and `forecasting-analyst`, between `forecasting-analyst` and `venture-analyst`, and between the Research Team and the Financial Team.
4. **Framework alignment.** Are the frameworks each agent applies the right ones? Anything from the rubric library that should be invoked but isn't? Anything invoked that's no longer fit-for-purpose?
5. **Track A vs Track B.** TechGroup has explicit Track A (Software/AI/Cloud) and Track B (Hardware/Robotics) Opportunity rubrics. Should `technology-analyst` (or any other agent) operate differently between the two tracks? Today the same agent definition runs for both.
6. **Scout vs Diligence depth.** Five agents run at both Scout (light) and Diligence (full). Are the Scout-stage deliverables the right scope for an intro-call assessment, or are we asking too much (or too little) at that stage?
7. **The hardest question.** If you had to remove or replace one agent, which would it be, and what would you put in its place?

---

## How to Suggest Changes

This file is a derivative reference. Source-of-truth changes go to:
- **An agent's mandate or framework:** edit the corresponding file in `.claude/agents/<agent>.md`, then bump plugin version per `nwai-techgroup-pipeline-architecture.md` workflow
- **The team architecture or sequencing:** edit Layer 4 of `nwai-techgroup-pipeline-architecture.md`
- **A framework an agent references:** edit the corresponding file in `.claude/skills/nwai-investment-framework/references/`

For review feedback that doesn't yet rise to a change request, send notes to Jamie (TechGroup Co-Chair) and they will be incorporated into the next iteration.

---

*Maintained by NWAi Investment Intelligence & AI. Last updated May 7, 2026.*
