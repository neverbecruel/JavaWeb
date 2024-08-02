document.addEventListener('DOMContentLoaded', function() {
    const buscaButton = document.getElementById("buscarMaquina");

    buscaButton.addEventListener("click", function() {
        const patrimonioInput = document.getElementById("patrimonio");
        const patrimonio = patrimonioInput.value.trim();

        if (patrimonio === '') {
            showToast("O campo de patrimônio está vazio. Por favor, insira um número de patrimônio.");
            return;
        }

        fetch(`/api/getIdbyPat/${patrimonio}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        showToast("Máquina não encontrada.")
                    } else {
                        throw new Error(`Erro ao buscar a máquina. Código de status: ${response.status}.`);
                    }
                }
                return response.json();
            })
            .then(id => {
                if (id) {
                    // Redireciona para a página da máquina com o ID
                    window.location.href = `/maquinas/${id}`;
                } else {
                    // Caso não haja ID retornado (o que não deve acontecer com uma resposta 200)
                    showToast("Nenhum ID retornado. Verifique se o patrimônio está correto.");
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    });

    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); // Oculta o toast após 3 segundos
    }
});
