// ==========================================
// ZEROXARZ PORTFOLIO - JAVASCRIPT MODERNE
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    createStarryBackground();
    createCustomCursor();
    initializeAnimations();
    initializeNavigation();
    createShootingStars();
    
    // Afficher la page d'accueil par défaut
    showPage('home');
});

// ==========================================
// NAVIGATION ENTRE PAGES
// ==========================================

function showPage(pageId) {
    // Réinitialiser la protection des compteurs quand on change de page
    if (pageId === 'about') {
        countersInitialized = false;
    }
    
    // Masquer toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 10);
    }
    
    // Mettre à jour la navigation active
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Activer le lien correspondant
    const activeLink = document.querySelector(`[onclick*="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Si c'est la page about, initialiser les compteurs
    if (pageId === 'about') {
        // Simple déclenchement direct
        setTimeout(() => {
            initializeCounters();
        }, 600);
    }
}

// Rendre la fonction globale pour les onclick
window.showPage = showPage;

// ==========================================
// COMPTEURS STATISTIQUES
// ==========================================

let countersInitialized = false; // Protection contre les appels multiples

function initializeCounters() {
    if (countersInitialized) {
        console.log('Compteurs déjà initialisés, abandon');
        return;
    }
    
    console.log('Initialisation des compteurs...'); // Debug
    const statNumbers = document.querySelectorAll('.stat-number');
    console.log('Nombre d\'éléments trouvés:', statNumbers.length); // Debug
    
    if (statNumbers.length === 0) {
        console.log('Aucun élément .stat-number trouvé !');
        return;
    }
    
    countersInitialized = true; // Marquer comme initialisé
    
    // Valeurs fixes à animer
    const targetValues = ['5+', '15+', '4+', '100%'];
    
    statNumbers.forEach((stat, index) => {
        console.log(`Élément ${index}:`, stat); // Debug
        
        if (index >= targetValues.length) return; // Sécurité
        
        const targetValue = targetValues[index];
        console.log('Valeur cible:', targetValue); // Debug
        
        // Extraire le nombre et le suffixe
        let numericValue = 0;
        let suffix = '';
        
        if (targetValue.includes('%')) {
            numericValue = parseInt(targetValue.replace('%', ''));
            suffix = '%';
        } else if (targetValue.includes('+')) {
            numericValue = parseInt(targetValue.replace('+', ''));
            suffix = '+';
        } else {
            const numbers = targetValue.match(/\d+/);
            if (numbers) {
                numericValue = parseInt(numbers[0]);
                suffix = targetValue.replace(numbers[0], '');
            }
        }
        
        console.log('Valeur numérique:', numericValue, 'Suffixe:', suffix); // Debug
        
        // Accepter même les valeurs 0 ou 1
        if (!isNaN(numericValue) && numericValue >= 0) {
            // Réinitialiser l'élément
            stat.textContent = '0' + suffix;
            
            // Démarrer l'animation avec un petit délai pour chaque élément
            setTimeout(() => {
                animateCounter(stat, 0, numericValue, suffix, 2000);
            }, index * 200); // Délai progressif de 200ms entre chaque compteur
        } else {
            console.log('Valeur non valide pour:', targetValue);
        }
    });
}

function animateCounter(element, start, end, suffix, duration) {
    console.log(`Animation du compteur: ${start} → ${end}${suffix}`); // Debug
    
    // S'assurer que l'élément commence à 0
    element.textContent = start + suffix;
    
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Utiliser une fonction d'easing pour un effet plus fluide
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // S'assurer que la valeur finale est correcte
            element.textContent = end + suffix;
            console.log(`Animation terminée: ${end}${suffix}`); // Debug
        }
    };
    
    requestAnimationFrame(updateCounter);
}

// Observer pour déclencher l'animation des compteurs quand ils deviennent visibles
function setupCounterObserver() {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) {
        console.log('Section stats-grid non trouvée');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Vérifier si les animations n'ont pas déjà été lancées
                const statNumbers = document.querySelectorAll('.stat-number');
                const alreadyAnimated = Array.from(statNumbers).some(stat => stat.dataset.animated === 'true');
                
                if (!alreadyAnimated) {
                    console.log('Stats visibles et pas encore animées, déclenchement');
                    initializeCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3 // Déclencher quand 30% de l'élément est visible
    });
    
    observer.observe(statsGrid);
}

// ==========================================
// ARRIÈRE-PLAN ÉTOILÉ
// ==========================================

function createStarryBackground() {
    // Créer le conteneur d'étoiles s'il n'existe pas
    let starsContainer = document.querySelector('.stars-bg');
    if (!starsContainer) {
        starsContainer = document.createElement('div');
        starsContainer.className = 'stars-bg';
        document.body.appendChild(starsContainer);
    }
    
    // Générer 200 étoiles aléatoires
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Tailles aléatoires
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        star.classList.add(randomSize);
        
        // Position aléatoire
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Animation delay aléatoire
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}

// ==========================================
// ÉTOILES FILANTES
// ==========================================

function createShootingStars() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de chance
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // Position de départ aléatoire
            shootingStar.style.left = Math.random() * 100 + '%';
            shootingStar.style.top = Math.random() * 100 + '%';
            
            document.body.appendChild(shootingStar);
            
            // Supprimer après l'animation
            setTimeout(() => {
                if (shootingStar.parentNode) {
                    shootingStar.parentNode.removeChild(shootingStar);
                }
            }, 3000);
        }
    }, 2000);
}

// ==========================================
// CURSEUR PERSONNALISÉ
// ==========================================

function createCustomCursor() {
    // Créer les éléments de curseur
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // Suivre le mouvement de la souris
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animation fluide pour le suiveur
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Effets sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .service-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ==========================================
// ANIMATIONS ET RÉVÉLATIONS
// ==========================================

function initializeAnimations() {
    // Animation fade-in sur scroll
    function revealFadeIn() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', revealFadeIn);
    revealFadeIn(); // Appel initial
    
    // Observer pour déclencher les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    });
    
    // Observer les éléments à animer
    document.querySelectorAll('.project-card, .skill-category, .service-card').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// NAVIGATION
// ==========================================

function initializeNavigation() {
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Navigation active sur scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Appel initial
}

// ==========================================
// ANIMATION DE CHARGEMENT
// ==========================================

window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-animation');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hide');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }
});
