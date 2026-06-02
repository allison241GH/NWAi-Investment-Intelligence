// NWAi TechGroup Triage Report — RootCause.ai — 2026-05-27
// Generates a Word document matching the in-chat triage report.

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  PageOrientation,
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
const RED = "C00000";
const GRAY = "F4F4F4";

const FONT = "Arial";

const COMPANY = "RootCause.ai";
const DATE_STR = "2026-05-27";
const VERDICT = "ADVANCE TO SCOUT";
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
  const runs = Array.isArray(text)
    ? text
    : [txt(text, opts)];
  return new Paragraph({
    children: runs,
    alignment: opts.alignment || AlignmentType.LEFT,
    spacing: { before: opts.before || 80, after: opts.after || 80 },
  });
}

function sectionBanner(label) {
  return new Paragraph({
    children: [
      new TextRun({
        text: label,
        font: FONT,
        size: 24,
        bold: true,
        color: WHITE,
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
    spacing: { before: 240, after: 120 },
  });
}

function cell(text, opts = {}) {
  const runs = Array.isArray(text)
    ? text.map((t) => (typeof t === "string" ? txt(t) : t))
    : [typeof text === "string" ? txt(text, opts) : text];
  return new TableCell({
    children: [
      new Paragraph({
        children: runs,
        spacing: { before: 40, after: 40 },
      }),
    ],
    shading: opts.fill
      ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill }
      : undefined,
    width: opts.width
      ? { size: opts.width, type: WidthType.PERCENTAGE }
      : undefined,
    borders: cellBorders,
  });
}

function headerCell(text, width) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: FONT,
            size: 20,
            bold: true,
            color: WHITE,
          }),
        ],
        spacing: { before: 60, after: 60 },
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    borders: cellBorders,
  });
}

function table(rows) {
  return new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// ---- Signal Summary callout ----
const signalSummary = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "INVESTMENT SIGNAL SUMMARY",
                  font: FONT,
                  size: 24,
                  bold: true,
                  color: WHITE,
                }),
              ],
              spacing: { before: 80, after: 80 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Opportunity Score:  24 / 30   |   Readiness Score:  16 / 25",
                  font: FONT,
                  size: 22,
                  bold: true,
                  color: WHITE,
                }),
              ],
              spacing: { before: 40, after: 40 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Recommendation:  ADVANCE TO SCOUT  ✓",
                  font: FONT,
                  size: 24,
                  bold: true,
                  color: WHITE,
                }),
              ],
              spacing: { before: 40, after: 80 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text:
                    "Signal: Causal inference at enterprise scale with a credentialed PhD team, a real algorithmic claim (O(n log n)), $365K signed ARR with named Global 2000 logos, and an LLM-Ingestion-NO architecture — the rare AI deal where the moat thesis is genuinely mathematical rather than prompt-engineering theater.",
                  font: FONT,
                  size: 20,
                  italics: true,
                  color: WHITE,
                }),
              ],
              spacing: { before: 40, after: 80 },
            }),
          ],
          shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
          borders: cellBorders,
        }),
      ],
    }),
  ],
});

// ---- Section 0 — Company Snapshot ----
const snapshotRows = [
  ["Company", "RootCause.ai (operating entity: Perceptura, Inc.)"],
  [
    "Product / Offering",
    "Causal-inference platform — upload data, discover causal structure, simulate interventions, explainable answers. Positioning as a causal digital twin for enterprises.",
  ],
  [
    "Target Customer",
    'Global 2000 data/analytics teams already investing in causal inference (initial ICP = "companies hiring for causal inference roles")',
  ],
  [
    "Sector",
    "Decision Intelligence / Causal AI / Enterprise Data Platforms (TechGroup Theme 1 — Infrastructure & Foundational Stack)",
  ],
  [
    "Business Model",
    "Enterprise SaaS with pilot-to-ARR motion; API access, weekly runs, PowerBI export at expansion tier",
  ],
  [
    "Stage",
    "Revenue-generating — $365K ARR signed + $365K signed pilots; $4.25M ARR pipeline, $475K pilot pipeline",
  ],
  [
    "Funding Ask",
    "$3M target / $4M max, $20M post-money cap, $2.8M committed (structure appears SAFE based on cap language)",
  ],
];

const snapshotTable = table([
  new TableRow({
    children: [headerCell("Field", 25), headerCell("Description", 75)],
  }),
  ...snapshotRows.map(
    (r, i) =>
      new TableRow({
        children: [
          cell(r[0], { fill: i % 2 === 0 ? GRAY : WHITE, bold: true }),
          cell(r[1], { fill: i % 2 === 0 ? GRAY : WHITE }),
        ],
      }),
  ),
]);

// ---- Section 1 — Hard Gates ----
const gatesTable = table([
  new TableRow({
    children: [
      headerCell("Gate", 30),
      headerCell("Status", 15),
      headerCell("Finding", 55),
    ],
  }),
  new TableRow({
    children: [
      cell("Foreign Entity / IP Structure"),
      cell("UNCLEAR (MET pending)", { fill: AMBER, bold: true }),
      cell(
        "SF + London offices stated; founders have UK academic origins (Brunel); US entity / IP domicile not explicitly confirmed in deck — verify at IntroCall but does not fail screen on silence.",
      ),
    ],
  }),
  new TableRow({
    children: [
      cell("Market Size Threshold"),
      cell("MET", { fill: GREEN, bold: true }),
      cell(
        "Causal AI market $89M–$40B+ depending on definition, growing 39%+ CAGR; parent Decision Intelligence market $16B+ (2025); comfortably venture-scale.",
      ),
    ],
  }),
  new TableRow({
    children: [
      cell("Commercialization Path"),
      cell("MET", { fill: GREEN, bold: true }),
      cell(
        "$365K signed ARR with paying logos (Cryptography, Calix, Volvo, Brightstar); 100% of pilots Global 2000; repeatable pilot motion documented.",
      ),
    ],
  }),
]);

// ---- Section 2 — NWA Filter Results ----
const filterTable = table([
  new TableRow({
    children: [
      headerCell("Test", 25),
      headerCell("Result", 20),
      headerCell("Rationale", 55),
    ],
  }),
  new TableRow({
    children: [
      cell("Goliath Test"),
      cell("UNCLEAR", { fill: AMBER, bold: true }),
      cell(
        "Microsoft Research backs PyWhy/DoWhy/EconML and has causal talent in-house; could plausibly ship a hosted causal product in 12–18 months. The O(n log n) algorithmic claim is the structural counter-argument but is unverified at screen stage.",
      ),
    ],
  }),
  new TableRow({
    children: [
      cell("LLM Ingestion Test"),
      cell("NO", { fill: GREEN, bold: true }),
      cell(
        "Causal discovery requires specialized algorithms (PC, FCI, GES, NOTEARS, ground-up C++ engine) — a GPT-4o agent cannot replicate causal structure discovery from observational data. Genuine math, not prompt orchestration.",
      ),
    ],
  }),
  new TableRow({
    children: [
      cell("AI Wrapper Risk"),
      cell("LOW", { fill: GREEN, bold: true }),
      cell(
        "Explicit non-wrapper architecture (proprietary C++ engine, novel statistical tests for hidden variables); LLM Ingestion = NO; no Defensibility or Traction cap from this filter.",
      ),
    ],
  }),
  new TableRow({
    children: [
      cell("Revenue Quality"),
      cell("STICKY", { fill: GREEN, bold: true }),
      cell(
        "Same software deployment across all pilots regardless of use-case; API + PowerBI integration; recurring ARR contracts; not consulting-adjacent. Cynical Default applied on unverified ARR figures pending reference checks.",
      ),
    ],
  }),
]);

// ---- Section 3 — Opportunity Score ----
function scoreCell(score) {
  let fill = AMBER;
  if (score >= 4) fill = "375623";
  else if (score <= 2) fill = RED;
  const textColor = score === 3 ? "000000" : WHITE;
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: `${score} / 5`,
            font: FONT,
            size: 22,
            bold: true,
            color: textColor,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 40 },
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: "auto", fill },
    borders: cellBorders,
  });
}

const opportunityRows = [
  [
    "Structural Discontinuity",
    4,
    '"Causal inference going from elite capability to enterprise standard" is verifiable — Gartner positions Causal AI as "high impact in 2–5 years"; 2019→2026 expansion in enterprise hiring is documented. Not a 5 because causal methods are decades-old and the demand wave is partly speculative.',
  ],
  [
    "Market Opportunity (sub-floor)",
    4,
    "Causal AI narrow market $89M–40B+ (wide vendor estimates) growing 39%+ CAGR; parent DI market $16B+ (2025) → $68B (2035). Web-corroborated. Sub-floor cleared.",
  ],
  [
    "Founder Advantage",
    5,
    "Verified: Ayman Elhalwagy — PhD Applied AI, 2023 Brunel Research Impact Award, NASA/UKAEA dataset fusion work; Rod Boothby — co-founder of npm (real Microsoft acquisition exit); Jake Friedenberg — ex-npm, ex-Tonic.ai enterprise GTM; Jonas Skackauskas — Intel-deployed combinatorial optimization. Unusually deep PhD bench (Dzalbs, Savostyanov tensor decomposition).",
  ],
  [
    "Defensibility Signal",
    3,
    'LLM Ingestion = NO (positive); Goliath Test = UNCLEAR (Microsoft threat) → cap at 3/5. Cynical Default applied to unverified "876,000x faster" and "O(n log n) first" claims pending IP/patent verification. Architecture and team are strong but algorithmic moat is unproven externally.',
  ],
  [
    "Traction Signal",
    4,
    "$365K ARR signed + $365K pilots signed; $4.25M ARR pipeline; named logos (Calix VP Analytics quoted directly, Volvo, Brightstar); 100% Global 2000 pilots; repeatable deployment process. Revenue Quality: Sticky. Cynical Default present (unverified ARR) — not 5 until references checked.",
  ],
  [
    "Venture Economics",
    4,
    "Clear $100M+ ARR path via causal → broader Decision Intelligence expansion; financial projection $11.2M ARR by 2028; acquirer landscape visible (Snowflake, Databricks, Microsoft, Palantir); Series A milestones explicit ($2M+ ARR). Unit economics not fully shown — caps at 4.",
  ],
];

const opportunityTable = table([
  new TableRow({
    children: [
      headerCell("Dimension", 25),
      headerCell("Score", 12),
      headerCell("Evidence / Rationale", 63),
    ],
  }),
  ...opportunityRows.map(
    (r) =>
      new TableRow({
        children: [cell(r[0], { bold: true }), scoreCell(r[1]), cell(r[2])],
      }),
  ),
  new TableRow({
    children: [
      cell("TOTAL", { bold: true, fill: LIGHT_BLUE }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "24 / 30",
                font: FONT,
                size: 24,
                bold: true,
                color: WHITE,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: { type: ShadingType.CLEAR, color: "auto", fill: "375623" },
        borders: cellBorders,
      }),
      cell("STRONG (≥20)", { bold: true, fill: LIGHT_BLUE }),
    ],
  }),
]);

// ---- Section 4 — Readiness Score ----
const readinessRows = [
  [
    "Deal Structure",
    2,
    '"$20M post-money cap" language is YC-style SAFE syntax; no priced round indicated. NWAi requires equity or convertible debt — structure conversation mandatory at IntroCall.',
  ],
  [
    "Product Maturity",
    4,
    "Live product with paying customers, working dashboard (Digital Twin UI shown in deck), API access, PowerBI export. Retention metrics not disclosed (not 5).",
  ],
  [
    "Syndication Readiness",
    3,
    "$2.8M of $3M target committed — strong round momentum; no named institutional lead disclosed. Angel-led or syndicate-led round suspected.",
  ],
  [
    "Traction Velocity",
    3,
    "Projection $365K → $1.7M ARR EOY 2026 (4.7x). 16 qualified meetings in 4 weeks by new SDR. MoM growth rate not disclosed. Revenue Quality: Sticky.",
  ],
  [
    "Founder Accessibility",
    4,
    "SF + London; Jake Friedenberg (COO) listed as direct contact (jake@rootcause.ai); professional deck; clearly active GTM motion. Geographic complexity is a minor friction.",
  ],
];

const readinessTable = table([
  new TableRow({
    children: [
      headerCell("Dimension", 25),
      headerCell("Score", 12),
      headerCell("Signal / Friction Note", 63),
    ],
  }),
  ...readinessRows.map(
    (r) =>
      new TableRow({
        children: [cell(r[0], { bold: true }), scoreCell(r[1]), cell(r[2])],
      }),
  ),
  new TableRow({
    children: [
      cell("TOTAL", { bold: true, fill: LIGHT_BLUE }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "16 / 25",
                font: FONT,
                size: 24,
                bold: true,
                color: "000000",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: { type: ShadingType.CLEAR, color: "auto", fill: AMBER },
        borders: cellBorders,
      }),
      cell("MODERATE (above 15/25 floor — no downgrade)", {
        bold: true,
        fill: LIGHT_BLUE,
      }),
    ],
  }),
]);

// ---- Section 5 — Risk Flags ----
const redFlags = ["None identified at screen stage."];
const yellowFlags = [
  "SAFE structure suspected ($20M post-money cap language) — NWAi requires equity or convertible debt; explicit conversation needed",
  "Goliath Test UNCLEAR — Microsoft Research is the named threat; PyWhy/DoWhy/EconML stack already exists; ask the algorithmic-moat question directly",
  "O(n log n) and 876,000x speed claims are central to the moat thesis and require IP/patent verification or published benchmark substantiation",
  "US entity structure and IP domicile unconfirmed (UK academic origins, SF + London operations) — verify per NWAi Foreign Entity gate",
  "No named institutional lead in $3M round despite $2.8M committed — confirm round structure and lead at IntroCall",
  'Direct competitor CausaLens has "3–4 years ahead on distribution" (Snowflake/Google Cloud partnerships); RootCause\'s claim of beating them head-to-head at Calix needs reference validation',
];

function flagPara(text, color) {
  return new Paragraph({
    children: [txt(`• ${text}`, { size: 20, color })],
    spacing: { before: 40, after: 40 },
  });
}

// ---- Section 6 — Recommendation ----
const verdictTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "VERDICT: ADVANCE TO SCOUT  ✓",
                  font: FONT,
                  size: 26,
                  bold: true,
                  color: WHITE,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 100, after: 100 },
            }),
          ],
          shading: { type: ShadingType.CLEAR, color: "auto", fill: GREEN },
          borders: cellBorders,
        }),
      ],
    }),
  ],
});

const whyPara = new Paragraph({
  children: [
    txt("Why: ", { bold: true, size: 22 }),
    txt(
      "This is one of the rare AI-tagged deals where the moat thesis is genuinely mathematical rather than prompt-engineering — LLM Ingestion Test cleanly fails (in RootCause's favor), the team has real PhD depth and a verified prior Microsoft exit (npm), and there is paying enterprise traction at Calix/Volvo/Brightstar with a repeatable pilot-to-ARR motion.",
      { size: 22 },
    ),
  ],
  spacing: { before: 120, after: 80 },
});

const concernPara = new Paragraph({
  children: [
    txt("Primary Concern: ", { bold: true, size: 22 }),
    txt(
      "The Goliath Test is UNCLEAR — Microsoft owns the open-source causal stack (PyWhy/DoWhy/EconML), and the central defensibility argument (O(n log n) algorithmic breakthrough) is unverified at screen stage. The SAFE structure also requires resolution before NWAi can proceed.",
      { size: 22 },
    ),
  ],
  spacing: { before: 80, after: 160 },
});

// ---- Live Pitch Questions ----
const lpQuestions = [
  {
    title: "1. Algorithmic moat depth.",
    body: 'The O(n log n) causal discovery claim and the "ground-breaking statistical tests that detect hidden variables not in the data" are the central defensibility argument. What IP protection exists today — filed patents, trade secrets, or publication-and-license strategy — and specifically what prevents Microsoft Research from publishing an equivalent approach in PyWhy within 18 months once the math is in the public domain?',
  },
  {
    title: "2. Round structure.",
    body: "The $20M post-money cap language is consistent with a YC-style SAFE. NWAi's investment criteria require priced equity (preferred) or convertible debt — not SAFEs. Is this round a SAFE, and if so, what is the conversion event, the qualified financing threshold, and the discount rate? Would you consider re-papering as a convertible note for NWAi participation?",
  },
  {
    title: "3. Revenue durability.",
    body: "$365K ARR is signed across Cryptography, Calix, Volvo, and Brightstar. What is the average contract length, how many of these are multi-year vs. one-year pilots, and what does net retention look like on the 2025 cohort? Specifically — for the Calix engagement that beat CausaLens head-to-head, what was the renewal/expansion outcome?",
  },
  {
    title: "4. Entity and IP domicile.",
    body: "The team operates in San Francisco and London, with UK academic origins (Brunel, UKAEA). Where is the operating entity domiciled, where does the core IP (the C++ engine and the novel statistical tests) sit on the cap table, and is there a US C-Corp parent with US-owned IP — the NWAi geography gate?",
  },
  {
    title: "5. Series A path realism.",
    body: 'The Series A milestone is $2M+ ARR plus "diversified Causal/Non-Causal ARR." At $365K today with $4.25M pipeline, what is the realistic close rate on that pipeline, what is the monthly burn against the $3–4M raise, and which specific named engagements (Bayer, DHL, KPMG, Lloyds, Caesars) are most likely to convert to signed ARR in the next 12 months?',
  },
];

const lpHeader = new Paragraph({
  children: [
    new TextRun({
      text: "Live Pitch Questions — RootCause.ai",
      font: FONT,
      size: 26,
      bold: true,
      color: WHITE,
    }),
  ],
  shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
  spacing: { before: 200, after: 120 },
});

const lpParas = lpQuestions.flatMap((q) => [
  new Paragraph({
    children: [txt(q.title, { bold: true, size: 22 })],
    spacing: { before: 120, after: 40 },
  }),
  new Paragraph({
    children: [txt(q.body, { size: 20 })],
    spacing: { before: 40, after: 80 },
  }),
]);

// ---- Document assembly ----
const docChildren = [
  new Paragraph({
    children: [
      new TextRun({
        text: "NWA TRIAGE REPORT — RootCause.ai",
        font: FONT,
        size: 32,
        bold: true,
        color: NAVY,
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 80 },
  }),
  new Paragraph({
    children: [
      txt("Screened: 2026-05-27   |   TechGroup   |   Track A: Software / AI / Cloud", {
        size: 22,
        italics: true,
        color: "595959",
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
  }),

  signalSummary,

  sectionBanner("SECTION 0 — COMPANY SNAPSHOT"),
  snapshotTable,

  sectionBanner("SECTION 1 — HARD GATES"),
  gatesTable,

  sectionBanner("SECTION 2 — NWA FILTER RESULTS (TRACK A)"),
  filterTable,

  sectionBanner("SECTION 3 — OPPORTUNITY SCORE (TRACK A)"),
  opportunityTable,

  sectionBanner("SECTION 4 — READINESS SCORE"),
  readinessTable,

  sectionBanner("SECTION 5 — RISK FLAGS"),
  new Paragraph({
    children: [txt("RED FLAGS (structural concerns):", { bold: true, size: 22, color: RED })],
    spacing: { before: 80, after: 40 },
  }),
  ...redFlags.map((f) => flagPara(f, "000000")),
  new Paragraph({
    children: [txt("YELLOW FLAGS (verify at IntroCall):", { bold: true, size: 22, color: "996515" })],
    spacing: { before: 160, after: 40 },
  }),
  ...yellowFlags.map((f) => flagPara(f, "000000")),

  sectionBanner("SECTION 6 — RECOMMENDATION"),
  verdictTable,
  whyPara,
  concernPara,

  lpHeader,
  ...lpParas,
];

const doc = new Document({
  creator: "NWAi TechGroup",
  title: "NWA Triage Report — RootCause.ai",
  description: "Investment Triage Report — Screened 2026-05-27",
  styles: {
    default: {
      document: { run: { font: FONT, size: 20 } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: {
            width: 12240,
            height: 15840,
            orientation: PageOrientation.PORTRAIT,
          },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                txt("NWAi TechGroup — Investment Triage Report", {
                  size: 18,
                  color: "595959",
                }),
                new TextRun({
                  children: ["\t"],
                }),
                txt(`Date: ${DATE_STR}`, { size: 18, color: "595959" }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                txt("NWAi Investment Intelligence — Confidential", {
                  size: 16,
                  color: "808080",
                }),
                new TextRun({ children: ["\t"] }),
                new TextRun({
                  children: ["Page ", PageNumber.CURRENT],
                  font: FONT,
                  size: 16,
                  color: "808080",
                }),
              ],
              tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            }),
          ],
        }),
      },
      children: docChildren,
    },
  ],
});

const outDir =
  "/Users/jamie/ClaudeCodeProjects/nwa-intelligence/deals/active/RootCause.ai/Reports";
const outFile = path.join(outDir, `RootCause.ai - Triage Report ${DATE_STR}.docx`);

Packer.toBuffer(doc).then((buf) => {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, buf);
  console.log("Saved:", outFile);
});
