import { startQuiz } from './quiz.js'; // Depends on quiz.js to start the quiz

/**
 * Switches the active content section and updates nav button states.
 * @param {string} sectionId - The ID of the section to show.
 */
export function switchTab(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById('dropdown-toggle-btn').classList.remove('active');
    document.getElementById('dropdown-practice-btn').classList.remove('active'); 
    
    const newSection = document.getElementById(sectionId);
    if (newSection) {
        newSection.classList.add('active');
    }
    
    const newLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (newLink) {
        newLink.classList.add('active');
        
        if (newLink.classList.contains('dropdown-item')) {
            const parentDropdown = newLink.closest('.dropdown-content');
            if (parentDropdown) {
                const parentId = parentDropdown.id;
                if (parentId === 'core-concepts-dropdown') {
                    document.getElementById('dropdown-toggle-btn').classList.add('active');
                } else if (parentId === 'practice-dropdown') {
                    document.getElementById('dropdown-practice-btn').classList.add('active');
                }
            }
        }
    }

    // Start the quiz if the quiz tab is selected
    if (sectionId === 'practice-quiz') {
        startQuiz();
    }
}

/**
 * Sets up all event listeners for navigation elements.
 */
export function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            const sectionId = this.getAttribute('data-section');
            
            if (sectionId) {
                switchTab(sectionId);
                // Scroll slightly below sticky nav
                const navHeight = document.querySelector('.nav-buttons').offsetHeight;
                const sectionTop = document.getElementById(sectionId).offsetTop;
                window.scrollTo({ top: sectionTop - navHeight - 10, behavior: 'smooth' }); // Added offset
            }
            
            if (this.classList.contains('dropdown-item')) {
                document.getElementById('core-concepts-dropdown').classList.remove('show');
                document.getElementById('practice-dropdown').classList.remove('show');
                document.getElementById('options-dropdown').classList.remove('show'); // Close options dropdown too
            }
        });
    });

    // Dropdown toggles
    document.getElementById('dropdown-toggle-btn').addEventListener('click', function() {
        document.getElementById('core-concepts-dropdown').classList.toggle('show');
        document.getElementById('practice-dropdown').classList.remove('show'); 
        document.getElementById('options-dropdown').classList.remove('show');
    });
    
    document.getElementById('dropdown-practice-btn').addEventListener('click', function() {
        document.getElementById('practice-dropdown').classList.toggle('show');
        document.getElementById('core-concepts-dropdown').classList.remove('show'); 
        document.getElementById('options-dropdown').classList.remove('show');
    });

    document.getElementById('dropdown-options-btn').addEventListener('click', function() {
        document.getElementById('options-dropdown').classList.toggle('show');
        document.getElementById('core-concepts-dropdown').classList.remove('show'); 
        document.getElementById('practice-dropdown').classList.remove('show'); 
    });

    // Close dropdowns if clicking outside
    window.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.getElementById('core-concepts-dropdown').classList.remove('show');
            document.getElementById('practice-dropdown').classList.remove('show');
            document.getElementById('options-dropdown').classList.remove('show');
        }
    });
}