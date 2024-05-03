import { test as teardown } from '@playwright/test';
import utils from '../support/utils';
import axios from 'axios';

let dadosUsuarioInserido; 

teardown('clean database', async ({ }) => {
    dadosUsuarioInserido = await utils.loadData('usuarioInserido');
    let userIdDeletar = dadosUsuarioInserido.responseData._id
  
  await axios.delete(`${process.env.URL_BACK}/usuarios/${userIdDeletar}`, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log('Resposta Deleção usuário:', response.data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
});