# NWAi Investability Gates & Red/Yellow Flags

## Gates — Pass/Fail at Screening

Apply all 6. One FAIL = immediate Fail verdict. Do not advance.

| # | Category | Requirement | Auto-Kill Trigger |
|---|----------|-------------|-------------------|
| 1 | Deal Structure | No SAFEs; convertible debt acceptable; equity required; prefer priced round at Seed to early Series A | SAFE-only structure |
| 2 | Geography/IP | US-based nexus only. Executive team AND IP must be US-based. No foreign-owned entities. | Foreign HQ or foreign IP entities |
| 3 | Commercialization Traction | Real revenue. No "Research Projects" or "Demo Labs." Evidence of recurring engagement or revenue, or real contracts with paying customers. | Pre-revenue with no paying customers |
| 4 | Product Stage | MVP with one or more successful beta(s) or paid beta(s) | No MVP; no beta validation |
| 5 | Syndication | Credible lead investor and clean cap table | No credible lead; messy cap table |
| 6 | Exit | The 10x / 5-Year Test. TAM must support 20x–100x return. If TAM is too small or buyer list is empty: "Watch" at best. | TAM too small to support return target |

---

## Red Flags — Immediate No / High Risk

Flag any of the following. One or more Red Flags = recommend FAIL (unless mitigant is very strong).

### 1. Founder & Team
- Lack of domain expertise — no industry background or missing complementary skills (business acumen, CTO, etc.)
- Lack of commitment — part-time founders, keeping day job, juggling multiple startups
- Uncoachability — founders who get defensive, lecture investors, or refuse feedback
- Founder conflict/mismatch — unresolved tension between co-founders
- Note: Lack of domain expertise can be mitigated by strong advisors or board (ask: are they open to this?)

### 2. Structural & Legal
- Foreign/non-US HQ or foreign IP entities
- LLC corporate structure — NWAi only invests in C-Corps (Delaware or equivalent)
- IP Ownership Issues — core technology not assigned to company, held personally or by prior employer
- Messy cap table — too many small investors, missing stockholder agreements, equity crowd funding, too much equity given away early

### 3. Market & Business Model
- Small addressable market — TAM too small to support 20x–100x return
- Lack of defensibility (No Moat) — easily copied, no unique IP, no network effects, no proprietary data
- Unrealistic projections — hockey-stick curves without logical unit economics (CAC > LTV)
- Technology Readiness Level below 5 (see TRL scale) and/or low manufacturing readiness
- Sources of funding / capital stewardship issues — high burn rate, short runway, high capital requirements

### 4. Tactical & Professional
- Requires an NDA — immediate red flag; professional investors almost never sign NDAs at screening
- Incomplete application/deck — missing round size, location, or clear bios for senior management
- Dishonesty/Exaggeration — any hint of lying about traction, team credentials, or past successes

---

## Yellow Flags — Mitigation Required / Low Potential

Yellow flags do not auto-kill but require documented mitigation.

| Category | Yellow Flag | What to Check |
|----------|-------------|---------------|
| Founder & Team | Lack of commitment (part-time, day job) | Is there a clear commitment timeline? |
| Structural & Legal | Messy cap table | Can it be cleaned up pre-close? |
| Structural & Legal | Significant regulatory risk (FDA, SEC gray zones) | Is there a clear compliance path? |
| Market & Business Model | Lack of defensibility | Can data/workflow moat develop quickly? |
| Market & Business Model | Slow scaling (returns > 5–7 years) | Is there an early exit milestone? |
| Market & Business Model | Funding injection needed to reach valuation inflection | How much dilution? Runway to milestone? |
| Market & Business Model | Sources of funding and capital stewardship concerns | Non-dilutive vs dilutive; burn rate analysis |

---

## Technology Readiness Levels (TRL) — GAO Scale

NWAi requires TRL ≥ 5 for Tech deals.

| TRL | Description |
|-----|-------------|
| 1 | Basic principles observed and reported |
| 2 | Technology concept/application formulated |
| 3 | Analytical and experimental proof of concept |
| 4 | Component validation in lab environment |
| **5** | **Component validation in relevant environment ← NWAi minimum** |
| 6 | Prototype demonstration in relevant environment |
| 7 | System prototype in operational environment |
| 8 | Actual system completed and qualified |
| 9 | Actual system proven through mission operations |

Note: TRL < 5 is a Red Flag. Require evidence of market discovery, industry partnership, or joint development relationships.

---

## Screening Output Format

Produce a structured output:

```
COMPANY: [Name]
SCREENING DATE: [Date]

GATE RESULTS:
✅ Deal Structure: [finding]
✅ Geography/IP: [finding]
✅ Commercialization: [finding]
✅ Product Stage: [finding]
⚠️ Syndication: [finding — yellow flag]
✅ Exit: [finding]

RED FLAGS: [list or "None identified"]
YELLOW FLAGS: [list with mitigation notes or "None identified"]

VERDICT: ADVANCE / CONDITIONAL ADVANCE / FAIL
RECOMMENDED NEXT STEP: [Scout/IntroCall | Watch | Fail with reason]
DEALUM STEP TO UPDATE: [step name]
```
