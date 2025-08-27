// Sustainability Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize templates
    if (typeof loadTemplates === 'function') {
        loadTemplates();
    }
    
    console.log('Sustainability page loaded');
    
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

    // Animate metric numbers on scroll
    const metricNumbers = document.querySelectorAll('.metric-number, .stat-number, .benefit-number, .summary-number');
    const animateNumbers = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.trim();
                
                // Handle different number formats
                let finalNumber;
                let isPercentage = false;
                let isDecimal = false;
                
                if (finalValue.includes('%')) {
                    finalNumber = parseFloat(finalValue.replace('%', ''));
                    isPercentage = true;
                } else if (finalValue.includes('.')) {
                    finalNumber = parseFloat(finalValue);
                    isDecimal = true;
                } else if (finalValue.match(/^\d+$/)) {
                    finalNumber = parseInt(finalValue);
                }
                
                if (finalNumber && !isNaN(finalNumber)) {
                    let currentNumber = 0;
                    const increment = finalNumber / 50;
                    const duration = 2000;
                    const stepTime = duration / 50;
                    
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= finalNumber) {
                            currentNumber = finalNumber;
                            clearInterval(timer);
                        }
                        
                        let displayValue;
                        if (isDecimal) {
                            displayValue = currentNumber.toFixed(1);
                        } else {
                            displayValue = Math.floor(currentNumber);
                        }
                        
                        target.textContent = displayValue + (isPercentage ? '%' : '');
                    }, stepTime);
                }
                
                observer.unobserve(target);
            }
        });
    };

    const numberObserver = new IntersectionObserver(animateNumbers, {
        threshold: 0.5,
        rootMargin: '-20px'
    });

    metricNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // Animate progress rings
    const progressRings = document.querySelectorAll('.progress-fill');
    const animateProgress = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressCircle = entry.target;
                const progress = parseInt(progressCircle.dataset.progress) || 0;
                const circumference = 2 * Math.PI * 50; // radius = 50
                const offset = circumference - (progress / 100) * circumference;
                
                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 500);
                
                observer.unobserve(progressCircle);
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgress, {
        threshold: 0.3
    });

    progressRings.forEach(ring => {
        progressObserver.observe(ring);
    });

    // Animate comparison bars
    const comparisonBars = document.querySelectorAll('.bar-fill');
    const animateBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = document.querySelectorAll('.bar-fill');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    }, index * 200);
                });
                observer.disconnect();
            }
        });
    };

    if (comparisonBars.length > 0) {
        const barObserver = new IntersectionObserver(animateBars, {
            threshold: 0.3
        });
        barObserver.observe(comparisonBars[0]);
    }

    // Circular economy cycle animation
    const cycleSteps = document.querySelectorAll('.cycle-step');
    const cycleArrows = document.querySelectorAll('.cycle-arrow');
    
    const animateCycle = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const steps = document.querySelectorAll('.cycle-step');
                const arrows = document.querySelectorAll('.cycle-arrow');
                
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0) scale(1)';
                        
                        // Animate corresponding arrow
                        if (arrows[index]) {
                            setTimeout(() => {
                                arrows[index].style.opacity = '1';
                                arrows[index].style.transform = 'scale(1)';
                            }, 50); // Reduced from 300ms to 50ms
                        }
                    }, index * 80); // Reduced from 400ms to 80ms for much faster loading
                });
                
                observer.disconnect();
            }
        });
    };

    if (cycleSteps.length > 0) {
        // Initially hide all steps and arrows
        cycleSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px) scale(0.8)';
            step.style.transition = 'opacity 0.2s ease, transform 0.2s ease'; // Reduced from 0.6s to 0.2s
        });
        
        cycleArrows.forEach(arrow => {
            arrow.style.opacity = '0';
            arrow.style.transform = 'scale(0)';
            arrow.style.transition = 'opacity 0.2s ease, transform 0.2s ease'; // Reduced from 0.6s to 0.2s
        });
        
        const cycleObserver = new IntersectionObserver(animateCycle, {
            threshold: 0.2
        });
        cycleObserver.observe(cycleSteps[0]);
    }

    // Enhanced card animations
    const impactCards = document.querySelectorAll('.impact-card, .cert-card, .goal-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for cards in the same section
                const section = entry.target.closest('section');
                const sectionCards = section.querySelectorAll('.impact-card, .cert-card, .goal-card');
                const index = Array.from(sectionCards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-20px'
    });

    // Initially hide cards and observe them
    impactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        cardObserver.observe(card);
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.step-icon, .benefit-item, .summary-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add gradient definition for progress rings
    const svgs = document.querySelectorAll('.progress-svg');
    svgs.forEach(svg => {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'progressGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#10b981');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#215f44');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
    });

    // Add click interactions for metric cards
    const metricItems = document.querySelectorAll('.metric-item, .impact-stat, .summary-item');
    metricItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Removed parallax effect for hero section to fix scrolling issue
});
