import { test, expect } from '@playwright/test';
import { HomePage } from '../model/pages/homePage';
import { UrlProperties } from '../properties/urlProperties.ts';
import {LoginDialog } from '../model/pages/LoginDialog.ts';
import { DataProperties } from '../properties/dataProperties.ts';


/*
test.describe('Login Dialog Tests', () => {
    let homePage: HomePage;
  
    test.beforeEach(async ({ page, context }) => {
      homePage = new HomePage(page, context);
      await homePage.navigateToHomePage(); // Ensure every test starts on the homepage
    });

    test('Login with valid credentials', async ({ page }) => {
        const loginDialog: LoginDialog = await homePage.openLoginDialog();
      await loginDialog.enterUsername(DataProperties.validUsername);
      await loginDialog.enterPassword(DataProperties.validPassword);
      await loginDialog.submitLogin();
     // const user = await homePage.getUser();
      //(user).toBe(DataProperties.validUsername);
  
     // expect(await loginDialog.isLogoutButtonVisible()).toBeTruthy();
    });
  
    test('Login with invalid credentials', async ({ page }) => {
        const loginDialog: LoginDialog = await homePage.openLoginDialog();
      await loginDialog.enterUsername(DataProperties.invalidUsername);
      await loginDialog.enterPassword(DataProperties.invalidPassword);
      await loginDialog.submitLogin();
  
      const errorMessage = await loginDialog.getLoginErrorMessage();
      expect(errorMessage).toContain('Your login details are incorrect');
    });
});

*/