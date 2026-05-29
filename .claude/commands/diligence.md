---
description: Launch research agents, apply NWAi scoring rubrics, generate DD kickoff package
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, mcp__nwai-dealum__update_application, Read, Write, Bash, Task
argument-hint: [company-name | application-id]
---

Initiate full diligence on a NWAi TechGroup deal. Arguments: $ARGUMENTS

**Global formatting rule — apply to all output in this command:** Write every prose field, finding, assessment narrative, open question, and recommendation as single continuous lines. Do not insert manual line breaks within any sentence or paragraph. The Cowork UI handles word wrap — hard line breaks inside prose render as broken, choppy text. This applies to the deal brief, scored assessment notes, DD folder summaries, open questions, and next-step recommendations.

---

## Pre-Flight Check

Before any other action, verify two prerequisites.

**Check 1 — Scout Report (Hard Gate):**

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
ls "${WORKSPACE}/deals/active/"*Scout* 2>/dev/null | grep -i "$ARGUMENTS"
```

Search for a file matching: `[Company Name] - Scout Assessment Report*.docx`

- **If NOT found:** HALT immediately. Do not proceed. Display:

> ⚡ **DILIGENCE BLOCKED — Scout Report Required**
> No Scout Assessment Report found for **[Company Name]**.
> `/diligence` requires a completed Scout assessment on file before launching.
> Run `/scout [company name]` first, then return to `/diligence`.

- **If found:** Note the filename and date. Proceed to Check 2.

**Check 2 — Pre-Flight Confirmation:**

Display the following and wait for user to type **CONFIRM** before proceeding:

> ⚡ **DILIGENCE PRE-FLIGHT CHECK — [Company Name]**
>
> Scout Report loaded: ✅ [filename]
>
> Before launching the diligence agent team, confirm the following are in place:
>
> ✅ **Scout Report** — Loaded above. Layer 2 hypotheses will be derived from Scout thesis.
>
> ✅ **Financial Files** — Deal room or uploaded files must include financials, projections, and cap table. The Financial Analyst Agent requires these files to complete Financial Validation.
>
> *If financial files are missing, stop here and add them to the deal room before proceeding.*
>
> **Type CONFIRM to launch diligence, or EXIT to cancel.**

If user types EXIT: stop. If user types CONFIRM: proceed to Phase 1.

---

## Phase 1: Gather Deal Context

Retrieve the application from Dealum using the company name or ID from $ARGUMENTS.
Extract: company name, website, contact, current step, tags, and any prior notes from
Screening and Scout stages. Note any known founder names and the company website URL
for the research agents.

---

## Phase 1b: Load Prior Stage Outputs from Workspace

After fetching from Dealum, load the Scout Assessment Report confirmed in Pre-Flight.

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
ls "${WORKSPACE}/deals/active/" 2>/dev/null
```

Load (most recent version of each, sorted by YYYY-MM-DD in filename):

1. `[Company Name] - Triage Report*.docx` — Screen output (if present)
2. `[Company Name] - Scout Assessment Report*.docx` — **Required** (confirmed at Pre-Flight)

**From the Triage Report carry forward:** gate verdicts, all red/yellow flags, deal structure concerns, AI wrapper rating, opportunity and readiness scores with dimension breakdown.

**From the Scout Assessment Report carry forward (REQUIRED):** theme assignment, Phase 1 ratings (Big Idea / Market / Moat with rationale and scores), Phase 2 findings (Team, Technology, Traction, GTM, Exit with scores), Scout Conviction Score, one-sentence verdict, single biggest risk, targeted diligence questions, and all flag items.

**The Scout thesis is the analytical backbone of this DD package.** Layer 2 hypotheses are derived directly from Scout findings. Feed Scout outputs into Phase 3 rubric scoring as the established baseline. Research agents confirm, deepen, or contradict prior findings — do not re-derive conclusions already established at Scout unless new evidence changes the picture.

---

## Phase 1c: Load Optional Post-Meeting Analyst Layer

This phase is **conditional**. New deals (just out of Scout, no diligence meetings yet) will have no post-meeting reports — that's the standard case and the agents proceed normally. For deals where post-meeting work has already happened (a re-run, a deal coming off Watch, a framework upgrade tested against a historical deal), the post-meeting analyst layer represents the most current NWAi POV on the deal and **must be incorporated** by the agents. The agents should not regress to the Scout-stage view if more current analyst conclusions exist.

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
REPORTS_DIR="${WORKSPACE}/deals/active/[Company Name]/Reports/"
ls "${REPORTS_DIR}" 2>/dev/null
```

Glob `Reports/` for files matching any of these patterns (use the most recent dated version of each):

1. `*Action-Tracker*.docx` — latest only (this is the running record of resolved vs. open diligence items)
2. `*-Diligence-*.docx` — post-meeting reports (e.g., `[Company]-GTM-Diligence-*.docx`, `[Company]-Financials-Diligence-*.docx`) — exclude the DD Kickoff Package
3. `*-Reconciliation-*.docx` — post-meeting reconciliations (e.g., `[Company]-Product-Demo-Reconciliation-*.docx`)
4. `*Market-Intel*.docx`, `*Risk-Briefing*.docx`, `*-Briefing*.docx` — any post-Scout enrichment briefings (exclude the Scout Assessment Report itself)

**Decision logic:**

**IF any post-meeting reports are found:**

Display:
> 📋 **Post-meeting analyst layer detected** — incorporating into agent context
>
> Files loaded:
> - [list each file with date]
>
> Agents will be instructed to treat the post-meeting analyst POV as canonical where it conflicts with the Scout-stage view or the pitch deck. Do not regress to prior conclusions that the post-meeting work has resolved or challenged.

Build a **Post-Meeting Layer Manifest** to pass to the agents in Phase 2:

```
POST-MEETING ANALYST LAYER (canonical NWAi POV — incorporate before forming conclusions):
- [Path to Action Tracker]: contains the running record of resolved (✅), partial (⚠️), and open (🔴) diligence items.
- [Path to GTM Diligence]: post-meeting analyst POV from GTM/Sales Strategy diligence call.
- [Path to Product Demo Reconciliation]: post-meeting analyst POV from Product Demo diligence call.
- [Path to Financials Diligence]: post-meeting analyst POV from Financials diligence call.
- [Path to Market Intel Briefing]: post-Scout market enrichment.
- [Path to any other briefings]: [purpose].

Mandate to the agents: Where these reports have resolved or evolved the analyst view since Scout, your conclusions must reflect the more current position. If a Scout-stage hypothesis has been challenged or invalidated by post-meeting work, do not restate the Scout conclusion as if it still stands.
```

**IF no post-meeting reports are found:**

Display:
> 📋 **No post-meeting analyst layer present — running fresh diligence**
>
> This is the standard case for deals just out of Scout. Agents will work from the Scout Assessment Report and Data Room files only.

Set the Post-Meeting Layer Manifest to `"NONE — fresh diligence, no post-meeting analyst layer to incorporate."`

---

## Phase 2: Launch Research Agents

The agent team runs in two stages:
- **Stage 2A (parallel)** — 6 agents run simultaneously: 5 standard research agents plus pricing-analyst
- **Stage 2B (sequential)** — the financial diligence chain (forecasting-analyst → venture-analyst) runs after Stage 2A completes, because each agent consumes upstream output

Inform the user: "Launching diligence agent team — Stage 2A: 6 agents running in parallel. This typically takes 5–8 minutes. After 2A completes, I'll run the financial diligence sequence (forecasting → venture analyst), then synthesize findings into the DD Kickoff Package."

### Stage 2A: Parallel agents

Use the Task tool to launch **all six agents simultaneously**:

**Each agent prompt MUST include the Post-Meeting Layer Manifest from Phase 1c.** Append this block to every agent prompt below (substitute the actual manifest content built in Phase 1c). Agents must read the listed files BEFORE forming conclusions.

```
[POST_MEETING_LAYER_MANIFEST]
```

---

**Agent 1 — team-analyst:**
"Research the team — founders, staff, and advisors — of [Company Name] for NWAi diligence. **mode: diligence** (full underwriting depth — bifurcated Product-Team Fit and Market-Team Fit lenses with per-founder dimensions and team synthesis; Staff Deep-Dive for VP/Head-of/C-level non-founder hires; Network Map under Market-Team Fit; Key-Seat Completeness checklist with stage-appropriateness; full advisor capital-commitment classification). Website: [URL]. Known founders: [names]. Apply the Founder Claim Verification Protocol to every specific exit/ARR/role/credential claim (LinkedIn + Perplexity cross-reference). Assess Team Commitment Depth (full-time vs advisor ratio, flag 'stuck' advisors). Produce Founder Profile Tags for all operating founders. Include supporting context on funding, traction, commercial validation, and public red flags. Return the full Team Analyst Briefing including the People Verification Brief, Product-Team Fit Assessment, Market-Team Fit Assessment (with Network Map), Team Commitment Depth, Founder Profile Tags, Staff Deep-Dive, and Key-Seat Completeness sections.

If a Post-Meeting Layer Manifest is provided, read the Product Demo Reconciliation and GTM Diligence reports first — these contain analyst observations on team behavior in live diligence calls (who answered authoritatively, who deferred, who revealed depth limits). Incorporate those observations into both the Product-Team Fit and Market-Team Fit assessments. Read the latest Action Tracker for any team-related items marked ✅ RESOLVED or 🔴 OPEN. Do not regress to Scout-stage team conclusions if post-meeting evidence has updated them.

[POST_MEETING_LAYER_MANIFEST]"

**Agent 2 — market-analyst:**
"Validate the market for [Company Name] for NWAi diligence. They operate in [sector/description]. Website: [URL]. Test for structural discontinuity, validate TAM/SAM independently, and score market timing. Return the full Market Analysis Briefing.

If a Post-Meeting Layer Manifest is provided, read the Market Intel Briefing first — this represents the most current NWAi market view on this deal and supersedes the Scout-stage market analysis where they conflict. Read the latest Action Tracker for market-related items.

[POST_MEETING_LAYER_MANIFEST]"

**Agent 3 — competitive-positioning-analyst:**
"Research the competitive landscape for [Company Name] for NWAi diligence. They operate in [sector/description]. Website: [URL]. Map direct competitors, strategic incumbents, positioning, and moat inputs. Identify comp set with reported revenue/ARR and recent valuations for use by forecasting-analyst and venture-analyst. Return the full Competitive Positioning Analyst Briefing.

If a Post-Meeting Layer Manifest is provided, read all post-meeting reports for competitive observations surfaced in live diligence calls (founder claims about competitors, customer references, win/loss anecdotes). Read the latest Action Tracker for competitive items.

[POST_MEETING_LAYER_MANIFEST]"

**Agent 4 — technology-analyst:**
"Run technical diligence on [Company Name] for NWAi. Website: [URL]. Run all three thin wrapper tests, assess TRL, search for patents and IP, evaluate AI moat signals. Return the full Technology Analyst Briefing.

If a Post-Meeting Layer Manifest is provided, read the Product Demo Reconciliation first — this is the most direct analyst observation of the technology in action and supersedes inferred technical assessment from pitch materials. Read the latest Action Tracker for technical items.

[POST_MEETING_LAYER_MANIFEST]"

**Agent 5 — risk-analyst:**
"Assess cross-domain risks for [Company Name] for NWAi diligence. They operate in [sector/description]. Website: [URL]. Research regulatory requirements, exit landscape and acquirer dynamics, execution risk signals, and market risk factors. Specifically identify the natural exit pathway (strategic / hyperscaler / IPO / mixed) and exit multiple range — this feeds the venture-analyst valuation. Return the full Risk Assessment Briefing.

If a Post-Meeting Layer Manifest is provided, read the latest Action Tracker first — the resolved/partial/open status of every diligence item is the canonical source of truth for which risks have been mitigated and which remain. Read all post-meeting reports for risk-relevant observations (regulatory complications, customer concentration, key-person signals).

[POST_MEETING_LAYER_MANIFEST]"

**Agent 6 — pricing-analyst:**
"Assess pricing strategy and unit economics for [Company Name] for NWAi diligence. Website: [URL]. Workspace path: [WORKSPACE]. Deal room folder: [WORKSPACE]/deals/active/[Company Name]/Data Room/. Score Pricing Maturity (PROVEN / EARLY SIGNALS / DISCOVERY / UNKNOWN), validate value proposition with quantified pricing-to-value ratio, model Channel Economics (margin pressure forecast across 5 years), derive Unit Economics, and produce the Pricing Pressure Forecast. Output the Feed Forward to Forecasting Analyst section explicitly. Return the full Pricing Analyst Briefing.

If a Post-Meeting Layer Manifest is provided, read the GTM Diligence report and Financials Diligence report (if present) FIRST — these contain the most current analyst POV on actual pricing dynamics, channel economics (e.g., distributor margin reality vs. published terms), and customer willingness-to-pay observed in live calls. The GTM transcript or reconciliation is more authoritative than the marketing battlecard or sell-sheet for understanding channel margin pressure. Read the latest Action Tracker for pricing items.

[POST_MEETING_LAYER_MANIFEST]"

Wait for all six agents to complete before proceeding to Stage 2B.

### Stage 2B: Financial diligence sequence (sequential)

Launch only if pricing-analyst output is available (always true). Financial files are preferred but not required — the McMurry method does not depend on the company's spreadsheet.

**Agent 7 — forecasting-analyst:**
"Build an independent five-year financial forecast for [Company Name] for NWAi diligence using the McMurry method (proprietary forecast first, then comparison to company's submitted numbers). Workspace path: [WORKSPACE]. Deal room folder: [WORKSPACE]/deals/active/[Company Name]/Data Room/. Use the Pricing Analyst Briefing output as foundation for revenue assumptions (do NOT re-derive pricing). Use the Competitive Positioning Analyst comp set as anchor for benchmarks. Apply the 'no AI slop' rule — produce specific *because* clauses for each Bear/Base/Bull scenario. Forecast P&L, cash flow, and balance sheet (where applicable). Output capital plan with round timing and sizing across 5 years. Compare to company's submitted numbers and produce the Founder Financial Literacy Assessment. Return the full Forecasting Analyst Briefing.

If a Post-Meeting Layer Manifest is provided, read the Financials Diligence report and GTM Diligence report (if present) FIRST — these contain analyst observations from live diligence calls about the company's actual financial trajectory, capital needs, and assumptions. The latest Action Tracker shows which financial assumptions have been ✅ resolved (validated or invalidated) vs. 🔴 still open. Where post-meeting work has updated a financial assumption since Scout, your forecast must reflect the current view, not the Scout-stage view.

[POST_MEETING_LAYER_MANIFEST]"

**Agent 8 — venture-analyst:**
"Synthesize the financial diligence into a valuation conclusion for [Company Name] for NWAi diligence. Inputs: Pricing Analyst Briefing, Forecasting Analyst Briefing, Competitive Positioning Analyst Briefing, Risk Analyst Briefing, Team Analyst Briefing. Deal terms: [pre-money valuation, raise size, NWA check size]. Produce: defensible valuation today (3 methods reconciled), projected exit valuation (Y3 + Y5 across Low/Base/High), capital and dilution model, IRR / multiple / 35% IRR hurdle test, NWA 10x-in-5-years test. Recommend deal structure (priced equity / convertible with cap / participating preferred / re-priced terms / decline). Output Headline Takeaway. Return the full Venture Analyst Briefing.

If a Post-Meeting Layer Manifest is provided, read the latest Action Tracker FIRST — every diligence item with an ✅ RESOLVED status represents a risk that has been mitigated and should weight your valuation upward; every 🔴 OPEN item is a risk that remains and should weight your valuation downward or be flagged as a condition on the deal structure recommendation. Read all post-meeting reports for any analyst observations that change the exit pathway, comp set anchoring, or hurdle rate test. Your final NWA action recommendation (ADVANCE / WATCH / DECLINE) must reflect the most current understanding of the deal, not the Scout-stage understanding.

[POST_MEETING_LAYER_MANIFEST]"

Wait for all agents to complete before proceeding.

---

## Phase 3: Apply NWAi Scoring Rubrics

Load the scoring rubrics from:
`.claude/skills/nwai-investment-framework/references/diligence-scoring-rubrics.md`

Apply all four rubrics using the agent briefings plus prior Screening and Scout findings:

**3A — Moat Scoring**

**General applicability rule:** If any scoring sub-rubric does not apply to the company type (e.g., AI Moat for a hardware or non-AI company, LTV/CAC for a one-time-sale model), mark it N/A with a one-line reason. Do not force-apply a rubric that does not fit.

- Tier 1 General Moat (0–6): Evaluate all six dimensions individually. For each, show the dimension name, ✓ or ✗, and a one-sentence rationale. Then sum to produce the total score and state the interpretation band (No Moat / Weak Moat / Moderate Moat / Strong Moat).
- Tier 2 AI Moat (0–10): First apply the applicability gate — explicitly answer "Is this an AI-first or AI-enabled company?" If NO → mark Tier 2 as N/A with a one-line reason. If YES → run the three thin wrapper tests first (using technology-analyst briefing), then score all three categories (Cognitive/Data, Capital/Compute, Vertical/Workflow), showing each sub-element by name with points awarded and points available. State the total and interpretation band.
- Show working for each point awarded or withheld

**3B — Risk Scoring (1–10 per category, where 1 = lowest risk and 10 = highest risk)**
- Execution Risk: team depth, key-person dependency, Team Commitment Depth ratio, PMTF score, founder claim verification status (from team-analyst + risk-analyst)
- Market Risk: adoption barriers, incumbent response, timing (from market-analyst + competitive-positioning-analyst)
- Financial Risk: runway, burn, unit economics, capital plan adequacy (from forecasting-analyst + pricing-analyst)
- Technical Risk: TRL rating, regulatory path (from technology-analyst + risk-analyst)
- Competitive Risk: moat score, market crowding, Big Tech overlap, pricing pressure forecast (from competitive-positioning-analyst + pricing-analyst + risk-analyst)
- Flag any score ≥ 8 as critical; flag as deal-breaker if 2+ scores are 9+, or any is 10

**3C — Financial Model Inputs**
Use the financial diligence sequence (pricing-analyst → forecasting-analyst → venture-analyst) as primary sources:
- **Pricing Analyst Briefing** for unit economics, channel pressure forecast, pricing-to-value ratio
- **Forecasting Analyst Briefing** for proprietary 5-year forecast (Bear/Base/Bull with *because* clauses), capital plan, founder financial literacy assessment
- **Venture Analyst Briefing** for valuation conclusion, IRR, 10x-in-5-years test, deal structure recommendation

If financial files were not provided, the McMurry method still produces a defensible forecast from comps + pricing analysis. Confidence level is reduced but not zero. Note this in the DD Report.

List any missing inputs the team must request from the founder, with explicit reference to which agent flagged the gap.

**3D — Market Size Validation**
Use market-analyst briefing as primary source. Compare founder TAM against market-analyst independent estimates and bottoms-up SAM.
Flag if founder TAM > 3× bottoms-up estimate. Produce timing score (0–5).

---

## Phase 4: Produce DD Kickoff Package

The DD Kickoff Package has six parts. Part B (Layer 2) is the analytical core — AI-derived conclusions from agent research. Parts C–F are the supporting detail.

**CRITICAL OUTPUT DISCIPLINE:** Layer 2 (Part B) presents conclusions and insights only. Do not include raw agent findings in Part B. Raw research belongs in agent briefings which are internal working documents. Part B is IC-ready synthesis — crisp, one page total.

---

**Part A — Deal Brief**
Compact summary: company, sector, stage, and round details, followed by the Scout thesis carried forward (Big Idea / Market / Moat ratings with brief rationale). Close Part A with a single highlighted gate-critical callout line that names the 2–4 highest-priority flagged folders by number and topic. This callout is the only risk signal in Part A.

---

**Part B — Layer 2: Hypothesis Confirmation Plan**

This section contains six validation groups. For each group:
- Derive the hypothesis from the Scout Assessment Report (specific source dimension noted below each group)
- Synthesize the relevant agent briefing(s) into a 2–3 sentence conclusion — insights only, no raw data
- Assign a signal: 🟢 (hypothesis confirmed) / 🟡 (partially confirmed, uncertainty remains) / 🔴 (hypothesis challenged or contradicted)
- State the biggest remaining uncertainty in one sentence

**Strict format constraint:** 4–5 lines per group maximum. Total Part B = one page. If it cannot be said in 2–3 sentences, the analysis is not done.

---

**MARKET VALIDATION**                                                [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Q1 (Category & Market Discontinuity) and Q2 (Market Opportunity). State what the Scout thesis claims about the market shift and opportunity size.]
Conclusion: [2–3 sentences — synthesized from market-analyst and competitive-positioning-analyst briefings. What does the research confirm or challenge about the market discontinuity and TAM? What does it mean for the thesis?]
Biggest uncertainty: [1 sentence — the one unresolved market question that most affects confidence.]

---

**TECHNICAL VALIDATION**                                             [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Q3 (Moat Assessment) and Technology (Phase 2). State what the Scout thesis claims about technical defensibility and architecture.]
Conclusion: [2–3 sentences — synthesized from technology-analyst briefing. What do the thin wrapper test, TRL assessment, and IP signals confirm or challenge? Is the technical moat real?]
Biggest uncertainty: [1 sentence — the key technical unknown.]

---

**TEAM VALIDATION**                                                  [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Team score (Phase 2). State what the Scout thesis claims about founder/team fit for this specific opportunity.]
Conclusion: [2–3 sentences — synthesized from team-analyst and risk-analyst briefings. What does the research confirm or challenge about the team's ability to execute this thesis?]
Biggest uncertainty: [1 sentence — the key team gap or open question.]

---

**COMMERCIAL VALIDATION**                                            [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Traction and GTM scores (Phase 2). State what the Scout thesis claims about commercial traction and the path to $10M ARR.]
Conclusion: [2–3 sentences — synthesized from team-analyst (commercial validation section) briefing. What does the research confirm about revenue quality, customer evidence, and GTM motion?]
Biggest uncertainty: [1 sentence — the key commercial unknown.]

---

**COMPETITIVE VALIDATION**                                           [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Q5 (Adjacent Displacement Risk) and Q4 (Ecosystem Role). State what the Scout thesis claims about competitive positioning and defensibility.]
Conclusion: [2–3 sentences — synthesized from competitive-positioning-analyst and risk-analyst briefings. What do the competitor moat gap analysis and hyperscaler threat level confirm or challenge?]
Biggest uncertainty: [1 sentence — the biggest competitive unknown.]

---

**FINANCIAL VALIDATION**                                             [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout financial context (ARR, stage, round). State what the Scout thesis implies about the path to a 10x return.]
Conclusion: [3–4 sentences — synthesized from the three-agent financial diligence sequence:
- **Pricing Analyst** — pricing maturity, unit economics health, pricing pressure forecast
- **Forecasting Analyst** — independent 5-year forecast (Bear/Base/Bull), capital plan, founder financial literacy assessment
- **Venture Analyst** — defensible valuation, IRR, 10x-in-5-years test, deal structure recommendation
What do these conclude about pricing defensibility, capital adequacy, and the path to a 10x return at the asked-for terms?]
Biggest uncertainty: [1 sentence — the key financial unknown.]

[If financial files were not provided:]
⚠️ **PARTIAL — Financial files not provided. Forecast generated independently via the McMurry method.**
The forecasting-analyst built the forecast from comps and pricing analysis without the company's spreadsheet. Confidence is reduced but the conclusion is still defensible. Note this in the DD Report Section 7.
Recommended action: Request financial files (model/projections, historical P&L, cap table) for the next diligence cycle to validate the comp-based forecast.

---

**Part C — Scored Assessment**
```
MOAT TIER 1 — General (0–6):
  Network Effects:          [✓/✗] — [one-sentence rationale]
  Switching Costs:          [✓/✗] — [one-sentence rationale]
  Proprietary Data:         [✓/✗] — [one-sentence rationale]
  IP / Patents:             [✓/✗] — [one-sentence rationale]
  Regulatory Barriers:      [✓/✗] — [one-sentence rationale]
  Vertical Specialization:  [✓/✗] — [one-sentence rationale]
  Total: [X/6] → [No Moat / Weak Moat / Moderate Moat / Strong Moat]

MOAT TIER 2 — AI Moat (0–10):
  [N/A — one-line reason]  ← use when not an AI company
  OR
  Cognitive / Data:    Training Data [X/2] | Inference Data [X/1] | Memory Lock-in [X/1]
  Capital / Compute:   Custom Training [X/1] | Proprietary HW [X/1]
  Vertical / Workflow: Workflow Integration [X/2] | Regulatory Layer [X/1] | Network Effects [X/1]
  Total: [X/10] → [Thin Wrapper / Weak Moat / Moderate Moat / Strong Moat / Exceptional Moat]

RISK (1 = lowest risk, 10 = highest risk):
  Execution:   [X/10]  | [Key concern — one sentence]
  Market:      [X/10]  | [Key concern — one sentence]
  Financial:   [X/10]  | [Key concern — one sentence]
  Technical:   [X/10]  | [Key concern — one sentence]
  Competitive: [X/10]  | [Key concern — one sentence]
  Average: [X.X]/10 | Critical (≥8): [list or "none"]

MARKET:  TAM $Xb | SAM $Xm | Timing [X/5] → [Consistent/Inflated]
FINANCE: Revenue [current] | Runway [X mo] | Unit econ [status]
```

---

**Part D — Layer 1: 17-Folder DD Assignment Table  [Hub — single source of truth]**
Load the checklist from:
`.claude/skills/nwai-investment-framework/references/dd-checklist.md`

Part D is the data completeness hub of the DD Kickoff Package. All gate-critical risks and key questions are expressed here — not duplicated in Parts A, E, or F.

Build a 3-column table: **Folder | Pre-Populated Findings | Status / Key Question**

For the "Status / Key Question" column:
- **Gate-critical** (risk that could block or kill the deal): mark ❌ Gate-critical and embed "Key Q: [one sentence]". Red background shading in docx.
- **Urgent** (scoring gap or unresolved risk): mark ⚠️ Urgent and embed "Key Q: [one sentence]". Amber background shading in docx.
- **No urgent flags:** state the next action in plain text.

Gate-critical folders are identified from Phase 3 scoring gaps, prior red flags from Screening, and open structural risks (IP, cap table, runway, ARR quality, founder commitment). Typically 2–5 folders will be gate-critical or urgent per deal.

---

**Part E — Founder Questions (Scoring Inputs)**
Open with: "Gate-critical questions are embedded in Part D. The questions below are needed to complete rubric scoring."

Two groups only — no gate-critical section here:
- **Scoring inputs** (needed to complete Moat, Risk, and Financial model scores in Part C): questions about ARR breakdown, pricing model, unit economics, data flywheel, certifications, competitive win/loss, burn rate, and Series A plans.
- **Nice to have** (enriches analysis; not blocking): questions that add depth but will not block the DD process.

---

**Part F — Recommended Next Steps**
Three elements only — no restatement of risks or conditions from Parts A, D, or E.

1. **Verdict table** (one row): State the verdict (Advance / Advance with Conditions / Watch / Pass) and a single-paragraph rationale grounded in the scored assessment. Verdict thresholds:
   - **Advance full DD**: Moat ≥ 4/6, Risk avg < 7, no deal-breakers → assign team, schedule founder call
   - **Advance with conditions**: scores are borderline or gate-critical flags in Part D are unresolved → reference Part D by folder number, do not restate the conditions
   - **Watch / Pause**: define the specific milestone that would trigger re-evaluation
   - **Pass**: state the deal-breaker reason clearly for the file

2. **Recommended DD Actions**: A numbered list of 4–6 sequenced next steps. Execute in priority order after gate-critical conditions in Part D are cleared.

   **Customer-interview prep callout (mandatory when customer reference interviews are in the action list — they typically are).** Customer interviews are conducted live by the deal lead; the questions must be surfaced *before* the call, not just analyzed after. When customer reference interviews appear as a DD action, the action item MUST embed the four-question **Behavioral-Intensity Question Bank** inline as required call structure — not just a pointer to the framework doc:
   1. **Tool replacement & adoption** — *"What were you using before this product? How did you find this one and what made you switch?"*
   2. **Unplanned use cases** — *"Have you found ways to use this that the vendor didn't pitch to you? Or that surprised you?"*
   3. **Organic evangelism** — *"Have you talked to anyone outside your company about this product? Tell me about that."*
   4. **Counterfactual loss** — *"If this product disappeared tomorrow, what would you do?"*

   Full playbook + behavioral signal interpretation in `diligence-analysis-framework.md` → Customer Interview section. Post-call workflow: `/post-meeting [Company] interview` applies these same four questions as the analytical lens against the transcript and produces a Behavioral Intensity classification (Strong / Some / None) in the Analyst POV box. *None* indicates commodity status.

3. **Kill Conditions table**: A 3-column table (Kill Condition | Trigger | Verdict) with one row per gate-critical risk identified in Part D. Typically 2–4 rows.

---

## Phase 5: Update Dealum

Use `update_application` to move step to "Diligence" and add tag "TechGroup-Diligence".
Confirm update to user.

---

## Phase 6: Save DD Kickoff Package as Word Document

Read the docx skill instructions from:
`$(find /sessions -name "SKILL.md" -path "*/.skills/skills/docx/SKILL.md" 2>/dev/null | head -1)`

Generate a professional .docx file of the DD Kickoff Package using Node.js and the `docx` npm package. Locate the workspace dynamically and save to the deals subfolder:
```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
mkdir -p "${WORKSPACE}/deals/active"
```
Output path: `${WORKSPACE}/deals/active/[Company Name] - DD Kickoff Package [YYYY-MM-DD].docx`

**Document structure and formatting:**

Use US Letter page size (12240 × 15840 DXA), 1-inch margins, Arial font. Apply NWAi color scheme: dark navy (`1F3864`) for section banners, light blue shading (`D5E8F0`) for scored rows. Page header: "NWAi TechGroup — DD Kickoff Package" left-aligned, date right-aligned. Footer: "NWAi Investment Intelligence — Confidential" left-aligned, page number right-aligned.

The document uses a Hub and Spoke structure. Part D (Layer 1) is the data completeness hub. Part B (Layer 2) is the analytical core. All gate-critical questions appear in Part D only.

The document must contain all six parts in order:

1. **Part A — Deal Brief**: Company snapshot table, product description, round & structure table, Scout thesis table (Big Idea / Market / Moat rows with ratings and rationale). Close with a single highlighted gate-critical callout box naming the flagged Part D folders. No Key Risks section.

2. **Part B — Layer 2 Hypothesis Confirmation Plan**: Six validation group blocks in a clean 2-column layout. Left column: group name + signal emoji. Right column: Hypothesis / Conclusion / Biggest uncertainty. Navy section banner at top: "Layer 2 — Hypothesis Confirmation Plan (AI-Derived)". If Financial Validation is incomplete, render that block with a red background and INCOMPLETE flag.

3. **Part C — Scored Assessment**: Four structured tables — Moat Tier 1 (6 dimensions, ✓/✗, one-sentence rationale per row, total score), Moat Tier 2 AI (cognitive/capital/vertical sub-elements with points, total, interpretation band — or N/A with reason), Risk (5 categories with score and key concern, average, critical flags), and Market/Financial summary (TAM, SAM, timing score, revenue, runway, unit economics).

4. **Part D — Layer 1: 17-Folder DD Assignment Table [Hub]**: 3-column table (Folder | Pre-Populated Findings | Status / Key Question). Navy section banner: "Layer 1 — 17-Folder Data Completeness Checklist". For each ❌ gate-critical folder: red background shading. For each ⚠️ urgent folder: amber background shading. No separate assignee column.

5. **Part E — Founder Questions (Scoring Inputs)**: Open with callout note pointing to Part D for gate-critical questions. Two numbered-list sections only: Scoring Inputs and Nice to Have.

6. **Part F — Recommended Next Steps**: Three elements: (a) Verdict table — one row, verdict label + rationale; (b) Recommended DD Actions — numbered list of 4–6 sequenced actions, **with Customer-Interview Prep callout box embedded inline below the action item when customer reference interviews appear in the list** (callout box renders the four-question Behavioral-Intensity Question Bank as a shaded inset; questions verbatim from Phase 4 spec — Tool replacement & adoption / Unplanned use cases / Organic evangelism / Counterfactual loss); (c) Kill Conditions table — 3-column (Kill Condition | Trigger | Verdict), 2–4 rows.

After generating the file, confirm the save path and provide a link to the file.
