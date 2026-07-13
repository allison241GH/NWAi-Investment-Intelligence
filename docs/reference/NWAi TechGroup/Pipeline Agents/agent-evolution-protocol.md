# Agent Evolution Protocol

**Purpose:** Reference for how to evolve the plugin agents that power `/scout` and `/diligence` over time. Defines the discipline that keeps the 8-agent fleet coherent and trustworthy as NWA's framework refines deal by deal.

**Audience:** Jamie, TechGroup Co-Chair, plus anyone maintaining the plugin agents.

**Version:** 1.0 — May 8, 2026

**Companion docs:**
- [`agent-team-reference.md`](agent-team-reference.md) — the 8 active plugin agents
- [`plugin-vs-managed-vs-fs-agents.md`](plugin-vs-managed-vs-fs-agents.md) — why plugin agents are the right runtime for diligence

---

## The Underlying Principle

**Observe continuously. Edit deliberately.**

Output feedback is a signal source for prompt evolution. It is *not* a direct edit channel. The discipline that separates a coherent agent fleet from an accreted one is putting time and structured thought between observation and edit.

The agent prompts are engineered, not tuned. They should be treated like API contracts, not knobs.

---

## Why Pure Output-Driven Evolution Eventually Breaks

Output-driven evolution — running an agent, reading the output, immediately editing the agent based on what looked wrong — has real strengths. It's empirically grounded, fast, and doesn't require prompt-engineering expertise. It catches subtle issues that would never appear in a cold read of the prompt.

But left unchecked, it has four compounding failure modes:

1. **Whack-a-mole.** A fix on Deal A causes regression on Deal B. The patch addresses the symptom and silently breaks something else.
2. **Specificity creep.** A one-deal surprise becomes a hard-coded rule for all future deals, even when the rule was situational.
3. **Hidden contradictions.** A new rule contradicts an old rule and neither gets removed. Agent behavior becomes harder to predict.
4. **Blindness to absence.** Output-driven feedback can only fix what shows up in transcripts. It cannot reveal what the agent should be doing but isn't.

The root issue: a single deal is a sample of one. Treated as an immediate prompt edit, it overfits.

## Why Pure Source-Driven Evolution Also Fails

Source-driven evolution — opening the agent's `.md` file, reading the prompt, editing it deliberately — has its own pathologies:

1. **Theory drift.** "Improvements" to text that read better on the page can degrade behavior. Optimizing prose is not optimizing behavior.
2. **Over-engineering.** Without empirical grounding, every read raises new edge cases. The prompt grows unboundedly.
3. **Loss of empirical anchor.** Edits drift toward what *should* work in theory rather than what real deals revealed.

Pure source review without recent deal output to ground it produces prompts that are theoretically elegant and operationally worse.

---

## The Hybrid Workflow — Best Practice

Borrowed from how mature engineering teams treat code: **continuous observation, periodic deliberate change.**

### Daily / Per-Deal — Output-Driven, Continuous

When a diligence run surfaces a real prompt issue, do **not** immediately edit the agent.

Instead, capture the observation in a lightweight log: `notes/agent-evolution-log.md`. One line per item, tagged by agent and deal.

**Examples of well-formed observations:**
- "forecasting-analyst — anchored on founder revenue claim despite McMurry mandate. Acme 2026-05-08."
- "team-analyst — missed verifying CTO's prior exit claim. Synergist 2026-04-22."
- "venture-analyst — gave a valuation range without picking a defended number. Captain 2026-05-04."
- "market-analyst — applied 18-month freshness rule to TAM but blended in a 2022 analyst report. Northstar 2026-05-01."

Each observation costs ~30 seconds and carries zero immediate regression risk.

### Periodic — Source-Driven, Deliberate

**Trigger criteria** (whichever comes first):
- 3–5 accumulated observations on a single agent
- Before any plugin version bump
- Quarterly across the fleet

**Source-review procedure:**

1. Open the agent's `.md` file in `.claude/agents/<name>.md`
2. Read it cold, end to end, before looking at observations
3. Pull up the accumulated observations next to the prompt
4. For each observation, decide which category it falls into:
   - **Prompt gap** — the prompt didn't cover the situation. Add it.
   - **Prompt failure** — the prompt covered it but didn't take. Strengthen the language, move it earlier in the prompt, or make it more concrete.
   - **Not a prompt issue** — situational one-off, framework error, or model capability limit. Discard with a note explaining why.
5. Make the edit deliberately
6. Bump the plugin version per `nwai-techgroup-pipeline-architecture.md`
7. Mark the addressed observations as resolved in the log (don't delete them — they're the audit trail)

### Always — Regression Discipline

Before locking in any change:

- Mentally replay it against 2–3 prior diligence runs you remember well
- If the new rule would have made a previous *good* output worse, you've found a contradiction. Resolve it before shipping.

The goal is to add capability without subtracting capability that was already working.

### Periodic — Fleet-Level Architectural Review

Once a quarter, or after any major framework decision (such as the v2.13.0 financial team split), do a fleet-level source review:

- Read all 8 agents in a single sitting
- Look for redundancy across agents
- Look for inconsistent application of cross-cutting rules — 18-month freshness, claim verification protocol, "no AI slop," McMurry method, output structure conventions
- Look for dead text from earlier versions that no longer fires
- Look for drift between what the agent file says and what the architecture doc says

The fleet review is the only point at which agents are read in relation to each other. Per-agent reviews catch local issues; fleet reviews catch coherence issues.

---

## Two Important Caveats

### Some "Errors" Are Framework Errors, Not Prompt Errors

If an agent does something unexpected and the prompt is faithfully implementing the framework, the right fix may be to update the framework — not the prompt. The agent was correct given its instructions; the instructions were incomplete.

**Examples that belong in the framework, not the prompt:**
- A new scoring sub-floor (update the rubric in `references/`)
- A new hard gate (update `references/gates-and-flags-techgroup.md`)
- A new diligence question class (update `references/scout-questions.md` or `references/diligence-scoring-rubrics.md`)

The decision log (`pipeline-decisions-log.md`) is the right home for capturing why a framework changed. The agent prompts then update to reflect the new framework — not to invent it.

### Some Errors Are Model Errors, Not Prompt Errors

If you've patched the prompt twice and the agent still drifts on the same thing, you've likely hit a model capability boundary. No prompt fix will hold.

When this happens, the right move is one of:
- **Accept the boundary** and put a human checkpoint after that step
- **Add explicit verification** elsewhere in the workflow (e.g., a second agent that double-checks the first)
- **Wait for the next model generation** and re-test

What you should *not* do is keep patching the same prompt. That makes it brittle and harder to read without solving the problem.

The signal that you've hit this case: the same observation appears 3+ times despite explicit prompt language addressing it.

---

## The Working Log — Format

`notes/agent-evolution-log.md` is the persistence layer for this protocol. Recommended structure (the file does not need to exist until the first observation is captured):

```
# Agent Evolution Log

| Date | Agent | Deal | Observation | Status | Resolved In |
|------|-------|------|-------------|--------|-------------|
| 2026-05-08 | forecasting-analyst | Acme | Anchored on founder revenue despite McMurry | Open | — |
```

Status values: `Open` / `Resolved` / `Discarded — situational` / `Discarded — model boundary` / `Resolved — framework update`.

The log is the audit trail. Resolved entries stay in the file; do not delete them. If the log grows large, archive by year, but preserve the history.

---

## Why This Discipline Matters

The pipeline's competitive value is the encoded NWA philosophy in the agent prompts. As that philosophy refines, the prompts must refine — but the path from "this output looked wrong on this deal" to "the prompt is now better" should not be a single keystroke.

Without the discipline:
- The prompt fleet drifts toward overfitting on the most recent deal
- Architectural coherence erodes
- New TechGroup members reading the agents cannot easily understand what's a core mandate versus what's a patch from a 2025 incident
- The plugin's biggest advantage — fast iteration — turns into a liability

With the discipline:
- Iteration stays fast (observations are cheap)
- Edits are reasoned (the buffer ensures it)
- The audit trail explains why the prompts look the way they do
- The fleet stays coherent across versions

---

*Maintained by NWAi Investment Intelligence & AI. Last updated May 8, 2026.*
