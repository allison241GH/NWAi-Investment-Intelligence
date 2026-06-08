# NWAi Investment Intelligence — Executive Summary

*Where we are, what comes next.*
*Audience: developer-member joining NWA as an advisory member to learn angel investing while building the platform. May 2026 (vocabulary refreshed to GUT v1.0 conventions).*
*Companion: full detailed brief at `NWAi-Investment-Intelligence-Enterprise-Build-Brief.md`.*

---

## The thesis

NWA = New World Angels — an angel investment syndicate of ~200 members organized into 6 domain-specialized groups (Tech, Medical, Space, Consumer, Industrial, Fintech). The platform we're building exists to deliver one sentence:

> **NWA converts syndicate-scale human expertise into investment conviction — faster, sharper, and with more judgment depth than any individual, firm, or filtering algorithm can.**

Every dollar spent and every line of code written either accelerates that conversion or it doesn't belong.

The architectural posture that organizes everything below is codified in `docs/strategy/foundational/NWAi-Grand-Unifying-Theory-v1.0.md`: **Substrate-and-Activations.** Track 2 (Member/Social Intelligence) is the substrate; Track 1 (Deal Intelligence) and Track 3 (Ecosystem Network Intelligence) are activations that plug into it.

---

## What's been built to date

For the past several months we've been building NWAi's investment intelligence pipeline as a **Claude-based plugin, operated across three first-class surfaces** (Claude Desktop, Claude Code CLI, and Cowork) for daily deal work (`nwai-tech-pipeline`, currently v2.13.1). It runs against TechGroup's deal flow today and is the live runtime spec for everything that follows.

Three layers exist:

1. **The runtime — `.claude/`** — 8 slash commands (`/screen`, `/scout`, `/diligence`, `/post-meeting`, `/dd-report`, `/decision`, `/memo`, `/sync-pipeline`) orchestrating 9 research/analysis agents (`team-analyst`, `market-analyst`, `competitive-positioning-analyst`, `technology-analyst`, `risk-analyst`, `pricing-analyst`, `forecasting-analyst`, `venture-analyst`, `pipeline-monitor`). Diligence runs 6 agents in parallel (Stage 2A) then a 2-agent sequential financial-diligence chain (Stage 2B).

2. **The proprietary IP — frameworks** — 10 reference documents encoding NWAi's pattern recognition: Universal Triage v2.0 (3 hard gates + NWA Filter + Opportunity 6×0–5/30 + Readiness 5×0–5/25), Scout questions, Diligence rubrics, 17-folder DD checklist, AI Moats Framework (3 archetypes + Replicability Speed Matrix), Agent-Era Readiness Framework (does the founder solve the problem as AI agents will reshape it — the third always-active lens), DD Report format (11 scored sections, exact STL visual standard), Memo format (4-slide PPTX), and the diligence-meeting analyst lens. Each framework is consumed by the AI agents at runtime — these are *prompts and scoring engines*, not just human-readable docs. In V1 these become the **Policy Layer** of the substrate.

3. **The IA preview — `demo/`** — a Next.js demo (Tailwind v4, shadcn/ui) showing where this is heading: a unified workspace with Pipeline, Members, Portfolio, Ecosystem, Orchestrator, and Matching surfaces. Static JSON seed data, no backend. The demo is one **information-architecture ground truth** input for the build; the V1 platform reference (`docs/reference/NWA Investment Intelligence Platform/`) is the architectural ground truth.

The result today: deals enter via Dealum (sunset by YE), are screened/scouted/diligenced/decided in the Claude-based system using NWAi frameworks, and produce structured outputs — Triage Reports, Scout Assessments, DD Kickoff Packages, post-meeting reconciliations, 11-section scored DD Reports (.docx), and 4-slide Investment Memos (.pptx). Three deals are active: STL, Synergist, Captain Compliance.

---

## The substrate that matters most — and doesn't yet exist

Per GUT v1.0, the **Member Expertise Graph + Decisions Ledger** — together with sensors, policy, and the learning loop — constitutes the **Track 2 Substrate**, and is what makes NWA structurally uncopyable. A competitor can copy the rubrics, the agent prompts, even the AI orchestration. They cannot copy 200+ members' tagged expertise plus 20+ years of indexed deal decisions, DD outcomes, and IC reasoning.

Today this substrate is implicit — it lives in members' heads, in Dealum, and in scattered post-meeting notes. **Building it as a first-class queryable graph + append-only decisions ledger is the central architectural goal of this engagement.** Everything else — the AI runtime, the web framework, the hosting — is reversible. The graph and the ledger compound; they're the moat.

GUT v1.0 names five substrate components: 🎯 **Sensors** · 🕸️ **Member Graph** · 📜 **Decisions Ledger** · ⚖️ **Policy Layer** · 🔄 **Learning Loop**.

---

## What comes next — the V1 / V2 / V3 rollout

The current Claude-based plugin is the runtime spec for what to build, but the constraints are real: single primary user, desktop-bound, session-state, no role-based access, no audit trail, no persistent enriched data store. The build replaces today's daily operating surface — the existing Claude-based plugin remains as a rapid-prototyping surface for framework iteration.

GUT v1.0 sequences the rollout as substrate-first, with activations layered on top:

### V1 — TechGroup MVP (Days 0–45, per GUT v1.0)

**Scope is intentionally narrow.** Ship the substrate end-to-end, with the seven V1 capabilities specified in the rough draft outline (`docs/strategy/foundational/NWAi-Architectural-Reference-Outline-v0.1.md`):

- Member profile + expertise graph
- Member directory + faceted search + Network Agent (NL query)
- Social deal card (per active deal)
- TechGroup AI-powered Screen / Scout / Diligence (existing pipeline integrated as Track 1 activation)
- Member comments + SME POV capture across pipeline stages
- Decisions ledger (append-only)
- Re-weighted routing (each cycle's interactions tune next-cycle match scoring)

**MVP overlay with Dealum** for deal-member DB during transition. Dealum passive inflow sunset by YE. Document generation (DD Report .docx, Memo .pptx) preserved from current plugin — visually indistinguishable from canonical references.

### V2 — Per-Group Rollout (+2 weeks per group)

Onboard the other 5 groups (Medical, Space, Consumer, Industrial, Fintech) using their playbook intake outputs. Per-group playbook configuration (rubrics, themes, filters, optional specialist agents). Cross-group access controls. Group-level analytics. Substrate is universal; playbook is per-group.

### V3 — Track 3 Ecosystem Network Intelligence (named slot)

Proactive sourcing agents (incubators, accelerators, universities, research). Pattern detection across market trends and signals. Thematic insights and reports. Pipeline creation upstream of Track 1. Activates after V1 + V2 are stable. Internals designed when V1 + V2 are validated.

### Beyond V3 — Substrate Maturity & Dealum Migration

The implementation depth in the detailed brief extends across V1 + V2 + V3 and beyond. This includes the broader Phase A scope (portfolio surface, ecosystem signals, full multi-group depth, IC workflow refinement) and the legacy Phase B scope (native founder portal, native CRM, full Dealum migration). Total arc to full platform parity: ~12–18 months of engagement depth.

### The reconciliation worth knowing

GUT v1.0's V1 timing (30–45 days) is aggressive *by design* — the substrate ships minimally, with overlay-onto-Dealum during transition. The brief's longer phasing reflects the implementation depth required to reach full platform parity. They aren't in conflict; V1 is the minimum-viable substrate ship, and the broader phased build is what gets to full-feature parity over ~12–18 months.

---

## Architectural challenges worth knowing upfront

- **AI agent orchestration at multi-user, multi-group scale** — the current Claude-based runtime is CLI-only; the web app needs a managed equivalent (LangGraph, Anthropic Workbench, OpenAI Assistants, custom — TBD). Long-running agents (Diligence Stage 2A runs 10+ minutes), parallel + sequential chains, observable cost per deal.
- **Framework versioning** — every DD Report must be re-renderable against the framework version in force at the time it was authored. Frameworks will continue to evolve in the current Claude-based plugin in parallel with the web app build.
- **Document fidelity** — DD Report .docx visual output is *binding* against the STL canonical reference (2-column tables, RAG color coding, navy/ice-blue branding). Memo .pptx is binding against `memo-format-reference.md`. Server-side .docx/.pptx generation lifts directly from `scripts/dd-report-generator.js`.
- **Multi-tenant 6-group RBAC** — single platform serving all 6 NWAi groups with per-group AND per-deal access scoping. Cross-group access is opt-in.
- **The substrate (Track 2)** — graph store with vector embeddings on expertise tags + sector preferences. Append-only decisions ledger writes from every AI agent run plus human commentary. Closed loop: writes re-weight routing on the next cycle. **This is the moat — architect first**, even if V1 minimum features don't depend on it.
- **Three new substrate agents in V1** — Network Agent (NL directory queries), Match Engine (deal → 3–5 best-fit members), SME POV Capture Agent (structured prompting at each pipeline stage). These are net-new beyond the 9 existing pipeline agents.
- **Confidentiality** — deal data is highly sensitive (cap tables, term sheets, founder financials). Encryption in transit and at rest. SOC 2 readiness as a later-stage future state.

---

## Companion artifacts (read in this order)

| # | Artifact | Why |
|---|----------|-----|
| 1 | This summary | Frame the engagement |
| 2 | **GUT v1.0** — `docs/strategy/foundational/NWAi-Grand-Unifying-Theory-v1.0.md` (+ `.html`) | The canonical strategic + architectural posture. Substrate-and-Activations. V1/V2/V3 rollout cadence. |
| 3 | **V1 Platform Reference** — `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Reference-v1.0.html` (+ `.md`) | Visual + textual architectural reference. Build-state map: what's live, what's V1, what's V2/V3. |
| 4 | **V1 Platform Overview** — `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Overview-v1.0.html` (+ `.md`) | Distilled 2-page landscape companion to #3. For team distribution. |
| 5 | **Rough Draft Outline** — `docs/strategy/foundational/NWAi-Architectural-Reference-Outline-v0.1.md` | Scope-discovery outline for the eventual full spec. Section-level scope cues. |
| 6 | Detailed build brief — `NWAi-Investment-Intelligence-Enterprise-Build-Brief.md` | Implementation scoping doc with data model, integrations, phased build, success criteria. *Implementation depth pass — refreshed to v1.0 vocabulary.* |
| 7 | Demo — `demo/` | An IA + UX ground truth input |
| 8 | Plugin source — `.claude/` | The runtime spec; agents and frameworks the new system needs to replicate |
| 9 | Architecture file — `nwai-techgroup-pipeline-architecture.md` | The current Claude-based runtime architecture |
| 10 | Strategy folder — `docs/strategy/` | Grand Unifying Theory + Member Intelligence feature inventory + Strategic Reframe (predecessor) |
| 11 | Group intake — `docs/group-intake/` | Per-group playbook configuration schema (TechGroup reference + blank template for the other 5 groups) |
| 12 | Agent roster — `docs/reference/NWAi TechGroup/Pipeline Agents/agent-team-reference.md` | The 9 existing pipeline agents — what each does, frameworks consumed, output format |

---

*NWAi Investment Intelligence — Executive Summary | v1.1 (vocabulary refreshed to GUT v1.0) | May 2026*
*Jamie Allison, NWA Board Director — Investment Intelligence Platform & AI; TechGroup Co-Chair.*
