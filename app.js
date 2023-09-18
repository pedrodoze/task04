const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do multer para upload de arquivo
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json());

app.post('/upload-arquivo', upload.single('arquivo'), (req, res) => {
    // Processar o upload do arquivo
    res.json({ success: true });
});

app.post('/adicionar-pessoa', (req, res) => {
    const { nome, idade } = req.body;

    // Lê os dados existentes do arquivo JSON
    const dados = require('./public/dados.json');

    // Adiciona a nova pessoa ao array
    dados.pessoas.push({ nome, idade });

    // Escreve os dados atualizados de volta ao arquivo JSON
    fs.writeFileSync('./public/dados.json', JSON.stringify(dados, null, 2));

    res.sendStatus(200); // Responde com status 200 (OK)
});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
