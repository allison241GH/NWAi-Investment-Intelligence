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

## Step 4c: Founder Claims Reconciliation & Credibility Cap

**Applies to any Scout scoring pass — initial or update — whose inputs include founder-provided follow-up material** (a written DD response, email answers to diligence questions, an updated deck, or post-call materials) that supersedes earlier founder materials.

**Calibration case: RootCause.ai, July 2026 (pipeline-decisions-log.md Decision 10).** The June 16 Scout update flagged every individual discrepancy in the company's DD Response (production tech ≠ deck framing, headline ROI unbooked) yet net-*upgraded* conviction 11.8→12.9 from self-reported logos and channel names in the same document. A TechGroup member read the same document as a disqualifying deck-vs-reality discrepancy pattern, and the deal was passed. The member was right; the scoring machinery was wrong. This step encodes the correction.

1. **Reconcile before re-scoring.** List every load-bearing claim from the earlier materials — core technology architecture, quantified customer ROI/value delivered, traction figures, team credentials — and classify each against the new material: **CONFIRMED / QUALIFIED / WALKED BACK**. Render the reconciliation as a table in the report (Claim | New-Material Reality | Classification). Only after this table is complete may any dimension be re-scored.

2. **Walked-back claims are a credibility signal, not a diligence item.** One WALKED BACK classification on a load-bearing claim = ⚠️ Yellow Flag stated in the Analyst Verdict Block (not only in the Flags list). **Two or more = ❌ Red Flag: founder-credibility discrepancy pattern** — the recommendation may not be ADVANCE until the walked-back claims are independently re-verified; default to DECLINE, or WATCH with a named re-verification trigger.

3. **Credibility Cap on conviction.** A document that walks back a load-bearing claim cannot produce a net increase in Scout Conviction Score, regardless of what favorable new information it also contains. Score decreases it justifies still apply.

4. **Reported-tier evidence cannot raise scores.** Self-reported confirmations in founder-provided material (named customers, named channel partners, self-measured metrics) are Reported-tier under the Citation Contract. They may resolve open questions and inform diligence questions, but a dimension score may only be *raised* on independently verified evidence (reference call, signed contract, public record, third-party source). Apply symmetrically: do not defer the founder's unfavorable admissions to "future diligence" while crediting their favorable claims immediately.

## Step 5: Assign to TechGroup Theme

Match the company to one of the 5 NWAi TechGroup investing themes from SKILL.md:

1. AI Infrastructure & Agent-Era Backbone
2. SW Enabled HW, Physical AI & Robotics
3. WorkTech & Vertical AI OS
4. Data Sovereignty, Security & AI Trust
5. Agentic Systems & AI Ops

Select the primary theme (best fit). No rationale needed — just state the theme assignment.

**Lead and SME assignment:** Output as "TBD — Pending Dealum API" for both Lead and SMEs. Do not populate named individuals.

## Step 6: Produce Scout Assessment Report (Signal-First Member Format v2.1)

Output the Scout Assessment Report using the **Signal-First Member Format (v2.1)** defined in scout-questions.md. Two binding rules: **(1) member-first structure** — the report is built around signals, insights, and actions, with all machinery in the deal-team appendix; **(2) the analyst-voice rule** — every sentence in a synthesis cell must make a judgment, state the single fact the judgment stands on, or name what it means for the deal; synthesis cells lead with the insight and stay ≤ 60 words. Findings belong to the agent briefings and appendix — write the "so what," not the findings recap.

**Apply the Citation Contract** (`.claude/skills/nwai-investment-framework/references/citation-contract.md`): every external fact carries an inline `[n]` marker (attached to anchor facts in synthesis cells); merge the four research agents' `── SOURCES ──` blocks into one enumerated list in Appendix D (dedupe, renumber); carry confidence tags through; keep analytic judgments as judgments.

**Member surface (~2 pages) — in this order:**
1. **Analyst Verdict** (first block): Recommendation | One-Sentence Verdict | Single Biggest Risk | Conviction (what the research supports): X/19 + band + one plain line | Criteria Fit (does it fit what NWA funds): X/45 + band + one plain line | Divergence note ONLY when the two scores disagree by more than one band (omit when convergent) | What You Have to Believe | Where's the Bet | Fear | Greed. If the Step 4c credibility cap fired, the ⚠️/❌ founder-credibility line appears here.
2. **The Six Signals — Scout depth**: a **3-column table** (`# · Signal | Verdict · Score | Synthesis — the "so what"`), one row per signal. Signal 1 ← Q1 + Q1b + Blue Ocean. Signal 2 ← Q2 + Q6 + TAM/SAM/SOM (conclusion only — numbers to Appendix B2). Signal 3 ← Phase 2 Team, **leading with the highest structural signal** (founder-born vs institution-conceived/hired, solo, split commitment) before fit and gaps. Signal 4 ← Q3 + Q4 + Q5 + adjacent/emerging tech + moat-side technology. Signal 5 ← Q7 (lead with plain helps/hurts). Signal 6 ← Q8 (lead with plain keeps/leaks). **No per-signal "Probe next" lines** — probes route to section 6. Supporting detail (TAM/SAM/SOM numbers, macro one-liners, moat two-tests, replicability timings, posture labels) → Appendix B2.
3. **Execution & Path**: opens with the mandatory **GTM Model line** (`Model: [motion]. Consequence: [what that model means for speed, scalability, and risk given this deal's other facts].`), then the table (Dimension | Score | Assessment — analyst voice): Traction, GTM/Path to $10M, Technology (delivery), Exit (unscored, incl. the consequence of missing the window).
4. **Founder Claims Reconciliation** (only when Step 4c ran): result line + Claim | New-Material Reality | Classification table.
5. **Flags** (❌ / ⚠️ — one line each).
6. **Diligence Questions & Next Actions**: 3–5 numbered questions (≥1 targets a load-bearing Reported/Unverified claim; absorbs every probe raised by the signals), then who to engage / what to request, and the Dealum step / tags / next action line.

**Deal-team appendix:**
- A · Triage Carry-Forward (Screen verdicts + conviction, gates, prior flags, mapped baseline via the conversion rubric)
- B · Score Summary (13-row delta table — unchanged mechanics; one-line explanation on any ≥2 divergence)
- B2 · Supporting reads (TAM|SAM|SOM line · four macro one-liners · moat two-test results · replicability timings · Q7/Q8 posture deal-team lines)
- C · Scoring arithmetic (both scores' weighted math)
- D · Sources (merged `[n]` list; every inline marker resolves here)

## Step 6b: Generate Scout Assessment Report as Word Document

Generate a professional .docx file of the Scout Assessment Report using Node.js and the `docx` npm package (installed under `scripts/` — run with `node`, requiring `docx` from `scripts/node_modules`).

Output path (create the folder if needed):
`deals/active/[Company Name]/Reports/[Company Name] - Scout Assessment Report [YYYY-MM-DD].docx`

**Document structure and formatting:**

Use US Letter page size (12240 × 15840 DXA), 1-inch margins, Arial font. Apply a consistent NWAi color scheme: dark navy header (`1F3864`) for section banners, light blue shading (`D5E8F0`) for highlight rows. Include a header on every page with "NWAi TechGroup — Scout Assessment Report" left-aligned and the scout date right-aligned using a tab stop.

**⚠️ Page number API (docx v9 — do not deviate):** Use `new TextRun({ children: [PageNumber.CURRENT] })` inside the footer paragraph — this matches `scripts/dd-report-generator.js` and produces valid OOXML. Do NOT use `PageNumberElement` (produces `<w:pgNum/>` directly in `<w:p>`, which Microsoft Word rejects with a file-open error). `SimpleField('PAGE')` is an acceptable fallback if `PageNumber.CURRENT` is unavailable.

The Word document mirrors the Step 6 structure exactly:

**Member surface:**
1. **Title block** — Company name (large, bold), "NWAi TechGroup Scout Assessment" subtitle, scout date, Recommendation badge (colored inline text block).
2. **Analyst Verdict table** — 2-column labeled rows per Step 6 item 1 (navy header); divergence-note row rendered only when divergent.
3. **Six Signals table** — 3 columns (# · Signal | Verdict · Score | Synthesis), navy header row, alternating row shading; synthesis cells ≤ 60 words, analyst voice.
4. **Execution & Path** — GTM Model line (bold "Model:" / "Consequence:") above a 3-column table (Dimension | Score | Assessment): Traction, GTM/Path to $10M, Technology (delivery), Exit.
5. **Founder Claims Reconciliation** (when Step 4c ran) — result line + 3-column table.
6. **Flags** — bullet list.
7. **Diligence Questions & Next Actions** — numbered list + engagement/request lines + pipeline line.

**Deal-team appendix (new page, clearly labeled "Deal-Team Appendix"):**
8. **A · Triage Carry-Forward table** — Preliminary Call + Triage Conviction, compact S1–S6 verdict line, Mapped Opportunity Baseline (/25), Mapped Readiness Baseline (/20), Hard Gates, prior flags. (Legacy numeric reports: historical scores in place of the mapped rows.)
9. **B · Score Summary table** — Dimension | Triage (mapped) | Scout | Delta (13 rows; ↑/→/↓, NEW, divergence explanations).
10. **B2 · Supporting reads** — TAM|SAM|SOM line, macro one-liners, moat two-tests, replicability timings, Q7/Q8 posture lines.
11. **C · Scoring arithmetic** — short block showing both scores' group math.
12. **D · Sources** — enumerated list, one row per source: `[n] Title / publisher — URL or doc locator (retrieved YYYY-MM-DD) — Verified/Reported`.
13. **Page footer** on every page — "NWAi Investment Intelligence — Confidential" left-aligned, page number right-aligned.

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
