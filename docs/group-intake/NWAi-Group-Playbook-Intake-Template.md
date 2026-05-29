# NWAi Group Playbook — Intake Questionnaire

**Audience:** Group Chair (and Co-Chair) for MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup
**Purpose:** Provide the group-specific inputs needed to extend the NWAi Investment Intelligence plugin from TechGroup-only to all 6 NWAi groups under a single multi-group plugin.
**Time required:** ~60–90 minutes
**Companion file:** `NWAi-Group-Playbook-Intake-TechGroup-Reference.md` — TechGroup's fully populated answers, kept alongside this blank template as a worked example.

---

## How to Use This Document

The plugin separates **shared rails** (universal across all 6 groups — hard gates, NWA Filter, Readiness scoring, Scout questions, Diligence rubrics, DD Report format, Memo format, 7 of 9 agents) from the **group-specific playbook** (this questionnaire's output — Opportunity rubric, themes, moat lens, optional calibration, optional specialist agent).

You only fill in the playbook layer. The shared rails apply to your group automatically. Where a section is marked **(Optional)**, skip it if it does not apply — the universal default will take over.

For every section, look at the corresponding TechGroup reference answer first. That tells you the *level of detail* expected and the *format* the plugin will translate into a runtime reference doc.

When you finish, return this document to Jamie (TechGroup Co-Chair, NWA Investment Intelligence Platform). He'll translate the answers into a `gates-and-flags-<yourgroup>.md` reference file, a Themes & SMEs block in `CLAUDE.md`, an optional specialist agent file, and a Dealum tag binding.

---

## Section 1 — Group Identity

**What this is for:** Names the group, binds it to its Dealum tag, and gives a one-sentence investment thesis the plugin can echo back when the group is in scope.

**TechGroup reference:** Section 1 of `NWAi-Group-Playbook-Intake-TechGroup-Reference.md`

| Field | Your Answer |
|-------|-------------|
| Group name (full) | |
| Group acronym | |
| Dealum tag string (the literal tag value used to identify this group's deals in Dealum) | |
| Group Chair (name + role) | |
| Co-Chair (if any) | |
| One-sentence investment thesis for this group | |

---

## Section 2 — Funnel Calibration *(Optional)*

**What this is for:** TechGroup uses funnel calibration (~300 pitches per year, 2–3 Scout/Live Pitch slots per month) to tune its screening thresholds and prevent the screen from over-advancing. If your group does not run a fixed Scout/Live Pitch cadence — or your inbound volume is too low or too irregular to need calibration — **skip this section**. The universal Decision Logic (ADVANCE ≥ 20/30, WATCH 14–19, DECLINE < 14) will apply unchanged.

**TechGroup reference:** Section 2 of the reference file (uses TechGroup's actual numbers).

Fill out only if your group wants explicit calibration:

| Field | Your Answer |
|-------|-------------|
| Annual pitch volume (Dealum inbound, last 12 months — estimate is fine) | |
| Scout / Live Pitch capacity per month | |
| Target advance rate (% of inbound that should reach Scout) | |
| Historical funded-deal count, last 3 years | |
| One-line note on what these numbers imply for your screening posture (e.g., "tight — screen should kill 90%") | |

---

## Section 3 — Track Determination *(Optional)*

**What this is for:** Some groups bifurcate (or N-furcate) deals into tracks before scoring because the same Opportunity rubric does not fit all sub-types. TechGroup uses Track A (Software/AI/Cloud) vs. Track B (Hardware/Robotics/Physical Tech) because the Founder Advantage, Technical Maturity, and Unit Economics dimensions score very differently between software and hardware companies.

If your group's deals are homogeneous enough that one rubric works for all of them, answer "No" and proceed to Section 4 with a single rubric.

**TechGroup reference:** Section 3 of the reference file.

| Field | Your Answer |
|-------|-------------|
| Does this group bifurcate (or N-furcate) deals into tracks before scoring? (Yes / No) | |
| If Yes, list each track with: track name, primary revenue/product model definition, examples of deal types | |
| If Yes, mixed-play default rule (which track wins when a deal could go either way?) | |
| If No, confirm a single Opportunity rubric will apply to all deals in this group | |

---

## Section 4 — Opportunity Rubric (per Track)

**What this is for:** This is the heart of your group's playbook. It tells the plugin how to score the 6 universal Opportunity dimensions specifically for your domain. Each dimension is scored 0–5 (total = 30 pts), and the universal Decision Logic uses the same thresholds across all groups (ADVANCE ≥ 20, WATCH 14–19, DECLINE < 14, with Market Opportunity ≤ 2 sub-floor).

**TechGroup reference:** Section 4 of the reference file (provides Track A and Track B rubrics verbatim from `gates-and-flags-techgroup.md`).

You may **rename, replace, or re-anchor** any dimension to fit your domain. The universal defaults are listed below as starting points — feel free to override any of them. What matters is that your group ends up with 6 dimensions × 0–5 anchors, with at least one sub-floor rule.

### 6 Universal Dimensions (defaults — override as needed)

| # | Default Dimension | Default Question |
|---|-------------------|------------------|
| 1 | Structural Discontinuity | Is this riding a genuine, irreversible market shift? Why is now the right moment? |
| 2 | Market Opportunity ⚠️ SUB-FLOOR | Does the TAM credibly support venture-scale outcomes? Is the market growing? |
| 3 | Founder Advantage | Does this founding team have an earned right to win in this domain? |
| 4 | Defensibility | Can we see early seeds of a real moat, even at this stage? |
| 5 | Traction | Is there evidence of real customer pull, not just founder push? |
| 6 | Venture Economics | Is there a credible path to a venture-scale outcome that returns 10x for NWAi? |

### Fill out per Track (duplicate this block for each track if you have more than one)

#### Track Name: ____________________

For each of the 6 dimensions, provide:
- **Dimension name** (use the default above or rename for your domain)
- **What the dimension measures** (1–2 sentence description)
- **Sub-floor or hard cap rule** (if applicable — e.g., "score ≤ 2 = DECLINE regardless of total")
- **Scoring anchors at 5 / 4 / 3 / 2 / 1 / 0**

Format for each dimension:

```
### Dimension N — [Name]
What it measures: [1–2 sentences]
Sub-floor / hard cap: [Rule, or "None"]

- 5: [Anchor]
- 4: [Anchor]
- 3: [Anchor]
- 2: [Anchor]
- 1: [Anchor]
- 0: [Anchor]
```

(Repeat for Dimensions 1 through 6.)

---

## Section 5 — Group-Specific Filters / Flags / Caps

**What this is for:** TechGroup applies several non-negotiable filters during screening that *cap* an Opportunity score regardless of how the rest of the dimension reads (AI Wrapper Cap → Defensibility ≤ 2/5; TRL < 5 → deal-stopper; Hardware Last Mile failure → cap on Founder Advantage). These are how a group encodes its hard-won pattern recognition into the screen.

Your group probably has 2–5 of these. Examples to prompt thinking — **not prescriptive**, only suggestive:

- **Medical:** FDA pathway gate (510(k) vs. PMA — affects time to revenue), clinical-data ownership cap (does the company own its outcomes data?), reimbursement-pathway flag (CPT code or no?)
- **Space:** ITAR / dual-use export gate, anchor-customer government dependency flag (>50% revenue from one government customer?), launch-cadence dependency cap
- **Consumer:** Channel-economics floor (does the unit economics survive Amazon/retailer fees?), brand-defensibility cap (is the brand the only moat?), CAC payback ceiling
- **Industrial:** Capital-intensity cap (is the BOM-to-ASP gap survivable?), customer-concentration flag (top-3 customers > 60% of revenue?), supply-chain single-source flag
- **Fintech:** Regulatory-license gate (BSA/AML, money transmitter, broker-dealer — has the company secured the licenses it needs?), KYC/AML maturity flag, partner-bank dependency cap

**TechGroup reference:** Section 5 of the reference file (AI Wrapper Cap, Goliath Test, Replicability Speed Flag, Hardware Last Mile Standard, TRL Hard Cap).

For each filter your group applies, fill in:

| # | Filter / Flag / Cap Name | What it tests | Cap effect (e.g., "Dimension X capped at 2/5", "DECLINE", "Yellow Flag") | Applies at Screen / Scout / Diligence |
|---|--------------------------|---------------|--------------------------------------------------------------------------|----------------------------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

## Section 6 — Defensibility / Moat Lens

**What this is for:** The plugin applies a **moat lens** when assessing Defensibility (Opportunity Dimension 4) and when generating moat narratives in the Scout, DD Report, and Memo. TechGroup uses the AI Moats Framework (`ai-moats-framework.md`) — three moat archetypes (Cognitive/Data Moat, Capital & Compute Moat, Vertical/Workflow Moat) plus a Replicability Speed Matrix.

Your group needs to articulate what "moat" means in your domain so the plugin doesn't apply TechGroup's AI-flavored lens to a Medical or Space deal where it doesn't fit.

**TechGroup reference:** Section 6 of the reference file (3 AI moat types + Replicability Speed Matrix + Memory Lock-in framing).

Fill in:

| Field | Your Answer |
|-------|-------------|
| 2–4 moat archetypes that matter most in this domain (name + 2-sentence description each) | |
| What "Structural Discontinuity" means in this domain (what kind of market shift counts as a *real* discontinuity for your deals?) | |
| What "Memory Lock-in" or its equivalent looks like in your domain (what kind of customer-side accumulation creates real switching cost?) | |
| Should `ai-moats-framework.md` be loaded for *some* of your group's deals (e.g., AI-enabled subset)? Yes / No / Conditional | |
| Do you need a separate group-specific moats reference doc? Yes / No (if yes, sketch the outline in 5–10 bullets) | |

---

## Section 7 — Themes & SMEs

**What this is for:** Every NWAi group organizes its deal flow into 5–8 investment themes. The plugin uses theme assignment in Scout reports to map deals to the right Lead and SMEs.

**Lead and SME slots:** Leave as **`TBD — Pending Dealum API`** for now. The plugin already uses this convention for TechGroup until the Dealum member-to-domain mapping is wired up. Just provide the themes themselves; the people-mapping comes later.

**TechGroup reference:** Section 7 of the reference file (5 themes from `CLAUDE.md`).

| # | Theme Name | 1–2 sentence definition | Example deal types |
|---|------------|-------------------------|--------------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 (optional) | | | |
| 7 (optional) | | | |
| 8 (optional) | | | |

---

## Section 8 — Group-Specialist Agent *(Optional)*

**What this is for:** The plugin has 9 research agents today. **7 are group-agnostic** and run for every deal regardless of group:
- `team-analyst` (PMTF + founder verification)
- `market-analyst` (TAM/SAM, structural discontinuity, timing)
- `competitive-positioning-analyst` (competitors, incumbents)
- `risk-analyst` (regulatory, exit, execution)
- `pricing-analyst` (pricing maturity, unit economics, channel)
- `forecasting-analyst` (independent 5-yr forecast, McMurry method)
- `venture-analyst` (valuation, hurdle test, deal structure)

**1 is TechGroup-specialized:** `technology-analyst` (thin wrapper detection, TRL, IP/patents, AI moat signals, technical team depth).

Your group may need its own specialist agent — or it may be fine using `technology-analyst` as-is, or it may not need a specialist agent at all. Examples that would warrant a specialist agent:

- **Medical:** `regulatory-diligence` — FDA pathway evaluation, clinical trial design, reimbursement landscape, IP/patent in pharma/devices
- **Space:** `mission-fit` — ITAR/dual-use posture, government program alignment, launch-cadence assumptions, anchor-customer analysis
- **Consumer:** `channel-economics` — Amazon/retailer margin structure, brand defensibility, CAC/LTV in DTC vs. wholesale
- **Industrial:** `manufacturing-diligence` — supply chain, contract manufacturing fit, capital-intensity modeling, customer concentration
- **Fintech:** `regulatory-diligence` — license posture, partner-bank dependency, KYC/AML maturity, BSA program

**TechGroup reference:** Section 8 of the reference file (`technology-analyst` agent summary).

Fill in:

| Field | Your Answer |
|-------|-------------|
| Does your group need a domain-specialist agent? (Yes — new agent / Yes — `technology-analyst` is sufficient / No — no specialist needed) | |
| If new agent: proposed agent name (lowercase-hyphen) | |
| If new agent: 3–5 bullets on what it researches | |
| If new agent: 3–5 bullets on what input data it consumes (deal room files, web research, founder interviews, etc.) | |
| If new agent: what its output briefing looks like (which DD Report sections does it feed?) | |
| If new agent: at which stage(s) does it run? (Scout light / Diligence full / both) | |

---

## Submission

When you've completed this questionnaire, save it as:

`docs/group-intake/NWAi-Group-Playbook-Intake-<GroupName>.md`

…and notify Jamie. He'll translate your answers into the runtime files the plugin needs. Expect one or two clarifying-question rounds before the group goes live in the plugin.

**You will not be asked to write plugin code.** Your deliverable is this filled-out questionnaire. The plugin maintainer takes it from there.

---

*NWAi Investment Intelligence Platform | Group Intake v1.0 | May 2026*
