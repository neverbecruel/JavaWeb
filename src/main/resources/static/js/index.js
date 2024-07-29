document.getElementById('fetchData').addEventListener('click', function() {
    fetch('p/api/json', {
        method: "get",
        headers: new Headers({
            "ngrok-skip-browser-warning": "00000"
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dataDiv = document.getElementById('data');
            dataDiv.innerHTML = `
                        <p><strong>First Name:</strong> ${data.firstName}</p>
                        <p><strong>Middle Name:</strong> ${data.middleName}</p>
                        <p><strong>Last Name:</strong> ${data.lastName}</p>
                    `;
        })
        .catch(error => console.error('Error fetching data:', error));
});