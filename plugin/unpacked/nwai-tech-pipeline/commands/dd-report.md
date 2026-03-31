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
${CLAUDE_PLUGIN_ROOT}/skills/nwai-investment-framework/references/dd-report-format-reference.md
${CLAUDE_PLUGIN_ROOT}/skills/nwai-investment-framework/references/diligence-scoring-rubrics.md
```

If the company is AI-enabled, also read:
```
${CLAUDE_PLUGIN_ROOT}/skills/nwai-investment-framework/references/ai-moats-framework.md
```

**Also read the Synergist canonical reference if available in the workspace:**
```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
find "${WORKSPACE}" -name "Synergist-DD-Investment-Report*.docx" 2>/dev/null | head -1
```
If found, extract its text with `mammoth` and study the visual layout before writing the script.
The `dd-report-format-reference.md` captures the key specs — use it as the primary reference.

## Step 2: Gather All Deal Data

Fetch the application from Dealum using `get_application` or `list_applications`.

### Step 2b: Load Prior Stage Outputs from Workspace

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
ls "${WORKSPACE}/deals/" 2>/dev/null
```

Load the most recent version of each file (highest YYYY-MM-DD in filename):

1. `[Company Name] - Triage Report*.docx` — Screen output
2. `[Company Name] - Scout Assessment Report*.docx` — Scout output
3. `[Company Name] - DD Kickoff Package*.docx` — Diligence kickoff output

Use `pandoc` to extract text from each .docx:
```bash
pandoc "[file].docx" -t plain 2>/dev/null
```

**Compile from each loaded file:**
- Triage Report: gate verdicts, red/yellow flags, deal structure concerns, opportunity and readiness scores
- Scout Assessment: theme assignment, Phase 1/2 findings, one-sentence verdict, single biggest risk
- DD Kickoff Package: Moat Tier 1 + Tier 2 scores, Risk scores per category, market sizing + timing score, financial model inputs (revenue, runway, unit economics), 17-folder findings, open questions and responses

Mark any unconfirmed field as `[TO BE CONFIRMED]`. Never fabricate scores.

## Step 3: Derive All Section Scores

Using the NWAi scoring rubrics, derive a 1–5 score for each section per the mapping rules in dd-report-format-reference.md. Show your working — which rubric input produced which score.

Section score mappings:
- S1 (Problem/Market): Market Sizing + Timing Score (0–5)
- S2 (Solution/Product): Moat Tier 1 (0–6 → 1–5)
- S3 (AI/Software Moat): Moat Tier 2 (0–10 → 1–5) — AI companies only; omit otherwise
- S4 (Competition & Moat): Competitive Risk (1–10 inverted)
- S5 (GTM Strategy): Market Risk — adoption barriers and channel (1–10 inverted)
- S6 (Team): Execution Risk (1–10 inverted)
- S7 (Technology & IP): TRL level + IP defensibility (qualitative 1–5)
- S8 (Deal Structure): AutoKill gate results + cap table cleanliness
- S9 (Financials): Financial Risk (1–10 inverted) + Bear/Base/Bull model
- S10 (Risk — inverted): Risk Score average across all 5 categories
- S11 (Exit Strategy): Exit viability + Base/Bull case 10x support

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

```bash
DOCX_SCRIPTS=$(dirname "$(find /sessions -name "validate.py" -path "*/docx/scripts/office/validate.py" 2>/dev/null | head -1)")
python3 ${DOCX_SCRIPTS}/validate.py [Company-Name]-NWAi-DD-Report-[YYYY-MM-DD].docx
```

Fix any issues before saving.

## Step 7: Save to Workspace and Update Dealum

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
mkdir -p "${WORKSPACE}/deals/active"
cp [Company-Name]-NWAi-DD-Report-[YYYY-MM-DD].docx "${WORKSPACE}/deals/active/[Company-Name]-NWAi-DD-Report-[YYYY-MM-DD].docx"
```

Update Dealum: `step` → "Decision", `tags_add` → ["DD-Report-Complete"]

## Step 8: Confirm with User

Provide the file link. Note any `[TO BE CONFIRMED]` fields. Suggest next step: `/decision [company] [invest|pass|watch]`
