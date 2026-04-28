# Session 3 Brief — Member Track + Ecosystem Placeholder + Orchestrator

**Author:** Jamie + Claude (Cowork)
**Created:** April 26, 2026
**Status:** Ready to execute

---

## Goal

Extend the populated Phase 1 demo from a 2-screen Track 1 spine (Pipeline Dashboard + Deal Detail) into the full board narrative — adding the Track 2 Member Intelligence screens, the Track 3 Ecosystem placeholder, and the Orchestrator admin overlay. By end of session the board can click through all three tracks and the multi-group scaling story is visible.

## Status entering session 3

- Session 2 commit `787f335` is the baseline. Pipeline populated with 11 deal cards across all 7 stages. Sticky 7-stage nav, stage color palette, 240–260px column rule, Summary block on Deal Detail all in place. Tailwind v4 locked in. Console / build / types clean.
- Repo root: `/Users/jamie/ClaudeCodeProjects/nwa-intelligence/`
- Demo subfolder: `nwa-intelligence/demo/` (Next.js 14 / Tailwind v4 / shadcn/ui / JSON seed data, no backend)
- Canonical framework reference (for the screening-card refresh in deliverable #6): `nwa-intelligence/.claude/skills/nwai-investment-framework/references/gates-and-flags.md` — NWAi Universal Triage Framework v2.0 (3 hard gates + NWA Filter + Opportunity 6×0–5/30 + Readiness 5×0–5/25).

---

## Six deliverables, in priority order

### 1. Member Directory (Track 2)

A faceted-search directory of fictional NWA members. The "members are the moat" screen.

**Behavior:**
- Route: `/members`
- Card grid or dense list (designer's call) — 20–30 fictional members
- Filters: expertise (multi-select), sector (multi-select), geography (US regions), check size range, past investments count
- Search box: free-text against name, expertise blurb, and prior employers
- Each row: photo placeholder, name, headline expertise tag(s), sector(s), location, check-size band, count of past investments, count of NWA deals matched/contributed-to
- Click row → routes to `/members/[id]` (deliverable #2)

**Constraints:**
- Honors stage color palette and sticky nav from session 2
- Watermark *"Demo data — not real members"* visible

### 2. Member Profile (Track 2)

Single-member detail page.

**Behavior:**
- Route: `/members/[id]`
- Sections: header (photo, name, location, current role), Expertise tags, Prior Employers, Past Investments (5–10 with company name + role + outcome stub), Portfolio Companies (NWA-portfolio overlay — deliverable #4), Deals Matched to Them (3–5 deal-card-style entries linking back to `/deals/[id]`), Recent Contributions (1–3 short paragraphs styled as "what they said in DD on [Company]")
- Right rail: at-a-glance stats — sectors of interest, stage preference, check-size range, response-rate stub

**Constraints:**
- 4–5 of the 20–30 members should map credibly to the existing 11 demo deals (so that the Matching Rationale screen has real edges)

### 3. Matching Rationale (Track 2)

The "demystify the AI" screen. Pick one deal in Diligence stage, show ranked member matches with explicit reasoning per match.

**Behavior:**
- Route: `/deals/[id]/matching` (or surfaced as a tab on Deal Detail — designer's call)
- Pick the existing Veridian deal (or one of session 2's Diligence-stage deals) as the seed
- Top of page: deal context strip (Summary card from Deal Detail)
- Ranked list: 5–8 member matches, descending by match score
- Per match: member chip (photo + name → links to Member Profile) + match score (0–100) + 3–5 bullet "Why" signals tied to specific expertise tags or past investments + 2–3 suggested DD questions tied to specific 17-folder DD sections
- Score breakdown: small bar/segmented visualization per match showing weight contributions (sector fit, technical depth, prior-investment overlap, etc.)

**Rationale:** this is the screen that proves Track 2 is more than vibes. Lean into legibility.

### 4. Portfolio View (Track 2)

Unified view of NWA portfolio companies across member investments.

**Behavior:**
- Route: `/portfolio`
- Card grid: 8–12 fictional portfolio companies (mix of stages, mix of NWAi groups)
- Per card: company name, sector, NWAi group tag, round + amount, lead member(s), member count invested, board members, primary contact
- Click card → drill-in pane (modal or `/portfolio/[id]`): lists all NWA members invested with check-size, board roles, who-knows-whom-at-the-company contacts
- Filters: NWAi group, sector, stage, member-investor count

**Constraints:**
- Companies here are distinct from the 11 pipeline deals (portfolio = closed/invested; pipeline = active deals)
- Shares the visual vocabulary of pipeline deal cards (consistent design system)

### 5. Ecosystem Intelligence placeholder (Track 3)

The "future state" screen. Visible but explicitly marked as not-yet-built so the board sees the full three-track story without overpromise.

**Behavior:**
- Route: `/ecosystem`
- Single page, four section blocks: Incubator Feeds, University Research Scans, Operator Network Signals, Thematic Reports
- Per block: short description (2–3 sentences) + 2–4 placeholder cards with "Coming soon" badges + a representative-but-fake item title (e.g., "Y Combinator W26 batch — 14 AI infra companies", "MIT CSAIL — 3 emerging teams in physical AI")
- Top banner: *"Phase 4 — Ecosystem Intelligence. Coming after Member Intelligence MVP ships."*

**Constraints:**
- Intentionally lower visual density than the live screens — board should read this as "not built yet, here's the vision"

### 6. Orchestrator View (Admin overlay)

How Jamie operates the system. Surfaces what would otherwise be invisible plumbing.

**Behavior:**
- Route: `/orchestrator`
- Three panels:
  - **Active matching jobs** — list of deals currently being matched with member counts and run status (queued / running / complete)
  - **Outreach queue** — pending member outreach emails per deal, with status (draft / sent / responded / no-response) and quick-action buttons (Send / Edit / Skip — non-functional in demo)
  - **Synthesis review** — list of deals with member input collected, awaiting synthesis approval, with a sample synthesis preview
- Header strip: small KPI counters — active deals, members engaged this week, response rate, average time-to-synthesis

**Constraints:**
- Pure read-only demo — buttons render but don't trigger anything
- Distinct visual treatment (slightly more dense / utilitarian) so it reads as admin, not founder-facing

### 7. Bundled fix — refresh Screening-stage demo cards to match Universal Triage Framework v2.0

(Deferred from Session-Backlog.md open item #2.)

**Why:** The Screening cards committed in `787f335` hard-code Opportunity 0–25 + Readiness 0–20. The canonical framework as of v0.18.0 is Opportunity 6×0–5 = 30 + Readiness 5×0–5 = 25.

**Scope:**
- Update Screening-stage card max-score denominators: 25 → 30 (Opportunity), 20 → 25 (Readiness)
- Verify dimension labels match v2.0:
  - Opportunity (6): Structural Discontinuity, Market Opportunity, Founder Advantage, Defensibility, Traction, Venture Economics
  - Readiness (5): Deal Structure, Product Maturity, Syndication, Traction Velocity, Founder Accessibility
- Update visible threshold text: ADVANCE ≥ 18/25 → ADVANCE ≥ 20/30
- Source of truth: `.claude/skills/nwai-investment-framework/references/gates-and-flags.md`

---

## Out of scope for session 3

- Do **not** modify the 7-stage Pipeline Dashboard or Deal Detail screen content beyond the screening-card refresh in #7
- Do **not** wire up real auth, real backend, or runtime LLM calls
- Do **not** add mobile-optimized layouts
- Do **not** introduce new dependencies without flagging first
- Do **not** push to origin
- Do **not** start Vercel deployment (that's Session 4)

---

## Verification gates

After implementation, run a smoke test confirming:

1. TypeScript compiles clean (`tsc --noEmit` exit 0)
2. Production build succeeds for all pages
3. Dev server starts without error
4. `/members` renders 20–30 members; filters and search work
5. `/members/[id]` renders for every member; cross-links to deals work
6. `/deals/[id]/matching` (or the matching tab) renders ranked matches with reasoning, score breakdown, and DD-folder-tagged questions
7. `/portfolio` renders 8–12 portfolio companies; drill-in shows member investors + contacts
8. `/ecosystem` renders the 4 section blocks with "Coming soon" treatment and the banner
9. `/orchestrator` renders all 3 panels and the KPI strip
10. Sticky 7-stage nav still appears and works on every existing page (no regression)
11. Existing 11 deal cards still render correctly on `/pipeline` (no regression)
12. Screening-stage cards display Opportunity /30, Readiness /25, threshold ≥ 20/30
13. Watermark *"Demo data — not real deals or members"* visible on all new screens
14. Console clean on all pages (no red errors)

Then pause and let me eyeball before committing.

---

## Commit message

```
demo: phase 1 session 3 — member track + ecosystem placeholder + orchestrator
```

**Do NOT push to origin.**

---

## Open design questions to surface before code

Before writing code, Claude Code should confirm or adjust:

1. **Sequencing.** Member Directory → Member Profile → Matching Rationale is a natural chain (each builds on the last). Portfolio, Ecosystem, Orchestrator can land in any order after. Screening-card refresh (#7) is independent and can be batched first or last. Surface any sequencing changes before starting.
2. **Matching Rationale placement.** Stand-alone route `/deals/[id]/matching`, or a tab on Deal Detail? Pick one.
3. **Portfolio drill-in.** Modal or route `/portfolio/[id]`? Pick one.
4. **Member ↔ Deal mapping.** Confirm the 4–5 members who map to existing pipeline deals before generating seed data, so Matching Rationale has internally consistent edges.
5. **Sticky nav extension.** Should the nav add Member / Portfolio / Ecosystem / Orchestrator pills, or keep the 7-stage pipeline nav and put a separate top-level navigation above it? Pick one.

---

*Last updated: April 26, 2026*
