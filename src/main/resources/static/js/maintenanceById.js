document.addEventListener('DOMContentLoaded', function() {
    setDefaultDate();
    maintenanceById();
    setupMaintenanceHandler();
});

function setDefaultDate() {
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    document.getElementById('maintenanceDate').value = `${year}-${month}-${day}`;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Hide the toast after 3 seconds
}

function validateMaintenanceFields() {
    const maintenanceDateInput = document.getElementById('maintenanceDate');
    const maintenanceDescriptionInput = document.getElementById('maintenanceDescription');
    const MAX_DESCRIPTION_LENGTH = 255;

    if (maintenanceDateInput.value.trim() === '') {
        showToast("Por favor, preencha a data.");
        return false;
    }

    if (maintenanceDescriptionInput.value.trim() === '') {
        showToast("Por favor, preencha o procedimento.");
        return false;
    }

    if (maintenanceDescriptionInput.value.length > MAX_DESCRIPTION_LENGTH) {
        showToast("Descrição muito longa. Máximo de caracteres permitido é " + MAX_DESCRIPTION_LENGTH + ".");
        return false;
    }

    return true;
}

function setupMaintenanceHandler() {
    const addMaintenanceButton = document.getElementById('addMaintenance');

    addMaintenanceButton.addEventListener('click', function() {
        if (validateMaintenanceFields()) {
            const maintenanceDateInput = document.getElementById('maintenanceDate');
            const maintenanceDescriptionInput = document.getElementById('maintenanceDescription');
            const idMachineInput = document.getElementById('machineId');

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
                    return response.json().then(data => {
                        return { status: response.status, body: data };
                    });
                })
                .then(result => {
                    if (result.status === 201) {
                        showToast('Manutenção adicionada com sucesso.');
                        // Limpa os campos
                        maintenanceDateInput.value = '';
                        maintenanceDescriptionInput.value = '';

                        // Recarrega a lista de manutenção
                        maintenanceById();
                    } else {
                        throw new Error(result.body.message || 'Erro ao adicionar manutenção.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao adicionar manutenção:', error);
                    showToast('Erro ao adicionar manutenção: ' + error.message);
                });
        }
    });
}

function maintenanceById() {
    const maintenanceList = document.getElementById('maintenanceList');
    const idMachineInput = document.getElementById('machineId');
    const machineId = idMachineInput.textContent.trim();

    console.log('Fetching maintenance history for machine ID:', machineId);

    if (!machineId) {
        console.error('ID da máquina não encontrado.');
        showToast('ID da máquina não encontrado.');
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
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            maintenanceList.innerHTML = '';

            data.forEach(maintenance => {
                const listItem = document.createElement('li');
                listItem.className = 'maintenance-item';

                const dateElement = document.createElement('div');
                const date = new Date(maintenance.date);
                const formattedDate = ('0' + date.getDate()).slice(-2) + '-' +
                    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                    date.getFullYear();

                dateElement.className = 'maintenance-date';
                dateElement.innerHTML = `<span class="label">Data:</span> <span class="value">${formattedDate}</span>`;

                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'maintenance-description';
                descriptionElement.innerHTML = `<span class="label">Procedimento:</span> <span class="value">${maintenance.description}</span>`;

                listItem.appendChild(dateElement);
                listItem.appendChild(descriptionElement);
                maintenanceList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar histórico de manutenção:', error);
            showToast('Erro ao carregar histórico de manutenção. Verifique o console para mais detalhes.');
        });
}