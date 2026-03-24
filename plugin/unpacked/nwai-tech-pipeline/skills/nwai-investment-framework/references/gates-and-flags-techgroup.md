# NWAi TechGroup — Screener Framework

## Design Principles

This screener is calibrated for the Dealum inbound funnel, which historically produces
zero funded deals (3 years, ~3,000 pitches). Its purpose is **not** to find investments —
it is to identify the ~10% of deals worth a 30-minute Scout assessment and a Live Pitch slot
in the bi-weekly TechGroup meeting. Screen to Scout. The diamond-finding happens at Scout
and Live Pitch, not here.

Two calibration facts drive all threshold decisions:
- Team capacity: 6 Scout/Live Pitches per month (3 per bi-weekly meeting)
- Target advance rate: ~11% of Dealum inbound (roughly 1 in 9 deals)

---

## Layer 1 — Hard Gates (Binary, Immediate Kill)

Apply all three gates first. A single FAIL = DECLINE. Do not proceed to scoring.

These are the only criteria that are:
(a) determinable from pitch deck materials alone, and
(b) truly non-negotiable regardless of opportunity strength.

| Gate | MET if... | FAIL if... |
|------|-----------|------------|
| **1. Foreign Entity / IP Structure** | Company appears investable from a US legal standpoint — C-Corp or convertible structure, IP owned by the US entity | Entity structure or IP ownership clearly prevents US investment (foreign HQ, foreign IP entity, VIE structure) |
| **2. Market Size Threshold** | Opportunity plausibly supports venture-scale outcomes ($500M+ TAM) | Market clearly too small to support 10x return in 5 years — not a matter of founder framing, but structural ceiling |
| **3. Commercialization Path** | Credible path to paying customers exists — MVP, beta, LOI, or clear near-term route to revenue | Purely academic, pre-concept, or no credible path to market. Research projects and demo labs with no product roadmap. |

**Gating rule:** Mark FAIL only when there is clear evidence the criterion is not met.
If pitch materials are silent on a criterion, mark MET with a note — do not fail on missing information alone.
Missing information becomes a Yellow Flag, not a gate kill.

**What is NOT a hard gate (moved to Readiness scoring):**
- SAFE deal structure — scored in Readiness, flagged for founder conversation at IntroCall
- No lead investor — scored in Readiness, not a kill at screen
- Product stage / MVP — scored in Readiness
- Traction / revenue — scored in Opportunity

---

## Layer 2 — Opportunity Score (0–5 per dimension, 25 points total)

Score each dimension using pitch deck materials plus light web research on Market Opportunity
and Founder Advantage (see Research Protocol below).

Use the full 0–5 scale. Avoid clustering around 3–4.

| Score | Definition |
|-------|-----------|
| 5 | Exceptional — clear, evidence-backed signal |
| 4 | Strong — credible signal with minor gaps |
| 3 | Acceptable — present but not differentiated |
| 2 | Weak — thin signal, speculative |
| 1 | Very Weak — almost absent |
| 0 | Absent — no evidence whatsoever |

### Dimension 1 — Structural Discontinuity
*Is this riding a genuine, irreversible market shift? Why is now the right moment?*

Score on: clarity of the "why now" argument; evidence of a real structural shift (regulatory, technological, behavioral) vs. incremental improvement dressed as disruption; whether the timing argument would have been equally valid 3–5 years ago.

- 5: Unmistakable, named structural shift with clear timing logic. Category-creating.
- 3: Reasonable "why now" but the shift is evolutionary rather than discontinuous.
- 1: No timing argument. Could have been built any time in the past decade.
- 0: No evidence of market shift awareness.

→ **Scout mapping:** At Scout, this expands to Category & Market Discontinuity (Q1), which adds explicit product category typing (new category creator vs. existing optimizer) and lifecycle horizon (5-year window vs. 10-year platform).

### Dimension 2 — Market Opportunity ⚠️ SUB-FLOOR: score ≤ 2 = DECLINE regardless of total
*Does the TAM credibly support venture-scale outcomes? Is the market growing?*

Score on: TAM size and credibility (validated against web research, not founder claim alone);
market growth trajectory; whether the SAM is large enough to support a 10x return; whether
the market is expanding or contracting.

- 5: $5B+ TAM, strong growth, SAM clearly supports 10x. Numbers validated by third-party data.
- 4: $1–5B TAM, growing market, SAM plausibly supports 10x.
- 3: $500M–1B TAM, moderate growth. Tight but possible.
- 2: TAM < $500M or inflated beyond credibility. ⚠️ Triggers DECLINE regardless of other scores.
- 1: Market too small or clearly contracting.
- 0: No market sizing provided and web research finds no venture-scale market.

### Dimension 3 — Founder Advantage
*Does this founding team have an earned right to win in this domain?*

Score on: domain expertise depth (years in industry, relevant technical credentials);
prior startup experience and exits; execution signals (product already built, team assembled,
early customers signed); talent magnetism (quality of co-founders and advisors).
Validate with light web research (LinkedIn, Crunchbase).

- 5: Domain expert with prior exit or deep technical credibility. Compelling team assembled.
- 4: Strong domain background, some execution evidence. No prior exit but credible.
- 3: Relevant background but generalist. No clear earned advantage.
- 2: Thin domain connection. First-time founder with no relevant track record.
- 1: Founder background disconnected from problem.
- 0: No founder information available.

### Dimension 4 — Defensibility Signal
*Can we see early seeds of a real moat, even at this stage?*

Score on: any evidence of proprietary data, IP, network effects, or workflow lock-in;
whether the product could be replicated via public APIs in under 48 hours (thin wrapper risk);
whether the moat strengthens with usage (Memory Lock-in signal).

- 5: Clear defensibility mechanism — proprietary data, filed IP, network effects, or deep workflow integration. Not replicable quickly.
- 4: Meaningful moat signal present, needs development.
- 3: Some differentiation but replication risk is real.
- 2: Thin wrapper risk present — core product appears to be primarily API orchestration with no proprietary layer. ⚠️ Flag as Yellow.
- 1: No moat signal. Feature, not a product.
- 0: Explicitly describes using only public APIs/models with no proprietary layer.

→ **Scout mapping:** At Scout, this splits into two dimensions: Ecosystem Role (Q4 — platform creator vs. follower; flywheel potential) and Adjacent Displacement Risk (Q5 — functional equivalents and emerging tech threat timeline). The Moat Assessment (Q3) deepens this into a distilled 4-column table verdict.

### Dimension 5 — Traction Signal
*Is there evidence of real customer pull, not just founder push?*

Score on: paying customers (weight heavily), signed LOIs, active beta users with retention
data, revenue figures, named design partners. Cold outreach pipelines do not count.

- 5: Paying customers, growing MRR, named logos. Retention evidence.
- 4: Paying customers or signed LOIs. Early but real.
- 3: Active beta with engagement signals. No revenue yet.
- 2: Waitlist or expressed interest. No validation of willingness to pay.
- 1: No traction evidence beyond founder assertion.
- 0: Pre-product with no market contact.

---

## Layer 3 — Readiness Score (0–5 per dimension, 20 points total)

Readiness scores do not drive the advance decision. They inform the Scout briefing
and flag specific friction items for the IntroCall conversation.

Exception: Readiness score ≥ 15/20 on a WATCH deal → note "readiness is strong,
prioritize re-engagement when opportunity matures."
Readiness score < 10/20 on an ADVANCE deal → flag all friction items explicitly in
the Screener output for the team to address at Live Pitch.

### Dimension 1 — Deal Structure
*What is the current proposed deal structure?*

- 5: Priced equity round (Seed or Series A). Clean cap table.
- 4: Convertible note with reasonable terms.
- 3: Convertible note with unusual terms (high cap, aggressive discount).
- 2: SAFE proposed. ⚠️ Flag: "Structure conversation required at IntroCall. NWAi requires equity or convertible debt. If founder insists on SAFE after discussion, pass."
- 1: SAFE with no indication of flexibility.
- 0: No funding structure disclosed.

### Dimension 2 — Product Maturity
*Where is the product in its development lifecycle?*

- 5: Revenue-generating product with retention metrics.
- 4: Paying beta customers. MVP validated.
- 3: MVP live, active beta users, no revenue yet.
- 2: Prototype only. No user validation.
- 1: Design/concept stage. No working product.
- 0: Idea only. No product evidence.

### Dimension 3 — Syndication Readiness
*Is there a credible lead investor or co-investor in the round?*

- 5: Lead investor committed with term sheet or strong indication.
- 4: Named credible lead in conversation. Round forming.
- 3: Angel investors committed but no institutional lead identified.
- 2: No lead identified. Round not formed. ⚠️ Flag: "No lead — NWAi rarely leads. Verify at IntroCall."
- 1: No co-investors and founder appears unaware of syndication norms.
- 0: No information on round composition.

### Dimension 4 — Founder Accessibility
*Is this founder reachable, US-based, and ready for an engagement process?*

- 5: US-based, responsive, professional pitch submission with complete materials.
- 4: US-based, submission complete, minor gaps in materials.
- 3: US-based but submission materials thin. Some follow-up required.
- 2: Location unclear or international founder with US entity. Verify geography.
- 1: Submission materials very incomplete. Likely not ready for process.
- 0: No contact information or clearly unreachable.

---

## Research Protocol

Deploy WebSearch on exactly two dimensions before scoring:

**1. Market Opportunity validation**
Search: "[company sector/industry] market size [current year]"
Goal: Find 1–2 third-party market sizing references (Gartner, IDC, CB Insights, industry reports).
Compare against founder TAM claim. If founder TAM is > 3× bottoms-up estimate, note the
discrepancy and score accordingly.

**2. Founder Advantage validation**
Search: "[founder name] LinkedIn" and "[company name] Crunchbase"
Goal: Verify domain background, prior companies, exits, and any notable advisors or investors.
Takes 2–3 minutes. Dramatically improves score accuracy on this dimension.

All other dimensions score from pitch deck materials at face value.
Do not deploy company-researcher or competitive-intelligence agents at Screen stage —
save full agent deployment for Diligence.

---

## AI Wrapper Assessment

For all Tech deals, assess thin wrapper risk as a standalone flag before scoring Defensibility.

**High Wrapper Risk**: Core product is primarily prompt engineering or API orchestration
on top of OpenAI/Anthropic/etc. Could be replicated by a developer in < 48 hours.
No proprietary data, training, or workflow integration visible. → Explicit ⚠️ Yellow Flag.
Requires explicit moat justification to advance.

**Moderate Wrapper Risk**: Product uses public AI infrastructure but shows early signs of
proprietary layer (domain-specific data, fine-tuning, workflow integration). Moat is nascent
but visible.

**Low Wrapper Risk**: Proprietary model, unique training data, deep workflow integration,
or non-AI moat that is genuinely defensible. AI is an enabler, not the entire product.

---

## Decision Logic

### ADVANCE TO SCOUT
- All 3 Hard Gates: MET
- Opportunity Score: ≥ 18/25
- Market Opportunity dimension: ≥ 3 (sub-floor enforced)
- No individual Opportunity dimension = 0
- Output includes 3–5 Live Pitch Questions (see Output Format)

### WATCH — Active
- All 3 Hard Gates: MET
- Opportunity Score: 13–17/25
- Market Opportunity dimension: ≥ 3
- Output must name specific, measurable milestone(s) for re-engagement
- Examples: "Re-engage when ARR reaches $250K", "Re-engage when Series A lead commits",
  "Re-engage when FDA pre-submission filed"
- WATCH is rare and intentional — not a soft decline

### DECLINE
- Any Hard Gate: FAIL, OR
- Opportunity Score: < 13/25, OR
- Market Opportunity score: ≤ 2
- Output names the primary kill reason in one sentence

---

## Output Format

See screen.md command for the full structured output template.
The screener produces:
1. A structured in-chat Triage Report (tables, scores, flags, recommendation)
2. A Word document saved to `deals/` folder

The in-chat report uses the NWA Triage Report format:
- Signal Summary at top (scores + verdict)
- Company Snapshot table
- Hard Gates table
- Opportunity Score table
- Readiness Score table
- AI Wrapper Flag (one line)
- Risk Flags (Red + Yellow)
- Recommendation block — for ADVANCE deals, includes 3–5 Live Pitch Questions
  targeted to this specific deal's gaps and risks

---

## Live Pitch Questions (ADVANCE Deals Only)

When a deal advances, generate 3–5 questions specifically for the founder's Live Pitch
at the bi-weekly TechGroup meeting. These are not generic — they must be derived from
the specific gaps, risks, and uncertainties identified during screening.

Question design rules:
- Targeted: reference something specific in this deal (a market claim, a founder gap,
  a defensibility question, a structure concern)
- Open-ended: designed to reveal information not in the deck
- Prioritized: order from most critical (gate-level concern) to most clarifying (enrichment)
- Format: numbered list, 1–2 sentences each

Categories to draw from:
- Unvalidated market claims (if Market score required web research correction)
- Moat/defensibility gaps (if thin wrapper risk flagged)
- Founder domain questions (if Founder Advantage score was 3 or below)
- Structure friction (if SAFE or no lead — founder needs to address in the room)
- Traction questions (if Traction score was 2 or below — validate customer pull)
- Exit/acquirer questions (always useful at Scout stage)

---

*NWAi TechGroup Screener Framework | v1.0 | March 2026*
*Replaces the original 6-gate AutoKill framework for TechGroup deals*
*Medical and Space verticals retain separate hard-gate screener frameworks*
