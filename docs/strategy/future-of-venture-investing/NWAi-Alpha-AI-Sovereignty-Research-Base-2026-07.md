# Alpha-AI Sovereignty — Research Base

*NWAi Investment Intelligence — research working document, July 4, 2026*
*Author focal point: Jamie (Board Director, Investment Intelligence & AI; TechGroup Co-Chair)*
*Status: research base for `NWAi-Alpha-AI-Sovereignty-Thesis-2026-07.md`. Four parallel research
workstreams (extraction-narrative fact-check · value-location debate · leakage mechanics ·
historical-analogy stress test) plus a cross-check verification pass.*

> **Method note.** The source transcripts (Alex Karp CNBC interview July 1, 2026; All-In Podcast
> ep. 279; David Sacks X post; Gemini exploration) were treated as *claims to test*, not evidence.
> The podcast voices are self-interested: Karp sells the sovereign alternative (Palantir AIP),
> Chamath's 16.4× cost datapoint benchmarks his own product (8090), Sacks has portfolio exposure.
> Citation Contract applies: every `[n]` points to a source actually retrieved in-session by a
> research agent on July 4, 2026; load-bearing claims are tagged **Verified / Reported / Inferred**.
> Where a primary page was unreachable (paywall/403/429), the claim is tagged Reported and the
> corroborating secondary source is cited.

---

## 1. The Extraction Narrative — Verified Fact Table

| # | Claimed event | Verdict | What the record actually shows |
|---|---|---|---|
| 1 | Claude Design blindsided Figma; CPO board exit ~3 days before launch; Figma −50% | **Verified, with caveats** | Anthropic launched Claude Design ~April 17–18, 2026, positioned against Figma/Canva/Adobe [1][2]. Anthropic CPO Mike Krieger resigned from Figma's board April 14, 2026 — the same day The Information reported Opus 4.7 would include Figma-competing design tools; launch followed ~3 days later [2][3]. Figma CEO Dylan Field's actual quote, to **Upstarts Media** (not The Information): *"They were not consistently candid in their communications"* [1]. **Causality caveat:** Figma fell ~7% on launch day; the ~49–55% figure is the 2026 YTD decline, and Figma was already well off its Aug-2025 peak before Claude Design existed [4]. Anthropic closed a $65B Series H at $965B post-money May 28, 2026 [5]. |
| 2 | Anthropic vertical launches: Code, Science, Security, Legal, Financial, drug discovery | **Verified** | All real. Claude Code (Feb 2025; ~$2.5B annualized by Feb 2026, overtaking Cursor's ~$2B — Cursor once drove 40–50% of Anthropic's revenue) [6][7]. Claude Science (June 30, 2026) launched alongside an internal drug-discovery program; Coefficient Bio acquired ~$400M April 2026 [8][9]. Claude Security public beta April 30, 2026 [10]. Claude for Legal May 12, 2026 — with connectors to Harvey, Ironclad, DocuSign, i.e., partners that build on Claude [11]. Claude for Financial Services: real; 10 finance agent templates May 5, 2026 [8]. |
| 3 | Anthropic solicited life-sciences companies' proprietary data for early access (Friedberg) | **Reported (podcast-only)** | The statement was made on All-In [12]; **no independent reporting corroborates the data-for-access approaches.** Adjacent verified facts (Claude Science, internal drug program) are consistent context but do not confirm the solicitation mechanic. Friedberg is an interested party (runs ag/bio businesses). Treat as single-source. |
| 4 | Palantir–NVIDIA sovereign-AI partnership | **Verified** | Announced June 29, 2026. NVIDIA's own blog: *"Palantir will use NVIDIA Nemotron open models to build custom frontier-quality models to serve the U.S. government"*; agencies run models on their own infrastructure, train on their own data, and *"retain full ownership of the resulting models"* including weights. Palantir brands it the "Sovereign AI Operating System" [13][14]. Note: a product/partnership launch — the custom frontier-quality models are stated as something Palantir *will* build. |
| 5 | Karp CNBC interview | **Verified** | July 1, 2026, CNBC Squawk Box. Verbatim: *"control over their compute, their models, their data stack and their alpha"*; customers want to own *"the means of production"* [15][16]. |
| 6 | OpenAI offered YC startups ~$2M free tokens | **Verified — but not free** | May 20, 2026: $2M in inference credits to each of ~169 Spring-2026 YC startups — **in exchange for equity via an uncapped SAFE** converting at Series A. An investment/lock-in play, not a giveaway [17]. |
| 7 | Microsoft $2.5B FDE / Amazon $1B / OpenAI FDE program | **Verified** | Microsoft "Frontier Company" July 2, 2026 — $2.5B, 6,000 engineers embedded in enterprise customers; AWS committed $1B two days earlier; OpenAI launched a standalone deployment company (>$4B backing) in May 2026; Anthropic a $1.5B deployment JV with Goldman/Blackstone/H&F [18][19]. |
| 8 | Sacks: Anthropic ARR ~$60B+, OpenAI ~$47B | **Could not verify — figures overstated/transposed** | The record: Anthropic's own disclosure is a **$47B run rate as of mid-May 2026** (progression $9B Dec-25 → $30B Apr → $47B mid-May) [20][21]; OpenAI ~$25–33B [21][22]. Sacks' $47B matches *Anthropic's* number, not OpenAI's. Directionally correct that Anthropic passed OpenAI (~April 2026); the specific figures are unsupported. |
| 9 | NVIDIA Nemotron open models frontier-competitive, in Perplexity picker | **Verified availability / partially supported competitiveness** | Nemotron 3 Super (120B) and Ultra (550B MoE) are open-weight and available via Perplexity Pro picker, OpenRouter, NVIDIA API [23]. Ultra scores ~48 on the Artificial Analysis Intelligence Index — best US open-weight — but trails frontier closed models and China's Kimi K2.6 (53.9) [23]. "Competitive for many tasks on cost/throughput" is defensible; "frontier-equivalent" is not. |

**Bottom line:** the extraction pattern is real and verified — the labs are demonstrably shipping
into their own customers' categories, and the Figma board-seat sequence and Cursor revenue-overlap
are documented. But two transcript claims must be corrected (Figma −50% causality; Sacks' ARR
figures) and one must be downgraded to single-source (Friedberg's life-sciences solicitation).

---

## 2. The Value-Location Debate — Evidence Both Ways

*The core question: is durable business value migrating from the intelligence layer (frontier labs)
to the enterprise's proprietary alpha — data, IP, workflows, harness?*

### Evidence FOR migration

- **Token deflation is real; "~90%/yr" is conservative at fixed capability. (Verified)** Epoch AI:
  price to hit a fixed performance milestone fell 9×–900×/yr depending on benchmark; median ~50×/yr,
  accelerating to ~200×/yr after Jan 2024 [24]. a16z ("LLMflation"): ~10×/yr price decline at
  constant quality — GPT-3-class inference fell from $60/M tokens (2021) to ~$0.06/M, 1,000× in
  3 years [25]. GPT-4 lineage: $36/M (Mar 2023) → ~$4/M blended 17 months later [26]. **Nuance:
  deflation applies to *yesterday's* capability; frontier prices stay comparatively stable and total
  spend is rising.**
- **Open-weight models sit a consistent 3–6 months behind the frontier. (Verified)** Epoch: ~3–4
  month average lag [27]. OpenRouter (June 27, 2026): GLM 5.2 #1 open-weight (Intelligence Index
  51); DeepSeek V4 Flash posts 79.0% on SWE-bench Verified at $0.14/$0.28 per M tokens; the gap has
  held at 3–6 months for 18 months. Where closed still leads: long-horizon, multi-step agentic
  reasoning [28].
- **Sovereignty pull is structural. (Reported)** McKinsey: 30–40% of AI spending could be influenced
  by sovereignty requirements — $500–600B by 2030 [29]. EU AI Act GPAI/logging duties bind from
  Aug 2, 2026 [30]. Mostly forward-looking analyst framing; measured adoption currently points the
  other way (below).
- **The canonical VC value-accrual writing supports "the alpha is above/below the model layer."
  (Reported/Verified)** a16z 2023: model providers' advantages rest on capital, usage data, talent —
  "not unique architectures" [31]. Sequoia's "$600B Question": GPU compute commoditizing with low
  pricing power; long-term value accrues to those delivering user value [32]. a16z's 2026
  services-led-growth line: the hard part "was never raw intelligence" [33]. The Information:
  OpenAI's 2025 gross margin came in at 33% vs. 46% forecast; Anthropic ~40% vs. 50% target —
  software-grade margins at the intelligence layer remain a projection [34].

### Evidence AGAINST — the steelman

- **Frontier lab revenue is compounding at rates incompatible with a commoditized layer.
  (Verified)** OpenAI growing ~3.4×/yr; Anthropic ~10×/yr [35]. Anthropic ~$9B annualized
  (end-2025) → ~$45–47B (May 2026); ~70–75% of Anthropic revenue is pay-per-token API — enterprises
  paying the intelligence layer directly [20][36]. Enterprise LLM API spend doubled in six months,
  $3.5B → $8.4B (Menlo, July 2025) [37].
- **Measured enterprise behavior favors closed frontier models — open-source share is falling.
  (Verified)** Menlo mid-2025: open-source share of enterprise workloads fell 19% → 13%;
  "performance drives decisions almost exclusively" [37]. Menlo Dec 2025 (n≈500): open-source down
  to ~11% of enterprise LLM API usage; Chinese open models 1% of enterprise usage; 88% of enterprise
  spend goes to three closed labs (Anthropic 40% / OpenAI 27% / Google 21%) [38]. The persistent
  3–6-month lag lands on exactly the workloads enterprises pay most for — so "only 3 months behind"
  is, in practice, "always behind on the tasks that matter."
- **Building on frontier labs demonstrably does not doom you. (Verified)** Cursor/Anysphere: ARR
  $100M (Jan 2025) → $1B (Nov 2025) → $2B (Feb 2026), raising at $50B — built primarily on external
  frontier models [39]. Harvey: $300M ARR May 2026, $11B valuation — and Harvey **abandoned its own
  proprietary legal model because frontier reasoning models outperformed it** [40]. The single most
  instructive datapoint on both sides: the app layer captures enormous value, and does so by riding,
  not replacing, frontier models.
- **"Free" open-weight is not cheap at enterprise scale. (Reported)** 2026 TCO analyses: true
  self-hosting cost runs 1.3–2× raw GPU cost, 3–5× with DevOps/update cycles; APIs win for ~87% of
  use cases; self-hosting break-even only at very high sustained volume [41]. Practitioner/vendor
  blogs — directional, not audited.

### The honest read (verification-pass synthesis)

Token deflation and open-weight convergence are as well-established as anything in this space. But
the migration thesis's *behavioral* prediction is currently contradicted by the best enterprise
data: open-source share of enterprise workloads **fell** from 19% to ~11% across 2025 while
closed-lab revenue compounded — value is deflating per token yet concentrating in absolute dollars
at the frontier, because the frontier keeps minting new, higher-priced capability faster than the
old capability commoditizes. Meanwhile the strongest app-layer outcomes (Cursor, Harvey)
simultaneously prove the harness/context layer captures enormous value *and* that it does so by
riding frontier models. **Both theses can be simultaneously true at different layers of the P&L:
revenue is concentrating in the intelligence layer right now, while durable *margin* may still
migrate to whoever owns proprietary data, workflow lock-in, and the harness. The 2026 data does not
yet settle that question.** Genuinely unknown: whether lab gross margins reach the projected 70%+
(2025 targets were missed badly [34]); whether the open-weight lag closes on agentic tasks; how much
of the projected sovereignty spend materializes as true self-hosting vs. sovereign-cloud wrappers
around the same closed models.

---

## 3. Leakage Mechanics — Which Versions of "Alpha Leakage" Actually Hold

*Three distinct channels; the thesis must not conflate them.*

### Channel A — Contractual/training leakage: **the strong claim is contradicted**

- **Anthropic (Verified — primary docs fetched):** Commercial Terms (eff. June 17, 2025):
  *"Anthropic may not train models on Customer Content from Services"*; customer retains rights to
  inputs, owns outputs [42]. API conversation content *"not retained by default"*; logs on a 7-day
  window [43]. **But:** ZDR requires approval and excludes Batch API (29-day), Files API, code
  execution; **Anthropic's newest frontier models (Fable/Mythos 5) are "Covered Models" with
  mandatory 30-day retention — ZDR is not available on them at all**; safety-flagged sessions may be
  retained up to 2 years [43][44].
- **Consumer-tier exception is real and large (Verified):** as of Sept 28, 2025, Claude
  Free/Pro/Max (incl. Claude Code on those plans) train on by default unless opted out, retention
  extended to 5 years [45]. Same split at OpenAI (ChatGPT consumer default-on) and Google (unpaid
  Gemini tier trains explicitly; paid tier no-train; EEA/UK forced onto paid-tier treatment) [46][47].
- **OpenAI (Verified):** *"As of March 1, 2023, data sent to the OpenAI API is not used to train…
  (unless you explicitly opt in)"*; abuse-monitoring logs up to 30 days; ZDR available but stateful
  endpoints may still store state [46].
- **No-train ≠ no-exposure (Verified):** in *NYT v. OpenAI*, a May 2025 preservation order forced
  OpenAI to preserve output logs that would otherwise be deleted — overriding user deletions and
  OpenAI's own retention policy; in Nov 2025 OpenAI was ordered to produce 20M de-identified chat
  logs. **ZDR API customers were exempt — data never stored cannot be subpoenaed** [48].
- **Documented cases of labs training on commercial API data against their terms: none found** [49].

### Channel B — Strategic learning without training: **verified at category level; this is where the thesis lives**

- **The Cursor/Anthropic case (Reported — Business Insider via 36kr, corroborated by Fortune):**
  Cursor at peak contributed ~40–50% of Anthropic's revenue; Anthropic executives **privately told
  Cursor's leadership Claude Code was "more of a research effort than a commercial push"** before
  launching it commercially; Claude Code hit ~$2.5B run-rate by Feb 2026 vs. Cursor's $2B; Cursor's
  CEO called a Jan 5, 2026 emergency all-hands ("cancel everything, we're building our own model"),
  producing Composer [6][7]. Fortune: Anthropic used *"financial firepower and model provider
  advantage to offer Claude Code at lower prices than Cursor reasonably can match"* [7].
  **Calibration: no source alleges Anthropic read Cursor's API content.** What the lab verifiably
  had: (a) revenue-concentration visibility proving the category, (b) wholesale-vs-retail cost
  asymmetry, (c) the ability to reassure its largest customer about roadmap intent while building
  the competitor.
- **Aggregate telemetry as strategy input (Verified):** the Anthropic Economic Index publicly mines
  ~1M consumer conversations for occupational category-demand mapping [50] — direct proof a lab
  systematically studies its own usage for demand intelligence (consumer-tier, privacy-preserved).
  Account/harness-level usage visibility is operationally real (Anthropic cut off xAI staff using
  Claude via a third-party harness) [51].
- **Stated intent (Verified):** Sam Altman, on the record: OpenAI will *"steamroll you"* if your
  startup is a thin wrapper — *"It's not personal; it's our mission"* [52].
- **Investor/board/corp-dev channels (Verified as mechanism):** OpenAI Startup Fund led Harvey's
  first round [53]; the FTC's Jan 2025 6(b) report formally found cloud–lab partnerships include
  *"consultation, control, and exclusivity rights"* that can *"reveal sensitive information that can
  undermine fair competition"* [54]; iyO v. OpenAI court filings document the demo-then-buy-rival
  pattern [55]. **No documented case of a lab executive on a customer's board followed by a
  competing launch — except the Krieger/Figma sequence in §1, which is the closest documented
  instance.**

### Channel C — Explicit data-contribution programs: **verified; opt-in, not leakage — but the most direct alpha-transfer channel**

- OpenAI Data Partnerships (Nov 2023): a standing invitation to contribute private datasets —
  *"If you have data you wish to keep private, but you would like OpenAI models to have a better
  understanding of your domain, this is the optimal way to partner"* [56].
- Harvey + OpenAI: ~10B tokens of case-law data into a custom model — the template for domain alpha
  transferring legally into a lab's stack [57].
- Friedberg's claimed Anthropic life-sciences version remains podcast-only (§1, claim 3).

### Customer-side sovereignty demand: **directionally verified**

- 53% of organizations rank data privacy as the #1 obstacle to agent adoption (Cloudera survey via
  Kiteworks) [58]; Gartner "75% shifting toward hybrid/on-prem by 2026" is secondary-sourced only
  [59]. Labs productizing the controls is itself demand evidence: Anthropic HIPAA-ready API with
  BAA; Bedrock/Vertex in-cloud routes [43]. Defense: DoD contracts to four labs; Claude at DISA
  IL6; IL4/IL5 require air-gapped deployment; the Feb–Mar 2026 Pentagon–Anthropic blacklist fight
  shows buyers treating vendor control over deployment as first-order procurement risk [60]. EU:
  AI Act (Aug 2026 high-risk tranche), GDPR DPAs, DORA [30]. **Gap: no published standardized RFP
  language or US financial-regulator rule expressly prohibiting third-party frontier models —
  evidence is surveys, compliance frameworks, and deployment-architecture demand, not procurement
  mandates.**

### Calibration table — which claim versions hold

| Claim version | Status |
|---|---|
| "Labs train on enterprise/API data by default" | **Contradicted** — all three labs' commercial terms say the opposite; no documented violation found [42][46][47] |
| "Labs train on free/consumer-tier data" | **Verified** — default-on at all three labs; a startup whose employees use consumer tiers does leak content [45][46][47] |
| "Your prompts are retained and could surface" | **Partially verified** — retention windows, ZDR exclusions (incl. no-ZDR on Anthropic's newest models), 2-yr safety retention, litigation holds [43][44][48] |
| "Labs learn category demand from serving you and build into it" | **Verified at category level** — Cursor episode; Economic Index; steamroll doctrine; account-level visibility [6][50][51][52] |
| "Labs read your specific content to copy you" | **Not supported — do not assert** [49] |
| "Partnership/diligence/investor access is an info channel" | **Verified as mechanism** (FTC 6(b), Startup Fund, iyO); no adjudicated misappropriation [53][54][55] |
| "Labs explicitly solicit proprietary data" | **Verified** (OpenAI Data Partnerships, Harvey) — opt-in contractual transfer, not leakage [56][57] |
| "Enterprises increasingly demand sovereignty" | **Verified directionally**; hard procurement-mandate evidence thin [58][59][60] |

---

## 4. Historical Analogies — Stress-Test Verdicts

| Analogy | Core record | Verdict for member-facing use |
|---|---|---|
| **Microsoft vs Netscape** | Court-established platform abuse: D.C. Circuit affirmed §2 monopoly-maintenance liability (OEM licensing, exclusive deals aimed at the browser threat) [61] | **SAFE** — the cleanest court-documented platform-vs-app-layer case |
| **Microsoft vs Lotus/WordPerfect** | **Folk history.** "DOS ain't done till Lotus won't run" is debunked (Kapor and Microsoft veterans agree) [62]; both died primarily of fumbled DOS→Windows transitions (WordPerfect bet on OS/2, shipped unstable Windows versions 2.5 years behind Word) [63], consolidated by Office bundling | **SAFE-WITH-CAVEAT** — *"owning the platform lets you punish the app layer's stumbles at a transition moment, not execute-at-will"* |
| **Amazon Basics / seller data** | WSJ 2020: employees used individual seller data for private label, against stated policy [64]; bipartisan House letter: Amazon "at best misled the Committee" [65]; binding EU commitments (Dec 2022) to stop using non-public seller data — no finding of illegality [66]; FTC case untried until March 2027 [67] | **SAFE-WITH-CAVEAT** — *"cite as documented-and-admitted-by-commitment, not adjudicated"*; note Amazon cloned commodity products, while enterprise software carries integration depth telemetry doesn't hand over |
| **Google zero-click** | SparkToro/Datos 2024: 58.5% of US searches ended without an external click [68]; SparkToro/Similarweb June 2026: **68.01%**, fastest acceleration in a decade; AI Overviews on 20%+ of searches cut CTR ~60% [69] | **SAFE-WITH-CAVEAT** — *"third-party clickstream panels Google disputes — direction and magnitude, not audited numbers"*; fits content/affiliate verticals better than systems-of-record |
| **1990s database wars → value migrated up** | **UNSAFE as commonly told.** The engine never commoditized — it consolidated into an oligopoly; Oracle kept pricing power and **bought the application layer** (PeopleSoft $10.3B, 2005) [70][71]. SAP/PeopleSoft did prove massive value builds above a rented engine [72]; the casualties were second-tier engine vendors (Sybase, Informix) [73] | **Reframe:** *"both layers won; second-tier engines died; the engine leader eventually consumed the app layer"* |
| **AWS "race to zero"** | Prices cut 42+ times by 2014 [74] — while operating margins held 33–39% through 2025 [75] and the Big Three tightened to 63% share [76]. Falling prices ≠ commoditization | **SAFE as counter-analogy** — *"labs can keep AWS-like margins behind falling token prices — IF they develop cloud-grade switching costs, which today's swappable model APIs don't yet have"* |

**Cross-cutting note (verification pass):** analogies 4+5 together deliver the thesis's most
defensible historical claim — in both prior stack wars, the *infrastructure leader* kept fat
margins AND the *application layer also* created massive value; the casualties were second-tier
infrastructure players and app-layer incumbents who fumbled the platform transition. "The platform
commoditizes/kills everything above it" is **not** supported by the record.

---

## 5. Cross-Check Notes (contradictions & downgrades)

1. **ARR figures**: Workstream 1 (fact-check) and Workstream 2 (Sacra/Epoch) independently converge
   on Anthropic ~$45–47B / OpenAI ~$25–33B — Sacks' transcript figures are transposed/inflated.
   Consistent; use the verified numbers.
2. **Cursor 40–50% of Anthropic revenue**: appears in two workstreams but traces to a single
   ultimate source (Business Insider, relayed via 36kr). **Downgraded to Reported.**
3. **Chamath's 16.4× cheaper open-weight harness claim**: self-interested, no independent
   benchmark retrieved. **Inferred/illustrative only — do not cite as fact.** The independently
   verified analog: DeepSeek V4 Flash at $0.14/$0.28 per M tokens vs. frontier pricing [28].
4. **"90%/yr token deflation"**: verified as conservative at fixed capability [24][25]; must always
   carry the "yesterday's capability" nuance — frontier-tier pricing is comparatively stable.
5. **No contradictions found** between the four workstreams' factual findings; the tension is
   between the *narrative* (transcripts) and the *behavioral data* (Menlo enterprise surveys), which
   is a real tension in the world, not a research artifact.

---

## 6. Where the Research Bends the Thesis

The thesis survives — but in a sharper, more defensible form than the transcripts state it.

1. **Drop the strong leakage claim.** "Use a frontier API and the lab trains on your alpha" is
   contractually false for commercial tiers and must not anchor the thesis. Anchor instead on the
   three verified channels: **consumer-tier seepage** (default-on training), **category-level
   strategic learning** (Cursor: demand visibility + cost asymmetry + private misdirection — no
   content access needed), and **no-train ≠ no-exposure** (ZDR gaps — including no ZDR at all on
   Anthropic's newest models — retention carve-outs, litigation holds). Plus the legal channel:
   **opt-in data-contribution programs** are how domain alpha most directly transfers.
2. **Reframe "the intelligence layer commoditizes."** Per-token prices deflate ~10×/yr at fixed
   capability, but frontier *revenue* is concentrating (Anthropic $47B run-rate; 88% of enterprise
   spend to three closed labs; open-source enterprise share *fell* to ~11%). The defensible claim:
   value accrues at **both** layers — the AWS precedent says the lab oligopoly can keep fat margins
   indefinitely — and the venture question is not "which layer wins" but **"does this startup own
   any alpha the layer below can't take?"**
3. **The extraction pattern itself is verified.** Claude Design/Figma (board-seat sequence
   documented), Claude Code/Cursor (largest customer, private reassurance, wholesale pricing),
   five vertical launches in five months, FDE land-grab across four labs. The behavioral evidence
   that labs enter their customers' proven categories is not in dispute — only the mechanism (market
   signal, not content theft) needed correcting.
4. **Cursor and Harvey flip from counter-examples to the playbook.** Both won *while* building on
   frontier models — by owning the customer relationship and the harness, and (Cursor) sprinting to
   model independence the moment the platform turned. That is the **Hedged → Sovereign path** the
   framework should score, and it kills any temptation to treat "builds on a frontier API" as
   disqualifying.
5. **Analogy hygiene for member-facing docs.** Lead with Netscape (adjudicated), Amazon
   (documented + binding commitments), and Google zero-click (quantified). Reframe the database
   wars and AWS as the "both layers win; second-tier players die" nuance. Never use Lotus/WordPerfect
   as platform-murder — use it as the transition-fumble warning.
6. **Sovereignty demand is the strongest *forward* signal but the weakest *measured* one.** It
   supports the Enabler/picks-and-shovels category thesis strongly (McKinsey $500–600B; EU AI Act;
   IL4–6 air-gapping; 53% privacy-first survey data) while the measured 2025–26 enterprise behavior
   still favors closed frontier APIs. Score sovereignty posture as **direction of travel**, not as
   current market share.
7. **Correct the transcript numbers wherever cited**: Anthropic $47B / OpenAI ~$25–33B run-rates;
   Figma decline is YTD-2026 (~49–55%) not launch-caused; YC tokens were equity-for-credits;
   Nemotron is best-US-open, not frontier-equivalent.

---

## Sources

*All sources retrieved in-session July 4, 2026 by the four research workstreams. V = Verified
(primary fetched), R = Reported (secondary/unfetchable primary).*

**Workstream 1 — extraction narrative**
[1] Upstarts Media, "How a board departure and product launch..." (Apr 23, 2026) — https://www.upstartsmedia.com/p/scoop-how-a-board-departure-and-product — V
[2] TechCrunch, "Anthropic CPO leaves Figma's board..." (Apr 16, 2026) — https://techcrunch.com/2026/04/16/anthropic-cpo-leaves-figmas-board-after-reports-he-will-offer-a-competing-product/ — V
[3] Winbuzzer, "Anthropic launches Claude Design" (Apr 18, 2026) — https://winbuzzer.com/2026/04/18/anthropic-launches-claude-design-figma-canva-xcxwbn/ — R
[4] Yahoo Finance, "Figma (FIG) down more than 55% YTD" — https://finance.yahoo.com/markets/stocks/articles/figma-fig-down-more-55-191246313.html — R
[5] Anthropic, "Series H" (May 28, 2026) — https://www.anthropic.com/news/series-h — V
[6] 36kr (relaying Business Insider), Cursor/Claude Code revenue overlap — https://eu.36kr.com/en/p/3855560261637125 — R
[7] Fortune, "Cursor's crossroads" (Mar 21, 2026) — https://fortune.com/2026/03/21/cursor-ceo-michael-truell-ai-coding-claude-anthropic-venture-capital/ — V
[8] TechCrunch, "Anthropic's Claude Science bets on workflow" (Jun 30, 2026) — https://techcrunch.com/2026/06/30/anthropics-claude-science-bets-on-workflow-not-a-new-model-to-win-over-scientists/ — V
[9] CNBC, "Anthropic launches AI drug discovery program" (Jun 30, 2026) — https://www.cnbc.com/2026/06/30/anthropic-launches-ai-drug-discovery-program-claude-science.html — R
[10] SiliconANGLE, "Claude Security public beta" (Apr 30, 2026) — https://siliconangle.com/2026/04/30/anthropic-announces-claude-security-public-beta-find-fix-software-vulnerabilities/ — R
[11] Artificial Lawyer, "Claude for Legal launches" (May 12, 2026) — https://www.artificiallawyer.com/2026/05/12/claude-for-legal-launches-may-reshape-the-legal-tech-world/ — R
[12] Fireside Alpha recap of All-In ep. 279 (X, ~Jul 3, 2026) — https://x.com/firesidealpha/status/2073279951042998408 — R
[13] NVIDIA blog, "Palantir secure AI for US agencies with Nemotron open models" (Jun 29, 2026) — https://blogs.nvidia.com/blog/palantir-secure-ai-us-agencies-nemotron-open-models/ — V
[14] Business Wire, Palantir sovereign-environments launch (Jun 29, 2026) — https://www.businesswire.com/news/home/20260629390275/en/ — R
[15] Mediaite, Karp CNBC interview coverage (Jul 1, 2026) — https://www.mediaite.com/media/tv/you-sound-pretty-angry-cnbc-anchor-left-stunned-as-palantir-ceo-blows-his-stack-during-wild-interview/ — V
[16] CNBC, "Palantir Karp OpenAI Anthropic tokens" (Jul 1, 2026) — https://www.cnbc.com/2026/07/01/palantir-karp-open-ai-anthropic-tokens.html — R
[17] TechCrunch, "Sam Altman makes mic-drop offer to every Y Combinator startup" (May 20, 2026) — https://techcrunch.com/2026/05/20/sam-altman-makes-mic-drop-offer-to-every-y-combinator-startup/ — V
[18] TechCrunch, "Microsoft launches its own AI deployment company, $2.5B" (Jul 2, 2026) — https://techcrunch.com/2026/07/02/microsoft-launches-its-own-ai-deployment-company-with-2-5-billion-commitment/ — V
[19] CNBC, "Microsoft commits $2.5B, 6,000 employees to AI implementation unit" (Jul 2, 2026) — https://www.cnbc.com/2026/07/02/microsoft-commits-2point5-billion-6000-employees-ai-implementation-unit.html — R
[20] Anthropic on X, $47B run rate (May 2026) — https://x.com/AnthropicAI/status/2060061348818518493 — V
[21] futuresearch.ai, Anthropic financial forecast — https://futuresearch.ai/anthropic-financial-forecast/ — V
[22] the-ai-corner, "Anthropic $30B ARR passed OpenAI" (Apr 2026) — https://www.the-ai-corner.com/p/anthropic-30b-arr-passed-openai-revenue-2026 — V
[23] DeepLearning.AI The Batch, "NVIDIA's Nemotron goes big" (Jun 19, 2026) — https://www.deeplearning.ai/the-batch/nvidias-nemotron-goes-big — V

**Workstream 2 — value location**
[24] Epoch AI, "LLM inference price trends" (Mar 12, 2025) — https://epoch.ai/data-insights/llm-inference-price-trends — V
[25] a16z, "LLMflation" (Nov 2024) — https://a16z.com/llmflation-llm-inference-cost/ — R
[26] DeepLearning.AI The Batch, "Falling LLM token prices" — https://www.deeplearning.ai/the-batch/falling-llm-token-prices-and-what-they-mean-for-ai-companies — R
[27] Epoch AI, "Open weights vs closed weights models" (Oct 30, 2025) — https://epoch.ai/data-insights/open-weights-vs-closed-weights-models — V
[28] OpenRouter, "The Open Weight Models that Matter" (Jun 27, 2026) — https://openrouter.ai/blog/insights/the-open-weight-models-that-matter-june-2026/ — V
[29] McKinsey, "Sovereign AI: building ecosystems" — https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/sovereign-ai-building-ecosystems-for-strategic-resilience-and-impact — R
[30] White & Case, "EU digital omnibus: Data Act, GDPR and AI Act" — https://www.whitecase.com/insight-alert/eu-digital-omnibus-what-changes-lie-ahead-data-act-gdpr-and-ai-act — R
[31] a16z, "Who Owns the Generative AI Platform?" (Jan 2023) — https://a16z.com/who-owns-the-generative-ai-platform/ — R
[32] Sequoia / David Cahn, "AI's $600B Question" (Jun 20, 2024) — https://www.sequoiacap.com/article/ais-600b-question/ — V
[33] a16z, "Services-led growth" — https://a16z.com/services-led-growth/ — R
[34] The Information, "OpenAI, Anthropic missed gross margin forecasts" (2026) — https://www.theinformation.com/newsletters/dealmaker/openai-anthropic-missed-gross-margin-forecasts — R
[35] Epoch AI, "Anthropic & OpenAI revenue" (Feb 19, 2026) — https://epoch.ai/data-insights/anthropic-openai-revenue — V
[36] Sacra, Anthropic profile — https://sacra.com/c/anthropic/ — V
[37] Menlo Ventures, "2025 Mid-Year LLM Market Update" (Jul 2025) — https://menlovc.com/perspective/2025-mid-year-llm-market-update/ — V
[38] Menlo Ventures, "2025: The State of Generative AI in the Enterprise" (Dec 9, 2025) — https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/ — V
[39] The Next Web (Sacra data), "Cursor $2B ARR, $50B valuation" (Apr 18, 2026) — https://thenextweb.com/news/cursor-anysphere-2-billion-funding-50-billion-valuation-ai-coding — V
[40] Sacra, Harvey profile — https://sacra.com/c/harvey/ — V
[41] SitePoint, "Local LLMs vs cloud API cost analysis 2026" — https://www.sitepoint.com/local-llms-vs-cloud-api-cost-analysis-2026/ ; Azumo, "Hidden costs of self-hosting LLMs" — https://azumo.com/artificial-intelligence/ai-insights/self-hosting-llms-cost — R

**Workstream 3 — leakage mechanics**
[42] Anthropic Commercial Terms of Service (eff. Jun 17, 2025) — https://www.anthropic.com/legal/commercial-terms — V
[43] Anthropic, API and data retention docs — https://platform.claude.com/docs/en/manage-claude/api-and-data-retention — V
[44] Anthropic Privacy Center, ZDR coverage — https://privacy.claude.com/en/articles/8956058 — R
[45] TechCrunch, "Anthropic users face a new choice: opt out or share your data" (Aug 28, 2025) — https://techcrunch.com/2025/08/28/anthropic-users-face-a-new-choice-opt-out-or-share-your-data-for-ai-training/ — V
[46] OpenAI developer docs, "Your data" — https://developers.openai.com/api/docs/guides/your-data — V
[47] Google, Gemini API Terms (eff. Mar 23, 2026) — https://ai.google.dev/gemini-api/terms — V
[48] OpenAI, "Response to NYT data demands" — https://openai.com/index/response-to-nyt-data-demands/ ; Terms.Law analysis (Nov 12, 2025) — https://www.terms.law/2025/11/12/ — V
[49] Traverse Legal, "AI litigation beyond copyright" — https://www.traverselegal.com/blog/ai-litigation-beyond-copyright/ — R
[50] Anthropic, "The Anthropic Economic Index" — https://www.anthropic.com/news/the-anthropic-economic-index — V
[51] VentureBeat, "Anthropic cracks down on unauthorized Claude usage by third-party harnesses" — https://venturebeat.com/technology/anthropic-cracks-down-on-unauthorized-claude-usage-by-third-party-harnesses — R
[52] Fortune, "Sam Altman: OpenAI will steamroll AI startups" (Aug 13, 2024) — https://fortune.com/2024/08/13/sam-altman-openai-will-steamroll-ai-startups-i-run-one-not-worried/ — R
[53] Wikipedia, Harvey (software) — OpenAI Startup Fund led $5M round Nov 2022 — https://en.wikipedia.org/wiki/Harvey_(software) — R
[54] FTC, "6(b) staff report on AI partnerships & investments" (Jan 2025) — https://www.ftc.gov/news-events/news/press-releases/2025/01/ftc-issues-staff-report-ai-partnerships-investments-study — V
[55] TechCrunch, "Court filings reveal OpenAI and io's early work" (Jun 23, 2025) — https://techcrunch.com/2025/06/23/court-filings-reveal-openai-and-ios-early-work-on-an-ai-device/ — R
[56] OpenAI, "Data Partnerships" (Nov 2023) — https://openai.com/index/data-partnerships/ — V
[57] OpenAI, "Harvey" case study (custom case-law model) — https://openai.com/index/harvey/ — V
[58] Kiteworks (Cloudera survey), "AI agents, enterprise data privacy" — https://www.kiteworks.com/cybersecurity-risk-management/ai-agents-enterprise-data-privacy-security-balance/ — R
[59] Zerve, "Enterprise AI deployment" (secondary citation of Gartner 75% figure) — https://www.zerve.ai/blog/enterprise-ai-deployment — R
[60] CNBC, "Pentagon blacklist Anthropic defense tech Claude" (Mar 4, 2026) — https://www.cnbc.com/2026/03/04/pentagon-blacklist-anthropic-defense-tech-claude.html ; ibl.ai, "Air-gapped AI for federal agencies" — https://ibl.ai/blog/air-gapped-ai-for-federal-agencies — R

**Workstream 4 — historical analogies**
[61] Wikipedia, "United States v. Microsoft Corp." + Studicata case brief (253 F.3d 34) — https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp. ; https://www.studicata.com/case-briefs/case/u-s-v-microsoft-corp — V
[62] Proudly Serving (Adam Barr), "DOS ain't done till Lotus won't run" debunk — https://www.proudlyserving.com/archives/2005/08/dos_aint_done_t.html — V
[63] InfoWorld, "How Did WordPerfect Go Wrong?" — https://www.infoworld.com/article/2314057/how-did-wordperfect-go-wrong.html — R
[64] CNBC (summarizing WSJ Apr 23, 2020), "Amazon uses data from third-party sellers to develop its own products" — https://www.cnbc.com/2020/04/23/wsj-amazon-uses-data-from-third-party-sellers-to-develop-its-own-products.html — V
[65] House Judiciary bipartisan letter (Oct 18, 2021) — https://democrats-judiciary.house.gov/sites/evo-subsites/democrats-judiciary.house.gov/files/migrated/UploadedFiles/Letter_-_Amazon_Misrepresentations_-_10.18.21.pdf — V
[66] European Commission press release IP/22/7777 (Dec 20, 2022) — https://ec.europa.eu/commission/presscorner/detail/en/ip_22_7777 — V
[67] FTC v. Amazon complaint (Sept 2023) — https://www.ftc.gov/system/files/ftc_gov/pdf/1910129AmazoneCommerceComplaintPublic.pdf ; MLex, trial date Mar 29, 2027 — https://www.mlex.com/mlex/antitrust/articles/2422758/ — V
[68] SparkToro/Datos, "2024 zero-click search study" — https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/ — R
[69] SparkToro/Similarweb, "In 2026, less than one-third of Google searches still send a click" (Jun 9, 2026) — https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/ — V
[70] Dataquest, "The Database Wars" — https://www.dqindia.com/the-database-wars/ — R
[71] Oracle press release, PeopleSoft acquisition (Dec 2004/Jan 2005) — https://www.oracle.com/corporate/pressrelease/oracle-buys-peoplesoft-121304.html — V
[72] SAP official history 1991–2000 — https://www.sap.com/about/company/history/1991-2000.html — V
[73] Wikipedia, Informix Corporation — https://en.wikipedia.org/wiki/Informix_Corporation — R
[74] ReadWrite, "Cloud pricing is racing to zero" (Mar 26, 2014) — https://readwrite.com/2014/03/26/amazon-aws-ec2-s3-price-cuts/ — R
[75] Stock Analysis on Net, AMZN segment analysis (AWS operating margins) — https://www.stock-analysis-on.net/NASDAQ/Company/Amazoncom-Inc/Ratios/Reportable-Segments — V
[76] Synergy Research Group, "Cloud market share trends" (Q3 2025) — https://www.srgresearch.com/articles/cloud-market-share-trends-big-three-together-hold-63-while-oracle-and-the-neoclouds-inch-higher — V

---

*Research conducted July 4, 2026 by four parallel research agents; cross-check verification pass by
the assembling session. This document is the evidence base for the Alpha-AI Sovereignty thesis —
claims tagged here should be cited at the confidence level recorded here, not upgraded downstream.*
