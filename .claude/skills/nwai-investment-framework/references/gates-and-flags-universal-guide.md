# NWAi Group Triage Framework — Universal Guide

## Purpose

Every NWAi investment group (TechGroup, MedicalGroup, SpaceGroup, ConsumerGroup,
IndustrialGroup, FintechGroup) owns a **domain-calibrated triage framework** — its own
gates, filters, judgment model, and rubrics, authored for its funnel and its domain.
There is no single scoring standard imposed across groups.

This guide documents the **architecture** a group triage framework follows, using the
TechGroup framework — the one operational implementation — as the reference model for
future group playbooks. It intentionally contains no thresholds, rubrics, or scoring
mechanics: those live in each group's own framework file, which is the single source of
truth for its numbers.

*Provenance note: through June 2026 this file (then named `gates-and-flags.md`) carried
the "Universal Triage Framework" — a 3-layer gates + 30/25 scoring standard. That
framework was authored for and used only by TechGroup, which moved to the Six-Signal
verdict model in July 2026. The full v2.0 text is preserved at
`_archive/gates-and-flags-universal-v2.0-legacy.md` and remains available as raw
material for future group playbooks.*

---

## Anatomy of a Group Triage Framework

A group's screening framework defines six elements. Each is illustrated with the
TechGroup implementation:

1. **Hard Gates** — a small set of binary kills, determinable from pitch materials
   alone, that are truly non-negotiable regardless of opportunity strength. A single
   FAIL ends screening. Gates fail only on clear evidence — silence is a pass with a
   flag, never a kill.
   *(TechGroup: US entity/IP structure · market-scale floor · commercial intent.)*

2. **Rigor Filters** — skepticism tests that govern evidence standards before any
   judgment is rendered: what counts as verified, what a claim is worth on its own, and
   which domain-specific kill patterns must be explicitly tested on every deal.
   *(TechGroup: the NWA Filter — Cynical Default, Goliath Test, LLM Ingestion Test,
   Revenue Quality Audit.)*

3. **Judgment Model** — how the deal is actually assessed: scored dimensions, qualitative
   signal verdicts, or a hybrid — the group's choice, calibrated to its funnel volume and
   its members' decision style. Whatever the model, it must make its reasoning auditable
   (a member can see *why*, not just *what*).
   *(TechGroup: the Six-Signal verdict model — qualitative verdicts with weights,
   adverse definitions, and conviction mechanics; no numeric scores at Screen.)*

4. **Verdict Vocabulary** — every group screener emits the same three calls:
   **ADVANCE / WATCH / DECLINE**, verdict-first (the call leads the report, analysis
   follows). WATCH carries specific re-engagement conditions; DECLINE names the kill
   reason in one sentence.

5. **Research Discipline** — a bounded screen-stage verification protocol: enough
   independent checking to catch false claims, strictly capped so screening stays fast
   and deep research stays at Scout/Diligence where it belongs.
   *(TechGroup: exactly 3 web searches — market, founder commitment, competitive/Goliath
   landscape — run silently.)*

6. **Output Contract** — a scannable, verdict-led report plus a saved document in the
   deal folder, explicit ❌ Red / ⚠️ Yellow flags, and a single clear next action.
   *(TechGroup: 1–2 page brief — Verdict Block → Context → Gates → Six Signals → Deal
   Facts → Risk Flags → footer — plus the Triage Report docx.)*

---

## The TechGroup Reference Implementation

The complete operational instance of this architecture is
**`gates-and-flags-techgroup.md`** — the TechGroup Six-Signal Screener Reference. It is
self-contained: gates, filters, signal definitions, conviction mechanics, calibrated
rules ledger, research protocol, and output guidance in one file.

Lineage, briefly: a numeric screener (6-dimension Opportunity + 5-dimension Readiness
scoring, v1.0 March 2026 → v2.1 June 2026) served the TechGroup funnel through mid-2026;
it was superseded in July 2026 by the Six-Signal verdict model, developed and
back-tested against four historical deals in the Claude V13 sandbox program
(`docs/reference/Gemini/`) and installed per
`notes/NWAi-Pipeline-Framework-Adoption-Spec-2026-07.md`. The lesson for future groups:
**calibrate against your own decided deals before installing** — the back-test, not the
design document, is what makes a judgment model trustworthy.

---

## Building a New Group Playbook

When a second group's pipeline goes operational:

1. **Start from the intake questionnaire** in `docs/group-intake/` — it captures the
   group's funnel volume, decision cadence, domain kill patterns, and member decision
   style. These drive every calibration choice.
2. **Author the six elements above** in a new group file
   (`gates-and-flags-<group>.md`), adapting — not copying — the TechGroup
   implementation. The archived numeric framework
   (`_archive/gates-and-flags-universal-v2.0-legacy.md`) is equally valid raw material
   for a group that prefers scored dimensions.
3. **Back-test before install:** run a set of the group's already-decided deals through
   the draft framework and reconcile every divergence from the historical calls before
   the framework goes live.
4. **Wire the pipeline:** a group screening command, deal-folder output conventions,
   and downstream stage handoffs, following the TechGroup pipeline as the model
   (`nwai-techgroup-pipeline-architecture.md`).

---

*NWAi Group Triage Framework — Universal Guide | v3.0 | July 2026*
*Rewritten and renamed from `gates-and-flags.md` (the v2.0 Universal Triage Framework,
April 2026, archived at `_archive/gates-and-flags-universal-v2.0-legacy.md`) when
TechGroup — its only operational user — adopted the Six-Signal verdict model. Ruling
recorded in `pipeline-decisions-log.md` (Decision 9, July 2026).*
