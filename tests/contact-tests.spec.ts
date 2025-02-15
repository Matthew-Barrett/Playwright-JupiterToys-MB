import { test, expect } from '@playwright/test';
import { HomePage } from '../model/pages/homePage';
import { DataProperties } from '../properties/dataProperties.ts';


test.describe('Contact Form Tests', () => {
    let homePage: HomePage;

    /*async function repeatTest(times: number, testFn: (i: number) => Promise<void>) {
        for (let i = 1; i <= times; i++) {
            await testFn(i);
        }
    }*/

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
    });

    test('Verify required field errors', async ({ page, context }) => {
        const contactPage = await homePage.goToContact();
        await contactPage.submitForm();
        expect(await contactPage.getForenameError()).toContain(DataProperties.foreNameError);
        expect(await contactPage.getEmailError()).toContain(DataProperties.emailError);
        expect(await contactPage.getMessageError()).toContain(DataProperties.messageError);
        await contactPage.enterForename('Forename');
        await contactPage.enterEmail('email@email.com');
        await contactPage.enterMessage('Test Message');
        //(await contactPage.getForenameError()).toBe('');
        //(await contactPage.getEmailError()).toBe('');
        //(await contactPage.getMessageError()).toBe('');
        expect(await contactPage.isForenameErrorAbsent()).toBe(true);
        expect(await contactPage.isEmailErrorAbsent()).toBe(true);
        expect(await contactPage.isMessageErrorAbsent()).toBe(true);
    });


    // for (let i = 0; i < 5; i++) {
    test('Submit form successfully'/* + i*/, async ({ page, context }) => {
        const contactPage = await homePage.goToContact();
        await contactPage.enterForename('Forename');
        await contactPage.enterEmail('email@email.com');
        await contactPage.enterMessage('Test Message');
        await contactPage.submitForm();
        const successMessage = await contactPage.getSuccessMessage();
        expect(successMessage).toContain('Thanks Forename, we appreciate your feedback.');
        /*try {
            //await page.waitForTimeout(50000)
            // const backButton = page.getByRole('button', { name: 'Back' });
            await (await contactPage.goBackButton()).click();
        } catch (error) {
            console.log(error);
        }*/
    });
    //}
});