// theme.js

import { animateTitles } from './utils.js';

// VARIÁVEIS DE ESCOPO
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const heroImage = document.getElementById('profile-hero-img');
const scrollProfileImg = document.getElementById('scroll-profile-img');


// CONSTANTES
const IMAGE_DARK = 'Imagens/F1.png';
const IMAGE_LIGHT = 'Imagens/F2.png';
let currentRotation = 0; 

// Funções Internas
function animateAndSwapImage(isLight) {
    const rotationValue = isLight ? 360 : -360;
    currentRotation += rotationValue; 
    
    const newSrc = isLight ? IMAGE_LIGHT : IMAGE_DARK;

    if (heroImage) {
        // Aplica a rotação no hero
        heroImage.style.transform = `rotate(${currentRotation}deg)`;
        
        // Troca o src da imagem após a rotação começar (timeout 0ms garante a ordem)
        setTimeout(() => {
            heroImage.src = newSrc;
        }, 0); 
    }
    // Troca o src da imagem de scroll (sem animação, é apenas um placeholder)
    if (scrollProfileImg) {
        scrollProfileImg.src = newSrc;
    }
}

function setTheme(theme, isInitialLoad = false) {
    const isLight = theme === 'light';
    
    if (isLight) {
        body.classList.add('light-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Mudar para Tema Escuro';
        }
    } else {
        body.classList.remove('light-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Mudar para Tema Claro';
        }
    }
    
    localStorage.setItem('theme', theme);
    
    if (!isInitialLoad) {
        animateAndSwapImage(isLight);
        animateTitles(); // Reanima títulos com a nova cor primária
    } else {
        // Carga inicial: apenas define o src correto
        if (heroImage) heroImage.src = isLight ? IMAGE_LIGHT : IMAGE_DARK;
        if (scrollProfileImg) scrollProfileImg.src = isLight ? IMAGE_LIGHT : IMAGE_DARK; 
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme, true);
}

// Função Exportada (Inicialização)
export function initTheme() {
    loadTheme();
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}