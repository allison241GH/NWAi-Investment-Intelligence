/**
 * NWAi Executive Summary — Summit Technology Laboratory (STL)
 * 4-slide PPTX deck generator
 *
 * SOURCES:
 *   - STL-NWAi-DD-Report-2026-05-04.docx (primary, 11 scored sections + verdict)
 *   - STL-Deal-Terms-POV-2026-05-04.md (capital structure)
 *   - STL-Final-Diligence-Synthesis-2026-05-04.docx (thesis)
 *   - STL-Panasonic-Reference-Meeting-Reconciliation-2026-05-01.docx (Petro coaching memo)
 *
 * FORMAT: per .claude/skills/nwai-investment-framework/references/memo-format-reference.md
 *
 * Output: Summit-Technology-Laboratory-NWAi-Exec-Summary-2026-05-12.pptx
 */

"use strict";

const pptxgen = require("pptxgenjs");

// ── Brand constants ─────────────────────────────────────────────────────
const NAVY = "1E2761";
const NAVY_DEEP = "13183E";
const ICE = "CADCFC";
const WHITE = "FFFFFF";
const DARK_TEXT = "1A1A1A";
const GRAY_TEXT = "404040";
const LIGHT_GRAY = "F4F4F4";
const ACCENT_RED = "C00000";
const ACCENT_AMBER = "B07A00";
const ACCENT_GREEN = "375623";
const FONT = "Calibri";

// ── Slide layout (16:9 widescreen) ──────────────────────────────────────
const W = 13.333;
const H = 7.5;
const HEADER_H = 0.35;
const FOOTER_Y = 7.15;

// ── Helper: confidential header on slides 2-4 ───────────────────────────
function addHeader(slide) {
  slide.addShape("rect", {
    x: 0, y: 0, w: W, h: HEADER_H,
    fill: { color: NAVY },
    line: { color: NAVY, width: 0 },
  });
  slide.addText("New World Angels — Confidential Investment Report", {
    x: 0.3, y: 0, w: W - 0.6, h: HEADER_H,
    fontFace: FONT, fontSize: 10, bold: true, color: WHITE,
    align: "left", valign: "middle",
  });
  slide.addText("Summit Technology Laboratory", {
    x: 0.3, y: 0, w: W - 0.6, h: HEADER_H,
    fontFace: FONT, fontSize: 10, color: ICE,
    align: "right", valign: "middle",
  });
}

function addFooter(slide, pageLabel) {
  slide.addText(`${pageLabel}  |  NWAi TechGroup  |  May 12, 2026`, {
    x: 0.3, y: FOOTER_Y, w: W - 0.6, h: 0.3,
    fontFace: FONT, fontSize: 8, color: GRAY_TEXT,
    align: "right", valign: "middle",
  });
}

// ────────────────────────────────────────────────────────────────────────
// SLIDE 1 — COVER
// ────────────────────────────────────────────────────────────────────────
function buildSlide1(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: NAVY_DEEP };

  // Accent bar
  slide.addShape("rect", {
    x: 0, y: 2.85, w: W, h: 0.08,
    fill: { color: ICE }, line: { color: ICE, width: 0 },
  });

  // NWA brand strip top
  slide.addText("NEW WORLD ANGELS  ·  TECHGROUP", {
    x: 0.5, y: 0.5, w: W - 1, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: ICE,
    align: "left", charSpacing: 6,
  });

  // Title
  slide.addText("Executive Summary", {
    x: 0.5, y: 2.0, w: W - 1, h: 0.9,
    fontFace: FONT, fontSize: 44, bold: true, color: WHITE,
    align: "left",
  });

  // Subtitle line 1 — company
  slide.addText("Summit Technology Laboratory, Inc.", {
    x: 0.5, y: 3.15, w: W - 1, h: 0.65,
    fontFace: FONT, fontSize: 30, bold: true, color: WHITE,
    align: "left",
  });

  // Product tagline
  slide.addText("Artemis™ — Hardware-Agnostic Spatial-Computing Platform for Multi-Projector Immersive Displays", {
    x: 0.5, y: 3.85, w: W - 1, h: 0.5,
    fontFace: FONT, fontSize: 16, italic: true, color: ICE,
    align: "left",
  });

  // Investment subtitle
  slide.addText([
    { text: "Supports NWA Voluntary Investment of ", options: { color: WHITE, fontSize: 18 } },
    { text: "$[TO BE CONFIRMED]", options: { color: ICE, fontSize: 18, bold: true } },
    { text: "  ·  Convertible Note, $10M Cap, 20% Discount", options: { color: WHITE, fontSize: 18 } },
  ], {
    x: 0.5, y: 5.0, w: W - 1, h: 0.5,
    fontFace: FONT, align: "left",
  });

  // DD Report verdict callout
  slide.addShape("rect", {
    x: 0.5, y: 5.7, w: W - 1, h: 0.7,
    fill: { color: NAVY }, line: { color: ICE, width: 1.5 },
  });
  slide.addText([
    { text: "DD Recommendation:  ", options: { color: ICE, fontSize: 16, bold: true } },
    { text: "INVEST WITH CONDITIONS", options: { color: WHITE, fontSize: 16, bold: true } },
    { text: "  ·  5 pre-IC conditions  ·  2 soft NWAi-side terms", options: { color: ICE, fontSize: 14 } },
  ], {
    x: 0.7, y: 5.75, w: W - 1.4, h: 0.6,
    fontFace: FONT, align: "left", valign: "middle",
  });

  // Date
  slide.addText("Investment Committee Memo  ·  Members Call: [TO BE CONFIRMED]  ·  Prepared May 12, 2026", {
    x: 0.5, y: 6.7, w: W - 1, h: 0.4,
    fontFace: FONT, fontSize: 12, color: ICE,
    align: "left",
  });

  // Confidential footer
  slide.addText("CONFIDENTIAL — For NWA Members Only", {
    x: 0.5, y: 7.15, w: W - 1, h: 0.3,
    fontFace: FONT, fontSize: 9, italic: true, color: ICE,
    align: "left",
  });
}

// ────────────────────────────────────────────────────────────────────────
// SLIDE 2 — DEAL SNAPSHOT & COMPANY NARRATIVE
// ────────────────────────────────────────────────────────────────────────
function buildSlide2(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide);
  addFooter(slide, "Slide 2 of 4  ·  Deal Snapshot & Company Narrative");

  // ── LEFT COLUMN — Deal Metadata (4.5" wide) ───────────────────────────
  const LX = 0.3;
  const LW = 4.7;

  // Helper for left-column metadata block
  const dataBlock = (y, label, rows) => {
    slide.addShape("rect", {
      x: LX, y: y, w: LW, h: 0.32,
      fill: { color: NAVY }, line: { color: NAVY, width: 0 },
    });
    slide.addText(label, {
      x: LX + 0.1, y: y, w: LW - 0.2, h: 0.32,
      fontFace: FONT, fontSize: 10, bold: true, color: WHITE,
      align: "left", valign: "middle", charSpacing: 2,
    });
    const rowH = 0.22;
    rows.forEach((r, i) => {
      const ry = y + 0.32 + i * rowH;
      const fill = i % 2 === 0 ? LIGHT_GRAY : WHITE;
      slide.addShape("rect", {
        x: LX, y: ry, w: LW, h: rowH,
        fill: { color: fill }, line: { color: "E0E0E0", width: 0.5 },
      });
      slide.addText(r[0], {
        x: LX + 0.1, y: ry, w: 1.7, h: rowH,
        fontFace: FONT, fontSize: 8.5, bold: true, color: DARK_TEXT,
        align: "left", valign: "middle",
      });
      slide.addText(r[1], {
        x: LX + 1.85, y: ry, w: LW - 1.95, h: rowH,
        fontFace: FONT, fontSize: 8.5, color: DARK_TEXT,
        align: "left", valign: "middle",
      });
    });
    return y + 0.32 + rows.length * rowH;
  };

  let ly = 0.55;
  ly = dataBlock(ly, "INVESTMENT TIMING", [
    ["DD Kickoff", "March 19, 2026"],
    ["Final Synthesis", "May 4, 2026"],
    ["Members Call", "[TO BE CONFIRMED]"],
    ["Funding Close", "End-Q2 2026 (target)"],
  ]) + 0.10;

  ly = dataBlock(ly, "INDUSTRY & STAGE", [
    ["Sector", "Spatial Computing / Immersive Display SW"],
    ["TechGroup Theme", "#2 — SW-Enabled HW, Physical AI & Robotics"],
    ["TRL", "7–8 — production deployments live"],
    ["HQ", "Irvine, California (US C-Corp)"],
  ]) + 0.10;

  ly = dataBlock(ly, "DUE DILIGENCE TEAM", [
    ["DD Co-Leads", "Kevin Li · Carlos Blanco · Pat Loftus"],
    ["TechGroup", "Jamie Allison · Ron Tarro · Carolyn Groobey"],
    ["Lead SME", "Kevin Li"],
    ["Legal", "Jon Cole (review) · Jason Stark (NWA counsel)"],
  ]) + 0.10;

  ly = dataBlock(ly, "CAPITAL STRUCTURE", [
    ["Instrument", "Convertible Promissory Note"],
    ["Valuation Cap", "$10M (Jon Cole $9M ref — pre-IC reconcile)"],
    ["Discount", "20%  ·  Interest: 6% cumulative"],
    ["Maturity", "24 months  ·  QF Trigger: $2M"],
    ["Round Size", "$1.25M  (extended from $750K)"],
    ["NWAi Check", "$[TO BE CONFIRMED]  ·  Lead: Golden Seeds"],
  ]) + 0.10;

  ly = dataBlock(ly, "POST-ROUND CAP TABLE", [
    ["Founders", "Aditi Majumdar (CEO) · CP (CTO) — UCI"],
    ["S. Clark (Advisor)", "6.6% FD common (post-bridge confirm)"],
    ["Lead + Bridge", "Golden Seeds + angels  ·  $1.25M note"],
    ["NWAi Position", "~1–3% post-conversion (illustrative)"],
  ]);

  // ── RIGHT COLUMN — Narratives (7.5" wide) ─────────────────────────────
  const RX = 5.25;
  const RW = 7.85;

  const narrativeBlock = (y, label) => {
    slide.addText(label, {
      x: RX, y: y, w: RW, h: 0.24,
      fontFace: FONT, fontSize: 11, bold: true, color: NAVY,
      align: "left", valign: "middle", charSpacing: 1,
    });
    slide.addShape("rect", {
      x: RX, y: y + 0.22, w: 0.6, h: 0.02,
      fill: { color: NAVY }, line: { color: NAVY, width: 0 },
    });
    return y + 0.25;
  };

  let ry = 0.45;

  ry = narrativeBlock(ry, "SUMMARY");
  slide.addText(
    "STL builds Artemis™, a hardware-agnostic spatial-computing platform that compresses multi-projector calibration from 5–7 days of senior labor to ~4 minutes. The category is shifting post-VR-headset toward shared room-scale immersive displays (museums, theme parks, theatrical, defense simulation, corporate immersive rooms) — and calibration, not hardware, is the bottleneck. Customers in production include Panasonic Connect (resale channel partner), NPIA/Walkio (144 projectors), PBS Studios, RegentCraft, and Royal Caribbean. STL replaces a services product with software at TRL 7–8.",
    {
      x: RX, y: ry, w: RW, h: 0.88,
      fontFace: FONT, fontSize: 9, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 2,
    }
  );
  ry += 0.89;

  ry = narrativeBlock(ry, "TECHNOLOGY & MOAT");
  slide.addText(
    "Algorithmic, patent-protected, founder-derived moat — 8 issued US patents + 25+ years of UC Irvine research. Per the AI Moats Framework, the primary moat is Vertical & Workflow (domain-specific calibration with installation-specific 3D profiles); the Cognitive/Data moat is developing (Memory Lock-in 🟡 — switching costs real but outputs are industry-standard MPCDI files). Thin-wrapper test: PASS. Two independent third-party validations confirm defensibility — Golden Seeds patent attorney (\"really solid patents, very deep technologically\") and Panasonic's year-long competitive scan (Petro, May 1: \"Nobody's done it as eloquently as Summit\"). Real-time dynamic calibration roadmap would deepen Memory Lock-in materially but is MVP, not production.",
    {
      x: RX, y: ry, w: RW, h: 1.30,
      fontFace: FONT, fontSize: 9, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 2,
    }
  );
  ry += 1.31;

  ry = narrativeBlock(ry, "MANAGEMENT TEAM");
  slide.addText(
    "Dr. Aditi Majumdar (CEO) — UCI CS Distinguished Professor, NSF CAREER awardee, 60+ publications, Disney Imagineering advisor — is a world-class technical founder. She is also a first-time CEO and solo founder; deep technical credibility but no prior operating-CEO experience and no co-founder operator to backstop. The \"entrepreneurial trap\" pattern — gating quote velocity by requiring founder-touch on every customer — was named by three independent sources (Mar 24 Golden Seeds, Apr 29 GTM call, May 1 Panasonic/Petro). Petro delivered an unprompted four-point playbook: hire 2–3 industry salespeople with relationships, give one influential customer the product free for testimonial, offer equity to high-performing generals, then turn on the engine. Bench: CP (CTO, UCI), David Snyder (VP Sales, hired Feb 2026), Stephen Clark (Air Force advisor, 6.6% common). NWAi must underwrite a CEO + founder-delegation risk, not just a product/market risk.",
    {
      x: RX, y: ry, w: RW, h: 1.65,
      fontFace: FONT, fontSize: 9, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 2,
    }
  );
  ry += 1.66;

  ry = narrativeBlock(ry, "MARKET & COMPETITION");
  slide.addText(
    "TAM scaffolding (validated through May 1): live entertainment + theatrical >$25B; museums + themed entertainment >$15B; corporate + education immersive rooms >$10B; defense simulation $5B+. Competitive landscape: Disguise/OmniCal (#1 media-server share, warp/blend bundled — distribution-advantaged), Pixera (#2, working on it), Igloo Vision (corporate/education), Scalable Display + Vioso (software incumbents — STL beats Scalable head-to-head at PBS), Christie + Panasonic in-house manual tools (functionally unsold at 100% engineering-attach). Panasonic is a licensing + resale-channel partner, NOT an acquirer (Petro, May 1: \"I would like to be able to license and embed their software into another project\"). Plausible strategic acquirers: Christie, Sony, Epson, Optoma, or media-server bundlers (Disguise/Pixera). Defense vertical discounted in base case — SBIR frozen.",
    {
      x: RX, y: ry, w: RW, h: 1.45,
      fontFace: FONT, fontSize: 9, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 2,
    }
  );
}

// ────────────────────────────────────────────────────────────────────────
// SLIDE 3 — FINANCIAL MODEL & USE OF FUNDS
// ────────────────────────────────────────────────────────────────────────
function buildSlide3(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide);
  addFooter(slide, "Slide 3 of 4  ·  Financial Model & Use of Funds");

  // Title
  slide.addText("Financial Model & Use of Funds", {
    x: 0.3, y: 0.55, w: W - 0.6, h: 0.45,
    fontFace: FONT, fontSize: 20, bold: true, color: NAVY,
    align: "left",
  });

  // ── Section 1: Economic Model narrative ───────────────────────────────
  slide.addText("ECONOMIC MODEL", {
    x: 0.3, y: 1.1, w: W - 0.6, h: 0.25,
    fontFace: FONT, fontSize: 11, bold: true, color: NAVY,
    align: "left", charSpacing: 1,
  });
  slide.addText(
    "Annual per-projector software license + AMC (Annual Maintenance Contract). Software-only delivery; commodity hardware procured separately by customer (any projector, any camera, any 3D surface). Gross margin profile: 70–85% (software-only, no COGS-of-goods). 2025 actuals: $480K revenue (~90% non-recurring SBIR), net loss $861K; Q1 2026 revenue $13,770. Exit thesis: strategic acquisition by a projector/display incumbent that needs to close the calibration-automation gap — Christie, Sony, Epson, Optoma — or a media-server bundler (Disguise/Pixera) closing its automation gap. Panasonic is the validating channel + licensee, NOT the acquirer (confirmed May 1 reference call). IPO is not the underwriting path.",
    {
      x: 0.3, y: 1.4, w: W - 0.6, h: 1.05,
      fontFace: FONT, fontSize: 10, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 4,
    }
  );

  // ── Section 2: Use of Funds ───────────────────────────────────────────
  const useY = 2.55;
  slide.addText("USE OF FUNDS — $1.25M BRIDGE", {
    x: 0.3, y: useY, w: 6.0, h: 0.25,
    fontFace: FONT, fontSize: 11, bold: true, color: NAVY,
    align: "left", charSpacing: 1,
  });

  const useRows = [
    ["Panasonic field-rep activation & co-selling support", "$[TBC]"],
    ["VP Sales scale-up (Snyder) + 1–2 senior AE hires (per Petro playbook)", "$[TBC]"],
    ["PRG / entertainment per-event pricing tier development", "$[TBC]"],
    ["Real-time dynamic calibration engineering (Series A roadmap)", "$[TBC]"],
    ["Operating runway → $3M seed close Q3–Q4 2026", "$[TBC]"],
    ["TOTAL ROUND", "$1,250,000"],
  ];

  const useStartY = useY + 0.3;
  const useRowH = 0.30;
  useRows.forEach((r, i) => {
    const ry = useStartY + i * useRowH;
    const isTotal = i === useRows.length - 1;
    const fill = isTotal ? NAVY : (i % 2 === 0 ? LIGHT_GRAY : WHITE);
    const txtColor = isTotal ? WHITE : DARK_TEXT;
    slide.addShape("rect", {
      x: 0.3, y: ry, w: 6.0, h: useRowH,
      fill: { color: fill }, line: { color: "D0D0D0", width: 0.5 },
    });
    slide.addText(r[0], {
      x: 0.4, y: ry, w: 4.5, h: useRowH,
      fontFace: FONT, fontSize: 9.5, bold: isTotal, color: txtColor,
      align: "left", valign: "middle",
    });
    slide.addText(r[1], {
      x: 4.9, y: ry, w: 1.35, h: useRowH,
      fontFace: FONT, fontSize: 9.5, bold: isTotal, color: txtColor,
      align: "right", valign: "middle",
    });
  });

  slide.addText(
    "Bridge purpose statement per signed term sheet; line-item splits to be confirmed by Aditi/CP pre-IC.",
    {
      x: 0.3, y: useStartY + useRows.length * useRowH + 0.05, w: 6.0, h: 0.25,
      fontFace: FONT, fontSize: 8.5, italic: true, color: GRAY_TEXT,
      align: "left",
    }
  );

  // ── Section 3: Pro Forma table — right side ───────────────────────────
  const pfX = 6.55;
  const pfW = W - pfX - 0.3;
  slide.addText("PRO FORMA — NWAi BEAR / BASE / BULL (per DD Report S10)", {
    x: pfX, y: useY, w: pfW, h: 0.25,
    fontFace: FONT, fontSize: 11, bold: true, color: NAVY,
    align: "left", charSpacing: 1,
  });

  // 2030 endpoint table (Bear / Base / Bull)
  const pfTable = [
    ["Scenario", "2030 ARR", "Exit Multiple", "Implied Exit", "10x Hurdle"],
    ["Bear", "$1.46M", "5–6×", "~$8M", "MISS"],
    ["Base", "$7.5M", "5–8×", "$37–60M", "BORDERLINE"],
    ["Bull", "$22.4M", "6×", "~$134M", "CLEARS"],
  ];

  const pfStartY = useY + 0.3;
  const pfRowH = 0.32;
  const pfCols = [pfW * 0.16, pfW * 0.18, pfW * 0.20, pfW * 0.24, pfW * 0.22];
  pfTable.forEach((row, ri) => {
    let cx = pfX;
    row.forEach((cell, ci) => {
      const w = pfCols[ci];
      let fill, txtColor, bold;
      if (ri === 0) {
        fill = NAVY; txtColor = WHITE; bold = true;
      } else if (ri === 1) {
        fill = WHITE; txtColor = ACCENT_RED; bold = ci === 4;
      } else if (ri === 2) {
        fill = LIGHT_GRAY; txtColor = ACCENT_AMBER; bold = ci === 4;
      } else {
        fill = WHITE; txtColor = ACCENT_GREEN; bold = ci === 4;
      }
      // Scenario name col always dark
      if (ci === 0 && ri > 0) {
        txtColor = DARK_TEXT;
        bold = true;
      }
      slide.addShape("rect", {
        x: cx, y: pfStartY + ri * pfRowH, w: w, h: pfRowH,
        fill: { color: fill }, line: { color: "D0D0D0", width: 0.5 },
      });
      slide.addText(cell, {
        x: cx + 0.05, y: pfStartY + ri * pfRowH, w: w - 0.1, h: pfRowH,
        fontFace: FONT, fontSize: 9, bold: bold, color: txtColor,
        align: "center", valign: "middle",
      });
      cx += w;
    });
  });

  // Cash trajectory mini-block
  const cashY = pfStartY + pfTable.length * pfRowH + 0.20;
  slide.addText("CASH TRAJECTORY (per DD Report S10)", {
    x: pfX, y: cashY, w: pfW, h: 0.25,
    fontFace: FONT, fontSize: 11, bold: true, color: NAVY,
    align: "left", charSpacing: 1,
  });
  slide.addText(
    "• Dec 31 2025: $194K cash · $85K/mo burn · bridge TS signed\n" +
    "• Mar 31 2026: $23K cash 🔴 effectively insolvent\n" +
    "• Apr 7 2026: $125K angel rescue → $328K · ~6 wk runway\n" +
    "• Apr 29 2026: $750K bridge committed → $1.25M extending\n" +
    "• End-Q2 2026: bridge close · burn step-down to $15–20K/mo\n" +
    "• Q4 2026: cash-neutral target (per CP)\n" +
    "• Q3–Q4 2026: $3M seed close required for survival 🔴 existential",
    {
      x: pfX, y: cashY + 0.30, w: pfW, h: 2.0,
      fontFace: FONT, fontSize: 9, color: DARK_TEXT,
      align: "left", valign: "top", lineSpacingMultiple: 1.15,
    }
  );

  // Caveat band at bottom
  slide.addShape("rect", {
    x: 0.3, y: 6.75, w: W - 0.6, h: 0.35,
    fill: { color: LIGHT_GRAY }, line: { color: "D0D0D0", width: 0.5 },
  });
  slide.addText(
    "Jon Cole (NWA legal, Apr 28): financial model is \"very aggressive.\" NWAi recommends underwriting Base/Bear range for IC and treating the three Petro-described long-term paths (Panasonic global, white-label, Japan co-development) as optionality, not base case.",
    {
      x: 0.4, y: 6.78, w: W - 0.8, h: 0.30,
      fontFace: FONT, fontSize: 9, italic: true, color: DARK_TEXT,
      align: "left", valign: "middle",
    }
  );
}

// ────────────────────────────────────────────────────────────────────────
// SLIDE 4 — ANALYSIS & RECOMMENDATION
// ────────────────────────────────────────────────────────────────────────
function buildSlide4(pptx) {
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addHeader(slide);
  addFooter(slide, "Slide 4 of 4  ·  Analysis & Recommendation");

  // Title
  slide.addText("Analysis & Recommendation", {
    x: 0.3, y: 0.55, w: W - 0.6, h: 0.45,
    fontFace: FONT, fontSize: 20, bold: true, color: NAVY,
    align: "left",
  });

  // ── Thesis statement ──────────────────────────────────────────────────
  slide.addText("NWAi THESIS", {
    x: 0.3, y: 1.1, w: W - 0.6, h: 0.22,
    fontFace: FONT, fontSize: 11, bold: true, color: NAVY,
    align: "left", charSpacing: 1,
  });
  slide.addText(
    "Five-meeting diligence confirms a real, third-party-validated technology moat (8 patents, Golden Seeds patent-attorney review, Panasonic year-long competitive scan) riding a real structural discontinuity (post-VR shift to shared room-scale immersive displays where calibration is the bottleneck). This is a TECHNOLOGY + FOUNDER bet — not a commercial-traction bet. Risks are operating-execution, not thesis-killing. The discount is the margin of safety.",
    {
      x: 0.3, y: 1.35, w: W - 0.6, h: 0.95,
      fontFace: FONT, fontSize: 10, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 4,
    }
  );

  // ── Two-column Strengths / Risks ──────────────────────────────────────
  const colY = 2.40;
  const colH = 2.95;
  const colGap = 0.20;
  const colW = (W - 0.6 - colGap) / 2;
  const sX = 0.3;
  const rX = sX + colW + colGap;

  // Headers
  slide.addShape("rect", {
    x: sX, y: colY, w: colW, h: 0.32,
    fill: { color: ACCENT_GREEN }, line: { color: ACCENT_GREEN, width: 0 },
  });
  slide.addText("STRENGTHS  (++ strong  ·  ++/-- with caveat)", {
    x: sX + 0.15, y: colY, w: colW - 0.3, h: 0.32,
    fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE,
    align: "left", valign: "middle", charSpacing: 1,
  });

  slide.addShape("rect", {
    x: rX, y: colY, w: colW, h: 0.32,
    fill: { color: ACCENT_RED }, line: { color: ACCENT_RED, width: 0 },
  });
  slide.addText("RISKS  (-- significant  ·  - moderate  ·  -/+ mitigant)", {
    x: rX + 0.15, y: colY, w: colW - 0.3, h: 0.32,
    fontFace: FONT, fontSize: 10.5, bold: true, color: WHITE,
    align: "left", valign: "middle", charSpacing: 1,
  });

  // Strengths body
  const strengths = [
    { tag: "++", text: "Patent-protected algorithmic moat with two independent third-party validations (Golden Seeds patent counsel + Panasonic year-long competitive scan)." },
    { tag: "++", text: "Structural Discontinuity CONFIRMED — post-VR shift to shared room-scale immersive displays." },
    { tag: "++", text: "Production deployments at scale: 144-projector NPIA/Walkio, PBS Studios ($345K active quote), Royal Caribbean, RegentCraft. TRL 7–8." },
    { tag: "++/--", text: "Panasonic resale channel = brand validation BUT zero closed projects H1 2026 vs. 80-license threshold; field-rep activation unresolved." },
    { tag: "++/--", text: "World-class technical founder (Dr. Majumdar — UCI Distinguished Prof, 60+ pubs, 25+ yrs research) BUT first-time CEO + solo founder; \"entrepreneurial trap\" named by three independent sources." },
    { tag: "++", text: "Convertible note with MFN + pro-rata + financial covenants — above-average investor protection for a bridge (Jon Cole: \"A lot of these notes don't have that\")." },
  ];
  const strengthsText = strengths.map(s => ({
    text: `${s.tag}  `,
    options: { bold: true, color: ACCENT_GREEN, fontSize: 9.5 },
  }));
  // We need interleaved formatting — use buildRichText helper inline
  const sBody = [];
  strengths.forEach((s, i) => {
    sBody.push({ text: `${s.tag}  `, options: { bold: true, color: ACCENT_GREEN, fontSize: 9.5, breakLine: false } });
    sBody.push({ text: s.text, options: { color: DARK_TEXT, fontSize: 9.5, breakLine: true } });
    if (i < strengths.length - 1) {
      sBody.push({ text: "", options: { fontSize: 4, breakLine: true } });
    }
  });
  slide.addText(sBody, {
    x: sX + 0.05, y: colY + 0.40, w: colW - 0.10, h: colH - 0.45,
    fontFace: FONT, align: "left", valign: "top",
  });

  // Risks body — lead with founder execution risk
  const risks = [
    { tag: "--", text: "FOUNDER EXECUTION: first-time CEO + solo founder. \"Entrepreneurial trap\" — gating quote velocity, customer approvals, channel activation — named by three independent sources (Golden Seeds, GTM call, Panasonic/Petro). NWAi soft term: written hiring + delegation plan tied to seed close (per Petro's unprompted playbook)." },
    { tag: "--", text: "CHANNEL EXECUTION: Panasonic field-rep activation 🔴 RED — 18-yr-tenure sales force, no demo kits, no comp incentive confirmed. Panasonic is licensee + resale channel, NOT a probable acquirer — exit thesis depends on OTHER projector/display incumbents." },
    { tag: "--", text: "$3M seed likely undersized (Jon Cole: \"twice as long, twice as much\"). Convertible-note stacking risk if milestones slip — cap-table complexity could sandwich NWAi's $10M cap. MFN is primary protection." },
    { tag: "-", text: "$10M cap is 25–40% above non-California comp (Jon Cole); California premium accepted as market-standard but reduces margin of safety. 1.5× early-exit pref vs. 2× market." },
    { tag: "-", text: "PRG / entertainment vertical pricing tier not yet built — blocks rental-model conversions. UCI patent assignment (US9064312B2) license terms gate-critical pre-IC." },
    { tag: "-/+", text: "Defense / SBIR pipeline frozen — mitigant: discounted in base case, treated as upside optionality." },
  ];
  const rBody = [];
  risks.forEach((r, i) => {
    rBody.push({ text: `${r.tag}  `, options: { bold: true, color: ACCENT_RED, fontSize: 9.5, breakLine: false } });
    rBody.push({ text: r.text, options: { color: DARK_TEXT, fontSize: 9.5, breakLine: true } });
    if (i < risks.length - 1) {
      rBody.push({ text: "", options: { fontSize: 4, breakLine: true } });
    }
  });
  slide.addText(rBody, {
    x: rX + 0.05, y: colY + 0.40, w: colW - 0.10, h: colH - 0.45,
    fontFace: FONT, align: "left", valign: "top",
  });

  // ── Recommendation block ──────────────────────────────────────────────
  const recY = 5.45;
  slide.addShape("rect", {
    x: 0.3, y: recY, w: W - 0.6, h: 1.05,
    fill: { color: ICE }, line: { color: NAVY, width: 1.5 },
  });
  slide.addText([
    { text: "RECOMMENDATION:  ", options: { bold: true, fontSize: 13, color: NAVY } },
    { text: "INVEST WITH CONDITIONS", options: { bold: true, fontSize: 13, color: ACCENT_GREEN } },
    { text: "  ·  $[TO BE CONFIRMED]  ·  Convertible Note, $10M Cap, 20% Discount", options: { fontSize: 13, color: NAVY } },
  ], {
    x: 0.45, y: recY + 0.08, w: W - 0.9, h: 0.32,
    fontFace: FONT, align: "left", valign: "middle",
  });
  slide.addText(
    "Technology + founder bet on a real, third-party-validated structural discontinuity. Entered via convertible note with strong protections (MFN, pro-rata, financial covenants) at a California-premium cap accepted as market-standard. Five pre-IC conditions: (1) Panasonic amendment paper; (2) rep-level compensation evidence; (3) data-room completion; (4) AMC pricing reconciliation; (5) NWAi allocation = note (not SAFE) + cap reconciliation. Two soft NWAi-side terms: (A) written hiring + delegation plan tied to seed close; (B) per-event pricing tier shipped before NWAi seed participation.",
    {
      x: 0.45, y: recY + 0.42, w: W - 0.9, h: 0.60,
      fontFace: FONT, fontSize: 9.5, color: DARK_TEXT,
      align: "justify", valign: "top", paraSpaceAfter: 2,
    }
  );

  // ── "What is the Bet?" callout ────────────────────────────────────────
  const betY = 6.60;
  slide.addShape("rect", {
    x: 0.3, y: betY, w: W - 0.6, h: 0.50,
    fill: { color: NAVY }, line: { color: NAVY, width: 0 },
  });
  slide.addText([
    { text: "THE BET:  ", options: { bold: true, fontSize: 11, color: ICE } },
    { text: "STL is acquired by a projector/display incumbent that needs to close the calibration-automation gap — Christie, Sony, Epson, Optoma — or a media-server bundler (Disguise/Pixera) — at an $80–200M outcome in 3–5 years; the discount is the margin of safety. Panasonic is the validating channel, not the acquirer, and the bet hinges on Dr. Majumdar exiting the founder execution trap and building a true GTM team before the $3M seed close in Q3–Q4 2026.", options: { fontSize: 10, color: WHITE, italic: true } },
  ], {
    x: 0.45, y: betY + 0.04, w: W - 0.9, h: 0.42,
    fontFace: FONT, align: "left", valign: "middle",
  });
}

// ────────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────────
function main() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_WIDE";
  pptx.title = "NWAi Executive Summary — Summit Technology Laboratory";
  pptx.company = "New World Angels";
  pptx.author = "NWAi TechGroup";
  pptx.subject = "Investment Memo — STL Bridge Convertible Note";

  buildSlide1(pptx);
  buildSlide2(pptx);
  buildSlide3(pptx);
  buildSlide4(pptx);

  const filename = "Summit-Technology-Laboratory-Deal-Memo-2026-05-12.pptx";
  pptx.writeFile({ fileName: filename }).then((f) => {
    console.log(`✓ PPTX written: ${f}`);
  }).catch((e) => {
    console.error("✗ PPTX write failed:", e);
    process.exit(1);
  });
}

main();
