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
               
                const botaoEditar = document.createElement('a');
                botaoEditar.innerText = 'Editar';
                botaoEditar.href = "editar_filme.html?id=" + filme.id;
                botaoEditar.classList.add('btn', 'btn-primary', 'me-2');

                const botaoExcluir = document.createElement('button');
                botaoExcluir.innerText = 'Excluir';
                botaoExcluir.classList.add('btn', 'btn-danger');
                botaoExcluir.addEventListener('click', function() {
                excluirFilme(filme.id);
            });


                listItem.appendChild(filmeImage);
                listItem.appendChild(filmeInfo);
                listaFilmes.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
