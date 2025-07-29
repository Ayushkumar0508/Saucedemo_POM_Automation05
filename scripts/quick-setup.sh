#!/bin/bash
cd "$(dirname \"$0\")/.."
echo "[INFO] Running quick setup for Playwright POM framework.\n"
echo "[STEP] Installing dependencies..."
npm install || { echo '[ERROR] npm install failed.'; exit 1; }
echo "[STEP] Installing browsers..."
npx playwright install || { echo '[ERROR] playwright install failed.'; exit 1; }
echo "[STEP] Running tests in parallel on chromium & firefox (2 workers, headed)..."
npx playwright test --workers=2 || { echo '[ERROR] Tests failed.'; }
echo "[STEP] Opening HTML report..."
npx playwright show-report || { echo '[ERROR] Report open failed.'; exit 1; }
echo "[SUCCESS] Quick setup completed!"
