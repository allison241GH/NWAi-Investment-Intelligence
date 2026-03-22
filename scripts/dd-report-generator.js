/**
 * NWAi DD Investment Report — Canonical Generator
 *
 * FORMAT SOURCE: STL-NWAi-DD-Report-2026-03-19.docx (reference master)
 *
 * STRUCTURE (table-driven — no freestanding prose):
 *   1. Green recommendation box (top of document)
 *   2. Company description table (4-col, alternating rows)
 *   3. Sections 1–11: each is a 2-row × 2-col table
 *        Row 0: [navy header | "Score" label]
 *        Row 1: [content cell | score digit in color-coded cell]
 *   4. Recommendation table (full-width, 1-col)
 *   5. DD Team Votes table
 *   6. Appendix A — Outstanding Diligence Items table
 *
 * SCORE COLORS:
 *   5 → 375623 (dark green), white text
 *   4 → 375623 (dark green), white text
 *   3 → FFC000 (amber), black text
 *   2 → C00000 (dark red), white text
 *   1 → C00000 (dark red), white text
 *
 * SECTION CONTENT CELL BACKGROUNDS:
 *   dark  → 1F3864 (navy), white text — used for technical/internal sections
 *   light → FFFFFF, black text       — used for market/GTM/pipeline sections
 *
 * USAGE:
 *   const { generateDDReport } = require('./dd-report-generator');
 *   generateDDReport(data, 'Company-Name-NWAi-DD-Report-2026-03-22.docx');
 *
 * DATA SHAPE: see the `data` parameter documentation in generateDDReport() below.
 */

"use strict";

const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, PageNumber, AlignmentType, WidthType,
  BorderStyle, ShadingType, VerticalAlign
} = require("docx");
const fs = require("fs");

// ─── Constants ───────────────────────────────────────────────────────────────

const FONT         = "Arial";
const CW           = 9360;   // Total content width DXA (9" at 1" margins)
const SEC_CONTENT  = 8500;   // Section content column width
const SEC_SCORE    = 860;    // Section score column width
const NAVY         = "1F3864";
const GREEN_BG     = "E8F5E9";   // Recommendation box
const SCORE_GREEN  = "375623";   // Score 4–5
const SCORE_AMBER  = "FFC000";   // Score 3
const SCORE_RED    = "C00000";   // Score 1–2
const LIGHT_GRAY   = "F4F4F4";
const WHITE        = "FFFFFF";

// ─── Low-level helpers ────────────────────────────────────────────────────────

/** Single TextRun */
const T = (text, { bold=false, size=22, color="000000", font=FONT }={}) =>
  new TextRun({ text, bold, size, color, font });

/** Paragraph with optional alignment */
const P = (runs, { spacing={ before:60, after:60 }, align }={}) =>
  new Paragraph({ children: Array.isArray(runs) ? runs : [runs], spacing,
                  alignment: align || AlignmentType.LEFT });

/** Shaded cell with multiple paragraphs */
const Cell = (paragraphs, { fill=WHITE, width=CW, bold=false, color="000000", vAlign }={}) =>
  new TableCell({
    children: paragraphs.map(p =>
      typeof p === "string"
        ? P([T(p, { bold, color })])
        : p
    ),
    shading: { type: ShadingType.CLEAR, color: "auto", fill },
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    ...(vAlign ? { verticalAlign: vAlign } : {}),
  });

/** Score background color by score integer */
const scoreFill = (s) => s >= 4 ? SCORE_GREEN : s === 3 ? SCORE_AMBER : SCORE_RED;
/** Score text color by score integer */
const scoreColor = (s) => s === 3 ? "000000" : "FFFFFF";

/**
 * Build one scored section table.
 * @param {string} heading   e.g. "1.  THE PROBLEM / MARKET OPPORTUNITY"
 * @param {Array}  paras     Array of Paragraph objects OR strings for the content cell
 * @param {number} score     1–5
 * @param {boolean} darkBg   ignored — content cell is always white with black text
 */
const SectionTable = (heading, paras, score, darkBg=false) => {
  const contentBg    = WHITE;
  const contentColor = "000000";

  // Convert any string paras to Paragraph objects
  const contentParas = paras.map(p =>
    typeof p === "string"
      ? P([T(p, { color: contentColor })])
      : p
  );

  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [SEC_CONTENT, SEC_SCORE],
    rows: [
      // Header row
      new TableRow({ children: [
        Cell([P([T(heading, { bold:true, color:WHITE })])], { fill: NAVY, width: SEC_CONTENT }),
        Cell([P([T("Score",  { bold:true, color:WHITE })])], { fill: NAVY, width: SEC_SCORE  }),
      ]}),
      // Content + score row
      new TableRow({ children: [
        new TableCell({
          children: contentParas,
          shading: { type: ShadingType.CLEAR, color:"auto", fill: contentBg },
          width: { size: SEC_CONTENT, type: WidthType.DXA },
          margins: { top:100, bottom:100, left:140, right:100 },
        }),
        new TableCell({
          children: [P([T(String(score), { bold:true, size:32, color: scoreColor(score) })],
                       { align: AlignmentType.CENTER })],
          shading: { type: ShadingType.CLEAR, color:"auto", fill: scoreFill(score) },
          width: { size: SEC_SCORE, type: WidthType.DXA },
          margins: { top:100, bottom:100, left:80, right:80 },
          verticalAlign: VerticalAlign.CENTER,
        }),
      ]}),
    ],
  });
};

/**
 * Dark-navy full-width header row (used for multi-col table headers)
 */
const NavyHeaderRow = (labels, widths) =>
  new TableRow({ children: labels.map((l, i) =>
    Cell([P([T(l, { bold:true, color:WHITE })])], { fill:NAVY, width:widths[i] })
  )});

/** Alternating-stripe data row */
const DataRow = (cells, widths, stripe=false) =>
  new TableRow({ children: cells.map((txt, i) =>
    Cell([P([T(txt)])], { fill: stripe ? LIGHT_GRAY : WHITE, width: widths[i] })
  )});

/** Bold-label data row for detail tables */
const LabelValueRow = (label, value, labelW, valueW, stripe=false) =>
  new TableRow({ children: [
    Cell([P([T(label, { bold:true })])], { fill: LIGHT_GRAY, width: labelW }),
    Cell([P([T(value)])],               { fill: WHITE,       width: valueW }),
  ]});

// ─── Main generator ──────────────────────────────────────────────────────────

/**
 * Generate the NWAi DD Investment Report.
 *
 * @param {object} data  All report content. Shape:
 * {
 *   // Header
 *   company:     string,    // "Synergist Technology, LLC (d/b/a AFFIRM)"
 *   platform:    string,
 *   stage:       string,
 *   hq:          string,
 *   round:       string,
 *   ceo:         string,
 *   raise:       string,
 *   founded:     string,
 *   checkSize:   string,    // "[TO BE CONFIRMED]"
 *   theme:       string,
 *
 *   // Top recommendation box (brief, IC-ready)
 *   recBoxVerdict:  string, // "NWAi RECOMMENDATION: ☒ WATCH — Synergist Technology"
 *   recBoxBody:     string, // conditions / rationale in 1–2 sentences
 *
 *   // Scored sections — each is { paras: string[], score: number, dark: boolean }
 *   s1:  { paras, score, dark },   // Problem / Market
 *   s2:  { paras, score, dark },   // Solution / Product
 *   s3:  { paras, score, dark },   // AI / Software Moat
 *   s4:  { paras, score, dark },   // Business Model
 *   s5:  { paras, score, dark },   // Customer Pipeline
 *   s6:  { paras, score, dark },   // Competition & Moat
 *   s7:  { paras, score, dark },   // Go-to-Market
 *   s8:  { paras, score, dark },   // Team & Execution
 *   s9:  { paras, score, dark },   // Deal Structure & Cap Table
 *   s10: { paras, score, dark },   // Financials (include proforma as paras)
 *   s11: { paras, score, dark },   // Risk (inverted)
 *   s12: { paras, score, dark },   // Exit Strategy
 *   s13: { paras, score, dark },   // What is the Bet We Are Making (VC-style: Consensus View + Our Bet)
 *
 *   // Recommendation (bottom section)
 *   recVerdict:    string,   // "☒  INVEST — [NWAi check size: TO BE CONFIRMED]"
 *   recWatch:      string,   // "☐  WATCH — Re-evaluate"  (or checked)
 *   recPass:       string,   // "☐  PASS — Do not invest"
 *   recRationale:  string,
 *   recConditions: string[], // list of condition strings
 *   recTheme:      string,
 *
 *   // DD Team Votes: array of { role, name, recommend, addon }
 *   ddVotes: [...],
 *
 *   // Appendix A: array of { item, action, owner, priority, priorityBg }
 *   //   priorityBg: "FFD7D7" (gate/red), "FFF3CD" (high/yellow), "F4F4F4" (medium), "" (low)
 *   appendixItems: [...],
 * }
 * @param {string} outFile  Output filename
 */
function generateDDReport(data, outFile) {
  const sections = [
    ["1.  THE PROBLEM / MARKET OPPORTUNITY", data.s1,  false],
    ["2.  THE SOLUTION / PRODUCT",           data.s2,  true ],
    ["3.  AI / SOFTWARE MOAT",               data.s3,  true ],
    ["4.  BUSINESS MODEL & CUSTOMERS",       data.s4,  false],
    ["5.  CUSTOMER PIPELINE",                data.s5,  false],
    ["6.  COMPETITION & MOAT",               data.s6,  false],
    ["7.  GO-TO-MARKET STRATEGY",            data.s7,  false],
    ["8.  TEAM & EXECUTION",                 data.s8,  true ],
    ["9.  DEAL STRUCTURE & CAP TABLE",       data.s9,  true ],
    ["10. FINANCIALS",                       data.s10, true ],
    ["11. RISK  (5 = lowest risk / best  |  1 = highest risk / worst)", data.s11, true ],
    ["12. EXIT STRATEGY",                    data.s12, true ],
    ["13. WHAT IS THE BET WE ARE MAKING",    data.s13, false],
  ];

  // Detail column widths for company table
  const DW = [1360, 3320, 1360, 3320];

  const doc = new Document({
    sections: [{
      headers: {
        default: new Header({ children: [
          new Paragraph({ alignment: AlignmentType.RIGHT, children: [
            new TextRun({ text: "New World Angels — Confidential Investment Report",
                          font: FONT, size: 18, color: "888888" })
          ]})
        ]}),
      },
      footers: {
        default: new Footer({ children: [
          new Paragraph({ children: [
            new TextRun({ text: `${data.company}     |     Page `, font: FONT, size: 18, color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 18, color: "888888" }),
          ]}),
        ]}),
      },
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 },
        },
      },
      children: [

        // ── TITLE ──────────────────────────────────────────────────────────
        P([T("NWAi TechGroup — Due Diligence Investment Report", { bold:true, size:28 })],
          { spacing: { before:0, after:60 } }),
        P([T(data.company, { bold:true, size:24 })],
          { spacing: { before:0, after:160 } }),

        // ── 0. GREEN RECOMMENDATION BOX ───────────────────────────────────
        new Table({
          width: { size: CW, type: WidthType.DXA },
          columnWidths: [CW],
          rows: [new TableRow({ children: [
            new TableCell({
              children: [
                P([T(data.recBoxVerdict, { bold:true, size:24 })],
                  { spacing: { before:60, after:60 } }),
                P([T(data.recBoxBody)],
                  { spacing: { before:40, after:60 } }),
              ],
              shading: { type: ShadingType.CLEAR, color:"auto", fill: GREEN_BG },
              width: { size: CW, type: WidthType.DXA },
              margins: { top:100, bottom:100, left:160, right:160 },
            }),
          ]}),
          ],
        }),

        P([T("")], { spacing: { before:40, after:40 } }),
        P([T("Scoring: 1 (lowest) to 5 (highest)", { color:"666666", size:18 })],
          { spacing: { before:0, after:160 } }),

        // ── 1. COMPANY DESCRIPTION TABLE ──────────────────────────────────
        new Table({
          width: { size: CW, type: WidthType.DXA },
          columnWidths: DW,
          rows: [
            // Merged header
            new TableRow({ children: [
              new TableCell({
                children: [P([T("COMPANY DESCRIPTION", { bold:true, color:WHITE })])],
                shading: { type:ShadingType.CLEAR, color:"auto", fill:NAVY },
                columnSpan: 4,
                width: { size: CW, type: WidthType.DXA },
                margins: { top:80, bottom:80, left:140, right:140 },
              }),
            ]}),
            // Description (merged)
            new TableRow({ children: [
              new TableCell({
                children: [P([T(data.description, { size:21 })],
                             { spacing: { before:80, after:80 } })],
                columnSpan: 4,
                width: { size: CW, type: WidthType.DXA },
                margins: { top:100, bottom:100, left:140, right:140 },
              }),
            ]}),
            // Detail rows (2 label/value pairs per row)
            ...[
              ["Platform", data.platform,  "Stage",      data.stage],
              ["HQ",       data.hq,        "Round",      data.round],
              ["CEO",      data.ceo,       "Raise",      data.raise],
              ["Founded",  data.founded,   "NWAi Check Size", data.checkSize],
            ].map((r, i) => new TableRow({ children: [
              Cell([P([T(r[0], { bold:true })])], { fill:LIGHT_GRAY, width:DW[0] }),
              Cell([P([T(r[1])])],                { fill:WHITE,      width:DW[1] }),
              Cell([P([T(r[2], { bold:true })])], { fill:LIGHT_GRAY, width:DW[2] }),
              Cell([P([T(r[3])])],                { fill:WHITE,      width:DW[3] }),
            ]})),
          ],
        }),

        P([T("")], { spacing: { before:120, after:0 } }),

        // ── 2–13. SCORED SECTIONS ─────────────────────────────────────────
        ...sections.flatMap(([heading, sec, defaultDark]) => [
          SectionTable(
            heading,
            sec.paras,
            sec.score,
            sec.dark !== undefined ? sec.dark : defaultDark
          ),
          P([T("")], { spacing: { before:60, after:0 } }),
        ]),

        // ── 14. RECOMMENDATION ────────────────────────────────────────────
        new Table({
          width: { size: CW, type: WidthType.DXA },
          columnWidths: [CW],
          rows: [
            new TableRow({ children: [
              Cell([P([T("RECOMMENDATION", { bold:true, color:WHITE })])],
                   { fill:NAVY, width:CW }),
            ]}),
            new TableRow({ children: [
              new TableCell({
                children: [
                  P([T("NWAi TechGroup Recommendation:", { bold:true })],
                    { spacing:{ before:80, after:80 } }),
                  P([T(data.recVerdict, { bold:true })],
                    { spacing:{ before:60, after:40 } }),
                  P([T(data.recWatch)],  { spacing:{ before:40, after:40 } }),
                  P([T(data.recPass)],   { spacing:{ before:40, after:80 } }),
                  P([T("Rationale:  ", { bold:true }), T(data.recRationale)],
                    { spacing:{ before:80, after:80 } }),
                  P([T("Conditions Before Capital Deployment:", { bold:true })],
                    { spacing:{ before:80, after:60 } }),
                  ...data.recConditions.map((c, i) =>
                    P([T(`${i+1}.  ${c}`)], { spacing:{ before:40, after:40 } })
                  ),
                  P([T(data.recTheme)],
                    { spacing:{ before:80, after:80 } }),
                ],
                width: { size:CW, type:WidthType.DXA },
                margins: { top:100, bottom:100, left:160, right:160 },
              }),
            ]}),
          ],
        }),

        P([T("")], { spacing:{ before:120, after:0 } }),

        // ── 15. DD TEAM VOTES ─────────────────────────────────────────────
        (() => {
          const voteW = [2340, 2340, 2340, 2340];
          return new Table({
            width: { size:CW, type:WidthType.DXA },
            columnWidths: voteW,
            rows: [
              new TableRow({ children: [
                new TableCell({
                  children: [P([T("DD TEAM VOTES", { bold:true, color:WHITE })])],
                  columnSpan: 4,
                  shading: { type:ShadingType.CLEAR, color:"auto", fill:NAVY },
                  width: { size:CW, type:WidthType.DXA },
                  margins: { top:80, bottom:80, left:140, right:140 },
                }),
              ]}),
              NavyHeaderRow(["Role","Name","Recommend","Add-On Interest"], voteW),
              ...data.ddVotes.map((v, i) =>
                new TableRow({ children: [
                  Cell([P([T(v.role)])],      { fill: i%2===0 ? WHITE : LIGHT_GRAY, width:voteW[0] }),
                  Cell([P([T(v.name)])],      { fill: i%2===0 ? WHITE : LIGHT_GRAY, width:voteW[1] }),
                  Cell([P([T(v.recommend)])], { fill: i%2===0 ? WHITE : LIGHT_GRAY, width:voteW[2] }),
                  Cell([P([T(v.addon)])],     { fill: i%2===0 ? WHITE : LIGHT_GRAY, width:voteW[3] }),
                ]})),
            ],
          });
        })(),

        P([T("")], { spacing:{ before:120, after:0 } }),

        // ── 16. APPENDIX A ────────────────────────────────────────────────
        (() => {
          const appW = [2000, 4160, 1800, 1400];
          return new Table({
            width: { size:CW, type:WidthType.DXA },
            columnWidths: appW,
            rows: [
              new TableRow({ children: [
                new TableCell({
                  children: [P([T("APPENDIX A — OUTSTANDING DILIGENCE ITEMS",
                                  { bold:true, color:WHITE })])],
                  columnSpan: 4,
                  shading: { type:ShadingType.CLEAR, color:"auto", fill:NAVY },
                  width: { size:CW, type:WidthType.DXA },
                  margins: { top:80, bottom:80, left:140, right:140 },
                }),
              ]}),
              NavyHeaderRow(
                ["DD Folder / Item","Action Required","Owner","Priority"],
                appW
              ),
              ...data.appendixItems.map(item =>
                new TableRow({ children: [
                  Cell([P([T(item.item)])],     { fill: item.priorityBg || WHITE, width:appW[0] }),
                  Cell([P([T(item.action)])],   { fill: item.priorityBg || WHITE, width:appW[1] }),
                  Cell([P([T(item.owner)])],    { fill: item.priorityBg || WHITE, width:appW[2] }),
                  Cell([P([T(item.priority)])], { fill: item.priorityBg || WHITE, width:appW[3] }),
                ]})),
            ],
          });
        })(),

      ],
    }],
  });

  const { Packer } = require("docx");
  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outFile, buf);
    console.log(`✅  Generated: ${outFile}`);
  });
}

module.exports = { generateDDReport };
