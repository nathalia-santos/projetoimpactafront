document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idFilme = urlParams.get('id');

    if (idFilme) {
        preencherFormulario(idFilme);
    } else {
        console.error('ID do filme não encontrado na URL.');
    }
});

function preencherFormulario(idFilme) {
    fetch('http://localhost:3000/movies/' + idFilme)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do filme.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("nome").value = data.title;
            document.getElementById("duracao").value = data.duration;
            document.getElementById("ano").value = data.year;
            const generos = Array.isArray(data.genres) ? data.genres.join(', ') : data.genres;
            document.getElementById("genero").value = generos;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

function atualizarFilme() {
    const idFilme = new URLSearchParams(window.location.search).get('id');

    if (!idFilme) {
        console.error('ID do filme não encontrado na URL.');
        return;
    }

    const nome = document.getElementById("nome").value;
    const duracao = document.getElementById("duracao").value;
    const ano = document.getElementById("ano").value;
    const genero = document.getElementById("genero").value;

    fetch('http://localhost:3000/movies/' + idFilme, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: nome,
            duration: duracao,
            year: ano,
            genres: genero.split(',').map(gen => gen.trim())
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar o filme.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Filme atualizado com sucesso:', data);
        window.location.href = "listar_filmes.html";
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao atualizar o filme. Por favor, tente novamente.');
    });
}
