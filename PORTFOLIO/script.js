
        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (3 + Math.random() * 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Smooth scrolling for navigation links
        function initSmoothScrolling() {
            const links = document.querySelectorAll('nav a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Intersection Observer for animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, observerOptions);

            const animatedElements = document.querySelectorAll('.skill-card, .project-card');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
                observer.observe(el);
            });
        }

        // Mouse move parallax effect
        function initParallaxEffect() {
            document.addEventListener('mousemove', (e) => {
                const particles = document.querySelectorAll('.particle');
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                particles.forEach((particle, index) => {
                    const speed = (index % 3 + 1) * 0.5;
                    const x = (mouseX - 0.5) * speed * 10;
                    const y = (mouseY - 0.5) * speed * 10;
                    
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            initSmoothScrolling();
            initScrollAnimations();
            initParallaxEffect();
        });

        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(204, 213, 174, 0.95)';
            } else {
                nav.style.background = 'rgba(204, 213, 174, 0.9)';
            }
        });
    