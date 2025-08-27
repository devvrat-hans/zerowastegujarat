// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize templates
    if (typeof loadTemplates === 'function') {
        loadTemplates();
    }
    
    console.log('Products page loaded');
    
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for product category cards
    const productCategories = document.querySelectorAll('.product-category');
    productCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click-to-expand functionality for category features
    const categoryFeatures = document.querySelectorAll('.category-features');
    categoryFeatures.forEach(features => {
        const items = features.querySelectorAll('.feature-item');
        items.forEach((item, index) => {
            if (index > 2) {
                item.style.display = 'none';
            }
        });
        
        if (items.length > 3) {
            const showMoreBtn = document.createElement('button');
            showMoreBtn.textContent = 'Show More Features';
            showMoreBtn.className = 'show-more-btn';
            showMoreBtn.style.cssText = `
                background: #ffffff;
                color: #215f44;
                border: 2px solid #215f44;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(33, 95, 68, 0.1);
            `;
            
            let expanded = false;
            
            // Add hover effects
            showMoreBtn.addEventListener('mouseenter', function() {
                this.style.background = '#215f44';
                this.style.color = '#ffffff';
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(33, 95, 68, 0.2)';
            });
            
            showMoreBtn.addEventListener('mouseleave', function() {
                this.style.background = '#ffffff';
                this.style.color = '#215f44';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 2px 8px rgba(33, 95, 68, 0.1)';
            });
            
            showMoreBtn.addEventListener('click', function() {
                expanded = !expanded;
                items.forEach((item, index) => {
                    if (index > 2) {
                        item.style.display = expanded ? 'flex' : 'none';
                    }
                });
                this.textContent = expanded ? 'Show Less Features' : 'Show More Features';
            });
            
            features.appendChild(showMoreBtn);
        }
    });

    // Animate metric numbers on scroll
    const metricNumbers = document.querySelectorAll('.metric-number');
    const animateNumbers = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.trim();
                
                // Only animate if it's a number
                if (finalValue.match(/^\d+$/)) {
                    const finalNumber = parseInt(finalValue);
                    let currentNumber = 0;
                    const increment = finalNumber / 30;
                    
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            currentNumber = finalNumber;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(currentNumber);
                    }, 50);
                }
                
                observer.unobserve(target);
            }
        });
    };

    const numberObserver = new IntersectionObserver(animateNumbers, {
        threshold: 0.5
    });

    metricNumbers.forEach(number => {
        if (number.textContent.trim().match(/^\d+$/)) {
            numberObserver.observe(number);
        }
    });

    // Enhanced fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for benefit cards
                if (entry.target.classList.contains('benefit-card')) {
                    const cards = document.querySelectorAll('.benefit-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-category, .benefit-card, .process-step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add loading animation for visual placeholders
    const visualPlaceholders = document.querySelectorAll('.visual-placeholder');
    visualPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Process flow animation on scroll
    const processSteps = document.querySelectorAll('.process-step');
    const processArrows = document.querySelectorAll('.process-arrow');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = document.querySelectorAll('.process-step');
                const arrows = document.querySelectorAll('.process-arrow');
                
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                        
                        if (arrows[index]) {
                            setTimeout(() => {
                                arrows[index].style.opacity = '1';
                                arrows[index].style.transform = 'scale(1)';
                            }, 300);
                        }
                    }, index * 200);
                });
                
                processObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    if (processSteps.length > 0) {
        // Initially hide all steps and arrows
        processSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        processArrows.forEach(arrow => {
            arrow.style.opacity = '0';
            arrow.style.transform = 'scale(0.5)';
            arrow.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        processObserver.observe(processSteps[0]);
    }
});
