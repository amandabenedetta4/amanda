/* ============================================
   AMANDA BENEDETTA - MASTER JAVASCRIPT
   amandabenedetta.com
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. BULLETPROOF PRELOADER 
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
                if (preloader) {
                    preloader.classList.add('hidden');
                }
                document.body.classList.remove('loading');
                
                try {
                    initAnimations();
                } catch (error) {
                    console.log("Animations skipped:", error);
                }
            }, 500);
        }
        if (preloaderCounter) {
            preloaderCounter.textContent = Math.floor(progress) + '%';
        }
    }, 100);

    document.body.classList.add('loading');

    // ============================================
    // 2. SAFE GSAP REGISTRATION
    // ============================================
    try {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    } catch (e) {
        console.log("GSAP optional features loaded.");
    }

    // ============================================
    // 3. CUSTOM CURSOR
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

        const hoverElements = document.querySelectorAll('a, button, .service-card, .trust-card, .diff-card, .metric-card, .faq-question');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // ============================================
    // 4. HEADER SCROLL BACKGROUND TRIGGER
    // ============================================
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function checkHeaderScroll() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (header) {
            // Trigger solid background as soon as user scrolls past 10 pixels
            if (scrollPos > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Run immediately on page load and on every scroll movement
    window.addEventListener('scroll', checkHeaderScroll, { passive: true });
    document.addEventListener('scroll', checkHeaderScroll, { passive: true });
    checkHeaderScroll();

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // 5. FLOATING PARTICLES (Hero)
    // ============================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer && typeof gsap !== 'undefined') {
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
    // 6. FAQ ACCORDION
    // ============================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // 7. COUNTER ANIMATION
    // ============================================
    function animateCounters() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        document.querySelectorAll('.metric-value[data-count]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        duration: 2,
                        innerText: target,
                        snap: { innerText: 1 },
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // ============================================
    // 8. MAIN ANIMATION INITIALIZER
    // ============================================
    function initAnimations() {
        if (typeof gsap === 'undefined') return;

        const heroTl = gsap.timeline({ delay: 0.3 });

        if (document.querySelector('.hero-pre-headline')) {
            heroTl
                .from('.hero-pre-headline', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' })
                .from('.headline-word', { opacity: 0, y: 40, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
                .from('.hero-subheadline', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .from('.hero-cta-group .btn', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
                .from('.hero-image-wrapper', { opacity: 0, scale: 0.9, duration: 1, ease: 'power3.out' }, '-=0.8')
                .from('.hero-scroll-indicator', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3');
        }

        if (document.querySelector('.page-hero-content')) {
            gsap.from('.page-hero-content', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.3 });
        }

        const staggerElements = [
            '.trust-card', '.section-header', '.diff-card', '.service-card', 
            '.metric-card', '.process-step', '.phase-card', '.genre-card', 
            '.case-card', '.faq-item', '.deliverable-card', '.content-block', '.footer-grid > div'
        ];

        staggerElements.forEach(selector => {
            gsap.utils.toArray(selector).forEach((el, i) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });
        });

        animateCounters();
    }

    // ============================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
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
