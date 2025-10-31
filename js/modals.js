/**
 * A reusable function to set up a modal's open/close behavior.
 * @param {string} toggleId - The ID of the button that opens the modal.
 * @param {string} modalId - The ID of the modal overlay.
 * @param {string} closeId - The ID of the button that closes the modal.
 */
function setupModal(toggleId, modalId, closeId) {
    const toggleLink = document.getElementById(toggleId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);
    
    if (!toggleLink || !modal || !closeBtn) return;

    toggleLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.getElementById('options-dropdown').classList.remove('show'); // Close dropdown
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

/**
 * Sets up the print logic for the cheat sheet.
 */
function initPrintLogic() {
    const printMediaQuery = window.matchMedia('print');
    
    printMediaQuery.addEventListener('change', function(mql) {
        if (!mql.matches) {
            // This event fires when the print dialog is closed
            document.body.classList.remove('printing-cheatsheet');
        }
    });

    const printBtn = document.getElementById('cheatsheet-print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            document.body.classList.add('printing-cheatsheet');
            window.print();
            // Fallback for browsers that don't fire the 'change' event
            setTimeout(function() {
                document.body.classList.remove('printing-cheatsheet');
            }, 1000); 
        });
    }
}

/**
 * Initializes all modals and print logic.
 */
export function initModals() {
    setupModal('nav-about-us-toggle', 'about-us-modal', 'modal-close-btn');
    setupModal('cheatsheet-toggle', 'cheatsheet-modal', 'cheatsheet-close-btn');
    // Note: The original 'cheatsheet-print-btn' was removed from the HTML.
    // If you add it back, this logic will make it work.
    // initPrintLogic(); 
}