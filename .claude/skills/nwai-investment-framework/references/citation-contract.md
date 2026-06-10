# NWAi Citation Contract

**Status:** Binding for all agent-generated research and the reports assembled from it —
the five research-agent briefings (market, team, competitive-positioning, technology, risk)
and the Scout and Screen reports. Added plugin v2.22.0 (June 2026).

## Why this exists

A diligence artifact is only as good as its traceability. Requiring a citation on every
external fact does three things:

1. **Hallucination control.** It forces the agent to either ground a claim in something it
   actually retrieved — or not make the claim. The discipline is the point.
2. **Validation.** An SME can open the underlying source and contextualize a claim before
   acting on it, instead of taking it on faith.
3. **Credibility.** A cited report is a record. An uncited one is an opinion.

This is the enforcement mechanism for skepticism NWAi already preaches — the "no AI slop"
rule, the Founder Claim Verification Protocol, "structurally true, not narratively compelling."

## The two classes of statement — handled differently

| Class | Examples | Treatment |
|-------|----------|-----------|
| **External fact** | TAM / market size, competitor data, founder background, customer counts, dates, funding, verbatim quotes — any claim about the outside world | Carry an inline `[n]` marker resolving to an enumerated `Sources` entry |
| **Analytic judgment** | Verdicts, scores, "thin-wrapper risk," posture reads, moat strength | NOT sourceable. State the basis inline. Never fabricate a citation for a judgment — a judgment dressed as a sourced fact is worse than an honest judgment |

Conflating the two is the most common way this gets implemented badly. You cannot cite a
verdict; you can only show your reasoning. Don't citation-dress your own judgment.

## The cite-from-retrieval rule (non-negotiable)

A `[n]` may only point to a source actually opened during the run:

- a real WebSearch result or WebFetch'd page (record its URL), or
- a document provided in-context (deck slide #, transcript speaker + timestamp).

Never reconstruct, guess, or back-fill a citation from memory or training knowledge. If a
claim cannot be sourced, either drop it or label it **Inferred / Unverified**. A fabricated
citation is a hallucination with a tie on — it manufactures false confidence, which is worse
than no citation at all. The forcing function only works if the citation points to something
real that was retrieved in-session.

## Confidence tiers — tag every load-bearing claim

- **Verified** — primary source retrieved in-session `[n]`
- **Reported** — company-provided, or a single unverified source `[n]`
- **Inferred** — analytic judgment, no external source

## Output convention

- **Inline:** append `[n]` to the sentence carrying the fact.
- **End of briefing/report:** a `Sources` section enumerating each source, one per line:

  ```
  [n] Title / publisher — URL (or "deck slide 7" / "GTM transcript 14:32, CEO") (retrieved YYYY-MM-DD) — Verified / Reported
  ```

- Only sources actually retrieved this run may appear. Every inline `[n]` must resolve to a
  listed source, and every listed source should be cited at least once.

## Command assembly (Scout / Screen)

When a command assembles a report from multiple agent briefings:

1. Collect each agent's `Sources` block.
2. Merge and renumber into one report-level `Sources` section; dedupe identical URLs.
3. Preserve inline `[n]` markers, renumbered to the merged list.
4. Carry confidence tags through into the report body.
5. **Route the unverified load-bearing claims into the Targeted Diligence Questions / Live
   Pitch Questions.** The claims you could *not* verify are the highest-value probe for the
   SME — this is the single most important downstream use of the contract.
