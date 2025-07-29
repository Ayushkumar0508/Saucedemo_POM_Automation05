// E2E deterministic chain-of-thought POM test for saucedemo.com
const { test, expect } = require('@playwright/test');
const TD = require('../data/TestData');
const ProductListingPage = require('../pages/ProductListingPage');
const TestUtils = require('../utils/TestUtils');

// Chain of Thought Logging Seed: fixed for determinism
const CONTEXT = 'chromium'; // Playwright replaces this by project name

/**
 * Deterministic flow (same every time):
 * - Login
 * - Wait for inventory
 * - Add product
 * - Go to cart, checkout, finish
 * - Screenshots and logging deterministic names
 */
test.describe('Saucedemo Checkout Flow [Chain of Thought][Deterministic]', () => {
  test('User can login, add a product, checkout (chromium/firefox)', async ({ page, browserName }, testInfo) => {
    const context = browserName;
    TestUtils.logStep('Start login', 'Go to /', 'Expect login form', context);

    // Login
    await page.goto('/');
    await page.fill('[data-test="username"]', TD.CREDENTIALS.USER);
    await page.fill('[data-test="password"]', TD.CREDENTIALS.PASSWORD);
    await page.locator('[data-test="login-button"]').click();
    TestUtils.logStep('After login', 'Login submitted', 'Check inventory page loaded', context);

    // Inventory loaded
    const plp = new ProductListingPage(page);
    await plp.assertInventoryLoaded();
    TestUtils.logStep('Inventory', 'Landed on inventory', 'Correct page', context);
    await TestUtils.screenshot(page, `logged-in-${context}.png`);

    // Add to cart
    await plp.addProductToCart(TD.PRODUCT_NAME_FOR_ADD);
    TestUtils.logStep('Add product', 'Clicked cart', 'Should show 1 in cart badge', context);

    // Go to cart
    await plp.goToCart();
    TestUtils.logStep('Cart', 'Navigated to cart', 'On cart page', context);

    // Checkout
    await plp.goToCheckout();
    await plp.fillCheckoutInfo(TD.USER_INFO);

    // Finish checkout
    await plp.finishCheckout();
    TestUtils.logStep('Checkout done', 'Complete order', 'Thank you page', context);
    expect(await page.locator('.complete-header').textContent()).toContain('Thank you');
  });
});
