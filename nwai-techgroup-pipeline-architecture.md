# NWAi TechGroup Deal Pipeline — Architecture Overview
*v0.12.0 | March 2026 | New World Angels Investment Intelligence*

---

## How It All Fits Together

Think of the pipeline like a **factory floor with six stations**. Raw material (a pitch) enters at Inbox and exits as a finished product (an Investment Memo). Each station has its own tools, workers (agents), and quality gates. Claude is the foreman — orchestrating the work, applying the frameworks, and making sure nothing advances without passing inspection.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        JAMIE / DEAL LEAD                            │
│                    (commands via Cowork chat)                       │
└───────────────────────────┬─────────────────────────────────────────┘
                            │  slash commands / natural language
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CLAUDE (Orchestrator)                           │
│         Reads CLAUDE.md context + nwai-investment-framework         │
│         skill at session start. Applies NWAi investing voice.       │
└────┬──────────────────┬─────────────────┬───────────────────────────┘
     │                  │                 │
     ▼                  ▼                 ▼
  Commands           Agents            Skill
  (7 commands)    (7 subagents)    (7 reference docs)
```

---

## Layer 1 — The Data Source: Dealum via MCP

**File:** `servers/dealum_server.py`
**Config:** `.mcp.json`

Dealum is NWAi's CRM. The plugin wraps the Dealum Integration API in a **Python stdio MCP server** — meaning Claude can call Dealum like any other tool, without any browser or manual lookup.

The server exposes **5 tools**:

| Tool | What It Does |
|------|-------------|
| `list_applications` | Fetch all deals; filter by tag (e.g., "Tech") |
| `get_application` | Full detail on one deal by its Dealum ID |
| `update_application` | Move a deal to a new pipeline step; add/remove tags |
| `list_members` | Fetch TechGroup members (used for SME assignment) |
| `create_application` | Add a new company to Dealum from scratch |

**Auth:** Two environment variables — `DEALUM_TOKEN` and `DEALUM_ROOM_ID` — injected at startup via `.mcp.json`. If either is missing, every tool call fails gracefully with a clear error.

**The analogy:** Dealum is the filing cabinet. The MCP server gives Claude a key so it can pull folders and put them back without you having to open the cabinet yourself.

---

## Layer 2 — The Pipeline Stages

Every deal is a Dealum application with a **step** tag that tracks its position:

```
📥 Inbox  →  🔍 Screening  →  🤝 Scout/IntroCall  →  🔬 Diligence  →  📋 DD Report  →  ✅ Decision  →  📝 Memo
```

Claude reads the step field to know what depth of analysis is appropriate (see Output Depth in CLAUDE.md). Advancing a deal = calling `update_application` with the new step name.

---

## Layer 3 — Commands (The Seven Workflows)

Each command is a markdown file in `commands/` that defines a structured workflow Claude follows when you type the slash command.

| Command | File | What It Triggers | Output |
|---------|------|-----------------|--------|
| `/sync-pipeline` | `commands/sync-pipeline.md` | `pipeline-monitor` agent → Dealum snapshot | Pipeline dashboard in chat |
| `/screen [company]` | `commands/screen.md` | `gates-and-flags-techgroup.md` → 3 hard gates + opportunity/readiness scoring | NWA Triage Report in chat + Triage Report .docx saved to deals/ |
| `/scout [company]` | `commands/scout.md` | `nwai-investment-framework` skill → Scout Q assessment + theme map | Scout Assessment report in chat + Scout Assessment .docx saved to workspace |
| `/diligence [company]` | `commands/diligence.md` | Pre-flight gate (Scout required + financial files confirmed) → 5–6 agent team → Layer 2 Hypothesis Confirmation Plan (AI-derived) + scored rubrics + 17-folder checklist | DD Kickoff Package .docx saved to deals/ |
| `/dd-report [company]` | `commands/dd-report.md` | `nwai-investment-framework` skill → scored synthesis of completed diligence | DD Investment Report .docx (11 scored sections, 2-column RAG table layout, IC-ready) saved to deals/ |
| `/decision [company] [verdict]` | `commands/decision.md` | `update_application` → Dealum updated with decision + tags | Decision recorded in Dealum |
| `/memo [company]` | `commands/memo.md` | `nwai-investment-framework` skill → Executive Summary deck | 4-slide PPTX saved to deals/ |

**The analogy:** Commands are like work orders on the factory floor. You hand one to Claude, it knows exactly which tools and frameworks to pull for that station.

---

## Layer 4 — Agents (The Research Workers)

Agents are **autonomous subprocesses** Claude can launch to do research in parallel. Each is defined by a markdown file in `agents/` describing its purpose, data sources, and output format.

### `pipeline-monitor`
- **Trigger:** "What's in the pipeline?" / `/sync-pipeline` / session startup
- **Does:** Calls `list_applications` with tag_filter="Tech", groups by step, surfaces stalled deals and suggested next actions
- **Returns:** Pipeline dashboard with deal counts per stage

### `company-researcher`
- **Trigger:** `/scout` (full) + `/diligence` (full)
- **Does:** Web research on founders, funding history, traction signals, commercial validation (contract structure, named customers, sales motion), public red flags
- **Returns:** Structured company + founder + commercial briefing → feeds Team Validation + Commercial Validation (Layer 2)

### `market-analyst` ★ NEW
- **Trigger:** `/scout` (full) + `/diligence` (full)
- **Does:** Structural discontinuity test, independent TAM/SAM/SOM validation, market timing scoring, industry dynamics, customer behavior signals
- **Returns:** Market Analysis Briefing → feeds Market Validation (Layer 2)

### `competitive-intelligence`
- **Trigger:** `/scout` (full) + `/diligence` (full)
- **Does:** Maps direct competitors and incumbent threats, alternative solutions, strategic incumbents, positioning analysis, moat input data
- **Returns:** Competitive Intelligence Briefing → feeds Competitive Validation (Layer 2)

### `technical-diligence` ★ NEW
- **Trigger:** `/scout` (light — thin wrapper + TRL) + `/diligence` (full)
- **Does:** Thin wrapper detection (3 tests), TRL assessment, IP/patent research, technical architecture signals, AI moat input data, technical team depth
- **Returns:** Technical Diligence Briefing → feeds Technical Validation (Layer 2)

### `financial-analyst` ★ NEW
- **Trigger:** `/diligence` only (requires financial files in workspace deal room)
- **Does:** Reads financial files, models unit economics, validates projections (Bear/Base/Bull), assesses cap table, calculates 10x return path
- **Returns:** Financial Analyst Briefing → feeds Financial Validation (Layer 2)

### `risk-assessor` ★ NEW
- **Trigger:** `/scout` (light — top kill risks) + `/diligence` (full)
- **Does:** Regulatory risk research, exit landscape + acquirer dynamics, execution risk signals, market and financial risk signals from public sources
- **Returns:** Risk Assessment Briefing → feeds cross-cutting risk overlay across all Layer 2 groups

**The analogy:** Agents are like junior analysts you dispatch to do legwork. At Scout, four agents do targeted research to build the assessment evidence base. At Diligence, all six run in parallel — including the financial analyst who works directly from the company's deal room files. They report back with structured briefings; Claude synthesizes them into Layer 2 conclusions.

---

## Layer 5 — The Investment Framework Skill

**Location:** `skills/nwai-investment-framework/`

This skill is the **brain trust** — NWAi's proprietary investment knowledge encoded as reference documents that Claude loads during analysis. Seven reference files:

| File | Contents | Used At |
|------|----------|---------|
| `gates-and-flags-techgroup.md` | TechGroup triage screener: 3 hard gates + 5 Opportunity dimensions (0–5, /25) + 4 Readiness dimensions (0–5, /20) + decision logic + forward-mapping notes to Scout dimensions | Screen (TechGroup) |
| `gates-and-flags.md` | Original 6-gate AutoKill framework (retained for reference; Medical/Space verticals use separate screener docs) | Screen (legacy) |
| `scout-questions.md` | Phase 1 viability (Q1–Q3, scored 0–5 with Triage delta) + 3 strategic dimensions (Q4 Ecosystem Role, Q5 Adjacent Displacement Risk, Q6 Macro Tailwind) + Phase 2 execution (scored 0–5) + Scout Conviction Score (/17) + 2-page output format | Scout |
| `diligence-scoring-rubrics.md` | Moat score (0–6 / 0–10), Risk score (1–10, includes Adjacent Displacement Risk sub-dimension), Bear/Base/Bull financial model; Layer 2 rubric-to-validation-group mapping table | Diligence |
| `dd-checklist.md` | Layer 2 Hypothesis Confirmation architecture + Layer 1 17-folder data completeness checklist; includes Layer 2 → DD Report section score mapping | Diligence |
| `ai-moats-framework.md` | Three moat types for evaluating AI company defensibility | Scout + DD Report + Memo |
| `dd-report-format-reference.md` | 11-section scored report structure, 1–5 scale mapping, exact Synergist visual layout (2-column table, 9432/1080 DXA, RAG hex colors), 5 Sharp & Succinct content rules, format drift incident log | DD Report |
| `memo-format-reference.md` | 4-slide PPTX structure, NWAi branding, ++/-- notation, "What is the Bet?" format | Memo |

**The analogy:** If commands are work orders and agents are junior analysts, the skill is the NWAi investment playbook sitting on every analyst's desk — the same criteria applied consistently, every time, regardless of how exciting the pitch sounds.

---

## Layer 6 — Session Context: CLAUDE.md

**File:** `CLAUDE.md` (workspace root)

This is the **persistent memory layer** — loaded at the start of every Cowork session. It tells Claude:

- Who Jamie is and what this workspace does
- NWAi's investing voice and philosophy (blunt verdicts, moat obsession, two analytical lenses)
- The full pipeline stage definitions
- Output depth calibration by stage
- Required Scout report elements
- Non-negotiable investment criteria
- TechGroup themes + SME table
- Behavior dos and don'ts

CLAUDE.md is what makes Claude behave like a trained NWAi analyst rather than a generic AI assistant. It's the difference between "here's a balanced overview of this startup" and "Kill — no moat, thin wrapper, SAFE structure."

---

## End-to-End Flow Example

```
You type:  /screen Acme AI

Claude:
  1. Loads nwai-investment-framework skill (gates-and-flags.md)
  2. Calls get_application(acme_id) via MCP to pull Dealum data
  3. Applies 6 AutoKill gates against the application data
  4. Checks Red/Yellow flags
  5. Returns: Verdict (Pass/Fail/Conditional) + top 3 reasons + next action
  6. If Pass → calls update_application(step="Screening") to advance in Dealum

You type:  /scout Acme AI

Claude:
  1. Loads nwai-investment-framework skill (scout-questions.md + ai-moats-framework.md)
  1b. ★ Checks deals/ for most recent Triage Report; loads it and carries forward gate
      verdicts, flags, deal structure concerns, wrapper rating, and opportunity/readiness scores
  2. Runs Phase 1 viability assessment (using screen findings as baseline)
  3. Runs Phase 2 depth questions
  4. Maps to TechGroup theme → names Lead + SMEs
  5. Outputs Scout Assessment report in chat (one-sentence verdict, biggest risk, 3–5 diligence questions)
  5b. Generates Scout Assessment Report as a .docx file → saves to workspace
  6. Advances Dealum step to Scout/IntroCall

You type:  /diligence Acme AI

Claude:
  0. Pre-Flight Check: verifies Scout Assessment Report exists in workspace (hard gate —
     halts if not found); displays confirmation prompt requiring CONFIRM before proceeding
     (reminds user to verify financial files are in deal room)
  1. Fetches from Dealum
  1b. ★ Loads Scout Assessment Report (required) + Triage Report (if present); Scout
      thesis is the analytical backbone for Layer 2 hypothesis generation
  2. Launches 5–6 agents in parallel: company-researcher, market-analyst,
     competitive-intelligence, technical-diligence, risk-assessor (+ financial-analyst
     if financial files confirmed)
  3. Loads diligence-scoring-rubrics.md + dd-checklist.md; applies Moat, Risk, Financial,
     and Market sizing rubrics using all agent briefings
  4. Assembles DD Kickoff Package (6 parts):
     Part A: Deal Brief + Scout thesis carry-forward
     Part B: Layer 2 — Hypothesis Confirmation Plan (AI-derived — 6 validation groups,
             each with hypothesis from Scout, AI conclusion, 🟢/🟡/🔴 signal, biggest uncertainty)
     Part C: Scored Assessment (Moat Tier 1 + Tier 2, Risk, Market/Finance)
     Part D: Layer 1 — 17-Folder Data Completeness Checklist [Hub]
     Part E: Founder Questions (Scoring Inputs + Nice to Have)
     Part F: Recommended Next Steps + Kill Conditions table
  5. Saves .docx to workspace
  6. Advances Dealum step to Diligence

You type:  /dd-report Acme AI   ← after DD team completes the 17-folder work

Claude:
  1. Loads dd-report-format-reference.md + diligence-scoring-rubrics.md (+ ai-moats-framework.md
     if AI-enabled). Reads Synergist canonical reference if present in workspace.
  1b. ★ Checks deals/ for most recent Triage Report + Scout Assessment Report + DD Kickoff
      Package; loads all three and uses them as primary inputs to all 11 scored sections
  2. Derives 1–5 score for each of 11 sections from NWAi rubric outputs
  3. Applies 5 Sharp & Succinct content rules (Once and Down, Section Mandates Exclusive,
     Tables Absorb Facts, Risk Synthesizes, No Closing Restatements) before writing each section
  4. Generates scored Word doc: Recommendation banner → Company header → 11 scored sections
     (each as 2-column table: 9432 DXA content | 1080 DXA RAG-colored score) → Recommendation
     table → DD Team Votes → Appendix A (outstanding diligence items)
  5. Saves .docx to workspace
  6. Advances Dealum step to Decision, tags "DD-Report-Complete"

You type:  /memo Acme AI   ← after /decision records the IC vote

Claude:
  1. Loads memo-format-reference.md + ai-moats-framework.md
  1b. ★ Checks deals/ for most recent DD Report (primary); if not found, falls back to
      loading Kickoff Package + Scout Report + Triage Report individually
  2. Compiles all pipeline data + web research to fill 4-slide structure
  3. Generates 4-slide PPTX (navy/ice-blue NWAi branding) via pptxgenjs
  4. Runs visual QA on all slides
  5. Saves .pptx to workspace
  6. Tags Dealum "Memo-Complete"
```

---

## File Structure Summary

```
nwai-tech-pipeline/
├── .claude-plugin/
│   └── plugin.json          ← Plugin metadata (name, version, author)
├── .mcp.json                ← MCP server config (auth env vars injected here)
├── README.md                ← Plugin README
├── servers/
│   └── dealum_server.py     ← Python MCP server wrapping Dealum API (5 tools)
├── commands/
│   ├── sync-pipeline.md     ← /sync-pipeline workflow
│   ├── screen.md            ← /screen workflow
│   ├── scout.md             ← /scout workflow
│   ├── diligence.md         ← /diligence workflow (kickoff + 17-folder working doc)
│   ├── dd-report.md         ← /dd-report workflow (scored synthesis, IC-ready)  ★ NEW
│   ├── decision.md          ← /decision workflow
│   └── memo.md              ← /memo workflow (4-slide PPTX for members call)  ★ UPDATED
├── agents/
│   ├── pipeline-monitor.md         ← Live Dealum pipeline snapshot agent
│   ├── company-researcher.md       ← Founder, traction + commercial validation agent
│   ├── competitive-intelligence.md ← Competitor mapping + moat input agent
│   ├── market-analyst.md           ← Discontinuity test + TAM/SAM + timing agent  ★ NEW
│   ├── technical-diligence.md      ← Thin wrapper + TRL + IP + AI moat agent       ★ NEW
│   ├── financial-analyst.md        ← Unit economics + projections + cap table agent ★ NEW
│   └── risk-assessor.md            ← Regulatory + exit + execution risk agent       ★ NEW
└── skills/
    └── nwai-investment-framework/
        ├── SKILL.md         ← Skill entry point
        └── references/
            ├── gates-and-flags.md
            ├── scout-questions.md
            ├── diligence-scoring-rubrics.md
            ├── dd-checklist.md
            ├── ai-moats-framework.md
            ├── dd-report-format-reference.md  ★ NEW
            └── memo-format-reference.md       ★ NEW

Workspace root (your folder):
├── CLAUDE.md                ← Persistent session context (the "brain")
├── nwai-techgroup-pipeline-architecture.md ← This file
├── nwai-tech-pipeline-v2.2.plugin ← Latest installable plugin
└── deals/                   ← All deal outputs saved here (auto-created on first run)
    ├── [Company] - Triage Report [date].docx         ← Screen output; loaded by Scout
    ├── [Company] - Scout Assessment Report [date].docx ← Scout output; loaded by Diligence + DD Report
    ├── [Company] - DD Kickoff Package [date].docx    ← Diligence output; loaded by DD Report + Memo
    ├── [Company]-NWAi-DD-Report-[date].docx          ← DD Report output; primary input to Memo
    └── [Company]-NWAi-Exec-Summary-[date].pptx       ← Final Memo (IC presentation)

    Note: Each command loads the most recent version of prior stage files (by YYYY-MM-DD in
    filename). Multiple versions of the same stage are retained; only the latest is loaded.
    For a clean re-run of any stage, start a new session (prior session context won't bleed in).
```

---

---

## Change Log

| Version | Date | Change |
|---------|------|--------|
| v0.1.0 | Feb 2026 | Initial plugin architecture — 5 pipeline stages, 6 commands, 5 reference docs |
| v0.2.0 | Mar 2026 | Added `/dd-report` command + `dd-report-format-reference.md` + `memo-format-reference.md`; updated pipeline to 7 stages including DD Report between Diligence and Decision |
| v0.3.0 | Mar 2026 | Finalized DD Report stage in all layers (CLAUDE.md, SKILL.md, plugin.json v0.2.0); fixed dynamic path resolution in dd-report.md command; updated Output Depth table; DD Report now the primary IC briefing document, Memo repositioned as archival/external presentation |
| v0.4.0 | Mar 2026 | Updated `/scout` command (plugin v2.1.0) to generate a Scout Assessment Report .docx in addition to the in-chat report; added `Bash` and `Write` to scout command allowed-tools |
| v0.5.0 | Mar 2026 | All 5 output-producing commands now save to `deals/` subfolder (plugin v2.2.0); added .docx file output to `/screen`; upgraded `/diligence` from optional .md to always-on .docx; fixed hardcoded session path in `/memo`; moved existing Synergist deal files to deals/ |
| v0.6.0 | Mar 2026 | Reformed TechGroup screener (plugin v2.3.0): replaced 6-gate AutoKill with 3-layer triage framework (3 hard gates + Opportunity/Readiness scoring); added `gates-and-flags-techgroup.md`; SAFE and lead investor moved from hard gates to Readiness signals; ADVANCE threshold ≥ 18/25 Opportunity; WATCH requires named milestone; ADVANCE output includes Live Pitch Questions; light WebSearch research on Market + Founder dimensions |
| v0.7.0 | Mar 2026 | Added prior stage output loading to Scout, Diligence, DD Report, and Memo commands (plugin v2.4.0): each downstream stage now explicitly loads the most recent output files for prior stages from deals/ before running; loading chain is Screen→Scout→Diligence→DD Report→Memo; most recent version by date is used when multiple versions exist; each command notes version count and load date; missing files are noted but do not block execution |
| v0.8.0 | Mar 2026 | Fixed Part B scoring in `/diligence` command (plugin v2.6.0): (1) Tier 1 General Moat now requires all 6 dimensions shown individually with ✓/✗ and rationale before summing — prevents collapsed binary output; (2) Tier 2 AI Moat applicability gate added to both diligence.md and diligence-scoring-rubrics.md — non-AI companies marked N/A with one-line reason, gate added to rubrics source of truth; (3) Tier 2 output now shows sub-elements labeled by category with points awarded/available; (4) Risk section heading now includes direction annotation (1=lowest, 10=highest) at section level only; (5) General N/A rule added — any sub-rubric inapplicable to company type must be marked N/A, not force-applied |
| v0.9.0 | Mar 2026 | Refactored `/diligence` DD Kickoff Package output format to Hub & Spoke structure: (1) Part A — removed "Key Risks" section; replaced with single gate-critical callout line referencing Part C folder numbers; (2) Part C — renamed third column from "Assignee" to "Status / Key Question"; gate-critical and urgent folders now embed the single most important question inline with flag and color shading (red=gate-critical, amber=urgent); Part C is now the single source of truth for all risks and questions; (3) Part D — removed "Gate-Critical" questions block; Part D now contains Scoring Inputs and Nice to Have only; opens with callout note pointing to Part C; (4) Part E — removed "Conditions That Must Be Met" prose block and "If Conditions Cannot Be Met" prose block; replaced with compact Kill Conditions table (Condition \| Trigger \| Verdict, 2–4 rows); (5) Fixed hardcoded session path in Phase 6 docx skill read — now uses dynamic find command |
| v0.10.0 | Mar 2026 | Overhauled `/dd-report` command and `dd-report-format-reference.md` (plugin v2.7.0): (1) Corrected DD Report visual layout to exact Synergist spec — every scored section is a 2-column table (content col 9432 DXA, score col 1080 DXA), not paragraph + callout box; (2) Added RAG score cell colors extracted from Synergist source XML (Green `375623`/White for 4–5, Amber `FFC000`/Dark for 3, Red `C00000`/White for 1–2) at 24pt bold; (3) Set exact page layout (margins 864 DXA, content width 10512 DXA, header/footer offset 708 DXA); (4) Added section numbering requirement (1. through 11.); (5) Corrected document structure order: Recommendation banner → Company header → Sections 1–11 → Recommendation table → DD Team Votes → Appendix A; (6) Added 5 Sharp & Succinct content rules to dd-report.md Step 4 (Once and Down, Section Mandates Exclusive, Tables Absorb Facts, Risk Synthesizes not Repeats, No Closing Restatements); (7) Added format drift incident log to dd-report-format-reference.md; (8) Added mini-table specifications per section; (9) Designated `Synergist-DD-Investment-Report-2026-03-11.docx` as canonical visual reference |
| v0.12.0 | Mar 2026 | Diligence Layer 2 — Hypothesis Confirmation Plan (plugin v2.8): (1) No Scout → No Diligence hard gate added to `/diligence` command — halts if Scout Assessment Report not found in workspace; post-Dealum-API: stage tag check to be added as second verification; (2) Pre-flight confirmation prompt added — requires user CONFIRM before launching agent team; reminds user to verify financial files in deal room; (3) Agent team expanded from 2 to 6: company-researcher (enhanced with commercial validation), market-analyst (new — discontinuity test + TAM/SAM + timing), competitive-intelligence (refocused to pure competitive), technical-diligence (new — thin wrapper + TRL + IP + AI moat), financial-analyst (new — reads deal room financial files, models unit economics + 10x path), risk-assessor (new — regulatory, exit landscape, execution + market risk); (4) Agent deployment by stage: company-researcher + market-analyst + competitive-intelligence + technical-diligence (light) at Scout; all 6 at Diligence; financial-analyst conditional on financial files; (5) DD Kickoff Package restructured from 5 parts (A–E) to 6 parts (A–F): Part B is new Layer 2 Hypothesis Confirmation Plan (AI-derived conclusions, not human-filled); Part C is Scored Assessment (formerly B); Part D is Layer 1 17-folder checklist (formerly C, renamed); Part E and F carry forward former D and E; (6) Layer 2 output format enforced: each of 6 validation groups = hypothesis (from Scout) + 2–3 sentence AI conclusion + 🟢/🟡/🔴 signal + biggest uncertainty; strict 4–5 line maximum per group, 1-page total; (7) `dd-checklist.md` updated with Layer 2 architecture overview and Layer 2 → DD Report score mapping table; (8) `diligence-scoring-rubrics.md` updated with Layer 2 rubric mapping table (each rubric mapped to its primary + secondary Layer 2 group); (9) Scout command updated to launch 4 research agents (company-researcher, market-analyst, competitive-intelligence, technical-diligence light) before Phase 1 scoring |
| v0.11.0 | Mar 2026 | Scout framework enrichment based on Ron Tarro framework review session 2026-03-22 (plugin v2.7): (1) Full rewrite of `scout-questions.md` — renamed Q1 to Category & Market Discontinuity (new category creator vs. optimizer; lifecycle horizon; structural shift test; 0–5 with Triage delta); Q3 Moat Assessment now produces a distilled 4-column table verdict (Primary Moat \| Strength \| Primary Threat \| Verdict) instead of moat-type enumeration by number; three new strategic dimensions added at Scout (Q4: Ecosystem Role — platform creator vs. follower, 0–5; Q5: Adjacent Displacement Risk — core use case + functional equivalents + emerging displacement, 0–5 inverted; Q6: Macro Tailwind — 4-dimension 10-year horizon table, 0–5); Phase 2 Team assessment now requires explicit Product team fit (✓/Partial/Gap) and Market team fit (✓/Partial/Gap); Analyst Verdict Block expanded to include "What You Have to Believe" (core thesis assumption) + "Where's the Bet" (specific inflection point) + "Greed" (upside case paired with Fear); Scout Conviction Score composite (/17) added (Phase 1: 40% / Strategic: 20% / Phase 2: 40%; conviction thresholds 14–17=High, 10–13=Moderate, 7–9=Low, <7=Decline); 2-page output format enforced (Page 1: scorecard tables only — Triage Carry-Forward + Product & Market Positioning + Moat Assessment + Macro Trends + Analyst Verdict Block + Score Summary with ↑/→/↓ Triage deltas; Page 2: Adjacent Tech bullets + Phase 1 bullet clusters + Phase 2 execution table + Flags + Diligence Questions); (2) `gates-and-flags-techgroup.md` — added Scout forward-mapping notes to Dimension 1 (Structural Discontinuity → Q1 Category & Market Discontinuity) and Dimension 4 (Defensibility → Q3 Moat + Q4 Ecosystem Role + Q5 Adjacent Displacement Risk); (3) `diligence-scoring-rubrics.md` — added Adjacent Displacement Risk as explicit sub-dimension of Competitive Risk (carry forward Q5 score from Scout); (4) `scout.md` command — fully updated to match new 8-step framework, fixed hardcoded old session path for docx skill (now dynamic find), Word doc output updated to 2-page design with 14 sections, output path updated to `deals/active/` subfolder |

---

*NWAi Investment Intelligence | TechGroup | Jamie, Co-Chair*
