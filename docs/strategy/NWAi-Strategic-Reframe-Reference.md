# NWAi Strategic Reframe — Reference Document

*Status: working strategic reference, April 2026*
*Framework applied: Playing to Win (Lafley & Martin) — Where to Play / How to Win cascade*
*Context: captures the strategic reframe that surfaced from (a) Ron's conclusion on the Dealum API terms, (b) Jamie's conversation with Jessica and Jared (MD, Miami Angels), and (c) the Coditect build direction now in question.*

## How to Use This Document

This is the onboarding doc for any new session, collaborator, or downstream work (SOW drafting, Coditect re-scope, board prep). Read top to bottom once; return to the comparison matrix and three-layer architecture as needed. Update after the 4-person strategic huddle (Ron / Jessica / Jared / Jamie) and after each downstream decision.

---

## The Reframe (One Sentence)

**From** a deal-firehose filtering pipeline anchored on Dealum
**To** a member-centric social intelligence platform that activates 200 members' domain expertise on curated, referred, and cross-syndicate deals.

The AI work already built does not get thrown out — it gets re-oriented. The analytical frameworks remain NWAi's proprietary edge; the screening-at-scale architecture recedes.

---

## Why This Reframe

**NWAi's actual edge** (as articulated in exploration, April 2026):

1. *Sourcing edge* — curated deal flow from a trusted syndicate network, cross-syndication partners, and incubator/founder relationships. Not a broad passive marketplace.
2. *Judgment edge* — member domain expertise applied fast to pre-qualified deals. The quality of the match, not the filter of the firehose.

**Member motivators, ranked** (what actually pulls members into NWAi):

1. SME relevance — using their domain expertise in startup investing
2. Networking — connections with peers (former CEOs, founders, VPs)
3. Energized by new technology and founders changing their space
4. The investment itself — *distant* fourth

The strategic consequence: almost every investment platform on the market (AngelList, Republic, Dealum) is built as if returns are motivator #1. NWAi members show up for #1–3. That requires a different product.

**The Jared moment (the Declaration that crystallized the reframe):** in a recent meeting, Jamie described the NWA pipeline as *"filter the Dealum firehose + run diligence."* Jared (MD, Miami Angels) asked: *"What problem are you solving?"* and said his own answer is **SPEED** — Miami receives deals pre-diligenced from other syndicates, so their entire job is activating members to decision quickly. He called this **"social intelligence."** Different MO from NWA, same underlying need: a member expertise activation engine. That naming stuck.

---

## The REAL Tradeoff — Comparison Matrix

*This is the centerpiece. It translates the reframe into concrete architectural and operational consequences.*

| Dimension | **To Dealum** *(Current: Deal Firehose Pipeline)* | **Not to Dealum** *(Future: Social Intelligence Platform)* |
|---|---|---|
| Deal Volume | High (~1,000/yr) | Low–Medium (~50–150/yr, curated) |
| Signal Quality | Low–Medium | High |
| Sourcing Model | Passive marketplace | Curated + referred + cross-syndicate + incubator |
| Platform Center of Gravity | Deal-centric | Member-centric |
| AI Role | Filter noise | Accelerate conviction |
| Member Role | Reviewer / list-browser | Originator + investor + activated expert |
| Member Experience | Browse pipeline at biweekly meeting | Personalized feed, ambient engagement |
| Activation Timing | Synchronous / batched | Asynchronous / continuous |
| Core Asset | Data + pipeline (Dealum's) | Network + expertise (NWAi's) |
| Feedback Loop | Fragmented across deals | Compounding in member profiles + decisions ledger |
| Data Ownership | Dealum + secondary-use rights | NWAi full ownership |
| Dependency | External (Dealum) | Internal (members + syndicate partners) |
| Scaling Behavior | More deals = more screening work | More members = richer activation graph |
| Vendor Risk | High (foreign, weak data rights) | Low (open standards, own schema) |
| Moat | Weak | Strong (Memory Lock-in on the member graph) |

---

## The Analogy

Not consumer social media (Instagram, TikTok — attention-maximizing).
Not a traditional deal platform (AngelList, Republic, Dealum — deal-centric, returns-first).

**Think: Bloomberg Terminal meets Slack meets LinkedIn — for a 200-member syndicate.**

Closed. Permissioned. Signal-rich. Not noise-optimized. The *mechanics* of social (feeds, endorsements, ambient presence, tagged expertise) are dead right. The *objective function* is different: quality of conviction, not minutes of engagement.

The key unlock the analogy points to: **activation becomes continuous and ambient, instead of synchronous and batched.** The biweekly group meeting doesn't disappear — it transforms from the *activation event* into the *decision ritual*. All the activation (interest signals, expertise tags, "I know this founder," "I'd join DD") happens asynchronously between meetings. The meeting then opens with already-activated members and already-forming DD teams, and the conversation moves up a level.

---

## Three-Layer Architecture

**Principle: build where we differentiate, integrate where we don't.**

| Layer | Description | Posture | Source |
|---|---|---|---|
| **1. Deal Ops Infrastructure** | Deal management CRM, multi-source inbound (cross-syndicate, referral, direct), tracking / dashboard, portfolio management | **Integrate** (commodity) | Dealum for now; future vendor TBD. ~15 serious players in category (AngelList, Sydecar, Affinity, Carta for Investors, Visible, Attio, Allocations, others) with different postures (syndicate-first, ops-first, data-first, SPV-first). Needs a deliberate scan before SOW locks in. |
| **2. Social Intelligence Layer** | Member profiles, expertise graph, personalized deal pulse, activation feed, DD team formation, cross-syndicate partner intel, decisions ledger | **Build** (proprietary) | Greenfield. No vendor does this well for a member-expertise-driven syndicate. This is where NWAi's moat lives. |
| **3. Analytical Diligence Layer** | Scout / DD frameworks, agentic research (market, competitive, technical, financial, risk), scoring rubrics, DD Report + Memo generation, moat frameworks | **Build** (proprietary) | Lifts cleanly from the current CoWork pipeline. Almost none of it is Dealum-dependent. |

**The architectural insight:** Layer 2 is what binds Layers 1 and 3. Without it, NWAi has a deal pipeline plus some AI tools — which is what Coditect is building today, and what Jared's question flagged. With Layer 2 as the core, every deal in Layer 1 becomes a social event flowing through the member graph, and Layer 3 is the analytical muscle activated members reach for to build conviction.

**Jamie's standing position on Layer 1:** integrate, do not rebuild. A prior conversation with Jared floated the idea of a full end-to-end NWAi platform build, including deal management. Jamie's position is that Layers 2 and 3 are absolutely build; Layer 1 is integration. Stated here to remove ambiguity going into the huddle and the SOW.

---

## V1 Anchor — The Personalized Deal Pulse

The thinnest, realest v1 that would feel unmistakably new when a member opens it on a Wednesday night. Two parts ship together (neither works alone):

**Part A — Member profile with expertise graph.** Every member has a living profile: domains they know deep, sectors they've operated in, founders they've worked with, areas they want to be pulled into. This is the foundation data. It is what makes the 80 new Miami Angels members *visible and routable* instead of invisible.

**Part B — Deal card with a social layer.** For every active NWAi deal (~5–15 at any time), a card showing:

- Deal essentials (pitch, founder, ask, stage)
- *Why this landed in your feed* — expertise match logic made explicit
- Who else is engaged (interested / in DD / passed, with one-line reason) — real-time social proof
- One-tap actions: *I'm in / ping me if it advances / I know this founder / I know this space / not for me*

Together, these replace *"check the pipeline every two weeks and wait for the group meeting"* with *"open this Wednesday night and see exactly what NWAi is working on, who's engaged, and where your brain fits."*

Everything else (personalized weekly digest, expertise-seeking notifications, DD team auto-assembly, cross-syndicate partner intel feed) is a natural extension of this spine. But Parts A and B are what prove the thesis.

---

## Stakeholder Context

- **Jamie** — Board Director, Investment Intelligence Platform & AI; TechGroup Co-Chair. Driving the reframe.
- **Ron** — NWA President. Already issued the key Declaration in his Dealum reply: *"ingesting pitch decks directly by email or by our website, with some sort of AI augmentation backend seems like the future."* This reframe completes his frame; it does not replace it.
- **Jessica** — NWA Managing Director. Led the Dealum API negotiation. Sees higher value in the member network + cross-syndication model over the year.
- **Jared** — MD, Miami Angels (recently merged with NWA, adding 80 members). Solves for **SPEED** because Miami receives pre-diligenced deals from other syndicates. Coined the **"social intelligence"** frame.
- **Coditect** — current build partner. Scaling a deal-centric pipeline on Dealum APIs. Contract still in discussion — *no concrete poured yet*. This is the right moment to redirect scope.
- **NWA** — 200 members across 6 verticals (Tech, Medical, Space, Consumer, Industrial, Fintech). Recently merged with Miami Angels. The strategic question is whether to keep optimizing Business #1 (deal discovery at scale) or pivot to Business #2 (domain-expertise investor network).

---

## What's Decided vs. What's Open

**Decided (internal conviction, pre-huddle):**

- Strategic direction: deal-centric → member-centric reframe
- Three-layer architecture with build-vs-integrate principle
- V1 anchor: personalized deal pulse (member profile + deal card social layer)
- Coditect scope requires refinement, not cancellation
- Dealum exit is phased, not immediate (Phase 1 constrained co-existence → Phase 2 dual funnel → Phase 3 decision point)

**Pending (requires the 4-person huddle + downstream work):**

- Strategic identity confirmation with Ron, Jessica, and Jared
- Coditect contract scope + pivot mechanics
- Layer 1 vendor selection (deal management + portfolio management — needs a deliberate scan)
- V1 feature scope and timeline
- Member expertise data model / schema — what fields, how populated, how maintained
- Feedback loop design — what pulls a member into the platform on a Wednesday night
- Hit-rate data — Dealum-sourced vs. member-referred investment rate (single most persuasive data point if gatherable)
- Dealum contract sequencing (near-term API acceptance vs. exit timing)
- Clear message for May 8 Spring Member Meeting on AI's role in current NWA scope

---

## Captured Threads to Pick Up

- **Claude Code v2 vs. Coditect build-out comparison** — Jamie asked for analysis of what it would take to build Layers 2 and 3 in Claude Code v2 as an alternative or complement to Coditect, with reference to enterprise-grade requirements. Outstanding.
- **Layer 1 vendor landscape scan** — 15+ serious vendors across different postures. Needed before SOW commits the integrate-vs-build decisions for deal management and portfolio management.
- **Related workspace (separate folder)** — partnership and legal documents for the NWA × Coditect alliance live in *"Claude CoWork NWAixCoditect Partnership"*. SOW work should reference that workspace, not duplicate it.
- **Draft email to Ron** — drafted in the April 2026 exploration session. To be sent by Jamie after final edits, requesting a 4-person huddle (Ron, Jessica, Jared, Jamie) to align on strategic identity *before* Coditect scope commits or this goes to the board.

---

*This is a living document. Update after the huddle, after the Layer 1 vendor scan, after Coditect re-scoping, and as V1 takes shape.*
