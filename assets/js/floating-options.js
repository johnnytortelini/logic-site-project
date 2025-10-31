// options.js
export function setupFloatingOptions() {
    const mainBtn = document.getElementById("options-main");
    const container = document.querySelector(".floating-options");

    if (!mainBtn || !container) return;

    // Toggle sub-buttons
    mainBtn.addEventListener("click", () => {
        container.classList.toggle("active");
    });

    // Close sub-buttons on outside click
    document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
            container.classList.remove("active");
        }
    });

    // Dark mode toggle button
    const darkBtn = document.getElementById("toggle-darkmode");

    // Initialize icon
    function updateDarkModeIcon() {
        darkBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    }

    // Apply initial icon
    updateDarkModeIcon();

    // Toggle dark mode and switch icon
    darkBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent closing the floating menu
        document.body.classList.toggle("dark-mode");
        updateDarkModeIcon();
    });
}
