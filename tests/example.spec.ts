import { test, expect } from '@playwright/test';
const axios = require('axios');

import { userId } from './globals';


test.afterAll('Teardown', async () => {
  console.log('Done with tests');
  console.log('userIdRECUPERADO:', userId);
  
  await axios.delete(`${process.env.URL_BACK}/usuarios/154134`, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log('Resposta Delete:', response.data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
  console.log('Chegou aqui');
});



test('do something', async ({ page }) => {
  // console.log("URL da variável de ambiente:", process.env.URL);
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