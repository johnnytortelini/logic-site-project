// Modal Functionality

function setupModal(toggleId, modalId, closeId) {
    const toggleLink = document.getElementById(toggleId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);
    
    if (!toggleLink || !modal || !closeBtn) return;

    toggleLink.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.getElementById('options-dropdown').classList.remove('show');
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

// Setup About Us modal
setupModal('nav-about-us-toggle', 'about-us-modal', 'modal-close-btn');

// Setup Cheatsheet modal
setupModal('cheatsheet-toggle', 'cheatsheet-modal', 'cheatsheet-close-btn');

// Print functionality for cheatsheet
const printMediaQuery = window.matchMedia('print');

printMediaQuery.addEventListener('change', function(mql) {
    if (!mql.matches) {
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
