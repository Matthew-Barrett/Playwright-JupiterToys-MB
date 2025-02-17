import { Page, Locator } from '@playwright/test';
import { CartPage } from './CartPage';
import { Product } from './Product.ts';

export class ShopPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  getProduct(productName: string): Product {
    const productElement = this.page.locator(`li.product:has(h4:text-is("${productName}"))`);
    return new Product(this.page, productName, productElement);
  }

  async goToCart() {
    await this.page.locator('#nav-cart > a').click();
    return new CartPage(this.page);
  }
}