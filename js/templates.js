// Templates JavaScript for Zero Waste Gujarat Website
// This file handles loading of navbar and footer templates across all pages

class TemplateLoader {
  constructor() {
    this.templates = new Map();
    this.basePath = this.getBasePath();
    this.init();
  }

  // Determine the base path for template loading
  getBasePath() {
    // Since all pages are in root directory, always use current directory
    return './';
  }

  async init() {
    // Load templates when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadAllTemplates());
    } else {
      await this.loadAllTemplates();
    }
  }

  // Load all required templates
  async loadAllTemplates() {
    try {
      await Promise.all([
        this.loadTemplate('navbar', 'navbar-container'),
        this.loadTemplate('footer', 'footer-container'),
        this.loadTemplate('scroll-to-top', 'scroll-to-top-container')
      ]);
      
      // Initialize components after templates are loaded
      this.initializeComponents();
      
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  }

  // Load individual template
  async loadTemplate(templateName, containerId) {
    try {
      const templatePath = `${this.basePath}tempaltes/shared/${templateName}.html`;
      const response = await fetch(templatePath);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${templateName} template: ${response.status}`);
      }
      
      const templateContent = await response.text();
      this.templates.set(templateName, templateContent);
      
      // Insert template into page
      this.insertTemplate(templateName, templateContent, containerId);
      
      return templateContent;
      
    } catch (error) {
      console.error(`Error loading ${templateName} template:`, error);
      throw error;
    }
  }

  // Insert template into the page
  insertTemplate(templateName, content, containerId) {
    const container = document.getElementById(containerId);
    
    if (container) {
      container.innerHTML = content;
      container.classList.add(`${templateName}-loaded`);
    } else {
      // If no container found, append to body for navbar or before closing body tag for footer
      if (templateName === 'navbar') {
        document.body.insertAdjacentHTML('afterbegin', content);
      } else if (templateName === 'footer') {
        document.body.insertAdjacentHTML('beforeend', content);
      }
    }
  }

  // Initialize components after templates are loaded
  initializeComponents() {
    // Load CSS files
    this.loadStylesheets();
    
    // Load JavaScript files
    this.loadScripts();
    
    // Update navigation paths
    this.updateNavigationPaths();
    
    // Set active navigation
    this.setActiveNavigation();
  }

  // Load required CSS files
  loadStylesheets() {
    const stylesheets = [
      { href: `${this.basePath}css/navbar.css`, id: 'navbar-css' },
      { href: `${this.basePath}css/footer.css`, id: 'footer-css' }
    ];
    
    stylesheets.forEach(stylesheet => {
      if (!document.getElementById(stylesheet.id)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesheet.href;
        link.id = stylesheet.id;
        document.head.appendChild(link);
      }
    });
  }

  // Load required JavaScript files
  loadScripts() {
    const scripts = [
      { src: `${this.basePath}js/navbar.js`, id: 'navbar-js' },
      { src: `${this.basePath}js/footer.js`, id: 'footer-js' }
    ];
    
    scripts.forEach(script => {
      if (!document.getElementById(script.id)) {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        scriptElement.id = script.id;
        scriptElement.defer = true;
        document.head.appendChild(scriptElement);
      }
    });
  }

  // Update navigation paths based on current page location
  updateNavigationPaths() {
    const navLinks = document.querySelectorAll('.navbar-link, .footer-section a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        // Update relative paths based on current location
        if (href.startsWith('../') && !window.location.pathname.includes('/')) {
          // Remove ../ if we're in root directory
          link.setAttribute('href', href.replace('../', './'));
        } else if (!href.startsWith('../') && window.location.pathname.includes('/')) {
          // Add ../ if we're in pages directory and link doesn't have it
          if (!href.startsWith('./')) {
            link.setAttribute('href', `../${href}`);
          }
        }
      }
    });
  }

  // Set active navigation based on current page
  setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      
      if ((currentPage === 'index.html' || currentPage === '') && 
          (linkPath === 'index.html' || link.textContent.trim() === 'HOME')) {
        link.classList.add('active');
      } else if (linkPath === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Method to reload templates (useful for dynamic content)
  async reloadTemplates() {
    this.templates.clear();
    await this.loadAllTemplates();
  }

  // Method to get loaded template content
  getTemplate(templateName) {
    return this.templates.get(templateName);
  }

  // Method to check if template is loaded
  isTemplateLoaded(templateName) {
    return this.templates.has(templateName);
  }
}

// Page-specific template configurations
const PageConfigurations = {
  // Default configuration for all pages
  default: {
    loadNavbar: true,
    loadFooter: true,
    navbarContainer: 'navbar-container',
    footerContainer: 'footer-container'
  },
  
  // Specific configurations for different pages
  home: {
    loadNavbar: true,
    loadFooter: true,
    customNavbarClass: 'home-navbar',
    customFooterClass: 'home-footer'
  },
  
  contact: {
    loadNavbar: true,
    loadFooter: true,
    hideNewsletterSignup: true
  }
};

// Utility functions for template management
const TemplateUtils = {
  // Add custom classes to loaded templates
  addCustomClasses(templateName, classes) {
    const template = document.getElementById(templateName);
    if (template && classes) {
      template.classList.add(...classes.split(' '));
    }
  },

  // Update template content dynamically
  updateTemplateContent(templateName, selector, content) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = content;
    }
  },

  // Toggle template visibility
  toggleTemplate(templateName, visible = true) {
    const template = document.getElementById(templateName);
    if (template) {
      template.style.display = visible ? 'block' : 'none';
    }
  },

  // Get current page configuration
  getCurrentPageConfig() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
    return PageConfigurations[currentPage] || PageConfigurations.default;
  }
};

// Auto-initialize template loader
let templateLoader;

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    templateLoader = new TemplateLoader();
  });
} else {
  templateLoader = new TemplateLoader();
}

// Make utilities globally available
window.TemplateLoader = TemplateLoader;
window.TemplateUtils = TemplateUtils;
window.PageConfigurations = PageConfigurations;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TemplateLoader, TemplateUtils, PageConfigurations };
}