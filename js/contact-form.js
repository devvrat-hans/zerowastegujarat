/**
 * Zero Waste Gujarat - Contact Form Handler
 * Handles form submission, validation, and integration with Google Apps Script
 */

class ContactFormHandler {
  constructor() {
    // Configuration - Replace with your actual Google Apps Script web app URL
    this.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwmyRFGoi0Sint_eG_P2XhSv-wgE5qVur1MjULfimiqL0ghtdgb2NX7F5e17GUdwilx/exec';
    
    this.form = null;
    this.submitButton = null;
    this.isSubmitting = false;
    
    this.init();
  }

  /**
   * Initialize the contact form
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupForm());
    } else {
      this.setupForm();
    }
  }

  /**
   * Setup form elements and event listeners
   */
  setupForm() {
    this.form = document.getElementById('contactForm');
    this.submitButton = this.form?.querySelector('button[type="submit"]');

    if (!this.form) {
      console.error('Contact form not found');
      return;
    }

    // Add event listeners
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Character counter for message textarea
    const messageTextarea = this.form.querySelector('#message');
    const charCounter = this.form.querySelector('.char-counter');
    
    if (messageTextarea && charCounter) {
      messageTextarea.addEventListener('input', () => {
        const currentLength = messageTextarea.value.length;
        const maxLength = messageTextarea.getAttribute('maxlength') || 1000;
        charCounter.textContent = `${currentLength}/${maxLength} characters`;
        
        // Change color when approaching limit
        if (currentLength > maxLength * 0.9) {
          charCounter.style.color = '#dc3545';
        } else if (currentLength > maxLength * 0.8) {
          charCounter.style.color = '#fd7e14';
        } else {
          charCounter.style.color = '#6c757d';
        }
      });
    }

    // Real-time validation
    this.setupRealTimeValidation();
  }

  /**
   * Setup real-time form validation
   */
  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        // Clear error state when user starts typing
        this.clearFieldError(input);
      });
    });
  }

  /**
   * Validate individual field
   */
  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Phone validation (if provided)
    if (fieldName === 'phone' && value) {
      const phoneRegex = /^[\+]?[0-9\-\s\(\)]{10,15}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    // Message length validation
    if (fieldName === 'message' && value) {
      if (value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  /**
   * Show field error
   */
  showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  /**
   * Clear field error
   */
  clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  /**
   * Validate entire form
   */
  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Handle form submission
   */
  async handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) {
      return;
    }

    // Validate form
    if (!this.validateForm()) {
      this.showMessage('Please correct the errors above', 'error');
      return;
    }

    try {
      this.setSubmitting(true);
      
      // Collect form data
      const formData = this.getFormData();
      
      // Submit to Google Apps Script
      const result = await this.submitToAppsScript(formData);
      
      if (result.success) {
        this.handleSuccessfulSubmission(result);
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      this.handleSubmissionError(error);
    } finally {
      this.setSubmitting(false);
    }
  }

  /**
   * Get form data
   */
  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  /**
   * Submit data to Google Apps Script
   */
  async submitToAppsScript(formData) {
    const submitData = new URLSearchParams();
    
    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    const response = await fetch(this.APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      body: submitData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  }

  /**
   * Handle successful form submission
   */
  handleSuccessfulSubmission(result) {
    // Show success message
    this.showMessage(
      result.message || 'Thank you for your message! We will get back to you within 24 hours.',
      'success'
    );

    // Reset form
    this.form.reset();
    
    // Reset character counter
    const charCounter = this.form.querySelector('.char-counter');
    if (charCounter) {
      charCounter.textContent = '0/1000 characters';
      charCounter.style.color = '#6c757d';
    }

    // Clear any existing errors
    this.clearAllErrors();

    // Scroll to success message
    setTimeout(() => {
      const messageElement = document.querySelector('.form-message');
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    // Optional: Track submission for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact_form_submit', {
        'event_category': 'engagement',
        'event_label': 'Contact Form'
      });
    }
  }

  /**
   * Handle form submission error
   */
  handleSubmissionError(error) {
    let errorMessage = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
    
    if (error.message.includes('Failed to fetch')) {
      errorMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
    } else if (error.message.includes('Invalid request')) {
      errorMessage = 'There was a problem with your form submission. Please refresh the page and try again.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    this.showMessage(errorMessage, 'error');
  }

  /**
   * Set submitting state
   */
  setSubmitting(isSubmitting) {
    this.isSubmitting = isSubmitting;
    
    if (this.submitButton) {
      if (isSubmitting) {
        this.submitButton.disabled = true;
        this.submitButton.innerHTML = `
          <span class="spinner"></span>
          <span>Sending...</span>
        `;
      } else {
        this.submitButton.disabled = false;
        this.submitButton.innerHTML = `
          <span>Send Message</span>
          <span class="btn-icon">→</span>
        `;
      }
    }
  }

  /**
   * Show message to user
   */
  showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
      <div class="message-content">
        <span class="message-icon">${this.getMessageIcon(type)}</span>
        <span class="message-text">${message}</span>
      </div>
    `;

    // Insert message above form
    this.form.parentNode.insertBefore(messageDiv, this.form);

    // Auto-remove success messages after 10 seconds
    if (type === 'success') {
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 10000);
    }
  }

  /**
   * Get message icon based on type
   */
  getMessageIcon(type) {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }

  /**
   * Clear all form errors
   */
  clearAllErrors() {
    const errorFields = this.form.querySelectorAll('.error');
    const errorMessages = this.form.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
  }
}

// Initialize contact form when script loads
window.addEventListener('DOMContentLoaded', () => {
  new ContactFormHandler();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactFormHandler;
}