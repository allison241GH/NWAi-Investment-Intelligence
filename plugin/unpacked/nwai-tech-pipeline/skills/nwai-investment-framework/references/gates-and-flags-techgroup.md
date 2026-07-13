# NWAi TechGroup — Six-Signal Screener Reference v3.0

> **This is the self-contained screening reference for NWAi TechGroup.** It defines the
> complete Screen-stage judgment model: hard gates, the NWA Filter evidence-rigor tests,
> the Six-Signal verdict model, conviction mechanics, and the calibrated rules ledger.
> `/screen` loads this file as its primary framework source.
>
> **Lineage:** v3.0 (July 2026) replaces the numeric v2.1 screener (6-dimension Track A/B
> Opportunity rubrics + Readiness scoring, archived at
> `_archive/gates-and-flags-techgroup-numeric-v2.1-legacy.md`). The Six-Signal judgment
> model was proven in the Claude V13 sandbox program (V10→V13 lineage, 4-deal regression
> back-test ratified; see `docs/reference/Gemini/V12-Signal-Architecture-Workbench.md`)
> and installed per `notes/NWAi-Pipeline-Framework-Adoption-Spec-2026-07.md`. Its design
> stance — qualitative signal verdicts that let a craftsman form conviction, no numeric
> scores at Screen — implements the Craft Investing thesis
> (`docs/strategy/future-of-venture-investing/NWAi-Craft-Investing-Thesis-2026-06.md`).
>
> **Scope:** TechGroup only. Other NWAi groups author their own frameworks — see
> `gates-and-flags-universal-guide.md` for the architecture every group playbook
> follows. Numeric scoring in the TechGroup pipeline begins at Scout
> (`scout-questions.md`); the Screen→Scout translation is defined in
> `references/screen-scout-conversion-rubric.md` (loaded by `/scout` only — never by
> `/screen`).

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

**The core stance:** the screener's mission is to *surface the key signals that let a
craftsman form conviction* — not to replace judgment with a number. The burden of proof is
on the company. The decision belongs to the member. Screen kills the clear failures and
surfaces everything plausibly Scout-worthy — it does not run Diligence-grade kill analysis
at screen depth.

---

## Layer 1 — Hard Gates (Binary, Immediate Kill)

Apply all three gates first. A single FAIL = DECLINE — produce the Verdict Block (with
kill reason), Company Context (1–2 sentences), the Gates table, and the report footer,
then stop.

**Gating rule: mark FAIL only on clear evidence. Silence = PASS with a Yellow Flag.
Do not fail a deal on missing information alone.** Missing information becomes a Yellow
Flag, never a gate kill. A YELLOW PASS flows through with a flag in Risk Flags.

| Gate | PASS | FAIL | YELLOW PASS |
|---|---|---|---|
| **Entity Structure / IP Ownership** | US-investable entity; IP owned by US entity | Foreign entity or IP structure preventing US investment (foreign HQ, foreign IP entity, VIE structure) | N/A — binary. No yellow pass. |
| **Market Scale** | Plausibly supports $500M+ TAM and venture returns | Market demonstrably capped below venture return potential — a structural ceiling, not a founder-framing issue | Pioneer/nascent — category not yet established; TAM extrapolation required |
| **Commercial Intent** | MVP, beta, LOI, or paying customers exist | Purely academic; no commercialization intent or path. Research projects and demo labs with no product roadmap. | Research/Concept with a stated product roadmap and credible commercialization thesis |

**What is NOT a hard gate (recorded in Deal Facts, neutral by default):**
- SAFE deal structure — a normal early-stage starting point, negotiated to priced equity
  or convertible at IntroCall/close. Never a screen penalty.
- No lead investor — NWA may lead or cross-syndicate. External validation is preferred
  but not required; an IntroCall negotiation item, never a kill or conviction pull.
- Product stage / MVP — read in Commercial Proof
- Traction / revenue — read in Commercial Proof (pre-revenue stated honestly is a signal,
  never a kill on its own)

---

## Track Determination

Assign every Tech-tagged deal to one track before producing the Six Signals. Use the primary revenue and product model — not the presence of software components alone.

- **Track A — Software / AI / Cloud**: Primary value delivery is software, data, algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace. Examples: enterprise SaaS, AI workflow tools, data platforms, fintech software, vertical AI.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary deliverable. Revenue includes hardware unit sales, manufacturing, or embedded systems. Examples: robotics, semiconductors/chips, physical AI devices, industrial automation, defense hardware.

Mixed plays (e.g., software-enabled hardware) should default to Track B if a physical product is necessary for the product to function.

**The track swaps the evidence tags in Signal 4 (Moat) and the Commercial Proof emphasis
— not the report structure.** The Six Signals heading names the assigned track.

---

## The NWA Filter — Evidence Rigor Tests

Four skepticism tests that govern evidence standards across the Six Signals. They are
mandatory — not optional overlays. In the Six-Signal model they operate as evidence
mechanics, not numeric caps:

### 1. Cynical Default → confidence tags
Do not take deck claims at face value. Every signal carries a confidence tag —
**VERIFIED / PARTIAL / UNVERIFIED** (see Confidence Tags below). An unverifiable claim
never supports a top-tier verdict.

### 2. The Goliath Test → Signal 4 evidence tag
For every deal, explicitly ask: **"Could a major incumbent in this space (e.g., NVIDIA,
Microsoft, AWS, Salesforce, or a domain-specific Goliath like a hyperscaler, defense
prime, large pharma, or major OEM) kill this with a feature update or program in the next
12–18 months?"** The result prints as the Moat tag `Goliath [PASSED / FLAGGED ⚠️ + name]`.
A FLAGGED Goliath is a Risk Flag and a Live Pitch question — **never an adverse vote**
(calibrated rule 3). A plausible incumbent kill with no structural counter-argument is
strong evidence against a STRONG Moat verdict.

### 3. The LLM Ingestion Test → Signal 4 evidence tag *(software/AI deals)*
For every software or AI deal, explicitly ask: **"Could a customized frontier-model agent
with access to relevant public data replicate 80% of this product's core function?"** The
result prints as the Moat tag `LLM Ingestion [YES / PARTIAL / NO]` and drives the AI
Wrapper Assessment classification (below). YES is strong evidence for a WEAK Moat verdict
absent an explicit moat justification. For non-software deals: `LLM Ingestion: N/A —
non-software`. *This test reads outside-in replicability from public data; Protect Alpha
(Signal 6) reads inside-out leakage of the non-public edge — read each once, in its own
row.*

### 4. Revenue Quality Audit → Commercial Proof quality
Do not treat ARR as a neutral signal. Classify revenue on the Commercial Proof line as
**STICKY** (automated, API-driven, self-serve, low-touch retention) / **STAGNANT**
(high-touch, consulting-adjacent, services-embedded, or inertia-based — customers stay
because switching is painful, not because the product is essential) / **PRE-REVENUE**
(stated honestly). Only exceptional **VERIFIED** commercial proof powers the traction
lift; STAGNANT revenue never does.

---

## Confidence Tags

Every signal carries a confidence tag:

- **VERIFIED** — load-bearing elements confirmed via the 3 web searches or an
  authoritative source (note the source parenthetically where a verdict hinges on it)
- **PARTIAL** — some elements verified; at least one load-bearing element is not
- **UNVERIFIED** — deck-claim only

**Mechanical rule:** an UNVERIFIED signal caps at its middle verdict (MIXED / MODERATE /
INCREMENTAL-equivalent) — never the top tier. PARTIAL caps the *unverified element*, not
the whole signal. Note unverified claims inline as "unverified."

---

## The Six Signals

Each decision question appears exactly once. Signals print in the member read sequence —
what is it, is it big, who's doing it, can they defend it, then the AI-era tests.
**Print order is not weight order** (weights live in the conviction mechanics below).

**1 · Discontinuity** — *Is this genuinely new — a rule-changing shift or a better
mousetrap?* Verdict: **PIONEER / DIFFERENTIATED / INCREMENTAL / LATE**. Basis:
**describe the claimed structural edge itself** — what is actually new here, in
buyer language, and why incumbents cannot (or can) replicate it within 18 months.
The tier is the conclusion, not the content. DIFFERENTIATED requires naming that
edge; if you cannot name one, it is INCREMENTAL.

*Blue Ocean read (one line within the basis, both tracks):* classify the market as
**BLUE** (first to *define* a category) / **CONTESTED** (first to *market* in an existing
or forming category — a head start, not a new ocean) / **RED** (late entrant to a crowded
field). If not BLUE, name the closest competitor and the company's one-line
differentiation claim — and call it: a *moat* or merely a *feature/positioning*
difference. Carries forward to Scout Q1/Q5 for the full read.

**2 · Market** — *Room and tailwind for a venture return?* Verdict: **STRONG /
MODERATE / WEAK**. Basis: describe the market and its tailwind in plain terms — what
is growing, why, and who is being pulled into buying. Floor cleared at the gate;
this scores the upside and the return path.

**↳ Commercial Proof** — *evidence within Market: not separately weighted, but see
Traction lift.* One indented line under Signal 2, with its own confidence tag:
stage · revenue state · quality [STICKY / STAGNANT / PRE-REVENUE] · velocity.
Pre-revenue stated honestly — a signal, never a kill on its own. Track B emphasis:
stage against TRL, unit-economics evidence, production reliability signals.

**3 · Team** — *Can this team execute, and are they all-in?* Verdict: **STRONG /
MIXED / WEAK plus commitment: FULL-TIME / UNCONFIRMED ⚠️ / SPLIT / SIDE-PROJECT**
— both in the header line. (UNCONFIRMED = a live, Scout-answerable question — never
adverse; SPLIT only on corroborated evidence, and only when Team is counted adverse
in the roll-up.) Basis — three named reads, in sentences: **Product-team fit** — who on
this team can build this product, and what proves it. **Market-team fit** — who can
sell into this market: domain years, relationships, channel access. **Origin &
track record** — why *this* founder, *this* problem: lived pain or found it in a
market map; prior exits or venture-scale operating history named, or "first-time
founders" stated plainly. Then the commitment finding per named founder
(employer/title checked; departures confirmed; discrepancies named).

**4 · Moat** — *Credible defense against the obvious killers?* Verdict: **STRONG /
MODERATE / WEAK**. Basis: one plain sentence on the defense thesis — what concretely
stops the most obvious killer, or why nothing does. Then the evidence tags on their
own line:
- **Track A:** Goliath [PASSED/FLAGGED ⚠️ + name] · LLM Ingestion [YES/PARTIAL/NO] ·
  Wrapper [HIGH/MOD/LOW] · Memory Lock-in [present/thesis-only/absent] ·
  Stack [FOUNDATIONAL/APPLICATION/WRAPPER]
- **Track B:** Goliath [·] · TRL [n] · IP [·] · Unit economics [·] · Memory Lock-in [·]

**5 · Agent-Era Posture** — *Does the problem survive agents?* Verdict: **THREATENED /
RIDING / ENABLING / INSULATED**. See the Signal 5 specification below.

**6 · Protect Alpha** — *Does it keep its alpha — and its customers' — out of the
frontier labs' hands?* Verdict: **KEEPS / MIXED / LEAKS / N/A**. See the Signal 6
specification below.

**Basis style — describe first, then render.** Each basis is 1–2 plain sentences a
member can follow with **zero knowledge of the framework**: surface the specific
finding — name the edge, the person, the buyer, the data flow — and let the verdict
read as the conclusion that follows from it. Never output bare rubric labels, tier
names, or framework shorthand as the explanation. Labels are verdicts; the basis is
evidence.

**Brevity caps (binding):** signal basis 1–2 plain sentences, ≤ 40 words (Signal 3 Team:
≤ 60 words — it carries the fit, commitment, and origin/track-record reads; Signal 4
Moat: ≤ 50 words — it carries its evidence tags); Commercial Proof: one line; gate
findings: one line each.

---

## Signal 5 — Agent-Era Posture (weighted verdict)

*Upgraded July 2026 from the v2.1 Agent-Era Exposure trip-wire (FLAGGED/CLEAR, routing
only) to a weighted posture verdict, per the ratified V13 back-test. Full framework:
`references/agent-era-readiness-framework.md`.*

**The doorway question — the entry read:** *"Is this information for a human to act on,
or a transaction for an agent to complete?"* For a human, information is an asset to act
on; for an agent, it is a transaction to complete. Ask whether most of this product's
"users" may soon be machines acting for humans. Then describe how AI agents reshape (or
don't reshape) this specific problem over the hold period — what gets absorbed, what gets
more valuable — and let the posture follow:

- **THREATENED** — agents dissolve the core value proposition during the hold period
  (e.g., the product is a human-attention funnel, a browse/compare/aggregate layer, or a
  manual workflow agents compress; per-human-seat or engagement revenue facing the
  evaporating-seat risk)
- **RIDING** — the company *is* the reimagined solution to the agent-era version of the
  problem
- **ENABLING** — picks-and-shovels for the agent economy
- **INSULATED** — genuinely un-disruptable value (un-scrapable, high-trust,
  accountability-bearing)

**Weight: SIGNIFICANT. Adverse: THREATENED only.** A beautiful solution to a problem
agents are about to dissolve is the most dangerous bet on the table. Guardrails against
wrong kills at 3-search depth: adverse requires affirmative evidence (calibrated rules 1
and 7) and an UNVERIFIED read caps at the middle of the scale — when in doubt, the
posture doubt becomes a Live Pitch question, not an adverse vote. Note any **latent
durable asset** that could move a THREATENED read toward ENABLING or INSULATED — flagged
for Scout to score, not resolved here. Scout scores Agent-Era Readiness fresh and fully
at Q7; Screen's posture is the prior, not the final word.

*Distinction:* the AI Wrapper Assessment tests *replicability of the build*; Agent-Era
Posture tests *whether the problem itself survives the shift*.

---

## Signal 6 — Protect Alpha (routing read, no weight)

*Installed July 2026 per the Alpha-AI Sovereignty Phase 2 spec
(`references/alpha-ai-sovereignty-framework.md`), as evolved by the Claude V13 back-test
from a bare trip-wire into a read with a printed verdict. Still routing-only.*

**Verdict: KEEPS / MIXED / LEAKS / N/A** (N/A if no model supply chain). Basis: describe
what this company's alpha actually is (data, workflow, harness, customer trust) and where
it flows when the product runs — then the read. Applies to Track A, and Track B where the
product has a model supply chain.

**Flag conditions (the Phase 2 trip-wire triggers):**
- ⚠️ **Customer-Alpha Conduit** — the value prop requires customers to pipe
  regulated/proprietary data through third-party frontier APIs and no sovereign
  deployment path is stated → flag text: *"Alpha-sovereignty exposure: product is a
  conduit for customer proprietary data to frontier labs. Run full Alpha-AI Sovereignty
  at Scout."*
- ⚠️ **Own-Alpha Exposure** — the claimed differentiator visibly transits a single
  frontier provider with no stated containment.
- ❌ **Captured pattern** — single-provider dependency + that lab has shipped/announced a
  competing product + the company's alpha transits that provider → Red Flag.
- **Latent Enabler** — sovereignty-enabling positioning spotted at Screen → note "Latent
  Enabler — route to Scout for scoring"; maps to Theme 4, sometimes Theme 1; no
  conviction bonus.

**SAFE-note calibration:** building on frontier APIs is the normal early posture —
flags fire on structural conduit design or founder unawareness, never on API usage per se.

**Routing only:** this read does not gate, cap, or enter the roll-up count (calibrated
rule 16). It prints on its own line in the Verdict Block roll-up, surfaces in Risk Flags,
and (when LEAKS or MIXED) generates a Live Pitch question on ADVANCE. Scout scores
Alpha-AI Sovereignty fresh and fully at Q8.

**No double-count:** LLM Ingestion (Signal 4 tag) tests outside-in replicability from
public data; Protect Alpha tests inside-out leakage of the non-public edge. Goliath tests
incumbent capability and intent; Protect Alpha tests whether the company is training its
own Goliath. Agent-Era tests whether the problem survives; Protect Alpha tests who
captures the alpha. Read each once, in its own row.

---

## Team-Configuration Rules (Signal 3)

- **Academic founder — both configurations.** A professor/researcher founder paired
  with a full-time operating CEO is the standard deep-tech spinout configuration —
  not SPLIT; assess the operating team's commitment and treat the academic founder
  as domain-advantage evidence. **When the academic founder IS the CEO:** university
  directories, lab pages, and third-party profiles listing them as active faculty
  are the *expected public footprint* of every professor-founder — stale listings
  and entrepreneurial-leave policies mean they cannot distinguish "full-time
  professor" from "on leave, full-time CEO." Such listings are **never affirmative
  evidence of split commitment** and never justify an adverse vote on their own:
  render Team MIXED at most, flag ⚠️, and make commitment status Live Pitch
  Question #1.
- **What counts as affirmative evidence of SPLIT:** a verified competing *operating*
  role elsewhere, the company's own site/deck showing a different person in the
  seat, or the founder's own current materials contradicting the full-time claim
  **corroborated by at least one independent source**. A single self-published
  discrepancy (e.g., a personal bio page still describing an old role in the present
  tense) is a live question, not proof — print commitment **UNCONFIRMED ⚠️** and
  make it Live Pitch Question #1.
- **Label discipline — the header must agree with the roll-up.** Print SPLIT /
  SIDE-PROJECT only when Team is also counted adverse in the roll-up. If the gap is
  being treated as Scout-answerable, the printed label is UNCONFIRMED ⚠️, not SPLIT
  — a report must never carry a bottom-tier label its own roll-up ignores.
- **Role or identity discrepancies** (deck vs. public sources) are a Live Pitch
  question when other high-weight signals are strong; adverse only with affirmative
  evidence of dual-hatting in the operating seats.
- **Credibility ≠ Commitment.** Strong domain credentials never offset a commitment
  Red Flag. Assess the two sub-reads separately — a STRONG-fit team with a SPLIT CEO
  is still adverse.

---

## Conviction Mechanics — Weighted Judgment, Auditable Roll-Up

Apply judgment — no formula. **Print order is not weight order.** The weights:

- **HIGHEST — Signal 3: Team.** A non-full-time CEO or CTO, unverified founder
  claims, or a team with no domain fit is the single strongest pull toward LOW or
  DECLINE. The best idea with the wrong or uncommitted team is a pass at screen stage.
- **HIGH — Signal 1: Discontinuity.** A LATE read, or INCREMENTAL with no credible
  differentiation thesis, pulls conviction toward LOW. The novelty argument must be
  real and specific — not manufactured timing.
- **SIGNIFICANT — Signal 2: Market.** The gate checks the floor ($500M+ TAM); this
  signal rewards the upside — a meaningful growth vector and a tailwind behind the
  category. A structurally capped or flat market pulls conviction down even when the
  idea is sound.
- **SIGNIFICANT — Signal 5: Agent-Era Posture.** THREATENED (agents dissolve the
  core value proposition during the hold period) is a meaningful downward pull.
- **MEANINGFUL — Signal 4: Moat.** A weak or absent defense pulls conviction down.
  A compelling structural argument pulls it up. A FLAGGED Goliath is a pitch
  question, not a kill vote.
- **NO WEIGHT — Signal 6: Protect Alpha.** Routing flag only — it never gates, caps,
  or enters the roll-up count. It surfaces in Risk Flags and (when LEAKS or MIXED)
  as a Live Pitch question.

**A signal is ADVERSE only at its bottom verdict tier — and only on affirmative
evidence, never on screen-depth uncertainty:**

- **Team** — WEAK, or commitment SPLIT / SIDE-PROJECT with affirmative evidence
  (see the team-configuration rules — a standard academic-founder structure is not
  SPLIT).
- **Discontinuity** — LATE only. INCREMENTAL alone is **never** adverse.
  INCREMENTAL combined with Moat WEAK is one adverse finding, counted **once**
  (under Moat) — a crowded category with no named edge is a single weakness, not two.
- **Moat** — WEAK only. MODERATE is **never** adverse, whatever its flags. Goliath
  FLAGGED is a Risk Flag and a Live Pitch question — not an adverse vote.
- **Market** — WEAK or structurally capped.
- **Agent-Era** — THREATENED.

The between-signal reads (coherence, narrative-vs-substance, pattern note) are
**never adverse votes** under any circumstances.

**Screen-stage humility:** a doubt that three web searches cannot resolve becomes a
Live Pitch question or a re-engage condition — **never an adverse vote.** "No
credible answer visible at screen depth" means "probe at Scout," not "kill at
screen." The roll-up must never contradict the printed verdicts above it.

**Compound rule — weight-tiered:**
- **DECLINE** when **Team is adverse AND any other weighted signal is adverse**, or
  when **THREE OR MORE** weighted signals are adverse.
- Any other adverse combination caps the call at **WATCH** (the silent Fix-Forward
  Test still runs — if the gaps are independently structural and not
  Scout-closeable, it flips the verdict to DECLINE).
- **WATCH is the when-in-doubt default.** DECLINE at screen is reserved for gate
  FAILs, the compound rule, and Fix-Forward failures.

**Fix-Forward Test (silent):** before issuing WATCH, ask: *"If the primary WATCH
condition were resolved, would this thesis then clear the Scout bar?"* If NO — because
one or more weighted signals remain adverse independently — issue DECLINE instead. Do
not print the test; print only the milestones and the gap.

**Ask-at-Scout rule (WATCH vs. ADVANCE-with-question):** WATCH is for gaps that need
**time or a milestone** to resolve — a revenue target, a TRL demonstration, a
departure that hasn't happened yet. If the only gap blocking ADVANCE is a **question
the 30-minute Scout call can answer directly** — commitment status, role clarity, a
terms discrepancy — and no other weighted signal is adverse, issue **ADVANCE TO
SCOUT with that question as Live Pitch Question #1**. Do not park a deal on WATCH
for information the Scout conversation exists to obtain.

**Traction lift:** exceptional Commercial Proof that is **VERIFIED** (real revenue,
real growth, real retention — not deck-claimed) is an explicit conviction lifter: it
can raise Triage Conviction one band and offset **one** adverse signal other than
Team. Verified customer pull is among the strongest surface-to-Scout signals — a
red-ocean read with exceptional verified traction is a Scout conversation, not a
screen kill. State the lift in the roll-up line when applied.

**Triage Conviction pattern guide:**
- **HIGH** — Team STRONG with FULL-TIME commitment + at least one of
  {PIONEER/DIFFERENTIATED discontinuity, RIDING/ENABLING agent-era posture, STRONG
  market tailwind, Moat STRONG, exceptional verified traction}; no adverse signals;
  **and no unresolved material coherence contradiction on a load-bearing number**
  (ask vs. traction, forecast vs. actuals, terms vs. terms). HIGH means nothing
  central needs explaining — a gap worth a Live Pitch question caps conviction at
  MEDIUM. *Conviction cap only: it never changes the call and never enters the
  roll-up.*
- **MEDIUM** — Mixed signals; at most one adverse signal (or two with traction lift
  applied); one gap Scout can close
- **LOW** — Compound-rule territory, or one adverse HIGHEST/HIGH signal with weak
  compensation elsewhere

---

## Between-Signal Reads (the screener's eye)

Three disciplines an experienced human screener applies *between* the signal
categories. None of them is a signal, none carries weight, and **none may ever enter
the adverse roll-up** — they produce flags, Concern lines, and Live Pitch questions
only.

**1. Coherence pass.** Deliberately check the pitch against itself — this is a
distinct pass, not an incidental catch: does the ask match the traction (a $15M cap
on $10K revenue)? Does the ambition match the team size? Do the deck's terms match
the form's terms? A material contradiction becomes a ⚠️ Risk Flag
(`⚠️ Coherence → [the contradiction]`) and, on ADVANCE, usually a Live Pitch
question. A contradiction is a probe, never an adverse vote — a founder who cannot
explain the gap at Scout is Scout's kill, not Screen's. A material contradiction on
a **load-bearing number** does, however, cap Triage Conviction at MEDIUM: HIGH
conviction means nothing central needs explaining. (Conviction cap only — the call
itself is never changed by a coherence finding.)

**2. Narrative vs. substance.** Grade the substance, not the storytelling. When
story quality and substance quality diverge sharply in either direction — a polished
deck wrapped around a thin product, or a weak deck around a real one — say so in the
Verdict Block "Why." The confidence tags already cap unverified stories mechanically;
this discipline closes the rest: no halo for polish, no penalty for plain packaging.

**3. Pattern note (optional output line).** When the pitch strongly resembles a
recognizable venture shape, print one line directly under Risk Flags — otherwise
print nothing:

`Pattern note: [the resemblance, plain words] — probe at Scout: [the disconfirming question].`

Rules:
- **A pattern match is a hypothesis, never evidence.** It generates the probe
  question; it never colors a signal verdict, never becomes a flag by itself, and
  never enters the roll-up.
- **Open-ended by design — there is no archetype library to match against.** Name
  the resemblance in your own plain words. Two examples of the right *altitude*
  only (a structural business shape, never a sector): *services-in-SaaS-clothing*,
  *feature-not-company*. These are format examples, not a match list. The empirical
  pattern-shape intake log accretes in the V12 workbench.
- Silence is the default. Most reports will not have one; never pad to produce one.

---

## AI Wrapper Assessment (Track A Deals Only)

For all Track A deals, run this assessment before rendering the Moat verdict. The result
prints as the `Wrapper [HIGH/MOD/LOW]` evidence tag in Signal 4.

**HIGH Wrapper Risk:** Core product is primarily prompt engineering or API orchestration
on top of OpenAI/Anthropic/etc. LLM Ingestion Test = YES (a customized frontier-model
agent could replicate 80%+ of core function). No proprietary data, training, or workflow
integration visible. Could be replicated by a developer in < 48 hours. → ⚠️ Yellow Flag.
Strong evidence for a WEAK Moat verdict; an explicit moat justification is required for
anything above WEAK.

**MODERATE Wrapper Risk:** Product uses public AI infrastructure but shows early signs of
a proprietary layer — domain-specific data, fine-tuning signals, workflow integration
depth. LLM Ingestion Test = PARTIAL (could replicate core, but not the value-add layer).
Moat is nascent but visible.

**LOW Wrapper Risk:** Proprietary model, unique training data, deep workflow integration,
or a non-AI moat that is genuinely defensible. LLM Ingestion Test = NO. AI is an enabler,
not the entire product.

### Replicability Speed Flag *(also applies at Scout and Diligence)*

When the AI Moats Framework Replicability Speed Matrix is completed (Scout Phase 2 or
Diligence), apply these flag triggers:

- ⚠️ **Yellow Flag** — any threat actor row shows replication possible in < 6 months. Text: "Replicability risk: [threat actor] could replicate core functionality within [timeframe]. Validate moat depth before advancing."
- ⚠️ **Strong Yellow Flag** — the LLM provider row (OpenAI, Anthropic) shows replication possible in < 12 months. Text: "Feature-not-company risk: core capability could become a native LLM platform feature. Requires explicit moat justification to advance."

These flags compound with the AI Wrapper Assessment. A deal with HIGH Wrapper Risk AND a
Replicability Speed Flag is reading Moat WEAK on two independent tests — strong evidence
toward the compound rule unless the moat thesis is independently validated by an SME.

---

## The Calibrated Rules Ledger

Each rule encodes a ratified back-test adjudication (STL, Captain Compliance, Synergist —
see the V12 workbench decision log). **These rules transfer verbatim in substance; do not
paraphrase them loose.** They are stated operationally throughout this file and in
`/screen`; this ledger is the audit anchor.

1. Adverse only at bottom verdict tier; MODERATE/MIXED never adverse, whatever the flags.
2. INCREMENTAL alone never adverse; INCREMENTAL + Moat WEAK = one adverse finding,
   counted once (under Moat).
3. Goliath FLAGGED = Risk Flag + pitch question, never an adverse vote.
4. Compound rule, weight-tiered: DECLINE on (Team adverse + any other adverse) or
   (3+ adverse) or gate FAIL or Fix-Forward failure; all other adverse combinations
   cap at WATCH.
5. WATCH is the when-in-doubt default; silent Fix-Forward Test before issuing WATCH.
6. Traction lift: exceptional VERIFIED commercial proof lifts conviction one band and
   may offset one non-Team adverse signal; stated in the roll-up.
7. Screen-stage humility: a doubt 3 searches cannot resolve → pitch question or
   re-engage condition, never an adverse vote; adverse requires affirmative evidence.
8. Ask-at-Scout rule: a call-answerable gap (commitment, role clarity, terms) with no
   other adverse signal → ADVANCE with it as Live Pitch Question #1, not WATCH; WATCH
   is for milestone-gated gaps.
9. Coherence conviction cap: material contradiction on a load-bearing number caps
   conviction at MEDIUM — cap only, never a verdict vote (Synergist adjudication).
10. Academic-founder rules, both configurations: professor + operating CEO = standard
    spinout, not SPLIT; professor-as-CEO — faculty/lab/directory listings are the
    expected footprint, never affirmative SPLIT evidence (STL adjudication).
11. SPLIT requires corroborated evidence; a single self-published discrepancy →
    commitment UNCONFIRMED ⚠️ + Live Pitch Question #1 (Captain Compliance adjudication).
12. Label discipline: header prints SPLIT/SIDE-PROJECT only when Team is counted
    adverse in the roll-up; otherwise UNCONFIRMED ⚠️.
13. Credibility ≠ Commitment: strong credentials never offset a commitment red flag;
    assess separately.
14. Between-signal reads never enter the roll-up under any circumstances.
15. Pattern note: optional, silent by default, hypothesis-only, open-ended (no
    archetype library; intake log accretes empirically in the V12 workbench).
16. Protect Alpha: no weight, no gate, no cap, no double-count (LLM Ingestion =
    outside-in replicability; Protect Alpha = inside-out leakage; Goliath = incumbent
    intent; Protect Alpha = training your own Goliath).
17. Gate FAIL only on clear evidence; silence = PASS + Yellow Flag.
18. Roll-up must never contradict the printed signal verdicts; self-check enforces
    arithmetic against the adverse definitions.

---

## Research Protocol

Deploy WebSearch on exactly **three searches** before producing any report. Do not exceed
this at Screen stage — save full research for Scout and Diligence agents. **Run them
silently — never announce or narrate the research; the first output of the run is the
report title itself.**

**Search 1 — Market validation**
TAM, structural shifts, competitive landscape, Goliath exposure. Find 1–2 third-party
market sizing references and compare against the founder TAM claim; a large unexplained
gap is a coherence/confidence finding.

**Search 2 — Founder/team validation (with LinkedIn commitment check)**
For each named founder: current employer, current title, LinkedIn confirmation they have
left their prior role. Flag any founder still employed full-time elsewhere. Verify key
claims (prior revenue figures, exits, named titles). Apply the team-configuration rules
before reading any discrepancy as SPLIT.

**Search 3 — Competitive and Goliath landscape**
Who else is in this space; what incumbents could kill this with a feature update. This
search directly enables the Goliath Test tag.

All other research (patent searches, regulatory landscape, customer references, technical
stack depth) is Scout- and Diligence-stage work. Do not deploy research agents at Screen.

---

## Live Pitch Questions (TechGroup ADVANCE Deals)

When a Tech-tagged deal advances, generate Live Pitch Questions — **3 maximum** —
specifically for the founder's Live Pitch at the bi-weekly TechGroup meeting. Ordered
most critical to most clarifying; the most critical is often founder commitment, moat,
or alpha containment. Not generic — derived from the specific gaps, risks, and
uncertainties identified during screening.

Question design rules:
- Targeted: reference something specific in this deal (a market claim, a founder gap, a defensibility question, a coherence contradiction)
- Open-ended: designed to reveal information not in the deck
- Prioritized: a commitment UNCONFIRMED ⚠️ or Ask-at-Scout gap is always Question #1
- Format: numbered list, 1–2 sentences each

Categories to draw from:
- Founder commitment / role clarity (Signal 3 UNCONFIRMED ⚠️)
- Moat/defensibility gaps (Signal 4 WEAK-adjacent, Wrapper HIGH, Goliath FLAGGED)
- Protect Alpha containment (Signal 6 LEAKS or MIXED — mandatory question on ADVANCE)
- Unvalidated market or TAM claims (Signal 2 confidence gaps)
- Coherence contradictions (ask vs. traction, deck vs. terms)
- Agent-era posture doubts (Signal 5 latent assets or unresolved reshaping reads)
- Track B specifics: TRL evidence, BOM/margin path, Hardware Last Mile signals
- Structure friction (SAFE terms or syndication items the founder should address in the room)

---

## Technology Readiness Levels (TRL) — GAO Scale (Reference)

NWAi requires TRL ≥ 5 for hardware-bearing or technical deals. The TRL prints as a Track
B Moat evidence tag at Screen; detailed TRL application happens at Scout and Diligence.

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

*NWAi TechGroup Six-Signal Screener Reference | v3.0 | July 2026*
*v3.0 (July 2026): Six-Signal verdict model installed per the Pipeline Framework Adoption Spec (notes/NWAi-Pipeline-Framework-Adoption-Spec-2026-07.md) — Craft-at-Screen boundary, Agent-Era posture verdict (upgraded from the v2.1 Exposure trip-wire), Protect Alpha Signal 6 (Alpha-AI Sovereignty Phase 2, as evolved by the Claude V13 back-test), calibrated rules ledger. Absorbs the hard gates, NWA Filter, research protocol, and TRL reference formerly in gates-and-flags.md (rewritten and renamed to `gates-and-flags-universal-guide.md`). Numeric v2.1 archived at `_archive/gates-and-flags-techgroup-numeric-v2.1-legacy.md`.*
*Replaces v2.1 (June 2026) and v1.0 (March 2026). Judgment model provenance: Claude V13 sandbox (docs/reference/Gemini/), 4-deal regression back-test ratified July 2026.*
*Medical and Space verticals retain separate hard-gate screener frameworks; see `gates-and-flags-universal-guide.md` for the universal playbook guide.*
