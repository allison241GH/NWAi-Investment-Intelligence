# Plugin v2.13 — Financial Agent Team (Phase B)

**Source:** May 6, 2026 working session with Sam Guren (NWA), Ron Tarro (NWA TechGroup), and Jamie Allison (NWA TechGroup Co-Chair)
**Plan source:** `/Users/jamie/.claude/plans/review-the-attached-file-silly-dawn.md`
**Plugin version:** v2.13.0 (architecture v0.22.0)
**Phase A reference:** Company Researcher refocus (PMTF + Team Commitment + Founder Claim Verification) — shipped as part of v2.13.0

---

## Strategic Context

The legacy `financial-analyst` agent was doing too much: unit economics, projections, cap table, and 10x return path were all collapsed into a single agent. Two structural problems emerged:

1. **Pricing was buried inside finance.** Ron's observation: pricing was historically a marketing function, not a finance function. Most early-stage companies are still in *pricing discovery* — they don't know what their product should cost or why. Finance forecasts that start from the company's pricing assumptions inherit those errors.

2. **The forecast was too dependent on the company's submitted financials.** Sam's McMurry method observation: at his prior firms, they would gather everything they could about a company, *then write their own financials independently*. The point was never to validate the company's spreadsheet — it was to test whether the entrepreneur understood their own business.

3. **AI without explicit analyst-POV instructions produced "AI slop."** Jamie's observation: feeding the model a pitch deck and asking for analysis just rendered the pitch deck back as analysis. The model defaulted to charitable interpretation. Without a forced analyst point of view ("bear case is X *because* Y"), the output was a range of possibilities, not a recommendation.

The fix: split the legacy `financial-analyst` into three specialized agents that work as a system, with explicit guardrails baked into each agent's mandate.

---

## Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   Pricing Analyst (NEW)        Competitive Intelligence        │
│   • Pricing discovery          (existing)                      │
│   • Value proposition                  │                       │
│   • Channels (CDW etc)                 │                       │
│   • Unit economics                     │                       │
│           │                            │                       │
│           └────────────┬───────────────┘                       │
│                        ▼                                       │
│              Forecasting Analyst (REPLACES financial-analyst)  │
│              • Proprietary P&L + Cash flow + Balance sheet     │
│              • 5-year capital plan, 3 scenarios                │
│              • Critical analyst POV mandate                    │
│              • Independent research, ignore pitch deck bias    │
│                        │                                       │
│                        ▼                                       │
│              Venture Analyst (NEW)                             │
│              • Valuation (today + projected exit)              │
│              • Capital required + dilution                     │
│              • IRR / multiple / hurdle rate (35%)              │
│              • NWA 10x-in-5-years test                         │
│              • Deal structure recommendation                   │
│                        │                                       │
│                        ▼                                       │
│         DD Report sections 7-10 / Decision / Memo              │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

The legacy `financial-analyst.md` is replaced by this three-agent team. `financial-analyst.md` is renamed to `forecasting-analyst.md` (full rewrite); `pricing-analyst.md` and `venture-analyst.md` are new files.

---

## B.1 Pricing Analyst (NEW)

**Source:** Ron Tarro — transcript @ 01:11:05, 01:13:27

**Mandate:**
- Address the pricing discovery gap most early-stage companies have
- Unit economics: cost to produce, sale price, why this price?
- Channel economics (e.g., CDW 8x markup vs direct 2.5x — Synergist case)
- Value proposition validation: why would someone buy this?
- Pricing comparison to comps (not just product comparison)
- Pricing pressure forecast (commoditization risk)

**Why this agent matters:** Ron's quote — "every board meeting I'm in, it's like, what's a market price here? And they're all lost trying to figure it out." Pricing is one of the most difficult things to research at the early stage. Getting it explicitly into a dedicated agent prevents the rest of the financial stack from inheriting bad pricing assumptions.

**Output:** Pricing analysis brief that feeds the Forecasting Analyst (revenue assumptions) and the Venture Analyst (valuation pricing).

---

## B.2 Forecasting Analyst (REPLACES financial-analyst)

**Source:** Sam Guren — transcript @ 00:51:50, 00:52:53, 00:58:41 ("the McMurry method"); Jamie Allison — transcript @ 00:38:10, 00:55:20 ("the no AI slop rule"); Ron Tarro — transcript @ 00:53:59

### MANDATORY analyst-POV instructions ("no AI slop" rule)
- Apply a critical lens — do not merely render the pitch deck's claims
- Do independent research (LinkedIn, Perplexity, public filings, comps)
- Provide an accountable analyst point of view, not a range of best/worst case
- Force a specific recommendation: bear case is X *because* Y, base case is Z *because* W

### Forecasting approach (the McMurry method)
- Build proprietary financial projections
- Do not start from company's spreadsheet
- Use comps where available (industry margins, public competitors)
- Adjust for market dynamics (commoditization, channel pressure like CDW)

### Three financial statements
- P&L
- Cash flow (critical for capital requirements)
- Balance sheet (where applicable for working capital cycles)

### Capital requirements forecast
- 5-year capital needs
- High / medium / low growth scenarios with explicit assumptions
- Scenario-specific milestones (when does Series A close, what triggers Series B)

### Test of entrepreneur understanding
- Compare proprietary forecast to company's submitted numbers
- Flag where company's numbers diverge from market reality
- Use as data point: does the entrepreneur actually understand their business?

**Why this agent matters:** Sam's observation — "I love spending time with the entrepreneur and his financials to see if he really understands his business... through his financials, does he really understand his business." The forecast itself is a diagnostic on the founder, not just a financial projection.

---

## B.3 Venture Analyst (NEW)

**Source:** Ron Tarro — transcript @ 01:22:20; Sam Guren — transcript @ 01:20:15; Randy's "$9M-claimed-vs-$3M-analysis" example — transcript @ 01:19:33

**Mandate:** Final synthesis layer. Consumes outputs from Pricing Analyst, Forecasting Analyst, Competitive Intelligence, Risk Assessor, and Company Researcher.

### Outputs

1. **Valuation today** — with comps and methodology
2. **Projected exit valuation** — 3-year and 5-year, multiple scenarios
3. **Capital required** — line-item from Forecasting Analyst, validated
4. **Dilution modeling** — round-by-round
5. **Investor return calculation:**
   - IRR
   - Cash-on-cash multiple
   - Hurdle rate test (35% per Sam)
   - **NWA-specific: does this hit the 10x in 5 years criterion?**
6. **Deal structure recommendation:**
   - Priced equity (NWA preferred)
   - Convertible with cap (Sam: "industry of 8")
   - Participating preferred
7. **Investment recommendation framework:**
   - Does the deal as-priced clear the hurdle rate?
   - If not, what valuation would?
   - What deal structure would close the gap?

**Why this agent matters:** This is the agent that solves the Randy scenario directly — when a founder says the company is worth $9M and your independent analysis says $3M, the Venture Analyst produces the documented valuation with comps, return math, and a deal structure recommendation that closes the gap (or shows that no structure can).

---

## Pipeline Integration

### `/dd-report`
- Section 7 (Financial Validation): Forecasting Analyst output
- Section 8 (Pricing & Unit Economics): Pricing Analyst output
- Section 9 (Valuation & Returns): Venture Analyst output
- Section 10 (Risk-Adjusted Recommendation): Venture Analyst hurdle-rate test

### `/decision`
- Decision rationale references Venture Analyst hurdle-rate test
- IRR / multiple captured in decision record

### `/memo`
- Investment Memo "Financials" section uses Forecasting Analyst forecast (not company's)
- "Returns" section uses Venture Analyst output
- "Deal Terms" section uses Venture Analyst structure recommendation

---

## Files Modified in v2.13.0

**Phase B (this doc):**
- `.claude/agents/financial-analyst.md` → renamed to `.claude/agents/forecasting-analyst.md` (full rewrite)
- `.claude/agents/pricing-analyst.md` (NEW)
- `.claude/agents/venture-analyst.md` (NEW)
- `.claude/commands/diligence.md` (update agent invocation list)
- `.claude/commands/dd-report.md` (consume new agent outputs)
- `.claude/commands/decision.md` (reference Venture Analyst output)
- `.claude/commands/memo.md` (consume new agent outputs)
- `references/diligence-scoring-rubrics.md` (update Bear/Base/Bull rubric)

**Phase A (Company Researcher refocus, also part of v2.13.0):**
- `.claude/agents/team-analyst.md` (PMTF, Team Commitment Depth, Founder Claim Verification)
- `references/scout-questions.md` (Team scoring expanded with PMTF + commitment + verification)
- `references/diligence-scoring-rubrics.md` (Execution Risk criteria expanded)

**Final wrap (both phases):**
- `CLAUDE.md` (agent roster, framework references)
- `nwai-techgroup-pipeline-architecture.md` (architecture diagram, bump to v0.22.0)
- `plugin/current/nwai-tech-pipeline.plugin` (repackage as v2.13.0)

---

## Verification Plan

**Phase B verification (run against Synergist deal in `deals/active/`):**
- Run Pricing → Forecasting → Venture Analyst sequence
- Forecasting Analyst output must diverge from company's submitted numbers in defensible ways (the divergence itself is the value)
- Venture Analyst output must address the "$9M-vs-$3M" valuation gap question with documented methodology
- DD Report sections 7-10 must properly consume new agent outputs
- `/memo` must reference new agent outputs for Financials / Returns / Deal Terms

**Plugin shipping checklist:**
- [ ] Bump plugin to v2.13.0
- [ ] Update `nwai-techgroup-pipeline-architecture.md` to v0.22.0
- [ ] Sync `plugin/unpacked/nwai-tech-pipeline/` to match `.claude/`
- [ ] Repackage `plugin/current/nwai-tech-pipeline.plugin`
- [ ] Commit and push (no MCP changes → no reinstall required)

---

## Confirmed Decisions

1. **Sequencing:** Phase A ships independently first (Company Researcher refocus). Phase B (Forecasting + Pricing + Venture Analyst team + pipeline integration) ships as a unit afterward — both within v2.13.0.
2. **Round 2 meeting:** Phase B ship is NOT gated by the Round 2 review with Sam/Ron. Ship the new agents into v2.13.0 when ready; Round 2 input gets folded in as iterative refinement post-ship.
3. **Risk Assessor:** Stays as-is (regulatory, exit landscape, execution risk). Venture Analyst consumes risk-analyst output for the hurdle-rate test rather than duplicating its work.
