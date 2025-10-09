// main.js

import { initTheme } from './theme.js';
import { initLanguage } from './i18n.js';
import { initAnimationsAndScroll } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização dos módulos
    initTheme();
    initLanguage();
    initAnimationsAndScroll();
});