import { type Page } from '@playwright/test';
import { LocatorProperties } from '../../properties/locatorProperties.ts';


export class LoginDialog {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async enterUsername(username: string) {
        await this.page.locator(LocatorProperties.usernameInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(LocatorProperties.passwordInput).fill(password);
    }

    async submitLogin() {
        await this.page.locator(LocatorProperties.loginSubmitButton).click();
    }

    async isLogoutButtonVisible(): Promise<boolean> {
        return await this.page.locator(LocatorProperties.logoutButton).isVisible();
    }


    async getLoginErrorMessage(): Promise<string> {
        const element = await this.page.locator(LocatorProperties.loginErrorMessage);
        return await element.evaluate(el => el.textContent?.trim() || "");
    }

}