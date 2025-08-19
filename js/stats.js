// Statistics Counter Animation
class StatsCounter {
  constructor() {
    this.statsSection = document.querySelector('.stats-section');
    this.statNumbers = document.querySelectorAll('.stat-number');
    this.hasAnimated = false;
    this.observers = [];
    
    this.init();
  }

  init() {
    if (this.statsSection) {
      this.setupIntersectionObserver();
    }
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateStats();
          this.hasAnimated = true;
        }
      });
    }, options);

    observer.observe(this.statsSection);
    this.observers.push(observer);
  }

  animateStats() {
    // Add entrance animation class
    this.statsSection.classList.add('animate-in');
    
    // Start counting animation with delay
    setTimeout(() => {
      this.statNumbers.forEach((statNumber, index) => {
        const target = parseFloat(statNumber.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        
        setTimeout(() => {
          this.animateCounter(statNumber, target, isDecimal);
        }, index * 200);
      });
    }, 600);
  }

  animateCounter(element, target, isDecimal = false) {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
        element.classList.remove('counting');
      } else {
        element.classList.add('counting');
      }

      // Format the number based on whether it's decimal or integer
      if (isDecimal) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Enhanced counter with easing
class EasedStatsCounter extends StatsCounter {
  animateCounter(element, target, isDecimal = false) {
    const duration = 2500; // 2.5 seconds
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * easedProgress;

      if (progress < 1) {
        element.classList.add('counting');
        
        // Format the number
        if (isDecimal) {
          element.textContent = current.toFixed(1);
        } else {
          element.textContent = Math.floor(current);
        }
        
        requestAnimationFrame(animate);
      } else {
        element.classList.remove('counting');
        
        // Ensure final value is exact
        if (isDecimal) {
          element.textContent = target.toFixed(1);
        } else {
          element.textContent = target;
        }
      }
    };

    requestAnimationFrame(animate);
  }
}

// Utility functions
const statsUtils = {
  // Format large numbers
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  // Add thousand separators
  addCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Reset all counters
  resetCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(element => {
      element.textContent = '0';
      element.classList.remove('counting');
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the enhanced stats counter
  window.statsCounter = new EasedStatsCounter();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && window.statsCounter) {
    // Reset animation state if page becomes visible again
    setTimeout(() => {
      if (window.statsCounter.hasAnimated) {
        window.statsCounter.hasAnimated = false;
      }
    }, 1000);
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StatsCounter, EasedStatsCounter, statsUtils };
}
