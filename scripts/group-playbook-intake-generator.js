/**
 * NWAi Group Playbook — Intake Questionnaire (Word Generator)
 *
 * Source of truth for content:
 *   docs/group-intake/NWAi-Group-Playbook-Intake-Template.md
 *
 * Output:
 *   docs/group-intake/NWAi-Group-Playbook-Intake-Template.docx
 *
 * The Word doc is a fillable form for Group Chairs (Medical, Space, Consumer,
 * Industrial, Fintech). They complete it in Word/Pages/Google Docs and return
 * to Jamie, who feeds the answers to the plugin to stand up the group's runtime
 * framework. Format mirrors the .md section-by-section; tables stay as Word
 * tables with empty "Your Answer" cells.
 *
 * Helpers and styling follow the pattern at scripts/dd-report-generator.js.
 *
 * USAGE: node scripts/group-playbook-intake-generator.js
 */

"use strict";

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, VerticalAlign, HeadingLevel,
} = require("docx");
const fs   = require("fs");
const path = require("path");

// ─── Constants ───────────────────────────────────────────────────────────────

const FONT       = "Calibri";
const CW         = 9360;
const NAVY       = "1F3864";
const NAVY_LIGHT = "D9E2F3";
const GRAY       = "666666";
const LIGHT_GRAY = "F4F4F4";
const WHITE      = "FFFFFF";
const OPT_BG     = "FFF3CD";   // soft amber for optional callouts
const NOTE_BG    = "E8F0FE";   // soft blue for "What this is for" callouts
const BORDER_GRAY = "BFBFBF";

// ─── Low-level helpers ───────────────────────────────────────────────────────

const T = (text, { bold=false, italics=false, size=22, color="000000", font=FONT }={}) =>
  new TextRun({ text, bold, italics, size, color, font });

const P = (runs, { spacing={ before:60, after:60 }, align, indent }={}) =>
  new Paragraph({
    children: Array.isArray(runs) ? runs : [runs],
    spacing,
    alignment: align || AlignmentType.LEFT,
    ...(indent ? { indent } : {}),
  });

const Spacer = (px=120) => P([T("")], { spacing: { before: px, after: 0 } });

const H1 = (text) => new Paragraph({
  children: [T(text, { bold:true, size:32, color:NAVY })],
  spacing: { before: 360, after: 120 },
  border: {
    bottom: { color: NAVY, space: 4, style: BorderStyle.SINGLE, size: 8 },
  },
});

const H2 = (text) => new Paragraph({
  children: [T(text, { bold:true, size:24, color:NAVY })],
  spacing: { before: 200, after: 80 },
});

const Label = (text) => P([T(text, { bold:true, size:22 })], { spacing: { before:120, after:40 } });

const Body = (text, opts={}) => P([T(text, { size:22, ...opts })], { spacing: { before:40, after:40 } });

const Hint = (text) => P([T(text, { size:20, italics:true, color:GRAY })], { spacing: { before:40, after:60 } });

// Cell with default cosmetics
const Cell = (paragraphs, { fill=WHITE, width=CW, vAlign, colSpan, padTop=80, padBottom=80, padLeft=140, padRight=140, borders }={}) => {
  return new TableCell({
    children: paragraphs.map(p =>
      typeof p === "string" ? P([T(p)]) : p
    ),
    shading: { type: ShadingType.CLEAR, color: "auto", fill },
    width: { size: width, type: WidthType.DXA },
    margins: { top: padTop, bottom: padBottom, left: padLeft, right: padRight },
    ...(vAlign ? { verticalAlign: vAlign } : {}),
    ...(colSpan ? { columnSpan: colSpan } : {}),
    ...(borders ? { borders } : {}),
  });
};

// Full-width single-cell shaded callout (optional notice / what this is for)
const Callout = (paragraphs, { fill=NOTE_BG }={}) => new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [CW],
  rows: [new TableRow({ children: [
    Cell(paragraphs, { fill, width: CW, padTop: 100, padBottom: 100, padLeft: 200, padRight: 200 }),
  ]})],
});

const OptionalCallout = (sectionLabel) => Callout([
  P([
    T("(Optional) ", { bold:true, size:22, color:"7A4F01" }),
    T(`Skip ${sectionLabel} if it does not apply to your group. The universal default will take over.`,
      { size:22, color:"7A4F01" }),
  ], { spacing: { before:0, after:0 } }),
], { fill: OPT_BG });

const NotePurpose = (text) => Callout([
  P([T("What this is for. ", { bold:true, size:22, color:NAVY }),
     T(text, { size:22, color:NAVY })],
    { spacing: { before:0, after:0 } }),
], { fill: NOTE_BG });

const TechRef = (text) =>
  P([T("TechGroup reference: ", { bold:true, size:20, italics:true, color:GRAY }),
     T(text, { size:20, italics:true, color:GRAY })],
    { spacing: { before:60, after:120 } });

// 2-column Q/A table — left col is field label, right col is empty "Your Answer"
const QATable = (rows, { labelW=4200, answerW=5160 }={}) => new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [labelW, answerW],
  rows: [
    // header
    new TableRow({
      tableHeader: true,
      children: [
        Cell([P([T("Field", { bold:true, color:WHITE })])], { fill: NAVY, width: labelW }),
        Cell([P([T("Your Answer", { bold:true, color:WHITE })])], { fill: NAVY, width: answerW }),
      ],
    }),
    // data
    ...rows.map((r, i) => new TableRow({ children: [
      Cell([P([T(r, { size:22 })])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: labelW }),
      Cell([P([T("")])],             { fill: WHITE, width: answerW, padTop: 200, padBottom: 200 }),
    ]})),
  ],
});

// N-column generic header + empty rows table (for Section 5 + Section 7)
const FormTable = ({ headers, widths, rowCount }) => new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: widths,
  rows: [
    new TableRow({
      tableHeader: true,
      children: headers.map((h, i) =>
        Cell([P([T(h, { bold:true, color:WHITE, size:21 })])], { fill: NAVY, width: widths[i] })
      ),
    }),
    ...Array.from({ length: rowCount }, (_, i) => new TableRow({ children:
      headers.map((_, ci) =>
        Cell([P([T(ci === 0 ? String(i + 1) : "")])],
             { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: widths[ci], padTop: 180, padBottom: 180 })
      ),
    })),
  ],
});

// Default-dimensions reference table for Section 4 (read-only context)
const DefaultDimensionsTable = (rows) => new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [600, 2900, 5860],
  rows: [
    new TableRow({ tableHeader:true, children: [
      Cell([P([T("#",         { bold:true, color:WHITE })])], { fill:NAVY, width:600  }),
      Cell([P([T("Default Dimension",  { bold:true, color:WHITE })])], { fill:NAVY, width:2900 }),
      Cell([P([T("Default Question",   { bold:true, color:WHITE })])], { fill:NAVY, width:5860 }),
    ]}),
    ...rows.map((r, i) => new TableRow({ children: [
      Cell([P([T(r[0])])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width:600  }),
      Cell([P([T(r[1])])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width:2900 }),
      Cell([P([T(r[2])])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width:5860 }),
    ]})),
  ],
});

// Single dimension fillable block for Section 4 — meta + 6 anchor rows
const DimensionBlock = (n) => {
  const labelW  = 3000;
  const answerW = 6360;
  const anchorLabelW  = 1200;
  const anchorAnswerW = 8160;

  return [
    // Header strip — "Dimension N"
    new Table({
      width: { size: CW, type: WidthType.DXA },
      columnWidths: [CW],
      rows: [new TableRow({ children: [
        Cell([P([T(`Dimension ${n}`, { bold:true, color:WHITE, size:22 })])],
             { fill: NAVY, width: CW, padTop:60, padBottom:60 }),
      ]})],
    }),
    // Meta block (3 rows)
    new Table({
      width: { size: CW, type: WidthType.DXA },
      columnWidths: [labelW, answerW],
      rows: [
        new TableRow({ children: [
          Cell([P([T("Dimension name", { bold:true })]), P([T("(use default or rename for your domain)",
               { size:18, italics:true, color:GRAY })])], { fill: LIGHT_GRAY, width: labelW }),
          Cell([P([T("")])], { fill: WHITE, width: answerW, padTop: 160, padBottom: 160 }),
        ]}),
        new TableRow({ children: [
          Cell([P([T("What it measures", { bold:true })]), P([T("(1–2 sentences)",
               { size:18, italics:true, color:GRAY })])], { fill: WHITE, width: labelW }),
          Cell([P([T("")])], { fill: WHITE, width: answerW, padTop: 240, padBottom: 240 }),
        ]}),
        new TableRow({ children: [
          Cell([P([T("Sub-floor / hard cap", { bold:true })]), P([T("(rule, or write \"None\")",
               { size:18, italics:true, color:GRAY })])], { fill: LIGHT_GRAY, width: labelW }),
          Cell([P([T("")])], { fill: WHITE, width: answerW, padTop: 200, padBottom: 200 }),
        ]}),
      ],
    }),
    Spacer(40),
    // Score-anchor table — 6 rows for 5,4,3,2,1,0
    new Table({
      width: { size: CW, type: WidthType.DXA },
      columnWidths: [anchorLabelW, anchorAnswerW],
      rows: [
        new TableRow({ tableHeader:true, children: [
          Cell([P([T("Score", { bold:true, color:WHITE })])],   { fill: NAVY, width: anchorLabelW }),
          Cell([P([T("Anchor (what does this score look like?)",
                     { bold:true, color:WHITE })])],            { fill: NAVY, width: anchorAnswerW }),
        ]}),
        ...[5,4,3,2,1,0].map((s, i) => new TableRow({ children: [
          Cell([P([T(String(s), { bold:true, size:24 })], { align: AlignmentType.CENTER })],
               { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: anchorLabelW, vAlign: VerticalAlign.CENTER }),
          Cell([P([T("")])], { fill: WHITE, width: anchorAnswerW, padTop: 180, padBottom: 180 }),
        ]})),
      ],
    }),
    Spacer(140),
  ];
};

// ─── Document content ────────────────────────────────────────────────────────

function buildDoc() {
  const children = [];

  // ── COVER / TITLE ─────────────────────────────────────────────────────────
  children.push(
    P([T("NWAi Group Playbook", { bold:true, size:40, color:NAVY })],
      { spacing: { before: 0, after: 80 } }),
    P([T("Intake Questionnaire", { bold:true, size:32, color:NAVY })],
      { spacing: { before: 0, after: 240 } }),
  );

  // Cover detail box
  children.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2600, 6760],
    rows: [
      ["Audience",   "Group Chair (and Co-Chair) for MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup"],
      ["Purpose",    "Provide the group-specific inputs needed to extend the NWAi Investment Intelligence plugin from TechGroup-only to all 6 NWAi groups under a single multi-group plugin."],
      ["Time",       "~60–90 minutes"],
      ["Companion",  "NWAi-Group-Playbook-Intake-TechGroup-Reference.md — TechGroup's fully populated answers, kept alongside this blank template as a worked example."],
      ["Return to",  "Jamie — TechGroup Co-Chair, NWA Investment Intelligence Platform & AI"],
    ].map((r, i) => new TableRow({ children: [
      Cell([P([T(r[0], { bold:true })])], { fill: LIGHT_GRAY, width: 2600 }),
      Cell([P([T(r[1])])],                { fill: WHITE,      width: 6760 }),
    ]})),
  }));

  children.push(Spacer(240));

  // ── HOW TO USE ────────────────────────────────────────────────────────────
  children.push(H1("How to Use This Document"));
  children.push(
    Body("The plugin separates shared rails (universal across all 6 groups — hard gates, NWA Filter, Readiness scoring, Scout questions, Diligence rubrics, DD Report format, Memo format, 7 of 9 agents) from the group-specific playbook (this questionnaire's output — Opportunity rubric, themes, moat lens, optional calibration, optional specialist agent)."),
    Body("You only fill in the playbook layer. The shared rails apply to your group automatically. Where a section is marked (Optional), skip it if it does not apply — the universal default will take over."),
    Body("For every section, look at the corresponding TechGroup reference answer first. That tells you the level of detail expected and the format the plugin will translate into a runtime reference doc."),
    Body("When you finish, return this document to Jamie. He'll translate the answers into a gates-and-flags-<yourgroup>.md reference file, a Themes & SMEs block in CLAUDE.md, an optional specialist agent file, and a Dealum tag binding."),
  );

  // ── SECTION 1 — Group Identity ────────────────────────────────────────────
  children.push(H1("Section 1 — Group Identity"));
  children.push(NotePurpose(
    "Names the group, binds it to its Dealum tag, and gives a one-sentence investment thesis the plugin can echo back when the group is in scope."
  ));
  children.push(TechRef("Section 1 of NWAi-Group-Playbook-Intake-TechGroup-Reference.md"));
  children.push(QATable([
    "Group name (full)",
    "Group acronym",
    "Dealum tag string (the literal tag value used to identify this group's deals in Dealum)",
    "Group Chair (name + role)",
    "Co-Chair (if any)",
    "One-sentence investment thesis for this group",
  ]));

  // ── SECTION 2 — Funnel Calibration (Optional) ─────────────────────────────
  children.push(H1("Section 2 — Funnel Calibration (Optional)"));
  children.push(OptionalCallout("Section 2"));
  children.push(NotePurpose(
    "TechGroup uses funnel calibration (~300 pitches per year, 2–3 Scout/Live Pitch slots per month) to tune its screening thresholds and prevent the screen from over-advancing. If your group does not run a fixed Scout/Live Pitch cadence — or your inbound volume is too low or too irregular to need calibration — skip this section. The universal Decision Logic (ADVANCE ≥ 20/30, WATCH 14–19, DECLINE < 14) will apply unchanged."
  ));
  children.push(TechRef("Section 2 of the reference file (uses TechGroup's actual numbers)."));
  children.push(Body("Fill out only if your group wants explicit calibration."));
  children.push(QATable([
    "Annual pitch volume (Dealum inbound, last 12 months — estimate is fine)",
    "Scout / Live Pitch capacity per month",
    "Target advance rate (% of inbound that should reach Scout)",
    "Historical funded-deal count, last 3 years",
    "One-line note on what these numbers imply for your screening posture (e.g., \"tight — screen should kill 90%\")",
  ]));

  // ── SECTION 3 — Track Determination (Optional) ────────────────────────────
  children.push(H1("Section 3 — Track Determination (Optional)"));
  children.push(OptionalCallout("Section 3"));
  children.push(NotePurpose(
    "Some groups bifurcate (or N-furcate) deals into tracks before scoring because the same Opportunity rubric does not fit all sub-types. TechGroup uses Track A (Software/AI/Cloud) vs. Track B (Hardware/Robotics/Physical Tech) because the Founder Advantage, Technical Maturity, and Unit Economics dimensions score very differently between software and hardware companies. If your group's deals are homogeneous enough that one rubric works for all of them, answer \"No\" and proceed to Section 4 with a single rubric."
  ));
  children.push(TechRef("Section 3 of the reference file."));
  children.push(QATable([
    "Does this group bifurcate (or N-furcate) deals into tracks before scoring? (Yes / No)",
    "If Yes, list each track with: track name, primary revenue/product model definition, examples of deal types",
    "If Yes, mixed-play default rule (which track wins when a deal could go either way?)",
    "If No, confirm a single Opportunity rubric will apply to all deals in this group",
  ]));

  // ── SECTION 4 — Opportunity Rubric ────────────────────────────────────────
  children.push(H1("Section 4 — Opportunity Rubric (per Track)"));
  children.push(NotePurpose(
    "This is the heart of your group's playbook. It tells the plugin how to score the 6 universal Opportunity dimensions specifically for your domain. Each dimension is scored 0–5 (total = 30 pts), and the universal Decision Logic uses the same thresholds across all groups (ADVANCE ≥ 20, WATCH 14–19, DECLINE < 14, with Market Opportunity ≤ 2 sub-floor)."
  ));
  children.push(TechRef("Section 4 of the reference file (provides Track A and Track B rubrics verbatim from gates-and-flags-techgroup.md)."));
  children.push(Body("You may rename, replace, or re-anchor any dimension to fit your domain. The universal defaults below are starting points — feel free to override any of them. What matters is that your group ends up with 6 dimensions × 0–5 anchors, with at least one sub-floor rule.", { italics:true }));

  children.push(H2("6 Universal Dimensions (defaults — override as needed)"));
  children.push(DefaultDimensionsTable([
    ["1", "Structural Discontinuity",            "Is this riding a genuine, irreversible market shift? Why is now the right moment?"],
    ["2", "Market Opportunity ⚠ SUB-FLOOR",      "Does the TAM credibly support venture-scale outcomes? Is the market growing?"],
    ["3", "Founder Advantage",                   "Does this founding team have an earned right to win in this domain?"],
    ["4", "Defensibility",                       "Can we see early seeds of a real moat, even at this stage?"],
    ["5", "Traction",                            "Is there evidence of real customer pull, not just founder push?"],
    ["6", "Venture Economics",                   "Is there a credible path to a venture-scale outcome that returns 10x for NWAi?"],
  ]));
  children.push(Spacer(160));

  // Track block instructions
  children.push(H2("Fill out per Track"));
  children.push(Callout([
    P([T("If your group has more than one track ", { bold:true }),
       T("(see Section 3), duplicate this entire block in Word and rename for each track. If you have a single rubric, fill it out once and ignore the duplication note.",
         {})], { spacing: { before:0, after:0 } }),
  ], { fill: OPT_BG }));
  children.push(Spacer(80));

  // Track Name field
  children.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2200, 7160],
    rows: [new TableRow({ children: [
      Cell([P([T("Track Name", { bold:true })])], { fill: LIGHT_GRAY, width: 2200 }),
      Cell([P([T("")])],                          { fill: WHITE,      width: 7160, padTop: 160, padBottom: 160 }),
    ]})],
  }));
  children.push(Spacer(120));

  children.push(Body("For each of the 6 dimensions below, fill in: (a) the dimension name (use default or rename), (b) what it measures in 1–2 sentences, (c) a sub-floor / hard cap rule if applicable, and (d) the scoring anchors at 5 / 4 / 3 / 2 / 1 / 0.", { italics:true }));
  children.push(Spacer(80));

  for (let n = 1; n <= 6; n++) {
    children.push(...DimensionBlock(n));
  }

  // ── SECTION 5 — Filters / Flags / Caps ────────────────────────────────────
  children.push(H1("Section 5 — Group-Specific Filters / Flags / Caps"));
  children.push(NotePurpose(
    "TechGroup applies several non-negotiable filters during screening that cap an Opportunity score regardless of how the rest of the dimension reads (AI Wrapper Cap → Defensibility ≤ 2/5; TRL < 5 → deal-stopper; Hardware Last Mile failure → cap on Founder Advantage). These are how a group encodes its hard-won pattern recognition into the screen. Your group probably has 2–5 of these."
  ));

  children.push(H2("Examples to prompt thinking (suggestive, not prescriptive)"));
  const examples = [
    ["Medical",     "FDA pathway gate (510(k) vs. PMA — affects time to revenue), clinical-data ownership cap (does the company own its outcomes data?), reimbursement-pathway flag (CPT code or no?)"],
    ["Space",       "ITAR / dual-use export gate, anchor-customer government dependency flag (>50% revenue from one government customer?), launch-cadence dependency cap"],
    ["Consumer",    "Channel-economics floor (does the unit economics survive Amazon/retailer fees?), brand-defensibility cap (is the brand the only moat?), CAC payback ceiling"],
    ["Industrial",  "Capital-intensity cap (is the BOM-to-ASP gap survivable?), customer-concentration flag (top-3 customers > 60% of revenue?), supply-chain single-source flag"],
    ["Fintech",     "Regulatory-license gate (BSA/AML, money transmitter, broker-dealer — has the company secured the licenses it needs?), KYC/AML maturity flag, partner-bank dependency cap"],
  ];
  children.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1700, 7660],
    rows: examples.map((r, i) => new TableRow({ children: [
      Cell([P([T(r[0], { bold:true })])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: 1700 }),
      Cell([P([T(r[1])])],                { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: 7660 }),
    ]})),
  }));
  children.push(TechRef("Section 5 of the reference file (AI Wrapper Cap, Goliath Test, Replicability Speed Flag, Hardware Last Mile Standard, TRL Hard Cap)."));

  children.push(H2("Your filters / flags / caps"));
  children.push(FormTable({
    headers: ["#", "Filter / Flag / Cap Name", "What it tests",
              "Cap effect (e.g., \"Dimension X capped at 2/5\", \"DECLINE\", \"Yellow Flag\")",
              "Applies at Screen / Scout / Diligence"],
    widths:  [500, 2100, 2400, 2700, 1660],
    rowCount: 5,
  }));

  // ── SECTION 6 — Defensibility / Moat Lens ─────────────────────────────────
  children.push(H1("Section 6 — Defensibility / Moat Lens"));
  children.push(NotePurpose(
    "The plugin applies a moat lens when assessing Defensibility (Opportunity Dimension 4) and when generating moat narratives in the Scout, DD Report, and Memo. TechGroup uses the AI Moats Framework (ai-moats-framework.md) — three moat archetypes (Cognitive/Data Moat, Capital & Compute Moat, Vertical/Workflow Moat) plus a Replicability Speed Matrix. Your group needs to articulate what \"moat\" means in your domain so the plugin doesn't apply TechGroup's AI-flavored lens to a Medical or Space deal where it doesn't fit."
  ));
  children.push(TechRef("Section 6 of the reference file (3 AI moat types + Replicability Speed Matrix + Memory Lock-in framing)."));
  children.push(QATable([
    "2–4 moat archetypes that matter most in this domain (name + 2-sentence description each)",
    "What \"Structural Discontinuity\" means in this domain (what kind of market shift counts as a real discontinuity for your deals?)",
    "What \"Memory Lock-in\" or its equivalent looks like in your domain (what kind of customer-side accumulation creates real switching cost?)",
    "Should ai-moats-framework.md be loaded for some of your group's deals (e.g., AI-enabled subset)? Yes / No / Conditional",
    "Do you need a separate group-specific moats reference doc? Yes / No (if yes, sketch the outline in 5–10 bullets)",
  ]));

  // ── SECTION 7 — Themes & SMEs ─────────────────────────────────────────────
  children.push(H1("Section 7 — Themes & SMEs"));
  children.push(NotePurpose(
    "Every NWAi group organizes its deal flow into 5–8 investment themes. The plugin uses theme assignment in Scout reports to map deals to the right Lead and SMEs."
  ));
  children.push(Callout([
    P([T("Lead and SME slots: ", { bold:true }),
       T("Leave as \"TBD — Pending Dealum API\" for now. The plugin already uses this convention for TechGroup until the Dealum member-to-domain mapping is wired up. Just provide the themes themselves; the people-mapping comes later.")],
      { spacing: { before:0, after:0 } }),
  ], { fill: NOTE_BG }));
  children.push(TechRef("Section 7 of the reference file (5 themes from CLAUDE.md)."));

  children.push(FormTable({
    headers: ["#", "Theme Name", "1–2 sentence definition", "Example deal types"],
    widths:  [500, 2200, 4360, 2300],
    rowCount: 8,
  }));
  children.push(Hint("Rows 6–8 are optional — most groups land at 5 themes."));

  // ── SECTION 8 — Group-Specialist Agent (Optional) ─────────────────────────
  children.push(H1("Section 8 — Group-Specialist Agent (Optional)"));
  children.push(OptionalCallout("Section 8"));
  children.push(NotePurpose(
    "The plugin has 9 research agents today. 7 are group-agnostic and run for every deal regardless of group. 1 is TechGroup-specialized (technical-diligence). Your group may need its own specialist agent — or it may be fine using technical-diligence as-is, or it may not need a specialist agent at all."
  ));

  children.push(H2("Group-agnostic agents (run for every deal)"));
  const agnosticAgents = [
    ["company-researcher",   "PMTF + founder verification"],
    ["market-analyst",       "TAM/SAM, structural discontinuity, timing"],
    ["competitive-intelligence", "competitors, incumbents"],
    ["risk-assessor",        "regulatory, exit, execution"],
    ["pricing-analyst",      "pricing maturity, unit economics, channel"],
    ["forecasting-analyst",  "independent 5-yr forecast (McMurry method)"],
    ["venture-analyst",      "valuation, hurdle test, deal structure"],
  ];
  children.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [3000, 6360],
    rows: agnosticAgents.map((r, i) => new TableRow({ children: [
      Cell([P([T(r[0], { bold:true })])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: 3000 }),
      Cell([P([T(r[1])])],                { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: 6360 }),
    ]})),
  }));

  children.push(H2("Examples that would warrant a specialist agent"));
  const specialistExamples = [
    ["Medical",    "regulatory-diligence — FDA pathway evaluation, clinical trial design, reimbursement landscape, IP/patent in pharma/devices"],
    ["Space",      "mission-fit — ITAR/dual-use posture, government program alignment, launch-cadence assumptions, anchor-customer analysis"],
    ["Consumer",   "channel-economics — Amazon/retailer margin structure, brand defensibility, CAC/LTV in DTC vs. wholesale"],
    ["Industrial", "manufacturing-diligence — supply chain, contract manufacturing fit, capital-intensity modeling, customer concentration"],
    ["Fintech",    "regulatory-diligence — license posture, partner-bank dependency, KYC/AML maturity, BSA program"],
  ];
  children.push(new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1700, 7660],
    rows: specialistExamples.map((r, i) => new TableRow({ children: [
      Cell([P([T(r[0], { bold:true })])], { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: 1700 }),
      Cell([P([T(r[1])])],                { fill: i % 2 === 0 ? LIGHT_GRAY : WHITE, width: 7660 }),
    ]})),
  }));

  children.push(TechRef("Section 8 of the reference file (technical-diligence agent summary)."));

  children.push(H2("Your specialist-agent answer"));
  children.push(QATable([
    "Does your group need a domain-specialist agent? (Yes — new agent / Yes — technical-diligence is sufficient / No — no specialist needed)",
    "If new agent: proposed agent name (lowercase-hyphen)",
    "If new agent: 3–5 bullets on what it researches",
    "If new agent: 3–5 bullets on what input data it consumes (deal room files, web research, founder interviews, etc.)",
    "If new agent: what its output briefing looks like (which DD Report sections does it feed?)",
    "If new agent: at which stage(s) does it run? (Scout light / Diligence full / both)",
  ]));

  // ── SUBMISSION ────────────────────────────────────────────────────────────
  children.push(H1("Submission"));
  children.push(Body("When you've completed this questionnaire, save it as:"));
  children.push(P([T("NWAi-Group-Playbook-Intake-<GroupName>.docx",
                    { bold:true, font:"Consolas", size:22 })],
                  { spacing: { before: 60, after: 60 } }));
  children.push(Body("…and notify Jamie. He'll translate your answers into the runtime files the plugin needs. Expect one or two clarifying-question rounds before the group goes live in the plugin."));
  children.push(Callout([
    P([T("You will not be asked to write plugin code. ", { bold:true }),
       T("Your deliverable is this filled-out questionnaire. The plugin maintainer takes it from there.")],
      { spacing: { before:0, after:0 } }),
  ], { fill: NOTE_BG }));

  children.push(Spacer(200));
  children.push(P([T("NWAi Investment Intelligence Platform  |  Group Intake v1.0  |  May 2026",
                    { size:18, italics:true, color:GRAY })],
                  { align: AlignmentType.CENTER, spacing: { before:120, after:0 } }));

  return new Document({
    creator: "NWAi Investment Intelligence Platform",
    title: "NWAi Group Playbook — Intake Questionnaire",
    description: "Group Chair intake questionnaire for extending the NWAi plugin to all 6 NWAi groups.",
    styles: {
      default: {
        document: { run: { font: FONT, size: 22 } },
      },
    },
    sections: [{
      headers: {
        default: new Header({ children: [
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [
            new TextRun({ text: "NWAi — Group Playbook Intake (Confidential)",
                          font: FONT, size: 18, color: GRAY }),
          ]}),
        ]}),
      },
      footers: {
        default: new Footer({ children: [
          new Paragraph({ alignment: AlignmentType.CENTER, children: [
            new TextRun({ text: "Group Playbook Intake v1.0  |  Page ",
                          font: FONT, size: 18, color: GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: GRAY }),
            new TextRun({ text: " of ", font: FONT, size: 18, color: GRAY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 18, color: GRAY }),
          ]}),
        ]}),
      },
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 },
        },
      },
      children,
    }],
  });
}

// ─── Run ─────────────────────────────────────────────────────────────────────

const outFile = path.resolve(
  __dirname,
  "..",
  "docs",
  "group-intake",
  "NWAi-Group-Playbook-Intake-Template.docx"
);

Packer.toBuffer(buildDoc()).then((buf) => {
  fs.writeFileSync(outFile, buf);
  console.log(`✓ Wrote ${outFile} (${(buf.length / 1024).toFixed(1)} KB)`);
}).catch((err) => {
  console.error("Failed to build doc:", err);
  process.exit(1);
});
