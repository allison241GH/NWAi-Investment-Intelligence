---
description: Record invest/pass/watch decision and update Dealum pipeline
allowed-tools: mcp__nwai-dealum__get_application, mcp__nwai-dealum__list_applications, mcp__nwai-dealum__update_application
argument-hint: [company-name | application-id] [invest | pass | watch]
---

Record the NWAi investment decision for a Tech deal and update Dealum accordingly.
Arguments: $ARGUMENTS

## Step 1: Parse Arguments

Parse $ARGUMENTS to extract:
- Company name or application ID (first argument)
- Decision: invest / pass / watch (second argument)

If either is missing, ask the user:
- "Which company is this decision for?"
- "What is the decision? (invest / pass / watch)"

## Step 2: Fetch Application from Dealum

Retrieve the application using `get_application` or `list_applications`. Confirm you have the
correct company before proceeding.

## Step 3: Confirm Decision Details

Before recording, confirm the following with the user:

**If INVEST:**
Ask for:
- Recommended investment amount (check size)
- Round details (stage, total round size, lead investor)
- Any conditions or contingencies (e.g., closing documents, reference checks)
- NWAi board seat or observer rights agreed?
- Target close date

**If WATCH:**
Ask for:
- Reason for Watch vs. Invest (what milestone needs to be met?)
- Suggested revisit timeframe (e.g., "re-assess in Q3 2025 when Series A is closing")
- Any founder follow-up actions requested

**If PASS:**
Ask for:
- Primary reason for passing (select the most applicable):
  - Failed AutoKill gate (specify which)
  - Team/founder concerns
  - Market too small
  - No moat / defensibility concerns
  - Valuation too high
  - Timing (too early/too late)
  - Other (specify)

## Step 4: Update Dealum

Based on the decision:

**INVEST:**
- Update step to "Decision" (or the NWAi equivalent for approved deals)
- Add tags: "TechGroup-Invest", "IC-Approved"
- Add any deal terms as a tag if appropriate

**WATCH:**
- Update step to a Watch/Hold step if available, or leave in Decision
- Add tags: "TechGroup-Watch", "Revisit-[Quarter-Year]"

**PASS:**
- Update step to the appropriate rejected step
- Add tags: "TechGroup-Pass", and a reason tag (e.g., "Pass-NoMoat", "Pass-SmallTAM")

Confirm the Dealum update to the user.

## Step 5: Output Decision Summary

Produce a brief Decision Summary:

```
━━━ NWAi INVESTMENT DECISION ━━━
Company: [Name]
Decision Date: [today]
Decision: INVEST / WATCH / PASS
Decision Maker: [user name if known]

[INVEST details: amount, round, conditions, close date]
[WATCH details: milestone trigger, revisit date]
[PASS details: reason]

Next Step: [Run /memo to generate investment memo | Monitor for milestone | No further action]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If INVEST or WATCH: suggest running `/memo [company name]` to generate the Investment Memo.
