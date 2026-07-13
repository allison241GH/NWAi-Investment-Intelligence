# The Alpha-AI Sovereignty Framework for NWAi Investment Analysis

> **STATUS: ACTIVE — Phase 2 installed July 13, 2026** (plugin v3.0.0, architecture v0.38.0; all
> five calibration questions ratified by Jamie July 11, 2026 — rulings in
> `pipeline-decisions-log.md` Decision 9). Pipeline hooks: Scout Q8 (`scout-questions.md`),
> Diligence Moat Tier 4 (`diligence-scoring-rubrics.md`), DD Report Section 3 companion line +
> standing Appendix A provider-terms item (`dd-report-format-reference.md`), scoped agent sections
> (technology / risk / competitive-positioning analysts).
> **One recorded deviation from the install spec below:** at Screen, the "Alpha Leakage Signal"
> trip-wire design was superseded by its Claude V13 evolution — **Signal 6: Protect Alpha** with a
> printed KEEPS / MIXED / LEAKS / N/A read (`gates-and-flags-techgroup.md`). Still routing-only, no
> weight; the trip-wire triggers below became the Signal 6 flag conditions.

*The fourth always-active investing lens, alongside Structural Discontinuity, Memory Lock-in, and
Agent-Era Readiness.*
*Derived from: `docs/strategy/future-of-venture-investing/NWAi-Alpha-AI-Sovereignty-Thesis-2026-07.md`
(evidence base: `NWAi-Alpha-AI-Sovereignty-Research-Base-2026-07.md`).*

## The Core Challenge: The Supplier-Predator Problem

The frontier labs are simultaneously the most valuable suppliers and the most dangerous competitors
a startup has ever had. The verified 2026 record: Anthropic shipped first-party products into five
categories its customers and partners had proven, within five months (coding, design, security,
legal, science); the Claude Code launch overtook Anthropic's own largest customer (Cursor) after
executives privately downplayed competitive intent; four labs stood up billion-dollar
forward-deployed engineering units in a single week to embed inside enterprises.

The mechanism is not data theft — it is worse. Commercial API terms at all three major labs
prohibit training on customer content, and no violation is documented; **the labs don't take the
bytes — they take the business, and everything they take is legal, uninsurable, and beyond the
reach of any contract.** The lab doesn't need the content:

- It **watches traffic prove the category** (revenue concentration and usage patterns are demand
  data — no zero-data-retention agreement addresses this channel);
- It **pays wholesale** for the inference its customer-competitors buy retail;
- **Consumer-tier tools train by default** (Claude Free/Pro/Max, consumer ChatGPT, unpaid Gemini) —
  a team building with consumer AI tooling leaks with no contract violated;
- **No-train ≠ no-exposure** — retention carve-outs, gated/incomplete ZDR tiers (unavailable
  entirely on some frontier models), litigation holds;
- **Opt-in data partnerships** are the legal channel where domain alpha transfers outright.

At the same time, the two biggest application-layer winners of the era (Cursor, Harvey) were built
*on* frontier models — so frontier-API dependence is the normal, often optimal, early posture, not
a disqualifier. **This lens does not punish building on labs. It tests whether the company knows
what its alpha is, where it flows, and how it moves house.**

**What counts as "alpha"** (referenced by every dimension below): the company's proprietary data
and data flywheel; workflow knowledge and domain scaffolding; eval sets and harness logic; domain
IP; customer relationships and the usage patterns that encode them. For Dimension 3, the same
definition applies to the *customer's* alpha.

The screening **doorway question** — the entry point, not the whole test:

> **"When this product runs, where does the alpha flow — does it stay home, or drain up to the lab?"**

"The alpha" is deliberately two-sided: the startup's own, and its customers'. Both failure modes
walk through the same doorway. Walk through it and the scored questions are: *What is the alpha?
Who sees it in transit? Can the company move house? Does its go-to-market survive customers
demanding the alpha stay home?*

---

## The Three Test Dimensions

Each dimension is scored **0–5** (anchors below). Score a **single horizon** (today's posture) and
add one **direction-of-travel line**: *at the current token-deflation and open-weight trajectory,
does this position strengthen or erode over the hold period?* (Sovereignty dynamics move on
12–24-month cycles — a decade-out score would be false precision; the direction line replaces the
dual-horizon scoring used in the Agent-Era lens.)

### Dimension 1: Alpha Containment

*Does the startup's own alpha leak to the labs it builds on?*

**Key question:** *If the model provider examined everything this company sends through its API —
prompts, context, tool schemas, feedback loops — plus its traffic volume and shape, could the
provider reconstruct the product's edge or read the category's momentum?*

**Investor Signals:**
- ✅ The differentiating layer (proprietary data, evals, harness logic) is processed locally or
  pre-API; only minimized, commoditized context transits the provider
- ✅ Contractual containment **verified in the actual agreement** — no-train / zero-data-retention
  terms confirmed, tier identified (commercial vs consumer), exclusions understood — and the
  architecture does not rely on the contract alone
- ✅ Distilled or fine-tuned own models serve the alpha-bearing path; frontier API used for
  commodity reasoning
- ✅ Team's own build tooling is on commercial no-train tiers (not consumer apps that train by default)
- ❌ The core differentiator transits a single frontier provider verbatim, at volume, daily — the
  lab's view of the traffic IS the product spec
- ❌ "Partnership" with a lab involving data contribution, co-development, or preferred access whose
  limits the founder cannot articulate
- ❌ "They say they don't train on API data" is the founder's entire containment answer
- ❌ Engineers build with consumer-tier AI tools (default-on training)

**Anchors:** 5 = alpha architecturally invisible to providers + terms verified · 4 = minimized
transit + verified terms + containment roadmap funded · 3 = alpha transits but terms verified and a
credible minimization/distillation path exists (the honest early-stage norm) · 2 = full pass-through,
terms claimed but unverified · 1 = full pass-through, terms unexamined, consumer-tier tooling in the
build · 0 = active data-sharing partnership with a lab that is shipping into the company's category.

### Dimension 2: Model-Layer Independence

*Can it move house — switch models, run open-weight, deploy inside a boundary?*

**Key question:** *If its primary provider tripled prices, degraded its tier, or shipped a competing
native product tomorrow — the Cursor scenario — how long until this company is running elsewhere at
comparable quality?*

**Investor Signals:**
- ✅ Model-agnostic harness with **maintained evals**; regularly benchmarked across ≥2 frontier and
  ≥1 open-weight model; switching demonstrated, not asserted
- ✅ Open-weight / on-prem / VPC deployment exists or is credibly costed on the roadmap — the
  company **rides the deflation curve** (gets cheaper to run every year) instead of renting its cost
  curve from its likeliest competitor
- ✅ The harness/data/workflow is the product; the model is a replaceable part (the Harvey pattern:
  its alpha survived the death of its own model)
- ❌ Hard single-provider coupling — prompts, features, or economics tied to one lab's proprietary
  capabilities with no abstraction layer
- ❌ "We'll switch if we need to" with no evals, no benchmarks, no second integration
- ❌ Margin structure only works at one provider's current (subsidized) pricing

**Anchors:** 5 = proven multi-model + sovereign deployment shipping · 4 = abstraction layer +
demonstrated switch, sovereign path costed · 3 = abstraction layer exists, open-weight path credible
but undemonstrated (the honest early-stage norm) · 2 = single provider, abstraction claimed, nothing
tested · 1 = single provider, no abstraction, no plan · 0 = the provider's proprietary capability IS
the product.

### Dimension 3: Customer Sovereignty Alignment

*Does the go-to-market survive customers demanding sovereignty — or does the product require
customers to leak THEIR alpha?*

**Key question:** *When this company's target buyers start requiring that their data, weights, and
inference stay inside their boundary — as regulated and IP-dense buyers already are — does demand
for this product go up or down?*

**Investor Signals:**
- ✅ Deploys inside the customer's trust boundary (VPC / on-prem / edge), or never takes custody of
  customer alpha; sovereignty demand is a **tailwind**
- ✅ The product strengthens the customer's ownership of its own data/alpha (control plane,
  governance, in-boundary pipeline) — the Enabler pattern
- ✅ Founder can name which buyers already ask for sovereign deployment and what the answer costs
- ❌ Core value prop requires customers to pipe proprietary or regulated data through third-party
  frontier APIs via the startup — the startup is a **leakage conduit** for its customers' alpha
- ❌ Target verticals are regulated or IP-dense (health, defense, financial, legal, pharma) with no
  sovereign deployment path stated or costed
- ❌ The pitch's data-flywheel depends on aggregating customer data that customers are refusing to
  share (the verified life-sciences dynamic: pooled data destroys its proprietary value)

**Anchors:** 5 = sovereignty demand is the tailwind, or the product IS the sovereign path · 4 =
in-boundary option shipping, cloud default · 3 = cloud-API today, credible sovereign option
roadmapped, buyers not yet demanding it · 2 = conduit architecture with awareness but no costed
path · 1 = conduit architecture in a sovereignty-sensitive vertical, no path · 0 = the business
model *requires* customer-alpha aggregation that sovereignty demand structurally forbids.

---

## The Four-Posture Classification

Internal analytic shorthand for the deal team — translated to plain language in member-facing
output (see Output Format). The member one-liner for the whole lens: **"Does this company keep its
secret sauce — and its customers' — out of the frontier labs' hands?"**

| Posture (internal) | Plain-English read for members | What it means | Investment implication |
|---|---|---|---|
| **Leaking** | **Weaker** — its secret sauce (or its customers') drains to the labs it builds on | Own alpha transits the provider unprotected, and/or the product is a conduit for customer alpha with no sovereign path. It is feeding the entity most likely to subsume it. | ❌ Default caution. Not an auto-kill at early stage — but requires a named, funded containment path. If the lab has already shipped into the category: default pass. |
| **Hedged** | **Holding** — dependent today, with the exits mapped | Builds on frontier APIs (the normal starting point) with verified no-train terms, an abstraction layer, and a credible portability/sovereign roadmap. | ✅ Acceptable — the SAFE-note of this lens: normal early posture, negotiated toward Sovereign over time. Write the containment milestones into watch items or terms. |
| **Sovereign** | **Stronger** — it keeps the alpha home | Alpha architecturally contained; model-agnostic; deployable in the customer's boundary. Rides token deflation; gets cheaper to run every year. | ✅ The durable posture. Verify it is architecture, not slideware. |
| **Enabler** | **Stronger** — it sells sovereignty itself | Picks-and-shovels of the countermovement: open-weight harnesses/control planes, on-prem/VPC/edge inference, in-boundary data pipelines, agent governance & audit. | ✅ The rising category (validated at nation-state scale by Palantir–NVIDIA). Wins whichever lab wins. Maps to TechGroup Theme 4 (sometimes Theme 1). Still run the other lenses — an Enabler can be a thin wrapper too. |

**Most companies are mixed — read where they stand today, then capture the path.** As in the
Agent-Era lens: score the honest current posture (don't let a roadmapped sovereign option dress a
Leaking deal as Hedged), then record two plain-language lines for the member-facing output —
**"Could get stronger if:"** (the one concrete move to a more durable posture, e.g., "ships the VPC
deployment it has roadmapped") and **"What to watch:"** (the confirming milestone, e.g., "first
regulated-industry logo on sovereign deployment"). The watch-item is what the deal team monitors or
writes into terms.

**Headline verdict (sum of three dimensions, 0–15):**
- **FORTIFIED (12–15)** — alpha contained, portable, sovereignty-aligned
- **HEDGED (8–11)** — dependent but contained; the negotiable norm
- **LEAKY (4–7)** — meaningful uncontained flow; containment path required to advance
- **CAPTURED (0–3)** — structurally feeding its own predator; no credible exit

---

## Interaction Map — No Double-Counting

This lens sits close to four existing tests. Each row states what the existing test keeps, what
this lens adds, and the rule that prevents scoring the same weakness twice.

| Existing test | What it tests (keeps) | What Alpha-AI Sovereignty adds (new) | No-double-count rule |
|---|---|---|---|
| **LLM Ingestion Test** (`gates-and-flags-techgroup.md`) | *Outside-in*: could a lab-model agent replicate 80% of the build from **public** data? | *Inside-out*: what does the lab learn from **this company's own traffic, tier, and terms**? A company can pass LLM Ingestion (unique data nobody has) and still be Leaking (it ships that unique data through the API daily). | LLM Ingestion caps Defensibility on public-replicability only. Alpha Containment (D1) never re-penalizes public replicability; it scores leakage of the *non-public* edge. |
| **Goliath Test** (`gates-and-flags-techgroup.md`) | Incumbent *capability + intent*: could a Goliath kill it with a feature in 12–18 months? | Whether the startup is **training its own Goliath** — supplying the demand signal that shortens those 12–18 months (the Cursor mechanism). | The Goliath result stays a Defensibility cap. D1 evidence may *inform* the Goliath timeframe (note it in the Goliath rationale) but is scored once, in D1. |
| **Replicability Speed Matrix — "LLM provider" row** (`ai-moats-framework.md`) | Time-to-native-feature from the lab's general capability. | An **annotation** on that row (Phase 2 option): *"Alpha exposure: what the lab learns from serving this company, and whether it shortens the timeframe above."* Annotation, not a fifth threat-actor row — the actor is the same; only the information channel is new. | The <12-month Strong Yellow fires once. The annotation may justify a shorter estimate; it cannot fire a second flag. |
| **Agent-Era Readiness / Q7** (`agent-era-readiness-framework.md`) | Demand-side substrate shift: does the **problem** survive agents? What's defensible when surfaces are scrapable? | Supply-chain posture: given the problem survives, **who captures the alpha** along the model supply chain? A deal can be Riding (agent-native, reimagined problem) and Leaking (its harness pipes everything through one lab). | Q7 never scores dependency/leakage; this lens never scores problem-dissolution. The shared "data sovereignty / governance of memory" signal stays in Q7 as a *moat mechanism*; this lens scores the *company's own posture and flows*. |
| **Q4 Ecosystem Role** (`scout-questions.md`) | Structural position: does it set the rules or play by them? | Direction of alpha flow + portability + customer-side alignment. Orthogonal cases prove the distinction: a Q4-follower running open-weight locally is Sovereign; a Q4-creator platform piping customer data through one lab is Leaking. | Q4 scores *who depends on whom*; this lens scores *what flows and whether it can move*. Cross-reference, never merge. |
| **Two Sustainable Advantage Tests** (`ai-moats-framework.md`) | Whether a training/inference **edge exists**. | Whether the edge is **protected from the supply chain**. "Training edge PRESENT + Alpha Containment ≤1" = the edge exists and is being exfiltrated — the most dangerous quadrant. | The moat rating scores the edge; D1 scores its containment. Neither adjusts the other's score; the *combination* fires a flag (below). |

---

## Flag Triggers & Score Caps (Calibrated)

**The SAFE-note principle, stated plainly:** building on frontier APIs is the normal early-stage
starting point — like a SAFE, it is neutral at intake and negotiated toward a stronger structure
(Hedged → Sovereign) as the company scales. The two best application-layer outcomes of the era were
built on frontier models. **Caps trigger on structural conduit design or unawareness — never on API
usage per se.**

- ⚠️ **Yellow Flag — Own-Alpha Leakage, terms unverified.** The claimed differentiator transits a
  frontier provider and containment terms are CLAIMED or ABSENT (not verified). No score cap;
  generates a standing diligence item ("obtain the provider agreement; verify no-train/ZDR terms
  and tier") and a Live Pitch question.
- ⚠️ **Strong Yellow Flag — Customer Alpha Conduit.** Core value prop requires customers to pipe
  regulated or high-sensitivity proprietary data through third-party frontier APIs, AND no sovereign
  deployment path exists. Mechanics: founder shows **no awareness or roadmap** → D3 and (at Screen)
  Defensibility **cap at 2/5**; a **credible, costed sovereign path roadmapped but unbuilt** → cap
  at **3/5** (Cynical-Default-style: evidence lifts it).
- ❌ **Red Flag — Captured.** Single-provider dependency + that lab has announced or shipped a
  competing native product + the company's alpha transits that provider. **Default to pass** unless
  a funded migration path exists (exact parallel to the Agent-Era "Threatened with no funded path"
  red flag). The Cursor escape (owned customers + harness + sprint to own model) is the bar a
  rebuttal must clear.
- ⚠️ **Combination Flag — "Edge being exfiltrated."** Two-Test verdict shows Training Advantage
  PRESENT *and* Alpha Containment ≤ 1: the moat is real and draining. Requires a containment plan
  to advance.
- **Cap arithmetic:** sovereignty caps compound with, but never stack under, existing caps — apply
  the **minimum** of all applicable caps; never subtract twice for the same weakness.
- **Enabler handling:** posture tag + routing note (TechGroup Theme 4, sometimes Theme 1) — **no
  score bonus.** Reward the company, not the category: an Enabler still runs every other lens (an
  Enabler can be a thin wrapper too). The sovereignty tailwind may corroborate Structural
  Discontinuity's "why now" (Q1) — scored there, once.

---

## Application to NWA Investment Analysis

When applying this lens at Screen (doorway + trip-wire), Scout (scored), or Diligence (full rubric):

1. **Doorway question first** — *where does the alpha flow?* Map what the alpha is before scoring.
2. **Build the three required reads:** the **Alpha Map** (what is the alpha; what transits which
   provider, at what tier), the **Dependency Read** (provider(s); no-train/ZDR terms VERIFIED /
   CLAIMED / ABSENT; portability evidence), and the **Customer Sovereignty Read** (does the GTM
   survive buyers demanding data stay home).
3. **Score the three dimensions 0–5** — Alpha Containment, Model-Layer Independence, Customer
   Sovereignty Alignment — single horizon plus the direction-of-travel line.
4. **Place the posture** — Leaking / Hedged / Sovereign / Enabler — and capture "Could get stronger
   if:" / "What to watch:".
5. **Apply flag triggers** (above), then map the total (0–15) to the headline verdict.

**Output format (for Scout / DD Report / Memo) — lead with the plain question, not the jargon:**
> **Does this company keep its alpha — and its customers' — out of the frontier labs' hands? → [KEEPS / LEAKS / MIXED]**
> [2–3 plain sentences a non-specialist can follow: what the company's alpha is, where it flows
> when the product runs, and why that helps or hurts. No framework labels in this part.]
> **Could get stronger if:** [the one concrete move to a more durable posture].
> **What to watch:** [the milestone that confirms the move].
> *Deal-team line (internal): [X]/15 — [FORTIFIED / HEDGED / LEAKY / CAPTURED]; posture [Leaking /
> Hedged / Sovereign / Enabler]; provider terms [VERIFIED / CLAIMED / ABSENT]; direction of travel
> [strengthening / eroding]. Scores and labels are for the deal team — the plain read above is what
> members see.*

---

## Pipeline Hooks — Phase 2 Install Spec (INSTALLED July 13, 2026 — retained as the design record)

*This section was the downstream design; it was executed at the July 2026 install (plugin v3.0.0)
with one deviation: the Screen trip-wire below shipped as the V13-evolved Signal 6 Protect Alpha
(see the status banner). The open calibration questions at the end were all resolved July 11, 2026
— rulings recorded in `pipeline-decisions-log.md` Decision 9.*

### Screen — "Alpha Leakage Signal" (lightweight trip-wire)

New subsection in `gates-and-flags-techgroup.md`, directly after the Agent-Era Exposure Signal,
same pattern — **a fast qualitative read, not a scored dimension; a routing flag that does not gate
or cap on its own:**
- ⚠️ **Customer Alpha Conduit trigger:** value prop requires customers to pipe regulated/proprietary
  data through third-party frontier APIs and the deck states no sovereign deployment path → flag
  text: *"Alpha-sovereignty exposure: product is a conduit for customer proprietary data to frontier
  labs. Run full Alpha-AI Sovereignty at Scout."*
- ⚠️ **Own-Alpha Exposure trigger:** the claimed differentiator visibly transits a single frontier
  provider with no stated containment.
- **Latent Enabler note:** sovereignty-enabling positioning spotted at Screen routes to Scout for
  scoring — not resolved at triage.
- Closing distinction (mirrors the Agent-Era signal's): the AI Wrapper Assessment tests
  *replicability of the build*; Agent-Era Exposure tests *whether the problem survives*; this signal
  tests *direction of alpha flow and dependency posture*. Applies to Track A, and Track B where the
  product has a model supply chain.

### Scout — new Q8: Alpha-AI Sovereignty

Added to the Strategic dimension group in `scout-questions.md` (following the June 2026 Q7
precedent): **Strategic group becomes 5 dimensions within the same 20% weight and 3.0 weighted-max —
the Scout Conviction total (19.0) and conviction bands unchanged.** Q8 requires the three reads
(Alpha Map, Dependency Read with VERIFIED/CLAIMED/ABSENT terms status, Customer Sovereignty Read),
scores 0–5 mapped to postures (5 = Sovereign or proven Enabler · 4 = strong Hedged, containment
verified · 3 = normal Hedged · 2 = meaningful uncontained leakage or conduit-with-awareness · 1 =
Leaking with weak rebuttal · 0 = Captured), and emits the member-facing KEEPS/LEAKS/MIXED block.
Report format: one new Score Summary row (`Alpha-AI Sovereignty | — | X/5 (posture) | NEW`).

### Diligence — Tier 4: Alpha-AI Sovereignty (0–15)

New tier in `diligence-scoring-rubrics.md` after Tier 3, **gated to deals with a model supply
chain** (any product calling third-party models); non-AI deals record "N/A — no model supply
chain." Include the tier-distinction paragraph: *Tier 2 tests replicability of the build; Tier 3
tests whether the problem survives agents; Tier 4 tests who captures the alpha along the model
supply chain.* Agent assignments:
- **technology-analyst** → D1 + D2 evidence: what actually transits the API (architecture read),
  abstraction-layer reality (evals? second integration?), open-weight feasibility, sovereign
  deployment maturity. Natural extension of its thin-wrapper/TRL scope.
- **risk-analyst** → contract/dependency risk: provider ToS and no-train/ZDR verification as a
  named diligence item (tier, exclusions, retention windows), partnership concentration, regulatory
  sovereignty exposure (HIPAA/ITAR/GDPR/EU-AI-Act pressure on the conduit question), customer-side
  sovereignty demand as market risk.
- **competitive-positioning-analyst** → lab vertical-integration signals into this category (the
  Claude Code/Design/Science cadence; feeds the Replicability Matrix LLM-provider-row annotation),
  sovereignty-demand evidence in the buyer market (RFP language, on-prem/VPC requirements — pairs
  with the Q1b demand-signal method), Enabler-category competitive mapping.

### DD Report mapping

Tier 4 verdict line lives in **Section 3 — AI/Software Moat** as a companion line to the Tier 2
score (both are model-supply-chain reads; Section 3 is already omitted for non-AI deals, matching
Tier 4's gate). Lab vertical-integration threat feeds **Section 4 — Competition & Moat**;
conduit/regulatory items feed **Section 10 — Risk**; unverified provider terms become a standing
**Appendix A** outstanding item: *"Obtain model-provider agreement; confirm no-train/ZDR terms,
tier, and exclusions"* (Owner/Priority per the existing table).

### Install checklist (Phase 2 — every file touched)

1. `gates-and-flags-techgroup.md` — Alpha Leakage Signal subsection + version-history line
2. `scout-questions.md` — Q8, Strategic-group weighting note, Score Summary row, report format
3. `diligence-scoring-rubrics.md` — Tier 4 + tier-distinction paragraph + agent assignments
4. `dd-report-format-reference.md` — Section 3 companion line, Section 4/10 feeds, Appendix A item
5. `ai-moats-framework.md` — optional annotation on the Replicability Matrix LLM-provider row
6. Agent files: `technology-analyst`, `risk-analyst`, `competitive-positioning-analyst` — scoped additions
7. `SKILL.md` — add this framework to the reference list
8. `CLAUDE.md` — fourth-lens line in Investing Voice & Philosophy + Key Frameworks entry
9. Remove the DRAFT banner from this file
10. `nwai-techgroup-pipeline-architecture.md` — version bump + affected sections
11. `pipeline-decisions-log.md` — Decision entry (rationale / calibration / what did not change)
12. Repackage plugin (`repackage-plugin.sh`), bump version

### Open calibration questions (resolve at install review)

1. Posture label "Leaking" — acceptable if it reaches member conversation?
2. Customer-Alpha-Conduit Strong Yellow at 2/5 (unaware) / 3/5 (roadmapped) — or should a credible
   roadmapped path clear the cap entirely?
3. Tier 4 gating: model-supply-chain deals only (recommended) vs universal like Tier 3?
4. Replicability Matrix: annotation on the LLM-provider row (recommended) vs an inverse fifth row?
5. Make "provider no-train/ZDR terms VERIFIED" a standing Appendix-A item for **all** AI deals
   immediately (cheap, high-value), even before full install?

---

## The Resonating Takeaway (for memos)

*"The frontier labs don't steal your data — the terms forbid it, and they don't need it. What they
take is legal, and no contract can stop it: they watch your traffic prove your market, they pay
wholesale for the intelligence you buy retail, and once your category is demonstrated they ship it
themselves at a price you cannot match. They take the business, not the bytes. History says the
platform stays rich while it does this — and every trend line says the intelligence you rent is
commoditizing while the alpha you own is the only asset in the stack that appreciates. So back the
founders who know exactly what their alpha is, keep it where the lab can't see it, and can change
engines mid-flight — and look hard at the ones selling the locks everyone is about to need. In the
AI era, the intelligence is rented. The alpha is what you own. Don't fund companies that can't
tell the difference."*

Use this framing when presenting the Alpha-AI Sovereignty verdict to NWA's Investment Committee.
