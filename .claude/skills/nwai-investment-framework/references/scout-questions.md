# NWA Scout Questions & Assessment Framework

## Overview

Scout assessment runs in two phases plus three strategic dimensions not scored at Triage.
Phase 1 assesses deal viability. Phase 2 assesses execution and defensibility. Three strategic
dimensions (Ecosystem Role, Adjacent Displacement Risk, Macro Tailwind) add analytical depth
that Triage cannot evaluate from pitch materials alone.

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

| Primary Moat | Strength | Primary Threat | Verdict |
|---|---|---|---|
| [Data flywheel / Workflow lock-in / Network effects / Capital-Compute / None] | [Weak / Emerging / Strong] | [one phrase] | [one sentence] |

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

---

## Phase 2: Execution — Scored Dimensions

Each item = one line in the output. No paragraph explanations.

### Team (Score 0-5)
*Triage overlap: Founder Advantage (D3) — show delta*

One line: domain credibility rating (STRONG / ADEQUATE / WEAK) + key strength + key gap.
Two required sub-assessments:
- **Product team fit:** Does the team deeply know the product landscape? (✓ / Partial / Gap)
- **Market team fit:** Does the team have the market relationships to execute GTM? (✓ / Partial / Gap)

Flag immediately if founders are part-time or IP is not cleanly assigned to the company.

| Score | Criteria |
|-------|---------|
| 5 | Domain expert with prior exit; strong product team fit AND market team fit; compelling team assembled |
| 4 | Strong domain background; execution evidence; strong on one of product/market team fit |
| 3 | Relevant background; generalist execution; partial product or market team fit |
| 2 | Thin domain connection; first-time founder; gaps in both product and market team fit |
| 1 | Background disconnected from problem; no product or market team fit |
| 0 | No founder information available |

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
| Strategic (Q4 + Q5 + Q6) | 3 dims | 15 pts | 20% | 3.0 |
| Phase 2 (Team + Tech + Traction + GTM) | 4 dims | 20 pts | 40% | 8.0 |
| **Total** | | | **100%** | **19.0** |

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
| 1. Infrastructure & Foundational Stack | Data centers, chips, networking, LLM infrastructure, edge compute |
| 2. SW Enabled HW, Physical AI & Robotics | Drones, autonomous vehicles, smart manufacturing, additive mfg, AI vision |
| 3. WorkTech & Vertical Enterprise OS | Vertical-specific AI agents, EdTech, MedTech, GovTech, LegalTech, Future of Work |
| 4. Data Sovereignty, Security, Trust | Cybersecurity, cryptography, synthetic data, compliance, location intelligence |
| 5. FinTech (incl RE) | Crypto/DeFi, AI financial tools, automated underwriting, real estate tech |

Lead and SMEs: Output as "TBD — Pending Dealum API" for both.

---

## Scout Assessment Report Format — 2-Page Design

### Page 1 — Scorecard (deal lead and TechGroup group read)

**Triage Carry-Forward block** — Opportunity Score, Readiness Score, Hard Gates, all flags.

**Product & Market Positioning table** (4 cols):
```
| Category Type | Lifecycle Horizon | Ecosystem Role Score | Adjacent Risk Score |
```

**Moat Assessment table** (4 cols — distilled verdict, not moat-type enumeration):
```
| Primary Moat | Strength | Primary Threat | Verdict |
```

**Macro Trends table** (3 cols):
```
| Dimension  | 10-yr Direction | Thesis Impact                                 |
| Customer   |                 | Tailwind / Neutral / Headwind                 |
| Technology |                 |                                               |
| Regulatory |                 |                                               |
| Economic   |                 |                                               |
```

**Analyst Verdict Block** (structured fields — no paragraphs):
```
Recommendation:           ADVANCE TO DILIGENCE / WATCH / DECLINE
Scout Conviction Score:   [X / 19]
Verdict:                  [one sentence — blunt, IC-ready]
What You Have to Believe: [one sentence — the core thesis assumption]
Where's the Bet:          [one sentence — the specific inflection point being backed]
Fear:                     [one phrase — biggest risk]
Greed:                    [one phrase — upside case if thesis holds]
```

**Score Summary table** (delta from Triage where applicable):
```
| Dimension                       | Triage  | Scout   | Delta      |
| Category & Market Discontinuity | D1: X/5 | X/5     | ↑ / → / ↓ |
| Demand Signal Test              | —       | X/5     | NEW        |
| Market Opportunity              | D2: X/5 | X/5     |            |
| Moat                            | D4: X/5 | S/D/W/N |            |
| Ecosystem Role                  | —       | X/5     | NEW        |
| Adjacent Displacement Risk      | —       | X/5     | NEW        |
| Macro Tailwind                  | —       | X/5     | NEW        |
| Team                            | D3: X/5 | X/5     |            |
| Technology                      | —       | X/5     |            |
| Traction                        | D5: X/5 | X/5     |            |
| GTM / Path to $10M              | —       | X/5     |            |
```

### Page 2 — Rationale (deal lead depth; group skims if needed)

**Adjacent & Emerging Tech** (bullet cluster):
- Core use case: [one sentence]
- Functional equivalents: [list — one phrase each]
- Emerging displacement: [threat + time horizon]

**Phase 1 Viability** (bullet clusters — 3-4 bullets per section; finding/fact/implication format):

*Category & Market Discontinuity*
- [bullet]
- [bullet]
- [bullet]

*Demand Signal Test*
- Demand type: DEMAND-PULL / TECHNOLOGY-PUSH / MIXED
- Evidence: [2-3 signals]
- Strongest signal: [one sentence]

*Market Opportunity*
- TAM | SAM | 5yr capture: [numbers]
- [2-3 bullets: market trajectory, growth driver, 10x viability]

*Moat*
- [3-4 bullets: what the moat is, what it isn't, primary evidence, key weakness]

**Phase 2 Execution** (table — one line per item, score shown):
```
| Dimension          | Score | Assessment                                                    |
| Team               | X/5   | ADEQUATE→STRONG | [strength] | Product team fit: ✓/gap |
|                    |       | Market team fit: ✓/gap | Gap: [gap]                      |
| Technology         | X/5   | TRL X | [thin wrapper or deep IP] | Replication: [time]    |
| Traction           | X/5   | [revenue/pipeline] | [named customer] | [retention signal] |
| GTM / Path to $10M | X/5   | [motion] | [key milestone] | [CAC/LTV if known]          |
| Exit               | —     | [Acquirer 1], [2], [3] | Hold: Xyr | 10x: YES/STRETCH/UNLIKELY |
```

**Flags** (bullet list — one line each):
- ❌ [Red flags]
- ⚠️ [Yellow flags]

**Targeted Diligence Questions** (3-5 numbered bullets — specific and deal-derived, not generic):

```
DEALUM STEP TO UPDATE: Scout/IntroCall
SUGGESTED TAGS TO ADD: [theme name]
NEXT ACTION: /diligence [Company Name]
```
