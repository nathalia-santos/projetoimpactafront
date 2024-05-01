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
            document.getElementById("nome").value = data.nome;
            document.getElementById("duracao").value = data.duracao;
            document.getElementById("ano").value = data.ano;
            document.getElementById("genero").value = data.genero;
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
