// Modern Portfolio Animations and Link Population
(function($) {
    'use strict';

    // Wait for DOM and config to be ready
    $(document).ready(function() {
        // Populate all links from config
        if (typeof PORTFOLIO_LINKS !== 'undefined') {
            // Social Links
            $('#social-twitter').attr('href', PORTFOLIO_LINKS.social.twitter);
            $('#social-github').attr('href', PORTFOLIO_LINKS.social.github);
            $('#social-linkedin').attr('href', PORTFOLIO_LINKS.social.linkedin);
            $('#social-email').attr('href', PORTFOLIO_LINKS.social.email);
            $('#designer-link').attr('href', PORTFOLIO_LINKS.social.linkedin);

            // Resume/CV
            $('#cv-link').attr('href', PORTFOLIO_LINKS.resume.cv);

            // Project Links
            $('#project-unigym').attr('href', PORTFOLIO_LINKS.projects.unigym);
            $('#project-attendance').attr('href', PORTFOLIO_LINKS.projects.attendanceProject);
            $('#project-attendance-report').attr('href', PORTFOLIO_LINKS.projects.attendanceReport);
            $('#project-multipurpose').attr('href', PORTFOLIO_LINKS.projects.multipurposeApp);
            $('#project-multipurpose-live').attr('href', PORTFOLIO_LINKS.projects.multipurposeLive);
            $('#project-gtu').attr('href', PORTFOLIO_LINKS.projects.gtuScraper);
            $('#more-projects').attr('href', PORTFOLIO_LINKS.projects.moreProjects);

            // Contact Info
            $('#contact-address').text(PORTFOLIO_LINKS.contact.address);
            $('#contact-phone').text(PORTFOLIO_LINKS.contact.phone);
            $('#contact-email').attr('href', 'mailto:' + PORTFOLIO_LINKS.contact.email);
            $('#contact-email').text(PORTFOLIO_LINKS.contact.email);
        }

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 100
                }, 1000, 'swing');
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });

        // Keep header fixed - no parallax that causes movement
        // Ensure header stays fixed even if other scripts try to change it
        $(window).on('scroll resize', function() {
            var $header = $('#header');
            if ($header.length) {
                $header.css({
                    'position': 'fixed',
                    'top': '0',
                    'left': '0',
                    'transform': 'translateX(0) translateY(0)'
                });
            }
        });
        
        // Disable any parallax effects on header
        $(window).off('scroll.strata_parallax');
        $('#header').css('background-position', 'top left');

        // Add hover effects to cards
        $('.experience-card, .project-card').hover(
            function() {
                $(this).addClass('card-hover');
            },
            function() {
                $(this).removeClass('card-hover');
            }
        );

        // Typing animation for hero text (optional enhancement)
        const heroText = $('.hero-section h2');
        if (heroText.length) {
            const text = heroText.text();
            heroText.text('');
            let i = 0;
            const typeWriter = function() {
                if (i < text.length) {
                    heroText.text(heroText.text() + text.charAt(i));
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            // Uncomment to enable typing effect
            // setTimeout(typeWriter, 1000);
        }

        // Add pulse animation on scroll
        $(window).on('scroll', function() {
            $('.section-animate').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('in-view');
                }
            });
        });

        // Trigger scroll event on load
        $(window).trigger('scroll');
    });

})(jQuery);

