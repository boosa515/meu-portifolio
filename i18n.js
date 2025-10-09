// i18n.js

import { loadProjectDetail } from './detailLoader.js'; // Importa a função do próximo módulo
import { animateTitles, wrapTitleLetters } from './utils.js';

// VARIÁVEIS GLOBAIS DE MÓDULO
let translations = {}; 
export let currentLang = 'pt'; 

// Funções Internas
async function fetchTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error('Translation file not found');
        translations = await response.json();
        return true;
    } catch (error) {
        console.error(`Erro ao carregar tradução para ${lang}. Usando PT como fallback.`, error);
        // Tenta PT como fallback se o idioma principal falhar
        if (lang !== 'pt') {
            return fetchTranslations('pt');
        }
        return false;
    }
}

export function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[key];
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                // Usa innerHTML para renderizar negritos (**)
                element.innerHTML = translation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            }
        }
    });
    
    // Dispara a animação das letras APÓS a tradução ser aplicada
    document.querySelectorAll('.animatable-title').forEach(wrapTitleLetters);
    animateTitles();
}

// Retorna o texto localizado para dados dinâmicos
export function getLocalizedText(textObject) {
    return textObject[currentLang] || textObject['pt'] || 'Texto não disponível';
}

// Função Exportada (Troca de Idioma e Inicialização)
export async function changeLanguage(newLang) {
    currentLang = newLang; // Salva o idioma
    localStorage.setItem('lang', newLang);
    
    const success = await fetchTranslations(newLang);
    if (success) {
        applyTranslations(); // Aplica traduções estáticas
    }
    
    // CRÍTICO: Recarrega o conteúdo dinâmico (apenas se for a página de detalhes)
    loadProjectDetail(); 
}

export function initLanguage() {
    const languageSwitcher = document.getElementById('language-switcher');
    
    // 1. Define a linguagem inicial
    const initialLang = localStorage.getItem('lang') || 'pt';
    if (languageSwitcher) {
        languageSwitcher.value = initialLang;
        // 2. Adiciona o listener para troca
        languageSwitcher.addEventListener('change', (event) => {
            changeLanguage(event.target.value);
        });
    }
    
    // 3. Inicia o carregamento (que chamará applyTranslations e loadProjectDetail)
    changeLanguage(initialLang);
}