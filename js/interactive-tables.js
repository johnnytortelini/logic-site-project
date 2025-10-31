// Interactive Truth Tables

function updateTable(operator) {
    const trueValue = (displayMode === 'TF') ? 'T' : '1';
    const falseValue = (displayMode === 'TF') ? 'F' : '0';
    
    const pSelectedValueRaw = document.getElementById(`${operator}-p`).value;
    const qSelectedValueRaw = document.getElementById(`${operator}-q`).value;

    const pValue = (pSelectedValueRaw === 'T' || pSelectedValueRaw === '1') ? trueValue : 
                   (pSelectedValueRaw === 'F' || pSelectedValueRaw === '0') ? falseValue : '';
    const qValue = (qSelectedValueRaw === 'T' || qSelectedValueRaw === '1') ? trueValue : 
                   (qSelectedValueRaw === 'F' || qSelectedValueRaw === '0') ? falseValue : '';

    const table = document.getElementById(`table-${operator}`);
    const rows = table.querySelectorAll('tr');
    
    // Remove all highlights
    rows.forEach(row => row.classList.remove('highlighted'));
    
    // Highlight matching rows
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const cells = row.querySelectorAll('td');
        const cellP = cells.length >= 1 ? cells[0].textContent : null;
        const cellQ = cells.length >= 2 ? cells[1].textContent : null;

        let match = false;
        if (pValue && qValue) {
            match = (cellP === pValue && cellQ === qValue);
        } else if (pValue) {
            match = (cellP === pValue);
        } else if (qValue) {
            match = (cellQ === qValue);
        } else {
            match = false;
        }

        if (match) {
            row.classList.add('highlighted');
        }
    });
}

function updateTableNegation() {
    const trueValue = (displayMode === 'TF') ? 'T' : '1';
    const falseValue = (displayMode === 'TF') ? 'F' : '0';
    
    const pSelectedValueRaw = document.getElementById('neg-p').value;
    const pValue = (pSelectedValueRaw === 'T' || pSelectedValueRaw === '1') ? trueValue : 
                   (pSelectedValueRaw === 'F' || pSelectedValueRaw === '0') ? falseValue : '';
    
    const table = document.getElementById('table-neg');
    const rows = table.querySelectorAll('tr');
    
    // Remove all highlights
    rows.forEach(row => row.classList.remove('highlighted'));
    
    // Highlight matching row
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const cells = row.querySelectorAll('td');
        if (cells.length >= 1 && pValue && cells[0].textContent === pValue) {
            row.classList.add('highlighted');
        }
    });
}

// Add event listeners for all operators
['and', 'or', 'implies', 'iff', 'xor'].forEach(operator => {
    document.getElementById(`${operator}-p`).addEventListener('change', () => updateTable(operator));
    document.getElementById(`${operator}-q`).addEventListener('change', () => updateTable(operator));
});

// Negation operator
document.getElementById('neg-p').addEventListener('change', updateTableNegation);

// Reset buttons
document.querySelectorAll('.interactive-table-section .reset-btn').forEach(button => {
    button.addEventListener('click', function() {
        const operator = this.getAttribute('data-operator');
        
        if (operator === 'neg') {
            document.getElementById('neg-p').value = '';
            updateTableNegation();
        } else {
            document.getElementById(`${operator}-p`).value = '';
            document.getElementById(`${operator}-q`).value = '';
            updateTable(operator);
        }
    });
});
