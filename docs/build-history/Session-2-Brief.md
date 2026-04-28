# Session 2 Brief — Design Pass + Populated Pipeline

**Author:** Jamie + Claude (Cowork)
**Created:** April 26, 2026
**Status:** Ready to execute

---

## Goal

Transform the session 1 spine into a board-ready demo. Apply visual polish, navigation continuity, and populate all 7 pipeline stages with realistic deal cards.

## Status entering session 2

- Session 1 commit `0128772` is the baseline. 27 files under `demo/`. Tailwind v4 locked in.
- Spine works: `/pipeline` and `/deals/[id]` render correctly with seed data for 3 deals (Veridian, Aperion, Hearthen).
- Console clean, build clean, types clean.

---

## Five deliverables, in priority order

### 1. Stage color palette

Apply a 7-stage color system across the whole app for instant visual recognition.

**Palette (Tailwind v4 tokens, mid-shade hues):**

| Stage | Token | Why |
|---|---|---|
| Inbox | `slate-400` | Neutral, incoming, not yet processed |
| Screening | `amber-500` | Triage / caution |
| Scout | `sky-500` | Exploration |
| Diligence | `indigo-500` | Depth |
| DD Report | `violet-500` | Synthesis |
| Decision | `emerald-500` | Resolution |
| Memo | `stone-700` | Archival, final |

**Where applied:**
- Pipeline column header bars (a full-width thin colored band at the top of each column)
- Stage badges on every deal card (background + contrast-appropriate text)
- Sticky nav stage pills (see #2)

**Constraints:**
- No kindergarten-bright primaries. Muted, professional saturation.
- Text-on-background contrast must remain readable at small badge sizes.
- Honor light/dark theme — colors should hold up in both.

### 2. Sticky 7-stage nav bar

Build a header component that lives on every page.

**Behavior:**
- 7 stage pills, each labeled with stage name + count of deals in that stage
- Each pill colored per the palette (#1)
- Click any pill → routes to `/pipeline` (filtered or scrolled to that column — designer's call)
- The current stage (when on Deal Detail) is highlighted with stronger fill / outline
- On `/pipeline`, no single pill is highlighted (all-stages view)

**Visual:**
- Fixed/sticky at top of page, below any browser chrome
- Subtle bottom border separating nav from content
- Honors light/dark theme

**Navigation:**
- Replaces the back-arrow-only navigation on Deal Detail
- Back arrow can stay as a redundant control, or be removed — designer's call

### 3. Pipeline column layout rule

Make the 7-column kanban actually display all 7 columns at typical board-demo widths.

**Rule:**
- Fixed card widths in the 240–260px range
- 7 columns with reasonable gutters fit at 1440px viewport width
- Above 1440px → centered max-width container; columns don't stretch
- Below 1440px → horizontal scroll (acceptable fallback)

**Rationale:** the parallelism of all 7 columns visible at once IS the visual story of the pipeline. Compressing, wrapping, or hiding columns breaks the kanban metaphor.

### 4. Summary block on Deal Detail

Add a bordered, titled card at the top of the Deal Detail left panel.

**Content:**
- Title: "Summary"
- One-line description
- Founder name(s)
- Location
- Raise (round + amount)

**Position:** above the existing Scout Assessment block on the left panel. Bordered, rounded corners consistent with other cards. Same visual weight as the Scout/DD blocks below it.

### 5. Seed data expansion — 8 new deal cards

Populate the empty pipeline stages with realistic-but-fictional deals.

**Distribution:**

| Stage | New cards | Total after |
|---|---|---|
| Inbox | 4 | 4 |
| Screening | 1 | 2 (Aperion + 1) |
| Scout | 1 | 1 |
| Diligence | 0 | 1 (Veridian) |
| DD Report | 0 | 1 (Hearthen) |
| Decision | 1 | 1 |
| Memo | 1 | 1 |
| **Total deals** | **8 new** | **11 total** |

**Per card minimum data:**
- Real-sounding company name (no "Company X" / "Foo Inc.")
- Plausible sector + NWAi group assignment (Tech, Medical, Space, Consumer, Industrial, Fintech)
- Ask amount + round
- One-line tagline / description
- Founder name(s)
- Location (US only per NWAi criteria)
- Recent activity stub (stage-appropriate)
- Member engagement counters (matched / outreach-sent / responded / pool size — appropriate for stage)

**Stage-appropriate content depth:**

| Stage | Scout block | DD block | Synthesis | Notes |
|---|---|---|---|---|
| Inbox | Empty | Empty | Empty | Empty-state copy on Deal Detail |
| Screening | Empty | Empty | Empty | Empty-state copy on Deal Detail |
| Scout | Populated | Empty | Empty | Real Scout content |
| Decision | Populated | Populated | Populated | Plus a verdict (Invest / Pass / Watch) |
| Memo | Populated | Populated | Populated | Plus a memo date and memo summary |

**Content tone:** matches the existing 3 deals (Veridian, Aperion, Hearthen). Believable founders, clear theses, plausible US-based markets. Mix sectors across NWAi groups so the demo tells the multi-group scaling story.

---

## Out of scope for session 2

- Do **not** build any additional screens (Member Directory, Member Profile, Matching Rationale, Portfolio, Ecosystem, Orchestrator) — those are session 3+
- Do **not** modify the existing 3 deals' content — only add new cards
- Do **not** change TypeScript types or data shapes
- Do **not** introduce new dependencies without flagging first
- Do **not** push to origin

---

## Verification gates

After implementation, run a smoke test confirming:

1. TypeScript compiles clean (`tsc --noEmit` exit 0)
2. Production build succeeds for all pages
3. Dev server starts without error
4. All 11 deal cards render on `/pipeline` (3 existing + 8 new)
5. Each pipeline column displays its assigned color (#1)
6. Sticky nav bar appears on `/pipeline` and all `/deals/[id]` pages
7. Sticky nav pills route correctly to `/pipeline`
8. 7 columns visible at 1440px viewport width without horizontal scroll
9. Summary block appears on each Deal Detail page (all 11)
10. Empty-state copy renders gracefully for Inbox/Screening cards
11. Console clean on all pages (no red errors)

Then pause and let me eyeball before committing.

---

## Commit message

```
demo: phase 1 session 2 — design pass + populated pipeline
```

**Do NOT push to origin.**

---

## Open design questions to surface before code

Before writing code, Claude Code should confirm or adjust:

1. **Sequencing of the 5 deliverables.** Color palette should land first (other items reference it). Sticky nav can come second. Layout rule, Summary block, and seed data are independent and can land in any order. Surface any sequencing changes before starting.
2. **Sticky nav pill click behavior.** Filter to that stage on `/pipeline`, or scroll to that column? Pick one.
3. **Back arrow on Deal Detail.** Keep alongside sticky nav, or remove? Pick one.
4. **Light/dark theme.** Stage palette designed primarily for light theme. Confirm the dark-theme variants will be tested before commit.

---

*Last updated: April 26, 2026*
