document.addEventListener('DOMContentLoaded', function() {
            const filmeForm = document.getElementById('filmeForm');

            filmeForm.addEventListener('submit', function(event) {
                event.preventDefault(); 

                const { nome, duracao, ano, genero } = filmeForm.elements;
                const filme = {
                    title: nome.value,
                    duration: duracao.value,
                    year: ano.value,
                    genres: [genero.value]
                };

                console.log("Filme cadastrado:", filme);
                
        
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
            
            filmeForm.style.display = 'none';
            
          
            mensagemCadastro.style.display = 'block';
            setTimeout(function() {
                
                mensagemCadastro.style.display = 'none';
                window.location.href = window.location.href;
            }, 5000); 
            console.log(data);
        })
        .catch(error => {
            
            console.error('Erro:', error);
        });
    });
});