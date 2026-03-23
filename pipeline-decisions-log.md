# NWAi TechGroup — Pipeline Decisions Log

*Institutional reasoning behind key framework and workflow decisions.
This document captures the **why**, not the what — the what lives in the plugin reference docs and CLAUDE.md.
Updated as decisions are made. Version-stamped per entry.*

---

## Decision 1 — Screener Reframe: From 6 Binary AutoKill Gates to 3 Hard Gates + Scored Opportunity

**Date:** March 2026
**Status:** Implemented (v2.3 plugin, `gates-and-flags-techgroup.md`)

### The strategic rationale

Three years of Dealum inbound produced zero funded deals. Every actual NWAi investment came from cross-syndication or member referrals — not from the Dealum pitch queue. This meant the original screener was optimized to find investments in a channel that historically produces none.

Separately, the team was routinely overriding two of the six AutoKill gates — SAFE structure and missing lead investor — in the actual screening discussions. Gates that get overridden in practice aren't gates; they're conversation topics. Enforcing them at the pitch deck stage was killing deals on unknowable information (you cannot determine final deal structure or lead status from a deck before speaking to the founder).

### The reframe

The screener's job is not to find the diamond. It's to identify which 1-in-9 Dealum deals deserve a 30-minute Live Pitch slot. Diamond-finding happens at Live Pitch and beyond.

Three hard gates remain non-negotiable because they *are* determinable from a pitch deck and from web research:
1. Foreign entity or IP domiciled outside the US
2. Market too small to support a 10x return
3. No credible path to commercialization (pre-concept, research project, demo lab)

Everything else becomes a scored signal: Opportunity (5 dimensions, 0–25 pts) and Readiness (4 dimensions, 0–20 pts). ADVANCE threshold: Opportunity ≥ 18/25.

SAFE and missing-lead-investor are now friction signals — raised at IntroCall with the founder, not used to kill at the deck stage. NWAi's policy of not closing SAFE deals is unchanged; only the timing of that conversation changed.

### The Live Pitch format change

Bi-weekly team meetings shifted from reviewing screened decks to hosting 3 Live Pitches per session. The screener pre-loads 3–5 Live Pitch questions tailored to each deal's specific risks, so the team walks in ready to probe rather than to meet the company for the first time.

---

## Decision 2 — Retrospective & Signal Calibration Framework

**Date:** March 2026
**Status:** Designed, pending Dealum API access to execute

### The concept

A member proposed using historic Dealum data + a web research agent to surface deals NWAi passed on that subsequently succeeded — and extract signal from what we missed. The goal is calibration of the screener over time, not a highlight reel.

### Critical framing: pattern recognition, not calibration

Without structured kill-reason data from past passes, this is a **pattern recognition exercise**, not a true calibration study. The distinction matters when presenting findings to the group: "here's what we systematically underweighted" is actionable; "here are the deals we blew" is Monday-morning quarterbacking.

True calibration requires the denominator: of all companies killed on Gate X, what fraction succeeded? Without that, you have a success cohort but no base rate.

### Success tiers (in order of research feasibility)

- **Tier 1 — Funded:** Named institutional lead in any priced round within 36 months of NWAi's pass date. Most findable via web search.
- **Tier 2 — Acquired:** Strategic or PE acquisition (explicitly not acqui-hire, which often confirms the pass). Findable but requires judgment on exit type.
- **Tier 3 — Revenue Signal:** $10M+ ARR cited in any public source. Lowest recall (most private companies don't publish ARR), highest quality signal when found.
- **Tier 4 — Notable Institutional Validation:** a16z, Sequoia, Bessemer, or equivalent backing in any round post-pass. Strong independent signal, usually publicly available.

A fourth metric — Series A within 24 months from a named lead — is tighter and more actionable than "raised Series A" alone. Time dimension matters.

### The 3-year lookback problem

No structured kill-reason notes exist for the prior three years. The workaround: work backward from the success cohort rather than forward from kill reasons.

For each company that hit a success tier, run a second-pass research job: what did they look like at the time of application (funding stage, product maturity, revenue, team)? Apply today's NWAi gates retroactively and infer the probable kill reason. This is inference, not fact — but directionally useful for pattern identification.

Stage-of-kill (Inbox vs. Screening vs. Scout) is a proxy even without specific kill notes. Screening deaths almost certainly hit an AutoKill gate; Scout deaths likely passed gates but failed venture potential assessment.

### Execution phases

**Phase 1:** All Dealum passed deals tagged "Tech," looking back as far as the data goes. First pass is broad (web research agent on all company names, flag success tiers). Second pass is deep on outliers (retroactive re-screen, estimated 1 analyst hour per company, expect 5–15 outliers in 3 years of deal flow).

**Phase 2:** Expand to all five NWAi groups (TechGroup, MedicalGroup, SpaceGroup, ConsumerGroup, FintechGroup) — but only after each group's thesis and gates are codified. The research agent is group-agnostic; the success-tier interpretation is group-specific. MedicalGroup's "did they succeed?" is FDA clearance or strategic pharma partnership, not a Series A.

### The single most important design requirement going forward

**Every pass decision must record a kill reason in Dealum from this point forward.** This is the gate-tagging requirement. Without it, future retrospectives remain pattern recognition exercises rather than true calibration studies. The value of structured kill-reason metadata compounds over time — start capturing it immediately.

Architecture: this will surface as a `/retrospective [group]` command, running the research agent in batch, scoring outcomes against success tiers, mapping kills to gate failures, and producing a calibration report.

---

## Decision 3 — Dealum API Scope

**Date:** March 2026
**Status:** Requirements drafted and sent to Dealum; API credentials pending

### What we need (read)

- `GET /applications` — full applications list filtered by "Tech" tag. Critical field: `answers` (contains pitch content the AI analysis runs against). Confirm whether `answers` is populated in standard Integration API or requires Extended API tier.
- `GET /members` — member roster for SME assignment once member-to-domain mapping is available.

### What we need (write) — deliberately narrow

Write access is scoped to **Inbox → Screening → Scout only**. The downstream pipeline (Diligence → DD Report → Decision → Memo) is handled by the admin team manually. This is an intentional design decision — downstream stages require human judgment calls that shouldn't be automated in Dealum record updates.

Two fields only:
- `step` — advance or kill a deal at each of the three early transitions
- `tags` — apply classification tags (screening verdict, kill flags, TechGroup theme)

We will never create, delete, or write to applications beyond the Scout stage.

### Webhooks: deprioritized

Dealum confirmed webhooks have a delay of up to several hours — not truly real-time. The difference between a multi-hour webhook delay and a scheduled daily sync is minimal in practice. Daily sync is simpler to manage and debug. Webhooks are not worth the complexity for what they'd gain.

---

## Decision 4 — Diligence Command: Data Room Workflow Gap

**Date:** March 2026
**Status:** Known gap; workaround in use; Phase 1c improvement pending

### The issue

The `/diligence` command automatically loads prior stage outputs from the `deals/active/` folder (Triage Report, Scout Assessment, prior DD Kickoff Package). It does **not** automatically detect or read company-specific data room folders (e.g., `STL Data Room/`, `Synergist Data Room/`).

This means primary source documents — financials, cap table, term sheet, investor memos, product demo transcripts — don't flow into the scoring rubrics unless explicitly loaded first.

### Current workaround

At the start of any diligence session where a data room folder exists, explicitly prompt Claude before running `/diligence`:

> "Please read all files in the [Company] Data Room folder and factor them into the scoring, then run diligence on [Company] by name."

This loads data room context first and carries it into the rubric scoring in a single exchange. Two separate prompts risk the context not flowing cleanly into the scoring.

### Folder structure discipline

Keep the two folder types strictly separated:
- `deals/active/[Company] Data Room/` — source documents from the company (financials, decks, cap tables, contracts)
- `deals/active/` — NWAi's analytical outputs (Triage Report, Scout Assessment, DD Kickoff Package, DD Report)

Do not move pipeline output files into data room subfolders. The diligence command searches `deals/active/` by filename pattern — moving outputs breaks the auto-load chain for downstream commands.

### Planned improvement (not yet built)

Add a Phase 1c to the diligence command that automatically detects a matching company data room folder by name and loads it before applying scoring rubrics. This removes the need for the manual pre-prompt.

---

## Decision 5 — Two Deals Run Through Full Pipeline (Reference)

**Date:** March 2026
**Status:** Complete — outputs in `deals/active/`

These are the first two deals run through the full NWAi TechGroup pipeline. They serve as calibration references for format and depth expectations at each stage.

**Summit Technology Laboratory (STL)**
- Full pipeline: Triage → Scout → Diligence (revised) → DD Report
- Verdict: Advance with Conditions (4 specific conditions)
- Key signal: Panasonic acquisition exploration — if serious, changes the entire return model
- Outstanding: Dealum step/tag update pending API credentials; conditions must be met before NWAi wires

**Synergist Technology**
- Full pipeline: Triage → Scout → Diligence → DD Report
- Outputs in `deals/active/`

Both deals were run while the DD Report format was being iterated. The canonical format reference is `STL-NWAi-DD-Report-2026-03-19.docx`. The generator script at `scripts/dd-report-generator.js` is mandatory — never freestyle the report format.

---

## Decision 6 — Enterprise Migration Architecture: Google Drive as Shared Pipeline Backbone

**Date:** March 2026
**Status:** Designed, pending Google Drive MCP connection on enterprise account

### The strategic decision

As NWAi TechGroup scales beyond a single user, the pipeline needs a shared layer that allows different team members to run different stages of the same deal — with each stage automatically inheriting the outputs of the prior stage, regardless of who ran it or on which machine.

Cowork is inherently personal and local. There is no native shared workspace in Cowork, even on enterprise. The sharing infrastructure must be built on top of it using external systems.

### The three-layer architecture

**Plugin (engine):** The `nwai-tech-pipeline.plugin` is the portable, shareable unit. It installs identically on any team member's Cowork — personal or enterprise account. It encapsulates all commands, agents, framework skill, and the Dealum MCP server. Jamie's personal account is the R&D environment where the plugin is developed and iterated. The enterprise account is the production environment where team members install the current stable version. New plugin versions distribute via GitHub.

**Google Drive (shared pipeline backbone):** Each deal gets a folder on Google Drive (`NWAi TechGroup / Deals / [Company Name] /`). Every stage output — Triage Report, Scout Assessment, DD Kickoff Package, DD Report — is automatically written to that deal's Drive folder after generation, and automatically pulled from it at the start of the next stage. This makes the handoff chain (screen → scout → diligence → DD report) work across different people's machines. Bahar runs `/screen`, saves to Drive. Jamie runs `/scout`, pulls Bahar's screen from Drive, saves scout output back. Jessica runs `/diligence`, pulls both.

**GitHub (plugin and framework version control):** The plugin file, all reference docs, CLAUDE.md, architecture doc, scripts, and this decisions log are version-controlled in the GitHub repo. The github-sync skill handles this automatically after every meaningful change. Team members with repo access can pull the latest plugin and framework at any time.

### What this means for deal outputs and Dealum

Dealum remains the canonical pipeline state record — stages, tags, and verdicts. Google Drive holds the supporting documents. The two are complementary: Dealum tells you where a deal stands; Drive holds the full analytical record behind that status.

Deal outputs (Triage Reports, Scout Assessments, DD packages, DD Reports) are saved to both the local workspace (as a safety net if Drive is unavailable) and Google Drive (as the shared team record). This mirror pattern ensures no work is lost if a credential lapses.

### What needs to be built once Google Drive MCP is connected

The plugin commands (`/screen`, `/scout`, `/diligence`, `/dd-report`) need two additions each:
1. A "pull prior outputs" step at the start — check the company's Drive folder for prior stage documents and load them into context
2. A "push output" step at the end — upload the newly generated document to the company's Drive folder

The architecture doc (`nwai-techgroup-pipeline-architecture.md`) will be updated to v0.X.0 once this is implemented, following the existing version-bump convention.

### Prerequisites before building

- Google Drive MCP confirmed connected on enterprise account (two-layer permission requirement: Claude Enterprise Owner must enable Google Workspace connectors at org level via Organization Settings → Connectors; Google Workspace admin may also need to allow Claude as a trusted app via `admin.google.com → Security → API controls`)
- Shared Google Drive folder structure created for NWAi TechGroup deals
- Each team member authenticates individually with their Google account after org-level connector is enabled
- Dealum API credentials confirmed (separate prerequisite for stage advancement writes)

### Explicit non-decisions

Individual team members' Cowork Projects are not shared and are not intended to be. Each person's Project is their personal R&D environment. The sharing happens through Drive (documents) and Dealum (pipeline state), not through Cowork itself.

---

| Item | Owner | Status |
|------|-------|--------|
| Dealum API credentials — obtain token + room ID | Jamie | Pending Dealum response |
| Gate-tagging in Dealum — start recording kill reasons on all new passes | Jamie / Admin | Start immediately, don't wait for API |
| Google Drive MCP — confirm connection status | Jamie | Attempted, not confirmed connected; retry in fresh session |
| Retrospective `/retrospective` command — build after Dealum API live | Plugin dev | Blocked on API |
| Diligence Phase 1c — auto-detect data room folder | Plugin dev | Planned, not scheduled |
| SME assignment — member-to-domain mapping | Jamie | Blocked on Dealum members API |
| 5-group thesis codification — prerequisite for cross-group retrospective | Group leads | Not started (TechGroup only active) |

---

*Last updated: March 2026 | Maintained by Jamie, TechGroup Co-Chair*
*This log is a living document — add entries when key decisions are made in session.*
