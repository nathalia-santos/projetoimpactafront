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
                                      "<p><strong>Duração:</strong> " + filme.duration + " minutos</p>" +
                                       "<p><strong>Ano:</strong> " + filme.year + "</p>" +
                                       "<p><strong>Gênero:</strong> " + filme.genres.join(', ') + "</p>";
               
                const botaoEditar = criarBotaoEditar(filme.id);
                const botaoExcluir = criarBotaoExcluir(filme.id);
                       
                filmeInfo.appendChild(botaoEditar);
                filmeInfo.appendChild(botaoExcluir);


                listItem.appendChild(filmeImage);
                listItem.appendChild(filmeInfo);
                listaFilmes.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});


function criarBotaoEditar(idFilme) {
    const botaoEditar = document.createElement('a');
    botaoEditar.innerText = 'Editar';
    botaoEditar.href = "atualizar.html?id=" + idFilme;
    botaoEditar.classList.add('btn', 'btn-primary', 'me-2');
    return botaoEditar;
}

function criarBotaoExcluir(idFilme) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.classList.add('btn', 'btn-danger', 'delete-btn');
    botaoExcluir.addEventListener('click', async event =>{
        if(event.target.classList.contains("delete-btn")){
             if(confirm(`Tem certeza que deseja excluir o item ${idFilme}?`)){
                await fetch(`http://localhost:3000/movies/delete/${idFilme}`, { 
                    method: 'DELETE',
                    headers: {
                        'Cache-Control': 'no-cache'
                      } 
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao excluir o item.');
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
        }
    })

    return botaoExcluir;
}
