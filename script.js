/* ============================================
   AMANDA BENEDETTA - MASTER JAVASCRIPT
   amandabenedetta.com
   ============================================ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // ============================================
    // PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    const preloaderCounter = document.querySelector('.preloader-counter');
    let progress = 0;

    const preloaderInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(preloaderInterval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('loading');
                initAnimations();
            }, 500);
        }
        if (preloaderCounter) {
            preloaderCounter.textContent = Math.floor(progress) + '%';
        }
    }, 100);

    document.body.classList.add('loading');

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
            cursorOutline.style.transform = `translate(${outlineX - 18}px, ${outlineY - 18}px)`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .trust-card, .diff-card, .metric-card, .faq-question');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // ============================================
    // NAVIGATION
    // ============================================
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile menu
    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // FLOATING PARTICLES (Hero)
    // ============================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(201, 169, 110, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);

            gsap.to(particle, {
                y: `random(-80, 80)`,
                x: `random(-40, 40)`,
                opacity: `random(0.1, 0.4)`,
                duration: `random(4, 10)`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 3
            });
        }
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounters() {
        document.querySelectorAll('.metric-value[data-count]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2;

            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        duration: duration,
                        innerText: target,
                        snap: { innerText: 1 },
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // ============================================
    // MAIN ANIMATION INITIALIZER
    // ============================================
    function initAnimations() {

        // Hero animations
        const heroTl = gsap.timeline({ delay: 0.3 });

        if (document.querySelector('.hero-pre-headline')) {
            heroTl
                .from('.hero-pre-headline', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: 'power3.out'
                })
                .from('.headline-word', {
                    opacity: 0,
                    y: 40,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out'
                }, '-=0.4')
                .from('.hero-subheadline', {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.3')
                .from('.hero-cta-group .btn', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out'
                }, '-=0.4')
                .from('.hero-image-wrapper', {
                    opacity: 0,
                    scale: 0.9,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.8')
                .from('.hero-scroll-indicator', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.3');
        }

        // Page hero animation (inner pages)
        if (document.querySelector('.page-hero-content')) {
            gsap.from('.page-hero-content', {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3
            });
        }

        // Trust cards
        gsap.utils.toArray('.trust-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Boutique section
        gsap.from('.boutique-text', {
            scrollTrigger: {
                trigger: '.boutique-text',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.diff-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: 40,
                duration: 0.8,
                delay: i * 0.12,
                ease: 'power3.out'
            });
        });

        // Service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 60,
                scale: 0.95,
                duration: 0.8,
                delay: i * 0.08,
                ease: 'power3.out'
            });
        });

        // Strategy teaser
        if (document.querySelector('.strategy-teaser-content')) {
            gsap.from('.strategy-teaser-content', {
                scrollTrigger: {
                    trigger: '.strategy-teaser-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -50,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from('.strategy-teaser-visual', {
                scrollTrigger: {
                    trigger: '.strategy-teaser-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: 50,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });
        }

        // Metric cards
        gsap.utils.toArray('.metric-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                scale: 0.9,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Counter animation
        animateCounters();

        // Process steps
        gsap.utils.toArray('.process-step').forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });

        // Policy card
        if (document.querySelector('.policy-card')) {
            gsap.from('.policy-card', {
                scrollTrigger: {
                    trigger: '.policy-card',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        // CTA section
        if (document.querySelector('.cta-content')) {
            gsap.from('.cta-content', {
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Phase cards
        gsap.utils.toArray('.phase-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Genre cards
        gsap.utils.toArray('.genre-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Case cards
        gsap.utils.toArray('.case-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // FAQ items
        gsap.utils.toArray('.faq-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: i * 0.08,
                ease: 'power3.out'
            });
        });

        // Deliverable cards
        gsap.utils.toArray('.deliverable-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.7,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        // Content blocks
        gsap.utils.toArray('.content-block').forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Contact form
        if (document.querySelector('.contact-form')) {
            gsap.from('.contact-info', {
                scrollTrigger: {
                    trigger: '.contact-layout',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -40,
                duration: 0.8,
                ease: 'power3.out'
            });

            gsap.from('.contact-form', {
                scrollTrigger: {
                    trigger: '.contact-layout',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: 40,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out'
            });
        }

        // Hero parallax on scroll
        if (document.querySelector('.hero-section')) {
            gsap.to('.hero-content', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -80,
                opacity: 0.3
            });

            gsap.to('.hero-image-wrapper', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -40,
                opacity: 0.5
            });
        }

        // Gradient orb movement
        gsap.utils.toArray('.hero-gradient-orb').forEach(orb => {
            gsap.to(orb, {
                scrollTrigger: {
                    trigger: orb.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2
                },
                y: -100,
                x: 50
            });
        });

        // Footer animation
        gsap.from('.footer-grid > div', {
            scrollTrigger: {
                trigger: '#main-footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });

    } // end initAnimations

   // --- HEADER SCROLL EFFECT ---
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
