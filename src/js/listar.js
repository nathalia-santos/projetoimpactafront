document.addEventListener('DOMContentLoaded', function() {
    const listaFilmes = document.getElementById('lista-filmes');

    fetch('http://localhost:3000/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
          
            data.forEach(filme => {
                const listItem = document.createElement('li');
                const filmeInfo = document.createElement('div');
                const filmeImage = document.createElement('img');

                filmeImage.src = filme.imageUrl;
                filmeImage.alt = filme.title + ' Imagem';
                filmeImage.width = 100; 

                filmeInfo.innerHTML = "<p><strong>Título:</strong> " + filme.title + "</p>" +
                                       "<p><strong>Ano:</strong> " + filme.year + "</p>" +
                                       "<p><strong>Gênero:</strong> " + filme.genres.join(', ') + "</p>";
               
                const botaoEditar = criarBotaoEditar(filme.id);
                const botaoExcluir = criarBotaoExcluir(filme.id);
                       
                filmeInfo.appendChild(botaoEditar);
                filmeInfo.appendChild(botaoExcluir);


                listItem.appendChild(filmeImage);
                listItem.appendChild(filmeInfo);
                listaFilmes.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});


function criarBotaoEditar(idFilme) {
    const botaoEditar = document.createElement('a');
    botaoEditar.innerText = 'Editar';
    botaoEditar.href = "atualizar.html?id=" + idFilme;
    botaoEditar.classList.add('btn', 'btn-primary', 'me-2');
    return botaoEditar;
}


function criarBotaoExcluir(idFilme) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.classList.add('btn', 'btn-danger');
    botaoExcluir.addEventListener('click', function() {
        excluirFilme(idFilme);
    });
    return botaoExcluir;
}
