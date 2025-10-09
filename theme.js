// ============================================================================
// Módulo responsável por controlar o tema (claro/escuro) da página, alternando
// cores, imagens e armazenando a preferência do usuário no localStorage.
// ============================================================================

// Importa funções utilitárias de animação (atualmente não usadas aqui)
import { animateTitles } from './utils.js'; 

// ============================================================================
// Variáveis de Escopo
// ============================================================================

// Botão que alterna entre tema claro/escuro
const themeToggle = document.getElementById('theme-toggle'); 

// Elemento <body> do documento (usado para aplicar classes de tema)
const body = document.body; 

// Imagem principal da seção hero (vai girar quando o tema mudar)
const heroImage = document.getElementById('profile-hero-img'); 

// Imagem do perfil flutuante quando rola a página (scroll-profile)
const scrollProfileImg = document.getElementById('scroll-profile-img'); 

// ============================================================================
// Constantes de configuração
// ============================================================================

// Caminhos das imagens do tema escuro e claro
const IMAGE_DARK = 'Imagens/F1.png';
const IMAGE_LIGHT = 'Imagens/F2.png';

// Guarda o ângulo atual de rotação da imagem do hero
let currentRotation = 0; 


// ============================================================================
// Função interna: animateAndSwapImage(isLight)
// Realiza animação de rotação e troca da imagem do hero quando o tema muda
// ============================================================================

function animateAndSwapImage(isLight) {
    // Define a rotação que será aplicada: 360° para tema claro, -360° para tema escuro
    const rotationValue = isLight ? 360 : -360;
    
    // Atualiza a rotação acumulada
    currentRotation += rotationValue; 
    
    // Define a nova imagem com base no tema
    const newSrc = isLight ? IMAGE_LIGHT : IMAGE_DARK;

    if (heroImage) {
        // Aplica a rotação CSS na imagem do hero
        heroImage.style.transform = `rotate(${currentRotation}deg)`;
        
        // Troca a imagem após a rotação começar
        // setTimeout 0ms garante que a rotação aconteça antes da troca
        setTimeout(() => {
            heroImage.src = newSrc;
        }, 0); 
    }

    // Atualiza a imagem do perfil flutuante (scroll profile) sem animação
    if (scrollProfileImg) {
        scrollProfileImg.src = newSrc;
    }
}


// ============================================================================
// Função interna: setTheme(theme, isInitialLoad = false)
// Aplica o tema (claro/escuro) no body e altera o botão de alternância
// ============================================================================

function setTheme(theme, isInitialLoad = false) {
    // Verifica se o tema passado é 'light'
    const isLight = theme === 'light';
    
    if (isLight) {
        // Adiciona a classe CSS do tema claro
        body.classList.add('light-theme');

        // Atualiza o botão toggle (ícone e tooltip)
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Mudar para Tema Escuro';
        }
    } else {
        // Remove a classe do tema claro (volta para escuro)
        body.classList.remove('light-theme');

        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Mudar para Tema Claro';
        }
    }
    
    // Salva a preferência no localStorage
    localStorage.setItem('theme', theme);
    
    if (!isInitialLoad) {
        // Se não for a carga inicial, anima e troca a imagem do hero
        animateAndSwapImage(isLight);

        // Nota: Chamadas de animações adicionais podem ser inseridas aqui
    } else {
        // Carga inicial: apenas define a imagem correta sem animação
        if (heroImage) heroImage.src = isLight ? IMAGE_LIGHT : IMAGE_DARK;
        if (scrollProfileImg) scrollProfileImg.src = isLight ? IMAGE_LIGHT : IMAGE_DARK; 
    }
}


// ============================================================================
// Função interna: loadTheme()
// Lê o tema salvo no localStorage e aplica na página
// ============================================================================

function loadTheme() {
    // Recupera o tema salvo ou define 'dark' como padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Aplica o tema (isInitialLoad = true para não animar)
    setTheme(savedTheme, true);
}


// ============================================================================
// Função exportada: initTheme()
// Inicializa o controle de tema e adiciona evento ao botão toggle
// ============================================================================

export function initTheme() {
    // Carrega o tema salvo (ou padrão)
    loadTheme();

    // Adiciona listener ao botão de alternância de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Verifica o tema atual
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';

            // Alterna o tema
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Aplica o novo tema
            setTheme(newTheme);
        });
    }
}
