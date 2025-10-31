import { setupNavShadow, setupHamburger } from "./nav.js";
import { initRouter } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
    setupNavShadow();
    setupHamburger(); 
    initRouter();
});
