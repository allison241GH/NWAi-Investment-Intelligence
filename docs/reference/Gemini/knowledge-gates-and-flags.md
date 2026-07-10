# NWAi TechGroup Triage Framework — Gates & Flags

## Design Principles

This screener is calibrated for high-volume inbound triage. Its purpose is **not** to find investments — it is to identify the ~10% of deals worth a Scout assessment and a Live Pitch slot. Screen to Scout. Diamond-finding happens at Scout and Live Pitch, not here.

Target advance rate: ~11% of inbound (roughly 1 in 9 deals).

---

## Layer 1 — Hard Gates (Binary, Immediate Kill)

Apply all three gates first. A single FAIL = DECLINE. Do not proceed to scoring.

| Gate | MET if... | FAIL if... |
|------|-----------|------------|
| **1. Foreign Entity / IP Structure** | Company appears investable from a US legal standpoint — C-Corp, LLC, or convertible structure; IP owned by the US entity | Entity structure or IP ownership clearly prevents US investment (foreign HQ, foreign IP entity, VIE structure) |
| **2. Market Size Threshold** | Opportunity plausibly supports venture-scale outcomes ($500M+ TAM) | Market clearly too small to support 10x return in 5 years — not a matter of founder framing, but a structural ceiling |
| **3. Commercialization Path** | Credible path to paying customers exists — MVP, beta, LOI, or clear near-term route to revenue | Purely academic, pre-concept, or no credible path to market. Research projects and demo labs with no product roadmap. |

**Gating rule:** Mark FAIL only when there is clear evidence the criterion is not met. Silence = MET with a Yellow Flag note — do not fail on missing information alone.

**What is NOT a hard gate:**
- SAFE deal structure — a normal early-stage starting point. Scored neutrally in Readiness. Never a screen penalty.
- No lead investor — NWA may lead or cross-syndicate. Scored in Readiness.
- Product stage / MVP — scored in Readiness.
- Traction / revenue — scored in Opportunity.

---

## The NWA Filter — Mandatory Scoring Rigor

These four tests are mandatory on every deal. They produce hard scoring caps that cannot be overridden. Apply them before and during scoring.

### 1. Cynical Default
Do not take deck claims at face value. If a claim cannot be verified via web research, the maximum score for that dimension is **3/5**. Scores of 4 or 5 require affirmative supporting evidence — not just the absence of contradiction.

### 2. The Goliath Test
Explicitly ask: **"Could a major incumbent in this space (e.g., NVIDIA, Microsoft, AWS, Salesforce, or a domain-specific Goliath like a hyperscaler, defense prime, large pharma, or major OEM) kill this with a feature update or program in the next 12–18 months?"** If YES or UNCLEAR with no structural counter-argument: Defensibility **cannot exceed 3/5**. Document the result in the rationale.

### 3. The LLM Ingestion Test *(software/AI deals only)*
Explicitly ask: **"Could a customized GPT-4o or Claude agent with access to relevant public data replicate 80% of this product's core function?"** If YES: AI Wrapper Risk = HIGH, Defensibility **capped at 2/5**, Traction **capped at 2/5** ("Fragile"). For non-software/non-AI deals: note "LLM Ingestion: N/A."

### 4. Revenue Quality Audit
Classify any revenue or traction as:
- **Sticky** — automated, API-driven, self-serve SaaS with low-touch retention
- **Stagnant** — high-touch, consulting-adjacent, services-embedded, or inertia-based

Stagnant Revenue caps Traction at **2/5**. If revenue quality is unclear, apply Cynical Default (max 3/5). State the classification explicitly in the Traction rationale.

---

## Track Determination

Assign every deal to one track before scoring Opportunity.

- **Track A — Software / AI / Cloud**: Primary value delivery is software, data, algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary deliverable. Revenue includes hardware unit sales, manufacturing, or embedded systems.

Mixed plays default to Track B if a physical product is necessary for the product to function.

---

## Layer 2 — Opportunity Score (0–30)

**6 dimensions × 5 points = 30 total. ADVANCE ≥ 20 | WATCH 14–19 | DECLINE < 14**

**Sub-floor rule:** Market Opportunity score ≤ 2 = DECLINE regardless of total.
**No-zero rule:** Any individual dimension = 0 = DECLINE regardless of total.

### Universal Scoring Scale

| Score | Definition |
|-------|-----------|
| 5 | Exceptional — clear, evidence-backed signal. Affirmative evidence required. |
| 4 | Strong — credible signal with minor gaps. Must survive NWA Filter. |
| 3 | Acceptable — present but not differentiated. Maximum for unverified claims. |
| 2 | Weak — thin signal, speculative, or NWA Filter cap applied. |
| 1 | Very Weak — almost absent. |
| 0 | Absent — no evidence whatsoever, or explicitly absent. |

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

**Blue Ocean read** (one line, not separately scored): Classify the market as **BLUE** (first to *define* a category) / **CONTESTED** (first to *market* in an existing or forming category) / **RED** (late entrant to a crowded field). If not BLUE, name the closest competitor and the company's one-line differentiation — call it a *moat* or merely a *feature/positioning* difference.

### Dimension 2 — Market Opportunity ⚠️ SUB-FLOOR: score ≤ 2 = DECLINE regardless of total
*Does the TAM credibly support venture-scale outcomes? Is the market growing?*

Apply Cynical Default — founder TAM claims require third-party corroboration to score ≥ 4.

- 5: $5B+ TAM, strong growth, SAM clearly supports 10x. Numbers validated by third-party data.
- 4: $1–5B TAM, growing market, SAM plausibly supports 10x. Web-corroborated.
- 3: $500M–1B TAM, moderate growth. Tight but possible. Or: larger TAM but credibility gap.
- 2: TAM < $500M or inflated beyond credibility. ⚠️ Triggers DECLINE regardless of other scores.
- 1: Market too small or clearly contracting.
- 0: No market sizing provided and web research finds no venture-scale market.

### Dimension 3 — Founder Advantage
*Does this founding team have an earned right to win in this domain?*

Validate with web research (LinkedIn, Crunchbase). Apply Cynical Default — claims not verifiable online cap at 3/5.

- 5: Domain expert with prior exit or deep technical credibility. Compelling team assembled. Verified.
- 4: Strong domain background, some execution evidence. No prior exit but credible. Verified.
- 3: Relevant background but generalist. No clear earned advantage. Or: claims present but unverifiable.
- 2: Thin domain connection. First-time founder with no relevant track record.
- 1: Founder background disconnected from problem.
- 0: No founder information available.

### Dimension 4 — Defensibility Signal
*Can we see early seeds of a real moat, even at this stage?*

Score on: proprietary data, IP, network effects, or workflow lock-in; thin wrapper risk; Goliath Test result; LLM Ingestion Test result; whether the moat strengthens with usage (Memory Lock-in signal).

**Two Sustainable Advantage Tests** (one summary line — reuses the LLM Ingestion and Thin Wrapper results already required below; no new research needed): **Training edge PRESENT / ABSENT** (does the company have proprietary training data, fine-tuning, or a model others cannot replicate?) and **Inference edge PRESENT / ABSENT** (does the company have a deployment, latency, cost, or integration advantage at inference time?). ABSENT on both is corroborating evidence for the thin-wrapper cap and a strong signal against scores of 4–5.

**Mandatory NWA Filter caps for this dimension:**
- **LLM Ingestion Test**: If YES (80% replicable by GPT-4o/Claude) → capped at **2/5**.
- **Thin Wrapper Cap**: If core product is primarily API orchestration with no proprietary data layer → capped at **2/5**. Non-negotiable.
- **Inertia Penalty**: If retention is driven by switching cost friction rather than product indispensability → capped at **3/5**.
- **Goliath Test**: If a major incumbent can replicate in 12–18 months with no structural counter-argument → **cannot exceed 3/5**.

Scores of 4 or 5 require explicit counter-argument explaining why the Goliath Test and LLM Ingestion Test do NOT apply.

- 5: Clear defensibility — proprietary data, filed IP, network effects, or deep workflow integration. Goliath passed. LLM Ingestion: LOW risk.
- 4: Meaningful moat signal, needs development. Goliath passed with minor caveats. LLM Ingestion: LOW-MODERATE risk.
- 3: Some differentiation but replication risk is real. Goliath Test: possible incumbent threat within 18 months.
- 2: Thin wrapper confirmed OR LLM Ingestion = YES. Hard cap applies. ⚠️ Yellow Flag.
- 1: No moat signal. Feature, not a product.
- 0: Explicitly describes using only public APIs/models with no proprietary layer.

### Dimension 5 — Traction Signal
*Is there evidence of real customer pull, not just founder push? What is the quality of the revenue?*

Score on: paying customers, signed LOIs, active beta users with retention data, revenue figures, named design partners. Apply Revenue Quality Audit before scoring. Cold outreach pipelines do not count.

**Mandatory NWA Filter caps:**
- **Stagnant Revenue Cap**: High-touch, consulting-adjacent, or inertia-based revenue → capped at **2/5**.
- **AI Wrapper Traction Cap**: If AI Wrapper Risk is HIGH → any traction classified as "Fragile" → capped at **2/5**.
- **Cynical Default**: Unverified revenue claims → max 3/5.

State the Revenue Quality classification (Sticky / Stagnant / Fragile / Unknown) in the rationale.

- 5: Paying customers, growing MRR, named logos. Retention evidence. Sticky Revenue confirmed.
- 4: Paying customers or signed LOIs. Early but real. Revenue quality appears Sticky. Verified.
- 3: Active beta with engagement signals, OR early Sticky Revenue but unverified.
- 2: Waitlist or expressed interest, OR revenue classified as Stagnant or Fragile. Cap applied.
- 1: No traction evidence beyond founder assertion.
- 0: Pre-product with no market contact.

### Dimension 6 — Venture Economics
*Is there a credible path to a $100M ARR business that can return 10x?*

Score on: unit economics (CAC, LTV, payback); path to $100M ARR; exit multiple logic (likely acquirers, comparable exits); Red Ocean margin compression risk. Penalize high-CAC, low-margin plays.

- 5: Clear, specific path to $100M ARR with supporting unit economics. Identified acquirer landscape. 10x+ return path credible.
- 4: Plausible path to $100M ARR. Unit economics present but some assumptions unvalidated. Exit landscape visible.
- 3: Revenue model stated but $100M path requires significant market share assumptions. Exit logic thin.
- 2: Red Ocean positioning with no margin protection, OR unsustainable CAC, OR TAM too small to reach $100M ARR.
- 1: No unit economics provided. No exit logic.
- 0: No business model articulated.

---

## Track B — Hardware / Robotics / Physical Tech (6 Dimensions × 5 = 30 pts)

### Dimension 1 — Structural Discontinuity
Same scoring rubric as Track A Dimension 1. Hardware discontinuities often tie to component cost curves (compute, sensors, actuators), regulatory shifts, or supply chain structural changes. Apply Cynical Default.

### Dimension 2 — Market Opportunity ⚠️ SUB-FLOOR
Same scoring rubric as Track A Dimension 2. Apply Cynical Default and web-corroborate TAM claims.

### Dimension 3 — Founder Advantage (Hardware-Specific)
*Does this team have the ops, manufacturing, and supply chain expertise to build physical products at scale?*

**Hardware Last Mile Standard:** For a score of 4 or 5, there must be evidence of solving the "last mile" — achieving 95%+ production reliability through non-obvious engineering, not just a working prototype. A functioning demo is not sufficient for 4–5.

- 5: Team has shipped hardware at scale. Ops/manufacturing expertise present. Production-grade experience verified.
- 4: Strong hardware pedigree, credible ops capability, no full-scale production yet but evidence of depth.
- 3: Technical founders with hardware background but limited manufacturing/ops experience.
- 2: Primarily software founders with hardware ambitions. Manufacturing path unclear.
- 1: No hardware operational experience on the team.
- 0: No team information available.

### Dimension 4 — Technical Maturity / TRL
*Where is this technology on the readiness scale, and is it close enough to production to be investable?*

NWAi minimum investable threshold: TRL 5.

**Hard Cap:** If TRL 7 is not proven or credibly near-term → capped at **3/5**.

- 5: TRL 8–9. System complete and qualified. Production-ready.
- 4: TRL 7. Prototype demonstrated in operational environment. Clear path to TRL 8.
- 3: TRL 5–6. Validated in relevant environment. TRL 7 achievable in 12–18 months. Hard cap applies if TRL 7 not yet proven.
- 2: TRL 3–4. Proof of concept only. Significant development risk ahead.
- 1: TRL 1–2. Basic research stage.
- 0: TRL unclear or no technical evidence provided.

### Dimension 5 — Unit Economics (Hardware)
*Is there a credible path to gross margins that support a venture-scale outcome?*

**Margin Threshold:** A path to 50%+ gross margins at scale is required for a score of 4 or 5. Permanently margin-constrained hardware does not meet NWAi return requirements.

- 5: Current or near-term margins ≥ 50%. Software layer reinforces margin structure. Validated BOM.
- 4: Credible path to 50%+ at scale with volume pricing. BOM breakdown provided or discoverable.
- 3: Margins possible at scale but require significant volume assumptions.
- 2: Margin structure implies < 50% at achievable scale. Commoditization risk present.
- 1: No unit economics provided.
- 0: Explicitly low-margin with no improvement path.

### Dimension 6 — Defensibility (Hardware)
*Is there a real moat beyond the physical product?*

Apply Goliath Test against hardware incumbents (Tier 1 suppliers, defense primes, hyperscalers with hardware ambitions).

- 5: Multiple defensibility layers — filed patents, manufacturing process moat, software lock-in, or regulatory certification. Goliath: incumbent replication requires years.
- 4: One strong defensibility layer with evidence. Goliath passed with minor caveats.
- 3: Some differentiation but replication risk is real within 2–3 years. Goliath: possible.
- 2: No proprietary layer beyond engineering execution. Goliath: replicable.
- 1: Commodity hardware play with no defensibility signal.
- 0: Explicitly commodity or reference design.

---

## AI Wrapper Assessment (Track A Deals Only)

Run before scoring Defensibility. The result is mechanically linked to the Defensibility and Traction caps.

| Risk Level | Definition | Caps Applied |
|---|---|---|
| **HIGH** | Core product is primarily prompt engineering or API orchestration. LLM Ingestion Test = YES. No proprietary data, training, or workflow integration. Replicable by a developer in < 48 hours. | Defensibility ≤ 2/5 · Traction ≤ 2/5 · ⚠️ Yellow Flag |
| **MODERATE** | Uses public AI but shows early proprietary layer — domain data, fine-tuning signals, workflow integration depth. LLM Ingestion = PARTIAL. | Cynical Default applies. No hard cap. |
| **LOW** | Proprietary model, unique training data, deep workflow integration, or non-AI moat. LLM Ingestion = NO. | No cap applied. |

---

## Replicability Speed Flag

- ⚠️ **Yellow Flag** — any threat actor can replicate core functionality in < 6 months. Text: "Replicability risk: [actor] could replicate within [timeframe]. Validate moat depth."
- ⚠️ **Strong Yellow Flag** — LLM provider (OpenAI, Anthropic) shows replication possible in < 12 months. Text: "Feature-not-company risk: capability could become a native platform feature. Requires explicit moat justification."

These flags compound with the AI Wrapper Assessment. HIGH Wrapper + Replicability Flag = strong DECLINE signal unless moat is independently validated.

---

## Agent-Era Exposure Signal (Lightweight Triage)

A qualitative read — **not a scored dimension.** Full scoring happens at Scout; this is the trip-wire only.

**The doorway question:** *"Is this information for a human to act on, or a transaction for an agent to complete?"*

**Flag triggers:**
- ⚠️ **Yellow Flag — Agent-Era Exposure** if the product's core value is a task agents are likely to own outright within the hold period (browsing/comparing/aggregating, human-attention funnels, manual workflows agents compress), OR the revenue model is per-human-seat / ad / engagement-based. Text: "Agent-era exposure: [problem/model] may be reshaped by agent adoption within the hold period. Score Agent-Era Readiness at Scout."

This does **not** gate or cap a score on its own. See **knowledge-agent-era-readiness.md** for posture definitions.

---

## Layer 3 — Readiness Score (0–25)

**5 dimensions × 5 points = 25 total. ADVANCE requires ≥ 15/25.**

**Scoring principle for unknowns:** Silent pitch materials score **2** (not 0). Reserve 0 for explicit absence.

### Dimension 1 — Deal Structure

A SAFE is the normal early-stage starting point — **neutral, not a penalty**. NWA negotiates to priced equity or convertible at close.

- 5: Priced equity round. Clean cap table.
- 4: Convertible note with reasonable terms.
- 3: SAFE or convertible on standard terms. *(neutral)* Note as IntroCall negotiation item.
- 2: SAFE/convertible with unusual or aggressive terms needing cleanup.
- 1: Founder signals no flexibility on a structure NWA cannot close.
- 0: Explicitly incompatible structure (token-based, revenue share only, no equity component).

### Dimension 2 — Product Maturity

- 5: Revenue-generating product with retention metrics.
- 4: Paying beta customers. MVP validated.
- 3: MVP live, active beta users, no revenue yet.
- 2: Prototype only. No user validation. Or: no product information disclosed.
- 1: Design/concept stage.
- 0: Idea only.

### Dimension 3 — Syndication Readiness

NWA leading or cross-syndicating is **acceptable and neutral** — not a flag.

- 5: Round forming with a committed external lead/co-lead.
- 4: Named credible external co-investors in conversation.
- 3: Some investor interest forming, OR NWA leading / cross-syndicating. *(neutral)* Note as IntroCall item.
- 2: No syndication information disclosed, or round not yet formed.
- 1: No co-investors and founder unaware of syndication norms.
- 0: Explicit absence — no round, no plan.

### Dimension 4 — Traction Velocity

Apply Revenue Quality Audit — Stagnant Revenue growth does not score above 2.

- 5: MoM growth ≥ 15% sustained 3+ months. Accelerating. Sticky Revenue confirmed.
- 4: Consistent positive growth. Revenue quality appears Sticky.
- 3: Early growth, limited data. Trajectory positive but unverified.
- 2: Flat or declining, OR Stagnant Revenue classification applies, OR no growth data.
- 1: Explicit plateau or contraction.
- 0: Pre-revenue with no growth signals.

### Dimension 5 — Founder Accessibility

- 5: US-based, responsive, complete submission materials.
- 4: US-based, complete, minor gaps.
- 3: US-based but submission thin. Some follow-up required.
- 2: Location unclear or international founder with US entity. Or: very incomplete submission.
- 1: Submission very incomplete. Likely not ready for process.
- 0: No contact information or clearly unreachable.

---

## Readiness Downgrade Rule

If Opportunity ≥ 20/30 but Readiness < 15/25 → verdict downgrades to **WATCH**.

**Carve-out:** If the ONLY dimensions pulling Readiness below 15 are Deal Structure (Dim 1) and/or Syndication Readiness (Dim 3) → **hold ADVANCE** and list them as IntroCall negotiation items. A downgrade requires friction in at least one of: Product Maturity · Traction Velocity · Founder Accessibility.

**Exception:** Readiness ≥ 18/25 on a WATCH deal → note "Readiness is strong; prioritize re-engagement when opportunity matures."

---

## Research Protocol

Run these three web searches before scoring.

**Search 1 — Market Opportunity Validation**
Search: `"[company sector] market size [current year]"`
Find 1–2 third-party references (Gartner, IDC, CB Insights). Compare against founder TAM claim. If founder TAM > 3× bottoms-up estimate → apply Cynical Default to Market Opportunity.

**Search 2 — Founder Advantage Validation**
Search: `"[founder name] LinkedIn"` and `"[company name] Crunchbase"`
Verify domain background, prior companies, exits, advisors. Discrepancies → Cynical Default on Founder Advantage.

**Search 3 — Incumbent / Competitive Landscape**
Search: `"[company sector] market leaders"` or `"[company name] competitors"`
Identify dominant incumbents and assess whether any major player is building in this direction. Enables the Goliath Test.

---

## Decision Logic

| Verdict | Criteria |
|---------|----------|
| **ADVANCE TO SCOUT** | All 3 Gates MET + Opportunity ≥ 20/30 + Market ≥ 3 + no dimension = 0 + Readiness ≥ 15/25 |
| **WATCH** | All 3 Gates MET + (Opportunity 14–19/30, OR Opportunity ≥ 20 but Readiness < 15/25) + Market ≥ 3. Name specific measurable re-engagement milestones for each dimension ≤ 2. |
| **DECLINE** | Any Gate FAIL, OR Opportunity < 14/30, OR Market ≤ 2, OR any dimension = 0. Name the primary kill reason in one sentence. |

---

## Technology Readiness Levels (TRL) — GAO Scale

| TRL | Description |
|-----|-------------|
| 1 | Basic principles observed and reported |
| 2 | Technology concept/application formulated |
| 3 | Analytical and experimental proof of concept |
| 4 | Component validation in lab environment |
| **5** | **Component validation in relevant environment ← NWAi minimum** |
| 6 | Prototype demonstration in relevant environment |
| **7** | **System prototype in operational environment ← Hard Cap threshold** |
| 8 | Actual system completed and qualified |
| 9 | Actual system proven through mission operations |

---

## Live Pitch Questions (ADVANCE Deals)

Generate 3–5 questions for the TechGroup Live Pitch. Specific to this deal — not generic. Order from most critical to most clarifying.

Draw from: unvalidated market claims · Goliath Test concerns · moat/defensibility gaps · founder domain questions · structure/syndication friction · traction quality · venture economics path · Track B specifics (TRL evidence, BOM/margin path, Last Mile signals) · exit/acquirer questions.
