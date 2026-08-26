# NWAi TechGroup — Pipeline Decisions Log

*Institutional reasoning behind key framework and workflow decisions.
This document captures the **why**, not the what — the what lives in the plugin reference docs and CLAUDE.md.
Updated as decisions are made. Version-stamped per entry.*

---

## Decision 1 — Screener Reframe: From 6 Binary AutoKill Gates to 3 Hard Gates + Scored Opportunity

**Date:** March 2026
**Status:** Implemented (v2.3 plugin, `gates-and-flags-techgroup.md`)

### The strategic rationale

Three years of Dealum inbound produced zero funded deals. Every actual NWAi investment came from cross-syndication or member referrals — not from the Dealum pitch queue. This meant the original screener was optimized to find investments in a channel that historically produces none.

Separately, the team was routinely overriding two of the six AutoKill gates — SAFE structure and missing lead investor — in the actual screening discussions. Gates that get overridden in practice aren't gates; they're conversation topics. Enforcing them at the pitch deck stage was killing deals on unknowable information (you cannot determine final deal structure or lead status from a deck before speaking to the founder).

### The reframe

The screener's job is not to find the diamond. It's to identify which 1-in-9 Dealum deals deserve a 30-minute Live Pitch slot. Diamond-finding happens at Live Pitch and beyond.

Three hard gates remain non-negotiable because they *are* determinable from a pitch deck and from web research:
1. Foreign entity or IP domiciled outside the US
2. Market too small to support a 10x return
3. No credible path to commercialization (pre-concept, research project, demo lab)

Everything else becomes a scored signal: Opportunity (5 dimensions, 0–25 pts) and Readiness (4 dimensions, 0–20 pts). ADVANCE threshold: Opportunity ≥ 18/25.

SAFE and missing-lead-investor are now friction signals — raised at IntroCall with the founder, not used to kill at the deck stage. NWAi's policy of not closing SAFE deals is unchanged; only the timing of that conversation changed.

### The Live Pitch format change

Bi-weekly team meetings shifted from reviewing screened decks to hosting 3 Live Pitches per session. The screener pre-loads 3–5 Live Pitch questions tailored to each deal's specific risks, so the team walks in ready to probe rather than to meet the company for the first time.

---

## Decision 2 — Retrospective & Signal Calibration Framework

**Date:** March 2026
**Status:** Designed, pending Dealum API access to execute

### The concept

A member proposed using historic Dealum data + a web research agent to surface deals NWAi passed on that subsequently succeeded — and extract signal from what we missed. The goal is calibration of the screener over time, not a highlight reel.

### Critical framing: pattern recognition, not calibration

Without structured kill-reason data from past passes, this is a **pattern recognition exercise**, not a true calibration study. The distinction matters when presenting findings to the group: "here's what we systematically underweighted" is actionable; "here are the deals we blew" is Monday-morning quarterbacking.

True calibration requires the denominator: of all companies killed on Gate X, what fraction succeeded? Without that, you have a success cohort but no base rate.

### Success tiers (in order of research feasibility)

- **Tier 1 — Funded:** Named institutional lead in any priced round within 36 months of NWAi's pass date. Most findable via web search.
- **Tier 2 — Acquired:** Strategic or PE acquisition (explicitly not acqui-hire, which often confirms the pass). Findable but requires judgment on exit type.
- **Tier 3 — Revenue Signal:** $10M+ ARR cited in any public source. Lowest recall (most private companies don't publish ARR), highest quality signal when found.
- **Tier 4 — Notable Institutional Validation:** a16z, Sequoia, Bessemer, or equivalent backing in any round post-pass. Strong independent signal, usually publicly available.

A fourth metric — Series A within 24 months from a named lead — is tighter and more actionable than "raised Series A" alone. Time dimension matters.

### The 3-year lookback problem

No structured kill-reason notes exist for the prior three years. The workaround: work backward from the success cohort rather than forward from kill reasons.

For each company that hit a success tier, run a second-pass research job: what did they look like at the time of application (funding stage, product maturity, revenue, team)? Apply today's NWAi gates retroactively and infer the probable kill reason. This is inference, not fact — but directionally useful for pattern identification.

Stage-of-kill (Inbox vs. Screening vs. Scout) is a proxy even without specific kill notes. Screening deaths almost certainly hit an AutoKill gate; Scout deaths likely passed gates but failed venture potential assessment.

### Execution phases

**Phase 1:** All Dealum passed deals tagged "Tech," looking back as far as the data goes. First pass is broad (web research agent on all company names, flag success tiers). Second pass is deep on outliers (retroactive re-screen, estimated 1 analyst hour per company, expect 5–15 outliers in 3 years of deal flow).

**Phase 2:** Expand to all five NWAi groups (TechGroup, MedicalGroup, SpaceGroup, ConsumerGroup, FintechGroup) — but only after each group's thesis and gates are codified. The research agent is group-agnostic; the success-tier interpretation is group-specific. MedicalGroup's "did they succeed?" is FDA clearance or strategic pharma partnership, not a Series A.

### The single most important design requirement going forward

**Every pass decision must record a kill reason in Dealum from this point forward.** This is the gate-tagging requirement. Without it, future retrospectives remain pattern recognition exercises rather than true calibration studies. The value of structured kill-reason metadata compounds over time — start capturing it immediately.

Architecture: this will surface as a `/retrospective [group]` command, running the research agent in batch, scoring outcomes against success tiers, mapping kills to gate failures, and producing a calibration report.

---

## Decision 3 — Dealum API Scope

**Date:** March 2026
**Status:** Requirements drafted and sent to Dealum; API credentials pending

### What we need (read)

- `GET /applications` — full applications list filtered by "Tech" tag. Critical field: `answers` (contains pitch content the AI analysis runs against). Confirm whether `answers` is populated in standard Integration API or requires Extended API tier.
- `GET /members` — member roster for SME assignment once member-to-domain mapping is available.

### What we need (write) — deliberately narrow

Write access is scoped to **Inbox → Screening → Scout only**. The downstream pipeline (Diligence → DD Report → Decision → Memo) is handled by the admin team manually. This is an intentional design decision — downstream stages require human judgment calls that shouldn't be automated in Dealum record updates.

Two fields only:
- `step` — advance or kill a deal at each of the three early transitions
- `tags` — apply classification tags (screening verdict, kill flags, TechGroup theme)

We will never create, delete, or write to applications beyond the Scout stage.

### Webhooks: deprioritized

Dealum confirmed webhooks have a delay of up to several hours — not truly real-time. The difference between a multi-hour webhook delay and a scheduled daily sync is minimal in practice. Daily sync is simpler to manage and debug. Webhooks are not worth the complexity for what they'd gain.

---

## Decision 4 — Diligence Command: Data Room Workflow Gap

**Date:** March 2026
**Status:** Known gap; workaround in use; Phase 1c improvement pending

### The issue

The `/diligence` command automatically loads prior stage outputs from the `deals/active/` folder (Triage Report, Scout Assessment, prior DD Kickoff Package). It does **not** automatically detect or read company-specific data room folders (e.g., `STL Data Room/`, `Synergist Data Room/`).

This means primary source documents — financials, cap table, term sheet, investor memos, product demo transcripts — don't flow into the scoring rubrics unless explicitly loaded first.

### Current workaround

At the start of any diligence session where a data room folder exists, explicitly prompt Claude before running `/diligence`:

> "Please read all files in the [Company] Data Room folder and factor them into the scoring, then run diligence on [Company] by name."

This loads data room context first and carries it into the rubric scoring in a single exchange. Two separate prompts risk the context not flowing cleanly into the scoring.

### Folder structure discipline

Keep the two folder types strictly separated:
- `deals/active/[Company] Data Room/` — source documents from the company (financials, decks, cap tables, contracts)
- `deals/active/` — NWAi's analytical outputs (Triage Report, Scout Assessment, DD Kickoff Package, DD Report)

Do not move pipeline output files into data room subfolders. The diligence command searches `deals/active/` by filename pattern — moving outputs breaks the auto-load chain for downstream commands.

### Planned improvement (not yet built)

Add a Phase 1c to the diligence command that automatically detects a matching company data room folder by name and loads it before applying scoring rubrics. This removes the need for the manual pre-prompt.

---

## Decision 5 — Two Deals Run Through Full Pipeline (Reference)

**Date:** March 2026
**Status:** Complete — outputs in `deals/active/`

These are the first two deals run through the full NWAi TechGroup pipeline. They serve as calibration references for format and depth expectations at each stage.

**Summit Technology Laboratory (STL)**
- Full pipeline: Triage → Scout → Diligence (revised) → DD Report
- Verdict: Advance with Conditions (4 specific conditions)
- Key signal: Panasonic acquisition exploration — if serious, changes the entire return model
- Outstanding: Dealum step/tag update pending API credentials; conditions must be met before NWAi wires

**Synergist Technology**
- Full pipeline: Triage → Scout → Diligence → DD Report
- Outputs in `deals/active/`

Both deals were run while the DD Report format was being iterated. The canonical format reference is `STL-NWAi-DD-Report-2026-03-19.docx`. The generator script at `scripts/dd-report-generator.js` is mandatory — never freestyle the report format.

---

## Decision 6 — Enterprise Migration Architecture: Google Drive as Shared Pipeline Backbone

**Date:** March 2026
**Status:** Designed, pending Google Drive MCP connection on enterprise account

### The strategic decision

As NWAi TechGroup scales beyond a single user, the pipeline needs a shared layer that allows different team members to run different stages of the same deal — with each stage automatically inheriting the outputs of the prior stage, regardless of who ran it or on which machine.

Cowork is inherently personal and local. There is no native shared workspace in Cowork, even on enterprise. The sharing infrastructure must be built on top of it using external systems.

### The three-layer architecture

**Plugin (engine):** The `nwai-tech-pipeline.plugin` is the portable, shareable unit. It installs identically on any team member's Cowork — personal or enterprise account. It encapsulates all commands, agents, framework skill, and the Dealum MCP server. Jamie's personal account is the R&D environment where the plugin is developed and iterated. The enterprise account is the production environment where team members install the current stable version. New plugin versions distribute via GitHub.

**Google Drive (shared pipeline backbone):** Each deal gets a folder on Google Drive (`NWAi TechGroup / Deals / [Company Name] /`). Every stage output — Triage Report, Scout Assessment, DD Kickoff Package, DD Report — is automatically written to that deal's Drive folder after generation, and automatically pulled from it at the start of the next stage. This makes the handoff chain (screen → scout → diligence → DD report) work across different people's machines. Bahar runs `/screen`, saves to Drive. Jamie runs `/scout`, pulls Bahar's screen from Drive, saves scout output back. Jessica runs `/diligence`, pulls both.

**GitHub (plugin and framework version control):** The plugin file, all reference docs, CLAUDE.md, architecture doc, scripts, and this decisions log are version-controlled in the GitHub repo. The github-sync skill handles this automatically after every meaningful change. Team members with repo access can pull the latest plugin and framework at any time.

### What this means for deal outputs and Dealum

Dealum remains the canonical pipeline state record — stages, tags, and verdicts. Google Drive holds the supporting documents. The two are complementary: Dealum tells you where a deal stands; Drive holds the full analytical record behind that status.

Deal outputs (Triage Reports, Scout Assessments, DD packages, DD Reports) are saved to both the local workspace (as a safety net if Drive is unavailable) and Google Drive (as the shared team record). This mirror pattern ensures no work is lost if a credential lapses.

### What needs to be built once Google Drive MCP is connected

The plugin commands (`/screen`, `/scout`, `/diligence`, `/dd-report`) need two additions each:
1. A "pull prior outputs" step at the start — check the company's Drive folder for prior stage documents and load them into context
2. A "push output" step at the end — upload the newly generated document to the company's Drive folder

The architecture doc (`nwai-techgroup-pipeline-architecture.md`) will be updated to v0.X.0 once this is implemented, following the existing version-bump convention.

### Prerequisites before building

- Google Drive MCP confirmed connected on enterprise account (two-layer permission requirement: Claude Enterprise Owner must enable Google Workspace connectors at org level via Organization Settings → Connectors; Google Workspace admin may also need to allow Claude as a trusted app via `admin.google.com → Security → API controls`)
- Shared Google Drive folder structure created for NWAi TechGroup deals
- Each team member authenticates individually with their Google account after org-level connector is enabled
- Dealum API credentials confirmed (separate prerequisite for stage advancement writes)

### Explicit non-decisions

Individual team members' Cowork Projects are not shared and are not intended to be. Each person's Project is their personal R&D environment. The sharing happens through Drive (documents) and Dealum (pipeline state), not through Cowork itself.

---

## Decision 7 — Captain Compliance: Diligence Meeting Sequence (Reference)

**Date:** June 1, 2026
**Status:** In diligence — WATCH (Conditional Advance); gated on GTM

- **2026-06-01 — Product/Demo meeting processed** (`/post-meeting`). Thin-wrapper verdict (AI Moat 1/10) confirmed, not overturned: live "AI" scanner failed in-room; founder declared the moat is white-glove accountability and conceded lock-in is deliberately not engineered. Founder-Integrity gate (Folder 12) work treated as complete per deal-lead direction — conduct confirmed, minimization tone, folded into Team & Execution (§8). Deal now **gated on GTM**: is the one-to-many channel contracted or aspirational, and can anyone but Captain deliver the onboarding that *is* the moat? Output + GTM prep question set: `deals/active/Captain Compliance/Reports/Captain Compliance-Product-Meeting-Reconciliation-2026-06-01.docx`.

---

| Item | Owner | Status |
|------|-------|--------|
| Dealum API credentials — obtain token + room ID | Jamie | Pending Dealum response |
| Gate-tagging in Dealum — start recording kill reasons on all new passes | Jamie / Admin | Start immediately, don't wait for API |
| Google Drive MCP — confirm connection status | Jamie | Attempted, not confirmed connected; retry in fresh session |
| Retrospective `/retrospective` command — build after Dealum API live | Plugin dev | Blocked on API |
| Diligence Phase 1c — auto-detect data room folder | Plugin dev | Planned, not scheduled |
| SME assignment — member-to-domain mapping | Jamie | Blocked on Dealum members API |
| 5-group thesis codification — prerequisite for cross-group retrospective | Group leads | Not started (TechGroup only active) |

---

## Decision 8 — SAFE & Lead-Investor: From Penalized Signal to Neutral Negotiation Item

**Date:** June 9, 2026
**Status:** Implemented (plugin v2.21.0, architecture v0.35.0, `gates-and-flags.md` Readiness rubric + Downgrade Rule)

### The strategic rationale

Decision 1 (March 2026) moved SAFE structure and missing-lead-investor *off* the hard gates — they stopped being kills. But it only changed the timing of the conversation, not the scoring weight. In practice they remained **penalties**: in the current Readiness rubric, a SAFE scored 2/5 (Deal Structure), "no lead" scored 2/5 and "seeking NWA to lead" scored 0/5 (Syndication Readiness). With the Readiness Downgrade Rule (Opportunity ≥ 20/30 but Readiness < 15/25 → auto-downgrade ADVANCE → WATCH), a SAFE + no-lead −6 hit could single-handedly demote an otherwise strong deal to WATCH. The flag language still read "deal-breaker" and "NWAi rarely leads." Jamie experienced this as an "automatic knock-off" threading through every downstream stage — and as a contradiction with two market realities:

1. **Founders increasingly start on a SAFE but are open to negotiating** structure to priced equity or convertible. Final structure is a negotiated outcome, not a screen-determinable fact.
2. **NWA is increasingly willing to lead and cross-syndicate.** The "NWA rarely leads / seeking-NWA-to-lead = 0/5" stance was factually outdated.

### The calibration

SAFE structure and lead-investor status are now **neutral by default — a positive signal when present, never a penalty when absent.** Specifically:

- **Deal Structure (Readiness Dim 1):** priced equity = 5 (bonus); SAFE/convertible on standard terms = **3 (neutral, the normal early-stage starting point)**; below-neutral reserved for unusual/aggressive terms (2), founder inflexibility NWA can't close (1), or genuinely incompatible structure — token/rev-share/no-equity (0). "Deal-breaker" language removed.
- **Syndication Readiness (Readiness Dim 3):** reframed from "is there a lead?" to "is the round real and forming?" External lead/co-lead = 5 (validation bonus); **NWA leading / cross-syndicating = 3 (neutral, NWA's standard model)**; the 0/5-for-"seeking-NWA-to-lead" rule deleted; "NWA rarely leads" language removed. Stance: open to leading, external co-lead preferred for validation.
- **Readiness Downgrade Rule carve-out (the key mechanical fix):** Deal Structure and Syndication Readiness can no longer downgrade an ADVANCE *on their own*. A downgrade now requires friction in at least one of the other three Readiness dimensions (Product Maturity, Traction Velocity, Founder Accessibility).
- **CLAUDE.md Investment Criteria** softened: Structure and Syndication are explicitly labeled negotiated close-stage outcomes, not screen gates. NWA's preference for priced equity at close is unchanged — only the screen-stage treatment changed.
- **Downstream thread scrubbed:** the carry-forward "deal structure concerns" framing in Scout, Diligence, and DD-Report is reframed as "negotiation items, not flags or kills"; the venture-analyst's "OPEN item weights valuation downward" clause now carves out SAFE-presence/no-lead (only founder inflexibility or a dirty cap table weighs down).

**Note on point totals:** Decision 1 references the old totals (Opportunity 0–25, Readiness 0–20, ADVANCE ≥ 18/25). The current framework is Opportunity 6×0–5 = 30, Readiness 5×0–5 = 25, ADVANCE ≥ 20/30 — this entry reflects the current totals and supersedes Decision 1's figures.

**What did not change:** the three real hard gates (Foreign Entity/IP, Market Size, Commercialization Path), the Opportunity rubric, the NWA Filter, and NWA's eventual close-stage preference for priced equity. This is a *when-and-how-weighed* change, not a policy reversal.

---

## Decision 9 — Framework Adoption: The Six-Signal Screen (Craft-at-Screen), Agent-Era Upgrade, and Alpha-AI Sovereignty Phase 2

**Date:** Ratified July 11, 2026 (spec) + July 12, 2026 (session rulings); implemented July 13, 2026
**Status:** Implemented (plugin v3.0.0 — major, stage-architecture change; architecture v0.38.0; spec: `notes/NWAi-Pipeline-Framework-Adoption-Spec-2026-07.md`)

### The strategic rationale

The Claude V13 sandbox program (`docs/reference/Gemini/`, V10→V13 lineage) proved a different Screen-stage judgment model: qualitative signal verdicts with weighted conviction mechanics instead of numeric 30/25 scoring. The 4-deal regression back-test was ratified (verdict invariance against the pipeline's historical calls), two live pitches (Ivee, AgTechLogic) ran on it, and the Craft Investing thesis — *surface the key signals that let a craftsman form conviction; don't replace judgment with a number* — was promoted to canonical (`docs/strategy/future-of-venture-investing/NWAi-Craft-Investing-Thesis-2026-06.md`). This decision installs that model into the pipeline.

### The five ratified decisions (July 11, 2026)

1. **Craft at Screen only.** Screen becomes qualitative signal-surfacing (Six-Signal verdict model, no numeric scores). Numeric scoring begins at Scout, unchanged from Scout onward. Craft-at-Scout is parked, not rejected (re-evaluate after ~1 quarter of live screening, or if the seam rubric proves theater).
2. **Alpha-AI Sovereignty Phase 2: GO.** Installed per the framework's own 12-item install spec — Screen Signal 6 → Scout Q8 → Diligence Tier 4 → DD Report mappings + agent sections. All 5 open calibration questions ratified as recommended: LEAKS label stays member-facing; Conduit Strong Yellow keeps the 3/5 cap (roadmapped) / 2/5 (unaware) — verified containment clears only at Diligence Tier 4; Tier 4 gated to model-supply-chain deals; Replicability Matrix gets an annotation on the LLM-provider row, never a fifth row (no-double-count); standing Appendix-A provider-terms item for ALL AI deals, effective at install.
3. **Agent-Era at Screen upgraded** from Exposure trip-wire (FLAGGED/CLEAR, routing) to weighted posture verdict — Signal 5, SIGNIFICANT weight, THREATENED = adverse. Scout Q7 and Diligence Moat Tier 3 unchanged; Screen's posture is the prior.
4. **Screen→Scout contract:** fixed conversion rubric at Scout intake — mechanical verdict→points translation, no re-judging. Delta tracking and Thesis Fit preserved with the same architecture, new input. Frozen in the dedicated seam reference `references/screen-scout-conversion-rubric.md` (v1.0), loaded by `/scout` only — the number never appears at Screen.
5. **Scope: TechGroup only.** Nothing operational changes for the other five groups.

### Session rulings (July 12, 2026 — recorded amendments and calibrations)

- **`gates-and-flags.md` → Universal Guide (amends spec Decision 5).** On review, the "Universal Triage Framework" file's entire content (gates thresholds, filter tests, 30/25 scoring, research protocol) was authored for and used only by TechGroup. Its operative content moved into `gates-and-flags-techgroup.md` (now the self-contained TechGroup Six-Signal Screener Reference v3.0), and the file was rewritten **and renamed** `gates-and-flags-universal-guide.md` — a 1–2 page architecture guide (gates / rigor filters / judgment model / verdict vocabulary / research discipline / output contract) for future group playbooks, with TechGroup as the reference implementation. Both prior versions archived in `references/_archive/`.
- **Thesis Fit /45 subset (spec Open Item 1):** the conversion rubric maps Opportunity **D1–D5** (/25, dropping D6 Venture Economics — the spec's own weakest mapping; V13 folds venture economics into Market) + Readiness **R1–R4** (/20, dropping R5 Founder Accessibility). Thesis Fit keeps its established /45 denominators and bands.
- **Captain Compliance dropped from rubric calibration:** its archived Triage Report is on the older /30 + /25 scale (20/30 + 19/25, conviction LOW — correcting the spec §5.3 citation of "22/30 + 23/25"). Calibration anchored on STL + Synergist (both /25 + /20). CC retained for the verdict regression and confirmed as the out-of-sample seam-test deal.
- **Krew waived** from the regression set (consistent with its sandbox waiver).

### The proof plan (ran before commit — all passed)

1. **Rule traceability:** all 18 calibrated ledger rules located verbatim-in-substance in `gates-and-flags-techgroup.md` (rules ledger + operative sections) and `screen.md` (Steps 5–7 + self-check); V13's 28 self-check items carried or deliberately merged.
2. **Screen regression:** the back-test three re-screened blind (deal folders only, prior reports excluded) through the new `/screen`: **Captain Compliance ADVANCE/MEDIUM ✅ · STL ADVANCE/MEDIUM ✅ · Synergist ADVANCE/MEDIUM ✅ — zero verdict flips.** Calibrated rules fired as adjudicated: CC coherence cap (cap-table contradiction) + commitment UNCONFIRMED as LPQ #1; STL academic-founder rule (MIXED + UNCONFIRMED, never SPLIT); Synergist coherence cap + services-in-SaaS pattern note. One explained non-verdict divergence recorded: Synergist Protect Alpha read KEEPS where V13 recorded MIXED — the regression verified the CDW no-train clauses in the data room, evidence V13's 3-search sandbox never saw (Protect Alpha carries no weight; verdict invariance unaffected).
3. **Rubric calibration:** regression per-signal verdicts mapped through the proposed table vs. archived per-dimension scores — every comparable dimension within ±2; Synergist's mapped Opportunity sum matched exactly (19/25). Two opposite-direction Δ2s (STL D3, Synergist D2) are screening-judgment shifts already blessed by verdict invariance, not rubric bias. Frozen as v1.0.
4. **End-to-end seam test (CC):** new Screen output → `/scout` intake — rubric applied mechanically (17/25 + 13/20 → Thesis Fit 30/45, Qualified fit), deltas rendered, the Q2 ≥2-divergence carried its explanation, result consistent with the historical ADVANCE TO DILIGENCE call. Surfaced and fixed one rubric gap: Unverified claimed revenue now caps D5 at 3 (Cynical Default carries through the seam).

### What did NOT change

Scout-onward numeric scoring (Conviction /19, bands, Phase 1/2 rubrics); the DD Report canonical format (11 × 1–5, STL master, generator script); Decision and Memo formats (beyond the Alpha mappings); the other five groups (playbooks not yet operational; the Universal Guide is their authoring reference); Dealum-deferred status (Step 10 tag vocabulary remains aspirational; deal-folder state canonical). No MCP changes — no plugin reinstall required.

---

## Decision 10 — Founder Claims Reconciliation & Credibility Cap at Scout (RootCause.ai lesson)

**Date:** July 15, 2026 (Scout install: plugin v3.1.0) + July 15, 2026 (`/post-meeting` extension: plugin v3.2.0 — ratified by Jamie same day)
**Status:** Implemented (plugin v3.2.0; architecture v0.40.0; `scout.md` Step 4c + `post-meeting.md` analyst lens/POV box + `diligence-analysis-framework.md` §2)
**Trigger deal:** RootCause.ai — PASS recorded July 15, 2026 (`deals/archive/RootCause.ai/Reports/RootCause.ai - Decision Record 2026-07-15.docx`)

### What happened

RootCause.ai's June 2026 Investor Diligence Response walked back three load-bearing deck claims in one document: (1) the production engine is pivoted Cholesky factorization — a well-known technique — while the deck's breakthrough framing (tensor-train / cross-interpolation, "876,000x / O(n log n)") is research-roadmap, not built; (2) the DHL "$20M savings" headline is an unbooked estimate from an assumed intervention; (3) the quantified-ROI narrative generally reduces to guesstimates the company explicitly says it doesn't own ("we don't hold the lever that books the savings").

The June 16 Scout update **caught every one of these individually** — flagged them, wrote diligence questions against them — and still net-upgraded conviction 11.8 → 12.9 (Q1b 2→3, Q4 3→4, GTM 3→4) on the strength of *self-reported* logos, metrics, and channel-partner names in the same letter. A TechGroup member (SME) read the same document and called it correctly: a gross deck-vs-reality discrepancy pattern that warrants a pass on founder-credibility grounds. Jamie ratified the pass.

### The diagnosis

Two mechanical failures, not a research failure:

1. **Items vs. pattern.** Each walk-back was treated as an itemized open diligence question; nothing in the Scout machinery forced the *pattern* (multiple load-bearing claims walked back at once) up into the verdict. Screen has this concept (the coherence cap on Triage Conviction); Scout had no equivalent.
2. **Asymmetric evidence treatment.** The founder's favorable self-reported claims raised scores immediately, while the founder's unfavorable admissions were deferred to future diligence. The Citation Contract already classified such claims as Reported-tier ("a private written claim is not independent verification" — the June 16 report's own words) but nothing prevented Reported-tier evidence from driving score upgrades.

### The rule installed (scout.md Step 4c)

Applies to any Scout scoring pass whose inputs include founder-provided follow-up material superseding earlier founder materials:

1. **Reconcile before re-scoring** — classify every load-bearing prior claim as CONFIRMED / QUALIFIED / WALKED BACK, rendered as a table in the report.
2. **Pattern rule** — 1 walked-back load-bearing claim = ⚠️ in the Analyst Verdict Block; ≥2 = ❌ founder-credibility red flag, ADVANCE off the table until independently re-verified (default DECLINE, or WATCH with a named re-verification trigger).
3. **Credibility Cap** — a document that walks back a load-bearing claim cannot produce a net conviction increase.
4. **Reported-tier evidence cannot raise scores** — self-reported confirmations may resolve open questions but only independently verified evidence raises a dimension score; apply symmetrically.

### Extension — `/post-meeting` claim walk-back lens (July 15, 2026, plugin v3.2.0)

Jamie ratified extending the same logic to the Diligence-stage meeting analysis, where transcripts can contain walk-backs just as DD responses can. The post-meeting framework already watched for "structural contradictions" but had no classification, no pattern escalation, and no cap. Installed in `post-meeting.md` (analyst lens, POV-box mandatory classifications, running thesis update) and `diligence-analysis-framework.md` §2:

1. **Walk-back classification** — a transcript that walks back a load-bearing claim from prior founder materials (deck, DD response, data room, earlier meeting) classifies the affected claims CONFIRMED / QUALIFIED / WALKED BACK; every walk-back is a Key Insight, never just a tracker note.
2. **Cumulative credibility ledger** — the count accumulates across the whole diligence record (Scout Step 4c table + all post-meeting docs), not per-meeting. 1 = ⚠️ in the Analyst POV box; ≥2 = ❌ founder-credibility pattern that *leads* the POV box and the running thesis update, with a recommendation to pause diligence or move to `/decision pass` until independently re-verified. The running thesis update carries the ledger line whenever the count is ≥1.
3. **Symmetry rule at Diligence** — favorable self-reported statements in a meeting are Reported-tier: they may resolve tracker items but cannot flip a 🔴 thesis stress point to 🟢 without independent verification.

### What did NOT change

Scout scoring rubrics, weights, and the Conviction /19 architecture; the Screen-stage coherence cap (already existed); the Citation Contract itself (this decision enforces its tiers in the scoring mechanics rather than only in the prose); the post-meeting dual-output document structure (POV box / Key Insights / tracker — the ledger lives inside the existing POV box, no new section). No MCP changes — no plugin reinstall required.

---

## Decision 11 — Signal-First Scout Report (v2): Member-First Restructure of the Scout Assessment

**Date:** July 16, 2026 (ratified in session on the SecureG Scout report — first Scout produced after the v3.0.0 Framework Adoption)
**Trigger:** Jamie's review of the SecureG Scout Assessment Report (July 15, 2026). Verbatim thrust: the report "just renders sections that are not salient for members," reads like an attempt to "decode the signal output screener into a scored scout report," and repeats the same dimensions across orphaned sections (Moat appeared in three places; positioning/macro/adjacent-tech stood alone as worksheet dumps).

**Root cause (agreed):** the v1 Scout format was organized around the scoring machinery — Page 1 mirrored the internal Phase 1 / Strategic / Phase 2 dimension groups of `scout-questions.md` plus the Screen→Scout carry-forward mechanics. It predated the Framework Adoption redesign: Screen got the member-first signal-block architecture in v3.0.0; Scout was still rendering its worksheet.

**Decision:** rebuild the Scout report around what a member reviews, carrying the Six-Signal vocabulary forward from Screen so members read one signal language across the funnel. Each scored dimension renders exactly once via a fixed dimension→home map:

1. **Analyst Verdict leads** — now explicitly carrying the two required Scout elements (One-Sentence Verdict, Single Biggest Risk) plus both scores as one plain line each and the dual-score read. A fired Step 4c credibility cap promotes into this block.
2. **The Six Signals — Scout depth** — one block per Screen signal with score chips: Discontinuity (Q1+Q1b+Blue Ocean), Market (Q2+Q6 macro one-liners+TAM/SAM/SOM), Team (Phase 2 sub-reads), Moat (Q3+Q4+Q5+adjacent/emerging tech+moat-side technology), Agent-Era (Q7 plain helps/hurts), Protect Alpha (Q8 plain KEEPS/LEAKS). Each block ends with a one-line "Probe next:".
3. **Execution & Path table** (Dimension | Score | Assessment — the format Jamie endorsed): Traction, GTM, Technology (delivery), Exit. **Technology splits deliberately**: defend-it evidence (TRL/wrapper/replicability) renders in Signal 4; ship-it risk renders here; the 0–5 score prints once, here.
4. **Founder Claims Reconciliation** stays (Decision 10), positioned after the signals as evidence — conditional promotion to the verdict block when the cap fires.
5. **Flags** and **Diligence Questions & Next Actions** unchanged in substance; next-actions line now includes who to engage / what to request.
6. **Deal-team appendix** absorbs the machinery: Triage Carry-Forward + mapped baseline, the 13-row Score Summary with deltas (kept — it enforces the explained-divergence rule and the conversion-rubric audit trail; not deleted, just de-membered), scoring arithmetic, and Sources.

**What did NOT change:** all scoring mechanics — Q1–Q8 rubrics, weights, Scout Conviction /19, Thesis Fit /45, the conversion rubric, Step 4c, the Citation Contract. This is a rendering-layer decision only. Files: `scout-questions.md` (report-format section → Signal-First v2 + dimension→home map), `scout.md` (Steps 6/6b), CLAUDE.md Output Depth row. Validation case: SecureG report regenerated in v2 format (July 16, 2026), v1 file marked superseded. Plugin v3.3.0 (arch v0.43.0). No MCP changes — no reinstall required.

---

### Addendum — v2.1 analyst-voice rendering rules (July 16, 2026, plugin v3.4.0)

Jamie's second-pass review of the v2 SecureG report ratified the voice layer ("think like a seasoned analyst — synthesis, not a dissertation"):

1. **Analyst-voice rule (binding):** every sentence in a synthesis cell must (a) make a judgment, (b) state the single fact it stands on, or (c) name what it means for the deal; insight sentence first, ≤ 60 words; findings demote to agent briefings/appendix.
2. **Six Signals render as a 3-column table** (# · Signal | Verdict · Score | Synthesis) for scanning; per-signal "Probe next" lines removed — all probes route to Diligence Questions (one home).
3. **Signal 3 Team leads with the highest structural signal** (e.g., institution-conceived/hired leadership vs founder-born) before fit and gaps.
4. **Execution & Path opens with a mandatory GTM Model line** — name the model, then its consequences given the deal's other facts.
5. **Verdict-block relabel:** "Conviction (what the research supports)" and "Criteria Fit (does it fit what NWA funds)"; the standing Dual-Score-Read row replaced by a divergence note printed only when the scores disagree by more than one band.
6. **Appendix B2 · Supporting reads** absorbs TAM/SAM/SOM numbers, macro one-liners, moat two-tests, replicability timings, and Q7/Q8 posture lines.

Validation: SecureG report regenerated in v2.1 (July 16). Files: scout-questions.md, scout.md. Plugin v3.4.0 (arch v0.44.0). No MCP changes.

---

## Decision 12 — Rubric Fidelity Amendment: Source-Tier Rule, Identity-Match Standard, Confidence-Gated Compound Rule, Moat Sufficiency Test

**Date:** August 26, 2026
**Trigger:** Two independent Claude Project screens of the same venture (Constellation X), same inputs, produced opposite PRELIMINARY CALLs — one DECLINE, one ADVANCE — surfaced by Jamie for reconciliation. A colleague's parallel V13 sandbox Project and Jamie's produced diverging Team verdicts (WEAK/SPLIT vs. MIXED/UNCONFIRMED) on the same CTIO commitment question.

**Root cause:** the divergence was not six independent errors — it was one ambiguous evidentiary call sitting directly on the compound rule's zero-tolerance junction. V13's existing team-configuration language required SPLIT evidence be "corroborated by at least one independent source" but never defined *independent*: three data-broker/aggregator listings (Wiza, Aeroleads, RocketReach) that likely scrape the same upstream record were read by one session as three sources, by the other as unconfirmed. A soft judgment call that should have shaded conviction instead flipped the verdict outright. A live pipeline-vs-sandbox comparison run on the same venture then surfaced a second, independent gap: the Moat WEAK-vs-MODERATE boundary has no defined test, and diverged 2-of-3 across all runs on identical evidence (no IP, thesis-only network effect, Goliath FLAGGED).

**Decision:** designed and validated against the Constellation X case in the Claude V13 sandbox first (`docs/reference/Gemini/Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md`, Amendments 1–2; `Rubric_Fidelity_Addendum_v1.md`), then ported into the canonical pipeline (`gates-and-flags-techgroup.md` v3.0 → v3.1, `screen.md`):

1. **Source-Tier Rule (Signal 3)** — sources classify as Tier 1 (primary: LinkedIn, company team page, press, filings, conference bios, GitHub) or Tier 2 (aggregator/data-broker: RocketReach, Wiza, Aeroleads, ZoomInfo, Apollo, Crunchbase auto-pages). All-Tier-2 findings in one search pass count as ONE source regardless of domain count and cannot alone satisfy "independent corroboration."
2. **Identity-Match Standard (Signal 3)** — name + city alone never confirms an outside record is the same person as a named founder; requires shared employment history, a cross-linked profile, a shared photo, or direct company confirmation. Unconfirmed → UNCONFIRMED ⚠️, never SPLIT.
3. **Confidence-Gated Compound Rule** — an adverse vote tagged UNVERIFIED cannot alone satisfy the compound-rule DECLINE trigger; at least one adverse signal in the compound must carry PARTIAL or VERIFIED confidence, or the call downgrades to WATCH.
4. **Moat Sufficiency Test (Signal 4)** — MODERATE or STRONG requires naming a specific affirmative asset (filed/pending IP, an accumulating proprietary data asset, a network effect with evidence it's operating, or a switching-cost depth the flagged incumbent(s) structurally lack) that survives the flagged Goliath(s); no nameable asset, or two-plus negative tags stacking (no IP, Wrapper MOD/HIGH, Goliath FLAGGED, Memory Lock-in thesis-only/absent), prints WEAK.
5. **Fixed founder-identity query set** (4 queries, run in full — not stopped at first hit) and a **fixed 5-pair coherence diff-list** (funding status vs. stated investment · traction vs. forecast · team size vs. ambition · deck terms vs. form terms · named pilots vs. named references) — both replace open-ended instructions that had let search nondeterminism and inconsistent coherence checking contribute to the divergence.

Calibrated Rules Ledger extended 18 → 22 (new rules 19–22 cite this decision).

**Validation:** applying all four fixes to Constellation X converges the Team read to MIXED/UNCONFIRMED (matching 2 of 3 prior runs) and the Moat read to WEAK with a named reason (no affirmative asset survives Peregrine/Axon Fusus/Motorola Vigilant), producing PRELIMINARY CALL: WATCH — a reproducible result instead of an artifact of which session ran it.

**What did NOT change:** no signal weight, no verdict-tier definition, no gate, no compound-rule trigger structure. This is an evidentiary-rigor layer, not a rubric redesign.

**Open risk, not yet addressed:** the same class of undefined bottom-tier boundary could exist for Market (WEAK/MODERATE) and Agent-Era (THREATENED/RIDING) — neither has produced a live divergence yet, but neither has been tested against one either. Discontinuity already has an equivalent naming test (DIFFERENTIATED requires naming the edge, or it's INCREMENTAL).

**Incidental fix:** `scripts/repackage-plugin.sh`'s plugin.json description update used a `sed` character-class substitution that produced invalid JSON whenever the existing description contained an embedded quote — found to have been silently corrupting `plugin.json` since at least v3.4.0. Replaced with a JSON-aware Python update; `plugin.json` repaired and validated. Unrelated to the rubric fix; caught while repackaging this change.

Files: `gates-and-flags-techgroup.md` (v3.0 → v3.1), `screen.md`, `scripts/repackage-plugin.sh`. Plugin v3.4.1 (arch v0.45.0). No MCP changes — no reinstall required.

---

*Last updated: August 26, 2026 | Maintained by Jamie, TechGroup Co-Chair*
*This log is a living document — add entries when key decisions are made in session.*
