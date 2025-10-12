import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

const testSite = 'https://www.saucedemo.com/';
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await page.goto(testSite);
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('successful login', async ({ page }) => {
  loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('unsuccessful login with invalid username', async ({ page }) => {
  loginPage.login('invalid_user', 'secret_sauce');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('unsuccessful login with invalid password', async ({ page }) => {
  loginPage.login('standard_user', 'wrong_password');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('unsuccessful login with empty credentials', async ({ page }) => {
  loginPage.login('', '');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
});

test('unsuccessful login with empty password', async ({ page }) => {
  loginPage.login('standard_user', '');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
});

test('unsuccessful login with empty username', async ({ page }) => {
  loginPage.login('', 'secret_sauce');
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
});

test('logout after successful login', async ({ page }) => {
  loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/.*inventory.html/);
  await loginPage.logout();
  await expect(page).toHaveURL(testSite);
  await expect(loginPage.loginButton).toBeVisible();
});
