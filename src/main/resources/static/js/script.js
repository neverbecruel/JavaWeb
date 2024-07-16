document.addEventListener('DOMContentLoaded', function() {
    const machineNameInput = document.getElementById('machineName');
    const machineSectorInput = document.getElementById('machineSector');
    const machineModelInput = document.getElementById('machineModel');
    const machinePatrimonioInput = document.getElementById('machinePatrimonio')

    document.getElementById('addMachine').addEventListener('click', function() {
        const machineData = {
            name: machineNameInput.value,
            setor: machineSectorInput.value,
            modelo: machineModelInput.value,
            patrimonio: parseInt(machinePatrimonioInput.value),
        };

        fetch('http://localhost:8001/api/maquinas', {
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
                // Redirecionar para a página da máquina específica usando o ID retornado
                window.location.href = `http://localhost:8001/maquinas/${data}`;
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao adicionar máquina. Verifique o console para mais detalhes.');
            });
    });
});
