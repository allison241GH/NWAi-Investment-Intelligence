# Desktop Checkout — Reconciliation Report

**Generated:** April 26, 2026 (Cowork session post-Session-2 commit)
**Purpose:** Document the orphaned working tree of the Desktop checkout (`/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence`) so per-file decisions can be made cleanly in a follow-up session before the Desktop `.git/` is removed.
**Constraint applied during generation:** read-only. No file in either workspace was modified, moved, or deleted. The pending hygiene execution (steps 2–8 of the original plan) is paused until the decisions in Section 4 are applied.

**Canonical workspace** (the source of truth for code and the "live" repo): `/Users/jamie/ClaudeCodeProjects/nwa-intelligence` at HEAD `787f335` (Session 2 commit). Branch is 2 commits ahead of `origin/main` and not yet pushed.

**Desktop checkout state when inspected:**
- HEAD is at `bc25eba` (the pre-Session-1 baseline) — so it is missing Session 1 commit `0128772` and Session 2 commit `787f335`, and the entire `demo/` directory does not exist there.
- 8 modified tracked files (originally summarized as 6 — see Section 1 note about 2 plugin-mirror files).
- 17 untracked files/directories (originally summarized as 14 — the 3 `plugin/current/zi*` archives were undercounted).
- 44 "deleted" tracked files (originally summarized as 41 — minor undercount). Every one of these files exists in canonical; they show as deleted only because the Desktop on-disk copy is missing them while the Desktop `.git/` index still tracks them at HEAD `bc25eba`.
- No commits ahead of origin. No stashes.

---

## ⚠️ The Single Most Important Finding

**The Desktop edit to `gates-and-flags-techgroup.md` is a major framework evolution from v1.0 → v2.0** that is directly relevant to the canonical CLAUDE.md update flagged in our backlog. It introduces:

1. The **NWA Filter** — four mandatory tests (Cynical Default, Goliath Test, LLM Ingestion Test, Revenue Quality Audit) with hard scoring caps
2. **Track A / Track B split** (Software/AI vs Hardware/Robotics) — different scoring dimensions per track
3. **Sixth Opportunity dimension: Venture Economics** ($100M ARR path, exit logic, Red Ocean test)
4. **Updated thresholds:** Opportunity 25 → 30, Readiness 20 → 25, ADVANCE ≥ 20/30 (was ≥ 18/25)

Companion edits to `screen.md`, `scout.md`, and the three research agents propagate this v2.0 framework throughout the screening + scout pipeline. The framework reference is mirrored in two locations (`.claude/skills/...` and `plugin/unpacked/...`) with identical edits — so both copies need the same decision.

**This is almost certainly *the* live framework Jamie referenced in Session 2** when he said "TechGroup's production pipeline has evolved to triage-with-scoring" and "canonical CLAUDE.md update pending separate session." Note: in Session 2, the demo data was built against the **canonical v1.0 framework** (5 Opportunity dims × 5 = 25 max, 4 Readiness × 5 = 20 max, ADVANCE ≥ 18/25). If the Desktop v2.0 IS the live version, **the demo's triage_assessment scoring shape will need to update too** before the board demo. That's a downstream consequence to flag — not part of this hygiene cleanup.

---

## Section 1 — Eight Modified Tracked Files

The original git status summary listed 6 modified tracked files, but the .claude/ paths and the plugin/unpacked/ paths are mirrored — the same 4 files appear in both locations. So there are 8 file paths but effectively 5 distinct edits (the gates-and-flags content and the screen.md content each have two mirrored copies). I document each file path separately for completeness, and note the mirroring.

### 1.1 — `.claude/skills/nwai-investment-framework/references/gates-and-flags-techgroup.md` ⭐ PRIORITY

**Mirrored copy at:** `plugin/unpacked/nwai-tech-pipeline/skills/nwai-investment-framework/references/gates-and-flags-techgroup.md` (Section 1.5 — same edit)

**Sizes:** Desktop 437 lines | Canonical 309 lines | Net +128 lines

**Summary of edits:**
The Desktop file is the **NWAi TechGroup Screener Framework v2.0** — a substantive upgrade of the v1.0 framework currently on canonical. Key changes:

1. **New "NWA Filter" section** (4 tests, mandatory before any 4 or 5 score):
   - **Cynical Default** — unverified claims cap at 3/5
   - **Goliath Test** — "Could NVIDIA / MSFT / AWS / Salesforce / domain incumbent kill this with a feature update in 12-18 months?" If yes without counter-argument → Defensibility caps at 3/5
   - **LLM Ingestion Test** — "Could a customized GPT-4o / Claude agent replicate 80% of this product's core function?" If yes → AI Wrapper Risk = HIGH → Defensibility caps at 2/5 AND Traction caps at 2/5 ("Fragile")
   - **Revenue Quality Audit** — Sticky vs. Stagnant classification; Stagnant caps Traction at 2/5
2. **Track A / Track B split** — every deal classified as Software/AI/Cloud (Track A) or Hardware/Robotics/Physical Tech (Track B); different Opportunity dimensions per track
3. **Sixth Opportunity dimension: Venture Economics** — explicit $100M ARR path, exit logic, Red Ocean penalty
4. **Updated thresholds** — Opportunity total **30** (was 25), Readiness total **25** (was 20), ADVANCE threshold **20/30** (was 18/25), Readiness Downgrade Rule (Readiness <15/25 forces WATCH even if Opportunity is high)
5. **Updated Defensibility scoring** — explicit hard caps tied to LLM Ingestion Test and Goliath Test results, "Inertia Penalty" for retention driven by switching cost
6. **Updated Traction scoring** — Revenue Quality Audit baked into the rubric, AI Wrapper Traction Cap, Cynical Default
7. **New Readiness 5th dimension: Traction Velocity** (was 4 dimensions, now 5)

**Recommendation: PORT FORWARD — but the framework version question needs Jamie's call first.** The Desktop edit is more rigorous and reflects the analytical sophistication NWAi has been building. It's almost certainly intended as the canonical version. **Before porting, confirm:**
- Is v2.0 the live model that should replace v1.0 in canonical, or is it an experimental fork?
- If it's live, this should land in canonical as a single commit ("framework: TechGroup screener v1.0 → v2.0") **and** trigger an update to the demo's `triage_assessment` rendering and seed data (Aperion + Lattice Labs + the 5 backfilled deals all use 5+4 dimensions = 25/20 right now).
- CLAUDE.md update can land in the same commit or follow-up.

### 1.2 — `.claude/commands/scout.md`

**Sizes:** Desktop 235 lines | Canonical 203 lines | Net +32 lines

**Summary of edits:**
1. **Five sub-dimension Team scoring** — replaces the single-line "domain credibility + key strength + key gap" with a structured 5-sub-dimension assessment: Founder-Market Fit, Execution Evidence, Co-founder/Team Dynamics, Referenced Credibility, Team Completeness. Each sub-dimension rates STRONG/MODERATE/WEAK or ALIGNED/UNCLEAR/RISK SIGNAL with explicit scoring guidance.
2. **Dual Score system** — splits the old "Scout Conviction Score" into:
   - **Score A: Intelligence Conviction Score** — what the AI research found (max 17.0, weighted)
   - **Score B: Thesis Fit Score** — rule-based, derived from Triage carry-forward (Opportunity + Readiness, max 45)
   - Plus a "Dual Score Interpretation" section that handles divergence (high conviction + low fit = pass with referral; low conviction + high fit = conditional watch; etc.)
3. **Page-1 and Page-2 layout updates** — Analyst Verdict Block now carries both scores plus the Dual Score Interpretation; Phase 2 Execution table's Team row expands to include the 5-sub-dimension breakdown.

**Recommendation: PORT FORWARD.** This is a substantive analytical upgrade that aligns with the v2.0 framework rigor (Section 1.1). The Team scoring sophistication mirrors the team-analyst Team Quality Assessment edits (Section 1.3). The Dual Score system is a clean separation of "what the deal is" (Thesis Fit, criteria-derived) from "what we found" (Intelligence Conviction, agent-derived). Land alongside Section 1.1 in the same framework-upgrade commit.

### 1.3 — `.claude/agents/team-analyst.md`

**Sizes:** Desktop 307 lines | Canonical 244 lines | Net +63 lines

**Summary of edits:**
1. **New "Data Freshness Rule" section** — appended near the top, applies to all research:
   - Append current year to all funding/traction searches
   - Flag any funding round >18 months old as the most recent data point
   - Distinguish current vs. historical traction metrics; flag press-release figures >18 months old
   - Cross-reference AngelList/Gust/Crunchbase against recent news/LinkedIn (those platforms have stale self-reported data)
2. **New "Section 2b: Team Quality Assessment"** — five-sub-dimension team rubric matching the scout.md Team scoring (Section 1.2): Founder-Market Fit, Execution Evidence, Co-founder/Team Dynamics, Referenced Credibility — plus a dedicated output block in the FOUNDERS section.

**Recommendation: PORT FORWARD.** Both edits are improvements that the v2.0 framework expects. The Data Freshness Rule is independently valuable even if the v2.0 framework as a whole isn't adopted. The Team Quality Assessment must land if scout.md (Section 1.2) lands.

### 1.4 — `.claude/agents/competitive-positioning-analyst.md`

**Sizes:** Desktop 260 lines | Canonical 246 lines | Net +14 lines

**Summary of edits:**
1. **Data Freshness Rule** — same pattern as team-analyst.md. Adds 18-month staleness filter, current-year search injection, market-size publication-date flagging.
2. **Direct Competitors table** — adds a "Last Data Point" column. Flags any competitor row where the most recent data point is >18 months old.
3. **Market Size Validation searches** — append current year to all queries; flag publication date.

**Recommendation: PORT FORWARD.** Lightweight but valuable. The Data Freshness Rule is the same one in 1.3. Trivial merge alongside the framework upgrade commit.

### 1.5 — `.claude/agents/market-analyst.md`

**Sizes:** Desktop 213 lines | Canonical 201 lines | Net +12 lines

**Summary of edits:**
1. **Data Freshness Rule** — same pattern as 1.3 and 1.4. Appended to research-protocol section.
2. **TAM/SAM table updates** — adds Credibility and Freshness columns; explicit freshness classification ("CURRENT / AGING ⚠️ / STALE ❌").

**Recommendation: PORT FORWARD.** Same call as 1.4 — port alongside framework upgrade.

### 1.6 — `.claude/commands/screen.md`

**Mirrored copy at:** `plugin/unpacked/nwai-tech-pipeline/commands/screen.md` (Section 1.7 — same edit)

**Sizes:** Desktop 281 lines | Canonical 244 lines | Net +37 lines

**Summary of edits:**
The screen.md command is restructured to drive the v2.0 framework end-to-end. Step structure goes from 7 steps to 8:

| v1.0 (canonical) | v2.0 (Desktop) |
|---|---|
| 1. Load Screener Framework | 1. Load Screener Framework |
| 2. Confirm Inputs | 2. Confirm Inputs |
| 3. Light Web Research (2 dimensions) | 3. **Assign Track (A/B)** — NEW |
| 4. Apply Hard Gates | 4. **Three Mandatory Web Searches** (was 2; adds Incumbent / Competitive Landscape search to feed Goliath Test) |
| 5. AI Wrapper Assessment | 5. Apply Hard Gates |
| 6. Score All Dimensions | 6. **Run NWA Filter Tests (Track A) / Hardware Assessment (Track B)** — NEW; runs Goliath Test, LLM Ingestion Test, Revenue Quality Audit, Cynical Default check |
| 7. Produce Triage Report | 7. Score All Dimensions (with NWA Filter caps applied) |
|  | 8. Produce Triage Report (Track-aware output) |

The Triage Report output template is also updated: includes track designation, Opportunity / 30 (was / 25), Readiness / 25 (was / 20), and a new "NWA Filter Results" section (Track A) or "Hardware Assessment" section (Track B) replacing the old "AI Wrapper Assessment" section.

**Recommendation: PORT FORWARD.** This MUST land if Section 1.1 (gates-and-flags v2.0) lands — the command is the entry point that runs the framework. They cannot diverge.

### 1.7 — `plugin/unpacked/nwai-tech-pipeline/commands/screen.md`

**Mirror of Section 1.6.** Identical edit to the .claude/ copy. Land both in the same commit.

**Recommendation: PORT FORWARD** (same as 1.6).

### 1.8 — `plugin/unpacked/nwai-tech-pipeline/skills/nwai-investment-framework/references/gates-and-flags-techgroup.md`

**Mirror of Section 1.1.** Identical edit to the .claude/ copy. Land both in the same commit.

**Recommendation: PORT FORWARD** (same as 1.1, same priority).

---

## Section 2 — Untracked Files and Directories (17 items)

The original git status summary listed 14 untracked items; the actual count is 17 (the three `plugin/current/zi*` files were not enumerated in the original summary).

### 2.1 — `Claude Code/` (directory, ~56 KB, 4 files)

**Contents:**
- `Scoping.md` (22 KB, Apr 24) — the Phase 1 demo Scoping doc that drove Sessions 1 and 2
- `Setup.md` (15 KB, Apr 26) — Claude Code dev environment setup notes
- `Session-2-Brief.md` (6.9 KB, Apr 26) — the brief that drove Session 2 (we already used this)
- `Session-Backlog.md` (6.3 KB, Apr 26 20:26 — actively edited tonight) — running backlog of pending Cowork items

**Recommendation: KEEP IN PLACE.** These are session orchestration / planning documents, not code. They live correctly alongside the strategic planning content in the Desktop folder. They do **not** belong in the code repo (`/Users/jamie/ClaudeCodeProjects/nwa-intelligence`) — that repo is for the runtime plugin and the demo. Confirm with Jamie that this is the intended home; if so, add to `.gitignore` of the code repo (already implicitly excluded since they live in a separate path) and stop worrying about them.

### 2.2 — `deals/active/Captain Compliance/` (directory, 2.4 MB)

**Contents:** `Data Room/` (5 files: pitch deck PDF, live pitch transcripts, Dealum fields PDF, internal post-pitch discussion transcript) + `Reports/` (2 files: Triage Report 2026-04-17.docx, Scout Assessment Report 2026-04-17.docx) + `.DS_Store`

**Summary:** Real, active deal — Captain Compliance — with both Data Room artifacts and generated NWAi reports. Pitched February 2026, post-live-pitch discussion April 13, Triage + Scout reports April 17. This deal is **not** present in canonical's `deals/active/`.

**Recommendation: COPY TO CANONICAL** — `cp -r "deals/active/Captain Compliance/" /Users/jamie/ClaudeCodeProjects/nwa-intelligence/deals/active/`. This is a real working deal that should live with the rest of the active pipeline. Note: the existing canonical `.gitignore` may exclude `deals/active/` from tracking (worth checking) — if so, the deal will live on disk but not be committed, which is the standard pattern for confidential deal artifacts.

### 2.3 — `deals/active/Summit Technology Laboratory/` (directory, 4.8 MB)

**Contents:** `Data Room/` (16 files including Panasonic contract, term sheets, financials, transcripts, cap table, Excel projections — and one `~$STL-Pipeline-Hubspot.xlsx` Office lock file) + `Reports/` (8 files: Triage Report, Scout Assessment, DD Kickoff Package, DD Investment Report, multiple meeting reconciliation reports)

**Summary:** Same Summit Technology Laboratory deal that exists in canonical, but **organized into nested `Data Room/` and `Reports/` subfolders** rather than the flat layout in canonical. The canonical layout is `deals/active/STL Data Room/...` (data room files at top level alongside the report files). The Desktop layout is `deals/active/Summit Technology Laboratory/Data Room/...` and `deals/active/Summit Technology Laboratory/Reports/...`.

**Files possibly newer than canonical:** the Desktop has `STL Financial-Projections.pdf` and `STL-Pipeline-Hubspot.xlsx` and a 4-7 Diligence Meeting transcript (`Transcripts of 4-7 Dilgence meeting.docx`) that I should sanity-check vs. canonical to confirm whether they're net-new or duplicates with different filenames.

**Recommendation: NEEDS JAMIE DECISION.** The folder reorganization (Desktop's `Data Room/` + `Reports/` subfolder structure) is arguably cleaner than canonical's flat layout. Three options:
- **Option A:** Migrate canonical to the Desktop's nested structure (rename + move files in canonical to match). Then copy any net-new Desktop files into the canonical's new layout.
- **Option B:** Keep canonical's flat layout. Copy any net-new Desktop files into the canonical's flat layout (renaming to match the existing pattern).
- **Option C:** Keep both — Desktop becomes the working/planning copy with deeper organization; canonical stays flat for deals that have been fully ingested.

I lean toward Option A (better organization) but this is a workspace-organization preference Jamie should decide.

### 2.4 — `deals/active/Synergist Technology/` (directory, 9.4 MB)

**Contents:** `Data Room/` (~21 files: pitch deck, term sheets, technical whitepaper, market scans, transcripts, financials, capital strategy, EULA, cap table, plus a 4-14 GTM diligence call transcript and a 3-31 GTM diligence call transcript that may be newer) + `Reports/` (~10 files: Triage, Scout, DD Kickoff, DD Investment Report, multiple meeting reconciliations, market intel briefing)

**Summary:** Same situation as Section 2.3 — the Synergist deal exists in canonical under `deals/active/Synergist Data Room/...` (flat) but Desktop has it nested. The Desktop folder appears to have a few additional transcripts and reports that may not be in canonical.

**Recommendation: NEEDS JAMIE DECISION** (same options A/B/C as 2.3). The Synergist deal also has the largest Data Room — the diff is harder to eyeball without a precise file-by-file comparison. Suggest doing the migration as one operation alongside Captain Compliance and STL.

### 2.5 — `docs/Jamie & Ron_ The Grand Unifying Theory chat.md` (file, 11.7 KB)

**Content summary:** Verbatim transcript of a strategic call between Jamie and Ron on April 22, 2026, plus an embedded email thread (April 19–20) with Ron's "and-and-also" response framing. The conversation covers the four-track NWA architecture (Dealflow Intelligence, Member Intelligence, Ecosystem Intelligence, the AI amplification layer), strategic pivots away from a Dealum-firehose model, and the framing question of "what NWA is solving for, upstream of tool selection." References Jessica's Platform Discussion V1, Jared (MD of Miami Angels), Sam Gurin (career VC, early Apple investor), Joe Lonsdale's Standard Metrics interview, and the Arena magazine.

**Recommendation: KEEP IN PLACE.** This is strategic planning content. Belongs in the Desktop's `docs/` folder alongside the rest of the strategic planning material. Does **not** belong in the code repo. Same logic as Section 2.1.

### 2.6 — `docs/Member_Social_Intelligence_Layer_V1_Features.md` (file, 4 KB)

**Content summary:** Feature spec for the Member Intelligence Layer V1 — covers structured profiles, member-controlled privacy, faceted search directory, network agent (natural-language queries), portfolio view, deal-to-member routing, founder ask routing, network graph for two-hop intro paths, plus a separate Social Intelligence Layer section.

**Recommendation: KEEP IN PLACE.** Strategic planning content. Same logic as 2.5.

### 2.7 — `docs/NWA-AI-Investment-Intelligence-GUT.html` (file, 27 KB)

**Content summary:** HTML rendering of the Grand Unifying Theory document — formatted version with embedded styling. Likely paired with 2.8 (the PDF version of the same content).

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.8 — `docs/NWA-AI-Investment-Intelligence-GUT.pdf` (file, 92 KB)

**Content summary:** PDF version of the GUT document. 1 page (per file inspection).

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.9 — `docs/NWAi-Grand-Unifying-Theory-v0.1.md` (file, 12 KB)

**Content summary:** Working draft v0.1 of the Grand Unifying Theory — synthesizes the NWAi Strategic Reframe + Ron's "and-and-also" email + the Jamie/Ron call transcript + Jessica's Platform Discussion V1 + Jared's "social intelligence" framing. Defines the One-Sentence Theory ("NWA converts syndicate-scale human expertise into investment conviction — faster, sharper, and with more judgment depth than any individual, firm, or filtering algorithm can"), the Four Tracks, and the architecture cascade.

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.10 — `docs/NWAi-Huddle-Brief-2026-04-22.md` (file, 5 KB)

**Content summary:** Pre-read for the 4-person huddle (Ron, Jessica, Jared, Jamie) on April 22, 2026. Frames Jessica's Platform Discussion V1 as a strong operational brief but argues the strategic question is upstream and unset. Covers points of agreement (Dealum must be replaced; SPEED + ENGAGEMENT are real; AI belongs in pipeline; Coditect is the right build partner; Week 1–2 no-regret moves) and Jamie's "where we need to start from" framing.

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.11 — `docs/NWAi-Strategic-Reframe-Reference.md` (file, 12 KB)

**Content summary:** Reference document capturing the strategic reframe from "deal-firehose filtering pipeline anchored on Dealum" → "member-centric social intelligence platform that activates 200 members' domain expertise on curated, referred, and cross-syndicate deals." Uses the Lafley & Martin Playing-to-Win Where-to-Play / How-to-Win cascade. Tagged as the onboarding doc for any new session, collaborator, or downstream work (SOW drafting, Coditect re-scope, board prep).

**Recommendation: KEEP IN PLACE.** This is **the** strategic anchor doc. Same logic as 2.5.

### 2.12 — `docs/NWAi-TechGroup-Managed-Agents-Architecture-v1.0.docx` (file, 22 KB)

**Content summary:** Word doc — TechGroup managed-agents architecture v1.0. Binary, content not previewed but the filename indicates an architecture spec.

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.13 — `docs/RaiseLink-NWAi-Brief-Comparison-2026-04.md` (file, 6.8 KB)

**Content summary:** Executive brief comparing the NWAi Investment Intelligence Pipeline against RaiseLink — sources from conversations with Chris Houghtaling rounds 2 & 3. Tables the comparison across core function, primary user, AI/intelligence, data source, matching logic, output, team assessment, learning loop, and current stage. Bottom line: "RaiseLink handled the *intake and filtering* problem with structured matching; NWAi handles the *intelligence and analysis* problem with AI agents. Designed to solve sequential stages of the same workflow — not the same problem."

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.14 — `docs/cowork-vs-enterprise-platform.md` (file, 8.5 KB)

**Content summary:** Comparison brief between the current Claude Cowork-powered NWAi pipeline and a hypothetical enterprise-grade intelligence layer. Frames the build/buy decision: when and whether to build a standalone enterprise system. Notes that the enterprise layer would sit alongside Dealum (not replace) — Dealum stays the system of record; the enterprise layer handles AI analysis, scoring, report generation, with bidirectional Dealum sync and its own web UI.

**Recommendation: KEEP IN PLACE.** Same logic as 2.5.

### 2.15 — `plugin/current/ziGnqFWW` (file, 212,675 bytes, ZIP archive)
### 2.16 — `plugin/current/ziQE03F3` (file, 212,675 bytes, ZIP archive)
### 2.17 — `plugin/current/ziq8OXbG` (file, 212,675 bytes, ZIP archive)

**Combined inspection:** All three are exactly the same size (212,675 bytes) and are valid ZIP archives ("Zip archive data, at least v2.0 to extract"). The naming convention — short alphanumeric strings with `zi*` prefix — matches Google Drive's transient shadow-file naming pattern. The Desktop folder is confirmed Drive-synced (the original investigation found `.tmp.drivedownload` and `.tmp.driveupload` files alongside).

**Recommendation: DISCARD AS JUNK.** These are Drive sync artifacts — partial or shadow copies of `.plugin` archive files. The canonical is the source of truth at `plugin/current/nwai-tech-pipeline.plugin` (and the Desktop has a properly-named `nwai-tech-pipeline.plugin` already, separate from these three). Three identical 212 KB files with no meaningful filename are noise.

---

## Section 3 — Forty-Four "Deleted" Files (no real losses)

All 44 files showing as deleted in the Desktop git status **exist in the canonical checkout** at `/Users/jamie/ClaudeCodeProjects/nwa-intelligence/`. They appear as deleted only because:
1. The Desktop `.git/index` tracks them at HEAD `bc25eba`, AND
2. They are no longer present on disk in the Desktop checkout (Drive cleanup, manual removal, or sync conflict at some past point).

These will **resolve automatically** once the Desktop `.git/` is removed (no .git → no tracking → no "deleted" tracked files).

### 3.1 — STL Data Room (12 files) — all present in canonical at `deals/active/STL Data Room/`

- Golden Seeds STL Deal Memo 120425.pdf
- NPI-AV-LoI.pdf
- New World Angels - Answers.pdf
- Notes prior the current BridgeRound of $750k in Dec 25.pdf
- Panasonic-Contract.pdf
- STL 2025 Financials.xlsx
- STL Cap table 01062026.pdf
- STL-Bridge-TermSheet-Signed.pdf
- STL_Summit_Technology_Laboratory_Convertible_Note_Term_Sheet_2025_signed.pdf
- Transcript of NWA_Golden Seeds Diligence Call - STL 3.24.26.pdf
- Transcript of STL's Product Demo 3.2 (1).26_
- Transcripts of 4-7 Dilgence meeting.docx
- article-of-incorporation.pdf

### 3.2 — STL Reports (top-level, 4 files) — all present in canonical at `deals/active/`

- STL-Financials-Meeting-Reconciliation-2026-04-07.docx
- STL-GoldenSeeds-Diligence-Meeting-Reconciliation-2026-03-24.docx
- STL-NWAi-DD-Report-2026-03-22.docx
- STL-Product-Demo-Meeting-Reconciliation-2026-03-02.docx

### 3.3 — Summit Technology Laboratory Reports (3 files) — all present in canonical at `deals/active/`

- Summit Technology Laboratory - DD Kickoff Package [REVISED FORMAT] 2026-03-19.docx
- Summit Technology Laboratory - Scout Assessment Report 2026-03-17.docx
- Summit Technology Laboratory - Triage Report 2026-03-17.docx

### 3.4 — Synergist Data Room (16 files) — all present in canonical at `deals/active/Synergist Data Room/`

- AS-AFFIRM Integration API-030226-195156.pdf
- Affirm FedRAMP Compliance Attestation Letter.pdf
- CDW Sell Sheet - AI Model Managed Services v202603.pdf
- Federal AI Monitoring Playbook by Synergist Technology 05DEC2025.pdf
- Management Team.docx.pdf
- Market_Guide_for_AI__837249_ndx.pdf
- NWA AI Competitive Scan .pdf
- NWA AI Market Scan.pdf
- Synergist & FAU Whitepaper - L1 Norm Subspace for AI Anomaly Detection 20250612.pdf
- Synergist - AFFIRM & MSPs 2026 v2 FINAL.pdf
- Synergist - Competitor Matrix_v1.pdf
- Synergist AFFIRM Autonomous Telemetry API 2026-02-04.pdf
- Synergist Capital Strategy.docx.pdf
- Synergist Diligence Product Demo-Review FULL TRANSCRIPTS.txt
- Synergist Technology - 2026 V1.xlsx
- synergist-technology-llc_2026-03-10_summary_cap_intermediate_cap_detailed_cap.xlsx

### 3.5 — Synergist Reports (top-level, 7 files) — all present in canonical at `deals/active/`

- Synergist Technology - DD Kickoff Package 2026-03-16.docx
- Synergist Technology - Scout Assessment Report 2026-03-16.docx
- Synergist Technology - Triage Report 2026-03-16.docx
- Synergist-Diligence-Action-Tracker-2026-03-31.docx
- Synergist-Market-Intel-Briefing-2026-04-01.docx
- Synergist-Product-Demo-Reconciliation-2026-04-05.docx
- Synergist-Technology-NWAi-DD-Report-2026-03-22.docx

### 3.6 — Repo root (1 file)

- `nwai-techgroup-pipeline-architecture.md` — present in canonical at the root with v0.16.0 content

**Total verified: 44/44 present in canonical.** No data loss risk from removing the Desktop `.git/`.

---

## Section 4 — Recommended Action Plan

Sequenced for execution in a follow-up session. Each row is a single discrete action; rows are ordered so dependencies are respected.

| # | File or group | Recommended action | Notes |
|---|---|---|---|
| 1 | **`gates-and-flags-techgroup.md`** (Sections 1.1 + 1.8 mirrored) | **PORT FORWARD** to canonical — single commit titled e.g. "framework: TechGroup screener v1.0 → v2.0 (NWA Filter, Track A/B, Venture Economics)" | Confirm with Jamie this is the live framework; this is the priority decision |
| 2 | `screen.md` (Sections 1.6 + 1.7 mirrored) | **PORT FORWARD** in the same commit as #1 | Cannot diverge from gates-and-flags-techgroup.md |
| 3 | `scout.md` (Section 1.2) | **PORT FORWARD** in the same commit as #1 | Five-sub-dimension Team scoring + Dual Score system |
| 4 | `team-analyst.md` (Section 1.3) | **PORT FORWARD** in the same commit as #1 | Data Freshness Rule + Team Quality Assessment |
| 5 | `competitive-positioning-analyst.md` (Section 1.4) | **PORT FORWARD** in the same commit as #1 | Data Freshness Rule + Last Data Point column |
| 6 | `market-analyst.md` (Section 1.5) | **PORT FORWARD** in the same commit as #1 | Data Freshness Rule + TAM freshness columns |
| 7 | **CLAUDE.md** | UPDATE to reflect v2.0 framework after items 1–6 land | Triage section needs new dimension counts (5+4 → 6+5), thresholds (18/25 → 20/30), NWA Filter mention; AutoKill terminology stays as legacy reference |
| 8 | **demo `triage_assessment` rendering + seed data** (canonical `demo/`) | UPDATE to v2.0 dimension counts (Track A/B awareness, 30/25 thresholds, NWA Filter rendering) — separate session | Phase 1 board demo currently shows v1.0 framework; either accept a known divergence or update before board demo. **Surface to Jamie for sequencing decision.** |
| 9 | `Claude Code/` directory (Section 2.1) | **KEEP IN PLACE** | Strategic / planning content; belongs in Desktop folder, not code repo |
| 10 | `docs/*.md`, `docs/*.html`, `docs/*.pdf`, `docs/*.docx` (Sections 2.5–2.14, 9 items) | **KEEP IN PLACE** | Strategic / planning content; same logic as #9 |
| 11 | `deals/active/Captain Compliance/` (Section 2.2) | **COPY TO CANONICAL** at `deals/active/Captain Compliance/` | Real active deal not yet ingested in canonical. Verify canonical .gitignore behavior for deal artifacts |
| 12 | `deals/active/Summit Technology Laboratory/` (Section 2.3) | **NEEDS JAMIE DECISION** — flat (canonical) vs. nested Data Room/Reports (Desktop) layout | If picking nested layout, migrate canonical's STL files and copy any Desktop net-new files. Suggest landing this together with #11 and #13 |
| 13 | `deals/active/Synergist Technology/` (Section 2.4) | **NEEDS JAMIE DECISION** — same flat vs. nested question as #12 | Same migration approach as #12 |
| 14 | `plugin/current/ziGnqFWW`, `ziQE03F3`, `ziq8OXbG` (Sections 2.15–2.17) | **DISCARD AS JUNK** — Drive sync shadow files | `rm "<Desktop>/plugin/current/ziGnqFWW" "<Desktop>/plugin/current/ziQE03F3" "<Desktop>/plugin/current/ziq8OXbG"` |
| 15 | `.git-autopush.sh` and `push.sh` (in Desktop checkout) | **DISCARD** after the framework port-forward (#1–#6) is committed and pushed | Stale leftovers; reference the now-non-git Desktop folder paths. Already flagged separately. |
| 16 | Desktop `.git/` directory | **DELETE** after items 1–6 (port forward) and 11–13 (deal migration decision) are resolved | Original hygiene step #3. Once removed, the 44 "deleted" files in Section 3 cease to be tracked anywhere — they exist canonically in canonical. The Desktop folder becomes a plain planning workspace. |
| 17 | Desktop `.claude/` directory (in the Desktop checkout) | **DECIDE** — does Jamie want to run Cowork sessions from the Desktop folder (in which case keep `.claude/`) or only from canonical (in which case delete)? | Independent of the .git/ removal; not destructive either way |
| 18 | CLAUDE.md "Workspace path on Mac" line | UPDATE in canonical to point at `/Users/jamie/ClaudeCodeProjects/nwa-intelligence` | Original hygiene step #5 — still valid, do as part of the framework-update commit (#7) |
| 19 | CLAUDE.md "Auth" line in GitHub Sync section | UPDATE in canonical from `~/.git-credentials` to "macOS Keychain" (post-PAT rotation) | Original hygiene step #5 — still valid |
| 20 | The exposed PAT in Desktop `.git/config` | ROTATE — generate new GitHub PAT, set canonical's remote to plain HTTPS, delete Desktop `.git/` (which removes the exposed token from disk) | Highest-priority security action; was flagged in original investigation |

---

## Closing Notes

**The reconciliation is dominated by one decision** — whether the Desktop's framework v2.0 is the live model that should replace canonical's v1.0. If yes, items 1–7 are a single clean commit (with the demo update as a follow-up). If no (it's an experimental fork), items 1–6 may need selective porting (perhaps Data Freshness Rule and Team Quality Assessment are universally good adds even without the v2.0 framework adoption).

**Everything else in the report is mechanical:** the 9 strategic docs and the `Claude Code/` folder belong in the Desktop planning workspace; the 3 deal folders need a layout decision but are otherwise straightforward to copy or ignore; the 3 zi* files are junk; the 44 "deleted" files have all been verified intact in canonical.

**Open question worth flagging early:** if Jamie elects to update CLAUDE.md to reflect the framework v2.0 (item #7), that triggers a downstream impact on the Phase 1 demo currently committed to canonical (`demo/data/deals.json` and `demo/types/index.ts` model the v1.0 framework — 5+4 dimensions, 25/20 thresholds). Either accept the divergence (the demo stays as a v1.0 snapshot, fine for the board demo if framing is correct) or update the demo (additional work, scope creep). Decide explicitly before the board demo.

---

*End of report. Generated read-only; no files modified outside this Markdown file.*
