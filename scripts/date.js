// Ano atual dinâmico
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Data da última modificação do documento
const lastModifiedParagraph = document.getElementById('lastModified');
if (lastModifiedParagraph) {
    lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}