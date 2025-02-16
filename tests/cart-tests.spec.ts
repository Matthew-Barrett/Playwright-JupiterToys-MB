import { test, expect } from '@playwright/test';
import { ShopPage } from '../model/pages/ShopPage';
import { CartPage2 } from '../model/pages/CartPage2';
import { HomePage } from '../model/pages/HomePage';


test.describe('Contact Form Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  })

  test('Buy multiple products with different quantities and verify totals', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage2(page);
    const shopPage = new ShopPage(page);
    await homePage.navigateToHomePage();
    await homePage.goToShop();
    const funnyCow = shopPage.getProduct('Valentine Bear');
    const funnyCowPrice = await funnyCow.getPrice();
    const fluffyBunny = shopPage.getProduct('Fluffy Bunny');
    const fluffyBunnyPrice = await fluffyBunny.getPrice();
    const stuffedFrog = shopPage.getProduct('Stuffed Frog');
    const stuffedFrogPrice = await stuffedFrog.getPrice();
    await funnyCow.buy(2);
    await fluffyBunny.buy(3);
    await stuffedFrog.buy(1)
    await shopPage.goToCart();
    await cartPage.getProductInCart('Valentine Bear');
    await cartPage.getProductInCart('Fluffy Bunny');
    await cartPage.getProductInCart('Stuffed Frog');

    const cartFunnyCowPrice = (await cartPage.getProductPrice('Valentine Bear'));
    expect(cartFunnyCowPrice).toEqual(funnyCowPrice);
    const cartFluffyBunnyPrice = (await cartPage.getProductPrice('Fluffy Bunny'));
    expect(cartFluffyBunnyPrice).toEqual(fluffyBunnyPrice);
    const cartStuffedFrogPrice = (await cartPage.getProductPrice('Stuffed Frog'));
    expect(cartStuffedFrogPrice).toEqual(stuffedFrogPrice);



    const items = [
      { name: 'Valentine Bear', quantity: 3 },
      { name: 'Fluffy Bunny', quantity: 5 },
      { name: 'Stuffed Frog', quantity: 2 },
    ];

    let expectedTotal = 0;

    for (const item of items) {
      const cartPrice = await cartPage.getProductPrice(item.name);
      const cartQty = await cartPage.getProductQuantity(item.name);
      const cartSubtotal = await cartPage.getProductSubtotal(item.name);

      expect(cartSubtotal).toEqual(cartPrice * cartQty);

      expectedTotal += cartSubtotal;
    }

    expect(await cartPage.getTotalPrice()).toEqual(expectedTotal);
  });

});