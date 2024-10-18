document.getElementById('mostrar').addEventListener('click', function() {
    document.getElementById('container').style.display = 'block';
    this.style.display = 'none'; // Oculta o botão "Mostrar Certificado"
});

document.getElementById('fechar').addEventListener('click', function() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('mostrar').style.display = 'block'; // Mostra novamente o botão
});

document.getElementById('gerarPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF('landscape');
    const img = document.getElementById('minhaImagem');
    const texto = document.getElementById('texto').innerText;

    html2canvas(img).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Adicionar a imagem ao PDF
        doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

        // Calcule a posição do texto para centralizá-lo
        const textoWidth = doc.getTextWidth(texto);
        const xPosition = (pageWidth - textoWidth) / 2; // Posição X centralizada

        // Adicionar o texto
        doc.setFontSize(24);
        doc.setTextColor(136, 189, 188); // Cor do texto (#88bdbc)
        doc.text(texto, xPosition, pageHeight / 2); // Posição do texto no meio da página

        // Salvar o PDF
        doc.save('Certificado.pdf');
    }).catch(error => {
        console.error("Erro ao gerar a imagem:", error);
    });
});
