// assets/js/nav.js

/**
 * Handles sticky shadow when navbar leaves header area
 */
export function setupNavShadow() {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    if (!nav || !header) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            nav.classList.toggle("stuck", !entry.isIntersecting);
        },
        { threshold: 0 }
    );

    observer.observe(header);
}

/**
 * Enables hamburger menu toggle on small screens
 */
export function setupHamburger() {
    const toggleBtn = document.getElementById("nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!toggleBtn || !navLinks) return;

    // Toggle menu on hamburger click
    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        const target = e.target;

        // If menu is open AND the click is NOT on the nav or the toggle button
        if (
            navLinks.classList.contains("open") &&
            !navLinks.contains(target) &&
            target !== toggleBtn
        ) {
            navLinks.classList.remove("open");
        }
    });
}
