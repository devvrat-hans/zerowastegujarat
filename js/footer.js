// Footer JavaScript for Zero Waste Gujarat Website

class Footer {
  constructor() {
    this.footer = document.getElementById('footer');
    this.statsElements = document.querySelectorAll('.stat-number');
    this.socialLinks = document.querySelectorAll('.social-link');
    
    this.init();
  }

  init() {
    // Initialize footer functionality
    this.handleStatsAnimation();
    this.handleSocialLinks();
    this.handleNewsletterForm();
    this.handleScrollToTop();
    
    // Set current year
    this.updateCopyright();
  }

  // Animate statistics when footer comes into view
  handleStatsAnimation() {
    if (!this.statsElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-50px'
    });

    // Observe the stats container
    const statsContainer = document.querySelector('.footer-stats');
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  }

  // Animate statistics counting
  animateStats() {
    const stats = [
      { element: this.statsElements[0], target: 500, suffix: 'kg', duration: 2000 },
      { element: this.statsElements[1], target: 12.5, suffix: 'T', duration: 2500 },
      { element: this.statsElements[2], target: 0, suffix: '%', duration: 1500 },
      { element: this.statsElements[3], target: 25, suffix: '', duration: 2200 }
    ];

    stats.forEach((stat, index) => {
      if (!stat.element) return;
      
      setTimeout(() => {
        this.countUpAnimation(stat.element, stat.target, stat.suffix, stat.duration);
      }, index * 200);
    });
  }

  // Count up animation for individual stat
  countUpAnimation(element, target, suffix, duration) {
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (target - startValue) * easeOutCubic;
      
      // Format the value based on target
      let displayValue;
      if (target === 12.5) {
        displayValue = currentValue.toFixed(1);
      } else {
        displayValue = Math.floor(currentValue);
      }
      
      element.textContent = displayValue + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  // Handle social media links
  handleSocialLinks() {
    this.socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const platform = this.getSocialPlatform(link);
        this.trackSocialClick(platform);
        
        // You can add actual social media URLs here
        const socialUrls = {
          'linkedin': 'https://linkedin.com/company/zerowastegujarat',
          'twitter': 'https://twitter.com/zerowastegujarat',
          'facebook': 'https://facebook.com/zerowastegujarat',
          'instagram': 'https://instagram.com/zerowastegujarat'
        };
        
        if (socialUrls[platform]) {
          window.open(socialUrls[platform], '_blank', 'noopener,noreferrer');
        }
      });
    });
  }

  // Get social platform from link class
  getSocialPlatform(link) {
    const classList = Array.from(link.classList);
    const platforms = ['linkedin', 'twitter', 'facebook', 'instagram'];
    return platforms.find(platform => classList.includes(platform)) || 'unknown';
  }

  // Track social media clicks (for analytics)
  trackSocialClick(platform) {
    // You can integrate with Google Analytics or other tracking here
    console.log(`Social media click tracked: ${platform}`);
    
    // Example Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'social_click', {
        platform: platform,
        section: 'footer'
      });
    }
  }

  // Handle newsletter subscription form (if added later)
  handleNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleNewsletterSubmission(e.target);
    });
  }

  // Handle newsletter form submission
  async handleNewsletterSubmission(form) {
    const email = form.querySelector('input[type="email"]').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    try {
      // Replace with actual newsletter API endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        this.showNewsletterSuccess();
        form.reset();
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      this.showNewsletterError();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  // Show newsletter success message
  showNewsletterSuccess() {
    this.showNotification('Thank you for subscribing to our newsletter!', 'success');
  }

  // Show newsletter error message
  showNewsletterError() {
    this.showNotification('Failed to subscribe. Please try again later.', 'error');
  }

  // Show notification message
  showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.footer-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="close-notification" aria-label="Close notification">&times;</button>
    `;
    
    // Insert notification
    this.footer.insertBefore(notification, this.footer.firstChild);
    
    // Handle close button
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  // Handle scroll to top functionality
  handleScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollTopBtn) {
      scrollTopBtn = document.createElement('button');
      scrollTopBtn.className = 'scroll-to-top';
      scrollTopBtn.innerHTML = '↑';
      scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
      document.body.appendChild(scrollTopBtn);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    // Handle click
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Update copyright year
  updateCopyright() {
    const copyrightElements = document.querySelectorAll('.copyright p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
      if (element.textContent.includes('2025')) {
        element.textContent = element.textContent.replace('2025', currentYear);
      }
    });
  }

  // Method to update contact information dynamically
  updateContactInfo(newInfo) {
    if (newInfo.phone) {
      const phoneLinks = document.querySelectorAll('.contact-item a[href^="tel:"]');
      phoneLinks.forEach(link => {
        if (link.textContent.includes('Ahmedabad')) {
          link.href = `tel:${newInfo.phone.ahmedabad}`;
          link.textContent = newInfo.phone.ahmedabad;
        } else if (link.textContent.includes('Gandhinagar')) {
          link.href = `tel:${newInfo.phone.gandhinagar}`;
          link.textContent = newInfo.phone.gandhinagar;
        }
      });
    }
    
    if (newInfo.email) {
      const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
      if (emailLink) {
        emailLink.href = `mailto:${newInfo.email}`;
        emailLink.textContent = newInfo.email;
      }
    }
  }

  // Method to update statistics
  updateStatistics(newStats) {
    const statsData = [
      { value: newStats.dailyCapacity || 500, suffix: 'kg' },
      { value: newStats.monthlyThroughput || 12.5, suffix: 'T' },
      { value: newStats.wasteToLandfills || 0, suffix: '%' },
      { value: newStats.operatingDays || 25, suffix: '' }
    ];
    
    this.statsElements.forEach((element, index) => {
      if (statsData[index]) {
        const { value, suffix } = statsData[index];
        element.textContent = value + suffix;
      }
    });
  }
}

// Footer utility functions
const FooterUtils = {
  // Lazy load footer content
  lazyLoadFooter() {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Load any deferred footer content here
          entry.target.classList.add('loaded');
          footerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const footer = document.getElementById('footer');
    if (footer) {
      footerObserver.observe(footer);
    }
  },

  // Add smooth reveal animation to footer sections
  addRevealAnimation() {
    const footerSections = document.querySelectorAll('.footer-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    footerSections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }
};

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const footer = new Footer();
  
  // Add utility functions
  FooterUtils.lazyLoadFooter();
  FooterUtils.addRevealAnimation();
  
  // Make footer instance globally available
  window.ZeroWasteFooter = footer;
  window.FooterUtils = FooterUtils;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Footer, FooterUtils };
}