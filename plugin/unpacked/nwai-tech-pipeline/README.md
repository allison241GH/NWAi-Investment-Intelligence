# NWAi TechGroup Deal Pipeline Plugin

Agentic deal flow management for New World Angels (www.newworldangels.com) TechGroup.
Connects to Dealum via API and guides deals from inbox through investment memo using
NWAi's own screening criteria, scout framework, and due diligence checklist.

## Overview

This plugin automates the NWAi TechGroup investment pipeline across 5 stages:

```
📥 Inbox → 🔍 Screening → 🤝 Scout/IntroCall → 🔬 Diligence → ✅ Decision → 📝 Memo
```

It applies NWAi's proprietary frameworks at each stage:
- **AutoKill Gates** (6 pass/fail criteria) + Red/Yellow flags at Screening
- **NWA Scout Q Assessment** (Phase 1 viability + Phase 2 depth) at Scout
- **TechGroup Theme Mapping** (5 themes, member SME matching) at Scout
- **17-Folder DD Checklist** at Diligence
- **AI Moats Framework** in Memo analysis

## Setup — Required Environment Variables

Before using this plugin, set these two environment variables:

```bash
export DEALUM_TOKEN="your-dealum-api-token"
export DEALUM_ROOM_ID="your-dealum-deal-room-id"
```

**Where to find these:**
- `DEALUM_TOKEN`: Provided by Dealum when setting up API integration (keep this secret)
- `DEALUM_ROOM_ID`: Your NWAi deal room ID, provided by Dealum

Add these to your shell profile (`~/.zshrc` or `~/.bashrc`) for persistence, then restart your session.

## Components

### Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/sync-pipeline` | Pull all Tech-tagged deals from Dealum and show pipeline dashboard | `/sync-pipeline` |
| `/screen [company]` | Run 6 AutoKill gates + red/yellow flags on a deal | `/screen Acme AI` |
| `/scout [company]` | Run Scout Q assessment + map to TechGroup theme + suggest SMEs | `/scout Acme AI` |
| `/diligence [company]` | Generate 17-folder DD checklist with team assignments | `/diligence Acme AI` |
| `/decision [company] [invest\|pass\|watch]` | Record decision and update Dealum | `/decision Acme AI invest` |
| `/memo [company]` | Generate full NWAi investment memo | `/memo Acme AI` |

### Agent

- **pipeline-monitor** — Triggered when you ask "what's in the pipeline?", "any new deals?", or "what needs attention?" Pulls live data from Dealum and presents an actionable dashboard.

### Skill

- **nwai-investment-framework** — Loads NWAi's full investment knowledge: AutoKill gates, red/yellow flags, TechGroup themes and member SME mapping, Scout Q questions, 17-folder DD checklist, and AI Moats framework. Triggered automatically during all pipeline commands.

### MCP Server

- **nwai-dealum** — Python stdio server wrapping the Dealum Integration API. Exposes: `list_applications`, `get_application`, `update_application`, `list_members`, `create_application`.

## Typical Workflow

**1. Check the pipeline:**
Ask "what's in the TechGroup pipeline?" — the pipeline-monitor agent pulls live data.

**2. Process a new deal:**
```
/screen Acme AI       ← Run AutoKill gates
/scout Acme AI        ← Scout assessment + theme assignment
/diligence Acme AI    ← Launch DD with team assignments
/decision Acme AI invest   ← Record investment decision
/memo Acme AI         ← Generate investment memo
```

**3. Working from a pitch deck or email:**
Run `/screen` without arguments — Claude will ask you to paste the pitch info.

## Adding Diligence Agents

This plugin is designed to work alongside dedicated diligence agents (for financials, legal, market analysis, team background, etc.). If you have existing Claude Skills or agents for diligence, they can be added to this plugin's `agents/` directory and will be loaded automatically.

Contact the plugin maintainer to integrate your existing diligence workflow.

## TechGroup Reference

5 investing themes, each with a lead and supporting SMEs:

| # | Theme | Lead | SMEs |
|---|-------|------|------|
| 1 | Infrastructure & Foundational Stack | Alex | Ron, Kevin |
| 2 | SW Enabled HW, Physical AI & Robotics | Mirko | Jamie, Kevin |
| 3 | WorkTech & Vertical Enterprise OS | Chuck | Carlos, Jamie |
| 4 | Data Sovereignty, Security, Trust | David | Ron |
| 5 | FinTech (incl RE) | Alex | Ron, Kingsley |

## NWAi Investment Criteria (Quick Reference)

- **Stage:** Seed to early Series A; priced rounds preferred; no SAFEs
- **Geography:** US-based HQ and IP only
- **Traction:** Real revenue or signed paying customers required
- **Product:** MVP with successful beta(s)
- **Return target:** 10x in 5 years
- **Structure:** C-Corp only (Delaware preferred)

## Extending to Other NWA Groups

This v0.1.0 plugin covers the TechGroup only (Tech-tagged applications in Dealum).
Future versions will add group-specific screening criteria for MedicalGroup, SpaceGroup,
ConsumerGroup, IndustrialGroup, and FintechGroup.
