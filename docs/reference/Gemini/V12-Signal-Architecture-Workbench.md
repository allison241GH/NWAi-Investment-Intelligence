# V12 Signal Architecture Workbench

> **Artifact type:** working document — consolidation analysis for the next screener generation
> **Scope:** strictly `docs/reference/Gemini/` sandbox. Nothing here touches the canonical
>   pipeline — `/screen` is authoritative and unchanged. **Deployment state (reconciled
>   July 2026):** the claude.ai member Project runs **V10** instructions; V11, V12, and
>   V13 are sandbox prototypes that have never been deployed.
> **Purpose:** (1) inventory every signal read in V11 and trace its framework lineage;
>   (2) identify overlaps created by framework-lineage organization; (3) propose a
>   consolidated signal architecture organized by decision logic; (4) define the proof
>   standard required before any pipeline rollout.
> **Created:** July 2026
> **Status:** V13 drafted (`Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md` = V12 Rev B
>   baseline + human-nuance layer; V12 file preserved unchanged as the regression
>   comparator) — awaiting the V13 verdict-invariance back-test (4 regression deals
>   + Jamie's 6 recent live pitches). This workbench remains the single change-history
>   document for the V12→V13 line.

---

## The Governing Principles (drift control)

1. **Verdict invariance.** Consolidation reorganizes the report; it does not change the
   judgment model. The four thesis lenses (Structural Discontinuity, Memory Lock-in,
   Agent-Era Readiness, Alpha-AI Sovereignty) and the NWA investment criteria remain the
   semantic basis. Any verdict flip in back-testing must be explained and deliberately
   accepted — never a silent artifact of restructuring.
2. **Full traceability.** Every consolidated signal maps back to its canonical framework
   source (the inventory table below). If V12 proves out, this mapping is the pipeline
   install spec — the same discipline as the Alpha-AI Sovereignty Phase 2 checklist.
3. **The pipeline stays canonical throughout.** `/screen` remains authoritative on
   contested verdicts until an explicit install decision. The sandbox proves; it does
   not preempt.
4. **Framework-presence gap (traceability).** Two frameworks active in this sandbox
   screener are NOT installed in the canonical pipeline:
   - **Alpha-AI Sovereignty** — Phase 2 install pending; the draft framework at
     `.claude/skills/nwai-investment-framework/references/alpha-ai-sovereignty-framework.md`
     still carries its DRAFT / NOT INSTALLED banner. The sandbox trip-wire (V11 Section 2)
     is a pilot of the Screen-level hook.
   - **Craft Investing design thesis** (`NWAi-Craft-Investing-Thesis-2026-06.md` —
     promoted out of this sandbox to `docs/strategy/future-of-venture-investing/` on
     July 11, 2026, at the start of the pipeline framework-adoption decision process) —
     the "surface signals for the craftsman; do not replace judgment with a number"
     stance that motivated dropping numeric scoring from the sandbox screener.
     The canonical `/screen` scores numerically (Opportunity 0–30, Readiness 0–25, with
     ADVANCE/WATCH/DECLINE bands).
   A pipeline rollout of V12 therefore carries **framework install decisions, not just a
   report restructure** — both gaps must be resolved explicitly at Phase 5.

---

## Phased Approach

| Phase | What | Exit criterion |
|---|---|---|
| **1. Inventory & audit** *(this doc)* | Enumerate all V11 reads; tag lineage, decision role, overlap group | Jamie reviews the proposed architecture and calibrates |
| **2. Draft V12** | New screener file built on the consolidated architecture; V11 untouched | File complete; self-check parity confirmed (every V11 discipline preserved or deliberately retired) |
| **3. Back-test** | Run Krew + Drodat + selected past deals with known canonical calls through V12 | Verdict parity vs V10/V11 and vs `/screen` calls; every divergence explained and accepted |
| **4. Live pilot** | V12 screens real inbound pitches for a defined window; contested or surprising calls dual-run against canonical `/screen` | Jamie's judgment: is the brief both shorter AND decision-equivalent (or better)? |
| **5. Pipeline install decision** | Separate, explicit step — outside this sandbox | Full install spec: `gates-and-flags` restructure, architecture doc bump, decisions-log entry, plugin repackage. Only on Jamie's go. |

---

## Phase 1a — Signal Inventory

Every read the V11 report produces. **Role** tags: **DECIDES** (named in the conviction
weights — can flip the verdict) · **INFORMS** (evidence feeding a DECIDES signal) ·
**RECORDS** (routing/facts — no judgment) · **GATES** (binary kill).

| # | Read | V11 location | Framework lineage | Role | Overlap group |
|---|---|---|---|---|---|
| 1 | Novelty Read | Snapshot | Track A/B Opportunity rubric | INFORMS | NOVELTY — explicit duplicate of #20 |
| 2 | Industry + Product Category | Snapshot | screener-native | RECORDS | ROUTING |
| 3 | TechGroup Theme | Snapshot | TechGroup themes (CLAUDE.md) | RECORDS | ROUTING |
| 4 | Customer Clarity | Snapshot | screener-native | INFORMS | MARKET |
| 5 | Tech Stack Depth | Snapshot | AI Moats framework | INFORMS | MOAT |
| 6 | Stage | Snapshot | gates-and-flags | RECORDS | TRACTION |
| 7 | Founder Commitment | Snapshot | NWA Filter | DECIDES | TEAM — duplicate of #13 |
| 8 | Team Fit Signals | Snapshot | team-analyst bifurcation (v2.13) | INFORMS | TEAM |
| 9 | Referral Source | Snapshot | Dealum form | RECORDS | PROCESS |
| 10 | Entity Structure / IP | Section 1 | Universal Triage hard gate | GATES | — |
| 11 | Market Scale (floor) | Section 1 | Universal Triage hard gate | GATES | MARKET |
| 12 | Commercial Intent | Section 1 | Universal Triage hard gate | GATES | TRACTION |
| 13 | Founder Commitment Depth | Section 2 | NWA Filter (Cynical Default) | DECIDES | TEAM — duplicate of #7 |
| 14 | Goliath Test | Section 2 | NWA Filter | DECIDES | MOAT |
| 15 | LLM Ingestion Test | Section 2 | NWA Filter | INFORMS | MOAT |
| 16 | AI Wrapper Risk | Section 2 | TechGroup extension | INFORMS | MOAT |
| 17 | Revenue Quality | Section 2 | NWA Filter (Revenue Quality Audit) | INFORMS | TRACTION |
| 18 | Agent-Era Exposure | Section 2 | Agent-Era Readiness (3rd lens) | DECIDES | AGENT-ERA — clean, no overlap |
| 19 | Alpha Sovereignty | Section 2 | Alpha-AI Sovereignty (4th lens) | FLAGS | ALPHA — clean, no overlap |
| 20 | Structural Discontinuity | Section 3 | Opportunity rubric / 1st lens | DECIDES | NOVELTY — duplicate of #1 |
| 21 | Market Opportunity | Section 3 | Opportunity rubric | DECIDES | MARKET |
| 22 | Founder Advantage | Section 3 | Opportunity rubric | INFORMS | TEAM |
| 23 | Defensibility | Section 3 | Opportunity rubric / Memory Lock-in (2nd lens) | INFORMS | MOAT — synthesizes #5/14/15/16 |
| 24 | Traction | Section 3 | Opportunity rubric | INFORMS | TRACTION |
| 25 | Venture Economics | Section 3 | Opportunity rubric / NWA return criteria | INFORMS | MARKET |
| 26 | Deal Structure | Section 4 | Readiness rubric (neutral per v2.21 calibration) | RECORDS | PROCESS |
| 27 | Product Maturity | Section 4 | Readiness rubric | INFORMS | TRACTION — duplicate of #6 |
| 28 | Syndication Readiness | Section 4 | Readiness rubric (neutral per v2.21 calibration) | RECORDS | PROCESS |
| 29 | Traction Velocity | Section 4 | Readiness rubric | INFORMS | TRACTION |
| 30 | Founder Accessibility | Section 4 | Readiness rubric | RECORDS | TEAM/PROCESS |

*Track B swaps #22–23 variants (Founder Advantage HW, Defensibility HW) and adds
Technical Maturity/TRL + Unit Economics — same overlap groups.*

## Phase 1b — Overlap Audit (what lineage organization costs)

**~30 reads; only 6 decision drivers.** The conviction weights already name what flips
a verdict: Team, Discontinuity, Agent-Era, Market, Goliath — plus Alpha as a flag.
Everything else is evidence or record.

| Overlap group | Reads circling the same question | The one question |
|---|---|---|
| **TEAM** (5) | #7, #8, #13, #22, #30 | Can this team execute, and are they all-in? |
| **NOVELTY** (2) | #1, #20 — verbatim duplicate ("Matches Novelty Read") | Is this genuinely new? |
| **MOAT** (5) | #5, #14, #15, #16, #23 | Is there a credible defense against the obvious killers? |
| **MARKET** (4) | #4, #11, #21, #25 | Is there room and tailwind for a venture return? |
| **TRACTION** (6) | #6, #12, #17, #24, #27, #29 | What has the market actually proven so far? |
| **PROCESS/DEAL** (4) | #9, #26, #28, #30 | Facts to record — already neutral by design (v2.21) |

The repetition Jamie observed in test outputs is structural: the same finding legitimately
"belongs" in 3–6 places, so the model restates it in each.

---

## Proposed V12 Architecture — "Six Signals + Gates + Proof + Facts"

Organized by decision logic. Each question appears **exactly once**. The conviction-weight
list and the report body become the same six rows — the lineage echo disappears.

```
Verdict Block                  ← unchanged from V11
Company Context                ← unchanged from V11
Gates (3 lines)                ← unchanged — hard kills stay binary and separate
THE SIX SIGNALS                ← one row each: verdict + one-line basis + evidence tags
Commercial Proof (1 row)       ← consolidated traction evidence
Deal Facts (table)             ← records only — no STRONG/MODERATE/WEAK grading
Risk Flags (pointers)          ← unchanged
Footer                         ← unchanged
```

### The Six Signals

| Signal | Question | Verdict scale | Absorbs (traceability) | Conviction weight |
|---|---|---|---|---|
| **1. Team** | Can this team execute, and are they all-in? | STRONG / MIXED / WEAK + commitment status (FULL-TIME / SPLIT / SIDE-PROJECT) + product-fit and market-fit half-lines | #7, #8, #13, #22, #30 | HIGHEST |
| **2. Discontinuity** | Is this genuinely new — a rule-changing shift or a better mousetrap? | PIONEER / DIFFERENTIATED / INCREMENTAL / LATE | #1, #20 | HIGH |
| **3. Moat** | Credible defense against the obvious killers? | STRONG / MODERATE / WEAK + inline evidence tags: Goliath [·] · LLM Ingestion [·] · Wrapper [·] · stack depth [·] (Track B: TRL [·] · IP [·] · unit economics [·]) | #5, #14, #15, #16, #23 | MEANINGFUL (Goliath weight carried here) |
| **4. Market** | Room and tailwind for a venture return? | STRONG / MODERATE / WEAK — floor cleared at the gate; this scores the upside + return path | #4, #21, #25 | SIGNIFICANT |
| **5. Agent-Era Posture** | Does the problem survive agents? | THREATENED / RIDING / ENABLING / INSULATED | #18 | SIGNIFICANT |
| **6. Alpha Flow** | Does it keep its alpha — and its customers' — out of the labs' hands? | KEEPS / MIXED / LEAKS / N/A | #19 | Flag only — no weight (per framework Screen spec) |

### Commercial Proof (evidence row, not a verdict driver)

One consolidated read: stage · revenue state · quality (Sticky/Stagnant) · velocity.
Absorbs #6, #17, #24, #27, #29. Feeds Signals 1 and 4; pre-revenue stated honestly,
never a kill on its own. Cynical Default applies.

### Deal Facts (records — no grading theater)

Structure · raise & valuation · syndication status · theme routing · referral source ·
accessibility. Absorbs #2, #3, #9, #26, #28, #30-partial. These were already neutral
IntroCall items by Jamie's v2.21 calibration — grading them STRONG/MODERATE/WEAK
implied judgment where none applies.

### What is deliberately retired (nothing lost silently)

- Snapshot table as a separate section — its judgment rows merged into the Six Signals;
  its fact rows into Deal Facts.
- Track A/B as separate table structures — the track still assigns (and still defaults
  mixed plays to B), but it now swaps the *evidence tags inside Signal 3* and the
  Commercial Proof emphasis, not the report skeleton.
- Sections 2/3/4 as lineage containers.

### What is preserved unchanged

Verdict Block (incl. silent Fix-Forward, compound-adverse → DECLINE, credibility ≠
commitment), 3 hard gates, Cynical Default, Brevity Contract, Claim Discipline, 3 web
searches, flag pointers, conversation mode + full-report-on-request, self-check
discipline, all four thesis lenses.

---

## Calibration Answers (July 2026)

1. **Deal Facts demotion** — ✅ CONFIRMED. Structure / Syndication / Accessibility /
   Referral become ungraded records.
2. **Moat evidence visibility** — ✅ CONFIRMED: one row, inline evidence tags.
3. **Commercial Proof placement** — ✅ DECIDED: fold into Signal 4 (Market), but
   commercial traction must remain **visible** — a dedicated Commercial Proof line
   inside the Market signal block (stage · revenue state · quality · velocity), not
   buried in the rationale.
4. **Memory Lock-in visibility** — ✅ explicit evidence tag in Signal 3 confirmed;
   **term itself under revision** — Jamie prefers an alternative label (pending; his
   preferred term to be recorded here before V12 drafting).
5. **Back-test set** — clarified: back-testing = regression check against deals with
   *known* verdicts (V10/V11 outputs + any canonical `/screen` calls on record) so V12
   divergences are detectable, run BEFORE Jamie's live testing. Krew + Drodat confirmed
   as the baseline pair.

## Open Question #6 — Verdict Mechanics (rubric / score / confirmation)

Raised by Jamie before V12 drafting: is there a rubric/score/rank or confirmation
discipline behind the Six Signals, the Gates, and the Proof? Options on the table:

- **A (recommended): Qualitative verdicts + weighted judgment + per-signal confidence
  tag.** Keeps the Craft design thesis. Each signal row carries its verdict scale, the
  named-evidence basis, and a confidence tag (VERIFIED / PARTIAL / UNVERIFIED) enforcing
  Cynical Default visibly. Conviction stays judgment-weighted with the explicit weight
  hierarchy + pattern guide + compound-adverse rule as the discipline.
- **B: Hybrid tally.** Same as A, plus a mechanical roll-up line (e.g., "high-weight
  signals adverse: 2 of 5 → DECLINE per compound rule") making the conviction math
  auditable.
- **C: Numeric scoring** (0–5 per signal, banded) — converges with the canonical
  pipeline's Universal Triage mechanics but contradicts the Craft thesis this screener
  was built on.

**RESOLVED (July 2026): A + B combined.** Qualitative verdicts with per-signal
confidence tags (VERIFIED / PARTIAL / UNVERIFIED; UNVERIFIED caps at the middle
verdict) **plus** an auditable signal roll-up line in the Verdict Block ("[N] of 5
weighted signals adverse — [names]; Alpha Flow: [read]"). No numeric scoring — the
Craft thesis stance holds in the sandbox. "Memory Lock-in" retained as the Signal 3
evidence-tag label.

---

## Phase 3 — Back-Test Findings (July 2026)

Four deals run through V12 vs. their original screener verdicts:

| Deal | Original | V12 | Parity? |
|---|---|---|---|
| Captain Compliance | ADVANCE (22/30 Opp, 23/30 Rdy) | DECLINE (2 adverse: Discontinuity, Moat) | ❌ FLIP |
| STL | ADVANCE (Scout review) | WATCH / LOW (1 adverse: Team) | ❌ one notch down |
| Synergist | ADVANCE (19/25 STRONG, Mar 2026) | DECLINE (3 adverse + Alpha LEAKS) | ❌ FLIP (partly evidence-driven — Microsoft shipped competing products post-March) |
| Krew | WATCH | DECLINE (2 adverse: Team, Moat) | ❌ one notch down (new team facts found, but verdict over-rotated) |

**Root cause: the mechanized roll-up flattened the weight hierarchy.** V10's compound
rule was judgment over weighted dimensions; V12's "2 of 5 adverse → DECLINE" counts a
MEANINGFUL-weight Moat flag as an equal vote with a HIGHEST-weight Team failure. Four
compounding defects:

1. **Adverse fires below the printed verdict.** "Goliath FLAGGED with no credible
   answer" let a Moat rated MODERATE count as adverse (Captain Compliance, Krew both).
   The roll-up contradicted the report's own verdicts.
2. **Double-counting one weakness.** "INCREMENTAL, no compensating moat" (Discontinuity)
   + "Goliath FLAGGED" (Moat) is the same crowded-category finding counted twice —
   manufacturing the 2-count that triggers compound DECLINE (Captain Compliance).
3. **Traction lost all offsetting power.** Demoted to unweighted evidence, verified
   exceptional traction ($1.1M rev, 1000% YoY, 400 clients) could not offset a red-ocean
   read — inverting the V10 principle "INCREMENTAL novelty acceptable if other
   high-weight signals are strong."
4. **WATCH disappeared as the default middle.** Screen-depth doubts ("no credible answer"
   after 3 searches) hardened into kill findings instead of Scout probes — Diligence-bar
   skepticism applied at Screen. Objective drift: from "surface to Scout" to "kill at
   screen."

**Remedy set (pending Jamie's calibration):** adverse = bottom verdict tier only;
weight-tiered compound rule (Team+1 other, or 3+ total); single-count rule for
Discontinuity/Goliath overlap; exceptional verified Commercial Proof restored as a
conviction lifter that can offset one non-Team adverse signal; screen-stage humility
clause (unresolvable-at-screen-depth → pitch question, not adverse); WATCH restored as
the when-in-doubt default. Synergist divergence flagged as possibly *correct* (world
changed post-March); STL professor-founder pattern needs a team-configuration
calibration.

---

## V13 — Human-Nuance Layer (July 2026)

Jamie's articulated human screening process (big idea → big market → credible team →
then moat, growth, and the AI-era tests) confirmed the Six Signals cover the
categories. What the architecture did not yet ask for is what an experienced
screener spots **between** the categories. Four reads identified (with the
exit/track-record read folded into the first):

1. **Earned insight / founder-problem authenticity** — why *this* founder, *this*
   problem: lived pain vs. found-it-in-a-market-map; plus prior exits /
   venture-scale operating history. → third named sub-read ("Origin & track
   record") inside the Team signal basis.
2. **Coherence** — internal consistency of the pitch (ask vs. traction, ambition
   vs. team size, deck vs. terms). → deliberate pass; findings land in Risk Flags
   (`⚠️ Coherence →`), the Concern line, and Live Pitch questions.
3. **Narrative vs. substance** — grade the substance, not the storytelling; sharp
   divergence (either direction) noted in the Verdict Block "Why." → instruction
   only, no output surface.
4. **"Smells like" pattern match** — resemblance to a recognizable venture shape.
   → optional one-line Pattern note under Risk Flags, hypothesis-only: generates a
   disconfirming probe, never evidence, never a vote (same affirmative-evidence
   discipline as the academic-founder rule).

**Calibration answers (Jamie, July 2026):**

- **Team basis cap** → 60 words (the signal now carries fit, commitment, and
  origin/track-record reads; a fixed 50 would force silent, inconsistent drops).
- **Pattern note** → included, optional and silent by default. Rationale:
  auditability — the model pattern-matches whether or not it prints; a printed
  hunch is correctable in five seconds (cf. the STL faculty-listing misread), a
  suppressed one silently colors the bases.
- **Archetype library** → **open-ended, no seeded taxonomy.** At ~2,000
  pitches/year a shapes list drawn from four deals is false coverage and teaches
  force-fitting. The model names resemblances in plain words; two shapes retained
  in the instruction strictly as *format examples of altitude* (structural shape,
  not sector). Recurring novel shapes get logged in the intake table below before
  being treated as established — the library accretes empirically from screening
  volume, not a priori.
- **Row order** → reordered to the member read sequence: Discontinuity → Market
  (+ Commercial Proof) → Team → Moat → Agent-Era → Protect Alpha. Signals
  renumbered accordingly (Team is now Signal 3, Moat Signal 4; Agent-Era and
  Protect Alpha keep 5/6). **Print order ≠ weight order** — Team remains HIGHEST;
  all weights and verdict mechanics carry over from V12 Rev B unchanged.

**Versioning decision:** shipped as **V13 in a new file** (not "V12 Rev C") so V12
Rev B stays intact as the side-by-side regression comparator. No sandbox version is
deployed — the claude.ai member Project runs V10 throughout.

**Guardrails:** none of the between-signal reads carries weight or may enter the
adverse roll-up — they produce flags, Concern lines, and Live Pitch questions only.

**Proof standard (V13):** verdict invariance vs. V12 Rev B expectations — re-run
the four back-test deals (Captain Compliance, STL, Synergist, Krew) plus Jamie's
six recent live pitches; every call must hold, with the diff confined to bases,
flags, pitch questions, and the occasional Pattern note. Any verdict flip means a
nuance leaked into mechanics and needs tightening before the live pilot.

### Pattern-shape intake log (empirical — candidates until recurring)

| Shape | First seen (deal) | Occurrences | Status |
|---|---|---|---|
| Marquee-halo framing thin traction — serial-exit credibility + brand partnerships (Microsoft, CDW) framing a thin revenue base against an aggressive cap | Synergist (v13 re-run, Jul 2026) | 1 | Candidate |

---

## Decision Log

| Date | Decision | By |
|---|---|---|
| 2026-07 | Sandbox-first approach confirmed; pipeline install only after proof; V11 stays active during V12 prototyping | Jamie |
| 2026-07 | Framework-presence gap recorded: Alpha-AI Sovereignty + Craft Investing thesis are sandbox-only, not in canonical pipeline — pipeline rollout of V12 requires explicit framework install decisions | Jamie |
| 2026-07 | Calibration Q1–Q3 answered (see above); Q4 term pending; Q5 clarified | Jamie |
| 2026-07 | Q6 resolved: verdict mechanics = A+B (confidence tags + roll-up line, no numeric scoring); Memory Lock-in retained as the Signal 3 tag label | Jamie |
| 2026-07 | Phase 2 complete: `Claude-V12-Six-Signal-Consolidation-NWA-TechGroup-AI-Screener.md` (drafted as `Claude-V12-NWA-TechGroup-AI-Screener.md`; renamed with its descriptor July 2026) on the consolidated architecture; V11 remains active. Upside/Blockers retired (function absorbed by Verdict Block + signal one-liners) — flagged in V12 header for veto during testing. Next: Phase 3 back-test (Krew + Drodat regression vs V10/V11 verdicts) | Claude |
| 2026-07 | Phase 3 back-test run (Captain Compliance, STL, Synergist, Krew) — V12 over-declined; root cause + remedy set documented above. Remedy set approved; STL calibrated as ADVANCE-with-question (academic-founder/team-configuration rule); Synergist divergence adjudicated as legitimate (evidence-driven — post-March world change; the re-screen verdict is the one under test) | Jamie |
| 2026-07 | V12 Rev B written: recalibrated conviction mechanics (bottom-tier adverse, weight-tiered compound, single-count overlap, traction lift, humility clause, WATCH default), descriptive basis style (Product/Market-Team Fit restored; Discontinuity describes the edge), Signal 6 renamed **Protect Alpha**, Why NWA removed from Company Context. Next: re-run the 4 deals on Rev B to confirm parity | Jamie + Claude |
| 2026-07 | STL Rev B re-run: WATCH/MEDIUM with Team-commitment as sole adverse vote — model treated faculty-directory listings as affirmative SPLIT evidence (rule only covered professor + separate operating CEO). Jamie confirmed profile is exactly what NWA wants to Scout. Two amendments: (1) academic-founder rule extended to professor-as-CEO — faculty/lab/directory listings are the expected footprint, never affirmative SPLIT evidence on their own; (2) **Ask-at-Scout rule** — call-answerable gaps (commitment status, role clarity, terms) with no other adverse signal → ADVANCE with pitch question #1, not WATCH; WATCH reserved for milestone-gated gaps. Krew unaffected (its evidence is affirmative: company's own site). Expected STL re-run: ADVANCE | Jamie |
| 2026-07 | Human-nuance exploration (Jamie's articulated screening process → what a human spots between the six signals): four between-signal reads adopted — earned insight + track record (Team sub-read), coherence pass, narrative-vs-substance, "smells like" pattern match. Design = instruction-level hybrid, zero new weighted surface. Calibration: Team basis cap 60w; Pattern note optional/silent-by-default; archetypes open-ended (no seed taxonomy — empirical intake log in the V13 section); signals reordered to member read sequence with the print-order ≠ weight-order guardrail | Jamie |
| 2026-07 | **V13 written** (`Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md`) on the V12 Rev B baseline — shipped as a new version file, not "V12 Rev C," so V12 Rev B stays intact as the regression comparator. Changes: Team basis adds Origin & track record read (cap 60w); Between-Signal Reads section (coherence, narrative-vs-substance, Pattern note); Risk Flags gains a Coherence class; signals renumbered to read sequence (1 Discontinuity · 2 Market · 3 Team · 4 Moat · 5 Agent-Era · 6 Protect Alpha); all weights and Rev B verdict mechanics unchanged. Next: V13 verdict-invariance back-test (4 regression deals + 6 recent live pitches) | Jamie + Claude |
| 2026-07 | **V13 formatting fix** from the first live V13 test outputs (Ivee, AgTechLogic): the Six Signals 5-column table starved the Basis column and garbled on PDF export. Jamie proposed merging to 3 columns (#+Signal · Verdict+Conf · Basis); adopted the stronger form — **one block per signal** (bold header line `# · name — verdict · confidence` + full-width basis prose; Moat tags on their own line; Commercial Proof as indented line under Market) since markdown cannot control table column widths. Gates and Deal Facts remain tables (one-line cells). Self-check enforces blocks-not-table | Jamie + Claude |
| 2026-07 | **V13 legend refinement** (from the STL v13 test output): once table column headers disappeared, the block header grammar (`# · Signal — Verdict · Confidence`) was undecodable for a framework-naive member, and the Track label had silently dropped out of the section title. Fix: the Six Signals heading now carries the Track (A/B), with a one-line italic legend directly beneath decoding Verdict · Confidence (incl. what the confidence tags mean). Self-check enforces both | Jamie + Claude |
| 2026-07 | **Back-test ledger note — Synergist v13 divergence to adjudicate:** Synergist v13 test run returned ADVANCE/HIGH (0 of 5 adverse; Protect Alpha MIXED, coherence flag on $33.5M cap + $3M forecast vs. $100K revenue) vs. the Rev-A-era V12 DECLINE previously adjudicated as legitimate. Mechanically explained by the Rev B recalibration (Moat MODERATE and Discontinuity INCREMENTAL are no longer adverse; Alpha never counted) — but the accepted Synergist expectation should be confirmed by Jamie, including whether HIGH (vs. MEDIUM) conviction is right given the coherence gap | Claude (pending Jamie) |
| 2026-07 | **Synergist adjudicated + coherence-conviction cap added.** Jamie set the accepted Synergist expectation: **ADVANCE / MEDIUM** — verdict swing from the Rev-A DECLINE accepted as a product of the deliberate Rev B recalibration; HIGH conviction rejected because of the unexplained $33.5M-cap/$3M-forecast/$100K-actuals gap. This exposed a design gap: coherence findings had no pathway to influence conviction (barred from the roll-up, absent from the pattern guide), so HIGH was mechanically guaranteed. New V13 rule: a material coherence contradiction on a **load-bearing number** caps Triage Conviction at MEDIUM — conviction cap only, never a verdict vote, so the never-adverse principle and verdict invariance both hold. Back-test ledger updated: Synergist = ADVANCE/MEDIUM | Jamie |
| 2026-07 | **Synergist v13 confirmation re-run: ADVANCE / MEDIUM ✓** — coherence cap applied and stated explicitly in the roll-up line, matching the adjudicated expectation; STL v13 (ADVANCE / MEDIUM) also matches its amended expectation → 2 of 4 regression deals confirmed on V13. Residual defect: preamble narration leaked again despite the OUTPUT STRUCTURE rule → rule strengthened at the point of temptation (search instruction: run searches silently; first output text is the report title). Pattern-shape intake log receives its first empirical candidate (marquee-halo framing thin traction). **Remaining V13 regression runs: Captain Compliance, Krew** | Jamie + Claude |
| 2026-07 | **Captain Compliance v13 run: ADVANCE / MEDIUM ✓ — accepted by Jamie.** Restores the original canonical ADVANCE on the Rev-A over-decline case: verified traction kept its offsetting power against the red-ocean read, coherence cap fired on the $20M/$15M SAFE-cap contradiction, no-preamble fix verified working. One inconsistency caught and fixed: header printed commitment SPLIT (CTO's own bio discrepancy) while the roll-up counted Team not adverse — strictly, SPLIT + Moat WEAK ⇒ compound DECLINE, so the label and the math disagreed. Calibration: SPLIT now requires **corroborated** evidence; a single self-published discrepancy ⇒ commitment **UNCONFIRMED ⚠️** + Live Pitch Q1; new label-discipline rule (header may only say SPLIT when Team is counted adverse). Verdict-invariant — codifies the accepted outcome. **Explicitly ratified by Jamie after full review of the SPLIT/UNCONFIRMED reasoning** (alternative — treating a self-published bio as categorical proof, which would have made Captain Compliance a DECLINE — considered and rejected) | Jamie |
| 2026-07 | **Back-test phase closed.** Jamie waived the Krew regression run. Final ledger: Captain Compliance ADVANCE/MEDIUM ✓ · STL ADVANCE/MEDIUM ✓ · Synergist ADVANCE/MEDIUM ✓ · Krew waived (its Rev-B adjudication rested on affirmative team evidence rules, unchanged in V13). Live-pitch tests: Ivee ADVANCE/MEDIUM · AgTechLogic WATCH/MEDIUM — verdicts accepted. V13 testing complete; next step is the deployment decision for the claude.ai member Project (currently running V10; jump would be V10 → V13). Pipeline `/screen` remains canonical and untouched | Jamie |
| 2026-07 | **Deployment-state reconciliation (Jamie):** only V10 instructions were ever pasted into the claude.ai member Project — V11 was drafted but never deployed, so earlier "V11 active" status lines recorded an intention as fact. Corrected across all four Claude version headers and this workbench. Standing state: pipeline `/screen` = canonical, unchanged · claude.ai member Project = V10 · V11/V12/V13 = sandbox prototypes, never deployed. Older log rows saying "V11 remains active" are left as written (historical record); this entry supersedes them | Jamie |
