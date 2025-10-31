export function setupNavShadow() {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    if (!nav || !header) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            // If header leaves viewport → nav is in sticky mode
            nav.classList.toggle("stuck", !entry.isIntersecting);
        },
        { threshold: 0 } // trigger as soon as header leaves view
    );

    observer.observe(header);
}
