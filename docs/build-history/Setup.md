# Jumping Into Claude Code — Step by Step

A practical guide for Jamie to move into Claude Code and start work on the NWA Intelligence Platform — both the board demo and the Member Intelligence MVP (plugin extension).

**Important context:** you already have a real workspace with a live plugin serving real deals. This guide is about opening that workspace in Claude Code for *new* development (demo + plugin extensions), not starting from scratch.

**Estimated time for setup:** 45–90 minutes.

---

## Part 1: One-time environment setup

### Step 1: Install prerequisites

Claude Code runs on Node.js. Open Terminal (Cmd+Space, "Terminal") and check:

```bash
node --version
```

If you see v18+, you're set. If "command not found", install from https://nodejs.org (LTS installer) or `brew install node` if you use Homebrew.

Confirm git:

```bash
git --version
```

### Step 2: Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Verify:

```bash
claude --version
```

### Step 3: Install VS Code and the Claude Code extension

This is the "less terminal, more Cowork-like" experience.

1. Download VS Code from https://code.visualstudio.com and install.
2. Open VS Code.
3. Click the Extensions icon (four squares in the left sidebar).
4. Search for "Claude Code" (by Anthropic).
5. Click Install.

The extension gives you a Claude sidebar inside VS Code. You type prompts there and see Claude's work appear in your files in real time.

### Step 4: Authenticate

In Terminal:

```bash
claude
```

Follow the browser login flow. Uses your Anthropic account. Verify with a quick "hello, can you see my files?" prompt, then `/exit`.

### Step 5: GitHub setup (if not already done)

Your workspace is already a git repo, so you likely have this set up. Verify:

```bash
cd "/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence"
git remote -v
```

If you see a remote (origin → github.com/…), you're set. If not, that's the first thing to fix — commit from Cowork first to establish the remote.

Recommended if you don't already have it: install GitHub Desktop (https://desktop.github.com) for a visual interface. Much easier than command-line git when you're iterating.

---

## Part 2: Workspace strategy — the important decision

You have two reasonable options for how Claude Code interacts with your workspace.

### Option A — Work directly in the existing workspace (simpler)

Open `/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence/` in VS Code + Claude Code. Cowork keeps running. Both tools read and write the same files.

**Pro:** No duplication, no syncing, everything in one place.
**Con:** Two tools editing the same files simultaneously will fight. You'll need discipline — either Cowork or Claude Code at any given moment on the same file.

### Option B — Clone the workspace to a separate Claude Code folder (cleaner) — **recommended**

```bash
cd ~
mkdir -p Projects
cd Projects
git clone <your-github-url> nwa-intelligence
```

(Your GitHub URL is visible from `git remote -v` in the original workspace.)

**Pro:** Cowork runs production plugin on the original workspace; Claude Code develops new features in the clone. Git is the bridge — commit from either side, pull on the other.
**Con:** Two folders to keep in sync. Needs `git pull` discipline.

**Why Option B is recommended:** the plugin runs real deals today. Keeping a clean separation between "production tool" (Cowork workspace) and "development workbench" (Claude Code clone) reduces the chance of breaking production with in-progress work. Git merges in at natural integration points.

For the rest of this guide, assume Option B. Your Claude Code working folder is `~/ClaudeCodeProjects/nwa-intelligence`.

---

## Part 3: First Claude Code session — orient on what exists

Open the project in VS Code:

```bash
cd ~/ClaudeCodeProjects/nwa-intelligence
code .
```

Launch the Claude Code extension panel (icon in left sidebar, or Cmd+Shift+P → "Claude Code: Open").

### Step 6: Orientation prompt

Your first prompt is deliberately **not** a build request. The repo has a rich existing architecture — you want Claude Code to demonstrate understanding before it touches anything.

> Read CLAUDE.md, then read Claude Code/Scoping.md. The repo is a working Cowork plugin called `nwai-tech-pipeline` that runs real deals today. Summarize back to me: (1) the three intelligence tracks and current state of each, (2) the seven pipeline stages and existing slash commands, (3) what the Scoping doc says we're building next (Phase 1 demo + Phase 2 MVP), (4) how the MVP extends the existing plugin vs. standing up something new. Do NOT write any code. Do NOT modify any files. Flag any gaps or ambiguities you see.

Review the summary carefully. Correct anything that's off. This is the single most important step — if Claude Code misunderstands the architecture here, every subsequent action compounds the error.

### Step 7: Confirm the working folder mental model

Ask it to confirm the project layout:

> List the top-level folders and explain what each one contains in one sentence. Flag anything unusual.

Expect it to see: `plugin/` (the live plugin), `.claude/` (Cowork config), `deals/` (output artifacts from the live pipeline), `docs/` (reference documents), `Claude Code/` (our scoping and setup docs), `legacy/`, `notes/`, `scripts/`.

---

## Part 4: Two parallel tracks of work

You have two things to build: the **board demo** (Phase 1) and the **Member Intelligence MVP plugin extension** (Phase 2). Keep them cleanly separated.

### Track A — Board Demo (first, 1–2 weeks)

The demo is a separate app, not a plugin extension. Cleanest home: a `demo/` subfolder in the repo.

**Step 8A: Scaffold the demo**

> Create a new subfolder `demo/` in the repo root. Inside, scaffold a Next.js + Tailwind + shadcn/ui project suitable for the board demo spec in Claude Code/Scoping.md Section 5. Do NOT modify anything outside the `demo/` folder. Explain the structure you set up.

Review the structure. Ask questions. When you're happy, continue.

**Step 9A: Seed data first**

> Generate the seed data per Scoping.md Section 5: 3 deals across sectors, 20–30 fictional members with credible expertise profiles, and pre-computed match results with rationale. Put it in `demo/src/data/seed/`. Make the data realistic — real-sounding names and companies, expertise that maps plausibly to the deals.

**Step 10A: Build screens one at a time**

Don't let it build all 8 screens in one go. Screen-by-screen:

> Build the Pipeline Dashboard screen per Scoping.md Section 5. The 7 stages must match the real pipeline from our plugin (Inbox → Screen → Scout → Diligence → DD Report → Decision → Memo). Demo-data watermark must be visible. Show me before building the next screen.

Repeat for: Deal Detail → Member Directory → Member Profile → Matching Rationale → Portfolio View → Ecosystem Placeholder → Orchestrator View.

**Step 11A: Commit after every working screen**

> Commit the pipeline dashboard with a descriptive message.

Or use GitHub Desktop — commits show up visually.

**Step 12A: Deploy to Vercel (optional for board preview)**

Once the demo works locally, you can push to GitHub and connect the repo to Vercel for a shareable URL. Claude Code can walk you through this.

### Track B — Member Intelligence MVP (after demo, 4–8 weeks)

This is plugin extension work on a feature branch. Do not start until after the board demo has landed and generated directional feedback.

**Step 8B: Create feature branch**

```bash
git checkout -b feature/member-intelligence
```

**Step 9B: Orientation prompt for plugin work**

> Read plugin/current/* (or wherever the active nwai-tech-pipeline plugin lives — find it). Explain the plugin's architecture: how slash commands are wired, how agents are invoked, how reference docs are loaded, how output artifacts are saved to deals/. Do NOT modify anything. I need to understand the existing pattern before we extend it.

Review its explanation. Correct anything wrong. This is the second most important step — getting the architecture right before touching the plugin.

**Step 10B: Add reference docs first**

Before writing any slash command code, extend NWAi IP:

> Per Scoping.md Section 6, create three new reference documents in the plugin, following the format and voice of the existing reference docs (gates-and-flags-techgroup.md, scout-questions.md, etc.):
> 1. member-matching-rubric.md — how to rank members for a given deal
> 2. member-outreach-templates.md — templates for personalized outreach
> 3. member-synthesis-framework.md — how to aggregate member inputs into structured diligence intelligence
> Draft each one. Show me for review before we wire them into commands.

**Step 11B: Add commands one at a time**

Then slash commands — one at a time, tested before moving on:

> Per Scoping.md Section 6, add a new slash command `/match-members [company]` to the plugin. It should read the Scout Assessment from deals/, apply member-matching-rubric.md, and output [Company] - Member Matches.docx. Follow the exact pattern of existing commands. Show me the implementation for review before we test it on a real deal.

Test against a recent deal. Iterate. Then move to `/engage-members`, then `/capture-member-input`, then the `/dd-report` extension.

**Step 12B: Merge to main when stable**

Only merge `feature/member-intelligence` to `main` after all four commands work end-to-end on a real deal and Jamie is comfortable. The live plugin on main stays untouched until then.

---

## Part 5: How to work effectively with Claude Code

### The session model

Each `claude` session has its own context window. Long sessions are fine for one topic — Claude Code manages context well. Start a fresh session when switching between the demo track and the MVP track; they involve very different files and mental models.

### Cost

Claude Code uses your Anthropic API credits. Roughly a few dollars per hour of active work, depending on model. Sonnet is the sensible default. Opus for hard architectural or debugging moments. This project will likely cost $20–$100/week during active development.

### When to trust, when to verify

Claude Code is excellent but fallible.

**Always read summaries it gives.** If it says "done," look at the diff before believing it.

**For plugin work specifically** — the plugin runs real deals. Review every change with care. Never merge to main without testing on a non-production copy first.

**For the demo** — lower stakes, trust more, verify less. Worst case you re-scaffold.

**For architectural decisions** (data model, API shape, framework choice) — push back, ask for alternatives, don't accept the first answer.

### The git discipline that saves you

Commit every time something works. When Claude Code breaks something, you want a working version to return to.

```bash
git status              # see what changed
git diff                # see specific line changes
git add .               # stage everything
git commit -m "msg"     # commit
git log --oneline -10   # see last 10 commits
git reset --hard HEAD~1 # undo last commit (destructive)
```

GitHub Desktop handles this visually if you'd rather.

### When Claude Code goes in circles

If it produces broken code repeatedly:
1. Stop. Start a fresh session with a more focused prompt.
2. Describe the specific failure in detail, not "it's broken."
3. Ask it to explain its reasoning before trying again.
4. Last resort: describe the problem to Claude in a browser (claude.ai) and paste back the suggestion.

### What Claude Code is great at vs not

**Great at:** UI scaffolding, well-specified features, tests, refactors, debugging with good error messages, explaining existing code, generating boilerplate.

**Less great at:** ambiguous product decisions, architectural tradeoffs without constraints, visual design judgment, anything needing external context it hasn't seen. Those need your input.

---

## Part 6: Working rhythm between Cowork and Claude Code

You will be using both tools. Rules of thumb:

**Cowork** stays on the original workspace, running production plugin on `main`. Day-to-day deal intelligence work (running `/screen`, `/scout`, `/diligence`, etc. on real deals) continues there.

**Claude Code** runs on the cloned workspace at `~/ClaudeCodeProjects/nwa-intelligence`. New development happens here.

**Syncing:**
- When you commit in Cowork, `git push` from the original workspace.
- In Claude Code, `git pull` to bring those changes in.
- When you commit in Claude Code on a feature branch, `git push` from there.
- Production (main) only gets new work via merged feature branches, not by editing directly in Cowork.

**Never:** edit plugin files in Cowork while Claude Code has uncommitted changes in the clone, or vice versa. Commit first, then switch.

---

## Part 7: First-week expectations

**Days 1–2:** Setup complete. First orientation prompts. Claude Code understands the architecture. Demo scaffolding done, seed data generated.

**Days 3–5:** Demo screens 1–5 built and committed. Pipeline Dashboard, Deal Detail, Member Directory, Member Profile, Matching Rationale.

**Days 6–7:** Remaining demo screens (Portfolio, Ecosystem, Orchestrator). Polish pass. Deploy to Vercel for a shareable URL.

**Week 2:** Board preview. Capture directional feedback. Update Scoping.md if needed.

**Week 3+:** Feature branch created. Plugin extension work begins (reference docs first, then commands).

If you hit Day 5 and only have two screens working, you're behind — pause and ask for help. Likely scope is too wide or something structural is wrong.

---

## Quick-reference cheat sheet

```bash
# Start a session
cd ~/ClaudeCodeProjects/nwa-intelligence
code .                          # open VS Code
# launch Claude Code sidebar

# Git basics
git status                      # what's changed
git pull                        # pull remote changes
git add .                       # stage all
git commit -m "message"         # commit
git push                        # push to remote
git log --oneline -10           # recent commits
git reset --hard HEAD~1         # undo last commit (destructive)

# Branch work (for MVP plugin extensions)
git checkout -b feature/member-intelligence
git checkout main               # back to main
git merge feature/member-intelligence  # merge feature into main

# Claude Code
claude                          # start CLI session
/init                           # generate CLAUDE.md (don't run — we already have one)
/exit                           # end session
```

---

## If something breaks

1. Don't panic. Committed work is safe.
2. `git status` — see what changed.
3. `git checkout .` — throw away uncommitted changes.
4. `git reset --hard HEAD~1` — roll back last commit.
5. GitHub Desktop → History → right-click a good commit → Reset to this commit (visual).
6. Last resort: delete the clone, `git clone` fresh. Committed work is never gone.
