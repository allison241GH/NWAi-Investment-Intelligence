# The Alpha-AI Sovereignty Thesis

*NWAi Investment Intelligence — strategic thesis, July 2026*
*Author focal point: Jamie (Board Director, Investment Intelligence & AI; TechGroup Co-Chair)*
*Status: thesis draft for review. Spawns → `alpha-ai-sovereignty-framework.md` (the scored assessment lens) once signed off.*
*Evidence base: `NWAi-Alpha-AI-Sovereignty-Research-Base-2026-07.md` — every `[n]` below resolves to
its Sources section; claims are stated at the confidence level established there (Verified /
Reported / Inferred), not upgraded.*

> **Reader note.** This is a *deal-assessment* thesis, not a platform-strategy doc. It is the
> fourth always-active investing lens, alongside Structural Discontinuity, Memory Lock-in, and
> Agent-Era Readiness. Where Agent-Era Readiness asks whether the *problem* a startup solves
> survives the agent substrate shift, this lens asks a supply-chain question about the startup
> itself: **who captures the alpha along its model supply chain — and can it protect its own?**
> The framework it spawns plugs into Screen, Scout, and Diligence.

---

## The Thesis (One Sentence)

**Intelligence is commoditizing; the durable value is business alpha — every platform wave ends
with the engine becoming a commodity sold by a rich oligopoly while enduring value migrates to the
context built on top of it, and this wave adds a predator's twist (the oligopoly competes with its
own customers) — so what we underwrite in every deal is not the intelligence a company rents but
the business alpha it owns and protects: its proprietary data, workflows, customer trust, and
harness.**

---

## 1. The Belief That Just Broke

For two years the prevailing assumption in AI investing was that value would concentrate in the
intelligence layer. Scaling laws, capital moats, the "large hub" consensus — the frontier models
were the value, and everything above them was a feature waiting to be absorbed or a wrapper
waiting to be steamrolled. Sam Altman said the second part out loud, on the record: OpenAI will
*"steamroll you"* if your startup is a thin wrapper — *"It's not personal; it's our mission"* [52].

What broke in mid-2026 is not that assumption's first half — the labs are doing extraordinarily
well (we will be honest about that below) — but its second half. Three things cracked it at once:

**The labs' own behavior.** In five months, Anthropic shipped first-party products into five
categories that its customers and partners had proven: Claude Security (April), Claude Design
(April), Claude for Legal (May), Claude for Financial Services templates (May), and Claude Science
with an internal drug-discovery program (June) [8][9][10][11]. Each entered a category previously
served by companies building on Anthropic's own models. This is verified, dated, and recent — the
pattern is no longer a hypothetical.

**Enterprise refusal.** Palantir's Alex Karp went on CNBC (July 1, 2026) and said what enterprise
buyers had been saying in private: technical customers want *"control over their compute, their
models, their data stack and their alpha… they want to know they own the means of production"*
[15][16]. Karp is selling the alternative — the same week, Palantir and NVIDIA launched a
"Sovereign AI Operating System" in which US government agencies own the hardware, train on their
own data, and retain full ownership of the resulting model weights [13][14]. Self-interested,
yes. But the demand he is selling into is real: 53% of organizations now rank data privacy as the
#1 obstacle to AI-agent adoption [58], defense workloads at IL4/IL5 require air-gapped deployment
[60], and the EU AI Act's high-risk tranche binds from August 2026 [30].

**The economics of the token.** Karp's sharpest observation was not the anger — it was the
pricing tell. *If frontier intelligence were truly generating standalone billions for enterprises,
the labs would price like partners (a share of value created). Instead they charge for tokens —
metered, like a utility.* Utilities are what you build on, not what you fear. What you fear is a
utility that also competes with you.

The old belief — value lives in the intelligence layer, everything above is temporary — has
inverted into a sharper question for anyone deploying capital: **when the layer below you keeps
the margins AND enters your category, what do you actually own?**

---

## 2. The Extraction Pattern — Verified

Strip the podcast heat away and the documented record is damning enough on its own.

**The Cursor case — the canonical example.** Cursor built the AI-coding category on Anthropic's
models and at peak contributed a reported 40–50% of Anthropic's revenue [6]. Anthropic executives
privately told Cursor's leadership that Claude Code was *"more of a research effort than a
commercial push"* — then launched it commercially, at prices Cursor could not match because
Anthropic pays wholesale for its own inference. Claude Code hit a ~$2.5B run-rate by February 2026,
overtaking Cursor's $2B; Cursor's CEO called an emergency all-hands ("cancel everything, we're
building our own model") and shipped its own model, Composer, within the year [6][7]. Fortune's
sourcing: Anthropic used *"financial firepower and model provider advantage to offer Claude Code at
lower prices than Cursor reasonably can match"* [7].

Note precisely what happened, because the mechanism matters for how we score it. **No source
alleges Anthropic read Cursor's data.** It didn't need to. The lab had three structural advantages
no contract addresses: it could *see the category being proven* (revenue concentration is demand
data), it *pays wholesale* for the inference its competitor buys retail, and it controlled the
private narrative its largest customer relied on. That is the extraction pattern in its true form —
market-signal extraction, not content theft.

**The Figma case — the information-channel version.** Anthropic's chief product officer sat on
Figma's board. He resigned on April 14, 2026 — the same day The Information reported that
Anthropic's next model would ship Figma-competing design tools — and Claude Design launched about
three days later [1][2][3]. Figma's CEO, carefully: *"They were not consistently candid in their
communications"* [1]. (Honest framing for members: Figma's ~50% decline is its 2026 year-to-date
figure, not a launch-day collapse — the stock was already well off its 2025 peak. The verified
scandal is the sequence, not the stock chart [4].)

**The pattern is now industrialized.** OpenAI offers Y Combinator startups $2M in inference
credits — in exchange for equity via uncapped SAFE, an ecosystem-visibility-and-lock-in play
dressed as generosity [17]. OpenAI's Data Partnerships program is a standing invitation:
*"If you have data you wish to keep private, but you would like OpenAI models to have a better
understanding of your domain, this is the optimal way to partner"* [56] — the legal, opt-in channel
through which domain alpha most directly transfers (Harvey contributed ~10B tokens of case-law data
to a custom OpenAI model [57]). And in a single week of early July 2026, Microsoft ($2.5B, 6,000
engineers), Amazon ($1B), OpenAI (>$4B), and Anthropic ($1.5B JV) all stood up forward-deployed
engineering units whose explicit purpose is to embed inside enterprises and wire the labs' models
into their customers' workflows [18][19]. The FTC's own 6(b) report found that lab partnerships
carry *"consultation, control, and exclusivity rights"* that can *"reveal sensitive information
that can undermine fair competition"* [54].

One claim from the transcripts we deliberately do **not** carry forward at full strength:
Friedberg's account of Anthropic soliciting proprietary life-sciences data in exchange for early
access is podcast-only — no independent outlet corroborates it [12]. The verified adjacent facts
(Claude Science, the internal drug program) make it plausible; plausible is not verified; it stays
tagged Reported.

---

## 3. They Don't Take Your Bytes — They Take Your Business

Get the mechanism exactly right, because the popular version *understates* the danger. "Use a
frontier API and the lab trains on your data" is contractually false — all three major labs'
commercial terms prohibit it (Anthropic: *"Anthropic may not train models on Customer Content from
Services"* [42]; OpenAI, no training on API data since March 2023 absent opt-in [46]; Google, paid
tier no-train [47]), and we found no documented violation [49]. **Correcting that claim is not a
defense of the labs. It is the sharper indictment: stealing your data would be a breach you could
sue over. What they actually do is legal, uninsurable, and worse — they extract the value of your
alpha without ever touching the bytes. The no-train clause protects your files. Nothing protects
your market.**

The extraction runs through three channels, all verified:

1. **Consumer-tier seepage.** The no-train protection is commercial-tier only. Claude Free/Pro/Max
   users — including Claude Code on those plans — are trained on **by default** since September
   2025, with retention extended to five years; same split at OpenAI and Google [45][46][47]. A
   startup whose engineers paste the codebase into consumer ChatGPT or run Claude Code on a Pro
   plan is leaking, today, with no contract violated.

2. **Category-signal learning.** The lab doesn't need your content; your *existence at volume* is
   the intelligence. Anthropic publicly demonstrates the machinery — its Economic Index mines a
   million conversations to map which occupational tasks are being automated [50] — and the Cursor
   episode shows what a lab does with demand visibility plus wholesale cost advantage. No
   zero-data-retention agreement addresses this channel, because the signal is the traffic itself.

3. **No-train ≠ no-exposure.** Zero-data-retention is gated, approval-required, and porous:
   Anthropic's ZDR excludes its Batch API, Files API, and code execution — and **is not available
   at all on its newest frontier models**, which carry mandatory 30-day retention [43][44]. Safety-
   flagged sessions may be retained up to two years. And in *NYT v. OpenAI*, a court preservation
   order forced OpenAI to retain output logs its own policy said were deleted — ZDR customers were
   exempt precisely because data never stored cannot be subpoenaed [48].

The diligence implication is precise: **"they say they don't train on our data" is the beginning of
the containment question, not the answer to it.** The right questions are: what tier are you
actually on, what does your traffic reveal about your category, what can't be retained because it
never leaves your boundary — and what happens when the lab decides your category is worth having?

---

## 4. History Rhymes — Read Carefully

The platform-eats-its-verticals story is the oldest in tech, but the record is more instructive
than the folklore, and we will use the record.

- **Microsoft vs. Netscape** is the clean, court-established case: the D.C. Circuit affirmed
  monopoly-maintenance liability for the OEM licensing and exclusive deals aimed at the browser
  threat [61]. Platforms do use their position against the layer above — adjudicated fact.
- **Microsoft vs. Lotus 1-2-3 and WordPerfect** is folk history. The "DOS ain't done till Lotus
  won't run" sabotage story is debunked by the participants themselves [62]; Lotus and WordPerfect
  died primarily of their own fumbled DOS→Windows transitions, and Office bundling consolidated a
  win their stumbles had already conceded [63]. The honest lesson: **owning the platform lets you
  punish the app layer's stumbles at a transition moment** — not execute-at-will.
- **Amazon and its marketplace sellers** is the closest structural rhyme to the labs: the platform
  sees demand data from everyone building on it and uses that telescope to decide what to build.
  The WSJ documented employees using individual seller data for private label against stated
  policy; a bipartisan House letter concluded Amazon at best "misled the Committee"; Amazon
  accepted binding EU commitments to stop [64][65][66]. (The FTC's monopolization case is untried
  until 2027 — we cite the conduct as documented and admitted-by-commitment, not adjudicated [67].)
  The labs' terms-of-service assurances rhyme uncomfortably with Amazon's internal policy.
- **Google's zero-click absorption** is the quantified version of answer-absorption: 58.5% of US
  searches ended without an external click in 2024; **68% by early 2026**, with AI Overviews
  cutting click-through nearly 60% where they appear [68][69]. The platform answers in-place and
  the layer above loses the customer relationship before it loses the revenue. (Panel data Google
  disputes — direction and magnitude, not audited numbers.)
- **The database wars and AWS deliver the twist.** The comforting version — "the engine
  commoditized, value migrated up" — is false. Oracle never commoditized; it consolidated an
  oligopoly, kept its margins, and eventually **bought the application layer** (PeopleSoft, $10.3B)
  [70][71]. AWS cut prices 40+ times while holding operating margins above 30% for a decade, and
  the Big Three now hold 63% share [74][75][76]. **In both prior stack wars, the infrastructure
  leader kept fat margins AND the application layer created massive value. The casualties were
  second-tier infrastructure players and the app-layer incumbents who fumbled the transition.**

That last line is the calibrated historical claim, and it reshapes the thesis: this is not a
prophecy that the labs deflate to utilities. It is a warning that they may keep AWS-grade margins
*while also* running the Amazon playbook against their own ecosystem — a combination neither AWS
nor Windows ever fully ran. Plan for the labs to stay rich, stay dominant, and keep coming.

---

## 5. The Deflation Clock — and Where the Trajectory Points

The deflation is real, and it is the startup's friend — *if* the startup is positioned to ride it.

- The price of a fixed level of intelligence falls roughly **10× per year** — GPT-3-class inference
  fell from $60 to ~$0.06 per million tokens in three years; the price to match GPT-4-class
  performance on hard benchmarks fell as much as 40×/yr [24][25][26].
- Open-weight models sit a consistent **3–6 months behind the frontier**, a gap that has held for
  18 months: GLM 5.2 leads the open Intelligence Index; DeepSeek V4 Flash posts 79% on SWE-bench
  Verified at $0.14 per million input tokens; NVIDIA's Nemotron 3 Ultra is the best US open model
  (though it trails the closed frontier — "frontier-equivalent" is marketing) [23][27][28].

But hold the counterweight honestly: **deflation applies to yesterday's capability.** The frontier
keeps minting new, higher-priced capability (long-horizon agentic work) faster than the old
capability commoditizes, which is why frontier *revenue* is exploding even as per-token prices
collapse — Anthropic ran $9B → $47B annualized in five months [20]; enterprise LLM spend doubled in
six months, with 88% going to three closed labs; and open-source share of enterprise workloads
**fell** from 19% to ~11% across 2025 [37][38]. Self-hosting carries real TCO (analyses suggest
APIs win most use cases below very high sustained volume [41]).

The investable insight is not "open models win." It is: **a company whose architecture can ride the
deflation curve — model-agnostic harness, open-weight fallback, in-boundary deployment — gets
structurally cheaper to run every year and cannot be held up by its supplier. A company welded to
one frontier provider is renting its cost curve from the entity most likely to compete with it.**
Cursor is the proof of both halves: it built a $2B+ business on rented frontier models, and when the
platform turned, its survival move was model independence within a year [6][39].

Now read the trend lines together, because the thesis lives in their direction, not in any single
snapshot:

1. **Intelligence commoditizes on a ~10×-a-year clock** — any fixed capability costs a tenth as
   much within a year of shipping [24][25]. What is frontier today is a commodity next year; the
   capability a startup's product depends on is a depreciating input, not an asset.
2. **The open-weight gap has held at 3–6 months for 18 months** [27][28] — the commodity tier is
   already substitutable, and the substitutable tier climbs every quarter.
3. **Sovereignty demand hardens on a dated calendar** — the EU AI Act's high-risk tranche binds
   August 2026 [30]; defense workloads already require air-gapping [60]; 53% of enterprises rank
   data control their #1 agent-adoption obstacle [58]; McKinsey sizes sovereignty-influenced spend
   at $500–600B by 2030 [29].
4. **The labs' appetite is accelerating, not sated** — five vertical launches in five months, four
   billion-dollar embed units stood up in a single week [8][9][10][11][18][19].

Extend those four lines across a five-year angel hold and the equilibrium is hard to miss:
intelligence becomes a metered commodity sold by a rich oligopoly that also competes downstream;
the only asset in the stack that *appreciates* is the alpha a company kept home; and sovereign
deployment becomes the procurement default in exactly the verticals where the alpha is richest.
On the three-phase clock of every prior platform wave — **Scarce Engine → Commodity Squeeze →
Victory of Context** — mid-2026 is the top of Phase 1: the moment when dependence looks safest and
costs the most. A deal we write today exits in 2031, on the other side of that clock.

---

## 6. What This Means for Venture — Two Failure Modes and the Prize

**Failure mode 1 — the startup leaks its own alpha.** Not primarily through training (see §3) but
through posture: consumer-tier tooling in the build pipeline, category-proving traffic concentrated
on a single provider that watches demand signals for a living, data-contribution partnerships
signed for early access, board/investor information channels, and no ability to move when the lab
ships into the category. The Cursor case defines the end-state — and also the escape: Cursor
survived because it owned the customer relationship and the harness, and could sprint to its own
model. A startup with none of those exits is subsidizing its future competitor's market research.

**Failure mode 2 — the startup is a conduit for its customers' alpha.** A product that requires
customers to pipe *their* proprietary, regulated, or IP-dense data through third-party frontier
APIs is selling into a hardening wall: 53% of enterprises rank data privacy the #1 agent-adoption
obstacle [58], defense workloads require air-gapping [60], the EU AI Act binds in weeks [30], and
McKinsey sizes sovereignty-influenced spend at $500–600B by 2030 [29]. The demand evidence is
directional rather than procurement-mandated today — but the direction is one-way. A conduit
architecture with no sovereign deployment path is a GTM with an expiration date in exactly the
verticals (health, defense, financial, legal, pharma) where the alpha is richest.

**The prize — two postures we actively want:**

- **The Sovereign operator:** alpha architecturally contained (the differentiating layer never
  transits the provider), model-agnostic with maintained evals, deployable inside the customer's
  trust boundary. It rides the deflation clock, survives provider repricing, and gets cheaper to
  run every year. Cursor-after-Composer and Harvey are the pattern: build on frontier models — the
  research shows that is the *winning* early posture, not a disqualifier [39][40] — while owning
  the context, the customer, and the exit. Harvey's detail is instructive: it *abandoned* its own
  proprietary model when frontier models outran it, and won anyway, because its alpha was never the
  model — it was the workflow, the domain trust, and the customer base [40].
- **The Sovereignty Enabler:** the picks-and-shovels of the countermovement — open-weight harnesses
  and control planes, on-prem/VPC/edge inference, data-boundary last-mile, agent governance and
  audit. Palantir–NVIDIA just validated the category at nation-state scale [13]; the same demand
  cascades down to the enterprise and the mid-market. Enablers win regardless of which lab wins.

And the corrected framing of "don't invest in companies that can't protect their alpha": it does
**not** mean "don't invest in companies built on frontier APIs" — that would have screened out
Cursor and Harvey, the two best application-layer outcomes of the era. It means: **verify the
company knows what its alpha is, where it flows, and how it moves house.** Frontier-API dependence
at seed is like a SAFE note — the normal starting point, negotiated toward a stronger structure as
the company scales. Unexamined dependence is the kill signal, not dependence itself.

---

## 7. What Stays Durable

The affirmative list — what a startup can own that the layer below cannot take:

1. **Contained proprietary data** — the flywheel that never transits the provider; processed
   in-boundary, distilled locally, invisible to the supply chain.
2. **The harness and the workflow** — the eval sets, domain scaffolding, integration depth, and
   accumulated context that make a commodity model perform like a specialist. (Harvey's real moat
   survived the death of Harvey's model [40].)
3. **The customer relationship and its trust surface** — in-boundary deployment, compliance
   posture, the vendor-of-record position in regulated workflows. This is the Bret Taylor point
   from the Agent-Era thesis, extended: when generation is cheap, value migrates from production to
   trust — and trust is jurisdictional, audited, and physically located.
4. **Model-layer independence as an asset** — maintained multi-model evals, demonstrated
   switching, open-weight fallback. Portability is not just insurance; it is negotiating leverage
   against the supplier.
5. **Sovereignty itself as the product** — the enabler category: whoever sells the locks wins the
   lock-buying era.

---

## 8. The Counter-Case — and Why It Is a Phase-1 Snapshot

We hold this thesis honestly or not at all, so here is today's strongest opposing read, stated
fairly — and why we judge it a snapshot, not a trend.

**The opposing read:** value is concentrating in the intelligence layer *right now*. Anthropic $47B
run-rate, growing ~10×/yr [20][35]; 88% of enterprise LLM spend to three closed labs; open-source
enterprise share falling 19% → 11% across 2025 [37][38]; the frontier capability lead persisting
exactly where the money is (agentic work). On this view, sovereignty is a niche for governments and
the paranoid, Karp is talking his book, and the correct venture strategy is to ride the frontier
hardest with zero portability tax.

**Why we read it as the top of Phase 1.** Every number in that paragraph has an exact precedent at
the same point in the prior waves — and in each case, extrapolating the snapshot was the classic
error. Oracle held 44% of the RDBMS market in 1995 with fat margins and accelerating spend [70];
AWS was cutting prices forty times over while holding 30%+ margins and gaining share in 2014
[74][75]. The infrastructure leader did not collapse in either wave — that is not our claim now.
What happened instead is the thesis: the *contested* value — the returns available to new
entrants, the layer where fortunes were still to be made — moved up the stack to context and
application; the second-tier engines died; and the leader eventually came hunting the layer above
(Oracle bought PeopleSoft [71]; the labs are shipping into their customers' verticals at a cadence
of roughly one category a month). Today's concentration data tells us **where we are on the
clock — peak Phase 1, when dependence looks safest and costs the most** — not where a hold period
ends. A deal written today matures in 2031, on the other side of that clock. Static reads of 1995
said "buy the engine"; the decade said "own the context."

**What the snapshot still earns:** it is why this lens weights *portability and containment* as
underwriting discipline rather than predicting lab collapse; why Hedged (dependent-but-contained)
is a fully acceptable posture; and why we do not screen out frontier-built companies — the two best
application-layer outcomes of the era were built on rented models. The labs staying rich does not
protect a startup from the labs entering its category. It funds it.

**Confidence ledger:** Verified — the vertical launches, the Figma sequence, the terms-of-service
reality, consumer-tier training defaults, token deflation, open-weight convergence, AWS/Oracle
margin history, zero-click data. Reported — Cursor's 40–50% revenue share and the "research effort"
quote (single ultimate source: Business Insider); Friedberg's life-sciences solicitation
(podcast-only); Gartner's 75% hybrid prediction (secondary). Inferred — that customer sovereignty
demand hardens into procurement mandates within the hold period; that lab category-entry cadence
continues at 2026's pace. Chamath's "16.4× cheaper" datapoint is self-interested and unverified —
we do not use it; the independently verified analog is DeepSeek V4 Flash pricing [28].

**What would change our mind (falsifiers to watch):**
- Open-weight enterprise share resumes falling through 2027 *and* sovereign-deployment RFP language
  fails to materialize → downgrade the Enabler category thesis.
- Labs contractually and verifiably stop launching into partner categories (a real ecosystem
  compact, not a blog post) → soften the containment weighting.
- A major lab ships full ZDR on frontier models by default and it holds → Channel-A concerns fade
  further; Channel B (category-signal learning) remains untouched by this falsifier.
- Frontier gross margins collapse rather than mature toward AWS-grade → the "labs stay rich and
  keep coming" premise weakens; deflation-riding postures matter even more.

---

## 9. Implication for NWAi

This becomes our **fourth always-active investing lens.** The existing three ask:

- **Structural Discontinuity** — is this riding a genuine, irreversible market shift?
- **Memory Lock-in** — does the product get smarter, stickier, more embedded with use?
- **Agent-Era Readiness** — does the founder solve the problem as agents will reshape it?

The fourth now asks:

- **Alpha-AI Sovereignty** — *when this product runs, where does the alpha flow — does it stay
  home, or drain up to the lab? Can the company move house? And does its go-to-market survive its
  customers demanding the same sovereignty?*

It is deliberately distinct from its neighbors: the LLM Ingestion Test asks whether a lab's model
could *replicate the build* from public data; the Goliath Test asks whether an incumbent *could
kill it* with a feature; Agent-Era Readiness asks whether the *problem survives* the substrate
shift. This lens asks the supply-chain question none of them ask: **who captures the alpha along
the model supply chain** — the startup's own, and its customers'. A deal can pass all three
existing tests and still be quietly feeding the entity most likely to subsume it.

The framework that operationalizes this — the doorway question, three scored dimensions (Alpha
Containment · Model-Layer Independence · Customer Sovereignty Alignment), the four-posture verdict
(Leaking / Hedged / Sovereign / Enabler), and the pipeline hooks — is specified in
`.claude/skills/nwai-investment-framework/references/alpha-ai-sovereignty-framework.md`, to be
installed once this thesis is signed off.

---

## The Resonating Takeaway

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

---

*Sources: all `[n]` citations resolve to `NWAi-Alpha-AI-Sovereignty-Research-Base-2026-07.md`
(76 sources retrieved in-session July 4, 2026, tagged Verified/Reported). Narrative inputs treated
as claims-under-test, per the research-base method note: Alex Karp CNBC interview (July 1, 2026);
All-In Podcast ep. 279; David Sacks X post ("Alex Karp on Protecting ur Alpha"); Gemini exploration
session. Key corrections to the narrative inputs carried through this document: run-rate figures
(Anthropic $47B / OpenAI ~$25–33B, not Sacks' transposed figures); Figma decline is YTD-2026, not
launch-caused; YC token offer was equity-for-credits; Friedberg's life-sciences claim is
podcast-only; Chamath's 16.4× figure is self-interested and unused.*
