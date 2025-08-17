// Language Switcher JavaScript for Zero Waste Gujarat Website
// This file handles switching between English and Gujarati languages

class LanguageSwitcher {
  constructor() {
    this.currentLanguage = 'en';
    this.translations = new Map();
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupLanguageSwitcher());
    } else {
      await this.setupLanguageSwitcher();
    }
  }

  async setupLanguageSwitcher() {
    try {
      // Load Gujarati translations
      await this.loadTranslations();
      
      // Set up event listeners for language buttons
      this.setupEventListeners();
      
      // Load saved language preference
      this.loadLanguagePreference();
      
    } catch (error) {
      console.error('Error setting up language switcher:', error);
    }
  }

  async loadTranslations() {
    try {
      // Since we're storing translations in data attributes, we don't need to load an external file
      // The translations are already embedded in the HTML
      console.log('Language switcher initialized with inline translations');
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  setupEventListeners() {
    const languageButtons = document.querySelectorAll('.lang-btn');
    
    languageButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetLang = button.getAttribute('data-lang');
        this.switchLanguage(targetLang);
      });
    });
  }

  switchLanguage(targetLang) {
    if (targetLang === this.currentLanguage) return;

    this.currentLanguage = targetLang;
    
    // Update all text elements with lang-text class
    const textElements = document.querySelectorAll('.lang-text');
    
    textElements.forEach(element => {
      const translation = element.getAttribute(`data-${targetLang}`);
      if (translation) {
        // For links, update the text content
        if (element.tagName === 'A') {
          element.textContent = translation;
        } else {
          // For other elements, update innerHTML to preserve HTML entities
          element.innerHTML = translation;
        }
      }
    });

    // Update active button state
    this.updateButtonStates();
    
    // Save language preference
    this.saveLanguagePreference();
    
    // Update page direction if needed (Gujarati is LTR)
    document.documentElement.setAttribute('lang', targetLang === 'gu' ? 'gu-IN' : 'en-US');
    
    // Dispatch custom event for other components that might need to know about language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: targetLang } 
    }));
  }

  updateButtonStates() {
    const languageButtons = document.querySelectorAll('.lang-btn');
    
    languageButtons.forEach(button => {
      const buttonLang = button.getAttribute('data-lang');
      
      if (buttonLang === this.currentLanguage) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  saveLanguagePreference() {
    try {
      localStorage.setItem('zero-waste-gujarat-language', this.currentLanguage);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
  }

  loadLanguagePreference() {
    try {
      const savedLanguage = localStorage.getItem('zero-waste-gujarat-language');
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'gu')) {
        this.switchLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Could not load language preference:', error);
    }
  }

  // Method to get current language (for other components to use)
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Method to add translations dynamically (for future use)
  addTranslations(elementSelector, translations) {
    const element = document.querySelector(elementSelector);
    if (element) {
      element.classList.add('lang-text');
      element.setAttribute('data-en', translations.en);
      element.setAttribute('data-gu', translations.gu);
      
      // Apply current language
      const currentTranslation = translations[this.currentLanguage];
      if (currentTranslation) {
        if (element.tagName === 'A') {
          element.textContent = currentTranslation;
        } else {
          element.innerHTML = currentTranslation;
        }
      }
    }
  }

  // Cleanup method
  destroy() {
    const languageButtons = document.querySelectorAll('.lang-btn');
    languageButtons.forEach(button => {
      button.removeEventListener('click', this.switchLanguage);
    });
  }
}

// Initialize language switcher
const languageSwitcherInstance = new LanguageSwitcher();

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSwitcher;
}
