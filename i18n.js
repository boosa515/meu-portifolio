// ==============================
// Sistema de internacionalização 
// ==============================

// Importa função para carregar detalhes de projetos quando o idioma muda
import { loadProjectDetail } from './projectLoader.js';

// Importa funções utilitárias de animação de títulos (não usadas aqui, mas mantidas)
import { animateTitles, wrapTitleLetters } from './utils.js';

// ===========================
// VARIÁVEIS GLOBAIS DO MÓDULO
// ===========================

let translations = {}; // Objeto que armazenará todas as traduções carregadas do arquivo JSON
export let currentLang = 'pt'; // Idioma padrão

// =====================================================
// FUNÇÃO INTERNA: Busca e carrega o arquivo de tradução
// =====================================================

async function fetchTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);  // Faz o download do arquivo JSON do idioma solicitado
        if (!response.ok) throw new Error('Translation file not found');  // Caso o arquivo não seja encontrado, lança uma exceção
        translations = await response.json(); // Converte o conteúdo do arquivo JSON para objeto JavaScript
        return true;

    } catch (error) {
        console.error(`Erro ao carregar tradução para ${lang}. Usando PT como fallback.`, error);
        if (lang !== 'pt') {
            return fetchTranslations('pt');
        }
        return false;
    }
}

// ===============================================
// FUNÇÃO EXPORTADA: Aplica as traduções na página
// ===============================================

export function applyTranslations() {

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');  // Pega a chave de tradução (ex: "nav.home", "hero.subtitle")
        const translation = translations[key]; // Busca o texto traduzido no objeto 'translations'
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') { // Caso o elemento seja um campo de texto, altera o placeholder
                element.placeholder = translation;
            } else {
                // Insere o texto traduzido no elemento
                // O regex troca **texto** por <strong>texto</strong> para aplicar negrito
                element.innerHTML = translation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            }
        }
    });

}

// ==================================================================
// FUNÇÃO EXPORTADA: Retorna texto traduzido para elementos dinâmicos
// ==================================================================

export function getLocalizedText(textObject) {
    return textObject[currentLang] || textObject['pt'] || 'Texto não disponível'; // Tenta retornar o texto do idioma atual. Se não existir, tenta português, caso contrário, retorna um texto padrão de erro
}

// ================================================================
// FUNÇÃO EXPORTADA: Troca o idioma e atualiza o conteúdo da página
// ================================================================

export async function changeLanguage(newLang) {
    currentLang = newLang; // Atualiza a variável global com o novo idioma
    localStorage.setItem('lang', newLang); // Salva o idioma selecionado no armazenamento local do navegador
    const success = await fetchTranslations(newLang); // Tenta carregar as traduções do novo idioma

    if (success) {
        applyTranslations(); // Atualiza todos os textos da página
    }
    loadProjectDetail(); // Recarrega os detalhes dos projetos
}

// ================================
// FUNÇÃO EXPORTADA: Inicializa o sistema de idioma ao carregar o site
// ================================

export function initLanguage() {
    const languageSwitcher = document.getElementById('language-switcher'); // Seleciona o <select> do cabeçalho responsável pela troca de idioma

    
    const initialLang = localStorage.getItem('lang') || 'pt'; // Define o idioma inicial — tenta pegar do localStorage, senão usa português

    if (languageSwitcher) { // Se o seletor de idioma existe na página
        languageSwitcher.value = initialLang; // Define o valor atual do <select> para o idioma salvo
        languageSwitcher.addEventListener('change', (event) => { // Adiciona o evento para detectar quando o usuário muda o idioma
            changeLanguage(event.target.value); // Quando o idioma muda, chama a função de troca
        });
    }
    changeLanguage(initialLang); // Carrega o idioma inicial ao abrir a página
}
