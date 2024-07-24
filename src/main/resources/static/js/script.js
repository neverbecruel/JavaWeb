document.addEventListener('DOMContentLoaded', function() {
    const machineNameInput = document.getElementById('machineName');
    const machineSectorInput = document.getElementById('machineSector');
    const machineModelInput = document.getElementById('machineModel');
    const machinePatrimonioInput = document.getElementById('machinePatrimonio');
    const addMachineButton = document.getElementById('addMachine');

    function validateForm() {
        return machineNameInput.value.trim() !== '' &&
            machineSectorInput.value.trim() !== '' &&
            machineModelInput.value.trim() !== '' &&
            machinePatrimonioInput.value.trim() !== '';
    }

    function updateButtonState() {
        addMachineButton.disabled = !validateForm();
    }

    machineNameInput.addEventListener('input', updateButtonState);
    machineSectorInput.addEventListener('input', updateButtonState);
    machineModelInput.addEventListener('input', updateButtonState);
    machinePatrimonioInput.addEventListener('input', updateButtonState);

    addMachineButton.addEventListener('click', function() {
        if (!validateForm()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const machineData = {
            name: machineNameInput.value,
            setor: machineSectorInput.value,
            modelo: machineModelInput.value,
            patrimonio: parseInt(machinePatrimonioInput.value),
        };

        fetch('/api/maquinas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(machineData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar máquina');
                }
                return response.json();
            })
            .then(data => {
                if(data === -1){
                    alert("Patrimonio " + parseInt(machinePatrimonioInput.value) + " já existe.")
                }else {
                    // Redirecionar para a página da máquina específica usando o ID retornado
                    window.location.href = `/maquinas/${data}`;
                }

            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao adicionar máquina. Verifique o console para mais detalhes.');
            });
    });

    // Inicializa o estado do botão de envio
    updateButtonState();
});
