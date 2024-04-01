import { test as setup, expect } from '@playwright/test';
import { log } from 'console';

const authFile = 'fixtures/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/');
  await page.locator('#email').fill('beltrano@qa.com.br');
  await page.locator('#password').fill('teste');
  await page.getByTestId('entrar').click();
  
  await page.waitForURL('https://front.serverest.dev/admin/home');
  await expect(page.getByText('Bem Vindo Fulano da Silva', { exact: true })).toBeVisible();

 
//Guardar o estado de autenticação no arquivo .auth/user.json
  await page.context().storageState({ path: authFile });
  console.log('authFile:', authFile);
  console.log('Context storageState:', await page.context().storageState());
});