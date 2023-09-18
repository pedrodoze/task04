document.addEventListener('DOMContentLoaded', function () {
    const nomeForm = document.getElementById('nomeForm');
    const botaoEnviar = document.getElementById('botaoEnviar');
    const mensagem = document.getElementById('mensagem');

    botaoEnviar.addEventListener('click', function () {
        const nomeInput = document.getElementById('nome');
        const idadeInput = document.getElementById('idade');
        const nome = nomeInput.value;
        const idade = idadeInput.value;

        if (nome.trim() === '' || idade.trim() === '') {
            alert('Por favor, preencha todos os campos.');
        } else {
            mensagem.textContent = `Bem-vindo, ${nome}! Sua idade é ${idade}.`;
            nomeInput.value = '';
            idadeInput.value = '';

            // Envie o nome e a idade para o servidor
            fetch('/adicionar-pessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, idade })
            })
            .then(response => {
                if (response.ok) {
                    alert('Nome e idade enviados com sucesso.');
                } else {
                    alert('Erro ao enviar nome e idade. Por favor, tente novamente.');
                }
            })
            .catch(error => {
                console.error('Erro ao enviar nome e idade:', error);
            });
        }
    });

    // Adicione o evento de clique para enviar arquivo
    const botaoEnviarArquivo = document.getElementById('botaoEnviarArquivo');
    botaoEnviarArquivo.addEventListener('click', function () {
        const arquivoInput = document.getElementById('arquivo');
        const arquivo = arquivoInput.files[0];

        if (!arquivo) {
            alert('Por favor, selecione um arquivo.');
            return;
        }

        const formData = new FormData();
        formData.append('arquivo', arquivo);

        // Envie o arquivo usando AJAX ou outra abordagem de sua escolha
        // Por exemplo, você pode usar a função fetch para fazer uma solicitação POST
        // para o servidor com os dados do arquivo.

        fetch('/upload-arquivo', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                // Exiba a mensagem de arquivo enviado com sucesso
                const mensagemArquivoEnviado = document.getElementById('mensagemArquivoEnviado');
                mensagemArquivoEnviado.style.display = 'block';

                // Limpe o campo de seleção de arquivo
                arquivoInput.value = '';
            } else {
                alert('Erro ao enviar arquivo. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao enviar arquivo:', error);
        });
    });

    // Adicione o evento de clique para carregar dados JSON
    const botaoCarregarDados = document.getElementById('botaoCarregarDados');
    const dadosJson = document.getElementById('dadosJson');

    botaoCarregarDados.addEventListener('click', function () {
        // Fazer uma solicitação AJAX para carregar os dados JSON
        fetch('/dados.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro ao carregar os dados JSON.');
                }
            })
            .then(data => {
                // Limpe o conteúdo anterior
                dadosJson.innerHTML = '';

                // Exiba os dados JSON
                data.pessoas.forEach(function (pessoa) {
                    const paragrafo = document.createElement('p');
                    paragrafo.textContent = `Nome: ${pessoa.nome}, Idade: ${pessoa.idade}`;
                    dadosJson.appendChild(paragrafo);
                });
            })
            .catch(error => {
                console.error(error.message);
            });
    });
});
