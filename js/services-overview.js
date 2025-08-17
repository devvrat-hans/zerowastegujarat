// Services Overview Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Services overview specific functionality
    console.log('Services overview section loaded');
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        });
    });
    
    // Service links smooth navigation
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click analytics or other functionality here
            console.log('Service link clicked:', this.getAttribute('href'));
        });
    });
    
    // Animate service cards on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200); // Stagger the animations
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        serviceObserver.observe(card);
    });
});
