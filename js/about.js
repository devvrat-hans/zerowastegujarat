// About Page JavaScript - Optimized for instant loading

document.addEventListener('DOMContentLoaded', function() {
    // Initialize templates
    if (typeof loadTemplates === 'function') {
        loadTemplates();
    }
    
    // About page loaded - no animation delays
    console.log('About page loaded instantly');
    
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced hover effects for interactive elements
    const cards = document.querySelectorAll('.promise-card, .contact-card, .vision-area, .stat-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
    
    // Smooth counter animation for stats (only when visible, no loading delay)
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.7 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Counter animation function
    function animateCounter(element, finalValue) {
        const isDecimal = finalValue.includes('.');
        const numericValue = parseFloat(finalValue);
        const duration = 1500;
        const steps = 60;
        const stepValue = numericValue / steps;
        const stepDuration = duration / steps;
        
        let currentValue = 0;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            currentValue += stepValue;
            
            if (currentStep >= steps) {
                currentValue = numericValue;
                clearInterval(interval);
            }
            
            const displayValue = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);
            element.textContent = displayValue;
        }, stepDuration);
    }
    
    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Add focus management for better accessibility
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});
