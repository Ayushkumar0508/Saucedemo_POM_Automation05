// Page Object for Inventory & Cart for saucedemo.com
// Implements POM with SOLID, all selectors real, code deterministic
const { expect } = require('@playwright/test');
const TestUtils = require('../utils/TestUtils');
const TD = require('../data/TestData');

class ProductListingPage {
  constructor(page) {
    this.page = page;
    // Inventory
    this.title = '.title';
    this.inventoryContainer = '.inventory_list';
    this.productName = (name) => `//div[@class='inventory_item_name' and text()='${name}']`;
    this.addToCartBtn = (name) => `//*[text()='${name}']/../../..//button[contains(@data-test,'add-to-cart')]`;
    // Cart
    this.cartIcon = '.shopping_cart_link';
    this.cartBadge = '.shopping_cart_badge';
    this.cartItem = '.cart_item';
    this.checkoutBtn = '[data-test="checkout"]';
    // Checkout
    this.firstNameInput = '[data-test="firstName"]';
    this.lastNameInput = '[data-test="lastName"]';
    this.postalInput = '[data-test="postalCode"]';
    this.continueBtn = '[data-test="continue"]';
    this.finishBtn = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  async assertInventoryLoaded() {
    await TestUtils.waitForSelectorDeterministic(this.page, this.title);
    await expect(this.page.locator(this.title)).toHaveText(TD.EXPECTED.INVENTORY_TITLE);
  }

  async addProductToCart(productName) {
    await TestUtils.logStep('Add product', 'Click add to cart for product', '', 'InventoryPage');
    await this.page.locator(this.addToCartBtn(productName)).click();
    await expect(this.page.locator(this.cartBadge)).toHaveText('1');
  }

  async goToCart() {
    await this.page.locator(this.cartIcon).click();
    await TestUtils.waitForSelectorDeterministic(this.page, this.cartItem);
  }

  async goToCheckout() {
    await this.page.locator(this.checkoutBtn).click();
    await TestUtils.waitForSelectorDeterministic(this.page, this.firstNameInput);
  }

  async fillCheckoutInfo(userInfo) {
    await this.page.fill(this.firstNameInput, userInfo.FIRSTNAME);
    await this.page.fill(this.lastNameInput, userInfo.LASTNAME);
    await this.page.fill(this.postalInput, userInfo.POSTAL);
    await this.page.locator(this.continueBtn).click();
  }

  async finishCheckout() {
    await this.page.locator(this.finishBtn).click();
    await expect(this.page.locator(this.completeHeader)).toHaveText(TD.EXPECTED.CHECKOUT_COMPLETE, { timeout: 15000 });
  }
}

module.exports = ProductListingPage;
