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
`${CLAUDE_PLUGIN_ROOT}/skills/nwai-investment-framework/references/gates-and-flags-techgroup.md`

Read the full framework before proceeding. All scoring rubrics, thresholds, decision logic,
and output format rules are defined there.

---

## Step 2: Gather Deal Information

If $ARGUMENTS contains a company name or ID:
- Use `get_application` or `list_applications` to fetch the application from Dealum
- Extract: company name, contact, website, current step, tags, and all available pitch content

If $ARGUMENTS is empty or contains "paste":
- Ask the user to paste the pitch deck summary, email, or key company information
- Proceed once information is provided

If a company website is mentioned or discoverable, note it for use in Step 3.

---

## Step 3: Light Web Research (Two Dimensions Only)

Before scoring, run targeted WebSearch on exactly two dimensions per the Research Protocol
in gates-and-flags-techgroup.md:

**Market Opportunity validation:**
Search: "[company sector] market size [current year]"
Find 1–2 third-party market sizing references. Compare against founder TAM claim.
Note any discrepancy > 3× for use in scoring and flags.

**Founder Advantage validation:**
Search: "[lead founder name] LinkedIn" and "[company name] Crunchbase"
Extract: domain tenure, prior companies, exits, notable advisors or investors.
Note gaps between deck claims and web findings.

Do not deploy company-researcher or competitive-intelligence agents at this stage.

---

## Step 4: Apply Hard Gates

Evaluate all 3 hard gates using pitch materials. A single FAIL = immediate DECLINE.
Mark MET only on positive evidence or silence (not FAIL on missing info — silence = Yellow Flag).

---

## Step 5: Run AI Wrapper Assessment

Before scoring Defensibility, assess thin wrapper risk (Low / Moderate / High).
Apply the AI Wrapper Assessment criteria from gates-and-flags-techgroup.md.
This produces a one-line flag used in the output.

---

## Step 6: Score All Dimensions

Using the rubrics in gates-and-flags-techgroup.md, score each dimension 0–5.

**Opportunity (25 points total):**
- Structural Discontinuity
- Market Opportunity *(sub-floor: score ≤ 2 → DECLINE regardless of total)*
- Founder Advantage *(use web research findings from Step 3)*
- Defensibility Signal *(incorporate AI Wrapper assessment)*
- Traction Signal

**Readiness (20 points total):**
- Deal Structure
- Product Maturity
- Syndication Readiness
- Founder Accessibility

Apply decision logic from gates-and-flags-techgroup.md:
- ADVANCE: Opportunity ≥ 18/25, Market ≥ 3, no dimension = 0
- WATCH: Opportunity 13–17/25, Market ≥ 3. Must name specific re-engagement milestone(s).
- DECLINE: Any gate FAIL, Opportunity < 13/25, or Market ≤ 2

---

## Step 7: Produce Triage Report (In-Chat)

Output the full NWA Triage Report using tables throughout. Every prose field is a single
continuous line. Scores and verdicts must be prominent and scannable.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NWA TRIAGE REPORT — [COMPANY NAME]
Screened: [today's date] | TechGroup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INVESTMENT SIGNAL SUMMARY
Opportunity Score:  [X] / 25
Readiness Score:    [X] / 20
Recommendation:     ADVANCE TO SCOUT ✅ / WATCH ⏸ / DECLINE ❌
Signal:             [One sentence — the single most important signal driving this recommendation]

━━━ SECTION 0 — COMPANY SNAPSHOT ━━━
| Field              | Description |
|--------------------|-------------|
| Company            | [Name] |
| Product / Offering | [What it does in plain English] |
| Target Customer    | [Who buys it] |
| Sector             | [Industry / TechGroup theme if identifiable] |
| Business Model     | [SaaS / marketplace / licensing / etc.] |
| Stage              | [Pre-revenue / beta / revenue-generating] |
| Funding Ask        | [Round size and type as stated] |

━━━ SECTION 1 — HARD GATES ━━━
| Gate                          | Status | Finding |
|-------------------------------|--------|---------|
| Foreign Entity / IP Structure | ✅ MET / ❌ FAIL / ⚠️ UNCLEAR | [one line] |
| Market Size Threshold         | ✅ MET / ❌ FAIL / ⚠️ UNCLEAR | [one line] |
| Commercialization Path        | ✅ MET / ❌ FAIL / ⚠️ UNCLEAR | [one line] |

[If any gate is FAIL, stop here and output DECLINE with reason. Skip remaining sections.]

━━━ SECTION 2 — AI WRAPPER ASSESSMENT ━━━
Wrapper Risk: [LOW / MODERATE / HIGH]
Basis: [One line — what specific evidence supports this assessment]

━━━ SECTION 3 — OPPORTUNITY SCORE ━━━
| Dimension                | Score | Evidence / Rationale |
|--------------------------|-------|----------------------|
| Structural Discontinuity | [0–5] | [one line] |
| Market Opportunity ⚠️    | [0–5] | [one line — note if web research contradicted deck claim] |
| Founder Advantage        | [0–5] | [one line — note web research findings] |
| Defensibility Signal     | [0–5] | [one line — reference wrapper assessment if relevant] |
| Traction Signal          | [0–5] | [one line] |
| **TOTAL**                | **[X] / 25** | [STRONG ≥18 / MODERATE 13–17 / WEAK <13] |

[If Market Opportunity ≤ 2: flag "⚠️ Market sub-floor triggered — DECLINE regardless of total"]

━━━ SECTION 4 — READINESS SCORE ━━━
| Dimension              | Score | Signal / Friction Note |
|------------------------|-------|------------------------|
| Deal Structure         | [0–5] | [one line — flag SAFE if present with IntroCall note] |
| Product Maturity       | [0–5] | [one line] |
| Syndication Readiness  | [0–5] | [one line — flag no-lead if present] |
| Founder Accessibility  | [0–5] | [one line] |
| **TOTAL**              | **[X] / 20** | [STRONG ≥15 / MODERATE 10–14 / WEAK <10] |

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
RE-ENGAGE WHEN: [Specific, measurable milestone(s). Examples: "$250K ARR reached", "Series A lead committed", "FDA pre-submission filed"]
Current Gap:    [One sentence — what is missing that makes this not ready now]

[IF DECLINE — include this block:]
Kill Reason:  [Primary gate or score trigger — one sentence. No elaboration needed.]
```

---

## Step 8: Save Triage Report as Word Document

Read the docx skill instructions from:
`$(find /sessions -name "SKILL.md" -path "*/.skills/skills/docx/SKILL.md" 2>/dev/null | head -1)`

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
in a prominent styled callout. The Recommendation block appears last with the verdict
rendered as a colored badge (green for ADVANCE, amber for WATCH, red for DECLINE).
For ADVANCE deals, the Live Pitch Questions appear as a numbered list in the Recommendation
section with a distinct header "Live Pitch Questions — [Company Name]".

After generating the file, confirm the save path and provide a link to the file.

---

## Step 9: Update Dealum

If the deal ADVANCES or goes to WATCH:
- Use `update_application` to move step to "Screening"
- Add tag "TechGroup-Screened"
- Add tag "TechGroup-Advance" or "TechGroup-Watch" per the verdict

If the deal DECLINES:
- Use `update_application` to add tag "TechGroup-Decline" and the kill reason tag
  (e.g., "Decline-SmallMarket", "Decline-ForeignIP", "Decline-WeakOpportunity")

Confirm the Dealum update to the user.

---

## Step 10: Suggest Next Action

If ADVANCE:
Prompt exactly: "Verdict: **Advance to Scout**. Schedule [Company] for the next bi-weekly
TechGroup meeting, or run /scout [company] now for a deeper pre-meeting assessment."

If WATCH:
"Added to Watch. Re-engage trigger: [milestone]. I'll note this in Dealum."

If DECLINE:
"Declined. Reason: [kill reason]. Dealum updated."
