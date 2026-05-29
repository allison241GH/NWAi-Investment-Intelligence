# NWAi Pipeline vs. RaiseLink — Executive Brief
**April 2026 | For internal use | Source: Conversations with Chris Houghtaling, Rounds 2 & 3**

---

## 1. Platform Comparison at a Glance

| Dimension | NWAi Investment Intelligence Pipeline | RaiseLink |
|-----------|--------------------------------------|-----------|
| **Core function** | AI-powered deal intelligence — research, score, and analyze deals through a 7-stage pipeline | Investor-startup matching platform — structured intake, weighted profile matching, committee scoring |
| **Primary user** | Deal leads and IC members evaluating active deals | Investors and accelerators managing application intake |
| **AI / intelligence** | Yes — research agents, scoring rubrics, market/competitive/technical analysis | No — pre-AI; rules-based matching engine |
| **Data source** | External web research + Dealum CRM + uploaded deal materials | Structured data entered directly by investors and startups into the platform |
| **Matching logic** | NWAi-defined criteria applied by agents (criteria = binary + scored gates) | Bidirectional weighted profile matching (5-star importance per criterion, millions of configurations) |
| **Output** | Scout reports, DD packages, DD Reports, investment memos | Ranked inbox, alignment scores, auto-generated exec summaries, committee scoring |
| **Team assessment** | Credential research + structured quality scoring (Founder-Market Fit, Execution Evidence, Dynamics) | LinkedIn profiles embedded; team quality factored into committee scoring |
| **Learning / feedback loop** | Not yet built — outcome tracking identified as next priority | Designed (Stage 4) but never built — LLM that refines investment thesis from outcome patterns |
| **Stage in journey** | Working MVP, scaling to enterprise with Coditect | Hibernated — IP and methodology intact with Chris |

**Bottom line:** RaiseLink handled the *intake and filtering* problem with structured matching. NWAi handles the *intelligence and analysis* problem with AI agents. They were designed to solve sequential stages of the same workflow — not the same problem.

---

## 2. Building Blocks & Stack

**NWAi Investment Intelligence Pipeline**
- **Intelligence layer:** Claude (Sonnet) via Cowork/Claude Code — 7 AI agents (pipeline-monitor, team-analyst, market-analyst, competitive-positioning-analyst, technology-analyst, financial-analyst, risk-analyst)
- **Command layer:** 8 pipeline commands (`/screen`, `/scout`, `/diligence`, `/post-meeting`, `/dd-report`, `/decision`, `/memo`, `/sync-pipeline`)
- **Framework layer:** 9 reference documents (gates & flags, scout questions, diligence rubrics, DD checklist, AI moats framework, DD report format, memo format, diligence analysis framework, scoring methodology)
- **CRM integration:** Dealum via bidirectional MCP — deals flow in, intelligence and stage updates write back
- **Context layer:** CLAUDE.md — investing philosophy, criteria, behavioral rules, pipeline definitions
- **Infrastructure:** Currently desktop-dependent (Cowork); scaling to always-on cloud via Coditect partnership

**RaiseLink**
- **Matching engine:** Dual-profile weighted scoring — investor criteria profile + startup submission profile; 5-star importance weighting per dimension; two-score inbox (% alignment + 5-star gate flag)
- **Intake layer:** Forced structured startup submissions — character-limited fields covering team, problem/solution, business model, TAM/SAM/SOM, competitive chart, financials; auto-generated one-page exec summary
- **Pipeline tracker:** Kanban-style stage pipeline with timestamps
- **Committee scoring:** Multi-member scoring module (partially built); individual scores with attribution
- **Methodology layer:** Go-to-market evaluation workbook — standalone framework product ($7K standalone sale); planned for automation into the platform
- **Infrastructure:** Web app (hibernated); David Hartman's team built; API export to Excel for scoring data

---

## 3. Expanding the NWAi Pipeline with RaiseLink Modules — Considerations

Three tiers of expansion, ordered by value and feasibility:

**Tier 1 — Near-term, high leverage (no platform build required)**

- *Weighted importance scoring on intake criteria:* Replace binary AutoKill gates with a weighted importance model (hard requirement vs. strong preference vs. nice-to-have). More nuanced than pass/fail; reduces false kills on deals that fail a soft criterion. Can be implemented as a refinement to the Triage scoring rubric.
- *Workbook methodology into Scout/Diligence frameworks:* Chris's go-to-market evaluation workbook is a structured assessment framework that predates the pipeline. Acquiring access to it could meaningfully strengthen the Scout and Diligence rubrics — it's what he was going to automate into RaiseLink's AI layer.
- *Dual score display (already implemented):* Thesis Fit Score (rule-based) vs. Intelligence Conviction Score (AI-derived) now appear side by side in Scout output. Divergence is flagged and interpreted. This is directly from RaiseLink's Stage 3 design.

**Tier 2 — Medium-term, requires DLM or intake enhancement**

- *Structured startup intake form:* RaiseLink's key insight — character-limited, standardized submission fields produce scannable, comparable data that AI can analyze cleanly. Current DLM intake is looser. A structured pre-screening intake form (as a DLM extension or standalone) would improve ground truth quality for all agent research.
- *Committee scoring aggregation:* RaiseLink built multi-member scoring with attribution. NWAi's 7-member TechGroup currently debates deals verbally. A lightweight structured scoring interface — even a simple form — would surface individual member conviction scores, track them over time, and create a richer signal for the learning engine.

**Tier 3 — Long-term, requires outcome data and platform investment**

- *Outcome tracking → learning engine:* RaiseLink's Stage 4 vision: train an LLM on NWA's own investment history and outcomes to produce recommended changes to the investment thesis. Prerequisite: start tracking outcomes now (invested / passed / exited / written off). In 2–3 years, that data becomes the training signal for a genuinely differentiated, enclosed model — one no other syndicate can replicate.
- *Ecosystem-level scoring:* Chris's "secret sauce" hint — his methodology covers 15–20 participant groups in the innovation ecosystem (accelerators, incubators, government, M&A, not just investors). A pipeline that scores deals against multiple ecosystem participant profiles (not just NWAi's criteria) could serve multiple syndicate types and is the logical foundation for the downstream commercial model.

---

*NWAi Investment Intelligence & AI | Jamie Allison | April 2026*
