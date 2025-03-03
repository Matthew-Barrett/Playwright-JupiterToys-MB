import { type Locator, type Page, } from '@playwright/test';
import { UrlProperties } from '../../properties/urlProperties.ts';
import { LocatorProperties } from '../../properties/locatorProperties.ts';

export class ContactPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToContactPage() {
        await this.page.goto(UrlProperties.CONTACT);
    }

    async enterForename(forename: string) {
        await this.page.locator(LocatorProperties.forenameInput).fill(forename);
    }

    async enterEmail(email: string) {
        await this.page.locator(LocatorProperties.emailInput).fill(email);
    }

    async enterMessage(message: string) {
        await this.page.locator(LocatorProperties.messageInput).fill(message);
    }

    async submitForm() {
        await this.page.locator(LocatorProperties.contactSubmitButton).click();
    }

    async getForenameError(): Promise<string> {
        return (await this.page.locator(LocatorProperties.forenameError).innerText()) ?? "";
    }

    async getEmailError(): Promise<string> {
        return (await this.page.locator(LocatorProperties.emailError).innerText()) ?? "";
    }

    async getMessageError(): Promise<string> {
        return (await this.page.locator(LocatorProperties.messageError).innerText()) ?? "";
    }

    async getSuccessMessage(): Promise<string> {
        return (await this.page.locator(LocatorProperties.successMessage).innerText());
    }

    /*async goBackButton() {
        return this.page.locator('button:has-text("Back")');
    }*/

    async isForenameErrorAbsent(): Promise<boolean> {
        return !(await this.page.locator(LocatorProperties.forenameError).isVisible());
    }

    async isEmailErrorAbsent(): Promise<boolean> {
        return !(await this.page.locator(LocatorProperties.emailError).isVisible());
    }

    async isMessageErrorAbsent(): Promise<boolean> {
        return !(await this.page.locator(LocatorProperties.messageError).isVisible());
    }
}

