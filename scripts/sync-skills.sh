#!/bin/sh
# Copies the published skills (SKILL_IDS in backbone-app src/lib/tools/skill-library/skills.ts) from the app, the
# source of truth, into skills/. Usage: scripts/sync-skills.sh [path-to-backbone-app]
set -e
APP="${1:-../backbone-app}"
cd "$(dirname "$0")/.."
for s in receipt-routine month-end-checklist invoice-check e-invoice-check invoice-writer reminder-writer small-business-note eu-reverse-charge data-redactor; do
  rm -rf "skills/$s" && mkdir -p "skills/$s" && cp -R "$APP/content/skill-library/$s/." "skills/$s/"
done
echo "synced $(ls skills | wc -l | tr -d ' ') skills"
