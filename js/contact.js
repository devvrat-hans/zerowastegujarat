// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize templates
    if (typeof loadTemplates === 'function') {
        loadTemplates();
    }
    
    // Contact page specific functionality will be added here
    console.log('Contact page loaded');
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic validation
            if (validateForm(formObject)) {
                // Show success message
                showMessage('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
            }
        });
    }
    
    // Form validation function
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Please enter a message with at least 10 characters');
        }
        
        if (errors.length > 0) {
            showMessage(errors.join('<br>'), 'error');
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show message function
    function showMessage(message, type) {
        const messageContainer = document.getElementById('form-message') || createMessageContainer();
        messageContainer.innerHTML = message;
        messageContainer.className = `form-message ${type}`;
        messageContainer.style.display = 'block';
        
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000);
    }
    
    // Create message container if it doesn't exist
    function createMessageContainer() {
        const container = document.createElement('div');
        container.id = 'form-message';
        container.className = 'form-message';
        container.style.display = 'none';
        
        const form = document.getElementById('contact-form');
        if (form) {
            form.insertBefore(container, form.firstChild);
        }
        
        return container;
    }
    
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
    
    // Fade in animation for elements
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
