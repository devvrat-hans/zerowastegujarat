// CTA JavaScript for Zero Waste Gujarat

document.addEventListener('DOMContentLoaded', function() {
  initializeCTA();
});

function initializeCTA() {
  // Initialize CTA animations
  initCTAAnimations();
  
  // Add click tracking
  trackCTAClicks();
  
  // Add hover effects
  enhanceCTAInteractions();
}

// Initialize CTA animations when they come into view
function initCTAAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Add stagger effect to child elements
        const title = entry.target.querySelector('.cta-title');
        const description = entry.target.querySelector('.cta-description');
        const actions = entry.target.querySelector('.cta-actions');
        
        if (title) {
          setTimeout(() => title.classList.add('animate-in'), 200);
        }
        if (description) {
          setTimeout(() => description.classList.add('animate-in'), 400);
        }
        if (actions) {
          setTimeout(() => actions.classList.add('animate-in'), 600);
        }
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe CTA cards
  const ctaCards = document.querySelectorAll('.cta-card');
  ctaCards.forEach(card => observer.observe(card));
}

// Track CTA button clicks for analytics
function trackCTAClicks() {
  const ctaButtons = document.querySelectorAll('.btn-primary-cta');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ctaText = this.querySelector('.btn-text')?.textContent.trim() || 'Unknown CTA';
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      // Track the click (can be extended with analytics)
      console.log(`CTA Clicked: "${ctaText}" on page: ${currentPage}`);
      
      // Optional: Send to analytics service
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'CTA',
          event_label: ctaText,
          event_location: currentPage
        });
      }
      
      // Add ripple effect
      addRippleEffect(e, this);
    });
  });
}

// Enhance CTA button interactions
function enhanceCTAInteractions() {
  const ctaButtons = document.querySelectorAll('.btn-primary-cta');
  
  ctaButtons.forEach(button => {
    // Add mouse enter effect
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    // Add mouse leave effect
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add focus effect for keyboard users
    button.addEventListener('focus', function() {
      this.style.boxShadow = '0 0 0 3px rgba(255, 246, 234, 0.3)';
    });
    
    button.addEventListener('blur', function() {
      this.style.boxShadow = '';
    });
  });
}

// Add ripple effect on button click
function addRippleEffect(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
    z-index: 10;
  `;
  
  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  button.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Add pulse animation to CTA buttons periodically
function addPulseAnimation() {
  const ctaButtons = document.querySelectorAll('.btn-primary-cta');
  
  setInterval(() => {
    ctaButtons.forEach(button => {
      // Only pulse if not currently hovered or focused
      if (!button.matches(':hover') && !button.matches(':focus')) {
        button.style.animation = 'ctaPulse 1.5s ease-in-out';
        
        setTimeout(() => {
          button.style.animation = '';
        }, 1500);
      }
    });
  }, 15000); // Pulse every 15 seconds
}

// Initialize pulse animation after page load
window.addEventListener('load', () => {
  setTimeout(addPulseAnimation, 5000); // Start pulsing after 5 seconds
});

// Add CSS for pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  @keyframes ctaPulse {
    0%, 100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-2px) scale(1.02);
    }
  }
`;
document.head.appendChild(pulseStyle);

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeCTA,
    initCTAAnimations,
    trackCTAClicks,
    enhanceCTAInteractions
  };
}

// Make functions globally available
window.ZeroWasteCTA = {
  initializeCTA,
  initCTAAnimations,
  trackCTAClicks,
  enhanceCTAInteractions
};
