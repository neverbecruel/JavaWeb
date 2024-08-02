document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        numero: document.getElementById('machineNumero'),
        setor: document.getElementById('machineSector'),
        modelo: document.getElementById('machineModel'),
        patrimonio: document.getElementById('machinePatrimonio'),
        agulhagem: document.getElementById('machineAgulhagem'),
        diametro: document.getElementById('machineDiametro'),
        adicionarBotao: document.getElementById('addMachine')
    };

    const toast = document.getElementById('toast');
    const MAX_PATRIMONIO = 2000000000;

    function validateFields() {
        let isValid = true;

        // Hide all error messages initially
        // Validate each field and show the relevant error message
        if (elements.numero.value.trim() === '') {
            isValid = false;
        } else if (elements.setor.value.trim() === '') {
            isValid = false;
        } else if (elements.modelo.value.trim() === '') {
            isValid = false;
        } else {
            const patrimonio = parseInt(elements.patrimonio.value);
            if (isNaN(patrimonio) || patrimonio > MAX_PATRIMONIO) {
                isValid = false;
            } else if (elements.agulhagem.value.trim() === '') {
                isValid = false;
            } else if (elements.diametro.value.trim() === '') {
                isValid = false;
            }
        }
        return isValid;
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000); // Hide the toast after 3 seconds
    }

    function submitMachineData() {
        if (validateFields()) {
            const machineData = {
                numeroMaquina: parseInt(elements.numero.value),
                setor: elements.setor.value,
                modelo: elements.modelo.value,
                patrimonio: parseInt(elements.patrimonio.value),
                agulhagem: parseInt(elements.agulhagem.value),
                diametro: parseInt(elements.diametro.value)
            };

            fetch('/api/maquinas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machineData),
            })
                .then(response => response.text().then(text => {
                    try {
                        return { status: response.status, body: JSON.parse(text) };
                    } catch (e) {
                        return { status: response.status, body: text };
                    }
                }))
                .then(result => {
                    switch (result.status) {
                        case 201:
                            window.location.href = `/maquinas/${result.body}`;
                            break;
                        case 400:
                            showToast(result.body);
                            break;
                        case 500:
                            showToast("Ocorreu um erro ao adicionar a máquina. Verifique o console para mais detalhes.");
                            break;
                        default:
                            showToast("Status inesperado: " + result.status);
                            break;
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar máquina. Status:', error.status || 'Desconhecido', 'Mensagem:', error.message);
                    showToast('Erro ao adicionar máquina. Verifique o console para mais detalhes.');
                });
        } else {
            showToast("Por favor, preencha todos os campos.");
        }
    }



    elements.adicionarBotao.addEventListener('click', submitMachineData);
});
