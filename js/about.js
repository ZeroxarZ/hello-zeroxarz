// JS spécifique à la page à propos (stats animées)

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const plus = stat.textContent.includes('+') ? '+' : '';
        const percent = stat.textContent.includes('%') ? '%' : '';
        stat.textContent = '0' + plus + percent;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + plus + percent;
        }, 50);
    });
}

// Observer pour déclencher l'animation quand la section about-content devient visible
document.addEventListener('DOMContentLoaded', () => {
    const aboutContent = document.querySelector('.about-content');
    if (!aboutContent) return;
    let alreadyAnimated = false;
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !alreadyAnimated) {
                animateStats();
                alreadyAnimated = true;
            }
        });
    }, { threshold: 0.3 });
    observer.observe(aboutContent);
});
