# NWAi TechGroup Triage Framework — Gates & Flags (Domain Reference)

> **What this is:** the domain-reference knowledge file for the Claude Project
>   screener (V13 onward; current V16). Upload alongside `knowledge-agent-era-readiness.md` and
>   `knowledge-alpha-ai-sovereignty.md`.
> **Role — read this first:** the loaded screener project's system instructions
>   (V16 current — rebuilt from the pipeline Screen v3.6; V15 preserved as the
>   regression comparator) own every verdict
>   mechanic (verdict tiers, adverse definitions, the compound rule, conviction
>   bands, confidence-tag logic). This file supplies domain facts and evidence-test
>   definitions only — gate criteria, the Goliath / LLM-Ingestion / Wrapper /
>   Revenue-Quality tests that feed the Moat and Commercial Proof tags, TRL and
>   hardware reference data, and search-query templates. **Nothing in this file
>   caps, scores, or gates a verdict on its own. If anything here reads as
>   conflicting with the loaded screener's mechanic, the screener file governs.**
> **Amendment (2026-08-25):** rewritten to remove the legacy numeric Opportunity
>   (0–30) / Readiness (0–25) scoring engine, the numeric Decision Logic table, and
>   all "capped at N/5" language — residue from the pre-V12 Universal Triage
>   Framework that V13's six-signal qualitative model superseded. That residue sat
>   unchanged through V12→V13 and is the likely second contributor (alongside the
>   Team source-tier/identity-match gap fixed directly in V13) to a cross-session
>   verdict divergence on a real screen. See the matching amendment note in
>   `Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md` and
>   Decision 12 in the pipeline decisions log (the original addendum was not retained) for the incident this responds to.
>   **Preserved:** gate criteria, Track A/B determination, the three evidence
>   tests (Goliath / LLM Ingestion / Revenue Quality) as tag-feeding definitions,
>   TRL scale, hardware domain facts, research query templates.
>   **Removed:** all numeric scoring, the Decision Logic table, Dimension 6
>   Venture Economics (Diligence-stage scope, not Screen), the numeric Founder
>   Advantage rubric (Team mechanics now live entirely in V13 Signal 3), and the
>   stale "Agent-Era... not a scored dimension" claim — Agent-Era is Signal 5,
>   fully weighted, at Screen in V13.
> **Amendment 2 (2026-09-14):** Revenue Quality Audit's **Fragile** tier split into
>   two distinct states — **Fragile** (some revenue, precarious) and **Pre-Revenue**
>   (none yet) — to match V14's Thin Commercial Proof cap, which caps Triage
>   Conviction at MEDIUM for either state, unconditionally. The cap mechanic itself
>   lives in `Claude-V14-Traction-Discipline-NWA-TechGroup-AI-Screener.md`, not here
>   — this file only supplies the classification test. Source: a member
>   pressure-test of a live screen (Complete Contract Cycle) that surfaced Commercial
>   Proof could only ever help Triage Conviction (via Traction lift) and never hurt
>   it.
> **Amendment 3 (2026-09-30):** V15 (Plain-Language Member Read) stops **printing**
>   the Moat evidence-tag line and renders the Commercial Proof quality tag in plain
>   words. The tests in this file are unchanged and still run on every screen: they
>   feed the Moat verdict, the Moat Sufficiency Test, and the Commercial Proof
>   quality exactly as before — their findings now surface in plain language in the
>   signal explanation, Risk Flags, and Live Pitch questions rather than as a tag
>   string. Where this file says "tag," read "internal evidence finding." Source:
>   9/28/26 Tech Screening review of the V14 Reverent Networks screen.
> **Amendment 4 (2026-10-30) — V16 pipeline rebuild:** brought into line with the
>   pipeline Screen v3.6 (Decisions 14–17): not-yet-a-C-corp is a flag, not a gate
>   question; Track B only when the company itself ships the hardware; LLM Ingestion
>   names a frontier-model agent; Wrapper N/A / not stated; FRAGILE requires product
>   revenue; Track A head starts (software patents, domain knowledge, code) are not
>   moat assets; two optional Live Pitch probes. Hardware facts (Last Mile, margin
>   path, TRL 7 reference) kept as evidence guidance and adopted into the pipeline
>   Screen v3.7 (Decision 22) — evidence only, never a vote against the deal by
>   themselves. Where this file says "V13" or "V14", read "the loaded screener."

---

## Design Principles

This screener is calibrated for high-volume inbound triage. Its purpose is **not**
to find investments — it is to identify the ~10% of deals worth a Scout assessment
and a Live Pitch slot. Screen to Scout. Diamond-finding happens at Scout and Live
Pitch, not here.

Target advance rate: ~11% of inbound (roughly 1 in 9 deals).

---

## Gates

Three gates, evaluated first. A single FAIL = DECLINE.

| Gate | MET if... | FAIL if... |
|------|-----------|------------|
| **1. Foreign Entity / IP Structure** | Company appears investable from a US legal standpoint — a US C-Corp, LLC, or similar; IP owned by the US entity. A US entity that is not yet a C-Corp still MEETS the gate, with a "Not yet a C-corp — conversion needed before NWA invests" flag (NWA invests in C-Corps only; conversion is routine) | Entity structure or IP ownership clearly prevents US investment (foreign HQ, foreign IP entity, VIE structure) |
| **2. Market Size Threshold** | Opportunity plausibly supports venture-scale outcomes ($500M+ TAM) | Market clearly too small to support 10x return in 5 years — a structural ceiling, not founder framing |
| **3. Commercialization Path** | Credible path to paying customers exists — MVP, beta, LOI, or clear near-term route to revenue | Purely academic, pre-concept, or no credible path to market |

**Gating rule:** Mark FAIL only when there is clear evidence the criterion is not
met. Silence = MET with a Yellow Flag note — do not fail on missing information
alone.

**What is NOT a hard gate:** SAFE deal structure, no lead investor, product
stage/MVP, and traction/revenue are never screen-gate penalties — they're read
qualitatively in the screener's Deal Facts and Commercial Proof line.

---

## Track Determination

Assign every deal to one track before reading the Six Signals.

- **Track A — Software / AI / Cloud**: Primary value delivery is software, data,
  algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary
  deliverable. Revenue includes hardware unit sales, manufacturing, or embedded
  systems.

Mixed plays default to Track B only when **the company itself sells, ships, or
manufactures** a physical product necessary for its product to function. When the
company sells only software and the customer supplies the hardware it runs on (e.g.,
calibration software for the customer's own projectors), assign Track A.

---

## Evidence Tests — feed the Moat and Commercial Proof tags (Signal 4 / Signal 2)

These three tests produce the evidence tags the screener attaches to Signal 4 (Moat) and the
Commercial Proof line under Signal 2. **They inform the tag; they do not cap or
score anything themselves** — a FLAGGED or HIGH-risk result is Risk Flag / Live
Pitch question material, read into the Moat or Discontinuity basis at the screener's
discretion, per the screener's adverse-only-at-bottom-tier rule.

### The Goliath Test
Ask explicitly: **"Could a major incumbent in this space (e.g., NVIDIA, Microsoft,
AWS, Salesforce, or a domain-specific Goliath like a hyperscaler, defense prime,
large pharma, or major OEM) kill this with a feature update or program in the next
12–18 months?"** Result feeds the Moat tag `Goliath [PASSED / FLAGGED + name]`.
FLAGGED is a Risk Flag and Live Pitch question — never, by itself, an adverse vote
(the screener owns this rule explicitly).

### The LLM Ingestion Test *(software/AI deals only)*
Ask explicitly: **"Could a customized frontier-model agent with access to relevant
public data replicate 80% of this product's core function?"** Result feeds the Moat
tag `LLM Ingestion [YES / PARTIAL / NO]`. For non-software deals:
`LLM Ingestion: N/A — non-software`.

### Wrapper Assessment *(Track A)*

| Risk Level | Definition |
|---|---|
| **HIGH** | Core product is primarily prompt engineering or API orchestration. LLM Ingestion = YES. No proprietary data, training, or workflow integration. Replicable by a developer in < 48 hours. |
| **MODERATE** | Uses public AI but shows an early proprietary layer — domain data, fine-tuning signals, workflow integration depth. LLM Ingestion = PARTIAL. |
| **LOW** | Proprietary model, unique training data, deep workflow integration, or non-AI moat. LLM Ingestion = NO. |
| **N/A — no LLM** | The product is confirmed (materials or searches) not to call a large language model or other foundation model. Replicability is read from LLM Ingestion and the Goliath Test alone. |
| **Not stated** | Whether the product calls an LLM is unknown — a Live Pitch question, not a finding. |

Neither N/A nor "not stated" is a negative in the Moat Sufficiency stack — only
MODERATE or HIGH on affirmative evidence count.

Feeds the Moat tag `Wrapper [HIGH/MOD/LOW]`. A HIGH read is the textbook "thin
wrapper" case and belongs in the Moat basis sentence — whether it renders Moat WEAK
(adverse) or MODERATE is the screener's qualitative call, informed by whatever else is (or
isn't) defensible, not a mechanical cap.

**Feature-not-company framing:** when a frontier lab itself (OpenAI, Anthropic,
etc.) looks capable of shipping the differentiator as a native platform feature
within ~12 months, that's the sharpest version of the Wrapper HIGH read — worth
naming explicitly in the basis sentence, since "a Goliath could copy this" and
"this could become a checkbox in ChatGPT" are different flavors of the same risk.

### Revenue Quality Audit
Classify any revenue or traction as:
- **Sticky** — automated, API-driven, self-serve SaaS with low-touch retention
- **Stagnant** — high-touch, consulting-adjacent, services-embedded, or
  inertia-based
- **Fragile** — thin/early revenue that exists but is easily lost, or dependent on
  a HIGH Wrapper read holding up
- **Pre-Revenue** — no revenue yet. Distinct from Fragile, which has *some* revenue
  — just precarious revenue. The two are different findings and should not be
  conflated under one tag.

**Fragile requires revenue from the product itself.** Grants (e.g., SBIR),
incidental consulting or services, and signed-but-unbilled agreements alone are
Pre-Revenue.

Feeds the Commercial Proof quality tag under Signal 2: `quality [STICKY /
STAGNANT / FRAGILE / PRE-REVENUE]`. State the classification explicitly — it's
descriptive, not a score cap on its own here. The screener adds a Triage Conviction
cap keyed to this tag (FRAGILE or PRE-REVENUE → MEDIUM cap, unconditional) — that
mechanic lives entirely in the screener instructions, not here; this file only
supplies the classification.

### Head starts vs. moat assets *(Track A)*
On a software company, a software patent (filed, pending, granted, or licensed in),
the founders' domain knowledge, and the code or feature set are **head starts** —
months of lead against a frontier model and a motivated team, not years. They are
never the affirmative asset the Moat Sufficiency Test asks for, and "no IP" is not a
negative on Track A. Domain knowledge is Team evidence. On Track B, filed or pending
IP protecting a physical build remains a qualifying asset. The screener
instructions own the mechanic; this note supplies the definition.

---

## Track B Domain Facts

Reference data for Track B's Moat evidence tags (`TRL [n]` · `Unit economics [·]`).

**Hardware Last Mile Standard:** A working prototype or demo is not evidence of
production readiness. Look for 95%+ production reliability achieved through
non-obvious engineering before treating a hardware claim as strong.

**Margin Threshold:** A credible path to 50%+ gross margins at scale is the
relevant bar for the hardware unit-economics evidence finding. A hardware play with
no visible path to that margin is evidence against a strong Defensibility read and a
Live Pitch question (BOM / margin path) — at Screen it informs the evidence finding;
it is never, by itself, a vote against the deal.

### Technology Readiness Levels (TRL) — GAO Scale

| TRL | Description |
|-----|-------------|
| 1 | Basic principles observed and reported |
| 2 | Technology concept/application formulated |
| 3 | Analytical and experimental proof of concept |
| 4 | Component validation in lab environment |
| **5** | **Component validation in relevant environment ← NWAi minimum** |
| 6 | Prototype demonstration in relevant environment |
| **7** | **System prototype in operational environment ← the level a Track B Moat read is measured against; below it the build supports at most a nascent moat element** |
| 8 | Actual system completed and qualified |
| 9 | Actual system proven through mission operations |

---

## Research Query Templates

The screener's CORE ROLE section owns the search *requirement* (3 search topics,
plus the fixed 4-query set for founder identity/commitment). These are supplementary templates for
the other two:

**Market validation:** `"[company sector] market size [current year]"` — find 1–2
third-party references (Gartner, IDC, CB Insights) to compare against the
founder's TAM claim.

**Competitive / Goliath landscape:** `"[company sector] market leaders"` or
`"[company name] competitors"` — identify dominant incumbents and whether any is
building in this direction; this is what makes the Goliath Test answerable rather
than speculative.

For founder identity/commitment searches, use the screener's fixed 4-query set directly — it
is the single source of truth for that protocol and is not duplicated here.

---

## Live Pitch Question Sources

Draw from: unvalidated market claims · Goliath Test concerns · moat/defensibility
gaps · founder domain questions · structure/syndication friction · traction
quality · Track B specifics (TRL evidence, BOM/margin path, Last Mile signals) ·
exit/acquirer questions · not-yet-a-C-corp conversion · dated milestones that have
already passed (stale materials) · whether the product calls an outside AI model
(when not stated).

Two optional probes where the defensibility case leans on software (questions only —
no effect on any verdict): *"Could a frontier model and a motivated team rebuild most
of this in 90 days — and what would they still lack?"* and *"If [incumbent] opened
its own data to a general-purpose agent, what could that agent still not do that you
can?"*

---

## Superseded — do not use

- **Numeric Opportunity Score (0–30) / Readiness Score (0–25), the Universal
  Scoring Scale, per-dimension 0–5 rubrics, the Sub-floor and No-Zero rules, the
  Readiness Downgrade Rule, and the numeric Decision Logic table** — all replaced
  by the screener's six-signal qualitative model, confidence tags, and the weight-tiered
  compound rule. None of this numeric machinery has a home in the screener; if it resurfaces
  in reasoning, it's being pulled from training/prior context, not from this file.
- **Dimension 3 (Founder Advantage), numeric rubric** — superseded. Team verdict
  mechanics (Source-Tier Rule, Identity-Match Standard, academic-founder
  configuration, the commitment sub-read) now live entirely in the screener's Signal 3.
- **Dimension 6 (Venture Economics)** — path-to-$100M-ARR and unit-economics
  modeling is Diligence-stage work (`venture-analyst`), out of scope at Screen.
- **"Agent-Era Exposure Signal... not a scored dimension"** — superseded.
  Agent-Era Posture is Signal 5 in the screener, fully weighted (SIGNIFICANT), with
  THREATENED as an adverse tier that participates in the compound rule. Posture
  definitions and the doorway question live in
  `knowledge-agent-era-readiness.md`.
- **Cynical Default's "max score 3/5"** — superseded by the screener's confidence-tag
  mechanism (UNVERIFIED caps at the middle *verdict tier*, not a numeric score).
