// Partnerships Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Partnerships page loaded');
  
  // Initialize templates
  if (typeof loadTemplates === 'function') {
    loadTemplates();
  }
  
  // Initialize all interactive features
  initializeScrollAnimations();
  initializeTimelineAnimations();
  initializeCardHoverEffects();
  initializeStatsCounters();
  initializePartnershipButtons();
});

// Scroll-based animations for sections
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Trigger specific animations based on section
        if (entry.target.classList.contains('partnership-types')) {
          animatePartnershipCards();
        } else if (entry.target.classList.contains('success-stories')) {
          animateSuccessStories();
        } else if (entry.target.classList.contains('partnership-benefits')) {
          animateVisualStats();
        }
      }
    });
  }, observerOptions);

  // Observe all main sections
  const sections = document.querySelectorAll('.partnership-types, .partnership-process, .success-stories, .partnership-benefits');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Timeline step-by-step animation
function initializeTimelineAnimations() {
  const timelineSteps = document.querySelectorAll('.timeline-step');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('step-visible');
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px'
  });

  timelineSteps.forEach(step => {
    timelineObserver.observe(step);
  });
}

// Enhanced card hover effects
function initializeCardHoverEffects() {
  const partnershipCards = document.querySelectorAll('.partnership-card');
  const storyCards = document.querySelectorAll('.story-card');

  [...partnershipCards, ...storyCards].forEach(card => {
    let hoverTimeout;
    
    card.addEventListener('mouseenter', function() {
      clearTimeout(hoverTimeout);
      this.classList.add('card-hover-active');
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'card-ripple';
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 600);
    });

    card.addEventListener('mouseleave', function() {
      hoverTimeout = setTimeout(() => {
        this.classList.remove('card-hover-active');
      }, 100);
    });

    // Touch support for mobile
    card.addEventListener('touchstart', function() {
      this.classList.add('card-touch-active');
    });

    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('card-touch-active');
      }, 300);
    });
  });
}

// Animated counters for metrics and stats
function initializeStatsCounters() {
  const statNumbers = document.querySelectorAll('.metric-number, .stat-number, .stat-value');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        
        // Extract number from text (handle special cases like ₹, +, etc.)
        const numberMatch = finalValue.match(/[\d,]+/);
        if (numberMatch) {
          const numericValue = parseInt(numberMatch[0].replace(/,/g, ''));
          animateCounter(target, numericValue, finalValue);
        }
        
        statsObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
}

// Counter animation function
function animateCounter(element, targetValue, originalText) {
  const duration = 2000;
  const startTime = performance.now();
  const isPercentage = originalText.includes('%');
  const hasCurrency = originalText.includes('₹');
  const hasPlus = originalText.includes('+');
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easing function for smooth animation
    const easedProgress = easeOutExpo(progress);
    const currentValue = Math.floor(targetValue * easedProgress);
    
    // Format the number based on original text format
    let displayValue = currentValue.toLocaleString();
    
    if (hasCurrency) {
      displayValue = '₹' + displayValue;
      if (originalText.includes('Cr')) {
        displayValue += 'Cr';
      } else if (originalText.includes('L')) {
        displayValue += 'L';
      }
    } else if (isPercentage) {
      displayValue += '%';
    } else if (hasPlus && progress === 1) {
      displayValue += '+';
    }
    
    element.textContent = displayValue;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Easing function for smooth counter animation
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Partnership button interactions
function initializePartnershipButtons() {
  const partnershipButtons = document.querySelectorAll('.btn-partnership');
  
  partnershipButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.classList.add('btn-clicked');
      setTimeout(() => {
        this.classList.remove('btn-clicked');
      }, 300);
      
      // Determine partnership type based on card content
      const card = this.closest('.partnership-card');
      const partnershipType = card.querySelector('h3').textContent;
      
      // Show modal or redirect based on partnership type
      showPartnershipModal(partnershipType);
    });
  });
}

// Partnership modal/contact functionality
function showPartnershipModal(partnershipType) {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'partnership-modal-overlay';
  modal.innerHTML = `
    <div class="partnership-modal">
      <div class="modal-header">
        <h3>Start Your ${partnershipType}</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <p>Thank you for your interest in partnering with Zero Waste Gujarat!</p>
        <div class="contact-options">
          <div class="contact-option">
            <div class="contact-icon">📞</div>
            <div class="contact-info">
              <strong>Call Us</strong>
              <span>+91-9876543210</span>
            </div>
          </div>
          <div class="contact-option">
            <div class="contact-icon">✉️</div>
            <div class="contact-info">
              <strong>Email Us</strong>
              <span>partnerships@zerowastegujarat.com</span>
            </div>
          </div>
          <div class="contact-option">
            <div class="contact-icon">📅</div>
            <div class="contact-info">
              <strong>Schedule Meeting</strong>
              <span>Book a consultation call</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-modal-primary">Contact Now</button>
        <button class="btn-modal-secondary">Download Brochure</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Modal animations
  setTimeout(() => {
    modal.classList.add('modal-visible');
  }, 10);
  
  // Close modal functionality
  const closeModal = () => {
    modal.classList.remove('modal-visible');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 300);
  };
  
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Contact option interactions
  modal.querySelectorAll('.contact-option').forEach(option => {
    option.addEventListener('click', function() {
      const contactType = this.querySelector('strong').textContent;
      handleContactAction(contactType);
    });
  });
  
  // Modal button interactions
  modal.querySelector('.btn-modal-primary').addEventListener('click', () => {
    window.location.href = 'contact.html';
  });
  
  modal.querySelector('.btn-modal-secondary').addEventListener('click', () => {
    // Trigger brochure download
    console.log('Downloading partnership brochure...');
    closeModal();
  });
}

// Handle different contact actions
function handleContactAction(contactType) {
  switch(contactType) {
    case 'Call Us':
      window.open('tel:+919876543210');
      break;
    case 'Email Us':
      window.open('mailto:partnerships@zerowastegujarat.com?subject=Partnership Inquiry');
      break;
    case 'Schedule Meeting':
      // Integrate with calendar booking system
      console.log('Opening calendar booking...');
      break;
  }
}

// Staggered card animations
function animatePartnershipCards() {
  const cards = document.querySelectorAll('.partnership-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('card-animate-in');
    }, index * 150);
  });
}

// Success stories animation
function animateSuccessStories() {
  const stories = document.querySelectorAll('.story-card');
  stories.forEach((story, index) => {
    setTimeout(() => {
      story.classList.add('story-animate-in');
    }, index * 200);
  });
}

// Visual stats animation
function animateVisualStats() {
  const visualStats = document.querySelectorAll('.visual-stat');
  visualStats.forEach((stat, index) => {
    setTimeout(() => {
      stat.classList.add('stat-animate-in');
    }, index * 300);
  });
}

// Industry tag interactions
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('industry-tag')) {
    e.target.classList.add('tag-clicked');
    setTimeout(() => {
      e.target.classList.remove('tag-clicked');
    }, 200);
    
    // Show more info about the industry
    const industry = e.target.textContent;
    showIndustryInfo(industry);
  }
});

// Industry information tooltip
function showIndustryInfo(industry) {
  const tooltip = document.createElement('div');
  tooltip.className = 'industry-tooltip';
  tooltip.textContent = `Learn more about our ${industry} partnerships`;
  
  document.body.appendChild(tooltip);
  
  setTimeout(() => {
    tooltip.remove();
  }, 2000);
}

// Smooth scroll behavior for internal links
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Keyboard accessibility enhancements
document.addEventListener('keydown', function(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    const modal = document.querySelector('.partnership-modal-overlay');
    if (modal) {
      modal.querySelector('.modal-close').click();
    }
  }
  
  // Enter key activates focused buttons
  if (e.key === 'Enter' && e.target.matches('.btn-partnership, .industry-tag')) {
    e.target.click();
  }
});

// Add CSS animations dynamically
const dynamicStyles = `
  <style>
    .card-animate-in {
      animation: slideInUp 0.6s ease-out forwards;
    }
    
    .story-animate-in {
      animation: fadeInScale 0.5s ease-out forwards;
    }
    
    .stat-animate-in {
      animation: bounceIn 0.8s ease-out forwards;
    }
    
    .card-ripple {
      position: absolute;
      background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      margin: -50px 0 0 -50px;
    }
    
    .btn-clicked {
      animation: buttonPulse 0.3s ease-out;
    }
    
    .tag-clicked {
      animation: tagBounce 0.2s ease-out;
    }
    
    .partnership-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
    
    .partnership-modal-overlay.modal-visible {
      opacity: 1;
    }
    
    .partnership-modal {
      background: white;
      border-radius: 20px;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      transform: scale(0.8) translateY(20px);
      transition: transform 0.3s ease-out;
    }
    
    .modal-visible .partnership-modal {
      transform: scale(1) translateY(0);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .modal-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #6b7280;
    }
    
    .modal-body {
      padding: 24px;
    }
    
    .contact-options {
      display: grid;
      gap: 16px;
      margin-top: 20px;
    }
    
    .contact-option {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease-out;
    }
    
    .contact-option:hover {
      background: #f9fafb;
      border-color: #22c55e;
    }
    
    .contact-icon {
      font-size: 24px;
      width: 40px;
      text-align: center;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .modal-footer {
      padding: 24px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 12px;
    }
    
    .btn-modal-primary,
    .btn-modal-secondary {
      flex: 1;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease-out;
    }
    
    .btn-modal-primary {
      background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
      color: white;
      border: none;
    }
    
    .btn-modal-secondary {
      background: #f9fafb;
      color: #374151;
      border: 1px solid #d1d5db;
    }
    
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes bounceIn {
      0% { opacity: 0; transform: scale(0.8); }
      50% { transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes rippleEffect {
      to { transform: scale(2); opacity: 0; }
    }
    
    @keyframes buttonPulse {
      0% { transform: scale(1); }
      50% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    
    @keyframes tagBounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .industry-tooltip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 1000;
      animation: fadeInOut 2s ease-out;
      pointer-events: none;
    }
    
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);
