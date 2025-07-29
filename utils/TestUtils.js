// Utilities for logging, screenshot, retry, chain-of-thought and context
const { expect } = require('@playwright/test');
const fs = require('fs');

class TestUtils {
  static logStep(step, action, result, context) {
    const timestamp = new Date().toISOString();
    const msg = `[${timestamp}] [${context}] INTENT: ${step} | ACTION: ${action} | RESULT: ${result}`;
    // Write to console and optionally a file
    // All logs deterministic by step order
    console.log(msg);
  }

  static async screenshot(page, name) {
    // Overwrite always for determinism
    await page.screenshot({ path: name, fullPage: true });
  }

  static async retry(actionFn, retries = 2) {
    let err;
    for (let i = 0; i <= retries; i++) {
      try {
        return await actionFn();
      } catch (e) {
        err = e;
      }
    }
    throw err;
  }

  static async waitForSelectorDeterministic(page, selector, timeout = 10000) {
    // Deterministic wait (not arbitrary timeout)
    await expect(page.locator(selector)).toBeVisible({ timeout });
  }

  static getBrowserName(context) {
    // Robust: as per Playwright docs, use context.browser() [not deprecated!]
    // See: https://playwright.dev/docs/api/class-browsercontext#browser-context-browser
    return context.browser()._name || context.browser()._options?.name || 'unknown';
  }
}

module.exports = TestUtils;
