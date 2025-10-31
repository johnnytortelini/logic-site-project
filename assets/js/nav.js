export function setupNavShadow() {
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 0);
    });
}