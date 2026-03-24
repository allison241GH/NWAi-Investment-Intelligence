# Diligence Layer 2 — Design Note
*Drafted: March 2026 | Source: Ron Tarro / Jamie framework review session 2026-03-22*
*Status: Approved in concept — NOT YET IMPLEMENTED in plugin*

---

## The Problem We're Solving

The current `/diligence` command produces a DD Kickoff Package built around the **17-folder checklist** (Layer 1). That checklist is a data completeness tool — it tells the team *what to gather*, organized by document type. It is not an analytical framework.

The consequence: DD Report scores have no clear analytical anchor. A team can complete all 17 folders and still not have a structured argument for why the investment thesis is confirmed or killed.

**Ron's framing (transcript ~01:10–01:14):** "The folders tell you what to collect. They don't tell you what to conclude." The analytical work — where the thesis is actually tested — needs its own scaffold.

---

## The Two-Layer Architecture

### Layer 1 — Data Completeness (exists today, keep as-is)
The 17-folder checklist. Unchanged. Its job is: *did we collect everything we need?*

- Organized by document/data type (financials, legal, product, team, etc.)
- Output: folder status table with gate-critical flags and key questions per folder
- Lives in Part C of the current DD Kickoff Package
- **Not the basis for scoring** — just confirms the evidence is in hand

### Layer 2 — Hypothesis Confirmation (does not exist yet)
A structured task plan organized by **validation domain**, not folder number. Its job is: *given our Scout thesis, what do we need to confirm or kill — and what's our conclusion?*

- Organized by Ron's validation groups (see below)
- Each group opens with a hypothesis statement drawn from the Scout thesis
- Team works through 3–5 confirmation questions per group
- Conclusions from Layer 2 groups are what DD Report section scores anchor to

---

## Ron's Validation Groups (the Layer 2 organizing framework)

These are the domain clusters Ron uses to structure diligence analysis. Exact names TBD — confirm with Ron before implementation:

| Group | What It Tests |
|-------|--------------|
| Market Validation | Is the discontinuity real? Is the TAM credible? Is timing right? |
| Technical Validation | Does the tech work at scale? Is the moat defensible? TRL sufficient? |
| Team Validation | Product team fit + Market team fit. Can they execute this specific thesis? |
| Commercial Validation | Real revenue / paying customers / go-to-market traction |
| Competitive Validation | Adjacent displacement risk. Hyperscaler threat. Direct comp moat gap. |
| Financial Validation | Unit economics. Path to 10x. Cap table / structure clean? |

*Note: These map naturally to the DD Report's 11 scored sections — the Layer 2 design should make that mapping explicit.*

---

## What the `/diligence` Command Change Would Look Like

**Current output (Layer 1 only):**
- Part A: Deal summary + Scout thesis carry-forward
- Part B: Scoring inputs (Moat + Risk rubrics)
- Part C: 17-folder checklist with gate-critical flags
- Part D: Nice-to-have questions
- Part E: Kill conditions table

**Proposed output (Layer 1 + Layer 2):**
- Part A: Deal summary + Scout thesis carry-forward *(unchanged)*
- Part B: **Layer 2 — Hypothesis Confirmation Plan** *(new)*
  - One section per validation group
  - Opens with: *Hypothesis: [what the Scout thesis says about this domain]*
  - Contains: 3–5 specific confirmation questions for the diligence team
  - Closes with: *Conclusion field* (blank — filled in after diligence work)
- Part C: **Layer 1 — 17-Folder Data Checklist** *(unchanged, renamed for clarity)*
- Part D: Scoring inputs *(unchanged)*
- Part E: Kill conditions *(unchanged)*

---

## How Layer 2 Connects to the DD Report

When the diligence team fills in the Layer 2 conclusion fields and the deal lead runs `/dd-report`:

- Each DD Report section should reference the relevant Layer 2 validation group conclusion
- Scores anchor to "what did we conclude from the hypothesis test" not "how many folders did we complete"
- This closes the current gap where folder completeness ≠ analytical confidence

---

## Implementation Notes for Next Session

1. **Confirm Ron's validation group names** before hardcoding them into the framework files
2. **Files to modify** (all inside the plugin):
   - `commands/diligence.md` — restructure output to add Layer 2 as Part B; renumber existing parts
   - `references/dd-checklist.md` — add Layer 2 section with validation group templates
   - `references/diligence-scoring-rubrics.md` — add note mapping each rubric to its Layer 2 validation group
3. **Do not change** the 17-folder checklist structure or folder numbering — Layer 1 is working
4. **Scout carry-forward is the input** — Layer 2 hypotheses should be drafted from the Scout Conviction Score dimensions, not invented fresh
5. **Version bump:** This will be plugin v2.8, architecture v0.12.0

---

## Open Questions Before Implementation

- What are Ron's exact names for his validation groups?
- Should the Layer 2 conclusion fields be filled in by the deal lead, or should a follow-up command (e.g., `/diligence-update`) accept new information and regenerate?
- Does the DD Report format need a corresponding change to show Layer 2 group conclusions explicitly, or is the anchor implicit?

---

*Source conversation: session 10f28e8f (2026-03-23) — Ron/Jamie framework review Q3 discussion*
*Implement via: tell Claude "implement the Diligence Layer 2 restructure, see notes/diligence-layer2-design.md"*
