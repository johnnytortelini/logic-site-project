import { displayMode } from './uiToggles.js'; // Depends on the current display mode

const tableBuilderExamples = { 
    'ex1': {
        title: '(~p ∨ q) → p',
        headers: ['p', 'q', '~p', '~p ∨ q', '(~p ∨ q) → p'],
        rows: [ { p: 'T', q: 'T', col2: 'F', col3: 'T', col4: 'T' }, { p: 'T', q: 'F', col2: 'F', col3: 'F', col4: 'T' }, { p: 'F', q: 'T', col2: 'T', col3: 'T', col4: 'F' }, { p: 'F', q: 'F', col2: 'T', col3: 'T', col4: 'F' } ],
        classification: 'Contingency' 
    },
    // ... (Paste ALL your other table builder examples here) ...
    'ex6': {
        title: '(p ∨ q) ∧ (~p ∧ ~q) (Contradiction)',
        headers: ['p', 'q', 'p ∨ q', '~p', '~q', '~p ∧ ~q', '(p ∨ q) ∧ (~p ∧ ~q)'],
        rows: [ { p: 'T', q: 'T', col2: 'T', col3: 'F', col4: 'F', col5: 'F', col6: 'F' }, { p: 'T', q: 'F', col2: 'T', col3: 'F', col4: 'T', col5: 'F', col6: 'F' }, { p: 'F', q: 'T', col2: 'T', col3: 'T', col4: 'F', col5: 'F', col6: 'F' }, { p: 'F', q: 'F', col2: 'F', col3: 'T', col4: 'T', col5: 'T', col6: 'F' } ],
        classification: 'Contradiction' 
    }
};

const builderContainer = document.getElementById('builder-table-container');
let isBuilderListenerActive = false;

function handleBuilderCellClick(e) {
    if (e.target.classList.contains('builder-cell')) {
        const cell = e.target;
        const trueValue = (displayMode === 'TF') ? 'T' : '1';
        const falseValue = (displayMode === 'TF') ? 'F' : '0';

        cell.classList.remove('correct', 'incorrect');
        
        if (cell.textContent === '?') {
            cell.textContent = trueValue;
        } else if (cell.textContent === trueValue) {
            cell.textContent = falseValue;
        } else {
            cell.textContent = '?';
        }
    }
}
 
/**
 * Resets the click listener on the builder table (needed when display mode changes).
 */
export function resetBuilderCellClick() {
    if(!builderContainer) return;
    const builderTableExists = builderContainer.querySelector('table');
    if (builderTableExists) { 
        if (isBuilderListenerActive) {
        builderContainer.removeEventListener('click', handleBuilderCellClick);
        }
        builderContainer.addEventListener('click', handleBuilderCellClick);
        isBuilderListenerActive = true;
    } else {
        if (isBuilderListenerActive) {
        builderContainer.removeEventListener('click', handleBuilderCellClick);
        isBuilderListenerActive = false;
        }
    }
}

/**
 * Sets up all event listeners for the truth table builder.
 */
export function initTruthTableBuilder() {
    if(!builderContainer) return;

    document.getElementById('builder-generate-btn').addEventListener('click', function() {
        const selectedExampleId = document.getElementById('builder-select').value;
        if (!selectedExampleId) {
            builderContainer.innerHTML = '<p style="color: red;">Please select an example first.</p>';
            return;
        }
        
        const example = tableBuilderExamples[selectedExampleId];
        const trueValue = (displayMode === 'TF') ? 'T' : '1';
        const falseValue = (displayMode === 'TF') ? 'F' : '0';
        
        let tableHTML = '<div class="table-wrapper">';
        tableHTML += '<table>';
        tableHTML += '<tr>';
        example.headers.forEach(h => { tableHTML += `<th>${h}</th>`; });
        tableHTML += '</tr>';
        
        example.rows.forEach((row, rowIndex) => {
            tableHTML += '<tr>';
            tableHTML += `<td>${row.p === 'T' ? trueValue : falseValue}</td>`;
            tableHTML += `<td>${row.q === 'T' ? trueValue : falseValue}</td>`;
            
            let colIndex = 2; 
            while(row[`col${colIndex}`] !== undefined) {
                    const correctValBase = row[`col${colIndex}`]; // Store as T/F
                    const correctValDisplay = correctValBase === 'T' ? trueValue : falseValue;
                tableHTML += `<td class="builder-cell" data-correct-base="${correctValBase}" data-correct="${correctValDisplay}">?</td>`;
                colIndex++;
            }
            
            tableHTML += '</tr>';
        });
        
        tableHTML += '</table>';
        tableHTML += '</div>';
        
        tableHTML += '<div class="table-controls" style="justify-content: center; margin-top: 15px;">';
        tableHTML += '<button id="builder-check-btn" class="action-btn">Check My Work</button>';
        tableHTML += '<button id="builder-reset-btn" class="reset-btn">Reset Table</button>';
        tableHTML += '</div>';
        tableHTML += '<div id="builder-feedback-message" class="feedback-box" style="display: none; margin-top: 20px; text-align: center;"></div>';
        
        builderContainer.innerHTML = tableHTML;
        resetBuilderCellClick(); 
    });

    // Delegated listener for check/reset buttons
    builderContainer.addEventListener('click', function(e) {
        if (e.target.id === 'builder-check-btn') {
            const cells = builderContainer.querySelectorAll('.builder-cell');
            const feedbackMsg = builderContainer.querySelector('#builder-feedback-message');
            feedbackMsg.classList.remove('correct', 'incorrect');
            
            let allCorrect = true;
            cells.forEach(cell => {
                const correctValue = cell.getAttribute('data-correct'); 
                if (cell.textContent === correctValue) {
                    cell.classList.add('correct');
                    cell.classList.remove('incorrect');
                } else {
                    cell.classList.add('incorrect');
                    cell.classList.remove('correct');
                    allCorrect = false;
                }
            });
            
            if (allCorrect) {
                const selectedExampleId = document.getElementById('builder-select').value;
                const classification = tableBuilderExamples[selectedExampleId].classification;
                feedbackMsg.innerHTML = `<h4><span class="truth-value-true">✓ Analysis Complete!</span></h4><p>All values are correct. The final expression is a <strong>${classification}</strong>.</p>`;
                feedbackMsg.classList.add('correct');
            } else {
                feedbackMsg.innerHTML = `<h4><span class="truth-value-false">✗ Not quite...</span></h4><p>Some values are incorrect (marked in red). Try again!</p>`;
                feedbackMsg.classList.add('incorrect');
            }
            feedbackMsg.style.display = 'block';
        }
        
        else if (e.target.id === 'builder-reset-btn') {
            const cells = builderContainer.querySelectorAll('.builder-cell');
            cells.forEach(cell => {
                cell.textContent = '?';
                cell.classList.remove('correct', 'incorrect');
            });
            
            const feedbackMsg = builderContainer.querySelector('#builder-feedback-message');
            if (feedbackMsg) {
                feedbackMsg.style.display = 'none';
                feedbackMsg.innerHTML = '';
                feedbackMsg.classList.remove('correct', 'incorrect');
            }
        }
    });
}