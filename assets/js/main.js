// main.js
import { setupNavShadow, setupHamburger } from "./nav.js";
import { initRouter } from "./router.js";
import { setupFloatingOptions } from "./floating-options.js"; 

document.addEventListener("DOMContentLoaded", () => {
    setupNavShadow();
    setupHamburger(); 
    initRouter();
    setupFloatingOptions(); 
});
