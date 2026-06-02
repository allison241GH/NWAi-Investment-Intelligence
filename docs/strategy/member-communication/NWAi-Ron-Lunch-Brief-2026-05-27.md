# NWAi Platform — Lunch Brief
*Platform Debrief | 2026-05-27*
*Distilled from GUT v1.0, Enterprise Build Brief v1.1, TechGroup Pipeline Architecture v0.26.0, and the May 23 Ron email.*

---

## View A — The Placemat (Point-and-Show)

```
┌─────────────────────────────────────────────┬─────────────────────────────────────────────┐
│ 1. WHAT WE'VE BUILT                         │ 2. WHAT WE NEED TO BUILD                    │
│    (The analytical layer Dealum lacks)      │    (Deal intel + member intel · web)        │
│                                             │                                             │
│  • Working end-to-end deal pipeline:        │  • V1 (30–45 days): two tracks at once —    │
│    7 stages · 8 commands · 9 AI agents ·    │    deal intel (the 9 agents on the web) +   │
│    10 proprietary frameworks                │    member intel substrate (graph, ledger,   │
│                                             │    Match Engine, social deal card).         │
│  • Single user (me). One deal at a time.    │                                             │
│    Real deals through to scored DD          │  • V2 (~3 months): onboard the other 5      │
│    Reports + Investment Memos.              │    groups — Medical, Space, Consumer,       │
│                                             │    Industrial, Fintech. 2 weeks per group.  │
│  • Filesystem-first; Dealum overlay only.   │                                             │
│    Three surfaces (Desktop, CLI, Cowork).   │  • V3+ ecosystem sourcing. Dealum stays     │
│                                             │    through V2; platform subsumes Beyond V3. │
├─────────────────────────────────────────────┼─────────────────────────────────────────────┤
│ 3. ENTERPRISE-GRADE FOUNDATION              │ 4. THE MEMBER INTELLIGENCE PLATFORM         │
│    (Desktop tool → always-on platform)      │    (Beyond deals — this is the moat)        │
│                                             │                                             │
│  • From session-dependent desktop → cloud   │  • Deal intelligence is the wedge.          │
│    always-on. Deals processed when they     │    Member intelligence is the asset.        │
│    enter Dealum, not when I'm at my Mac.    │                                             │
│                                             │  • Substrate = Sensors + Member Graph +     │
│  • Multi-user: right output to right        │    Decisions Ledger + Policy + Learning     │
│    member at right stage. Structured SME    │    Loop. Append-only, compounds with use.   │
│    input replaces email + ad-hoc.           │                                             │
│                                             │  • 200 members · 6 groups · 20+ years of    │
│  • Bidirectional Dealum integration.        │    indexed IC reasoning. No vendor can      │
│    Encryption + RBAC + append-only audit.   │    sell us this. No competitor can copy it. │
│    Member data rights from day one.         │                                             │
│                                             │  • AI is the connective tissue. The         │
│                                             │    substrate is the moat.                   │
└─────────────────────────────────────────────┴─────────────────────────────────────────────┘
```

---

## View B — Talking-Points Crib Sheet

### Opening line
*"What I want to walk you through over lunch is four things — what we've already built, what it takes to evolve it, how we keep it enterprise-grade as members come on, and the bigger prize underneath it all."*

---

### 1. What we've built to date — the TechGroup deal pipeline

**Verdict:** *Built the analytical layer Dealum doesn't have. Dealum stays authoritative for intake, stage tracking, member records, and decisions logged — the pipeline I built generates the intelligence at each stage (screening verdicts, scout assessments, diligence packages, DD Reports, Memos). End-to-end, processing real deals on my desktop today.*

- Six-layer system: filesystem deal data → 7-stage pipeline (Inbox → Memo) → 8 slash commands → 9 AI research agents → 10 proprietary framework documents → persistent session context.
- Agents do real work: company research, market analysis, competitive intel, technical diligence, risk, pricing, independent 5-yr financial forecast (McMurry method), valuation with 35% IRR hurdle test.
- Outputs match our visual standard — DD Reports (11 scored sections, RAG-coded) and 4-slide Memos rendered exactly to the STL/Synergist reference format.
- Filesystem-first today; Dealum API integration is deferred. Runs across Claude Desktop, Claude Code CLI, and Cowork.
- **Limits to name explicitly:** Single-user (me). One deal at a time. TechGroup only. Not on the web. Not multi-tenant. Not member-accessible.

> **Say it this way:** *"I've proven the rails work. The same pattern that screens, scouts, and runs diligence for TechGroup is what we lift onto the platform — but the platform is where it stops being a single-person tool."*

---

### 2. What we need to build — multi-user, multi-group, web

**Verdict:** *The build is two things at once: lift the proven desktop pipeline onto a multi-tenant web platform AND build the member intelligence substrate the pipeline plugs into. V1 ships the minimum substrate in 30–45 days; full 6-group rollout in 3–4 months; substrate before activations.*

| Layer | What it owns during V1–V2 |
|---|---|
| **Dealum** (stays authoritative) | Deal intake · stage tracking · member records · decisions logged · historical archive |
| **Platform — Deal Intelligence** (V1) | The 9-agent pipeline lifted onto the web: screening verdicts, scout assessments, diligence packages, DD Reports, Memos |
| **Platform — Member Intelligence** (V1) | The substrate: member graph · decisions ledger · Match Engine · SME POV capture · social deal card |

*Beyond V3 the platform subsumes Dealum's roles too — but that's the long arc, not the V1 build.*

- **V1 (30–45 days): TechGroup MVP substrate.** Member profile + expertise graph, faceted directory, Network Agent (NL: "Who knows X?"), social deal card as the persistent surface across all 7 stages, all 9 existing agents orchestrated, 3 new substrate agents (Network Agent, Match Engine, SME POV Capture), append-only decisions ledger, re-weighted matching that improves every cycle.
- **V2 (~3 months total): the other 5 groups.** Medical → Space → Consumer → Industrial → Fintech, 2 weeks each. Each plugs its own playbook (rubrics, themes, SMEs) into universal rails. Adding a group is config, not code.
- **V3+: ecosystem sourcing.** Proactive feeds from incubators, accelerators, universities. Pattern matching upstream of Track 1.
- **Beyond V3: native intake + founder portal + native CRM →** Dealum decommissioned. Full platform parity.
- Architected from V1 for 6 groups even though only TechGroup is live — the data model survives every later transition.

> **Say it this way:** *"V1 is 30–45 days for TechGroup. All six groups within 3–4 months. The total arc to full parity — including replacing Dealum — is 12–18 months. We don't compress that; we sequence it."*

---

### 3. Enterprise-grade foundation — the desktop-to-platform transition

**Verdict:** *Enterprise-grade isn't a security checkbox — it's the transition from a session-dependent desktop tool that processes one deal at a time to an always-on platform that serves 200+ members across 6 groups. Four dimensions define it: always-on reliability, multi-user access, clean Dealum integration, and secure data handling.*

| Capability | Desktop today (Cowork / Claude Code) | Enterprise platform (target) |
|---|---|---|
| **Users** | Me — single session | 200+ members with role-based access |
| **Reliability** | Session-dependent — runs when I'm working | Always-on cloud — processes deals as they enter Dealum |
| **Intelligence delivery** | I manually share outputs | Automated push: right output to right member at each stage |
| **SME input** | Ad-hoc email + conversation | Structured form integrated with the diligence pipeline |
| **Dealum integration** | I read Dealum, update manually | Bidirectional — automated ingestion + write-back |
| **Security** | Desktop session, no formal controls | Encrypted, RBAC (6 groups × 6 roles), append-only audit, member data rights |
| **Scale** | Single thread, one deal at a time | Full deal flow (1,000+/year) concurrently |

- **Always-on reliability:** Intelligence runs on a cloud server, not my Cowork or Claude Code session. A deal lands in Dealum → platform processes it automatically. Not session-dependent.
- **Multi-user access:** Reports and deal cards delivered to (or accessible by) the right members at the right stage. SMEs submit diligence input via a structured surface, not email. Role-based: 6 groups × 6 roles · per-group AND per-deal scoping · cross-group opt-in.
- **Clean Dealum integration:** Bidirectional. Dealum stays authoritative for deal tracking; the platform owns analysis. Read in, write back. (Long-term — Beyond V3 per Section 2 — the platform subsumes Dealum.)
- **Secure data handling:** Encrypted in transit + at rest. Append-only decisions ledger as the audit trail. GDPR-equivalent member data rights from day one. Vertical overlays (HIPAA-adjacent for Medical, regulatory for Fintech/Space) layer on top.

> **Say it this way:** *"What we're building isn't a desktop AI tool that's been scaled up — it's a real platform. The shift is from me processing one deal at a time on my Mac to an always-on system delivering intelligence to the right member at the right stage. Security is the floor; reliability, multi-user access, and bidirectional Dealum integration are what actually makes it enterprise."*

---

### 4. From deal intelligence → member/social intelligence platform

**Verdict:** *The deal pipeline is the wedge. The enduring asset is the substrate — member expertise graph plus 20+ years of indexed IC reasoning. AI analytical capability is commoditizing fast; what no vendor can sell us and no competitor can copy is the network and the decision memory compounded over time.*

- **The substrate has five components:** Sensors (what writes), Member Graph (who knows what), Decisions Ledger (append-only IC history), Policy Layer (NWAi criteria as code), Learning Loop (every cycle re-tunes the next).
- **The thesis (from my May 23 to you):** AI compresses screening, scaffolding, DD synthesis. It doesn't reach selection under uncertainty, conviction-forming, or the relationship side of value-add. **The work AI compresses isn't the work that produces returns.**
- **Now / near / far:**
  - *Now:* Build deal intelligence as the interim operational capability AND start the member/social layer in parallel. Two builds, integrated by design.
  - *Near (12–24 mo):* Analytical capability commoditizes. Swap modules at market price; reinvest into substrate depth.
  - *Far:* Substrate is the moat; AI is the connective tissue activating it. Analytical layer = commodity input. Network + institutional memory = what compounds.
- **What members actually want:** Network, founders, energy, SME engagement. Returns matter, but they're the 4th of 5 motivators. The platform has to serve that — not just process deals faster.

> **Say it this way:** *"The deal pipeline is real and it works. But if all we build is faster diligence, we've built a tool a vendor will replicate in 18 months. The compounding asset is the member graph and the decisions ledger. That's what we're really building."*

---

### Closing — the Dealum framing + the ask

**On Dealum:** *"Near-term, Dealum keeps the firehose handled — which lets us focus the build on what's actually missing: deal intelligence and member intelligence. Over time, the platform encompasses everything Dealum does today — native intake, founder portal, member roster, CRM — and Dealum is decommissioned. That's a Beyond-V3 conversation, not a V1 one. But every architectural decision we make in V1 anticipates it."*

**The single biggest risk** (name it before they do): *"AI erodes the high-ranking experiential motivators — peer networking, founder proximity, SME engagement — broadly enough that members disengage before the substrate compounds. That's why substrate ships in V1, not later."*

**The ask** (for the incoming developer-member): *"You join NWA as an advisory member while building this. You're inside the substrate you're building. V0 is 2–4 weeks of architecture proposal; V1 SOW follows. The arc through V2 is ~4 months from kickoff; full parity is 12–18 months."*

---

*Source docs (if anyone asks for depth): GUT v1.0 (`docs/strategy/foundational/`), Enterprise Build Brief v1.1 (`docs/reference/NWA Investment Intelligence Platform/`), Member Intelligence V1 Features (`docs/strategy/foundational/`), Architecture v0.26.0 (workspace root), May 23 email to Ron (`docs/strategy/member-communication/`).*
