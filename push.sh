#!/bin/bash
# NWAi Pipeline — Quick Git Push
# Usage: bash push.sh "your commit message"
# If no message provided, uses a timestamped default.

REPO="/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence"
MSG="${1:-Session update $(date '+%Y-%m-%d %H:%M')}"

cd "$REPO" || exit 1
find .git -name "*.lock" -delete 2>/dev/null
git add -A
git reset HEAD .claude/settings.local.json plugin/current/zi7wWRPB 2>/dev/null
git commit -m "$MSG"
git push origin main
