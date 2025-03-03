import { type Locator, type Page, } from '@playwright/test';
import { UrlProperties } from '../../properties/urlProperties.ts';
import { LocatorProperties } from '../../properties/locatorProperties.ts';
import { LoginDialog } from './LoginDialog';
import { ContactPage } from './ContactPage';
import { ShopPage } from './ShopPage';
import { CartPage } from './CartPage';

export class HomePage {
    private page: Page;
    /*constructor(page: Page, context: BrowserContext) {
        super(page, context);

    }*/
    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto(UrlProperties.BASE_URL);
        return new HomePage(this.page);
    }


    async openLoginDialog(): Promise<LoginDialog> {
        await this.page.locator(LocatorProperties.loginButton).click();
        await this.page.locator(LocatorProperties.loginDialog).waitFor();
        return new LoginDialog(this.page);
    }

    async goToShop() {
        await this.page.locator(LocatorProperties.shopButton).click();
        return new ShopPage(this.page);
    }


    async goToContact() {
        await this.page.locator(LocatorProperties.contactButton).click();
        return new ContactPage(this.page);
    }

    async goToCart() {
        await this.page.locator(LocatorProperties.cartButton).click();
        return new CartPage(this.page);
    }
}
