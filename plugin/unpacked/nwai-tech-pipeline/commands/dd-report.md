---
description: Generate scored NWAi DD Investment Report at conclusion of diligence
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, mcp__nwai-dealum__update_application, Read, Write, Bash
argument-hint: [company-name | application-id]
---

Generate the NWAi Due Diligence Investment Report for a Tech deal. Arguments: $ARGUMENTS

This command produces the scored synthesis document at the *conclusion* of diligence —
after the DD team has completed the 17-folder checklist work. It is the primary input
to the `/decision` command.

## Step 1: Load Format Reference, Scoring Rubrics, and Canonical Template

Read all three before writing a single line of document content:

```
.claude/skills/nwai-investment-framework/references/dd-report-format-reference.md
.claude/skills/nwai-investment-framework/references/diligence-scoring-rubrics.md
```

If the company is AI-enabled, also read:
```
.claude/skills/nwai-investment-framework/references/ai-moats-framework.md
```

**Format master:** `STL-NWAi-DD-Report-2026-03-19.docx` (under `deals/archive/Summit Technology Laboratory/Reports/`) is the reference master per CLAUDE.md; the canonical generator is `scripts/dd-report-generator.js`. The `dd-report-format-reference.md` captures the key specs — use it as the primary reference.

## Step 2: Gather All Deal Data

Fetch the application from Dealum using `get_application` or `list_applications`.

### Step 2b: Load Prior Stage Outputs from Workspace

Look in `deals/active/[Company Name]/Reports/` and load the most recent version of each file (highest YYYY-MM-DD in filename):

1. `[Company Name] - Triage Report*.docx` — Screen output
2. `[Company Name] - Scout Assessment Report*.docx` — Scout output
3. `[Company Name] - DD Kickoff Package*.docx` — Diligence kickoff output

Use `pandoc` to extract text from each .docx:
```bash
pandoc "[file].docx" -t plain 2>/dev/null
```

**Compile from each loaded file:**
- Triage Report: gate verdicts, red/yellow flags, deal structure & syndication notes (IntroCall negotiation items — not flags or kills), Six-Signal verdicts + Triage Conviction *(legacy numeric reports: opportunity and readiness scores)*
- Scout Assessment: theme assignment, Phase 1/2 findings, Q7 + Q8 posture reads, one-sentence verdict, single biggest risk
- DD Kickoff Package: Moat Tier 1 + Tier 2 scores, Tier 4 Alpha-AI Sovereignty verdict (/15 + FORTIFIED/HEDGED/LEAKY/CAPTURED, or "N/A — no model supply chain"), Risk scores per category, market sizing + timing score, 17-folder findings, open questions and responses
- **Financial diligence outputs (from the three-agent sequence):**
  - **Pricing Analyst Briefing** — pricing maturity, unit economics, channel pressure forecast, pricing-to-value ratio
  - **Forecasting Analyst Briefing** — proprietary 5-year forecast (Bear/Base/Bull with *because* clauses), capital plan with round timing, founder financial literacy assessment
  - **Venture Analyst Briefing** — defensible valuation today, projected exit (Y3 + Y5), IRR, 35% hurdle test, NWA 10x-in-5-years test, deal structure recommendation

Mark any unconfirmed field as `[TO BE CONFIRMED]`. Never fabricate scores.

### Step 2c: Customer & Reference Transcripts — Tier-1 Evidence Weighting

**Customer transcripts and reference-call reconciliation docs are the highest-priority evidence for DD Report scoring.** When applying the scoring rubrics in Step 3, weight these inputs *higher* than founder-supplied data and *higher* than third-party research. A customer/partner statement on the record is the most credible signal in any diligence record.

**1. Load alongside Triage / Scout / Kickoff:**
- `[Company]*Reference-Meeting-Reconciliation*.docx` / `*Reference-Call*`
- `[Company]*Product-Demo*Reconciliation*.docx`
- `[Company]*GTM-Status*Reconciliation*.docx`
- `[Company]*Financials-Meeting*Reconciliation*.docx`
- Raw transcript files in `deals/active/[Company]/Data Room/` (`Transcript*.md`, `*Transcript*.docx`, `*Transcript*.pdf`)

**2. Direct quotes drive section verdicts.**
Every section verdict that references a customer or partner statement must cite the source, role, and date. Direct quotes anchor the highest-credibility sections — particularly S2 (Solution evidence), S5 (Pipeline reality), S6/S8 (Team execution), S11 (Risk), and S12 (Exit Strategy). Example pattern: *"Petro (Panasonic Director of New Business Development, May 1, 2026): 'We have not found anybody else that does what Summit does.'"*

**3. Three-Source Corroboration = high-conviction signal.**
When 3+ independent sources (separate calls, separate parties, separate dates) name the same risk or strength, flag explicitly in the relevant section verdict as a corroborated insight. Three-source corroboration is the strongest evidence pattern in venture diligence and should drive both the score and the Recommendation's soft conditions.

**4. Channel-vs-Acquirer discipline (mandatory for S12 Exit Strategy).**
Never write that a strategic partner is an "acquirer" or "highest-probability acquirer" without explicit transcript signal (LOI, advisor-led M&A conversation, named M&A interest, or unprompted acquisition framing in a reference call). When a transcript clarifies the relationship as licensing/channel-only, the Exit Strategy section MUST reflect that:
- **Channel / Licensee** = revenue partner, NOT an exit path
- **Strategic acquirer** = requires explicit M&A signal

Misclassifying a channel partner as an acquirer overstates exit probability and is a known IC error pattern. When in doubt, default to channel/licensee classification and require a transcript-anchored signal to upgrade to acquirer.

**5. Founder Profile Tags (mandatory for S6/S8 Team).**
Explicitly tag the founder profile in the Team section's verdict line. These tags drive the Execution Risk score and shape the Recommendation's soft conditions:
- First-time CEO  /  Seasoned CEO
- Solo founder  /  Co-founded (+ co-founder operating roles)
- Academic / Researcher background  /  Industry operator
- Prior exit (yes/no, scale)
- Full-time  /  Maintains another role (e.g., professorship, consultancy)
- Operating depth  vs.  Technical depth

A first-time CEO + solo founder + researcher is a different operating-risk profile than a serial founder with a prior exit. The score and the soft conditions must reflect this — not as a generic "founder risk" but as a profile-specific delegation/hiring/operating-cadence ask.

**6. External Operating Memos ("Petro Pattern").**
When a customer/partner delivers an *unprompted* operating playbook during a reference call (specific advice on what the founder should do — hire X, kill Y, deprioritize Z), capture it as a structured insight in the Team section. Use it to anchor NWAi-side soft terms in the Recommendation. This is the closest thing to an outside-advisor's POV and carries unusually high signal because the advisor has no economic stake in the founder's ego.

## Step 3: Derive All Section Scores

Using the NWAi scoring rubrics, derive a 1–5 score for each section per the mapping rules in dd-report-format-reference.md. Show your working — which rubric input produced which score.

Section score mappings:
- S1 (Problem/Market): Market Sizing + Timing Score (0–5)
- S2 (Solution/Product): Moat Tier 1 (0–6 → 1–5)
- S3 (AI/Software Moat): Moat Tier 2 (0–10 → 1–5) — AI companies only; omit otherwise. When Tier 4 was scored, S3 carries the Alpha-AI Sovereignty companion line (`Tier 4: X/15 — FORTIFIED/HEDGED/LEAKY/CAPTURED — [one-line basis]`); Tier 4's lab vertical-integration threat feeds S4, conduit/regulatory items feed S10, and unverified provider terms produce the standing Appendix A item ("Obtain model-provider agreement; confirm no-train/ZDR terms, tier, and exclusions") — mandatory for ALL AI deals unless verified at Tier 4
- S4 (Competition & Moat): Competitive Risk (1–10 inverted)
- S5 (GTM Strategy): Market Risk + Pricing Analyst pricing-to-value ratio + channel pressure forecast (1–10 inverted)
- S6 (Team): Execution Risk including PMTF score, Team Commitment Depth ratio, founder claim verification status (1–10 inverted)
- S7 (Technology & IP): TRL level + IP defensibility (qualitative 1–5)
- S8 (Deal Structure): Hard gate results + cap table cleanliness + Venture Analyst deal structure recommendation. Note: a SAFE or the absence of an external lead does NOT, on its own, lower S8 — these are negotiated terms reflected in the structure recommendation. S8 reflects cap-table cleanliness and negotiated-structure fit, not the presence of a SAFE.
- S9 (Financials): Financial Risk + Forecasting Analyst Bear/Base/Bull model + Pricing Analyst unit economics + Venture Analyst capital plan (1–10 inverted)
- S10 (Risk — inverted): Risk Score average across all 5 categories
- S11 (Exit Strategy): Venture Analyst exit valuation + 35% hurdle test + 10x-in-5-years criterion + Risk Analyst acquirer landscape

## Step 4: Apply the Sharp & Succinct Content Rules

**These rules are mandatory before writing any section content.**
The DD Report is an IC briefing document — its job is to convey the verdict and the evidence,
not to demonstrate thoroughness through length. Apply these four rules to every section:

### Rule 1: Once and Down
Every key fact has exactly one home section. Once stated, it is not restated — only its
conclusion may be referenced in later sections.

| Fact | Home section | How to handle in other sections |
|------|-------------|----------------------------------|
| Technology description (what it does) | S1 (Problem) + S2 (Solution) | S7 opens with TRL + IP table — not a re-description of the product |
| OEM validation quote ("10 years ahead") | S1 (timing signal) | S7: "OEM-validated"; S11: "strategic acquisition signal" — no quote repeat |
| Founder research depth ("20+ years") | S6 (Team) | S2/S3: "research-derived algorithms" — no years stated |
| Bridge close urgency | S9 (Financials — runway row) | S10: one severity row. Appendix A: action item. Not restated elsewhere |
| 10x return math ($xM × x× = $xM) | S9 (Financials — 10x viability line) | S11: "Base case below target; Bull case hits — see S9" |
| Customer deployment numbers | S2 (Solution — as moat evidence) | Not repeated in S7, S11 |

### Rule 2: Section Mandates Are Exclusive
Each section owns its topic. No section borrows from another's lane.

- **S1** owns: the problem, market size, timing forces. No product description, no deployments.
- **S2** owns: what the product does commercially, signed deployments as moat evidence, Moat Tier 1 table. No TRL (that's S7). No market size (that's S1).
- **S3** owns: AI moat scoring table, thin-wrapper test result, moat deepening path.
- **S4** owns: named competitors + differentiation. No GTM channel (that's S5).
- **S5** owns: sales motion, ICP (buyer role + deal size only — not vertical list already in S1), pricing, GTM risk. No customer names (those are in S2 as product evidence).
- **S6** owns: team roster table, founder assessment, team gaps. The "20+ years" fact lives here.
- **S7** owns: TRL confirmation, IP status table, R&D roadmap. Opens directly with TRL line — no re-description of what the product does.
- **S8** owns: all deal terms and gate status in the terms table.
- **S9** owns: financial metrics table, Use of Capital, Pro Forma table, first statement of 10x math.
- **S10** owns: risk synthesis and priority action table (HIGH ❌ only) + risk score table.
- **S11** owns: exit path, acquirer table, early exit triggers. References S9 for 10x math.

### Rule 3: Tables Absorb Facts, Prose Provides Verdict
If a fact fits in a table row, it belongs there — not also in a paragraph.

- Do not write a paragraph describing what the IP table shows. Write the IP table.
- Do not narrate the pro forma numbers in prose. Put them in the table.
- Do not describe the team roster in prose and then repeat it in the table. Table only.
- Prose above a table states the verdict (e.g., "Switching costs are real — here's the moat breakdown:"). Prose below states the implication (e.g., "Moat Tier 1: 3/6 — sufficient to protect the current install base but not durable at scale."). Not both.

### Rule 4: Risk Section Synthesizes — Does Not Restate
The S10 severity table contains **only HIGH ❌ issues** — items where inaction before IC is a deal risk.
MEDIUM ⚠ and LOW items belong in Appendix A only (not in both S10 and Appendix A).
The risk score table (all 5 categories, 1–10) is always present regardless.
S10 narrative names the 2–3 biggest risks — it does not narrate each risk score row.

### Rule 5: No Closing Restatements
The final sentence of each section must not repeat what the section just said.
If a closing ⚠ line says the same thing as the paragraph above it — delete the ⚠ line.
Closing lines should add: implication, score rationale, or forward reference. Not summary.

## Step 5: Write the Document Script

Install docx if needed:
```bash
npm install docx 2>/dev/null || true
```

Write `generate-dd-report.js` using the exact visual layout from dd-report-format-reference.md:

**Critical layout parameters (do not deviate):**
- Page: US Letter (12240 × 15840 DXA). Margins: 864 DXA all sides. Header/footer offset: 708 DXA.
- Total content width: 10512 DXA
- Every scored section = 2-column table: content col 9432 DXA | score col 1080 DXA
- Score cell RAG colors: Green (4–5) fill `375623` white text | Amber (3) fill `FFC000` dark text | Red (1–2) fill `C00000` white text
- Score font: Arial 24pt bold (sz: 48), vertically centered
- Section headers: numbered "1.  SECTION TITLE" through "11.  SECTION TITLE" (two spaces after number)
- Section header row: navy fill `1F3864`, white text
- Document order: Recommendation banner → Company Header → Sections 1–11 → Recommendation table → DD Team Votes → Appendix A

**Apply the Sharp & Succinct rules (Step 4) to every section's content before writing it.**

Run the script:
```bash
node generate-dd-report.js
```

## Step 6: Validate the Document

Verify the generated file opens cleanly: confirm it is a valid zip (`unzip -t` on the .docx) and re-extract its text (`textutil -convert txt -stdout`) to spot-check the section order and score cells. Fix any issues before saving.

## Step 7: Save to Workspace and Update Dealum

Save to the deal's Reports folder (create if needed):
```bash
mkdir -p "deals/active/[Company Name]/Reports"
cp [Company-Name]-NWAi-DD-Report-[YYYY-MM-DD].docx "deals/active/[Company Name]/Reports/"
```

Update Dealum: `step` → "Decision", `tags_add` → ["DD-Report-Complete"]

## Step 8: Confirm with User

Provide the file link. Note any `[TO BE CONFIRMED]` fields. Suggest next step: `/decision [company] [invest|pass|watch]`
