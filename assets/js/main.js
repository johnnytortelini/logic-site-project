import { setupNavShadow } from "./nav.js";
import { initRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
    setupNavShadow();
    initRouter();     // initialize SPA view swapping
});
