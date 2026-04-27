---
description: Run NWAi TechGroup triage screener — 3 hard gates + opportunity/readiness scoring
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, mcp__nwai-dealum__update_application, WebSearch, Read, Bash, Write
argument-hint: [company-name | application-id | "paste pitch info"]
---

Run the NWAi TechGroup triage screener on a deal. Arguments: $ARGUMENTS

**Global formatting rule:** Write every prose field, finding, and rationale as single continuous lines. Do not insert manual line breaks within any sentence or paragraph. Hard line breaks inside prose render as broken text in the Cowork UI.

---

## Step 1: Load Screener Framework

Load the TechGroup screener reference from:
`.claude/skills/nwai-investment-framework/references/gates-and-flags-techgroup.md`

Read the full framework before proceeding. All scoring rubrics, NWA Filter tests, thresholds, decision logic, and output format rules are defined there.

---

## Step 2: Gather Deal Information

If $ARGUMENTS contains a company name or ID:
- Use `get_application` or `list_applications` to fetch the application from Dealum
- Extract: company name, contact, website, current step, tags, and all available pitch content

If $ARGUMENTS is empty or contains "paste":
- Ask the user to paste the pitch deck summary, email, or key company information
- Proceed once information is provided

If a company website is mentioned or discoverable, visit or note it for use in Steps 3–5.

---

## Step 3: Assign Track

Before research, determine the deal track from pitch materials:
- **Track A — Software / AI / Cloud**: Primary value delivery is software, data, algorithms, or AI inference. SaaS, API, licensing, or marketplace revenue model.
- **Track B — Hardware / Robotics / Physical Tech**: Physical product is a primary deliverable. Hardware unit sales, manufacturing, or embedded systems revenue.

Mixed plays default to Track B if a physical product is necessary for the product to function. Record the track assignment — it determines which Opportunity dimensions are scored.

---

## Step 4: Run Three Mandatory Web Research Searches

Run all three searches before scoring. Results feed directly into scoring and the Goliath Test.

**Search 1 — Market Opportunity Validation:**
Search: `"[company sector/industry] market size [current year]"`
Find 1–2 third-party market sizing references (Gartner, IDC, CB Insights, industry reports). Compare against founder TAM claim. If founder TAM is > 3× bottoms-up estimate, note the discrepancy — Cynical Default applies to Market Opportunity score.

**Search 2 — Founder Advantage Validation:**
Search: `"[lead founder name] LinkedIn"` and `"[company name] Crunchbase"`
Extract: domain tenure, prior companies, exits, notable advisors or investors. Discrepancies between deck claims and web findings trigger Cynical Default on Founder Advantage.

**Search 3 — Incumbent / Competitive Landscape:**
Search: `"[company sector] market leaders"` or `"[company name] competitors"` or `"[sector] [hyperscaler] [product area]"`
Goal: Identify dominant incumbents and assess whether any hyperscaler (NVIDIA, Microsoft, AWS, Salesforce, Google, Apple) is building in this direction. This directly enables the Goliath Test in Step 5. If a major incumbent has an announced roadmap item overlapping with this company's core function, flag it explicitly.

Do not deploy company-researcher or competitive-intelligence agents at this stage.

---

## Step 5: Apply Hard Gates

Evaluate all 3 hard gates using pitch materials. A single FAIL = immediate DECLINE. Skip remaining steps and go to output.

Mark MET only on positive evidence or silence (silence = Yellow Flag, not FAIL on missing info).

Gates: Foreign Entity / IP Structure | Market Size Threshold | Commercialization Path

---

## Step 6: Run NWA Filter Tests (Track A) / Hardware Assessment (Track B)

### Track A — Run before scoring Defensibility and Traction:

**Goliath Test:** Using Search 3 results, explicitly answer: "Could NVIDIA, Microsoft, AWS, Salesforce, or a major domain incumbent kill this with a feature update in the next 12–18 months?" Document: YES / NO / UNCLEAR with a one-line rationale. A YES or UNCLEAR finding caps Defensibility at 3/5 unless a structural counter-argument exists.

**LLM Ingestion Test:** Explicitly answer: "Could a customized GPT-4o or Claude agent with access to relevant public data replicate 80% of this product's core function?" Document: YES / NO / PARTIAL. A YES result classifies AI Wrapper Risk as HIGH and caps Defensibility at 2/5. Record the classification (HIGH / MODERATE / LOW).

**Revenue Quality Audit:** If any traction or revenue is mentioned, classify as Sticky (automated, API-driven, self-serve) or Stagnant (high-touch, consulting-adjacent, inertia-based). Stagnant Revenue caps Traction Signal at 2/5. AI Wrapper HIGH classification also caps Traction at 2/5 ("Fragile").

**Cynical Default check:** For any claim that cannot be verified via the three searches or company website, note it — maximum score for that dimension is 3/5.

### Track B — Hardware Assessment:
Note the current TRL level (or estimate from pitch materials). TRL < 7 caps Technical Maturity at 3/5. Assess whether a path to 50%+ gross margins is present for Unit Economics. Run Goliath Test against hardware incumbents.

---

## Step 7: Score All Dimensions

Using the rubrics in gates-and-flags-techgroup.md, score each dimension 0–5. Apply all NWA Filter caps before assigning scores of 4 or 5.

**Opportunity (30 points total) — use the track assigned in Step 3:**

Track A dimensions: Structural Discontinuity | Market Opportunity *(sub-floor: ≤ 2 → DECLINE)* | Founder Advantage | Defensibility Signal *(Goliath Test + thin wrapper caps)* | Traction Signal *(Revenue Quality Audit)* | Venture Economics

Track B dimensions: Structural Discontinuity | Market Opportunity *(sub-floor: ≤ 2 → DECLINE)* | Founder Advantage (HW-specific) | Technical Maturity / TRL *(capped at 3/5 if TRL 7 not proven)* | Unit Economics *(50%+ GM path required for 4–5)* | Defensibility (HW)

**Readiness (25 points total):**
Deal Structure | Product Maturity | Syndication Readiness | Traction Velocity | Founder Accessibility

Scoring principle for unknowns: silent decks score 2 (not 0) on Readiness dimensions. Reserve 0 for explicit evidence of absence.

**Apply decision logic:**
- ADVANCE: Opportunity ≥ 20/30, Market ≥ 3, no dimension = 0, Readiness ≥ 15/25
- WATCH: Opportunity 14–19/30 with Market ≥ 3, OR Opportunity ≥ 20 but Readiness < 15/25 (Readiness Downgrade Rule)
- DECLINE: Any gate FAIL, Opportunity < 14/30, or Market ≤ 2, or any dimension = 0

---

## Step 8: Produce Triage Report (In-Chat)

Output the full NWA Triage Report using tables throughout. Every prose field is a single continuous line. Scores and verdicts must be prominent and scannable.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NWA TRIAGE REPORT — [COMPANY NAME]
Screened: [today's date] | TechGroup | Track: [SOFTWARE / HARDWARE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INVESTMENT SIGNAL SUMMARY
Opportunity Score:  [X] / 30
Readiness Score:    [X] / 25
Recommendation:     ADVANCE TO SCOUT ✅ / WATCH ⏸ / DECLINE ❌
Signal:             [One sentence — the single most important signal driving this recommendation]

━━━ SECTION 0 — COMPANY SNAPSHOT ━━━
| Field              | Description |
|--------------------|-------------|
| Company            | [Name] |
| Product / Offering | [What it does in plain English] |
| Target Customer    | [Who buys it] |
| Sector             | [Industry / TechGroup theme if identifiable] |
| Business Model     | [SaaS / marketplace / licensing / hardware / etc.] |
| Stage              | [Pre-revenue / beta / revenue-generating] |
| Funding Ask        | [Round size and type as stated] |

━━━ SECTION 1 — HARD GATES ━━━
| Gate                          | Status | Finding |
|-------------------------------|--------|---------|
| Foreign Entity / IP Structure | ✅ MET / ❌ FAIL / ⚠️ UNCLEAR | [one line] |
| Market Size Threshold         | ✅ MET / ❌ FAIL / ⚠️ UNCLEAR | [one line] |
| Commercialization Path        | ✅ MET / ❌ FAIL / ⚠️ UNCLEAR | [one line] |

[If any gate is FAIL, stop here and output DECLINE with reason. Skip remaining sections.]

━━━ SECTION 2 — NWA FILTER RESULTS (Track A) / HARDWARE ASSESSMENT (Track B) ━━━

[Track A only:]
| Test                  | Result | Rationale |
|-----------------------|--------|-----------|
| Goliath Test          | PASSED / FAILED / UNCLEAR | [one line — name the incumbent threat if identified] |
| LLM Ingestion Test    | YES / PARTIAL / NO | [one line — can GPT-4o replicate 80% of core function?] |
| AI Wrapper Risk       | HIGH / MODERATE / LOW | [one line — basis for classification] |
| Revenue Quality       | STICKY / STAGNANT / FRAGILE / UNKNOWN | [one line — classification rationale] |

[Track B only:]
| Assessment            | Finding | Notes |
|-----------------------|---------|-------|
| TRL Level             | [TRL 1–9 or estimate] | [cap note if TRL < 7] |
| Gross Margin Path     | [≥50% credible / unclear / not present] | [one line] |
| Goliath Test (HW)     | PASSED / FAILED / UNCLEAR | [one line — incumbent threat assessment] |

━━━ SECTION 3 — OPPORTUNITY SCORE (Track [A/B]) ━━━
| Dimension                       | Score | Evidence / Rationale |
|---------------------------------|-------|----------------------|
| Structural Discontinuity        | [0–5] | [one line] |
| Market Opportunity ⚠️           | [0–5] | [note if web research contradicted deck claim or Cynical Default applied] |
| Founder Advantage               | [0–5] | [note web research findings; note Cynical Default if applied] |
| Defensibility / Technical [A/B] | [0–5] | [note Goliath Test result; note cap if applied] |
| Traction / Unit Economics [A/B] | [0–5] | [note Revenue Quality class or GM path; note cap if applied] |
| Venture Economics / Defensibility HW [A/B] | [0–5] | [one line] |
| **TOTAL**                       | **[X] / 30** | [STRONG ≥20 / MODERATE 14–19 / WEAK <14] |

[If Market Opportunity ≤ 2: flag "⚠️ Market sub-floor triggered — DECLINE regardless of total"]
[If any NWA Filter cap was applied: flag "⚠️ NWA Filter cap applied: [dimension] capped at [X]/5 — [reason]"]

━━━ SECTION 4 — READINESS SCORE ━━━
| Dimension              | Score | Signal / Friction Note |
|------------------------|-------|------------------------|
| Deal Structure         | [0–5] | [flag SAFE if present with IntroCall note; note if undisclosed] |
| Product Maturity       | [0–5] | [one line] |
| Syndication Readiness  | [0–5] | [flag no-lead if present; note if undisclosed] |
| Traction Velocity      | [0–5] | [growth rate signal; note Revenue Quality if Stagnant] |
| Founder Accessibility  | [0–5] | [one line] |
| **TOTAL**              | **[X] / 25** | [STRONG ≥18 / MODERATE 12–17 / WEAK <12] |

[If Readiness < 15 on an ADVANCE deal: flag "⚠️ Readiness Downgrade Rule triggered — verdict changed to WATCH"]

━━━ SECTION 5 — RISK FLAGS ━━━
❌ RED FLAGS (structural concerns):
[Each flag on its own line, or "None identified"]

⚠️ YELLOW FLAGS (verify at IntroCall):
[Each flag on its own line, or "None identified"]

━━━ SECTION 6 — RECOMMENDATION ━━━
Verdict:  ADVANCE TO SCOUT ✅ / WATCH — [Milestone] ⏸ / DECLINE ❌
Why:      [1–2 sentences. Lead with the single strongest signal or the decisive kill reason.]
Concern:  [1 sentence — the primary risk or friction item even on an ADVANCE]

[IF ADVANCE — include this block:]
LIVE PITCH QUESTIONS (for bi-weekly TechGroup meeting):
1. [Targeted question derived from specific gap or risk in this deal]
2. [Targeted question]
3. [Targeted question]
4. [Optional — include if a 4th critical uncertainty exists]
5. [Optional]

[IF WATCH — include this block:]
RE-ENGAGE WHEN: [Specific, measurable milestone(s) for each dimension scoring ≤ 2. Examples: "$250K ARR reached", "Series A lead committed", "Priced equity round structured", "TRL 7 demonstrated"]
Current Gap:    [One sentence — what is missing that makes this not ready now]

[IF DECLINE — include this block:]
Kill Reason:  [Primary gate or score trigger — one sentence. No elaboration needed.]
```

---

## Step 9: Save Triage Report as Word Document

Read the docx skill instructions from:
`$(find / -name "SKILL.md" -path "*/skills/docx/SKILL.md" 2>/dev/null | head -1)`

Generate a professional .docx file of the Triage Report using Node.js and the `docx` npm
package. Locate the workspace dynamically and save to the deals subfolder:
```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
mkdir -p "${WORKSPACE}/deals"
```
Output path: `${WORKSPACE}/deals/[Company Name] - Triage Report [YYYY-MM-DD].docx`

**Document structure and formatting:**

Use US Letter page size (12240 × 15840 DXA), 1-inch margins, Arial font. NWAi color scheme:
dark navy (`1F3864`) for section banners with white text, light blue shading (`D5E8F0`) for
score rows. Page header: "NWAi TechGroup — Investment Triage Report" left-aligned, date
right-aligned. Footer: "NWAi Investment Intelligence — Confidential" left-aligned, page
number right-aligned.

The Word document must contain all sections from the Triage Report in order, rendered as
formatted tables matching the in-chat output. The Signal Summary block appears at the top
in a prominent styled callout. The NWA Filter Results section appears before the Opportunity
Score table. The Recommendation block appears last with the verdict rendered as a colored
badge (green for ADVANCE, amber for WATCH, red for DECLINE). For ADVANCE deals, the Live
Pitch Questions appear as a numbered list in the Recommendation section with a distinct
header "Live Pitch Questions — [Company Name]".

After generating the file, confirm the save path and provide a link to the file.

---

## Step 10: Update Dealum

If the deal ADVANCES or goes to WATCH:
- Use `update_application` to move step to "Screening"
- Add tag "TechGroup-Screened"
- Add tag "TechGroup-Advance" or "TechGroup-Watch" per the verdict

If the deal DECLINES:
- Use `update_application` to add tag "TechGroup-Decline" and the kill reason tag
  (e.g., "Decline-SmallMarket", "Decline-ForeignIP", "Decline-WeakOpportunity", "Decline-NoMoat")

Confirm the Dealum update to the user.

---

## Step 11: Suggest Next Action

If ADVANCE:
Prompt exactly: "Verdict: **Advance to Scout**. Schedule [Company] for the next bi-weekly TechGroup meeting, or run /scout [company] now for a deeper pre-meeting assessment."

If WATCH:
"Added to Watch. Re-engage trigger: [milestone]. I'll note this in Dealum."

If DECLINE:
"Declined. Reason: [kill reason]. Dealum updated."
