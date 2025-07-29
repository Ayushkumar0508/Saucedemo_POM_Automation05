#!/bin/bash
cd "$(dirname \"$0\")/.."
echo "[INFO] Running all tests sequentially (1 worker, multi-browser)..."
npm install --no-audit --progress=false &> /dev/null
npx playwright install &> /dev/null
npx playwright test --workers=1 || { echo '[ERROR] Sequential tests failed.'; exit 1; }
echo "[SUCCESS] Sequential test execution complete!"
