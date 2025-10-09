// main.js (ATUALIZADO)

import { initTheme } from './theme.js';
import { initLanguage } from './i18n.js';
import { initAnimationsAndScroll, wrapTitleLetters } from './utils.js'; // Importa wrapTitleLetters

document.addEventListener('DOMContentLoaded', () => {
    // 1. Processa o título da seção Hero Imediatamente para garantir que o wrapper exista
    const heroTitle = document.querySelector('#home h1.animatable-title');
    if (heroTitle) {
        // Envolve as letras antes de qualquer tradução ou animação
        wrapTitleLetters(heroTitle); 
    }
    
    // 2. Inicialização dos módulos
    initTheme();
    initLanguage();
    initAnimationsAndScroll();
});