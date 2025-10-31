/**
 * router.js — SPA Router
 */

const VIEW_ROOT = "assets/js/views/";
let MAIN; // declare here but set later

async function loadView(viewName) {
    try {
        const response = await fetch(`${VIEW_ROOT}${viewName}.html`);
        const html = await response.text();
        MAIN.innerHTML = html;
    } catch {
        MAIN.innerHTML = `<p>⚠️ View not found: <strong>${viewName}</strong></p>`;
    }
}

export function initRouter(defaultView = "introduction") {
    MAIN = document.getElementById("spa-root"); // assign here (DOM exists)

    document.querySelectorAll("[data-view]").forEach((navItem) => {
        navItem.addEventListener("click", () => {
            loadView(navItem.dataset.view);
        });
    });

    loadView(defaultView); // initial render
}
