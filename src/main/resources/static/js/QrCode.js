document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('qrcodeModal');
    const qrCodeContainer = document.getElementById('qrcode');
    const qrCodeText = document.getElementById('qrcodeText');
    const generateQRButton = document.getElementById('generateQR');
    const printButton = document.getElementById('printQR');
    const closeButton = document.querySelector('.close');

    // Função para gerar QR code
    generateQRButton.addEventListener('click', function() {
        qrCodeContainer.innerHTML = ''; // Limpa qualquer QR code existente

        // Obtemos o ID da máquina e a URL
        const machineId = document.getElementById('machineId').textContent.trim();
        const currentUrl = window.location.href; // Obtém a URL da página atual

        // Define o texto do QR code
        qrCodeText.textContent = `ID: ${machineId}`;

        // Gera o QR code
        new QRCode(qrCodeContainer, {
            text: currentUrl,
            width: 300,
            height: 300
        });

        // Exibe o modal
        modal.style.display = "flex";
    });

    // Função para fechar o modal
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Função para imprimir o QR code
    printButton.addEventListener('click', function() {
        console.log('Print button clicked');

        // Verifica se html2canvas está disponível
        if (typeof html2canvas !== 'undefined') {
            html2canvas(qrCodeContainer).then(function(canvas) {
                console.log('html2canvas done');

                // Cria uma nova janela para impressão
                const printWindow = window.open('', '', 'height=600,width=800');
                if (printWindow) {
                    printWindow.document.open();
                    printWindow.document.write(`
                        <html>
                        <head>
                            <title>Print QR Code</title>
                            <style>
                                @media print {
                                    body { font-family: Arial, sans-serif; text-align: center; margin: 0; padding: 0; }
                                    #printContent { display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0; }
                                    img { width: 300px; height: 300px; } /* Tamanho fixo para impressão */
                                }
                                @media screen {
                                    #printContent { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
                                    img { max-width: 100%; max-height: 60vh; }
                                }
                            </style>
                        </head>
                        <body>
                            <div id="printContent">
                                <h2>QR Code</h2>
                                <p>ID: ${document.getElementById('machineId').textContent.trim()}</p>
                                <img src="${canvas.toDataURL('image/png')}" alt="QR Code">
                            </div>
                        </body>
                    </html>
                    `);
                    printWindow.document.close();

                    // Adiciona um pequeno atraso para garantir que o QR code seja renderizado
                    setTimeout(function() {
                        printWindow.focus(); // Foca na nova janela
                        printWindow.print(); // Imprime o conteúdo da nova janela
                        modal.style.display = "none"; // Fecha o modal após a impressão
                    }, 500); // Ajuste o tempo conforme necessário
                } else {
                    console.error('Failed to open print window.');
                }
            }).catch(function(error) {
                console.error('Error with html2canvas:', error);
            });
        } else {
            console.error('html2canvas is not defined.');
        }
    });
});
