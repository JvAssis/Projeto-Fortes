// Obter o elemento da barra lateral
const navBar = document.querySelector('.navBarra');

// Função que ativa a classe "expanded" quando o mouse entra e a desativa quando sai
navBar.addEventListener('mouseenter', () => {
    navBar.classList.add('expanded'); // Expande o menu
});

navBar.addEventListener('mouseleave', () => {
    navBar.classList.remove('expanded'); // Recolhe o menu
});
