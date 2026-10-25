#!/bin/sh
# Builds the OpenAI plugin submission ZIP: dist/backbone-openai-<version>.zip
# Contents: plugin.json, mcp.json, skills/, assets/logo.png (only what the manifest references).
# Checks the OpenAI limits first (scripts/check-openai.mjs). Pass --final to also fail on placeholders
# (demo video URL). The repository field is dropped while it is still the OWNER/REPO placeholder.
set -e
cd "$(dirname "$0")/.."
node scripts/check-openai.mjs "$@"
VERSION=$(node -p 'require("./plugin.json").version')
OUT="dist/backbone-openai-$VERSION.zip"
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
node -e '
const fs = require("fs");
const p = JSON.parse(fs.readFileSync("plugin.json", "utf8"));
if (String(p.repository || "").includes("OWNER/REPO")) delete p.repository;
fs.writeFileSync(process.argv[1] + "/plugin.json", JSON.stringify(p, null, 2) + "\n");
' "$STAGE"
cp mcp.json "$STAGE/"
mkdir -p "$STAGE/assets" && cp assets/logo.png "$STAGE/assets/"
cp -R skills "$STAGE/"
find "$STAGE" -name .DS_Store -delete
mkdir -p dist && rm -f "$OUT"
(cd "$STAGE" && zip -qrX - plugin.json mcp.json assets skills) > "$OUT"
echo "built $OUT ($(du -h "$OUT" | cut -f1 | tr -d ' '), $(unzip -Z1 "$OUT" | grep -vc '/$') files)"
