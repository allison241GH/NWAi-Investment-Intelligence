# NWAi Pipeline Framework Adoption Spec — July 2026

> **Artifact type:** install specification — the Phase 5 document anticipated by
> `docs/reference/ClaudeProjects/V12-Signal-Architecture-Workbench.md`.
> **Status:** RATIFIED — all decisions and open calibration items resolved by Jamie,
> July 11, 2026 (see §1 and §11). Nothing operational changes until the plan-mode
> implementation session executes this spec.
> **Scope:** TechGroup pipeline only. The Universal Triage Framework
> (`gates-and-flags.md`) remains intact and canonical for the other five NWAi groups.
> **Evidence base:** the V13 screener sandbox program (V10→V13 lineage, 4-deal
> regression back-test closed and ratified, live pitches Ivee + AgTechLogic accepted).
> V13 is the proven Screen-stage instance of this architecture — the calibration
> source, **not** a file to transplant.
> **Deployment-state note:** claude.ai is Jamie's personal screener test bench only.
> There is no member-facing deployment; it has no bearing on anything in this spec.

---

## 1. Ratified Decisions (Jamie, July 11, 2026)

| # | Decision | Ruling |
|---|----------|--------|
| 1 | **Scoring boundary (Craft adoption scope)** | Craft at **Screen only**. Screen becomes qualitative signal-surfacing (Six-Signal verdict model, no numeric scores). Numeric scoring begins at Scout and is unchanged from Scout onward. The Craft thesis itself contemplates Scout evolution too — that is **parked, not rejected** (see §10). |
| 2 | **Alpha-AI Sovereignty Phase 2** | **GO.** Install per the framework's own "Pipeline Hooks — Phase 2 Install Spec" (Screen trip-wire → Scout Q8 → Diligence Tier 4 → DD Report mapping). Its 5 open calibration questions resolve at install review (§6). |
| 3 | **Agent-Era at Screen** | **Upgrade confirmed**: from Exposure trip-wire (FLAGGED/CLEAR, routing only) to weighted posture verdict (THREATENED/RIDING/ENABLING/INSULATED, SIGNIFICANT weight; THREATENED = adverse vote). Scout Q7 and Diligence Moat Tier 3 unchanged. |
| 4 | **Screen→Scout contract** | **Fixed conversion rubric at Scout intake** — verdict-to-points translation, not fresh derivation. Delta tracking and Thesis Fit preserved with same architecture, new input implementation (§5). |
| 5 | **Scope** | **TechGroup only.** TechGroup retains the universal gates and NWA Filter tests; it swaps the universal scoring-and-bands layer for the Six-Signal verdict model. All other groups: Universal Triage Framework unchanged and in full. |

**Also completed July 11, 2026:** Craft Investing thesis promoted from the Claude
Projects sandbox to `docs/strategy/future-of-venture-investing/NWAi-Craft-Investing-Thesis-2026-06.md`
(canonical home, sibling to the Agent-Era and Alpha theses). Its operative encoding
enters the pipeline via the new `screen.md` at implementation (§4), with a Key
Frameworks entry in CLAUDE.md.

---

## 2. Governing Principles (carried from the V12 workbench)

1. **Verdict invariance.** The judgment model proven in the V13 back-test transfers
   intact. The regression re-run (§9) is the drift detector; any verdict flip must be
   explained and deliberately accepted.
2. **Calibrated rules transfer verbatim in substance.** The rules ledger in §4.3
   encodes ratified back-test adjudications (STL, Captain Compliance, Synergist).
   Paraphrase drift on these rules is the primary implementation risk.
3. **Evolve, don't transplant.** The new `screen.md` starts from the current
   `screen.md` pipeline skeleton and replaces the judgment core. V13's claude.ai
   test-bench apparatus (§4.4) must not enter the pipeline.
4. **Full traceability.** Every stage hook maps to its framework source; every V13
   rule maps to its location in the new command.
5. **The pipeline stays canonical until the implementation session completes and the
   regression passes.**

---

## 3. Stage × Framework Matrix

| Stage | Craft Investing | Agent-Era Readiness | Alpha-AI Sovereignty |
|---|---|---|---|
| **Screen** | **Governs the stage**: Six-Signal qualitative verdicts, confidence tags, conviction mechanics, no numeric scores | **Signal 5 posture verdict** (weighted; THREATENED adverse) — upgraded from trip-wire | **Signal 6 Protect Alpha** (KEEPS/MIXED/LEAKS/N/A) — routing flag, no weight, per Phase 2 Screen spec as evolved by V13 |
| **Scout** | Conversion rubric at intake (§5) — Screen verdicts translate to Scout's numeric frame; no other change | Q7 unchanged (scored 0–5, posture on deal-team line) | **NEW Q8** per Phase 2 spec (Strategic group → 5 dims, same 20% weight; Conviction total 19.0 unchanged) |
| **Diligence** | No change (numeric rubrics stand) | Moat Tier 3 unchanged | **NEW Tier 4** (0–15, gated to model-supply-chain deals) + agent-file additions (technology / risk / competitive-positioning analysts) |
| **DD Report** | No change (11 × 1–5 canonical format binding) | Unchanged | Tier 4 companion line in §3, feeds §4/§10, standing Appendix A provider-terms item |
| **Decision / Memo** | No change | Unchanged | Memo may use the framework's "Resonating Takeaway" framing where relevant |

---

## 4. Workstream A — Screen Rebuild (`screen.md`)

### 4.1 Keep / Replace / Discard

| Current screen.md element | Disposition |
|---|---|
| Step 1 — Load frameworks | **Keep, retarget**: loads `gates-and-flags.md` (gates + NWA Filter definitions only), restructured `gates-and-flags-techgroup.md`, `agent-era-readiness-framework.md`, `alpha-ai-sovereignty-framework.md` |
| Step 2 — Gather deal info (deals/active/, paste) | **Keep** |
| Step 3 — Track assignment (A/B) | **Keep** (V13-identical logic; track swaps Moat evidence tags + Commercial Proof emphasis, not report structure) |
| Step 4 — 3-search protocol | **Keep** (near-identical to V13; add V13's founder-commitment LinkedIn check emphasis; searches run silently — first output is the report title) |
| Step 5 — Hard gates | **Keep** (identical 3 gates; FAIL → Verdict Block + Context + Gates table + footer, stop) |
| Step 6 — NWA Filter tests / HW assessment | **Replace**: tests survive as Six-Signal evidence — Goliath, LLM Ingestion, Wrapper → Moat tags; Revenue Quality → Commercial Proof quality; Cynical Default → confidence-tag mechanics; Agent-Era Exposure row → Signal 5 posture verdict; NEW Protect Alpha read → Signal 6 |
| Step 7 — Numeric scoring + decision logic | **Replace**: Six-Signal verdicts + conviction mechanics (§4.2–4.3) |
| Step 8 — Triage Report format | **Replace**: V13 output structure (Verdict Block → Company Context → Gates → Six Signals as blocks → Deal Facts → Risk Flags → optional Pattern note → footer). Signal blocks, never a table; Gates and Deal Facts stay tables; Track named in Six Signals heading + one-line legend |
| Step 9 — Docx generation | **Keep, redesign layout** (§4.5). Filename convention `[Company Name] - Triage Report [YYYY-MM-DD].docx` **unchanged** — /scout, /diligence, /dd-report, /memo glob for it. Fix stale Cowork-era dynamic-path lookup to the canonical workspace path |
| Step 10 — Dealum update | **Keep, revise tag vocabulary** (§4.6) |
| Step 11 — Next action | **Keep** |

### 4.2 The judgment core (from V13 — authoritative summary)

- **Verdict Block leads**: PRELIMINARY CALL (ADVANCE/WATCH/DECLINE) + TRIAGE
  CONVICTION (HIGH/MEDIUM/LOW) + signal roll-up line ("[N] of 5 weighted signals
  adverse — [names]; Protect Alpha: [read]"; traction lift stated when applied) +
  Why (≤2 sentences) + Concern (1 sentence) + exactly one conditional element
  (Live Pitch Questions ≤3 / Re-engage-when / Kill reason).
- **Six Signals, member read sequence** (print order ≠ weight order):
  1 Discontinuity (HIGH) · 2 Market + Commercial Proof line (SIGNIFICANT) ·
  3 Team (HIGHEST) · 4 Moat + evidence tags (MEANINGFUL) · 5 Agent-Era Posture
  (SIGNIFICANT) · 6 Protect Alpha (NO WEIGHT — routing flag).
- **Confidence tags** per signal: VERIFIED / PARTIAL / UNVERIFIED; UNVERIFIED caps
  at middle verdict.
- **Between-Signal Reads**: coherence pass, narrative-vs-substance, optional Pattern
  note — flags/questions/conviction-cap only, never votes.
- **Brevity contract**: 1–2 page brief; basis caps (40w; Team 60w; Moat 50w).

### 4.3 Calibrated rules ledger — MUST transfer verbatim in substance

Each rule below encodes a ratified adjudication. Implementation includes a
traceability check: every rule → its exact location in the new screen.md.

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
    archetype library; intake log accretes empirically — see workbench).
16. Protect Alpha: no weight, no gate, no cap, no double-count (LLM Ingestion =
    outside-in replicability; Protect Alpha = inside-out leakage; Goliath = incumbent
    intent; Protect Alpha = training your own Goliath).
17. Gate FAIL only on clear evidence; silence = PASS + Yellow Flag.
18. Roll-up must never contradict the printed signal verdicts; self-check enforces
    arithmetic against the adverse definitions.

### 4.4 V13 apparatus that must NOT enter the pipeline

- The paste-into-Project-instructions header and setup notes.
- References to `knowledge-*.md` files (retarget to canonical `references/` paths;
  the sandbox condensations remain test artifacts).
- Post-report conversation mode as written for chat (replace with the pipeline
  next-action step; "ask to expand any signal / run the full report" behavior may be
  kept as a slim follow-up note since it works on all surfaces).
- Any residual "member Project" framing.

### 4.5 Docx Triage Report — layout redesign

Same filename convention and NWAi styling (navy 1F3864 banners, callout verdict
block). New layout mirrors the report: verdict callout → context → gates table →
six signal blocks as full-width shaded sections (verdict + confidence in the section
header bar; basis prose full width; Moat tags line) → Deal Facts table → flags.
No numeric score tables. Blocks-not-tables carries into the docx.

### 4.6 Dealum tag vocabulary (aspirational until API; used in deal-folder records now)

- Keep: `TechGroup-Screened`, `TechGroup-Advance`, `TechGroup-Watch`, `TechGroup-Decline`.
- Replace score-language kill tags: `Decline-WeakOpportunity` → `Decline-CompoundAdverse`;
  keep `Decline-ForeignIP`, `Decline-SmallMarket`, `Decline-NoCommercialPath` (gate
  kills); add `Decline-FixForward` (WATCH-condition unfixable).

### 4.7 `gates-and-flags-techgroup.md` restructure

Becomes the TechGroup Six-Signal screener reference: track determination (kept),
signal definitions + verdict scales + weights + adverse definitions + compound rule,
evidence-tag specs (Wrapper assessment, Replicability Speed flag fold in here), the
calibrated rules ledger, Alpha Leakage / Protect Alpha subsection (per Phase 2 spec,
as evolved by V13 into Signal 6), Agent-Era posture verdict subsection (upgraded from
the Exposure Signal). The universal `gates-and-flags.md` is referenced for gates +
NWA Filter test definitions; its scoring/bands sections explicitly no longer apply
to TechGroup (one-line deviation note added there — nothing else in it changes).

---

## 5. Workstream B — the Screen→Scout Seam (conversion rubric)

**Principle:** Screen speaks in verdicts; Scout translates them through a fixed,
public rubric at intake. Mechanical translation of judgments already made — no
re-judging, no fresh derivation. The number never appears at Screen.

### 5.1 Conversion rubric — PROPOSED (calibrate per §5.3 before freezing)

Opportunity-side (Track A shown; Track B swaps D4/D5 sources to TRL/IP/unit-economics
tags per the track's Moat tags and Commercial Proof emphasis):

| Scout baseline dim | Screen source | Proposed mapping |
|---|---|---|
| D1 Structural Discontinuity | Signal 1 verdict | PIONEER→5 · DIFFERENTIATED→4 · INCREMENTAL→2 · LATE→1 |
| D2 Market Opportunity | Signal 2 verdict + confidence | STRONG·Verified→5 · STRONG·Partial→4 · MODERATE→3 · WEAK→2 (→1 if Market gate ⚠️) |
| D3 Founder Advantage | Signal 3 verdict + commitment | STRONG·Verified→5 · STRONG·Partial→4 · MIXED→3 · WEAK→2 · SPLIT/SIDE-PROJECT (adverse)→cap 2 · UNCONFIRMED ⚠️→no cap, open item |
| D4 Defensibility | Signal 4 verdict | STRONG→4 (5 if Verified + Memory Lock-in present) · MODERATE→3 · WEAK→1–2; tags carry to Scout Q3 as evidence |
| D5 Traction | Commercial Proof line | Verified sticky revenue + velocity→5 · verified growing revenue→4 · early/pilot revenue→3 · LOI/beta→2 · pre-revenue→1–2 (honest signal) · STAGNANT→cap 2 |
| D6 Venture Economics | Market basis return-path + Deal Facts (raise/valuation) | Clear 10x/20–100x path→4–5 · plausible→3 · capped→1–2. *Weakest mapping — V13 folded venture economics into Market; flag divergences here liberally.* |

Readiness-side:

| Scout baseline dim | Screen source | Proposed mapping |
|---|---|---|
| R1 Deal Structure | Deal Facts (structure/terms) | Standard SAFE or priced→3 (neutral, per v2.21) · clean priced equity→4 · aggressive/incompatible terms (coherence-flagged)→2 |
| R2 Product Maturity | Commercial Proof stage | Business→4–5 · Product/beta→3 · Research/Concept→1–2 |
| R3 Syndication | Deal Facts | External lead committed→4–5 · forming/seeking/NWA-led→3 (neutral) |
| R4 Traction Velocity | Commercial Proof velocity | Exceptional verified→5 · growing→4 · steady→3 · flat/unknown→2 |
| R5 Founder Accessibility | Deal Facts | Responsive + complete submission→4 · contact provided→3 · gaps→2 |

Signals 5 (Agent-Era) and 6 (Protect Alpha) do **not** map — Scout scores them fresh
at Q7/Q8. Gates carry as gates (any FAIL → Thesis Fit = 0, unchanged).

### 5.2 What Scout does with the mapped baseline

- **Delta tracking restored as-is:** mapped values are the per-dimension baseline;
  ↑/→/↓ retains its meaning.
- **Thesis Fit preserved, reimplemented:** same purpose (rule-based NWA-criteria
  fit), same pairing against Scout Conviction (/19), same divergence-is-signal
  interpretation and thresholds. Input = mapped carry-forward instead of printed
  Triage scores. ⚠️ **Implementation item:** scout.md carries Opportunity /25 +
  Readiness /20 (= /45) — a subset of the 30/25 Triage totals. Confirm which
  dimensions the subset comprises against scout.md and make the rubric produce those
  exact denominators.
- **Explained-divergence rule (new):** when Scout's own score departs from the
  mapped baseline by ≥2 on any dimension, the Score Summary must carry a one-line
  explanation. Same spirit as verdict invariance — divergence is fine, silence about
  it is not.

### 5.3 Rubric calibration step (before freezing)

Run the four back-test deals' V13 outputs through the proposed table and compare the
mapped sums against their original numeric Triage scores (Captain Compliance 22/30 +
23/25; others per their reports). Adjust the table once so mappings land within ±2
of the historical numbers on non-divergent dimensions (divergences the back-test
already adjudicated — e.g., Synergist post-March world change — are expected and
excluded). Freeze the calibrated table in the dedicated seam reference
`references/screen-scout-conversion-rubric.md` (NEW file — Jamie ratified Option B,
July 11, 2026) with a version line and the calibration record documented alongside
the table. `scout.md` loads and applies it mechanically at intake, the same way it
loads `scout-questions.md`. `screen.md` never loads it — the number never appears
at Screen.

---

## 6. Workstream C — Alpha-AI Sovereignty Phase 2 Install

Execute the framework's own install spec (authoritative:
`references/alpha-ai-sovereignty-framework.md` § "Pipeline Hooks — Phase 2 Install
Spec" + its 12-item checklist). One deviation to record: at **Screen**, the Phase 2
trip-wire design is superseded by its V13 evolution — Signal 6 Protect Alpha with the
KEEPS/MIXED/LEAKS/N/A read (still routing-only, no weight; trip-wire triggers become
the flag conditions). Scout Q8, Diligence Tier 4, DD Report mapping, and agent-file
additions install exactly as specced.

**The 5 open calibration questions — RESOLVED (Jamie, July 11, 2026):**

1. "Leaking" label member-facing? — **KEEP.** LEAKS printed in V13 test reports
   without friction; the basis line explains what flows and where, so the label
   lands as a finding. Matches the blunt-verdicts house style.
2. Conduit Strong Yellow caps — **KEEP the 3/5 cap** for a roadmapped sovereign path
   (2/5 unaware). A roadmap is a deck claim; Cynical Default applies. Verified
   containment clears the cap at Diligence Tier 4, not at Screen/Scout.
3. Tier 4 gating — **GATED** to model-supply-chain deals only. Tier 3 is universal
   because agents reshape demand for every product; Tier 4's mechanism requires a
   model supply chain. Non-AI deals record "N/A — no model supply chain."
4. Replicability Matrix — **ANNOTATION** on the LLM-provider row, not a fifth row.
   Same threat actor, new information channel; a fifth row would double-count and
   could fire a second flag, violating the framework's no-double-count rule.
5. Standing Appendix-A provider-terms item for ALL AI deals — **YES**, effective at
   install. One template line in the dd-report format edit; converts an invisible
   structural risk into a named diligence item; no scoring impact.

---

## 7. Workstream D — Agent-Era Screen Upgrade

- `screen.md`: Exposure Signal row (FLAGGED/CLEAR trip-wire) replaced by Signal 5
  posture verdict — THREATENED/RIDING/ENABLING/INSULATED, SIGNIFICANT weight,
  THREATENED = adverse.
- `gates-and-flags-techgroup.md`: Exposure Signal subsection rewritten as the posture
  verdict spec (doorway question retained as the entry read; adverse definition =
  THREATENED only; confidence caps and screen-stage humility apply).
- Scout Q7 and Diligence Moat Tier 3: **no change.** Screen's posture is the prior;
  Scout still scores it properly.
- Rationale on record: the upgrade ran inside the ratified V13 back-test; guardrails
  against wrong kills at 3-search depth are rules 1, 7, and the UNVERIFIED cap.

---

## 8. Workstream E — Documentation & Packaging

| File | Change |
|---|---|
| `CLAUDE.md` | Screening stage definition (Six-Signal verdict model); Terminology table (Universal Triage row gains TechGroup-deviation note; add Six Signals / Triage Conviction / Protect Alpha entries); Output Depth table Screening row; Investing Voice gains fourth lens (Alpha — per Alpha checklist item 8); Key Frameworks: Craft thesis entry, Alpha activation, Agent-Era Screen note |
| `SKILL.md` | Framework list: Alpha added, Craft design-basis noted, screener description updated (keep the no-duplicate-numbers discipline — mechanics live in the references) |
| `gates-and-flags.md` | One-line TechGroup deviation note only — otherwise untouched (universal standard for other groups) |
| `gates-and-flags-techgroup.md` | Restructured per §4.7 |
| `scout-questions.md` | Q8 per Alpha spec |
| `references/screen-scout-conversion-rubric.md` | **NEW** — the frozen seam rubric (§5.1 table + calibration record + version line); single source of truth for the Screen→Scout translation |
| `scout.md` | Intake step: load + mechanically apply the conversion rubric reference; Thesis Fit input rewording; explained-divergence rule; Score Summary Q8 row |
| `diligence.md` / `diligence-scoring-rubrics.md` | Carry-forward wording (signal verdicts instead of scores); Tier 4 + agent assignments per Alpha spec |
| `dd-report.md` / `dd-report-format-reference.md` | Carry-forward wording; Alpha Section 3 companion line, §4/§10 feeds, Appendix A standing item |
| Agent files (technology / risk / competitive-positioning) | Scoped Alpha additions per its checklist |
| `alpha-ai-sovereignty-framework.md` | Remove DRAFT banner; record the V13-evolved Screen deviation |
| Craft thesis | Already promoted (done July 11); operative encoding lands in screen.md with a traceability pointer to the thesis |
| `nwai-techgroup-pipeline-architecture.md` | Version bump v0.37.0 → **v0.38.0**; stage diagram, commands table, reference-docs table, flow example |
| `pipeline-decisions-log.md` | One consolidated entry: the five decisions, rationale, what did NOT change (Scout-onward scoring, DD Report format, other groups, Dealum-deferred status) |
| Plugin | Repackage via `repackage-plugin.sh`; version v2.23.0 → **v3.0.0** (major: stage-architecture change). No MCP changes → **no reinstall instruction** |
| Workbench (ClaudeProjects) | Closing decision-log row: Phase 5 executed, spec location, sandbox program complete |

---

## 9. Proof Plan (runs inside the implementation session, before commit)

1. **Screen regression — the back-test three through the new `/screen`** (pipeline
   surface, deal folders as input). Expectations (ratified ledger):
   Captain Compliance **ADVANCE/MEDIUM** · STL **ADVANCE/MEDIUM** · Synergist
   **ADVANCE/MEDIUM**. Krew **waived** (Jamie, July 11, 2026 — consistent with its
   sandbox waiver; not a material regression case). Any flip = drift; stop and
   adjudicate.
2. **Rule-traceability check:** every §4.3 rule located in the new screen.md; every
   V13 self-check item present or deliberately adapted.
3. **Rubric calibration** per §5.3.
4. **End-to-end seam test:** Captain Compliance new-Screen output → `/scout` intake —
   conversion rubric applied, deltas render, Thesis Fit computes, divergences
   explained. (Scout verdict itself should match its historical call.)
5. Then: architecture doc, decisions log, repackage, **commit and push** (2-step,
   on main).

---

## 10. Out of Scope / Parked (deliberate, on the record)

- **Craft at Scout (scoring-boundary option b):** parked. Re-evaluation trigger:
  after ~1 quarter of live screening under the new boundary, or if the seam rubric
  proves to be theater rather than signal.
- **Other five groups:** untouched; Universal Triage Framework remains their
  standard. Revisit only when a second group's playbook goes operational.
- **claude.ai test bench:** Jamie's personal experimentation surface; no operational
  standing; V13 file remains the sandbox record.
- **Dealum integration:** still deferred; Step 10 tag vocabulary is aspirational,
  deal-folder state remains canonical.
- **DD Report / Decision / Memo formats:** unchanged except the Alpha mappings (§6).

---

## 11. Open Items for the Implementation Session

1. Confirm the Thesis Fit /25 + /20 dimension subset against scout.md and align the
   rubric denominators (§5.2).
2. ~~Alpha calibration questions~~ — **RESOLVED (July 11): all five ratified by Jamie
   as recommended** (rulings recorded in §6).
3. ~~Krew regression expectation~~ — **RESOLVED (July 11): waived by Jamie;** regression
   set is the back-test three (§9.1).
4. ~~Craft operative encoding~~ — **RESOLVED (July 11): embedded in screen.md with a
   traceability pointer to the thesis** (Jamie ratified the recommendation).
5. ~~Conversion rubric location~~ — **RESOLVED (July 11): dedicated seam reference
   `references/screen-scout-conversion-rubric.md`** (Option B; single-source-of-truth
   pattern), loaded by scout.md only.

**Only item 1 remains, and it is an implementation-session task (Claude's), not a
decision (Jamie's). The spec is fully calibrated.**

---

*Prepared July 11, 2026 — from the V13 sandbox program (workbench: Phase 5) and
Jamie's ratified decisions of the same date. Implementation: plan-mode session
executing this spec, then §9 proof plan, then commit.*
