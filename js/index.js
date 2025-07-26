// Switch mode sombre/clair
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
function setTheme(mode) {
    if (mode === 'light') {
        document.body.classList.remove('dark-theme');
        themeIcon.classList.remove('bi-moon');
        themeIcon.classList.add('bi-brightness-high');
    } else {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('bi-brightness-high');
        themeIcon.classList.add('bi-moon');
    }
    localStorage.setItem('theme', mode);
}
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
});
// Initialisation du thème au chargement
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'dark' ? 'dark' : 'light');
});
// Animation fade-in sur les éléments avec la classe .fade-in
function revealFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('DOMContentLoaded', revealFadeIn);
window.addEventListener('scroll', revealFadeIn);
        // Animation de chargement
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hide');
            }, 1000);
        });

        // Génération des particules
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Navigation entre les pages

        function showPage(pageId) {
            // Masquer toutes les pages
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => {
                page.classList.remove('active');
            });
            // Afficher la page demandée
            const pageToShow = document.getElementById(pageId);
            if (pageToShow) {
                pageToShow.classList.add('active');
            }
            // Mettre à jour la navigation active
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (activeLink && activeLink.classList.contains('nav-link')) {
                activeLink.classList.add('active');
            }
            // Animation des projets si on affiche la home
            if (pageId === 'home') {
                setTimeout(() => {
                    document.querySelectorAll('#home .project-card').forEach((card, index) => {
                        card.classList.remove('animate');
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }, 300);
            }
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function showPageFromHash() {
            let hash = window.location.hash;
            let pageId = '';
            if (!hash || hash === '#' || hash === '') {
                pageId = 'home';
            } else {
                pageId = hash.replace('#', '');
            }
            showPage(pageId);
        }

        // Affiche la bonne page au chargement
        showPageFromHash();

        // Gère le changement de hash (navigation via l'URL)
        window.addEventListener('hashchange', showPageFromHash);

        // Effet de scroll sur la navbar
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Animation des statistiques
function animateStats() {
    const statNumbers = document.querySelectorAll('#about .stat-number');
    statNumbers.forEach(stat => {
        const original = stat.getAttribute('data-original') || stat.textContent;
        stat.setAttribute('data-original', original);
        const target = parseInt(original);
        let current = 0;
        const increment = target / 50;
        stat.textContent = '0' + (original.includes('+') ? '+' : '') + (original.includes('%') ? '%' : '');
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = original;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (original.includes('+') ? '+' : '') + (original.includes('%') ? '%' : '');
            }
        }, 50);
    });
}

// Relance l'animation toutes les 15 secondes
setInterval(() => {
    if (document.getElementById('about').classList.contains('active')) {
        animateStats();
    }
}, 15000);


        // Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Animer les stats si c'est la section about-content
                    if (entry.target.classList.contains('about-content')) {
                        animateStats();
                    }
                }
            });
        }, observerOptions);


        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();

            // Observer tous les éléments animables
            document.querySelectorAll('.project-card, .skill-category, .service-card, .about-content').forEach(el => {
                observer.observe(el);
            });

            // Forcer l'animation des projets si la page d'accueil est active ou affichée au chargement
            const homePage = document.getElementById('home');
            if (homePage.classList.contains('active') || window.location.hash === '' || window.location.hash === '#') {
                setTimeout(() => {
                    document.querySelectorAll('#home .project-card').forEach((card, index) => {
                        card.classList.remove('animate');
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }, 300);
            }
        });

        // Effet de parallaxe léger
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

