import { setupNavShadow } from "./nav.js";
import { initRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
    setupNavShadow();
    initRouter("introduction");     // initialize SPA view swapping
});
