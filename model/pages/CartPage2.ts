
import { Locator, Page } from '@playwright/test';
import { Product } from './Product';

export class CartPage2 {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Method to get the row containing the product by name
  async getProductRow(productName: string): Promise<Locator> {
    return this.page.locator(`tbody tr:has-text("${productName}")`);
  }

  // Returns a Product instance for a cart item
  async getProductInCart(productName: string): Promise<Product> {
    const productRow = await this.getProductRow(productName);
    return new Product(this.page, productName, productRow);
  }

  // Get the price of the product in the cart row
  async getProductPrice(productName: string): Promise<number> {
    const product = await this.getProductInCart(productName);
    const priceText = await product.productElement.locator('td:nth-of-type(2)').textContent();
    return parseFloat(priceText?.replace(new RegExp('[^0-9\\.]+'), '') ?? '0');
  }

  // Get the quantity of the product in the cart row
  async getProductQuantity(productName: string): Promise<number> {
    const product = await this.getProductInCart(productName);
    const quantityText = await product.productElement.locator('.input-mini').getAttribute('value');
    return parseFloat(quantityText?.replace(new RegExp('[^0-9\\.]+'), '') ?? '0');
  }

  // Get the subtotal of the product in the cart row
  async getProductSubtotal(productName: string): Promise<number> {
    const product = await this.getProductInCart(productName);
    const subtotalText = await product.productElement.locator('td:nth-of-type(4)').textContent();
    return parseFloat(subtotalText?.replace(new RegExp('[^0-9\\.]+'), '') ?? '0');
  }

  // Verify that the subtotal equals quantity * price for the given product
  async verifyProductSubtotal(productName: string): Promise<boolean> {
    const price = await this.getProductPrice(productName);
    const quantity = await this.getProductQuantity(productName);
    const expectedSubtotal = price * quantity;
    const actualSubtotal = await this.getProductSubtotal(productName);
    return expectedSubtotal === actualSubtotal;
  }
  async getTotalPrice(): Promise<number> {
    const totalElement = await this.page.locator('.total');
    const totalText = await totalElement.innerText();
    return this.parsePrice(totalText);
  }
  private parsePrice(priceString: string): number {
    return parseFloat(priceString.replace(/[^\d.-]+/g, ''));
  }
  
}