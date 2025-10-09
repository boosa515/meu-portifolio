// Importa funções utilitárias e de tradução
import { getLocalizedText, applyTranslations } from './i18n.js'; 
import { wrapTitleLetters, animateTitles } from './utils.js'; 

// Observação importante:
// Este módulo depende de um arquivo externo (`project-data.js`), 
// que define a variável global `projectData` contendo todos os projetos.


// ============================================================================
// Função: loadProjectGrid()
// Responsável por montar dinamicamente o GRID de projetos na página inicial.
// ============================================================================
export function loadProjectGrid() {
    // Obtém a seção HTML onde os projetos serão exibidos
    const projectsSection = document.getElementById('projects');
    
    // Se a seção não existir (não está na página inicial) ou projectData não foi carregado, encerra
    if (!projectsSection || typeof projectData === 'undefined') {
        return; 
    }

    // 🔸 Etapa importante:
    // Antes de reconstruir o grid, limpamos todo o conteúdo anterior da seção
    // para evitar duplicação de projetos ao recarregar a tradução.
    const existingTitle = projectsSection.querySelector('h2'); // guarda o título original da seção
    projectsSection.innerHTML = ''; // limpa todo o conteúdo
    if (existingTitle) {
        // Reinsere o título H2 (como “Meus Projetos”) no início
        projectsSection.appendChild(existingTitle);
    }
    
    // Inicia o HTML que vai conter o grid dos projetos
    let gridContent = `
        <div class="projects-grid">
    `;

    // Percorre todos os projetos definidos em `projectData`
    for (const projectId in projectData) {
        if (projectData.hasOwnProperty(projectId)) {
            const project = projectData[projectId];
            
            // Obtém o título traduzido conforme o idioma atual
            const localizedTitle = getLocalizedText(project.title);
            
            // Adiciona o bloco de HTML de cada projeto no grid
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
    
    // Fecha o grid e adiciona o botão “Click for More”
    gridContent += `
        </div>
        <div class="more-button-container">
            <a href="#" class="btn secondary-btn" data-i18n="projects.more">Click for More</a>
        </div>
    `;

    // Insere o grid logo após o título da seção
    if (existingTitle) {
         existingTitle.insertAdjacentHTML('afterend', gridContent);
    } else {
        // Caso não tenha H2, insere o grid diretamente na seção
        projectsSection.innerHTML += gridContent;
    }
    
    // Reaplica traduções para o botão e qualquer outro elemento recém-criado
    applyTranslations();
}



// ============================================================================
// Função: loadProjectDetail()
// Responsável por exibir os detalhes de um projeto específico na página de detalhes.
// ============================================================================
export function loadProjectDetail() {
    // Captura a seção onde o conteúdo detalhado será exibido
    const detailSection = document.getElementById('project-detail');
    
    // Se não for a página de detalhes, carregamos o grid de projetos (index)
    if (!detailSection) {
        loadProjectGrid(); 
        return; 
    } 
    
    // Obtém o parâmetro “id” da URL (ex: project-detail.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    let projectId = urlParams.get('id');
    
    // Se não houver ID na URL, define como “1” (primeiro projeto)
    if (!projectId) {
        projectId = '1'; 
    }
    
    // Se o objeto global `projectData` não estiver disponível, exibe erro crítico
    if (typeof projectData === 'undefined') {
         detailSection.innerHTML = `
             <h1 class="animatable-title">Erro Crítico!</h1>
             <p>Não foi possível carregar o banco de dados de projetos.</p>
         `;
         return;
    }

    // Busca o projeto com base no ID
    const project = projectData[projectId]; 

    // Caso o ID não corresponda a nenhum projeto, encerra
    if (!project) {
        return; 
    }

    // ==============================================================
    // Montagem do conteúdo dinâmico com textos traduzidos
    // ==============================================================
    const localizedTitle = getLocalizedText(project.title);
    const localizedOverview = getLocalizedText(project.overview);

    // Atualiza o título da aba do navegador
    document.title = `${localizedTitle} | Detalhes`;
    
    // Limpa o conteúdo anterior da seção
    detailSection.innerHTML = ''; 
    
    // Constrói o HTML completo da página de detalhes do projeto
    let htmlContent = `
        <p class="subtitle">
            <a href="index.html#projects" data-i18n="detail.back">← VOLTAR PARA PROJETOS</a>
        </p>
        
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
    
    // Percorre os desafios do projeto e adiciona suas traduções
    project.challenges.forEach(c => {
        const localizedChallengeName = getLocalizedText(c.name);
        const localizedChallengeSolution = getLocalizedText(c.solution);

        htmlContent += `
            <li><strong>${localizedChallengeName}:</strong> ${localizedChallengeSolution}</li>
        `;
    });

    // Fecha a lista e adiciona os links do GitHub e vídeo
    htmlContent += `
            </ul>

            <h2>Links</h2>
            <a href="${project.github}" class="btn primary-btn" target="_blank" data-i18n="detail.github">
                VER CÓDIGO NO GITHUB
            </a>
            <a href="${project.video}" class="btn secondary-btn" target="_blank" data-i18n="detail.video">
                VER VÍDEO DEMONSTRATIVO
            </a>
        </div>
    `;
    
    // Insere o HTML final na página
    detailSection.innerHTML = htmlContent;
    
    // ==============================================================
    // Reaplica traduções e animações ao conteúdo recém-inserido
    // ==============================================================
    applyTranslations();
    
    // Envolve cada letra do título em <span> para animar
    const newTitleElement = document.getElementById('project-title');
    if (newTitleElement) {
         wrapTitleLetters(newTitleElement);
         animateTitles();
    }
}
