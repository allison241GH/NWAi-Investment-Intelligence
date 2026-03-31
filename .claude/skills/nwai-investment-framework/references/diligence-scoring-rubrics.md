# NWAi Diligence Scoring Rubrics

Proprietary scoring frameworks applied during diligence. Reference this file when running
any quantitative assessment during the Scout or Diligence stages.

All scores feed into the final Investment Memo and IC presentation.

---

## 1. Moat Scoring (Two-Tier)

Run Tier 1 for every deal. Run Tier 2 only for AI-first or AI-enabled companies.

### Tier 1: General Business Moat (Score 0–6)

Award 1 point for each present:

| # | Moat Element | Present? |
|---|-------------|---------|
| 1 | **Network effects** — value increases as more users join | ✓ / ✗ |
| 2 | **Switching costs** — painful or expensive for customers to leave | ✓ / ✗ |
| 3 | **Proprietary data** — unique datasets competitors cannot access or replicate | ✓ / ✗ |
| 4 | **IP / Patents** — filed, granted, or defensible trade secrets | ✓ / ✗ |
| 5 | **Regulatory barriers** — licenses, certifications, compliance layers others must clear | ✓ / ✗ |
| 6 | **Vertical specialization** — deep domain expertise in a defensible niche | ✓ / ✗ |

**General Moat Score = sum of checkmarks**

| Score | Assessment | Implication |
|-------|------------|-------------|
| 0–1 | No Moat | High competitive risk — likely pass |
| 2–3 | Weak Moat | Needs exceptional execution or strong team to compensate |
| 4–5 | Moderate Moat | Defensible — advance with standard diligence |
| 6 | Strong Moat | Multiple defensive layers — high conviction signal |

---

### Tier 2: AI Moat Scoring (Score 0–10) — AI companies only

**Applicability gate:** Before scoring, explicitly answer: "Is this an AI-first or AI-enabled company?" If NO → mark Tier 2 as N/A with a one-line reason (e.g., "N/A — hardware product; no AI model or data flywheel present") and skip entirely. Do not force-apply AI Moat scoring to hardware companies, physical product companies, or non-AI software.

#### Cognitive / Data Moats (max 4 pts)

| Points | Element | What to look for |
|--------|---------|-----------------|
| 2 | **Training Data Moat** | Unique dataset for model training that competitors cannot access |
| 1 | **Inference Data Moat** | Product generates proprietary operational data flywheel as it's used |
| 1 | **Memory Lock-in** | Stores customer-specific context/history that creates real switching cost |

#### Capital / Compute Moats (max 2 pts)

| Points | Element | What to look for |
|--------|---------|-----------------|
| 1 | **Custom model training** | Requires substantial compute investment — not replicable cheaply |
| 1 | **Proprietary hardware / infrastructure** | Specialized compute environment not available off the shelf |

#### Vertical / Workflow Moats (max 4 pts)

| Points | Element | What to look for |
|--------|---------|-----------------|
| 2 | **Deep workflow integration** | Embedded in daily operations — not just an API wrapper |
| 1 | **Regulatory / compliance layer** | HIPAA, SOX, FedRAMP, etc. — costly for competitors to replicate |
| 1 | **Multi-sided network effects** | Platform connecting multiple participant types |

**AI Moat Score = sum of points**

| Score | Category | Investment Signal |
|-------|----------|------------------|
| 0–2 | Thin Wrapper | Auto-reject — commodity risk is too high |
| 3–4 | Weak Moat | Pass unless exceptional team + traction |
| 5–6 | Moderate Moat | Proceed with caution — monitor moat development |
| 7–8 | Strong Moat | Advance to full diligence |
| 9–10 | Exceptional Moat | High priority deal |

#### Thin Wrapper Detection — Run These 3 Tests First

**Test 1 — API Dependency:**
Could this product be rebuilt in a weekend using OpenAI / Anthropic APIs?
→ If YES: AI Moat score ≤ 2. Flag as thin wrapper.

**Test 2 — Differentiation Source:**
Where does the value actually come from?
→ Just prompt engineering → thin wrapper
→ Proprietary data + workflow integration → real moat

**Test 3 — Switching Cost:**
Can a customer switch to a competitor in less than one week with no meaningful loss?
→ If YES: No lock-in. AI Moat score ≤ 3.

---

## 2. Risk Scoring (1–10 per category)

Score each category 1–10 where **10 = highest risk**. Apply at Diligence stage.

### Five Risk Categories

**1. Execution Risk**
- Team size vs. scope (understaffed for what they're trying to do?)
- Key-person dependency (single founder / single technical expert?)
- Operational complexity (manufacturing, regulatory, multi-sided marketplace?)

**2. Market Risk**
- Adoption barriers (requires significant behavior change?)
- Incumbent response (will Big Tech or a well-resourced player squash them?)
- Market timing (too early to gain traction / too late to win share?)

**3. Financial Risk**
- Runway < 12 months with no revenue
- Burn rate vs. progress (spending efficiently toward milestones?)
- Unit economics unclear, negative, or unvalidated

**4. Technical / Product Risk**
- Unproven core technology (still in R&D / TRL < 5)
- Regulatory approval required and path is uncertain (FDA, FCC, FedRAMP)
- Product-market fit not yet validated by paying customers

**5. Competitive Risk**
- Weak moat — easily replicable by a funded competitor
- Crowded space — 10+ well-funded competitors with similar approach
- Competing directly with Big Tech (Google, Microsoft, Amazon in the same lane)
- Adjacent displacement risk — functionally equivalent solutions from an adjacent category or hyperscaler native build that could displace the company even if it wins its direct competitive set (carry forward Adjacent Displacement Risk score from Scout Q5)

### Risk Score Interpretation

| Overall Average | Implication |
|----------------|-------------|
| < 5 | Manageable risk profile |
| 5–7 | Moderate risk — document mitigants explicitly |
| > 8 | High risk — needs exceptional upside to justify |
| Any single category = 10 | Likely pass |
| 3+ categories ≥ 7 | Execution / market / financial trifecta — flag for IC |

**Output format:**

```
| Risk Category   | Score (1-10) | Key Concern (one sentence)   |
|-----------------|--------------|------------------------------|
| Execution       | X            |                              |
| Market          | X            |                              |
| Financial       | X            |                              |
| Technical       | X            |                              |
| Competitive     | X            |                              |

Overall Risk Score: [average]/10
Critical Risks (8+): [list]
Deal-Breakers: [flag if 2+ scores are 9+, or any score is 10]
```

---

## 3. Financial Model — Bear / Base / Bull Framework

### Revenue Projection (Years 1–5)

Build three scenarios. Use these growth rate benchmarks as anchors:

| Scenario | Growth Rate | Assumptions |
|----------|-------------|-------------|
| **Bear** | 20–40% YoY | Slow adoption, higher churn, market headwinds, bottom 25th percentile benchmarks |
| **Base** | 50–100% YoY | Steady adoption, normal churn, neutral market, median benchmarks |
| **Bull** | 100–200% YoY | Fast adoption, low churn, strong tailwinds, top 25th percentile benchmarks |

**Revenue formula:**
```
Revenue(t) = Customers(t) × ARPU × (1 - Churn Rate)
```

### Unit Economics Benchmarks

| Metric | Formula | Healthy Benchmark |
|--------|---------|-------------------|
| CAC | Sales + Marketing spend ÷ New customers acquired | Varies by model |
| LTV | ARPU × (1 ÷ Annual Churn Rate) | > 3× CAC |
| LTV : CAC | LTV ÷ CAC | > 3:1 |
| Payback period | CAC ÷ (ARPU × Gross Margin) | < 12 months ideal |
| Gross Margin | (Revenue − COGS) ÷ Revenue | > 70% for SaaS |

**Note:** For hardware or one-time sale models, LTV/CAC is less relevant. Focus on gross margin, payback period, and customer acquisition efficiency instead.

**Red flags:**
- LTV : CAC < 1.5:1 (for recurring revenue models)
- Payback > 24 months
- Gross margin < 50% for a software company
- Runway < 6 months with no revenue

### Exit Valuation Scenarios

| Case | Percentile | Scenario |
|------|-----------|----------|
| **Low** | 10th | Challenged execution, competitive pressure |
| **Base** | Median | Meets projections, normal market conditions |
| **High** | 75th | Exceeds targets, strong strategic value to acquirer |

Use comparable company analysis + venture capital method. Apply revenue multiples from
recent comparable exits in the relevant TechGroup theme sector.

**NWAi return target check:** Does the Base Case exit valuation support a 10x return
on NWAi's entry valuation within 5 years? If not, document the gap explicitly for IC.

---

## 4. Market Sizing — Bottoms-Up Methodology

Always verify founder TAM claims against a bottoms-up calculation.

```
SAM = Serviceable customers × Annual spend per customer
SOM = SAM × Realistic 3–5yr penetration %
```

**Validation check:** If company's stated TAM is > 3× your bottoms-up estimate → flag as inflated. Require sourcing.

**Market growth scoring:**

| CAGR | Score |
|------|-------|
| > 15% | High growth — favorable timing |
| 8–15% | Moderate growth — acceptable |
| < 8% | Slow / mature — requires strong differentiation thesis |

**"Why Now" timing score (0–5):**
Count how many of these apply:
- New technology enabler just became available
- Regulatory change creates opening
- Demographic or behavior shift reaching critical mass
- Cost of solution has dropped to viable threshold
- Pain point has reached critical mass with target buyers

Score ≥ 3: Strong timing thesis. Score < 2: Timing risk — flag for IC.

---

## How These Rubrics Compose

During diligence, apply rubrics in this sequence — each feeds the next:

```
Market Sizing → validates TAM/SAM assumptions in Financial Model
Competitive Intel → informs Moat Score (Tier 1 & 2)
Founder Research → feeds Execution Risk score
Moat Score → feeds Competitive Risk score
All four → synthesized into Risk Score
All five → inform the Financial Model exit scenarios
```

The `/diligence` command and `/memo` command both reference this file. The full agent team
(company-researcher, market-analyst, competitive-intelligence, technical-diligence,
financial-analyst, risk-assessor) gathers the raw data that these rubrics are applied to.

---

## Layer 2 Rubric Mapping

Each rubric feeds a specific Layer 2 Hypothesis Confirmation group. When generating Layer 2
conclusions in the DD Kickoff Package, use these mappings to anchor each conclusion to the
relevant rubric outputs:

| Rubric | Primary Layer 2 Group | Secondary Group |
|--------|----------------------|-----------------|
| Moat Tier 1 (General) | Technical Validation | Competitive Validation |
| Moat Tier 2 (AI Moat) | Technical Validation | Commercial Validation |
| Risk — Execution | Team Validation | — |
| Risk — Market | Market Validation | Competitive Validation |
| Risk — Financial | Financial Validation | — |
| Risk — Technical | Technical Validation | — |
| Risk — Competitive | Competitive Validation | Market Validation |
| Financial Model (Bear/Base/Bull) | Financial Validation | — |
| Market Sizing (TAM/SAM) | Market Validation | Financial Validation |

**Layer 2 conclusion quality rule:** A Layer 2 conclusion is only as strong as the rubric
inputs that anchor it. If a rubric cannot be scored (missing data), the corresponding Layer 2
group signal should be 🟡 at best. If a rubric produces a deal-stopper result (e.g., Thin
Wrapper, TRL < 5, Risk score ≥ 9), the corresponding Layer 2 group must be 🔴.
