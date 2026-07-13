# Screen→Scout Conversion Rubric

**Version 1.0 — frozen July 12, 2026** (calibrated per the Pipeline Framework Adoption
Spec §5.3; calibration record below).

## Purpose and rules of use

Screen speaks in verdicts; Scout translates them through this fixed, public rubric at
intake. This is **mechanical translation of judgments already made — no re-judging, no
fresh derivation.** The mapped values are the per-dimension baseline for Scout delta
tracking (↑ / → / ↓) and the input to the Thesis Fit score.

- **Loaded by `/scout` only.** `/screen` never loads this file — the number never
  appears at Screen.
- **Scope of the mapping:** Opportunity-side D1–D5 (/25) + Readiness-side R1–R4 (/20).
  D6 (Venture Economics) and R5 (Founder Accessibility) are intentionally unmapped —
  ratified July 12, 2026 — keeping Thesis Fit at its established /45 denominators and
  bands. Venture-economics evidence carries forward qualitatively (Market basis
  return-path line + Deal Facts) into Scout's GTM and Exit reads.
- **Signals 5 (Agent-Era) and 6 (Protect Alpha) do not map** — Scout scores them fresh
  at Q7 and Q8; Screen's posture/read is the prior, not a baseline number.
- **Gates carry as gates:** any Hard Gate FAIL → Thesis Fit = 0 (unchanged).
- **Where a rule names two adjacent values** (e.g., "1–2"), pick using the signal's
  basis evidence; when genuinely ambiguous, take the higher value and note it as an
  open item (screen-stage humility carries through the seam).
- **Explained divergence at Scout:** when Scout's own score departs from the mapped
  baseline by ≥2 on any dimension, the Score Summary carries a one-line explanation.
  Divergence is fine; silence about it is not.

## Opportunity-side mapping (D1–D5, /25)

Track A shown; **Track B** swaps the D4/D5 evidence sources to the Track B Moat tags
(TRL, IP, unit economics) and the Track B Commercial Proof emphasis — same value scale.

| Scout baseline dim | Screen source | Mapping |
|---|---|---|
| **D1 Structural Discontinuity** | Signal 1 verdict | PIONEER→5 · DIFFERENTIATED→4 · INCREMENTAL→2 · LATE→1 |
| **D2 Market Opportunity** | Signal 2 verdict + confidence | STRONG·Verified→5 · STRONG·Partial→4 · MODERATE→3 · WEAK→2 (→1 if Market gate ⚠️ YELLOW PASS) |
| **D3 Founder Advantage** | Signal 3 verdict + commitment | STRONG·Verified→5 · STRONG·Partial→4 · MIXED→3 · WEAK→2 · commitment SPLIT/SIDE-PROJECT (Team counted adverse)→cap 2 · UNCONFIRMED ⚠️→no cap, carries as an open item |
| **D4 Defensibility** | Signal 4 verdict + tags | STRONG→4 (→5 only if Verified AND Memory Lock-in [present]) · MODERATE→3 · WEAK→1 (→2 if a named nascent moat element exists in the basis). Evidence tags (Goliath / LLM Ingestion / Wrapper / Memory Lock-in / Stack; Track B: TRL / IP / unit economics) carry to Scout Q3 as evidence, not numbers |
| **D5 Traction** | Commercial Proof line | Verified STICKY revenue + strong velocity→5 · verified growing revenue→4 · early revenue booked or pilot revenue (incl. first revenue + signed contracted channel)→3 · **claimed revenue, confidence Unverified→cap 3** (Cynical Default carries through the seam, whatever the claimed magnitude) · LOI/beta, no revenue→2 · pre-revenue→1 (→2 with strong verified non-revenue proof) · quality STAGNANT→cap 2 |

## Readiness-side mapping (R1–R4, /20)

| Scout baseline dim | Screen source | Mapping |
|---|---|---|
| **R1 Deal Structure** | Deal Facts (structure & terms) | Clean priced equity→4–5 · standard SAFE or convertible→3 (neutral, per v2.21 — an IntroCall negotiation item, incl. LLC-conversion cases) · aggressive/incompatible terms flagged in the coherence pass or Risk Flags (e.g., non-standard liquidation preference, stacked discounts, founder inflexibility)→2 |
| **R2 Product Maturity** | Commercial Proof stage | Operating business with revenue retention→5 · commercial product, early revenue→4 · product/beta live, pre- or first revenue→3 · research/concept→1–2 |
| **R3 Syndication** | Deal Facts (syndication) | External lead committed (term sheet/memo)→4–5 · credible co-investors in conversation→4 · forming/seeking/NWA-led→3 (neutral) · no round, no plan→2 |
| **R4 Traction Velocity** | Commercial Proof velocity | Exceptional verified velocity→5 · growing→4 · steady/inflecting→3 · flat or unknown→2 |

## Calibration record (July 12, 2026)

**Anchors:** the §9.1 regression runs of **STL (Summit Technology Laboratory)** and
**Synergist Technology** through the new Six-Signal `/screen`, mapped through this table
and compared per-dimension against their archived numeric Triage Reports
(STL 2026-03-17: D1–D5 = 4,4,5,4,4 → 21/25; R = 3,5,4 (+Founder Accessibility 5) →
17/20 · Synergist 2026-03-16: D1–D5 = 4,3,5,3,4 → 19/25; R = 2,4,3 (+Founder
Accessibility 4) → 13/20).

**Result:** every comparable dimension landed within the ±2 tolerance; Synergist's
mapped Opportunity sum (19/25) matched its historical total exactly. Two dimensions hit
Δ2 in opposite directions — STL D3 (historical 5 vs mapped 3: the Six-Signal Team read
folds market-team fit and commitment into a verdict the old Founder Advantage rubric
scored on credentials) and Synergist D2 (historical 3 vs mapped 5: the Six-Signal Market
read rewards the verified tailwind above the gate floor where the old rubric penalized
the tight category base). Both are screening-judgment shifts already accepted under
verdict invariance (regression verdicts matched: ADVANCE/MEDIUM ×3), not rubric bias —
no value adjustments required; one clarifying pass was applied to the D5/R2 stage
anchors (first-revenue-plus-contracted-channel → 3; commercial-product-early-revenue →
4).

**Exclusions (adjudicated divergences):**
- **Synergist R1** (historical 2): scored under the pre-v2.21 SAFE/structure-penalty
  policy, rescored neutral by Decision 8 (June 2026) — excluded from calibration; the
  rubric maps per current policy (→3).
- **R4 Traction Velocity**: no per-dimension historical analog — the archived /20
  reports carried Founder Accessibility, not Traction Velocity. Calibrated
  directionally against the Commercial Proof velocity reads.
- **Captain Compliance**: excluded from calibration entirely (ruling of July 12, 2026)
  — its archived report is on the older /30 + /25 scale (20/30 + 19/25, conviction
  LOW), incompatible with the /25 + /20 target denominators. *Correction on the record:
  the adoption spec §5.3 cites "Captain Compliance 22/30 + 23/25"; the archived
  primary-source report reads 20/30 + 19/25.* CC ran in the verdict regression (ADVANCE/
  MEDIUM ✅) and serves as the out-of-sample seam-test deal (§9.4).

**Seam-test addition (July 13, 2026):** the §9.4 end-to-end seam test (Captain
Compliance new-Screen output → `/scout` intake) surfaced one gap — D5 had no handler
for claimed-but-Unverified revenue. Added: Unverified claimed revenue caps D5 at 3,
carrying Cynical Default through the seam. Seam test otherwise passed: rubric applied
mechanically (Opportunity 17/25 + Readiness 13/20 → Thesis Fit 30/45, Qualified fit),
deltas rendered against the historical Scout scores, the ≥2 divergence (Q2) carried its
explanation, and the result is consistent with CC's historical ADVANCE TO DILIGENCE
Scout call (historical Thesis Fit 39/55 = 71%, also Qualified-band).

---

*Screen→Scout Conversion Rubric | v1.0 | July 12, 2026 | Single source of truth for the
Screen→Scout translation (spec §5, Option B). Installed with plugin v3.0.0 /
architecture v0.38.0. Loaded by `scout.md` at intake alongside `scout-questions.md`.*
