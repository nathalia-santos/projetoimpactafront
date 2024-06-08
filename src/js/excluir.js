function excluirFilme(idFilme) {
    if (!confirm("Tem certeza que deseja excluir este filme?")) {
        return;
    }

    console.log('Iniciando exclusão do filme com ID:', idFilme);

    fetch('http://localhost:3000/movies/' + idFilme, {
        method: 'DELETE'
    })
    .then(response => {
        console.log('Resposta recebida do servidor:', response);
        if (!response.ok) {
            throw new Error('Erro ao excluir o filme.');
        }
        if (response.status === 204) {
            console.log('Nenhum conteúdo retornado.');
            return null;
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);

        const mensagemSucesso = document.getElementById("mensagemSucesso");
        const mensagemErro = document.getElementById("mensagemErro");

        if (mensagemSucesso) {
            mensagemSucesso.innerText = "Filme excluído com sucesso!";
            mensagemSucesso.style.display = "block";
        }

        if (mensagemErro) {
            mensagemErro.style.display = "none";
        }

        setTimeout(function() {
            window.location.href = "listar.html";
        }, 3000);
    })
    .catch(error => {
        console.error('Erro:', error);

        const mensagemErro = document.getElementById("mensagemErro");
        const mensagemSucesso = document.getElementById("mensagemSucesso");

        if (mensagemErro) {
            mensagemErro.innerText = "Erro ao excluir o filme. Por favor, tente novamente.";
            mensagemErro.style.display = "block";
        }

        if (mensagemSucesso) {
            mensagemSucesso.style.display = "none";
        }
    });
}
