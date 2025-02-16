import { test, expect } from '@playwright/test';
import { HomePage } from '../model/pages/HomePage';
import { DataProperties } from '../properties/dataProperties.ts';


test.describe('Contact Form Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
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


    test('Submit form successfully', async ({ page, context }) => {
        const homePage = new HomePage(page);
        const contactPage = await homePage.goToContact();
        await contactPage.enterForename('Forename');
        await contactPage.enterEmail('email@email.com');
        await contactPage.enterMessage('Test Message');
        await contactPage.submitForm();
        const successMessage = await contactPage.getSuccessMessage();
        expect(successMessage).toContain('Thanks Forename, we appreciate your feedback.');
    });

});