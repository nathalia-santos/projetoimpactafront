document.addEventListener('DOMContentLoaded', function() {
            // Seletor movido para dentro do evento DOMContentLoaded
            const filmeForm = document.getElementById('filmeForm');

            // Adiciona um ouvinte de evento para o envio do formulário
            filmeForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Impede o envio padrão do formulário

                // Obtém os elementos do formulário
                const { nome, duracao, ano, genero } = filmeForm.elements;

                // Cria o objeto filme com os valores dos campos
                const filme = {
                    title: nome.value,
                    duration: duracao.value,
                    year: ano.value,
                    genres: [genero.value]
                };

                console.log("Filme cadastrado:", filme);
                
        // Envia os dados do filme para o backend
        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filme)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Faça algo com os dados recebidos do backend, se necessário
            console.log(data);
        })
        .catch(error => {
            // Trate os erros que possam ocorrer durante a requisição
            console.error('Erro:', error);
        });
    });
});