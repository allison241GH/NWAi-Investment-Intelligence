// NWAi TechGroup Scout Assessment Report — RootCause.ai — 2026-06-02
// Generates a Word document matching the in-chat Scout assessment.
// Styling conventions matched to scripts/rootcause-triage-2026-05-27.js

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  TabStopType,
  TabStopPosition,
} = require("docx");
const fs = require("fs");
const path = require("path");

const NAVY = "1F3864";
const LIGHT_BLUE = "D5E8F0";
const WHITE = "FFFFFF";
const AMBER = "FFC000";
const GREEN = "2E7D32";
const DARKGREEN = "375623";
const RED = "C00000";
const GRAY = "F4F4F4";

const FONT = "Arial";

const COMPANY = "RootCause.ai";
const DATE_STR = "2026-06-02";
const VERDICT = "ADVANCE TO DILIGENCE — conditional on SAFE re-paper";
const VERDICT_COLOR = GREEN;

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const cellBorders = { top: border, bottom: border, left: border, right: border };

function txt(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size || 20,
    bold: !!opts.bold,
    italics: !!opts.italics,
    color: opts.color || "000000",
  });
}

function para(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [txt(text, opts)];
  return new Paragraph({
    children: runs,
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 80, after: opts.after || 80 },
  });
}

function bullet(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [txt(text, opts)];
  return new Paragraph({
    children: runs,
    bullet: { level: opts.level || 0 },
    spacing: { before: 40, after: 40 },
  });
}

function sectionBanner(label) {
  return new Paragraph({
    children: [new TextRun({ text: label, font: FONT, size: 24, bold: true, color: WHITE })],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
    spacing: { before: 240, after: 120 },
  });
}

function subhead(label) {
  return new Paragraph({
    children: [new TextRun({ text: label, font: FONT, size: 22, bold: true, color: NAVY })],
    spacing: { before: 160, after: 60 },
  });
}

// cell helper
function cell(content, opts = {}) {
  const children = Array.isArray(content)
    ? content
    : [para(content, { bold: opts.bold, color: opts.color, alignment: opts.alignment, before: 40, after: 40 })];
  return new TableCell({
    children,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill } : undefined,
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    columnSpan: opts.span || undefined,
    verticalAlign: "center",
  });
}

function headerCell(text, opts = {}) {
  return cell([para(text, { bold: true, color: WHITE, before: 40, after: 40 })], {
    fill: NAVY,
    width: opts.width,
    span: opts.span,
  });
}

function table(rows, columnWidths) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths,
    borders: {
      top: border,
      bottom: border,
      left: border,
      right: border,
      insideHorizontal: border,
      insideVertical: border,
    },
    rows,
  });
}

function scoreFill(score) {
  // numeric 0-5 color coding (DD-report convention)
  if (score >= 4) return DARKGREEN;
  if (score === 3) return AMBER;
  return RED;
}
function scoreColor(score) {
  if (score === 3) return "000000";
  return WHITE;
}

// ───────────────────────────────────────────────────────── document body

const children = [];

// Title block
children.push(
  new Paragraph({
    children: [new TextRun({ text: COMPANY, font: FONT, size: 44, bold: true, color: NAVY })],
    spacing: { before: 60, after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: "NWAi TechGroup — Scout Assessment", font: FONT, size: 26, bold: true, color: "000000" })],
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: "Scouted: " + DATE_STR + "   |   TechGroup   |   Track A (Software / AI / Cloud)", font: FONT, size: 18, italics: true, color: "595959" }),
    ],
    spacing: { after: 120 },
  })
);

// Verdict badge
children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: GREEN },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: GREEN },
      left: { style: BorderStyle.SINGLE, size: 4, color: GREEN },
      right: { style: BorderStyle.SINGLE, size: 4, color: GREEN },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: "VERDICT: " + VERDICT, font: FONT, size: 24, bold: true, color: WHITE })],
                spacing: { before: 80, after: 40 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      "Genuine deep-tech causal engine (not a thin wrapper) with a credentialed PhD bench, a verified prior exit (npm → Microsoft), and real paid enterprise pilots — gated by a SAFE structure that violates NWA's non-negotiable terms and a DEVELOPING moat now facing a Goliath (Microsoft) already shipping GA causal primitives into RootCause's exact beachhead.",
                    font: FONT,
                    size: 19,
                    color: WHITE,
                  }),
                ],
                spacing: { after: 80 },
              }),
            ],
            shading: { type: ShadingType.CLEAR, color: "auto", fill: GREEN },
            margins: { top: 80, bottom: 80, left: 160, right: 160 },
          }),
        ],
      }),
    ],
  })
);

// ── Triage Carry-Forward
children.push(sectionBanner("TRIAGE CARRY-FORWARD"));
children.push(
  table(
    [
      new TableRow({ children: [headerCell("Field", { width: 32 }), headerCell("Value", { width: 68 })] }),
      new TableRow({ children: [cell("Opportunity Score", { fill: GRAY }), cell("24 / 30 (STRONG)")] }),
      new TableRow({ children: [cell("Readiness Score", { fill: GRAY }), cell("16 / 25 (MODERATE)")] }),
      new TableRow({ children: [cell("Hard Gates", { fill: GRAY }), cell("Market Size ✅ · Commercialization ✅ · Foreign Entity ⚠️→✅ RESOLVED (transcript confirms Delaware C-Corp parent, US-owned IP)")] }),
      new TableRow({ children: [cell("AI Wrapper Rating", { fill: GRAY }), cell("LOW (confirmed NOT a wrapper)")] }),
      new TableRow({ children: [cell("Prior Red Flags", { fill: GRAY }), cell("None at screen")] }),
      new TableRow({ children: [cell("Prior Yellow Flags", { fill: GRAY }), cell("SAFE suspected · Goliath UNCLEAR · O(n log n)/876,000x unverified · US entity unconfirmed · no named lead · CausaLens distribution lead")] }),
    ],
    [3200, 6800]
  )
);

// ── Product & Market Positioning
children.push(sectionBanner("PRODUCT & MARKET POSITIONING"));
children.push(
  table(
    [
      new TableRow({
        children: [headerCell("Category Type", { width: 28 }), headerCell("Lifecycle Horizon", { width: 26 }), headerCell("Ecosystem Role", { width: 23 }), headerCell("Adjacent Risk", { width: 23 })],
      }),
      new TableRow({
        children: [
          cell("New category adjacent to legacy causal methods (auto-discovery at scale)"),
          cell("10-yr platform play IF causal goes mainstream — Gartner says 5–10yr"),
          cell("3/5 — participant w/ digital-twin depth; deploys per-customer on-prem"),
          cell("2/5 (HIGH) — Big Tech causal primitives already GA"),
        ],
      }),
    ],
    [2800, 2600, 2300, 2300]
  )
);

// ── Moat Assessment
children.push(sectionBanner("MOAT ASSESSMENT"));
children.push(
  table(
    [
      new TableRow({
        children: [headerCell("Primary Moat", { width: 30 }), headerCell("Strength", { width: 14 }), headerCell("Primary Threat", { width: 30 }), headerCell("Verdict", { width: 26 })],
      }),
      new TableRow({
        children: [
          cell("Workflow lock-in (per-customer ontology + persistent 'digital twin')"),
          cell([para("Emerging", { bold: true, color: NAVY, before: 40, after: 40 })]),
          cell("Microsoft causal stack GA today + build-capable beachhead already running free PyWhy"),
          cell("DEVELOPING — real algorithmic engineering, but no data flywheel by design (on-prem) and published-math core (tensor-train) is partly copyable"),
        ],
      }),
    ],
    [3000, 1400, 3000, 2600]
  )
);

// ── Macro Trends
children.push(sectionBanner("MACRO TRENDS (10-YEAR)"));
children.push(
  table(
    [
      new TableRow({ children: [headerCell("Dimension", { width: 18 }), headerCell("10-yr Direction", { width: 56 }), headerCell("Impact", { width: 26 })] }),
      new TableRow({ children: [cell("Customer", { fill: GRAY }), cell("Rising demand for explainable/decision-grade AI (only 46% trust agent decisions)"), cell([para("Tailwind", { bold: true, color: DARKGREEN, before: 40, after: 40 })])] }),
      new TableRow({ children: [cell("Technology", { fill: GRAY }), cell("LLM causal ceiling is real & irreversible — but same maturation arms Microsoft + causal foundation models"), cell([para("Mixed", { bold: true, color: AMBER, before: 40, after: 40 })])] }),
      new TableRow({ children: [cell("Regulatory", { fill: GRAY }), cell("No causal-specific mandate; EU AI Act explainability is adjacent/soft"), cell([para("Neutral", { bold: true, before: 40, after: 40 })])] }),
      new TableRow({ children: [cell("Economic", { fill: GRAY }), cell("Strong ROI story (Dropbox $8M wasted-spend proof) but budgets gated by proof; build-vs-buy favors in-house"), cell([para("Neutral", { bold: true, before: 40, after: 40 })])] }),
    ],
    [1800, 5600, 2600]
  )
);

// ── Analyst Verdict Block
children.push(sectionBanner("ANALYST VERDICT BLOCK"));
function verdictRow(label, value) {
  return new TableRow({
    children: [
      cell([para(label, { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY, width: 26 }),
      cell(value, { width: 74 }),
    ],
  });
}
children.push(
  table(
    [
      verdictRow("Recommendation", "ADVANCE TO DILIGENCE — conditional on re-papering SAFE → convertible note or priced round"),
      verdictRow("Thesis Fit Score (rule-based)", "40 / 55 (Opp 24/30 + Readiness 16/25) — Qualified fit, gated by Deal Structure 2/5"),
      verdictRow("Intelligence Conviction Score (research)", "11.2 / 17 — Moderate band (advance with named watch items)"),
      verdictRow("Dual-Score Interpretation", "Convergent (both Moderate/Qualified, no band gap) — not a clean kill, not an unconditional advance"),
      verdictRow("Verdict", "Real deep-tech with paying pilots, but the moat is DEVELOPING against a shipping Goliath and the round structure is a non-negotiable fail until fixed"),
      verdictRow("What You Have to Believe", "That single-shot auto-discovery + ontology automation is worth paying for over the free Microsoft/PyWhy stack the beachhead already runs — and that workflow lock-in compounds before Microsoft packages causal as a product"),
      verdictRow("Where's the Bet", "Pilot→ARR conversion + multi-business-unit land-and-expand off the 'digital twin' before the Goliath / foundation-model window closes"),
      verdictRow("Fear", "Microsoft ships a packaged causal product; on-prem no-flywheel model never compounds; pilots don't convert to durable ARR"),
      verdictRow("Greed", "Becomes the causal-inference layer of the enterprise data stack — Palantir-for-the-long-tail at 10–50x the deal count"),
    ],
    [2600, 7400]
  )
);

// ── Score Summary
children.push(sectionBanner("SCORE SUMMARY"));
function scoreRow(dim, triage, scout, delta, scoreNum) {
  const scoutCell =
    typeof scoreNum === "number"
      ? cell([para(scout, { bold: true, color: scoreColor(scoreNum), before: 40, after: 40, alignment: AlignmentType.CENTER })], { fill: scoreFill(scoreNum) })
      : cell(scout, { alignment: AlignmentType.CENTER });
  return new TableRow({
    children: [
      cell(dim, { width: 46 }),
      cell(triage, { width: 18, alignment: AlignmentType.CENTER }),
      scoutCell,
      cell(delta, { width: 18, alignment: AlignmentType.CENTER }),
    ],
  });
}
children.push(
  table(
    [
      new TableRow({ children: [headerCell("Dimension", { width: 46 }), headerCell("Triage", { width: 18 }), headerCell("Scout", { width: 18 }), headerCell("Delta", { width: 18 })] }),
      scoreRow("Category & Market Discontinuity", "D1: 4/5", "4/5", "→", 4),
      scoreRow("Demand Signal Test", "—", "3/5", "NEW", 3),
      scoreRow("Market Opportunity", "D2: 4/5", "3/5", "↓", 3),
      scoreRow("Moat", "D4: 3/5", "DEVELOPING (3)", "→", 3),
      scoreRow("Ecosystem Role", "—", "3/5", "NEW", 3),
      scoreRow("Adjacent Displacement Risk", "—", "2/5", "NEW", 2),
      scoreRow("Macro Tailwind", "—", "3/5", "NEW", 3),
      scoreRow("Team", "D3: 5/5", "4/5", "↓", 4),
      scoreRow("Technology", "—", "4/5", "NEW", 4),
      scoreRow("Traction", "D5: 4/5", "3/5", "↓", 3),
      scoreRow("GTM / Path to $10M", "—", "3/5", "NEW", 3),
    ],
    [4600, 1800, 1800, 1800]
  )
);

// ════════════════════════════ PAGE 2

children.push(
  new Paragraph({ children: [new TextRun({ text: "", font: FONT })], pageBreakBefore: true })
);

// ── Adjacent & Emerging Tech
children.push(sectionBanner("ADJACENT & EMERGING TECH"));
children.push(
  bullet([txt("Core use case: ", { bold: true }), txt("Automatically discover causal structure from messy multi-source enterprise data and simulate interventions ('test a decision before you make it') with explainable, auditable answers.")]),
  bullet([txt("Functional equivalents: ", { bold: true }), txt("Microsoft/PyWhy free stack (DoWhy/EconML/Causica) — built in-house by the exact beachhead; Palantir Foundry Vertex (scenario sim); in-house causal-science teams; BI/dashboards + Excel.")]),
  bullet([txt("Emerging displacement: ", { bold: true }), txt("Microsoft Azure ML causal-inference component GA today (≈0–18 mo to a packaged product); causal foundation models (zero-shot causal discovery) at 18–36 mo.")])
);

// ── Phase 1 Viability
children.push(sectionBanner("PHASE 1 — VIABILITY"));

children.push(subhead("Category & Market Discontinuity (4/5 →)"));
children.push(
  bullet("The LLM correlation→causation limit is a genuine, irreversible architectural fact (peer-reviewed: LLMs are 'causal parrots,' fail out-of-distribution) — the thesis is technically real, not vendor framing."),
  bullet("Creates a real new category (auto-discovery at scale) adjacent to decades-old bespoke causal methods."),
  bullet("Caps below 5: the commercial discontinuity ('causal becoming enterprise standard now') is still forming — Gartner places Causal AI in Innovation Trigger, 5–10yr to mainstream.")
);

children.push(subhead("Demand Signal Test (3/5 NEW)"));
children.push(
  bullet([txt("Demand type: ", { bold: true }), txt("MIXED — beachhead is demand-pull; broader 'sell outcomes to non-causal firms' market is technology-push (evangelical).")]),
  bullet([txt("Evidence: ", { bold: true }), txt("624+ open US causal-inference roles on LinkedIn / 1,600+ on Indeed; ~2,000 causal-hiring firms identified; SDR booked 16 qualified meetings in month 1.")]),
  bullet([txt("Strongest signal: ", { bold: true }), txt("Companies are already paying for causal headcount — real budget exists in the beachhead, but no regulatory deadline or platform-level RFP wave is pulling procurement.")])
);

children.push(subhead("Market Opportunity (3/5 ↓)"));
children.push(
  bullet([txt("TAM | SAM | SOM: ", { bold: true }), txt("focused causal-AI $63M–$457M near-term → ~$1.6–1.8B by 2035 (~38–40% CAGR) | SAM ~$400M–$1.2B | SOM ~$8–30M yr1–3.")]),
  bullet("Lowered from 4: the defensible focused TAM is small near-term; the $40–81B vendor figures are scope-inflated (discard). 10x requires riding into the parent Decision-Intelligence market (~$68B by 2035) — plausible but unproven."),
  bullet("Build-vs-buy is the structural drag: the beachhead is the cohort most able to build it themselves.")
);

children.push(subhead("Moat (DEVELOPING / 3 →)"));
children.push(
  bullet([txt("What it is: ", { bold: true }), txt("genuine proprietary causal-discovery engine (C++), ontology-constrained search, cascading statistical tests — clears the thin-wrapper bar cleanly.")]),
  bullet([txt("What it isn't: ", { bold: true }), txt("a data flywheel — on-prem/single-tenant deployment structurally prevents cross-customer learning; the product does NOT get smarter as more customers use it.")]),
  bullet([txt("Key weakness: ", { bold: true }), txt("tensor-train math is published/open-source (Savostyanov's ttcross) — the weakest 'trade secret'; Microsoft causal stack is GA, not 18 months out.")])
);

// ── Phase 2 Execution
children.push(sectionBanner("PHASE 2 — EXECUTION"));
children.push(
  table(
    [
      new TableRow({ children: [headerCell("Dimension", { width: 20 }), headerCell("Score", { width: 10 }), headerCell("Assessment", { width: 70 })] }),
      new TableRow({
        children: [
          cell("Team"),
          cell([para("4/5", { bold: true, color: WHITE, alignment: AlignmentType.CENTER, before: 40, after: 40 })], { fill: scoreFill(4) }),
          cell("Product-Team Fit: STRONG (PhD bench maps to engine; npm→Microsoft exit VERIFIED) · Market-Team Fit: MODERATE (one credible GTM operator, Friedenberg; research-origin first-time CEO; single-threaded sales) · Commitment ~75% full-time (⚠️ Boothby concurrent CEO of IDPartner) · Key-Seat 5–6/6 · Verification: npm ✅, NASA/Intel/UKAEA partial/unverified"),
        ],
      }),
      new TableRow({
        children: [
          cell("Technology"),
          cell([para("4/5", { bold: true, color: WHITE, alignment: AlignmentType.CENTER, before: 40, after: 40 })], { fill: scoreFill(4) }),
          cell("TRL 6–7 · deep algorithmic IP (NOT a wrapper) · replication ~12mo/$5M (analyst) vs 2–3yr (founder); biggest risk = published tensor-train core"),
        ],
      }),
      new TableRow({
        children: [
          cell("Traction"),
          cell([para("3/5", { bold: true, color: "000000", alignment: AlignmentType.CENTER, before: 40, after: 40 })], { fill: scoreFill(3) }),
          cell("ARR walk-back: founder live-corrected '$365K ARR' → '$365K signed pilots, non-recurring'; Cryptography $225K pilot → only $50K recurring ARR · 5 active paid pilots → $1.35M if converted · G2000 logos (Volvo, Calix, Brightstar, Bayer, DHL, Danone, General Mills-alongside-Palantir) · ⚠️ net retention undisclosed"),
        ],
      }),
      new TableRow({
        children: [
          cell("GTM / Path to $10M"),
          cell([para("3/5", { bold: true, color: "000000", alignment: AlignmentType.CENTER, before: 40, after: 40 })], { fill: scoreFill(3) }),
          cell("Enterprise + SI-partner (KPMG/Capgemini) + SDR-led outbound to causal-hiring managers · milestone: pilot→ARR conversion + prove 'outcome selling' to non-causal firms · on-prem = services-heavy onboarding (margin/scale tension) · CAC/LTV not disclosed"),
        ],
      }),
      new TableRow({
        children: [
          cell("Exit"),
          cell([para("—", { bold: true, alignment: AlignmentType.CENTER, before: 40, after: 40 })]),
          cell("Palantir (absorb the 'cheaper-Palantir' threat onto Ontology) · Snowflake (distribution rails — but already partnered w/ CausaLens, 2nd choice) · Databricks/Microsoft (Microsoft least likely — has the stack) · Hold 5–7yr · 10x in 5yr: STRETCH"),
        ],
      }),
    ],
    [2000, 1000, 7000]
  )
);

// ── Flags
children.push(sectionBanner("FLAGS"));
children.push(
  bullet([txt("❌ SAFE structure CONFIRMED ", { bold: true, color: RED }), txt("— '$20M post-money cap through SAFE,' all capital to date is SAFEs. Violates NWA non-negotiable ('No SAFEs'). Gating condition for any NWA participation.")]),
  bullet([txt("❌ Goliath Test now closer to FAIL ", { bold: true, color: RED }), txt("— Microsoft's causal stack (Azure ML causal component/EconML, Causica, ShowWhy, PyWhy) is GA today; the chosen beachhead self-selects build-capable customers already running the free stack.")]),
  bullet([txt("⚠️ ARR walk-back ", { bold: true }), txt("— headline '$365K ARR' is mostly non-recurring pilot revenue; thin recurring base; net retention undisclosed.")]),
  bullet([txt("⚠️ Deployment-model ambiguity ", { bold: true }), txt("— 'Enterprise SaaS' positioning vs. on-prem/in-environment deployment described verbally; margin, scalability, and usage-visibility implications unresolved.")]),
  bullet([txt("⚠️ No data flywheel by design ", { bold: true }), txt("— switching cost (digital twin) is the only Memory Lock-in lever and is unproven.")]),
  bullet([txt("⚠️ Performance claims unverified ", { bold: true }), txt("— '876,000x'/'O(n log n)' have no third-party benchmark; tensor-train core is published/open.")]),
  bullet([txt("⚠️ Boothby (CPO) commitment ", { bold: true }), txt("— concurrent CEO of IDPartner; founder credential claims (NASA/Intel/UKAEA) partly unverified (UKAEA unfound publicly).")]),
  bullet([txt("⚠️ Timing may be too early ", { bold: true }), txt("— Gartner Innovation Trigger / 5–10yr to mainstream challenges the 'enterprise standard now' thesis.")]),
  bullet([txt("✅ Resolved since triage ", { bold: true, color: DARKGREEN }), txt("— Geography/IP gate (Delaware C-Corp parent, US-owned IP, SF HQ — confirmed in transcript); lead investor (Cloudberry leading seed, Epsilon also in — both UK-based, note).")])
);

// ── Targeted Diligence Questions
children.push(sectionBanner("TARGETED DILIGENCE QUESTIONS"));
function dq(n, title, body) {
  return new Paragraph({
    children: [txt(n + ". " + title + " ", { bold: true, color: NAVY }), txt(body)],
    spacing: { before: 100, after: 80 },
  });
}
children.push(
  dq("1", "Deployment model — on-prem vs SaaS [flagged by David Litos, NWA]:", "Your materials say 'Enterprise SaaS,' but in both pitches you described deploying inside the customer's environment ('we don't get to see any of their data'). Confirm precisely: single-tenant on-prem/VPC per customer, or multi-tenant cloud? If on-prem — (a) what's the per-customer deployment/onboarding effort and is it services-heavy; (b) since you can't see customer data, how do you measure usage, expansion, and renewal; (c) how does on-prem reconcile with the 'become infrastructure via API' and SaaS gross-margin thesis?"),
  dq("2", "Pilot success criteria & stickiness [flagged by David Litos, NWA]:", "You said every engagement sets defined success criteria and target KPI improvements before the pilot. For the 5 active pilots (Cryptography, Volvo, Brightstar, Calix, Danone): (a) what are the specific success criteria and what have customers actually achieved to date; (b) what is your historical pilot→paid-ARR conversion rate, average contract length, and net retention on converted accounts; (c) where a pilot succeeded, did it expand to a broader/multi-business-unit deployment as your 'one digital twin → more teams → API → infrastructure' land-and-expand thesis predicts — show the expansion evidence."),
  dq("3", "Round structure (SAFE — non-negotiable):", "The $20M post-money cap is a SAFE and all capital to date has been SAFEs. NWA requires priced equity or a convertible note. Will you re-paper NWA's participation as a convertible note (cap + discount + maturity) or a priced round? What is the qualified-financing trigger and discount on the current SAFE?"),
  dq("4", "The Goliath question (Microsoft):", "Microsoft's causal stack is GA today — Azure ML causal component (EconML), Causica, ShowWhy, PyWhy — and your beachhead is exactly the cohort already running PyWhy in-house. What specifically can't that customer reproduce with the stack they already own, and what's your answer when Azure ML's causal component is 'good enough' for the buyer?"),
  dq("5", "Moat substantiation — benchmark + IP:", "(a) Provide one reproducible benchmark for the scaling claim (proportional-not-doubling / 'O(n log n)' / '876,000x') vs. a named baseline (PC/GES/NOTEARS) at a stated variable count. (b) The tensor-train method is attributed to Dr. Dmitry Savostyanov, whose ttcross work is published/open-source — clarify his engagement (employee/contractor/advisor), confirm IP is assigned to the US C-Corp, and specify what in the three 'trade secrets' is genuinely non-obvious vs. an application of published techniques.")
);

// ── Footer block
children.push(sectionBanner("PIPELINE STATUS"));
children.push(
  table(
    [
      new TableRow({ children: [cell([para("Dealum Step", { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY, width: 26 }), cell("Scout/IntroCall (filesystem-of-record; Dealum API deferred)", { width: 74 })] }),
      new TableRow({ children: [cell([para("TechGroup Theme", { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY }), cell("Theme 1 — Infrastructure & Foundational Stack · Lead: TBD — Pending Dealum API · SMEs: TBD — Pending Dealum API")] }),
      new TableRow({ children: [cell([para("Suggested Tag", { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY }), cell("Theme-Infrastructure")] }),
      new TableRow({ children: [cell([para("Next Action", { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY }), cell("/diligence RootCause.ai — but resolve the SAFE re-paper as a gating condition before committing diligence-team resources")] }),
    ],
    [2600, 7400]
  )
);

// ───────────────────────────────────────────────────────── assemble

const doc = new Document({
  creator: "NWAi Investment Intelligence",
  title: "RootCause.ai — Scout Assessment Report",
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: "NWAi TechGroup — Scout Assessment Report", font: FONT, size: 16, color: "808080" }),
                new TextRun({ text: "\tScouted: " + DATE_STR, font: FONT, size: 16, color: "808080" }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              children: [
                new TextRun({ text: "NWAi Investment Intelligence — Confidential", font: FONT, size: 16, color: "808080" }),
                new TextRun({ children: ["\tPage ", PageNumber.CURRENT], font: FONT, size: 16, color: "808080" }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const outPath = path.join(
  __dirname,
  "..",
  "deals",
  "active",
  "RootCause.ai",
  "Reports",
  "RootCause.ai - Scout Assessment Report 2026-06-02.docx"
);

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("WROTE: " + outPath);
  console.log("Bytes: " + buf.length);
});
