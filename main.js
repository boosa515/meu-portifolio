// Importa funções de outros módulos para manter o código organizado e modularizado.
import { initTheme } from './theme.js'; // Responsável por alternar entre tema claro e escuro.
import { initLanguage } from './i18n.js'; // Responsável por carregar e aplicar traduções (internacionalização).
import { initAnimationsAndScroll, wrapTitleLetters } from './utils.js'; // Contém funções auxiliares para animações e manipulação de texto.

// Adiciona um ouvinte para o evento "DOMContentLoaded", que é disparado
// assim que o HTML for totalmente carregado e analisado pelo navegador.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o título principal da seção "Home" (Hero Section)
    // com a classe "animatable-title" para aplicar um efeito visual nas letras.
    const heroTitle = document.querySelector('#home h1.animatable-title');
    
    // Se o título for encontrado na página...
    if (heroTitle) {
        // ...chama a função "wrapTitleLetters" que envolve cada letra do texto
        // em uma <span>, permitindo animações individuais depois.
        wrapTitleLetters(heroTitle); 
    }

    // Inicializa os módulos principais do site:

    // Alterna e aplica o tema do site (claro ou escuro)
    initTheme();

    // Carrega o idioma salvo no navegador e aplica as traduções na interface
    initLanguage();

    // Ativa animações de entrada e comportamentos baseados em rolagem da página
    initAnimationsAndScroll();
});
