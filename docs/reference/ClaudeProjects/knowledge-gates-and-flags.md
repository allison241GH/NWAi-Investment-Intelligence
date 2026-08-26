# NWAi TechGroup Triage Framework — Gates & Flags (Domain Reference)

> **What this is:** the domain-reference knowledge file for the V13 Claude Project
>   screener. Upload alongside `knowledge-agent-era-readiness.md` and
>   `knowledge-alpha-ai-sovereignty.md`.
> **Role — read this first:** V13's system instructions own every verdict
>   mechanic (verdict tiers, adverse definitions, the compound rule, conviction
>   bands, confidence-tag logic). This file supplies domain facts and evidence-test
>   definitions only — gate criteria, the Goliath / LLM-Ingestion / Wrapper /
>   Revenue-Quality tests that feed the Moat and Commercial Proof tags, TRL and
>   hardware reference data, and search-query templates. **Nothing in this file
>   caps, scores, or gates a verdict on its own. If anything here reads as
>   conflicting with a V13 mechanic, V13 governs.**
> **Amendment (2026-08-25):** rewritten to remove the legacy numeric Opportunity
>   (0–30) / Readiness (0–25) scoring engine, the numeric Decision Logic table, and
>   all "capped at N/5" language — residue from the pre-V12 Universal Triage
>   Framework that V13's six-signal qualitative model superseded. That residue sat
>   unchanged through V12→V13 and is the likely second contributor (alongside the
>   Team source-tier/identity-match gap fixed directly in V13) to a cross-session
>   verdict divergence on a real screen. See the matching amendment note in
>   `Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md` and
>   `Rubric_Fidelity_Addendum_v1.md` for the incident this responds to.
>   **Preserved:** gate criteria, Track A/B determination, the three evidence
>   tests (Goliath / LLM Ingestion / Revenue Quality) as tag-feeding definitions,
>   TRL scale, hardware domain facts, research query templates.
>   **Removed:** all numeric scoring, the Decision Logic table, Dimension 6
>   Venture Economics (Diligence-stage scope, not Screen), the numeric Founder
>   Advantage rubric (Team mechanics now live entirely in V13 Signal 3), and the
>   stale "Agent-Era... not a scored dimension" claim — Agent-Era is Signal 5,
>   fully weighted, at Screen in V13.

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
| **1. Foreign Entity / IP Structure** | Company appears investable from a US legal standpoint — C-Corp, LLC, or convertible structure; IP owned by the US entity | Entity structure or IP ownership clearly prevents US investment (foreign HQ, foreign IP entity, VIE structure) |
| **2. Market Size Threshold** | Opportunity plausibly supports venture-scale outcomes ($500M+ TAM) | Market clearly too small to support 10x return in 5 years — a structural ceiling, not founder framing |
| **3. Commercialization Path** | Credible path to paying customers exists — MVP, beta, LOI, or clear near-term route to revenue | Purely academic, pre-concept, or no credible path to market |

**Gating rule:** Mark FAIL only when there is clear evidence the criterion is not
met. Silence = MET with a Yellow Flag note — do not fail on missing information
alone.

**What is NOT a hard gate:** SAFE deal structure, no lead investor, product
stage/MVP, and traction/revenue are never screen-gate penalties — they're read
qualitatively in V13's Deal Facts and Commercial Proof line.

---

## Track Determination

Assign every deal to one track before reading the Six Signals.

- **Track A — Software / AI / Cloud**: Primary value delivery is software, data,
  algorithms, or AI inference. Revenue model is SaaS, API, licensing, or marketplace.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary
  deliverable. Revenue includes hardware unit sales, manufacturing, or embedded
  systems.

Mixed plays default to Track B if a physical product is necessary for the product
to function.

---

## Evidence Tests — feed the Moat and Commercial Proof tags (Signal 4 / Signal 2)

These three tests produce the evidence tags V13 attaches to Signal 4 (Moat) and the
Commercial Proof line under Signal 2. **They inform the tag; they do not cap or
score anything themselves** — a FLAGGED or HIGH-risk result is Risk Flag / Live
Pitch question material, read into the Moat or Discontinuity basis at V13's
discretion, per V13's adverse-only-at-bottom-tier rule.

### The Goliath Test
Ask explicitly: **"Could a major incumbent in this space (e.g., NVIDIA, Microsoft,
AWS, Salesforce, or a domain-specific Goliath like a hyperscaler, defense prime,
large pharma, or major OEM) kill this with a feature update or program in the next
12–18 months?"** Result feeds the Moat tag `Goliath [PASSED / FLAGGED + name]`.
FLAGGED is a Risk Flag and Live Pitch question — never, by itself, an adverse vote
(V13 owns this rule explicitly).

### The LLM Ingestion Test *(software/AI deals only)*
Ask explicitly: **"Could a customized GPT-4o or Claude agent with access to
relevant public data replicate 80% of this product's core function?"** Result feeds
the Moat tag `LLM Ingestion [YES / PARTIAL / NO]`. For non-software/non-AI deals:
`LLM Ingestion: N/A`.

### Wrapper Assessment *(Track A)*

| Risk Level | Definition |
|---|---|
| **HIGH** | Core product is primarily prompt engineering or API orchestration. LLM Ingestion = YES. No proprietary data, training, or workflow integration. Replicable by a developer in < 48 hours. |
| **MODERATE** | Uses public AI but shows an early proprietary layer — domain data, fine-tuning signals, workflow integration depth. LLM Ingestion = PARTIAL. |
| **LOW** | Proprietary model, unique training data, deep workflow integration, or non-AI moat. LLM Ingestion = NO. |

Feeds the Moat tag `Wrapper [HIGH/MOD/LOW]`. A HIGH read is the textbook "thin
wrapper" case and belongs in the Moat basis sentence — whether it renders Moat WEAK
(adverse) or MODERATE is V13's qualitative call, informed by whatever else is (or
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
- **Fragile** — thin/early, easily lost, or dependent on a HIGH Wrapper read
  holding up

Feeds the Commercial Proof quality tag under Signal 2: `quality [STICKY /
STAGNANT / PRE-REVENUE]`. State the classification explicitly — it's descriptive,
not a score cap.

---

## Track B Domain Facts

Reference data for Track B's Moat evidence tags (`TRL [n]` · `Unit economics [·]`).

**Hardware Last Mile Standard:** A working prototype or demo is not evidence of
production readiness. Look for 95%+ production reliability achieved through
non-obvious engineering before treating a hardware claim as strong.

**Margin Threshold:** A credible path to 50%+ gross margins at scale is the
relevant bar for hardware unit economics; permanently margin-constrained hardware
plays don't meet NWAi return requirements regardless of other strengths.

### Technology Readiness Levels (TRL) — GAO Scale

| TRL | Description |
|-----|-------------|
| 1 | Basic principles observed and reported |
| 2 | Technology concept/application formulated |
| 3 | Analytical and experimental proof of concept |
| 4 | Component validation in lab environment |
| **5** | **Component validation in relevant environment ← NWAi minimum** |
| 6 | Prototype demonstration in relevant environment |
| **7** | **System prototype in operational environment ← the level a Track B Moat read should be measured against** |
| 8 | Actual system completed and qualified |
| 9 | Actual system proven through mission operations |

---

## Research Query Templates

V13's CORE ROLE section owns the search *requirement* (3 searches, plus the fixed
4-query set for founder identity/commitment). These are supplementary templates for
the other two:

**Market validation:** `"[company sector] market size [current year]"` — find 1–2
third-party references (Gartner, IDC, CB Insights) to compare against the
founder's TAM claim.

**Competitive / Goliath landscape:** `"[company sector] market leaders"` or
`"[company name] competitors"` — identify dominant incumbents and whether any is
building in this direction; this is what makes the Goliath Test answerable rather
than speculative.

For founder identity/commitment searches, use V13's fixed 4-query set directly — it
is the single source of truth for that protocol and is not duplicated here.

---

## Live Pitch Question Sources

Draw from: unvalidated market claims · Goliath Test concerns · moat/defensibility
gaps · founder domain questions · structure/syndication friction · traction
quality · Track B specifics (TRL evidence, BOM/margin path, Last Mile signals) ·
exit/acquirer questions.

---

## Superseded — do not use

- **Numeric Opportunity Score (0–30) / Readiness Score (0–25), the Universal
  Scoring Scale, per-dimension 0–5 rubrics, the Sub-floor and No-Zero rules, the
  Readiness Downgrade Rule, and the numeric Decision Logic table** — all replaced
  by V13's six-signal qualitative model, confidence tags, and the weight-tiered
  compound rule. None of this numeric machinery has a home in V13; if it resurfaces
  in reasoning, it's being pulled from training/prior context, not from this file.
- **Dimension 3 (Founder Advantage), numeric rubric** — superseded. Team verdict
  mechanics (Source-Tier Rule, Identity-Match Standard, academic-founder
  configuration, the commitment sub-read) now live entirely in V13 Signal 3.
- **Dimension 6 (Venture Economics)** — path-to-$100M-ARR and unit-economics
  modeling is Diligence-stage work (`venture-analyst`), out of scope at Screen.
- **"Agent-Era Exposure Signal... not a scored dimension"** — superseded.
  Agent-Era Posture is Signal 5 in V13, fully weighted (SIGNIFICANT), with
  THREATENED as an adverse tier that participates in the compound rule. Posture
  definitions and the doorway question live in
  `knowledge-agent-era-readiness.md`.
- **Cynical Default's "max score 3/5"** — superseded by V13's confidence-tag
  mechanism (UNVERIFIED caps at the middle *verdict tier*, not a numeric score).
