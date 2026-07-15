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

Load the deal's prior outputs from `deals/active/[Company Name]/Reports/` (check `deals/archive/[Company Name]/Reports/` for closed or reopened deals). Use the Read tool (or `textutil -convert txt -stdout` via Bash for .docx).

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
- **From the financial diligence sequence (pricing-analyst, forecasting-analyst, venture-analyst):**
  - Pro forma table — use **Forecasting Analyst Briefing** Bear/Base/Bull (NOT the company's submitted projections; the agent's proprietary forecast is the canonical NWAi number)
  - Unit economics + pricing-to-value ratio — from **Pricing Analyst Briefing**
  - Defensible valuation today + projected exit (Y3, Y5) — from **Venture Analyst Briefing**
  - 35% IRR hurdle test result + 10x-in-5-years post-dilution test result — from **Venture Analyst Briefing**
  - Deal structure recommendation (priced equity / convertible with cap / participating preferred) — from **Venture Analyst Briefing**
  - Capital plan with round timing (Series A trigger, Series B trigger) — from **Forecasting Analyst Briefing**
  - Founder financial literacy assessment — from **Forecasting Analyst Briefing**
- **From team-analyst (Phase A):** PMTF score, Team Commitment Depth ratio, founder claim verification status — feeds Slide 4 Strengths/Risks
- Moat classification and AI wrapper assessment
- Key risks (used verbatim in Slide 4 Risks section)

Mark any field that cannot be confirmed from workspace files or Dealum as `[TO BE CONFIRMED]`. Never fabricate data.

### Step 2c: Customer & Reference Transcripts — Tier-1 Signal Weighting

**Customer transcripts and reference-call reconciliation docs are the highest-priority evidence for the memo.** When a real customer, reference, or strategic partner speaks on the record about the company, those quotes carry more weight than founder claims and more weight than third-party research. The memo must reflect this priority explicitly.

**1. Load all transcript-derived files alongside the DD Report:**
- `[Company]*Reference-Meeting-Reconciliation*.docx` / `*Reference-Call*`
- `[Company]*Product-Demo*Reconciliation*.docx`
- `[Company]*GTM-Status*Reconciliation*.docx`
- `[Company]*Financials-Meeting*Reconciliation*.docx`
- Raw transcript files in `deals/active/[Company]/Data Room/` (`Transcript*.md`, `*Transcript*.docx`, `*Transcript*.pdf`)

**2. Anchor Strengths and Risks (Slide 4) in direct quotes.**
When possible, every Strength or Risk bullet that touches a customer/partner perspective should cite a verbatim quote with attribution and date. A bullet that quotes a reference customer is higher-signal in IC than a paraphrase from analyst synthesis. Example: `++ "We have not found anybody else that does what Summit does." — Panasonic Director of New Business Development, May 1, 2026.`

**3. Three-Source Corroboration = high-conviction signal.**
When 3+ independent sources (separate calls, separate parties, separate dates) name the same risk or strength, flag explicitly in the memo as a corroborated insight. Three-source corroboration is the strongest evidence pattern in venture diligence and should be reflected in the Recommendation rationale and the "What is the Bet?" thesis.

**4. Channel-vs-Acquirer discipline (Slide 2 Market & Competition + Slide 4 "What is the Bet?").**
When a strategic partner appears in the deal narrative (resale partner, embedded licensee, OEM, co-development partner), explicitly classify the relationship and reflect it in the exit thesis:
- **Channel / Resale partner** = revenue path, brand validation. NOT an automatic acquirer.
- **Licensee / Embedder** = revenue path, technology adoption signal. NOT an automatic acquirer.
- **Strategic acquirer** = only when explicit M&A signals exist (LOI, advisor-led conversation, named M&A interest, or unprompted acquisition framing in a reference call).

Never assume a strategic partner is an acquirer without explicit transcript signal. When a transcript clarifies the relationship (e.g., a reference says "we want to license, not acquire"), reflect that immediately in the exit thesis and the "What is the Bet?" statement. Misclassifying a channel partner as an acquirer is a known IC error pattern that overstates exit probability.

**5. Founder Profile Tags (Slide 2 — Management Team narrative).**
Tag the founder profile explicitly using transcripts + DD content. These tags drive the de-risking strategy, the Recommendation soft conditions, and the IC framing:
- First-time CEO  /  Seasoned CEO
- Solo founder  /  Co-founded (+ co-founder operating roles)
- Academic / Researcher background  /  Industry operator
- Prior exit (yes/no, scale)
- Full-time  /  Maintains another role (e.g., professorship, consultancy)
- Operating depth  vs.  Technical depth

A first-time CEO + solo founder + academic background is a different operating-risk profile than a serial founder with a prior exit. The memo's Strengths/Risks framing and the Recommendation's soft conditions must reflect this directly — not as a generic "founder risk" but as a profile-specific delegation/hiring/operating-cadence ask.

**6. External Operating Memos ("Petro Pattern").**
When a customer, reference, or strategic partner delivers an *unprompted* operating playbook during a call (specific advice on what the founder should do — hire X, kill Y, deprioritize Z), capture it as the closest thing to an outside-advisor's POV. Use it to anchor the Recommendation rationale's soft conditions and reference it directly in the memo. These are high-signal insights because they come from someone with no economic stake in the founder's ego.

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

**Source the pro forma from the Forecasting Analyst's proprietary Bear/Base/Bull forecast — not the company's submitted projections.** The agent's *because* clauses for each scenario are the NWAi narrative for the model. Surface gross margin trajectory if channel pressure was modeled (e.g., compression at scale). Use of funds should reconcile to the Forecasting Analyst's capital plan.

**Slide 4 — Analysis & Recommendation**
Analysis narrative (blunt thesis statement), Strengths using ++/-- notation (4–6 bullets),
Risks using --/- notation (3–5 bullets), Recommendation verdict with dollar amount and
2–4 sentence rationale, "What is the Bet?" single-sentence thesis statement.

**Returns and Deal Terms guidance:** The Recommendation verdict should reference the Venture Analyst's outputs explicitly:
- Recommended deal structure (priced equity / convertible with cap / participating preferred)
- 35% IRR hurdle test result and 10x-in-5-years post-dilution test result
- If the founder's ask is above the defensible valuation, surface the gap and the structural recommendation that closes it
- "What is the Bet?" should be one falsifiable thesis — not a hedge. The Venture Analyst's Investment Thesis output is the canonical phrasing.

## Step 4: Generate the PPTX Using pptxgenjs

Write a self-contained Node.js script (`scripts/[company]-memo-[YYYY-MM-DD].js`) using the `pptxgenjs` npm package (already installed under `scripts/` — run with `node` from the `scripts/` directory so `require("pptxgenjs")` resolves from `scripts/node_modules`; if missing, `cd scripts && npm install pptxgenjs`). The script produces the 4-slide deck with actual deal content (not placeholders). Apply NWAi branding:
- Primary color: `1E2761` (navy)
- Accent: `CADCFC` (ice blue)
- Slide 1: Dark navy background, white text — title/cover
- Slides 2–4: White background, navy headers, dark body text
- Header on slides 2–4: "New World Angels — Confidential Investment Report" (small, top of slide)
- Font: Calibri. Headers 24–32pt bold. Body 11–13pt. Captions 9–10pt.
- Left/right two-column layout on Slide 2. Single column with sections on Slides 3–4.

Run the script and have it write the output directly to (create the folder if needed):
`deals/active/[Company Name]/Reports/[Company-Name]-NWAi-Exec-Summary-[YYYY-MM-DD].pptx`

## Step 5: Visual QA

If LibreOffice is available, convert the deck to PDF and inspect it visually:
```bash
SOFFICE=$(command -v soffice || true)
[ -z "$SOFFICE" ] && [ -x "/Applications/LibreOffice.app/Contents/MacOS/soffice" ] && SOFFICE="/Applications/LibreOffice.app/Contents/MacOS/soffice"
if [ -n "$SOFFICE" ]; then
  "$SOFFICE" --headless --convert-to pdf --outdir "deals/active/[Company Name]/Reports/" "deals/active/[Company Name]/Reports/[output].pptx"
else
  echo "LibreOffice not installed — skipping automated visual QA."
fi
```

If the PDF was produced, Read it with the Read tool and check all four slides for: text overflow, overlapping elements, missing content, low contrast, uneven spacing. Fix issues in the generator script, regenerate, and re-verify. If LibreOffice is not installed (the current default on this Mac), skip automated QA, say so explicitly in the Step 7 confirmation, and ask Jamie to eyeball the deck in PowerPoint/Keynote before it goes to members.

## Step 6: Update Dealum

The PPTX is already in the deal's Reports folder (written there in Step 4 — no copy step needed).

Update Dealum: call `update_application` with `step="Memo"` and `tags_add=["Memo-Complete"]`. (Dealum API deferred — the deal folder is the record until integration is restored.)

## Step 7: Confirm with User

Provide the file link. List any `[TO BE CONFIRMED]` fields that need Jamie's input
before the deck goes to NWA members.
