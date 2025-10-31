// Navigation functionality

function switchTab(sectionId) {
    // Remove active class from all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById('dropdown-toggle-btn').classList.remove('active');
    document.getElementById('dropdown-practice-btn').classList.remove('active');
    
    // Activate the new section
    const newSection = document.getElementById(sectionId);
    if (newSection) {
        newSection.classList.add('active');
    }
    
    // Activate the corresponding nav link
    const newLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (newLink) {
        newLink.classList.add('active');
        
        // If it's a dropdown item, activate the parent dropdown button
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

// Add click listeners to all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        
        if (sectionId) {
            switchTab(sectionId);
            // Scroll slightly below sticky nav
            const navHeight = document.querySelector('.nav-buttons').offsetHeight;
            const sectionTop = document.getElementById(sectionId).offsetTop;
            window.scrollTo({ 
                top: sectionTop - navHeight - 10, 
                behavior: 'smooth' 
            });
        }
        
        // Close dropdown menus after clicking
        if (this.classList.contains('dropdown-item')) {
            document.getElementById('core-concepts-dropdown').classList.remove('show');
            document.getElementById('practice-dropdown').classList.remove('show');
            document.getElementById('options-dropdown').classList.remove('show');
        }
    });
});

// Dropdown toggle functionality
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

// Close dropdowns when clicking outside
window.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.getElementById('core-concepts-dropdown').classList.remove('show');
        document.getElementById('practice-dropdown').classList.remove('show');
        document.getElementById('options-dropdown').classList.remove('show');
    }
});
