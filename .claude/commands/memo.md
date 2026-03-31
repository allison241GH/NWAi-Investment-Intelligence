---
description: Generate NWAi Executive Summary investment memo as a 4-slide PPTX deck
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, WebSearch, WebFetch, Read, Write, Bash
argument-hint: [company-name | application-id]
---

Generate a 4-slide NWAi Executive Summary PPTX deck for a Tech deal. Arguments: $ARGUMENTS

## Step 1: Load Format Reference and Frameworks

Read the memo format specification before doing anything else:
`.claude/skills/nwai-investment-framework/references/memo-format-reference.md`

Also read the AI Moats Framework for use in Technology/IP and Analysis sections:
`.claude/skills/nwai-investment-framework/references/ai-moats-framework.md`

## Step 2: Gather All Available Deal Information

Fetch the application from Dealum using `get_application` or `list_applications`.

### Step 2b: Load Prior Stage Outputs from Workspace

Check the workspace deals folder and load prior stage outputs using the Read tool. Locate the workspace and list the deals folder:

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
ls "${WORKSPACE}/deals/" 2>/dev/null
```

Load files in this priority order (most recent version of each, sorted by YYYY-MM-DD in filename):

1. **Primary:** `[Company Name]*NWAi-DD-Report*.docx` — DD Report (synthesizes all prior stages; if found, this is the single most important input)
2. **Fallback if no DD Report:** Load all three individually:
   - `[Company Name] - DD Kickoff Package*.docx`
   - `[Company Name] - Scout Assessment Report*.docx`
   - `[Company Name] - Triage Report*.docx`

For each file found: note version count and which date is being loaded. If none of these files exist, note "No prior stage outputs found — memo will rely on Dealum data and web research only."

**From the DD Report (or fallback chain) carry forward:**
- All 11 scored sections (1–5 scale) and their narratives
- Recommendation verdict (Invest / Watch / Pass) and rationale
- DD team vote table
- Gate verdicts, flags, theme assignment, one-sentence Scout verdict
- Capital structure, deal terms, proposed NWAi check size
- Financial model inputs (revenue, runway, pro forma projections, use of funds)
- Moat classification and AI wrapper assessment
- Key risks (used verbatim in Slide 4 Risks section)

Mark any field that cannot be confirmed from workspace files or Dealum as `[TO BE CONFIRMED]`. Never fabricate data.

Use WebSearch and WebFetch to fill any gaps:
- Company website and product details
- Founder LinkedIn profiles and backgrounds
- Crunchbase/AngelList profile
- Recent press coverage or announcements
- Competitor landscape and TAM data with sources

Mark any field that cannot be confirmed as `[TO BE CONFIRMED]`. Never fabricate data.

## Step 3: Structure the Four Slides

Following memo-format-reference.md exactly, organize all gathered information into:

**Slide 1 — Cover**
Title, subtitle with investment amount and company full legal name, date.

**Slide 2 — Deal Snapshot & Company Narrative**
Left column: Investment timing milestones, industry, DD team names, capital structure
(pre-money, round type, liquidation pref, NWA check size, total round), post-round cap table.
Right column: Four dense narrative paragraphs — Summary, Technology/IP (apply AI Moats
Framework here), Management Team, Market & Competition.

**Slide 3 — Financial Model & Use of Funds**
Economic model narrative (business model, exit scenario, gross margin), itemized use of funds
with dollar amounts, pro forma table (Revenue + EBITDA across 5 years).

**Slide 4 — Analysis & Recommendation**
Analysis narrative (blunt thesis statement), Strengths using ++/-- notation (4–6 bullets),
Risks using --/- notation (3–5 bullets), Recommendation verdict with dollar amount and
2–4 sentence rationale, "What is the Bet?" single-sentence thesis statement.

## Step 4: Generate the PPTX Using pptxgenjs

Install pptxgenjs if needed:
```bash
npm install pptxgenjs 2>/dev/null || true
```

Write a self-contained Node.js script (`generate-memo.js`) using pptxgenjs that produces
the 4-slide deck with actual deal content (not placeholders). Apply NWAi branding:
- Primary color: `1E2761` (navy)
- Accent: `CADCFC` (ice blue)
- Slide 1: Dark navy background, white text — title/cover
- Slides 2–4: White background, navy headers, dark body text
- Header on slides 2–4: "New World Angels — Confidential Investment Report" (small, top of slide)
- Font: Calibri. Headers 24–32pt bold. Body 11–13pt. Captions 9–10pt.
- Left/right two-column layout on Slide 2. Single column with sections on Slides 3–4.

Run the script and save output as:
`[Company-Name]-NWAi-Exec-Summary-[YYYY-MM-DD].pptx`

## Step 5: Visual QA

Convert to images and inspect each slide for layout issues:
```bash
PPTX_SCRIPTS=$(find /sessions -name "soffice.py" -path "*/pptx/scripts/office/soffice.py" 2>/dev/null | head -1)
if [ -n "${PPTX_SCRIPTS}" ]; then
  python "${PPTX_SCRIPTS}" --headless --convert-to pdf [output].pptx
  pdftoppm -jpeg -r 150 [output].pdf slide
else
  echo "soffice.py not found — skipping PDF QA. Verify slides manually."
fi
```

Check all four slides for: text overflow, overlapping elements, missing content,
low contrast, uneven spacing. Fix issues and re-verify before proceeding.

## Step 6: Save to Workspace and Update Dealum

Locate the workspace dynamically and copy the final PPTX to the deals subfolder:
```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
mkdir -p "${WORKSPACE}/deals"
cp [Company-Name]-NWAi-Exec-Summary-[YYYY-MM-DD].pptx "${WORKSPACE}/deals/[Company-Name]-NWAi-Exec-Summary-[YYYY-MM-DD].pptx"
```

Update Dealum: call `update_application` with `step="Memo"` and `tags_add=["Memo-Complete"]`.

## Step 7: Confirm with User

Provide the file link. List any `[TO BE CONFIRMED]` fields that need Jamie's input
before the deck goes to NWA members.
