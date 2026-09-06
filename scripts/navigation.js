// Menu hambúrguer para mobile
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');

    // Mudar o ícone entre ☰ e ✕
    if (mainNav.classList.contains('open')) {
        menuToggle.textContent = '✕';
    } else {
        menuToggle.textContent = '☰';
    }
});

// Fechar menu ao clicar em um link (mobile)
const navLinks = document.querySelectorAll('#main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 640) {
            mainNav.classList.remove('open');
            menuToggle.textContent = '☰';
        }
    });
});