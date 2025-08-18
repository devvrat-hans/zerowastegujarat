// Hero Section JavaScript for Zero Waste Gujarat

class HeroSection {
  constructor() {
    this.hero = document.querySelector('.hero');
    this.heroTitle = document.querySelector('.hero-title');
    this.metrics = document.querySelectorAll('.metric-number');
    this.processSteps = document.querySelectorAll('.process-step');
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.animateMetrics();
    this.setupParallaxEffect();
    this.setupTypewriterEffect();
  }

  // Setup intersection observer for animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Trigger specific animations based on element
          if (entry.target.classList.contains('process-step')) {
            this.animateProcessSteps();
          }
        }
      });
    }, observerOptions);

    // Observe hero elements
    if (this.hero) observer.observe(this.hero);
    this.processSteps.forEach(step => observer.observe(step));
  }

  // Animate metrics counting up
  animateMetrics() {
    const metricsData = [
      { element: this.metrics[0], target: 500, duration: 2000 },
      { element: this.metrics[1], target: 12.5, duration: 2500, decimal: 1 },
      { element: this.metrics[2], target: 0, duration: 1500 }
    ];

    // Start animation when hero is in view
    setTimeout(() => {
      metricsData.forEach((metric, index) => {
        if (metric.element) {
          setTimeout(() => {
            this.animateCounter(metric.element, metric.target, metric.duration, metric.decimal);
          }, index * 200);
        }
      });
    }, 500);
  }

  // Counter animation helper
  animateCounter(element, target, duration, decimal = 0) {
    const start = 0;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOutCubic;
      
      // Update display
      const displayValue = decimal > 0 ? current.toFixed(decimal) : Math.floor(current);
      const suffix = element.querySelector('span');
      const suffixText = suffix ? suffix.textContent : '';
      
      element.innerHTML = `${displayValue}<span>${suffixText}</span>`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Setup subtle parallax effect
  setupParallaxEffect() {
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-circle');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // Animate process steps sequentially
  animateProcessSteps() {
    this.processSteps.forEach((step, index) => {
      setTimeout(() => {
        step.style.opacity = '1';
        step.style.transform = 'translateY(0) scale(1)';
      }, index * 300);
    });
  }

  // Setup typewriter effect for hero title
  setupTypewriterEffect() {
    const titleElements = {
      highlight: document.querySelector('.title-highlight'),
      main: document.querySelector('.title-main')
    };

    // Initial state
    Object.values(titleElements).forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
      }
    });

    // Animate in sequence
    setTimeout(() => {
      if (titleElements.highlight) {
        titleElements.highlight.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        titleElements.highlight.style.opacity = '1';
        titleElements.highlight.style.transform = 'translateY(0)';
      }
    }, 200);

    setTimeout(() => {
      if (titleElements.main) {
        titleElements.main.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        titleElements.main.style.opacity = '1';
        titleElements.main.style.transform = 'translateY(0)';
      }
    }, 600);
  }

  // Method to update hero metrics dynamically
  updateMetrics(newData) {
    const metricsData = [
      { value: newData.dailyCapacity || 500, suffix: 'kg' },
      { value: newData.monthlyOutput || 12.5, suffix: 'T' },
      { value: newData.wasteToLandfill || 0, suffix: '%' }
    ];

    this.metrics.forEach((metric, index) => {
      if (metricsData[index] && metric) {
        const { value, suffix } = metricsData[index];
        metric.innerHTML = `${value}<span>${suffix}</span>`;
      }
    });
  }

  // Method to add custom animations
  addCustomAnimation(element, animationClass, delay = 0) {
    setTimeout(() => {
      if (element && element.classList) {
        element.classList.add(animationClass);
      }
    }, delay);
  }
}

// Hero utility functions
const HeroUtils = {
  // Create floating particle effect
  createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particleCount = 20;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(33, 95, 68, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      
      hero.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const x = Math.sin(Date.now() * 0.001 + index) * 100;
        const y = Math.cos(Date.now() * 0.0008 + index) * 100;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
      
      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  },

  // Add hover effects to buttons
  enhanceButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary-hero, .btn-secondary-hero');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'button-ripple';
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple keyframes
    if (!document.getElementById('button-ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'button-ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
};

// Initialize hero section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const heroSection = new HeroSection();
  
  // Add enhanced interactions
  HeroUtils.enhanceButtonInteractions();
  
  // Add particle effect (optional, can be enabled/disabled)
  // HeroUtils.createParticleEffect();
  
  // Make hero instance globally available
  window.ZeroWasteHero = heroSection;
  window.HeroUtils = HeroUtils;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HeroSection, HeroUtils };
}
