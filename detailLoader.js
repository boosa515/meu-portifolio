// detailLoader.js

import { getLocalizedText, applyTranslations } from './i18n.js';
import { wrapTitleLetters, animateTitles } from './utils.js';

// OBS: Este módulo pressupõe que project-data.js foi carregado via <script> tag no HTML 
// e, portanto, 'projectData' está no escopo global.

export function loadProjectDetail() {
    const detailSection = document.getElementById('project-detail');
    
    // Só executa na página de detalhes
    if (!detailSection) {
        return; 
    } 

    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id');
    
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