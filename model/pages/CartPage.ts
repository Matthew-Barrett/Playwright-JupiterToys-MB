/*import { Page, Locator } from '@playwright/test';
import Table from './table.ts'; // Adjust the path as necessary

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }*/

/*getProductRow(productName: string): Locator {
  return this.page.locator(`tbody tr:has(td:text-is("${productName}"))`);
}

async getCartProductPrice(productName: string): Promise<number> {
  const productRow = this.getProductRow(productName);
  const priceText = await productRow.locator('td:nth-of-type(2)').textContent();
  return parseFloat(priceText?.replace('$', '') ?? '0');
}

async getCartProductQuantity(productName: string): Promise<number> {
  const productRow = this.getProductRow(productName);
  const quantityText = await productRow.locator('td:nth-of-type(3) input').inputValue();
  return parseInt(quantityText ?? '0', 10);
}

async getProductSubtotal(productName: string): Promise<number> {
  const productRow = this.getProductRow(productName);
  const subtotalText = await productRow.locator('td:nth-of-type(4)').textContent();
  return parseFloat(subtotalText?.replace('$', '') ?? '0');
}

async getTotalPrice(): Promise<number> {
  const totalText = await this.page.locator('.cart-total').textContent();
  return parseFloat(totalText?.replace('$', '') ?? '0');
}*/



/*private async getTable(): Promise<Table> {
  return new Table(this.page.locator('.cart-items'));
}

// ✅ General method to get a value from the table based on Item title and column name
private async getTableValue(title: string, columnName: string): Promise<Locator> {
  return (await this.getTable()).getValue('Item', title, columnName);
}

// ✅ Get price from the cart by item title
async getPrice(title: string): Promise<number> {
  const element = await this.getTableValue(title, 'Price');
  const priceString = await element.innerText();
  return this.parsePrice(priceString);
}

// ✅ Get quantity from the cart by item title
async getQuantity(title: string): Promise<number> {
  const element = await this.getTableValue(title, 'Quantity');
  const quantityString = await element.locator('input').getAttribute('value') as string;
  return parseInt(quantityString, 10);
}

// ✅ Get subtotal from the cart by item title
async getSubtotal(title: string): Promise<number> {
  const element = await this.getTableValue(title, 'Subtotal');
  const subtotalString = await element.innerText();
  return this.parsePrice(subtotalString);
}

// ✅ Helper method to parse price and remove unwanted characters (like $ or commas)
private parsePrice(priceString: string): number {
  return Number.parseFloat(priceString.replace(new RegExp('[^0-9\\.]+'), ''));
}

// ✅ Get total price for the cart (all products)
async getTotalPrice(): Promise<number> {
  const totalElement = await this.page.locator('.total-price');
  const totalText = await totalElement.innerText();
  return this.parsePrice(totalText);
}*/
import { Locator, Page } from '@playwright/test';
import { Product } from './Product';

export class CartPage {
  readonly page: Page;



  constructor(page: Page) {
    this.page = page;
  }

 /* async getParentElement(locator: Locator): Promise<Locator> {
    return locator.locator('..');
  }
*/
  // Method to get the row containing the product by name
  /*private async getRowByProductName(productName: string): Promise<Locator> {
    return this.page.locator(`//tbody/tr[contains(.,'${productName}')]`);
  }
    */
  async getRowByProductName(productName: string): Promise<Locator> {
    const productRow = this.page.locator(`/tr[contains(.,'${productName}')]`);
    //const productRow = await this.getParentElement(cellLocator);
    return productRow;
  }

  

  async getProductPrice(productName: string): Promise<number> {
    const productRow = await this.getRowByProductName(productName);
    const priceText = await productRow.locator(`//td[2]`).textContent();
    //const priceText = await productRow.locator('td:nth-of-type(2)').textContent();
    //const priceText = await productRow.locator('td:nth-of-type(2)').textContent();
    //tbody//tr[contains(.,"Stuffed Frog")]//td[4]
    return parseFloat(priceText?.replace('$', '') ?? '0');
  }

  // Get the quantity of the product in the cart row
  async getProductQuantity(productName: string): Promise<number> {
    const productRow = await this.getRowByProductName(productName);
    const quantityText = await productRow.locator('.cart-item-quantity input').getAttribute('value');
    return Number.parseInt(quantityText ?? '0');
  }

  // Get the subtotal of the product in the cart row
  async getProductSubtotal(productName: string): Promise<number> {
    const productRow = await this.getRowByProductName(productName);
    const subtotalText = await productRow.locator('td:nth-of-type(4)').textContent();
    return parseFloat(subtotalText?.replace('$', '') ?? '0');
  }

  // Verify that the subtotal equals quantity * price for the given product
  async verifyProductSubtotal(productName: string): Promise<boolean> {
    const price = await this.getProductPrice(productName);
    const quantity = await this.getProductQuantity(productName);
    const expectedSubtotal = price * quantity;
    const actualSubtotal = await this.getProductSubtotal(productName);
    return expectedSubtotal === actualSubtotal;
  }
}

// Get the cart table
/*private async getTable(): Promise<Table> {
  return new Table(this.page.locator('.cart-items')); // Adjust locator to your cart table
}

async getPrice(title: string): Promise<number> {
  const element = await (await this.getTable()).getValue('Item', title, 'Price');
  const priceString = await element.innerText();
  return Number.parseFloat(
    priceString.replace(new RegExp('[^0-9\\.]+'), '')
  );
}

async getQuantity(title: string) {
  const element = await (await this.getTable()).getValue('Item', title, 'Quantity');
  const priceString = (await element.locator('input').getAttribute('value')) as string;
  return Number.parseInt(
    priceString
  );
}

async getSubtotal(title: string) {
  const element = await (await this.getTable()).getValue('Item', title, 'Subtotal');
  const priceString = await element.innerText();
  return Number.parseFloat(
    priceString.replace(new RegExp('[^0-9\\.]+'), '')
  );
}

// Get total price for the cart
async getTotalPrice(): Promise<number> {
  const totalLocator = this.page.locator('.total-price'); // Adjust selector as needed
  const totalText = await totalLocator.innerText();
  return this.parsePrice(totalText);
}

private parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/[^\d.-]+/g, ''));
}

}*/
