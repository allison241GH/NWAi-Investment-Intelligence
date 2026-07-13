---
description: Run NWA Scout Q assessment and map deal to TechGroup theme + SMEs
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, mcp__nwai-dealum__update_application, WebSearch, Read, Bash, Write
argument-hint: [company-name | application-id]
---

Run the full NWA Scout Q assessment on a Tech deal and map it to a TechGroup investing theme with recommended member SMEs. Arguments: $ARGUMENTS

**Global formatting rule — apply to all output in this command:** Write every prose field, assessment answer, finding, and recommendation as single continuous lines. Do not insert manual line breaks within any sentence or paragraph — hard line breaks inside prose render as broken, choppy text. This applies to all Scout Q answers, theme rationale, flag text, and next-step notes.

## Step 1: Gather Deal Information

Fetch the application from Dealum using `get_application` or `list_applications` with the company name or ID from $ARGUMENTS.

If additional context is needed (website, LinkedIn, recent news):
- Use WebSearch to find: company website, founder LinkedIn profiles, Crunchbase profile, recent press
- Synthesize findings into a company brief before proceeding

## Step 1b: Load Prior Stage Outputs and Apply the Conversion Rubric

Before beginning the Scout assessment, check the deal folder for a prior Screening output: look in `deals/active/[Company Name]/Reports/` (and `deals/archive/[Company Name]/Reports/` for reopened deals) for files matching `[Company Name] - Triage Report*.docx`.

- Use the Read tool (or `textutil -convert txt -stdout` via Bash for .docx) to load the most recent matching file (sort by YYYY-MM-DD date in filename; take the highest)
- If multiple versions exist, surface a note: "Found [N] Triage Report version(s) — loading most recent ([date])"
- If no file is found, note "No Triage Report found — proceeding without prior screen context" and continue without blocking

**Then load the Screen→Scout conversion rubric:**
`.claude/skills/nwai-investment-framework/references/screen-scout-conversion-rubric.md`

**From a Six-Signal Triage Report (July 2026 onward), extract and carry forward:**
- The Verdict Block: PRELIMINARY CALL, TRIAGE CONVICTION, signal roll-up, Live Pitch Questions
- Hard gate verdicts (✅ / ❌ / ⚠️ for each gate) — gates carry as gates; any FAIL → Thesis Fit = 0
- All six signal verdicts + confidence tags, the Commercial Proof line, and the Signal 4 evidence tags (Goliath / LLM Ingestion / Wrapper / Memory Lock-in / Stack; Track B: TRL / IP / unit economics) — the tags carry into Q3 as evidence
- All red (❌) and yellow (⚠️) flags, coherence findings, and any Pattern note
- Deal Facts — structure & syndication are IntroCall negotiation items, not flags or kills; carry them forward as such, do not re-score them as penalties
- Signal 5 (Agent-Era Posture) and Signal 6 (Protect Alpha) reads — these are priors for Q7 and Q8, which Scout scores fresh; they do NOT map to baseline numbers

**Apply the conversion rubric mechanically** — translate the signal verdicts into the per-dimension numeric baseline (Opportunity D1–D5 /25 + Readiness R1–R4 /20) exactly per the rubric table. This is mechanical translation of judgments already made — no re-judging, no fresh derivation. The mapped values are the baseline for delta tracking (↑ / → / ↓) and the Thesis Fit input.

*(Legacy numeric Triage Reports — pre-July 2026, found on archived deals — already carry per-dimension D1–D5 and Readiness scores; use those directly as the baseline, skipping the rubric.)*

Do not re-derive what screening already established. If a flag was raised at screening, treat it as an open item unless new evidence in this session explicitly resolves it. A commitment UNCONFIRMED ⚠️ finding carries as an open item with no baseline cap.

---

## Step 1c: Launch Scout Research Agents in Parallel

Before scoring, launch research agents to build an independent evidence base. Inform the user: "Launching 4 research agents in parallel — this takes 3–5 minutes. I'll begin scoring when they complete."

Use the Task tool to launch **all agents simultaneously**:

**Agent 1 — team-analyst:**
"Research [Company Name] for NWAi Scout assessment. **mode: scout** (lightweight intro-call-ready depth — skip Staff Deep-Dive and Network Map, produce one-line verdicts for Product-Team Fit and Market-Team Fit). Website: [URL if known]. Known founders: [names if known]. Include commercial validation signals. Return the full Team Analyst Briefing."

**Agent 2 — market-analyst:**
"Validate the market for [Company Name] for NWAi Scout. They operate in [sector/description]. Website: [URL if known]. Test for structural discontinuity, validate TAM/SAM independently, and score market timing. Return the full Market Analysis Briefing."

**Agent 3 — competitive-positioning-analyst:**
"Research the competitive landscape for [Company Name] for NWAi Scout. They operate in [sector/description]. Website: [URL if known]. Map direct competitors, strategic incumbents, positioning, and moat inputs. Return the full Competitive Positioning Analyst Briefing."

**Agent 4 — technology-analyst:**
"Run a light technical assessment of [Company Name] for NWAi Scout. Website: [URL if known]. Run all three thin wrapper tests, estimate TRL, and flag any IP or architecture signals. Return the full Technology Analyst Briefing — focus on thin wrapper verdict and TRL."

Wait for all agents to complete before proceeding to Phase 1 scoring.

Use agent findings as the primary research input throughout Steps 2–4. Do not re-derive what agents have already established. Each agent returns a `── SOURCES ──` block and inline `[n]` markers per the Citation Contract — preserve these; they are merged into the report's Sources section in Step 6.

---

## Step 2: Run Phase 1 — Viability (Scored)

Load the Scout Q framework from:
`.claude/skills/nwai-investment-framework/references/scout-questions.md`

Score each Phase 1 dimension on the 0–5 scale defined in scout-questions.md. Show delta from the mapped Triage baseline (↑ raised / → confirmed / ↓ lowered) for Q1, Q2, and Q3 which overlap with the carried-forward Opportunity dimensions. **Explained-divergence rule:** when your Scout score departs from the mapped baseline by ≥2 on any dimension, the Score Summary must carry a one-line explanation of why — divergence is fine, silence about it is not.

- **Q1: Category & Market Discontinuity** — new category creator vs. optimizer; lifecycle horizon; structural shift test. Score 0-5. Triage overlap: D1.
- **Q1b: Demand Signal Test** — demand-pull vs. technology-push. Required outputs: Demand type (DEMAND-PULL / TECHNOLOGY-PUSH / MIXED), Evidence (2–3 specific signals: regulatory mandates, buyer public statements, RFP/procurement activity, analyst category creation, budget allocation surveys), Strongest signal (one sentence). Score 0-5. ⚠️ Score ≤ 2 triggers Yellow Flag: "Demand signal weak — technology-push risk. Validate with direct buyer interviews before advancing to Diligence." No Triage equivalent — mark NEW in Score Summary.
- **Q2: Market Opportunity** — TAM/SAM bottoms-up validated; 10x support; market growth. Score 0-5. Triage overlap: D2.
- **Q3: Moat Assessment** — use the AI Moats Framework as analytical reference. Output a distilled 4-column table verdict (Primary Moat | Strength | Primary Threat | Verdict). Do NOT enumerate moat types by number or produce a checklist. The output is a judgment. Rating: STRONG / DEVELOPING / WEAK / NONE. Triage overlap: D4.

Load the AI Moats Framework from:
`.claude/skills/nwai-investment-framework/references/ai-moats-framework.md`

## Step 3: Run Strategic Dimensions — New at Scout

Score each strategic dimension on the 0–5 scale defined in scout-questions.md. These have no Triage equivalent — mark as NEW in the Score Summary.

- **Q4: Ecosystem Role** — platform creator vs. follower; flywheel potential; platform dependency risk. Score 0-5.
- **Q5: Adjacent Displacement Risk** — define core use case; list functional equivalents; identify emerging displacement technology and timeline. Score 0-5 (inverted: 5 = lowest risk).
- **Q6: Macro Tailwind** — assess all four dimensions (Customer / Technology / Regulatory / Economic) on a 10-year horizon. One line per dimension. Score 0-5.
- **Q7: Agent-Era Readiness** — apply the doorway question and the three test dimensions. Lead the output with the plain question *"does the agent wave help or hurt this company?"* (HELPS / HURTS / MIXED) in member-readable language; if it isn't already in its strongest position, add "Could get stronger if:" and "What to watch:". Keep the internal posture label (Threatened / Riding / Enabling / Insulated) on the deal-team line only. Score 0-5. This is the agent-era durability test — broader than Q5; it asks whether the *problem itself* survives the substrate shift. Screen's Signal 5 posture is the prior — score fresh, note agreement or departure.
- **Q8: Alpha-AI Sovereignty** — apply the alpha-flow doorway question (*"where does the alpha flow — does it stay home, or drain up to the lab?"*) and the three reads per scout-questions.md: Alpha Map, Dependency Read (provider-terms status VERIFIED / CLAIMED / ABSENT), Customer Sovereignty Read. Lead the output with the plain member-facing read (KEEPS / MIXED / LEAKS) plus "Could get stronger if:" and "What to watch:"; keep the internal posture (Leaking / Hedged / Sovereign / Enabler) on the deal-team line only. Apply the conduit cap (3/5 roadmapped / 2/5 unaware — verified containment clears only at Diligence Tier 4). Score 0-5; N/A if no model supply chain (excluded from the Strategic raw total, noted in the report). Screen's Signal 6 read is the prior — score fresh.

Load the lens frameworks from:
`.claude/skills/nwai-investment-framework/references/agent-era-readiness-framework.md`
`.claude/skills/nwai-investment-framework/references/alpha-ai-sovereignty-framework.md`

## Step 4: Run Phase 2 — Execution (Scored)

Score each Phase 2 dimension on the 0–5 scale defined in scout-questions.md. Each item = one line in the output. Show delta from Triage for Team (D3) and Traction (D5).

- **Team** — Structured team quality assessment across five dimensions. Score 0-5 overall. Triage overlap: D3. Assess each sub-dimension and roll up to a single score with a one-line rationale.

  **Sub-dimension 1 — Founder-Market Fit:** Why is THIS founder uniquely positioned for THIS problem? Look for: domain immersion (10+ years working the problem, not just adjacent to it), personal pain point origin, unfair access to customers or data. Flag if the founder entered the space recently or opportunistically. Rate: STRONG / MODERATE / WEAK.

  **Sub-dimension 2 — Execution Evidence:** Has this team shipped before under pressure? Look for: prior product launched to market (not just built), experience managing a team through adversity, prior company scaled beyond $1M revenue or meaningful user base, evidence of pivoting successfully. Do NOT conflate credentials with execution — a PhD is not execution evidence. Rate: STRONG / MODERATE / WEAK.

  **Sub-dimension 3 — Co-founder / Team Dynamics:** Any signals of alignment or misalignment? Look for: complementary skill sets (technical + commercial), co-founders who have worked together before, equity split that reflects genuine contribution parity, public or subtle signals of tension (conflicting messaging, one founder absent from materials, unequal LinkedIn presence). Flag solo founder. Flag if founding team roles overlap without clear delineation. Rate: ALIGNED / UNCLEAR / RISK SIGNAL.

  **Sub-dimension 4 — Referenced Credibility:** Are there third parties who have bet on this team before? Look for: prior investors who reinvested, named advisors who are real domain KOLs (not just well-known names), accelerator acceptance (YC, Techstars, NSF SBIR), enterprise customers who chose to work with this team specifically. Rate: STRONG / MODERATE / WEAK.

  **Sub-dimension 5 — Team Completeness:** Are the critical roles filled? Check: technical leadership for a tech product (CTO or equivalent with verifiable output), commercial leadership (someone who has sold before), any critical gap that would require a key hire before scaling. Include Product team fit (✓/Partial/Gap) and Market team fit (✓/Partial/Gap).

  **Team Score rationale:** Lead with the most important signal — positive or negative. At pre-significant-revenue stage, team quality is the dominant variable. A score of 4–5 requires STRONG on at least Founder-Market Fit AND Execution Evidence. A score of 1–2 requires a red flag on dynamics or a critical gap in execution evidence.
- **Technology** — TRL rating + thin wrapper or deep IP + biggest replication risk. Score 0-5.
- **Traction** — revenue/pipeline figures + named customers + one retention signal. Score 0-5. Triage overlap: D5.
- **GTM / Path to $10M** — GTM motion + key milestone + CAC/LTV if known. Score 0-5.
- **Exit** — top 3 acquirers with one-line rationale each. Hold period. 10x viable: YES / STRETCH / UNLIKELY. Not scored numerically.

## Step 4b: Calculate Scout Conviction Score and Thesis Fit Score

**Score A — Scout Conviction Score (AI research-derived, max 19.0)**

Using scores from Phase 1 (Q1, Q1b, Q2, Q3), Strategic (Q4, Q5, Q6, Q7, Q8), and Phase 2 (Team, Tech, Traction, GTM):

- Phase 1 weighted score = (Q1 + Q1b + Q2 + Q3-mapped) / 20 × 8.0 (40% weight)
- Strategic weighted score = (Q4 + Q5 + Q6 + Q7 + Q8) / 25 × 3.0 (20% weight) — if Q8 is N/A (no model supply chain), use (Q4 + Q5 + Q6 + Q7) / 20 × 3.0
- Phase 2 weighted score = (Team + Tech + Traction + GTM) / 20 × 8.0 (40% weight)
- **Scout Conviction Score = sum of three weighted scores (max 19.0 — unchanged)**

Q3 moat rating maps to numeric: STRONG=5, DEVELOPING=3, WEAK=1, NONE=0.

Conviction thresholds: 16–19 = High (advance with confidence) | 11–15 = Moderate (advance with watch items) | 7–10 = Low (Watch only if catalyst imminent) | <7 = Decline.

**Score B — Thesis Fit Score (rule-based, criteria-derived)**

This score reflects how well the deal fits NWAi's investment criteria — independent of what the research agents found about market quality or moat. It is calculated from the **mapped Triage carry-forward** (the signal verdicts translated via `screen-scout-conversion-rubric.md` in Step 1b), not from agent research. On legacy numeric Triage Reports, use the archived per-dimension scores directly.

- Hard gates: ALL MET = proceed | ANY FAIL = automatic 0 (stop — do not calculate further)
- Mapped Opportunity baseline (D1–D5 via conversion rubric): ___ / 25
- Mapped Readiness baseline (R1–R4 via conversion rubric): ___ / 20
- **Thesis Fit = [Opportunity baseline] + [Readiness baseline] = ___ / 45**

Thesis Fit thresholds: 38–45 = Strong fit | 28–37 = Qualified fit | 18–27 = Marginal fit | <18 = Structural mismatch.

**Dual Score Interpretation:**
Present both scores together and flag any significant divergence (>2 band gap between conviction level and fit level). Divergence is signal, not noise:
- High Conviction + Low Thesis Fit: Exciting company that doesn't fit NWA's criteria → Pass with referral or Watch pending structure change
- Low Conviction + High Thesis Fit: Fits criteria but research doesn't support the thesis → Conditional Watch or more diligence before advancing
- Both High: Advance with confidence
- Both Low: Decline cleanly

## Step 5: Assign to TechGroup Theme

Match the company to one of the 5 NWAi TechGroup investing themes from SKILL.md:

1. AI Infrastructure & Agent-Era Backbone
2. SW Enabled HW, Physical AI & Robotics
3. WorkTech & Vertical AI OS
4. Data Sovereignty, Security & AI Trust
5. Agentic Systems & AI Ops

Select the primary theme (best fit). No rationale needed — just state the theme assignment.

**Lead and SME assignment:** Output as "TBD — Pending Dealum API" for both Lead and SMEs. Do not populate named individuals.

## Step 6: Produce Scout Assessment Report (2-Page Format)

Output the Scout Assessment Report using the 2-page format defined in scout-questions.md.

**Apply the Citation Contract** (`.claude/skills/nwai-investment-framework/references/citation-contract.md`) when assembling this report: every external fact carries an inline `[n]` marker; merge the four research agents' `── SOURCES ──` blocks into one enumerated Sources list (dedupe identical URLs, renumber the markers); carry confidence tags through; keep analytic judgments as judgments (no fabricated citations).

**Page 1 — Scorecard** (all tables, no prose):
1. Triage Carry-Forward block (Six-Signal verdicts + Triage Conviction + mapped baseline via the conversion rubric; gates; flags)
2. Product & Market Positioning table (Category Type | Lifecycle Horizon | Ecosystem Role Score | Adjacent Risk Score)
3. Moat Assessment table (Primary Moat | Strength | Primary Threat | Verdict)
4. Macro Trends table (Dimension | 10-yr Direction | Thesis Impact)
5. Analyst Verdict Block (Recommendation | Thesis Fit Score | Scout Conviction Score | Dual Score Interpretation | Verdict | What You Have to Believe | Where's the Bet | Fear | Greed)
6. Score Summary table with delta from the mapped Triage baseline for overlapping dimensions (13 rows: Q1, Q1b, Q2, Q3/Moat, Q4, Q5, Q6, Q7, Q8, Team, Technology, Traction, GTM) — one-line explanation required on any dimension where Scout departs from the baseline by ≥2

**Page 2 — Rationale** (bullet clusters, no paragraphs):
1. Adjacent & Emerging Tech (Core use case / Functional equivalents / Emerging displacement)
2. Phase 1 Viability — bullet clusters per section (3-4 bullets each; finding/fact/implication format)
3. Phase 2 Execution table (one scored line per dimension)
4. Flags (❌ Red / ⚠️ Yellow — one line each)
5. Targeted Diligence Questions (3-5 numbered bullets — specific to this deal's risks; **at least one must target a load-bearing claim that came back Reported/Unverified from the research agents** — the citation contract's unverified set feeds here)
6. Sources (enumerated `[n]` list merged from the research-agent `── SOURCES ──` blocks; every inline `[n]` marker on Page 1/Page 2 must resolve here)
7. Dealum step, tags, next action

## Step 6b: Generate Scout Assessment Report as Word Document

Generate a professional .docx file of the Scout Assessment Report using Node.js and the `docx` npm package (installed under `scripts/` — run with `node`, requiring `docx` from `scripts/node_modules`).

Output path (create the folder if needed):
`deals/active/[Company Name]/Reports/[Company Name] - Scout Assessment Report [YYYY-MM-DD].docx`

**Document structure and formatting:**

Use US Letter page size (12240 × 15840 DXA), 1-inch margins, Arial font. Apply a consistent NWAi color scheme: dark navy header (`1F3864`) for section banners, light blue shading (`D5E8F0`) for highlight rows. Include a header on every page with "NWAi TechGroup — Scout Assessment Report" left-aligned and the scout date right-aligned using a tab stop.

**⚠️ Page number API (docx v9 — do not deviate):** Use `new TextRun({ children: [PageNumber.CURRENT] })` inside the footer paragraph — this matches `scripts/dd-report-generator.js` and produces valid OOXML. Do NOT use `PageNumberElement` (produces `<w:pgNum/>` directly in `<w:p>`, which Microsoft Word rejects with a file-open error). `SimpleField('PAGE')` is an acceptable fallback if `PageNumber.CURRENT` is unavailable.

The Word document must contain all of the following sections in order, matching the 2-page format from Step 6:

**Page 1 — Scorecard:**
1. **Title block** — Company name (large, bold), "NWAi TechGroup Scout Assessment" subtitle, scout date, and Recommendation badge (ADVANCE TO DILIGENCE / WATCH / DECLINE) rendered as a colored inline text block.
2. **Triage Carry-Forward table** — 2-column table: Preliminary Call + Triage Conviction, Six-Signal verdict line (compact: S1–S6 verdicts), Mapped Opportunity Baseline (/25), Mapped Readiness Baseline (/20), Hard Gates, Wrapper Rating (Signal 4 tag), Prior Red Flags, Prior Yellow Flags. (Legacy numeric reports: Opportunity Score, Readiness Score in place of the verdict/mapped rows.)
3. **Product & Market Positioning table** — 4-column table: Category Type | Lifecycle Horizon | Ecosystem Role Score | Adjacent Risk Score.
4. **Moat Assessment table** — 4-column table: Primary Moat | Strength | Primary Threat | Verdict.
5. **Macro Trends table** — 3-column table: Dimension | 10-yr Direction | Thesis Impact (4 rows).
6. **Analyst Verdict Block** — 2-column table with labeled rows: Recommendation, Thesis Fit Score (rule-based: mapped Opportunity + Readiness baseline / 45 + gates status), Scout Conviction Score (AI research: / 19 + threshold band), Dual Score Interpretation (one line — convergent or divergent, and what that means for the decision), Verdict, What You Have to Believe, Where's the Bet, Fear, Greed. Use navy header row. The two scores must always appear together — they are not interchangeable and divergence is signal.
7. **Score Summary table** — Dimension | Triage (mapped) | Scout Score | Delta (13 rows: Q1, Q1b/Demand Signal, Q2, Q3/Moat, Q4, Q5, Q6, Q7/Agent-Era Readiness with posture tag, Q8/Alpha-AI Sovereignty with posture tag, Team, Technology, Traction, GTM). Show ↑/→/↓ delta for baseline-overlapping dimensions; "NEW" for strategic dimensions and Q1b; append the one-line explanation on any ≥2 divergence from the mapped baseline.

**Page 2 — Rationale:**
8. **Adjacent & Emerging Tech** section — 3 bullet points: Core use case, Functional equivalents, Emerging displacement.
9. **Phase 1 Viability** section — four subsections (Category & Market Discontinuity, Demand Signal Test, Market Opportunity, Moat). Category/Market Opportunity/Moat: bullet cluster of 3-4 bullets each. Demand Signal Test: 3-line block — Demand type: DEMAND-PULL / TECHNOLOGY-PUSH / MIXED | Evidence: [2-3 signals] | Strongest signal: [one sentence].
10. **Phase 2 Execution table** — 3-column table (Dimension | Score | Assessment) with rows for Team, Technology, Traction, GTM/Path to $10M, Exit. For the Team row, expand the Assessment cell to include a 5-row sub-table: Founder-Market Fit | Execution Evidence | Co-founder Dynamics | Referenced Credibility | Team Completeness — each with a STRONG/MODERATE/WEAK or ALIGNED/RISK SIGNAL rating and a one-line note.
11. **Flags** section — ❌ Red flags and ⚠️ Yellow flags as a bullet list.
12. **Targeted Diligence Questions** — numbered list, 3-5 items. At least one targets a claim that came back Reported/Unverified from the research agents (per the Citation Contract).
13. **Sources** — enumerated list (or compact 1-column table), one row per source: `[n] Title / publisher — URL or doc locator (retrieved YYYY-MM-DD) — Verified/Reported`. Merged and renumbered from the research-agent `── SOURCES ──` blocks; every inline `[n]` marker used in the document resolves here.
14. **Footer row** — Dealum step, suggested tags, next action.
15. **Page footer** on every page — "NWAi Investment Intelligence — Confidential" left-aligned, page number right-aligned.

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
