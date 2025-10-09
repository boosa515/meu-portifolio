// projectLoader.js (CORRIGIDO: Duplicação de Projetos)

import { getLocalizedText, applyTranslations } from './i18n.js';
import { wrapTitleLetters, animateTitles } from './utils.js';

// OBS: Este módulo pressupõe que project-data.js foi carregado no escopo global.

// Função para construir e carregar o grid de projetos na página inicial (index.html)
export function loadProjectGrid() {
    const projectsSection = document.getElementById('projects');
    
    // Se não for a página inicial ou dados indisponíveis, apenas retorna
    if (!projectsSection || typeof projectData === 'undefined') {
        return; 
    }

    // CRÍTICO: Limpa todo o conteúdo ANTERIOR da seção, exceto o título H2 (se existir)
    const existingTitle = projectsSection.querySelector('h2');
    projectsSection.innerHTML = ''; // Limpa tudo
    if (existingTitle) {
        projectsSection.appendChild(existingTitle); // Adiciona o título H2 de volta
    }
    
    let gridContent = `
        <div class="projects-grid">
    `;

    // Itera sobre todos os projetos em projectData
    for (const projectId in projectData) {
        if (projectData.hasOwnProperty(projectId)) {
            const project = projectData[projectId];
            
            // Usa o título localizado para a prévia
            const localizedTitle = getLocalizedText(project.title);
            
            gridContent += `
                <div class="project-item">
                    <a href="project-detail.html?id=${projectId}" class="project-link">
                        <div class="project-image-wrapper">
                            <img src="${project.image}" alt="${localizedTitle}">
                        </div>
                        <h3>${localizedTitle}</h3>
                        <p class="project-date">${project.date}</p>
                    </a>
                </div>
            `;
        }
    }
    
    gridContent += `
        </div>
        <div class="more-button-container">
            <a href="#" class="btn secondary-btn" data-i18n="projects.more">Click for More</a>
        </div>
    `;

    // Adiciona o conteúdo do grid APÓS o H2
    if (existingTitle) {
         existingTitle.insertAdjacentHTML('afterend', gridContent);
    } else {
        projectsSection.innerHTML += gridContent;
    }
    
    // Re-aplica traduções estáticas para o botão "Click for More" (e qualquer novo elemento data-i18n)
    applyTranslations();
}


// Função original de detalhes do projeto (restante do código)
export function loadProjectDetail() {
    const detailSection = document.getElementById('project-detail');
    
    if (!detailSection) {
        // Se não for a página de detalhes, carrega o grid (página inicial)
        loadProjectGrid(); 
        return; 
    } 
    
    // ... (restante da lógica de loadProjectDetail)
    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id');
    
    // ... (o restante da função loadProjectDetail)

    if (!projectId) {
        projectId = '1'; 
    }
    
    if (typeof projectData === 'undefined') {
         detailSection.innerHTML = `<h1 class="animatable-title">Erro Crítico!</h1><p>Não foi possível carregar o banco de dados.</p>`;
         return;
    }

    const project = projectData[projectId]; 

    if (!project) {
        return; 
    }

    // 1. Obtém e aplica o conteúdo dinâmico
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
    
    // 2. Re-aplica traduções estáticas e animações aos elementos recém-criados
    applyTranslations();
    
    const newTitleElement = document.getElementById('project-title');
    if (newTitleElement) {
         wrapTitleLetters(newTitleElement);
         animateTitles();
    }
}