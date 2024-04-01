import { test, expect } from '@playwright/test';

// test('is login page', async ({ page }) => {
//   await page.goto('/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle('Front - ServeRest');
//   await expect(page).toHaveURL('/login')
// });

// test('do login', async ({ page }) => {
//   await page.goto('/login');
//   await page.locator('#email').fill('Damion99@yahoo.com');
//   await page.locator('#password').fill('oP1QtzShL5IJp__');
//   await page.getByTestId('entrar').click();

//   await expect(page.getByText('Bem Vindo Rogelio.Ward3', { exact: true })).toBeVisible();

// });

test('do something', async ({ page }) => {
  await page.goto('/admin/home');
  await expect(page.getByText('Bem Vindo Rogelio.Ward3', { exact: true })).toBeVisible();

});
