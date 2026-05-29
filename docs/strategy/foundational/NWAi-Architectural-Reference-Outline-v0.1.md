# NWAi Architectural Reference — Rough Draft Outline v0.1

**Status:** Rough draft outline / scope-discovery reference. **Not a spec.**
**Purpose:** A scannable map of what *would* go in the buildable architectural reference doc. Use to decide which sections (or sub-bullets) are worth elevating into a full specification before the developer-member starts building. Section titles and scope cues only — no specifications, no acceptance criteria, no schemas.

**Companions:**
- `NWAi-Grand-Unifying-Theory-v1.0.md` — foundational reference (substrate-and-activations posture; V1 scope at the strategic level).
- `Member_Social_Intelligence_Layer_V1_Features.md` — Jared's V1 feature list. Material reference for the Track 2 feature surface.
- `NWAi-Strategic-Reframe-Reference.md` — strategic predecessor (now vocabulary-aligned to v1.0).

**Vocabulary:** v1.0 conventions throughout — Substrate, Activations, Intelligence Tracks (Deal / Member-Social / Ecosystem Network), Sensors, Ledger, Policy, Learning Loop.

**Out of scope for the eventual spec doc (per scoping brief):**
- Substrate Commercialization Stress Test (γ-A).
- Outbound syndication (Track 4 outbound).
- Re-specification of pipeline plugin agents inside `.claude/agents/` (the spec consumes their outputs; it does not redefine the agents themselves).

---

## Section 0 — How to Read This Document

- Audience layering — developer-member (primary, top-to-bottom); Ron / Jessica / Jared / Jamie (steering, can stop at each section's verdict).
- Relationship to v1.0 GUT — this doc *implements* what v1.0 *posits*.
- Vocabulary conventions and the v1.0 glossary anchor.
- What's binding vs. what's a default that can be re-decided.
- Out-of-scope statement (γ-A, Track 4 outbound, pipeline-agents-as-platform).

## Section 1 — Architectural Posture (the non-negotiables)

- AI-native construction. Substrate-first. Member-graph-centric. Compoundable by design.
- The five non-negotiables (each becomes a one-line rule + one-line rationale in the spec):
  1. Substrate before activations — Track 2 ships before Tracks 1 and 3 plug in.
  2. Every interaction is a sensor — comments, votes, SME POV, decisions all write to the substrate.
  3. The decisions ledger is the institutional memory — append-only, queryable, re-weights routing.
  4. Member-controlled visibility — consent is a first-class field; staff-only ≠ public ≠ peer-visible.
  5. In service of members, never in place of them — no automated decisioning; AI proposes, humans dispose.
- What this means (and doesn't) for technology selection.

## Section 2 — V1 Scope — TechGroup MVP, Specified

*The longest section in the eventual spec. Per-capability scope, fields, ownership, acceptance criteria.*

- The seven V1 capabilities:
  1. Member profile + expertise graph — fields, population paths, maintenance ownership, consent rules.
  2. Member directory + faceted search + Network Agent (NL query).
  3. Social deal card (per active deal — the centerpiece) — anatomy, fields, one-tap actions, real-time social proof.
  4. TechGroup AI-powered Screen / Scout / Diligence — how existing pipeline outputs surface on the deal card.
  5. Member comments + SME POV capture across stages — structured prompts per stage, threading model, attribution model.
  6. Decisions ledger — what is recorded, schema sketch, append-only invariants, query patterns.
  7. Re-weighted routing engine — how each cycle's interactions tune next-cycle match scoring.
- Cross-cutting V1 capabilities (newsfeed, portfolio view, support exchange, founder ask routing) — explicit included-or-deferred decisions, reconciled against Jared's V1 feature list.
- V1 acceptance criteria — the "Wednesday night test" + ledger-write end-to-end + closed-loop re-weight observable.

## Section 3 — Substrate Architecture (the deep dive)

- The substrate is five things working together — Sensors, Graph, Ledger, Policy, Learning Loop.
- **3.1 Sensor Catalog** — exhaustive list of interactions that write to the substrate.
- **3.2 Member Graph** — entities (Member, Company, Deal, Investment, Round, Domain Tag, Connection), relationship types, derived fields (e.g., expertise centrality, co-investment density).
- **3.3 Decisions Ledger** — append-only event log; entry types (Screen verdict, Scout assessment, Diligence note, IC decision, Comment, SME POV, Vote, Pass-with-reason); cardinality model.
- **3.4 Policy Layer** — NWAi investment criteria encoded as policy; engagement modes (active / passive / opt-in); consent rules (per-field visibility, per-deal opt-in).
- **3.5 Learning Loop** — how each cycle's writes re-tune match scores for the next cycle. Concrete: feature, update rule, observability.

## Section 4 — Activation Surfaces (where members live)

- Two surfaces, ranked.
- **4.1 The deal card** — primary surface, V1 centerpiece.
- **4.2 The activity newsfeed** — landing surface; ranking signals; personalization model.
- **4.3 The directory + Network Agent** — search and NL-query surface.
- **4.4 Member profile view** — owner-editable + system-derived fields.
- Cross-surface principles: ambient engagement, async-first, no notifications without member-set thresholds.
- Mobile vs. web posture for V1 (web-first; mobile deferred).

## Section 5 — Tool & Agent Layer (how AI shows up)

- Agents are tools members invoke, or that propose to members — never autonomous deciders.
- **5.1 The existing TechGroup pipeline agents** as feeders to the substrate (team-analyst, market-analyst, competitive-positioning-analyst, technology-analyst, risk-analyst, pricing-analyst, forecasting-analyst, venture-analyst, pipeline-monitor) — interface contract, output destinations on the deal card. *Not re-specified.*
- **5.2 Net-new substrate agents** for V1:
  - Network Agent (NL directory queries)
  - Match Engine (deal → 3–5 best-fit members)
  - SME POV Capture Agent (structured prompting at each pipeline stage)
- **5.3 Agents kept out of V1** — anything autonomous, anything that writes to the ledger without a human-in-the-loop, anything generating member-facing communication unattended.

## Section 6 — Quality Gates & Trust Architecture

- Five gates, each non-bypassable.
- Data provenance · Member consent · Decision auditability · Model output review · Sensitive-data containment.
- What "AI-native, in service of members" looks like operationally — what AI may do, may not do, must show its work for.
- The "no AI slop" rule applied to the platform — every AI output must be re-traceable to substrate facts.

## Section 7 — V2 / V3 — Named Activation Slots

- Name interfaces now; do not design internals until V1 ships.
- **V2 candidate — Track 1 expansion:** Cross-syndicate inbound fast-pass + per-group rollout (Medical, Space, Consumer, Industrial, Fintech). Same substrate; group-specific gates/flags references already exist with TechGroup as the template.
- **V3 candidate — Track 3 activation:** Proactive sourcing (incubator/accelerator scan agents) + pattern detection + thematic insights. Interface — writes upstream of Track 1, enriches member graph with market signals.
- Track 4 outbound: *not in scope (per v1.0).*
- Substrate Commercialization Stress Test (γ-A): *not in scope.*

## Section 8 — Build Plan & Sequencing

- Substrate end-to-end before any activation polish.
- **Phase 1 (Days 0–45) — TechGroup MVP / V1 ship**
  - Week 1–2: Member graph schema + profile UI + directory
  - Week 2–3: Deal card surface + integration with TechGroup pipeline outputs
  - Week 3–4: SME POV capture + comments + decisions ledger writes
  - Week 4–5: Match engine + re-weighted routing observable
  - Week 5–6: Soft launch with self-selected members; sensor instrumentation; learning loop calibration
- **Phase 2 (Weeks 7–8)** — Second group onboarding.
- **Phase 3 (Weeks 9+)** — Per-group rollout, 2 weeks each.
- **Phase 4 (~Month 4)** — All 6 groups live on substrate.
- Critical path — the 3 dependencies that, if late, slip the whole arc.
- Risk registry — 5 risks with largest blast radius and proposed mitigations.

## Section 9 — Technology Choices & Tradeoffs

- Default posture — the doc names *what must be true*, not *what tool*. Developer-member proposes the stack as a one-page addendum.
- Requirements (not picks) for:
  - Graph store
  - Ledger store
  - Web app framework
  - Auth & member management
  - AI orchestration
  - Embedding / vector store
  - Observability
- Where v1.0 has already chosen (or implied): named explicitly (e.g., MVP overlay with Dealum for deal-member DB during transition; Dealum passive inflow sunset by YE).

## Section 10 — Open Questions Routed to Decision-Makers

- The 8–12 questions the developer-member surfaces back to steering during V1 build, each tagged: *who decides*, *by when*, *what's blocked if not decided*.
- Examples (illustrative, not exhaustive):
  - Per-field default visibility on member profiles.
  - Founder-ask intake flow ownership.
  - Decisions-ledger retention window.
  - When SME POV becomes visible to other members on the deal card.
  - Match-engine default behavior when a deal matches 0 members above threshold.

---

## Appendix A — Glossary

Substrate, Activation, Sensor, Ledger, Match Engine, SME POV, Decision, Routing, Re-weight, Quality Gate, Engagement Mode.

## Appendix B — Document Lineage

v1.0 GUT (foundational) → Member/Social Intelligence Layer V1 Features (feature surface) → Strategic Reframe Reference (predecessor, vocabulary-refreshed) → this outline → forthcoming spec (selectively, scope TBD).

---

## Scope-Discovery Notes (for Jamie)

Sections to consider elevating into a full spec — ranked by leverage:

1. **Section 2 (V1 Scope).** Highest builder leverage. Every other section is supporting context for what Section 2 demands.
2. **Section 3 (Substrate Architecture).** Highest *durability* leverage — gets the schema and sensor catalog right, everything else compounds.
3. **Section 6 (Quality Gates & Trust).** Highest *member-trust* leverage — easy to under-spec, expensive to retrofit.
4. **Section 8 (Build Plan).** Highest *steering-group* leverage — gives Ron/Jessica/Jared a sequenced view they can react to.
5. **Section 10 (Open Questions).** Lowest spec cost, highest unblock value — could ship standalone as a routing doc.

Sections that probably don't need a full spec yet:

- Section 7 (V2/V3) — name interfaces, leave internals.
- Section 9 (Technology) — developer-member returns the stack proposal; we react.
- Sections 0, 1, 4, 5 — could be written as ~1-page briefings rather than full specs.

---

*Version 0.1 (rough draft) · May 2026 · NWAi · Outline only — no implementation commitments inside.*
