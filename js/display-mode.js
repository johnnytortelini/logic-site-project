// Display Mode Toggle (T/F vs 1/0)

const toggleDisplayBtn = document.getElementById('nav-toggle-display-btn');

function updateTableDisplay() {
    const trueValue = (displayMode === 'TF') ? 'T' : '1';
    const falseValue = (displayMode === 'TF') ? 'F' : '0';

    // Update all tables
    document.querySelectorAll('table[id^="table-"], table[id$="-small"], #builder-table-container table, .cheatsheet-table').forEach(table => {
        table.querySelectorAll('td, th').forEach(cell => {
            const originalText = cell.textContent;
            
            // Update truth values
            if (cell.textContent === 'T' || cell.textContent === '1') {
                cell.textContent = trueValue;
            } else if (cell.textContent === 'F' || cell.textContent === '0') {
                cell.textContent = falseValue;
            }
            
            // Update builder cells
            if (cell.classList.contains('builder-cell')) {
                const correct = cell.getAttribute('data-correct');
                // Always update data-correct to the current mode's value
                if (correct === 'T' || correct === '1') {
                    cell.setAttribute('data-correct', trueValue);
                } else if (correct === 'F' || correct === '0') {
                    cell.setAttribute('data-correct', falseValue);
                }
                // Update displayed text only if it's not '?'
                if (originalText !== '?') {
                    if (originalText === 'T' || originalText === '1') {
                        cell.textContent = trueValue;
                    } else if (originalText === 'F' || originalText === '0') {
                        cell.textContent = falseValue;
                    }
                }
            }
        });
    });
    
    // Update dropdown options
    document.querySelectorAll('select option').forEach(option => {
        if (option.value === 'T' || option.value === '1') {
            option.textContent = (displayMode === 'TF') ? 'True' : '1';
            option.value = (displayMode === 'TF') ? 'T' : '1';
        } else if (option.value === 'F' || option.value === '0') {
            option.textContent = (displayMode === 'TF') ? 'False' : '0';
            option.value = (displayMode === 'TF') ? 'F' : '0';
        }
    });
    
    // Reset builder cell click handlers
    resetBuilderCellClick();
}

// Toggle button event listener
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
    // Close the dropdown after clicking
    document.getElementById('options-dropdown').classList.remove('show');
});
