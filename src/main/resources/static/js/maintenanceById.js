function maintenanceById() {
    const maintenanceList = document.getElementById('maintenanceList');
    const idMachineInput = document.getElementById('machineId');
    const machineId = idMachineInput.textContent.trim();

    console.log('Fetching maintenance history for machine ID:', machineId);

    if (!machineId) {
        console.error('ID da máquina não encontrado.');
        return;
    }

    fetch(`/api/manutencoes/${machineId}`)
        .then(response => {
            console.log('API response status:', response.status);
            if (!response.ok) {
                throw new Error('Erro ao buscar histórico de manutenção');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched maintenance data:', data);

            // Ordena os dados por data de manutenção em ordem decrescente
            data.sort((a, b) => new Date(b.date) - new Date(a.date));


            maintenanceList.innerHTML = '';


            data.forEach(maintenance => {
                console.log('Maintenance item:', maintenance);
                const listItem = document.createElement('li');
                listItem.textContent = `Data: ${maintenance.date}, Descrição: ${maintenance.description}`;
                maintenanceList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar histórico de manutenção:', error);
            alert('Erro ao carregar histórico de manutenção. Verifique o console para mais detalhes.');
        });
}

// Função para adicionar manutenção
function addMaintenance() {
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
            id: idMachineInput.textContent.trim()
        };

        fetch('/api/postManutencao', {
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
                console.log('ID da máquina:', idMachineInput.textContent.trim());
                console.log('Data da manutenção:', maintenanceDateInput.value);
                console.log('Descrição da manutenção:', maintenanceDescriptionInput.value);
                return response.json();
            })
            .then(data => {
                maintenanceDateInput.value = '';
                maintenanceDescriptionInput.value = '';

                // Recarrega a lista
                maintenanceById();
            })
            .catch(error => {
                console.error('Erro ao adicionar manutenção:', error);
                alert('Erro ao adicionar manutenção. Verifique o console para mais detalhes.');
            });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    maintenanceById();
    addMaintenance();
});
