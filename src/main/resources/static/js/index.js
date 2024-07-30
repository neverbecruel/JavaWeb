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
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(result => {
                    if (result.status === 201) {
                        window.location.href = `/maquinas/${result.body}`;
                    } else if (result.status === 400) {
                        showToast(result.body.message);
                    } else if (result.status === 500) {
                        showToast("An error occurred while adding the machine. Check the console for details.");
                    } else {
                        showToast("Unexpected response status: " + result.status);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showToast('Error adding machine. Check the console for details.');
                });
        } else {
            showToast("Por favor, preencha todos os campos.");
        }
    }

    elements.adicionarBotao.addEventListener('click', submitMachineData);
});
