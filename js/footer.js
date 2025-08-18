// Footer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer functionality
    initializeFooter();
});

function initializeFooter() {
    // Add smooth scrolling for internal links
    addSmoothScrolling();
    
    // Add current year to copyright
    updateCopyrightYear();
    
    // Initialize social media links tracking
    initializeSocialTracking();
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Update copyright year
function updateCopyrightYear() {
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace(/© \d{4}/, `© ${currentYear}`);
    }
}

// Social media links tracking (optional analytics)
function initializeSocialTracking() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = getSocialPlatform(this.getAttribute('href'));
            
            // Track social media click (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    'social_platform': platform,
                    'page_location': window.location.href
                });
            }
            
            // Console log for debugging
            console.log(`Social media click: ${platform}`);
        });
    });
}

function getSocialPlatform(href) {
    if (href.includes('youtube')) return 'YouTube';
    if (href.includes('x.com') || href.includes('twitter')) return 'X/Twitter';
    if (href.includes('linkedin')) return 'LinkedIn';
    if (href.includes('instagram')) return 'Instagram';
    return 'Unknown';
}

// Utility function to handle footer visibility on scroll
function handleFooterVisibility() {
    const footer = document.querySelector('.site-footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('footer-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    if (footer) {
        observer.observe(footer);
    }
}

// Initialize footer visibility observer
document.addEventListener('DOMContentLoaded', function() {
    handleFooterVisibility();
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeFooter,
        setActiveLanguage,
        applyLanguage
    };
}