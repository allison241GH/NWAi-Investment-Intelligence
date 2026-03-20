#!/bin/bash
# Auto-commit and push script for NWAi Investment Intelligence

REPO_DIR="/Users/jamie/Desktop/Claude CoWork NWAi Investment Intelligence"
LOCK_FILE="/tmp/git-autopush.lock"
DEBOUNCE_SECONDS=5

cd "$REPO_DIR" || exit 1

# Debounce: wait for file changes to settle
sleep $DEBOUNCE_SECONDS

# Prevent concurrent runs
if [ -f "$LOCK_FILE" ]; then
    exit 0
fi
touch "$LOCK_FILE"
trap "rm -f $LOCK_FILE" EXIT

# Check for changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    exit 0
fi

# Stage all changes
git add -A

# Commit with timestamp
TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "Auto-commit: $TIMESTAMP"

# Push to origin
git push origin main

echo "[$TIMESTAMP] Changes committed and pushed"
