# Folder Consolidation Plan — Desktop → Canonical

**Date:** 2026-04-28
**Author:** Claude (with Jamie)
**Status:** Draft for Jamie's review
**Goal:** Collapse the two-folder split (`~/Desktop/Claude CoWork NWAi Investment Intelligence/` and `~/ClaudeCodeProjects/nwa-intelligence/`) into a single canonical workspace. Continue running deals through the pipeline AND evolving the strategy in one place.

---

## TL;DR

The two folders have **drifted bidirectionally** — not just "Desktop is the studio archive." Desktop has unique strategic docs AND more recent deal artifacts (Captain Compliance entirely, Synergist GTM/Action Tracker updates) that the canonical folder is missing. The current `CLAUDE.md` description of Desktop as a "demo planning archive" is out of date.

The right move is: **migrate everything unique-to-Desktop into canonical under a clean structure, archive the Desktop folder (don't delete), update CLAUDE.md, commit.** After that, Cowork only ever points at canonical.

---

## What I Found — Three Buckets

### Bucket 1: Identical or near-identical (already in both)

These don't need migration. They exist in both folders with same content (verified by checksum / size where checked):

| File / Folder | Status |
|---|---|
| `plugin/current/nwai-tech-pipeline.plugin` | Same MD5 (`35cdf31f...`) — identical |
| `plugin/current/nwai-tech-pipeline.zip` | Same size — identical |
| `plugin/archive/*` (19 files) | Same set of versioned plugins in both |
| `notes/Process-Improvements-from-Synergist-Diligence-Meeting-2026-04-01.md` | Same size — identical |
| `notes/diligence-layer2-design.md` | Same size — identical |
| `scripts/dd-report-generator.js` | Same size — identical |
| `legacy/github-sync.skill` | Same size — identical |
| `pipeline-decisions-log.md` | Same size (15,937 bytes) — identical |
| `docs/NWAi-TechGroup-Pipeline-Reference.html` / `.pdf` | Same in both |
| `docs/NWAi-TechGroup-Platform-Overview.html` / `.pdf` | Same in both |

**Action:** None. Leave canonical's copies in place.

### Bucket 2: Drifted — canonical is the newer/correct version

| File | Desktop | Canonical | Action |
|---|---|---|---|
| `CLAUDE.md` | Apr 9, 22.3 KB, references legacy "AutoKill" framework | Apr 27, 25.4 KB, current Universal Triage Framework v2.11 | **Canonical wins** — Desktop CLAUDE.md is stale, do not pull in |
| Top-level architecture doc | Doesn't exist on Desktop | `nwai-techgroup-pipeline-architecture.md` exists | **Canonical only** — leave alone |
| `.claude/` runtime | Doesn't exist on Desktop | Live runtime, agents/commands/skills/servers | **Canonical only** — leave alone |
| `demo/` Next.js app | Doesn't exist on Desktop | Built out in canonical | **Canonical only** — leave alone |
| `.git/`, `.mcp.json`, `push.sh`, `.git-autopush.sh` | Not on Desktop | All in canonical | **Canonical only** |

### Bucket 3: Unique to Desktop — must be migrated

This is the actual migration work. Three sub-categories:

#### 3a. Strategic / platform-vision docs (10 files, ~210 KB)

These are platform thesis and positioning material. None of them exist in canonical. Migrate to a new `docs/strategy/` subfolder.

| File on Desktop | Size | Date |
|---|---|---|
| `docs/Jamie & Ron_ The Grand Unifying Theory chat.md` | 11.7 KB | Apr 21 |
| `docs/NWAi-Grand-Unifying-Theory-v0.1.md` | 12.2 KB | Apr 21 |
| `docs/NWA-AI-Investment-Intelligence-GUT.html` | 27.0 KB | Apr 21 |
| `docs/NWA-AI-Investment-Intelligence-GUT.pdf` | 92.1 KB | Apr 21 |
| `docs/NWAi-Strategic-Reframe-Reference.md` | 12.2 KB | Apr 20 |
| `docs/NWAi-Huddle-Brief-2026-04-22.md` | 5.0 KB | Apr 21 |
| `docs/Member_Social_Intelligence_Layer_V1_Features.md` | 4.0 KB | Apr 24 |
| `docs/RaiseLink-NWAi-Brief-Comparison-2026-04.md` | 6.8 KB | Apr 17 |
| `docs/NWAi-TechGroup-Managed-Agents-Architecture-v1.0.docx` | 22.3 KB | Apr 16 |
| `docs/cowork-vs-enterprise-platform.md` | 8.5 KB | Apr 9 |

**Target:** `nwa-intelligence/docs/strategy/`

#### 3b. Plugin build-history docs (6 files, ~96 KB)

Session briefs and scoping docs from when the plugin was being built. Useful as build-history reference; doesn't belong next to current strategic docs.

| File on Desktop | Size | Date |
|---|---|---|
| `Claude Code/Desktop-Checkout-Reconciliation-Report.md` | 33.8 KB | Apr 27 |
| `Claude Code/Scoping.md` | 22.2 KB | Apr 24 |
| `Claude Code/Setup.md` | 15.1 KB | Apr 26 |
| `Claude Code/Session-2-Brief.md` | 6.9 KB | Apr 26 |
| `Claude Code/Session-3-Brief.md` | 10.1 KB | Apr 27 |
| `Claude Code/Session-Backlog.md` | 8.5 KB | Apr 27 |

**Target:** `nwa-intelligence/docs/build-history/`

#### 3c. Active deal artifacts unique to Desktop (CRITICAL — easy to miss)

This is the surprise. The Desktop folder has deal work that the canonical folder is **missing**:

**Captain Compliance — entire deal not in canonical**

```
deals/active/Captain Compliance/
  Data Room/
    Pitch Deck Captain Compliance Feb 2026.pdf
    Captain Compliance Live Pitch Transcripts.md
    Captain Compliance Delaum Fields.pdf
    Internal Discussion Transcript_ Captain Compliance Post Live Pitch 4.13.26.md
  Reports/
    Captain Compliance - Triage Report 2026-04-17.docx
    Captain Compliance - Scout Assessment Report 2026-04-17.docx
```

**Synergist Technology — newer artifacts on Desktop**

The `Synergist Technology/` subfolder on Desktop has files canonical doesn't have. Most important:

- `Reports/Synergist-GTM-Diligence-2026-04-14.docx` ← **Apr 14 GTM diligence output, missing from canonical**
- `Reports/Synergist-Diligence-Action-Tracker-2026-04-14.docx` ← **newer than canonical's Mar 31 version**
- `Data Room/Transcript of NWA_Synergist GTM & Sales Strategy Diligence Call 4.14.26.md`
- `Data Room/Synergist Technologies, LLC (69804) White-Label License Agreement CDW OEM Signed.pdf`
- `Data Room/CDW Battlecard - AI Model Managed Services v202603 (1).pdf`
- `Data Room/Synergist Technology LLC - End User License Agreement - Reseller Channel 2026-03-16.pdf`
- `Data Room/Synergist Technology Report Disclaimer and Limitation of Liability.docx`

**⚠️ Important implication:** You have been doing actual deal work in BOTH folders, not just the canonical one. Desktop's `.claude/` runtime doesn't exist, so any slash commands run against Desktop's deal data must have either (a) actually run from canonical and been copied over, or (b) been generated in chat without using the plugin runtime. This is worth confirming so you know which artifacts are pipeline-produced vs hand-generated.

**Target:** Migrate per a chosen folder structure (see Decision 1 below).

#### 3d. Folder-structure difference (organizational)

Desktop and canonical use **different schemes** for organizing deal artifacts:

| Scheme | Where | Example |
|---|---|---|
| **Flat** | Canonical | `deals/active/Synergist Technology - Triage Report 2026-03-16.docx` and `deals/active/Synergist Data Room/...` |
| **Nested per-company** | Desktop | `deals/active/Synergist Technology/Reports/...` and `deals/active/Synergist Technology/Data Room/...` |

Desktop's nested layout is **cleaner** and is the more recent pattern (Captain Compliance Apr 17, Synergist GTM Apr 14). Canonical's flat layout is from the older era and is getting messy.

**Recommendation:** Adopt the **nested per-company structure** going forward. It's easier to scan, easier to move a deal to `deals/archive/` as a single unit, and matches the way Captain Compliance was already organized.

---

## Decisions for Jamie

I've made recommendations but flagging the calls so you can override:

### Decision 1: Deal folder structure going forward — nested or flat?

- **Recommended: nested per-company** (`deals/active/Company Name/Data Room/`, `deals/active/Company Name/Reports/`). Migrating canonical's STL and Synergist artifacts into this structure is part of the plan.
- Alternative: flat (keep canonical's current scheme). I'd advise against — but it's the lower-effort option.

### Decision 2: Captain Compliance triage/scout artifacts — generated where?

Before migrating, want to confirm: were the Captain Compliance Triage and Scout reports generated by `/screen` and `/scout` slash commands in a Cowork session pointed at the canonical folder, then copied to Desktop? Or were they generated some other way? This affects whether they're "official" pipeline outputs or need re-running.

### Decision 3: After migration — delete or archive Desktop?

- **Recommended: archive, don't delete.** Rename to `~/Desktop/_archive_NWAi_Desktop_workspace_2026-04-28/`, zip it, leave it for 30 days. If nothing comes up, then delete.
- Alternative: delete immediately. Cleaner but irreversible.

### Decision 4: Commit strategy

- **Recommended:** Single commit titled `chore: consolidate Desktop workspace into canonical (strategy docs, build-history, Captain Compliance, Synergist updates)`. Big but atomic and explainable in one line.
- Alternative: Multiple commits (strategy / build-history / deals / CLAUDE.md update). More granular history, more steps.

---

## Proposed Target Structure (after migration)

```
nwa-intelligence/
├── .claude/                              ← runtime (unchanged)
├── .git/                                 ← unchanged
├── .mcp.json                             ← unchanged
├── CLAUDE.md                             ← updated (new sections; see below)
├── nwai-techgroup-pipeline-architecture.md
├── pipeline-decisions-log.md
├── push.sh
├── .git-autopush.sh
├── deals/
│   ├── active/
│   │   ├── Captain Compliance/           ← MIGRATED from Desktop
│   │   │   ├── Data Room/
│   │   │   └── Reports/
│   │   ├── Summit Technology Laboratory/ ← REORGANIZED to nested
│   │   │   ├── Data Room/                ← was deals/active/STL Data Room/
│   │   │   └── Reports/                  ← was Summit Technology Laboratory - *.docx + STL-*.docx
│   │   └── Synergist Technology/         ← REORGANIZED + MERGED with Desktop's newer artifacts
│   │       ├── Data Room/
│   │       └── Reports/
│   └── archive/                          ← new empty folder for retired deals
├── demo/                                 ← unchanged
├── docs/
│   ├── NWAi-TechGroup-Pipeline-Reference.{html,pdf}     ← existing
│   ├── NWAi-TechGroup-Platform-Overview.{html,pdf}      ← existing
│   ├── strategy/                         ← NEW — from Desktop docs/
│   │   ├── NWAi-Grand-Unifying-Theory-v0.1.md
│   │   ├── NWA-AI-Investment-Intelligence-GUT.{html,pdf}
│   │   ├── NWAi-Strategic-Reframe-Reference.md
│   │   ├── NWAi-Huddle-Brief-2026-04-22.md
│   │   ├── Member_Social_Intelligence_Layer_V1_Features.md
│   │   ├── RaiseLink-NWAi-Brief-Comparison-2026-04.md
│   │   ├── NWAi-TechGroup-Managed-Agents-Architecture-v1.0.docx
│   │   ├── cowork-vs-enterprise-platform.md
│   │   └── Jamie & Ron_ The Grand Unifying Theory chat.md
│   └── build-history/                    ← NEW — from Desktop Claude Code/
│       ├── Scoping.md
│       ├── Setup.md
│       ├── Session-Backlog.md
│       ├── Session-2-Brief.md
│       ├── Session-3-Brief.md
│       └── Desktop-Checkout-Reconciliation-Report.md
├── legacy/                               ← unchanged
├── notes/                                ← unchanged + this plan
├── plugin/                               ← unchanged (already in sync)
└── scripts/                              ← unchanged
```

---

## Migration Steps (executable order)

Once Jamie approves the decisions above, the work is:

1. **Create new subfolders** in canonical: `docs/strategy/`, `docs/build-history/`, `deals/archive/`.
2. **Copy unique strategic docs** from Desktop `docs/` → canonical `docs/strategy/`.
3. **Copy build-history docs** from Desktop `Claude Code/` → canonical `docs/build-history/`.
4. **Copy Captain Compliance** entire folder from Desktop → canonical `deals/active/Captain Compliance/`.
5. **Reorganize STL** in canonical: create `deals/active/Summit Technology Laboratory/Data Room/` and `Reports/`, move existing STL files into them.
6. **Reorganize + merge Synergist:** create `deals/active/Synergist Technology/Data Room/` and `Reports/`, move canonical's flat-layout Synergist files in, then layer in Desktop's newer files (GTM diligence, updated action tracker, additional contracts, GTM call transcript).
7. **Update `CLAUDE.md`** in canonical:
   - Replace the "Working in Cowork — Which Folder to Select" section to remove the misleading description of Desktop as a "demo planning archive" and instead document the consolidation.
   - Add a "Folder structure" section documenting the nested deal layout and the `docs/strategy/` and `docs/build-history/` directories.
   - Bump version footer (e.g., "v2.12 / architecture v0.17.0" with note "Workspace consolidated April 2026").
8. **Update `nwai-techgroup-pipeline-architecture.md`** — file structure section reflects new layout; bump version.
9. **Commit and push** to GitHub per your normal workflow.
10. **Archive Desktop folder:** rename to `~/Desktop/_archive_NWAi_Desktop_workspace_2026-04-28/`, optionally zip.
11. **Update Cowork project-folder selection** so Cowork only sees the canonical folder (drop the Desktop folder from the connected list).

Estimated time once approved: ~15-20 minutes of file ops + ~10 minutes for the CLAUDE.md / architecture-doc rewrites + commit.

---

## Proposed CLAUDE.md Edits (preview)

Two existing sections to revise:

### Replace this block (current CLAUDE.md, "Working in Cowork — Which Folder to Select"):

> **For all deal work, select `/Users/jamie/ClaudeCodeProjects/nwa-intelligence/` as the project folder in Cowork.** [...] **Do not select the Desktop folder `/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence/` for deal work.** Despite its name, that folder is a planning archive from the demo / plugin build phase. [...]

### With this block:

> **One folder, one source of truth.** All NWAi Investment Intelligence work — running deals through the pipeline AND evolving the framework, strategic positioning, and platform vision — happens in `/Users/jamie/ClaudeCodeProjects/nwa-intelligence/`. This is the canonical and only project folder for Cowork. As of April 2026 the prior Desktop workspace `~/Desktop/Claude CoWork NWAi Investment Intelligence/` has been consolidated into this folder and archived; do not work in it.
>
> Within this folder: operational deal work lives in `deals/`, the executable runtime in `.claude/`, current strategic and platform-vision docs in `docs/strategy/`, plugin build-history in `docs/build-history/`, and reference architecture/format docs in `docs/`.

### Replace the related "Workspace Files" section with:

> **Key workspace files and folders:**
> - `CLAUDE.md` — this file (persistent context)
> - `nwai-techgroup-pipeline-architecture.md` — living architecture reference
> - `pipeline-decisions-log.md` — running decision log
> - `.claude/` — pipeline runtime (agents, commands, skills, servers)
> - `plugin/current/nwai-tech-pipeline.plugin` — installable plugin
> - `plugin/archive/` — versioned plugin history
> - `deals/active/<Company Name>/Data Room/` and `/Reports/` — current deals (nested per-company)
> - `deals/archive/` — closed deals
> - `docs/` — reference architecture and pipeline docs (Pipeline Reference, Platform Overview)
> - `docs/strategy/` — platform vision and strategic positioning material (GUT, Strategic Reframe, Member Intelligence, etc.)
> - `docs/build-history/` — plugin build session briefs and scoping (reference only)
> - `notes/` — process notes and design memos
> - `scripts/dd-report-generator.js` — canonical DD Report generator
>
> **Related workspace (separate):** Partnership and legal documents for scaling the Investment Intelligence Platform live in the `Claude CoWork NWAixCoditect Partnership` folder on Jamie's desktop. That workspace covers the NWA × AZ1/Coditect co-development alliance — scoping briefs, SOWs, IP agreements, and build phase tracking. Do not look for or expect those files here.

---

## What I am NOT proposing

- Touching the separate **NWAixCoditect Partnership** Desktop folder. That's a different workspace per current `CLAUDE.md` and stays as-is.
- Changing the plugin source, the `.claude/` runtime, or any framework files. This is purely workspace consolidation, not framework work.
- Pulling in the older Desktop `CLAUDE.md` content. It's stale.
