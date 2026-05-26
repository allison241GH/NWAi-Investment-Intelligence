# NWAi Investment Intelligence — Enterprise Build Brief

**Audience:** Developer-member joining NWA as an advisory member to learn angel investing while building the multi-user, web-based Investment Intelligence Platform that replaces the current Claude-plugin–based workflow.
**Author:** Jamie Allison, NWA Board Director — Investment Intelligence Platform & AI; TechGroup Co-Chair
**Status:** v1.1 — vocabulary refreshed to GUT v1.0 conventions (substrate-and-activations; V1/V2/V3 rollout). Original v1.0 framing (Phase A / Phase B) is superseded but preserved in spirit as the *implementation-depth pass* on top of GUT v1.0's V1 substrate ship.

**Companion artifacts you also receive (read in this order):**
- `docs/strategy/foundational/NWAi-Grand-Unifying-Theory-v1.0.md` (+ `.html`) — **canonical strategic + architectural posture**
- `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Reference-v1.0.html` (+ `.md`) — visual architectural reference with build-state map
- `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Overview-v1.0.html` (+ `.md`) — distilled overview, 2-page landscape
- `docs/strategy/foundational/NWAi-Architectural-Reference-Outline-v0.1.md` — rough draft outline / scope-discovery for the eventual full spec
- `demo/` — Next.js IA preview (an IA + UX input)
- `.claude/` — current plugin runtime (agents, commands, skills, frameworks)
- `nwai-techgroup-pipeline-architecture.md` — current runtime architecture
- `docs/strategy/` — strategic context including the Strategic Reframe predecessor
- `docs/group-intake/` — per-group playbook intake (TechGroup reference + blank template)
- `docs/reference/NWAi TechGroup/Pipeline Agents/agent-team-reference.md` — agent roster and roles

**This brief is not the spec.** It's the navigation layer + implementation gaps + non-functional requirements that the artifacts above don't make obvious. Treat GUT v1.0 + the V1 Platform Reference as the architectural ground truth, the demo as an IA input, and the plugin source as the runtime ground truth — this brief tells you what's missing and what to propose on.

**Confidentiality:** NDA is required before this engagement starts. Assume the contents of this folder are confidential.

---

## 1. Context & Vision

### The one-sentence theory

> **NWA converts syndicate-scale human expertise into investment conviction — faster, sharper, and with more judgment depth than any individual, firm, or filtering algorithm can.**

NWA = New World Angels — an angel investment syndicate of ~200 members organized into 6 domain-specialized investment groups (TechGroup, MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup). The platform you're being asked to build converts that human expertise into structured, auditable, AI-scaffolded investment conviction at scale.

### Read these before you scope

| Document | What it tells you |
|----------|-------------------|
| `docs/strategy/foundational/NWAi-Grand-Unifying-Theory-v1.0.md` (+ `.html`) | **Canonical.** Substrate-and-Activations architecture. Three Intelligence Tracks: Track 1 Deal Intelligence (activation) · Track 2 Member/Social Intelligence (substrate) · Track 3 Ecosystem Network Intelligence (activation). V1/V2/V3 rollout cadence. |
| `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Reference-v1.0.html` | Visual architectural reference with build-state map (what's Live · Live · adapts · Build V1 · Build V2 · Build V3) |
| `docs/strategy/foundational/Member_Social_Intelligence_Layer_V1_Features.md` | The Member Intelligence "moat" feature inventory — feeds the V1 substrate scope |
| `docs/strategy/foundational/NWAi-Strategic-Reframe-Reference.md` | Strategic predecessor (vocabulary-refreshed to v1.0). Captures the underlying *strategic reasoning* behind the reframe. Read for context. |
| `docs/strategy/foundational/NWAi-Architectural-Reference-Outline-v0.1.md` | Rough draft outline / scope-discovery for the eventual full spec |

You will not need to re-justify the build. The strategic case is settled — GUT v1.0 is the architectural ground truth. Your job is to design and deliver the implementation.

---

## 2. Scope of This Engagement — V1 / V2 / V3 Rollout

GUT v1.0 sequences the rollout as **substrate-first**, with activations layered on top. The headline timing in v1.0 — **V1 in 30–45 days, all 6 groups within 3–4 months** — is intentionally aggressive: V1 ships the *minimum viable substrate* and the broader implementation depth in this brief continues across V2 + V3 + beyond. They aren't in conflict; V1 is the minimum substrate ship; the rest of this brief is the implementation depth that gets to full-feature parity.

### V1 — TechGroup MVP (Days 0–45, per GUT v1.0)

**Substrate-first.** Ship the Track 2 substrate end-to-end with the seven V1 capabilities specified in the rough draft outline. **MVP overlay with Dealum** for deal-member DB during transition; Dealum passive inflow sunset by YE.

**V1 scope (minimum substrate ship):**
- Member profile + expertise graph
- Member directory + faceted search + Network Agent (NL query)
- Social deal card (per active deal) — the centerpiece surface
- TechGroup AI-powered Screen / Scout / Diligence integrated as Track 1 activation (existing 9 agents feed the deal card)
- Member comments + SME POV capture across Screen / Scout / Diligence
- Decisions ledger (append-only)
- Re-weighted routing (closed loop: writes re-tune match scoring next cycle)
- Document generation (DD Report .docx, Investment Memo .pptx) — visually indistinguishable from canonical references
- 3 new substrate agents: Network Agent, Match Engine, SME POV Capture
- Multi-user web app skeleton architected for 6 groups (TechGroup live; others gated)

### V2 — Per-Group Rollout (+2 weeks per group)

Onboard the other 5 groups (Medical, Space, Consumer, Industrial, Fintech) using their playbook intake outputs. Per-group playbook configuration (rubrics, themes, filters, optional specialist agents). Cross-group access controls. Group-level analytics. Substrate is universal; playbook is per-group.

**V2 scope extensions (beyond V1):**
- Portfolio surface (current investments + member co-investors + board seats)
- IC workflow depth (collaboration patterns, voting, audit trail enhancements)
- Activity newsfeed personalization tuning

### V3 — Track 3 Ecosystem Network Intelligence (named slot)

Proactive sourcing agents (incubators, accelerators, universities, research). Pattern detection across market trends and signals. Thematic insights and reports. Pipeline creation upstream of Track 1. Internals designed when V1 + V2 are stable.

### Beyond V3 — Full Platform Parity & Dealum Migration

The implementation depth in this brief extends across the V1/V2/V3 arc and beyond, into what previous framing called "Phase B" — native deal intake, native CRM, founder portal, full Dealum migration tooling and decommission. Total arc to full platform parity: ~12–18 months of engagement depth on top of V1's 30–45 day substrate ship.

### What is explicitly out of scope across the full arc

- **Cap table / fund admin / accounting.** AngelList, Carta, Sydecar, Allocations, and Visible cover this layer (the commodity edge of Track 1, per v1.0's *integrate* posture). Do not rebuild.
- **The Claude plugin itself.** The current plugin remains the rapid-prototyping layer for framework iteration even after this build is live. The plugin is not a runtime dependency of the new system; it's a separate iteration surface for Jamie / Ron / framework evolution.
- **Foundation model training.** Use existing LLM provider APIs. Fine-tuning on NWA's historical decisions is an *option* for late-stage substrate maturity, not a V1/V2/V3 requirement.

### The key scope contrast (memorize this)

| Concern | V1 (Days 0–45) | V2 (+ weeks per group) | Beyond V3 (full parity) |
|---------|----------------|------------------------|--------------------------|
| **Deal-member DB** | Dealum overlay (MVP) | Dealum + native dual-running | Native — Dealum decommissioned |
| **Application intake** | Dealum (sunset by YE) | Dealum / native (transitioning) | The platform (founder portal) |
| **Member directory** | Substrate-native (V1 build) | Substrate-native + group expansion | Substrate-native (sole) |
| **Sync surface** | Dealum overlay reads | Reads + minimal writes | None — Dealum is gone |
| **CRM** | Dealum (interim) | Dealum (interim) | The platform (native) |
| **AI analysis, scoring, docs** | The platform | The platform | The platform |
| **Document generation** | The platform | The platform | The platform |
| **Member intelligence** | The platform (V1 substrate) | The platform (multi-group) | The platform (full parity) |

V1 ships the substrate as the foundational layer. V2 layers per-group activation on top. Beyond V3 absorbs the legacy Dealum-replacement work. Architecture decisions in V1 should anticipate everything that follows — the substrate's append-only ledger and member graph survive every later transition unchanged; only Dealum-specific identifiers shift to native ones.

---

## 3. Current State — The Reference Map

To understand what you're replacing in V1 and absorbing beyond V3, you'll be reading three things in this order:

### 3.1 The plugin runtime — `nwai-techgroup-pipeline-architecture.md`

Read the architecture file end-to-end. It describes a 6-layer system:

1. **Data Source** — currently filesystem-first (`deals/active/<Company>/`), with Dealum API integration deferred (sunset by YE)
2. **Pipeline Stages** — 7 stages from Inbox to Memo
3. **Commands** — 8 workflow files in `.claude/commands/` (sync-pipeline, screen, scout, diligence, post-meeting, dd-report, decision, memo)
4. **Agents** — 9 research/analysis agents in `.claude/agents/` (see `docs/reference/NWAi TechGroup/Pipeline Agents/agent-team-reference.md` for the roster)
5. **Skills** — 1 reference-document bundle in `.claude/skills/nwai-investment-framework/references/` (10 framework files) — becomes the V1 substrate's **Policy Layer**
6. **Session Context** — `CLAUDE.md` (workspace root) loads automatically and defines the analyst voice, guardrails, and behavioral defaults

The Claude-based plugin runs across three first-class surfaces (Claude Desktop, Claude Code CLI, Cowork) and is the live runtime spec for what the new platform replicates.

In V1, Layer 1 becomes the substrate database (member graph + decisions ledger + sensor catalog + policy + learning loop) with a Dealum overlay during transition. Beyond V3, the database is the sole source of truth and the Dealum overlay is removed. Layers 2–6 collapse into a managed AI runtime + a standard web stack across the entire arc.

### 3.2 The IA spec — `demo/`

The Next.js demo is an **information architecture and UX input** for V1 (and a useful surface inventory across the broader arc). Treat it alongside the V1 Platform Reference visual — when they disagree, the V1 Platform Reference is the architectural ground truth. Routes:

| Route | Surface | What it shows |
|-------|---------|---------------|
| `/pipeline` | Pipeline | 7-stage deal pipeline; Universal Triage v2.0 scoring on stage cards |
| `/deals/[id]` | Deal detail | Per-deal drill-in |
| `/deals/[id]/matching` | Matching Rationale | Per-deal member-match scoring |
| `/members` | Member directory | Filterable: Group → Region → Expertise → Sector → Past Investment |
| `/members/[id]` | Member profile | Expertise, sectors, past investments, matched deals, contributed inputs |
| `/portfolio` | Portfolio | NWAi portfolio companies grid + slide-over drill-in |
| `/ecosystem` | Ecosystem | Phase 4 placeholder feed for incubator / spinout / operator-network / thematic-report sourcing |
| `/orchestrator` | Orchestrator | Admin overlay — matching jobs, outreach queue, synthesis queue, 6-metric KPI strip |

Post-V3 surfaces add things the demo does not currently render: founder application form, deal-room ingestion, native deal creation, member application/onboarding, contact CRM, communication history, native admin/tags/search.

Demo seed data lives in `demo/data/` as static JSON. The demo's data shape is *not* the production schema — it's enough to render the IA. Section 7 sketches the production data model (which extends naturally from V1 substrate through V2 multi-group and beyond).

The demo is built on Next.js 14 + Tailwind v4 + shadcn/ui (base-nova). You are **not required** to use the same stack. But the IA, taxonomies, and surface inventory should not change without justification.

### 3.3 The proprietary IP — `.claude/skills/nwai-investment-framework/references/`

These 10 reference documents encode NWAi's pattern recognition. They are the *prompts and scoring logic* the AI consumes — not just human-readable docs.

| File | What it encodes |
|------|-----------------|
| `gates-and-flags.md` | Universal Triage Framework v2.0 — 3 hard gates + NWA Filter + Opportunity (6×0–5/30) + Readiness (5×0–5/25) + Decision Logic |
| `gates-and-flags-techgroup.md` | TechGroup extension — Track A/B + AI Wrapper Cap + Replicability Speed Flag + Hardware Last Mile + TRL Hard Cap |
| `scout-questions.md` | Phase 1 + Phase 2 Scout assessment with Conviction Score |
| `diligence-scoring-rubrics.md` | Moat / Risk / Bear-Base-Bull rubrics |
| `dd-checklist.md` | 17-folder DD checklist + Layer 2 Hypothesis Confirmation Plan |
| `ai-moats-framework.md` | Three AI moat archetypes + Replicability Speed Matrix |
| `dd-report-format-reference.md` | 11-section scored DD Report format with RAG colors and exact STL visual standard |
| `memo-format-reference.md` | 4-slide Investment Memo format |
| `diligence-analysis-framework.md` | Analyst-lens behavioral standard for post-meeting reconciliation |
| `_archive/gates-and-flags-6gate-legacy.md` | Pre-v2.0 archive — reference only |

In the platform, these become **structured data + prompt templates + scoring engines**, not just static docs. See Section 5 for the framework consumption pattern.

---

## 4. Target State — What You Are Building

### 4.1 The shared rails vs. group playbook architecture

The system is multi-tenant across **6 NWAi groups** under a single application. Each group has its own *playbook* — domain-specific Opportunity rubric, themes, moat lens, optional specialist agent — while sharing all the *rails* (universal hard gates, NWA Filter, Readiness scoring, Scout questions, Diligence rubrics, DD Report format, Memo format, 7 of 9 agents).

Read `docs/group-intake/NWAi-Group-Playbook-Intake-Template.md` (the blank questionnaire each non-Tech group will fill out) and `docs/group-intake/NWAi-Group-Playbook-Intake-TechGroup-Reference.md` (the worked TechGroup example) before designing the data model. The intake questionnaire's 8 sections are effectively the per-group configuration schema:

1. Group identity (name, Dealum tag during transition / native substrate group key, chair)
2. Funnel calibration (optional)
3. Track determination (optional — supports 1, 2, or N tracks per group)
4. Opportunity rubric (per track — 6 dimensions × 0–5)
5. Group-specific filters / flags / caps
6. Defensibility / moat lens
7. Themes & SMEs
8. Group-specialist agent (optional)

Architect the system so adding a new group is **a configuration change**, not a code change. Group selection is initially declared at command time; long-term (and natively beyond V3, once Dealum is decommissioned), it's inferred from the deal's group field on intake.

### 4.2 The seven pipeline stages as web workflows

Each stage has a plugin command today (`/screen`, `/scout`, `/diligence`, `/post-meeting`, `/dd-report`, `/decision`, `/memo`). In the platform each stage is a **collaborative workspace** that the **social deal card** renders persistently across all stages, with:

- A canonical artifact (Triage Report, Scout Assessment, DD Kickoff Package, post-meeting reconciliation, DD Report, Decision Record, Memo) — at V1 these become **exports of deal-card state**, not primary deliverables
- A scoring layer (the relevant rubric — auto-applied by AI, editable by humans)
- A collaboration layer (comments, mentions, SME POV capture, voting where applicable)
- An audit layer (every AI assessment, score change, member write, and human action logged in the decisions ledger)
- A document export (DD Report → .docx, Memo → .pptx)
- A pipeline-state mutation (V1: substrate-native + Dealum overlay reads; V2+: substrate-native sole)

Roles that interact with each stage:

| Role | Permissions |
|------|-------------|
| **Member** | View deals matched to expertise; comment; submit input; vote at IC |
| **SME** | All Member rights; lead-author DD checklist sections; sign off on technical/regulatory analysis |
| **Deal Lead** | All SME rights; advance pipeline state; assign DD work; initiate stage transitions |
| **Group Chair / Co-Chair** | All Deal Lead rights; configure group playbook; approve advances; final IC recommendation |
| **Admin / Platform Owner** | All rights; user management; cross-group analytics; integration management; audit access |
| **Board Observer** | Read-only across groups |
| **Founder** *(Beyond V3 — founder portal)* | Submit application; view limited status of own deal; respond to founder questions |

Permissions are **per-group AND per-deal**. A TechGroup SME shouldn't see MedicalGroup deals by default; cross-group access is opt-in by chair approval.

### 4.3 Cross-cutting features

These run across all stages and all groups:

- **Search** — full-text + semantic search across deals, members, frameworks, prior decisions
- **Notifications** — in-app + email + optional Slack; activation triggers when a deal matches a member's expertise or sector preference
- **Member matching** — scores members against deals based on expertise tags, prior investments, geography, sector preferences, and prior engagement velocity
- **Activation tracking** — measures who responded to what, how fast, and the quality of the response (this is part of the Decisions Ledger)
- **Document versioning** — every Triage Report, Scout, DD Report, and Memo has versions; old versions are retained
- **Audit trail** — append-only log of every AI assessment, score, comment, vote, document export, and pipeline-state change
- **Export** — members can extract their personal data (regulatory) and the platform owner can extract any deal's full record (operational)

Beyond V3 adds:
- **Founder portal** — application submission, status visibility, document upload, response to founder questions
- **Member onboarding** — new-member application + chair approval + role assignment workflow
- **Native deal-room** — document upload by founder + tagged access scopes (founder-only / deal-team / group / platform-admin)

---

## 5. The AI / Agent System

This is the largest architectural decision of the engagement and is identical across V1, V2, and beyond. The current plugin uses the Claude runtime (CLI orchestration) to launch 9 agents, each defined as a Markdown file with a system prompt + tool list + output format. The platform needs a managed AI runtime that does the same thing — multi-user, persistent, observable. **V1 adds 3 net-new substrate agents on top of the 9 existing pipeline agents (12 total).**

### 5.1 The 9 existing pipeline agents (Live · adapts in V1)

Read `docs/reference/NWAi TechGroup/Pipeline Agents/agent-team-reference.md` for the full roster. Summary:

| Agent | Role | When |
|-------|------|------|
| `pipeline-monitor` | Live pipeline snapshot — Dealum overlay (V1) / substrate-native (V2+) | Session startup, /sync-pipeline |
| `company-researcher` | Team-first PMTF analysis + founder claim verification + commitment depth | Scout + Diligence |
| `market-analyst` | Structural Discontinuity test + TAM/SAM/SOM + market timing | Scout + Diligence |
| `competitive-intelligence` | Competitor mapping + incumbents + moat input | Scout + Diligence |
| `technical-diligence` | Thin wrapper detection + TRL + IP/patents + AI moat signals | Scout (light) + Diligence (full) |
| `risk-assessor` | Regulatory + exit + execution + financial risk | Scout (light) + Diligence (full) |
| `pricing-analyst` | Pricing maturity + unit economics + channel pressure | Diligence Stage 2A (parallel) |
| `forecasting-analyst` | Independent 5-yr forecast (McMurry method, "no AI slop" rule) | Diligence Stage 2B (sequential) |
| `venture-analyst` | Valuation, IRR / hurdle test, deal structure | Diligence Stage 2B (final synthesis) |

In V1, all 9 agents continue to do the analytical work, but their outputs **land on the social deal card** (per stage, per analytical section) instead of standalone documents. The .docx/.pptx exports remain — they become exports of deal-card state.

### 5.1a The 3 NEW substrate agents (Build · V1 · NEW)

Per GUT v1.0, V1 adds three substrate agents that make the member graph actively intelligent rather than passive data:

| Agent | Role | When |
|-------|------|------|
| `Network Agent` | Conversational search over the member directory and expertise graph. *"Who knows X?" / "Who has [domain] depth?"* Returns ranked members with reasons. | NL directory queries, member-graph search |
| `Match Engine` | Routes each deal to the 3–5 best-fit members by expertise, network, and investment-pattern fit. Replaces static tech-group distribution. Re-tuned by the learning loop every cycle. | Every new deal entering Inbox + each stage advance |
| `SME POV Capture` | Structured prompting that captures member SME judgment at the right moments — without burying members in forms. Threads to the deal card; writes to the decisions ledger. | Stage-entry prompts (Screen / Scout / Diligence) |

**The orchestration topology matters.** Diligence runs Stage 2A's 6 agents in parallel, then Stage 2B's 2 agents sequentially because each consumes the upstream output. The 3 substrate agents are event-triggered (deal-entry, stage-advance, member-query) rather than command-driven. Your runtime needs to support: parallel agent chains, sequential agent chains, event-triggered agents, and shared state across all of them.

### 5.2 The framework consumption pattern

Each agent prompt references one or more framework files. Today these are loaded by file read at runtime; in the platform they should be **structured data with prompt-template wrappers**, so:

- Scoring rubrics are queryable (e.g., "fetch all anchors for Track A Dimension 4")
- Group playbooks are injected based on the deal's group
- Frameworks are versioned (a DD Report from 2026-01 should be re-renderable against the framework version in force at that time)
- Frameworks evolve without redeploying the agent prompts

### 5.3 Document generation

Two output formats, both already implemented in the current plugin and lift-and-shift candidates:

- **DD Report (.docx)** — `scripts/dd-report-generator.js` is the canonical generator; it produces an 11-section scored Word document with exact STL visual standard (2-column tables, RAG color coding, navy/ice-blue branding). **This script is binding format.** Lift the data shape; replicate the rendering server-side. See `dd-report-format-reference.md` for the format spec.
- **Investment Memo (.pptx)** — 4-slide PowerPoint (Cover / Investment Thesis / Pro Forma / Returns and Deal Terms) generated via pptxgenjs in the current implementation. NWAi navy/ice-blue branding. See `memo-format-reference.md` for the format spec.

Web-native rendering (HTML → PDF) is acceptable as long as the visual output is indistinguishable. **Native .docx and .pptx exports remain a hard requirement** — IC members and external stakeholders consume these formats.

### 5.4 Open architectural decision: managed AI runtime

You will propose on this. Options to consider:

- **LangGraph** (open-source state-machine for agent orchestration; cloud-runnable)
- **Anthropic Workbench / Managed Agents** (provider-managed, lower ops burden)
- **OpenAI Assistants API** (similar shape; multi-provider hedge)
- **Custom orchestration** (FastAPI/Node + Postgres for state; full control but more to build)
- **Hybrid** (e.g., LangGraph for orchestration + provider-managed for individual agent calls)

Constraints to factor in:
- Multi-LLM provider support (Anthropic primary, OpenAI hedge — do not lock in)
- Observability (token spend, latency, error rates, agent-by-agent)
- Replay / re-run a specific agent without re-running the whole pipeline
- Long-running agents (Diligence Stage 2A can take 10+ minutes)
- Cost control (caps per deal, per group, per month)

---

## 6. The Track 2 Substrate — The Moat

Per GUT v1.0, this is **Track 2 — Member/Social Intelligence**, the substrate that makes NWA uniquely NWA. It is the **single asset that no vendor can sell us and no competitor can copy**: 200+ members' tagged expertise plus 20+ years of indexed deal decisions, DD outcomes, and investment rationale.

Five components defined in v1.0:

| Component | What it is |
|---|---|
| 🎯 **Sensors** | Catalog of interactions that write to the substrate — interest signals, expertise tags, SME POV, comments, votes, pass-with-reason |
| 🕸️ **Member Graph** | Entities (Member, Company, Deal, Investment, Round, Domain Tag, Connection), relationship types, derived fields (expertise centrality, co-investment density) |
| 📜 **Decisions Ledger** | Append-only event log — Screen verdict, Scout assessment, Diligence note, IC decision, Comment, SME POV, Vote, Pass-with-reason |
| ⚖️ **Policy Layer** | NWAi investment criteria encoded as policy. Engagement modes (active / passive / opt-in). Consent rules. Two analytical lenses applied every stage. |
| 🔄 **Learning Loop** | Every cycle's writes re-tune next-cycle match scores. Routing improves with use. The compounding mechanic. |

### What the substrate contains

- **Member profiles** — expertise tags (multi-dimensional: domain, function, industry, role-type, geography, language), sector preferences, past investments, NWA tenure, engagement history, board seats, warm-contact graph
- **Expertise activation history** — every time a member was matched to a deal, whether they engaged, how fast, the quality of their input, and the IC outcome
- **Decisions ledger** — every IC vote, the reasoning, the dissenting views, the final outcome, the venture-analyst's hurdle-test verdict, and (over time) the realized outcome (exit, write-off, hold)
- **Framework outputs** — every Triage Report, Scout Assessment, DD Report, and Memo, indexed and queryable
- **Cross-deal pattern recognition** — "this deal looks like Synergist 2025" — surfaced by similarity search over the indexed history

### Why it's the moat

A competitor can copy the rubrics, the agent prompts, even the AI orchestration. They cannot copy 20 years of member expertise activation patterns and indexed IC reasoning. **Architect this substrate first** — it ships in V1, not bolted on later. This is the central GUT v1.0 sequencing argument: substrate before activations.

### Architectural implications

- The member directory is not a CRUD app; it's a **graph** with vector embeddings on expertise tags + sector preferences for similarity matching
- The decisions ledger is **append-only** — never delete, never edit-in-place; corrections are new records that supersede prior ones
- Every AI agent's output writes to the ledger automatically; humans append commentary via the social deal card
- The Match Engine is a *first-class citizen*, not an afterthought — it touches sourcing, member intelligence, and DD team assembly
- The substrate survives every later transition (V2 multi-group expansion, beyond-V3 Dealum decommission) unchanged; only Dealum-specific identifiers shift to native ones

Read `docs/strategy/foundational/Member_Social_Intelligence_Layer_V1_Features.md` for the V1 feature inventory.

---

## 7. Data Model (Sketch)

This is a starting point. You will refine it in V1 discovery and again at the beyond-V3 migration discovery. The schema is designed to extend naturally — V2 onboards additional groups against the same schema; beyond-V3 adds new entities and drops the Dealum-overlay attributes from existing ones.

### V1 core entities (substrate + Track 1 activation)

| Entity | Key Attributes | Notes |
|--------|----------------|-------|
| `Group` | id, name, acronym, dealum_tag, chair_id, co_chair_id, playbook_version | One per NWAi group (6) |
| `Track` | id, group_id, name, definition, opportunity_rubric_id | Optional — groups may have 1, 2, or N |
| `OpportunityRubric` | id, track_id, version, dimensions (jsonb: 6 × {name, anchors[6], sub_floor}) | Versioned per group/track. **Encoded into V1 Policy Layer.** |
| `Filter` (cap/flag) | id, group_id, name, test_logic, cap_effect, applies_at_stages | Group-specific filters per Section 5 of intake |
| `Theme` | id, group_id, name, definition, lead_id, sme_ids[] | 5–8 per group |
| `Deal` | id, dealum_id, group_id, track_id, theme_id, current_stage, current_scores (jsonb), submitted_at, last_advanced_at, last_synced_from_dealum_at | V1: substrate-native + Dealum overlay reads during transition |
| `Stage` | enum: inbox, screening, scout, diligence, dd_report, decision, memo | Pipeline state machine |
| `Report` | id, deal_id, type, version, framework_version, ai_outputs (jsonb), human_overrides (jsonb), exported_to (path[]) | Versioned, append-only. At V1 these become exports of deal-card state. |
| `Score` | id, report_id, dimension, score, ai_rationale, human_override_rationale, framework_version | Per-rubric-dimension |
| `Member` | id, name, email, dealum_member_id, group_ids[], roles_per_group (jsonb), expertise_tags[], sector_preferences[], geography, joined_at, engagement_mode | **Substrate-first.** V1 ships substrate-native; Dealum mirror is interim only. Engagement mode: active / passive / opt-in. |
| `ExpertiseTag` | id, name, category, embedding (vector) | Semantic search — first-class member-graph entity |
| `DealCard` | id, deal_id, current_state (jsonb), social_layer (jsonb), agent_outputs (jsonb), last_updated_at | **V1 centerpiece.** Persistent surface across all stages. |
| `Sensor` | id, type, schema_ref, write_target | Sensor catalog — defines which interactions write to the substrate |
| `MemberSignal` | id, deal_id, member_id, signal_type (interest/expertise/sme_pov/comment/vote/pass), payload (jsonb), at | The substrate's primary input — closed-loop feedback |
| `Activation` | id, deal_id, member_id, matched_at, responded_at, response_quality, ic_outcome | The ledger of who-engaged-when |
| `Match` | id, deal_id, member_id, score, reasons (jsonb), generated_by_engine_version, at | Match Engine output, versioned for the learning loop |
| `Vote` | id, deal_id, member_id, verdict (invest/pass/watch), rationale, dissent_flag, cast_at | IC vote audit |
| `Document` | id, deal_id, type, format, version, storage_uri, generated_by, generated_at | Document store |
| `Decision` | id, deal_id, type, payload (jsonb), framework_version, at, actor_id | **Append-only decisions ledger entry.** Never edit-in-place. |
| `AuditEvent` | id, actor_id, action, entity_type, entity_id, payload (jsonb), at | Append-only |
| `Comment` | id, entity_type, entity_id, author_id, body, mentions[], at | Threaded — surfaces on deal card |
| `AgentRun` | id, deal_id, agent_name, stage, input (jsonb), output (jsonb), tokens, latency_ms, cost, status, started_at, completed_at | Observability |

### V2 extensions (multi-group + portfolio + ecosystem)

| Entity | Key Attributes | Notes |
|--------|----------------|-------|
| `PortfolioCompany` | id, deal_id (fk), invested_at, member_investor_ids[], board_seats[], status | Tracks active investments — V2 surface |
| `EcosystemSignal` | id, source, payload (jsonb), tagged_groups[], created_at | V3 sourcing (Track 3 activation); entity exists earlier as placeholder |
| `GroupPlaybookVersion` | id, group_id, version, payload (jsonb), activated_at | Per-group playbook configuration history |

### Beyond V3 additional entities (full platform parity)

| Entity | Key Attributes | Notes |
|--------|----------------|-------|
| `Application` | id, founder_id, group_id, submitted_at, deck_uri, q_and_a (jsonb), status | Native intake — replaces Dealum form |
| `Founder` | id, name, email, company_id, primary_contact_for_deal_id, comm_history_count | Native CRM |
| `Contact` | id, type (founder/advisor/investor/external/etc.), name, email, org, notes, related_deal_ids[], related_member_ids[] | Generic CRM contact |
| `DealRoom` | id, deal_id, founder_uploaded_documents[], member_uploaded_documents[], access_scopes (jsonb) | Native deal-room |
| `Communication` | id, thread_id, deal_id, participants[], channel (email/in-app/upload), payload (jsonb), at | Native comm history |
| `MemberApplication` | id, applicant_email, group_applied_for, status, sponsor_member_ids[], submitted_at, decided_at, decided_by | Native member onboarding |
| `Tag` | id, scope (deal/member/contact/document), name, group_id (nullable), created_by | Native tagging |

### Multi-tenant strategy

All deal-bearing entities have a `group_id`. The default access policy is "your group's deals only," with cross-group access requiring explicit grant. The platform admin sees all groups. Performance-wise, a single-database multi-tenant Postgres should work at NWAi's scale (6 groups × ~300 deals/year × ~200 members) for the foreseeable future — sharding is unnecessary.

### Vector store

The expertise graph and decisions ledger benefit from semantic search. Either a dedicated vector DB (Pinecone, Weaviate, Qdrant) or pgvector on Postgres. Lean toward pgvector for simplicity unless query performance dictates otherwise.

---

## 8. Integrations

### V1 — required

| Integration | Purpose | Notes |
|-------------|---------|-------|
| **Dealum** | Deal-member DB overlay during transition only — **sunset by YE** | API access deferred (April 2026). V1 uses Dealum as the read-side overlay for the deal-member DB while the substrate ships. By YE, Dealum passive inflow is sunset. The plugin's `dealum_server.py` and tool definitions are dormant but architected. |
| **Auth / SSO** | NWA member identity | Likely Google Workspace SSO; member roster transitions from Dealum to substrate-native. Propose a provider. |
| **LLM provider(s)** | Agent execution | Anthropic primary, OpenAI hedge. Multi-provider abstraction recommended. |
| **Document storage** | DD Reports, Memos, deal-room files | S3 or equivalent; signed-URL access |
| **Email** | Notifications + activations | Transactional only (SendGrid, Postmark, SES) |

### V1 → V2 — added incrementally

| Integration | Purpose |
|-------------|---------|
| **Calendar** | Live Pitch + DD meetings (Google Calendar or Outlook) |
| **Slack** | Optional notification surface |
| **Affinity / Carta / AngelList / Visible** | Read-only deal-ops layer enrichment (commodity edge of Track 1, per v1.0's *integrate* posture) |
| **Public web** | Agents already use WebSearch/WebFetch — your runtime needs equivalent |

### Beyond V3 — divestments and additions

- **Dealum overlay** is removed entirely. Member roster, deal data, and contact data have been migrated to substrate-native storage.
- **Native email handling** expands — founder communication, IC discussion threads, member applications.
- **Document intake** becomes first-class — founders upload directly; tagged access scoping is enforced.
- **Calendar** integration extends to founder-facing meetings (founder pitches, DD calls).
- **Optional billing / fund admin integration** stays out of scope (still handled by AngelList / Carta / Sydecar).

### NOT integrated (across the entire arc)

- Anything that would replace Carta/AngelList/Sydecar for cap table or fund admin
- The Claude plugin itself — the existing plugin remains the rapid-prototyping surface for framework evolution, not a runtime dependency of the new system

---

## 9. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| **Multi-tenant RBAC** | 6 groups × 6 roles, per-group AND per-deal scoping. Cross-group access opt-in. Beyond V3 adds Founder role. |
| **Confidentiality** | Deal data is highly sensitive (cap tables, term sheets, founder financials). Encryption in transit and at rest. No third-party data sharing without explicit consent. |
| **Audit trail** | Append-only log of all AI assessments, scores, votes, decisions, document exports, pipeline-state changes, and (beyond V3) all founder communications and member application decisions. The decisions ledger is the canonical implementation. SOC 2 readiness as a late-stage future state. |
| **Document versioning** | Every report has versions; old versions retained indefinitely; framework version stamped on each so historical reports are re-renderable. |
| **Member data export** | Members can extract their personal data (regulatory). Platform admin can extract any deal's full record (operational). |
| **Scale assumptions** | 6 groups × ~300 deals/year × ~200 members total. Concurrent users: low (peak ~50 during IC weeks). Not a scale-driven design. |
| **Availability** | V1 / V2: high availability during IC weeks (Mon–Fri, 9am–6pm ET). Beyond V3: similar baseline; founder-facing surfaces require 24/7 uptime since founders submit applications globally. |
| **Performance** | Pipeline + member queries: <500ms p95. Agent runs: minutes are acceptable; surface progress in real-time UI. Document generation: <30 seconds. |
| **LLM cost controls** | Per-deal, per-group, and per-month spend caps. Cost attribution on every agent run. Alerting before caps are hit. |
| **Observability** | Per-agent latency, token spend, error rates, and replay capability. End-to-end pipeline trace per deal. |
| **Backups** | Daily backups of all entities; point-in-time recovery; document store separately backed up. Beyond V3: Dealum backup snapshots retained for 1 year post-decommission for legal/compliance. |
| **Compliance posture** | SOC 2 readiness as a late-stage future state. GDPR-equivalent data subject rights (member data) from day one. |
| **Migration safety (Beyond V3)** | Final Dealum decommission only after 30+ days of dual-running where the platform mirrors Dealum perfectly. Cutover plan documented; rollback plan documented. |

---

## 10. Phased Build — V1 / V2 / V3 + Beyond

GUT v1.0's headline cadence is intentionally aggressive: **V1 in 30–45 days; all 6 groups within 3–4 months.** V1's *scope* is narrower than the broader implementation depth in this brief — V1 ships the minimum viable substrate end-to-end; V2+ extends to full multi-group, portfolio, ecosystem, and beyond. Both timelines are correct: V1 is the substrate ship; the rest of this section is the implementation arc to full platform parity.

### V0 — Discovery & Architecture Proposal (2–4 weeks)
*Pre-V1 — before substrate code is written.*

- Read all referenced artifacts; spend ~1 week shadowing live plugin sessions across the three surfaces (Claude Desktop, Claude Code CLI, Cowork)
- Interview Jamie (primary), TechGroup co-chair, ~3 active members, ~1 SME from each non-Tech group as their playbook intakes return
- Validate the data model in Section 7 against real deal records under NDA
- Propose the AI runtime, hosting, auth, real-time, and storage stack (the one-page stack addendum referenced in the rough draft outline)
- Propose the Dealum overlay contract (read-side, during transition)
- Deliver: Architecture Proposal + V1 SOW + estimated total cost and timeline through V2

### V1 — TechGroup MVP Substrate Ship (30–45 days, per GUT v1.0)
*Substrate first. Minimum viable. Overlay with Dealum during transition.*

- Auth + multi-tenant skeleton (architected for 6 groups even though only TechGroup is enabled)
- Member profile + expertise graph (the substrate's foundation)
- Member directory + faceted search + Network Agent (NL query)
- Social deal card surface — persistent across all 7 stages
- TechGroup pipeline (Inbox → Memo) integrated as Track 1 activation
- All 9 existing agents orchestrated in the chosen runtime (Stage 2A parallel, Stage 2B sequential) — outputs land on the deal card
- 3 new substrate agents (Network Agent, Match Engine, SME POV Capture)
- Member comments + SME POV capture across Screen / Scout / Diligence
- Decisions ledger (append-only, queryable)
- Re-weighted routing observable (closed-loop end-to-end)
- DD Report (.docx) and Memo (.pptx) generation as exports of deal-card state
- Framework v2.0 loaded as structured data into the Policy Layer
- Dealum overlay (read-side, deal-member DB) during transition

**Acceptance:** TechGroup runs a real deal end-to-end on the new platform in parallel with the existing plugin; the social deal card is the source of truth; member writes land in the decisions ledger; routing improves on the next cycle (observable); DD Report and Memo outputs visually indistinguishable from canonical references.

### V2 — Per-Group Rollout (+2 weeks per group)
*Substrate is universal; playbook is per-group. ~3 months total to all 6 groups.*

- Onboard MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup sequentially (2 weeks per group)
- Per-group playbook configuration (rubrics, themes, filters, optional specialist agents) loaded from their intake outputs
- Cross-group access controls
- Group-level analytics
- IC workflow depth refinements informed by V1 production experience
- Activity newsfeed personalization tuning
- Portfolio surface (current investments + member investors + board seats + warm-contact graph)

**Acceptance:** All 6 NWAi groups operate on the platform; group chairs configure their playbook without code changes; portfolio surface is live; substrate is universal across the org.

### V3 — Track 3 Activation: Ecosystem Network Intelligence (named slot)
*Activates after V1 + V2 are stable. Internals designed when foundation is proven.*

- Proactive sourcing agents (incubators, accelerators, universities, research)
- Pattern detection across market trends and signals
- Thematic insights and reports
- Pipeline creation upstream of Track 1
- Writes into the member graph and the decisions ledger; consumed by the Match Engine for proactive routing
- Cross-syndicate intel feed
- Lead/follow signals on syndicated deals

**Acceptance:** Proactive sourcing produces at least one new deal entry per quarter via Track 3 channels.

### Beyond V3 — Full Platform Parity & Dealum Decommission
*The legacy "Phase B" work. Begins after V1 + V2 + V3 are validated for at least one full IC cycle.*

#### Migration Discovery (4–6 weeks)
- Audit Dealum data: deals, members, contacts, documents, communications, tags, configurations
- Define the migration-schema mapping from Dealum entities to native substrate entities
- Define the cutover runbook (dual-running window, validation checks, rollback plan)
- Validate Dealum's API-export completeness (anything missing must be exported manually)
- Deliver: Migration Plan + SOW + cost estimate

#### Native Deal Intake + Founder Portal (3–4 months)
- Founder application form (replacing Dealum's intake form entirely)
- Founder authentication and portal (status visibility, document upload, response to founder questions)
- Native deal-room with role-scoped access
- Native deal creation
- Dual-running: new deals enter the platform natively; existing deals continue from Dealum
- **Acceptance:** New deals can be submitted by founders directly to the platform without touching Dealum

#### Native CRM + Pipeline State Ownership (3–4 months)
- Native contacts, founders, members, advisors, investors all unified
- Native pipeline state ownership (substrate IS the source of truth, not a sync target)
- Native communication history (founder correspondence + IC threads)
- Native member application + onboarding workflow
- **Acceptance:** A new deal moves Inbox → Memo entirely on the platform with no Dealum involvement

#### Migration + Cutover (2–3 months)
- Bulk data export from Dealum (all groups, all historical deals, all members, all documents)
- Schema mapping and ingest into the substrate
- Validation: every Dealum deal record is reconciled in the substrate
- 30+ day dual-running window
- Cutover: Dealum reads disabled; substrate becomes sole source of truth
- Dealum data archived for 1-year compliance retention
- **Acceptance:** All NWAi groups operate fully on the platform; Dealum is read-only.

#### Decommission + Hardening (1–2 months)
- Dealum subscription cancelled
- Final compliance archive of Dealum data
- Platform hardening: SOC 2 audit prep, penetration testing, DR plan validation
- **Acceptance:** Dealum is decommissioned; the platform is the single system of record for NWAi.

#### Optional: Advanced Capabilities (open-ended)
- Custom embeddings on the decisions ledger for deal similarity search
- Optional fine-tuning of LLM models on NWA's IC reasoning
- Advanced agent orchestration (e.g., adversarial review agents)
- Platform licensability validation (architecture review against external angel-group requirements)

**Total arc estimate:** V1 ships in 30–45 days at minimum substrate scope. V2 completes per-group rollout within +3 months (~4 months from V0 kickoff). V3 + Beyond-V3 (full parity, Dealum decommission, hardening) extends the engagement to ~12–18 months total. The earlier engagement framing cited $150K–$500K for an MVP intelligence layer; full platform parity is a larger number.

---

## 11. Open Architectural Decisions (You Propose On)

You will propose on these in V0 (the discovery + architecture proposal phase). The brief is intentionally agnostic.

| Decision | Considerations |
|----------|----------------|
| AI runtime | LangGraph / Anthropic Workbench / OpenAI Assistants / custom — see Section 5.4 |
| Web framework | Next.js / Remix / SvelteKit / Rails / Django / something else |
| Hosting | Vercel / AWS / GCP / Render / Railway / self-hosted |
| Database | Postgres (recommended) / MySQL / something else |
| Vector store | pgvector / Pinecone / Weaviate / Qdrant |
| Auth | NWA SSO provider — Google / Auth0 / Clerk / WorkOS |
| Real-time | Pusher / Ably / Supabase Realtime / WebSocket / SSE |
| Document generation | Server-side .docx/.pptx (lift the existing scripts) vs. native HTML→PDF |
| LLM providers | Anthropic primary; OpenAI hedge; abstraction layer |
| Search | Postgres FTS / Algolia / Elastic / Typesense / vector-only |
| Observability | Datadog / Sentry / OpenTelemetry / Logfire / Langsmith |
| Background jobs | BullMQ / Sidekiq / Celery / Trigger.dev / Inngest |
| Document storage | S3 / R2 / GCS |
| Beyond-V3 founder portal auth | Magic link / passwordless / social login — the trust posture matters more than the tech |

Bias toward proven, boring infrastructure. The novel work is the AI orchestration and the substrate (member graph + decisions ledger + learning loop) — everything else should be off-the-shelf. V1 architecture decisions should anticipate the full arc through V2 / V3 / Beyond-V3; redoing the data model later is not acceptable.

---

## 12. Success Criteria

Per phase, "done" means:

| Phase | Done means |
|-------|-----------|
| V0 | Architecture proposal accepted; V1 SOW signed; Dealum overlay contract scoped |
| V1 | TechGroup runs a real deal end-to-end on the new platform in parallel with the existing plugin; the **social deal card is the source of truth**; member writes land in the decisions ledger; routing improves on the next cycle (observable closed loop); DD Report and Memo outputs visually indistinguishable from canonical STL/Synergist references |
| V2 (per-group) | A new deal in any group lands → system identifies top-5 expert members from that group → at least 60% activation rate; activation history is captured |
| V2 (complete) | All 6 NWAi groups operate on the platform; non-Tech group chairs configure their playbook without writing code; Portfolio surface is live |
| V3 | Track 3 proactive sourcing produces at least one new deal entry per quarter via incubator / accelerator / operator-network channels |
| Beyond V3 — Migration Discovery | Migration plan accepted; native intake SOW signed; Dealum data export confirmed complete |
| Beyond V3 — Founder Portal | New deals submitted by founders directly to the platform without Dealum involvement |
| Beyond V3 — Native CRM | A complete deal moves Inbox → Memo entirely on the platform with no Dealum involvement |
| Beyond V3 — Cutover | All NWAi groups operate fully on the platform; Dealum is read-only and being decommissioned |
| Beyond V3 — Decommission | Dealum subscription cancelled; platform is sole system of record; SOC 2 audit prep complete |
| Beyond V3 — Advanced | Architecture has passed external review for licensability to at least one external angel group |

---

## 13. References (Map of Source Material)

| Artifact | Path | Read for |
|----------|------|----------|
| **GUT v1.0 (canonical)** | `docs/strategy/foundational/NWAi-Grand-Unifying-Theory-v1.0.md` (+ `.html`) | Canonical strategic + architectural posture: Substrate-and-Activations, V1/V2/V3 |
| **V1 Platform Reference (visual)** | `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Reference-v1.0.html` (+ `.md`) | Visual architectural reference with build-state map |
| **V1 Platform Overview (distilled)** | `docs/reference/NWA Investment Intelligence Platform/NWAi-Investment-Intelligence-Platform-Overview-v1.0.html` (+ `.md`) | 2-page landscape companion |
| Rough draft outline | `docs/strategy/foundational/NWAi-Architectural-Reference-Outline-v0.1.md` | Scope-discovery outline for the eventual full spec |
| Current architecture (runtime spec) | `nwai-techgroup-pipeline-architecture.md` | The 6-layer plugin runtime |
| Plugin source (agents/commands/skills) | `.claude/` | Agent prompts, command workflows, framework references |
| Demo (IA input) | `demo/` | Information architecture, UX patterns, route inventory, seed data shape |
| Strategic context | `docs/strategy/` | Vision, member intelligence feature inventory, Strategic Reframe predecessor |
| Group playbook intake | `docs/group-intake/` | Per-group configuration schema (TechGroup reference + blank template) |
| Agent roster | `docs/reference/NWAi TechGroup/Pipeline Agents/agent-team-reference.md` | Per-agent role, frameworks, output format, downstream consumers |
| TechGroup pipeline reference (historical) | `docs/reference/NWAi TechGroup/NWAi-TechGroup-Pipeline-Reference.{html,pdf}` and `NWAi-TechGroup-Platform-Overview.{html,pdf}` | Historical record of Track 1 pipeline (pre-substrate) |
| DD Report canonical reference | `scripts/dd-report-generator.js` + sample at `deals/active/Summit Technology Laboratory/Reports/STL-NWAi-DD-Report-2026-03-19.docx` (under NDA) | Binding visual format for DD Report .docx output |
| Memo canonical reference | `.claude/skills/nwai-investment-framework/references/memo-format-reference.md` | Binding visual format for 4-slide Memo .pptx |
| CLAUDE.md | `CLAUDE.md` (workspace root) | NWAi investing voice, behavioral guardrails, terminology — the system prompt of the current Claude-based system |

---

## 14. Engagement Logistics

- **Confidentiality:** NDA before kickoff. Deal data, member roster, and decisions ledger are confidential.
- **Primary stakeholder:** Jamie Allison (NWA Board Director, TechGroup Co-Chair). Single decision-maker for scope and architecture.
- **Secondary stakeholders:** Ron Tarro (NWA President) for strategic alignment; TechGroup Co-Chair for framework fidelity; group chairs as their playbooks come online; Investment Committee for IC-workflow validation.
- **Iteration model:** V0 (discovery + architecture proposal) and the Beyond-V3 migration discovery are collaborative. Other phases are SOW-scoped against acceptance criteria. Expect framework refinement during the engagement — the Claude plugin will continue to evolve in parallel and is the rapid-prototyping layer for new framework iterations.
- **Plugin as living spec:** When the brief and the artifacts disagree, the *current* plugin behavior is the spec. Validate against live plugin runs (on any of the three first-class surfaces — Claude Desktop, Claude Code CLI, Cowork) when in doubt.
- **Phase boundary discipline:** V2 begins once V1 is in production and TechGroup has run a real deal end-to-end. Beyond-V3 work begins only after V1 + V2 + V3 are validated for at least one full IC cycle. The temptation to compress timelines is real and should be resisted — substrate first, activations next, replacement last.
- **Developer-member context:** This engagement is structured as a developer-member partnership — you join NWA as an advisory member to learn angel investing while building the platform. You are inside the substrate you are building. The arrangement is documented in the GUT v1.0's closing principle on AI-native construction.

---

## 15. The One Thing You Should Not Get Wrong

Build the **Track 2 substrate** correctly from V1, even if minimum V1 features don't depend on every substrate component. Architect the data model so member expertise tags are first-class, decisions are append-only, every AI agent run writes to the ledger, sensors are catalogued, and the learning loop is observable. **The moat is the substrate** — bolting it on later means rewriting the foundations, and every later transition (V2 multi-group expansion, V3 Track 3 activation, Beyond-V3 Dealum decommission) becomes much harder if the substrate is wrong.

Everything else — the AI runtime choice, the web framework, the hosting — is reversible. The substrate compounds; it's worth getting right on day one. This is GUT v1.0's central sequencing argument: **substrate before activations.**

---

*NWAi Investment Intelligence — Enterprise Build Brief | v1.1 — vocabulary refreshed to GUT v1.0 conventions | May 2026*
*V1 / V2 / V3 + Beyond-V3 rollout per GUT v1.0. Original v1.0 framing (Phase A / Phase B) superseded but preserved in spirit as the implementation-depth pass on top of V1's substrate ship.*
*Distribution: under NDA only. Companion artifacts: GUT v1.0 + V1 Platform Reference + V1 Platform Overview + rough draft outline + `demo/` + `.claude/` + `docs/strategy/` + `docs/group-intake/` + `nwai-techgroup-pipeline-architecture.md`.*
