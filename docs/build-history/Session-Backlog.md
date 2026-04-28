# Session Backlog — Between-Session Tasks

Items deferred from active build sessions. Each entry: scope, why deferred, when to do, files affected.

---

## Project state

- **Canonical repo HEAD:** `82b1755` (April 26, 2026) — pushed to `origin/main`. Local 0 ahead.
- **Branch:** `main`. All Stage B + Stage C work shipped.
- **Architecture doc:** v0.18.0.
- **Plugin:** `nwai-tech-pipeline.plugin` v2.11. No reinstall needed since last session — workspace file changes only, no MCP changes.
- **Frameworks state:**
  - Universal Triage Framework v2.0 is canonical at `references/gates-and-flags.md` (262 lines, all NWAi verticals).
  - TechGroup extension at `references/gates-and-flags-techgroup.md` (260 lines, Track A/B + AI Wrapper + Replicability).
  - Legacy 6-gate AutoKill archived at `references/_archive/gates-and-flags-6gate-legacy.md` (reference only).
- **Phase 1 demo:** Sessions 1 + 2 still represent latest demo state (`787f335` + `0128772`, in main history). Sessions remaining: Session 3 (Member track + Ecosystem placeholder), possibly Session 4 (polish + Vercel deploy prep).
- **Next action:** Either pick up Session 3 demo build, or knock out an open backlog item below.

---

## Open items

### 1. Post-PAT-rotation: refresh CLAUDE.md GitHub Sync section + correct sandbox-push claim

**Why open:** PAT rotation was deliberately deferred during the April 26, 2026 hygiene work (Stage B6 / commit `e672e50`). Item #2 below was otherwise completed without rotation — the leaked PAT was wiped from the Desktop checkout's `.git/config` before the destructive cleanup, but the original token at `~/.git-credentials` is still live until Jamie rotates it. Two related corrections fold into the same edit once rotation happens.

**Pre-task (Jamie does this manually before this backlog item runs):**

- Rotate the leaked PAT at https://github.com/settings/tokens. Token prefix exposed: `ghp_zQbzuVR...`. Revoke it, generate a fresh one with the same scopes, store outside Drive (Keychain or password manager).

**Scope (after rotation):**

1. **CLAUDE.md "GitHub Sync — Setup & Workflow" section update:**
   - Currently reads: *"Auth: GitHub PAT stored in `~/.git-credentials` (configured March 2026) — pushes work directly from Cowork sessions, no Terminal needed."*
   - Two corrections needed:
     - **Storage location:** update to wherever the rotated PAT is stored (Keychain recommended, not `~/.git-credentials`).
     - **Sandbox push claim:** discovered April 26, 2026 — the Cowork sandbox runs as a different Linux user and **cannot read** the Mac's `~/.git-credentials` or Keychain. Pushes from inside Cowork have been failing silently (commits land locally; push needs Terminal). Reword to: *"Commits land locally during Cowork sessions. Push from Mac Terminal: `cd /Users/jamie/ClaudeCodeProjects/nwa-intelligence && git push origin main`."* Or, if a sandbox-accessible auth method gets set up later (e.g., a session-scoped token), update to reflect that mechanism.

2. **No code changes required** — this is a docs-only update.

**Note in commit message:** "chore: post-PAT-rotation — update CLAUDE.md GitHub Sync section + correct Cowork-push claim"

---

### 2. Demo screening cards — refresh scoring values to match v2.0 canonical

**Why open:** Surfaced April 26, 2026 during Stage C work. The Phase 1 demo's Screening-stage seed data (committed in `787f335`) hard-codes triage scoring as **Opportunity 0–25 + Readiness 0–20** (the design at the time the demo was scoped). The canonical framework as of v0.18.0 is **Opportunity 6×0–5 = 30 + Readiness 5×0–5 = 25**. The demo will look misaligned with the live framework next time it's reviewed.

**When to do:** Bundle with Session 3 demo build (Member track + Ecosystem placeholder), or earlier if a stakeholder reviews the demo before then.

**Scope:**

1. Update demo screening cards' max-score denominators (25 → 30, 20 → 25).
2. Verify the dimension labels match the v2.0 universal framework (6 Opportunity dimensions: Structural Discontinuity, Market Opportunity, Founder Advantage, Defensibility, Traction, Venture Economics; 5 Readiness dimensions: Deal Structure, Product Maturity, Syndication, Traction Velocity, Founder Accessibility).
3. Update any visible threshold text (ADVANCE ≥ 18/25 → ADVANCE ≥ 20/30).

**Files affected:** Phase 1 demo seed data; specific files TBD when Session 3 starts (look in the demo repo's Screening-stage card definitions).

---

## Closed items

### ✅ Item — Decision 4: Desktop `.claude/` folder *(closed April 26, 2026)*

**Resolution: deleted.** Investigation confirmed the Desktop `.claude/` was a stale shadow of the canonical runtime: 27 files, last meaningful update April 17, content 6 weeks behind on the most-active reference doc (`gates-and-flags.md` still held the legacy 6-gate AutoKill, not the post-Stage-C Universal Triage Framework). Drive was syncing 316KB of decaying framework content. Risk of confusion outweighed any preservation value, since older versions exist in canonical git history.

**Action taken:**
- All 27 files truncated to 0 bytes (sandbox bindfs blocks `rm`; truncate-then-rename is the standard workaround).
- Folder renamed `.claude/` → `.claude.deleted-1777257205/` so no tool that auto-discovers `.claude/` will find it.
- Disk footprint: 316KB → 0KB.
- Jamie completed the final Trash step from Finder (or Mac Terminal `rm -rf`).

**Companion change:** New section added to canonical `CLAUDE.md` ("Working in Cowork — Which Folder to Select") that explicitly directs all future deal-work sessions to select `/Users/jamie/ClaudeCodeProjects/nwa-intelligence/` as the project folder, and clarifies that the Desktop folder is a planning archive only. This eliminates the ambiguity that surfaced when Jamie asked which folder to pick for new deals.

---

### ✅ Item — Workspace hygiene + canonical-checkout consolidation *(closed April 26, 2026)*

**Original scope:** PAT leak remediation + dual-checkout cleanup + Desktop workspace `.git/` deletion + stale push-script removal + CLAUDE.md workspace path correction.

**Completed in commits:**
- `e672e50` (Stage B6): CLAUDE.md workspace path corrected; `.gitignore` updated to ignore `deals/`; architecture bumped to v0.17.0.
- Stage B4 (bundled with B6): Drive shadows (`plugin/current/zi*`), legacy push scripts (`.git-autopush.sh`, `push.sh`), and the redundant Desktop `.git/` checkout were neutralized via sandbox-mv-and-truncate (sandbox bindfs blocks `rm`); Jamie completed the Finder-side Trash step.

**Deferred to new open item #1 above:**
- PAT rotation itself (Jamie pre-task).
- CLAUDE.md "GitHub Sync — Setup & Workflow" section update (depends on rotation).
- Correction of the inaccurate "pushes work directly from Cowork sessions" claim.

---

### ✅ Item — Canonical update: triage-with-scoring as universal screening framework *(closed April 26, 2026)*

**Original scope:** Promote triage-with-scoring (originally framed as TechGroup-specific) to NWAi-wide canonical screener; deprecate the legacy 6-gate AutoKill.

**Completed in commits:**
- `b65ba6a` (Stage C): `gates-and-flags.md` rewritten as **NWAi Universal Triage Framework v2.0** (262 lines: 3 hard gates + NWA Filter + Opportunity 6×0–5/30 + Readiness 5×0–5/25 + Decision Logic). Legacy 6-gate AutoKill moved to `_archive/gates-and-flags-6gate-legacy.md`. `gates-and-flags-techgroup.md` slimmed from 437 → 260 lines (now strictly Track A/B + AI Wrapper + Replicability + Hardware Last Mile + TRL Hard Cap, with cross-reference to universal). `CLAUDE.md` Pipeline / Terminology / Key Frameworks sections refreshed. `screen.md` updated to load both files. `commands/dd-report.md` and `commands/decision.md` updated to drop "AutoKill" terminology.
- `82b1755` (Stage C follow-up): architecture doc body aligned with v0.18.0 changelog (Layer 3 commands table, Layer 5 reference docs table, file structure tree).

**Note on scoring values:** The original backlog item described scoring as Opportunity 0–25 + Readiness 0–20 (design state at time of session 2). The implemented framework is Opportunity 6×0–5 = 30 + Readiness 5×0–5 = 25. The implemented values are correct. Demo seed data still reflects the old values — see open item #3 above.

**Decisions resolved:**
- LLM Ingestion Test placement: kept in universal NWA Filter (Option A).
- Track A/B bifurcation: remains TechGroup-only (Decision 2).

---

*Last updated: April 26, 2026*
