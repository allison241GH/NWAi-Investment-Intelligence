# NWAi Investment Intelligence: Cowork Pipeline vs. Enterprise Intelligence Layer
**Comparison Brief — April 2026**
*Prepared by: NWAi Investment Intelligence & AI | Jamie Allison, TechGroup Co-Chair*

---

## Overview

NWAi currently operates its TechGroup deal pipeline through a Claude Cowork-powered workflow — a purpose-built investment intelligence system running on Anthropic's agent infrastructure with a custom plugin and Dealum CRM integration. As deal volume grows and the platform matures, a natural question emerges: **when and whether to build a standalone enterprise-grade intelligence layer to replace or augment the Cowork-based system.**

**Scope clarity:** The envisioned enterprise build is not a full end-to-end deal management platform. Dealum remains the system of record for deal tracking, pipeline stages, and CRM. The enterprise intelligence layer sits alongside Dealum — it handles all AI-powered analysis, scoring, and report generation, syncs bidirectionally with Dealum, and surfaces its outputs through its own web UI. Dealum's tracking role does not change.

This brief frames the key dimensions of that decision.

---

## Current State: Cowork-Powered Intelligence

The NWAi TechGroup pipeline runs inside the Claude desktop app (Cowork mode) using the `nwai-tech-pipeline` plugin. The plugin connects Claude's AI reasoning to Dealum via MCP server, applies NWAi's proprietary investment frameworks, and produces structured outputs at every stage from Inbox through Investment Memo.

**What it does today:**

- Full pipeline coverage: Inbox → Screening → Scout → Diligence → DD Report → Decision → Memo
- AI-native screening (AutoKill gates), Scout assessments, and DD report generation using NWAi frameworks
- Live Dealum sync via MCP server — reads pipeline state, writes back decisions and tags
- Structured deal outputs: scored reports, investment memos, kickoff packages
- Dual-lens analysis (Structural Discontinuity + Memory Lock-in) applied consistently at every stage
- Iterable in real time — framework updates take effect immediately without a release cycle

**Current constraints:**

- Single primary user experience (desktop app, not multi-user web)
- Dependent on Claude Cowork availability and Anthropic infrastructure
- No custom UI — interface is conversational, not dashboard-based
- Limited role-based access control and audit logging
- Plugin architecture caps at the MCP/agent layer — no proprietary data store or model fine-tuning

---

## Future State: Enterprise Intelligence Layer

The enterprise build is a **purpose-built AI intelligence service** that handles all analytical work in the deal pipeline — screening, scoring, assessment, and report generation — while Dealum continues to own deal tracking, stage management, and CRM. The intelligence layer syncs bidirectionally with Dealum and surfaces its outputs through a dedicated web UI.

**Architecture:**

- **Dealum** — remains source of truth for deal tracking, pipeline stages, contacts, and CRM data
- **Intelligence Layer** — owns AI analysis, scoring, structured outputs, and enriched deal history
- **Sync** — bidirectional: intelligence layer reads deal state from Dealum, writes back scores, tags, and status updates
- **Web UI** — dedicated interface for report viewing, team collaboration, and IC workflows (not a Dealum replacement)

**What it would add over Cowork:**

- Multi-user web access with role-based permissions (deal leads, SMEs, IC members, board observers)
- Persistent, enriched data store: deal scores, analysis history, framework outputs — owned by NWAi, independent of Anthropic session state
- Structured audit trail and compliance logging for all AI-generated assessments
- Potential for model fine-tuning or retrieval-augmented generation on NWAi's historical deal outcomes
- Architecture designed for eventual licensing to other angel groups or family offices
- Always-on availability — not dependent on desktop app sessions or Cowork uptime

**What it costs:**

- Build timeline: 6–12 months for an MVP intelligence layer (narrower scope than a full platform)
- Engineering investment: $150K–$500K depending on team structure and scope (significantly lower than a full end-to-end platform build)
- Ongoing: hosting, AI API costs, maintenance, security
- Risk: re-implementing framework fidelity, Dealum API dependency, feature creep toward full platform

---

## Side-by-Side Comparison

| Dimension | Cowork Intelligence (Current) | Enterprise Intelligence Layer (Future) |
|---|---|---|
| **Deal tracking** | Dealum (via MCP sync) | Dealum (unchanged — still source of truth) |
| **Time to value** | Already delivering | 6–12 months to MVP |
| **Cost** | Low (Anthropic subscription + dev time) | Moderate ($150K–$500K build) |
| **Iteration speed** | Hours — framework updates live immediately | Days to weeks per release cycle |
| **AI capability** | State-of-the-art via Anthropic (Claude Sonnet/Opus) — always current | Built on foundation models; can pin versions or fine-tune |
| **Multi-user** | Limited (desktop app) | Full — role-based access for entire IC and deal team |
| **Web UI** | None — conversational interface | Dedicated UI: report viewer, IC workflows, team collaboration |
| **Data ownership** | Outputs in workspace; session-bound | Proprietary enriched data store — owned by NWAi, persists independently |
| **Auditability** | Session transcripts; limited structured logging | Full structured audit trail, compliance-ready |
| **Scalability** | Single user, single group today | Multi-user, multi-group; architecture supports licensing |
| **Licensing / IP value** | Plugin distributable within Cowork ecosystem | Intelligence layer IP owned by NWAi — licensable to other groups |
| **Framework fidelity** | 100% — frameworks live in plugin, applied consistently | Requires careful re-implementation and validation |
| **Infrastructure dependency** | Anthropic / Cowork uptime | Self-hosted or cloud-hosted — independent of Cowork |

---

## The Core Trade-off

The Cowork intelligence layer delivers **high-fidelity AI deal analysis now**, at low cost, with near-zero build lag. Its constraints are session-bound state, single-user access, and dependency on Anthropic's desktop infrastructure. The enterprise intelligence layer delivers **multi-user access, owned data, persistent history, and long-term IP value** — while keeping Dealum in its current role, which avoids the cost and risk of replacing proven CRM infrastructure.

The narrower scope of the intelligence-layer build (vs. a full platform) meaningfully reduces cost and timeline risk, and it eliminates the most complex problem — deal tracking and CRM — by leaving it in Dealum where it already works.

The risk of premature build is still real: rebuilding what Cowork already does well before the deal volume or multi-user need justifies it would divert resources from the core investment mission.

---

## Recommended Path

**Don't choose one or the other — sequence them.**

The right approach is a **staged transition**:

1. **Now → 12 months:** Run the full pipeline on Cowork. Harden the frameworks. Build deal history across TechGroup and begin extending to other NWA groups. Use this period to define the intelligence layer's data schema and Dealum sync contract based on real usage patterns — not hypothetical requirements.

2. **12–18 months:** If multi-user need, deal volume, or licensing opportunity justifies it, begin intelligence layer build in parallel — using the Cowork pipeline as the live specification. The NWA × Coditect partnership is the natural vehicle for this phase. Cowork continues to operate during build.

3. **18–24 months:** Migrate primary workflow to the enterprise intelligence layer once it achieves parity with the Cowork system. Retain Cowork as a rapid prototyping layer for framework iteration — its low-friction update cycle remains valuable even after migration.

This sequencing preserves current momentum, reduces build risk, and ensures the enterprise intelligence layer is built to a proven spec rather than a hypothetical one. Critically, it also means Dealum's role never needs to be revisited — the intelligence layer is additive, not a replacement.

---

*This document is intended as an internal strategic reference and a foundation for stakeholder conversations about the NWAi Investment Intelligence platform roadmap.*
