/**
 * router.js — SPA Router
 */

const VIEW_ROOT = "assets/js/views/";
let MAIN;

async function loadView(viewName) {
    try {
        const response = await fetch(`${VIEW_ROOT}${viewName}.html`);
        const html = await response.text();
        MAIN.innerHTML = html;
        setActiveNav(viewName); // update nav after view loads
    } catch {
        MAIN.innerHTML = `<p>⚠️ View not found: <strong>${viewName}</strong></p>`;
        setActiveNav(null); // optional: clear active if view missing
    }
}

// Add active class to corresponding nav button
function setActiveNav(viewName) {
    document.querySelectorAll(".nav-links .button").forEach((btn) => {
        if (btn.dataset.view === viewName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

export function initRouter(defaultView = "introduction") {
    MAIN = document.getElementById("spa-root");

    // Attach click handlers
    document.querySelectorAll(".nav-links .button").forEach((navItem) => {
        navItem.addEventListener("click", () => {
            const view = navItem.dataset.view;
            loadView(view);
        });
    });

    loadView(defaultView);
}
