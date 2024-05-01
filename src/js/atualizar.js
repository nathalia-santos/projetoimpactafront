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

        var mensagemSucesso = document.getElementById("mensagem-sucesso");
        mensagemSucesso.innerText = "Filme atualizado com sucesso!";
        mensagemSucesso.style.display = "block";


        setTimeout(function() {
            mensagemSucesso.style.display = "none";

            window.location.href = "listar_filmes.html";
        }, 3000); 
    })
    .catch(error => {
        console.error('Erro:', error);
        // Exibir mensagem de erro para o usuário
        var mensagemErro = document.getElementById("mensagem-erro");
        mensagemErro.innerText = "Erro ao atualizar o filme. Por favor, tente novamente.";
        mensagemErro.style.display = "block";
    });
}

function cancelarEdicao() {
    window.location.href = "listar_filmes.html";
}
