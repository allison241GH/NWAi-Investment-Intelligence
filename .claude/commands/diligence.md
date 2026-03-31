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

## Phase 2: Launch Research Agents in Parallel

Inform the user: "Launching diligence agent team — 5 agents running in parallel. This typically takes 5–8 minutes. I'll synthesize findings and generate the DD Kickoff Package when all complete."

Use the Task tool to launch **all agents simultaneously**:

**Agent 1 — company-researcher:**
"Research [Company Name] for NWAi diligence. Website: [URL]. Known founders: [names]. Include commercial validation signals (contract structure, named customers, sales motion). Return the full Company Research Briefing."

**Agent 2 — market-analyst:**
"Validate the market for [Company Name] for NWAi diligence. They operate in [sector/description]. Website: [URL]. Test for structural discontinuity, validate TAM/SAM independently, and score market timing. Return the full Market Analysis Briefing."

**Agent 3 — competitive-intelligence:**
"Research the competitive landscape for [Company Name] for NWAi diligence. They operate in [sector/description]. Website: [URL]. Map direct competitors, strategic incumbents, positioning, and moat inputs. Return the full Competitive Intelligence Briefing."

**Agent 4 — technical-diligence:**
"Run technical diligence on [Company Name] for NWAi. Website: [URL]. Run all three thin wrapper tests, assess TRL, search for patents and IP, evaluate AI moat signals. Return the full Technical Diligence Briefing."

**Agent 5 — risk-assessor:**
"Assess cross-domain risks for [Company Name] for NWAi diligence. They operate in [sector/description]. Website: [URL]. Research regulatory requirements, exit landscape and acquirer dynamics, execution risk signals, and market risk factors. Return the full Risk Assessment Briefing."

**Agent 6 — financial-analyst (conditional):**
Launch only if financial files were confirmed at Pre-Flight:
"Analyze the financial files for [Company Name] in the NWAi deal room. Workspace path: [WORKSPACE]. Deal room folder: [WORKSPACE]/deals/active/[Company Name] Data Room/. Model unit economics, validate projections using Bear/Base/Bull framework, assess cap table, and calculate the 10x return path. Return the full Financial Analyst Briefing."

Wait for all agents to complete before proceeding.

---

## Phase 3: Apply NWAi Scoring Rubrics

Load the scoring rubrics from:
`.claude/skills/nwai-investment-framework/references/diligence-scoring-rubrics.md`

Apply all four rubrics using the agent briefings plus prior Screening and Scout findings:

**3A — Moat Scoring**

**General applicability rule:** If any scoring sub-rubric does not apply to the company type (e.g., AI Moat for a hardware or non-AI company, LTV/CAC for a one-time-sale model), mark it N/A with a one-line reason. Do not force-apply a rubric that does not fit.

- Tier 1 General Moat (0–6): Evaluate all six dimensions individually. For each, show the dimension name, ✓ or ✗, and a one-sentence rationale. Then sum to produce the total score and state the interpretation band (No Moat / Weak Moat / Moderate Moat / Strong Moat).
- Tier 2 AI Moat (0–10): First apply the applicability gate — explicitly answer "Is this an AI-first or AI-enabled company?" If NO → mark Tier 2 as N/A with a one-line reason. If YES → run the three thin wrapper tests first (using technical-diligence briefing), then score all three categories (Cognitive/Data, Capital/Compute, Vertical/Workflow), showing each sub-element by name with points awarded and points available. State the total and interpretation band.
- Show working for each point awarded or withheld

**3B — Risk Scoring (1–10 per category, where 1 = lowest risk and 10 = highest risk)**
- Execution Risk: team depth, key-person dependency (from company-researcher + risk-assessor)
- Market Risk: adoption barriers, incumbent response, timing (from market-analyst + competitive-intelligence)
- Financial Risk: runway, burn, unit economics (from company-researcher + financial-analyst)
- Technical Risk: TRL rating, regulatory path (from technical-diligence + risk-assessor)
- Competitive Risk: moat score, market crowding, Big Tech overlap (from competitive-intelligence + risk-assessor)
- Flag any score ≥ 8 as critical; flag as deal-breaker if 2+ scores are 9+, or any is 10

**3C — Financial Model Inputs**
Use financial-analyst briefing as primary source. If financial-analyst did not run (no files), extract from company-researcher: revenue/ARR, runway, pricing model, any disclosed unit economics.
Outline Bear/Base/Bull revenue projection using rubric benchmarks.
List any missing inputs the team must request from the founder.

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
Conclusion: [2–3 sentences — synthesized from market-analyst and competitive-intelligence briefings. What does the research confirm or challenge about the market discontinuity and TAM? What does it mean for the thesis?]
Biggest uncertainty: [1 sentence — the one unresolved market question that most affects confidence.]

---

**TECHNICAL VALIDATION**                                             [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Q3 (Moat Assessment) and Technology (Phase 2). State what the Scout thesis claims about technical defensibility and architecture.]
Conclusion: [2–3 sentences — synthesized from technical-diligence briefing. What do the thin wrapper test, TRL assessment, and IP signals confirm or challenge? Is the technical moat real?]
Biggest uncertainty: [1 sentence — the key technical unknown.]

---

**TEAM VALIDATION**                                                  [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Team score (Phase 2). State what the Scout thesis claims about founder/team fit for this specific opportunity.]
Conclusion: [2–3 sentences — synthesized from company-researcher and risk-assessor briefings. What does the research confirm or challenge about the team's ability to execute this thesis?]
Biggest uncertainty: [1 sentence — the key team gap or open question.]

---

**COMMERCIAL VALIDATION**                                            [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Traction and GTM scores (Phase 2). State what the Scout thesis claims about commercial traction and the path to $10M ARR.]
Conclusion: [2–3 sentences — synthesized from company-researcher (commercial validation section) briefing. What does the research confirm about revenue quality, customer evidence, and GTM motion?]
Biggest uncertainty: [1 sentence — the key commercial unknown.]

---

**COMPETITIVE VALIDATION**                                           [🟢 / 🟡 / 🔴]
Hypothesis: [1 sentence — derived from Scout Q5 (Adjacent Displacement Risk) and Q4 (Ecosystem Role). State what the Scout thesis claims about competitive positioning and defensibility.]
Conclusion: [2–3 sentences — synthesized from competitive-intelligence and risk-assessor briefings. What do the competitor moat gap analysis and hyperscaler threat level confirm or challenge?]
Biggest uncertainty: [1 sentence — the biggest competitive unknown.]

---

**FINANCIAL VALIDATION**                                             [🟢 / 🟡 / 🔴]
[If financial-analyst ran successfully:]
Hypothesis: [1 sentence — derived from Scout financial context (ARR, stage, round). State what the Scout thesis implies about the path to a 10x return.]
Conclusion: [2–3 sentences — synthesized from financial-analyst briefing. What do the unit economics, projection validation, and 10x return path analysis confirm or challenge?]
Biggest uncertainty: [1 sentence — the key financial unknown.]

[If financial files were not available:]
🔴 **INCOMPLETE — Financial files not provided.**
Financial Analyst Agent did not run. Financial Validation conclusions cannot be generated.
This section must be completed before the DD Report can be scored.
Required files: financial model/projections, historical P&L, cap table.

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

6. **Part F — Recommended Next Steps**: Three elements: (a) Verdict table — one row, verdict label + rationale; (b) Recommended DD Actions — numbered list of 4–6 sequenced actions; (c) Kill Conditions table — 3-column (Kill Condition | Trigger | Verdict), 2–4 rows.

After generating the file, confirm the save path and provide a link to the file.
