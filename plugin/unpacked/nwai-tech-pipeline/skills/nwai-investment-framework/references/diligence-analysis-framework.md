# NWAi Diligence Analysis Framework
*Used by: `/post-meeting` command | Referenced in: CLAUDE.md*

---

## Purpose

This framework defines how Claude applies the **analyst lens** during the Diligence deep dive phase — specifically during and after the three structured external meetings (Product, GTM, Financials). It governs the behavioral standard, the output structure, and the analytical playbook for each meeting type.

The core behavioral rule: **analyst POV leads every post-meeting output. The tracker reconciliation is the record, not the deliverable.**

---

## The Dual Role in Diligence

Claude plays two simultaneous roles during diligence deep dives:

| Role | What It Means | Output Priority |
|------|--------------|----------------|
| **Analyst** | Surfaces Key Insights — macro-level findings that affect investability. Looks for declarations, contradictions, moat signals, team depth, thesis confirmation/challenge. Forms and updates a progressive POV. | **Primary** |
| **Tracker** | Reconciles open items from the Diligence Action Tracker against transcript evidence. Updates status (Resolved / Partial / Open). | Secondary |

The analyst role requires connecting dots across the accumulated context (Scout, DD Kickoff, prior meetings, data room). The tracker role is mechanical. Never let the mechanical task crowd out the analytical one.

---

## The Analyst Lens — What to Look For

### 1. Founder & Executive Declarations

Explicit statements by founders and key executives about strategy, exit orientation, differentiation, and what they are — and are not — building. These are the highest-signal moments in any meeting.

A founder who says *"we're building for a PE rollup in 3 years"* has told you the actual optimization target. A co-founder who says *"yes, other companies can do what we're doing"* has told you the moat thesis. Take founders at their word — their declarations reveal priorities that no pitch deck will ever state directly.

**How to capture them:** Pull verbatim quotes. Label them as declarations. Frame the NWAi impact directly — what does this mean for our moat criteria, our return thesis, our timeline alignment?

**Declaration types to watch for:**
- **Exit declarations** — When, how, and at what valuation does the founder expect to exit? Does it align with NWAi's 5-year 10x thesis?
- **Differentiation declarations** — When asked "what makes you unique?", what did they lead with — technology, data, distribution, or brand? This is the moat thesis in plain language.
- **Build declarations** — What is the CEO explicitly building vs. not building? A CEO who says "we don't want to be in professional services" while demoing a product that requires extensive services is describing a structural contradiction.
- **Customer declarations** — Who does the CEO think the real customer is? The channel? The enterprise? The end user? This reveals pricing power, stickiness architecture, and lock-in potential.
- **Market declarations** — How does the CEO frame the competitive landscape? Who do they think can beat them, and what's their answer?

### 2. Structural Contradictions

Cases where stated strategy conflicts with product reality, or where different executives on the same team give contradictory answers. Contradictions are often more revealing than consistent messaging.

Examples:
- CEO says "pure subscription" / demo shows services-heavy onboarding → financial model tension
- CEO says "unique technology" / CTO explains it's all Azure SDK + open source → moat tension
- CEO says "PE rollup in 3 years" / COO talks about long-term category dominance → strategic alignment tension

**Claim walk-backs & the credibility pattern.** A special class of contradiction: the meeting walks back a *load-bearing claim* from prior founder materials (deck, DD response, data room, earlier meeting) — core technology architecture, quantified customer ROI, traction figures, team credentials. Classify each affected prior claim CONFIRMED / QUALIFIED / WALKED BACK; every walk-back is a Key Insight, never just a tracker note. The count is **cumulative across the diligence record** (including any Scout Step 4c reconciliation table): 1 = ⚠️ stated in the Analyst POV box; **≥2 = ❌ founder-credibility discrepancy pattern** — it leads the POV box and the running thesis update, with a recommendation to pause diligence (or pass) until the walked-back claims are independently re-verified. Symmetry rule: favorable self-reported statements in the same meeting are Reported-tier — they may resolve tracker items but cannot flip a 🔴 thesis stress point to 🟢 without independent verification. Calibration case: RootCause.ai, July 2026 (Decision 10 — the deck-vs-DD-Response discrepancy pattern a TechGroup member caught that the scoring machinery initially did not).

### 3. Moat Signals

Apply the two NWAi lenses explicitly:

**Structural Discontinuity test:** Is the big idea riding a genuine, irreversible market shift? Does the regulatory tailwind, technology inflection, or customer behavior change make this a "rules change" or just a "better product"?

**Memory Lock-in test:** Does the product get smarter, stickier, or more embedded the more it's used? Look for: proprietary data accumulation, workflow depth, switching cost drivers, network effects. When founders describe differentiation as distribution or pricing — not data or workflow — the Memory Lock-in thesis is weak.

**Thin wrapper test (for AI companies):** Could the core product be replicated via public APIs in under 48 hours? If the company's own technical leadership describes their stack as primarily Azure SDK + open source frameworks + a normalization layer, the answer is probably yes.

### 4. Team Signals

Who spoke authoritatively vs. who deferred or revealed depth limits? Note the gap between the CEO's narrative and the team's demonstrated capability.

Watch for: technical delivery leads who can't answer basic questions about their own platform, operational hires from non-adjacent industries, founding team imbalance (all GTM / no technical depth, or all technical / no commercial experience), recency of key hires.

### 5. Thesis Stress Points

For each prior hypothesis from the Scout Assessment or DD Kickoff, note whether the meeting confirmed, partially confirmed, or challenged it. Use signal notation: 🟢 / 🟡 / 🔴. The progressive movement of these signals across three meetings tells the investment story.

---

## Meeting-Type Playbooks

### Product Meeting — What to Look For

**Primary analytical questions:**
1. Does the product exist and actually work as described? (Confirm, don't assume)
2. What is the real source of differentiation — technology, data, or packaging?
3. Is the architecture defensible or replicable? (Thin wrapper test)
4. Where is the human labor hidden in what looks like automation?
5. Who built this, and how deep is the technical bench?

**Key declaration types in product meetings:**
- Moat declarations: what the founders believe makes the product defensible
- Build declarations: what the product is designed to do vs. what it actually does today
- Roadmap declarations: what's coming, what's not built yet, what that reveals about current gaps

**Structural contradictions to watch for:**
- "Fully automated" products that require significant manual setup per customer
- "AI-powered" products where the AI is primarily sourced from public APIs
- "Platform" claims where the platform is actually a dashboard on top of someone else's infrastructure

---

### GTM Meeting — What to Look For

**Primary analytical questions:**
1. Is the channel relationship truly embedded, or is it arm's-length and easily displaced?
2. Does the sales motion require the channel to change behavior, or does it fit naturally into existing workflows?
3. Who has pricing power — the company, the channel, or the end customer?
4. Is the revenue model actually what the CEO says it is?
5. Does the sales leadership have the right background for this specific motion?

**Key declaration types in GTM meetings:**
- Channel declarations: what role the channel partner actually plays (embedded vs. plumber)
- Revenue model declarations: where money actually flows and who captures it
- Competitive declarations: who the CEO fears, who they're dismissing, and whether those judgments are sound
- Scale declarations: what it actually takes to add the next 100 customers

**Structural contradictions to watch for:**
- Channel "partnerships" where the channel has no financial incentive to prioritize the product
- "Land and expand" models where expansion requires the same level of effort as the initial sale
- TAM claims that require behavior changes the market hasn't shown willingness to make

**Carry forward from Product meeting:** Does the GTM motion match the product's actual onboarding complexity? If the product requires heavy setup, does the channel have the skill and incentive to deliver it?

---

### Financials Meeting — What to Look For

**Primary analytical questions:**
1. Do the revenue assumptions survive contact with the actual onboarding and delivery cost structure?
2. Is the path to $10M ARR believable given what we now know about the product and GTM?
3. What does the token/variable cost structure do to margins at scale?
4. Does the raise amount match the actual capital requirement to get to the next fundable milestone?
5. What is the Bear case, and is it survivable?

**Key declaration types in financials meetings:**
- Revenue assumption declarations: what they assume about customer acquisition rate, ACV, and churn
- Margin declarations: what they believe the gross margin is and how it behaves at scale
- Use of funds declarations: what the current raise actually buys in terms of runway and milestones
- Exit math declarations: at what revenue multiple does the PE rollup thesis deliver 10x for NWAi?

**Structural contradictions to watch for:**
- Revenue projections that require customer acquisition rates inconsistent with the stated GTM motion
- Gross margin assumptions that don't account for the service labor visible in the product demo
- Runway calculations that assume best-case fundraising timing

**Carry forward from Product + GTM meetings:** The full cost-to-activate per customer (including setup labor, MSSP margin, and ongoing support) must be pressure-tested against the unit economics model. If the product requires significant manual work to onboard and the CEO says he doesn't want to be in services, where does that cost land in the model?

---

### Customer Interview — What to Look For

*At NWAi's stage, traction tells you the company exists. Behavioral intensity in the customer base tells you whether the market will.* (Derived from Bennett, a16z speedrun, May 2026 — intensity of behavior over size of user base.)

> **Two surfaces, one playbook.**
> **Pre-call use:** Deal lead conducting the interview reviews this section *before* the call and uses the four-question Behavioral-Intensity Question Bank as the live call structure. The `/diligence` command surfaces these four questions in the DD Kickoff Package's Part F (Recommended DD Actions) so they reach the deal lead before any customer interview happens.
> **Post-call use:** `/post-meeting [Company] interview` applies the same four questions as an analytical lens against the transcript, captures verbatim responses with attribution, and classifies Behavioral Intensity (Strong / Some / None) in the Analyst POV box.
> If the questions weren't asked in the call, the post-call analysis will return weak signals on all four probes — not because the customer is weak, but because the call was structured around satisfaction rather than behavioral intensity. The pre-call surface is what makes the post-call analysis work.

Customer interviews are meetings *with the company's customers*, not with the company itself. They are the highest-credibility evidence in any diligence record because the speaker has no economic stake in the founder's narrative. The behavioral signals the customer reveals — what they replaced, how they discovered the product, what they'd do without it — are leading indicators of whether the company is riding a real market or selling into a small fixed pond.

**Primary analytical questions — the Behavioral-Intensity Question Bank.** Four questions to anchor every customer interview. Each one targets a distinct behavioral signal; together they triangulate Memory Lock-in and pre-category demand. Ask all four explicitly if the customer doesn't surface the answers spontaneously.

1. **Tool replacement & adoption** — *"What were you using before this product? How did you find this one and what made you switch?"*
   Combined discovery + switching-cost probe. Tests pull-driven vs. push-driven adoption (pull = peer recommendation, behavioral search, internal champion — leading indicator; push = cold outbound, broad marketing — neutral-to-negative) AND surfaces what gap the product actually filled. A clean answer (*"we used X, this is materially better at Y, and a peer mentioned it"*) is much stronger than *"we weren't doing this before and the vendor reached out."*

2. **Unplanned use cases** — *"Have you found ways to use this that the vendor didn't pitch to you? Or that surprised you?"*
   Tests product malleability and depth of user engagement. Users who bend the product into unplanned use cases are signal of category-forming behavior. A customer who uses the product exactly as it was pitched is using it as a feature; a customer who has invented their own workflows is using it as a platform.

3. **Organic evangelism** — *"Have you talked to anyone outside your company about this product? Tell me about that."*
   Tests whether word-of-mouth is genuine, anchored in actual past behavior (not *"I'd refer it"* hypotheticals). Spontaneous external advocacy is the strongest pre-category signal — it means the customer is doing the company's marketing without being asked.

4. **Counterfactual loss** — *"If this product disappeared tomorrow, what would you do?"*
   The Sean Ellis test variant. The strongest behavioral signal of Memory Lock-in. *"I'd panic"* / *"there's no real alternative"* reveals true stickiness; *"I'd find a substitute"* reveals commodity status; *"I'd go back to what we used before"* reveals a low switching cost in both directions.

**Key declaration types in customer interviews:**
- **Adoption declarations** — how discovery and switching actually happened (pull vs. push)
- **Stickiness declarations** — what would change if the product went away
- **Workflow declarations** — how the product changed how the customer works (replacement vs. addition)
- **Sourcing declarations** — whether the customer is part of a community talking about this category (Discord, Slack, peer network)

**Structural contradictions to watch for:**
- Customer says product is "transformative" but can't name what was replaced or what they'd do without it
- Customer describes use cases identical to vendor pitch (no malleability — pure consumption of the marketed product)
- Customer came through vendor introduction but shows no signs of organic discovery patterns
- Customer praises the vendor effusively but reveals minimal time-in-product per week

**Carry forward from Product / GTM / Financials meetings:**
- Did the vendor's claimed use cases match what this customer actually does with the product?
- Did the vendor's claimed ACV / margin economics match what this customer actually pays?
- Did the vendor's claimed customer concentration / channel mix match what this customer reveals about their own buying path?

**Behavioral Intensity classification (mandatory in Analyst POV box):** Synthesize the four-question read into a single classification:
- **Strong** — Pull-driven adoption, replaced a real prior tool, unplanned use cases present, has evangelized externally, would not have a viable substitute.
- **Some** — Mixed signal; product is valued but two or more of the four questions return weak answers.
- **None** — Push-driven adoption, no prior tool replaced, uses exactly as pitched, no external advocacy, would find a substitute. *Indicates commodity status — flag in Analyst POV.*

---

## Progressive POV — How Insights Accumulate

The three diligence meetings are not independent events. Each one tests and deepens the thesis formed at Scout. By the end of the third meeting, the investment thesis should be near-complete.

**After Product meeting:** Thesis updated on: moat reality, product maturity, technical depth, structural contradictions in the business model.

**After GTM meeting:** Thesis updated on: channel activation likelihood, revenue model reality, competitive positioning, sales execution risk.

**After Financials meeting:** Thesis updated on: unit economics, scaling math, return path, capital efficiency.

**The running thesis statement** (maintained in chat after each `/post-meeting` run) should answer: *Given everything we now know, what is the investment case, and what is the single biggest remaining risk?*

---

## Output Structure for `/post-meeting`

Every post-meeting document follows this exact structure:

### Section 1 — Analyst POV (header box)
Dark navy background. Company name + meeting type + date. 2–3 sentence verdict: what this meeting revealed, how it updates the thesis, what the next meeting must resolve.

### Section 2 — Key Insights (primary table)
3 columns: **Insight Label** | **What Was Said / Observed** | **NWAi Impact & Implications**

- 4–6 rows maximum. Quality over quantity.
- Ordered by materiality, not by meeting sequence.
- Insights reference verbatim quotes where available.
- No "New Issues" section — new findings that matter are elevated to Key Insights. New findings that don't materially affect the thesis are omitted.

### Section 3 — Resolved/Open Tracker (secondary table)
4 columns: **#** | **Question** | **Finding** | **Status**

- Condensed — one paragraph maximum per item.
- Status values: ✅ RESOLVED | ⚠️ PARTIAL | 🔴 OPEN
- Items that are cleanly resolved stay brief. Depth belongs in Key Insights.

### Document naming convention
`[Company]-[MeetingType]-Meeting-Reconciliation-[YYYY-MM-DD].docx`

Example: `Synergist-Product-Meeting-Reconciliation-2026-04-05.docx`

---

## What This Is Not

- **Not a new issues tracker.** Micro-level observations that don't affect the investment thesis belong in meeting notes, not in this document.
- **Not a fact summary.** Every sentence in the Key Insights section must bear on investability.
- **Not independent of prior context.** The analyst lens is applied against the accumulated knowledge from every prior stage — Scout, DD Kickoff, prior meetings. Each meeting is a chapter, not a standalone report.
