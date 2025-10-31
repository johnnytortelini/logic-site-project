// Import functions from all our new modules
import { switchTab, initNavigation } from './navigation.js';
import { initToggles, applySavedTheme, updateTableDisplay } from './uiToggles.js';
import { initInteractiveTables } from './interactiveTables.js';
import { initQuiz } from './quiz.js';
import { initTruthTableBuilder, resetBuilderCellClick } from './truthTableBuilder.js';
import { initModals } from './modals.js';
import { initDownloadButton } from './utils.js';

// This runs once the entire HTML page has loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Apply saved theme (light/dark) first
    applySavedTheme();

    // 2. Initialize all modules, injecting dependencies where needed
    // We pass 'resetBuilderCellClick' to the toggles module
    initToggles(resetBuilderCellClick); 
    
    // We pass 'switchTab' to the quiz module to break a circular dependency
    initQuiz(switchTab); 
    
    initNavigation();
    initInteractiveTables();
    initTruthTableBuilder();
    initModals();
    initDownloadButton();

    // 3. Set the default active tab based on the HTML
    const defaultActiveLink = document.querySelector('.nav-link.active');
    const defaultSection = defaultActiveLink ? defaultActiveLink.getAttribute('data-section') : 'intro';
    switchTab(defaultSection);
    
    // 4. Close dropdowns on load
    document.getElementById('core-concepts-dropdown').classList.remove('show');
    document.getElementById('practice-dropdown').classList.remove('show');
    
    // 5. Run updateTableDisplay once on load to set the initial 1/0 format
    updateTableDisplay();
});