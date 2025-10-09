// utils.js

// VARIÁVEIS DE ESCOPO
const scrollProfile = document.getElementById('scroll-profile');
const SCROLL_THRESHOLD = 150; 

// Lógica do Scroll Profile
export function toggleScrollProfile() {
    if (!scrollProfile) return; 
    const scrollY = window.scrollY;
    
    if (scrollY > SCROLL_THRESHOLD) { 
        scrollProfile.classList.remove('hidden');
    } else {
        scrollProfile.classList.add('hidden');
    }
}

// Lógica de Animação de Títulos - 1: Envolver Letras (Vazio)
// A função é mantida para que i18n.js não quebre ao tentar importá-la.
export function wrapTitleLetters(titleElement) {
    // VAZIO: Não faz mais nada, pois a animação foi removida.
}

// Lógica de Animação de Títulos - 2: Animar (Vazio)
// A função é mantida para que theme.js/i18n.js não quebre ao tentar importá-la.
export function animateTitles(direction = 'initial') {
    // VAZIO: Não faz mais nada, pois a animação foi removida.
}


// Inicialização de Animações/Scroll (chamada em main.js)
export function initAnimationsAndScroll() {
    window.addEventListener('scroll', toggleScrollProfile);
    toggleScrollProfile();
}