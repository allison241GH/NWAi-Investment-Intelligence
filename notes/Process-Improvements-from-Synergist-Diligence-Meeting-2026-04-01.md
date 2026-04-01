# Process Improvements from Synergist Diligence Meeting (3/25/26)

**Purpose:** Distill generalizable process insights from the Synergist internal diligence meeting that should be integrated into the NWAi TechGroup pipeline, frameworks, or CLAUDE.md. These are not Synergist-specific — they apply to every future deal.

**Source:** Meeting transcript (3/25/26) + comparison against current pipeline framework (CLAUDE.md v2.9, Scout Questions, DD Checklist, DD Report format)

---

## A. Pipeline Stage Improvements

### A1. Add "Demand-Pull Analysis" to Scout or Early Diligence

**What happened:** Hans Kaspersetz suggested looking for CISO/CTO public statements, 10-K filings, and analyst reports to determine if the market is genuinely demanding this product — not just whether the TAM is large. Ron reinforced: "Is this technology push or market demand pull?"

**Current gap:** Scout Q2 (Market Opportunity) scores TAM/SAM but doesn't explicitly test *demand-pull vs. technology-push*. The market-analyst agent researches TAM and structural discontinuity but doesn't specifically search for buyer-side demand signals (public statements, procurement activity, budget allocation data).

**Recommendation:** Add a "Demand Signal Test" to Scout Phase 1, either as a sub-dimension of Q1 (Category & Market Discontinuity) or as a standalone output. Required outputs:
- Is this demand-pull (buyers actively seeking) or technology-push (vendor creating category)?
- Evidence: public CISO/CTO statements, RFPs/procurement, analyst category creation, budget allocation surveys
- Signal strength: 1-5

**Where to implement:** `references/scout-questions.md` (add to Q1 or new Q1b); update `market-analyst` agent prompt to include demand-signal search.

---

### A2. Add "Replicability Speed Test" to Thin Wrapper Assessment

**What happened:** Hans asked: "How quickly can this be replicated by an LLM who becomes aware of the approach?" This is sharper than our current thin wrapper test, which asks *if* it can be replicated — Hans is asking *how fast*.

**Current gap:** The AI Moats Framework and thin wrapper flag test whether the product is "replicable via public APIs in under 48 hours." But it doesn't systematically assess the speed of replication by different threat classes (open-source community, funded startup, Big Tech, LLM provider itself).

**Recommendation:** Expand the thin wrapper test to include a "Replicability Speed Matrix":

| Threat Actor | Could Replicate In | Barrier |
|---|---|---|
| Open-source community (e.g., PyRIT fork) | ___ days/months | ___ |
| Funded startup competitor | ___ months | ___ |
| Big Tech platform (MSFT, Google) | ___ months | ___ |
| LLM provider (OpenAI, Anthropic) as native feature | ___ months | ___ |

If any row is < 6 months, that's a Yellow Flag. If the LLM provider row is < 12 months, it's a strong signal this is a feature, not a company.

**Where to implement:** `references/ai-moats-framework.md` (add Replicability Speed Matrix); `references/gates-and-flags-techgroup.md` (add as Yellow Flag trigger).

---

### A3. DD Report Timing — Generate AFTER Diligence Meeting, Not Before

**What happened:** Jamie noted this was the first deal run through the Cowork pipeline, and the DD Report was shared as an FYI before the diligence meeting. Ideally, the DD Report should be triggered *after* the internal diligence meeting, so SME feedback can inform the scores.

**Current gap:** CLAUDE.md pipeline stage order shows `Diligence → DD Report → Decision`. But there's no explicit checkpoint between Diligence and DD Report for "internal diligence meeting held, feedback incorporated."

**Recommendation:** Add a sub-stage between Diligence and DD Report:

```
Diligence → [Internal Diligence Meeting] → DD Report → Decision → Memo
```

The DD Report command (`/dd-report`) should check: Has the diligence meeting been held? If yes, incorporate meeting transcript findings into scores and content. If no, flag that scores are pre-meeting (preliminary).

**Where to implement:** CLAUDE.md (pipeline stage definitions); `/dd-report` command behavior.

---

### A4. Channel-Dependent Deal: Standard GTM Diligence Questions

**What happened:** Carlos and Tim surfaced a set of sophisticated channel questions that aren't in our current DD checklist: services-to-product attach ratio, channel margin structure, channel training requirements, channel stickiness, white-label vs. branded visibility to end customer.

**Current gap:** DD Checklist Folder 10 (Sales/Marketing) and Folder 11 (Customers) don't include channel-specific diligence questions. For any deal where the GTM strategy is channel-dependent (reseller, MSP, distributor), these are critical.

**Recommendation:** Add a "Channel-Dependent GTM" section to the DD Checklist (new Folder or sub-section of Folder 10/11). Required questions for any deal with >30% revenue through a channel partner:
- What is the services-to-product attach ratio for the channel partner?
- What is the channel partner's markup/margin on delivering the service?
- How much training does the channel partner need to sell and deliver?
- Is the product integrated into the partner's tech stack, or used as a standalone tool (plumber model)?
- Can the end customer identify the product vendor? Or is it white-labeled?
- If the channel partner finds a better tool, what are the switching costs?
- What % of revenue is through this channel vs. direct?
- Is the channel relationship exclusive?

**Where to implement:** `references/dd-checklist.md` (add channel sub-section to Folder 10 or 11).

---

### A5. Enterprise Security Audit Cycle Impact on Revenue Projections

**What happened:** Hans pointed out that government/enterprise customers require a security audit before onboarding a vendor (especially for tools that connect to their LLMs/networks). He estimated 3-month minimum audit cycles, which directly collapses the revenue scaling math.

**Current gap:** The financial-analyst agent and DD Checklist Folder 2 (Financial Model) don't explicitly account for enterprise sales cycle length driven by security/compliance audit requirements. This is especially relevant for GovTech, HealthTech, FinTech, and any deal selling to regulated enterprises.

**Recommendation:** Add to the financial-analyst agent's standard analysis: "For enterprise/government deals, what is the expected security audit / vendor approval cycle? Factor this into revenue timing." Add a question to DD Checklist Folder 2: "What is the average time from signed contract to revenue recognition, including security/compliance onboarding?"

**Where to implement:** Financial-analyst agent prompt; `references/dd-checklist.md` Folder 2.

---

## B. DD Report & Workflow Improvements

### B1. "Implied Tests" Framing — Validation Test Lists per DD Section

**What happened:** Ron suggested that instead of just presenting analysis per section, the DD Report should generate "implied tests" — specific validation questions that the diligence team needs to confirm or refute. He called it "a shopping list."

**Current gap:** The DD Report presents scored analysis (1-5) per section with narrative. It does not explicitly output a list of *validation tests* that map to each score. The Hypothesis Confirmation Plan (Layer 2 of DD Checklist) gets close, but it's organized by validation domain, not by DD Report section, and it's part of the kickoff package — not part of the DD Report itself.

**Recommendation:** Add to the DD Report format: after each scored section, include 2-3 "Validation Tests" — specific, testable questions that the diligence team must answer to confirm the score. Format:

> **Section: Competitive Landscape (Score: 3/5)**
> [Narrative...]
>
> **Validation Tests:**
> - [ ] Confirm that [Competitor X] is the right comp, not [Competitor Y] (Tim to verify)
> - [ ] Validate channel stickiness with direct CDW call
> - [ ] Assess replicability speed by funded competitor

This makes the DD Report a working document, not just a briefing document.

**Where to implement:** `references/dd-report-format-reference.md`; `scripts/dd-report-generator.js` (add validation tests row to each section table).

---

### B2. Organize Diligence Work by Validation Team, Not Just DD Section

**What happened:** Ron asked: "How do we restructure this to track work by validation team — product team findings, GTM team findings, finance team findings?"

**Current gap:** The DD Report is organized by analytical section (Market, Product, Moat, Team, etc.). The DD Checklist is organized by data folder. Neither maps cleanly to how the diligence *team* is actually organized (which is typically by function: product/tech team, GTM/sales team, finance team).

**Recommendation:** The Action Tracker format we built for Synergist (organized by team track) should become a standard output of the `/diligence` command. When launching diligence, generate both:
1. DD Kickoff Package (current — organized by analytical domain)
2. Diligence Action Tracker (new — organized by team assignment)

This is not a replacement for the DD Report structure; it's a companion work-tracking document.

**Where to implement:** New command or option: `/diligence [company] --tracker`; or auto-generate as part of `/diligence` output.

---

### B3. Meeting Transcript Ingestion as a Pipeline Stage Input

**What happened:** Ron said: "Since we're recording this, we'll try to integrate this into our analysis document." Jamie confirmed the workflow: speech-to-text → structured summary → feed into model.

**Current gap:** No formal mechanism for ingesting meeting transcripts into the pipeline. Jamie did it manually for this session.

**Recommendation:** Formalize a command or workflow: `/ingest-meeting [company] [transcript file]` that:
1. Reads the transcript
2. Extracts: key feedback by section, new questions raised, team assignments, action items, disclosures/conflicts
3. Updates the deal's working documents (Action Tracker, DD Report inputs)
4. Flags any feedback that contradicts or refines current DD scores

This is essentially what we just did manually for Synergist — but as a repeatable command.

**Where to implement:** New command in `.claude/commands/`; update CLAUDE.md pipeline documentation.

---

## C. Competitive Intelligence Improvements

### C1. SME Feedback Loop on Competitive Analysis Before IC

**What happened:** Tim flagged that the DD Report's competitive analysis used Microsoft Purview as a primary comp — which was wrong (Purview is data governance, not AI compliance). The AI-generated analysis was plausible but incorrect for this specific market framing.

**Current gap:** The competitive-intelligence agent runs autonomously and its output goes directly into the DD Report. There's no checkpoint where an SME reviews and corrects the competitive landscape before it becomes part of the scored report.

**Recommendation:** Add a "Competitive Validation" checkpoint between agent research output and DD Report scoring. For the Competition section specifically, flag it as "AI-generated — requires SME validation" until a human reviewer confirms the comps are correct. This could be as simple as a status field in the DD Report: "Comp set validated by: _____ (date: _____)" or "Comp set: UNVALIDATED — AI-generated."

**Where to implement:** DD Report format (add validation status to Competition section); `/dd-report` command behavior.

---

## D. Disclosure & Conflict Management

### D1. Formalize Conflict Disclosure in DD Kickoff

**What happened:** Ron disclosed a personal relationship with the founder. Carlos disclosed a potential consulting engagement. Both were handled well but informally.

**Current gap:** No standard place in the DD Kickoff Package or DD Report for recording conflicts of interest and their implications (e.g., "sensitive questions should be routed away from [person]").

**Recommendation:** Add a "Disclosures & Conflicts" section to the DD Kickoff Package template. Required fields:
- Team member name
- Nature of relationship/conflict
- Disclosed on (date)
- Mitigation (e.g., "route sensitive questions to other members")

We included this in the Synergist Action Tracker — it should be standard.

**Where to implement:** DD Kickoff Package template; `references/dd-checklist.md`.

---

## Summary: Priority & Effort Matrix

| # | Improvement | Applies To | Priority | Effort |
|---|---|---|---|---|
| A1 | Demand-Pull Analysis at Scout | scout-questions.md, market-analyst agent | HIGH | Medium |
| A2 | Replicability Speed Matrix | ai-moats-framework.md, gates-and-flags | HIGH | Low |
| A3 | DD Report after Diligence Meeting | CLAUDE.md, /dd-report command | HIGH | Low |
| A4 | Channel-Dependent GTM Questions | dd-checklist.md | MEDIUM | Low |
| A5 | Security Audit Cycle in Financial Model | financial-analyst agent, dd-checklist | MEDIUM | Low |
| B1 | Validation Tests per DD Section | dd-report-format-reference.md, generator | HIGH | Medium |
| B2 | Action Tracker as Standard Output | /diligence command | MEDIUM | Medium |
| B3 | Meeting Transcript Ingestion | New command | MEDIUM | High |
| C1 | SME Validation on Competitive Comps | DD Report format, /dd-report | HIGH | Low |
| D1 | Conflict Disclosure in DD Kickoff | DD Kickoff template, dd-checklist | LOW | Low |

---

*Generated April 1, 2026 | NWAi Investment Intelligence | Jamie Allison*
