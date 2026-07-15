// NWAi TechGroup Decision Record — RootCause.ai — 2026-07-15
// Records the PASS decision following TechGroup member review of the June 2026
// Investor Diligence Response, and reconciles the June 16 Scout Assessment update.

const {
  Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, Header, Footer, PageNumber, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");
const path = require("path");

const NAVY      = "1F3864";
const WHITE     = "FFFFFF";
const AMBER     = "FFC000";
const DARKGREEN = "375623";
const RED       = "C00000";
const GRAY      = "F4F4F4";
const FONT      = "Arial";
const DATE_STR  = "2026-07-15";

const border = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };

function txt(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: opts.size || 20, bold: !!opts.bold, italics: !!opts.italics, color: opts.color || "000000" });
}
function para(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [txt(text, opts)];
  return new Paragraph({ children: runs, alignment: opts.alignment || AlignmentType.LEFT, spacing: { before: opts.before || 80, after: opts.after || 80 } });
}
function bullet(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [txt(text, opts)];
  return new Paragraph({ children: runs, bullet: { level: opts.level || 0 }, spacing: { before: 40, after: 40 } });
}
function sectionBanner(label) {
  return new Paragraph({
    children: [new TextRun({ text: label, font: FONT, size: 24, bold: true, color: WHITE })],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: NAVY },
    spacing: { before: 240, after: 120 },
  });
}
function cell(content, opts = {}) {
  const children = Array.isArray(content) ? content : [para(content, { bold: opts.bold, color: opts.color, alignment: opts.alignment, before: 40, after: 40 })];
  return new TableCell({
    children,
    shading: opts.fill ? { type: ShadingType.CLEAR, color: "auto", fill: opts.fill } : undefined,
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    columnSpan: opts.span || undefined,
    verticalAlign: "center",
  });
}
function hcell(text, opts = {}) {
  return cell([para(text, { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY, width: opts.width, span: opts.span });
}
function tbl(rows, widths) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: widths,
    borders: { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border },
    rows,
  });
}

const children = [];

// ── Title
children.push(
  new Paragraph({ children: [new TextRun({ text: "RootCause.ai", font: FONT, size: 44, bold: true, color: NAVY })], spacing: { before: 60, after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: "NWAi Investment Decision Record & Scout Reconciliation", font: FONT, size: 26, bold: true, color: "000000" })], spacing: { after: 40 } }),
  new Paragraph({
    children: [new TextRun({ text: "Decision date: " + DATE_STR + "  |  Perceptura, Inc.  |  Theme 1 — AI Infrastructure & Agent-Era Backbone  |  Track A", font: FONT, size: 18, italics: true, color: "595959" })],
    spacing: { after: 120 },
  })
);

// ── Verdict Badge
children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: { style: BorderStyle.SINGLE, size: 6, color: RED }, bottom: { style: BorderStyle.SINGLE, size: 6, color: RED }, left: { style: BorderStyle.SINGLE, size: 6, color: RED }, right: { style: BorderStyle.SINGLE, size: 6, color: RED } },
    rows: [new TableRow({ children: [new TableCell({
      children: [
        para([txt("❌ PASS — founder claims contradicted (deck vs. diligence-response discrepancy)", { bold: true, color: WHITE, size: 24 })], { before: 80, after: 40 }),
        para("TechGroup member review of the June 2026 Investor Diligence Response found the company materially overstated both the deployed technology and the quantified value delivered. The production engine is a well-known technique (pivoted Cholesky factorization); the breakthrough framed in the deck (tensor-train / cross-interpolation causal discovery) is aspirational — on the research roadmap, not built. The quoted cost savings are largely unbooked estimates. The gross discrepancy between deck and reality is disqualifying at this stage. No further consideration.", { color: WHITE, before: 40, after: 80 }),
      ],
      shading: { type: ShadingType.CLEAR, color: "auto", fill: RED },
      margins: { top: 80, bottom: 80, left: 160, right: 160 },
    })]})],
  })
);

// ── Decision Summary
children.push(sectionBanner("DECISION SUMMARY"));
function drow(label, value) {
  return new TableRow({ children: [
    cell([para(label, { bold: true, color: WHITE, before: 40, after: 40 })], { fill: NAVY, width: 28 }),
    cell(value, { width: 72 }),
  ]});
}
children.push(tbl([
  drow("Company", "RootCause.ai (Perceptura, Inc., San Francisco, CA)"),
  drow("Decision", "PASS — no further consideration"),
  drow("Decision Date", DATE_STR),
  drow("Decision Maker", "Jamie Allison, TechGroup Co-Chair — ratifying TechGroup member (SME) review of the DD Response"),
  drow("Primary Reason", "Team/founder concerns — founder claims contradicted. Deck materially overstated deployed technology and quantified value-add; DD Response walked back both."),
  drow("Secondary Reason", "No moat / defensibility — production engine is a well-known technique; the claimed differentiating architecture is roadmap-stage; scaling claim ('876,000x / O(n log n)') never benchmarked."),
  drow("Stage at Decision", "Scout/IntroCall (Diligence-pending). June 16 Scout update read ADVANCE — verification-gated, conviction 12.9/19; superseded by this decision."),
  drow("Dealum / Pipeline", "Filesystem-of-record (Dealum API deferred). Deal folder moved to deals/archive/RootCause.ai. Tags (aspirational): TechGroup-Pass, Pass-FounderClaims."),
], [2800, 7200]));

// ── Member Feedback
children.push(sectionBanner("TECHGROUP MEMBER FEEDBACK (VERBATIM — TRIGGERING INPUT)"));
children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: border, bottom: border, left: border, right: border },
    rows: [new TableRow({ children: [new TableCell({
      children: [
        para("“Ah this is a bit of a let down. What they answered with here is quite a bit different from their deck. It seems like they overstated what they've built on both the tech and for the monetization/quantified value add fronts. In terms of the tech they've deployed, that's a well known technique that they're using. The big breakthrough they framed in their deck is aspirational as they said it's on their research roadmap. Not saying they couldn't build something great someday but simply that they haven't actually built that great thing yet. And then in terms of the cost savings, it sounds like all of those are largely guesstimates. All this makes me much less interested than before and I'd probably pass just based on the gross discrepancy between the deck and reality.”", { italics: true, before: 80, after: 80 }),
      ],
      shading: { type: ShadingType.CLEAR, color: "auto", fill: GRAY },
      margins: { top: 80, bottom: 80, left: 160, right: 160 },
    })]})],
  })
);

// ── Claims Reconciliation
children.push(sectionBanner("CLAIMS RECONCILIATION — DECK vs. DD RESPONSE"));
children.push(para("Load-bearing claims from the pitch materials classified against the company's own written answers (Investor Diligence Response, June 2026).", { italics: true }));
function crow(claim, reality, verdict, fill, color) {
  return new TableRow({ children: [
    cell(claim, { width: 38 }),
    cell(reality, { width: 44 }),
    cell([para(verdict, { bold: true, color: color || WHITE, alignment: AlignmentType.CENTER, before: 40, after: 40 })], { fill, width: 18 }),
  ]});
}
children.push(tbl([
  new TableRow({ children: [hcell("Deck / Pitch Claim", { width: 38 }), hcell("DD Response Reality", { width: 44 }), hcell("Classification", { width: 18 })] }),
  crow("Breakthrough causal-discovery engine — CausalACO / tensor-train framing; '876,000x' speedup, O(n log n) scaling",
       "Production engine uses pivoted Cholesky factorization — a well-known low-rank technique. Tensor-train / Tucker / cross-interpolation are on the research roadmap, not built. Scaling claim never benchmarked.",
       "WALKED BACK", RED),
  crow("DHL '$20M in savings' (deck Slide 7)",
       "An 'estimated value-of-insight' from an assumed intervention. DHL has not booked the saving; the analytics team is separate from any implementation team.",
       "WALKED BACK", RED),
  crow("Quantified customer ROI / cost-savings narrative",
       "Company explicitly disclaims ownership of realized ROI ('we don't hold the lever that books the savings'). Measured outcomes limited to speed/accuracy metrics, self-reported.",
       "WALKED BACK", RED),
  crow("Enterprise SaaS deployment",
       "Hybrid; most engagements are customer self-hosted. A qualification, not a contradiction.",
       "QUALIFIED", AMBER, "000000"),
  crow("Named logos, metrics, and KPMG/Capgemini/Accenture/FIDDS channel",
       "Confirmed only in the company's own letter — Reported-tier evidence under the Citation Contract; never independently verified before the pass.",
       "UNVERIFIED", AMBER, "000000"),
], [3800, 4400, 1800]));

// ── Scout Reconciliation
children.push(sectionBanner("SCOUT ASSESSMENT RECONCILIATION"));
children.push(para("What the June 16 Scout update got right:", { bold: true, color: DARKGREEN, before: 120 }));
children.push(
  bullet("It caught every individual discrepancy the member caught: production engine ≠ ACO/tensor-train framing (⚠️ flag), DHL $20M unbooked (⚠️ flag), Savostyanov key-person/IP risk (⚠️ flag), scaling claim unverified (top diligence question)."),
  bullet("It correctly kept the production benchmark as the #1 gating diligence item and held Traction at 3/5 pending reference calls.")
);
children.push(para("Where it went wrong — the lesson:", { bold: true, color: RED, before: 120 }));
children.push(
  bullet([txt("It read the discrepancies as itemized diligence questions instead of a pattern. ", { bold: true }), txt("Three load-bearing claims walked back in one document is a founder-credibility signal that belongs in the verdict, not the appendix. The member weighed the pattern; the report weighed the items.")]),
  bullet([txt("It net-upgraded conviction (11.8 → 12.9) from the same document that contained the walk-backs. ", { bold: true }), txt("The Q1b, Q4, and GTM upgrades were sourced entirely from self-reported, unverified claims (named logos, named channel partners) — Reported-tier evidence that the Citation Contract already said cannot substitute for verification, yet it was allowed to raise scores.")]),
  bullet([txt("Asymmetric scoring treatment: ", { bold: true }), txt("the company's favorable self-reported claims moved scores up immediately, while its unfavorable admissions were deferred to future diligence. A credibility-neutral reading of the DD Response supports DECLINE or, at best, WATCH with independent re-verification — not ADVANCE with higher conviction.")])
);
children.push(para("Corrective action installed (see pipeline-decisions-log.md, Decision 10):", { bold: true, before: 120 }));
children.push(
  bullet([txt("Founder Claims Reconciliation: ", { bold: true }), txt("whenever founder-provided follow-up material supersedes earlier founder materials at Scout, every load-bearing prior claim is classified CONFIRMED / QUALIFIED / WALKED BACK before any re-scoring.")]),
  bullet([txt("Credibility Cap: ", { bold: true }), txt("a document that walks back a load-bearing claim cannot produce a net conviction increase; self-reported (Reported-tier) confirmations may resolve open questions but may not raise dimension scores — only independently verified evidence can.")]),
  bullet([txt("Pattern rule: ", { bold: true }), txt("two or more walked-back load-bearing claims = ❌ founder-credibility red flag; ADVANCE is off the table until the walked-back claims are independently re-verified.")])
);

// ── Next Step
children.push(sectionBanner("NEXT STEP"));
children.push(para("No further action. No investment memo. Deal archived to deals/archive/RootCause.ai. If the company independently demonstrates the production benchmark and books referenceable customer ROI in a future round, it may be re-screened as a new application.", { before: 80, after: 80 }));

const doc = new Document({
  creator: "NWAi Investment Intelligence",
  title: "RootCause.ai — NWAi Investment Decision Record (2026-07-15)",
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: "NWAi TechGroup — Investment Decision Record  ·  RootCause.ai", font: FONT, size: 16, color: "808080" }),
            new TextRun({ text: "\tDecision: " + DATE_STR, font: FONT, size: 16, color: "808080" }),
          ],
        }),
      ]}),
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: "NWAi Investment Intelligence — Confidential", font: FONT, size: 16, color: "808080" }),
            new TextRun({ children: ["\tPage ", PageNumber.CURRENT], font: FONT, size: 16, color: "808080" }),
          ],
        }),
      ]}),
    },
    children,
  }],
});

const outPath = path.join(
  __dirname, "..", "deals", "active", "RootCause.ai", "Reports",
  "RootCause.ai - Decision Record 2026-07-15.docx"
);

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(outPath, buf);
  console.log("WROTE: " + outPath);
  console.log("Size:  " + (buf.length / 1024).toFixed(1) + " KB");
}).catch(err => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
