// ============================================================================
// VARIÁVEIS DE ESCOPO
// ============================================================================

// Captura o elemento flutuante de perfil que aparece ao rolar a página
const scrollProfile = document.getElementById('scroll-profile');

// Define a altura (em pixels) após a qual o perfil deve aparecer
const SCROLL_THRESHOLD = 150; 



// ============================================================================
//  Função: toggleScrollProfile()
// Mostra ou esconde o perfil flutuante baseado na posição do scroll.
// ============================================================================
export function toggleScrollProfile() {
    // Se o elemento não existir na página, apenas retorna
    if (!scrollProfile) return; 
    
    // Obtém a posição atual do scroll vertical da janela
    const scrollY = window.scrollY;
    
    // Se o scroll passou do limite definido, remove a classe 'hidden' (mostra o perfil)
    if (scrollY > SCROLL_THRESHOLD) { 
        scrollProfile.classList.remove('hidden');
    } else {
        // Caso contrário, adiciona a classe 'hidden' (esconde o perfil)
        scrollProfile.classList.add('hidden');
    }
}



// ============================================================================
// Função: wrapTitleLetters(titleElement)
// Envolve cada letra de um título em <span> para futuras animações.
// Atualmente está vazia porque a animação foi removida.
// Mantida para não quebrar referências de i18n.js/main.js
// ============================================================================
export function wrapTitleLetters(titleElement) {
    //  Função intencionalmente vazia
}



// ============================================================================
// Função: animateTitles(direction)
// Anima os títulos que tiveram suas letras envolvidas em <span>
// Atualmente está vazia porque a animação foi removida.
// Mantida para compatibilidade com outros módulos
// ============================================================================
export function animateTitles(direction = 'initial') {
    // Função intencionalmente vazia
}



// ============================================================================
// Função: initAnimationsAndScroll()
// Inicializa todas as lógicas relacionadas a scroll e animações na página
// ============================================================================

export function initAnimationsAndScroll() {
    // Adiciona listener para monitorar scroll e alternar o perfil
    window.addEventListener('scroll', toggleScrollProfile);

    // Executa imediatamente para definir o estado inicial
    toggleScrollProfile();
}
