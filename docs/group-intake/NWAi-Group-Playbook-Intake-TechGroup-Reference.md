# NWAi Group Playbook — Intake Questionnaire (TechGroup Reference)

**This is the worked example that accompanies the blank intake template.** Every answer below is sourced from existing plugin files (`gates-and-flags.md`, `gates-and-flags-techgroup.md`, `ai-moats-framework.md`, `agents/technology-analyst.md`, `CLAUDE.md`) — nothing new is invented for TechGroup. Group chairs filling out the blank template should look at the corresponding section here to see the level of detail and the format expected.

---

## Section 1 — Group Identity

| Field | Answer |
|-------|--------|
| Group name (full) | New World Angels TechGroup |
| Group acronym | TechGroup |
| Dealum tag string | `Tech` |
| Group Chair | Jamie Allison (Co-Chair, NWA Board Director — Investment Intelligence Platform & AI) |
| Co-Chair | Ron Tarro (TechGroup Co-Chair) |
| One-sentence investment thesis | TechGroup invests in software, AI, and physical-tech companies riding genuine structural discontinuities, with proprietary data flywheels or workflow lock-in that get stronger the more they're used — Memory Lock-in is the cognitive moat thesis. |

---

## Section 2 — Funnel Calibration

| Field | Answer |
|-------|--------|
| Annual pitch volume | ~300 Tech-tagged Dealum applications per year |
| Scout / Live Pitch capacity per month | 2–3 Scout/Live Pitch slots per month |
| Target advance rate | ~10% of inbound (roughly 1 in 10 Tech-tagged deals advances from Screen to Scout) |
| Historical funded-deal count, last 3 years | Effectively zero — the calibration is explicitly that this funnel produces "screen-to-scout, not scout-to-fund." Diamond-finding happens at Scout and Live Pitch, not at Screen. |
| Posture note | Threshold is tight by design. Screen should kill ~90% of inbound. The screener is not built to find investments — it's built to identify the deals worth a 30-minute Scout assessment. |

*Source: `gates-and-flags-techgroup.md` Design Principles block, recalibrated per Jamie's correction in May 2026 planning round (existing reference file still cites the older "3,000 / 3 years / 6 slots" numbers; those numbers stay in the live plugin until Jamie chooses to update them).*

---

## Section 3 — Track Determination

| Field | Answer |
|-------|--------|
| Does this group bifurcate? | **Yes — two tracks.** |
| Track A — Software / AI / Cloud | Primary value delivery is software, data, algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace. Examples: enterprise SaaS, AI workflow tools, data platforms, fintech software, vertical AI. |
| Track B — Hardware / Robotics / Physical Tech | Physical product is a primary deliverable. Revenue includes hardware unit sales, manufacturing, or embedded systems. Examples: robotics, semiconductors/chips, physical AI devices, industrial automation, defense hardware. |
| Mixed-play default rule | Mixed plays (e.g., software-enabled hardware) default to **Track B** if a physical product is necessary for the product to function. |

*Source: `gates-and-flags-techgroup.md` Track Determination section.*

---

## Section 4 — Opportunity Rubric (per Track)

### Track A — Software / AI / Cloud (6 Dimensions × 5 = 30 pts)

#### Dimension 1 — Structural Discontinuity
What it measures: Whether the deal is riding a genuine, irreversible market shift — not incremental improvement dressed as disruption. Tests whether the timing argument would have been equally valid 3–5 years ago.
Sub-floor / hard cap: None.

- 5: Unmistakable, named structural shift with clear timing logic. Category-creating. Independently verifiable.
- 4: Clear "why now" with evidence. Shift is real and near-term, not speculative.
- 3: Reasonable "why now" but the shift is evolutionary rather than discontinuous. Or: compelling argument but unverified.
- 1: No timing argument. Could have been built any time in the past decade.
- 0: No evidence of market shift awareness.

#### Dimension 2 — Market Opportunity ⚠️ SUB-FLOOR: score ≤ 2 = DECLINE regardless of total
What it measures: TAM size and credibility (validated against web research, not founder claim alone); market growth trajectory; whether the SAM is large enough to support a 10x return. Apply Cynical Default — founder TAM claims require third-party corroboration to score ≥ 4.
Sub-floor / hard cap: **Score ≤ 2 = DECLINE regardless of total.**

- 5: $5B+ TAM, strong growth, SAM clearly supports 10x. Numbers validated by third-party data.
- 4: $1–5B TAM, growing market, SAM plausibly supports 10x. Web-corroborated.
- 3: $500M–1B TAM, moderate growth. Tight but possible. Or: larger TAM but credibility gap.
- 2: TAM < $500M or inflated beyond credibility. ⚠️ Triggers DECLINE regardless of other scores.
- 1: Market too small or clearly contracting.
- 0: No market sizing provided and web research finds no venture-scale market.

#### Dimension 3 — Founder Advantage
What it measures: Domain expertise depth, prior startup experience and exits, execution signals, talent magnetism. Validate with web research (LinkedIn, Crunchbase). Apply Cynical Default — claims not verifiable online cap at 3/5.
Sub-floor / hard cap: Cynical Default cap at 3/5 if unverifiable.

- 5: Domain expert with prior exit or deep technical credibility. Compelling team assembled. Verified.
- 4: Strong domain background, some execution evidence. No prior exit but credible. Verified.
- 3: Relevant background but generalist. No clear earned advantage. Or: claims present but unverifiable.
- 2: Thin domain connection. First-time founder with no relevant track record.
- 1: Founder background disconnected from problem.
- 0: No founder information available.

#### Dimension 4 — Defensibility Signal
What it measures: Evidence of proprietary data, IP, network effects, or workflow lock-in; thin wrapper risk; Goliath Test result; LLM Ingestion Test result; whether the moat strengthens with usage (Memory Lock-in signal).
Sub-floor / hard cap (mandatory NWA Filter applications):
- **LLM Ingestion Test:** If YES (80% replicable by GPT-4o/Claude), score capped at **2/5**.
- **Thin Wrapper Cap:** If primarily API orchestration, score capped at **2/5**. Non-negotiable.
- **Inertia Penalty:** If retention driven by switching cost friction not product indispensability, capped at **3/5**.
- **Goliath Test:** If incumbent can replicate in 12–18 months with no structural counter-argument, score cannot exceed **3/5**.
- Scores of 4 or 5 require explicit counter-argument explaining why Goliath Test and LLM Ingestion Test do NOT apply.

- 5: Clear defensibility — proprietary data, filed IP, network effects, or deep workflow integration. Goliath Test passed. LLM Ingestion: LOW risk.
- 4: Meaningful moat signal present, needs development. Goliath Test passed with minor caveats. LLM Ingestion: LOW-MODERATE risk.
- 3: Some differentiation but replication risk is real. Goliath Test: possible incumbent threat within 18 months. Inertia penalty applied if applicable.
- 2: Thin wrapper risk confirmed OR LLM Ingestion Test = YES. Hard cap applies. ⚠️ Yellow Flag.
- 1: No moat signal. Feature, not a product.
- 0: Explicitly describes using only public APIs/models with no proprietary layer.

#### Dimension 5 — Traction Signal
What it measures: Paying customers (heavy weight), signed LOIs, active beta users with retention, revenue figures, named design partners. Apply **Revenue Quality Audit** before scoring. Cold outreach pipelines do not count.
Sub-floor / hard cap:
- **Stagnant Revenue Cap:** High-touch, consulting-adjacent, services-embedded, or inertia-based revenue capped at **2/5**.
- **AI Wrapper Traction Cap:** If AI Wrapper Risk = HIGH, traction is "Fragile" and capped at **2/5**.
- **Cynical Default:** Unverified revenue claims cap at **3/5**.
- State Revenue Quality (Sticky / Stagnant / Fragile / Unknown) explicitly in rationale.

- 5: Paying customers, growing MRR, named logos. Retention evidence. Sticky Revenue confirmed.
- 4: Paying customers or signed LOIs. Early but real. Revenue quality appears Sticky. Verified.
- 3: Active beta with engagement signals, OR early Sticky Revenue but unverified. No revenue yet, or quality unclear.
- 2: Waitlist or expressed interest, OR revenue present but Stagnant or Fragile. Cap applied.
- 1: No traction evidence beyond founder assertion.
- 0: Pre-product with no market contact.

#### Dimension 6 — Venture Economics
What it measures: Clarity of unit economics (CAC, LTV, payback); path from current stage to $100M ARR given market size and growth rate; exit multiple logic; Red Ocean vs. defensible position. Penalize high-CAC, low-margin plays.
Sub-floor / hard cap: None explicit, but Red Ocean positioning with no margin protection caps at 2/5.

- 5: Clear, specific path to $100M ARR with supporting unit economics. Identified acquirer landscape. 10x+ return path credible.
- 4: Plausible path to $100M ARR. Unit economics present but some assumptions unvalidated. Exit landscape visible.
- 3: Revenue model stated but $100M path requires significant market share assumptions. Exit logic thin. Or: unverified, Cynical Default applied.
- 2: Red Ocean positioning with no margin protection, OR unit economics imply unsustainable CAC, OR TAM too small to reach $100M ARR even at dominant share.
- 1: No unit economics provided. No exit logic. Revenue model unclear.
- 0: No business model articulated.

### Track B — Hardware / Robotics / Physical Tech (6 Dimensions × 5 = 30 pts)

Track B uses the same Dimensions 1 and 2 (Structural Discontinuity, Market Opportunity with sub-floor). Dimensions 3–6 are hardware-specialized:

#### Dimension 3 — Founder Advantage (Hardware-Specific)
What it measures: Hardware-specific domain expertise (manufacturing, supply chain, embedded systems, regulatory); prior experience shipping physical products; ops and production leadership; evidence the team has solved the "last mile" of hardware.
Sub-floor / hard cap: **Hardware Last Mile Standard** — for a 4 or 5, evidence required of solving 95%+ production reliability through non-obvious engineering. A working demo is not sufficient.

- 5: Team has shipped hardware at scale. Ops/manufacturing expertise present. Production-grade experience verified.
- 4: Strong hardware pedigree, credible ops capability, no full-scale production yet but evidence of depth.
- 3: Technical founders with hardware background but limited manufacturing/ops experience.
- 2: Primarily software founders with hardware ambitions. Manufacturing path unclear.
- 1: No hardware operational experience on the team.
- 0: No team information available.

#### Dimension 4 — Technical Maturity / TRL
What it measures: Position on the GAO Technology Readiness Level scale (1–9). NWAi minimum investable threshold is TRL 5.
Sub-floor / hard cap: **TRL Hard Cap** — if TRL 7 (system prototype demonstrated in operational environment) is not proven or credibly near-term, this dimension is capped at **3/5**.

- 5: TRL 8–9. System complete and qualified. Production-ready. Operational deployment.
- 4: TRL 7. Prototype demonstrated in operational environment. Clear path to TRL 8.
- 3: TRL 5–6. Validated in relevant environment. TRL 7 plausibly achievable in 12–18 months. Hard cap applies if TRL 7 not yet proven.
- 2: TRL 3–4. Proof of concept only. Significant development risk ahead.
- 1: TRL 1–2. Basic research stage. Not investable at NWAi's stage.
- 0: TRL unclear or no technical evidence provided.

#### Dimension 5 — Unit Economics (Hardware)
What it measures: Current or projected gross margins; BOM vs. ASP; volume pricing trajectory; path to 50%+ gross margins at scale; software/service margin layer.
Sub-floor / hard cap: **Margin Threshold** — path to 50%+ gross margins at scale required for 4 or 5. Permanently margin-constrained hardware does not meet NWAi return requirements.

- 5: Current or near-term margins ≥ 50%. Software layer or service revenue reinforces margin structure. Validated BOM.
- 4: Credible path to 50%+ at scale with volume pricing. BOM breakdown provided or discoverable.
- 3: Margins possible at scale but require significant volume assumptions. Software margin layer speculative.
- 2: Margin structure implies < 50% at achievable scale. Hardware commoditization risk present.
- 1: No unit economics provided.
- 0: Explicitly low-margin business model with no path to improvement.

#### Dimension 6 — Defensibility (Hardware)
What it measures: Proprietary IP/patents; manufacturing process advantages; supply chain lock-in; network effects from installed base; software stickiness on top of hardware; regulatory certifications. Apply Goliath Test.
Sub-floor / hard cap: Goliath Test result determines max score.

- 5: Multiple defensibility layers — patents, manufacturing process moat, software lock-in, regulatory certification. Goliath Test: replication requires years.
- 4: One strong defensibility layer with evidence. Goliath Test passed with minor caveats.
- 3: Some differentiation but replication risk within 2–3 years. Goliath Test: possible.
- 2: No proprietary layer beyond engineering execution. Goliath Test: replicable.
- 1: Commodity hardware play with no defensibility signal.
- 0: Explicitly commodity or reference design.

*Source: `gates-and-flags-techgroup.md` Track A and Track B rubrics, lifted verbatim.*

---

## Section 5 — Group-Specific Filters / Flags / Caps

| # | Filter / Flag / Cap | What it tests | Cap effect | Applies at |
|---|---------------------|---------------|------------|-----------|
| 1 | **AI Wrapper Assessment** (HIGH / MODERATE / LOW) | LLM Ingestion Test: could a customized GPT-4o/Claude agent with public data replicate 80% of core function? | HIGH → Defensibility capped at 2/5 AND Traction capped at 2/5; ⚠️ Yellow Flag, requires SME-validated moat justification to advance | Screen + Scout + Diligence (Track A only) |
| 2 | **Goliath Test** | Could a major incumbent (NVIDIA/MSFT/AWS/Salesforce/etc.) kill this with a feature update in 12–18 months? | If YES with no structural counter-argument → Defensibility cannot exceed 3/5 | Screen + Scout + Diligence |
| 3 | **Replicability Speed Flag** | From the AI Moats Framework Replicability Speed Matrix: how fast could each threat actor (open-source, funded startup, Big Tech, LLM provider) replicate this? | Any row < 6 months → ⚠️ Yellow Flag; LLM provider row < 12 months → ⚠️ Strong Yellow Flag (compounds with HIGH Wrapper Risk → strong DECLINE signal) | Scout Phase 2 + Diligence |
| 4 | **Hardware Last Mile Standard** | Has the team solved the 95%+ production-reliability problem through non-obvious engineering, beyond a working demo? | If not → Founder Advantage (Track B Dim 3) capped at 3/5 | Screen + Scout + Diligence (Track B only) |
| 5 | **TRL Hard Cap** | Is TRL 7 (system prototype in operational environment) proven or credibly near-term? | If not → Technical Maturity (Track B Dim 4) capped at 3/5; TRL < 5 = deal-stopper | Screen + Scout + Diligence (Track B only); TRL deal-stopper anywhere |
| 6 | **Inertia Penalty** | Is product retention driven by switching-cost friction rather than product indispensability? | Defensibility capped at 3/5 | Screen + Scout + Diligence |
| 7 | **Stagnant Revenue Cap** | Is revenue high-touch, services-embedded, consulting-adjacent, or inertia-based? | Traction capped at 2/5 | Screen + Scout + Diligence |
| 8 | **Cynical Default** (universal) | Is the claim verifiable via web research or product evidence? | Unverified claims capped at 3/5 on the affected dimension | Universal — applies in every group |
| 9 | **Revenue Quality Audit** (universal) | Classify revenue as Sticky / Stagnant / Fragile / Unknown | Stagnant or Fragile → Traction capped at 2/5 | Universal — applies in every group |

*Source: `gates-and-flags-techgroup.md` (filters 1, 3, 4, 5) + `gates-and-flags.md` NWA Filter (filters 2, 6, 7, 8, 9). Filters 8–9 are universal; the rest are TechGroup-specific.*

---

## Section 6 — Defensibility / Moat Lens

### Moat Archetypes (3) — `ai-moats-framework.md`

**Moat 1: The Cognitive / Data Moat (Network Effect 2.0)** — The strongest, most durable application-layer moat. Built from a proprietary data flywheel: as users interact, they generate unique data and human feedback that improve the model and attract more users. **Memory Lock-in** is the cognitive layer — AI systems with persistent, individualized memory capture deep personal or strategic knowledge that, if lost, feels like cognitive amputation. *Key questions: Does the product get measurably better as more customers use it? If a customer switched today, what proprietary knowledge would they lose?*

**Moat 2: The Capital & Compute Moat** — Relevant primarily for infrastructure / foundational model companies (Theme 1). Built on the billion-dollar ante (training frontier models), specialized compute environments, exclusive data access agreements, and AI talent concentration. *Key signals: proprietary hardware/architecture, named researchers, exclusive partnerships.*

**Moat 3: The Vertical & Workflow Moat** — Most relevant for application-layer NWAi investments (Themes 2–5). Built on solving a specific JTBD better than alternatives, domain specificity, the "Last Mile" gap from 80% demo to 95% production, and deep workflow embedding. *Key signals: customers describe it as "infrastructure," not "software"; switching would require retraining staff and migrating proprietary data.*

### Structural Discontinuity (TechGroup Definition)

A real structural discontinuity changes the rules of the game; an incremental product just plays the existing game better. In TechGroup deals, a real discontinuity is typically tied to:
- **Foundation model capability cliffs** (GPT-3 → GPT-4 → reasoning models opening new product surfaces)
- **Component cost curves** (compute, sensors, actuators dropping below a threshold)
- **Regulatory shifts** (data sovereignty, AI safety, sectoral compliance creating new product categories)
- **Behavioral shifts** (workforce composition, consumer expectation, enterprise adoption patterns)

The test: would the timing argument have been equally valid 3–5 years ago? If yes, it is incremental, not discontinuous.

### Memory Lock-in (TechGroup Definition)

The property of a product getting smarter, stickier, or more embedded the more it's used — driven by proprietary data, workflow depth, or accumulated context. TechGroup's primary cognitive moat signal. The Replicability Speed Matrix (below) is the operational test for whether a claimed Memory Lock-in is real or theatrical.

### Replicability Speed Matrix (required for every TechGroup moat assessment)

| Threat Actor | Could Replicate In | Barrier |
|---|---|---|
| Open-source community (e.g., PyRIT fork) | ___ days/months | ___ |
| Funded startup competitor | ___ months | ___ |
| Big Tech platform (MSFT, Google, AWS) | ___ months | ___ |
| LLM provider (OpenAI, Anthropic) as native feature | ___ months | ___ |

**Flag triggers:**
- ⚠️ Yellow Flag if any row < 6 months
- ⚠️ Strong Yellow Flag if the LLM provider row < 12 months ("feature-not-company risk")

### Loading rule

| Field | Answer |
|-------|--------|
| Should `ai-moats-framework.md` be loaded? | **Yes — for every TechGroup deal.** |
| Need a separate group-specific moats reference doc? | No. `ai-moats-framework.md` IS the TechGroup moats reference. |

*Source: `ai-moats-framework.md` (moat types + Replicability Speed Matrix), `CLAUDE.md` (Structural Discontinuity + Memory Lock-in language).*

---

## Section 7 — Themes & SMEs

| # | Theme | Definition | Example deal types | Lead | SMEs |
|---|-------|------------|--------------------|------|------|
| 1 | Infrastructure & Foundational Stack | Compute, model serving, training infrastructure, the picks-and-shovels layer underneath the AI application stack | Specialized GPU / inference platforms, model deployment tooling, training data pipelines, vector databases | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 2 | SW Enabled HW, Physical AI & Robotics | Hardware that derives a meaningful fraction of its value from software/AI; physical AI; robotics with software-margin layer | Robotics for industrial / logistics / agriculture; software-enabled medical and industrial devices; physical-AI consumer products | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 3 | WorkTech & Vertical Enterprise OS | Vertical SaaS and AI-native enterprise operating systems for specific industries (legal, healthcare, construction, finance ops, etc.) | Vertical AI workflow tools, industry-specific operations platforms, AI-native ERP/CRM replacements | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 4 | Data Sovereignty, Security, Trust | Companies whose primary value is in data control, security posture, or trust infrastructure for AI/data systems | AI safety/red-teaming, data clean rooms, privacy-preserving AI, compliance automation, identity infrastructure | TBD — Pending Dealum API | TBD — Pending Dealum API |
| 5 | FinTech (incl RE) | Financial services software, including real-estate fintech, where the core deal is software/AI delivering a financial product | Embedded finance, RE-tech platforms, AI-driven underwriting, payments infrastructure, insurance software | TBD — Pending Dealum API | TBD — Pending Dealum API |

*Source: `CLAUDE.md` Themes & SMEs table (lines 167–177). Lead and SME slots are explicitly marked TBD until Dealum API integration is approved (deferred indefinitely as of plugin v2.12.0, April 2026).*

---

## Section 8 — Group-Specialist Agent

| Field | Answer |
|-------|--------|
| Does TechGroup need a domain-specialist agent? | **Yes — `technology-analyst` is the TechGroup specialist (the only group-specialized agent in the plugin today).** |
| Agent name | `technology-analyst` |
| What it researches | Thin Wrapper Detection (3 tests: API Dependency, Differentiation Source, Switching Cost); Technology Readiness Level (TRL 1–9 mapping with NWAi ≥ 5 gate); IP & Patents (USPTO, patents.google.com, founder names); Technical Architecture Signals (stack, AI/ML architecture, data infrastructure, GitHub presence, build-cost estimation); AI Moat Input Data (proprietary dataset, data flywheel, workflow integration depth, custom certifications); Technical Team Depth (CTO credibility, engineering team signals, missing-tech-co-founder flag) |
| What input data it consumes | Company name + product description + website URL (provided by `/scout` or `/diligence`); WebSearch results across 6 research areas; WebFetch on company sites and technical blogs; USPTO/Google Patents searches; LinkedIn / Crunchbase for technical team |
| What output briefing it produces | "TECHNICAL DILIGENCE BRIEFING" — structured fixed-format output with 7 sections (Thin Wrapper Verdict, TRL Assessment, IP & Patents, Technical Architecture, AI Moat Signals, Technical Team, Red Flags + Data Gaps). Feeds DD Report Section 4 (Technology) primarily, plus Section 7 (Moat) and Section 6 (Team). |
| At which stage(s) does it run? | **Both** — light run at Scout (thin wrapper + TRL only — flags deal-stoppers early) and full run at Diligence (all 6 research sections). |

*Source: `agents/technology-analyst.md` (full spec, 224 lines).*

---

## Footer Note for Other Group Chairs

This TechGroup reference encodes ~3 years of pattern recognition into a 6-dimension Opportunity rubric, 9 caps/flags, 3 moat archetypes, 5 themes, and 1 specialist agent. Most groups will end up with a similarly-sized playbook — but the *content* of every section will differ.

Most importantly: the answers above are not the universal NWAi framework. The 3 hard gates, NWA Filter, Readiness Score, Scout questions, Diligence rubrics, DD Report format, Memo format, and 7 group-agnostic agents already apply to every NWAi group automatically. **You only need to tell the plugin what is different about your group.**

---

*NWAi Investment Intelligence Platform | Group Intake v1.0 | TechGroup Reference | May 2026*
