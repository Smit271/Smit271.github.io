// Portfolio JavaScript - Link population and interactions

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Populate all links from config
        if (typeof PORTFOLIO_LINKS !== 'undefined') {
            // Social Links
            const socialLinks = {
                'social-twitter': PORTFOLIO_LINKS.social.twitter,
                'social-github': PORTFOLIO_LINKS.social.github,
                'social-linkedin': PORTFOLIO_LINKS.social.linkedin,
                'social-email': PORTFOLIO_LINKS.social.email
            };

            Object.keys(socialLinks).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.href = socialLinks[id];
                }
            });

            // Resume/CV
            const cvLink = document.getElementById('cv-link');
            if (cvLink) {
                cvLink.href = PORTFOLIO_LINKS.resume.cv;
            }

            // Project Links
            const projectLinks = {
                'project-unigym': PORTFOLIO_LINKS.projects.unigym,
                'project-attendance': PORTFOLIO_LINKS.projects.attendanceProject,
                'project-attendance-report': PORTFOLIO_LINKS.projects.attendanceReport,
                'project-multipurpose': PORTFOLIO_LINKS.projects.multipurposeApp,
                'project-multipurpose-live': PORTFOLIO_LINKS.projects.multipurposeLive,
                'project-gtu': PORTFOLIO_LINKS.projects.gtuScraper,
                'more-projects': PORTFOLIO_LINKS.projects.moreProjects
            };

            Object.keys(projectLinks).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.href = projectLinks[id];
                }
            });

            // Contact Info
            const contactAddress = document.getElementById('contact-address');
            if (contactAddress) {
                contactAddress.textContent = PORTFOLIO_LINKS.contact.address;
            }

            const contactPhone = document.getElementById('contact-phone');
            if (contactPhone) {
                contactPhone.textContent = PORTFOLIO_LINKS.contact.phone;
            }

            const contactEmail = document.getElementById('contact-email');
            if (contactEmail) {
                contactEmail.href = 'mailto:' + PORTFOLIO_LINKS.contact.email;
                contactEmail.textContent = PORTFOLIO_LINKS.contact.email;
            }
        }

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        // Calculate offset for mobile (account for sidebar height on mobile)
                        const isMobile = window.innerWidth <= 768;
                        const offset = isMobile ? 20 : 0;
                        
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
            });
        });

        // Update active nav link on scroll
        const sections = document.querySelectorAll('.section');
        const updateActiveNav = () => {
            let current = '';
            const scrollPosition = window.pageYOffset;
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? 100 : 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop - offset) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateActiveNav);
        updateActiveNav(); // Initial call

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe sections for animation
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    });
})();

