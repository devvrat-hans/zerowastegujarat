// Navbar JavaScript for Zero Waste Gujarat Website

class Navbar {
  constructor() {
    // Wait for elements to be available
    this.initWhenReady();
  }

  initWhenReady() {
    const waitForElements = () => {
      this.navbar = document.getElementById('navbar');
      this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
      this.navbarNav = document.getElementById('navbarNav');
      this.navbarLinks = document.querySelectorAll('.navbar-link');

      if (this.navbar && this.navbarNav) {
        console.log('Navbar elements found, initializing...');
        this.init();
      } else {
        console.log('Navbar elements not ready, retrying...');
        setTimeout(waitForElements, 100);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', waitForElements);
    } else {
      waitForElements();
    }
  }

  init() {
    // Initialize all navbar functionality
    this.handleScroll();
    this.handleMobileMenu();
    this.handleActiveNavigation();
    this.handleSmoothScrolling();
    
    // Event listeners
    window.addEventListener('scroll', () => this.handleScroll());
    window.addEventListener('resize', () => this.handleResize());
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }

  // Handle navbar scroll effect
  handleScroll() {
    if (!this.navbar) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  // Handle mobile menu toggle
  handleMobileMenu() {
    if (!this.mobileMenuToggle || !this.navbarNav) return;
    
    this.mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMobileMenu();
    });
  }

  // Toggle mobile menu state
  toggleMobileMenu() {
    const isActive = this.navbarNav.classList.contains('active');
    
    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  // Open mobile menu
  openMobileMenu() {
    this.navbarNav.classList.add('active');
    this.mobileMenuToggle.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    
    // Animate menu items
    this.animateMenuItems(true);
  }

  // Close mobile menu
  closeMobileMenu() {
    if (!this.navbarNav || !this.mobileMenuToggle) return;
    
    this.navbarNav.classList.remove('active');
    this.mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
    
    // Reset menu items animation
    this.animateMenuItems(false);
  }

  // Animate menu items for mobile
  animateMenuItems(open) {
    const menuItems = this.navbarNav.querySelectorAll('.navbar-item');
    
    menuItems.forEach((item, index) => {
      if (open) {
        setTimeout(() => {
          item.style.transform = 'translateX(0)';
          item.style.opacity = '1';
        }, index * 100);
      } else {
        item.style.transform = 'translateX(-20px)';
        item.style.opacity = '0';
      }
    });
  }

  // Handle window resize
  handleResize() {
    if (!this.navbarNav) return;
    
    const windowWidth = window.innerWidth;
    
    // Close mobile menu if window becomes larger
    if (windowWidth > 768 && this.navbarNav.classList.contains('active')) {
      this.closeMobileMenu();
    }
  }

  // Handle clicks outside mobile menu
  handleOutsideClick(e) {
    // Check if elements exist before accessing their properties
    if (!this.navbarNav || !this.navbar) return;
    
    if (!this.navbarNav.classList.contains('active')) return;
    
    // Close if clicking outside navbar
    if (!this.navbar.contains(e.target)) {
      this.closeMobileMenu();
    }
  }

  // Handle active navigation highlighting
  handleActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    this.navbarLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      
      // Handle home page special case
      if ((currentPage === 'index.html' || currentPage === '') && 
          (linkPath === 'index.html' || linkPath === '../index.html')) {
        link.classList.add('active');
      } else if (linkPath === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Handle smooth scrolling for anchor links
  handleSmoothScrolling() {
    this.navbarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Check if it's an anchor link on the same page
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const navbarHeight = this.navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (this.navbarNav.classList.contains('active')) {
              this.closeMobileMenu();
            }
          }
        } else {
          // For regular page navigation, close mobile menu
          if (this.navbarNav.classList.contains('active')) {
            this.closeMobileMenu();
          }
        }
      });
    });
  }

  // Method to update active nav item programmatically
  setActiveNavItem(itemId) {
    this.navbarLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(itemId);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Method to show/hide navbar
  showNavbar() {
    if (this.navbar) {
      this.navbar.style.transform = 'translateY(0)';
    }
  }

  hideNavbar() {
    if (this.navbar) {
      this.navbar.style.transform = 'translateY(-100%)';
    }
  }
}

// Enhanced scroll behavior for navbar auto-hide
class NavbarScrollController {
  constructor(navbar) {
    this.navbar = navbar;
    this.lastScrollTop = 0;
    this.scrollThreshold = 5;
    this.navbarElement = navbar.navbar;
    
    this.init();
  }

  init() {
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
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDelta = scrollTop - this.lastScrollTop;

    // Don't hide navbar on very top of page
    if (scrollTop <= 100) {
      this.navbar.showNavbar();
      this.lastScrollTop = scrollTop;
      return;
    }

    // Scrolling down
    if (scrollDelta > this.scrollThreshold && scrollTop > 100) {
      // Don't hide if mobile menu is open
      if (!this.navbar.navbarNav.classList.contains('active')) {
        this.navbar.hideNavbar();
      }
    }
    // Scrolling up
    else if (scrollDelta < -this.scrollThreshold) {
      this.navbar.showNavbar();
    }

    this.lastScrollTop = scrollTop;
  }
}

// Utility functions for navbar
const NavbarUtils = {
  // Add loading state to CTA button
  setCTALoading(loading = true) {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    if (loading) {
      ctaButton.classList.add('loading');
      ctaButton.disabled = true;
      ctaButton.innerHTML = 'Processing...';
    } else {
      ctaButton.classList.remove('loading');
      ctaButton.disabled = false;
      ctaButton.innerHTML = 'Contact Us';
    }
  },

  // Add notification badge to navbar
  addNotificationBadge(count) {
    const navbar = document.querySelector('.navbar-brand');
    if (!navbar) return;
    
    // Remove existing badge
    const existingBadge = navbar.querySelector('.notification-badge');
    if (existingBadge) {
      existingBadge.remove();
    }
    
    if (count > 0) {
      const badge = document.createElement('span');
      badge.className = 'notification-badge';
      badge.textContent = count > 99 ? '99+' : count;
      navbar.appendChild(badge);
    }
  },

  // Update navbar based on user authentication state
  updateAuthState(isLoggedIn = false) {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    if (isLoggedIn) {
      ctaButton.textContent = 'Dashboard';
      ctaButton.onclick = () => window.location.href = '../dashboard.html';
    } else {
      ctaButton.textContent = 'Contact Us';
      ctaButton.onclick = () => window.location.href = '../contact.html';
    }
  }
};

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const navbar = new Navbar();
  // Disable auto-hide behavior to keep navbar always visible
  // const scrollController = new NavbarScrollController(navbar);
  
  // Make navbar instance globally available
  window.ZeroWasteNavbar = navbar;
  window.NavbarUtils = NavbarUtils;
  
  // Handle any initial URL hash
  if (window.location.hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        const navbarHeight = navbar.navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Navbar, NavbarScrollController, NavbarUtils };
}