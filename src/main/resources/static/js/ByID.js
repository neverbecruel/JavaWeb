document.addEventListener('DOMContentLoaded', function() {
    const maintenanceDateInput = document.getElementById('maintenanceDate');
    const maintenanceDescriptionInput = document.getElementById('maintenanceDescription');
    const idMachineInput = document.getElementById('machineId');
    const addMaintenanceButton = document.getElementById('addMaintenance');


    addMaintenanceButton.addEventListener('click', function() {
        if (maintenanceDateInput.value === '' || maintenanceDescriptionInput.value === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const maintenanceData = {
            data: maintenanceDateInput.value,
            descricao: maintenanceDescriptionInput.value,
            id: idMachineInput.value
        };

        fetch('http://localhost:8001/api/postManutencao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(maintenanceData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar manutenção');
                }
                console.log(idMachineInput.value)
                console.log(maintenanceDateInput.value)
                console.log(maintenanceDescriptionInput.value)
                return response.json();
            })
            .then(data => {

                maintenanceDateInput.value = '';
                maintenanceDescriptionInput.value = '';
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao adicionar manutenção. Verifique o console para mais detalhes.');
            });
    });
});
