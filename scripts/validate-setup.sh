#!/bin/bash
cd "$(dirname \"$0\")/.."
echo "[INFO] Validating Playwright/NPM setup..."
echo "[STEP] Node version: $(node --version)"
echo "[STEP] NPM version: $(npm --version)"
echo "[STEP] Playwright version: $(npx playwright --version)"
echo "[STEP] Checking playwright browsers installed..."
npx playwright install chromium firefox &> /dev/null
npx playwright test --list || { echo '[ERROR] Test discovery failed.'; exit 1; }
echo "[SUCCESS] Setup and test discovery are valid!"
