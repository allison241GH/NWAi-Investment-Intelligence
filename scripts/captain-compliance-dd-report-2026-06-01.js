/**
 * Captain Compliance Corporation — NWAi DD Investment Report (UPDATE)
 *
 * This is an UPDATE of "Captain Compliance - DD Report 2026-04-28.docx".
 * Content is seeded verbatim from the April 28 report; 05-07 founder-answer
 * deltas are applied to §1, §5, §7, §8, §9, §11, §12, the green box, the
 * Recommendation conditions, and Appendix A. Verdict holds at WATCH.
 *
 * Routed through the canonical generator per CLAUDE.md (binding format rule).
 */
"use strict";

const { generateDDReport } = require("./dd-report-generator.js");
const { Paragraph, TextRun } = require("docx");

const FONT = "Arial";
// Local paragraph/run builders matching the generator's style (Arial, size 22).
const t = (text, o = {}) =>
  new TextRun({ text, font: FONT, size: o.size || 22, bold: !!o.bold, color: o.color || "000000" });
const p = (runs, o = {}) =>
  new Paragraph({ children: Array.isArray(runs) ? runs : [runs],
                  spacing: o.spacing || { before: 60, after: 60 } });
// Bold summary lead line for the top of each section.
const lead = (text) => p([t(text, { bold: true })]);
// Bold-prefixed paragraph: "Label.  body…"
const lp = (label, body) => p([t(label, { bold: true }), t(body)]);

const data = {
  // ─── Header ───────────────────────────────────────────────────────────────
  company:     "Captain Compliance Corporation",
  description: "Privacy compliance SaaS for US SMB and mid-market customers — bundled CMP, cookie scanner, DSAR ticketing, dynamic policy generator, and a Compliance Shield defense guarantee. Sells direct (legal-search inbound) and through an early insurance-carrier referral channel (Arch, CNA, Hartford, Hanover, Converge, Munich Re/NetDiligence — all referral, none signed reseller). Update (05-07): the sole outside term sheet ($2M at $10M pre) is being declined — the round has no lead investor.",
  platform:    "SaaS — React/Next.js + Node + Python microservices on Vercel/Cloudflare/Supabase",
  stage:       "Pre-Series A — live product, ~75 paying customers, $1.2M self-reported ARR",
  hq:          "Fort Lauderdale, FL  |  US C-Corp (registered 2023, QSBS-eligible)",
  round:       "$2.5M priced equity at $15M post-money  |  24 prior SAFEs ($2.242M) convert at round",
  ceo:         "Richart Ruddie (Founder/CEO)",
  raise:       "$2.5M  |  No lead investor (sole term sheet declined, per 05-07)",
  founded:     "2023",
  checkSize:   "[TO BE CONFIRMED — gated on conditions in Recommendation]",
  theme:       "TechGroup Theme #4 — Data Sovereignty, Security, Trust",

  // ─── Green recommendation box ───────────────────────────────────────────────
  recBoxVerdict: "NWAi RECOMMENDATION:  ☒  WATCH — Advance Conditional on Four Gate-Critical Folders Clearing",
  recBoxBody: "Advance to full 17-folder DD only after Folders 12 (founder integrity / CTO identity), 1 (cap-table cleanup), 10 (AI claim audit), and 9 (Compliance Shield UPL/E&O) clear with documentary evidence and on-record founder disclosure. If any of those four fails to clear, verdict moves to PASS. Updated 06-01 after the founder's 05-07 written answers to the four gate questions: none fully clears. Folder 9 advanced partially (E&O carrier named: Vouch); Folder 1 worsened (sole term sheet declined → no lead); Folder 12 hardened (founder minimizes the documented court-document forgery as an “ambulance chaser… extortion pay off” and did not disclose it proactively). The Product & Demo session must resolve Folder 10. Mirko (deal sponsor — prior investor, conflict disclosed); Pat Loftus co-leads pre-DD info scout.",

  // ─── §1  PROBLEM / MARKET OPPORTUNITY ──────────────────────────────────────
  s1: { score: 4, dark: false, paras: [
    lead("The pain is real, the timing is top-quartile, and the addressable market supports a venture outcome — but is materially smaller than the founder claims."),
    lp("Problem.  ", "US privacy litigation has industrialized: 5,000+ companies sued or warned under CIPA in the last 18 months, +82% YoY VPPA actions, statutory damages $250–$10K per violation, and the first state-AG cookie-banner settlement (Healthline / California, $1.55M, July 2025). 21 state privacy laws are live or pending. Twelve states now mandate Global Privacy Control honoring; browser-level GPC enforcement begins January 2027. Plaintiff-firm CIPA filings have a documented 24-month window of escalation."),
    lp("Market sizing.", ""),
    "  •  TAM (independent, CMP segment):  $1–2B today  →  $2.5–4B by 2030 (Mordor 11.2% CAGR; AMR 21.9%; Grand View 20.4%).",
    "  •  SAM (US-only, realistic):  ~$2B at 25% adoption ceiling across ~600K SMB + ~200K mid-market buyers.",
    "  •  Founder TAM claim:  $45B  →  the wrong category (broad data-privacy software umbrella, 9-year projection). Inflated 12–22× vs. CMP segment. Cynical Default trigger upheld from Scout.",
    lp("Timing — 5/5 (top-quartile).  ", "All five timing signals present: regulatory mandate of GPC (STRONG), plaintiff-firm critical mass (STRONG), state-AG enforcement live, multi-state law expansion, browser-level enforcement on a known calendar."),
    lp("Window risk.  ", "3–4 years on the commodity CMP layer if Compliance Shield is not real; 5–7 years if it is. SCOTUS Salazar v. Paramount Global (decision early 2027) and 9th Circuit narrowing of Article III standing in CIPA §638.51 cases are the visible litigation tail risks — not deal-killing, but a discount factor on the Bull case."),
    lp("Update (05-07):  ", "Founder engaged the Salazar tail risk directly and coherently — SCOTUS Salazar v. Paramount litigates the VPPA only, not the other 20+ state privacy statutes being enforced; federal preemption bills have historically failed and California has signaled it will not follow; he cites the $12.75M California-AG fine against GM (this week) as evidence enforcement is broadening, not narrowing. A credible rebuttal that modestly reduces — but does not remove — the discount factor on the Bull case."),
  ]},

  // ─── §2  SOLUTION / PRODUCT ────────────────────────────────────────────────
  s2: { score: 2, dark: true, paras: [
    lead("Commodity components stitched into a bundle, with white-glove services as the differentiating overlay. Moat Tier 1: 2/6 — Weak."),
    lp("Stack:  ", "CMP + cookie scanner + DSAR portal + dynamic policy generator + Compliance Shield defense guarantee. CEO publicly acknowledged building the platform with Cursor + Cloud Code over 14 months. Captain Compliance pays Cookiebot $96/mo (line item in their own forecast) — possibly using a competitor's tooling internally."),
    lp("Moat Tier 1 elements (0–6):", ""),
    "  •  Network Effects:  ✗  Privacy compliance is single-tenant; no cross-customer data flywheel.",
    "  •  Switching Costs:  ✓ partial.  Once deployed across tag-manager + DSAR portal, ripping out costs 1–2 weeks of eng — but data is portable; competitors import in <1 week.",
    "  •  Proprietary Data:  ✗  Cookie databases used (Open Cookie Database, Cookiepedia) are public.",
    "  •  IP / Patents:  ✗  USPTO returns zero. No GitHub footprint, no published technical work, no “patent pending” language anywhere.",
    "  •  Regulatory Barriers:  ✗  No SOC 2 / ISO 27001 disclosed. Compliance stack itself is checklist-able.",
    "  •  Vertical Specialization:  ✓ partial.  US SMB privacy + insurance channel + Compliance Shield is differentiated positioning — but Enzuzo and Osano partially mirror it.",
    lp("Defensibility comes from distribution and services, not software.  ", "The product moat is absent today; the channel moat (insurance carriers) is verbal-referral only with zero signed reseller agreements located in public sources. The live Product & Demo session (Folder 10) is the chance to overturn this verdict."),
  ]},

  // ─── §3  AI / SOFTWARE MOAT ────────────────────────────────────────────────
  s3: { score: 1, dark: true, paras: [
    lead("Thin Wrapper. AI Moat: 1/10 — bottom decile. All three thin-wrapper tests fail."),
    lp("Three thin-wrapper tests (per nwai-investment-framework / ai-moats-framework):", ""),
    "  •  48-hour replicability:  ❌  Entire stack is commodity OSS components.",
    "  •  Public-API reproducibility:  ❌  Playwright + regex + LLM API call reproduces the “AI consent misconfiguration scoring” claim.",
    "  •  Proprietary asset:  ❌  No labeled corpus, no fine-tunes, no custom model, no eval harness located.",
    lp("AI Moat dimensions (Tier 2, 0–10):", ""),
    "  •  Training Data:  0/2.  No labeled corpus disclosed.",
    "  •  Inference Data:  0/1.  Stateless one-off scans.",
    "  •  Memory Lock-in:  0/1.  Product does not get smarter with use.",
    "  •  Custom Training:  0/1.  No fine-tunes, no GPU spend disclosed.",
    "  •  Proprietary HW:  0/1.  Vercel + Cloudflare + Supabase commodity.",
    "  •  Workflow Integration:  1/2.  JS embed + DSAR portal create modest stickiness.",
    "  •  Regulatory Layer:  0/1.  No SOC 2 / IAB TCF certification disclosed.",
    "  •  Network Effects:  0/1.  No cross-customer flywheel.",
    lp("Moat-deepening path (only if it exists):  ", "cross-customer aggregated risk-classification dataset → carriers pay to access → Memory Lock-in emerges. That asset is not present today; whether it can emerge is the central question for the upcoming Product & Demo session (Folder 10)."),
  ]},

  // ─── §4  BUSINESS MODEL & CUSTOMERS ────────────────────────────────────────
  s4: { score: 2, dark: false, paras: [
    lead("Pricing is legible; revenue composition is not. Sticky-with-inertia, not sticky-by-indispensability."),
    lp("Pricing (founder-stated):  ", "SMB Pro $449/mo; Enterprise $1,250–$50,000/mo; Audits $500; Custom policies up to $5K; Implementation up to $50K one-time; Expert witness from $3K."),
    lp("Revenue stickiness:  ", "98% retention (founder-claimed, unaudited). Switching cost is real but compliance-exposure-driven — removal carries lawsuit risk, which keeps customers in place independent of product quality. Inertia Penalty applied at Triage; carries forward into DD."),
    lp("Customer concentration risk:  ", "Polymarket at $45K/mo would represent ~30% of post-close ARR if it lands. Top-5 customer concentration not disclosed — required scoring input (Folder Q: A-2). Mass General Brigham ($78K/yr signed), TaylorMade, and Lemon Perfect cited but not appearing in any public Captain case study, press release, or website logo strip — to be third-party-verified during full DD."),
    lp("ARR composition unknown:  ", "Of $1.2M ARR, the % split across pure recurring SaaS subscription / implementation services (LATAM team) / Compliance Shield defense revenue / expert-witness audit services is undisclosed. The investable thesis requires the SaaS line to dominate and grow faster than services. Until the breakdown is on file, business-model quality is unscored on its central axis."),
  ]},

  // ─── §5  CUSTOMER PIPELINE ─────────────────────────────────────────────────
  s5: { score: 2, dark: false, paras: [
    lead("Real bookings velocity, but pre-PMF channel architecture and unverified logos."),
    lp("Booking signals:  ", "$25K bookings in last 7 days = ~$1.3M annualized run-rate. $9.5K → $1.2M ARR in ~14 months. Venture Atlanta 2025 pitch-comp winner. G2 5.0 from 11 reviews. Term sheet incoming from Atlanta fund (Mosaic Ventures, Valor Ventures interested, per founder) — see §9 Update: this term sheet is now being declined."),
    lp("Verification gap:  ", "Zero of the named customers (Mass General Brigham, TaylorMade, Lemon Perfect, Polymarket) appear in any public Captain Compliance case study, press release, or website logo strip. “98% retention” is unaudited. Required at full DD: cohort table, churn definition, sample size, third-party reference checks on at least 3 closed-won customers."),
    lp("GTM structure:  ", "9-channel motion (insurance, litigators, regulators, agencies, web devs, webinars, CTV, SEO, conferences) reads as pre-PMF channel exploration, not focus. Real wedge is two: (1) direct legal-search inbound, (2) insurance-carrier referrals — the thesis-defining channel. Other seven are noise until proven. CAC by channel and blended payback period not disclosed (Folder Q: A-4) — required input for evaluating the planned $464K/yr ad ramp."),
    lp("Compliance Shield as customer-acquisition hook:  ", "Genuine differentiator at the buy decision. Whether it is a real underwritten insurance product or a marketing pledge with internal defense fund is the central question for Folder 9 — and changes both the moat scoring and the legal-exposure scoring on this deal."),
    lp("Update (05-07):  ", "Founder named the E&O carrier — Vouch — and cited 5 client cases dismissed in the last 50 days by supplying an audit template proving the software was configured correctly (a partial Folder 9 advance). But he concedes the customer-facing website language makes Captain liable (“if you receive a fine or demand letter related to what we’re protecting for you we will cover it for you”) and offers to “tighten up the language.” Per-incident/aggregate caps, attorney-in-the-loop architecture, and Vouch coverage terms remain open — to be shown in the demo."),
  ]},

  // ─── §6  COMPETITION & MOAT ────────────────────────────────────────────────
  s6: { score: 3, dark: false, paras: [
    lead("9+ funded direct competitors, a free hyperscaler CMP, and at least one analogous-pledge competitor. The Compliance Shield + carrier-channel wedge is narrower than the Scout characterized."),
    lp("Direct competitors:", ""),
    "  •  OneTrust  —  $500M+ ARR, $10B+ PE deal pending. Category leader; SMB tier risk if launched.",
    "  •  Cookiebot / Usercentrics  —  $117M ARR. Active roll-up acquirer (probable acquirer of Captain at exit).",
    "  •  Osano  —  $25M Series B (Aug 2023). Offers a $500K “No Fines, No Penalties” pledge — analogous to Compliance Shield (and, per the founder's 05-07 note, capped at $500K for regulatory fines only, not privacy suits).",
    "  •  Enzuzo  —  Advertises white-glove onboarding (24hr SLA, dedicated Slack, AM) at $9–$79/mo + custom enterprise. Directly contradicts Scout's “no one else does white-glove on mid-market” claim.",
    "  •  TrustArc, Ketch, Termly, Secure Privacy, CookieYes  —  Funded category players covering the same SMB/mid-market band.",
    lp("Hyperscaler displacement:", ""),
    "  •  Cloudflare Zaraz  —  Free CMP, IAB TCF v2.2 + Google Consent Mode v2 compliant. “Good enough” for the SMB tail at $0.",
    "  •  Microsoft Purview / Priva  —  Bundled with M365 E5 for enterprise.",
    lp("LLM-displacement risk:  ", "Medium-high. A CIO at a mid-sized enterprise can reproduce the bundled scanner + monitoring tool with Claude/GPT-4o + Playwright in 4–8 weeks. Scout flagged this as Rick's displacement question; DD confirms it."),
    lp("Durable wedge (if real):  ", "(1) Compliance Shield as an actually-underwritten defense guarantee — competitors cannot match without underwriting infrastructure. (2) Insurance-carrier reseller economics — competitors cannot poach a contracted distribution channel. Both are unproven at contract scale today. Competitive Risk: 7/10."),
  ]},

  // ─── §7  GO-TO-MARKET STRATEGY ─────────────────────────────────────────────
  s7: { score: 3, dark: false, paras: [
    lead("The right strategic bet (insurance-carrier distribution); the wrong contractual reality (zero signed reseller agreements). Market Risk: 6/10."),
    lp("Sales motion:  ", "Two real wedges + seven noise channels."),
    "  •  Wedge 1 — Direct legal-search inbound:  SMB and mid-market businesses Googling “CIPA defense” / “cookie consent compliance” land on Captain via SEO and webinar funnels. ICP: GC + CMO at a mid-market e-commerce, healthcare, or law firm; $5–50K/yr deal size.",
    "  •  Wedge 2 — Insurance-carrier referrals:  Cyber insurance carriers refer policyholders to Captain as a preventive vendor. ICP: same. Carriers identified — Arch, CNA, Hartford, Hanover, Converge, Munich Re via NetDiligence — all referral, none signed reseller. CNA “call that day” still pipeline as of Live Pitch. No public reseller agreement located.",
    lp("Channel economics undisclosed:  ", "For each named carrier, the legal status (signed reseller / referral / paid pilot / sponsorship), dollar volume of customers referred to date, and economics paid (rev-share, finder's fee, co-marketing) is required scoring input (Folder Q: A-5). Without these, the channel-moat thesis is asserted, not evidenced."),
    lp("Compliance Shield as GTM hook + risk:  ", "Compelling at the close, but UPL/E&O exposure is a real liability. If Captain coordinates legal defense for customers without an attorney-network architecture, unauthorized practice of law exposure exists across CA, TX, FL, NY, IL. E&O carrier name, limits, deductible, exclusions, and 2026 renewal pricing are required Folder 9 inputs."),
    lp("Update (05-07):  ", "E&O carrier now named (Vouch) — one Folder 9 input closed. Still open: policy limits, deductible, exclusions, 2026 renewal pricing, per-incident/aggregate indemnification caps, and whether a licensed attorney sits in the defense loop (the UPL test). Founder's admission that the website language “makes us liable” and his offer to tighten it is itself a flag that current customer contracts may carry uncapped exposure."),
    lp("$10M ARR path:  ", "Credible in 18–24 months at current ~100% YoY growth. $100M ARR (founder claim) is stretch — supports a $30–50M ARR exit corridor in 4–5 years more credibly than $1B+."),
  ]},

  // ─── §8  TEAM & EXECUTION ──────────────────────────────────────────────────
  s8: { score: 2, dark: true, paras: [
    lead("Strong jockey by execution metrics; structural integrity questions on the founder; technical leadership unverified.  Execution Risk: 8/10."),
    lp("Team roster (cap-table FD %):", ""),
    "  •  CEO Richart Ruddie  —  82.5% FD.  Self-funded $1M+ personal capital. $9.5K → $1.2M ARR in 14 months. Venture Atlanta 2025 winner. ❌ Documented 2016–2017 history of court-document fraud (filing bogus defamation suits with fake plaintiffs/defendants and forged court documents to obtain Google delisting orders), $71K anti-SLAPP settlement (Rhode Island, March 2017), reported plea bargaining with US Attorney for District of Rhode Island. Coverage: Washington Post (Volokh Conspiracy), Techdirt (9 articles, 2016–2018), Boing Boing, Public Citizen. Federal disposition not located in public record.",
    "  •  CTO Mohamed Alkady  —  8.7% FD (840K options vesting from Aug 2024). LinkedIn near-empty (~5 connections, no work history, no education). Distinct person from the Hart Inc. CEO of the same name. Absent from Live Pitch on a question explicitly about technical defensibility. Identity unverified.",
    "  •  CTPO Alex Proctor  —  4.1% FD.  FIP, CIPP/E, CIPP/US, CIPM, CIPT, AIGP. Strong privacy credentialing — the credible privacy operator on the team.",
    "  •  CRO Sam Seliger  —  1.6% FD.  LA-based sales generalist, no privacy domain experience. RSA canceled Jan 2026 (“Secondary”), re-granted as 156K options Feb 3, 2026.",
    lp("Execution-strength signals:  ", "Bookings velocity, customer landing (Mass General Brigham), self-funded $1M+ runway, pitch-comp competitiveness — these are real. Founder's execution is not the question."),
    lp("Integrity gate:  ", "For a company branded “Trust and Privacy,” the founder's documented court-document forgery history is the dominant flag. Required pre-DD: on-record disclosure conversation; PACER lookup on the federal District of Rhode Island matter; confirmation of disclosure to existing investors; reference checks on at least 2 prior business partners and 1 prior investor. Mirko + Pat to attend, recorded."),
    lp("Update (05-07) — founder's on-record characterization:  ", "Asked why he had not disclosed the 2016–2017 history and what the fallout was, Richart Ruddie reframed the documented forged-court-order matter as “no case just an ambulance chaser who didn't like his clients' defamatory content being removed which resulted in an extortion pay off,” and stated the prior company tripled revenue 2017–2022 and exited successfully. Per the Diligence-Analysis Declarations lens, this self-framing is itself high-signal: for a “Trust and Privacy” company, minimizing a documented forged-court-order matter (Washington Post / Volokh, Techdirt) as victimhood — rather than acknowledging and contextualizing it — hardens, not clears, the integrity gate. The written answer does not substitute for the on-record disclosure conversation or the PACER lookup, both of which remain mandatory KILL-condition gates."),
    lp("Technical-leadership gate:  ", "CTO identity verification — full work history, education, citizenship/work-auth, GitHub or technical-work-product evidence, explicit confirmation of full-time status. Reconcile against the $325K/yr “Engineering CTO” line in the forecast. “4× prior exits” claim: only 1 verifiable (Reputation Management Co., Jan 2023, Quiet Light brokered to PE). “$75M ARR Hart” claim appears misattributed to a different person."),
  ]},

  // ─── §9  DEAL STRUCTURE & CAP TABLE ────────────────────────────────────────
  s9: { score: 1, dark: true, paras: [
    lead("❌  Gate-critical. Multiple legal-hygiene issues require attorney sign-off and renegotiation before any term-sheet conversation."),
    lp("Round mechanics:", ""),
    "  •  Structure:  ✓ Priced equity ($2.5M at $15M post). NWAi-acceptable.",
    "  •  Lead:  ❌ None. The only outside term sheet ($2M at $10M pre) is being declined (see Update). Mosaic / Valor interest unverified.",
    "  •  Prior SAFEs:  24 SAFEs / $2.242M total convert at the round. Two cap tranches ($10M / 20% disc; $12M / 0% disc).",
    "  •  Option pool:  13.4% FD, 3% available — refresh likely required pre-Series A.",
    lp("Gate-critical issues:", ""),
    "  •  ❌  Founder SAFE-16 — $800K self-issued by Richart Ruddie on Jan 6, 2026 ($10M cap, 20% disc), four weeks before the priced round at $15M post. Converts personal cash into discount equity at a built-in 33%+ markup against outside SAFE holders. Required: renegotiation to convert at priced-round terms (no insider discount), or cancellation.",
    "  •  ❌  $0-cap SAFE chain — SAFE-17/18/19 issued Jan 19, 2026 at $0 valuation cap, canceled three days later (Jan 22, 2026) with reason “Other,” re-issued as SAFE-21/22/23. Required: attorney letter confirming the cancellation extinguishes any live $0-cap legal claim.",
    "  •  ⚠   CRO Seliger RSA chain — RSA canceled Jan 2026 (“Secondary”), re-granted as 156K options Feb 3, 2026. Required: clean explanation on the record.",
    "  •  ⚠   Founder $1M personal injection — structure undisclosed (common subscription / contributed capital / unsecured loan?). Required: documentation.",
    lp("Update (05-07) — term sheet declined; founder injection partially explained:  ", "Captain is declining its sole outside term sheet — $2M at $10M pre, offered by an Atlanta fund in December and finalized in April. Founder cites diligence on the fund (a prior founder and a VC reportedly described a pre-seed-then-pulled-the-seed pattern) and the fund's refusal to move off the original $10M-pre price. Net: the round still has no lead, and the declined $10M pre-money sits materially below the $15M post-money Captain is now raising at — a valuation-justification gap to probe. On the $1M injection: characterized as “funds used since inception” with no salary taken, but the legal structure (contributed capital / loan / common subscription) remains undocumented. Folder 1 does not clear; if anything the absence of any willing lead is a sharper concern post-05-07."),
    lp("", "Until Folder 1 clears with documentary evidence, this deal cannot move to a term-sheet conversation. NWAi check size is gated on the four conditions in the Recommendation table."),
  ]},

  // ─── §10  FINANCIALS ───────────────────────────────────────────────────────
  s10: { score: 2, dark: true, paras: [
    lead("Real revenue, no audited validation. Burn divergence between Live Pitch narrative and forecast. No unit economics on file. Financial Risk: 7/10."),
    lp("Headline metrics:", ""),
    "  •  ARR:  $1.2M self-reported. $25K bookings last 7 days = ~$1.3M annualized run-rate.",
    "  •  Customers:  ~75 paying. 98% retention claimed (unaudited).",
    "  •  Gross margin:  Estimated 73–76% (mix of subscription + LATAM-delivered services). Below SaaS benchmark.",
    "  •  Cash runway:  ~18–20 months post-raise at planned $151K/mo burn. Insufficient if growth disappoints — bridge or down-round risk by mid-2027.",
    lp("❌ Burn divergence:  ", "Founder cited $30K/mo current burn at Live Pitch. 13-month forecast on file shows $94K (Apr 2026) → $151K (Jun 2026 onward) = ~$1.84M total. 3–5× ramp. Forecast adds a $325K/yr Engineering CTO line item even though Mohamed Alkady is the named CTO. Both must be reconciled on the record."),
    lp("❌ Unit economics undisclosed:  ", "No churn definition, no CAC by channel, no payback period, no LTV. The planned $464K/yr advertising ramp without disclosed CAC payback is the single largest planned-burn risk on the model. Required scoring input (Folder Q: A-4)."),
    lp("❌ ARR not audited:  ", "No accountant-reviewed financials, no bank statements, no AR aging, no prior-year tax returns on file. ARR is founder self-report; $1M founder injection is self-report. Required: bank-statement validation or accountant letter; current cash balance; 2 years tax returns."),
    lp("Bear / Base / Bull (NWAi-applied):", ""),
    "  •  Bear  —  $5.5M ARR by 2030.  Return 1.2–2.9×.  Principal risk.",
    "  •  Base  —  $21M ARR by 2030.  Return 4.5–11×.  10× plausible at premium multiple.",
    "  •  Bull  —  $33M ARR by 2030.  Return 7–17×.  $300M+ exit probability ~10–15%.",
    lp("10× viability:  ", "STRETCH — supported only on Base case at premium multiple. Math detail in §12."),
  ]},

  // ─── §11  RISK ─────────────────────────────────────────────────────────────
  s11: { score: 2, dark: true, paras: [
    lead("Risk average 7.2/10 — above the NWAi <7.0 threshold for a clean Advance. Two categories at gate-critical (≥8): Execution and Technical."),
    lp("Risk scoring (1 = lowest risk, 10 = highest):", ""),
    "  •  Execution  —  8/10.  ❌ Founder fraud history; CTO identity unverified and absent from Live Pitch; LATAM-cost framing of engineering org; key-person dependency on Richart.",
    "  •  Technical  —  8/10.  ❌ Thin-wrapper across all three tests; vibe-coded MVP; no IP or proprietary data; no GitHub footprint.",
    "  •  Financial  —  7/10.  Burn divergence; founder self-SAFE; $0-cap SAFE chain; Polymarket concentration 30%+ if it lands; no lead investor; unit economics undisclosed.",
    "  •  Competitive  —  7/10.  9+ funded direct competitors; Cloudflare Zaraz free CMP; LLM-displacement medium-high; Compliance Shield wedge narrower than Scout assessed.",
    "  •  Market  —  6/10.  Real demand but litigation environment narrowing — SCOTUS Salazar (decision 2027), 9th Circuit Article III narrowing in CIPA, BIPA reform precedent, federal preemption tail risk; 2025 saw zero new state laws.",
    "  •  AVERAGE:  7.2/10  →  Section score 2 (inverted: avg 7–8 → score 2).",
    lp("Update (05-07):  ", "Execution-risk note reinforced — the founder's minimizing characterization of the forgery history adds qualitative weight, though the numeric holds at 8/10 pending PACER and the on-record conversation. Financial-risk note reinforced — Captain has now actively declined its sole term sheet, confirming no lead. Folder 9 partially de-risked (E&O carrier named: Vouch). Average holds 7.2/10 → section score 2."),
    lp("Top three risks to clear before any capital deployment:", ""),
    "  1.  ❌  Founder integrity (Folder 12) — federal disposition + investor disclosure + reference checks. KILL CONDITION if unresolved. (05-07 written answer hardens, does not clear.)",
    "  2.  ❌  Cap-table legal hygiene (Folder 1) — $0-cap SAFE chain extinguishment + founder SAFE-16 renegotiation. KILL CONDITION if unresolved. (05-07: sole term sheet declined → no lead.)",
    "  3.  ⚠   Thin-wrapper + Compliance Shield UPL/E&O (Folders 10, 9) — AI-claim audit + attorney-network architecture + E&O coverage. WATCH if unresolved. (05-07: Vouch named; demo to resolve the rest.)",
  ]},

  // ─── §12  EXIT STRATEGY ────────────────────────────────────────────────────
  s12: { score: 2, dark: true, paras: [
    lead("Plausible exit corridor in the $30–80M tuck-in range. $1B+ exit narrative is aspirational. 10× return: STRETCH."),
    lp("Exit math (NWAi pre-money $12.5M; 16.67% pre-dilution; 35% blended dilution to exit):", ""),
    "  •  Required exit at 10×:  ~$150M (pre-dilution) / ~$231M (post-dilution).",
    "  •  At 5× ARR multiple:  $30M ARR.",
    "  •  At 8× ARR multiple:  $19M ARR.",
    lp("Probable acquirers (probability-weighted):", ""),
    "  •  Usercentrics / Cookiebot  —  HIGHER.  Active roll-up; would absorb a sub-$30M ARR tuck-in for SMB book + carrier channel if proven.",
    "  •  Main Capital (TrustArc owner)  —  MEDIUM.  PE roll-up consolidator playbook fits.",
    "  •  PE-rolled-up OneTrust portfolio  —  MEDIUM.  Strategic consolidation post-PE close.",
    "  •  Cyber insurance carrier (Munich Re, CNA)  —  LOWER.  Vertical-integration thesis is plausible but no known precedent transaction in this category.",
    "  •  Thoma Bravo / Salesforce / HubSpot (founder-named)  —  NEAR-ZERO.  No precedent transactions in this category at this stage; founder-aspirational.",
    lp("Exit corridor:  ", "Tuck-in $30–80M ARR × 5× = $150–400M valuation in 4–5 years has 35–45% probability. $300M+ exit has 10–15% probability — Bull case territory."),
    lp("Tail risks discounting Bull:  ", "SCOTUS Salazar (decision early 2027) narrowing CIPA standing; federal preemption (long-tail); BIPA reform precedent compressing statutory-damages exposure; browser-level GPC making CMP UI obsolete on a 5–7yr horizon. Update (05-07): the founder's VPPA-only reading of Salazar (see §1) is a reasonable narrowing of this tail, but does not eliminate the federal-preemption or GPC-obsolescence discounts."),
    lp("Early-exit triggers worth monitoring:  ", "(a) signed reseller agreement with a top-3 cyber carrier;  (b) Compliance Shield underwritten by a named E&O carrier with public limits;  (c) two consecutive quarters of $5M+ ARR adds — any of these would compress the exit horizon and lift the probability mass on the Base/Bull cases."),
  ]},

  // ─── §13  WHAT IS THE BET WE ARE MAKING ────────────────────────────────────
  s13: { score: 2, dark: false, paras: [
    lp("Consensus view  —  ", "This is a bankable services business riding a regulatory tailwind, with a charismatic operator who has hit $1.2M ARR in 14 months in a category where OneTrust ($500M+ ARR) and seven other funded competitors are all chasing the same SMB band. The product is a vibe-coded commodity bundle; the AI is marketing language; the moat is asserted rather than evidenced. The founder has a documented court-document fraud history — and, per his 05-07 answer, frames it as victimhood rather than acknowledging it. Most syndicates pass at this stage."),
    lp("Our bet (if we Advance after gates clear)  —  ", "We are not betting on the product, the AI, or the founder narrative. We are betting on three things in this order:"),
    "  1.  Distribution becomes contracted.  At least one of the named carriers (Arch, CNA, Hartford, Hanover, Converge, Munich Re via NetDiligence) formalizes a reseller economics relationship within 12 months of close, driving 30%+ of new ARR through the channel. This is the moat.",
    "  2.  Compliance Shield becomes underwritten.  The defense guarantee transitions from marketing pledge to a real E&O-backed product with named carrier limits (Vouch named 05-07 — limits/caps still open), prior payouts, and an attorney-network architecture that clears UPL exposure. This is the wedge.",
    "  3.  CTPO Alex Proctor becomes the credible technical face.  As the only credentialed privacy operator on the team (FIP, CIPP/E, CIPP/US, CIPM, CIPT, AIGP), Proctor — not Richart — anchors the company's integrity story with carriers, regulators, and acquirers. This is the de-risking.",
    lp("What we are NOT betting on:  ", "proprietary AI, technical moat, $100M ARR exit, founder-as-evangelist beyond $10M ARR."),
    lp("Why this still warrants Conditional Advance — not Pass.  ", "The market timing is genuinely top-quartile. The carrier-channel thesis, if it formalizes, is the kind of structural distribution asset that competitors cannot replicate from a feature-parity position. CTPO Proctor's privacy credentialing creates a credible second-source narrative if the founder integrity question resolves cleanly. The bet is small ($2.5M round; NWAi check TBD), the gate conditions are surgical, and the exit corridor — if Base case obtains — supports a 4.5–11× return at premium multiple. But note the 05-07 movement: the integrity item hardened and the round lost its only term sheet. The risk-adjusted call remains to gate, not to pass — with the founder-integrity conversation now the single highest-priority gate."),
  ]},

  // ─── Recommendation ─────────────────────────────────────────────────────────
  recVerdict:   "☐  INVEST — [NWAi check size: TO BE CONFIRMED, gated on conditions below]",
  recWatch:     "☒  WATCH — Re-evaluate after Folders 12, 1, 10, 9 clear with documentary evidence (founder answered 05-07; none fully cleared)",
  recPass:      "☐  PASS — Move to PASS if any of the four gate-critical conditions below fails to clear",
  recRationale: "Captain Compliance has real revenue and top-quartile market timing inside a genuine US privacy litigation discontinuity, but four gate-critical findings emerged in the DD pass that materially exceed the risk surface implied by the Scout score: (1) founder integrity history; (2) cap-table legal hygiene; (3) thin-wrapper technical verdict (AI Moat 1/10); (4) Compliance Shield UPL/E&O exposure. The founder's 05-07 written answers move three of the four — Folder 9 partially forward (E&O carrier named: Vouch), Folder 1 backward (sole term sheet declined → no lead investor), and Folder 12 adversely (the documented forgery is minimized rather than acknowledged). None fully clears. Moat Tier 1 (2/6) is below the 4/6 threshold for clean Advance; Risk average (7.2/10) is above the <7 threshold. The right path is unchanged: fund Folders 1, 9, 10, 12 as a gated pre-DD work package — with the Folder 12 founder-integrity conversation now the top priority and the Product & Demo session resolving Folder 10 — hold the rest of the 17-folder scope, and re-evaluate once gate conditions clear.",
  recConditions: [
    "Folder 12 — On-record founder disclosure conversation with Richart Ruddie covering 2016–2017 conduct, current disposition of the federal District of Rhode Island matter, and prior disclosure to existing investors. NOTE (05-07): the founder's written answer minimizes the matter as an “ambulance chaser… extortion pay off” and was not proactively disclosed — this elevates, not satisfies, the condition. PACER lookup in parallel. Reference checks on 2 prior business partners + 1 prior investor. KILL CONDITION if the federal matter is unresolved or sealed without credible disposition, or if non-disclosure to existing investors is confirmed.",
    "Folder 12 — CTO identity and role verification for Mohamed Alkady: full work history, education, citizenship/work-auth, direct LinkedIn confirmation, GitHub or technical-work-product evidence, explicit confirmation he is full-time. Reconcile against the $325K/yr “Engineering CTO” line item in the forecast.",
    "Folder 1 — Cap-table cleanup: attorney letter on the SAFE-17/18/19 ($0-cap) cancellation chain extinguishing any live claim; renegotiation of founder SAFE-16 ($800K) to priced-round terms (no insider discount); explanation of the CRO Seliger RSA → cancellation → option re-grant chain; documentation of the $1M founder injection structure. NOTE (05-07): the sole outside term sheet ($2M @ $10M pre) is being declined — confirm the rationale, identify the fund, and reconcile the declined $10M pre against the $15M post being raised. The round currently has no lead. KILL CONDITION if the $0-cap claim cannot be extinguished with attorney sign-off, or if the founder refuses to renegotiate SAFE-16.",
    "Folder 9 — Compliance Shield legal review: customer-facing contract language; attorney-network architecture (or absence and UPL exposure analysis); E&O coverage. NOTE (05-07): carrier named — Vouch. Still required: policy limits, deductible, exclusions, 2026 renewal pricing, per-incident/aggregate indemnification caps, prior payouts, and whether a licensed attorney sits in the defense loop. Founder concedes the website language creates liability and offered to tighten it. Independent privacy-litigation defense counsel review of UPL exposure across CA, TX, FL, NY, IL.",
    "Folder 10 — Technical demo + AI-claim audit (the upcoming Product & Demo session): live demo on an unseen website (per Pat's Live Pitch ask); architecture walkthrough showing each LLM API call vs. rule-engine boundary; confirmation the “AI monitoring tool” is in production with a named customer; IP assignment from LATAM contractors and AI-coding-tool (Cursor / Cloud Code) generated code; inference cost per scan; eval-harness accuracy metrics (if any).",
    "Folder 2 — Reconcile $30K stated burn vs. $151K forecast burn on the record. Provide multi-year P&L and cash-flow projection with stated assumptions. Provide unit economics (gross logo retention, NDR, CAC by channel, payback period) — required to evaluate the $464K/yr ad ramp.",
  ],
  recTheme: "TechGroup Theme #4 — Data Sovereignty, Security, Trust  |  Lead: TBD — Pending Dealum API  |  SMEs: TBD — Pending Dealum API  |  Deal sponsor: Mirko (prior investor — conflict disclosed)  |  Pre-DD info scout co-lead: Pat Loftus",

  // ─── DD Team Votes ──────────────────────────────────────────────────────────
  ddVotes: [
    { role: "Deal Sponsor",      name: "Mirko (conflict disclosed)", recommend: "WATCH — Conditional Advance", addon: "[TBD]" },
    { role: "Pre-DD Co-Lead",    name: "Pat Loftus",                 recommend: "WATCH — Conditional Advance", addon: "[TBD]" },
    { role: "TechGroup Co-Chair",name: "Jamie Allison",              recommend: "WATCH — Conditional Advance", addon: "[TBD]" },
    { role: "Theme #4 Lead",     name: "TBD — Pending Dealum API",   recommend: "[TBD]", addon: "[TBD]" },
    { role: "Theme #4 SME",      name: "TBD — Pending Dealum API",   recommend: "[TBD]", addon: "[TBD]" },
    { role: "Theme #4 SME",      name: "TBD — Pending Dealum API",   recommend: "[TBD]", addon: "[TBD]" },
  ],

  // ─── Appendix A — Outstanding Diligence Items ───────────────────────────────
  appendixItems: [
    { item: "Folder 12 — Founder Integrity", action: "On-record disclosure conversation with Richart Ruddie covering 2016–2017 court-document fraud, federal District of RI disposition, and prior investor disclosure. PARTIALLY ANSWERED 05-07 (founder minimizes the matter as an “ambulance chaser… extortion pay off”; not proactively disclosed) — written answer hardens the gate; on-record conversation + PACER still mandatory. References on 2 prior business partners + 1 prior investor.", owner: "Mirko + Pat Loftus", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 12 — CTO Identity", action: "Verify Mohamed Alkady identity: work history, education, citizenship/work-auth, direct LinkedIn confirmation, GitHub or technical-work-product evidence, full-time confirmation. Reconcile vs. $325K/yr “Engineering CTO” forecast line.", owner: "Pat Loftus + DD Lead", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 1 — Cap Table", action: "Attorney letter on SAFE-17/18/19 ($0-cap) cancellation extinguishing all live claims. Renegotiate founder SAFE-16 ($800K) to priced-round terms (no insider discount). Explain CRO RSA → cancellation → option chain. Document $1M founder injection.", owner: "DD Lead + Counsel", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 1 — Term Sheet & Lead", action: "NEW (05-07): Captain is declining its sole outside term sheet ($2M @ $10M pre, Atlanta fund). Verify the decline rationale, identify the fund, and reconcile the declined $10M pre-money against the $15M post-money being raised. Confirm no lead investor and assess implications for round closeability.", owner: "DD Lead + Pat Loftus", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 10 — IP / AI Claim", action: "PRODUCT & DEMO SESSION: live demo on unseen website. Architecture walkthrough: LLM-API calls vs. rule-engine boundary. Confirm the “AI monitoring tool” is in production with a named customer. IP assignment from LATAM contractors and AI-coding-tool generated code. Inference cost per scan. Eval-harness accuracy metrics if any.", owner: "Technology-Analyst + SME", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 9 — Compliance Shield", action: "PARTIALLY ANSWERED 05-07 (E&O carrier named: Vouch). Outstanding: policy limits, deductible, exclusions, 2026 renewal pricing, per-incident/aggregate indemnification caps, prior payouts, attorney-in-the-loop (UPL) architecture. Founder concedes website language creates liability and offered to tighten it. Obtain the Vouch policy. Independent counsel UPL review across CA/TX/FL/NY/IL.", owner: "DD Lead + Privacy Counsel", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 9 — Carrier Channel", action: "For each named carrier (Arch, CNA, Hartford, Hanover, Converge, Munich Re/NetDiligence): legal status (signed reseller / referral / paid pilot / sponsorship), $ volume of customers referred to date, economics paid (rev-share / finder's fee / co-marketing).", owner: "Pat Loftus + DD Lead", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 2 — Financial Model", action: "Reconcile $30K stated burn vs. $151K forecast burn on the record. Multi-year P&L + cash-flow projection with stated assumptions. Why a $325K/yr Engineering CTO line if Alkady is the named CTO.", owner: "Forecasting-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 2 — Unit Economics", action: "Gross logo retention + net dollar retention (cohort table, churn definition, sample size). CAC by channel + blended payback period. Required to evaluate $464K/yr ad ramp.", owner: "Pricing-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 2 — ARR Composition", action: "% pure recurring SaaS / % implementation services (LATAM) / % Compliance Shield defense revenue / % expert-witness audit. Gross margin and growth rate by line. Top-5 customer concentration. Polymarket commitment status (LOI / signed MSA / verbal).", owner: "Forecasting-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 15 — Historical Financials", action: "Bank statements or accountant-reviewed ARR validation. Current cash balance. Prior 2 years tax returns. AR aging. Confirm $1M founder injection structure (debt / equity / contributed capital) — characterized 05-07 as “funds since inception, no salary taken” but undocumented.", owner: "Forecasting-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 4 — Competition", action: "Why Captain wins where Cloudflare Zaraz at $0 is “good enough” for SMB tail. How Compliance Shield is materially different from Osano $500K No-Fines Pledge (regulatory fines only, per 05-07). Mid-market cohort win-rate vs. Enzuzo white-glove tier.", owner: "Competitive-Positioning-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 8 — Exit Assessment", action: "Probability-weighted exit modeling against SCOTUS Salazar (early 2027) and federal preemption tail risk. Founder's 05-07 view: Salazar litigates VPPA only, not the other 20+ laws. Realistic exit corridor under Bear case ($5.5M ARR 2030 → 1.2–2.9× return).", owner: "Risk-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 16 — Product Maturity", action: "SOC 2 Type II status (current or audit timeline). IAB TCF v2.2 CMP registration status. ISO 27001 timeline.", owner: "Technology-Analyst", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 5 — Customer Discovery", action: "Documented decision-maker map (CMO + GC + CIO?). Buyer-discovery notes from 5–10 closed-won customers. Third-party reference checks on 3 closed-won customers (Mass General Brigham, TaylorMade, Lemon Perfect).", owner: "Team-Analyst", priority: "MEDIUM", priorityBg: "F4F4F4" },
    { item: "Folder 11 — Milestones", action: "18-month milestone calendar tied to use of funds and ARR targets ($2M end of next quarter; $10M in 18–24 months).", owner: "DD Lead", priority: "MEDIUM", priorityBg: "F4F4F4" },
    { item: "Folder 3 — Updated Deck", action: "Most recent investor deck (post-Apr 2026 if updated). Written business plan. One-pager.", owner: "DD Lead", priority: "MEDIUM", priorityBg: "F4F4F4" },
    { item: "Folder 6 — DD Team Comms", action: "Maintain DD team channel. Product Demo session scheduled; schedule GTM and Financials meetings once gate-critical folders clear.", owner: "DD Lead", priority: "LOW", priorityBg: "" },
    { item: "Folder 17 — Recordings", action: "Add Product Demo recording when received. Maintain Live Pitch + internal debrief transcripts already on file.", owner: "DD Lead", priority: "LOW", priorityBg: "" },
  ],
};

const OUT = "/Users/jamie/ClaudeCodeProjects/nwa-intelligence/deals/active/Captain Compliance/Reports/Captain Compliance - DD Report 2026-06-01.docx";
generateDDReport(data, OUT);
