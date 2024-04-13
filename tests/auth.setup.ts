import { test as setup, expect } from '@playwright/test';
const axios = require('axios');
import { faker } from '@faker-js/faker';



import { setUserId } from './globals';

const authFile = 'fixtures/.auth/user.json';

setup('authenticate', async ({ page }) => {
  //cria usuário para login
    // Dados a serem enviados
    console.log("URL da variável de ambiente:", process.env.URL);
    const postData = {
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'teste',
      administrador: 'true'
    };
    console.log('PostData:', postData);


  await axios.post(`${process.env.URL_BACK}/usuarios`, postData)
  .then(response => {
    console.log('Resposta do servidor:', response.data);
    console.log('Response Code:', response.status);
    setUserId(response.data._id);    
  })
  .catch(error => {
    console.error('Erro ao fazer a requisição:', error.response.status);
    console.error('Data:', error.response.data);
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
  console.log('authFile:', authFile);
});