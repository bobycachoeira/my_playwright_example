import { test as setup, expect } from '@playwright/test';
const axios = require('axios');
import { faker } from '@faker-js/faker';



import utils from '../../support/utils';

const authFile = 'fixtures/.auth/user.json';

setup('authenticate', async ({ page }) => {
  //cria usuário para login
  // Dados a serem enviados
  const postData = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'teste',
    administrador: 'true'
  };
  console.log('Usuário a ser inserido:', postData);


  await axios.post(`${process.env.URL_BACK}/usuarios`, postData)
    .then(response => {
      const responseData = response.data;
      const dadosUsuarioInserido = {
        postData,
        responseData
      }
      utils.writeFile('usuarioInserido', dadosUsuarioInserido)
      console.log('Usuário inserido com sucesso: ', responseData);
    })
    .catch(error => {
      console.error('Erro ao inserir usuário: ', error.response.status);
      console.error('Data: ', error.response.data);
    });

  //Agora faz o login para guardar os dados
  await page.goto('/');
  await page.locator('#email').fill(postData.email);
  await page.locator('#password').fill('teste');
  await page.getByTestId('entrar').click();

  await page.waitForURL('/admin/home');
  await expect(page.getByText(`Bem Vindo ${postData.nome}`, { exact: true })).toBeVisible();


  //Guardar o estado de autenticação no arquivo .auth/user.json
  await page.context().storageState({ path: authFile });
});