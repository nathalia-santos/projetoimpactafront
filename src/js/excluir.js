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
        return response.json();
    })
    .then(data => {
        console.log('Filme excluído com sucesso:', data);
        document.getElementById("mensagemSucesso").innerText = "Filme excluído com sucesso!";
        document.getElementById("mensagemSucesso").style.display = "block";
        document.getElementById("mensagemErro").style.display = "none";
        setTimeout(function() {
            window.location.href = "listar.html";
        }, 3000);
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById("mensagemErro").innerText = "Erro ao excluir o filme. Por favor, tente novamente.";
        document.getElementById("mensagemErro").style.display = "block";
        document.getElementById("mensagemSucesso").style.display = "none";
    });
}
