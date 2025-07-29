// Centralized test data/constants for deterministic tests
module.exports = {
  CREDENTIALS: { USER: 'standard_user', PASSWORD: 'secret_sauce' },
  USER_INFO: {
    FIRSTNAME: 'John',
    LASTNAME: 'Doe',
    POSTAL: '12345',
  },
  EXPECTED: {
    INVENTORY_TITLE: 'Products',
    CHECKOUT_COMPLETE: 'Thank you for your order!',
    CART_ITEM_COUNT: 1,
  },
  PRODUCT_NAME_FOR_ADD: 'Sauce Labs Backpack',
};
