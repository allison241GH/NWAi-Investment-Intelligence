# NWA Scout Questions & Assessment Framework

## Overview

Scout assessment runs in two phases plus four strategic dimensions not scored at Triage.
Phase 1 assesses deal viability. Phase 2 assesses execution and defensibility. Four strategic
dimensions (Ecosystem Role, Adjacent Displacement Risk, Macro Tailwind, Agent-Era Readiness) add
analytical depth that Triage cannot evaluate from pitch materials alone.

Every Scout produces a **Scout Conviction Score** — a composite numeric signal that becomes
the starting hypothesis handed to the Diligence team. Diligence either confirms it or moves it.

---

## Scoring Scale (all dimensions unless noted)

| Score | Definition |
|-------|-----------|
| 5 | Exceptional — clear, evidence-backed signal |
| 4 | Strong — credible signal with minor gaps |
| 3 | Acceptable — present but not differentiated |
| 2 | Weak — thin signal, speculative |
| 1 | Very Weak — almost absent |
| 0 | Absent — no evidence |

**Delta from Triage:** For dimensions that overlap with Triage Opportunity scoring, show
↑ (raised from Triage) / → (confirmed) / ↓ (lowered) alongside the Scout score.

---

## Phase 1: Viability — Scored Dimensions

### Q1: Category & Market Discontinuity
*Triage overlap: Structural Discontinuity (D1) — show delta*

Score on: Is this creating a new mandatory/structural product category, or optimizing an
existing one? What is the product lifecycle horizon (5-year regulatory window vs. 10-year
platform)? Is the structural shift genuine and irreversible, or incremental improvement
dressed as disruption?

| Score | Criteria |
|-------|---------|
| 5 | Creating a new mandatory category (regulatory/behavioral/tech mandate); 10-year platform play; category-creating structural shift — the rules of the game are changing |
| 4 | New use case in a growing category; first mover in a structural sub-segment; 5-7yr window clearly identified |
| 3 | Real "why now" but evolutionary rather than discontinuous; established category with room for a new entrant |
| 2 | Existing category optimizer; timing argument is weak or equally valid 3 years ago |
| 1 | Late entrant to a mature category; no clear timing thesis |
| 0 | No category awareness; incremental product with no timing logic |

### Q1b: Demand Signal Test *(new — not scored at Triage)*

Score on: Is this a demand-pull market (buyers actively seeking solutions) or technology-push
(vendor creating a category buyers haven't asked for)? Demand-pull markets have regulatory
mandates, active RFPs, enterprise budget allocation, and public buyer statements. Technology-push
markets rely on vendor evangelism to create awareness. This dimension is the market-side
complement to Q1's structural discontinuity test.

Required outputs before scoring:
- **Demand type:** DEMAND-PULL / TECHNOLOGY-PUSH / MIXED
- **Evidence:** [2–3 specific signals: regulatory mandates, buyer public statements, RFP/procurement activity, analyst category creation, budget allocation surveys]
- **Strongest signal:** [one sentence — what is the single strongest evidence of buyer demand?]

| Score | Criteria |
|-------|---------|
| 5 | Hard regulatory deadlines driving procurement; active RFPs and contract awards; enterprise budget lines created; CISOs/CTOs publicly citing need; analyst firms tracking as distinct category |
| 4 | Strong regulatory tailwind with clear deadlines; enterprise buyers aware and budgeting; analyst coverage emerging; some RFP/procurement signals |
| 3 | Regulatory interest but no hard deadlines yet; buyer awareness growing but budgets not yet allocated; market is forming but not yet pulling |
| 2 | Vendor-driven awareness; no regulatory mandate; buyers acknowledge the problem conceptually but are not actively procuring; speculative category |
| 1 | Pure technology push — vendors are creating awareness; buyers are not asking for this; no procurement activity |
| 0 | No evidence of buyer demand from any source |

⚠️ Score ≤ 2 triggers a Yellow Flag: "Demand signal weak — technology-push risk. Validate
with direct buyer interviews before advancing to Diligence."

→ **Agent support:** The `market-analyst` agent should include demand-signal research in its
output: public CISO/CTO statements, procurement activity (SAM.gov for federal deals), analyst
category reports, and enterprise budget allocation surveys for the relevant market.

### Blue Ocean Read *(synthesis node — not separately scored; bundles Q1 market-creation + Q5 substitution)*

A single explicit decision: classify the ocean, then — only if it is **not** Blue — force the
adjacent-set and differentiation reads.

- **Ocean type:** BLUE (first to *define* a market — creating a category) / CONTESTED (first to
  *market* in an existing or forming category — a head start, not a new ocean) / RED (late entrant
  to a crowded market)
- **If BLUE:** name the category being created and the one piece of evidence it's real, not a
  story. *(Cross-check Q1b — a "blue ocean" with no demand-pull is technology-push, not a new market.)*
- **If CONTESTED or RED (required):**
  - **Adjacent set:** the 2–4 closest companies/technologies solving this job (from Q5 functional
    equivalents + `competitive-positioning-analyst`)
  - **Differentiation claim:** the company's stated wedge in one line — with a blunt verdict on
    whether it's a *moat* or merely a *feature/positioning* difference

Blue Ocean is not automatically better — a *defended* position in a Red Ocean beats an
*undefended* Blue Ocean. The point is to force the question, and when it isn't Blue, to make the
differentiation claim explicit and testable rather than assumed.

---

### Q2: Market Opportunity
*Triage overlap: Market Opportunity (D2) — show delta*

Score on: TAM credibility (bottoms-up validated, not founder claim alone), SAM support for
10x return, market growth trajectory. Required: one line of numbers — TAM | SAM | 5yr capture.

| Score | Criteria |
|-------|---------|
| 5 | $5B+ TAM validated by third-party data; strong growth; SAM clearly supports 10x |
| 4 | $1-5B TAM; growing market; SAM plausibly supports 10x |
| 3 | $500M-$1B TAM; moderate growth; tight but possible |
| 2 | TAM inflated beyond credibility or <$500M; growth uncertain |
| 1 | Market too small or contracting |
| 0 | No sizing provided and web research finds no venture-scale market |

### Q3: Moat Assessment
*Triage overlap: Defensibility Signal (D4) — show delta*

Use the AI Moats Framework as the analytical reference. Do not enumerate moat types by number
or produce a checklist of moat elements. Produce a single distilled 4-column table verdict —
the output is a judgment, not a tour through framework categories.

Required reads before the verdict (the two sustainable-advantage tests — one line each):
- **Training edge:** PRESENT / ABSENT — [proprietary source, or "none — public data only"]
- **Inference edge:** PRESENT / ABSENT — [cost/latency/serving source, or "none — full pass-through"]

| Primary Moat | Strength | Primary Threat | Verdict |
|---|---|---|---|
| [Data flywheel / Workflow lock-in / Network effects / Inference economics / Capital-Compute / None] | [Weak / Emerging / Strong] | [one phrase] | [one sentence] |

Rating: STRONG / DEVELOPING / WEAK / NONE
Moat maps to Scout Conviction composite as: STRONG=5 / DEVELOPING=3 / WEAK=1 / NONE=0

---

## Strategic Dimensions (not scored at Triage — introduced at Scout)

### Q4: Ecosystem Role

Score on: Is this company building the platform others depend on, or built on top of someone
else's platform? Creator = others build on this. Follower = built on others' platforms.
This determines whether the company sets the rules or plays by them.

| Score | Criteria |
|-------|---------|
| 5 | Clear platform creator; ecosystem flywheel forming; others depend on this infrastructure |
| 4 | Significant workflow integration creating dependency; partial ecosystem leverage |
| 3 | Participant in ecosystem; some integration depth but limited platform leverage |
| 2 | Follower on established platform; limited differentiation beyond UI or workflow layer |
| 1 | Pure API consumer; no proprietary layer; platform risk is immediate and high |
| 0 | N/A — non-platform, non-ecosystem business model |

### Q5: Adjacent Displacement Risk *(inverted: 5 = lowest risk)*

Score on: Are there functionally equivalent solutions or emerging technologies that could
displace this company even if it wins its direct competitive set?

Three required outputs before scoring:
- **Core use case:** [one sentence — what job is this product hired to do?]
- **Functional equivalents:** [list of alternatives that solve the same job differently]
- **Emerging displacement:** [what technology or player could make this obsolete, and when?]

| Score | Criteria |
|-------|---------|
| 5 | No credible adjacent or emerging threat within 5 years; moat is durable against substitution |
| 4 | Adjacent threats exist but require substantial capital or time to enter |
| 3 | Adjacent threat possible within 3 years; moat needs active development to hold |
| 2 | Well-resourced adjacent player (Big Tech) could ship a comparable within 18 months |
| 1 | Displacement risk imminent; hyperscaler or incumbent already shipping a functional equivalent |
| 0 | Direct Big Tech competition already in market with superior resources and distribution |

### Q6: Macro Tailwind

Score on: Do the four macro dimensions support the investment thesis over a 10-year horizon?
Required: one line per dimension (Customer / Technology / Regulatory / Economic), then score.

| Dimension | 10-yr Direction | Thesis Impact |
|---|---|---|
| Customer | | Tailwind / Neutral / Headwind |
| Technology | | |
| Regulatory | | |
| Economic | | |

| Score | Criteria |
|-------|---------|
| 5 | All four macro dimensions are clear tailwinds; thesis is macro-reinforced across the board |
| 4 | 3 of 4 macro dimensions favorable; one neutral or minor headwind |
| 3 | Mixed — meaningful tailwinds but real headwinds on 1-2 dimensions |
| 2 | Primarily headwinds; investment thesis depends on reversing a macro trend |
| 1 | Strong macro headwinds across multiple dimensions |
| 0 | All four macro dimensions are headwinds or actively hostile to the thesis |

### Q7: Agent-Era Readiness

*Full framework: `references/agent-era-readiness-framework.md` (the third always-active lens).*

Score on: Does the founder solve the problem *as AI agents will reshape it* — or as it exists
today? Apply the **doorway question** (*"information for a human to act on, or a transaction for an
agent to complete?"*) and the three test dimensions (Problem Reimagination · Position in the Agent
Economy · Agent-Era Moat), then classify the **posture**. This is the agent-era durability test;
it is broader than Q5 (which tests adjacent/competitor displacement) — Q7 tests whether the
*problem itself* survives the substrate shift.

Required outputs before scoring:
- **Doorway read:** [one sentence — who/what consumes the value as agents proliferate?]
- **Does the agent wave help or hurt this company?** Answer HELPS / HURTS / MIXED in plain
  language, then — if it isn't already in its strongest position — add **"Could get stronger if:"**
  (the one concrete thing that would make it more durable) and **"What to watch:"** (the milestone
  to look for). Keep the internal posture label (Threatened / Riding / Enabling / Insulated) for the
  deal-team line only; members read the plain help/hurt sentence.

| Score | Criteria (internal posture in brackets) |
|-------|---------|
| 5 | Agents clearly **help** — the company is building for the reimagined problem; agents make it *stronger*; durable agent-era moat. [Riding or Enabling] |
| 4 | Agents **help**, with minor exposure; the position is holding [Riding / Enabling] |
| 3 | Mixed — aware and partly positioned; holds up near-term, the decade-out picture unproven [Adapting] |
| 2 | Meaningful exposure — largely solving today's problem; weak or unproven agent-era moat |
| 1 | Agents **hurt** — solving a problem they are likely to dissolve within the hold period; rebuttal is weak [Threatened] |
| 0 | Agents **hurt** badly — no reckoning with the shift; in the path of dissolution with no credible route to a stronger position [Threatened] |

Report the score with the plain help/hurt read (e.g. "2/5 — agents hurt the core product today, but it could get stronger if it opens the engine to agents; watch the roadmap").

### Q8: Alpha-AI Sovereignty

*Full framework: `references/alpha-ai-sovereignty-framework.md` (the fourth always-active lens).
Added July 2026 following the June 2026 Q7 precedent. Screen's Protect Alpha read (Signal 6:
KEEPS / MIXED / LEAKS / N/A) is the prior — Scout scores the lens properly here.*

Score on: Does the company keep its alpha — and its customers' — out of the frontier labs' hands?
Apply the **doorway question** (*"When this product runs, where does the alpha flow — does it stay
home, or drain up to the lab?"*), then work the three reads. This is distinct from Q7 (does the
problem survive agents?) and from the moat replicability tests (could outsiders rebuild it?) —
Q8 tests *direction of alpha flow and dependency posture*. Score N/A (excluded from the Strategic
raw total, noted in the report) only if the product has no model supply chain.

Required outputs before scoring:
- **Alpha Map:** [one sentence — what the company's alpha actually is (data, workflow, harness,
  customer trust) and what transits the model provider when the product runs]
- **Dependency Read:** provider(s) + abstraction-layer reality, with provider-terms status
  stated as **VERIFIED / CLAIMED / ABSENT** (no-train / zero-data-retention, tier, exclusions)
- **Customer Sovereignty Read:** does the go-to-market survive buyers demanding their data,
  weights, and inference stay inside their boundary — or is the product a conduit for customer
  alpha?
- **Member-facing block:** the plain read — **KEEPS / MIXED / LEAKS** — plus, when not already
  in the strongest position, **"Could get stronger if:"** (the one concrete containment move) and
  **"What to watch:"** (the confirming milestone). Keep the internal posture label
  (Leaking / Hedged / Sovereign / Enabler) for the deal-team line only.

| Score | Criteria (internal posture in brackets) |
|-------|---------|
| 5 | Alpha stays home — architecturally contained, model-portable, sovereignty-aligned; or the company sells sovereignty itself [Sovereign or proven Enabler] |
| 4 | Strong hedge — containment **verified** (terms confirmed, abstraction demonstrated), sovereign path costed [strong Hedged] |
| 3 | The normal early posture — builds on frontier APIs with credible containment direction; terms claimed, path roadmapped [Hedged] |
| 2 | Meaningful uncontained leakage, or conduit-for-customer-alpha with awareness but no costed path |
| 1 | Leaking with a weak rebuttal — differentiator transits a single provider unprotected, no containment plan [Leaking] |
| 0 | Structurally feeding its own predator — data-sharing with a lab shipping into the category, or a business model sovereignty demand forbids [Captured] |

**Conduit cap (calibrated July 2026):** a Customer-Alpha Conduit finding (customers' regulated/
proprietary data piped through frontier APIs via the product) caps Q8 at **3/5 when a sovereign
path is roadmapped** and **2/5 when the founder is unaware of the exposure**. A roadmap is a deck
claim — Cynical Default applies; only *verified* containment clears the cap, and verification
happens at Diligence Tier 4, not at Scout.

Report the score with the plain read (e.g. "3/5 — MIXED: the harness logic stays local but customer
call data transits OpenAI; could get stronger if the roadmapped VPC deployment ships; watch for the
first regulated-industry logo on it").

---

## Phase 2: Execution — Scored Dimensions

Each item = one line in the output. No paragraph explanations.

### Team — Product-Team Fit + Market-Team Fit (Score 0-5)
*Triage overlap: Founder Advantage (D3) — show delta*

One line: domain credibility rating (STRONG / ADEQUATE / WEAK) + key strength + key gap.

**Five required sub-assessments** (sourced from `team-analyst` agent in **scout mode** — lite verdicts; Staff Deep-Dive and Network Map are skipped at Scout stage):

- **Product-Team Fit verdict:** One-line STRONG / MODERATE / WEAK from team-analyst — can this team BUILD and SHIP this product? (engineering depth, technical credibility, prior shipping evidence)
- **Market-Team Fit verdict:** One-line STRONG / MODERATE / WEAK from team-analyst — can this team SELL into this market? (domain immersion, sales motion fit, market-specific credibility)
- **Team commitment depth:** Full-time ratio from team-analyst (e.g., "6 of 8 listed = full-time, 75%"). Flag if <60% full-time. Flag advisors who appear "stuck" (passive logos with no engagement signals).
- **Key-Seat Completeness verdict:** One-line from team-analyst (e.g., "5 of 6 seats filled or stage-appropriate, with gaps in: Head of Sales"). Stage-appropriateness is baked in — a Seed-stage company with no CFO is stage-appropriate, not a gap.
- **Founder claim verification:** Status from team-analyst's People Verification Brief. Flag if any UNVERIFIED or CONTRADICTED specific claims (e.g., exit returns, ARR, prior roles).

Flag immediately if:
- Founders are part-time or IP is not cleanly assigned to the company
- Any founder claim is **❌ CONTRADICTED** by public sources (treat as red flag for the diligence call)
- Team commitment ratio is **<40% full-time** (red flag)
- Either **Product-Team Fit OR Market-Team Fit is WEAK** — surface the specific lens (it changes the diligence question: build-side WEAK → engineering hire risk; market-side WEAK → GTM/relationship risk)
- Any **stage-inappropriate Key-Seat gap** (🔴) — e.g., Series A with paying customers and no Head of Sales

| Score | Criteria |
|-------|---------|
| 5 | Domain expert with prior exit (verified); both Product-Team Fit AND Market-Team Fit STRONG; full-time commitment ≥80%; Key-Seat Completeness: all filled or stage-appropriate; all founder claims verified |
| 4 | Strong domain background; execution evidence verified; both fit lenses STRONG or one STRONG + one MODERATE (no WEAK); commitment ≥60% full-time; Key-Seat: at most one ⚠️ with credible hiring plan |
| 3 | Relevant background; one fit lens MODERATE with one fillable gap; commitment ≥60% full-time; minor unverified claims; Key-Seat: one ⚠️ |
| 2 | Thin domain connection or first-time founder; one fit lens WEAK (specify Product-side or Market-side); commitment <60% full-time OR multiple unverified founder claims; Key-Seat: one 🔴 stage-inappropriate gap |
| 1 | Background disconnected from problem; both fit lenses WEAK; commitment <40% full-time; or any contradicted founder claim; Key-Seat: multiple 🔴 gaps |
| 0 | No founder information available |

> **Note on Diligence-stage consumption:** at Diligence stage, the team-analyst runs in `diligence` mode which produces per-founder dimensions, team-level synthesis, Staff Deep-Dive, Network Map, and full Key-Seat Completeness table — feeding the deeper Execution Risk rubric in `diligence-scoring-rubrics.md`. Scout-stage scoring uses only the lite verdicts above.

### Technology (Score 0-5)

One line: TRL rating (must be ≥ 5) + whether thin wrapper or deep IP + biggest replication risk.

| Score | Criteria |
|-------|---------|
| 5 | TRL 7-9; deep proprietary IP; replication requires 2+ years and substantial capital |
| 4 | TRL 6-7; meaningful proprietary layer; 12-18 month replication window |
| 3 | TRL 5-6; some proprietary elements; replication possible within 12 months |
| 2 | TRL 4-5; thin wrapper risk present; replication possible within 6 months |
| 1 | TRL < 5; API orchestration only; replicable in weeks |
| 0 | Pre-product or academic only; no deployed technology |

### Traction (Score 0-5)
*Triage overlap: Traction Signal (D5) — show delta*

One line: revenue or pipeline figures + named customers + one retention or expansion signal.

| Score | Criteria |
|-------|---------|
| 5 | Paying customers with strong retention/expansion; credible ARR; named logos |
| 4 | Paying customers; ARR exists; pipeline visible but conversion uncertain |
| 3 | Active beta with engagement signals; LOIs or pilots; no ARR yet |
| 2 | Waitlist or expressed interest; no willingness-to-pay validation |
| 1 | No traction evidence beyond founder assertion |
| 0 | Pre-product with no market contact |

### GTM / Path to $10M (Score 0-5)

One line: GTM motion (channel / enterprise / PLG) + key milestone between now and $10M + CAC/LTV if known.

| Score | Criteria |
|-------|---------|
| 5 | Proven GTM motion; clear ICP; efficient CAC; scalable channel with evidence |
| 4 | GTM works at early stage; CAC reasonable; channel concentration risk present |
| 3 | GTM defined but not yet proven at scale; path to $10M depends on unverified assumptions |
| 2 | GTM unclear or dependent on a single unproven channel |
| 1 | No clear GTM plan or evidence of sales capability |
| 0 | No revenue model defined |

### Exit (not scored numerically)

Top 3 acquirers only — one line each with rationale. State hold period and whether
10x in 5 years is viable: YES / STRETCH / UNLIKELY.

---

## Scout Conviction Score

Calculate after completing all Phase 1, Strategic, and Phase 2 dimensions.

| Dimension Group | Dimensions | Max Raw | Weight | Weighted Max |
|---|---|---|---|---|
| Phase 1 (Q1 + Q1b + Q2 + Q3 mapped) | 4 dims | 20 pts | 40% | 8.0 |
| Strategic (Q4 + Q5 + Q6 + Q7 + Q8) | 5 dims | 25 pts | 20% | 3.0 |
| Phase 2 (Team + Tech + Traction + GTM) | 4 dims | 20 pts | 40% | 8.0 |
| **Total** | | | **100%** | **19.0** |

*Strategic group now carries 5 dimensions (Agent-Era Readiness added June 2026; Alpha-AI Sovereignty added July 2026) within the same 20% weight and 3.0 weighted-max — the composite total and the conviction bands below are unchanged. If Q8 is N/A (no model supply chain), the Strategic raw total is /20 for that deal; the weighted-max stays 3.0.*

*Moat rating maps to composite: STRONG=5, DEVELOPING=3, WEAK=1, NONE=0. Exit not included.*

| Score | Signal |
|---|---|
| 16-19 | High conviction — advance with confidence |
| 11-15 | Moderate conviction — advance with specific watch items named |
| 7-10 | Low conviction — Watch only if specific catalyst is imminent; name the trigger |
| < 7 | Insufficient conviction — Decline |

---

## TechGroup Theme Mapping

After completing all dimensions, assign to one primary TechGroup theme:

| Theme | Key Signals |
|-------|-------------|
| 1. AI Infrastructure & Agent-Era Backbone | Inference infrastructure, edge compute, data pipelines, location/geospatial data layers, data centers, telco/networking, agent-consumed foundational tech |
| 2. SW Enabled HW, Physical AI & Robotics | Drones, autonomous vehicles, robotics, spatial computing, smart manufacturing, additive mfg, AI vision |
| 3. WorkTech & Vertical AI OS | AI-native vertical workflow reimagination, EdTech, MedTech, LegalTech, GovTech, field services — agent-era unit economics required |
| 4. Data Sovereignty, Security & AI Trust | Cybersecurity, cryptography, AI governance, model security, hallucination guardrails, provenance, compliance, agent behavior monitoring |
| 5. Agentic Systems & AI Ops | Agent orchestration, agent-to-agent protocols, AI observability, deployment pipelines for agent fleets, manager-of-agents tooling |

Lead and SMEs: Output as "TBD — Pending Dealum API" for both.

---

## Scout Assessment Report Format — Signal-First Member Format (v2.1, July 2026)

**Design rule: the report is organized around what a member reviews — key signals, insights, actions — not around the scoring machinery.** The Six-Signal vocabulary carries forward from Screen: Scout deepens the *same six signals* with scores and independent research evidence, so members read one signal language across the funnel. Each decision question renders exactly once; scoring machinery (mapped baselines, deltas, arithmetic, supporting reads, sources) lives in the deal-team appendix. *(v2 ratified July 16, 2026 — pipeline-decisions-log.md Decision 11; v2.1 same day added the analyst-voice rendering rules below. Replaces the v1 "2-Page Scorecard/Rationale" design.)*

**The analyst-voice rule (binding for every synthesis cell in this report):** Scout is a 30-minute decision brief answering *advance to diligence or not*. Findings live in the agent briefings and the appendix; the member surface carries **judgments**. Every sentence in a synthesis cell must do one of three jobs — (a) make a judgment, (b) state the single fact the judgment stands on, or (c) name what it means for the deal. A sentence that merely reports findings is cut or demoted to the appendix. Synthesis cells: **insight sentence first, ≤ 60 words**, citation markers attached to anchor facts only. Write the "so what," not the dissertation.

**Dimension → home map (each scored dimension renders exactly once):**

| Scored dimension | Renders in |
|---|---|
| Q1 Category & Market Discontinuity + Q1b Demand Signal + Blue Ocean read | Signal 1 · Discontinuity |
| Q2 Market Opportunity + Q6 Macro Tailwind + TAM/SAM/SOM | Signal 2 · Market (conclusion only — numbers and macro one-liners in Appendix B2) |
| Phase 2 Team (PT-fit, MT-fit, commitment, key seats, claim verification) | Signal 3 · Team |
| Q3 Moat + Q4 Ecosystem Role + Q5 Adjacent Displacement + Adjacent & Emerging Tech + moat-side Technology (TRL, wrapper, replicability) | Signal 4 · Moat |
| Q7 Agent-Era Readiness | Signal 5 · Agent-Era |
| Q8 Alpha-AI Sovereignty | Signal 6 · Protect Alpha |
| Traction · GTM/Path to $10M · Technology delivery (shipping risk) · Exit | Execution & Path table |

*Technology splits deliberately: "can they defend it" (TRL/wrapper/replicability → Signal 4) and "can they ship it" (delivery risk → Execution & Path) are different member questions. The Technology 0–5 score prints once, in Execution & Path.*

### Member surface (~2 pages)

**1 · Analyst Verdict** (first block — structured fields, no paragraphs):
```
Recommendation:            ADVANCE TO DILIGENCE / WATCH / DECLINE
One-Sentence Verdict:      [blunt, IC-ready — required Scout element]
Single Biggest Risk:       [what kills this company — required Scout element]
Conviction (what the research supports):  [X/19 — band] + one plain line
Criteria Fit (does it fit what NWA funds): [X/45 — band] + one plain line
[Divergence note — ONLY when the two scores disagree by more than one band:
 one line on what the divergence means for the decision. Omit when convergent.]
What You Have to Believe:  [one sentence]
Where's the Bet:           [one sentence]
Fear:                      [one phrase]   Greed: [one phrase]
```
*If the Step 4c credibility cap fired (any WALKED BACK claim), the ⚠️/❌ founder-credibility line appears here — not only in Flags.*

**2 · The Six Signals — Scout depth.** Rendered as a **3-column table** for scanning:

```
| # · Signal | Verdict · Score | Synthesis — the "so what" |
```

One row per signal. Verdict cell carries the verdict word + score chip(s) (e.g., `DIFFERENTIATED · Q1 4/5 · Demand 4/5`; Team adds the structural read, e.g., `hired, not founder-born`). Synthesis cell follows the analyst-voice rule (≤ 60 words, insight first). Signal-specific requirements:
- **Signal 3 Team leads with the highest structural signal** (e.g., founder-born vs. institution-conceived/hired leadership; solo founder; split commitment) before fit and gaps — the "so what" of who is running this company.
- **Signals 5 and 6** lead with the plain member answer (*helps/hurts* · *keeps/leaks*); posture labels stay on the deal-team line in the appendix.
- **No per-signal "Probe next" lines** — every probe routes to Diligence Questions & Next Actions (one home for questions).
- Supporting detail — TAM|SAM|SOM numbers, the four macro one-liners, the moat two-test results, replicability timings — lives in **Appendix B2 · Supporting reads**, not in the synthesis cells.

**3 · Execution & Path.** Opens with a mandatory **GTM Model line**: name the go-to-market model in plain words, then its consequences given the other facts of this deal (`Model: [motion]. Consequence: [what that model means for speed, scalability, and risk here].`). Then the table (Dimension | Score | Assessment — analyst voice, same three-jobs rule): Traction, GTM/Path to $10M, Technology (delivery), Exit (unscored: top 3 acquirers, hold period, 10x YES/STRETCH/UNLIKELY — with the consequence of missing the window).

**4 · Founder Claims Reconciliation** *(only when Step 4c ran)*: result line (N confirmed / N qualified / N walked back → cap fired or not) + the Claim | New-Material Reality | Classification table. Promotes into block 1 when the cap fires.

**5 · Flags** — ❌ Red / ⚠️ Yellow, one line each.

**6 · Diligence Questions & Next Actions** — 3–5 numbered questions (≥1 targets a load-bearing Reported/Unverified claim per the Citation Contract; absorbs every probe raised by the signals), then: who to engage, what to request, and the pipeline line (Dealum step / tags / next action).

### Deal-team appendix (not member surface)

- **A · Triage Carry-Forward** — Screen verdicts + Triage Conviction, gates, prior flags, and the mapped per-dimension baseline via `references/screen-scout-conversion-rubric.md`. *(Legacy numeric Triage Reports carry their historical dimension scores directly.)*
- **B · Score Summary** — the 13-row Dimension | Triage (mapped) | Scout | Delta table, unchanged mechanics: ↑/→/↓ for baseline-overlapping dimensions, NEW for the rest, one-line explanation required on any ≥2 divergence.
- **B2 · Supporting reads** — TAM | SAM | SOM numbers line; the four macro one-liners (Customer / Technology / Regulatory / Economic → Tailwind / Neutral / Headwind); moat two-test results (Training / Inference edge); replicability timings; posture deal-team lines for Q7/Q8.
- **C · Scoring arithmetic** — the weighted group math for Scout Conviction and Criteria Fit (Thesis Fit).
- **D · Sources** — the merged, renumbered Citation Contract list; every inline `[n]` in the report resolves here.

```
DEALUM STEP TO UPDATE: Scout/IntroCall
SUGGESTED TAGS TO ADD: [theme name]
NEXT ACTION: /diligence [Company Name]
```
