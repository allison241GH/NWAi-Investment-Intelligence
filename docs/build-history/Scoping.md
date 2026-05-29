# NWA Intelligence Platform — Scoping Document

**Author:** Jamie Allison
**Last updated:** April 24, 2026
**Status:** Draft for internal review + board preview

---

## 1. Vision

**NWA's shift: from managing dealflow to orchestrating investment intelligence.**

The NWA Intelligence Platform operationalizes NWA's real edge — not volume, but expertise. The moat is explicit and hard to copy: **a compounding network of member expertise and judgment.**

Three intelligence tracks comprise the platform.

**Track 1 — Dealflow Intelligence.** Where deals come from and how they move through screening, scout, and diligence. Sources span Dealum (passive, sunsetting by year-end), member referrals, cross-syndication, and direct founder outreach. AI-powered screening, scouting, and diligence agents do the heavy lifting.

**Track 2 — Member Intelligence.** The moat. Member expertise, past investments, conviction signals, participation patterns, and reputation. Functions include pre-diligence filtering, deal-to-member matching, signal amplification, and DD team assembly. This is the track we're extending now.

**Track 3 — Ecosystem Intelligence.** Where future deals will come from. Proactive sourcing via agents scanning incubators, accelerators, universities, operator networks, and market signals. Creates pipeline before Dealum ever would have. Future track.

An **AI Amplification Layer** runs across all three tracks:
- **Decision Support** — structure information, reduce noise, surface what matters.
- **Judgment Amplification** — enhance human expertise, not replace it.
- **Pattern Surfacing** — find connections and insights humans would miss.

**North Star:** Make NWA the most trusted network for high-conviction investing, and a high-value source of capital to founders.

---

## 2. The State Today

The platform is not starting from zero — it's partially built and partially missing.

**Track 1 (Dealflow Intelligence) is live and mature for TechGroup.** The `nwai-tech-pipeline` plugin runs a 7-stage pipeline (Inbox → Screen → Scout → Diligence → DD Report → Decision → Memo) with 8 slash commands, 7 AI research agents (pipeline-monitor, team-analyst, market-analyst, competitive-positioning-analyst, technology-analyst, financial-analyst, risk-analyst), Dealum CRM integration via MCP, GitHub auto-sync, and 9 proprietary framework reference documents encoding NWAi investing criteria. Structured outputs include Triage Reports, Scout Assessments, DD Kickoff Packages, Post-Meeting Reconciliations, DD Investment Reports, and Exec Memos. Two analytical lenses (Structural Discontinuity, Memory Lock-in) are always active. Five non-negotiable investment criteria enforce consistency.

**The platform architecture is designed to scale across all six NWAi groups.** Shared rails (Dealum integration, AI agents, pipeline stages, output formats, slash commands) plus group-specific playbooks (Dealum tag, screening gates, scoring rubrics, investment themes, SME pool, investment thesis). TechGroup is the first live instantiation. MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, and FintechGroup are planned.

**Track 2 (Member Intelligence) is the next frontier and is underbuilt.** Today, member expertise is tapped informally — a deal lead emails members they personally know. No systematic matching. No structured capture of member input. No aggregation across deals. Member data in Dealum is limited: name, LinkedIn URL, and a few industry fields captured at onboarding. No directory, no network agent, no portfolio view, no network graph.

**Track 3 (Ecosystem Intelligence) does not exist.** No proactive sourcing, no thematic reports, no agent-scanning of incubators or universities. Pipeline creation happens only when deals arrive.

**Dealum is sunsetting by year-end (firm).** This is a hard constraint. Both Track 1 (intake) and Track 2 (member data) currently depend on Dealum. The platform must migrate to NWA-owned intake and member data infrastructure before YE.

---

## 3. The Opportunity

The three tracks are each incomplete alone and compounding together.

Dealflow Intelligence without Member Intelligence = faster screening but no expertise leverage.
Member Intelligence without Dealflow Intelligence = better engagement of the wrong deals.
Neither plus Ecosystem Intelligence = reactive pipeline, perpetually dependent on whoever finds deals first.

Connected, they produce a compounding advantage. Every deal becomes an opportunity to engage the right members. Every member engagement accumulates into a richer expertise graph. Every expertise graph improvement makes future matching sharper. The edge compounds — and no competitor can replicate NWA's specific members or the context that accrues from their engagement.

**That's the moat: a compounding network of expertise and judgment that no one can copy.** This is what the board needs to see.

---

## 4. Phased Approach

Four phases. Each has distinct purpose, duration, and success criteria. Scope creep between phases is the biggest risk — treating each as a separate project with a hard scope line keeps them shippable.

| Phase | Purpose | Duration | Deliverable |
|---|---|---|---|
| **1. Board Demo** | Convey the 3-track vision and secure alignment | 1–2 weeks | Clickable prototype of all three tracks |
| **2. MVP — Member Intelligence Layer** | Prove Track 2 works by extending the live TechGroup plugin | 4–8 weeks | New slash commands, member matching, outreach, synthesis — integrated into the existing pipeline |
| **3. Platform Build-Out** | Full Member Intelligence feature set + Beyond-Dealum intake + multi-group rollout | 3–6 months | Web platform, directory, network agent, network graph, NWA-native intake |
| **4. Ecosystem Intelligence** | Proactive sourcing agents and thematic intelligence | Future | Agent-sourced pipeline, thematic reports |

---

## 5. Phase 1 — Board Demo

### Purpose

Show the NWA board the full three-track vision in an interactive, tangible form. Secure alignment and resources before committing to MVP engineering.

### Audience

NWA board members. Experienced investors who have seen many pitches. They will respect honesty about development stage.

### Success criteria

- Board understands and can articulate the three-track framing.
- Board provides directional feedback.
- Board approves proceeding to MVP — specifically the Member Intelligence layer extension of the live TechGroup plugin.
- Demo does not overpromise — explicitly framed as a design prototype.

### Scope

Single-page web application, approximately 7–9 screens, seeded realistic-but-fictional data. No real backend. No real APIs. Desktop-first.

### Screens

**Track 1 screens (reflect the real live pipeline):**

1. **Pipeline Dashboard** — 7 stages with deals across them. Each deal card shows its stage, recent activity, and (new from Track 2) a member engagement indicator. Mirrors what Jamie sees today, with the member intelligence overlay.
2. **Deal Detail** — the vision moment. Left: actual Scout Assessment and DD Kickoff artifacts from the existing pipeline (represented realistically). Right: Track 2 member intelligence layer — matched members, match rationale, contributions, synthesized input, recommendation aggregate.

**Track 2 screens (Member Intelligence vision):**

3. **Member Directory** — faceted search. Filter by expertise, sector, geography, check size, past investments.
4. **Member Profile** — single member view. Expertise tags, prior employers, past investments, portfolio companies, deals matched to them, recent contributions.
5. **Matching Rationale** — for one deal, ranked member matches with the specific expertise signals that drove each ranking. Demystifies the AI.
6. **Portfolio View** — unified view of NWA portfolio companies across member investments. Drill into a company to see which members are invested, who's on the board, who the contacts are.

**Track 3 placeholder:**

7. **Ecosystem Intelligence (Coming)** — single screen showing the future-state: incubator feeds, university research scans, operator network signals, thematic reports. Placeholder, but visible. Tells the board the full story.

**Admin overlay:**

8. **Orchestrator View** — how Jamie operates the system. Trigger matching, review outreach, monitor responses, manage synthesis.

### Seed data

- **3 deals** across sectors: one tech (AI infra), one life sciences (medical device), one consumer (DTC). Covers the multi-group scaling story without requiring multi-group build.
- **20–30 fictional members** with realistic expertise profiles that map credibly across the three deals.
- **Visible watermark** on every screen: *"Demo data — not real deals or members."*

### Tech stack

- Next.js or Vite + React
- Tailwind CSS
- shadcn/ui components
- JSON seed data, no backend
- Deployed to Vercel (free, private)

### Strategic framing for the board

Open with: *"We're not starting from zero. Track 1 — our deal intelligence pipeline — is already live and mature in TechGroup. What we're building next is Track 2 — member intelligence — which is the real moat. This demo shows all three tracks as the end state. The MVP we're scoping next is specifically the Track 2 layer that plugs into the existing pipeline."*

### Out of scope for the demo

- Real Dealum integration
- Real member accounts or authentication
- Real email sending
- Any runtime LLM calls (synthesis and matching are pre-computed in seed data)
- Mobile-optimized layout

---

## 6. Phase 2 — MVP: Member Intelligence Layer

### Purpose

Prove that Track 2 works by extending the live TechGroup plugin. Ship a narrow-but-real Member Intelligence layer that plugs into the existing pipeline at specific stages, routes deals to the right members, captures their input, and enriches the DD Report synthesis with member intelligence.

### Approach: extend the existing plugin (not a separate project)

The MVP adds new slash commands, reference docs, and workflows to the existing `nwai-tech-pipeline` plugin. Rationale:

- Member data (today) lives in Dealum. The plugin already integrates with Dealum via MCP. Same integration path.
- Matching needs Scout Assessment and DD Kickoff Package as inputs — those are already generated by the plugin and saved in `deals/`. No import work.
- New commands fit naturally into the existing pipeline flow: `/match-members [company]` runs after `/scout`; `/engage-members [company]` runs during `/diligence`; member inputs feed into `/dd-report` synthesis.
- Reference-doc pattern is already established (`gates-and-flags-techgroup.md`, `scout-questions.md`, etc.). Extends naturally to `member-matching-rubric.md`, `member-outreach-templates.md`, `member-synthesis-framework.md`.
- Output artifact pattern extends to `[Company] - Member Matches.docx`, `[Company] - Member Intelligence.docx`.
- Six-group extensibility is preserved — the Member Intelligence additions follow the shared-rails/group-playbook model.

**Development discipline:** the live plugin serves real deals today. Member Intelligence development happens on a **feature branch** (`feature/member-intelligence`). Production stays on `main`. Merge to main only after staged testing against recent deals.

### Scope

- **One active tech deal at a time**, selected by Jamie.
- **Tech group only**, approximately 4–5 members.
- **Email-based engagement** — no member-facing UI yet.
- **Structured member intelligence output** — appended to the deal folder alongside existing artifacts, and incorporated as a new dimension in the DD Report.
- **Human-in-the-loop orchestration** — Jamie runs the commands, reviews outputs, sends outreach, collects responses.

### Success criteria

- For a real tech deal, the MVP produces member input that **measurably changes or deepens the DD Report** (new scored evidence, or demonstrable shifts in existing section scores).
- Response rate: ≥50% of matched members contribute.
- Total time from `/scout` to enriched `/dd-report`: ≤2 weeks.
- Jamie trusts the output enough to include it in the IC briefing.

### New slash commands

- **`/match-members [company]`** — runs after `/scout`. Reads Scout Assessment. Ranks tech group members by fit. Generates `[Company] - Member Matches.docx` with ranked members, match rationale per member, and suggested DD questions tied to specific 17-folder sections.
- **`/engage-members [company]`** — runs during `/diligence`. Generates personalized outreach emails per matched member. Jamie reviews, edits, and sends.
- **`/capture-member-input [company]`** — Jamie pastes received replies. Tool extracts themes, concerns, recommendations, folder-specific evidence. Saves to `[Company] - Member Intelligence.docx`.
- **`/dd-report [company]` (extended)** — incorporates member intelligence as a new scored dimension within the 11-section report structure.

### New reference docs (NWAi IP extensions)

- `member-matching-rubric.md` — how to rank members for a given deal. Expertise signals, weights, tie-breakers. Honors the two analytical lenses.
- `member-outreach-templates.md` — templates for personalized outreach, with questions tied to 17-folder DD sections.
- `member-synthesis-framework.md` — how to aggregate diverse member inputs into structured diligence intelligence. Follows the same "blunt verdict first, then reasoning" voice as existing frameworks.

### Data model additions

```
Member (extended from Dealum base)
  - id (Dealum ID while Dealum lives)
  - name, email, linkedin_url
  - industries (from Dealum)
  - expertise_profile (LLM-generated from self-submission)
  - past_investments (self-submitted)
  - sectors_of_interest, stage_preference, check_size_range (self-submitted)
  - participation_history (accumulates over time)

Match
  - deal_id, member_id
  - rank, rationale
  - suggested_dd_questions: [{folder_id, question}]
  - generated_at

Outreach
  - match_id
  - email_draft, email_sent_at
  - status (draft | sent | responded | no_response)

MemberInput
  - outreach_id
  - raw_text
  - extracted: {themes, concerns, recommendations, open_questions,
                folder_evidence: [{folder_id, finding}]}
  - captured_at

MemberIntelligenceSection (new section in DD Report)
  - deal_id
  - synthesized_from: [member_input_ids]
  - content: {consensus, dissent, new_risks, new_opportunities, scored_signal (1-5)}
```

Storage: local files in plugin `data/` for MVP. Designed to migrate to NWA-owned storage in Phase 3 when Dealum sunsets.

### Member profile bootstrap

Dealum has thin member data (name, LinkedIn, limited industry fields). For the 4–5 MVP tech group members:

1. Send each member a short intake form requesting: LinkedIn URL (confirm), 3–5 sentence expertise self-description, sectors of interest, stage preference, check size range, 3–5 representative past investments.
2. Claude generates a structured `expertise_profile` from the submission.
3. Stored locally in plugin `data/members/`. Mirrored to Dealum where possible while Dealum still runs.

This is the seed for the full member profile system built in Phase 3.

### Out of scope for MVP

- Member-facing interface (directory, portal, profile pages) — Phase 3
- Network Agent (natural-language query layer) — Phase 3
- Portfolio view — Phase 3
- Network graph and two-hop intro paths — Phase 3
- Founder ask routing — Phase 3
- Multi-deal parallel processing — Phase 3
- Multi-group rollout beyond TechGroup — Phase 3
- Automated email reply ingestion (manual paste is fine for 5 members) — Phase 3
- Slack integration — Phase 3+
- Voting / committee aggregation — Phase 3
- Beyond-Dealum intake architecture — Phase 3 (separate workstream)

---

## 7. Phase 3 — Platform Build-Out (Sketch)

Kept light. Specifics driven by MVP learnings. Three major workstreams in parallel.

**Full Member Intelligence feature set.** Structured profiles with member-controlled privacy. Faceted directory search. Network Agent (natural-language queries — *"Who has operating experience in payments?"*, *"Who knows someone at [company]?"*). Portfolio view. Network graph (member↔company, member↔member) powering two-hop intro paths. Founder ask routing. Conviction signals and participation patterns accumulated over time. Member reputation signals. Member-facing web dashboard with deals matched to them and their past contributions.

**Beyond-Dealum intake.** Forced by Dealum sunset. NWA-native intake: forms for direct founder outreach, ingestion for member referrals, cross-syndication capture, pitch deck parsing. Pipeline/CRM replacing Dealum. Member data migration off Dealum to NWA-owned storage. This workstream is not optional — it must complete before YE.

**Multi-group rollout.** Extend the platform to MedicalGroup, SpaceGroup, ConsumerGroup, IndustrialGroup, FintechGroup. Shared rails already support this. Each group needs its own playbook (gates, rubrics, themes, SME pool, thesis). Member Intelligence layer extends per group with group-specific matching rubrics.

---

## 8. Phase 4 — Ecosystem Intelligence (Future)

Proactive sourcing via agents that scan incubators, accelerators, universities, operator networks, and market signals. Pattern detection across the ecosystem. Thematic reports. Pipeline creation before Dealum's role would have been.

Speculative. Priorities driven by Phase 3 learnings and what the Member Intelligence data surfaces as worth sourcing proactively.

---

## 9. Dependencies & Risks

### Hard constraints

**Dealum sunset by YE 2026 (firm).** Both Track 1 intake and Track 2 member data currently depend on Dealum. MVP must minimize new Dealum dependencies. Phase 3 Beyond-Dealum workstream must complete before YE.

**Six-group extensibility.** All MVP design choices must preserve the shared-rails/group-playbook model. A Member Intelligence layer that only works for TechGroup is a dead end.

**Plugin stability.** The `nwai-tech-pipeline` plugin runs production deals. MVP development must not disrupt it.

### Risks

**Dealum data extraction risk.** Member data in Dealum must be exported before sunset. First-week action: audit what member data exists in Dealum today and validate export path.

**Thin member data.** Even with Dealum export, existing member data is limited to name, LinkedIn, and a few industry tags. Building a real expertise graph requires member self-submission for the 4–5 MVP members — and a scalable process for the broader membership in Phase 3. Mitigation: start self-submission in parallel with MVP build.

**Member response rate.** Tech group is closest to Jamie. If response rate is low here, broader rollout is at risk. Mitigation: targeted outreach, questions tied to specific DD folders, measured tracking.

**LLM synthesis quality for member inputs.** Aggregating diverse member perspectives into a structured diligence section is non-trivial. Mitigation: Jamie reviews every synthesis in MVP; iterate on `member-synthesis-framework.md`.

**Plugin regression risk.** Feature-branch discipline protects production, but merges need care. Mitigation: staged rollout, regression testing against recent deals before merging to main.

**NDA / privacy.** Emailing members about deals discloses deal existence to them. Confirm membership agreements cover this, or add explicit NDA language to outreach.

**Scope creep from demo to MVP.** Board excitement may push for platform features in MVP. Mitigation: the phasing in this doc; re-read Section 6 before adding anything.

---

## 10. Open Questions

1. **Dealum sunset cutover plan.** What's the exact date, who owns migration, what's the data export procedure?
2. **Dealum member data audit.** What fields are populated for which members? Export feasibility and format?
3. **Post-Dealum intake strategy.** Who's scoping this? Needs to be assigned.
4. **Which 4–5 tech group members are the MVP cohort?** Agreement in hand?
5. **Which real tech deal is the MVP's first subject?** Ideally in Scout or early Diligence.
6. **How does the Member Intelligence dimension integrate with the DD Report's 11 sections?** Replace one, supplement, or stand alone as a 12th?
7. **Committee appetite for a new scored dimension.** Will they weight it, read it, or ignore it?
8. **Member privacy controls in MVP.** Required at MVP for tech group (5 people who know each other) or deferred to Phase 3?

---

## 11. Success Metrics

### Phase 1 (Demo)
- Board approval to proceed to MVP (Member Intelligence layer).
- Directional feedback captured and documented.
- No significant vision redirects — if there are, incorporate before MVP.

### Phase 2 (MVP)
- Member response rate: ≥50%.
- Time from `/scout` to enriched `/dd-report`: ≤2 weeks.
- **DD Report impact:** the Member Intelligence section measurably changes at least one of the existing 11 section scores, or introduces new evidence not present in the non-member-assisted pipeline.
- Jamie's qualitative assessment: member input adds value beyond the existing AI agent pipeline.
- IC's qualitative assessment: decision reasoning is enriched by member intelligence.

### Phase 3 (Platform)
- Metrics defined after MVP. Likely: active members/month contributing, deals with ≥3 member contributions, time-to-committee-decision, member satisfaction, successful migration off Dealum.

---

## 12. Immediate Next Actions

1. **Confirm Dealum sunset timeline and audit member data in Dealum.** Before any build work, know what you have and what must be migrated.
2. **Identify the 4–5 MVP tech group members** and send the "we're building this, will you participate?" outreach with the expertise self-submission form.
3. **Set up Claude Code development environment** against the existing workspace (see `Setup.md`).
4. **Build the board demo** (Phase 1) — 1–2 weeks, in a `demo/` subfolder of the workspace repo.
5. **Schedule the board preview** — approximately 2 weeks out.
6. **Detail-scope the Member Intelligence MVP plugin extensions** after the demo generates board alignment — feature branch, commands, reference docs, data model.
