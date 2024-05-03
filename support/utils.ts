import fs from 'fs';

export async function loadData(file) {
    try {
        const fileData = fs.readFileSync(`fixtures/data/${file}.json`, 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Erro ao carregar os dados do arquivo:', error);
        throw error; 
    }
}


export async function writeFile(file, content) {
    let path = `fixtures/data/${file}.json`;
    fs.writeFile(path, JSON.stringify(content), (err) => {
        if (err) {
            console.error('Erro ao escrever no arquivo:', err);
        } else {
            console.log('Arquivo gravado com sucesso:', path);
        }
    });
}

export default { loadData, writeFile };