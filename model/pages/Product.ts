import { Locator, Page } from '@playwright/test';

export class Product {
  readonly page: Page;
  readonly productName: string;
  readonly productElement: Locator;


  constructor(page: Page, productName: string, productElement: Locator) {
    this.page = page;
    this.productName = productName;
    this.productElement = productElement;
  }

   async getPrice(): Promise<number> {
    const priceText = await this.productElement.locator('.product-price').textContent();
    if (priceText) {
      return parseFloat(priceText.replace('$', '').trim());
    }
    return 0;
  }

  async buy(quantity: number) {
    for (let i = 0; i < quantity; i++) {
      await this.productElement.locator('a:text-is("Buy")').click();
    }
  }
}