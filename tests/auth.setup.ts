import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page.locator('#email').fill('beltrano@qa.com.br');
  await page.locator('#password').fill('teste');
  await page.getByTestId('entrar').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://front.serverest.dev/admin/home');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText('Bem Vindo Rogelio.Ward3', { exact: true })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});