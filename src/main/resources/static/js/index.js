document.addEventListener('DOMContentLoaded', () => {
    const machineNumeroInput = document.getElementById('machineNumero');
    const machineSectorInput = document.getElementById('machineSector');
    const machineModelInput = document.getElementById('machineModel');
    const machinePatrimonioInput = document.getElementById('machinePatrimonio');
    const machineAgulhagemInput = document.getElementById('machineAgulhagem');
    const machineDiametroInput = document.getElementById('machineDiametro');
    const addMachineButton = document.getElementById('addMachine');

    const MAX_PATRIMONIO = 2000000000; // Define the maximum allowed value for patrimonio

    function validateForm() {
        const patrimonio = parseInt(machinePatrimonioInput.value);

        return machineNumeroInput.value.trim() !== '' &&
            machineSectorInput.value.trim() !== '' &&
            machineModelInput.value.trim() !== '' &&
            !isNaN(patrimonio) &&
            patrimonio <= MAX_PATRIMONIO &&
            machineAgulhagemInput.value.trim() !== '' &&
            machineDiametroInput.value.trim() !== '';
    }

    function updateButtonState() {
        addMachineButton.disabled = !validateForm();
    }

    function showAlert(message) {
        alert(message);
    }

    machinePatrimonioInput.addEventListener('input', () => {
        const patrimonio = parseInt(machinePatrimonioInput.value);
        if (patrimonio > MAX_PATRIMONIO) {
            showAlert('Patrimônio cannot be greater than 2 billion.');
        }
        updateButtonState();
    });

    machineNumeroInput.addEventListener('input', updateButtonState);
    machineSectorInput.addEventListener('input', updateButtonState);
    machineModelInput.addEventListener('input', updateButtonState);
    machineAgulhagemInput.addEventListener('input', updateButtonState);
    machineDiametroInput.addEventListener('input', updateButtonState);

    addMachineButton.addEventListener('click', () => {
        if (!validateForm()) {
            const patrimonio = parseInt(machinePatrimonioInput.value);
            if (patrimonio > MAX_PATRIMONIO) {
                showAlert('Patrimônio cannot be greater than 2 billion.');
            } else {
                showAlert('Please fill in all fields correctly.');
            }
            return;
        }

        const machineData = {
            numeroMaquina: parseInt(machineNumeroInput.value),
            setor: machineSectorInput.value,
            modelo: machineModelInput.value,
            patrimonio: parseInt(machinePatrimonioInput.value),
            agulhagem: parseInt(machineAgulhagemInput.value),
            diametro: parseInt(machineDiametroInput.value)
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
                    // Redirect to the machine's page
                    window.location.href = `/maquinas/${result.body}`;
                } else if (result.status === 400) {
                    // Display validation error message
                    showAlert(result.body);
                } else if (result.status === 500) {
                    // Display server error message
                    showAlert("An error occurred while adding the machine. Check the console for details.");
                } else {
                    // Handle unexpected status
                    showAlert("Unexpected response status: " + result.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Error adding machine. Check the console for details.');
            });
    });

    // Initialize button state
    updateButtonState();
});
