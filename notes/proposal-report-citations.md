# Proposal: Citation Contract for Agent-Generated Reports

**Author:** Jamie (TechGroup) · **Date:** June 10, 2026 · **Status:** Draft for team review

## The ask

Add inline citations to agent-generated reports (Scout, DD, and the underlying research-agent
outputs) so any factual claim can be traced to its source. Originated from team feedback on the
Causal.ai Scout assessment: a reader wanted to validate a claim about "causal-inference roles"
and had no way to see where the number came from.

## Why

1. **Hallucination control.** Requiring a source forces the agent to either ground a claim in
   something it actually retrieved or not make it. The discipline is the point.
2. **Validation.** An SME can check the underlying source and contextualize the claim before an
   intro call instead of taking it on faith.
3. **Credibility.** A cited report is a diligence artifact. An uncited one is an opinion.

This also fits what we already preach — the "no AI slop" rule, the Founder Claim Verification
Protocol, "structurally true, not narratively compelling." Citations are the enforcement
mechanism for skepticism we already claim to apply.

## How — two constraints that make it real (not theater)

**1. Cite facts; reason for judgments. Don't blur them.**

| Statement type | Example | Treatment |
|---|---|---|
| **External fact** | TAM figure, competitor data, founder background, "% of roles that are causal-inference" | Real citation: URL / deck slide # / transcript speaker+timestamp |
| **Analytic judgment** | "thin-wrapper risk," moat score of 2/6 | State the *basis*, not a citation — judgments aren't sourceable, and dressing them as if they were is worse than an honest "this is our read" |

**2. Citations come from the in-session retrieval log — never reconstructed.**

An agent asked to *append* citations after the fact will invent plausible ones (dead URLs, wrong
timestamps). That manufactures false confidence — worse than no citation. Every citation must
point to something actually retrieved during the run (a real web fetch, the uploaded deck or
transcript). Cite from the log, not from memory.

## Bonus: confidence tiering

Once claims carry sources, tag each load-bearing claim:

- **Verified** — primary source, retrieved in-session
- **Reported** — company-provided, not independently verified
- **Inferred** — analyst judgment

The "couldn't verify" set should feed directly into the Scout report's *Targeted Diligence
Questions*. That's the highest-value output of the whole exercise for the SME.

## Scope

Cross-cutting. Touches the output spec of the five research agents (market-, team-,
competitive-positioning-, technology-, risk-analyst) plus the `/scout` and `/screen` assembly
steps. The agents already hold the sources — they just aren't required to carry them through to
the final report today.

## Format

A single enumerated `## Sources` section at the end of each report; inline claims reference
source numbers `[1]`, `[2]`. Minimal reading overhead, clean attribution.

## Rollout

1. Team review of this proposal.
2. Wire the citation contract + claim-tagging into agent output specs; repackage plugin.
3. If adopted as standing format, capture in `CLAUDE.md` so every report inherits it.
