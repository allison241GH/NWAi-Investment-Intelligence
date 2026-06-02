#!/bin/bash
# NWAi TechGroup Pipeline — Plugin Repackager
# ---------------------------------------------------------------------------
# Single source of truth = .claude/ (the live runtime every surface reads).
# This script REGENERATES the packaging tree (plugin/unpacked/nwai-tech-pipeline/)
# from .claude/ on every run, so plugin/current/ can never silently drift from
# the live runtime. It then archives the prior binary and builds the new
# .plugin/.zip.
#
# Why this exists: the plugin historically kept two hand-maintained copies of
# every agent/command/skill (.claude/ and plugin/unpacked/). Edits landed in
# .claude/ (live) but the packaged copy was only updated if someone remembered
# to mirror it — so the binary shipped stale for weeks at a time. This makes the
# mirror automatic and adds a hard diff-guard that aborts on any divergence.
#
# Usage:
#   bash scripts/repackage-plugin.sh <new-version> ["optional plugin.json description"]
# Example:
#   bash scripts/repackage-plugin.sh 2.16.0
#
# Packaging-only files (preserved, NOT sourced from .claude/):
#   .mcp.json, README.md, .claude-plugin/plugin.json
# ---------------------------------------------------------------------------
set -euo pipefail

NEW_VERSION="${1:?Usage: repackage-plugin.sh <new-version> [description]}"
NEW_DESC="${2:-}"

# Resolve repo root from this script's location (works from any cwd / checkout).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIVE="$ROOT/.claude"
PKG="$ROOT/plugin/unpacked/nwai-tech-pipeline"
CURRENT="$ROOT/plugin/current"
ARCHIVE="$ROOT/plugin/archive"
PLUGIN_JSON="$PKG/.claude-plugin/plugin.json"

CONTENT_DIRS=(agents commands skills servers)

echo "▶ Repackaging nwai-tech-pipeline → v${NEW_VERSION}"
echo "  Source of truth: $LIVE"

# --- 0. Capture the OLD version (for archive naming) before we bump it --------
OLD_VERSION="$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$PLUGIN_JSON" | head -1 | sed -E 's/.*"([^"]*)"$/\1/')"
echo "  Current packaged version: ${OLD_VERSION:-unknown}"

# --- 1. Archive the current binary (idempotent; skip if archive exists) -------
if [ -f "$CURRENT/nwai-tech-pipeline.plugin" ] && [ -n "$OLD_VERSION" ]; then
  for ext in plugin zip; do
    SRC="$CURRENT/nwai-tech-pipeline.$ext"
    DST="$ARCHIVE/nwai-tech-pipeline-v${OLD_VERSION}.$ext"
    if [ -f "$SRC" ]; then
      if [ -f "$DST" ]; then
        echo "  ⚠ Archive already exists, leaving as-is: $(basename "$DST")"
      else
        cp "$SRC" "$DST"
        echo "  ✔ Archived v${OLD_VERSION} → $(basename "$DST")"
      fi
    fi
  done
fi

# --- 2. Mirror .claude/ content dirs → packaging tree (exact, with delete) ----
for d in "${CONTENT_DIRS[@]}"; do
  if [ -d "$LIVE/$d" ]; then
    rsync -a --delete \
      --exclude '.DS_Store' \
      "$LIVE/$d/" "$PKG/$d/"
    echo "  ✔ Mirrored .claude/$d → packaging tree"
  fi
done

# --- 3. Hard diff-guard: packaging tree MUST equal live runtime ---------------
DRIFT=0
for d in "${CONTENT_DIRS[@]}"; do
  if ! diff -rq --exclude '.DS_Store' "$LIVE/$d" "$PKG/$d" >/dev/null 2>&1; then
    echo "  ✖ DRIFT REMAINS in $d after mirror — aborting:"
    diff -rq --exclude '.DS_Store' "$LIVE/$d" "$PKG/$d" || true
    DRIFT=1
  fi
done
if [ "$DRIFT" -ne 0 ]; then
  echo "✖ Aborting: packaging tree does not match .claude/. No binary built."
  exit 1
fi
echo "  ✔ Diff-guard passed: packaging tree == .claude/ runtime"

# --- 4. Bump version (and optional description) in plugin.json ----------------
TMP="$(mktemp)"
sed -E "s/(\"version\"[[:space:]]*:[[:space:]]*\")[^\"]*(\")/\1${NEW_VERSION}\2/" "$PLUGIN_JSON" > "$TMP" && mv "$TMP" "$PLUGIN_JSON"
echo "  ✔ plugin.json version → ${NEW_VERSION}"
if [ -n "$NEW_DESC" ]; then
  TMP="$(mktemp)"
  sed -E "s/(\"description\"[[:space:]]*:[[:space:]]*\")[^\"]*(\")/\1${NEW_DESC//\//\\/}\2/" "$PLUGIN_JSON" > "$TMP" && mv "$TMP" "$PLUGIN_JSON"
  echo "  ✔ plugin.json description updated"
fi

# --- 5. Build the flat zip (contents of packaging tree at archive root) -------
OUT_PLUGIN="$CURRENT/nwai-tech-pipeline.plugin"
rm -f "$OUT_PLUGIN" "$CURRENT/nwai-tech-pipeline.zip"
(
  cd "$PKG"
  zip -r -X -q "$OUT_PLUGIN" . \
    -x '*.DS_Store' -x '__MACOSX*'
)
cp "$OUT_PLUGIN" "$CURRENT/nwai-tech-pipeline.zip"
echo "  ✔ Built $(basename "$OUT_PLUGIN") + .zip ($(du -h "$OUT_PLUGIN" | cut -f1))"

echo "✅ Done. nwai-tech-pipeline v${NEW_VERSION} packaged and in sync with .claude/."
echo "   Remember: edit .claude/ only — never hand-edit plugin/unpacked/."
