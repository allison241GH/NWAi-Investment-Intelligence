---
description: Pull new Tech-tagged deals from Dealum deal room
allowed-tools: mcp__nwai-dealum__list_applications, mcp__nwai-dealum__get_application
argument-hint: [optional: step-name to filter by]
---

Retrieve all applications from the NWAi Dealum deal room using the `list_applications` tool.

Filter the results to show only applications that:
1. Have "Tech" in their tags array (case-insensitive match)
2. Are in the earliest active pipeline steps (Inbox, Screening, or as specified by $ARGUMENTS)

Group the results by their current `step` and present a clear pipeline dashboard:

```
━━━ NWAi TechGroup Pipeline — [today's date] ━━━

📥 INBOX / NEW ([count])
  • [Company Name] — [contact email] — received [date if available]
  ...

🔍 SCREENING ([count])
  • [Company Name] — [step updated date if available]
  ...

🤝 SCOUT / INTRO CALL ([count])
  • [Company Name]
  ...

🔬 DILIGENCE ([count])
  • [Company Name]
  ...

✅ DECISION ([count])
  • [Company Name]
  ...
```

After presenting the dashboard:
- Highlight any applications in Inbox or Screening that have not been advanced (oldest first)
- Suggest next actions: "Run /screen [company name] to begin screening" for inbox items
- Note total deal count by stage

If no applications are found with the "Tech" tag, inform the user and suggest checking whether the tag name in Dealum matches exactly.

If the Dealum MCP tools are unavailable (missing credentials), instruct the user to set the DEALUM_TOKEN and DEALUM_ROOM_ID environment variables and restart their session.
