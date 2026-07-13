# NWAi Universal Triage Framework — Gates & Flags

## Purpose

This document defines the screening framework that applies across **all NWAi investment groups** (TechGroup, MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup). Every Tech-tagged or other-tagged Dealum application is screened with this framework.

The framework has three layers: hard gates (binary kills), Opportunity Score (0–30, the venture-strength signal), and Readiness Score (0–25, the engagement-readiness signal). Triage produces an ADVANCE / WATCH / DECLINE verdict.

Each group extends this universal framework with vertical-specific scoring rubrics and domain-specific filters. See:
- `gates-and-flags-techgroup.md` — TechGroup extension (Track A/B Software/Hardware bifurcation, AI Wrapper Assessment, Hardware Last Mile Standard)
- *(Future: `gates-and-flags-medical.md`, `gates-and-flags-space.md`, etc., as those pipelines come online)*

This framework supersedes the legacy 6-gate AutoKill screener (archived at `_archive/gates-and-flags-6gate-legacy.md`).

---

## Layer 1 — Hard Gates (Binary, Immediate Kill)

Apply all three gates first. A single FAIL = DECLINE. Do not proceed to scoring.

These are the only criteria that are:
(a) determinable from pitch deck materials alone, and
(b) truly non-negotiable regardless of opportunity strength.

| Gate | MET if... | FAIL if... |
|------|-----------|------------|
| **1. Foreign Entity / IP Structure** | Company appears investable from a US legal standpoint — C-Corp or convertible structure, IP owned by the US entity | Entity structure or IP ownership clearly prevents US investment (foreign HQ, foreign IP entity, VIE structure) |
| **2. Market Size Threshold** | Opportunity plausibly supports venture-scale outcomes ($500M+ TAM) | Market clearly too small to support 10x return in 5 years — not a matter of founder framing, but structural ceiling |
| **3. Commercialization Path** | Credible path to paying customers exists — MVP, beta, LOI, or clear near-term route to revenue | Purely academic, pre-concept, or no credible path to market. Research projects and demo labs with no product roadmap. |

**Gating rule:** Mark FAIL only when there is clear evidence the criterion is not met.
If pitch materials are silent on a criterion, mark MET with a note — do not fail on missing information alone.
Missing information becomes a Yellow Flag, not a gate kill.

**What is NOT a hard gate (scored in Readiness, neutral by default):**
- SAFE deal structure — a normal early-stage starting point. Scored neutrally in Readiness, negotiated to priced equity or convertible at IntroCall/close. Never a screen penalty.
- No lead investor — NWA may lead or cross-syndicate. External validation is preferred but not required; scored in Readiness, not a kill at screen.
- Product stage / MVP — scored in Readiness
- Traction / revenue — scored in Opportunity

---

## The NWA Filter — Scoring Rigor Principles

These four tests govern how scores are applied across all dimensions. They are mandatory — not optional overlays. Apply them before and during scoring. They produce hard scoring caps and required disclosures in the output.

### 1. Cynical Default
Do not take deck claims at face value. If a claim cannot be verified via web research or direct product evidence, the maximum score for that dimension is **3/5**. A score of 4 or 5 requires affirmative supporting evidence — not just the absence of contradiction.

### 2. The Goliath Test
For every deal, explicitly ask: **"Could a major incumbent in this space (e.g., NVIDIA, Microsoft, AWS, Salesforce, or a domain-specific Goliath like a hyperscaler, defense prime, large pharma, or major OEM) kill this with a feature update or program in the next 12–18 months?"** This test is mandatory when scoring Defensibility. If the answer is plausibly yes and no structural counter-argument exists, Defensibility **cannot exceed 3/5**. Document the Goliath Test result in the scoring rationale.

### 3. The LLM Ingestion Test *(applies to software/AI deals)*
For every software or AI deal, explicitly ask: **"Could a customized GPT-4o or Claude agent with access to relevant public data replicate 80% of this product's core function?"** If the answer is yes, the AI Wrapper Risk is HIGH and the Defensibility score **cannot exceed 2/5**. This test drives the AI Wrapper Assessment classification (see `gates-and-flags-techgroup.md` for the full classification rubric) and is mechanically linked to the Defensibility cap.

For non-software / non-AI deals (pure hardware, biotech, consumer goods without AI components), this test is N/A — note "LLM Ingestion: N/A — non-software" in the rationale.

### 4. Revenue Quality Audit
Do not treat ARR as a neutral signal. Categorize revenue as:
- **Sticky Revenue** — automated, API-driven, self-serve SaaS with low-touch retention
- **Stagnant Revenue** — high-touch, consulting-adjacent, services-embedded, or inertia-based (customers stay because switching is painful, not because the product is essential)

Stagnant Revenue caps the Traction score at **2/5**. If revenue quality is unclear, apply Cynical Default (max 3/5). State the revenue classification explicitly in the Traction scoring rationale.

---

## Layer 2 — Opportunity Score

**Total Possible: 30 | Threshold to Advance: ≥ 20**
WATCH range: 14–19 | DECLINE: < 14 (or any Hard Gate FAIL)

The framework prescribes **6 universal dimensions, each scored 0–5**. Each NWAi investment group's vertical file specializes the rubrics for its domain.

### Universal Scoring Scale

Use the full 0–5 scale. Avoid clustering around 3–4. Apply NWA Filter caps before assigning any score ≥ 4.

| Score | Definition |
|-------|-----------|
| 5 | Exceptional — clear, evidence-backed signal. Affirmative evidence required. |
| 4 | Strong — credible signal with minor gaps. Must survive NWA Filter. |
| 3 | Acceptable — present but not differentiated. Maximum for unverified claims. |
| 2 | Weak — thin signal, speculative, or NWA Filter cap applied. |
| 1 | Very Weak — almost absent |
| 0 | Absent — no evidence whatsoever, or explicitly absent |

### The 6 Universal Dimensions

| # | Dimension | What it asks |
|---|-----------|--------------|
| 1 | **Structural Discontinuity** | Is this riding a genuine, irreversible market shift? Why is now the right moment? |
| 2 | **Market Opportunity** ⚠️ SUB-FLOOR | Does the TAM credibly support venture-scale outcomes? Is the market growing? |
| 3 | **Founder Advantage** | Does this founding team have an earned right to win in this domain? |
| 4 | **Defensibility** | Can we see early seeds of a real moat, even at this stage? |
| 5 | **Traction** | Is there evidence of real customer pull, not just founder push? What is the quality of the revenue? |
| 6 | **Venture Economics** | Is there a credible path to a venture-scale outcome that returns 10x for NWAi? |

**Sub-floor rule (Dimension 2):** A Market Opportunity score ≤ 2 = DECLINE regardless of total. Without a credibly large addressable market, no other scoring outcome can produce an investable deal.

**No-zero rule:** Any individual Opportunity dimension scoring 0 = DECLINE regardless of total. A complete absence of evidence on any dimension is a screening kill.

**Group-specific rubrics:** The 0–5 scoring detail for each dimension lives in each group's vertical file. TechGroup uses Track A (Software/AI/Cloud) and Track B (Hardware/Robotics/Physical Tech) bifurcations — see `gates-and-flags-techgroup.md`. Other groups will publish their own rubrics as their pipelines come online.

---

## Layer 3 — Readiness Score (0–5 per dimension, 25 points total)

Readiness scores inform the Scout briefing and flag specific friction items for the IntroCall conversation. Readiness does not independently produce a DECLINE — but a low Readiness score on an otherwise advancing deal **downgrades the verdict from ADVANCE to WATCH**.

**Scoring principle for unknowns:** If pitch materials are silent on a Readiness dimension, score **2** (not 0). Reserve 0 for explicit evidence of absence. Silent decks are a Readiness friction note, not a structural kill.

### Dimension 1 — Deal Structure
*What is the current proposed deal structure?*

Priced equity is a positive signal when present, but a SAFE is the normal early-stage starting point and is **neutral, not a penalty**. NWA negotiates structure to priced equity or convertible at IntroCall/close. Only founder inflexibility on a structure NWA cannot close, or a genuinely incompatible structure, scores below neutral.

- 5: Priced equity round (Seed or Series A). Clean cap table. *(bonus — strong external structure already in place)*
- 4: Convertible note with reasonable terms.
- 3: SAFE or convertible on standard terms — the normal early-stage starting point. NWA negotiates to priced equity or convertible at close. *(neutral)* Note: "SAFE is a normal starting point; confirm flexibility at IntroCall."
- 2: SAFE/convertible with unusual or aggressive terms (very high cap, stacked discounts) needing cleanup.
- 1: Founder signals no flexibility on a structure NWA cannot close (insists SAFE-only, refuses conversion).
- 0: Explicitly incompatible structure (e.g., token-based, revenue share only, no equity component).

### Dimension 2 — Product Maturity
*Where is the product in its development lifecycle?*

- 5: Revenue-generating product with retention metrics.
- 4: Paying beta customers. MVP validated.
- 3: MVP live, active beta users, no revenue yet.
- 2: Prototype only. No user validation. Or: no product information disclosed.
- 1: Design/concept stage. No working product.
- 0: Idea only. No product evidence.

### Dimension 3 — Syndication Readiness
*Is the round real and forming, with a credible syndication path? (External lead/co-investor preferred for validation; NWA leading or cross-syndicating is acceptable under NWA's standard model.)*

An external lead or co-investor is a positive validation signal when present. NWA leading or cross-syndicating is **acceptable and neutral** — not a flag. Only an unformed round with no plan, or a founder unaware of syndication norms, scores below neutral.

- 5: Round forming with a committed external lead/co-lead (term sheet or strong indication). *(bonus — strongest external validation)*
- 4: Named credible external co-investors in conversation; round taking shape.
- 3: Some investor interest forming, OR NWA would lead / cross-syndicate — acceptable under NWA's standard model. *(neutral)* Note: "External lead/co-investor preferred for validation; NWA leading or cross-syndicating is acceptable. Confirm round status at IntroCall."
- 2: No syndication information disclosed, or round not yet formed and unclear.
- 1: No co-investors and founder appears unaware of syndication norms / no plan.
- 0: Explicit structural absence — no round, no plan, no engagement.

### Dimension 4 — Traction Velocity
*Is the company growing, and is growth accelerating or stagnating?*

Score on: month-over-month or quarter-over-quarter growth rate in revenue or active users; growth trajectory (accelerating, linear, plateauing); whether growth appears driven by product pull or founder-led sales effort. Apply Revenue Quality Audit — Stagnant Revenue growth signals do not score above 2.

- 5: MoM growth rate ≥ 15% sustained over 3+ months. Accelerating. Sticky Revenue growth confirmed.
- 4: Consistent positive growth trend. Growth rate credible. Revenue quality appears Sticky.
- 3: Early-stage growth with limited data. Trajectory positive but unverified. Or: meaningful growth but quality unclear.
- 2: Flat or declining signals, OR growth present but Stagnant Revenue classification applies, OR no growth data disclosed.
- 1: Explicit plateau or contraction.
- 0: No traction or pre-revenue with no growth signals.

### Dimension 5 — Founder Accessibility
*Is this founder reachable, US-based, and ready for an engagement process?*

- 5: US-based, responsive, professional pitch submission with complete materials.
- 4: US-based, submission complete, minor gaps in materials.
- 3: US-based but submission materials thin. Some follow-up required.
- 2: Location unclear or international founder with US entity. Or: submission very incomplete. Verify geography.
- 1: Submission materials very incomplete. Likely not ready for process.
- 0: No contact information or clearly unreachable.

---

## Readiness Downgrade Rule

If Opportunity Score ≥ 20/30 (ADVANCE) but Readiness Score < 15/25, the verdict is automatically downgraded to **WATCH** with specific re-engagement milestones named for each friction dimension scoring ≤ 2.

**Carve-out — Deal Structure & Syndication do not downgrade on their own:** Deal Structure (Dim 1) and Syndication Readiness (Dim 3) are negotiated post-IntroCall outcomes, not screen-stage blockers. They must not, by themselves, downgrade an ADVANCE. If the only dimensions pulling Readiness below 15 are Dim 1 and/or Dim 3, **hold ADVANCE** and list them as IntroCall negotiation items rather than downgrading to WATCH. A downgrade requires friction in at least one of the other three Readiness dimensions (Product Maturity, Traction Velocity, Founder Accessibility).

**Exception — Strong Readiness on WATCH:** Readiness score ≥ 18/25 on a WATCH deal → note "Readiness is strong; prioritize re-engagement when opportunity matures."

---

## Research Protocol

Deploy WebSearch on exactly **three dimensions** before scoring. Do not exceed this at Screen stage — save full research for Scout and Diligence agents.

**Search 1 — Market Opportunity Validation**
Search: `"[company sector/industry] market size [current year]"`
Goal: Find 1–2 third-party market sizing references (Gartner, IDC, CB Insights, industry reports). Compare against founder TAM claim. If founder TAM is > 3× bottoms-up estimate, note the discrepancy and apply Cynical Default to Market Opportunity score. Flag the gap in the output.

**Search 2 — Founder Advantage Validation**
Search: `"[founder name] LinkedIn"` and `"[company name] Crunchbase"`
Goal: Verify domain background, prior companies, exits, and any notable advisors or investors. Discrepancies between deck claims and web findings trigger Cynical Default on the Founder Advantage score.

**Search 3 — Incumbent / Competitive Landscape**
Search: `"[company sector] market leaders"` or `"[company name] competitors"` or `"[company sector] [known incumbent] [product area]"`
Goal: Identify the dominant incumbents in the space and assess whether any major incumbent (NVIDIA, Microsoft, AWS, Salesforce, Google, Apple — or domain-specific Goliaths like Pfizer, Lockheed, P&G, John Deere) is building in this direction. This search directly enables the **Goliath Test** for Defensibility scoring. If a major incumbent has an announced roadmap item that overlaps with this company's core function, flag it explicitly. Takes 2–3 minutes. Required for any score of 4–5 on Defensibility.

**All other research (patent searches, regulatory landscape, customer references, technical stack depth) is Scout and Diligence-stage work.** Do not deploy team-analyst or competitive-positioning-analyst agents at Screen stage.

---

## Decision Logic

### ADVANCE TO SCOUT
- All 3 Hard Gates: MET
- Opportunity Score: **≥ 20 / 30**
- Market Opportunity dimension: **≥ 3** (sub-floor enforced)
- No individual Opportunity dimension = 0
- Readiness Score: **≥ 15 / 25**
- Output includes 3–5 Live Pitch Questions (group-specific format)

### WATCH — Active
- All 3 Hard Gates: MET
- Opportunity Score: **14–19 / 30**, OR
- Opportunity Score ≥ 20 / 30 **but Readiness < 15 / 25** (Readiness Downgrade Rule)
- Market Opportunity dimension: ≥ 3
- Output must name specific, measurable milestone(s) for re-engagement for each dimension scoring ≤ 2
- Examples: "Re-engage when ARR reaches $250K", "Re-engage when Series A lead commits", "Re-engage when priced equity round is structured"
- Note: structure/syndication milestones (e.g., priced round, lead commit) are legitimate re-engagement markers but are **not, on their own, downgrade triggers** — see the Deal Structure & Syndication carve-out in the Readiness Downgrade Rule
- WATCH is rare and intentional — not a soft decline

### DECLINE
- Any Hard Gate: FAIL, OR
- Opportunity Score: **< 14 / 30**, OR
- Market Opportunity score: **≤ 2**, OR
- Any individual Opportunity dimension = 0
- Output names the primary kill reason in one sentence

---

## Output Format

The screener produces:
1. A structured in-chat Triage Report (tables, scores, flags, recommendation)
2. A Word document saved to `deals/` folder

The in-chat report uses the NWA Triage Report format:
- Signal Summary at top (scores + verdict + group/track if applicable)
- Company Snapshot table
- Hard Gates table
- NWA Filter Results (Goliath Test, LLM Ingestion Test outcomes for software/AI deals)
- Opportunity Score table (6 dimensions, group-specific rubrics)
- Readiness Score table (5 dimensions)
- Risk Flags (Red + Yellow)
- Recommendation block — for ADVANCE deals, includes group-specific next-step format (e.g., Live Pitch Questions for TechGroup)

For the full structured output template, see each group's vertical file and the `/screen` command.

---

## Technology Readiness Levels (TRL) — GAO Scale (Reference)

NWAi requires TRL ≥ 5 for hardware-bearing or technical deals. (Detailed application of TRL to scoring lives in group-specific files — e.g., TechGroup Track B Dimension 4.)

| TRL | Description |
|-----|-------------|
| 1 | Basic principles observed and reported |
| 2 | Technology concept/application formulated |
| 3 | Analytical and experimental proof of concept |
| 4 | Component validation in lab environment |
| **5** | **Component validation in relevant environment ← NWAi minimum** |
| 6 | Prototype demonstration in relevant environment |
| 7 | System prototype in operational environment |
| 8 | Actual system completed and qualified |
| 9 | Actual system proven through mission operations |

---

*NWAi Universal Triage Framework | v2.0 | April 2026*
*Replaces legacy 6-gate AutoKill (archived at `_archive/gates-and-flags-6gate-legacy.md`).*
*Group-specific extensions: TechGroup (`gates-and-flags-techgroup.md`); MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup TBD.*
