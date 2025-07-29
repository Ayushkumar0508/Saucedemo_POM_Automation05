#!/bin/bash
cd "$(dirname \"$0\")/.."
echo "[INFO] Running parallel tests (2 workers, multi-browser)..."
npm install --no-audit --progress=false &> /dev/null
echo "[STEP] Ensuring browsers are installed..."
npx playwright install &> /dev/null
npx playwright test --workers=2 || { echo '[ERROR] Parallel tests failed.'; exit 1; }
echo "[SUCCESS] Parallel test execution complete!"
