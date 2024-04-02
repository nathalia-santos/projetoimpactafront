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
                listItem.textContent = filme.title + ' - ' + filme.year;
                listaFilmes.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
