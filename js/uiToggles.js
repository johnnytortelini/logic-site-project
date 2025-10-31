// This callback will be injected from main.js
let builderResetCallback = null; 

// This state is exported so other modules can read it
export let displayMode = '10'; // Start with '10' as per original init script

const toggleDisplayBtn = document.getElementById('nav-toggle-display-btn');
const darkModeToggleBtn = document.getElementById('nav-dark-mode-toggle');

/**
 * Updates all tables on the page to reflect the current displayMode ('TF' or '10').
 */
export function updateTableDisplay() {
    const trueValue = (displayMode === 'TF') ? 'T' : '1';
    const falseValue = (displayMode === 'TF') ? 'F' : '0';

    document.querySelectorAll('table[id^="table-"], table[id$="-small"], #builder-table-container table, .cheatsheet-table').forEach(table => {
        table.querySelectorAll('td, th').forEach(cell => { 
            const originalText = cell.textContent; 
            
            if (cell.textContent === 'T' || cell.textContent === '1') {
                cell.textContent = trueValue;
            } else if (cell.textContent === 'F' || cell.textContent === '0') {
                cell.textContent = falseValue;
            }
            
            if (cell.classList.contains('builder-cell')) {
                const correct = cell.getAttribute('data-correct');
                if (correct === 'T' || correct === '1') {
                    cell.setAttribute('data-correct', trueValue);
                } else if (correct === 'F' || correct === '0') {
                    cell.setAttribute('data-correct', falseValue);
                }
                if(originalText !== '?') {
                    if (originalText === 'T' || originalText === '1') {
                        cell.textContent = trueValue;
                    } else if (originalText === 'F' || originalText === '0') {
                        cell.textContent = falseValue;
                    }
                }
            }
        });
    });
    
    document.querySelectorAll('select option').forEach(option => {
            if (option.value === 'T' || option.value === '1') {
                option.textContent = (displayMode === 'TF') ? 'True' : '1';
                option.value = (displayMode === 'TF') ? 'T' : '1'; 
            } else if (option.value === 'F' || option.value === '0') {
                option.textContent = (displayMode === 'TF') ? 'False' : '0';
                option.value = (displayMode === 'TF') ? 'F' : '0'; 
            }
    });
    
    // Call the injected callback function if it exists
    if (builderResetCallback) {
        builderResetCallback(); 
    }
}

/**
 * Applies the saved dark/light theme from localStorage on page load.
 */
export function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggleBtn.textContent = 'Switch to Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggleBtn.textContent = 'Switch to Dark Mode';
    }
}

/**
 * Initializes the event listeners for the toggle buttons.
 * @param {function} resetCallback - The resetBuilderCellClick function.
 */
export function initToggles(resetCallback) {
    builderResetCallback = resetCallback;

    toggleDisplayBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        if (displayMode === 'TF') {
            displayMode = '10';
            toggleDisplayBtn.textContent = 'Switch to T/F';
        } else {
            displayMode = 'TF';
            toggleDisplayBtn.textContent = 'Switch to 1/0';
        }
        updateTableDisplay();
        document.getElementById('options-dropdown').classList.remove('show');
    });

    darkModeToggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggleBtn.textContent = 'Switch to Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggleBtn.textContent = 'Switch to Dark Mode';
        }
        document.getElementById('options-dropdown').classList.remove('show');
    });
}