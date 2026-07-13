# NWAi Diligence Scoring Rubrics

Proprietary scoring frameworks applied during diligence. Reference this file when running
any quantitative assessment during the Scout or Diligence stages.

All scores feed into the final Investment Memo and IC presentation.

---

## 1. Moat Scoring (Four-Tier)

Run Tier 1 and Tier 3 for every deal. Run Tier 2 only for AI-first or AI-enabled companies.
Run Tier 4 only for deals with a model supply chain (any product calling third-party models).

### Tier 1: General Business Moat (Score 0–6)

Award 1 point for each present:

| # | Moat Element | Present? |
|---|-------------|---------|
| 1 | **Network effects** — value increases as more users join | ✓ / ✗ |
| 2 | **Switching costs** — painful or expensive for customers to leave | ✓ / ✗ |
| 3 | **Proprietary data** — unique datasets competitors cannot access or replicate | ✓ / ✗ |
| 4 | **IP / Patents** — filed, granted, or defensible trade secrets | ✓ / ✗ |
| 5 | **Regulatory barriers** — licenses, certifications, compliance layers others must clear | ✓ / ✗ |
| 6 | **Vertical specialization** — deep domain expertise in a defensible niche | ✓ / ✗ |

**General Moat Score = sum of checkmarks**

| Score | Assessment | Implication |
|-------|------------|-------------|
| 0–1 | No Moat | High competitive risk — likely pass |
| 2–3 | Weak Moat | Needs exceptional execution or strong team to compensate |
| 4–5 | Moderate Moat | Defensible — advance with standard diligence |
| 6 | Strong Moat | Multiple defensive layers — high conviction signal |

---

### Tier 2: AI Moat Scoring (Score 0–10) — AI companies only

**Applicability gate:** Before scoring, explicitly answer: "Is this an AI-first or AI-enabled company?" If NO → mark Tier 2 as N/A with a one-line reason (e.g., "N/A — hardware product; no AI model or data flywheel present") and skip entirely. Do not force-apply AI Moat scoring to hardware companies, physical product companies, or non-AI software.

#### Cognitive / Data Moats (max 4 pts)

| Points | Element | What to look for |
|--------|---------|-----------------|
| 2 | **Training Data Moat** | Unique dataset for model training that competitors cannot access |
| 1 | **Inference Data Moat** | Product generates proprietary operational data flywheel as it's used |
| 1 | **Memory Lock-in** | Stores customer-specific context/history that creates real switching cost |

**Cross-stage bridge (Two Sustainable Advantage Tests):** These elements score, at Diligence depth, the same front-door moat lens applied at Screen (Track A D4) and Scout (Q3) — see `ai-moats-framework.md` → "The Two Sustainable Advantage Tests." Carry the Scout PRESENT/ABSENT reads forward and pressure-test them here:
- **Sustainable Training Advantage** (data-in) → scored via *Training Data Moat* above + *Custom model training* under Capital/Compute. Note: the *Inference Data Moat* row is an operational *data flywheel* (data generated at runtime that feeds back) — it is a training-side signal, **not** inference economics.
- **Sustainable Inference Advantage** (data-at-runtime: distillation, proprietary serving, cost-per-query/latency edge that widens with volume) → assessed under *Proprietary hardware / infrastructure* (Capital/Compute) and carried from the Scout Inference-edge read. If the Scout Inference edge was PRESENT, confirm the mechanism here; if ABSENT, treat full API pass-through as margin-compression risk in the financial model.

#### Capital / Compute Moats (max 2 pts)

| Points | Element | What to look for |
|--------|---------|-----------------|
| 1 | **Custom model training** | Requires substantial compute investment — not replicable cheaply |
| 1 | **Proprietary hardware / infrastructure** | Specialized compute environment not available off the shelf |

#### Vertical / Workflow Moats (max 4 pts)

| Points | Element | What to look for |
|--------|---------|-----------------|
| 2 | **Deep workflow integration** | Embedded in daily operations — not just an API wrapper |
| 1 | **Regulatory / compliance layer** | HIPAA, SOX, FedRAMP, etc. — costly for competitors to replicate |
| 1 | **Multi-sided network effects** | Platform connecting multiple participant types |

**AI Moat Score = sum of points**

| Score | Category | Investment Signal |
|-------|----------|------------------|
| 0–2 | Thin Wrapper | Auto-reject — commodity risk is too high |
| 3–4 | Weak Moat | Pass unless exceptional team + traction |
| 5–6 | Moderate Moat | Proceed with caution — monitor moat development |
| 7–8 | Strong Moat | Advance to full diligence |
| 9–10 | Exceptional Moat | High priority deal |

#### Thin Wrapper Detection — Run These 3 Tests First

**Test 1 — API Dependency:**
Could this product be rebuilt in a weekend using OpenAI / Anthropic APIs?
→ If YES: AI Moat score ≤ 2. Flag as thin wrapper.

**Test 2 — Differentiation Source:**
Where does the value actually come from?
→ Just prompt engineering → thin wrapper
→ Proprietary data + workflow integration → real moat

**Test 3 — Switching Cost:**
Can a customer switch to a competitor in less than one week with no meaningful loss?
→ If YES: No lock-in. AI Moat score ≤ 3.

### Tier 3: Agent-Era Readiness (Score 0–15) — run for every deal

*Full framework: `references/agent-era-readiness-framework.md`. This is the diligence-depth scored
application of the third always-active lens. Unlike Tier 2 (which has an AI applicability gate),
Tier 3 runs for **every** deal — the substrate shift reshapes non-AI businesses too (a per-seat
SaaS, an ad-funded marketplace, a human-funnel services firm are all exposed regardless of whether
they use AI).*

**Distinction from Tier 2:** Tier 2 AI Moat tests *replicability of the build* (is it a thin
wrapper?). Tier 3 tests *whether the problem itself survives the agent shift* and where value lands
when agents are the actor and consumer. A deal can pass Tier 2 (real AI moat) yet fail Tier 3
(solving a problem agents dissolve), or vice versa.

Score three dimensions 0–5 each (see framework for full anchors), on both horizons (durable-now /
visionary-arc); note the gap:

| Dimension | Tests |
|-----------|-------|
| **Problem Reimagination** (0–5) | Does the founder solve the problem as agents will reshape it, or as it exists today? |
| **Position in the Agent Economy** (0–5) | Where does value land — human-to-act-on vs agent-to-complete; does the revenue model (seat vs outcome) and cost model survive when agents are buyer and worker? |
| **Agent-Era Moat** (0–5) | What stays defensible when agents can scrape/replicate the surface — un-scrapable value, flywheel under agent load, transactional plumbing, accountability/trust, governance of memory? |

**Then state, in plain member-readable language, whether the agent wave helps or hurts the company**
(HELPS / HURTS / MIXED). If it isn't already in its strongest position, add **"Could get stronger
if:"** (the one concrete thing that would make it more durable) and **"What to watch:"** (the
milestone that confirms it — this becomes a watch condition or a deal-structure lever). Keep the
internal posture label (Threatened / Riding / Enabling / Insulated) on the deal-team line only.

| Total (0–15) | Verdict | Investment Signal |
|---|---|---|
| 12–15 | REIMAGINING | Building for the world arriving — visionary + durable |
| 8–11 | ADAPTING | Aware, partially positioned; durable near-term, arc unproven |
| 4–7 | EXPOSED | Solving today's problem; vulnerable as the shift advances |
| 0–3 | BLIND | No reckoning; beautiful solution to a dissolving problem |

**Flag triggers:** ⚠️ solving a problem agents likely dissolve within the ~5-yr hold; ⚠️ per-seat
or ad/engagement revenue model with no outcome/usage path; ⚠️ Strong Yellow if value proposition is
fully ingestible by an agent in <48h; ❌ Threatened posture with no credible, funded path to
Riding/Enabling (default to pass — quality of the present-day solution is not a mitigant).

### Tier 4: Alpha-AI Sovereignty (Score 0–15) — gated to deals with a model supply chain

*Full framework: `references/alpha-ai-sovereignty-framework.md`. This is the diligence-depth scored
application of the fourth always-active lens. Installed July 2026 (Phase 2). Unlike Tier 3, which
runs for every deal because agents reshape demand for every product, Tier 4's mechanism requires a
model supply chain: it applies to any product calling third-party models. Non-AI deals record
**"Tier 4: N/A — no model supply chain"** and skip the tier.*

**Distinction from Tiers 2 and 3:** Tier 2 tests *replicability of the build* (is it a thin
wrapper?); Tier 3 tests *whether the problem survives agents*; Tier 4 tests *who captures the alpha
along the model supply chain* — does the company's edge (and its customers') stay home, or drain up
to the lab it builds on? A deal can hold a real AI moat (Tier 2), survive the agent shift (Tier 3),
and still be feeding its differentiator to its likeliest future competitor.

Score three dimensions 0–5 each (full anchors and investor signals in the framework), on today's
posture plus one direction-of-travel line (strengthens or erodes over the hold period):

| Dimension | Tests | Primary evidence source |
|-----------|-------|------------------------|
| **Alpha Containment** (0–5) | Does the company's own alpha leak to the labs it builds on — what actually transits the API, and are no-train/ZDR terms verified in the agreement? | `technology-analyst` (architecture read) + `risk-analyst` (terms verification) |
| **Model-Layer Independence** (0–5) | Can it move house — maintained evals, demonstrated switching, open-weight/sovereign deployment feasibility? | `technology-analyst` |
| **Customer Sovereignty Alignment** (0–5) | Does the go-to-market survive buyers demanding sovereignty — or is the product a conduit for customer alpha? | `risk-analyst` (regulatory exposure) + `competitive-positioning-analyst` (sovereignty demand evidence) |

**Then state the member-facing read** (KEEPS / MIXED / LEAKS) with **"Could get stronger if:"** and
**"What to watch:"** lines; keep the internal posture (Leaking / Hedged / Sovereign / Enabler) on
the deal-team line only. Verified containment established here — terms confirmed in the actual
agreement, switching demonstrated — is what clears the Scout-stage conduit cap.

| Total (0–15) | Verdict | Investment Signal |
|---|---|---|
| 12–15 | FORTIFIED | Alpha contained, portable, sovereignty-aligned |
| 8–11 | HEDGED | Dependent but contained; the negotiable norm — write containment milestones into watch items or terms |
| 4–7 | LEAKY | Meaningful uncontained flow; containment path required to advance |
| 0–3 | CAPTURED | Structurally feeding its own predator; no credible exit |

**Agent assignments (Diligence launch):** `technology-analyst` → D1 + D2 evidence (what actually
transits the API, abstraction-layer reality — evals? second integration? — open-weight feasibility,
sovereign deployment maturity); `risk-analyst` → contract/dependency risk (provider ToS and
no-train/ZDR verification as a named diligence item — tier, exclusions, retention windows;
partnership concentration; HIPAA/ITAR/GDPR/EU-AI-Act pressure on the conduit question;
customer-side sovereignty demand as market risk); `competitive-positioning-analyst` → lab
vertical-integration signals into the category (feeds the Replicability Matrix LLM-provider-row
annotation), sovereignty-demand evidence in the buyer market (RFP language, on-prem/VPC
requirements), Enabler-category competitive mapping.

**Flag triggers:** ⚠️ Customer-Alpha Conduit (regulated/proprietary customer data through frontier
APIs, no sovereign path); ⚠️ Own-Alpha Exposure (differentiator transits a single provider, no
verified containment); ❌ Captured pattern (single-provider dependency + that lab shipping into the
category + alpha transits that provider — default to pass); standing Appendix A item for all AI
deals: *"Obtain model-provider agreement; confirm no-train/ZDR terms, tier, and exclusions."*

---

## 2. Risk Scoring (1–10 per category)

Score each category 1–10 where **10 = highest risk**. Apply at Diligence stage.

### Five Risk Categories

**1. Execution Risk**
- Team size vs. scope (understaffed for what they're trying to do?)
- Key-person dependency (single founder / single technical expert?)
- Operational complexity (manufacturing, regulatory, multi-sided marketplace?)
- **Team commitment depth** (from `team-analyst` Team Commitment Depth output):
  - Full-time ratio: ≥80% = +0 risk; 60-79% = +1 risk; 40-59% = +2 risk; <40% = +3 risk (typically forces score ≥ 8)
  - "Stuck" advisors (passive logos with no engagement): +1 risk per identified instance
- **Product-Team Fit** (from `team-analyst` Product-Team Fit Assessment — diligence mode):
  - STRONG = +0 risk; MODERATE (one fillable build-side gap) = +1 risk; WEAK (technical depth mismatch with product demands or no shipping evidence) = +3 risk
- **Market-Team Fit** (from `team-analyst` Market-Team Fit Assessment — diligence mode):
  - STRONG = +0 risk; MODERATE = +1 risk; WEAK = +3 risk
  - **Network Map evidence** — if zero connections surface to named target accounts AND no channel/KOL relationships, add +2 risk on top (this is the "engineer who built widget but team has no buyer relationships" pattern; weight is higher than legacy PMTF rubric because this lens is now treated as a separate risk channel)
- **Key-Seat Completeness** (from `team-analyst` Key-Seat Completeness Checklist — stage-appropriateness baked in):
  - All 6 seats filled or stage-appropriate (➖) = +0 risk
  - One ⚠️ (founder doubling / fractional / disclosed hiring plan) = +0 risk if hiring plan is credible, otherwise +1 risk
  - Any 🔴 (stage-inappropriate gap) = +2 risk per gap (cap +3)
  - Sales / GTM gap at Seed+ with paying customers is the most common 🔴 and the highest-leverage signal; flag for soft-condition consideration
- **Staff bench strength** (from `team-analyst` Staff Deep-Dive — diligence mode only):
  - STRONG (VP hires with market-relevant credentials + relationships brought in) = -1 risk (offsets founder Execution Risk)
  - WEAK or founder-only team at stage where VP hires are expected (e.g., Series A with $2M ARR and no Head of Sales) = +1 risk
- **Founder claim verification** (from `team-analyst` People Verification Brief):
  - All specific claims VERIFIED = +0 risk
  - Any UNVERIFIED specific claims = +1 risk per claim (cap +2)
  - Any ❌ CONTRADICTED claim = +3 risk and immediate flag for IC; treat as deal-stopper unless founder has a documented explanation

**2. Market Risk**
- Adoption barriers (requires significant behavior change?)
- Incumbent response (will Big Tech or a well-resourced player squash them?)
- Market timing (too early to gain traction / too late to win share?)

**3. Financial Risk**
- Runway < 12 months with no revenue
- Burn rate vs. progress (spending efficiently toward milestones?)
- Unit economics unclear, negative, or unvalidated

**4. Technical / Product Risk**
- Unproven core technology (still in R&D / TRL < 5)
- Regulatory approval required and path is uncertain (FDA, FCC, FedRAMP)
- Product-market fit not yet validated by paying customers

**5. Competitive Risk**
- Weak moat — easily replicable by a funded competitor
- Crowded space — 10+ well-funded competitors with similar approach
- Competing directly with Big Tech (Google, Microsoft, Amazon in the same lane)
- Adjacent displacement risk — functionally equivalent solutions from an adjacent category or hyperscaler native build that could displace the company even if it wins its direct competitive set (carry forward Adjacent Displacement Risk score from Scout Q5)

### Risk Score Interpretation

| Overall Average | Implication |
|----------------|-------------|
| < 5 | Manageable risk profile |
| 5–7 | Moderate risk — document mitigants explicitly |
| > 8 | High risk — needs exceptional upside to justify |
| Any single category = 10 | Likely pass |
| 3+ categories ≥ 7 | Execution / market / financial trifecta — flag for IC |

**Output format:**

```
| Risk Category   | Score (1-10) | Key Concern (one sentence)   |
|-----------------|--------------|------------------------------|
| Execution       | X            |                              |
| Market          | X            |                              |
| Financial       | X            |                              |
| Technical       | X            |                              |
| Competitive     | X            |                              |

Overall Risk Score: [average]/10
Critical Risks (8+): [list]
Deal-Breakers: [flag if 2+ scores are 9+, or any score is 10]
```

---

## 3. Financial Model — Bear / Base / Bull Framework

**Source:** As of plugin v2.13.0, the Bear/Base/Bull forecast is produced by the **forecasting-analyst** agent using the McMurry method (proprietary forecast built from comps and pricing-analyst inputs, NOT from the company's submitted spreadsheet). The /diligence command consumes the forecasting-analyst's output directly. This rubric describes the framework the agent applies.

### Mandate: Analyst POV with *Because* Clauses

Each scenario must have an explicit *because* clause. A range of growth rates without a *because* is AI slop, not analysis. The forecasting-analyst is required to articulate what has to be true for each scenario to play out.

### Revenue Projection (Years 1–5)

Build three scenarios. Use these growth rate benchmarks as starting anchors, then adjust based on comps and pricing-analyst output:

| Scenario | Growth Rate | Assumptions | *Because* Clause Required |
|----------|-------------|-------------|----------------------------|
| **Bear (Low)** | 20–40% YoY | Slow adoption, higher churn, market headwinds, bottom 25th percentile benchmarks | What has to fail for this scenario to play out (specific and falsifiable) |
| **Base (Medium)** | 50–100% YoY | Steady adoption, normal churn, neutral market, median benchmarks | What has to be true for this scenario at comp-set median |
| **Bull (High)** | 100–200% YoY | Fast adoption, low churn, strong tailwinds, top 25th percentile benchmarks | What has to be true beyond comp-set median (specific and falsifiable) |

**Revenue formula:**
```
Revenue(t) = Customers(t) × ARPU(t) × (1 - Churn Rate(t))
```

**Note:** ARPU(t) is time-varying because the pricing-analyst forecasts margin compression where channel pressure exists. Do not assume ARPU holds flat across the 5-year forecast.

### Unit Economics Benchmarks

| Metric | Formula | Healthy Benchmark |
|--------|---------|-------------------|
| CAC | Sales + Marketing spend ÷ New customers acquired | Varies by model |
| LTV | ARPU × (1 ÷ Annual Churn Rate) | > 3× CAC |
| LTV : CAC | LTV ÷ CAC | > 3:1 |
| Payback period | CAC ÷ (ARPU × Gross Margin) | < 12 months ideal |
| Gross Margin | (Revenue − COGS) ÷ Revenue | > 70% for SaaS |

**Note:** For hardware or one-time sale models, LTV/CAC is less relevant. Focus on gross margin, payback period, and customer acquisition efficiency instead.

**Red flags:**
- LTV : CAC < 1.5:1 (for recurring revenue models)
- Payback > 24 months
- Gross margin < 50% for a software company
- Runway < 6 months with no revenue

### Exit Valuation Scenarios

| Case | Percentile | Scenario |
|------|-----------|----------|
| **Low** | 10th | Challenged execution, competitive pressure |
| **Base** | Median | Meets projections, normal market conditions |
| **High** | 75th | Exceeds targets, strong strategic value to acquirer |

Use comparable company analysis + venture capital method. Apply revenue multiples from
recent comparable exits in the relevant TechGroup theme sector.

**NWAi return target check:** Does the Base Case exit valuation support a 10x return
on NWAi's entry valuation within 5 years? If not, document the gap explicitly for IC.

**As of plugin v2.13.0:** The 10x-in-5-years test and the 35% IRR hurdle test are produced by the **venture-analyst** agent, which synthesizes the forecasting-analyst's exit projections with comp-based exit multiples and dilution modeling. The venture-analyst's recommended deal structure (priced equity / convertible with cap / participating preferred / re-priced terms / decline) is the canonical input to the /decision command.

---

## 4. Market Sizing — Bottoms-Up Methodology

Always verify founder TAM claims against a bottoms-up calculation.

```
SAM = Serviceable customers × Annual spend per customer
SOM = SAM × Realistic 3–5yr penetration %
```

**Validation check:** If company's stated TAM is > 3× your bottoms-up estimate → flag as inflated. Require sourcing.

**Market growth scoring:**

| CAGR | Score |
|------|-------|
| > 15% | High growth — favorable timing |
| 8–15% | Moderate growth — acceptable |
| < 8% | Slow / mature — requires strong differentiation thesis |

**"Why Now" timing score (0–5):**
Count how many of these apply:
- New technology enabler just became available
- Regulatory change creates opening
- Demographic or behavior shift reaching critical mass
- Cost of solution has dropped to viable threshold
- Pain point has reached critical mass with target buyers

Score ≥ 3: Strong timing thesis. Score < 2: Timing risk — flag for IC.

---

## How These Rubrics Compose

During diligence, apply rubrics in this sequence — each feeds the next:

```
Market Sizing → validates TAM/SAM assumptions in Financial Model
Competitive Intel → informs Moat Score (Tier 1, 2, 3 & 4)
Founder Research → feeds Execution Risk score
Moat Score → feeds Competitive Risk score
Agent-Era Readiness (Tier 3) → informs Competitive + Market Risk; posture feeds exit/return thesis
Alpha-AI Sovereignty (Tier 4) → informs Competitive + Financial Risk; provider-terms item → Appendix A
All five → synthesized into Risk Score
All six → inform the Financial Model exit scenarios
```

The `/diligence` command and `/memo` command both reference this file. As of plugin v2.13.0, the full agent team is:

**Stage 2A (parallel):**
- `team-analyst` — mode-aware (scout / diligence); bifurcated Product-Team Fit + Market-Team Fit; Staff Deep-Dive; Network Map (diligence mode); Key-Seat Completeness; Team Commitment Depth; Founder Profile Tags; founder claim verification
- `market-analyst` — structural discontinuity, TAM/SAM/SOM, market timing
- `competitive-positioning-analyst` — competitor mapping, comp set construction (feeds forecasting + venture analysts)
- `technology-analyst` — thin wrapper test, TRL assessment, IP/patents
- `risk-analyst` — regulatory pathways, exit landscape (feeds venture-analyst), execution risk
- `pricing-analyst` — pricing maturity, unit economics, channel pressure, pricing pressure forecast

**Stage 2B (sequential — financial diligence chain):**
- `forecasting-analyst` — independent 5-year forecast (proprietary, McMurry method), capital plan, founder financial literacy
- `venture-analyst` — defensible valuation, IRR / 35% hurdle / 10x test, deal structure recommendation

---

## Layer 2 Rubric Mapping

Each rubric feeds a specific Layer 2 Hypothesis Confirmation group. When generating Layer 2
conclusions in the DD Kickoff Package, use these mappings to anchor each conclusion to the
relevant rubric outputs:

| Rubric | Primary Layer 2 Group | Secondary Group |
|--------|----------------------|-----------------|
| Moat Tier 1 (General) | Technical Validation | Competitive Validation |
| Moat Tier 2 (AI Moat) | Technical Validation | Commercial Validation |
| Moat Tier 3 (Agent-Era Readiness) | Competitive Validation | Market Validation |
| Moat Tier 4 (Alpha-AI Sovereignty) | Technical Validation | Competitive Validation |
| Risk — Execution | Team Validation | — |
| Risk — Market | Market Validation | Competitive Validation |
| Risk — Financial | Financial Validation | — |
| Risk — Technical | Technical Validation | — |
| Risk — Competitive | Competitive Validation | Market Validation |
| Financial Model (Bear/Base/Bull) | Financial Validation | — |
| Market Sizing (TAM/SAM) | Market Validation | Financial Validation |

**Layer 2 conclusion quality rule:** A Layer 2 conclusion is only as strong as the rubric
inputs that anchor it. If a rubric cannot be scored (missing data), the corresponding Layer 2
group signal should be 🟡 at best. If a rubric produces a deal-stopper result (e.g., Thin
Wrapper, TRL < 5, Risk score ≥ 9), the corresponding Layer 2 group must be 🔴.
