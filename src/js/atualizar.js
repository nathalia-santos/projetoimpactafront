function atualizarFilme() {

    var nome = document.getElementById("nome").value;
    var duracao = document.getElementById("duracao").value;
    var ano = document.getElementById("ano").value;
    var genero = document.getElementById("genero").value;

    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            duracao: duracao,
            ano: ano,
            genero: genero
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar o filme.');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("mensagem-sucesso").style.display = "block";
        setTimeout(function() {
            document.getElementById("mensagem-sucesso").style.display = "none";
            window.location.href = "listar.html";
        }, 10000); 
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById("mensagem-erro").style.display = "block";
    });
}

function cancelarAtualizacao() {
    window.location.href = "listar.html";
}
