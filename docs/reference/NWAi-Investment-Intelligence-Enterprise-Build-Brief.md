# NWAi Investment Intelligence — Enterprise Build Brief

**Audience:** Freelance developer scoping an engagement to build the multi-user, web-based Investment Intelligence Platform that replaces the current Claude Cowork–based workflow.
**Author:** Jamie Allison, NWA Board Director — Investment Intelligence Platform & AI; TechGroup Co-Chair
**Companion artifacts you also receive:**
- `demo/` — Next.js IA preview (the visual + UX spec)
- `.claude/` — current plugin runtime (agents, commands, skills, frameworks)
- `nwai-techgroup-pipeline-architecture.md` — current runtime architecture
- `docs/strategy/` — vision and strategic context
- `docs/group-intake/` — per-group playbook intake (TechGroup reference + blank template)
- `docs/reference/agent-team-reference.md` — agent roster and roles

**This brief is not the spec.** It's the navigation layer + implementation gaps + non-functional requirements that the artifacts above don't make obvious. Treat the demo as the IA ground truth and the plugin source as the runtime ground truth — this brief tells you what's missing and what to propose on.

**Confidentiality:** NDA is required before this engagement starts. Assume the contents of this folder are confidential.

---

## 1. Context & Vision

### The one-sentence theory

> **NWA converts syndicate-scale human expertise into investment conviction — faster, sharper, and with more judgment depth than any individual, firm, or filtering algorithm can.**

NWA = New World Angels — an angel investment syndicate of ~200 members organized into 6 domain-specialized investment groups (TechGroup, MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup). The platform you're being asked to build converts that human expertise into structured, auditable, AI-scaffolded investment conviction at scale.

### Read these before you scope

| Document | What it tells you |
|----------|-------------------|
| `docs/strategy/NWAi-Grand-Unifying-Theory-v0.1.md` | The Four Tracks (Sourcing, Member Intelligence, Diligence & Memo, Syndication) and the Three Layers build/integrate posture |
| `docs/strategy/cowork-vs-enterprise-platform.md` | Strategic comparison between the current Cowork-based system and an enterprise intelligence layer. **Note:** this doc framed the build as Dealum-additive only. The current scope (Phase A + Phase B in this brief) extends beyond that framing — see Section 2. |
| `docs/strategy/Member_Social_Intelligence_Layer_V1_Features.md` | The Member Intelligence "moat" feature inventory |
| `docs/strategy/NWAi-Strategic-Reframe-Reference.md` | Strategic positioning vs. solo angels, VCs, and generic AI screening platforms |

You will not need to re-justify the build. The strategic case is settled. Your job is to design and deliver the implementation.

---

## 2. Scope of This Engagement — Two Phases

This is a **two-phase engagement.** The phases are sequential and the boundary between them is intentional — it lets NWA validate the intelligence layer in production before committing to a full Dealum replacement.

### Phase A — Intelligence Additive Layer (alongside Dealum)

The intelligence layer is built **as an additive surface alongside Dealum.** Dealum remains the system of record for deal tracking, applications, contacts, and CRM. The platform owns AI analysis, scoring, document outputs, member intelligence, portfolio visualization, and IC workflows. Sync with Dealum is bidirectional and Dealum-led.

**Phase A scope:**
- Multi-user web app for the 7-stage deal pipeline (Inbox → Memo) — collaborative analysis surface, not deal tracking
- AI agent orchestration (replaces Claude Code as the runtime for the 9 agents)
- Member Expertise Graph + Decisions Ledger (the proprietary substrate)
- Multi-group support (all 6 NWAi groups, single multi-tenant system)
- Document generation (DD Report .docx, Investment Memo .pptx)
- Portfolio surface (current investments + member co-investors + board seats)
- Ecosystem signals (incubator, spinout, operator network, thematic reports)
- Bidirectional Dealum sync
- IC workflows (collaboration, voting, audit trail)

This phase aligns with the strategy doc's "intelligence layer alongside Dealum" framing. The strategy doc cites $150K–$500K and 6–12 months for an MVP at this scope; full Phase A across all 6 groups is a larger number.

### Phase B — End-to-End Platform (replaces Dealum)

Once Phase A is in production and proven, the platform expands to **absorb the functions Dealum currently performs** and decommission Dealum entirely. After Phase B, NWAi runs on a single integrated platform — there is no Dealum.

**Phase B scope:**
- Native deal intake (founder application form, deal-room creation, document upload)
- Native pipeline state ownership (the platform IS the source of truth for deal stage, not a sync target)
- Native CRM (contacts, founders, members, investors, advisors, all unified)
- Native member directory and group management (Dealum's member list folded into the Expertise Graph)
- Native deal-room document storage with role-scoped access
- Native communication history (founder correspondence, member comments, IC discussion threads)
- Native tagging, categorization, search
- Native reporting and analytics
- Native member application + onboarding workflow
- Dealum migration tooling (one-time export + ongoing reconciliation during cutover)
- Eventual Dealum decommission

**Phase B is a substantial engineering project on top of Phase A.** It includes everything Dealum does today plus the integrations Phase A built around Dealum (some of which become internal subsystems instead of external syncs).

### What is explicitly out of scope across both phases

- **Cap table / fund admin / accounting.** AngelList, Carta, Sydecar, Allocations, and Visible cover this layer (per the GUT's "Layer 1 — Deal Ops, Integrate" posture). Do not rebuild.
- **The Claude Cowork plugin itself.** The current plugin remains the rapid-prototyping layer for framework iteration even after this build is live. Cowork is not a runtime dependency of the new system; it's a separate iteration surface for Jamie/Ron.
- **Foundation model training.** Use existing LLM provider APIs. Fine-tuning on NWA's historical decisions is an *option* in Phase B's later sub-phases, not a requirement.

### The key scope contrast (memorize this)

| Concern | Phase A | Phase B |
|---------|---------|---------|
| **Deal tracking source of truth** | Dealum | The platform |
| **Application intake** | Dealum (founders submit there) | The platform (founders submit here) |
| **Member directory** | Mirror from Dealum + enrich with expertise graph | Native — Dealum decommissioned |
| **Sync surface** | Bidirectional Dealum API | None — Dealum is gone |
| **CRM** | Dealum | The platform |
| **AI analysis, scoring, docs** | The platform | The platform |
| **Document generation** | The platform | The platform |
| **Member intelligence** | The platform | The platform |

Phase A is the **additive intelligence layer**. Phase B is the **full system replacement**. Architecture decisions in Phase A should anticipate Phase B — design the data model so Dealum's role can be retired without a re-platform.

---

## 3. Current State — The Reference Map

To understand what you're replacing in Phase A and absorbing in Phase B, you'll be reading three things in this order:

### 3.1 The plugin runtime — `nwai-techgroup-pipeline-architecture.md`

Read the architecture file end-to-end. It describes a 6-layer system:

1. **Data Source** — currently filesystem-first (`deals/active/<Company>/`), with Dealum API integration deferred but architected
2. **Pipeline Stages** — 7 stages from Inbox to Memo
3. **Commands** — 8 workflow files in `.claude/commands/` (sync-pipeline, screen, scout, diligence, post-meeting, dd-report, decision, memo)
4. **Agents** — 9 research/analysis agents in `.claude/agents/` (see `docs/reference/agent-team-reference.md` for the roster)
5. **Skills** — 1 reference-document bundle in `.claude/skills/nwai-investment-framework/references/` (10 framework files)
6. **Session Context** — `CLAUDE.md` (workspace root) loads automatically and defines the analyst voice, guardrails, and behavioral defaults

In Phase A, Layer 1 becomes a real database with a Dealum sync worker. In Phase B, the database is the source of truth and the sync worker is removed. Layers 2–6 collapse into a managed AI runtime + a standard web stack in both phases.

### 3.2 The IA spec — `demo/`

The Next.js demo is the **information architecture and UX ground truth** for Phase A. Routes:

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

Phase B adds new surfaces that the demo does not currently render: founder application form, deal-room ingestion, native deal creation, member application/onboarding, contact CRM, communication history, native admin/tags/search.

Demo seed data lives in `demo/data/` as static JSON. The demo's data shape is *not* the production schema — it's enough to render the IA. Section 7 sketches the production data model (which extends naturally from Phase A to Phase B).

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

1. Group identity (name, Dealum tag in Phase A / native group key in Phase B, chair)
2. Funnel calibration (optional)
3. Track determination (optional — supports 1, 2, or N tracks per group)
4. Opportunity rubric (per track — 6 dimensions × 0–5)
5. Group-specific filters / flags / caps
6. Defensibility / moat lens
7. Themes & SMEs
8. Group-specialist agent (optional)

Architect the system so adding a new group is **a configuration change**, not a code change. Group selection is initially declared at command time; long-term (and natively in Phase B), it's inferred from the deal's group field on intake.

### 4.2 The seven pipeline stages as web workflows

Each stage has a Cowork-mode command today (`/screen`, `/scout`, `/diligence`, `/post-meeting`, `/dd-report`, `/decision`, `/memo`). In the platform each stage is a **collaborative workspace** with:

- A canonical artifact (Triage Report, Scout Assessment, DD Kickoff Package, post-meeting reconciliation, DD Report, Decision Record, Memo)
- A scoring layer (the relevant rubric — auto-applied by AI, editable by humans)
- A collaboration layer (comments, mentions, voting where applicable)
- An audit layer (every AI assessment, score change, and human action logged)
- A document export (DD Report → .docx, Memo → .pptx)
- A pipeline-state mutation (in Phase A: written to Dealum via API sync; in Phase B: written natively)

Roles that interact with each stage:

| Role | Permissions |
|------|-------------|
| **Member** | View deals matched to expertise; comment; submit input; vote at IC |
| **SME** | All Member rights; lead-author DD checklist sections; sign off on technical/regulatory analysis |
| **Deal Lead** | All SME rights; advance pipeline state; assign DD work; initiate stage transitions |
| **Group Chair / Co-Chair** | All Deal Lead rights; configure group playbook; approve advances; final IC recommendation |
| **Admin / Platform Owner** | All rights; user management; cross-group analytics; integration management; audit access |
| **Board Observer** | Read-only across groups |
| **Founder** *(Phase B only)* | Submit application; view limited status of own deal; respond to founder questions |

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

Phase B adds:
- **Founder portal** — application submission, status visibility, document upload, response to founder questions
- **Member onboarding** — new-member application + chair approval + role assignment workflow
- **Native deal-room** — document upload by founder + tagged access scopes (founder-only / deal-team / group / platform-admin)

---

## 5. The AI / Agent System

This is the largest architectural decision of the engagement and is identical across Phase A and Phase B. The current plugin uses Claude Code (a CLI orchestration runtime) to launch 9 agents, each defined as a Markdown file with a system prompt + tool list + output format. The platform needs a managed AI runtime that does the same thing — multi-user, persistent, observable.

### 5.1 The 9 agents

Read `docs/reference/agent-team-reference.md` for the full roster. Summary:

| Agent | Role | When |
|-------|------|------|
| `pipeline-monitor` | Live pipeline snapshot from Dealum (Phase A) / native (Phase B) | Session startup, /sync-pipeline |
| `company-researcher` | Team-first PMTF analysis + founder claim verification + commitment depth | Scout + Diligence |
| `market-analyst` | Structural Discontinuity test + TAM/SAM/SOM + market timing | Scout + Diligence |
| `competitive-intelligence` | Competitor mapping + incumbents + moat input | Scout + Diligence |
| `technical-diligence` | Thin wrapper detection + TRL + IP/patents + AI moat signals | Scout (light) + Diligence (full) |
| `risk-assessor` | Regulatory + exit + execution + financial risk | Scout (light) + Diligence (full) |
| `pricing-analyst` | Pricing maturity + unit economics + channel pressure | Diligence Stage 2A (parallel) |
| `forecasting-analyst` | Independent 5-yr forecast (McMurry method, "no AI slop" rule) | Diligence Stage 2B (sequential) |
| `venture-analyst` | Valuation, IRR / hurdle test, deal structure | Diligence Stage 2B (final synthesis) |

**The orchestration topology matters.** Diligence runs Stage 2A's 6 agents in parallel, then Stage 2B's 2 agents sequentially because each consumes the upstream output. Your runtime needs to support both parallel and sequential agent chains, with shared state.

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

## 6. The Member Expertise Graph + Decisions Ledger — The Moat

Per the GUT, this is the unifying substrate that makes NWA uniquely NWA. It is the **single asset that no vendor can sell us and no competitor can copy**: 200+ members' tagged expertise plus 20+ years of indexed deal decisions, DD outcomes, and investment rationale.

### What it contains

- **Member profiles** — expertise tags (multi-dimensional: domain, function, industry, role-type, geography, language), sector preferences, past investments, NWA tenure, engagement history, board seats, warm-contact graph
- **Expertise activation history** — every time a member was matched to a deal, whether they engaged, how fast, the quality of their input, and the IC outcome
- **Decisions ledger** — every IC vote, the reasoning, the dissenting views, the final outcome, the venture-analyst's hurdle-test verdict, and (over time) the realized outcome (exit, write-off, hold)
- **Framework outputs** — every Triage Report, Scout Assessment, DD Report, and Memo, indexed and queryable
- **Cross-deal pattern recognition** — "this deal looks like Synergist 2025" — surfaced by similarity search over the indexed history

### Why it's the moat

A competitor can copy the rubrics, the agent prompts, even the AI orchestration. They cannot copy 20 years of member expertise activation patterns and indexed IC reasoning. **Architect this substrate first** — it should not be bolted on in Phase A.4 or Phase B.

### Architectural implications

- The member directory is not a CRUD app; it's a **graph** with vector embeddings on expertise tags + sector preferences for similarity matching
- The decisions ledger is **append-only** — never delete, never edit-in-place; corrections are new records that supersede prior ones
- Every AI agent's output writes to the ledger automatically; humans append commentary
- The matching engine is a *first-class citizen*, not an afterthought — it touches sourcing, member intelligence, and DD team assembly
- The graph survives the Phase A → Phase B transition unchanged; only Dealum-specific identifiers shift to native ones

Read `docs/strategy/Member_Social_Intelligence_Layer_V1_Features.md` for the V1 feature inventory.

---

## 7. Data Model (Sketch)

This is a starting point. You will refine it in Phase A.0 discovery and again in Phase B.0 migration discovery. The schema is designed to extend naturally from Phase A to Phase B — Phase B mostly adds new entities and removes the Dealum-sync attributes from existing ones.

### Phase A core entities

| Entity | Key Attributes | Notes |
|--------|----------------|-------|
| `Group` | id, name, acronym, dealum_tag, chair_id, co_chair_id, playbook_version | One per NWAi group (6) |
| `Track` | id, group_id, name, definition, opportunity_rubric_id | Optional — groups may have 1, 2, or N |
| `OpportunityRubric` | id, track_id, version, dimensions (jsonb: 6 × {name, anchors[6], sub_floor}) | Versioned per group/track |
| `Filter` (cap/flag) | id, group_id, name, test_logic, cap_effect, applies_at_stages | Group-specific filters per Section 5 of intake |
| `Theme` | id, group_id, name, definition, lead_id, sme_ids[] | 5–8 per group |
| `Deal` | id, dealum_id, group_id, track_id, theme_id, current_stage, current_scores (jsonb), submitted_at, last_advanced_at, last_synced_from_dealum_at | Phase A: mirrors Dealum + adds intelligence-layer state |
| `Stage` | enum: inbox, screening, scout, diligence, dd_report, decision, memo | Pipeline state machine |
| `Report` | id, deal_id, type, version, framework_version, ai_outputs (jsonb), human_overrides (jsonb), exported_to (path[]) | Versioned, append-only |
| `Score` | id, report_id, dimension, score, ai_rationale, human_override_rationale, framework_version | Per-rubric-dimension |
| `Member` | id, name, email, dealum_member_id, group_ids[], roles_per_group (jsonb), expertise_tags[], sector_preferences[], geography, joined_at | Phase A: mirrors Dealum + adds expertise graph |
| `ExpertiseTag` | id, name, category, embedding (vector) | Semantic search |
| `Activation` | id, deal_id, member_id, matched_at, responded_at, response_quality, ic_outcome | The ledger of who-engaged-when |
| `Vote` | id, deal_id, member_id, verdict (invest/pass/watch), rationale, dissent_flag, cast_at | IC vote audit |
| `PortfolioCompany` | id, deal_id (fk), invested_at, member_investor_ids[], board_seats[], status | Tracks active investments |
| `EcosystemSignal` | id, source, payload (jsonb), tagged_groups[], created_at | Phase A.4 sourcing |
| `Document` | id, deal_id, type, format, version, storage_uri, generated_by, generated_at | Document store |
| `AuditEvent` | id, actor_id, action, entity_type, entity_id, payload (jsonb), at | Append-only |
| `Comment` | id, entity_type, entity_id, author_id, body, mentions[], at | Threaded |
| `AgentRun` | id, deal_id, agent_name, stage, input (jsonb), output (jsonb), tokens, latency_ms, cost, status, started_at, completed_at | Observability |

### Phase B additional entities

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

### Phase A — required

| Integration | Purpose | Notes |
|-------------|---------|-------|
| **Dealum** | CRM source of truth — bidirectional sync | API access required. Currently deferred (April 2026). Contracted access approval needed before Phase A.1 begins. The plugin's `dealum_server.py` and the 5 tool definitions (list_applications, get_application, update_application, list_members, create_application) are dormant but architected. |
| **Auth / SSO** | NWA member identity | Likely Google Workspace SSO; member roster currently in Dealum. Propose a provider. |
| **LLM provider(s)** | Agent execution | Anthropic primary, OpenAI hedge. Multi-provider abstraction recommended. |
| **Document storage** | DD Reports, Memos, deal-room files | S3 or equivalent; signed-URL access |
| **Email** | Notifications + activations | Transactional only (SendGrid, Postmark, SES) |

### Phase A — added during sub-phases

| Integration | Purpose |
|-------------|---------|
| **Calendar** | Live Pitch + DD meetings (Google Calendar or Outlook) |
| **Slack** | Optional notification surface |
| **Affinity / Carta / AngelList / Visible** | Read-only deal-ops layer enrichment (per Layer 1 "integrate" posture) |
| **Public web** | Agents already use WebSearch/WebFetch — your runtime needs equivalent |

### Phase B — divestments and additions

- **Dealum sync** is removed. Dealum is decommissioned. Member roster, deal data, and contact data have been migrated to native storage.
- **Native email handling** expands — founder communication, IC discussion threads, member applications.
- **Document intake** becomes first-class — founders upload directly; tagged access scoping is enforced.
- **Calendar** integration extends to founder-facing meetings (founder pitches, DD calls).
- **Optional billing / fund admin integration** stays out of scope (still handled by AngelList / Carta / Sydecar).

### NOT integrated (across both phases)

- Anything that would replace Carta/AngelList/Sydecar for cap table or fund admin
- Cowork itself — the existing plugin remains the rapid-prototyping surface, not a runtime dependency of the new system

---

## 9. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| **Multi-tenant RBAC** | 6 groups × 6 roles, per-group AND per-deal scoping. Cross-group access opt-in. Phase B adds Founder role. |
| **Confidentiality** | Deal data is highly sensitive (cap tables, term sheets, founder financials). Encryption in transit and at rest. No third-party data sharing without explicit consent. |
| **Audit trail** | Append-only log of all AI assessments, scores, votes, decisions, document exports, pipeline-state changes, and (Phase B) all founder communications and member application decisions. SOC 2 readiness as a Phase B late-stage future state. |
| **Document versioning** | Every report has versions; old versions retained indefinitely; framework version stamped on each so historical reports are re-renderable. |
| **Member data export** | Members can extract their personal data (regulatory). Platform admin can extract any deal's full record (operational). |
| **Scale assumptions** | 6 groups × ~300 deals/year × ~200 members total. Concurrent users: low (peak ~50 during IC weeks). Not a scale-driven design. |
| **Availability** | Phase A: high availability during IC weeks (Mon–Fri, 9am–6pm ET). Phase B: similar baseline; founder-facing surfaces require 24/7 uptime since founders submit applications globally. |
| **Performance** | Pipeline + member queries: <500ms p95. Agent runs: minutes are acceptable; surface progress in real-time UI. Document generation: <30 seconds. |
| **LLM cost controls** | Per-deal, per-group, and per-month spend caps. Cost attribution on every agent run. Alerting before caps are hit. |
| **Observability** | Per-agent latency, token spend, error rates, and replay capability. End-to-end pipeline trace per deal. |
| **Backups** | Daily backups of all entities; point-in-time recovery; document store separately backed up. Phase B: Dealum backup snapshots retained for 1 year post-decommission for legal/compliance. |
| **Compliance posture** | SOC 2 readiness as Phase B late-stage future state. GDPR-equivalent data subject rights (member data) from day one. |
| **Migration safety (Phase B)** | Dealum decommission only after 30+ days of dual-running where the platform mirrors Dealum perfectly. Cutover plan documented; rollback plan documented. |

---

## 10. Phased Build

### Phase A — Intelligence Additive Layer

#### A.0 — Discovery & Architecture Proposal (4–6 weeks)
- Read all referenced artifacts; spend ~1 week shadowing live Cowork sessions
- Interview Jamie (primary), TechGroup co-chair, ~3 active members, ~1 SME from each non-Tech group as their playbook intakes return
- Validate the data model in Section 7 against real deal records under NDA
- Propose the AI runtime, hosting, auth, real-time, and storage stack
- Propose the Dealum sync contract (after API access is approved)
- Deliver: Architecture Proposal + Phase A.1 SOW + estimated total Phase A cost and timeline

#### A.1 — Pipeline + Diligence MVP for One Group (TechGroup) (3–4 months)
- Auth + multi-tenant skeleton (architected for 6 groups even though only TechGroup is enabled)
- Pipeline stages (Inbox → Memo) for TechGroup deals
- All 8 commands implemented as web workflows
- All 9 agents orchestrated in the chosen runtime (Stage 2A parallel, Stage 2B sequential)
- DD Report (.docx) and Memo (.pptx) generation
- Dealum bidirectional sync
- Basic member directory (no matching yet)
- Framework v2.0 loaded as structured data
- **Acceptance:** TechGroup runs a real deal end-to-end on the new platform in parallel with Cowork; DD Report and Memo outputs visually indistinguishable from canonical references

#### A.2 — Member Expertise Graph + Decisions Ledger (3–4 months)
- Member profile schema with expertise tags + vector embeddings
- Decisions ledger ingest (backfill from prior deal records + ongoing capture)
- Matching engine
- Activation tracking
- DD team auto-assembly
- **Acceptance:** When a deal lands in TechGroup, the system surfaces the top 5 expert members and routes notifications; activation history is captured

#### A.3 — Multi-Group Activation (2–3 months)
- Onboard the other 5 groups using the playbook intake outputs
- Per-group playbook configuration (rubrics, themes, filters, optional specialist agents)
- Cross-group access controls
- Group-level analytics
- **Acceptance:** All 6 NWAi groups operate on Phase A; group chairs configure their playbook without code changes

#### A.4 — Portfolio + Ecosystem (2–3 months)
- Portfolio surface (current investments + member investors + board seats + warm-contact graph)
- Ecosystem signal ingest (incubator, spinout, operator network, thematic reports)
- Cross-syndicate intel feed
- Lead/follow signals on syndicated deals
- **Acceptance:** Sourcing and Syndication tracks (Tracks 1 and 4 from the GUT) live on Phase A

**Phase A total estimate:** ~12–18 months engagement, depending on team composition. Strategy doc cites $150K–$500K for an MVP intelligence layer; full Phase A across all 6 groups is a larger number.

### Phase B — End-to-End Platform (replaces Dealum)

Phase B begins only after Phase A is in production and validated for at least one full IC cycle (typically 60–90 days post Phase A.4 acceptance).

#### B.0 — Migration Discovery (4–6 weeks)
- Audit Dealum data: deals, members, contacts, documents, communications, tags, configurations
- Define the migration-schema mapping from Dealum entities to native Phase B entities
- Define the cutover runbook (dual-running window, validation checks, rollback plan)
- Validate Dealum's API-export completeness (anything missing must be exported manually)
- Deliver: Migration Plan + Phase B.1 SOW + estimated total Phase B cost and timeline

#### B.1 — Native Deal Intake + Founder Portal (3–4 months)
- Founder application form (replacing Dealum's intake form)
- Founder authentication and portal (status visibility, document upload, response to founder questions)
- Native deal-room with role-scoped access
- Native deal creation (without Dealum)
- Dual-running: new deals enter the platform natively; existing deals continue to sync from Dealum
- **Acceptance:** New TechGroup deals can be submitted by founders directly to the platform without touching Dealum

#### B.2 — Native CRM + Pipeline State Ownership (3–4 months)
- Native contacts, founders, members, advisors, investors all unified
- Native pipeline state (the platform IS the source of truth, not a sync target)
- Native communication history (founder correspondence + IC threads)
- Native member directory (Dealum's member list folded into the Expertise Graph natively)
- Native member application + onboarding workflow
- **Acceptance:** A new deal moves Inbox → Memo entirely on the platform with no Dealum involvement

#### B.3 — Migration + Cutover (2–3 months)
- Bulk data export from Dealum (all groups, all historical deals, all members, all documents)
- Schema mapping and ingest into the platform
- Validation: every Dealum deal record is reconciled in the platform
- 30+ day dual-running window where both systems are kept in sync (manually if necessary)
- Cutover: Dealum reads disabled; platform becomes sole source of truth
- Dealum data archived for 1-year compliance retention
- **Acceptance:** All NWAi groups operate fully on the platform; Dealum is read-only; no operational dependency on Dealum

#### B.4 — Dealum Decommission + Hardening (1–2 months)
- Dealum subscription cancelled
- Final compliance archive of Dealum data
- Platform hardening: SOC 2 audit prep, penetration testing, DR plan validation
- **Acceptance:** Dealum is decommissioned; the platform is the single system of record for NWAi

#### B.5 — Optional: Advanced Capabilities (open-ended)
- Custom embeddings on the decisions ledger for deal similarity search
- Optional fine-tuning of LLM models on NWA's IC reasoning
- Advanced agent orchestration (e.g., adversarial review agents)
- Platform licensability validation (architecture review against external angel-group requirements)

**Phase B total estimate:** ~12–18 months engagement after Phase A is in production. Total Phase A + Phase B timeline: ~24–36 months.

---

## 11. Open Architectural Decisions (You Propose On)

You will propose on these in Phase A.0. The brief is intentionally agnostic.

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
| Phase B founder portal auth | Magic link / passwordless / social login — the trust posture matters more than the tech |

Bias toward proven, boring infrastructure. The novel work is the AI orchestration and the expertise graph — everything else should be off-the-shelf. Phase A architecture decisions should anticipate Phase B; redoing the data model at Phase B is not acceptable.

---

## 12. Success Criteria

Per phase, "done" means:

| Phase | Done means |
|-------|-----------|
| A.0 | Architecture proposal accepted; Phase A.1 SOW signed; Dealum API access approved |
| A.1 | TechGroup runs a real deal end-to-end on the platform in parallel with Cowork; DD Report and Memo outputs visually indistinguishable from canonical STL/Synergist references |
| A.2 | A new TechGroup deal lands → system identifies top-5 expert members → at least 60% activation rate; activation history is captured |
| A.3 | All 6 NWAi groups operate on the platform; non-Tech group chairs configure their playbook without writing code |
| A.4 | Portfolio and Ecosystem surfaces are live; cross-syndicate intel feeds at least one new sourcing channel |
| B.0 | Migration plan accepted; Phase B.1 SOW signed; Dealum data export confirmed complete |
| B.1 | New TechGroup deals submitted by founders directly to the platform without Dealum involvement |
| B.2 | A complete deal moves Inbox → Memo entirely on the platform with no Dealum involvement |
| B.3 | All NWAi groups operate fully on the platform; Dealum is read-only and being decommissioned |
| B.4 | Dealum subscription cancelled; platform is sole system of record; SOC 2 audit prep complete |
| B.5 | Architecture has passed external review for licensability to at least one external angel group |

---

## 13. References (Map of Source Material)

| Artifact | Path | Read for |
|----------|------|----------|
| Current architecture (runtime spec) | `nwai-techgroup-pipeline-architecture.md` | The 6-layer plugin runtime |
| Plugin source (agents/commands/skills) | `.claude/` | Agent prompts, command workflows, framework references |
| Demo (IA spec) | `demo/` | Information architecture, UX patterns, route inventory, seed data shape |
| Strategic context | `docs/strategy/` | Vision, build-vs-buy decision, member intelligence feature inventory |
| Group playbook intake | `docs/group-intake/` | Per-group configuration schema (TechGroup reference + blank template) |
| Agent roster | `docs/reference/agent-team-reference.md` | Per-agent role, frameworks, output format, downstream consumers |
| Pipeline / platform overviews | `docs/reference/NWAi-TechGroup-Pipeline-Reference.{html,pdf}` and `NWAi-TechGroup-Platform-Overview.{html,pdf}` | Member-facing visual primers |
| DD Report canonical reference | `scripts/dd-report-generator.js` + sample at `deals/active/Summit Technology Laboratory/Reports/STL-NWAi-DD-Report-2026-03-19.docx` (under NDA) | Binding visual format for DD Report .docx output |
| Memo canonical reference | `.claude/skills/nwai-investment-framework/references/memo-format-reference.md` | Binding visual format for 4-slide Memo .pptx |
| CLAUDE.md | `CLAUDE.md` (workspace root) | NWAi investing voice, behavioral guardrails, terminology — the system prompt of the current Cowork system |

---

## 14. Engagement Logistics

- **Confidentiality:** NDA before kickoff. Deal data, member roster, and decisions ledger are confidential.
- **Primary stakeholder:** Jamie Allison (NWA Board Director, TechGroup Co-Chair). Single decision-maker for scope and architecture.
- **Secondary stakeholders:** Ron Tarro (TechGroup Co-Chair) for framework fidelity; group chairs as their playbooks come online; Investment Committee for IC-workflow validation.
- **Iteration model:** Phase A.0 and Phase B.0 are collaborative discovery. Other sub-phases are SOW-scoped against acceptance criteria. Expect framework refinement during the engagement — the Cowork plugin will continue to evolve in parallel and is the rapid-prototyping layer for new framework iterations.
- **Cowork as living spec:** When the brief and the artifacts disagree, the *current* Cowork plugin behavior is the spec. Validate against live Cowork runs when in doubt.
- **Phase boundary discipline:** Phase B does not begin until Phase A is in production and validated for at least one full IC cycle. The temptation to compress timelines is real and should be resisted.
- **NWA × Coditect partnership context:** Per the strategy folder, there is an existing NWA × AZ1/Coditect alliance for platform co-development. This freelance engagement is independent unless explicitly noted otherwise.

---

## 15. The One Thing You Should Not Get Wrong

Build the **Member Expertise Graph + Decisions Ledger** correctly from Phase A.1, even if no Phase A.1 features depend on it. Architect the data model so member expertise tags are first-class, decisions are append-only, and every AI agent run writes to the ledger. The moat is the substrate — bolting it on later means rewriting the foundations, and the Phase B Dealum migration becomes much harder if the substrate is wrong.

Everything else — the AI runtime choice, the web framework, the hosting — is reversible. The graph and the ledger compound; they're worth getting right on day one.

---

*NWAi Investment Intelligence — Enterprise Build Brief | v1.0 | May 2026*
*Two-phase scope: Phase A (Intelligence Additive Layer alongside Dealum) + Phase B (End-to-End Platform replacing Dealum).*
*Distribution: under NDA only. Companion artifacts in `demo/`, `.claude/`, `docs/strategy/`, `docs/group-intake/`, and `nwai-techgroup-pipeline-architecture.md`.*
