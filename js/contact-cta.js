// Contact CTA Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact CTA specific functionality
    console.log('Contact CTA section loaded');
    
    // Track contact link clicks
    const contactLinks = document.querySelectorAll('.cta-contact a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const contactType = this.getAttribute('href').includes('tel:') ? 'phone' : 'email';
            const contactValue = this.textContent;
            console.log(`Contact clicked: ${contactType} - ${contactValue}`);
            
            // Add analytics tracking here if needed
            // gtag('event', 'contact_click', { method: contactType, value: contactValue });
        });
    });
    
    // CTA button click tracking
    const ctaButton = document.querySelector('.contact-cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            console.log('Main CTA button clicked');
            
            // Add analytics tracking here if needed
            // gtag('event', 'cta_click', { section: 'contact_cta' });
        });
    }
    
    // Animate CTA section on scroll
    const ctaSection = document.querySelector('.contact-cta');
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate contact items with stagger
                    const contactItems = entry.target.querySelectorAll('.contact-item');
                    contactItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, {
            threshold: 0.3
        });
        
        ctaObserver.observe(ctaSection);
        
        // Initial setup for animation
        const contactItems = ctaSection.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
});
