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

The Claude V13 sandbox program (`docs/reference/ClaudeProjects/`, V10→V13 lineage) proved a different Screen-stage judgment model: qualitative signal verdicts with weighted conviction mechanics instead of numeric 30/25 scoring. The 4-deal regression back-test was ratified (verdict invariance against the pipeline's historical calls), two live pitches (Ivee, AgTechLogic) ran on it, and the Craft Investing thesis — *surface the key signals that let a craftsman form conviction; don't replace judgment with a number* — was promoted to canonical (`docs/strategy/future-of-venture-investing/NWAi-Craft-Investing-Thesis-2026-06.md`). This decision installs that model into the pipeline.

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

**Decision:** designed and validated against the Constellation X case in the Claude V13 sandbox first (`docs/reference/ClaudeProjects/Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md`, Amendments 1–2; `Rubric_Fidelity_Addendum_v1.md`), then ported into the canonical pipeline (`gates-and-flags-techgroup.md` v3.0 → v3.1, `screen.md`):

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

## Decision 13 — Ask-at-Scout Precedence Check

**Date:** August 26, 2026
**Trigger:** A fourth live screen of Constellation X — run in a live Claude Project on the Decision 12 fixes (Source-Tier Rule, Identity-Match Standard, Moat Sufficiency Test) — printed **PRELIMINARY CALL: ADVANCE TO SCOUT**, despite its own signal roll-up line stating "1 of 5 weighted signals adverse — Moat." Jamie flagged this for reconciliation immediately after Decision 12 shipped, as a further test of whether the fix was complete.

**What worked (validation of Decision 12):** the two signal-level fixes performed exactly as designed. Team correctly read MIXED/non-adverse — the CTIO having *zero* discoverable public footprint was correctly treated as a live, Scout-answerable question rather than SPLIT. Moat correctly read WEAK, with the basis built explicitly on the Moat Sufficiency Test: no affirmative asset (no IP, Bedrock orchestration not proprietary, thesis-only network effect with two customers) survives contact with the flagged Goliath (Peregrine). Both matched the pipeline comparison run from Decision 12 almost exactly.

**Root cause of the new failure:** the Ask-at-Scout rule's precondition — "no other weighted signal is adverse" — existed in prose but nothing forced it to be checked before the rule's ADVANCE shortcut fired. The report's own roll-up already named Moat adverse, and neither Traction Lift (the Commercial Proof line was explicitly Unverified/stalled, not exceptional-verified) nor Ask-at-Scout (Moat's WEAK read is a structural finding, not a commitment/role-clarity/terms-discrepancy question a phone call can resolve) actually qualified as an exception to the compound rule's default WATCH. The model appears to have treated the Team gap's call-answerability as sufficient on its own, without cross-checking that a second, independently adverse signal was already on the board. This is a distinct fragility class from Decision 12: not a bad *signal read*, but a *verdict-assembly order-of-operations* error — one level downstream of where the prior two guardrails operate.

**Decision:** designed and validated in the Claude V13 sandbox first (`Claude-V13-Investor-Nuance-NWA-TechGroup-AI-Screener.md`, Amendment 3), then ported into the canonical pipeline (`gates-and-flags-techgroup.md` v3.1 → v3.2, `screen.md`):

1. **Ask-at-Scout Precedence Check (Calibrated Rule 8a)** — compute the full signal roll-up FIRST, before considering Ask-at-Scout at all. Ask-at-Scout is a narrowing of the zero-adverse-signals case, never an independent path that can override an adverse finding on a different signal. Self-check: "Does the printed roll-up line say zero adverse signals?" If it names any signal as adverse — even one, even if a different signal's gap feels like "the" open question — Ask-at-Scout does not apply, and WATCH (or DECLINE, per the compound rule) governs; the Scout-answerable gap becomes part of the re-engage condition instead of a reason to skip WATCH.

**Validation:** re-applying the check to the triggering case — Moat adverse, Team non-adverse, no earned traction lift — correctly forces WATCH, matching the Decision 12 pipeline comparison run.

**What did NOT change:** no signal weight, no verdict-tier definition, no gate, and not the compound rule itself — this fix governs the gate that decides whether Ask-at-Scout is even allowed to run.

**Open risk, still not addressed:** Decision 12's flagged gap (Market and Agent-Era bottom-tier boundaries) remains open. This decision adds a further standing question: are there other order-of-operations shortcuts in the Verdict Block assembly (Traction Lift, Fix-Forward Test) that carry a similar unchecked precondition? Not yet audited.

Files: `gates-and-flags-techgroup.md` (v3.1 → v3.2), `screen.md`. Plugin v3.4.3 (arch v0.47.0). No MCP changes — no reinstall required.

**Validated (2026-08-26).** A fifth screen (Verdict 5), run in the same Claude Desktop chat thread as Verdict 4, reproduced ADVANCE despite an adverse-Moat roll-up — initially read as the fix not holding. A sixth screen, run with identical instructions in a **fresh claude.ai chat**, correctly produced WATCH/MEDIUM. Root cause of the Verdict 5 false alarm: continuing in the same chat thread let the model anchor to its own prior "ADVANCE" conclusion from Verdict 4 rather than genuinely re-deriving the call from the updated rule — not a failure of the Ask-at-Scout Precedence Check itself. **Standing testing practice going forward: validate a rubric/instruction change in a fresh chat thread, never a continued one** — a continued thread cannot distinguish "the fix didn't work" from "the model is anchoring to its own prior answer." Confirmed closed.

---

## Decision 14 — V15 Judgment Re-Sync (Phase 1a): Pipeline Becomes the Single Source of Truth

**Date:** October 29, 2026
**Trigger:** The coordinator screener in `docs/reference/ClaudeProjects/` is a lightweight Claude Project copy of the Screen stage for NWA coordinators. Through sandbox testing (V14 Traction Discipline → V15 Plain-Language Rev A) it evolved judgment rules this pipeline never received, so the two had forked. Jamie directed a surgical re-sync from the coordinator screener into the pipeline Screen — **not** an adoption of the coordinator screener's architecture — and set the governing direction for the future.

**Governing rule (Path B):** the **pipeline is the source of truth.** This decision catches the pipeline up from the coordinator screener once. From now on the coordinator screener is rebuilt *from* the pipeline, never the reverse. The ClaudeProjects folder remains a testing sandbox: ideas are trialed there, adopted into the pipeline, then flowed back to the coordinator screener.

**Sequence this decision opens** (one change set per regression, so any verdict movement is attributable):
- **1a** — judgment rules (this decision)
- **1b** — coordinator presentation and content into the pipeline Screen as a two-layer report: a plain-language member read plus a deal-team appendix that preserves the machine-readable fields Scout and the conversion rubric consume
- **2** — integrated AI thesis (Option 5) Screen changes
- **3** — Option 5 Scout and Diligence additions
- **4** — Option 5 return model, after the IC decides
- **5** — rebuild the coordinator screener from the pipeline

**What changed** (`gates-and-flags-techgroup.md` v3.2 → v3.3; `screen.md`). Rules only; no presentation change:
1. **FRAGILE revenue tier** (V14). Revenue quality is now STICKY / STAGNANT / FRAGILE / PRE-REVENUE. FRAGILE requires revenue from the product itself; grants, incidental services, or signed-but-unbilled agreements alone are PRE-REVENUE.
2. **Thin Commercial Proof cap** (V14). PRE-REVENUE or FRAGILE caps Triage Conviction at MEDIUM, unconditionally. It is a cap only, never an adverse vote, and never blocks ADVANCE. The Concern line names the stage.
3. **HIGH conviction bar.** All three Team lines must be at the top tier, and the company must not be PRE-REVENUE or FRAGILE.
4. **Team rated on three lines** (V15): Committed / Product Fit / Market Fit.
   - The lowest line sets the rating, and Team confidence comes from that line.
   - The UNVERIFIED cap applies per line.
   - Pipeline labels are kept (STRONG / MIXED / WEAK; FULL-TIME / UNCONFIRMED / SPLIT).
5. **Market Fit WEAK ("no path to the buyers")** is a new adverse path for Team. It requires affirmative evidence; thin backgrounds are MIXED.
6. **Track Record is unrated** and never moves the Team rating. A concerning record becomes a ⚠️ flag and a Live Pitch question.
7. **Non-CEO/CTO co-founder carve-out:** a verified outside role means UNCONFIRMED + ⚠️, never SPLIT.
8. **Academic founder** counts as Product Fit evidence; a professor-CEO is Committed UNCONFIRMED at most.
9. **Agent-Era posture judged on the product as built** (V15 Rev A, from the Complete Contract Cycle regression).
   - The four postures are categories, not a scale.
   - "Product form" means how value is delivered and charged, not the UI surface.
   - A surviving need in an absorbable product form reads THREATENED.
   - ENABLING tests the product's form.
   - Posture never asks who wins the demand (that is Moat's job).
   - Screen only; see follow-ups.
10. **Claim discipline extended to every fact** (V15 Rev A, from Reverent run 2).
    - Single-source and aggregator claims are marked (unverified) everywhere they appear.
    - Company assertions are marked (company claim).
    - Conflicting sources are stated as a conflict.

**Ledger:** Calibrated Rules 23–28 added; rules 10, 11, 12 and 21 amended.

**Conversion rubric:** v1.0 → v1.0.1. D5 maps FRAGILE like STAGNANT (cap 2); no other value changed.

**What did NOT change:** weights, gates, the compound rule, the Confidence-Gated Compound Rule mechanism, Moat Sufficiency, Protect Alpha, Ask-at-Scout and its Precedence Check, research steps, the report structure, and the workflow (.docx, Dealum, hand-off to Scout). The coordinator screener was not edited.

**Regression.** Method:
- Blind re-screens in fresh, independent sessions.
- Inputs limited to pitch-stage materials in the archived data rooms (post-screen transcripts and prior reports excluded).
- A matched control on the committed v3.2 screener with identical inputs.

| Deal | Decision 9 baseline (July) | v3.2 control | v3.3 (this decision) |
|---|---|---|---|
| Captain Compliance | ADVANCE / MEDIUM | WATCH / MEDIUM | WATCH / MEDIUM |
| Summit Technology Laboratory | ADVANCE / MEDIUM | WATCH / MEDIUM | WATCH / MEDIUM |
| Synergist Technology | ADVANCE / MEDIUM | WATCH / MEDIUM | WATCH / MEDIUM |

- **Phase 1a caused zero verdict changes** (v3.2 = v3.3 on identical inputs).
- The new rules fired as designed: FRAGILE recognized (STL, Synergist), the Thin Commercial Proof cap, Team = lowest line, Agent-Era with no hedged hybrids, and consistent claim marking.

**Baseline update (accepted by Jamie):** the July ADVANCE baseline no longer holds under the August screener. In all three deals, Moat reads WEAK under the v3.1 Moat Sufficiency Test (Decision 12), and the v3.2 Precedence Check (Decision 13) then blocks Ask-at-Scout. **Jamie accepts the stricter moat test as correct** (cookie consent, projector calibration, and AI monitoring against Microsoft are genuinely thin moats), and notes that the integrated AI thesis makes the moat test stricter still. **WATCH / MEDIUM ×3 is the new back-test baseline**, not an open issue.

**Clarifications added after the regression** (both closed boundary ambiguities the runs exposed; neither affected any call):
- FRAGILE requires product revenue.
- Agent-Era "product form" means the value-delivery mechanism, not the UI.

**Follow-ups logged (not done here):**
- Apply the product-as-built rule to `agent-era-readiness-framework.md` so Scout (Q7) and Diligence (Tier 3) read posture the same way.
- Minor screener ambiguities surfaced by the runs, for a later tidy-up:
  - the "three searches" wording vs. the per-founder fixed query set;
  - which data-room files count as screen-stage inputs;
  - who counts as a "named founder" when roles are unclear;
  - the Wrapper tag for non-AI software;
  - whether a contracted distribution channel can qualify under Moat Sufficiency (current reading: no — distribution is a channel play).
- Reverent and Complete Contract Cycle fidelity runs skipped: their pitch materials are not in the repo.

Files: `gates-and-flags-techgroup.md` (v3.3), `screen.md`, `screen-scout-conversion-rubric.md` (v1.0.1), `CLAUDE.md`, `nwai-techgroup-pipeline-architecture.md` (v0.48.0). Plugin v3.5.0. No MCP changes — no reinstall required.

---

## Decision 15 — Two-Layer Screen Report (Phase 1b): Plain-Language Member Read + Deal-Team Appendix

**Date:** October 29, 2026
**Context:** Second step of the Path B re-sync (Decision 14). Members prefer the printed format of the coordinator screener V15: plain language, stars, a summary table, and the What They Do block. Phase 1b ports that format and content (drift types 2a and 3) into the pipeline Screen. V15's tool form (a single paste-in prompt with no .docx or Dealum) is not ported.

**Jamie's decisions:**
1. Plain signal names appear in the member read; framework names stay in the appendix; Scout and Diligence are unchanged.
2. The appendix comes at the end of both the chat report and the .docx, outside the 2-page cap.
3. (X) / (!) markers are used everywhere; no emoji, since emoji break in PDF.
4. The Stage "(verified)" standard applies: verified means confirmed outside the company's own materials.
5. The Track heading is printed in plain words; Track A/B is kept in the appendix.

**What changed:**
- **`screen.md` Step 8 (rewritten)**, ported from V15's Reader Standard, Brevity Contract, Output Structure, Verdict Block, What They Do, Gates, Six Signals and Printed Rendering, Deal Facts and Risk Flags:
  - **Report order:** fixed title → Verdict Block ("Signals against the deal: N of 5", plus one plain cap/lift sentence) → What They Do (who gets the value, who pays, Stage, The Ask) → Six Signals (summary table with stars and a Source column, then short blocks) → Gates (plain names, PASS / PASS (!) / FAIL) → Deal Facts → Risk Flags → footer → **Deal-Team Appendix**.
  - **Printed vocabulary:** stars render the verdict tier only. One star always and only means the signal counts against the deal, and one-star verdicts use fixed wording. AI-Agent Future uses four fixed captions.
  - **Appendix contents:**
    - Track
    - all six internal verdicts with confidence
    - Team lines and the line that set the rating
    - the full Commercial Proof line
    - Moat evidence tags, plus the named moat asset or nascent element
    - Blue Ocean read
    - gate statuses
    - Protect Alpha read and flags
    - roll-up, caps and lifts
    - coherence findings
    - a name key
- **`screen.md` Step 9 (.docx):** mirrors the new layout. Stars use a symbol font; the appendix starts on a new page.
- **Self-check:** rebuilt for the new format.
- **`gates-and-flags-techgroup.md` v3.3 → v3.4:**
  - A "Printed vocabulary" note: internal labels govern judgment and print in the appendix.
  - Brevity caps updated: Moat ≤ 40 words; Team in four lines of ≤ 20 words.
  - Protect Alpha prints in the appendix, not the member roll-up.
  - The Gate-FAIL short form now matches `screen.md`.
- **`scout.md` Step 1b:** reads the machine fields from the appendix, and The Ask and Stage from the member read. It still accepts pre-v3.4 reports, including both emoji and (!) / (X) markers.
- **`screen-scout-conversion-rubric.md` v1.0.1 → v1.0.2:** source pointers only — the appendix, The Ask (R1), Stage (R2), and the appendix moat-asset line (D4). **No mapping value changed.**

**What did NOT change:** any judgment rule, weight, gate, verdict definition or conviction mechanic; the research steps; the workflow (.docx filename, Dealum, hand-off to Scout); and the Scout report format.

**Regression:** blind, fresh-session re-screens with the same inputs as Decision 14.

| Deal | Result |
|---|---|
| Captain Compliance | WATCH / MEDIUM |
| Summit Technology Laboratory | WATCH / MEDIUM |
| Synergist Technology | WATCH / MEDIUM |

- **No verdict moved.** Every internal signal tier matched the 1a runs.
- **Rubric resolution:** D1–D5 and R1–R4 resolved from the appendix and What They Do alone.
- **D4:** the regression showed it needed a named-asset field. The "Moat asset named / nascent element" line was added and the rubric pointed at it.
- **V15 side-by-side (Captain Compliance):** V15 itself gave the same call and the same signal verdicts and stars, with matching structure and wording conventions.
- **.docx render check:** the layout and the Verdict callout render correctly, and the stars display as glyphs.

**Small fixes added from the regression:**
- the moat-asset and coherence-findings lines in the appendix;
- the protect-the-edge question becomes a re-engage item on WATCH;
- the Revenue-so-far punctuation;
- the Source rule for the unrated Track Record row.

**Logged, not changed** (mostly pre-existing, surfaced by the runs):
- The rubric's D5 has no handler for PARTIAL-confidence traction (only Verified / Unverified).
- Whether a document signed by a third party but found only in the data room (e.g., a countersigned contract) counts as "(verified)".
- No guidance for stale data rooms (screen date months after the documents).
- How to flag an LLC entity (not a gate).
- Protect Alpha N/A prints "Doesn't use outside AI" even when the model supply chain is merely unstated.
- Carried from Decision 14: search count vs. founder query set, "named founder" definition, Wrapper tag for non-AI products, and the Track rule when the customer supplies the hardware.

Files: `screen.md`, `gates-and-flags-techgroup.md` (v3.4), `scout.md`, `screen-scout-conversion-rubric.md` (v1.0.2), `CLAUDE.md`, `nwai-techgroup-pipeline-architecture.md` (v0.49.0). Plugin v3.6.0. No MCP changes — no reinstall required.

---

## Decision 16 — Evidence and Wording Clarifications (pre-Phase 2 tidy-up)

**Date:** October 29, 2026
**Context:** The Decision 14 and 15 regression runs surfaced ambiguities in how the Screen reads evidence. Jamie directed that they be fixed before Phase 2.

**Jamie's rulings:**

| # | Question | Ruling |
|---|---|---|
| 1 | D5 traction at PARTIAL confidence | Cap at 4 |
| 2 | Documents executed by a third party | Count as outside evidence, for the fact they prove |
| 3 | Stale-materials threshold | 90 days |
| 4 | Decision 14 wording carry-overs | Fix in this batch |

**What changed** (`gates-and-flags-techgroup.md` v3.4 → v3.5, Calibrated Rules 29–33; `screen.md`; `screen-scout-conversion-rubric.md` v1.0.2 → v1.0.3):
1. **Third-party documents (rule 29).**
   - A countersigned contract, attestation letter, or signed lead term sheet is outside evidence of what it proves, even when supplied in the data room.
   - A countersigned reseller contract verifies the contract; it does not verify revenue from it.
   - Company-authored material stays a claim.
2. **Stale-materials check (rule 30).**
   - Applies when the newest pitch material is more than 90 days older than the screen.
   - The report prints "(!) Materials dated [month]" and records the date in the appendix.
   - Dated milestones that have already passed become questions, never evidence.
   - The check never changes a tier by itself.
3. **Not yet a C-corp (rule 31).** The Entity gate passes. The report prints a (!) "Not yet a C-corp — conversion needed before NWA invests" flag and adds a question or re-engage item.
4. **Definitions (rule 32).**
   - "Three searches" means three search topics.
   - "Named founder" means anyone called a founder or co-founder, plus the CEO and CTO, plus any 10%+ holder with a current or past operating role.
   - Wrapper reads N/A only when the product is confirmed not to use an LLM, and "not stated" when that is unknown. Neither counts as a negative.
   - Track B applies only when the company itself ships the hardware.
   - Protect Alpha N/A splits into "confirmed" ("Doesn't use outside AI") and "not stated" ("AI use not stated", which also raises a question).
5. **Rubric D5.** Revenue at PARTIAL confidence caps at 4.
6. **Moat Sufficiency wording.** The text now states that both prongs apply independently: naming an asset type is necessary for MODERATE but not sufficient when two or more negatives stack. This records the Decision 14 acceptance; it does not change behaviour.

**Regression (v3.5, fresh blind sessions, same inputs):**

| Deal | Result |
|---|---|
| Captain Compliance | WATCH / MEDIUM |
| Summit Technology Laboratory | WATCH / MEDIUM |
| Synergist Technology | WATCH / MEDIUM |

- **All calls held.**
- **The new rules fired as designed:**
  - Rule 29 verified the CDW and Panasonic contracts and the hosting attestation as documents, not as revenue or authorization.
  - Rule 30 fired on all three deals (6–8 months stale), and expired milestones became questions.
  - Rule 31 flagged the Synergist LLC.
  - Rule 32 applied the definitions.
- **Run-to-run variation on non-adverse tiers** (STL Disruption INCREMENTAL↔DIFFERENTIATED; Synergist Market STRONG↔MODERATE) moved no call. It is consistent with the still-open Market boundary noted in Decision 12.
- **Rubric v1.0.3:** every dimension resolved.
- **No re-run for the two final fixes** (Wrapper "not stated", 10%-holder founder rule). Both were added after the regression from its findings. Neither can create an adverse vote: they only remove a negative tag or widen the search.

**Ruling added October 30, 2026 (Calibrated Rule 33):** press or interviews repeating founder-reported figures count as **PARTIAL** (the claim is on the record) and never as VERIFIED. They never qualify traction for the lift on their own; VERIFIED requires a source with an independent basis. Jamie agreed with the analyst recommendation: the figure's origin is still the founder, the traction lift is the one mechanism that can offset an adverse signal, and Decision 10 (RootCause.ai) is the precedent. No regression impact — all three v3.5 runs already applied this reading (Captain Compliance stays WATCH/MEDIUM).

**Logged, not changed:**
- How to date "newest material" when no deck is present.
- Whether the gate's TAM test reads the category or the company's slice of it.

Files: `gates-and-flags-techgroup.md` (v3.5), `screen.md`, `screen-scout-conversion-rubric.md` (v1.0.3), `CLAUDE.md`, `nwai-techgroup-pipeline-architecture.md` (v0.50.0). Plugin v3.7.0. No MCP changes — no reinstall required.

---

## Decision 17 — Option 5 Phase 2, Narrowed to the Patent Fix

**Date:** October 30, 2026
**Context:** Phase 2 of the Path B re-sync (Decision 14) was scoped as three Option 5 Screen changes, taken from §5 items 3–5 of the thesis reconciliation note:
1. software patents and domain knowledge are head starts, not moat assets;
2. a 90-day "frontier model plus motivated team" copy test;
3. a headless-incumbent test (the incumbent's private data plus a general agent).

**Jamie's ruling: narrow Phase 2 to change 1.** The higher-altitude review found three things:
- All three changes land in Signal 4 (Moat), the fourth-weighted signal. The v3.1 Moat Sufficiency Test already catches most of what they target.
- Changes 2 and 3 can't be answered from three searches. Under screen-stage humility they would mostly print as Live Pitch questions anyway.
- Option 5's weight sits downstream, in Scout, Diligence and the return model.

Change 1 is different. It is a **conflict, not a gap**: the Screen credited filed or pending software IP as a moat asset and counted "no IP" as a negative tag, which is the opposite of the thesis.

**What changed** (`gates-and-flags-techgroup.md` v3.5 → v3.6; `screen.md`):
1. **Head starts (Track A, Calibrated Rule 34).**
   - Software patents (filed, pending, granted, or licensed in), founders' domain knowledge, and code or features are head starts, not moat assets.
   - They are never the named Moat Sufficiency asset, never count toward STRONG, and never fill the nascent element.
   - They print on a new appendix line, "Head starts". Domain knowledge stays Team evidence.
2. **Track-split negative stack (rule 22 amended).**
   - Track A: {Wrapper MOD/HIGH, Goliath FLAGGED, Memory Lock-in thesis-only/absent}.
   - Track B is unchanged: {no IP, Goliath FLAGGED, Memory Lock-in thesis-only/absent}. Filed or pending IP still qualifies on Track B.
   - Rationale: if holding a patent no longer helps a Track A moat, lacking one can't hurt it.
3. **The Blue Ocean read** notes that a software patent or domain knowledge alone is a head start.
4. **Live Pitch question categories** add the 90-day and headless-incumbent probes as **optional questions only**: no tag, no effect on any verdict.
5. **`screen.md`:** the adverse summary, the appendix "Head starts" line, the self-check amended (Moat Sufficiency), and a new self-check (Head starts).

**Why it matters for future pitches.** The change has two halves:
- **Strict half (patents stop counting as an asset):** this rarely changes an outcome.
- **Lenient half (removing "no IP" from Track A):** this is the one that matters. Under v3.5, a software startup with no patents and a flagged incumbent (the common case) read Moat WEAK automatically, even with a verified, accumulating data asset. That penalized exactly the companies Option 5 favors.

**Regression:**

| Case | Method | v3.5 | v3.6 |
|---|---|---|---|
| Captain Compliance | Paper check on the recorded v3.5 tags | WATCH / MEDIUM (Moat WEAK: no IP + Goliath + Memory absent) | WATCH / MEDIUM (Goliath + Memory absent = 2) |
| Summit Technology Laboratory | Paper check | WATCH / MEDIUM (patents named; Goliath + Memory absent) | WATCH / MEDIUM (patents move to head starts; same 2 negatives) |
| Synergist Technology | Paper check | WATCH / MEDIUM | WATCH / MEDIUM (Goliath + Wrapper MOD + Memory thesis-only = 3) |
| BleedIO Tech | Fresh blind v3.5 run + paper check | WATCH / MEDIUM (Moat WEAK: Goliath + Memory thesis-only; pending patent unverified) | WATCH / MEDIUM (pending patent moves to head starts; same 2 negatives) |
| Fernhollow Analytics (synthetic) | Fresh blind matched pair | **WATCH / MEDIUM**: Moat WEAK on no IP + Goliath, despite a named, contract-verified data asset | **ADVANCE / HIGH**: Moat MODERATE (one negative; data asset named), 0 adverse |

**How the runs were done:**
- **Paper check:** a full re-run was unnecessary. The change acts only on the recorded Moat tags, so the arithmetic is deterministic. Unlike Decision 16's skipped re-runs, this change can create an adverse vote, so the BleedIO run and the Fernhollow pair were run live.
- **The synthetic case:** Fernhollow is a fictional Track A company built to exercise the lenient half. It has:
  - a verified, contracted, accumulating fault-label dataset;
  - no patents;
  - founders who name their domain experience as the moat;
  - a flagged Goliath.

  Search findings were supplied as a stub, so both runs saw identical evidence. Packet: session scratchpad (not committed).

**Results:**
- **The baseline holds:** WATCH/MEDIUM ×3. BleedIO, a live patent-led case, also holds.
- **The rule fired as designed on Fernhollow:**
  - v3.5 named the data asset and still read WEAK, on "no IP".
  - v3.6 removed "no IP" from the stack, read MODERATE, and put the founders' "45 years" on the Head starts line and into Team evidence.

**HIGH-conviction clarification (Jamie's ruling, added in v3.6).** The Fernhollow run exposed a pre-existing ambiguity. "A gap worth a Live Pitch question caps conviction at MEDIUM" could be read two ways:
- **Narrowly:** only a gap in one of the HIGH conditions caps.
- **Broadly:** any Live Pitch question caps, including a flagged Goliath.

The v3.6 run read it narrowly and printed HIGH. A fresh run could have read it broadly and printed MEDIUM. **Ruling: the narrow reading.** The gap that caps at MEDIUM is a gap in one of the HIGH conditions. A flagged big competitor, or another routine Live Pitch question, does not by itself block HIGH. The reasons:
- Under the broad reading HIGH is nearly unreachable, since Goliath is FLAGGED on most deals and every ADVANCE carries Live Pitch questions.
- It would also re-penalize a FLAGGED Goliath, which rule 3 says is never an adverse vote.

The sentence is added to the HIGH pattern guide and to `screen.md`. There is no back-test impact: all three baseline deals are MEDIUM for other reasons. The Fernhollow v3.6 run already applied this reading.

**Logged, not changed:**
- **Phase 3 follow-ups** (Scout and Diligence still credit patents and domain knowledge until then):
  - `diligence-scoring-rubrics.md` Tier 1 elements 4 (IP/patents) and 6 (vertical specialization);
  - `ai-moats-framework.md` l.118 (domain expertise "creates the moat");
  - `scout-questions.md` Team 5 anchor ("domain expert with prior exit") and the l.312 12–18-month window;
  - the `team-analyst.md` domain-expertise flag (l.202);
  - `technology-analyst.md` §3 IP and patents.
- **Deferred to Phase 3:**
  - the 90-day copy test (a "frontier model + motivated team" row in the Replicability Speed Matrix);
  - the headless-incumbent test (Scout Q5 and technology-analyst).
- **Rubric:** the conversion rubric is unchanged. D4 already reads the "nascent element" field, and head starts never fill it.
- **V15:** the coordinator screener was not edited. It is rebuilt from the pipeline in Phase 5.

Files: `gates-and-flags-techgroup.md` (v3.6), `screen.md`, `CLAUDE.md`, `nwai-techgroup-pipeline-architecture.md` (v0.51.0). Plugin v3.8.0. No MCP changes — no reinstall required.

---

## Decision 18 — Phase 3a Part 1: Patent Fix Carried Downstream + Data Durability

**Date:** October 30, 2026
**Context:** Decision 17 changed the Screen so that, on Track A, software patents and domain knowledge are head starts rather than moat assets. Scout and Diligence still credited both. Diligence Moat Tier 1 gave a point each for "IP / Patents" and "Vertical specialization — deep domain expertise". A deal could therefore advance at Screen on a data asset and then earn Diligence moat points for exactly what the Screen had rejected.

This decision closes that gap (Phase 3 item A). It also adds the data-durability tests the Screen change made more important (item D): the Screen now credits data over patents, so Diligence has to verify the data rights.

**Thesis status (Jamie):** Option 5 is internally aligned and used as a reference. The pipeline adopts selected applicable criteria from it. These changes are not contingent on any further approval.

**Scoring principle (Jamie):**
- Scales, weights, bands, thresholds and the conversion rubric stay fixed.
- What earns the points is swapped like for like.
- Everything else enters as unscored evidence.

**Jamie's rulings:**
1. **Data earns two Tier 1 points when it is real and durable.** Element 3 (the data exists and is growing) plus element 4 (Track A: the rights are durable). Element 4 requires element 3, so it is a depth point, not a duplicate.
2. **The element 6 rewrite applies to both tracks.** Founders' knowledge is never a company moat. Track B keeps IP / Patents as element 4.
3. **Diligence reads the Track** from the Screen Deal-Team Appendix. A deal screened before Track existed has its Track assigned at Diligence by the Screen's rule.
4. **No retroactive rescoring** of archived deals. The paper rescores below are recorded for calibration only.

**What changed:**
- **`diligence-scoring-rubrics.md`, Tier 1 (still 0–6, same bands, same ≥ 4/6 Advance threshold):**
  - **Element 3, Proprietary data:** the data must be already held and still growing; public or open-source data doesn't count.
  - **Element 4:** Track A → *Durable Data Rights*: contracted, more than one source, survives a single supplier's cut-off, and requires element 3. Track B → *IP / Patents*, unchanged.
  - **Element 6, Vertical specialization:** now a niche-specific production system built into the product and its data, not the founders' domain expertise.
  - **New head-starts note:** head starts earn no point.
  - **Tier 2, Training Data Moat:** gains durability wording. No point change.
- **`diligence.md`:** the Tier 1 instruction states the Track first. The Part C template relabels element 4 by Track and adds a "Head starts (no points)" line.
- **`scout-questions.md`:**
  - Team 5 "domain expert with prior exit" → "verified buyer access with prior exit"; Team 4 "strong domain background" → "strong verified market access".
  - Technology 5 "deep proprietary IP" → "deep proprietary layer" (patents count as the layer on Track B only).
  - Q3 gains an unscored **Data durability** read (DURABLE / FRAGILE / N/A).
- **`scout.md`:** Q3 instruction (the three required reads; head starts never the Primary Moat), B2 supporting reads, and the Technology line.
- **`ai-moats-framework.md`:**
  - Moat 3 l.118 now says the domain execution *built into the product* is the moat; founders' expertise is a head start.
  - Test 1 and Moat 1 add ❌ markers for fragile data (single-supplier, uncontracted, public or open-source).
  - "Classify" step: on Track A, patents, domain knowledge and code are head starts.
- **`dd-checklist.md` Folder 10:**
  - A software-patent head-start question: months of lead, and expiry within the hold.
  - A new **Data rights** block: sources, contracted rights, concentration, cut-off exposure, and licence terms against the exit.
- **`technology-analyst.md`:**
  - Patent classification (Track A head start with an estimate of months of lead; Track B moat evidence; flag patents expiring or lapsed within a 5-year hold). IP ownership gains a MIXED option.
  - New **Section 3b Data Rights** and a DATA RIGHTS output block (DURABLE / FRAGILE / UNKNOWN / N/A).
- **`team-analyst.md`:** the domain-years green flag is read as evidence of buyer access, a Team accelerant and not a company moat.

**Validation:**

*Paper rescore of Tier 1, calibration only (Track A for both):*

| Deal | Recorded | New criteria | DD Report Section 2 |
|---|---|---|---|
| STL | 3/6 — switching costs ✓, IP/patents ✓, vertical specialization ✓ (Weak) | 2/6 — switching costs ✓, vertical specialization ✓ (production calibration system built into the product); patents now a head start; no data asset, so element 4 ✗ (Weak) | 3 → 2 |
| Captain Compliance | 2/6 — switching costs (partial), vertical specialization (partial: insurance-channel positioning) (Weak) | 1/6 — switching costs only; channel positioning is distribution, not a production system (No Moat) | 2 → 1 |

Neither deal reached the ≥ 4/6 Advance threshold under either version.

*Live run on STL:* the revised technology-analyst (fresh session, web research plus three archived data-room files):
- **Patent classification:** read as a Track A head start of about 12 months (9–18). The reasons given:
  - competitors already claim patented auto-calibration on arbitrary surfaces, so the claims can be designed around;
  - the core methods are published;
  - the licensed UCI patents expire 2029–2034, and one appears lapsed.
- **Data rights:** N/A, grounded in the executed Panasonic contract's end-user licence, which leaves customer data with the customer.

Four wording gaps it surfaced were fixed in this batch:
- the months-of-lead wording for non-LLM engines;
- a flag for patents expiring within the hold;
- a MIXED IP ownership option;
- an N/A note for when contracts leave data with customers.

**Logged, not changed:**
- The technology-analyst return template carries "GitHub signals" and "Competitor replication estimate" inside the Alpha-AI Sovereignty block. This is pre-existing and looks misplaced; tidy up later.
- The Citation Contract has no clean tag for a search snippet whose page will not load (tagged Reported, single source).
- **Phase 3a part 2 (next):**
  - the headless-incumbent test in Scout Q5 and the technology-analyst;
  - the 90-day copy test as a sharpened replicability-matrix row. The matrix forbids a fifth row, so it replaces or sharpens an existing one.
- **Phase 3b:** model-cost economics in the pricing, forecasting and venture analysts.

Files: `diligence-scoring-rubrics.md`, `diligence.md`, `scout-questions.md`, `scout.md`, `ai-moats-framework.md`, `dd-checklist.md`, `technology-analyst.md`, `team-analyst.md`, `CLAUDE.md`, `nwai-techgroup-pipeline-architecture.md` (v0.52.0). Plugin v3.9.0. No MCP changes — no reinstall required.

---

## Decision 19 — Phase 3a Part 2: Headless-Incumbent Test + 90-Day Copy Check

**Date:** October 30, 2026
**Context:** Phase 3 item B. Decision 17 kept both tests out of the Screen, because three searches can't answer them. Scout and Diligence can, because they have research agents. Under the Decision 18 principle, both attach to existing slots: no new points, rows, or flags.

**Jamie's rulings:**
1. **Anchor clauses added at Scout Q5 scores 2 and 1.** This is a change to what earns the points; the scale is unchanged.
2. **Research home is the competitive-positioning-analyst**, which already researches incumbents. The technology-analyst proposed in the reconciliation note is not used.
3. **The 90-day test sharpens an existing Replicability Matrix row.** The framework forbids a fifth row, and the existing under-6-month Yellow Flag already covers a 90-day result.

**The gap:** every incumbent test asked whether a big player could *build* a competing product. None asked Ron's question. Does an incumbent own the *data* the product runs on? If it exposes that data to agents (API, MCP, an agent platform), a general-purpose agent can do the job with no product built.

**What changed:**
- **`scout-questions.md` Q5:**
  - A fourth required read: **Headless incumbent: EXPOSED / PARTIAL / CLEAR / N/A**, for the company's core segment, with Ron's question verbatim.
  - Score 2 adds "or a data owner already exposes its data to agents and the core job is plausibly agent-completable within 18 months".
  - Score 1 adds "or a general-purpose agent working on the incumbent's exposed data already does the core job".
  - A no-double-count line: Q7 Agent-Era asks whether agents absorb how the product delivers value; the headless read asks who owns the data. It is read in Q5 only.
- **`scout.md`:** the Q5 instruction includes the headless read.
- **`competitive-positioning-analyst.md` Section 3:**
  - Data-owner exposure is assessed for each incumbent.
  - A cross-incumbent headless read (EXPOSED / PARTIAL / CLEAR / N/A), with three read rules:
    - the data owner is the firm whose system holds the data, not the customer who pushes it;
    - a shipped public preview counts, and announced-only is PARTIAL;
    - read the company's core segment and never average across segments.
  - A Headless incumbent output line.
- **`ai-moats-framework.md` Replicability Matrix:**
  - "Funded startup competitor" becomes "Motivated team using frontier AI tools (funded startup)".
  - The row carries the 90-day check: *"Could this team rebuild most of the core in 90 days with frontier AI tools — and what would it still lack?"* What they would still lack goes in the Barrier cell; it is the moat statement.
- **`dd-checklist.md` Folder 4:** Ron's question and the 90-day check.

**Validation.** A live run of the revised competitive-positioning-analyst on Synergist (fresh session, web research plus three archived data-room files). The headless read came out **PARTIAL**:
- **The data owner is Microsoft.** Foundry holds the model traces; AFFIRM receives them only by customer push.
- **Commercial Azure:** Microsoft exposes the data through the Foundry MCP Server (public preview; continuous and trace evaluation tools), so a general agent can already do the monitoring job there.
- **Synergist's core federal segment:** Azure Government lists Foundry Evaluations as unavailable, and the federal compliance half of the job (OMB inventory, audit evidence, independent separation of duties) isn't produced by a general agent.

The run separated the headless threat (a customer's or CDW's own agent calls Microsoft's tools and bypasses AFFIRM, with no Microsoft product needed) from the build threat (Microsoft or ServiceNow shipping a competing product). It found that Synergist's federal edge is a timer set by Microsoft's Azure Government roadmap, not a moat. That is consistent with the back-test's Moat WEAK read. Three wording gaps the run surfaced (data-owner definition, preview status, segment split) were fixed in this batch.

**Logged, not changed** (pre-existing in the competitive-positioning-analyst):
- The incumbent threat scale mixes likelihood of acquisition with threat level ("LOW (will acquire)"), so channel partners and investors in rivals don't fit cleanly.
- The Section 8 "model supply chain" trigger is unclear for governance vendors.

**Next:** Phase 3b, model-cost economics in the pricing, forecasting, and venture analysts.

Files: `scout-questions.md`, `scout.md`, `competitive-positioning-analyst.md`, `ai-moats-framework.md`, `dd-checklist.md`, `CLAUDE.md`, `nwai-techgroup-pipeline-architecture.md` (v0.53.0). Plugin v3.10.0. No MCP changes — no reinstall required.

---

*Last updated: October 29, 2026 | Maintained by Jamie, TechGroup Co-Chair*
*This log is a living document — add entries when key decisions are made in session.*
