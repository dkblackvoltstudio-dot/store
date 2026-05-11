/* ============================================================
   ELECTRO WORLD — ANIMATIONS JS
   
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== SCROLL REVEAL (Intersection Observer) ====================
    // Watches for product cards, section titles, and footer sections
    // and adds .visible when they enter the viewport

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop watching once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,       // trigger when 10% is visible
        rootMargin: '0px 0px -40px 0px'  // slight offset from bottom
    });

    // Observe elements that animate on scroll
    function observeElements() {
        document.querySelectorAll('.product-card').forEach(card => {
            revealObserver.observe(card);
        });
        document.querySelectorAll('.section-title').forEach(el => {
            revealObserver.observe(el);
        });
        document.querySelectorAll('.footer-section').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Run once now, and again whenever products are re-rendered
    observeElements();

    // Re-observe after renderProducts() runs (since cards are recreated)
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        const mutationObserver = new MutationObserver(() => {
            // Small delay to let DOM settle
            setTimeout(observeElements, 50);
        });
        mutationObserver.observe(productsGrid, { childList: true });
    }


    // ==================== BUTTON RIPPLE EFFECT ====================
    // Adds a ripple splash on every .btn click

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.btn, .add-to-cart, .cta-btn, .filter-btn, .checkout-btn');
        if (!btn) return;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255,255,255,0.35);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });


    // ==================== CART ICON BOUNCE ====================
    // Bounces the cart icon every time a product is added

    const originalAddToCart = window.addToCart;
    if (typeof originalAddToCart === 'function') {
        window.addToCart = function (productId) {
            originalAddToCart(productId);
            const cartIcon = document.getElementById('cartIcon');
            if (cartIcon) {
                cartIcon.classList.remove('bounce');
                void cartIcon.offsetWidth; // reflow to restart animation
                cartIcon.classList.add('bounce');
                cartIcon.addEventListener('animationend', () => {
                    cartIcon.classList.remove('bounce');
                }, { once: true });
            }
        };
    }


    // ==================== HERO SLIDER SMOOTH CROSSFADE ====================
    // Enhances the existing hero slider with a smooth scale+fade transition

    const heroSlides = document.querySelectorAll('.hero .slide');
    heroSlides.forEach(slide => {
        slide.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        slide.style.transform = 'scale(1.05)';
    });

    const heroActiveSlide = document.querySelector('.hero .slide.active');
    if (heroActiveSlide) heroActiveSlide.style.transform = 'scale(1)';

    // Patch nextSlide to animate scale
    const originalNextSlide = window.nextSlide;
    let heroSlideIndex = 0;
    if (heroSlides.length > 0) {
        window.nextSlide = function () {
            heroSlides[heroSlideIndex].classList.remove('active');
            heroSlides[heroSlideIndex].style.transform = 'scale(1.05)';
            heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
            heroSlides[heroSlideIndex].classList.add('active');
            heroSlides[heroSlideIndex].style.transform = 'scale(1)';
        };
    }


    // ==================== FILTER BUTTON ACTIVE ANIMATION ====================
    // Re-triggers shimmer animation on the newly active filter

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.animation = 'none';
            void btn.offsetWidth;
            btn.style.animation = '';
        });
    });


    // ==================== TAB SWITCHER SLIDE ANIMATION ====================
    // Smooth slide when switching Customer / Admin tabs on login

    const originalShowTab = window.showTab;
    if (typeof originalShowTab === 'function') {
        window.showTab = function (n) {
            const tabs = ['customerTab', 'adminTab'];
            tabs.forEach((id, i) => {
                const el = document.getElementById(id);
                if (!el) return;
                if (i === n) {
                    el.style.display = 'block';
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(15px)';
                    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                    requestAnimationFrame(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    });
                } else {
                    el.style.display = 'none';
                }
            });

            // Update active tab button style
            document.querySelectorAll('.tab-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === n);
            });
        };
    }


    // ==================== MODAL ENTRANCE ANIMATION ====================
    // Each time a modal is shown, animate its content in fresh

    function animateModalIn(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'none';
            void content.offsetWidth;
            content.style.animation = 'fadeSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both';
        }
    }

    // Watch for cart modal opening
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => animateModalIn('cartModal'));
    }


    // ==================== SCROLL PROGRESS INDICATOR ====================
    // Thin blue bar at top of page showing scroll progress

    const progressBar = document.createElement('div');
    progressBar.id = 'scrollProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, #007AFF, #764ba2, #FF9500);
        z-index: 99999;
        transition: width 0.1s linear;
        border-radius: 0 2px 2px 0;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });


    // ==================== STAGGERED NAV LINK ENTRANCE ====================
    // Nav links slide down one by one when main content loads

    function animateNavLinks() {
        document.querySelectorAll('.nav-link').forEach((link, i) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-15px)';
            link.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`;
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 + i * 100);
        });
    }

    // Run nav animation after login (re-run manually if needed)
    const originalLoginSuccess = window.loginSuccess;
    if (typeof originalLoginSuccess === 'function') {
        window.loginSuccess = function (role) {
            originalLoginSuccess(role);
            setTimeout(animateNavLinks, 300);
        };
    }

    const originalAdminLogin = window.adminLogin;
    if (typeof originalAdminLogin === 'function') {
        window.adminLogin = function () {
            originalAdminLogin();
            setTimeout(animateNavLinks, 300);
        };
    }

});
