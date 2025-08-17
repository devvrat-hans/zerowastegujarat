// About Preview Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // About preview specific functionality
    console.log('About preview section loaded');
    
    // Track "Learn More About Us" button click
    const aboutButton = document.querySelector('.about-preview .btn-primary');
    if (aboutButton) {
        aboutButton.addEventListener('click', function(e) {
            console.log('About us button clicked');
            
            // Add analytics tracking here if needed
            // gtag('event', 'navigation_click', { destination: 'about_page' });
        });
    }
    
    // Animate feature items on scroll
    const featureItems = document.querySelectorAll('.feature');
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Stagger the animations
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    featureItems.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featureObserver.observe(feature);
    });
    
    // Add hover effects for feature items
    featureItems.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        feature.style.transition += ', transform 0.3s ease';
    });
    
    // Animate the main heading
    const aboutHeading = document.querySelector('.about-preview h2');
    if (aboutHeading) {
        const headingObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        aboutHeading.style.opacity = '0';
        aboutHeading.style.transform = 'translateY(20px)';
        aboutHeading.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        headingObserver.observe(aboutHeading);
    }
});
