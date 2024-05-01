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

                listItem.appendChild(filmeImage);
                listItem.appendChild(filmeInfo);
                listaFilmes.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
