import { test, expect, chromium } from '@playwright/test';
import { HomePage } from '../model/pages/HomePage';
import { DataProperties } from '../properties/dataProperties.ts';


test.describe('Contact Form Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page, browser }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    })

    test('Verify required field errors', async ({ page, context }) => {
        const homePage = new HomePage(page);
        const contactPage = await homePage.goToContact();
        await contactPage.submitForm();
        expect(await contactPage.getForenameError()).toContain(DataProperties.foreNameError);
        expect(await contactPage.getEmailError()).toContain(DataProperties.emailError);
        expect(await contactPage.getMessageError()).toContain(DataProperties.messageError);
        await contactPage.enterForename('Forename');
        await contactPage.enterEmail('email@email.com');
        await contactPage.enterMessage('Test Message');
        expect(await contactPage.isForenameErrorAbsent()).toBe(true);
        expect(await contactPage.isEmailErrorAbsent()).toBe(true);
        expect(await contactPage.isMessageErrorAbsent()).toBe(true);
    });


    test.describe('Submit form successfully - Repeated 5 Times', () => {
        for (let i = 0; i < 5; i++) {
            test(`Iteration ${i + 1}: Submit form successfully`, async ({ browser }) => {
                const context = await browser.newContext();
                const page = await context.newPage();
                const homePage = new HomePage(page);
                await homePage.navigateToHomePage();
                const contactPage = await homePage.goToContact();
                await contactPage.enterForename('Forename');
                await contactPage.enterEmail('email@email.com');
                await contactPage.enterMessage('Test Message');
                await contactPage.submitForm();
                await page.waitForSelector('.popup', { state: 'hidden' });
                const successMessage = await contactPage.getSuccessMessage();
                expect(successMessage).toContain('Thanks Forename, we appreciate your feedback.');
                await context.close();
            });
        }
    });

});