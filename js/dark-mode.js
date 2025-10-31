// Dark Mode Toggle

const darkModeToggleBtn = document.getElementById('nav-dark-mode-toggle');

darkModeToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        darkModeToggleBtn.textContent = 'Switch to Dark Mode';
    }
    // Close the dropdown
    document.getElementById('options-dropdown').classList.remove('show');
});

// Apply theme on load
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggleBtn.textContent = 'Switch to Dark Mode';
    }
}
