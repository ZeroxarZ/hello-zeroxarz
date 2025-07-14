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
            
            // Afficher la page demandée avec animation
            setTimeout(() => {
                document.getElementById(pageId).classList.add('active');
                
                // Animer les éléments de la page
                const elements = document.querySelectorAll(`#${pageId} .project-card, #${pageId} .skill-category, #${pageId} .service-card`);
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate');
                    }, index * 100);
                });
            }, 100);
            
            // Mettre à jour la navigation active
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Trouver et activer le lien correspondant
            const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
            if (activeLink && activeLink.classList.contains('nav-link')) {
                activeLink.classList.add('active');
            }
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

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
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
                }, 50);
            });
        }

        // Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animer les stats si c'est la section about
                    if (entry.target.closest('#about')) {
                        animateStats();
                    }
                }
            });
        }, observerOptions);

        // Gestion du formulaire de contact
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Envoi en cours...';
            submitBtn.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = 'linear-gradient(135deg, #64ffda, #3b82f6)';
                    this.reset();
                }, 3000);
            }, 1500);
        });

        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();

            // Observer tous les éléments animables
            document.querySelectorAll('.project-card, .skill-category, .service-card, .about-content').forEach(el => {
                observer.observe(el);
            });

            // Animation initiale des cartes de projet (affichage immédiat si la page d'accueil est active)
            const homePage = document.getElementById('home');
            if (homePage.classList.contains('active')) {
                setTimeout(() => {
                    document.querySelectorAll('#home .project-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }, 500);
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