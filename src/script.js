document.getElementById('mostrar').addEventListener('click', function() {
    document.getElementById('container').style.display = 'block';
    this.style.display = 'none'; //Oculta o botão "Mostrar Certificado"
});

document.getElementById('fechar').addEventListener('click', function() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('mostrar').style.display = 'block'; //Mostra novamente o botão
});

document.getElementById('gerarPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF('landscape');
    const img = document.getElementById('minhaImagem');
    const texto = document.getElementById('texto').innerText;

    // Adicionar a imagem ao PDF
    const imgData = img.src;

    // Definir a largura e altura da página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Adicionar a imagem ocupando toda a página
    doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight); // Ajuste a posição e o tamanho

    // Calcule a posição do texto para centralizá-lo
    const textoWidth = doc.getTextWidth(texto);
    const xPosition = (pageWidth - textoWidth) / 2; // Posição X centralizada

    // Adicionar o texto
    doc.setFontSize(24);
    doc.setTextColor(136, 189, 188); // Cor do texto (#88bdbc)
    doc.text(texto, xPosition, pageHeight / 2); // Posição do texto no meio da página

    // Salvar o PDF
    doc.save('Certificado.pdf');
});