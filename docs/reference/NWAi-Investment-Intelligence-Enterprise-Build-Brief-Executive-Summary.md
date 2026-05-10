# NWAi Investment Intelligence — Executive Summary

*Where we are, what comes next.*
*Audience: NWA colleague evaluating the freelance build engagement. May 2026.*
*Companion: full detailed brief at `docs/reference/NWAi-Investment-Intelligence-Enterprise-Build-Brief.md`.*

---

## The thesis

NWA = New World Angels — an angel investment syndicate of ~200 members organized into 6 domain-specialized groups (Tech, Medical, Space, Consumer, Industrial, Fintech). The platform we're building exists to deliver one sentence:

> **NWA converts syndicate-scale human expertise into investment conviction — faster, sharper, and with more judgment depth than any individual, firm, or filtering algorithm can.**

Every dollar spent and every line of code written either accelerates that conversion or it doesn't belong.

---

## What's been built to date

For the past several months I've been building NWAi's investment intelligence pipeline as a **Claude-based plugin, used through the Claude desktop app (Cowork) for daily deal work** (`nwai-tech-pipeline`, currently v2.13.1). It runs against TechGroup's deal flow today and is the live spec for everything that follows.

Three layers exist:

1. **The runtime — `.claude/`** — 8 slash commands (`/screen`, `/scout`, `/diligence`, `/post-meeting`, `/dd-report`, `/decision`, `/memo`, `/sync-pipeline`) orchestrating 9 research/analysis agents (`company-researcher`, `market-analyst`, `competitive-intelligence`, `technical-diligence`, `risk-assessor`, `pricing-analyst`, `forecasting-analyst`, `venture-analyst`, `pipeline-monitor`). Diligence runs 6 agents in parallel (Stage 2A) then a 2-agent sequential financial-diligence chain (Stage 2B).

2. **The proprietary IP — frameworks** — 10 reference documents encoding NWAi's pattern recognition: Universal Triage v2.0 (3 hard gates + NWA Filter + Opportunity 6×0–5/30 + Readiness 5×0–5/25), Scout questions, Diligence rubrics, 17-folder DD checklist, AI Moats Framework (3 archetypes + Replicability Speed Matrix), DD Report format (11 scored sections, exact STL visual standard), Memo format (4-slide PPTX), and the diligence-meeting analyst lens. Each framework is consumed by the AI agents at runtime — these are *prompts and scoring engines*, not just human-readable docs.

3. **The IA preview — `demo/`** — a Next.js demo (Tailwind v4, shadcn/ui) showing where this is heading: a unified workspace with Pipeline, Members, Portfolio, Ecosystem, Orchestrator, and Matching surfaces. Static JSON seed data, no backend. The demo is the **information-architecture ground truth** for the build.

The result today: deals enter via Dealum, are screened/scouted/diligenced/decided in the Claude-based system using NWAi frameworks, and produce structured outputs — Triage Reports, Scout Assessments, DD Kickoff Packages, post-meeting reconciliations, 11-section scored DD Reports (.docx), and 4-slide Investment Memos (.pptx). Three deals are active: STL, Synergist, Captain Compliance.

---

## The substrate that matters most — and doesn't yet exist

Per the Grand Unifying Theory (`docs/strategy/NWAi-Grand-Unifying-Theory-v0.1.md`), the **Member Expertise Graph + Decisions Ledger** is what makes NWA structurally uncopyable. A competitor can copy the rubrics, the agent prompts, even the AI orchestration. They cannot copy 200+ members' tagged expertise plus 20+ years of indexed deal decisions, DD outcomes, and IC reasoning.

Today this substrate is implicit — it lives in members' heads, in Dealum, and in scattered post-meeting notes. **Building it as a first-class queryable graph + append-only decisions ledger is the central architectural goal of this engagement.** Everything else — the AI runtime, the web framework, the hosting — is reversible. The graph and the ledger compound; they're the moat.

---

## What comes next — the two-phase enterprise build

The current Claude-based plugin is the runtime spec for what to build, but the constraints are real: single primary user, desktop-bound, session-state, no role-based access, no audit trail, no persistent enriched data store. The build replaces today's daily operating surface — the existing Claude-based plugin remains as a rapid-prototyping surface for framework iteration.

### Phase A — Intelligence Additive Layer (alongside Dealum)

Multi-user web app for the AI analysis layer, while Dealum remains the system of record for deal tracking, applications, and contacts. Bidirectional sync.

- Multi-user web app for the 7-stage pipeline (Inbox → Memo) — collaborative analysis surface
- AI agent orchestration replaces today's Claude-based runtime (managed AI runtime to be proposed)
- Member Expertise Graph + Decisions Ledger built as the proprietary substrate
- Multi-group support — single multi-tenant system serving all 6 NWAi groups, each with its own playbook
- Document generation parity with today's outputs (DD Report .docx, Memo .pptx — visually indistinguishable)
- Portfolio surface + Ecosystem signals
- Sub-phases A.0 (discovery) → A.1 (TechGroup MVP) → A.2 (expertise graph) → A.3 (multi-group) → A.4 (portfolio + ecosystem)

### Phase B — End-to-End Platform (replaces Dealum)

After Phase A is in production and validated for at least one full IC cycle, the platform absorbs Dealum's role and Dealum is decommissioned.

- Native deal intake (founder application portal)
- Native CRM — contacts, founders, members, advisors, investors all unified
- Native pipeline state ownership (the platform IS the source of truth)
- Native deal-room with role-scoped access
- Native member application + onboarding workflow
- Dealum migration tooling, dual-running validation, cutover, decommission
- Sub-phases B.0 (migration discovery) → B.1 (founder portal) → B.2 (native CRM + state) → B.3 (cutover) → B.4 (decommission + hardening) → B.5 (optional advanced)

### The contrast that defines the engagement

| Concern | Phase A | Phase B |
|---------|---------|---------|
| Deal tracking source of truth | Dealum | The platform |
| Member directory | Mirror from Dealum + enrich | Native — Dealum decommissioned |
| Sync surface | Bidirectional Dealum API | None — Dealum is gone |
| AI analysis, scoring, docs | The platform | The platform |

Phase A architecture decisions must anticipate Phase B — redoing the data model at Phase B is not acceptable.

---

## Architectural challenges worth knowing upfront

- **AI agent orchestration at multi-user, multi-group scale** — the current Claude-based runtime is CLI-only; the web app needs a managed equivalent (LangGraph, Anthropic Workbench, OpenAI Assistants, custom — TBD). Long-running agents (Diligence Stage 2A runs 10+ minutes), parallel + sequential chains, observable cost per deal.
- **Framework versioning** — every DD Report must be re-renderable against the framework version in force at the time it was authored. Frameworks will continue to evolve in the current Claude-based plugin in parallel with the web app build.
- **Document fidelity** — DD Report .docx visual output is *binding* against the STL canonical reference (2-column tables, RAG color coding, navy/ice-blue branding). Memo .pptx is binding against `memo-format-reference.md`. Server-side .docx/.pptx generation lifts directly from `scripts/dd-report-generator.js`.
- **Multi-tenant 6-group RBAC** — single platform serving all 6 NWAi groups with per-group AND per-deal access scoping. Cross-group access is opt-in.
- **The expertise graph** — vector embeddings on expertise tags + sector preferences. Append-only decisions ledger writes from every AI agent run plus human commentary. This is the moat — architect first, even if Phase A.1 features don't depend on it.
- **Confidentiality** — deal data is highly sensitive (cap tables, term sheets, founder financials). Encryption in transit and at rest. SOC 2 readiness as a Phase B late-stage future state.

---

## Companion artifacts (read in this order)

| # | Artifact | Why |
|---|----------|-----|
| 1 | This summary | Frame the engagement |
| 2 | Detailed build brief — `docs/reference/NWAi-Investment-Intelligence-Enterprise-Build-Brief.md` | Implementation scoping doc with data model, integrations, phased build, success criteria |
| 3 | Demo — `demo/` | The IA + UX ground truth |
| 4 | Plugin source — `.claude/` | The runtime spec; agents and frameworks the new system needs to replicate |
| 5 | Architecture file — `nwai-techgroup-pipeline-architecture.md` | The current 6-layer Claude-based runtime architecture |
| 6 | Strategy folder — `docs/strategy/` | The Grand Unifying Theory + Cowork-vs-enterprise comparison + Member Intelligence feature inventory |
| 7 | Group intake — `docs/group-intake/` | Per-group playbook configuration schema (TechGroup reference + blank template for the other 5 groups) |
| 8 | Agent roster — `docs/reference/agent-team-reference.md` | The 9 agents — what each does, frameworks consumed, output format |

---

*NWAi Investment Intelligence — Executive Summary | v1.0 | May 2026*
*Jamie Allison, NWA Board Director — Investment Intelligence Platform & AI; TechGroup Co-Chair.*
