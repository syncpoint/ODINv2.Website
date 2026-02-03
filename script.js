// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Detect OS for download section highlighting
    const detectOS = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('win')) return 'windows';
        if (userAgent.includes('mac')) return 'macos';
        if (userAgent.includes('linux')) return 'linux';
        return null;
    };

    const os = detectOS();
    if (os) {
        const downloadCards = document.querySelectorAll('.download-card');
        downloadCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(os) ||
                (os === 'macos' && cardText.includes('macos')) ||
                (os === 'windows' && cardText.includes('windows'))) {
                card.style.borderColor = 'var(--color-primary)';
                card.style.background = 'var(--color-bg-alt)';
            }
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const screenshotLink = document.querySelector('.screenshot-link');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (screenshotLink && lightbox) {
        screenshotLink.addEventListener('click', function(e) {
            e.preventDefault();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === lightboxClose) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
