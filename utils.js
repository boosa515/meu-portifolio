// utils.js

// VARIÁVEIS DE ESCOPO
const scrollProfile = document.getElementById('scroll-profile');
const SCROLL_THRESHOLD = 150; 
const LETTER_ANIMATION_DELAY = 20;

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

// Lógica de Animação de Títulos - 1: Envolver Letras
export function wrapTitleLetters(titleElement) {
    if (!titleElement || titleElement.classList.contains('processed')) return;

    const text = titleElement.textContent.trim();
    let wrappedHTML = '';
    
    text.split('').forEach(char => {
        wrappedHTML += char === ' ' ? ' ' : `<span class="animatable-letter">${char}</span>`;
    });
    
    titleElement.innerHTML = wrappedHTML;
    titleElement.classList.add('processed');
}

// Lógica de Animação de Títulos - 2: Animar
export function animateTitles() {
    document.querySelectorAll('.animatable-title').forEach(title => {
        // Assegura que o título foi processado antes de animar (necessário para títulos dinâmicos)
        wrapTitleLetters(title); 
        
        if (title.querySelector('.animatable-letter')) {
            const letters = title.querySelectorAll('.animatable-letter');
            
            letters.forEach((letter, index) => {
                letter.classList.remove('animate-drop-in'); 

                setTimeout(() => {
                    letter.classList.add('animate-drop-in');
                    
                    letter.addEventListener('animationend', () => {
                        letter.classList.remove('animate-drop-in');
                    }, { once: true });
                    
                }, index * LETTER_ANIMATION_DELAY); 
            });
        }
    });
}


// Inicialização de Animações/Scroll (chamada em main.js)
export function initAnimationsAndScroll() {
    // Aplicar a animação inicial nos títulos estáticos
    document.querySelectorAll('.animatable-title').forEach(wrapTitleLetters);
    animateTitles();
    
    // Inicializa o scroll
    window.addEventListener('scroll', toggleScrollProfile);
    toggleScrollProfile();
}