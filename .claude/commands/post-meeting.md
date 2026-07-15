---
description: Process a diligence meeting transcript with analyst POV — surfaces Key Insights and reconciles open tracker items
allowed-tools: Read, Write, Bash, WebSearch
argument-hint: [company-name] [product|gtm|financials|interview]
---

Process a completed NWAi TechGroup diligence meeting. Arguments: $ARGUMENTS

Parse $ARGUMENTS as: first token = company name, last token = meeting type (product / gtm / financials / interview). The `interview` type denotes a customer interview — a meeting with one of the company's customers, not with the company itself.

**The role here is analyst, not librarian.** The primary output is a POV — Key Insights that surface what this meeting revealed about investability. The tracker reconciliation is secondary. Never lead with a checklist.

---

## Step 1: Load All Context

Load the following from the workspace deals folder:

```bash
WORKSPACE=$(dirname "$(find /sessions -name "CLAUDE.md" -path "*/Claude CoWork*" 2>/dev/null | head -1)")
ls "${WORKSPACE}/deals/active/" 2>/dev/null
```

Load (most recent of each):
- **Diligence Action Tracker** — `[Company]-Diligence-Action-Tracker-*.docx` — the open items for this company
- **DD Kickoff Package** — `[Company] - DD Kickoff Package*.docx` — prior scored assessment and hypotheses
- **Scout Assessment Report** — `[Company] - Scout Assessment Report*.docx` — original thesis baseline
- **Prior post-meeting reconciliation docs** (if any) — carry forward prior Key Insights to build progressive POV

Also load the diligence analysis framework:
`.claude/skills/nwai-investment-framework/references/diligence-analysis-framework.md`

---

## Step 2: Load the Transcript(s)

Check the workspace uploads and data room for meeting transcripts:

```bash
ls "${WORKSPACE}/deals/active/$(echo $ARGUMENTS | awk '{print $1}') Data Room/" 2>/dev/null
ls /sessions/*/mnt/uploads/*.txt 2>/dev/null
```

If transcripts are not found in either location, ask the user to upload or specify the path. Do not proceed without transcript content.

---

## Step 3: Apply the Analyst Lens

Before reconciling any tracker items, read the full transcript through the analyst lens. Apply the framework from `diligence-analysis-framework.md` for the specific meeting type.

**For `interview` meeting type** (customer interview — meeting with one of the company's customers, not with the company itself): the playbook is the **Customer Interview — What to Look For** section of the framework doc. The four-question Behavioral-Intensity Question Bank anchors the analysis. For each of the four questions — (1) Tool replacement & adoption, (2) Unplanned use cases, (3) Organic evangelism, (4) Counterfactual loss — capture:
- **What was asked** — verbatim or paraphrased, and whether the customer answered spontaneously or only when prompted
- **The verbatim response** — with attribution and date
- **Behavioral signal read** — the analyst's read of which signal (pull-driven adoption, product malleability, organic evangelism, Memory Lock-in stickiness) the response surfaces

The Analyst POV box (Step 6) MUST classify the customer's Behavioral Intensity as **Strong / Some / None** based on the four-question synthesis. *None* indicates commodity status and must be flagged in the POV.

**Direct Quote Capture Discipline (overarching).** Customer / reference / partner transcripts are the highest-priority evidence in any diligence record. Every Key Insight that touches a customer or partner perspective MUST carry a verbatim quote with attribution and date. Format: *"Verbatim quote." — [Name, Title, Organization, Date].* These quotes become the canonical anchor that downstream commands (`/dd-report`, `/memo`) cite by reference. Paraphrases lose evidentiary weight; verbatim quotes preserve it.

**The analyst lens — what to look for:**

**Declarations** — Explicit statements by founders/executives about strategy, exit orientation, differentiation, what they are and are not building. These are the highest-signal moments. A founder telling you their strategy is more reliable than any pitch deck. Capture verbatim quotes with attribution and date.

**Structural contradictions** — Cases where what was said conflicts with what was demonstrated, or where the stated vision conflicts with the product reality. A CEO who says "pure SaaS subscription" but demos a product requiring weeks of manual setup per customer is telling you something important — about the unit economics, the scaling model, and self-awareness.

**Claim walk-backs & the credibility pattern (Decision 10 extension)** — A special class of structural contradiction: the transcript walks back a **load-bearing claim** made in prior founder materials (pitch deck, DD response, data room, or an earlier meeting) — core technology architecture, quantified customer ROI/value delivered, traction figures, team credentials. Classify each affected prior claim **CONFIRMED / QUALIFIED / WALKED BACK** and record any walk-back as a Key Insight. The count is **cumulative across the whole diligence record**, not per-meeting: carry forward walk-backs already recorded at Scout (Step 4c reconciliation table) and in prior post-meeting docs. One cumulative walk-back = ⚠️ stated in the Analyst POV box. **Two or more = ❌ founder-credibility discrepancy pattern** — it must lead the Analyst POV box and the running thesis update, and the document must recommend pausing diligence (or moving to `/decision [company] pass`) until the walked-back claims are independently re-verified. **Symmetry rule:** the founder's favorable self-reported statements in the same meeting are Reported-tier evidence — they may resolve tracker items, but they cannot flip a 🔴 thesis stress point to 🟢 on their own; that requires independent verification (reference call, signed contract, public record). Calibration case: RootCause.ai, July 2026 (`pipeline-decisions-log.md` Decision 10).

**Moat signals** — Evidence for or against Memory Lock-in and proprietary defensibility. Does the product get stickier through use? Is the differentiation technology, data, or distribution? When asked "what makes you unique?", what did they lead with?

**Team signals + Founder Profile Tags** — Who spoke authoritatively vs. who deferred, admitted gaps, or revealed depth limits. A technical delivery lead who can't answer basic architecture questions about their own platform is a signal. Note the gap between the CEO's narrative and the team's demonstrated knowledge. **Additionally, surface or update the Founder Profile Tag set** when the transcript reveals or confirms any of these attributes:

- First-time CEO  /  Seasoned CEO
- Solo founder  /  Co-founded (+ co-founder operating roles)
- Academic / Researcher background  /  Industry operator
- Prior exit (yes / no, scale)
- Full-time  /  Maintains other role (e.g., professorship, consultancy)
- Operating depth  vs.  Technical depth

These tags drive Execution Risk scoring in `/dd-report` and Strengths/Risks framing in `/memo`. Capture them as a discrete observation in Key Insights (Step 4) when surfaced — *don't* bury them inside generic "team signals" prose. A first-time CEO + solo founder + academic-researcher profile is a different operating-risk profile than a serial founder with a prior exit, and the meeting reconciliation should make that distinction explicit at the point of observation.

**Partner / Reference Classification (Channel-vs-Acquirer discipline)** — When an external party (customer, reference, OEM, strategic partner) is the subject or speaker of the meeting, classify the relationship explicitly using transcript-anchored signal:

- **Channel / Resale partner** — revenue path, brand validation. Quotes referencing reselling, distribution, joint go-to-market.
- **Licensee / Embedder** — revenue path, technology adoption. Quotes referencing "license," "embed," "integrate," "OEM the technology."
- **Co-development partner** — joint engineering, long-term roadmap. Quotes referencing co-development, joint roadmap, technology transfer.
- **Strategic acquirer signal** — *only* when explicit M&A framing exists: LOI, named M&A interest, advisor-led acquisition conversation, unprompted acquisition language from the partner.

**Never default to "potential acquirer" without explicit transcript signal.** A partner who says "I want to license and embed your software" is signaling a *licensing* path, not acquisition — and the post-meeting doc must reflect that classification immediately. Misclassifying a channel/licensee as an acquirer overstates exit probability downstream and is a known IC error pattern. When the transcript clarifies a relationship, the Analyst POV box (Step 6) MUST state the classification.

**Thesis stress points** — Moments where a prior hypothesis (from Scout or DD Kickoff) was confirmed, challenged, or complicated. Note signal direction: 🟢 confirmed / 🟡 partial / 🔴 challenged.

**External Operating Memo capture ("Petro Pattern").** When a customer, reference, or strategic partner delivers an *unprompted* operating playbook during a call (specific advice on what the founder should do — hire X, kill Y, deprioritize Z), capture it as a distinct Key Insight tagged "External Operating Memo." These are unusually high-signal because the speaker has no economic stake in the founder's ego. They anchor NWAi-side soft conditions in the DD Report and memo.

**Do not start reconciling tracker items until the analyst lens pass is complete.**

---

## Step 4: Draft Key Insights

Identify 4–6 Key Insights — the findings that most materially affect the investment thesis. Quality over quantity. An insight rises to this level if it changes, confirms, or complicates the answer to: *Would NWAi invest in this company?*

Each insight must have:
- **What Was Said / Observed** — the evidence, including verbatim quotes where available
- **Analyst Interpretation** — what this reveals about the company's strategy, moat, team, or model
- **NWAi Impact** — what it means for investability, which investment criteria it bears on, and what it demands from subsequent meetings

Insights are ordered by materiality, not by when they appeared in the meeting.

---

## Step 5: Reconcile Tracker Items

After the analyst lens pass, reconcile open items from the Diligence Action Tracker for the relevant track.

Status values:
- ✅ RESOLVED — question fully answered with evidence from the transcript
- ⚠️ PARTIAL — partially answered; specific gap identified
- 🔴 OPEN — not addressed; still requires follow-up

For each item, write the finding in one concise paragraph — what the transcript revealed, and what remains unresolved. Do not expand items that are cleanly resolved into lengthy analysis; save depth for the Key Insights section.

Note any new issues that directly bear on a Key Insight — fold them into the relevant insight rather than listing them separately.

---

## Step 6: Form the Meeting POV

Before generating the document, synthesize a 2–3 sentence analyst verdict for the POV box:

- What is the single most important thing this meeting revealed about the company?
- How does it update the investment thesis formed at Scout / DD Kickoff?
- What is the single most important question the next meeting must answer?

**Mandatory classifications in the POV box (when applicable):**

- **Partner / Reference classification** — if an external party was the subject or speaker (reference call, customer, OEM, strategic partner), state the classification explicitly: *"[Partner] is a [Channel / Licensee / Co-development partner / Acquirer-signal], NOT a [other category]."* Anchor in the verbatim quote that established the classification.
- **Founder Profile observation** — if the meeting revealed or confirmed a founder profile attribute (first-time CEO, solo founder, academic-researcher, prior exit, etc.), state it in the POV box. This protects against downstream commands defaulting to generic "founder risk" framing.
- **Behavioral Intensity classification** — *mandatory for `interview` meeting type.* Synthesize the four-question Behavioral-Intensity Question Bank into a single read: *"Customer behavioral intensity: [Strong / Some / None]. [One sentence on the dominant signal.]"* A *None* classification indicates commodity status and must be flagged explicitly.
- **Claims Reconciliation read** — if this meeting walked back any load-bearing prior claim, state it: *"Cumulative walk-backs across the diligence record: [N] — [claim list]. [⚠️ credibility watch / ❌ credibility pattern]."* At ≥2 cumulative, this line LEADS the POV box and the verdict must address whether diligence should continue at all.

This POV carries forward into the next meeting's context. It is the thread that connects the three deep dives into a coherent, progressive investment assessment.

---

## Step 7: Generate the Post-Meeting Document

Read the docx skill:
```bash
find /sessions -name "SKILL.md" -path "*/skills/docx/SKILL.md" 2>/dev/null | head -1
```

Generate a `.docx` file using the standard dual-output structure (see `diligence-analysis-framework.md` for exact layout):

**Section 1 — Analyst POV** (dark navy box): Meeting type + date + 2–3 sentence verdict.

**Section 2 — Key Insights** (table, 3 columns): Insight label | What Was Said/Observed | NWAi Impact. 4–6 rows. No New Issues section — fold relevant new findings into Key Insights.

**Section 3 — Resolved/Open Tracker** (table, 4 columns): # | Question | Finding | Status. Condensed — one paragraph per item maximum.

Save to:
```
${WORKSPACE}/deals/active/[Company]-[MeetingType]-Meeting-Reconciliation-[YYYY-MM-DD].docx
```

Provide a link to the file and a 3-sentence verbal summary of the top insight and what it means for the next meeting.

---

## Step 8: Update Running Investment Thesis

After generating the document, state in chat (not in the document):

> **Running thesis update after [Meeting Type] meeting:**
> [2 sentences: what changed, what was confirmed, what the next meeting must resolve]

When the cumulative walk-back count is ≥1, the running thesis update must carry it: *"Credibility ledger: [N] load-bearing claim(s) walked back to date ([⚠️ / ❌])."*

This keeps the progressive POV visible and prevents each meeting from being processed in isolation.
