import { test, expect } from '@playwright/test';
const axios = require('axios');

import utils from '../support/utils';

let dadosUsuarioInserido; 

test.beforeAll(async () => {
  // Carrega os dados do arquivo uma vez antes de todos os testes
  dadosUsuarioInserido = await utils.loadData('usuarioInserido');
});

test.afterAll('Teardown', async () => {
  let userIdDeletar = dadosUsuarioInserido.responseData._id
  
  await axios.delete(`${process.env.URL_BACK}/usuarios/${userIdDeletar}`, {
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
});



test.only('do something', async ({ page }) => {
  await page.goto('/admin/home');
  await expect(page.getByText(`Bem Vindo ${dadosUsuarioInserido.postData.nome}`, { exact: true })).toBeVisible();

}
);

test('do something two', async ({ page }) => {
  await page.goto('/admin/home');
  await page.getByTestId('cadastrarUsuarios').click();
  await expect(page.getByText('Cadastro de usuários', { exact: true })).toBeVisible();
}
);