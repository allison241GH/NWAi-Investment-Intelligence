# NWAi TechGroup — Screener Framework v2.0 (TechGroup Extension)

> **This document is the TechGroup-specific extension to the NWAi Universal Triage Framework.**
> The universal framework (3 hard gates, NWA Filter, Readiness scoring, Research Protocol, Decision Logic, Output Format) lives in `gates-and-flags.md` and applies to all NWAi verticals.
>
> This file contains **only TechGroup-specific content** that overrides or extends the universal framework:
> - TechGroup-calibrated design principles (Dealum funnel context)
> - **Track Determination** (Track A vs Track B — TechGroup-only bifurcation)
> - **Track A — Software / AI / Cloud** (6-dimension Opportunity rubric)
> - **Track B — Hardware / Robotics / Physical Tech** (6-dimension Opportunity rubric)
> - **AI Wrapper Assessment** (Track A only)
> - **Replicability Speed Flag** (also applies at Scout and Diligence)
> - TechGroup Live Pitch Questions guidance
>
> When screening a Tech-tagged deal, apply the universal hard gates and NWA Filter from `gates-and-flags.md` first, then determine Track and apply the appropriate 6-dimension Opportunity rubric below. Readiness scoring, decision logic, and output format are inherited from the universal framework.
>
> Medical and Space verticals retain separate hard-gate screener frameworks; ConsumerGroup, IndustrialGroup, and FintechGroup default to the universal framework without track bifurcation.

---

## Design Principles (TechGroup Calibration)

This screener is calibrated for the Dealum inbound funnel, which historically produces
zero funded deals (3 years, ~3,000 pitches). Its purpose is **not** to find investments —
it is to identify the ~10% of deals worth a 30-minute Scout assessment and a Live Pitch slot
in the bi-weekly TechGroup meeting. Screen to Scout. The diamond-finding happens at Scout
and Live Pitch, not here.

Two calibration facts drive all threshold decisions:
- Team capacity: 6 Scout/Live Pitches per month (3 per bi-weekly meeting)
- Target advance rate: ~11% of Dealum inbound (roughly 1 in 9 deals)

---

## Track Determination

Assign every Tech-tagged deal to one track before scoring Opportunity. Use the primary revenue and product model — not the presence of software components alone.

- **Track A — Software / AI / Cloud**: Primary value delivery is software, data, algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace. Examples: enterprise SaaS, AI workflow tools, data platforms, fintech software, vertical AI.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary deliverable. Revenue includes hardware unit sales, manufacturing, or embedded systems. Examples: robotics, semiconductors/chips, physical AI devices, industrial automation, defense hardware.

Mixed plays (e.g., software-enabled hardware) should default to Track B if a physical product is necessary for the product to function.

Once Track is determined, apply the corresponding 6-dimension Opportunity rubric below. Each rubric scores out of 30 points; the universal Decision Logic (ADVANCE ≥ 20/30, WATCH 14–19, DECLINE < 14) applies unchanged.

---

## Track A — Software / AI / Cloud (6 Dimensions × 5 = 30 pts)

### Dimension 1 — Structural Discontinuity
*Is this riding a genuine, irreversible market shift? Why is now the right moment?*

Score on: clarity of the "why now" argument; evidence of a real structural shift (regulatory, technological, behavioral) vs. incremental improvement dressed as disruption; whether the timing argument would have been equally valid 3–5 years ago.

- 5: Unmistakable, named structural shift with clear timing logic. Category-creating. Independently verifiable.
- 4: Clear "why now" with evidence. Shift is real and near-term, not speculative.
- 3: Reasonable "why now" but the shift is evolutionary rather than discontinuous. Or: compelling argument but unverified.
- 1: No timing argument. Could have been built any time in the past decade.
- 0: No evidence of market shift awareness.

→ **Scout mapping:** Expands to Category & Market Discontinuity (Q1) at Scout stage.

### Dimension 2 — Market Opportunity ⚠️ SUB-FLOOR: score ≤ 2 = DECLINE regardless of total
*Does the TAM credibly support venture-scale outcomes? Is the market growing?*

Score on: TAM size and credibility (validated against web research, not founder claim alone); market growth trajectory; whether the SAM is large enough to support a 10x return; whether the market is expanding or contracting. Apply Cynical Default — founder TAM claims require third-party corroboration to score ≥ 4.

- 5: $5B+ TAM, strong growth, SAM clearly supports 10x. Numbers validated by third-party data.
- 4: $1–5B TAM, growing market, SAM plausibly supports 10x. Web-corroborated.
- 3: $500M–1B TAM, moderate growth. Tight but possible. Or: larger TAM but credibility gap.
- 2: TAM < $500M or inflated beyond credibility. ⚠️ Triggers DECLINE regardless of other scores.
- 1: Market too small or clearly contracting.
- 0: No market sizing provided and web research finds no venture-scale market.

### Dimension 3 — Founder Advantage
*Does this founding team have an earned right to win in this domain?*

Score on: domain expertise depth (years in industry, relevant technical credentials); prior startup experience and exits; execution signals (product already built, team assembled, early customers signed); talent magnetism (quality of co-founders and advisors). Validate with web research (LinkedIn, Crunchbase). Apply Cynical Default — claims not verifiable online cap at 3/5.

- 5: Domain expert with prior exit or deep technical credibility. Compelling team assembled. Verified.
- 4: Strong domain background, some execution evidence. No prior exit but credible. Verified.
- 3: Relevant background but generalist. No clear earned advantage. Or: claims present but unverifiable.
- 2: Thin domain connection. First-time founder with no relevant track record.
- 1: Founder background disconnected from problem.
- 0: No founder information available.

### Dimension 4 — Defensibility Signal
*Can we see early seeds of a real moat, even at this stage?*

Score on: any evidence of proprietary data, IP, network effects, or workflow lock-in; thin wrapper risk assessment; Goliath Test result; LLM Ingestion Test result; whether the moat strengthens with usage (Memory Lock-in signal).

**Mandatory NWA Filter applications for this dimension** (filters defined in universal `gates-and-flags.md`):
- **LLM Ingestion Test**: Run before scoring. If YES (80% replicable by GPT-4o/Claude), score is capped at **2/5**. Note result in rationale.
- **Thin Wrapper Cap**: If core product is primarily API orchestration on top of OpenAI/Anthropic/etc. with no proprietary data layer, score is capped at **2/5**. Non-negotiable.
- **Inertia Penalty**: If retention appears driven by switching cost friction rather than product indispensability, score is capped at **3/5**.
- **Goliath Test**: Run before scoring. If a major incumbent can replicate this with a feature update in 12–18 months and no structural counter-argument exists, score **cannot exceed 3/5**. Document test result.

Scores of 4 or 5 require explicit counter-argument in the rationale explaining why the Goliath Test and LLM Ingestion Test do NOT apply.

- 5: Clear defensibility mechanism — proprietary data, filed IP, network effects, or deep workflow integration. Goliath Test passed. LLM Ingestion Test: LOW risk. Not replicable quickly.
- 4: Meaningful moat signal present, needs development. Goliath Test passed with minor caveats. LLM Ingestion: LOW-MODERATE risk.
- 3: Some differentiation but replication risk is real. Goliath Test: possible incumbent threat within 18 months. Inertia penalty applied if applicable.
- 2: Thin wrapper risk confirmed OR LLM Ingestion Test = YES. Hard cap applies. ⚠️ Flag as Yellow.
- 1: No moat signal. Feature, not a product.
- 0: Explicitly describes using only public APIs/models with no proprietary layer.

### Dimension 5 — Traction Signal
*Is there evidence of real customer pull, not just founder push? What is the quality of the revenue?*

Score on: paying customers (weight heavily), signed LOIs, active beta users with retention data, revenue figures, named design partners. Apply **Revenue Quality Audit** (defined in universal `gates-and-flags.md`) before scoring: classify revenue as Sticky or Stagnant. Cold outreach pipelines do not count.

**Mandatory NWA Filter application:**
- **Stagnant Revenue Cap**: High-touch, consulting-adjacent, services-embedded, or inertia-based revenue caps this dimension at **2/5**.
- **AI Wrapper Traction Cap**: If AI Wrapper Risk is HIGH (LLM Ingestion Test = YES), any traction is classified as "Fragile" and caps this dimension at **2/5**. A product with no real moat can generate early revenue; that revenue is not durable.
- **Cynical Default**: Unverified revenue claims cap at 3/5.

State the Revenue Quality classification (Sticky / Stagnant / Fragile / Unknown) explicitly in the rationale.

- 5: Paying customers, growing MRR, named logos. Retention evidence. **Sticky Revenue confirmed.**
- 4: Paying customers or signed LOIs. Early but real. Revenue quality appears Sticky. Verified.
- 3: Active beta with engagement signals, OR early Sticky Revenue but unverified. No revenue yet, or quality unclear.
- 2: Waitlist or expressed interest, OR revenue present but classified as Stagnant or Fragile. Cap applied.
- 1: No traction evidence beyond founder assertion.
- 0: Pre-product with no market contact.

### Dimension 6 — Venture Economics
*Is there a credible path to a $100M ARR business that can return 10x for NWAi?*

Score on: clarity of the unit economics model (CAC, LTV, payback period); path from current stage to $100M ARR given market size and growth rate; exit multiple logic (who are the likely acquirers, what have comparable exits looked like); whether the company is in a "Red Ocean" (crowded market with margin compression) or a defensible position. Penalize high-CAC, low-margin plays.

- 5: Clear, specific path to $100M ARR with supporting unit economics. Identified acquirer landscape. 10x+ return path credible.
- 4: Plausible path to $100M ARR. Unit economics present but some assumptions unvalidated. Exit landscape visible.
- 3: Revenue model stated but $100M path requires significant market share assumptions. Exit logic thin. Or: unverified claims, Cynical Default applied.
- 2: Red Ocean positioning with no margin protection, OR unit economics imply unsustainable CAC, OR TAM too small to reach $100M ARR even at dominant share.
- 1: No unit economics provided. No exit logic. Revenue model unclear.
- 0: No business model articulated.

---

## Track B — Hardware / Robotics / Physical Tech (6 Dimensions × 5 = 30 pts)

### Dimension 1 — Structural Discontinuity
*Is this riding a genuine, irreversible shift in what's physically possible or economically viable?*

Same scoring rubric as Track A Dimension 1. Apply Cynical Default. Hardware discontinuities often tie to component cost curves (compute, sensors, actuators), regulatory shifts, or supply chain structural changes.

### Dimension 2 — Market Opportunity ⚠️ SUB-FLOOR: score ≤ 2 = DECLINE regardless of total
Same scoring rubric as Track A Dimension 2. Apply Cynical Default and web-corroborate TAM claims.

### Dimension 3 — Founder Advantage (Hardware-Specific)
*Does this team have the ops, manufacturing, and supply chain expertise to build physical products at scale?*

Score on: hardware-specific domain expertise (manufacturing, supply chain, embedded systems, regulatory); prior experience shipping physical products; ops and production leadership on the team; evidence the team has navigated the "last mile" of hardware (from prototype to production-grade reliability).

**Hardware Last Mile Standard:** For a score of 4 or 5, there must be evidence of solving the "last mile" challenge — achieving 95%+ production reliability through non-obvious engineering, not just a working prototype. A functioning demo is not sufficient for 4–5.

- 5: Team has shipped hardware at scale. Ops/manufacturing expertise present. Production-grade experience verified.
- 4: Strong hardware pedigree, credible ops capability, no full-scale production yet but evidence of depth.
- 3: Technical founders with hardware background but limited manufacturing/ops experience.
- 2: Primarily software founders with hardware ambitions. Manufacturing path unclear.
- 1: No hardware operational experience on the team.
- 0: No team information available.

### Dimension 4 — Technical Maturity / TRL
*Where is this technology on the readiness scale, and is it close enough to production to be investable?*

Score against the GAO Technology Readiness Level (TRL) scale (1–9). NWAi minimum investable threshold is TRL 5 (technology validated in relevant environment).

**Hard Cap:** If TRL 7 (system prototype demonstrated in operational environment) is not proven or credibly near-term, this dimension is capped at **3/5**. A technology that has not been demonstrated under operational conditions carries material de-risking work ahead that belongs in the investor's hands — price accordingly.

- 5: TRL 8–9. System complete and qualified. Production-ready. Evidence of operational deployment.
- 4: TRL 7. Prototype demonstrated in operational environment. Clear path to TRL 8.
- 3: TRL 5–6. Technology validated in relevant environment. TRL 7 is plausibly achievable in 12–18 months. Hard cap applies if TRL 7 not yet proven.
- 2: TRL 3–4. Proof of concept only. Significant development risk ahead.
- 1: TRL 1–2. Basic research stage. Not investable at NWAi's stage.
- 0: TRL unclear or no technical evidence provided.

### Dimension 5 — Unit Economics (Hardware)
*Is there a credible path to gross margins that support a venture-scale outcome?*

Score on: current or projected gross margins; bill of materials (BOM) vs. ASP relationship; volume pricing trajectory; whether the company has a path to 50%+ gross margins at scale; comparison to hardware/software margin blend if applicable (software layer can support margin structure).

**Margin Threshold:** A path to 50%+ gross margins at scale is required for a score of 4 or 5. Hardware companies that are permanently margin-constrained (e.g., commoditized components, no software margin layer) do not meet NWAi return requirements regardless of revenue growth.

- 5: Current or near-term margins ≥ 50%. Software layer or service revenue reinforces margin structure. Validated BOM.
- 4: Credible path to 50%+ at scale with volume pricing. BOM breakdown provided or discoverable.
- 3: Margins possible at scale but require significant volume assumptions. Software margin layer speculative.
- 2: Margin structure implies < 50% at achievable scale. Hardware commoditization risk present.
- 1: No unit economics provided. No margin discussion.
- 0: Explicitly low-margin business model with no path to improvement.

### Dimension 6 — Defensibility (Hardware)
*Is there a real moat beyond the physical product?*

Score on: proprietary IP or patents; manufacturing process advantages; supply chain lock-in; network effects from installed base; software layer stickiness on top of hardware; regulatory certifications as barrier to entry. Apply **Goliath Test** — can a large hardware incumbent (e.g., a Tier 1 supplier, defense prime, or hyperscaler with hardware ambitions) replicate this with a development program?

- 5: Multiple defensibility layers — filed patents, manufacturing process moat, software lock-in, or regulatory certification. Goliath Test: incumbent replication requires years.
- 4: One strong defensibility layer with evidence. Goliath Test passed with minor caveats.
- 3: Some differentiation but replication risk is real within 2–3 years. Goliath Test: possible.
- 2: No proprietary layer beyond engineering execution. Goliath Test: replicable.
- 1: Commodity hardware play with no defensibility signal.
- 0: Explicitly commodity or reference design.

---

## AI Wrapper Assessment (Track A Deals Only)

For all Track A deals, run this assessment before scoring Defensibility. The result is mechanically linked to the Defensibility cap and must be stated in the output.

### Classification

**HIGH Wrapper Risk — Defensibility capped at 2/5, Traction capped at 2/5:**
Core product is primarily prompt engineering or API orchestration on top of OpenAI/Anthropic/etc. LLM Ingestion Test = YES (a customized GPT-4o agent could replicate 80%+ of core function). No proprietary data, training, or workflow integration visible. Could be replicated by a developer in < 48 hours. → ❌ Explicit ⚠️ Yellow Flag. Requires explicit moat justification from an SME to advance.

**MODERATE Wrapper Risk — Cynical Default applies, no hard cap:**
Product uses public AI infrastructure but shows early signs of a proprietary layer — domain-specific data, fine-tuning signals, workflow integration depth. LLM Ingestion Test = PARTIAL (could replicate core, but not the value-add layer). Moat is nascent but visible.

**LOW Wrapper Risk — No cap applied:**
Proprietary model, unique training data, deep workflow integration, or a non-AI moat that is genuinely defensible. LLM Ingestion Test = NO. AI is an enabler, not the entire product.

### Replicability Speed Flag *(also applies at Scout and Diligence)*

When the AI Moats Framework Replicability Speed Matrix is completed (Scout Phase 2 or Diligence), apply these flag triggers:

- ⚠️ **Yellow Flag** — any threat actor row shows replication possible in < 6 months. Text: "Replicability risk: [threat actor] could replicate core functionality within [timeframe]. Validate moat depth before advancing."
- ⚠️ **Strong Yellow Flag** — the LLM provider row (OpenAI, Anthropic) shows replication possible in < 12 months. Text: "Feature-not-company risk: core capability could become a native LLM platform feature. Requires explicit moat justification to advance."

These flags compound with the AI Wrapper Assessment. A deal flagged as HIGH Wrapper Risk AND with a Replicability Speed Flag is a strong signal for DECLINE unless the moat thesis is independently validated by an SME.

---

## Live Pitch Questions (TechGroup ADVANCE Deals)

When a Tech-tagged deal advances, generate 3–5 questions specifically for the founder's Live Pitch
at the bi-weekly TechGroup meeting. These are not generic — they must be derived from
the specific gaps, risks, and uncertainties identified during screening.

Question design rules:
- Targeted: reference something specific in this deal (a market claim, a founder gap, a defensibility question, a structure concern)
- Open-ended: designed to reveal information not in the deck
- Prioritized: order from most critical (gate-level concern) to most clarifying (enrichment)
- Format: numbered list, 1–2 sentences each

Categories to draw from:
- Unvalidated market claims (if Market score required Cynical Default)
- Goliath Test concerns (if incumbent threat identified in research)
- Moat/defensibility gaps (if thin wrapper risk flagged or Defensibility ≤ 3)
- Founder domain questions (if Founder Advantage score was 3 or below)
- Structure friction (if SAFE or no lead — founder needs to address in the room)
- Traction questions (if Revenue Quality = Stagnant, Fragile, or Unknown)
- Venture Economics questions (if $100M ARR path was unclear)
- Track B specifics: TRL evidence, BOM/margin path, Hardware Last Mile signals
- Exit/acquirer questions (always useful at Scout stage)

---

*NWAi TechGroup Screener Framework — TechGroup Extension | v2.0 | April 2026*
*Universal hard gates, NWA Filter, Readiness scoring, Research Protocol, Decision Logic, and Output Format are inherited from `gates-and-flags.md`.*
*Replaces v1.0 (March 2026). Key TechGroup-specific additions: Track A/B bifurcation; AI Wrapper Assessment; Replicability Speed Flag; Hardware Last Mile Standard; TRL Hard Cap.*
*Medical and Space verticals retain separate hard-gate screener frameworks.*
