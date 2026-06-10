# NWAi Investment Intelligence Platform — Architectural Reference v1.0

**Companion to the Grand Unifying Theory v1.0.** A visual map of NWAi's substrate-and-activations architecture — what's running today and what V1 puts in place. For the board, the membership, and the developer-member building the substrate.

*Plain-text companion to `NWAi-Investment-Intelligence-Platform-Reference-v1.0.html`. The HTML is the visual primary; this markdown mirrors the same content for version control, AI consumption, and plain-text reference.*

*v1.1 · June 2026 · Platform*

---

## 30-Second Read

| ✓ What NWAi has today | 🔨 What V1 builds |
|---|---|
| An **AI-powered TechGroup deal pipeline.** 7 stages from Inbox to Memo. 9 research agents. Universal Triage Framework, Scout Q assessment, 17-folder DD, 11-section scored DD Report, 4-slide IC memo. Dealum CRM integration. Built and running. | The **member-social intelligence substrate.** Member profiles + expertise graph. Social deal card. SME POV capture across every stage. Decisions ledger. Re-weighted routing that compounds. The moat no other angel network has. |

## Build State Legend

| State | Meaning |
|---|---|
| **✓ Live** | Running today |
| **✓ Live · adapts** | Exists today, gains substrate interface in V1 |
| **🔨 Build · V1** | TechGroup MVP (Days 0–45) |
| **🔨 Build · V2** | Per-group rollout |
| **🔨 Build · V3** | Track 3 — Ecosystem Network Intelligence |

---

## ① The Architecture — Substrate and Activations

From GUT v1.0. Two activations sit on top of one substrate. Track 2 is the centerpiece — every other component plugs into it.

### Activations (plug into the substrate below)

**Track 1 — Deal Intelligence** &nbsp;·&nbsp; **[✓ Live · adapts]**
*Activation.* Where deals come from · how we evaluate them. The 7-stage AI-powered pipeline runs today and gains substrate-write interfaces in V1.

**Track 3 — Ecosystem Network Intelligence** &nbsp;·&nbsp; **[🔨 Build · V3]**
*Activation.* Where future deals come from. Proactive sourcing, pattern detection, thematic insights. Named slot — V3 activates after substrate is mature.

▼ *both activations plug into* ▼

### ★ Track 2 — Member / Social Intelligence &nbsp;·&nbsp; THE SUBSTRATE &nbsp;·&nbsp; **[🔨 Build · V1]**

Compounds **member SME judgment + relationships** into a durable institutional asset. **OUR MOAT.** All activations integrate here.

Five components: 🎯 Sensors · 🕸️ Member Graph · 📜 Decisions Ledger · ⚖️ Policy Layer · 🔄 Learning Loop

---

## ② The Deal Pipeline — How a Deal Moves Under V1

The 7 pipeline stages run today. V1 adds two new lanes — member writes at every stage, and substrate writes to the decisions ledger — plus the substrate ribbon as the always-on layer beneath. This is the reframe made visceral.

### Row 1: Pipeline stages &nbsp;·&nbsp; **[✓ Live]**

```
📥 Inbox  ›  🔍 Screen  ›  🤝 Scout  ›  🔬 Diligence  ›  📋 DD Report  ›  ✅ Decision  ›  📝 Memo
/screen     /screen       /scout       /diligence         /dd-report       /decision      /memo
```

### Row 2: AI agent fires &nbsp;·&nbsp; **[✓ Live · adapts]**

Outputs land on the deal card (V1) instead of standalone documents.

| Stage | Agent fires |
|---|---|
| Inbox | pipeline-monitor — routing in |
| Screen | team-analyst (PMTF) — team verification |
| Scout | +5 Stage 2A agents — market · comp · tech · risk · pricing |
| Diligence | Stage 2B financial chain — forecasting → venture |
| DD Report | DD synthesis — 11 sections scored |
| Decision | *(no agent — IC vote)* |
| Memo | memo render — 4-slide PPTX |

### Row 3: Member writes &nbsp;·&nbsp; **[🔨 Build · V1]**

Social deal card actions at every stage.

| Stage | Member writes |
|---|---|
| Inbox | match alert · I know this founder |
| Screen | I know this space · quick reaction |
| Scout | I'd join intro call · SME POV (early) |
| Diligence | I'd join DD · SME POV (deep) · comments |
| DD Report | DD score react · convict / dissent |
| Decision | vote · check-in · pass-with-reason |
| Memo | share · save · thesis tag |

### Row 4: Substrate writes &nbsp;·&nbsp; **[🔨 Build · V1]**

What lands in the decisions ledger.

| Stage | Substrate writes |
|---|---|
| Inbox | routing event · member signal |
| Screen | screen verdict · member reactions |
| Scout | scout verdict · SME signals (n) |
| Diligence | DD team formed · SME POVs (n) |
| DD Report | scored report · conviction map |
| Decision | IC decision · vote ledger |
| Memo | memo archived · thesis log |

### ★ Track 2 substrate — always on, beneath every stage &nbsp;·&nbsp; **[🔨 Build · V1]**

Five components in a single ribbon, beneath every pipeline stage:
🎯 Sensors · 🕸️ Member Graph · 📜 Decisions Ledger · ⚖️ Policy Layer · 🔄 Learning Loop

**↻ Closed loop:** re-weights routing next cycle.

---

## ③ The Substrate — Five Components, One Architectural Asset

What V1 builds. Each component is a piece of the proprietary moat. No vendor sells these as a system; no other angel network compounds them.

### 🎯 Sensors &nbsp;·&nbsp; **[🔨 Build · V1]**

Every member interaction is a write event — interest signals, expertise tags, SME POV, comments, votes, pass-with-reason. The catalog defines what the substrate captures and what it ignores.

*Catalog spec TBD per architectural reference doc.*

### 🕸️ Member Graph &nbsp;·&nbsp; **[🔨 Build · V1]**

Entities — Member, Company, Deal, Investment, Round, Domain Tag, Connection. Relationships — employment history, portfolio, board seats, co-investments. Derived fields — expertise centrality, co-investment density.

*Schema sketches TBD per spec.*

### 📜 Decisions Ledger &nbsp;·&nbsp; **[🔨 Build · V1]**

Append-only event log. Entry types — Screen verdict, Scout assessment, Diligence note, IC decision, Comment, SME POV, Vote, Pass-with-reason. The institutional memory; queryable for trend, conviction, and outcomes.

*Entry taxonomy TBD per spec.*

### ⚖️ Policy Layer &nbsp;·&nbsp; **[🔨 Build · V1]**

NWAi investment criteria encoded as policy. Engagement modes (active / passive / opt-in). Consent rules (per-field visibility, per-deal opt-in). Three analytical lenses applied at every stage.

*Codifies the non-negotiables in §10.*

### 🔄 Learning Loop &nbsp;·&nbsp; **[🔨 Build · V1]**

Every cycle's writes re-tune the next cycle's match scores. Routing improves with use. The compounding mechanic — the moat that grows.

*Update rule + observability TBD per spec.*

---

## ④ AI Agents — Twelve in V1

The 9 existing pipeline agents continue to do the analytical work (their outputs now feed the deal card, not standalone documents). V1 adds 3 substrate agents — the new logic that makes member-graph intelligence active.

### Existing Pipeline Agents — **[✓ Live · adapts]**

| Agent | Trigger | What it does |
|---|---|---|
| 📊 **pipeline-monitor** | session start, /sync-pipeline | Live pipeline dashboard. In V1, surfaces routing matches and member-substrate signals alongside deal status. |
| 🕵️ **team-analyst (PMTF)** | /scout + /diligence Stage 2A | Team-first PMTF. Founder Claim Verification Protocol. Team Commitment Depth. Skills coverage + market-access gap detection. Output now lands on the deal card's *Team* section. |
| 📈 **market-analyst** | /scout + /diligence | Structural discontinuity test, independent TAM/SAM/SOM, market timing scoring, industry dynamics. Lands on deal card's *Market* section. |
| 🗺️ **competitive-positioning-analyst** | /scout + /diligence | Direct competitors, incumbent threats, alternative solutions, positioning, moat input data. Emits the **Blue Ocean Read** (BLUE / CONTESTED / RED market-creation classification). Lands on deal card's *Competition* section. |
| 🔧 **technology-analyst** | /scout (light) + /diligence | Thin wrapper detection, TRL assessment, IP/patent research, technical architecture signals. Probes inference economics + emits the **Two Sustainable Advantage Tests** (Training-edge / Inference-edge verdicts). Lands on deal card's *Technical* section. |
| ⚠️ **risk-analyst** | /scout (light) + /diligence Stage 2A | Regulatory, exit landscape, execution + market risk signals. Cross-cutting overlay on the deal card. |
| 💲 **pricing-analyst** | /diligence Stage 2A parallel | Pricing maturity, value-prop validation, channel margin compression, unit economics, pricing pressure forecast. Feeds the Stage 2B forecasting chain. |
| 📊 **forecasting-analyst** | /diligence Stage 2B (after pricing) | McMurry-method independent 5-yr Bear/Base/Bull forecast with mandatory *because* clauses. Founder Financial Literacy Assessment. |
| 💼 **venture-analyst** | /diligence Stage 2B (after forecasting) | Defensible valuation (3 methods reconciled), exit projection, IRR/35% hurdle test, 10x-in-5-yrs check, deal structure recommendation. |

### NEW Substrate Agents — **[🔨 Build · V1 · NEW]**

| Agent | Trigger | What it does | Returns |
|---|---|---|---|
| 🧭 **Network Agent** | NL directory queries, member-graph search | Conversational search over the member directory and expertise graph. *"Who knows someone at [company]?" / "Who has operating experience in [domain]?"* Returns ranked members with reasons. | Ranked member matches with explainable reasoning. |
| 🎯 **Match Engine** | every new deal entering Inbox + each stage advance | Routes each deal to the 3–5 best-fit members by expertise, network, and investment-pattern fit. Replaces static tech-group distribution. Re-tuned every cycle by the learning loop. | Member match list per deal with confidence + reason. |
| 💬 **SME POV Capture** | stage-entry prompts (Screen / Scout / Diligence) | Structured prompting that captures member SME judgment at the right moments — without burying members in forms. Threads to the deal card; writes to the decisions ledger. | Structured SME POV records → deal card + ledger. |

---

## ⑤ Activation Surfaces — Where Members Live

Four surfaces. The social deal card is the centerpiece — the persistent surface across the entire deal lifecycle. The other three are the connective tissue.

### ★ Social Deal Card &nbsp;·&nbsp; **[🔨 Build · V1 · CENTERPIECE]**

*Primary surface — one card per active deal, lives across all stages.*

Per active deal (~5–15 at any time). Replaces "check the pipeline every two weeks." Members open this on a Wednesday night and see exactly what NWAi is working on, who's engaged, and where their brain fits.

- Deal essentials (pitch, founder, ask, stage)
- *Why this landed in your feed* — match logic visible
- Real-time social proof — who's engaged, with one-line reason
- One-tap actions: I'm in / ping me / I know this founder / I know this space / not for me
- Threaded SME POVs + member comments per stage
- Agent analytical outputs woven inline by section

### 📰 Activity Newsfeed &nbsp;·&nbsp; **[🔨 Build · V1]**

*Landing surface when a member logs in.*

Personalized — weighted by sectors, geography, portfolio companies. Not a chronological firehose.

- Deal activity — new matches, closing soon, follow-on
- Portfolio updates — exits, raises, hires, customer wins
- Upcoming events + RSVP
- Member milestones + support exchange activity

### 🔎 Directory + Network Agent &nbsp;·&nbsp; **[🔨 Build · V1]**

*Search + NL-query surface over the member graph.*

Faceted search across all profile fields, plus conversational NL queries via the Network Agent.

- Search by expertise, sector, geography, prior employer
- "Who's in NYC next week?"
- Two-hop intro path discovery
- Travel + geography flags

### 👤 Member Profile + Expertise Graph &nbsp;·&nbsp; **[🔨 Build · V1]**

*Owner-editable + system-derived.*

Living profile per member — the foundation that makes 200 members visible and routable.

- Structured fields — role, firm, geo, LinkedIn, prior employers
- Investment preferences (sectors, stage, check size, geo)
- Expertise tags — functional, operational, industry
- Member-controlled privacy per field
- System-derived — co-investment graph, decisions-ledger track record, expertise centrality

### ★ Social Deal Card Anatomy — at-a-glance &nbsp;·&nbsp; **[🔨 Build · V1]**

What members see per deal. Updates live as the pipeline advances.

**Deal Layer (agent-populated):**
- **Header** — company, pitch, founder, ask, stage, round
- **Pipeline state** — current stage badge + verdicts per stage
- **Analytical sections** — Market / Team / Competition / Technical / Pricing / Financials / Valuation, each populated by its respective agent
- **Scored summary** — Triage scores, Scout verdict, DD Report 11-section RAG strip
- **Risk flags** — Red / Yellow surfaced as banners

**Social Layer (member-populated):**
- **Why this landed in your feed** — match logic visible
- **Who's engaged** — names + one-line reason (interested / in DD / passed)
- **One-tap actions** — I'm in / ping me / I know this founder / I know this space / not for me
- **SME POVs** — threaded per stage, attributed
- **Member comments** — threaded discussion
- **Conviction map** — live tally of member signals

---

## ⑥ The Meeting Transformation

The bi-weekly group meeting doesn't disappear — it changes role. Activation moves to the substrate; the meeting becomes the decision ritual.

| ✓ Today — Activation Event | 🔨 V1 — Decision Ritual |
|---|---|
| Members assemble at the meeting. Discuss the pipeline. Form DD teams. Decide what to advance. Most member judgment is exchanged synchronously, in the room, in 90 minutes. | Activation happens continuously between meetings via the substrate. By the time the meeting opens, members are already activated and DD teams are already forming. The conversation moves up a level — to conviction and decision. |

---

## ⑦ Group Rollout — Substrate is Universal, Playbook is Per-Group

One substrate. One pipeline architecture. Six group-specific playbooks. TechGroup is V1 (live + substrate-enabled at Days 0–45); the other five groups follow at 2 weeks per group through V2.

**Shared rails. Group-specific playbooks.**

We are building an investment intelligence platform where the pipeline stages, AI agents, substrate (member graph + decisions ledger + learning loop), and output formats are shared across all groups. What changes per group is the investment playbook — screening gates, scoring rubrics, themes, and the SME pool calibrated to that domain.

| Group | Status |
|---|---|
| 💻 TechGroup | **✓ Live · V1** — Full pipeline active. Substrate-enabled at V1 ship. |
| 🩺 MedicalGroup | 🔨 V2 — Onboards at +2 weeks post V1 ship. |
| 🚀 SpaceGroup | 🔨 V2 — Per-group cadence; sequence TBD. |
| 🛍️ ConsumerGroup | 🔨 V2 — Per-group cadence; sequence TBD. |
| 🏭 IndustrialGroup | 🔨 V2 — Per-group cadence; sequence TBD. |
| 💳 FintechGroup | 🔨 V2 — Per-group cadence; sequence TBD. |

### 🔵 Shared across every group — built once

- **[LIVE]** 7-stage pipeline (Inbox → Memo)
- **[LIVE]** 9 pipeline agents (pipeline-monitor + 5 Stage 2A + 3 Stage 2B financial)
- **[LIVE]** Dealum CRM integration (sunset by YE)
- **[LIVE]** Output formats (Triage / Scout / DD Kickoff / Post-Meeting / DD Report / Memo)
- **[LIVE]** Slash commands
- **[V1]** Member-social intelligence substrate
- **[V1]** Social deal card + activation surfaces
- **[V1]** 3 new substrate agents (Network · Match · SME POV)

### 🟡 Group-specific — the playbook per group

- **[TECH ONLY]** Dealum tag filter (currently "Tech")
- **[TECH ONLY]** Screening gates & flags (Track A/B for TechGroup)
- **[TECH ONLY]** Scoring rubrics calibrated to domain risk
- **[TECH ONLY]** Investment themes (5 active for TechGroup)
- **[V1]** SME pool + lead assignment — substrate-derived (replaces static table)
- **[V2]** Per-group playbook for the other 5 groups

---

## ⑧ Track 3 — Ecosystem Network Intelligence (V3 Slot)

Named activation. Not designed yet. Activates after the substrate is mature and per-group rollout completes.

**Ecosystem Network Intelligence — Activation Slot** &nbsp;·&nbsp; **[🔨 Build · V3]**

Where future deals come from. Proactive sourcing agents (incubators, accelerators, universities, research). Pattern detection across market trends and signals. Thematic insights and reports. Pipeline creation upstream of Track 1. Writes into the member graph and the decisions ledger; consumed by the Match Engine for proactive routing. Interface named in v1.0; internals designed when V1 + V2 are stable.

---

## ⑨ Investment Framework — The Playbook

NWAi's proprietary criteria. Already encoded in plugin reference docs. In V1, these become the Policy Layer of the substrate — applied uniformly to every deal, every stage.

| Reference File | Contents | Used At |
|---|---|---|
| `gates-and-flags.md` | **NWAi Universal Triage Framework v2.0**: 3 hard gates + NWA Filter + Opportunity (/30) + Readiness (/25) | Screen |
| `gates-and-flags-techgroup.md` | TechGroup extension: Track A / Track B, AI Wrapper Assessment, TRL Hard Cap | Screen (TechGroup) |
| `scout-questions.md` | Phase 1 viability (Big Idea / Market / Moat) + Phase 2 execution (Team PMTF, Tech, Traction, GTM, Exit) | Scout |
| `diligence-scoring-rubrics.md` | Moat (0–6), AI Moat (0–10), Risk (1–10), Bear/Base/Bull model with mandatory *because* clauses | Diligence |
| `dd-checklist.md` | 17-folder DD framework with team assignments and gate-critical folder designations | Diligence |
| `ai-moats-framework.md` | Three moat types + Replicability Speed Matrix (4-row threat actor table) | Scout + DD Report + Memo |
| `agent-era-readiness-framework.md` | Does the founder solve the problem *as AI agents will reshape it?* — doorway question + 3 scored dimensions + plain "does the agent wave help or hurt this company?" read | Screen (trip-wire) + Scout (Q7) + Diligence (Moat Tier 3) + Memo |
| `dd-report-format-reference.md` | 11 sections, 2-column tables, RAG colors — IC-ready briefing | DD Report |
| `memo-format-reference.md` | 4-slide PPTX structure, NWAi branding, "What is the Bet?" framing | Memo |
| `diligence-analysis-framework.md` | Analyst-POV-first post-meeting analysis — declarations, contradictions, moat signals | Diligence (post-meeting) |

### Three Analytical Lenses — Always Active, Every Stage &nbsp;·&nbsp; **[✓ Live]**

**⚡ Structural Discontinuity** — Is this Big Idea riding a genuine, irreversible market shift — or incremental improvement dressed up as disruption? A real discontinuity changes the rules of the game.

**🔒 Memory Lock-in** — Does the product get smarter, stickier, or more embedded the more it's used? Proprietary data flywheels, deep workflow integration, accumulated context — the hallmarks of a durable AI moat.

**🤖 Agent-Era Readiness** — Does the founder solve the problem *as AI agents will reshape it?* As agents become the predominant actor and consumer of digital products and decisions, the plain test for every deal is: **does the agent wave help or hurt this company?**

---

## ⑩ Non-Negotiable Investment Criteria &nbsp;·&nbsp; **[✓ Live · encoded in Policy Layer at V1]**

These are the standards a deal must ultimately clear. Most are non-negotiable — fail one and it's a Pass. **Structure and Syndication are the exception: they are negotiated close-stage outcomes, not screen gates** — surfaced as IntroCall negotiation items, never a screen kill or downgrade on their own.

| Criterion | Standard |
|---|---|
| 📄 **Structure** | Priced equity preferred (Seed–Series A). SAFE acceptable as a starting point — negotiated to priced equity or convertible at close. Convertible debt acceptable. C-Corp only. |
| 🇺🇸 **Geography** | US-based HQ and IP. Executive team must be US-based. No foreign-owned entities. |
| 💰 **Traction** | Real revenue or signed paying customers. Research projects and demo labs do not qualify. |
| 🚀 **Stage** | MVP complete with at least one successful beta. TRL 5+ (GAO scale). |
| 🤝 **Syndication** | Credible syndication path — external lead/co-lead preferred for validation, but NWA may lead or cross-syndicate. Clean cap table. |
| 📈 **Return Potential** | 10× in 5 years minimum. TAM must support a 20×–100× return path. |

---

## ⑪ Output Chain — Exports of Deal Card State

The Word and PowerPoint artifacts still exist — but their role changes.

> **Reframe.** Today these documents are the primary deliverables — the deal card is folders on disk. At V1, the **social deal card becomes the deliverable**; these files become exports of card state at key moments (Scout sign-off, IC briefing, archival memo). The pipeline still produces them, but members no longer need to chase them down — the card is the source of truth.

| Command | Output |
|---|---|
| `/screen` | Triage Report (Word doc) — gates verdict, opportunity / readiness scores, live pitch questions |
| `/scout` | Scout Assessment Report (Word doc) — one-sentence verdict, biggest risk, 3–5 diligence questions, theme mapping |
| `/diligence` | DD Kickoff Package (Word doc) — scored rubrics, 17-folder assignments, agent research briefings |
| `/post-meeting` | Post-Meeting Reconciliation (Word doc) — Analyst POV + Key Insights + Resolved/Open tracker |
| `/dd-report` | DD Investment Report (Word doc) — 11 scored sections, RAG colored, IC-ready |
| `/decision` | Decisions ledger entry (V1) + CRM update — vote recorded, conviction map snapshotted |
| `/memo` | Executive Summary (4-slide PPTX) — NWAi branding, IC presentation or archival |

---

*NWAi Investment Intelligence Platform · Architectural Reference v1.0 · Companion to GUT v1.0 · May 2026 · Jamie, Board Director · TechGroup Co-Chair*
