/**
 * STL — NWAi DD Investment Report (v3)
 * Prepared: May 12, 2026
 *
 * Revision history:
 *   v2 (May 4, 2026) — Five-meeting diligence baseline.
 *   v3 (May 12, 2026) — Two corrections grounded in Panasonic May 1 reference call:
 *     • S8 Team: Make first-time CEO + solo founder + UCI academic researcher profile
 *       explicit (was implicit). Petro-surfaced operating risk maps directly to this profile.
 *     • S12 Exit Strategy: Panasonic reclassified from "Highest-probability acquirer" to
 *       "Channel + licensee, NOT acquirer." Petro May 1: "I would like to be able to license
 *       and embed their software into another project." Real acquirer candidates are
 *       projector/display incumbents that lack calibration automation (Christie, Sony, Epson,
 *       Optoma) and media-server bundlers closing capability gap (Disguise, Pixera).
 *     • S13 "What is the Bet": Updated "How we win" to reflect Panasonic-as-channel /
 *       projector-incumbent-as-acquirer model.
 *
 * Inputs: Final Diligence Synthesis (May 4), Deal Terms POV (May 4),
 *   five reconciled diligence meetings (Mar 2 → May 1).
 *
 * This file feeds the canonical generator at scripts/dd-report-generator.js.
 * Do not freestyle layout — only data + paragraphs.
 */

"use strict";

const path = require("path");
const { generateDDReport } = require(path.join(__dirname, "dd-report-generator"));

// ─── Paragraph helpers ────────────────────────────────────────────────────────
const { Paragraph, TextRun, AlignmentType } = require("docx");
const FONT = "Arial";
const T = (text, opts = {}) => new TextRun({
  text,
  bold: opts.bold || false,
  italics: opts.italics || false,
  size: opts.size || 22,
  color: opts.color || "000000",
  font: FONT,
});
const P = (runs, opts = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [runs],
  spacing: opts.spacing || { before: 60, after: 60 },
  alignment: opts.align || AlignmentType.LEFT,
});

// ─── Report data ──────────────────────────────────────────────────────────────
const data = {
  // Header
  company:   "Summit Technology Laboratory (STL) — Artemis™",
  description:
    "Summit Technology Laboratory builds Artemis™, a hardware-agnostic spatial-computing platform that automates calibration, warp, and blend across multi-projector immersive displays. STL replaces a 5–7 day manual calibration workflow with a ~4-minute automated pass using commodity cameras, 8 issued US patents, and 25+ years of founder research from UC Irvine. Customers include Panasonic Connect (resale partner), NPIA / Walkio (144 projectors), PBS Studios, RegentCraft, Royal Caribbean, and a growing entertainment / museum / defense pipeline.",
  platform:  "Spatial-Computing SaaS (Software-only IP, commodity HW)",
  stage:     "TRL 7–8 — production deployments live",
  hq:        "Irvine, California (US C-Corp)",
  round:     "Convertible note bridge — $750K committed, extending to $1.25M; close end-Q2 2026",
  ceo:       "Dr. Aditi Majumdar (UCI CS Distinguished Prof; NSF CAREER; 60+ pubs)",
  raise:     "Bridge $1.25M → $3M Seed Q3–Q4 2026 → Series A 2027",
  founded:   "2015",
  checkSize: "[TO BE CONFIRMED — pending IC sizing]",
  theme:     "TechGroup #2 — SW-Enabled HW, Physical AI & Robotics. Lead: TBD — Pending Dealum API. SMEs: TBD — Pending Dealum API.",

  // ── Top recommendation banner ────────────────────────────────────────────
  recBoxVerdict: "NWAi RECOMMENDATION:  ☒ INVEST WITH CONDITIONS — Summit Technology Laboratory",
  recBoxBody:
    "Five-meeting diligence confirms a real, third-party-validated technology moat (8 patents, Golden Seeds patent-attorney review, Panasonic year-long competitive scan) riding a real structural discontinuity (post-VR-headset shift to room-scale shared immersive displays where calibration is the bottleneck). This is a TECHNOLOGY + FOUNDER bet on a first-time CEO + solo founder + UCI academic researcher with world-class technical depth and a named delegation gap. Risks are operating-execution, not thesis-killing: Panasonic field-rep activation (RED — channel + licensee, NOT acquirer; exit thesis depends on projector / display incumbents), founder bandwidth / 'entrepreneurial trap' (YELLOW, named by three independent sources), $3M seed (existential, Q3–Q4 2026). Five pre-IC conditions specified below.",

  // ── Section 1: Problem / Market Opportunity ─────────────────────────────
  s1: {
    score: 4,
    dark: false,
    paras: [
      P([T("Verdict:  ", { bold: true }), T("Real structural discontinuity. Post-VR-headset, the immersive-display category is shifting toward shared room-scale projection environments — museums, theme parks, theaters, simulation, defense, and corporate immersive rooms. Calibration, not hardware, is the bottleneck. STL's 7-day → 1-day labor compression on a 48-projector Disney Toy Story-class install is a step-change, not an increment.")]),
      P([T("Independent confirmation — Panasonic itself.  ", { bold: true }), T("Panasonic Projector & Display reports a 100% engineering-attach-rate on its in-house Remote Image Adjustment software: customers cannot operate it without Panasonic engineers manually crosshatching by remote control. The existing solution is functionally unsold. STL replaces a services product with software.")]),
      P([T("TAM scaffolding (DD Kickoff, validated unchanged through May 1):  ", { bold: true }), T("Live entertainment + theatrical >$25B; museums and themed entertainment >$15B; corporate / education immersive rooms >$10B; defense simulation $5B+. Total addressable surface materially supports a 20–100x return outcome at Bull-case execution.")]),
      P([T("Single-vertical risk:  ", { bold: true }), T("Defense / SBIR is currently frozen and Stephen Clark's defense-conversion record is unverified (Golden Seeds). Discount defense in base-case underwriting; treat as upside optionality.")]),
    ],
  },

  // ── Section 2: Solution / Product ────────────────────────────────────────
  s2: {
    score: 4,
    dark: true,
    paras: [
      P([T("Verdict:  ", { bold: true }), T("Artemis is real, hardware-agnostic, and field-validated at scale. Software-only IP; all hardware is commodity (any projector, any camera, any 3D surface). Calibration that previously required 1–7 days of senior labor compresses to ~4 minutes once cameras are placed.", { color: "FFFFFF" })]),
      P([T("Confirmed deployments (production, not POC):  ", { bold: true, color: "FFFFFF" }), T("NPIA / Walkio — 144 projectors over 2-year deployment. PBS Studios — 28 projectors live + 18 in design. RegentCraft, Chicago lobby, Royal Caribbean. Drexel University 3-projector lobby demo set for week of May 4.", { color: "FFFFFF" })]),
      P([T("Thin-wrapper test:  ", { bold: true, color: "FFFFFF" }), T("PASS. Replication via public APIs in <48 hours is not feasible — 25+ years of founder research, 8 issued US patents, and Panasonic's own year-long competitive scan that found no functional parity. Petro (May 1): 'We have not found anybody else that does what Summit does. Nobody's done it as eloquently as Summit.'", { color: "FFFFFF" })]),
      P([T("Open product item:  ", { bold: true, color: "FFFFFF" }), T("Real-time dynamic calibration is MVP, not production. Most compelling roadmap capability — depth-camera accuracy unresolved, no shipping timeline. Resurfaces at Series A; do not weight in near-term revenue model.", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 3: AI / Software Moat ────────────────────────────────────────
  s3: {
    score: 3,
    dark: true,
    paras: [
      P([T("Moat type:  ", { bold: true, color: "FFFFFF" }), T("Algorithmic, patent-protected, founder-derived. Not data-driven. AI Moat scoring (DD Kickoff, validated unchanged): 3/10 — Cognitive/Data 1/4, Capital/Compute 0/2, Vertical/Workflow 2/4.", { color: "FFFFFF" })]),
      P([T("Structural Discontinuity:  ", { bold: true, color: "FFFFFF" }), T("CONFIRMED 🟢. Two independent third-party validations: Golden Seeds patent attorney ('really solid patents, very deep technologically') and Panasonic ('we have not found anybody else that does what Summit does'). 40+ Panasonic visitors over ~1 year, including unannounced complex-object mapping tests; Japan engineering team's failed parity claim.", { color: "FFFFFF" })]),
      P([T("Memory Lock-in:  ", { bold: true, color: "FFFFFF" }), T("DEVELOPING 🟡. Switching costs are real (installation-specific 3D profiles, calibration data embedded in venue) but workflow lock-in is partial — outputs are industry-standard MPCDI files consumed by third-party renderers. STL retains calibration patterns only, not customer content. Real-time dynamic calibration would deepen Memory Lock-in materially but is MVP.", { color: "FFFFFF" })]),
      P([T("Implication:  ", { bold: true, color: "FFFFFF" }), T("The moat is durable enough to defend the current install base and to win head-to-head in defense-vertical procurement (PBS Studios — beating Scalable Display, the 20-year incumbent). It is not yet durable enough to fully resist a media-server-bundled competitor (Disguise, Pixera) at scale. Score reflects sufficient-but-not-deepening defensibility.", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 4: Business Model & Customers ────────────────────────────────
  s4: {
    score: 3,
    dark: false,
    paras: [
      P([T("Model:  ", { bold: true }), T("Annual license per projector + AMC (Annual Maintenance Contract). Software delivery; no hardware sold. Customers procure projectors, cameras, and PCs separately (commodity).")]),
      P([T("Revenue evidence (2025 actuals):  ", { bold: true }), T("$480K total revenue, ~90% non-recurring SBIR. Q1 2026 revenue $13,770. The recurring commercial book is small and early; 2026 plan depends on Panasonic test conversion + NPIA 72-projector portion + PBS $345K active quote.")]),
      P([T("Customer mix:  ", { bold: true }), T("Panasonic (resale channel — 0 closed projects in H1 2026 against an 80-license success threshold; PBS Studios $345K active quote is 38% of threshold). Direct: NPIA / Walkio ($1.1M government contract anchor, 72-projector 2026 portion needs reconfirmation). Trial: TechMD / Disney, Optoma, Sony, Epson golf simulator.")]),
      P([T("Open structural item — entertainment-vertical pricing.  ", { bold: true }), T("PRG (Production Resource Group, the strongest live-event validator after a CCO-interrupted demo) operates a rental model that is incompatible with annual licensing. STL has no per-event / project-tier pricing yet. VP Sales David Snyder's #1 deliverable. Without this tier, PRG will not convert.")]),
      P([T("Open commercial item — AMC pricing reconciliation.  ", { bold: true }), T("Panasonic test contract states $1K/yr AMC; the Apr 7 transcript said $2.5K over 5 years (i.e., $500/yr). At 80 licenses this is a $40K/yr revenue delta — small in dollars, large as a model-credibility signal. Direct ask outstanding to Aditi/CP. Pre-IC blocking item.")]),
    ],
  },

  // ── Section 5: Customer Pipeline ────────────────────────────────────────
  s5: {
    score: 2,
    dark: false,
    paras: [
      P([T("Verdict:  ", { bold: true }), T("Pipeline is named, credible, and concentrated. Single-channel risk is the dominant pipeline-level fact. ZERO Panasonic-derived projects closed in H1 2026 against the 80-license success threshold. The renewal verbal extension to Dec 31, 2026 buys time but not customers.")]),
      P([T("Named H2 deals (Panasonic channel):  ", { bold: true }), T("PBS Studios — $345K active quote, 30 projectors (20+10), proposal stage as of May 1. Customer budget gap ($60K stated). Direct competition: Scalable Display. STL ahead on automation, behind on customer GPU friction. Single deal hits 38% of the 80-license threshold. Drexel University — 3-projector lobby, demo week of May 4. Royal Caribbean — Barcelona install (legacy SKU, not Summit). Half-dozen unspecified prospects in demo phase ('unprecedented response' per Petro).")]),
      P([T("Named direct deals:  ", { bold: true }), T("NPIA / Walkio — 144 projectors over 2 years, $1.1M total. TechMD / Disney trial license signed Apr 7; Optoma trial kit deploying May; Sony seed interest; Epson golf-simulator pilot.")]),
      P([T("Operating velocity gates (Panasonic channel):  ", { bold: true }), T("Every customer requires Aditi pre-approval. Every customer requires a Summit-led remote demo (no demo kits given to Panasonic reps). Avg sales cycle 6 months → 1 year (museums); 5+ years (theme parks). Panasonic shared-services structure adds institutional lag.")]),
      P([T("Sales-org reality:  ", { bold: true }), T("VP Sales David Snyder (hired Feb 2026, two months in at Apr 29) — HubSpot CRM operational, 90 initial-contact rows, 9 demos, 2 trials, trial-kit innovation shipped. One person; founders explicitly declared NO new GTM hires until seed close. Funnel is people-constrained by company decision.")]),
    ],
  },

  // ── Section 6: Competition & Moat ───────────────────────────────────────
  s6: {
    score: 4,
    dark: false,
    paras: [
      P([T("Verdict:  ", { bold: true }), T("Two independent third-party validations confirm a defensible moat. Head-to-head competitive map shows STL ahead on automation in every direct comparison; the threat is distribution-bundled competitors, not capability parity.")]),
      P([T("Head-to-head positions:  ", { bold: true }), T("Disguise / OmniCal — #1 high-end media-server share, warp/blend embedded in media server; bundled-feature competitor with distribution advantage; Petro: 'not as easy as Summit.' Pixera — #2 media-server share, warp/blend in development; future bundled threat. Igloo Vision — corporate / architectural / education; vertical-adjacent. Scalable Display — entrenched 20-year defense incumbent; direct head-to-head at PBS Studios — STL ahead on automation, behind on customer GPU friction. Vioso — same channel-bundle dynamic as Disguise. Christie / Panasonic in-house — manual remote-control crosshatch SW; effectively unsold (100% engineering-attach rate); STL replaces this category. Open-source (Omnidome, Splash) — hobbyist / research only.")]),
      P([T("IP position:  ", { bold: true }), T("8 issued US patents; UCI assignment status on US9064312B2 (Aug 2015) is the gate-critical open item — license terms, royalty, UCI M&A consent rights. Required pre-IC. STL committed to provide; not yet delivered.")]),
      P([T("Moat verdict per NWAi lenses:  ", { bold: true }), T("Structural Discontinuity — CONFIRMED 🟢 (see S1, S3). Memory Lock-in — DEVELOPING 🟡 (see S3).")]),
    ],
  },

  // ── Section 7: Go-to-Market Strategy ────────────────────────────────────
  s7: {
    score: 2,
    dark: false,
    paras: [
      P([T("Verdict:  ", { bold: true }), T("Single-channel concentration with optionality. Panasonic is — and remains — the only path that materially clears the next 12 months. Five meetings have not changed this. What has changed is the texture of the relationship: it is now visibly institutional (NA CEO Kappa visited the lab twice, former skeptic now sponsor; SAP SKU live; SE team trained; Panasonic Europe watching closely since Infocomm 2024) but field-level activation remains unresolved.")]),
      P([T("RED — rep-level compensation never asked, never volunteered.  ", { bold: true }), T("18-year tenure sales force is culturally resistant. Petro's own framing: 'thinking outside the box kind of lacks there'; rep verbatim, 'It's so tough to learn new stuff, it's just much easier to sell projectors.' Petro and Jared (head of sales) are personally in year-two of a behavior-change campaign. Demo kits explicitly denied to reps. Without comp-plan alignment, rep-level activation is a personal-relationship play, not a structural one. Direct ask to Aditi pre-IC: comp memo, SPIFF, or attainment-credit policy for STL deals.")]),
      P([T("YELLOW → GREEN momentum on the Panasonic relationship itself.  ", { bold: true }), T("Renewal verbally extended to Dec 31, 2026 (amendment in Panasonic legal queue, not drafted). NA CEO Kappa converted from skeptic to sponsor over two lab visits. Three Petro-described long-term paths: (1) global rollout via Panasonic Europe / APAC (Middle East 2028–2030 pipeline); (2) white-label embed into 'another project' Petro can't disclose; (3) co-development with Panasonic Japan engineering. None contractually committed; all credible.")]),
      P([T("Forward-looking caveat (Petro, May 1):  ", { bold: true }), T("Petro's enthusiasm is personal, not corporate commitment. He explicitly closed the call with the 'forward-looking' legal disclaimer. Read his operating memo (S8) as the strongest possible external advice; read his commitment language as personal.")]),
    ],
  },

  // ── Section 8: Team & Execution ──────────────────────────────────────────
  s8: {
    score: 3,
    dark: true,
    paras: [
      P([T("Verdict:  ", { bold: true, color: "FFFFFF" }), T("Founder profile: first-time CEO + solo founder + UCI academic researcher, full-time at STL but maintains UCI professorship; world-class technical depth, no prior operating-CEO experience, no co-founder operator to backstop. This profile produces irreplaceable technical credibility and a structural delegation gap simultaneously. Three independent sources — Golden Seeds (Mar 24), NWAi GTM call (Apr 29), Petro/Panasonic (May 1) — flag the same operating constraint: Aditi's 'entrepreneurial trap' (Petro's exact words) gates channel velocity by requiring founder-touch on every customer. Three-source corroboration makes this the highest-conviction operating risk in the file.", { color: "FFFFFF" })]),
      P([T("Roster:  ", { bold: true, color: "FFFFFF" }), T("Aditi Majumdar (CEO) — UCI CS Distinguished Prof, NSF CAREER, 60+ publications, 25+ years multi-projector calibration research, Disney Imagineering advisor; first-time CEO; solo founder; maintains UCI professorship; gates every Panasonic customer approval. CP (CTO) — strong technical depth confirmed in live Mar 2 demo Q&A; maintains UCI role; junior-heavy team underneath. David Snyder (VP Sales) — hired Feb 2026, $140K + 10% commission; HubSpot operational; trial-kit innovation shipped; cannot scale alone. Stephen Clark (Air Force advisor) — previously CEO; 6.6% FD common, fully vested; stepped back to paid consulting; defense-conversion record unverified per Golden Seeds. 4-person engineering team (UCI-trained, 3–8 years tenure); equity refresh planned at seed, not bridge — retention risk if seed slips.", { color: "FFFFFF" })]),
      P([T("Petro's unprompted operating memo (May 1, minute 53):  ", { bold: true, color: "FFFFFF" }), T("Asked 'if you were Aditi, what would you do?' — (1) hire 2–3 senior salespeople with industry relationships; (2) give one influential customer the product free for testimonial, start the flywheel; (3) build the team, give them autonomy, exit the entrepreneurial trap, offer equity to '2–3 high-performing committed generals'; (4) then turn on the engine — healthcare, beyond museums. Read this as the closest thing STL has to a written outside-advisor memo, delivered by someone with no economic stake in the founder's ego. It is the basis for NWAi's soft IC term.", { color: "FFFFFF" })]),
      P([T("NWAi soft term recommendation:  ", { bold: true, color: "FFFFFF" }), T("Written hiring + delegation plan tied to seed close. No-cost discipline. Directly addresses the structural contradiction surfaced Apr 29 (NO new GTM hires until seed) versus the funnel-people-constraint reality, and the founder-profile-specific delegation gap (first-time CEO + solo founder + researcher).", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 9: Deal Structure & Cap Table ───────────────────────────────
  s9: {
    score: 3,
    dark: true,
    paras: [
      P([T("Verdict:  ", { bold: true, color: "FFFFFF" }), T("Convertible note (passes NWAi hard gate — no SAFE). California-premium cap, accepted as market-standard for the geography. Investor protections (MFN, pro-rata, financial covenants) all present. One non-standard term (1.5x liquidation preference, below 2x market). Cap-table updates pending.", { color: "FFFFFF" })]),
      P([T("Confirmed terms (signed term sheet, Nov 12, 2025; Jon Cole legal review Apr 28):  ", { bold: true, color: "FFFFFF" }), T("Instrument: Convertible Promissory Note ✅. Cap: $10M (per signed term sheet — a separate Jon Cole reference to '$9M' to be confirmed with Kevin Li pre-IC). Discount: 20% (lesser-of vs. cap). Interest: 6% cumulative, accrues. Maturity: 24 months from initial close. Qualified Financing Trigger: $2M (low — almost any priced seed auto-converts; positive for NWAi). Early-Exit Protection: 1.5x principal+interest OR conversion value (below 2x market — minor concession to company). Round: $750K → $1M → $1.25M. MFN: present. Pre-emptive / pro-rata: present. Financial covenants / information rights: present (Jon Cole: 'A lot of these notes don't have that').", { color: "FFFFFF" })]),
      P([T("Return math at cap.  ", { bold: true, color: "FFFFFF" }), T("Effective entry $10M post-money equivalent at cap; ~$8M with 20% discount. Estimated dilution through seed + Series A ~40–45%. Exit required for 10x after dilution: ~$140–170M at cap; ~$112–136M at discounted entry. Plausible strategic exit range $80–200M. 10x is achievable but not automatic — requires upper-half outcome. Discount is the margin of safety.", { color: "FFFFFF" })]),
      P([T("Structural risk flags (Jon Cole):  ", { bold: true, color: "FFFFFF" }), T("(1) Convertible-note stacking — if STL's three milestones slip, another bridge note is likely before priced seed; cap-table complexity escalates and NWAi's $10M cap could be sandwiched. MFN is the primary protection. (2) Seed round size likely undersized — Jon called $3M 'surprisingly small'; underwrite for $5–6M / Q1 2027 in a stretched scenario. (3) Demand-maturity ≠ repayment — at 24-mo trigger NWAi can demand cash or force conversion into the most senior class; practical outcome is restructuring leverage, not exit path.", { color: "FFFFFF" })]),
      P([T("Cap-table open items:  ", { bold: true, color: "FFFFFF" }), T("Cap table dated Jan 6, 2026; updated post-bridge cap table missing. Stephen Clark's 6.6% FD common needs reconfirmation. Confirm NWAi allocation is convertible note, not SAFE. Jason Stark engagement (NWA Miami counsel) for closing documents pending — confirm initiated and build legal fees into deal budget.", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 10: Financials ──────────────────────────────────────────────
  s10: {
    score: 2,
    dark: true,
    paras: [
      P([T("Verdict:  ", { bold: true, color: "FFFFFF" }), T("Survival-to-inflection model. Bridge close gets STL to seed; seed close gets STL to Series A. The company was effectively insolvent on Mar 31, 2026 ($23K cash); a $125K angel check the morning of the Apr 7 NWAi Financials call rescued runway. Bridge stabilization in late April (Golden Seeds verbal approval, $750K committed extending to $1.25M) moved the state from RED to GREEN.", { color: "FFFFFF" })]),
      P([T("Cash position timeline:  ", { bold: true, color: "FFFFFF" }), T("Dec 31 2025 — $194K, $85K/mo burn, ~11 mo runway, bridge term sheet signed. Mar 31 2026 — $23K cash, $73K/mo burn, halfway through 6-mo Panasonic test, ZERO closed (🔴 effectively insolvent). Apr 7 2026 — $125K angel check received morning of NWAi call → ~$328K, ~6 wk runway; bridge $585K of $1M target. Apr 29 2026 — bridge $750K committed (un-gated), extending to $1.25M; Golden Seeds verbal approval; legal sign-off underway. End-Q2 2026 (target) — bridge close at $1.25M; burn step-down to $15–20K/mo by Q1 2027. Q4 2026 — cash-neutral target (per CP), conditional on Panasonic + NPIA + AMC upfront. Q3–Q4 2026 — $3M seed close required for survival to Series A (🔴 existential gate).", { color: "FFFFFF" })]),
      P([T("Revenue actuals:  ", { bold: true, color: "FFFFFF" }), T("2025 actuals — $480K (~90% non-recurring SBIR). Net loss ($861K). Q1 2026 revenue $13,770. The recurring book is small.", { color: "FFFFFF" })]),
      P([T("Bear / Base / Bull (DD Kickoff, validated unchanged through May 1):  ", { bold: true, color: "FFFFFF" }), T("Bear — 2030 ARR $1.46M, 5–6x revenue → ~$8M exit (below 10x). Base — 2030 ARR $7.5M, 5–8x revenue → $37–60M exit (may not reliably hit 10x at note-conversion entry). Bull — 2030 ARR $22.4M, 6x revenue → ~$134M exit (achieves 10x; requires Panasonic global + white-label OR major defense unlock).", { color: "FFFFFF" })]),
      P([T("Open financial item:  ", { bold: true, color: "FFFFFF" }), T("Pre-IC data-room completion required: updated cap table, employment agreements, key-man insurance, full financials, HubSpot pipeline export. AMC pricing reconciliation ($1K/yr contract vs. $2.5K/5yr transcript) required pre-IC sign-off.", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 11: Risk (5 = lowest, inverted) ─────────────────────────────
  s11: {
    score: 3,
    dark: true,
    paras: [
      P([T("Risk verdict:  ", { bold: true, color: "FFFFFF" }), T("Risk profile is concentrated and named, not diffuse and unknown. Five meetings produced a positive (but not accelerating) signal direction. Two binary risks identified Apr 7 (June cliff, solvency) both moved 🔴 → 🟡 by Apr 29. Score reflects 'risk is bounded and addressable; meaningful execution exposure remains.'", { color: "FFFFFF" })]),
      P([T("HIGH ❌ pre-IC blockers:  ", { bold: true, color: "FFFFFF" }), T("(1) Panasonic field-rep activation — rep-level comp incentive unconfirmed; direct ask to Aditi required. (2) Pricing model — entertainment vertical (PRG): no per-event/project tier; required before NWAi seed-round participation. (3) AMC pricing reconciliation — $1K/yr vs. $2.5K/5yr discrepancy. (4) Data-room completion — cap table, employment agreements, key-man insurance, full financials, HubSpot export. (5) UCI patent assignment — US9064312B2 license terms / UCI M&A consent rights; gate-critical per DD Kickoff.", { color: "FFFFFF" })]),
      P([T("YELLOW ⚠ monitored:  ", { bold: true, color: "FFFFFF" }), T("Panasonic test renewal — verbal extension Dec 31 2026; amendment in legal queue, not drafted (confirm circulated pre-IC). Founder bandwidth / 'entrepreneurial trap' — NWAi soft term: written hiring + delegation plan tied to seed close. $3M seed (Q3–Q4 2026) — existential; track funnel and CP's '$3M+ qualified pipeline' milestone. 1.5x liquidation preference — non-standard; model dilution + waterfall on all three scenarios. Defense / SBIR pipeline — frozen; treat as upside only. Real-time dynamic calibration — MVP, no near-term weight. Stephen Clark 6.6% FD equity — confirm post-bridge cap table reflects.", { color: "FFFFFF" })]),
      P([T("Positive signal direction:  ", { bold: true, color: "FFFFFF" }), T("Tech moat strengthened across cycle (Petro May 1 is the strongest external moat validation in the diligence record). Solvency stabilized. Panasonic test extension secured. NA CEO Kappa converted from skeptic to sponsor. Named H2 deal (PBS Studios $345K) at proposal stage covers 38% of test threshold.", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 12: Exit Strategy ───────────────────────────────────────────
  s12: {
    score: 3,
    dark: true,
    paras: [
      P([T("Exit verdict:  ", { bold: true, color: "FFFFFF" }), T("Strategic acquisition is the realistic exit path — but Panasonic is the validating channel + licensee, NOT the acquirer. Petro (May 1, Panasonic Director of New Business Development) clarified the relationship explicitly: 'I would like to be able to license and embed their software into another project that we're working on.' Plus engineering co-development with Japan is framed as 'much longer-term scenario, just given the culture of Panasonic engineering team.' Real acquirer candidates are projector / display incumbents that lack calibration automation, and media-server bundlers closing a capability gap. Base case sits at the low end of the 10x threshold; Bull case clears it comfortably. IPO is not the underwriting path.", { color: "FFFFFF" })]),
      P([T("Channel + licensee (revenue path, NOT exit path):  ", { bold: true, color: "FFFFFF" }), T("Panasonic — operationally embedded; NA CEO Kappa sponsorship; resale channel + three Petro-described long-term licensing/embedding paths: (1) global rollout via Panasonic Europe / APAC, (2) white-label embed into 'another project' Petro can't disclose, (3) co-development with Panasonic Japan engineering. Petro's May 1 framing was unambiguous: licensing and embedding, not acquisition. Treat Panasonic as the revenue and validation channel — material to the Bull-case ARR endpoint and to triggering external acquirer interest, but not itself the exit.", { color: "FFFFFF" })]),
      P([T("Plausible strategic acquirers (capability-gap closers):  ", { bold: true, color: "FFFFFF" }), T("Christie / Sony / Epson / Optoma — projector / display incumbents that lack calibration automation; trial activity already in flight (TechMD / Disney trial, Sony seed interest, Epson golf-simulator pilot, Optoma trial kit deploying May 2026). Disguise / Pixera — #1 and #2 media-server bundlers; their warp/blend capability gap is exactly what STL provides — absorb-the-threat acquisition dynamic before STL achieves Memory Lock-in deepening. Defense primes — discount in base case (SBIR frozen, Clark conversion unverified); available as upside if defense unlock materializes.", { color: "FFFFFF" })]),
      P([T("10x mechanics (see S9 for entry math):  ", { bold: true, color: "FFFFFF" }), T("Base case borderline — depends on entry valuation at note conversion (cap and discount apply) and 1.5x liquidation preference compounding against later-round investors. Bull case non-trivial probability — Panasonic licensing/embedding paths drive Bull-case ARR endpoint, which in turn drives acquisition interest from projector / display incumbents and media-server bundlers who see Panasonic operationalizing STL at scale. Conservative IC posture: credit only the in-flight 80-license test for May 12 IC; treat the three Panasonic optionalities as ARR drivers, and the projector-incumbent + bundler acquisition paths as upside.", { color: "FFFFFF" })]),
      P([T("Early-exit triggers:  ", { bold: true, color: "FFFFFF" }), T("Strategic acquisition in 2027–2028 (post-seed) by a projector / display incumbent or media-server bundler is the most plausible early-exit scenario, particularly if a competitor moves to absorb STL's calibration moat before it commoditizes via Disguise / Pixera bundling. 1.5x early-exit protection is below market but provides downside coverage on early acquisitions.", { color: "FFFFFF" })]),
    ],
  },

  // ── Section 13: What Is the Bet We Are Making ───────────────────────────
  s13: {
    score: 4,
    dark: false,
    paras: [
      P([T("Consensus view:  ", { bold: true }), T("STL is a small, first-time-founder-led C-Corp with $480K of mostly-non-recurring 2025 revenue, an unproven sales motion, a 6-month Panasonic test that closed ZERO projects in H1 2026, and a $3M seed-round dependency that is existential. A traction investor passes today.")]),
      P([T("Our bet (NWAi):  ", { bold: true }), T("Two independent third-party validations — Golden Seeds patent-attorney review and a year-long Panasonic competitive scan — confirm that STL has built something defensible that nobody else does. Petro's words on May 1: 'Nobody's done it as eloquently as Summit.' The bottleneck is not the technology; it is operating bandwidth and field-rep activation, both of which are addressable. NWAi is entering on a convertible note with MFN / pro-rata / financial covenants in place, on terms set by a credible lead, at a California-premium $10M cap that is accepted as market-standard for the geography. The discount is the margin of safety. Five pre-IC conditions and two soft NWAi-side terms make the entry disciplined.")]),
      P([T("How we win:  ", { bold: true }), T("Panasonic delivers the 80-license test in H2 2026 (PBS Studios alone is 38% of threshold). The $3M seed closes cleanly in Q3–Q4 2026. Aditi accepts the hiring + delegation plan tied to seed and exits the 'entrepreneurial trap' — closing the first-time-CEO + solo-founder + researcher delegation gap. Per-event pricing tier ships and PRG converts. Then one of three Petro-named Panasonic licensing / channel paths drives Bull-case ARR: global rollout, white-label embed, or Japan co-development. Panasonic at scale triggers acquisition interest from projector / display incumbents that lack calibration automation (Christie, Sony, Epson, Optoma) or media-server bundlers closing the capability gap (Disguise, Pixera). Strategic acquisition 2027–2028 by a projector / display incumbent or media-server bundler in the upper half of the $80–200M range delivers 10x.")]),
      P([T("How we lose:  ", { bold: true }), T("Panasonic field reps never activate — the 18-year-tenure sales force never adopts; STL becomes a personality-dependent channel relationship between Petro / Jared and Aditi; the test renewal expires Dec 31, 2026 with the 80-license threshold unmet and Panasonic disengages from active channel push. The seed round slips, a second bridge stacks on top, and cap-table complexity destroys the return math at conversion. Or Disguise / Pixera ship competent bundled warp-and-blend before STL achieves Memory Lock-in deepening, neutralizing the moat and the acquisition thesis. Or the founder-delegation gap proves structural — Aditi cannot exit the entrepreneurial trap and the channel never scales beyond the founder-touch ceiling.")]),
      P([T("Why now:  ", { bold: true }), T("The diligence cycle is complete; the bottleneck is named; the conditions are tractable; the bridge close is imminent (end-Q2 2026); the founder is irreplaceable; and the Petro May 1 reference call delivered the strongest external moat validation in the file and the most direct outside-advisor operating memo on what Aditi must do next. The next quarterly check-in delivers actionable signal: amendment paper, comp-plan evidence, PBS close progress, AMC reconciliation, data-room completion. If those arrive, NWAi compounds at the cap. If they don't, NWAi's MFN and demand-maturity rights provide restructuring leverage.")]),
    ],
  },

  // ── Recommendation (bottom section) ──────────────────────────────────────
  recVerdict:  "☒  INVEST — with five pre-IC conditions and two soft NWAi-side terms.  [NWAi check size: TO BE CONFIRMED]",
  recWatch:    "☐  WATCH — Re-evaluate at next quarterly update if condition (1) Panasonic amendment slips past mid-Q3, OR if condition (2) rep-comp evidence cannot be produced.",
  recPass:     "☐  PASS — Reserved for the case where condition (2) rep-comp comes back negative or unanswerable AND a Kappa-level escalation call cannot resolve it.",
  recRationale:
    "Five-meeting diligence has confirmed STL is what the Scout Assessment said it was — a patented, field-validated, founder-led spatial-computing platform riding a real structural discontinuity, with one durable institutional channel (Panasonic, operating as resale + licensee — not as an acquirer; exit thesis depends on projector / display incumbents). The technology thesis has only strengthened across the cycle; the operating-execution risks (rooted in a first-time CEO + solo founder + UCI academic-researcher profile) have been definitively named and are addressable. NWAi is entering on a convertible note (passes hard gate) with MFN / pro-rata / financial covenants in place at a California-premium cap accepted as market-standard. The discount is the margin of safety. This is a TECHNOLOGY + FOUNDER bet, not a commercial-traction bet.",
  recConditions: [
    "Panasonic amendment draft circulated — verbal Dec 31, 2026 extension reduced to executed paper before IC sign-off.",
    "Rep-level compensation evidence — comp memo, SPIFF, or attainment-credit policy for STL deals (direct ask to Aditi). If negative or unanswerable, escalate to Kappa-level call before final approval.",
    "Data-room completion — updated cap table, employment agreements, key-man insurance, full financials, HubSpot pipeline export. Conditional approval acceptable with 10-business-day post-IC submission window.",
    "AMC pricing reconciliation — $1K/yr contract vs. $2.5K/5yr transcript (direct ask to Aditi/CP).",
    "NWAi allocation confirmed as convertible note (not SAFE); bridge close timeline tracked through end-Q2 2026; cap value reconciled ($10M signed term sheet vs. Jon Cole's '$9M' reference).",
  ],
  recTheme:
    "Soft NWAi-side terms (additive — not pre-IC blockers): (A) Written hiring + delegation plan tied to seed close, addressing the 'entrepreneurial trap' named by three independent sources. (B) Per-event / project-tier pricing track for entertainment vertical (PRG / live events) shipped or in active design before NWAi seed-round participation.  •  TechGroup Theme #2 — SW-Enabled HW, Physical AI & Robotics. Lead: TBD — Pending Dealum API. SMEs: TBD — Pending Dealum API.",

  // ── DD Team Votes (placeholder — real votes captured at IC) ─────────────
  ddVotes: [
    { role: "DD Lead",                name: "TBD — Pending Dealum API", recommend: "Invest (with conditions)", addon: "TBD" },
    { role: "TechGroup Co-Chair",     name: "Jamie Allison",            recommend: "Invest (with conditions)", addon: "TBD" },
    { role: "Investment Intelligence",name: "NWAi (analyst)",           recommend: "Invest (with conditions)", addon: "N/A" },
    { role: "Lead SME — Theme #2",    name: "TBD — Pending Dealum API", recommend: "TBD",                      addon: "TBD" },
    { role: "Supporting SME",         name: "TBD — Pending Dealum API", recommend: "TBD",                      addon: "TBD" },
    { role: "Supporting SME",         name: "TBD — Pending Dealum API", recommend: "TBD",                      addon: "TBD" },
    { role: "Legal (deal docs)",      name: "Jason Stark (NWA Miami counsel) — engagement pending", recommend: "Review", addon: "N/A" },
  ],

  // ── Appendix A — Outstanding Diligence Items ────────────────────────────
  appendixItems: [
    {
      item:       "Panasonic amendment paper",
      action:     "Confirm draft amendment circulated reducing the verbal Dec 31, 2026 extension to executed paper.",
      owner:      "Aditi / CP — direct ask",
      priority:   "GATE — pre-IC",
      priorityBg: "FFD7D7",
    },
    {
      item:       "Rep-level compensation evidence (Panasonic)",
      action:     "Direct ask to Aditi: comp memo, SPIFF, or attainment-credit policy for STL deals. Escalate to Kappa-level call if negative or unanswerable.",
      owner:      "Aditi — direct ask",
      priority:   "GATE — pre-IC",
      priorityBg: "FFD7D7",
    },
    {
      item:       "AMC pricing reconciliation",
      action:     "Resolve $1K/yr contract vs. $2.5K/5yr transcript discrepancy. ~$40K/yr revenue delta at 80 licenses.",
      owner:      "Aditi / CP — direct ask",
      priority:   "GATE — pre-IC",
      priorityBg: "FFD7D7",
    },
    {
      item:       "Data-room completion",
      action:     "Updated cap table (post-bridge), employment agreements, key-man insurance, full 2025/Q1-26 financials, HubSpot pipeline export.",
      owner:      "Aditi / CP",
      priority:   "GATE — pre-IC (or 10-bd post-IC window)",
      priorityBg: "FFD7D7",
    },
    {
      item:       "UCI patent assignment — US9064312B2",
      action:     "Patent counsel review of UCI license terms, royalty obligations, and UCI M&A consent rights. Gate-critical per DD Kickoff.",
      owner:      "Patent counsel — STL to provide license",
      priority:   "GATE — pre-IC",
      priorityBg: "FFD7D7",
    },
    {
      item:       "Cap value reconciliation",
      action:     "$10M (signed term sheet) vs. $9M (Jon Cole reference). Confirm with Kevin Li which version governs.",
      owner:      "Kevin Li — direct ask",
      priority:   "HIGH — pre-IC",
      priorityBg: "FFF3CD",
    },
    {
      item:       "NWAi allocation instrument confirmation",
      action:     "Confirm NWAi check converts on convertible note (not SAFE).",
      owner:      "Kevin Li / Jason Stark",
      priority:   "HIGH — pre-IC",
      priorityBg: "FFF3CD",
    },
    {
      item:       "Per-event / project-tier pricing (entertainment)",
      action:     "Confirm pricing-tier track shipped or in active design. Required before NWAi seed-round participation (soft term, not bridge gate).",
      owner:      "David Snyder (VP Sales)",
      priority:   "HIGH — pre-seed",
      priorityBg: "FFF3CD",
    },
    {
      item:       "Written hiring + delegation plan (NWAi soft term)",
      action:     "Plan tied to seed close. Directly addresses 'entrepreneurial trap' named by three independent sources.",
      owner:      "Aditi — soft IC term",
      priority:   "HIGH — pre-seed",
      priorityBg: "FFF3CD",
    },
    {
      item:       "Stephen Clark equity — post-bridge confirmation",
      action:     "Confirm 6.6% FD common reflected accurately on post-bridge cap table.",
      owner:      "Aditi / CP",
      priority:   "MEDIUM",
      priorityBg: "F4F4F4",
    },
    {
      item:       "1.5x liquidation preference modeling",
      action:     "Legal review before final term-sheet sign. Model dilution + waterfall on Bear/Base/Bull scenarios.",
      owner:      "Jason Stark (NWA counsel)",
      priority:   "MEDIUM",
      priorityBg: "F4F4F4",
    },
    {
      item:       "Jason Stark engagement",
      action:     "Confirm engagement initiated for closing-document review and NWA representation at closing. Build legal fees into deal budget.",
      owner:      "NWAi ops",
      priority:   "MEDIUM",
      priorityBg: "F4F4F4",
    },
    {
      item:       "MFN clause applicability",
      action:     "Confirm with Jason Stark whether MFN adequately protects NWAi against subsequent bridge note at better terms (note-stacking risk).",
      owner:      "Jason Stark",
      priority:   "MEDIUM",
      priorityBg: "F4F4F4",
    },
    {
      item:       "NPIA / Walkio 2026 portion",
      action:     "Reconfirm 72-projector 2026 deployment portion is on plan (base-case revenue input).",
      owner:      "David Snyder",
      priority:   "MEDIUM",
      priorityBg: "F4F4F4",
    },
    {
      item:       "Defense / SBIR pipeline",
      action:     "Confirm SBIR Phase 1 status and Clark conversion record. Discount in base case; treat as upside only.",
      owner:      "Aditi / Stephen Clark",
      priority:   "LOW (upside only)",
      priorityBg: "",
    },
    {
      item:       "Real-time dynamic calibration roadmap",
      action:     "Track depth-camera accuracy progress and shipping timeline. Resurfaces at Series A.",
      owner:      "CP",
      priority:   "LOW",
      priorityBg: "",
    },
  ],
};

// ─── Generate ───────────────────────────────────────────────────────────────
const outFile = path.join(__dirname, "STL-NWAi-DD-Report-2026-05-12.docx");
generateDDReport(data, outFile);
