// Scroll to Top JavaScript for Zero Waste Gujarat Website

class ScrollToTop {
  constructor() {
    this.button = null;
    this.scrollThreshold = 300; // Show button after scrolling 300px
    this.isVisible = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupScrollToTop());
    } else {
      this.setupScrollToTop();
    }
  }

  setupScrollToTop() {
    // Find the scroll to top button
    this.button = document.getElementById('scroll-to-top');
    
    if (!this.button) {
      console.error('Scroll to top button not found');
      return;
    }

    // Add click event listener
    this.button.addEventListener('click', () => this.scrollToTop());

    // Add scroll event listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Initial check
    this.handleScroll();
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > this.scrollThreshold && !this.isVisible) {
      this.showButton();
    } else if (scrollTop <= this.scrollThreshold && this.isVisible) {
      this.hideButton();
    }
  }

  showButton() {
    if (this.button && !this.isVisible) {
      this.button.classList.add('show');
      this.isVisible = true;
    }
  }

  hideButton() {
    if (this.button && this.isVisible) {
      this.button.classList.remove('show');
      this.isVisible = false;
    }
  }

  scrollToTop() {
    // Smooth scroll to top
    const duration = 800;
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeInOutCubic = progress => progress < 0.5 
        ? 4 * progress * progress * progress 
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
      
      const position = startPosition * (1 - easeInOutCubic(progress));
      window.scrollTo(0, position);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    // Add visual feedback
    this.button.style.transform = 'translateY(-1px) scale(0.95)';
    setTimeout(() => {
      if (this.button) {
        this.button.style.transform = '';
      }
    }, 150);
  }

  // Method to manually show/hide button (for other components to use if needed)
  toggle(show) {
    if (show) {
      this.showButton();
    } else {
      this.hideButton();
    }
  }

  // Destroy method for cleanup if needed
  destroy() {
    if (this.button) {
      this.button.removeEventListener('click', this.scrollToTop);
    }
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Initialize scroll to top functionality
const scrollToTopInstance = new ScrollToTop();

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollToTop;
}
