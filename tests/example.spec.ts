import { test, expect } from '@playwright/test';

test('do something', async ({ page }) => {
  await page.goto('/admin/home');
  await expect(page.getByText('Bem Vindo Fulano da Silva', { exact: true })).toBeVisible();

}
);

test('do something two', async ({ page }) => {
  await page.goto('/admin/home');
  await page.getByTestId('cadastrarUsuarios').click();
  await expect(page.getByText('Cadastro de usuários', { exact: true })).toBeVisible();
}
);