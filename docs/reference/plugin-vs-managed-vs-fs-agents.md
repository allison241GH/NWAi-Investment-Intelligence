# Plugin Agents vs. Managed Agents vs. Claude for Financial Services Agents

**Purpose:** Reference for understanding the three Claude agent runtimes Anthropic offers, how they differ, and how each one does (or doesn't) fit the NWAi TechGroup pipeline.

**Audience:** Jamie, TechGroup Co-Chair, plus anyone evaluating whether to evolve the pipeline's agent runtime in the future.

**Version:** 1.0 — May 8, 2026

**Companion docs:**
- [`agent-team-reference.md`](agent-team-reference.md) — the 8 active plugin agents in the pipeline today
- [`agent-evolution-protocol.md`](agent-evolution-protocol.md) — how to evolve plugin agents over time

---

## TL;DR

The three Claude agent runtimes are not competing options — they serve different jobs. The 8 NWAi diligence agents in the current plugin are bespoke prompt engineering that encodes NWA's investing philosophy. The "product" is the prompts themselves, not the runtime that hosts them. Replacing them with Managed Agents or Claude for Financial Services agents would change *where* the work runs, not *what* the work produces.

**Recommended architecture:** keep plugin agents as the diligence engine, optionally use Managed Agents for upstream/downstream automation, and treat Claude for Financial Services as a foundation layer to sample from — not a replacement.

---

## The Three Runtimes

### 1. Plugin Agents (what NWAi uses today)

**What they are:** Markdown files in `.claude/agents/<name>.md`. Each contains frontmatter (name, description, model, tools) and a system prompt body that defines the agent's mandate, frameworks, and output structure.

**How they were created:** Hand-authored. Each NWAi agent's system prompt encodes a specific piece of NWA's investing method — McMurry method, "no AI slop" rule, thin wrapper test, structural discontinuity test, founder claim verification protocol, NWA 35% IRR + 10x-in-5-years criterion. They are configuration, not custom-trained models. The intelligence is the underlying Claude model plus the carefully structured prompts on top.

**Where they run:** Inside a Cowork or Claude Code session — local to the user's machine.

**How invoked:** Slash command (`/diligence`), natural-language workflow, or direct dispatch via the Agent tool inside an active session.

**Strengths:**
- Iteration speed — edit a markdown file, change takes effect immediately
- Workspace context inheritance — agents automatically have access to CLAUDE.md, deal folders, prior reports, framework references
- Human-in-the-loop ergonomics — you can steer mid-research and apply judgment
- Bundled into the Claude subscription — no separate billing
- Versioned in source control alongside the rest of the workspace

**Limitations:**
- Require an active session with Cowork or Claude Code installed
- Single-user — each user needs the plugin installed locally
- No persistent agent state across sessions (the workspace files provide ambient continuity, but the agent itself is stateless)
- No native event/schedule triggering

**Best for:** Bespoke, evolving, human-in-the-loop workflows where the prompt itself is the IP.

---

### 2. Claude Managed Agents

**What they are:** Cloud-hosted long-running agents managed by Anthropic. Defined via API contracts with explicit input/output schemas, persistent memory, and tool access.

**Where they run:** Anthropic's managed infrastructure. No local session required.

**How invoked:** Programmatically — API call, webhook, scheduled trigger, or external app integration (e.g., Slack bot, web form, internal system).

**Strengths:**
- Always-on operation — run unattended on schedule or in response to events
- Multi-user access — anyone with the right credentials can invoke them
- Persistent agent state — agents can remember prior runs and accumulate context over time
- Centralized observability — managed-platform telemetry and audit trails
- Native fit for productizing a workflow for non-technical users

**Limitations:**
- Pay-per-invocation API billing on top of any subscription
- Engineering overhead — schemas, deployment, versioning are first-class concerns rather than a markdown edit
- Iteration is slower — changes go through deploy cycles
- Workspace context is not ambient — must be engineered into each invocation
- Lose the human-in-the-loop steerability that Cowork provides

**Best for:** Automation that should happen without a human present, or workflows that need to be invoked by multiple non-technical users through external apps.

---

### 3. Claude for Financial Services Agents

**What they are:** Anthropic's vertical agent offering targeted at financial services use cases. Pre-built or pre-tuned agents intended for industry-standard finance workflows.

**Where they target:** Wealth management research, asset management analysis, capital markets, investment banking diligence (M&A, sell-side / buy-side), regulatory and compliance document review, sell-side / buy-side equity research.

**Strengths:**
- Pre-built capability for general financial analysis tasks
- Industry-flavored defaults (compliance posture, document handling, etc.)
- Reduces the prompt-engineering work for standard FS workflows

**Limitations relative to NWAi's pipeline:**
- The vertical is corporate finance / asset management / IBank — not angel-stage venture capital
- Does not natively encode angel-investing-specific frameworks like PMTF, structural discontinuity, thin wrapper test, McMurry method, NWA's 35% IRR + 10x-in-5-years criterion
- Roles like `company-researcher` (PMTF), `market-analyst` (structural discontinuity), `technical-diligence` (thin wrapper, TRL, AI moat) are venture-specific and outside the FS vertical's design center

**Where overlap exists:** General-purpose forecasting, comp / multiples research, document analysis. These could potentially be borrowed as a foundation layer that NWA's framework is then layered on top of.

**Best for:** Teams that want pre-tuned financial analysis capability without building it from scratch — especially in capital markets, asset management, or IB workflows. Less directly applicable to early-stage venture diligence.

---

## Side-by-Side Comparison

| Dimension | Plugin Agents | Managed Agents | Claude FS Agents |
|---|---|---|---|
| **Where they run** | Local session (Cowork / Claude Code) | Anthropic cloud | Anthropic cloud |
| **How invoked** | Slash command or natural language in session | API / webhook / schedule | API / managed offering |
| **Workspace context** | Inherited automatically | Must be engineered in | Must be engineered in |
| **Human in the loop** | Yes — steerable mid-run | No — fire-and-forget | No — fire-and-forget |
| **State / memory** | Per-session; ambient via workspace files | Persistent across runs | Vendor-managed |
| **Iteration speed** | Edit `.md` file — immediate | Schema + deploy cycle | Vendor-controlled |
| **Multi-user access** | Each user needs Cowork + plugin | API / app — broad reach | API / app — broad reach |
| **Billing** | Subscription | API usage billing | Subscription tier (vendor-priced) |
| **Customization depth** | Full control of prompts | Full control via API | Bounded by vendor's framework |
| **Best fit job** | Bespoke, evolving, human-in-the-loop diligence | Always-on automation, multi-user services | Standard FS workflows as foundation |

---

## How They Apply to the NWAi TechGroup Pipeline

### The Diligence Engine — Stay on Plugin Agents

The 8 plugin agents that power `/scout` and `/diligence` are the right primitive for the work they do. Three reasons:

1. **The prompts ARE the IP.** What makes the diligence engine valuable is not the runtime — it's the encoded NWA framework. McMurry method, "no AI slop," thin wrapper test, structural discontinuity, NWA hurdle and 10x criterion. These are NWAi's competitive edge as a deal-evaluating syndicate.
2. **The framework is still evolving.** Plugin v2.0 → v2.13.1 in months. Markdown-file iteration speed is a real advantage when the methodology is being refined deal by deal.
3. **Diligence is human-in-the-loop by design.** Jamie + the SMEs apply judgment at every stage. The plugin's session ergonomics (Claude reading context, the user steering, outputs landing in deal folders) are a feature, not a limitation.

There is no diligence-quality merit to replacing them. The merit would be purely operational — multi-user access, always-on, programmatic invocation — and those needs aren't present today.

### Always-On Automation Around the Engine — Managed Agents Fit Here

Managed Agents fit cleanly upstream and downstream of the plugin, not in place of it:

**Upstream candidates:**
- Overnight Dealum inbox triage (when API access is approved)
- Founder courtesy responses fronted by a "submit your pitch" web form
- Scheduled monitoring of inbound deal flow sources

**Downstream candidates:**
- Weekly portfolio + watch-list public-news scans
- Friday TechGroup pipeline digest
- Scheduled reminders on stalled deals

These are jobs that should run *without Jamie being there*. The plugin is the wrong tool for them; Managed Agents are the right one — at the cost of API usage billing and the engineering work to define them.

### Foundation Layer — Sample, Don't Adopt Wholesale

Claude for Financial Services may be useful as a *foundation layer* for one or two roles where general financial analysis capability is meaningful — for instance, comps research or generic forecasting scaffolding. But the prompt-engineering work to encode NWA's specific philosophy on top is the actual product, and that has already been done in the plugin agents. A wholesale swap would re-introduce work that has already been completed.

The right posture: periodically sample what's in Claude FS to see if any specific component is meaningfully better than a hand-prompted equivalent. If yes, borrow that piece. Don't reorganize the pipeline around it.

---

## When to Revisit This Decision

The recommendation above is correct *for the current state* of the pipeline (May 2026). It should be revisited if any of the following become true:

- **Multi-user demand emerges** — multiple TechGroup members or external parties need direct access to the diligence agents without each having Cowork installed. (Managed Agents become more attractive.)
- **Always-on operation is required** — a workflow needs to run on schedule or in response to external events without a human session. (Managed Agents fit; the plugin doesn't.)
- **Anthropic ships a Claude for Venture Capital vertical** — at which point the FS-vs-NWAi mismatch may close. (Re-evaluate.)
- **The framework stabilizes meaningfully** — if NWA's diligence method stops evolving and becomes more standard, the iteration-speed advantage of plugin agents diminishes, and Managed Agents' productization advantages become more relevant.

Until then: **plugin agents for diligence, Managed Agents for automation, Claude FS as a sampling target — not a replacement.**

---

*Maintained by NWAi Investment Intelligence & AI. Last updated May 8, 2026.*
