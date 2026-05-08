# NWAi TechGroup Deal Pipeline — Architecture Overview
*v0.23.0 | May 2026 | New World Angels Investment Intelligence*

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
  (8 commands)    (7 subagents)    (8 reference docs)
```

---

## Layer 1 — The Data Source: Local Filesystem (Dealum deferred)

**As of plugin v2.12.0 (April 28, 2026): Dealum API integration is deferred.** The pipeline operates filesystem-first against `deals/active/<Company>/` folders. The Dealum MCP server is preserved in the plugin (dormant) for trivial restoration when the API is approved. See CLAUDE.md → "Dealum Integration Status — Deferred" for the full status and restoration procedure.

**Active state:**

**Source of truth:** `deals/active/<Company>/Data Room/` and `deals/active/<Company>/Reports/` — Claude reads these directly when running pipeline commands. Stage progression is reflected in the contents of `Reports/` (Triage Report → Scout Assessment → DD Kickoff Package → DD Report → Memo) rather than in a CRM step field.

**Pipeline-monitor / `/sync-pipeline`:** Should produce a snapshot from filesystem inspection (count/list deals by stage based on which Reports exist). The Dealum-calling implementation is preserved but dormant.

**Deferred state (when Dealum API is approved):**

The plugin still contains `servers/dealum_server.py` (8 KB Python script) that wraps the Dealum Integration API and would expose 5 tools — `list_applications`, `get_application`, `update_application`, `list_members`, `create_application`. To restore: re-add the `nwai-dealum` MCP server block to both `.mcp.json` files, install Python 3.10+ and the `mcp` package on Mac, and set `DEALUM_TOKEN` / `DEALUM_ROOM_ID`. The exact MCP server block is preserved in git history at any commit prior to v2.12.0.

**The analogy:** Today, the deal folders themselves are the filing cabinet — Claude reads the actual files. When Dealum integration activates, the cabinet gets a CRM index on top, and the MCP server becomes the key.

---

## Layer 2 — The Pipeline Stages

Every deal is a Dealum application with a **step** tag that tracks its position:

```
📥 Inbox  →  🔍 Screening  →  🤝 Scout/IntroCall  →  🔬 Diligence  →  📋 DD Report  →  ✅ Decision  →  📝 Memo
```

Claude reads the step field to know what depth of analysis is appropriate (see Output Depth in CLAUDE.md). Advancing a deal = calling `update_application` with the new step name.

---

## Layer 3 — Commands (The Eight Workflows)

Each command is a markdown file in `commands/` that defines a structured workflow Claude follows when you type the slash command.

| Command | File | What It Triggers | Output |
|---------|------|-----------------|--------|
| `/sync-pipeline` | `commands/sync-pipeline.md` | `pipeline-monitor` agent → Dealum snapshot | Pipeline dashboard in chat |
| `/screen [company]` | `commands/screen.md` | `gates-and-flags.md` (universal: 3 hard gates + NWA Filter + Opportunity 6×0–5/30 + Readiness 5×0–5/25 + Decision Logic) + `gates-and-flags-techgroup.md` (TechGroup Track A/B Opportunity rubrics) | NWA Triage Report in chat + Triage Report .docx saved to deals/ |
| `/scout [company]` | `commands/scout.md` | `nwai-investment-framework` skill → Scout Q assessment + theme map | Scout Assessment report in chat + Scout Assessment .docx saved to workspace |
| `/diligence [company]` | `commands/diligence.md` | Pre-flight gate (Scout required + financial files confirmed) → 5–6 agent team → Layer 2 Hypothesis Confirmation Plan (AI-derived) + scored rubrics + 17-folder checklist | DD Kickoff Package .docx saved to deals/ |
| `/post-meeting [company] [product\|gtm\|financials]` | `commands/post-meeting.md` | Loads transcript(s) + all prior context → applies analyst lens → produces dual-output document | Post-Meeting Reconciliation .docx (Analyst POV + Key Insights + Resolved/Open tracker) saved to deals/ |
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

### `risk-assessor` ★ NEW
- **Trigger:** `/scout` (light — top kill risks) + `/diligence` (full)
- **Does:** Regulatory risk research, exit landscape + acquirer dynamics, execution risk signals, market and financial risk signals from public sources
- **Returns:** Risk Assessment Briefing → feeds cross-cutting risk overlay across all Layer 2 groups

### `pricing-analyst` ★ NEW (v2.13.0)
- **Trigger:** `/diligence` Stage 2A (parallel)
- **Does:** Pricing maturity assessment (PROVEN / EARLY SIGNALS / DISCOVERY / UNKNOWN — most early-stage companies are still in pricing discovery), unit economics (CAC, LTV, payback), channel economics with margin compression forecast (third-party distributors typically command a meaningful markup multiple of the direct price; this gap compresses over time as the channel partner gains volume leverage), value proposition validation with quantified pricing-to-value ratio, pricing pressure forecast (commoditization risk)
- **Returns:** Pricing Analyst Briefing → feeds Forecasting Analyst revenue model + Venture Analyst valuation; feeds DD Report S5 (GTM)

### `forecasting-analyst` ★ NEW (v2.13.0 — replaces legacy `financial-analyst`)
- **Trigger:** `/diligence` Stage 2B (sequential, after pricing-analyst)
- **Does:** Builds independent 5-year financial forecast using the McMurry method (build the proprietary forecast first, then compare to the company's submitted numbers — never start from the company's spreadsheet). Enforces the "no AI slop" rule (critical lens, independent research, accountable analyst POV with mandatory *because* clauses on every Bear/Base/Bull scenario). Produces P&L + cash flow + balance sheet (the cash flow / balance sheet view is non-negotiable, not optional); 5-year capital plan with round timing/sizing; Founder Financial Literacy Assessment (does the entrepreneur understand their own business?)
- **Returns:** Forecasting Analyst Briefing → feeds Venture Analyst; feeds DD Report S9 (Financials); feeds Memo Slide 3 pro forma

### `venture-analyst` ★ NEW (v2.13.0)
- **Trigger:** `/diligence` Stage 2B (sequential, after forecasting-analyst — final layer)
- **Does:** Final synthesis of financial diligence. Produces defensible valuation today (3 methods reconciled: revenue multiple, forward multiple, discounted future value at the 35% IRR hurdle); projected exit valuation Y3 + Y5 across Low/Base/High scenarios; capital + dilution modeling; IRR / multiple; 35% IRR hurdle test; NWA 10x-in-5-years criterion check; deal structure recommendation (priced equity / convertible with cap / participating preferred / re-priced terms / decline). Closes the founder-claimed-vs-defensible-analysis gap with documented methodology.
- **Returns:** Venture Analyst Briefing → feeds DD Report S8 (Deal Structure), S9 (Financials), S11 (Exit); feeds /decision command; feeds Memo Slide 4 Returns and Deal Terms

**The analogy:** Agents are like junior analysts you dispatch to do legwork. At Scout, four agents do targeted research to build the assessment evidence base. At Diligence, six agents run in parallel as Stage 2A (the five standard agents plus pricing-analyst). Then Stage 2B runs the financial diligence chain sequentially: forecasting-analyst → venture-analyst, because each consumes the upstream output. They report back with structured briefings; Claude synthesizes them into Layer 2 conclusions.

---

## Layer 5 — The Investment Framework Skill

**Location:** `skills/nwai-investment-framework/`

This skill is the **brain trust** — NWAi's proprietary investment knowledge encoded as reference documents that Claude loads during analysis. Nine reference files:

| File | Contents | Used At |
|------|----------|---------|
| `gates-and-flags.md` | **NWAi Universal Triage Framework v2.0** (all verticals): 3 hard gates + NWA Filter (Cynical Default, Goliath Test, LLM Ingestion Test, Revenue Quality Audit) + Opportunity 6×0–5 (/30) + Readiness 5×0–5 (/25) + Readiness Downgrade Rule + 3-search Research Protocol + Decision Logic (ADVANCE ≥ 20/30, WATCH 14–19, DECLINE < 14) | Screen (universal) |
| `gates-and-flags-techgroup.md` | **TechGroup extension** to the universal framework: Track Determination (A/B), Track A Software/AI/Cloud 6-dimension Opportunity rubric, Track B Hardware/Robotics 6-dimension Opportunity rubric, AI Wrapper Assessment, Replicability Speed Flag, Hardware Last Mile Standard, TRL Hard Cap, TechGroup Live Pitch Questions; cross-references universal gates-and-flags.md | Screen (TechGroup) |
| `_archive/gates-and-flags-6gate-legacy.md` | Pre-v2.0 legacy 6-gate pass/fail AutoKill framework. Archived for historical reference only — superseded by Universal Triage Framework in April 2026 | Reference only |
| `scout-questions.md` | Phase 1 viability (Q1 + Q1b Demand Signal Test + Q2 + Q3, scored 0–5 with Triage delta) + 3 strategic dimensions (Q4 Ecosystem Role, Q5 Adjacent Displacement Risk, Q6 Macro Tailwind) + Phase 2 execution (scored 0–5) + Scout Conviction Score (/19) + 2-page output format | Scout |
| `diligence-scoring-rubrics.md` | Moat score (0–6 / 0–10), Risk score (1–10, includes Adjacent Displacement Risk sub-dimension), Bear/Base/Bull financial model; Layer 2 rubric-to-validation-group mapping table | Diligence |
| `dd-checklist.md` | Layer 2 Hypothesis Confirmation architecture + Layer 1 17-folder data completeness checklist; includes Layer 2 → DD Report section score mapping | Diligence |
| `ai-moats-framework.md` | Three moat types for evaluating AI company defensibility + Replicability Speed Matrix (4-row threat actor table with Yellow Flag triggers) | Scout + DD Report + Memo |
| `dd-report-format-reference.md` | 11-section scored report structure, 1–5 scale mapping, exact STL visual layout (2-column table, 9432/1080 DXA, RAG hex colors), 5 Sharp & Succinct content rules, format drift incident log | DD Report |
| `memo-format-reference.md` | 4-slide PPTX structure, NWAi branding, ++/-- notation, "What is the Bet?" format | Memo |
| `diligence-analysis-framework.md` ★ NEW | Analyst lens behavioral standard for the 3 diligence deep-dive meetings. Defines the dual role (analyst POV primary / tracker secondary), declaration taxonomy, meeting-type playbooks (Product / GTM / Financials), progressive POV architecture, and post-meeting document output structure. | Diligence (post-meeting) |

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
  2. Stage 2A — launches 6 agents in parallel: company-researcher (PMTF + verification),
     market-analyst, competitive-intelligence, technical-diligence, risk-assessor,
     pricing-analyst
  2b. Stage 2B — sequential financial diligence chain: forecasting-analyst (independent
     5-yr forecast via McMurry method) → venture-analyst (valuation, hurdle test,
     deal structure recommendation)
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
│   ├── post-meeting.md      ← /post-meeting workflow (analyst lens + tracker reconciliation)  ★ NEW
│   ├── dd-report.md         ← /dd-report workflow (scored synthesis, IC-ready)
│   ├── decision.md          ← /decision workflow
│   └── memo.md              ← /memo workflow (4-slide PPTX for members call)
├── agents/
│   ├── pipeline-monitor.md         ← Live Dealum pipeline snapshot agent
│   ├── company-researcher.md       ← Team-first PMTF + verification + commitment agent (v2.13.0 refresh)
│   ├── competitive-intelligence.md ← Competitor mapping + moat input agent
│   ├── market-analyst.md           ← Discontinuity test + TAM/SAM + timing agent
│   ├── technical-diligence.md      ← Thin wrapper + TRL + IP + AI moat agent
│   ├── risk-assessor.md            ← Regulatory + exit + execution risk agent
│   ├── pricing-analyst.md          ← Pricing maturity + unit economics + channel pressure agent ★ NEW v2.13.0
│   ├── forecasting-analyst.md      ← Independent 5-yr forecast (McMurry method) agent ★ NEW v2.13.0 (replaces financial-analyst)
│   └── venture-analyst.md          ← Valuation + hurdle test + deal structure agent ★ NEW v2.13.0
└── skills/
    └── nwai-investment-framework/
        ├── SKILL.md         ← Skill entry point
        └── references/
            ├── gates-and-flags.md             ← NWAi Universal Triage Framework v2.0 (all verticals)
            ├── gates-and-flags-techgroup.md   ← TechGroup extension: Track A/B + AI Wrapper + Replicability
            ├── scout-questions.md
            ├── diligence-scoring-rubrics.md
            ├── dd-checklist.md
            ├── ai-moats-framework.md
            ├── dd-report-format-reference.md
            ├── memo-format-reference.md
            ├── diligence-analysis-framework.md ← Analyst lens standard for post-meeting
            └── _archive/
                └── gates-and-flags-6gate-legacy.md  ← Pre-v2.0 legacy AutoKill (reference only)

Workspace root (canonical: /Users/jamie/ClaudeCodeProjects/nwa-intelligence):
├── CLAUDE.md                ← Persistent session context (the "brain")
├── nwai-techgroup-pipeline-architecture.md ← This file
├── pipeline-decisions-log.md  ← Running framework decision log
├── .claude/                 ← Pipeline runtime (mirror of plugin source — installed locally)
├── plugin/
│   ├── current/
│   │   ├── nwai-tech-pipeline.plugin  ← Latest installable plugin (v2.13.1)
│   │   └── nwai-tech-pipeline.zip     ← Org upload package (matches current plugin)
│   └── archive/             ← Prior versioned plugin files (rollback if needed)
├── scripts/
│   └── dd-report-generator.js  ← Canonical DD Report generator (MANDATORY — use for all /dd-report runs)
├── docs/                    ← Reference docs (committed to git)
│   ├── reference/           ← Plugin / platform reference documentation
│   │   ├── NWAi-TechGroup-Pipeline-Reference.{html,pdf}
│   │   ├── NWAi-TechGroup-Platform-Overview.{html,pdf}
│   │   └── agent-team-reference.md
│   ├── group-intake/        ← Per-group playbook intake questionnaires (May 2026)
│   │   ├── NWAi-Group-Playbook-Intake-Template.md
│   │   └── NWAi-Group-Playbook-Intake-TechGroup-Reference.md
│   ├── strategy/            ← Platform vision and strategic positioning (migrated from Desktop Apr 2026)
│   │   ├── NWAi-Grand-Unifying-Theory-v0.1.md
│   │   ├── NWA-AI-Investment-Intelligence-GUT.{html,pdf}
│   │   ├── NWAi-Strategic-Reframe-Reference.md
│   │   ├── NWAi-Huddle-Brief-2026-04-22.md
│   │   ├── NWAi-Spring-Member-Meeting-AI-Update.pptx
│   │   ├── Member_Social_Intelligence_Layer_V1_Features.md
│   │   ├── RaiseLink-NWAi-Brief-Comparison-2026-04.md
│   │   ├── NWAi-TechGroup-Managed-Agents-Architecture-v1.0.docx
│   │   ├── cowork-vs-enterprise-platform.md
│   │   └── Jamie & Ron_ The Grand Unifying Theory chat.md
│   └── build-history/       ← Plugin build session briefs (migrated from Desktop Apr 2026)
│       ├── Scoping.md
│       ├── Setup.md
│       ├── Session-Backlog.md
│       ├── Session-2-Brief.md
│       ├── Session-3-Brief.md
│       └── Desktop-Checkout-Reconciliation-Report.md
├── notes/                   ← Process notes and design memos (committed)
├── demo/                    ← Next.js companion demo artifact (committed; see Companion Artifact section)
└── deals/                   ← Local-only (gitignored — deal data never pushed to GitHub)
    ├── active/
    │   ├── Captain Compliance/
    │   │   ├── Data Room/
    │   │   └── Reports/
    │   ├── Summit Technology Laboratory/  (STL)
    │   │   ├── Data Room/
    │   │   └── Reports/
    │   └── Synergist Technology/
    │       ├── Data Room/
    │       └── Reports/
    ├── archive/             ← Closed deals
    └── _quarantine_pre_consolidation_2026-04-28/  ← Pre-consolidation duplicates pending manual cleanup

    Reports/ contains: Triage Report, Scout Assessment, DD Kickoff Package,
    DD Report, post-meeting reconciliations, Action Trackers, Investment Memo (.pptx).
    Each command loads the most recent prior-stage file by YYYY-MM-DD; multiple versions retained,
    only latest is loaded.
```

---

## Companion Artifact — NWAi Investment Intelligence Demo

**Location:** `demo/` (sibling to plugin source, same repo)
**Stack:** Next.js 14 App Router, Tailwind v4, shadcn/ui (base-nova), JSON seed data
**Purpose:** Information architecture and UX preview for the full NWAi Investment Intelligence Platform — the wider vision the plugin is one slice of.

The demo is a static, no-backend Next.js app that lets Jamie and TechGroup preview how the eventual platform will surface deal, member, and ecosystem intelligence in a unified workspace. It is **not** part of the plugin and ships independently. Slash commands, Dealum MCP, agents, and the framework skill all live in the plugin; the demo only mirrors their *outputs* against hand-seeded JSON so the IA, taxonomies, and cross-link surface area can be reviewed today without Dealum or any runtime LLM call.

### Top-level sections (as of Session 3, April 2026)

| Section | Route | What it shows |
|---------|-------|---------------|
| Pipeline | `/pipeline`, `/deals/[id]` | The 7-stage deal pipeline with stage cards reflecting Universal Triage v2.0 (Opportunity 6×0–5/30, Readiness 5×0–5/25, ADVANCE ≥ 20/30) |
| Members | `/members`, `/members/[id]` | Member directory with FL-city geography facet + collapsible filters (NWAi Group → Region → Expertise → Sector of Interest → Past Investment); member profiles with expertise, sectors, past investments, matched deals, contributed inputs |
| Matching | `/deals/[id]/matching` | Per-deal Matching Rationale — member scores, status, response excerpts |
| Portfolio | `/portfolio` | NWAi portfolio companies grid (10 seeded across all 6 NWAi groups) + slide-over drill-in (member investors, NWA + external board seats, primary contact, warm contacts) |
| Ecosystem | `/ecosystem` | Phase 4 placeholder feed for incubator/accelerator, university spinout, operator-network, and thematic-report sourcing — banner explicitly defers real signals to the future `ecosystem-scout` agent suite |
| Orchestrator | `/orchestrator` | Admin overlay — matching jobs, outreach queue, synthesis queue with progress bars and a 6-metric KPI strip |

A thin top-level **SectionNav** (Pipeline · Members · Portfolio · Ecosystem · Orchestrator) sits above the Pipeline-specific 7-stage StageNav; StageNav only renders inside the Pipeline section.

### Deployment

Local dev: `cd demo && npm run dev`. Public preview is via Vercel (free tier, **Root Directory = `demo/`**, auto-deploy from `main`). Demo carries no PII and no API keys — fictional members, fictional deals, all data is hand-seeded JSON in `demo/data/`.

### Relationship to plugin

The demo and the plugin share the same repo but are independently versioned. Plugin changes have their own changelog (this file) and `.plugin` packaging; the demo evolves through its own session-numbered build phases (Sessions 1–N). When the plugin gains new commands or surfaces, the demo's IA can choose to reflect them or not — the two are decoupled by design. The architecture file (this document) tracks plugin state; demo state is tracked in commit history under `demo/`.

---

---

## Change Log

| Version | Date | Change |
|---------|------|--------|
| v0.23.0 | May 7, 2026 | **Plugin v2.13.1 — agent sanitization + forward-facing doc refresh.** Privacy/sanitization pass plus refresh of the public-facing reference docs to v2.13. No behavior changes. **(1) Agent sanitization:** removed all NWA member name attributions (Sam Guren, Ron Tarro, Jamie Allison, Randy) and deal-specific examples (Synergist, CDW, Captain Compliance, FGO) from the four agent files (`pricing-analyst`, `forecasting-analyst`, `venture-analyst`, `company-researcher`), the `/diligence` command (Stage 2B venture-analyst prompt), and `references/diligence-scoring-rubrics.md` (35% IRR hurdle attribution). Substance and methodology preserved everywhere — McMurry method retained as external eponym (Bert McMurry / IVP); the "no AI slop" rule, 35% IRR hurdle, NWA 10x-in-5-years criterion, and three-statements forecasting mandate all retained without member attributions; channel margin compression example generalized from "CDW 8x markup vs direct 2.5x — Synergist case" to a generic distributor-markup framing. **(2) Forward-facing docs refreshed to v0.22.0 / v2.13:** `docs/NWAi-TechGroup-Pipeline-Reference.html` and `docs/NWAi-TechGroup-Platform-Overview.html` updated for header badges, 8-agent roster (PMTF refresh on company-researcher + 3-agent financial diligence team divider), Universal Triage v2.0 framing on `/screen` and pipeline-stage cards, scoring rubric descriptions reflecting v2.13 numerics. PDFs regenerated via Chrome headless. **(3) Stale-version cleanup:** two `v2.11.0` references in `CLAUDE.md` (line 374) and architecture file structure section (line 311) corrected to `v2.13.0` (the actual `plugin.json` was already at `2.13.0`). **(4) CLAUDE.md agent roster** prose (lines 224/226) and **architecture file agent descriptions** (lines 115/120/125) sanitized to match the agent layer. **Files retained as-is per scope:** architecture changelog historical entries (which legitimately document working sessions), `docs/build-history/` build briefs (explicit attendee documentation), `deals/active/` operational records. Plugin repackaged to v2.13.1; v2.13.0 archived to `plugin/archive/nwai-tech-pipeline-v2.13.0.plugin`. |
| v0.22.0 | May 7, 2026 | **Round 2 architectural evolution — plugin v2.13.0.** Following the May 6, 2026 working session with Sam Guren (NWA), Ron Tarro (NWA TechGroup), and Jamie Allison, two architectural changes shipped together. **Phase A — Company Researcher refocus:** `company-researcher` agent rewritten with team-first mandate. New sections: Founder Claim Verification Protocol (LinkedIn + Perplexity cross-reference of every specific exit/ARR/role claim, with ✅ VERIFIED / ⚠️ PARTIAL / 🔴 UNVERIFIED / ❌ CONTRADICTED states), Team-Level PMTF Synthesis (skills coverage across domain depth / engineering / market access, with explicit gap detection per Ron Tarro), Team Commitment Depth (full-time vs advisor ratio with "stuck" advisor flagging per Sam Guren), advisor capital commitment check. `references/scout-questions.md` Team scoring expanded to consume PMTF + commitment + verification sub-assessments. `references/diligence-scoring-rubrics.md` Execution Risk now includes explicit numeric criteria for team commitment ratio, PMTF score, and founder claim verification. **Phase B — Financial agent team:** Legacy `financial-analyst` retired and replaced by three specialized agents that work as a system. (1) `pricing-analyst` (NEW) — pricing maturity assessment, unit economics, channel economics with margin compression forecast (e.g., CDW 8x markup vs direct 2.5x), value proposition validation with pricing-to-value ratio, pricing pressure forecast (commoditization risk). (2) `forecasting-analyst` (renamed from `financial-analyst`, full rewrite) — applies the McMurry method (per Sam Guren: build proprietary forecast first, then compare to company's submitted numbers); enforces the "no AI slop" rule (per Jamie Allison: critical lens, independent research, accountable analyst POV with mandatory *because* clauses); produces 5-year P&L + cash flow + balance sheet with Bear/Base/Bull scenarios; capital plan with round timing/sizing; founder financial literacy assessment. (3) `venture-analyst` (NEW) — final synthesis layer; consumes pricing + forecasting + competitive + risk + team outputs to produce defensible valuation today (3 methods reconciled), projected exit Y3+Y5, capital + dilution modeling, IRR / multiple, 35% hurdle rate test (per Sam Guren), NWA 10x-in-5-years criterion check, deal structure recommendation (priced equity / convertible with cap with "industry of 8" reference / participating preferred / re-priced terms / decline). Solves the Randy "$9M-claimed-vs-$3M-analysis" problem with documented methodology. **/diligence command** restructured into Stage 2A (6 agents in parallel: 5 standard + pricing-analyst) and Stage 2B (sequential financial diligence chain: forecasting-analyst → venture-analyst). **/dd-report** Section score mappings updated: S5 (GTM) consumes pricing-to-value ratio + channel pressure forecast; S6 (Team) consumes PMTF score + Team Commitment Depth + verification status; S8 (Deal Structure) consumes venture-analyst structure recommendation; S9 (Financials) consumes forecasting-analyst Bear/Base/Bull + pricing-analyst unit economics + venture-analyst capital plan; S11 (Exit) consumes venture-analyst exit valuation + 35% hurdle test + 10x criterion + risk-assessor acquirer landscape. **/decision** INVEST/PASS reasons expanded with hurdle test results and PMTF/verification flags; Decision Summary captures venture-analyst structural recommendation. **/memo** Pro forma now sourced from forecasting-analyst's proprietary forecast (NOT company's spreadsheet); Slide 4 Returns and Deal Terms reference venture-analyst outputs; Slide 4 Strengths/Risks reference Phase A Team Commitment + verification status. **Bear/Base/Bull rubric** updated with mandatory *because* clauses and time-varying ARPU (channel pressure modeling). **CLAUDE.md** agent roster updated to 8 agents (3 new financial + Phase A company-researcher refresh). Companion reference doc shipped at `docs/build-history/Plugin-v2.13-Financial-Agent-Team.md`. Round 2 review with Sam/Ron does NOT gate the v2.13.0 ship; iterative refinement is post-ship. |
| v0.21.0 | Apr 28, 2026 | **Dealum integration deferred — plugin v2.12.0 repackaged without MCP server registration.** The `nwai-tech-pipeline` plugin had been declaring a Dealum MCP server (`nwai-dealum` in `.mcp.json`) that requires Python 3.10+ and the `mcp` package, plus `DEALUM_TOKEN` / `DEALUM_ROOM_ID` env vars. None of these prerequisites were in place locally, causing Cowork to show "MCP nwai-tech-pipeline: Server disconnected" on plugin enable, which obscured the fact that all 8 slash commands were otherwise functional. Decision: rather than upgrade Mac Python and install dependencies for an integration that's not yet API-approved, remove the MCP server registration so the plugin enables cleanly and the pipeline operates filesystem-first (which is how all actual deal work has been done to date). Changes: (1) Plugin repackaged from v2.11.0 to v2.12.0 — bundled `.mcp.json` updated to `{"mcpServers": {}}` with a `_comment` field documenting restoration procedure; bundled `.claude-plugin/plugin.json` description softened to reflect filesystem-first operation; v2.11.0 archived to `plugin/archive/nwai-tech-pipeline-v2.11.0.plugin`. (2) Workspace `.mcp.json` updated to match (empty mcpServers + restoration comment). (3) `CLAUDE.md` — new "Dealum Integration Status — Deferred" section added between Plugin Architecture and GitHub Sync; states current filesystem-first reality, lists 4 implications (no MCP server, /sync-pipeline operates on filesystem, Dealum-tagging guidance is aspirational, dealum_server.py is preserved dormant), and provides 5-step restoration procedure for when the API is eventually approved. (4) Architecture file Layer 1 rewritten from "The Data Source: Dealum via MCP" to "The Data Source: Local Filesystem (Dealum deferred)" with parallel "Active state" / "Deferred state" framing. (5) The `dealum_server.py` script itself is preserved verbatim in `.claude/servers/` and in the bundled plugin so restoration is mechanical. After this change, plugin enables cleanly in Cowork with no MCP server error, all 8 commands and 7 agents register normally. `/sync-pipeline` and `pipeline-monitor` should be reframed as filesystem-readers in a follow-up if they're actually used; today they're dormant. |
| v0.20.0 | Apr 28, 2026 | **Workspace consolidation — Desktop → canonical merge** (no plugin code change). (1) Surgical gitignore enforcement: `git rm --cached -r deals/` removed 43 previously-tracked deal files (term sheets, cap tables, financials, contracts, transcripts) from git tracking; deal files remain on local disk; `.gitignore` now correctly enforces deals-stay-local intent going forward. Note: files remain in git history; full history rewrite intentionally not performed. (2) Strategic platform-vision docs migrated from prior Desktop workspace `~/Desktop/Claude CoWork NWAi Investment Intelligence/docs/` into new `docs/strategy/` subfolder (10 files: GUT v0.1, GUT html/pdf, Strategic Reframe, Huddle Brief, Member Social Intelligence Layer, RaiseLink comparison, Managed Agents Architecture, cowork-vs-enterprise-platform, Jamie & Ron GUT chat). (3) Plugin build-session briefs migrated from Desktop `Claude Code/` into new `docs/build-history/` subfolder (6 files: Scoping, Setup, Session-Backlog, Session-2/3 Briefs, Desktop-Checkout-Reconciliation-Report). (4) Captain Compliance deal — entire `Data Room/` + `Reports/` migrated from Desktop into `deals/active/Captain Compliance/`. (5) Synergist Technology — Desktop's newer artifacts (Apr 14 GTM Diligence, updated Action Tracker, GTM call transcript, additional license agreements and contracts) merged with canonical's existing Synergist content into nested `deals/active/Synergist Technology/{Data Room,Reports}/`. (6) STL reorganized from flat layout to nested `deals/active/Summit Technology Laboratory/{Data Room,Reports}/`. (7) Redundant pre-consolidation flat-layout files moved to `deals/_quarantine_pre_consolidation_2026-04-28/` for manual cleanup. (8) `CLAUDE.md` updated: "Working in Cowork — Which Folder to Select" rewrites the misleading "Desktop is a planning archive" framing into the true consolidation story; "Workspace Files" section expanded with full canonical layout including new `docs/strategy/` and `docs/build-history/` subfolders; explicit `deals/` is local-only note added; "GitHub Sync" section softened to acknowledge Cowork sandbox push limitations and Mac Terminal fallback. (9) Architecture file structure section updated to reflect new layout. (10) Migration plan archived at `notes/folder-consolidation-plan-2026-04-28.md`. After this commit, Cowork should only ever target `/Users/jamie/ClaudeCodeProjects/nwa-intelligence/`; the Desktop folder will be archived. |
| v0.19.0 | Apr 2026 | **Companion demo artifact added to architecture file** (no plugin change). New "Companion Artifact — NWAi Investment Intelligence Demo" section documenting the Next.js / Tailwind v4 / shadcn IA preview at `demo/`: Session 3 surfaces (Pipeline, Members + collapsible-filter directory, Member Profile, Matching Rationale, Portfolio + slide-over drill-in, Ecosystem Phase 4 placeholder, Orchestrator), top-level SectionNav above the 7-stage StageNav, FL-city geography facet, Universal Triage v2.0 reflected on Pipeline stage cards. Captures deployment pattern (Vercel, Root Directory = `demo/`, auto-deploy from `main`) and the demo-vs-plugin decoupling: plugin tracked in this changelog, demo tracked through commits under `demo/`. Plugin source itself unchanged in this update. |
| v0.1.0 | Feb 2026 | Initial plugin architecture — 5 pipeline stages, 6 commands, 5 reference docs |
| v0.2.0 | Mar 2026 | Added `/dd-report` command + `dd-report-format-reference.md` + `memo-format-reference.md`; updated pipeline to 7 stages including DD Report between Diligence and Decision |
| v0.3.0 | Mar 2026 | Finalized DD Report stage in all layers (CLAUDE.md, SKILL.md, plugin.json v0.2.0); fixed dynamic path resolution in dd-report.md command; updated Output Depth table; DD Report now the primary IC briefing document, Memo repositioned as archival/external presentation |
| v0.4.0 | Mar 2026 | Updated `/scout` command (plugin v2.1.0) to generate a Scout Assessment Report .docx in addition to the in-chat report; added `Bash` and `Write` to scout command allowed-tools |
| v0.5.0 | Mar 2026 | All 5 output-producing commands now save to `deals/` subfolder (plugin v2.2.0); added .docx file output to `/screen`; upgraded `/diligence` from optional .md to always-on .docx; fixed hardcoded session path in `/memo`; moved existing Synergist deal files to deals/ |
| v0.6.0 | Mar 2026 | Reformed TechGroup screener (plugin v2.3.0): replaced 6-gate AutoKill with 3-layer triage framework (3 hard gates + Opportunity/Readiness scoring); added `gates-and-flags-techgroup.md`; SAFE and lead investor moved from hard gates to Readiness signals; ADVANCE threshold ≥ 18/25 Opportunity; WATCH requires named milestone; ADVANCE output includes Live Pitch Questions; light WebSearch research on Market + Founder dimensions |
| v0.7.0 | Mar 2026 | Added prior stage output loading to Scout, Diligence, DD Report, and Memo commands (plugin v2.4.0): each downstream stage now explicitly loads the most recent output files for prior stages from deals/ before running; loading chain is Screen→Scout→Diligence→DD Report→Memo; most recent version by date is used when multiple versions exist; each command notes version count and load date; missing files are noted but do not block execution |
| v0.8.0 | Mar 2026 | Fixed Part B scoring in `/diligence` command (plugin v2.6.0): (1) Tier 1 General Moat now requires all 6 dimensions shown individually with ✓/✗ and rationale before summing — prevents collapsed binary output; (2) Tier 2 AI Moat applicability gate added to both diligence.md and diligence-scoring-rubrics.md — non-AI companies marked N/A with one-line reason, gate added to rubrics source of truth; (3) Tier 2 output now shows sub-elements labeled by category with points awarded/available; (4) Risk section heading now includes direction annotation (1=lowest, 10=highest) at section level only; (5) General N/A rule added — any sub-rubric inapplicable to company type must be marked N/A, not force-applied |
| v0.9.0 | Mar 2026 | Refactored `/diligence` DD Kickoff Package output format to Hub & Spoke structure: (1) Part A — removed "Key Risks" section; replaced with single gate-critical callout line referencing Part C folder numbers; (2) Part C — renamed third column from "Assignee" to "Status / Key Question"; gate-critical and urgent folders now embed the single most important question inline with flag and color shading (red=gate-critical, amber=urgent); Part C is now the single source of truth for all risks and questions; (3) Part D — removed "Gate-Critical" questions block; Part D now contains Scoring Inputs and Nice to Have only; opens with callout note pointing to Part C; (4) Part E — removed "Conditions That Must Be Met" prose block and "If Conditions Cannot Be Met" prose block; replaced with compact Kill Conditions table (Condition \| Trigger \| Verdict, 2–4 rows); (5) Fixed hardcoded session path in Phase 6 docx skill read — now uses dynamic find command |
| v0.10.0 | Mar 2026 | Overhauled `/dd-report` command and `dd-report-format-reference.md` (plugin v2.7.0): (1) Corrected DD Report visual layout to exact STL spec — every scored section is a 2-column table (content col 9432 DXA, score col 1080 DXA), not paragraph + callout box; (2) Added RAG score cell colors extracted from STL source XML (Green `375623`/White for 4–5, Amber `FFC000`/Dark for 3, Red `C00000`/White for 1–2) at 24pt bold; (3) Set exact page layout (margins 864 DXA, content width 10512 DXA, header/footer offset 708 DXA); (4) Added section numbering requirement (1. through 11.); (5) Corrected document structure order: Recommendation banner → Company header → Sections 1–11 → Recommendation table → DD Team Votes → Appendix A; (6) Added 5 Sharp & Succinct content rules to dd-report.md Step 4 (Once and Down, Section Mandates Exclusive, Tables Absorb Facts, Risk Synthesizes not Repeats, No Closing Restatements); (7) Added format drift incident log to dd-report-format-reference.md; (8) Added mini-table specifications per section; (9) Designated `STL-NWAi-DD-Report-2026-03-19.docx` as canonical visual reference (supersedes prior Synergist reference) |
| v0.11.0 | Mar 2026 | Scout framework enrichment based on Ron Tarro framework review session 2026-03-22 (plugin v2.7): (1) Full rewrite of `scout-questions.md` — renamed Q1 to Category & Market Discontinuity (new category creator vs. optimizer; lifecycle horizon; structural shift test; 0–5 with Triage delta); Q3 Moat Assessment now produces a distilled 4-column table verdict (Primary Moat \| Strength \| Primary Threat \| Verdict) instead of moat-type enumeration by number; three new strategic dimensions added at Scout (Q4: Ecosystem Role — platform creator vs. follower, 0–5; Q5: Adjacent Displacement Risk — core use case + functional equivalents + emerging displacement, 0–5 inverted; Q6: Macro Tailwind — 4-dimension 10-year horizon table, 0–5); Phase 2 Team assessment now requires explicit Product team fit (✓/Partial/Gap) and Market team fit (✓/Partial/Gap); Analyst Verdict Block expanded to include "What You Have to Believe" (core thesis assumption) + "Where's the Bet" (specific inflection point) + "Greed" (upside case paired with Fear); Scout Conviction Score composite (/17) added (Phase 1: 40% / Strategic: 20% / Phase 2: 40%; conviction thresholds 14–17=High, 10–13=Moderate, 7–9=Low, <7=Decline); 2-page output format enforced (Page 1: scorecard tables only — Triage Carry-Forward + Product & Market Positioning + Moat Assessment + Macro Trends + Analyst Verdict Block + Score Summary with ↑/→/↓ Triage deltas; Page 2: Adjacent Tech bullets + Phase 1 bullet clusters + Phase 2 execution table + Flags + Diligence Questions); (2) `gates-and-flags-techgroup.md` — added Scout forward-mapping notes to Dimension 1 (Structural Discontinuity → Q1 Category & Market Discontinuity) and Dimension 4 (Defensibility → Q3 Moat + Q4 Ecosystem Role + Q5 Adjacent Displacement Risk); (3) `diligence-scoring-rubrics.md` — added Adjacent Displacement Risk as explicit sub-dimension of Competitive Risk (carry forward Q5 score from Scout); (4) `scout.md` command — fully updated to match new 8-step framework, fixed hardcoded old session path for docx skill (now dynamic find), Word doc output updated to 2-page design with 14 sections, output path updated to `deals/active/` subfolder |
| v0.12.0 | Mar 2026 | Diligence Layer 2 — Hypothesis Confirmation Plan (plugin v2.8): (1) No Scout → No Diligence hard gate added to `/diligence` command — halts if Scout Assessment Report not found in workspace; post-Dealum-API: stage tag check to be added as second verification; (2) Pre-flight confirmation prompt added — requires user CONFIRM before launching agent team; reminds user to verify financial files in deal room; (3) Agent team expanded from 2 to 6: company-researcher (enhanced with commercial validation), market-analyst (new — discontinuity test + TAM/SAM + timing), competitive-intelligence (refocused to pure competitive), technical-diligence (new — thin wrapper + TRL + IP + AI moat), financial-analyst (new — reads deal room financial files, models unit economics + 10x path), risk-assessor (new — regulatory, exit landscape, execution + market risk); (4) Agent deployment by stage: company-researcher + market-analyst + competitive-intelligence + technical-diligence (light) at Scout; all 6 at Diligence; financial-analyst conditional on financial files; (5) DD Kickoff Package restructured from 5 parts (A–E) to 6 parts (A–F): Part B is new Layer 2 Hypothesis Confirmation Plan (AI-derived conclusions, not human-filled); Part C is Scored Assessment (formerly B); Part D is Layer 1 17-folder checklist (formerly C, renamed); Part E and F carry forward former D and E; (6) Layer 2 output format enforced: each of 6 validation groups = hypothesis (from Scout) + 2–3 sentence AI conclusion + 🟢/🟡/🔴 signal + biggest uncertainty; strict 4–5 line maximum per group, 1-page total; (7) `dd-checklist.md` updated with Layer 2 architecture overview and Layer 2 → DD Report score mapping table; (8) `diligence-scoring-rubrics.md` updated with Layer 2 rubric mapping table (each rubric mapped to its primary + secondary Layer 2 group); (9) Scout command updated to launch 4 research agents (company-researcher, market-analyst, competitive-intelligence, technical-diligence light) before Phase 1 scoring |
| v0.18.0 | Apr 2026 | Triage-with-scoring promoted to NWAi Universal Screening Framework (Backlog #1): (1) `references/gates-and-flags.md` rewritten — was the legacy 6-gate pass/fail AutoKill (107 lines); now the **NWAi Universal Triage Framework v2.0** (262 lines): 3 hard gates + NWA Filter (Cynical Default, Goliath Test, LLM Ingestion Test, Revenue Quality Audit) + Opportunity scoring (6 dimensions × 0–5 = 30) + Readiness scoring (5 dimensions × 0–5 = 25) + Readiness Downgrade Rule + Research Protocol + Decision Logic (ADVANCE ≥ 20/30, WATCH 14–19, DECLINE < 14 or any hard gate FAIL or Market Opportunity ≤ 2). Applies to all NWAi verticals (Tech, Medical, Space, Consumer, Industrial, Fintech); (2) `references/_archive/gates-and-flags-6gate-legacy.md` created — preserves the original 6-gate AutoKill content (107 lines, banner-flagged as deprecated) for historical reference; (3) `references/gates-and-flags-techgroup.md` slimmed from 437 → 260 lines — now strictly the TechGroup extension: Track A (Software/AI/Cloud) and Track B (Hardware/Robotics) 6-dimension Opportunity rubrics, AI Wrapper Assessment, Replicability Speed Flag, Hardware Last Mile Standard, TRL Hard Cap, TechGroup Live Pitch Questions; cross-reference banner at top points to universal `gates-and-flags.md`; (4) `CLAUDE.md` updated — Pipeline section "Screening" stage definition rewritten to describe Universal Triage Framework with TechGroup Track A/B extension; "On failed AutoKill gates" guidance reworded to "On failed Hard Gates" including Market Opportunity ≤ 2 sub-floor; `/screen` command description updated; Key Frameworks section split into Universal + TechGroup Extension + Legacy archive entries; Terminology table replaces "AutoKill" entry with "Universal Triage Framework" + retains "AutoKill (legacy)" pointer to archive; (5) Both mirrors verified identical (`.claude/` and `plugin/unpacked/nwai-tech-pipeline/skills/...`). Decision: LLM Ingestion Test kept in universal NWA Filter (Option A); Track A/B bifurcation remains TechGroup-only (Decision 2). |
| v0.17.0 | Apr 2026 | Workspace hygiene + canonical-checkout consolidation (Backlog #2): (1) `CLAUDE.md` Workspace path on Mac corrected from `/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence` to `/Users/jamie/ClaudeCodeProjects/nwa-intelligence` — the Desktop folder is the Cowork planning workspace, not the canonical code checkout; (2) `.gitignore` updated to ignore `deals/` — deal artifacts (pitch decks, transcripts, Triage/Scout/DD reports) are local file organization only, not version-controlled, eliminating layout-consistency questions across STL/Synergist/Captain Compliance; (3) Bundled with destructive cleanup commit removing Drive shadows (`plugin/current/zi*`), legacy push scripts (`.git-autopush.sh`, `push.sh`), and the redundant Desktop `.git/` checkout that was Drive-syncing a credential-bearing config; (4) Note: post-PAT-rotation update to `CLAUDE.md` GitHub Sync section deferred until Jamie completes token rotation. |
| v0.16.0 | Apr 2026 | Architecture file corrections — gap closure after recent plugin updates: (1) Fixed Layer 3 heading from "Seven Workflows" to "Eight Workflows" (post-meeting was the 8th); (2) Fixed Layer 5 reference count from "Seven" to "Nine"; (3) Added `post-meeting.md` to file structure commands/ listing (was in Layer 3 table but missing from tree); (4) Added `gates-and-flags-techgroup.md` to file structure references/ listing (was in Layer 5 table but missing from tree); (5) Added `diligence-analysis-framework.md` to file structure references/ listing (same gap); (6) Added retroactive v0.15.0 changelog entry |
| v0.15.0 | Apr 2026 | Added `/post-meeting` command and `diligence-analysis-framework.md` reference (plugin v2.9.x): (1) `commands/post-meeting.md` — new command for processing diligence meeting transcripts; applies analyst lens (declarations, structural contradictions, moat signals, team signals, thesis stress points) before reconciling Diligence Action Tracker; produces dual-output document (Analyst POV + Key Insights + Resolved/Open tracker); triggered via `/post-meeting [company] [product\|gtm\|financials]`; (2) `references/diligence-analysis-framework.md` — new reference doc defining the full behavioral standard for post-meeting analysis; analyst POV leads every output; tracker reconciliation is the record, not the deliverable; progressive POV architecture — each meeting updates the running thesis; (3) Layer 3 commands table updated to include `/post-meeting` row; Layer 5 reference table updated to include `diligence-analysis-framework.md` row; file structure tree not yet updated (corrected in v0.16.0) |
| v0.14.0 | Apr 2026 | Framework enrichment from Synergist diligence meeting feedback (A1 + A2): (1) `scout-questions.md` — added Q1b Demand Signal Test as new Phase 1 dimension (demand-pull vs. technology-push assessment; required outputs: demand type, evidence, strongest signal; 0–5 scoring rubric; ⚠️ Yellow Flag at score ≤ 2; agent support note for market-analyst); Phase 1 now 4 dimensions (Q1 + Q1b + Q2 + Q3); Scout Conviction Score recalculated — Phase 1 weighted max increased from 6.0 to 8.0, total composite now /19 (was /17); conviction thresholds updated (16–19=High, 11–15=Moderate, 7–10=Low, <7=Decline); Score Summary table and Page 2 rationale updated to include Q1b row; (2) `ai-moats-framework.md` — added Replicability Speed Matrix (4-row threat actor table: open-source community, funded startup, Big Tech platform, LLM provider) with required "Could Replicate In" and "Barrier" columns; added dual flag triggers (⚠️ Yellow Flag if any row < 6 months, ⚠️ Strong Yellow Flag if LLM provider row < 12 months); renumbered scoring step to 6; (3) `gates-and-flags-techgroup.md` — added Replicability Speed Flag sub-section under AI Wrapper Assessment (applies at Scout + Diligence); two flag triggers matching ai-moats-framework; compounding rule: High Wrapper Risk + Replicability Speed Flag = strong DECLINE signal unless SME-validated |
| v0.13.0 | Mar 2026 | Architecture file housekeeping (plugin v2.9.0): (1) Updated workspace root file structure — plugin now versioned as `nwai-tech-pipeline.plugin` v2.9.0 (no version suffix in filename); added `plugin/current/` and `plugin/archive/` directories; added `nwai-tech-pipeline.zip` (org upload package); (2) Added `scripts/` directory to file structure — `scripts/dd-report-generator.js` is the mandatory canonical DD Report generator (all `/dd-report` runs must use this script); (3) Updated canonical DD report reference throughout from `Synergist-DD-Investment-Report-2026-03-11.docx` to `STL-NWAi-DD-Report-2026-03-19.docx` (CLAUDE.md binding reference); (4) Fixed changelog ordering — v0.11.0 was logged after v0.12.0 due to retroactive addition; order corrected |

---

*NWAi Investment Intelligence | TechGroup | Jamie, Co-Chair*
