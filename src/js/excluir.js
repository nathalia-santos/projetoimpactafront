function excluirFilme(idFilme) {
    if (!confirm("Tem certeza que deseja excluir este filme?")) {
        return;
    }

    fetch('http://localhost:3000/movies/' + idFilme, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o filme.');
        }
        // Se a resposta for 204 No Content, retorna uma Promise resolvida com null
        if (response.status === 204) {
            return null;
        }
        return response.json();
    })
    .then(data => {
        console.log('Filme excluído com sucesso:', data);

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
