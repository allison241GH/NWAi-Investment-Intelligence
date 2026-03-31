---
description: Run NWA Scout Q assessment and map deal to TechGroup theme + SMEs
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, mcp__nwai-dealum__update_application, WebSearch, Read, Bash, Write
argument-hint: [company-name | application-id]
---

Run the full NWA Scout Q assessment on a Tech deal and map it to a TechGroup investing theme with recommended member SMEs. Arguments: $ARGUMENTS

**Global formatting rule — apply to all output in this command:** Write every prose field, assessment answer, finding, and recommendation as single continuous lines. Do not insert manual line breaks within any sentence or paragraph. The Cowork UI handles word wrap — hard line breaks inside prose render as broken, choppy text. This applies to all Scout Q answers, theme rationale, flag text, and next-step notes.

## Step 1: Gather Deal Information

Fetch the application from Dealum using `get_application` or `list_applications` with the company name or ID from $ARGUMENTS.

If additional context is needed (website, LinkedIn, recent news):
- Use WebSearch to find: company website, founder LinkedIn profiles, Crunchbase profile, recent press
- Synthesize findings into a company brief before proceeding

## Step 1b: Load Prior Stage Outputs from Workspace

Before beginning the Scout assessment, check the workspace deals folder for a prior Screening output for this company.

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
ls "${WORKSPACE}/deals/" 2>/dev/null
```

Search for files matching: `[Company Name] - Triage Report*.docx`

- Use the Read tool to load the most recent matching file (sort by YYYY-MM-DD date in filename; take the highest)
- If multiple versions exist, surface a note: "Found [N] Triage Report version(s) — loading most recent ([date])"
- If no file is found, note "No Triage Report found in workspace — proceeding without prior screen context" and continue without blocking

**From the Triage Report, extract and carry forward into Scout scoring:**
- Hard gate verdicts (MET / FAIL / UNCLEAR for each gate)
- All red (❌) and yellow (⚠️) flags identified at screening
- Opportunity Score and Readiness Score with per-dimension breakdown (D1–D5 individual scores)
- Deal structure concerns (SAFE, LLC, C-Corp conversion required, no lead investor)
- AI Wrapper Assessment rating and basis statement

These are the baseline for Scout scoring — do not re-derive what screening already established. The per-dimension Triage scores are the starting point for delta tracking at Scout. If a flag was raised at screening, treat it as an open item unless new evidence in this session explicitly resolves it.

---

## Step 1c: Launch Scout Research Agents in Parallel

Before scoring, launch research agents to build an independent evidence base. Inform the user: "Launching 4 research agents in parallel — this takes 3–5 minutes. I'll begin scoring when they complete."

Use the Task tool to launch **all agents simultaneously**:

**Agent 1 — company-researcher:**
"Research [Company Name] for NWAi Scout assessment. Website: [URL if known]. Known founders: [names if known]. Include commercial validation signals. Return the full Company Research Briefing."

**Agent 2 — market-analyst:**
"Validate the market for [Company Name] for NWAi Scout. They operate in [sector/description]. Website: [URL if known]. Test for structural discontinuity, validate TAM/SAM independently, and score market timing. Return the full Market Analysis Briefing."

**Agent 3 — competitive-intelligence:**
"Research the competitive landscape for [Company Name] for NWAi Scout. They operate in [sector/description]. Website: [URL if known]. Map direct competitors, strategic incumbents, positioning, and moat inputs. Return the full Competitive Intelligence Briefing."

**Agent 4 — technical-diligence:**
"Run a light technical assessment of [Company Name] for NWAi Scout. Website: [URL if known]. Run all three thin wrapper tests, estimate TRL, and flag any IP or architecture signals. Return the full Technical Diligence Briefing — focus on thin wrapper verdict and TRL."

Wait for all agents to complete before proceeding to Phase 1 scoring.

Use agent findings as the primary research input throughout Steps 2–4. Do not re-derive what agents have already established.

---

## Step 2: Run Phase 1 — Viability (Scored)

Load the Scout Q framework from:
`.claude/skills/nwai-investment-framework/references/scout-questions.md`

Score each Phase 1 dimension on the 0–5 scale defined in scout-questions.md. Show delta from Triage (↑ raised / → confirmed / ↓ lowered) for Q1, Q2, and Q3 which overlap with Triage Opportunity dimensions.

- **Q1: Category & Market Discontinuity** — new category creator vs. optimizer; lifecycle horizon; structural shift test. Score 0-5. Triage overlap: D1.
- **Q2: Market Opportunity** — TAM/SAM bottoms-up validated; 10x support; market growth. Score 0-5. Triage overlap: D2.
- **Q3: Moat Assessment** — use the AI Moats Framework as analytical reference. Output a distilled 4-column table verdict (Primary Moat | Strength | Primary Threat | Verdict). Do NOT enumerate moat types by number or produce a checklist. The output is a judgment. Rating: STRONG / DEVELOPING / WEAK / NONE. Triage overlap: D4.

Load the AI Moats Framework from:
`.claude/skills/nwai-investment-framework/references/ai-moats-framework.md`

## Step 3: Run Strategic Dimensions — New at Scout

Score each strategic dimension on the 0–5 scale defined in scout-questions.md. These have no Triage equivalent — mark as NEW in the Score Summary.

- **Q4: Ecosystem Role** — platform creator vs. follower; flywheel potential; platform dependency risk. Score 0-5.
- **Q5: Adjacent Displacement Risk** — define core use case; list functional equivalents; identify emerging displacement technology and timeline. Score 0-5 (inverted: 5 = lowest risk).
- **Q6: Macro Tailwind** — assess all four dimensions (Customer / Technology / Regulatory / Economic) on a 10-year horizon. One line per dimension. Score 0-5.

## Step 4: Run Phase 2 — Execution (Scored)

Score each Phase 2 dimension on the 0–5 scale defined in scout-questions.md. Each item = one line in the output. Show delta from Triage for Team (D3) and Traction (D5).

- **Team** — domain credibility + key strength + key gap. Include Product team fit (✓/Partial/Gap) and Market team fit (✓/Partial/Gap) on the same line. Score 0-5. Triage overlap: D3.
- **Technology** — TRL rating + thin wrapper or deep IP + biggest replication risk. Score 0-5.
- **Traction** — revenue/pipeline figures + named customers + one retention signal. Score 0-5. Triage overlap: D5.
- **GTM / Path to $10M** — GTM motion + key milestone + CAC/LTV if known. Score 0-5.
- **Exit** — top 3 acquirers with one-line rationale each. Hold period. 10x viable: YES / STRETCH / UNLIKELY. Not scored numerically.

## Step 4b: Calculate Scout Conviction Score

Using scores from Phase 1 (Q1, Q2, Q3), Strategic (Q4, Q5, Q6), and Phase 2 (Team, Tech, Traction, GTM):

- Phase 1 weighted score = (Q1 + Q2 + Q3-mapped) / 15 × 6.0 (40% weight)
- Strategic weighted score = (Q4 + Q5 + Q6) / 15 × 3.0 (20% weight)
- Phase 2 weighted score = (Team + Tech + Traction + GTM) / 20 × 8.0 (40% weight)
- **Scout Conviction Score = sum of three weighted scores (max 17.0)**

Q3 moat rating maps to numeric: STRONG=5, DEVELOPING=3, WEAK=1, NONE=0.

Conviction thresholds: 14-17 = High (advance with confidence) | 10-13 = Moderate (advance with watch items) | 7-9 = Low (Watch only if catalyst imminent) | <7 = Decline.

## Step 5: Assign to TechGroup Theme

Match the company to one of the 5 NWAi TechGroup investing themes from SKILL.md:

1. Infrastructure & Foundational Stack
2. SW Enabled HW, Physical AI & Robotics
3. WorkTech & Vertical Enterprise OS
4. Data Sovereignty, Security, Trust
5. FinTech (incl RE)

Select the primary theme (best fit). No rationale needed — just state the theme assignment.

**Lead and SME assignment:** Output as "TBD — Pending Dealum API" for both Lead and SMEs. Do not populate named individuals.

## Step 6: Produce Scout Assessment Report (2-Page Format)

Output the Scout Assessment Report using the 2-page format defined in scout-questions.md.

**Page 1 — Scorecard** (all tables, no prose):
1. Triage Carry-Forward block
2. Product & Market Positioning table (Category Type | Lifecycle Horizon | Ecosystem Role Score | Adjacent Risk Score)
3. Moat Assessment table (Primary Moat | Strength | Primary Threat | Verdict)
4. Macro Trends table (Dimension | 10-yr Direction | Thesis Impact)
5. Analyst Verdict Block (Recommendation | Scout Conviction Score | Verdict | What You Have to Believe | Where's the Bet | Fear | Greed)
6. Score Summary table with delta from Triage for overlapping dimensions

**Page 2 — Rationale** (bullet clusters, no paragraphs):
1. Adjacent & Emerging Tech (Core use case / Functional equivalents / Emerging displacement)
2. Phase 1 Viability — bullet clusters per section (3-4 bullets each; finding/fact/implication format)
3. Phase 2 Execution table (one scored line per dimension)
4. Flags (❌ Red / ⚠️ Yellow — one line each)
5. Targeted Diligence Questions (3-5 numbered bullets — specific to this deal's risks)
6. Dealum step, tags, next action

## Step 6b: Generate Scout Assessment Report as Word Document

Read the docx skill instructions from:
`$(find /sessions -name "SKILL.md" -path "*/.skills/skills/docx/*" 2>/dev/null | head -1)`

Then generate a professional .docx file of the Scout Assessment Report using Node.js and the `docx` npm package. Locate the workspace dynamically and save to the deals subfolder:
```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
mkdir -p "${WORKSPACE}/deals/active"
```
Output path: `${WORKSPACE}/deals/active/[Company Name] - Scout Assessment Report [YYYY-MM-DD].docx`

**Document structure and formatting:**

Use US Letter page size (12240 × 15840 DXA), 1-inch margins, Arial font. Apply a consistent NWAi color scheme: dark navy header (`1F3864`) for section banners, light blue shading (`D5E8F0`) for highlight rows. Include a header on every page with "NWAi TechGroup — Scout Assessment Report" left-aligned and the scout date right-aligned using a tab stop.

The Word document must contain all of the following sections in order, matching the 2-page format from Step 6:

**Page 1 — Scorecard:**
1. **Title block** — Company name (large, bold), "NWAi TechGroup Scout Assessment" subtitle, scout date, and Recommendation badge (ADVANCE TO DILIGENCE / WATCH / DECLINE) rendered as a colored inline text block.
2. **Triage Carry-Forward table** — 2-column table: Opportunity Score, Readiness Score, Hard Gates, AI Wrapper Rating, Prior Red Flags, Prior Yellow Flags.
3. **Product & Market Positioning table** — 4-column table: Category Type | Lifecycle Horizon | Ecosystem Role Score | Adjacent Risk Score.
4. **Moat Assessment table** — 4-column table: Primary Moat | Strength | Primary Threat | Verdict.
5. **Macro Trends table** — 3-column table: Dimension | 10-yr Direction | Thesis Impact (4 rows).
6. **Analyst Verdict Block** — 2-column table with labeled rows: Recommendation, Scout Conviction Score, Verdict, What You Have to Believe, Where's the Bet, Fear, Greed. Use navy header row.
7. **Score Summary table** — Dimension | Triage Score | Scout Score | Delta (10 rows). Show ↑/→/↓ delta for Triage-overlapping dimensions; "NEW" for strategic dimensions.

**Page 2 — Rationale:**
8. **Adjacent & Emerging Tech** section — 3 bullet points: Core use case, Functional equivalents, Emerging displacement.
9. **Phase 1 Viability** section — three subsections (Category & Market Discontinuity, Market Opportunity, Moat), each as a bullet cluster of 3-4 bullets.
10. **Phase 2 Execution table** — 3-column table (Dimension | Score | Assessment) with rows for Team, Technology, Traction, GTM/Path to $10M, Exit.
11. **Flags** section — ❌ Red flags and ⚠️ Yellow flags as a bullet list.
12. **Targeted Diligence Questions** — numbered list, 3-5 items.
13. **Footer row** — Dealum step, suggested tags, next action.
14. **Page footer** on every page — "NWAi Investment Intelligence — Confidential" left-aligned, page number right-aligned.

After generating the file, confirm the save path to the user and provide a link to the file.

## Step 7: Update Dealum

Use `update_application` to:
- Move the application step to "Scout/IntroCall"
- Add tag: theme name only (e.g., "Theme-WorkTech") — do not add lead member tags until Dealum API integration is complete

Confirm the Dealum update to the user.

## Step 8: Suggest Next Action

If advancing to diligence:
"Run /diligence [company name] to generate the full DD checklist with team assignments."

If watchlist:
"Add to Dealum Watch list. Re-assess in [timeframe] when [milestone] is reached."

If declining:
"This deal does not meet NWAi Scout criteria. Recommend declining with reason: [key weakness]."
