# NWAi TechGroup — Six-Signal Screener Reference v3.7

> **This is the self-contained screening reference for NWAi TechGroup.** It defines the
> complete Screen-stage judgment model: hard gates, the NWA Filter evidence-rigor tests,
> the Six-Signal verdict model, conviction mechanics, and the calibrated rules ledger.
> `/screen` loads this file as its primary framework source.
>
> **Lineage:** v3.0 (July 2026) replaces the numeric v2.1 screener (6-dimension Track A/B
> Opportunity rubrics + Readiness scoring, archived at
> `_archive/gates-and-flags-techgroup-numeric-v2.1-legacy.md`). The Six-Signal judgment
> model was proven in the Claude V13 sandbox program (V10→V13 lineage, 4-deal regression
> back-test ratified; see `docs/reference/ClaudeProjects/_archive/V12-Signal-Architecture-Workbench.md`)
> and installed per `notes/NWAi-Pipeline-Framework-Adoption-Spec-2026-07.md`. Its design
> stance — qualitative signal verdicts that let a craftsman form conviction, no numeric
> scores at Screen — implements the Craft Investing thesis
> (`docs/strategy/future-of-venture-investing/NWAi-Craft-Investing-Thesis-2026-06.md`).
>
> **v3.1 (August 2026) — Rubric Fidelity Amendment:** a cross-session screen of the same
> company (same inputs) on the Claude V13 sandbox project produced one DECLINE and one
> ADVANCE, traced to a soft call on Team commitment evidence sitting directly on the
> compound rule; a follow-up live comparison against this pipeline screener surfaced a
> second, independent divergence on the Moat WEAK/MODERATE boundary. This amendment ports
> both fixes: a Source-Tier Rule and Identity-Match Standard (Signal 3), a Confidence-Gated
> Compound Rule, a Moat Sufficiency Test (Signal 4), a fixed coherence diff-list, and a
> fixed founder-identity query set — no other weight or verdict mechanic changed. See
> `docs/reference/ClaudeProjects/_archive/Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md`
> (Amendments 1 and 2) and `docs/reference/ClaudeProjects/Rubric_Fidelity_Addendum_v1.md` for the
> incidents this responds to. Market's and Agent-Era's bottom-tier boundaries remain
> unexamined open risk — no live divergence observed there yet.
>
> **v3.2 (August 2026) — Ask-at-Scout Precedence Check:** a fourth live screen of the
> same company — run on the v3.1 fixes, in a live Claude Project, after both prior
> guardrails had visibly worked (Team correctly read non-adverse, Moat correctly
> read WEAK via the Sufficiency Test) — still printed ADVANCE despite its own roll-up
> line naming Moat adverse. The Ask-at-Scout rule's precondition ("no other weighted
> signal is adverse") existed in prose but nothing forced it to be checked before the
> rule's shortcut fired on the Team gap — a verdict-assembly order-of-operations
> error, distinct from the v3.1 evidentiary-rigor fixes. Adds a binding Precedence
> Check (Calibrated Rule 8a): compute the full roll-up first; Ask-at-Scout applies
> only when it shows zero adverse signals. Correct verdict for the triggering case:
> WATCH. See `docs/reference/ClaudeProjects/_archive/Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md`
> (Amendment 3).
>
> **v3.3 (October 2026) — V15 judgment re-sync (Phase 1a):** the coordinator screener
> (Claude V14 → V15 Rev A, `docs/reference/ClaudeProjects/`) evolved judgment rules this
> pipeline never received. This version ports them — rules only, no presentation
> change: a FRAGILE revenue tier and the Thin Commercial Proof cap (V14); Team rated on
> three lines (Committed / Product Fit / Market Fit), lowest line sets the rating, with
> Market Fit WEAK ("no path to the buyers") as an adverse path and track record unrated
> (V15); the Agent-Era posture judged on the product as built (V15 Rev A — the Complete
> Contract Cycle run, which flipped DECLINE→WATCH until fixed); and single-source claim
> marking extended to every fact (V15 Rev A — Reverent run 2). Calibrated Rules 23–28
> added; 10, 11, 12, 21 amended. Weights, gates, the compound rule, Moat Sufficiency,
> Protect Alpha and Ask-at-Scout are unchanged. From this version on the **pipeline is
> the source of truth** and the coordinator screener is rebuilt from it, never the
> reverse. The Agent-Era bottom-tier boundary is now addressed at Screen; Market's
> remains open. See `pipeline-decisions-log.md` Decision 14.
>
> **v3.4 (October 2026) — Two-layer report (Phase 1b):** presentation only. The Triage
> Report now prints a plain-language member read (ported from the coordinator screener
> V15) plus a Deal-Team Appendix carrying the internal labels, confidence tags, and
> evidence tags for Scout intake. No judgment rule, weight, or verdict definition
> changed. See the Printed vocabulary note under The Six Signals and
> `pipeline-decisions-log.md` Decision 15.
>
> **v3.5 (October 2026) — Evidence and wording clarifications (Decision 16):** third-party
> documents count as outside evidence for the fact they prove; stale-materials check
> (90 days); a US entity that is not yet a C-corp is a yellow flag, never a gate fail;
> Protect Alpha N/A split into confirmed vs. not stated; Wrapper N/A for products that
> call no LLM; "three searches" means three search topics; "named founder" defined; Track
> B only when the company itself ships the hardware. Found in the Decision 14–15
> regression runs.
>
> **v3.6 (October 2026) — Patent fix (Option 5 Phase 2, Decision 17):** on Track A,
> software patents, domain knowledge, and code are head starts, not moat assets, and "no
> IP" is no longer a Track A negative tag in the Moat Sufficiency stack. Track B is
> unchanged. The 90-day copy test and the headless-incumbent test were considered and
> kept out of the Screen; they are available as Live Pitch questions only and are
> deferred to Scout and Diligence (Phase 3). Also clarifies the HIGH conviction cap: only
> a gap in one of the HIGH conditions caps at MEDIUM; a flagged big competitor or a
> routine Live Pitch question does not by itself block HIGH.
>
> **v3.7 (October 2026) — Hardware evidence standards + marker (Decision 22):** three
> Track B evidence standards that had lived only in the coordinator screener's knowledge
> file are adopted here — the Hardware Last Mile standard (95%+ production reliability),
> the 50%+ gross-margin path, and TRL 7 as the reference point for a Track B Moat read.
> All three are evidence for the Track B Moat tags and Live Pitch questions — never, by
> themselves, an adverse vote. The uncorroborated-claim marker prints "(unconfirmed)"
> (was "(unverified)"), so the member read no longer prints a word it forbids. The
> coordinator screener V16 is rebuilt from this version (Phase 5).
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
kill reason), a cut-down What They Do (1–2 sentences + the two Stage lines), the Gates
table, the report footer, and the Deal-Team Appendix (gates and Track) — then stop (see
`/screen` Step 8).

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
- **US entity that is not yet a C-corp** (an LLC, S-corp, or similar) — the Entity gate
  still PASSES (the entity is US-investable). NWA invests in C-corps only, so print a
  **(!) "Not yet a C-corp — conversion needed before NWA invests"** Risk Flag, record it
  in the Deal-Team Appendix, and carry it as a Live Pitch question / re-engage item.
  Conversion is routine; never a gate fail, never a conviction pull.

---

## Track Determination

Assign every Tech-tagged deal to one track before producing the Six Signals. Use the primary revenue and product model — not the presence of software components alone.

- **Track A — Software / AI / Cloud**: Primary value delivery is software, data, algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace. Examples: enterprise SaaS, AI workflow tools, data platforms, fintech software, vertical AI.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary deliverable. Revenue includes hardware unit sales, manufacturing, or embedded systems. Examples: robotics, semiconductors/chips, physical AI devices, industrial automation, defense hardware.

Mixed plays (e.g., software-enabled hardware) default to Track B when **the company itself sells, ships, or manufactures** a physical product that is necessary for its product to function. When the company sells only software and the customer supplies the hardware it runs on (e.g., calibration software for the customer's own projectors and cameras), assign **Track A**.

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
non-software`. For software that does not call a large language model, the Wrapper tag
is `Wrapper N/A — no LLM` (see AI Wrapper Assessment). *This test reads outside-in replicability from public data; Protect Alpha
(Signal 6) reads inside-out leakage of the non-public edge — read each once, in its own
row.*

### 4. Revenue Quality Audit → Commercial Proof quality
Do not treat ARR as a neutral signal. Classify revenue on the Commercial Proof line as
**STICKY** (automated, API-driven, self-serve, low-touch retention) / **STAGNANT**
(high-touch, consulting-adjacent, services-embedded, or inertia-based — customers stay
because switching is painful, not because the product is essential) / **FRAGILE**
(thin/early revenue that exists but is easily lost, or dependent on a HIGH Wrapper read
holding up) / **PRE-REVENUE** (no revenue yet, stated honestly — distinct from FRAGILE,
which has *some* revenue, just precarious; never conflate the two under one tag).
**FRAGILE requires revenue from the product itself** — grants (e.g., SBIR), incidental
consulting or services, and signed-but-unbilled agreements alone are PRE-REVENUE.
Only exceptional **VERIFIED** commercial proof powers the traction lift; STAGNANT and
FRAGILE revenue never do. PRE-REVENUE and FRAGILE trigger the Thin Commercial Proof cap
(Conviction Mechanics).

---

## Confidence Tags

Every signal carries a confidence tag:

- **VERIFIED** — load-bearing elements confirmed via the 3 web searches or an
  authoritative source (note the source parenthetically where a verdict hinges on it)

**Third-party documents count as outside evidence — for the fact they prove.** A document
executed or issued by a named third party (a contract countersigned by the counterparty,
an auditor's or hosting provider's attestation letter, a signed term sheet from a named
lead) counts as outside confirmation **of what that document itself establishes**, even
when the company supplied it in the data room: a countersigned reseller contract confirms
the contract exists and its terms — not that revenue flows from it. Company-authored
material (decks, forms, summaries, forecasts, scans of the company's own records)
remains a company claim.

**Press repeating founder figures is PARTIAL, never VERIFIED.** An article or interview
that reports figures the founder supplied (ARR, growth, customer counts, retention) puts
the claim on the record, so it lifts the element above a bare deck claim to PARTIAL. But
its origin is still the founder, so it never makes the element VERIFIED — and never
qualifies traction for the traction lift on its own. VERIFIED requires a source with an
independent basis: a customer or partner announcement, a filing, a priced round whose
investor did diligence, reporting where the journalist cites their own data, or records
seen in diligence (Jamie's ruling, Decision 16).
- **PARTIAL** — some elements verified; at least one load-bearing element is not
- **UNVERIFIED** — deck-claim only

**Mechanical rule:** an UNVERIFIED signal caps at its middle verdict (MIXED / MODERATE /
INCREMENTAL-equivalent) — never the top tier. PARTIAL caps the *unverified element*, not
the whole signal. Note uncorroborated third-party claims inline as "(unconfirmed)" and
company assertions as "(company claim)" (see Claim Discipline).

**Ordering requirement.** Assign the confidence tag *before* selecting the verdict tier.
Confidence should be a mechanical readout of source tier and identity-match status (see
Signal 3's Source-Tier Rule and Identity-Match Standard) — never a tag back-filled to
justify a verdict already chosen on gut feel. If the tag and the verdict were decided in
the same mental motion, the tag is decorative.

---

## The Six Signals

> **Printed vocabulary (v3.4, Decision 15).** The labels, tiers, and tags in this file are
> the screener's **internal vocabulary** — they govern judgment exactly as written. The
> Triage Report prints them in two layers (`/screen` Step 8): the **member read** prints
> plain-language renderings (plain signal names, stars, fixed verdict words, a Source
> column), and the **Deal-Team Appendix** prints the internal labels, confidence tags, and
> evidence tags that `/scout` and the conversion rubric read. Wherever this file says a
> label or tag "prints," it prints in the appendix; the member read carries its plain
> rendering. Emoji markers in this file (⚠️ / ❌) print as (!) / (X).

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
difference (on Track A, a software patent or domain knowledge alone is a head start, not
a moat). Carries forward to Scout Q1/Q5 for the full read.

**2 · Market** — *Room and tailwind for a venture return?* Verdict: **STRONG /
MODERATE / WEAK**. Basis: describe the market and its tailwind in plain terms — what
is growing, why, and who is being pulled into buying. Floor cleared at the gate;
this scores the upside and the return path.

**↳ Commercial Proof** — *evidence within Market: not separately weighted, but see
Traction lift and the Thin Commercial Proof cap.* One indented line under Signal 2, with
its own confidence tag: stage · revenue state · quality [STICKY / STAGNANT / FRAGILE /
PRE-REVENUE] · velocity.
Pre-revenue stated honestly — a signal, never a kill on its own. Track B emphasis:
stage against TRL, unit-economics evidence, production reliability signals.

**3 · Team** — *Can this team execute, and are they all-in?* Verdict: **STRONG /
MIXED / WEAK plus commitment: FULL-TIME / UNCONFIRMED ⚠️ / SPLIT / SIDE-PROJECT**
— both in the header line. (UNCONFIRMED = a live, Scout-answerable question — never
adverse; SPLIT only on corroborated evidence, and only when Team is counted adverse
in the roll-up.)

**Three rated lines + one unrated line:**

| Line | The question | Top | Middle | Bottom (adverse) |
|---|---|---|---|---|
| **Committed** | Are they all in? | FULL-TIME (confirmed) | UNCONFIRMED ⚠️, or a non-CEO/CTO co-founder is part-time | SPLIT / SIDE-PROJECT (CEO or CTO, affirmative evidence) |
| **Product Fit** | Can they build it? | STRONG — has built this before | MIXED — related experience only | WEAK — no one who can build it |
| **Market Fit** | Can they sell it? | STRONG — knows the buyers | MIXED — some market access | WEAK — no path to the buyers |
| **Track Record** | Proven? | *Unrated.* Plain read only: prior exit · has scaled a company · first-time founders · past venture raises questions ⚠️ | | |

- **Team rating = the lowest of Committed, Product Fit, and Market Fit** (FULL-TIME ≈
  STRONG, UNCONFIRMED ≈ MIXED, SPLIT/SIDE-PROJECT ≈ WEAK). A team is only as strong as
  its weakest rated line.
- **Team confidence = the confidence of the line that sets the rating** (on a tie,
  VERIFIED/PARTIAL wins over UNVERIFIED). This is the tag the Confidence-Gated
  Compound Rule reads when Team is adverse.
- **The UNVERIFIED cap applies line by line:** a line resting only on company claims
  cannot print its top tier. "The company says the CEO is full-time" alone is
  Committed UNCONFIRMED, not FULL-TIME.
- **Track Record never moves the Team rating — down or up.** First-time founders are
  never disadvantaged; a prior exit never covers for a weak team today. A concerning
  track record (e.g., the same team relaunching after a well-funded prior company that
  didn't scale, or an undisclosed predecessor company) prints **past venture raises
  questions ⚠️** and becomes a ⚠️ Risk Flag plus a Live Pitch question or re-engage
  item — and often fires the Pattern note.

Basis — one sentence per line: **Committed** — the commitment finding per named founder
(employer/title checked; departures confirmed; discrepancies named). **Product Fit** —
who on this team can build this product, and what proves it. **Market Fit** — who can
sell into this market: domain years, relationships, channel access, named buyer
reachability. **Track Record** — why *this* founder, *this* problem (lived pain, or
found it in a market map); prior exits or venture-scale operating history named, or
"first-time founders" stated plainly.

**4 · Moat** — *Credible defense against the obvious killers?* Verdict: **STRONG /
MODERATE / WEAK**. Basis: one plain sentence on the defense thesis — what concretely
stops the most obvious killer, or why nothing does. Then the evidence tags on their
own line:
- **Track A:** Goliath [PASSED/FLAGGED ⚠️ + name] · LLM Ingestion [YES/PARTIAL/NO] ·
  Wrapper [HIGH/MOD/LOW] · Memory Lock-in [present/thesis-only/absent] ·
  Stack [FOUNDATIONAL/APPLICATION/WRAPPER]
- **Track B:** Goliath [·] · TRL [n] · IP [·] · Unit economics [·] · Memory Lock-in [·]

**Track B evidence standards (Decision 22).** Three reference standards for reading the
Track B tags — evidence, not caps:
- **Hardware Last Mile.** A working prototype or demo is not evidence of production
  readiness. Look for 95%+ production reliability reached through non-obvious
  engineering before treating a hardware claim as strong. A prototype-only claim reads
  as a head start in time, not a moat asset, and becomes a Live Pitch question.
- **Margin path (Unit economics tag).** The bar is a credible path to 50%+ gross margin at
  scale. No visible path is evidence against a STRONG Moat read and a Live Pitch question
  (BOM / margin path). At Screen it never, by itself, makes Moat WEAK or counts as an
  adverse vote; Scout and Diligence test it properly.
- **TRL 7 reference.** TRL 5 remains NWAi's minimum. TRL 7 (system prototype in an
  operational environment) is the level a Track B Moat read is measured against: below
  TRL 7, the physical build has not yet been shown to survive contact with real
  conditions, so it supports at most a nascent element, not STRONG.

**Moat Sufficiency Test (WEAK vs. MODERATE boundary).** Before rendering the Moat
verdict, name the single affirmative asset — not merely the absence of a negative — that
would stop the flagged Goliath(s) from closing the gap within the Goliath Test's 12–18
month window: filed or pending IP (**Track B only** — see Head starts below), a
proprietary data asset already accumulating (not aspirational), a network effect with
evidence it is operating (not just claimed), or an integration/switching-cost depth the
flagged incumbents structurally lack (not one they already have themselves).
- **No such asset can be named → WEAK**, regardless of how the thesis reads in isolation.
- **Both prongs apply independently.** Even when an asset *type* on the list can be named
  (e.g., a proprietary data asset), two or more stacked negative tags mean that asset has
  not been shown to survive the flagged Goliath(s) → WEAK. Naming an asset type is
  necessary for MODERATE, not sufficient (accepted by Jamie, Decision 14).
  Two or more of the negative tags below stacking together IS the absence of an
  affirmative asset — the compounding is the finding, not a coincidence to explain away:
  - **Track A:** {Wrapper MODERATE/HIGH, Goliath FLAGGED, Memory Lock-in
    thesis-only/absent}
  - **Track B:** {no IP, Goliath FLAGGED, Memory Lock-in thesis-only/absent}

**Head starts, not moat assets (Track A — Decision 17).** On a Track A deal, a software
patent (filed, pending, granted, or licensed in), the founders' domain knowledge, and the
code or feature set itself are **head starts** — worth months of lead against a frontier
model and a motivated team, not years. None of them is the affirmative asset this test
asks for, none counts toward STRONG, and none fills the "nascent element" field. Because
holding a patent no longer helps a Track A moat, lacking one no longer hurts it: "no IP"
is not a negative tag on Track A. Record head starts on the appendix "Head starts" line;
domain knowledge stays Team evidence (Market Fit / Product Fit). On **Track B**, where
patents protect a physical build, filed or pending IP remains a qualifying asset and "no
IP" remains a negative tag.
- **One asset named with at least early/partial evidence → MODERATE.**
- **Multiple independent asset types stack with real evidence → STRONG.**
A moat thesis that only restates the company's own pitch ("we have a network effect,"
"we're the agent-native player") without naming which specific asset survives contact
with the named Goliath(s) has not passed this test — print WEAK and let the Live Pitch
question ask the company to name it.

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

**Brevity caps (binding, member read):** signal basis 1–2 plain sentences, ≤ 40 words
(Signal 4 Moat included — its evidence tags print in the Deal-Team Appendix, and the
basis names any big competitor that already does this); Signal 3 Team: four lines, ≤ 20
words each (Committed · Product Fit · Market Fit · Track Record); Commercial Proof: one
plain "Revenue so far" line (the full line prints in the appendix); gate findings: one
line each.

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

**The posture is four categories, not a scale** — there is no neutral middle. Never
invent a hybrid or hedged posture ("survives agents, form at risk," "partly
threatened"); INSULATED means INSULATED, never "somewhere in between."

**Judge the product as built today, not the underlying need.** The question is
whether agents absorb *how this company delivers value* — its product, workflow, and
pricing model — during the hold period, not whether the customer's underlying need
survives. Almost every need survives agents; that alone never earns INSULATED or
ENABLING. **"Product form" means how the company delivers and charges for value — its
value-delivery mechanism and pricing model — not its user-interface surface.** A
human-facing UI over a value layer agents can't absorb (e.g., liability-bearing
enforcement) is read on the value layer.

- **THREATENED** — agents absorb the core value **as this company delivers it** during
  the hold period, even if the underlying need lives on (e.g., the product is a
  human-attention funnel, a browse/compare/aggregate layer, or a manual workflow agents
  compress; per-human-seat or engagement revenue facing the evaporating-seat risk; or
  the need to control who edits which clause survives, but a human-facing routing tool
  priced per seat is what agents replace). When the need survives but the product form
  does not, the posture is THREATENED — put the escape route in the basis as "Could get
  stronger if: [the one concrete move]."
- **RIDING** — the company *is* the agent-era version of the solution, today.
- **ENABLING** — agent or machine activity raises demand for **the product's form as
  built**: infrastructure, plumbing, or verification the agent economy runs on. The
  test is the product's *form*, not the bare underlying need — a per-seat tool for
  human reviewers does not become ENABLING just because contracts still need governing.
- **INSULATED** — agents neither raise nor reduce demand for the product as built: the
  value is physical, high-trust, human-verified, accountability-bearing, or locally
  embedded in a way agents can't touch. Stress-test this claim hard; most "Insulated"
  companies are actually Threatened.

**Posture never asks whether this company wins the demand.** Whether this company or
an incumbent captures rising agent-driven demand is a competition question — Moat
(Signal 4) already reads it. Never downgrade ENABLING to INSULATED because incumbents
may capture the demand; that double-counts Moat. **Mixed reads resolve to the weaker,
product-level posture**, with the nuance carried in the basis ("Could get stronger
if…" / "What to watch…"), never in a hedged label.

**Weight: SIGNIFICANT. Adverse: THREATENED only.** A beautiful solution to a problem
agents are about to dissolve is the most dangerous bet on the table. Guardrails against
wrong kills at 3-search depth: adverse requires affirmative evidence (calibrated rules 1
and 7) and an UNVERIFIED read never earns the top posture (RIDING) — the four postures
are categories, not a scale, so there is no "middle" to cap at. When the doubt is about
the evidence rather than the product form, it becomes a Live Pitch question, not an
adverse vote. Note any **latent
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

**Verdict: KEEPS / MIXED / LEAKS / N/A** (N/A if no model supply chain). Distinguish
two N/A cases: **N/A — confirmed** (the materials or searches show the product does not
use an outside AI model) and **N/A — not stated** (AI use is plausible but the materials
don't say). N/A — not stated prints as "AI use not stated" in the member read and
generates a Live Pitch question ("Does any part of the product call an outside AI model,
and with what data?") or re-engage item. Neither case carries weight. Basis: describe
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
rule 16). Its read prints in the Deal-Team Appendix (never in the member-read "Signals
against the deal" line); the member read shows it in the summary table and its block, it surfaces in Risk Flags,
and (when LEAKS or MIXED) generates a Live Pitch question on ADVANCE. Scout scores
Alpha-AI Sovereignty fresh and fully at Q8.

**No double-count:** LLM Ingestion (Signal 4 tag) tests outside-in replicability from
public data; Protect Alpha tests inside-out leakage of the non-public edge. Goliath tests
incumbent capability and intent; Protect Alpha tests whether the company is training its
own Goliath. Agent-Era tests whether the problem survives; Protect Alpha tests who
captures the alpha. Read each once, in its own row.

---

## Team-Configuration Rules (Signal 3)

- **Source-Tier Rule.** Before any external finding can support a Team verdict,
  classify its sources into two tiers: **Tier 1 (primary)** — the person's own
  LinkedIn profile or public statements, a company "team" page, press coverage
  naming them directly, SEC/state filings, conference/speaker bios, GitHub/portfolio
  under their name; **Tier 2 (secondary/aggregator)** — RocketReach, Wiza, Aeroleads,
  ZoomInfo, Apollo, Crunchbase auto-generated person pages, and similar
  data-broker/reseller listings. **All Tier 2 sources found in a single search pass
  count as ONE source, regardless of domain count**, unless each independently cites
  a distinct primary origin (e.g., one links to a different LinkedIn URL than
  another). A finding resting entirely on Tier 2 sources cannot, by itself, satisfy
  "independent corroboration." *The same tiering governs every fact on the page, not
  only founder findings — see Claim Discipline (Research Protocol).*
- **Identity-Match Standard.** Before a same-named individual's outside role can be
  treated as evidence about a named founder, establish identity match via at least
  one of: shared employment history between the two records, a cross-linked profile
  (the outside listing references the company in question, or vice versa), a shared
  photo, or direct confirmation in company materials. **Name + city alone is
  insufficient.** If identity match is not established, the finding can motivate a
  Live Pitch question but cannot support an adverse vote — print commitment
  **UNCONFIRMED ⚠️**, not SPLIT.
- **Academic founder — both configurations.** A professor/researcher founder paired
  with a full-time operating CEO is the standard deep-tech spinout configuration —
  not SPLIT; assess the operating team's commitment and treat the academic founder
  as Product Fit evidence. **When the academic founder IS the CEO:** university
  directories, lab pages, and third-party profiles listing them as active faculty
  are the *expected public footprint* of every professor-founder — stale listings
  and entrepreneurial-leave policies mean they cannot distinguish "full-time
  professor" from "on leave, full-time CEO." Such listings are **never affirmative
  evidence of split commitment** and never justify an adverse vote on their own:
  print Committed UNCONFIRMED at most, flag ⚠️, and make commitment status Live Pitch
  Question #1.
- **What counts as affirmative evidence of SPLIT (Committed bottom tier):** a
  verified competing *operating* role elsewhere held by the **CEO or CTO**, the
  company's own site/deck showing a different person in the seat, or the founder's
  own current materials contradicting the full-time claim — **passing both the
  Source-Tier Rule and the Identity-Match Standard above.** A single self-published
  discrepancy (e.g., a personal bio page still describing an old role in the present
  tense) is a live question, not proof — print commitment **UNCONFIRMED ⚠️** and make
  it Live Pitch Question #1. **A non-CEO/CTO co-founder with a verified outside role is
  Committed UNCONFIRMED plus a ⚠️ Yellow Flag — never SPLIT.**
- **Market Fit WEAK requires the same standard.** "No path to the buyers" needs
  affirmative evidence — every named founder's background checked and none shows
  domain years, buyer relationships, or channel access in this market. Thin or
  unsearchable backgrounds are Market Fit **MIXED** plus a Live Pitch question, never
  WEAK.
- **Label discipline — the header must agree with the roll-up.** Print any Team line
  at its bottom tier (SPLIT / SIDE-PROJECT, Product Fit WEAK, Market Fit WEAK) only
  when Team is also counted adverse in the roll-up. If the gap is being treated as
  Scout-answerable, the line prints its middle tier (UNCONFIRMED ⚠️ / MIXED) — a
  report must never carry a bottom-tier label its own roll-up ignores.
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

- **Team** — Team rating WEAK, which happens only when one of the three rated lines is
  at its bottom tier on affirmative evidence: **Committed SPLIT / SIDE-PROJECT** (CEO
  or CTO confirmed not full-time — see the team-configuration rules; a standard
  academic-founder structure is not SPLIT), **Product Fit WEAK** (no one on the team
  can build this product), or **Market Fit WEAK** (affirmative evidence that no one on
  the team has a path to the buyers). Unknown or unconfirmed is the middle tier, never
  the bottom. Track Record is never adverse.
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
- **Confidence-Gated Compound Rule.** An adverse vote tagged UNVERIFIED cannot, by
  itself, satisfy the compound-rule DECLINE trigger. At least ONE of the adverse
  signals feeding the compound rule must carry PARTIAL or VERIFIED confidence. A
  DECLINE that would otherwise rest entirely on UNVERIFIED-confidence adverse
  signals downgrades automatically to WATCH, with the unresolved signal(s) named as
  re-engagement/Scout-verification items. **Self-check before printing a
  compound-rule DECLINE:** "Would this verdict survive if the weaker of the two
  adverse calls were downgraded one confidence tier?" If no — print WATCH, not
  DECLINE, and say so in the Concern line.
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

**Precedence check (binding order of operations).** Compute the full signal
roll-up FIRST — every weighted signal's adverse/non-adverse status — before
considering Ask-at-Scout at all. Ask-at-Scout is a **narrowing of the
zero-adverse-signals case**, never an independent path that can override an
adverse finding on a different signal. A Scout-answerable gap on Team (or any one
signal) does NOT unlock ADVANCE if ANY OTHER weighted signal is independently
adverse for a reason a phone call cannot fix — a Moat, Market, or Agent-Era
finding is a structural verdict, not an informational gap; only commitment
status, role clarity, and terms discrepancies are Ask-at-Scout-eligible.
**Self-check before printing ADVANCE via Ask-at-Scout:** "Does the printed
roll-up line say zero adverse signals?" If it names ANY signal as adverse — even
one, even if a different signal's gap feels like "the" open question — Ask-at-
Scout does not apply. WATCH governs (or DECLINE, per the compound rule); the
Scout-answerable gap becomes part of the re-engage condition, not a reason to
skip WATCH.

**Traction lift:** exceptional Commercial Proof that is **VERIFIED** (real revenue,
real growth, real retention — not deck-claimed) is an explicit conviction lifter: it
can raise Triage Conviction one band and offset **one** adverse signal other than
Team. Verified customer pull is among the strongest surface-to-Scout signals — a
red-ocean read with exceptional verified traction is a Scout conversation, not a
screen kill. State the lift in the roll-up line when applied.

**Thin Commercial Proof cap:** Commercial Proof quality PRE-REVENUE or FRAGILE caps
Triage Conviction at MEDIUM — unconditional, no exception, regardless of how strong
any other signal reads. This mirrors the Coherence cap's shape rather than inventing a
new mechanic: HIGH conviction means nothing central needs explaining, and whether
anyone will actually pay is as central as it gets. Conviction cap only — never an
adverse vote, never enters the roll-up, never blocks ADVANCE. State the cap in the
roll-up line when applied. The Verdict Block Concern line must name the stage
explicitly (e.g., "no revenue yet, informal validation only") — never left implicit in
the Market block alone.

**Triage Conviction pattern guide:**
- **HIGH** — Team STRONG (all three rated lines at the top tier: Committed FULL-TIME,
  Product Fit STRONG, Market Fit STRONG) + at least one of
  {PIONEER/DIFFERENTIATED discontinuity, RIDING/ENABLING agent-era posture, STRONG
  market tailwind, Moat STRONG, exceptional verified traction}; no adverse signals;
  **and no unresolved material coherence contradiction on a load-bearing number**
  (ask vs. traction, forecast vs. actuals, terms vs. terms); **and Commercial Proof is
  not PRE-REVENUE/FRAGILE** (Thin Commercial Proof cap — unconditional). HIGH means
  nothing central needs explaining — a gap worth a Live Pitch question caps conviction
  at MEDIUM. **The gap that caps at MEDIUM is a gap in one of the HIGH conditions
  above. A flagged big competitor, or another routine Live Pitch question, does not by
  itself block HIGH** (narrow reading — Jamie's ruling, Decision 17). *Conviction cap only: it never changes the call and never enters the
  roll-up.*
- **MEDIUM** — Mixed signals; at most one adverse signal (or two with traction lift
  applied); one gap Scout can close. Also the ceiling whenever the Thin Commercial
  Proof cap applies, regardless of how the rest of the signals read.
- **LOW** — Compound-rule territory, or one adverse HIGHEST/HIGH signal with weak
  compensation elsewhere

---

## Between-Signal Reads (the screener's eye)

Three disciplines an experienced human screener applies *between* the signal
categories. None of them is a signal, none carries weight, and **none may ever enter
the adverse roll-up** — they produce flags, Concern lines, and Live Pitch questions
only.

**1. Coherence pass.** Deliberately check the pitch against itself — this is a
distinct pass, not an incidental catch. At minimum, always diff the following field
pairs where both are present in the submission, before writing the coherence line:

1. "Received funding to date" (Y/N) vs. any stated founder/angel/prior investment figures
2. Current revenue/traction figures vs. forward revenue forecast (unexplained multi-x jumps)
3. Team size/named headcount vs. stated ambition or scope of near-term roadmap
4. Deck-stated deal terms vs. form-stated deal terms (cap, discount, valuation)
5. Named pilot/adopter customers vs. named reference customers elsewhere in the submission

A material contradiction found via this checklist becomes a ⚠️ Risk Flag
(`⚠️ Coherence → [the contradiction]`) and, on ADVANCE, usually a Live Pitch
question. A contradiction is a probe, never an adverse vote — a founder who cannot
explain the gap at Scout is Scout's kill, not Screen's. A material contradiction on
a **load-bearing number** does, however, cap Triage Conviction at MEDIUM: HIGH
conviction means nothing central needs explaining. (Conviction cap only — the call
itself is never changed by a coherence finding. The checklist mandates that the diff
be run on every deal — it does not change how a contradiction, once found, is reported.)

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
  pattern-shape intake log accretes in the V12 workbench (archived: `docs/reference/ClaudeProjects/_archive/`).
- Silence is the default. Most reports will not have one; never pad to produce one.

---

## AI Wrapper Assessment (Track A Deals Only)

For all Track A deals, run this assessment before rendering the Moat verdict. The result
prints as the `Wrapper [HIGH/MOD/LOW/N/A]` evidence tag in Signal 4.

**N/A — no LLM:** the product does not call a large language model or other foundation
model at all (conventional software), confirmed by the materials or searches. Print
`Wrapper N/A — no LLM`; replicability is then read from LLM Ingestion and the Goliath
Test alone.

**Not stated:** whether the product calls an LLM is unknown. Print `Wrapper not stated`
and make it a Live Pitch question or re-engage item (pairs with Protect Alpha "N/A — not
stated"). Neither N/A nor "not stated" counts as a negative tag in the Moat Sufficiency
stack — only MODERATE or HIGH on affirmative evidence do.

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
8a. Ask-at-Scout Precedence Check: compute the full roll-up FIRST — Ask-at-Scout
    applies only when it shows ZERO adverse signals; a Scout-answerable gap on one
    signal never overrides an independent adverse finding on another (Constellation
    X 4th-run adjudication — printed ADVANCE despite its own roll-up naming Moat
    adverse; correct call was WATCH).
9. Coherence conviction cap: material contradiction on a load-bearing number caps
   conviction at MEDIUM — cap only, never a verdict vote (Synergist adjudication).
10. Academic-founder rules, both configurations: professor + operating CEO = standard
    spinout, not SPLIT — the academic founder is Product Fit evidence; professor-as-CEO
    — faculty/lab/directory listings are the expected footprint, never affirmative
    SPLIT evidence; Committed UNCONFIRMED at most (STL adjudication; v3.3 relabel).
11. SPLIT requires corroborated evidence about the CEO or CTO; a single self-published
    discrepancy → commitment UNCONFIRMED ⚠️ + Live Pitch Question #1 (Captain Compliance
    adjudication). A non-CEO/CTO co-founder with a verified outside role → Committed
    UNCONFIRMED + ⚠️ Yellow Flag, never SPLIT (v3.3, from V15).
12. Label discipline: any Team line prints its bottom tier (SPLIT/SIDE-PROJECT, Product
    Fit WEAK, Market Fit WEAK) only when Team is counted adverse in the roll-up;
    otherwise its middle tier (UNCONFIRMED ⚠️ / MIXED).
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
19. Source-Tier Rule: Tier 2 aggregator/data-broker listings (RocketReach, Wiza,
    Aeroleads, ZoomInfo, Apollo, Crunchbase auto-pages) found in one search pass count as
    ONE source regardless of domain count; cannot alone satisfy "independent
    corroboration" for a Team adverse vote (Constellation X cross-session adjudication).
20. Identity-Match Standard: name + city alone never confirms an outside record is the
    same person as a named founder; requires shared employment history, a cross-linked
    profile, a shared photo, or direct company confirmation. Unconfirmed → UNCONFIRMED
    ⚠️, never SPLIT (Constellation X cross-session adjudication).
21. Confidence-Gated Compound Rule: a compound-rule DECLINE resting entirely on
    UNVERIFIED-confidence adverse signals downgrades to WATCH; at least one adverse
    signal in the compound must carry PARTIAL or VERIFIED confidence (Constellation X
    cross-session adjudication). When Team is adverse, its confidence is the confidence
    of the line that sets the Team rating (rule 24).
22. Moat Sufficiency Test: MODERATE or STRONG requires naming an affirmative asset (not
    the absence of a negative) that survives the flagged Goliath(s); if none can be
    named, or two-plus negative tags stack (Track A: Wrapper MOD/HIGH, Goliath FLAGGED,
    Memory Lock-in thesis-only/absent; Track B: no IP, Goliath FLAGGED, Memory Lock-in
    thesis-only/absent), Moat prints WEAK (Constellation X pipeline comparison test;
    track split v3.6, rule 34).

*Rules 23–28 were ported in v3.3 from the coordinator screener (Claude V14 → V15 Rev A),
where each was found and validated in sandbox test runs. See Decision 14.*

23. Thin Commercial Proof cap: Commercial Proof quality PRE-REVENUE or FRAGILE caps
    Triage Conviction at MEDIUM — unconditional; conviction cap only, never an adverse
    vote, never enters the roll-up count, never blocks ADVANCE; the Concern line names
    the stage (V14).
24. Team = the lowest of three rated lines (Committed / Product Fit / Market Fit); Team
    confidence = the confidence of the line that sets the rating; the UNVERIFIED cap
    applies per line (V15).
25. Market Fit WEAK ("no path to the buyers") is adverse only on affirmative evidence —
    every named founder checked, none shows domain years, buyer relationships, or
    channel access; thin or unsearchable backgrounds = MIXED + Live Pitch question (V15).
26. Track Record is unrated and never moves the Team rating, down or up; a concerning
    record = ⚠️ Risk Flag + Live Pitch question (V15).
27. Agent-Era posture is four categories, not a scale, judged on the product as built:
    a surviving need in a product form agents absorb = THREATENED; ENABLING tests the
    product's form (how value is delivered and charged, not the UI surface); posture
    never asks who wins the demand (that is Moat); mixed reads resolve to the weaker,
    product-level posture (V15 Rev A — Complete Contract Cycle
    regression, where a hedged middle read flipped DECLINE→WATCH).
28. Claim discipline: single-source and aggregator claims are marked (unconfirmed)
    everywhere they appear on the page; company assertions are marked (company claim);
    conflicting sources are stated as a conflict, never resolved by picking one (V15
    Rev A — Reverent run 2).

*Rules 29–32 were added in v3.5 from the Decision 14–15 regression runs. See Decision 16.*

29. Third-party documents: a document executed or issued by a named third party
    (countersigned contract, attestation letter, signed lead term sheet) is outside
    evidence for the fact it proves, even when supplied in the data room; company-authored
    material stays a company claim (Synergist CDW contract).
30. Stale materials: newest pitch material more than 90 days before the screen date →
    print the materials date; dated milestones already past are open questions, never
    evidence (STL Panasonic trial / NPI-AV LOI).
31. A US entity that is not yet a C-corp passes the Entity gate and prints a (!) "Not yet a
    C-corp" flag + Live Pitch / re-engage item — never a gate fail or conviction pull
    (Synergist LLC).
32. Definitions: "three searches" = three search topics (founder query set runs inside
    Search 2); "named founder" = anyone called founder/co-founder in the materials or cap
    table, plus the CEO and CTO; Wrapper N/A for software confirmed to call no LLM and "not stated" when
    unknown (neither is a negative tag); named founders include 10%+ holders with an
    operating role; Track B only when the company itself ships the hardware; Protect Alpha
    N/A is either "confirmed" or "not stated" (the latter prints "AI use not stated" and
    generates a question) (Captain Compliance, STL, Synergist runs).
33. Press or interviews repeating founder-reported figures = PARTIAL (on the record), never
    VERIFIED, and never alone qualifies traction for the lift; VERIFIED requires a source
    with an independent basis (Captain Compliance, Refresh Miami ARR — Jamie's ruling).

*Rule 34 was added in v3.6 (Option 5 integrated AI thesis, Phase 2 — narrowed to the
patent fix). See Decision 17.*

34. Head starts (Track A): software patents (filed, pending, granted, or licensed in),
    founders' domain knowledge, and code or features are head starts, not moat assets —
    never the named Moat Sufficiency asset, never toward STRONG, never the nascent
    element; "no IP" is not a Track A negative tag. Domain knowledge is Team evidence.
    Track B unchanged: filed or pending IP qualifies and "no IP" is a negative tag
    (Option 5 thesis; STL UCI patent licence, BleedIO pending patents).

*Rule 35 was added in v3.7 (Decision 22), adopting hardware evidence standards from the
coordinator screener's knowledge file.*

35. Track B evidence standards: Hardware Last Mile (95%+ production reliability; a
    prototype is not production readiness), a credible 50%+ gross-margin path (Unit
    economics), and TRL 7 as the Moat reference point (TRL 5 stays the minimum). Evidence
    for the Track B tags and Live Pitch questions only — never, by themselves, an adverse
    vote; below TRL 7 the build supports at most a nascent element, not STRONG
    (synthetic matched pair — Decision 22).

---

## Research Protocol

Run exactly **three searches** — three search *topics* — before producing any report:
market, founders/team, and competitors. Each topic may take several queries (Search 2
runs the fixed founder query set below for every named founder); do not add topics
beyond these three at Screen stage — save full research for Scout and Diligence agents. **Run them
silently — never announce or narrate the research; the first output of the run is the
report title itself.**

**Search 1 — Market validation**
TAM, structural shifts, competitive landscape, Goliath exposure. Find 1–2 third-party
market sizing references and compare against the founder TAM claim; a large unexplained
gap is a coherence/confidence finding.

**Search 2 — Founder/team validation (with LinkedIn commitment check)**
**Named founders** = everyone the pitch materials, Dealum form, or cap table call a founder
or co-founder, **plus the CEO and CTO** whatever their title history, **plus any individual
holding 10% or more of the company who holds or held an operating role** there (e.g., a
former CTO or a "special projects" executive who is a major holder). Passive holders and
advisors are not included. Other executives
(CRO, COO, VP Sales) are not run through the full query set unless they are also named
founders. For each named founder, run the fixed query set below in full — not just until something
turns up. Search retrieval is non-deterministic; running the full set (not stopping at
the first hit) is what keeps independent screens of the same company convergent:
- `"[Full Name]" LinkedIn`
- `"[Full Name]" "[Company Name]"`
- `"[Full Name]" [City/Region] [claimed current title]`
- `"[Full Name]" [claimed prior employer/background, if named in deck]`

Flag any founder still employed full-time elsewhere. Verify key claims (prior revenue
figures, exits, named titles). Apply the team-configuration rules — including the
Source-Tier Rule and Identity-Match Standard — before reading any discrepancy as SPLIT.

**Search 3 — Competitive and Goliath landscape**
Who else is in this space; what incumbents could kill this with a feature update. This
search directly enables the Goliath Test tag.

All other research (patent searches, regulatory landscape, customer references, technical
stack depth) is Scout- and Diligence-stage work. Do not deploy research agents at Screen.

**Stale materials check.** Note the date of the newest pitch material (deck, form, data
room document). When it is **more than 90 days** before the screen date:
- print one line under Stage in the member read: **(!) Materials dated [Month YYYY] —
  [N] months before this screen**, and record the date in the Deal-Team Appendix;
- treat any dated milestone whose date has already passed (a trial end date, an LOI
  expiry, a forecast quarter) as an **open question, not a fact** — it becomes a Live
  Pitch question or re-engage item ("Did the Panasonic trial convert?"), never evidence
  for or against a signal;
- current web-search findings still count normally.
The stale check never changes a verdict tier by itself.

### Claim Discipline

Do not fabricate or assert claims you cannot support from the deck or the three
searches. Mark any unconfirmed assertion inline as **(company claim)** when it comes
from the company, or **(unconfirmed)** when the source is a third party that could not
be corroborated.

**Single-source and aggregator claims are always marked (unconfirmed), everywhere on the
page** — signal blocks, Team lines, Risk Flags, Pattern note, and the Verdict Block
alike. This covers any fact resting on one Tier 2 source (data-broker and
funding-tracker sites: RocketReach, ZoomInfo, Apollo, Crunchbase auto-pages, CB
Insights, Tracxn, PitchBook previews, market-research aggregators) or on a single
uncorroborated source of any kind. When two such sources conflict (e.g., different
funding totals), say so plainly rather than picking one. If a gate or signal verdict
hinges on a web-retrieved fact, note the source parenthetically. No formal `[n]`
citation apparatus at Screen.

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
- Moat/defensibility gaps (Signal 4 WEAK-adjacent, Wrapper HIGH, Goliath FLAGGED). Where
  the moat case leans on software, two Option 5 probes are available as questions only
  (no tag, no effect on any verdict): *"Could a frontier model and a motivated team
  rebuild most of this in 90 days — and what would they still lack?"* and *"If
  [incumbent] opened its own data to a general-purpose agent, what could that agent still
  not do that you can?"*
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
| **7** | **System prototype in operational environment ← Track B Moat reference point (v3.7)** |
| 8 | Actual system completed and qualified |
| 9 | Actual system proven through mission operations |

---

*NWAi TechGroup Six-Signal Screener Reference | v3.7 | October 2026*
*v3.7 (October 2026): Track B evidence standards adopted from the coordinator screener knowledge file (Hardware Last Mile 95%+, 50%+ gross-margin path, TRL 7 Moat reference point) — evidence only, never adverse by themselves; Calibrated Rule 35. Claim marker "(unverified)" → "(unconfirmed)". Coordinator screener V16 rebuilt from this version (Phase 5). See `pipeline-decisions-log.md` Decision 22.*
*v3.6 (October 2026): Patent fix (Option 5 integrated AI thesis, Phase 2 narrowed) — on Track A, software patents, domain knowledge, and code are head starts, not moat assets; "no IP" removed from the Track A Moat Sufficiency negative stack; Track B unchanged. Calibrated Rule 34 added, rule 22 amended. 90-day copy and headless-incumbent probes added as optional Live Pitch questions only. HIGH conviction cap clarified (narrow reading: only a gap in a HIGH condition caps at MEDIUM). See `pipeline-decisions-log.md` Decision 17.*
*v3.5 (October 2026): Evidence and wording clarifications from the Decision 14–15 regression runs — third-party documents as outside evidence, 90-day stale-materials check, non-C-corp yellow flag, Protect Alpha N/A confirmed vs. not stated, Wrapper N/A, search-topic count, named-founder definition, Track B hardware rule. See `pipeline-decisions-log.md` Decision 16.*
*v3.4 (October 2026): Two-layer report (Phase 1b) — plain-language member read ported from the coordinator screener V15 + Deal-Team Appendix for Scout intake. Presentation only; no judgment change. See `pipeline-decisions-log.md` Decision 15.*
*v3.3 (October 2026): V15 judgment re-sync (Phase 1a) — ports the coordinator screener's tested rule evolutions: FRAGILE revenue tier + Thin Commercial Proof cap (V14); Team rated on three lines, lowest sets the rating, Market Fit WEAK as an adverse path, track record unrated (V15); Agent-Era judged on the product as built (V15 Rev A, Complete Contract Cycle); claim discipline extended to every fact (V15 Rev A, Reverent). Calibrated Rules 23–28 added; 10, 11, 12, 21 amended. No weight, gate, compound rule, Moat Sufficiency, Protect Alpha, or Ask-at-Scout change. Pipeline is now the source of truth; the coordinator screener is rebuilt from it. See `pipeline-decisions-log.md` Decision 14.*
*v3.2 (August 2026): Ask-at-Scout Precedence Check — a fourth live Constellation X screen on the v3.1 fixes printed ADVANCE despite its own roll-up naming Moat adverse, because Ask-at-Scout's "no other signal adverse" precondition was never mechanically checked before its shortcut fired on the Team gap. Adds Calibrated Rule 8a: compute the full roll-up first; Ask-at-Scout applies only when it shows zero adverse signals. Correct verdict for the triggering case: WATCH. See `docs/reference/ClaudeProjects/_archive/Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md` (Amendment 3).*
*v3.1 (August 2026): Rubric Fidelity Amendment — ported from the Claude V13 sandbox after a cross-session Constellation X screen produced a DECLINE/ADVANCE divergence and a follow-up pipeline comparison surfaced a second divergence on Moat. Adds calibrated rules 19–22: Source-Tier Rule + Identity-Match Standard (Signal 3), Confidence-Gated Compound Rule, Moat Sufficiency Test (Signal 4); plus the fixed coherence diff-list and fixed founder-identity query set. No weight or verdict-tier definition changed. See `docs/reference/ClaudeProjects/_archive/Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md` and `Rubric_Fidelity_Addendum_v1.md`.*
*v3.0 (July 2026): Six-Signal verdict model installed per the Pipeline Framework Adoption Spec (notes/NWAi-Pipeline-Framework-Adoption-Spec-2026-07.md) — Craft-at-Screen boundary, Agent-Era posture verdict (upgraded from the v2.1 Exposure trip-wire), Protect Alpha Signal 6 (Alpha-AI Sovereignty Phase 2, as evolved by the Claude V13 back-test), calibrated rules ledger. Absorbs the hard gates, NWA Filter, research protocol, and TRL reference formerly in gates-and-flags.md (rewritten and renamed to `gates-and-flags-universal-guide.md`). Numeric v2.1 archived at `_archive/gates-and-flags-techgroup-numeric-v2.1-legacy.md`.*
*Replaces v2.1 (June 2026) and v1.0 (March 2026). Judgment model provenance: Claude V13 sandbox (docs/reference/ClaudeProjects/), 4-deal regression back-test ratified July 2026.*
*Medical and Space verticals retain separate hard-gate screener frameworks; see `gates-and-flags-universal-guide.md` for the universal playbook guide.*
