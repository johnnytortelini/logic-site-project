// Global State
let displayMode = '10'; // 'TF' or '10'

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on load
    applySavedTheme();

    // Find the 'active' link from the HTML and use its data-section
    const defaultActiveLink = document.querySelector('.nav-link.active');
    const defaultSection = defaultActiveLink ? defaultActiveLink.getAttribute('data-section') : 'intro';
    switchTab(defaultSection);
    
    // Close all dropdowns
    document.getElementById('core-concepts-dropdown').classList.remove('show');
    document.getElementById('practice-dropdown').classList.remove('show');
    
    // Update tables to initial display mode (10) on load
    displayMode = '10';
    document.getElementById('nav-toggle-display-btn').textContent = 'Switch to T/F';
    updateTableDisplay();
});

// Download HTML functionality
document.getElementById('download-html-btn').addEventListener('click', function() {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'logic_reasoning_site.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
});

// Resource link functionality
document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('resource-link')) {
        switchTab('resources');
        const navHeight = document.querySelector('.nav-buttons').offsetHeight;
        window.scrollTo({ 
            top: document.getElementById('resources').offsetTop - navHeight - 10, 
            behavior: 'smooth' 
        });
    }
});
