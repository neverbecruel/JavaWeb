document.addEventListener('DOMContentLoaded', () => {
    const machineNumeroInput = document.getElementById('machineNumero');
    const machineSectorInput = document.getElementById('machineSector');
    const machineModelInput = document.getElementById('machineModel');
    const machinePatrimonioInput = document.getElementById('machinePatrimonio');
    const machineAgulhagemInput = document.getElementById('machineAgulhagem');
    const machineDiametroInput = document.getElementById('machineDiametro');
    const addMachineButton = document.getElementById('addMachine');

    const MAX_PATRIMONIO = 2000000000;

    function validateFields() {
        if (machineNumeroInput.value.trim() === '') {
            showAlert('Machine number is required.');
            machineNumeroInput.focus();
            return false;
        }
        if (machineSectorInput.value.trim() === '') {
            showAlert('Machine sector is required.');
            machineSectorInput.focus();
            return false;
        }
        if (machineModelInput.value.trim() === '') {
            showAlert('Machine model is required.');
            machineModelInput.focus();
            return false;
        }
        const patrimonio = parseInt(machinePatrimonioInput.value);
        if (isNaN(patrimonio) || patrimonio > MAX_PATRIMONIO) {
            showAlert('Patrimônio must be a number and cannot be greater than 2 billion.');
            machinePatrimonioInput.focus();
            return false;
        }
        if (machineAgulhagemInput.value.trim() === '') {
            showAlert('Machine agulhagem is required.');
            machineAgulhagemInput.focus();
            return false;
        }
        if (machineDiametroInput.value.trim() === '') {
            showAlert('Machine diametro is required.');
            machineDiametroInput.focus();
            return false;
        }
        return true;
    }

    function showAlert(message) {
        alert(message);
    }

    addMachineButton.addEventListener('click', () => {
        if (validateFields()) {
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
        }
    });
});
