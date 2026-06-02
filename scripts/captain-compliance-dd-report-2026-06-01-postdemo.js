/**
 * Captain Compliance Corporation — NWAi DD Investment Report
 * (UPDATE — post Product/Demo + Founder-Integrity session, 2026-06-01)
 *
 * Supersedes "Captain Compliance - DD Report 2026-06-01 (pre Product-Demo session).docx".
 * Seeded from the 05-07 update; 06-01 product/demo + founder-integrity meeting
 * deltas applied to §2, §3, §4, §5, §7, §8, §10, §11, §12, §13, the green box,
 * the Recommendation conditions, and Appendix A. Scores HOLD (the live session
 * confirmed rather than changed the scored thesis). Verdict holds at WATCH.
 *
 * 06-01 session: in-office — Jamie Allison (NWAi) + Mirko (deal sponsor) with
 * founder Richart Ruddie; Rick Simonian (Miami Angels) participating. Founder-
 * Integrity gate work treated COMPLETE per deal-lead direction. Source:
 * Product-Meeting-Reconciliation-2026-06-01.docx.
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
  recBoxVerdict: "NWAi RECOMMENDATION:  ☒  WATCH — Conditional Advance; thin-wrapper verdict now confirmed, deal gated on GTM + cap-table + Compliance Shield",
  recBoxBody: "Verdict holds at WATCH after the 06-01 Product/Demo + Founder-Integrity session. Of the four gate-critical folders: (10) AI-claim audit is now RESOLVED ADVERSELY — the thin-wrapper verdict (AI Moat 1/10) is confirmed in a live session, not merely on paper: the internal “AI” scanner (Radar) failed / was blocked when run live on an unseen site, and the regulatory-update “engine” is a privacy officer plus outside attorneys, not a model. (12) Founder-integrity gate work is treated COMPLETE per deal-lead direction — the on-record account confirmed the 2016–17 conduct (manufacturing fake authors to obtain Google delisting orders) with a minimizing tone; the finding is folded into Team & Execution (§8), no longer held as an open gate. Still open and now controlling: (1) cap-table cleanup + no lead investor, and (9) Compliance Shield, which WORSENED — the CEO confirmed it is an un-reserved contingent liability (“who pays for that? … I don’t know”) treated as marketing, with UPL exposure unresolved. By the CEO’s own declaration the moat is white-glove accountability, not technology, and he conceded lock-in is deliberately not engineered. The deal is now gated on the GTM session (is the one-to-many channel contracted or aspirational; who delivers onboarding at scale) and Financials. Mirko (deal sponsor — prior investor, conflict disclosed); Pat Loftus co-leads pre-DD info scout.",

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
    lp("Defensibility comes from distribution and services, not software.  ", "The product moat is absent today; the channel moat (insurance carriers) is verbal-referral only with zero signed reseller agreements located in public sources."),
    lp("Update (06-01, live demo) — verdict confirmed, not overturned.  ", "The CEO declared the differentiation explicitly: “unlike competitors who merely supply software, the company assumes responsibility for the setup and functionality … we’re going to set it up and make sure it’s actually done correctly.” That is a white-glove services + accountability moat, not a software moat. He further conceded lock-in is deliberately under-engineered: “we tie in through their tag manager which … we probably should take a little bit longer to integrate because then it shows more of like a sticky factor … we don’t really have a retention issue luckily.” The killer live demo on an unseen URL was not run as designed; the manual inspection shown was Chrome DevTools deleting cookies by hand. Moat Tier 1 holds at 2/6."),
  ]},

  // ─── §3  AI / SOFTWARE MOAT ────────────────────────────────────────────────
  s3: { score: 1, dark: true, paras: [
    lead("Thin Wrapper — CONFIRMED in live session. AI Moat: 1/10 — bottom decile. All three thin-wrapper tests fail."),
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
    lp("Moat-deepening path (only if it exists):  ", "cross-customer aggregated risk-classification dataset → carriers pay to access → Memory Lock-in emerges. That asset is not present today."),
    lp("Update (06-01, live demo) — Folder 10 resolved adversely.  ", "Asked directly how new state law (e.g. Alabama) reaches the product — “Is it AI? Is it you? Is it an attorney?” — the CEO: “No, we have a privacy officer … we work with a couple other privacy attorneys.” The regulatory-update engine is humans + outside counsel. The internal “AI” scanner Radar could not complete a live scan on an unseen site (“it’s probably on our end, I got to tell engineering”). On AI strategy generally: “I haven’t figured out the right way to lean into the AI governance stuff yet … I’m not jumping the gun on it.” No labeled corpus, fine-tune, or eval harness surfaced. The thin-wrapper verdict is confirmed; the moat-deepening dataset remains hypothetical."),
  ]},

  // ─── §4  BUSINESS MODEL & CUSTOMERS ────────────────────────────────────────
  s4: { score: 2, dark: false, paras: [
    lead("Pricing is legible; revenue composition is not. Sticky-with-inertia, not sticky-by-indispensability."),
    lp("Pricing (founder-stated):  ", "SMB Pro $449/mo; Enterprise $1,250–$50,000/mo; Audits $500; Custom policies up to $5K; Implementation up to $50K one-time; Expert witness from $3K."),
    lp("Revenue stickiness:  ", "98% retention (founder-claimed, unaudited). Switching cost is real but compliance-exposure-driven — removal carries lawsuit risk, which keeps customers in place independent of product quality. Inertia Penalty applied at Triage; carries forward into DD."),
    lp("Customer concentration risk:  ", "Polymarket at $45K/mo would represent ~30% of post-close ARR if it lands. Top-5 customer concentration not disclosed — required scoring input (Folder Q: A-2). Mass General Brigham ($78K/yr signed), TaylorMade, and Lemon Perfect cited but not appearing in any public Captain case study, press release, or website logo strip — to be third-party-verified during full DD."),
    lp("ARR composition unknown:  ", "Of $1.2M ARR, the % split across pure recurring SaaS subscription / implementation services (LATAM team) / Compliance Shield defense revenue / expert-witness audit services is undisclosed. The investable thesis requires the SaaS line to dominate and grow faster than services. Until the breakdown is on file, business-model quality is unscored on its central axis."),
    lp("Update (06-01):  ", "Concentration sharpened: JD Power at a confirmed $50K/mo (≈$600K/yr) starting in ~2 months would be ~half of current self-reported ARR in a single, not-yet-paying logo. Pricing legibility confirmed (entry $449/mo; ~$250/site small; bespoke enterprise). Stickiness re-confirmed as inertia-driven by the CEO’s own “we don’t really have a retention issue luckily” — not indispensability. Score holds at 2."),
  ]},

  // ─── §5  CUSTOMER PIPELINE ─────────────────────────────────────────────────
  s5: { score: 2, dark: false, paras: [
    lead("Real bookings velocity, but pre-PMF channel architecture and unverified logos."),
    lp("Booking signals:  ", "$25K bookings in last 7 days = ~$1.3M annualized run-rate. $9.5K → $1.2M ARR in ~14 months. Venture Atlanta 2025 pitch-comp winner. G2 5.0 from 11 reviews. Term sheet incoming from Atlanta fund (Mosaic Ventures, Valor Ventures interested, per founder) — see §9 Update: this term sheet is now being declined."),
    lp("Verification gap:  ", "Zero of the named customers (Mass General Brigham, TaylorMade, Lemon Perfect, Polymarket) appear in any public Captain Compliance case study, press release, or website logo strip. “98% retention” is unaudited. Required at full DD: cohort table, churn definition, sample size, third-party reference checks on at least 3 closed-won customers."),
    lp("GTM structure:  ", "9-channel motion (insurance, litigators, regulators, agencies, web devs, webinars, CTV, SEO, conferences) reads as pre-PMF channel exploration, not focus. Real wedge is two: (1) direct legal-search inbound, (2) insurance-carrier referrals — the thesis-defining channel. Other seven are noise until proven. CAC by channel and blended payback period not disclosed (Folder Q: A-4) — required input for evaluating the planned $464K/yr ad ramp."),
    lp("Compliance Shield as customer-acquisition hook:  ", "Genuine differentiator at the buy decision. Whether it is a real underwritten insurance product or a marketing pledge with internal defense fund is the central question for Folder 9 — and changes both the moat scoring and the legal-exposure scoring on this deal."),
    lp("Update (05-07):  ", "Founder named the E&O carrier — Vouch — and cited 5 client cases dismissed in the last 50 days by supplying an audit template proving the software was configured correctly (a partial Folder 9 advance). But he concedes the customer-facing website language makes Captain liable (“if you receive a fine or demand letter related to what we’re protecting for you we will cover it for you”) and offers to “tighten up the language.” Per-incident/aggregate caps, attorney-in-the-loop architecture, and Vouch coverage terms remain open."),
    lp("Update (06-01) — velocity is real and accelerating; quality gaps persist.  ", "“Last month was our best month ever” (vs ~$25K a year ago). JD Power $50K/mo starting in ~2 months; Polymarket quoted ~$46K/mo; new Watchtower audit product landed a first client at $15K and a second at $5K/mo; ~15–21 new clients/month; ~200 clients / ~1,000 sites; post-onboarding attrition “1 to 2%”; “conquesting” (replacing failed Shopify/basic banners, often lawsuit-referred) now ~50% of business. Genuinely strong pull. But the same two quality gaps hold the score at 2: single-logo concentration (JD Power ≈ half of ARR, not yet paying) and still-unverified named logos. Net: pipeline velocity up, pipeline quality unchanged — score holds at 2."),
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
    lp("Update (06-01) — channel economics confirmed at zero; pivot still aspirational.  ", "The CNA partnership was “supposed to go live today” but unconfirmed; it is a co-marketing/underwriting-referral arrangement with no commission either direction (“do you pay them commission? No”), and a parallel carrier (Migree) “uses our tools but we can’t get them to pay us.” The one-to-many pivot (agencies, web devs, attorneys; Scorpion ~10,000 sites “may still happen”) remains relationship-stage with no signed reseller economics located. The CEO conceded the motion is still 1:1 today. This is the GTM session’s burden to resolve."),
    lp("⚠  Update (06-01) — manufactured-endorsement flag.  ", "The CEO described the Reddit growth channel as: “I hired a company and they make a bunch of Reddit questions and then a bunch of comments and a couple of the comments highlight us — Oh yeah, I use Captain Compliance.” Read against the 2016–17 record (§8), this is an undisclosed astroturfing pattern — the same fabricated-third-party-voice playbook, now inside the live GTM engine. Reputational/FTC-endorsement exposure for a “Trust & Privacy” brand. Flagged for the GTM session."),
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
    lp("Founder Profile Tags (06-01, confirmed):  ", "Serial founder / prior exit (yes, ~$7M reputation-management business) — NOT first-time • Solo founder (CRO/CTO/CTPO are hires, not co-founders) • Industry operator (not academic) • Full-time, no salary taken • Operating/sales depth, explicitly NOT technical depth (“I don’t play so much with this stuff … I don’t understand it”). A non-technical solo CEO whose entire pitch is technical AI is wholly dependent on the unverified CTO seat — the dominant delegation-risk fact for Execution scoring. Critically, the prior exit IS the source of the integrity record — this is not a clean serial-founder track record."),
    lp("Update (06-01) — integrity gate work complete (per deal-lead direction); finding recorded here.  ", "Under on-record cross-examination the CEO confirmed the 2016–17 conduct: “we hired … people usually in India … sign off and say that you’re the ones that post this comment … the only way to get it down is for us to get the court order.” He was evasive on the forged-judge-signature allegation (“the judge one I’m not sure about … where that came from”) and asserted the federal matter was declined without documentary proof; framing leaned to minimization (“ambulance chaser,” “road to hell is paved with good intentions … nobody’s immune”). Process-positive (told candidly; committed to a proactive legal narrative for future investors); substance- and tone-negative. Gate work is treated COMPLETE per deal-lead direction — folded into this Execution Risk read (8/10), no longer held open. ⚠ Reconcile: the CEO names his CTO as “Bo” in Detroit; this report’s roster names “Mohamed Alkady.” Confirm nickname vs. two people — a one-line cleanup, elevated by the non-technical-CEO dependency."),
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
    lp("❌ Update (06-01) — un-reserved contingent liability.  ", "Compliance Shield carries an uncapped, un-reserved tail liability the CEO has not provisioned against and treats as a customer-acquisition cost: asked who pays if the software fails and a client is fined/sued — “I don’t know. We haven’t run into it … it’s not going to all be perfect on the way up,” and “for now it’s marketing bringing in dollars … at a certain point it’s going to need some refinement.” As the book scales from ~1,000 toward a claimed 100,000 sites, this liability scales with it absent an actuarial reserve and a clearly-attaching E&O backstop (Vouch limits still off the record). Must be modeled explicitly in the Financials session. Financial Risk holds at 7/10."),
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
    lp("Update (06-01):  ", "Technical risk (8/10) reinforced — the live “AI” scanner failed in-room and the thin-wrapper verdict is confirmed, not just asserted. Execution risk (8/10) holds — founder-integrity gate work is complete on scope (conduct confirmed, minimizing tone), now a qualitative weight on the team rather than an open gate. Financial/legal risk reinforced — Compliance Shield confirmed as an un-reserved, uncapped contingent liability with unresolved UPL exposure, plus an undisclosed-astroturfing (Reddit) flag. Average holds 7.2/10 → section score 2."),
    lp("Top three risks to clear before any capital deployment:", ""),
    "  1.  ❌  Cap-table legal hygiene + no lead (Folder 1) — $0-cap SAFE chain extinguishment + founder SAFE-16 renegotiation + a credible lead. KILL CONDITION if unresolved. Now the #1 open gate.",
    "  2.  ❌  Compliance Shield — un-reserved/uncapped liability + UPL exposure (Folder 9). Quantify the reserve, attach E&O (Vouch limits on record), and confirm an attorney-in-the-loop architecture. WATCH→KILL if it cannot be bounded.",
    "  3.  ⚠   GTM channel reality (Folder 7) — is the one-to-many channel contracted with economics, and who delivers white-glove onboarding at scale? The moat thesis lives or dies here. (Thin-wrapper Folder 10 now resolved adversely; founder-integrity Folder 12 closed on scope.)",
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
    lp("Channel-not-acquirer discipline (06-01):  ", "CNA is a co-marketing / underwriting-distribution CHANNEL partner, NOT an acquirer and NOT a paying customer — “we have a vendor agreement … they’re going to start underwriting using our tools … tell their clients, if you get Captain Compliance you get a discount,” with no commission either direction. No transcript signal of M&A intent from any carrier. Carrier interest stays in the LOWER-probability acquirer row above on a vertical-integration thesis only; it must not be read as an exit signal."),
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
    lp("Why this still warrants Conditional Advance — not Pass.  ", "The market timing is genuinely top-quartile and the booking velocity is real and accelerating. The carrier-channel thesis, if it formalizes, is the kind of structural distribution asset that competitors cannot replicate from a feature-parity position. The bet is small ($2.5M round; NWAi check TBD), the gate conditions are surgical, and the exit corridor — if Base case obtains — supports a 4.5–11× return at premium multiple. 06-01 movement: the thin-wrapper verdict is now confirmed (no AI moat to underwrite), the founder-integrity gate is closed on scope (conduct confirmed, minimizing tone — a priced-in qualitative risk, not a blocker), and Compliance Shield is confirmed as an un-reserved liability. The decisive question has moved decisively to distribution: the GTM session must show the one-to-many channel is contracted with economics and that someone other than Captain can deliver the white-glove onboarding that IS the moat. The risk-adjusted call remains to gate, not to pass — now gated on GTM, then Financials, with cap-table cleanup (Folder 1) the controlling structural condition."),
  ]},

  // ─── Recommendation ─────────────────────────────────────────────────────────
  recVerdict:   "☐  INVEST — [NWAi check size: TO BE CONFIRMED, gated on conditions below]",
  recWatch:     "☒  WATCH — Re-evaluate after the GTM + Financials sessions and Folder 1 (cap-table/lead) + Folder 9 (Compliance Shield) clear (Folder 10 resolved adversely 06-01; Folder 12 closed on scope)",
  recPass:      "☐  PASS — Move to PASS if cap-table cannot be cleaned with a credible lead, if Compliance Shield liability cannot be bounded, or if the GTM channel proves to have no economics",
  recRationale: "Captain Compliance has real, accelerating revenue and top-quartile market timing inside a genuine US privacy-litigation discontinuity, against four gate-critical findings from the DD pass. After the 06-01 Product/Demo + Founder-Integrity session two of the four are worked: Folder 10 (AI claim) is RESOLVED ADVERSELY — the thin-wrapper verdict (AI Moat 1/10) is confirmed in a live session (the “AI” scanner failed in-room; the regulatory engine is a privacy officer + outside counsel), so there is no AI moat to underwrite, but this is a known-and-priced negative, not a standalone kill; Folder 12 (founder integrity) gate work is COMPLETE per deal-lead direction — the on-record account confirmed the conduct with a minimizing tone and is folded into Team & Execution (§8) as a priced qualitative risk. The two controlling open gates are now Folder 1 (cap-table legal hygiene + no lead investor) and Folder 9 (Compliance Shield, which worsened to a confirmed un-reserved/uncapped contingent liability with unresolved UPL exposure). Moat Tier 1 (2/6) is below the 4/6 clean-Advance threshold; Risk average (7.2/10) is above the <7 threshold. The deal’s decisive question has moved to distribution: the GTM session must show the one-to-many channel is contracted with real economics and that white-glove onboarding (the actual moat) can be delivered at scale. Hold the rest of the 17-folder scope; re-evaluate after GTM + Financials and the two open gates.",
  recConditions: [
    "Folder 1 (CONTROLLING) — Cap-table cleanup + credible lead: attorney letter on the SAFE-17/18/19 ($0-cap) cancellation chain extinguishing any live claim; renegotiation of founder SAFE-16 ($800K) to priced-round terms (no insider discount); explanation of the CRO Seliger RSA → cancellation → option re-grant chain; documentation of the $1M founder injection structure. The sole outside term sheet ($2M @ $10M pre) is being declined — the round has no lead, and the declined $10M pre sits materially below the $15M post being raised (valuation-justification gap). KILL CONDITION if the $0-cap claim cannot be extinguished with attorney sign-off, if the founder refuses to renegotiate SAFE-16, or if no credible lead emerges.",
    "Folder 9 (CONTROLLING) — Compliance Shield must be bounded: per the 06-01 session the CEO confirmed it is an un-reserved, uncapped contingent liability treated as marketing (“who pays … I don’t know”). Required: quantified reserve/accrual; the Vouch E&O policy with limits, deductible, exclusions, per-incident/aggregate caps and 2026 renewal pricing; and a licensed-attorney-in-the-loop architecture (the UPL test) with independent privacy-litigation counsel review across CA, TX, FL, NY, IL. WATCH→KILL if the liability cannot be bounded.",
    "Folder 7 (NEW — next session) — GTM diligence: prove the one-to-many channel is contracted with economics (signed reseller/referral with commission and attributable closed revenue — CNA/agencies/attorneys), show who delivers white-glove onboarding at scale without breaking the accountability moat, map top-5 customer concentration (JD Power ≈ half of ARR) and termination rights, and disclose the sales funnel + CAC payback. Also: scrutinize the undisclosed Reddit-endorsement program for FTC/platform-policy exposure. See GTM prep question set in the 06-01 reconciliation.",
    "Folder 12 (CLOSED ON SCOPE) — Founder-integrity gate work treated complete per deal-lead direction; the recorded finding (conduct confirmed under on-record cross-examination; minimizing tone) is folded into §8 Execution Risk, not held as a blocker. Remaining mechanical sub-item: reconcile the CTO identity — the CEO names “Bo” (Detroit) while the roster names “Mohamed Alkady”; confirm nickname vs. two people, plus work history / work-auth / full-time status against the $325K/yr “Engineering CTO” forecast line.",
    "Folder 10 (RESOLVED ADVERSELY) — AI-claim audit complete via the 06-01 live session: thin-wrapper confirmed (scanner failed in-room; regulatory engine is a privacy officer + outside counsel; no labeled corpus/fine-tune/eval harness). No further demo required to score; AI Moat 1/10 stands. Remaining housekeeping: IP assignment from LATAM contractors and AI-coding-tool (Cursor/Cloud Code) generated code.",
    "Folder 2 — Reconcile $30K stated burn vs. $151K forecast burn on the record. Provide multi-year P&L and cash-flow projection with stated assumptions, the Compliance Shield liability reserve, and unit economics (gross logo retention, NDR, CAC by channel, payback period) — required to evaluate the $464K/yr ad ramp.",
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
    { item: "Folder 12 — Founder Integrity", action: "CLOSED ON SCOPE (06-01, per deal-lead direction). On-record cross-examination completed; CEO confirmed the 2016–17 conduct (paid offshore parties to fake authorship to obtain Google delisting orders) with a minimizing tone; account consistent with public reporting. Recorded finding folded into §8 Execution Risk as a priced qualitative risk — no longer held as an open blocker.", owner: "Mirko + Pat Loftus", priority: "✅ CLEARED", priorityBg: "DDEBDD" },
    { item: "Folder 12 — CTO Identity", action: "Verify CTO identity: the CEO names “Bo” (Detroit) while the roster names “Mohamed Alkady” — confirm nickname vs. two people. Then work history, education, citizenship/work-auth, direct LinkedIn confirmation, GitHub or technical-work-product evidence, full-time confirmation. Reconcile vs. $325K/yr “Engineering CTO” forecast line. Elevated by the non-technical-CEO dependency.", owner: "Pat Loftus + DD Lead", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 1 — Cap Table", action: "Attorney letter on SAFE-17/18/19 ($0-cap) cancellation extinguishing all live claims. Renegotiate founder SAFE-16 ($800K) to priced-round terms (no insider discount). Explain CRO RSA → cancellation → option chain. Document $1M founder injection.", owner: "DD Lead + Counsel", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 1 — Term Sheet & Lead", action: "NEW (05-07): Captain is declining its sole outside term sheet ($2M @ $10M pre, Atlanta fund). Verify the decline rationale, identify the fund, and reconcile the declined $10M pre-money against the $15M post-money being raised. Confirm no lead investor and assess implications for round closeability.", owner: "DD Lead + Pat Loftus", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 10 — IP / AI Claim", action: "RESOLVED ADVERSELY (06-01 live session). Thin-wrapper confirmed: internal “AI” scanner (Radar) failed/blocked when run live on an unseen site; regulatory-update engine is a privacy officer + outside attorneys; no labeled corpus/fine-tune/eval harness. AI Moat 1/10 stands — no further demo needed to score. Remaining housekeeping only: IP assignment from LATAM contractors + AI-coding-tool (Cursor/Cloud Code) generated code.", owner: "Technology-Analyst + SME", priority: "✅ RESOLVED", priorityBg: "DDEBDD" },
    { item: "Folder 7 — GTM Session (NEXT)", action: "NEXT DILIGENCE MEETING. Prove the one-to-many channel is contracted with economics (signed reseller/referral + commission + attributable closed revenue — CNA, agencies, attorneys; CNA “go-live” unconfirmed, Migree non-paying). Who delivers white-glove onboarding at scale without breaking the accountability moat. Top-5 concentration (JD Power ≈ half of ARR) + termination rights. Sales funnel + CAC payback. See GTM prep question set in Product-Meeting-Reconciliation-2026-06-01.docx.", owner: "DD Lead + Pat Loftus", priority: "❌ GATE", priorityBg: "FFD7D7" },
    { item: "Folder 7 — Reddit Endorsement Program", action: "FLAG (06-01). CEO described hiring a vendor to post Reddit “questions and comments” that highlight Captain (“Oh yeah, I use Captain Compliance”). Undisclosed astroturfing pattern — same fabricated-voice playbook as the 2016–17 record, now in the live GTM engine. Review vendor, disclosure, and FTC-endorsement / Reddit-policy compliance. Reputational exposure for a “Trust & Privacy” brand.", owner: "DD Lead + Counsel", priority: "⚠ HIGH", priorityBg: "FFF3CD" },
    { item: "Folder 9 — Compliance Shield", action: "WORSENED to CONTROLLING GATE (06-01). CEO confirmed it is an un-reserved, uncapped contingent liability treated as marketing (“who pays … I don’t know”), scaling with the site count. Required: quantified reserve/accrual; the Vouch E&O policy (limits, deductible, exclusions, per-incident/aggregate caps, 2026 renewal); prior payouts; and a licensed-attorney-in-the-loop (UPL) architecture. Independent counsel UPL review across CA/TX/FL/NY/IL.", owner: "DD Lead + Privacy Counsel", priority: "❌ GATE", priorityBg: "FFD7D7" },
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
    { item: "Folder 6 — DD Team Comms", action: "Maintain DD team channel. Product/Demo session COMPLETE (06-01); GTM session is the next meeting; schedule Financials after. Mirko + Jamie in-office for 06-01; Rick Simonian participating.", owner: "DD Lead", priority: "LOW", priorityBg: "" },
    { item: "Folder 17 — Recordings", action: "Product/Demo + Founder-Integrity transcript on file (06-01, Gemini). Reconciliation: Product-Meeting-Reconciliation-2026-06-01.docx. Maintain Live Pitch + internal debrief transcripts already on file.", owner: "DD Lead", priority: "LOW", priorityBg: "" },
  ],
};

const OUT = "/Users/jamie/ClaudeCodeProjects/nwa-intelligence/deals/active/Captain Compliance/Reports/Captain Compliance - DD Report 2026-06-01.docx";
generateDDReport(data, OUT);
