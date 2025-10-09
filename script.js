// VARIÁVEL GLOBAL PARA ROTAÇÃO
let currentRotation = 0; 
// Variável para armazenar as traduções estáticas
let translations = {}; 
// Variável para armazenar o idioma atual (padrão 'pt')
let currentLang = 'pt'; 

document.addEventListener('DOMContentLoaded', () => {
    // Referências dos elementos DOM
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const languageSwitcher = document.getElementById('language-switcher');
    const heroImage = document.getElementById('profile-hero-img');
    const scrollProfile = document.getElementById('scroll-profile');
    const scrollProfileImg = document.getElementById('scroll-profile-img');
    const animatableTitles = document.querySelectorAll('.animatable-title');

    // Nomes dos arquivos de imagem
    const IMAGE_DARK = 'Imagens/F1.png';
    const IMAGE_LIGHT = 'Imagens/F2.png';
    
    // TEMPOS E LIMITES
    const IMAGE_TRANSITION_DURATION = 300; 
    const LETTER_ANIMATION_DELAY = 20;     
    const SCROLL_THRESHOLD = 150; 
    
    // --- LÓGICA DE TRADUÇÃO ---
    
    async function fetchTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error('Translation file not found');
            translations = await response.json();
            return true;
        } catch (error) {
            console.error(`Erro ao carregar tradução para ${lang}. Usando PT como fallback.`, error);
            // Tenta carregar PT como fallback se o idioma principal falhar
            if (lang !== 'pt') {
                return fetchTranslations('pt');
            }
            return false;
        }
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translations[key];
            
            if (translation) {
                // Se o elemento é um input, traduz o placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    // Para outros elementos, usa innerHTML para renderizar negritos (**)
                    element.innerHTML = translation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                }
            }
        });
        
        // Dispara a animação das letras APÓS a tradução ser aplicada
        animateTitles();
    }

    // Função que muda a linguagem
    async function changeLanguage(newLang) {
        currentLang = newLang; // Salva o idioma globalmente
        localStorage.setItem('lang', newLang);
        
        const success = await fetchTranslations(newLang);
        if (success) {
            applyTranslations();
        }
        
        // CRÍTICO: Recarrega o conteúdo dinâmico (apenas se for a página de detalhes)
        loadProjectDetail(); 
    }

    // --- LÓGICA DE CARREGAMENTO DINÂMICO DE PROJETOS (AGORA MULTI-IDIOMA) ---
    
    function loadProjectDetail() {
        const detailSection = document.getElementById('project-detail');
        
        // Se não for a página de detalhes, apenas retorna (a tradução estática já foi aplicada)
        if (!detailSection) {
            return; 
        } 

        const urlParams = new URLSearchParams(window.location.search);
        let projectId = urlParams.get('id');
        
        if (!projectId) {
            projectId = '1'; // Fallback, garantindo que sempre carrega algo
        }
        
        if (typeof projectData === 'undefined') {
             detailSection.innerHTML = `<h1 class="animatable-title">Erro Crítico!</h1><p>Não foi possível carregar o banco de dados.</p>`;
             return;
        }

        const project = projectData[projectId]; 

        // Se o projeto não existir ou não tiver dados no idioma atual, usa o fallback PT
        const getLocalizedText = (textObject) => {
            // Tenta o idioma atual, se falhar, tenta o Português como padrão
            return textObject[currentLang] || textObject['pt'] || 'Texto não disponível';
        };

        if (!project) {
            // O conteúdo de erro já é estático/traduzido pelo applyTranslations
            return; 
        }

        // 2. Insere o conteúdo dinamicamente, RE-CRIANDO O HTML
        const localizedTitle = getLocalizedText(project.title);
        const localizedOverview = getLocalizedText(project.overview);

        document.title = `${localizedTitle} | Detalhes`;
        detailSection.innerHTML = ''; 
        
        let htmlContent = `
            <p class="subtitle"><a href="index.html#projects" data-i18n="detail.back">← VOLTAR PARA PROJETOS</a></p>
            
            <h1 id="project-title" class="animatable-title">${localizedTitle}</h1>
            
            <div class="project-meta">
                <span>${project.meta}</span>
                <span>Data: ${project.date}</span>
            </div>
            
            <img id="project-main-image" src="${project.image}" alt="${localizedTitle}" class="main-image">
            
            <div class="project-content">
                <h2 data-i18n="detail.overview">Visão Geral do Projeto</h2>
                <p>${localizedOverview}</p>
                <h2 data-i18n="detail.challenges">Desafios e Soluções</h2>
                
                <ul>
        `;
        
        // Desafios (Iteração com tradução)
        project.challenges.forEach(c => {
            const localizedChallengeName = getLocalizedText(c.name);
            const localizedChallengeSolution = getLocalizedText(c.solution);

            htmlContent += `<li><strong>${localizedChallengeName}:</strong> ${localizedChallengeSolution}</li>`;
        });
        htmlContent += '</ul>';

        htmlContent += `
                <h2>Links</h2>
                <a href="${project.github}" class="btn primary-btn" target="_blank" data-i18n="detail.github">VER CÓDIGO NO GITHUB</a>
                <a href="${project.video}" class="btn secondary-btn" target="_blank" data-i18n="detail.video">VER VÍDEO DEMONSTRATIVO</a>
            </div>
        `;
        
        detailSection.innerHTML = htmlContent;
        
        // 3. Re-aplica traduções estáticas (para botões, cabeçalhos, etc.) e animação
        applyTranslations(); 
        
        const newTitleElement = document.getElementById('project-title');
        if (newTitleElement) {
             wrapTitleLetters(newTitleElement);
             animateTitles();
        }
    }
    
    // --- LÓGICA DO TEMA, ANIMAÇÕES E SCROLL (MANTIDA) ---

    function setTheme(theme, isInitialLoad = false) {
        const isLight = theme === 'light';
        
        if (isLight) {
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Mudar para Tema Escuro';
        } else {
            body.classList.remove('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Mudar para Tema Claro';
        }
        
        localStorage.setItem('theme', theme);
        
        if (!isInitialLoad) {
            animateAndSwapImage(isLight);
            animateTitles(); 
        } else {
            heroImage.src = isLight ? IMAGE_LIGHT : IMAGE_DARK;
            scrollProfileImg.src = isLight ? IMAGE_LIGHT : IMAGE_DARK; 
        }
    }

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme, true);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function animateAndSwapImage(isLight) {
        const rotationValue = isLight ? 360 : -360;
        currentRotation += rotationValue; 
        
        const newSrc = isLight ? IMAGE_LIGHT : IMAGE_DARK;

        heroImage.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            heroImage.src = newSrc;
            scrollProfileImg.src = newSrc; 
        }, 0); 
    }
    
    function toggleScrollProfile() {
        if (!scrollProfile) return; 
        
        const scrollY = window.scrollY;
        
        if (scrollY > SCROLL_THRESHOLD) { 
            scrollProfile.classList.remove('hidden');
        } else {
            scrollProfile.classList.add('hidden');
        }
    }
    
    window.addEventListener('scroll', toggleScrollProfile);

    function wrapTitleLetters(titleElement) {
        if (!titleElement.classList.contains('processed')) {
            const text = titleElement.textContent.trim();
            let wrappedHTML = '';
            
            text.split('').forEach(char => {
                wrappedHTML += char === ' ' ? ' ' : `<span class="animatable-letter">${char}</span>`;
            });
            
            titleElement.innerHTML = wrappedHTML;
            titleElement.classList.add('processed');
        } else {
            return; 
        }
    }

    function animateTitles() {
        document.querySelectorAll('.animatable-title').forEach(title => {
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

    // --- 5. Lógica do Seletor de Idioma ---

    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', (event) => {
            changeLanguage(event.target.value);
        });
    }

    // --- INICIALIZAÇÃO GERAL ---
    
    // 1. Define a linguagem inicial e carrega as traduções
    const initialLang = localStorage.getItem('lang') || 'pt';
    if (languageSwitcher) {
        languageSwitcher.value = initialLang;
    }
    
    // A função changeLanguage (chamada abaixo) fará a tradução e chamará loadProjectDetail.
    changeLanguage(initialLang);

    // 2. Inicializa tema, scroll
    loadTheme();
    toggleScrollProfile();
});