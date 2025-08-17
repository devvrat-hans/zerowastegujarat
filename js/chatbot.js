// Chatbot Functionality for Zero Waste Gujarat

class ZeroWasteChatbot {
  constructor() {
    this.isOpen = false;
    this.currentCategory = null;
    this.currentStep = 'categories'; // categories, questions, chat
    this.messagesContainer = null;
    this.inputField = null;
    this.sendButton = null;
    
    this.init();
    this.setupEventListeners();
    this.loadWelcomeMessage();
  }

  // Predefined Questions and Answers Database
  chatData = {
    categories: [
      {
        id: 'services',
        name: '🏭 Our Services',
        description: 'Learn about our textile recycling services'
      },
      {
        id: 'products',
        name: '📦 Products',
        description: 'Information about our recycled products'
      },
      {
        id: 'process',
        name: '⚙️ Process',
        description: 'How we transform waste into value'
      },
      {
        id: 'business',
        name: '💼 Business',
        description: 'Partnership and business inquiries'
      }
    ],

    questions: {
      services: [
        {
          q: "What types of textile waste do you collect?",
          a: "We collect various types of textile waste including:\n\n• Cotton waste from garment factories\n• Polyester and mixed fiber waste\n• Post-consumer textile waste\n• Fabric scraps and offcuts\n• Damaged or unsold clothing\n\nWe work with garment factories, rag dealers, and have post-consumer partnerships to ensure comprehensive waste collection."
        },
        {
          q: "What is your daily processing capacity?",
          a: "Our facility in Ahmedabad has a processing capacity of 500 kg per day. We operate 25 days per month, which gives us a monthly throughput of approximately 12.5 tonnes of textile waste processing."
        },
        {
          q: "Where is your facility located?",
          a: "Our main facility is located in a 2,000 sq ft space in the industrial area of Ahmedabad, Gujarat, India. This strategic location allows us to efficiently collect waste from local garment manufacturers and distribute our products across the region."
        },
        {
          q: "Do you provide collection services?",
          a: "Yes, we provide comprehensive collection services! We work directly with:\n\n• Garment factories for regular waste pickup\n• Rag dealers for bulk collection\n• Retail partnerships for post-consumer waste\n\nContact us to discuss collection schedules and logistics for your location."
        },
        {
          q: "I didn't find my question",
          a: "contact"
        }
      ],

      products: [
        {
          q: "What products do you manufacture?",
          a: "We create three main categories of products:\n\n🧵 **Fiber & Nonwovens**\n• Recycled staple fiber (mixed cotton/polyester)\n• Needle-punched nonwoven rolls\n• Targeted for mattress manufacturers\n\n📦 **Sustainable Packaging**\n• Cotton-paper luxury boxes\n• Molded fiber trays and containers\n• Insulated nonwoven food sleeves\n\n🌱 **Carbon Credits**\n• Verified credits for avoided emissions\n• Price range: ₹300-₹1,000 per tCO2e"
        },
        {
          q: "What are your product prices?",
          a: "Our current product pricing:\n\n• **Recycled Fiber**: ₹50 per kg\n• **Sustainable Packaging**: ₹120 per kg\n• **Carbon Credits**: ₹300-₹1,000 per tCO2e\n\nPrices may vary based on quantity, quality specifications, and market conditions. Contact us for bulk pricing and custom requirements."
        },
        {
          q: "Who are your target customers?",
          a: "We serve B2B customers across multiple sectors:\n\n**Fiber & Nonwovens:**\n• Mattress manufacturers\n• Stuffing suppliers\n• Textile manufacturers\n\n**Packaging:**\n• E-commerce companies\n• Boutique stores\n• Food chain restaurants\n\n**Carbon Credits:**\n• Corporations with sustainability goals\n• Companies seeking carbon offset solutions"
        },
        {
          q: "Are your products certified?",
          a: "Yes, our products meet various quality and environmental standards:\n\n• Our carbon credits are verified by Verra, Gold Standard, and CCTS\n• Our recycling processes follow circular economy principles\n• We maintain quality certifications for our fiber and packaging products\n\nSpecific certifications vary by product category. Contact us for detailed certification information."
        },
        {
          q: "I didn't find my question",
          a: "contact"
        }
      ],

      process: [
        {
          q: "How does your recycling process work?",
          a: "Our 5-step recycling process:\n\n**Step 1: Collection & Sorting**\nWe collect textile waste and sort by material type and quality.\n\n**Step 2: Shredding & Fiber Opening**\nTextiles are mechanically shredded into small pieces.\n\n**Step 3: Carding for Fiber Output**\nFibers are aligned and prepared for further processing.\n\n**Step 4: Pulping/Molding for Packaging**\nSome materials undergo pulping for packaging products.\n\n**Step 5: Baling/Packing & Dispatch**\nFinal products are packaged and prepared for shipment."
        },
        {
          q: "What happens to textile waste that can't be recycled?",
          a: "At Zero Waste Gujarat, we have a zero waste to landfills commitment! Every piece of textile waste we collect is processed and transformed into valuable products. Our comprehensive approach ensures:\n\n• 100% of collected waste is utilized\n• Different grades of materials are processed into appropriate products\n• Even the smallest scraps are converted into usable materials\n\nThis is part of our mission that 'every thread has a second life.'"
        },
        {
          q: "How long does the recycling process take?",
          a: "The complete recycling process typically takes:\n\n• **Collection to Processing**: 1-2 days\n• **Processing Time**: 3-5 days depending on product type\n• **Quality Control**: 1 day\n• **Packaging & Dispatch**: 1 day\n\n**Total Timeline**: 6-9 days from collection to final product delivery. Rush orders may be accommodated with advance notice."
        },
        {
          q: "What technology do you use?",
          a: "We utilize state-of-the-art recycling technology including:\n\n• Advanced mechanical shredding systems\n• Fiber opening and carding machines\n• Needle-punching equipment for nonwovens\n• Molding and pulping systems for packaging\n• Quality control and testing equipment\n\nOur technology ensures efficient processing while maintaining high product quality standards."
        },
        {
          q: "I didn't find my question",
          a: "contact"
        }
      ],

      business: [
        {
          q: "How can I become a partner?",
          a: "We welcome various partnership opportunities:\n\n**Supply Partners:**\n• Garment factories providing regular waste\n• Rag dealers with consistent supply\n• Retailers with post-consumer collection\n\n**Distribution Partners:**\n• Product distributors and resellers\n• B2B sales representatives\n\n**CSR Partnerships:**\n• Corporate sustainability programs\n• Environmental impact initiatives\n\nContact us to discuss partnership terms and opportunities."
        },
        {
          q: "What are your minimum order quantities?",
          a: "Our minimum order quantities vary by product:\n\n• **Recycled Fiber**: 100 kg minimum\n• **Nonwoven Rolls**: 50 kg minimum\n• **Packaging Products**: 500 pieces minimum\n• **Carbon Credits**: 1 tCO2e minimum\n\nBulk orders receive preferential pricing. We can also accommodate custom specifications for larger orders."
        },
        {
          q: "Do you offer CSR collaboration programs?",
          a: "Yes! We offer comprehensive CSR collaboration programs:\n\n• **Environmental Impact Reporting**: Detailed waste diversion metrics\n• **Carbon Credit Generation**: Verified emissions reductions\n• **Sustainability Partnerships**: Long-term environmental commitments\n• **Community Impact**: Local job creation and skill development\n\nOur CSR programs help companies achieve their sustainability goals while creating measurable environmental impact."
        },
        {
          q: "What are your payment terms?",
          a: "Our standard payment terms:\n\n• **New Customers**: 50% advance, 50% on delivery\n• **Regular Customers**: 30-day payment terms\n• **Bulk Orders**: Negotiable terms based on volume\n• **CSR Programs**: Flexible payment schedules\n\nWe accept bank transfers, checks, and digital payments. International customers may require letter of credit arrangements."
        },
        {
          q: "I didn't find my question",
          a: "contact"
        }
      ]
    },

    contactInfo: {
      title: "Contact Zero Waste Gujarat",
      message: "We'd love to hear from you! Get in touch with our team for any questions or inquiries.",
      details: [
        "📍 2,000 sq ft Industrial Area, Ahmedabad, Gujarat, India",
        "📞 Ahmedabad: +91-9558358007",
        "📞 Gandhinagar: +91-7878761377", 
        "✉️ ravedhamecha@gmail.com"
      ],
      contactFormLink: "./contact.html"
    }
  };

  init() {
    this.messagesContainer = document.getElementById('chatbot-messages');
    this.inputField = document.getElementById('chatbot-input');
    this.sendButton = document.getElementById('chatbot-send');
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const minimizeBtn = document.getElementById('chatbot-minimize');

    toggleBtn?.addEventListener('click', () => this.toggleChatbot());
    minimizeBtn?.addEventListener('click', () => this.closeChatbot());
    
    this.inputField?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.sendButton?.addEventListener('click', () => this.sendMessage());
  }

  toggleChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');

    if (this.isOpen) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }

  openChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');

    toggle?.classList.add('active');
    window?.classList.add('active');
    this.isOpen = true;

    // Focus input field
    setTimeout(() => {
      this.inputField?.focus();
    }, 300);
  }

  closeChatbot() {
    const toggle = document.getElementById('chatbot-toggle');
    const window = document.getElementById('chatbot-window');

    toggle?.classList.remove('active');
    window?.classList.remove('active');
    this.isOpen = false;
  }

  loadWelcomeMessage() {
    this.addBotMessage(
      "👋 Welcome to Zero Waste Gujarat!\n\nI'm here to help you learn about our textile recycling services and products. What would you like to know about?",
      this.createCategoriesButtons()
    );
  }

  createCategoriesButtons() {
    const categoryGrid = document.createElement('div');
    categoryGrid.className = 'category-grid';

    this.chatData.categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'category-btn';
      button.textContent = category.name;
      button.onclick = () => this.showCategoryQuestions(category.id);
      categoryGrid.appendChild(button);
    });

    return categoryGrid;
  }

  showCategoryQuestions(categoryId) {
    this.currentCategory = categoryId;
    this.currentStep = 'questions';
    
    const category = this.chatData.categories.find(c => c.id === categoryId);
    const questions = this.chatData.questions[categoryId];

    this.addUserMessage(category.name);

    const questionContainer = document.createElement('div');
    
    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.innerHTML = '← Back to Categories';
    backBtn.onclick = () => this.showCategories();
    questionContainer.appendChild(backBtn);

    // Add questions list
    const questionList = document.createElement('div');
    questionList.className = 'question-list';

    questions.forEach(item => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question-item';
      questionDiv.textContent = item.q;
      questionDiv.onclick = () => this.showAnswer(item.q, item.a);
      questionList.appendChild(questionDiv);
    });

    questionContainer.appendChild(questionList);

    this.addBotMessage(
      `Here are the most common questions about ${category.name.toLowerCase()}:`,
      questionContainer
    );
  }

  showAnswer(question, answer) {
    this.addUserMessage(question);

    if (answer === 'contact') {
      this.showContactInfo();
    } else {
      this.addBotMessage(answer);
      
      // Add suggestion to go back or ask another question
      setTimeout(() => {
        const suggestionContainer = document.createElement('div');
        suggestionContainer.style.marginTop = '12px';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'suggestion-btn';
        backBtn.textContent = 'More Questions';
        backBtn.onclick = () => this.showCategoryQuestions(this.currentCategory);
        
        const categoriesBtn = document.createElement('button');
        categoriesBtn.className = 'suggestion-btn';
        categoriesBtn.textContent = 'All Categories';
        categoriesBtn.onclick = () => this.showCategories();

        suggestionContainer.appendChild(backBtn);
        suggestionContainer.appendChild(categoriesBtn);

        this.addBotMessage("Was this helpful? What else would you like to know?", suggestionContainer);
      }, 1000);
    }
  }

  showCategories() {
    this.currentStep = 'categories';
    this.currentCategory = null;
    
    this.addBotMessage(
      "What would you like to learn about?",
      this.createCategoriesButtons()
    );
  }

  showContactInfo() {
    const contactInfo = this.chatData.contactInfo;
    
    const contactContainer = document.createElement('div');
    contactContainer.className = 'contact-info';
    
    const title = document.createElement('h4');
    title.textContent = contactInfo.title;
    contactContainer.appendChild(title);
    
    const message = document.createElement('p');
    message.textContent = contactInfo.message;
    contactContainer.appendChild(message);
    
    contactInfo.details.forEach(detail => {
      const p = document.createElement('p');
      p.textContent = detail;
      contactContainer.appendChild(p);
    });
    
    const contactLink = document.createElement('a');
    contactLink.href = contactInfo.contactFormLink;
    contactLink.className = 'contact-link';
    contactLink.textContent = 'Open Contact Form →';
    contactContainer.appendChild(contactLink);

    this.addBotMessage(
      "I'd be happy to connect you with our team directly:",
      contactContainer
    );

    // Add back option
    setTimeout(() => {
      const backBtn = document.createElement('button');
      backBtn.className = 'suggestion-btn';
      backBtn.textContent = 'Back to Questions';
      backBtn.onclick = () => this.showCategoryQuestions(this.currentCategory);
      
      this.addBotMessage("Need more information?", backBtn);
    }, 1500);
  }

  sendMessage() {
    const message = this.inputField?.value.trim();
    if (!message) return;

    this.addUserMessage(message);
    this.inputField.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    // Process the message
    setTimeout(() => {
      this.hideTypingIndicator();
      this.processUserMessage(message);
    }, 1500);
  }

  processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching for common queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      this.showAnswer("What are your product prices?", this.chatData.questions.products[1].a);
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      this.showContactInfo();
    } else if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('facility')) {
      this.showAnswer("Where is your facility located?", this.chatData.questions.services[2].a);
    } else if (lowerMessage.includes('process') || lowerMessage.includes('how')) {
      this.showAnswer("How does your recycling process work?", this.chatData.questions.process[0].a);
    } else if (lowerMessage.includes('product') || lowerMessage.includes('manufacture')) {
      this.showAnswer("What products do you manufacture?", this.chatData.questions.products[0].a);
    } else {
      // Default response
      this.addBotMessage(
        "I'd like to help you find the right information! Let me show you our main topics:",
        this.createCategoriesButtons()
      );
    }
  }

  showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-message';
    typingDiv.innerHTML = `
      <div class="message-avatar">ZW</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    this.messagesContainer?.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const typingMessage = this.messagesContainer?.querySelector('.typing-message');
    typingMessage?.remove();
  }

  addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
      <div class="message-avatar">You</div>
      <div class="message-content">${message}</div>
    `;
    
    this.messagesContainer?.appendChild(messageDiv);
    this.scrollToBottom();
  }

  addBotMessage(message, additionalContent = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = message.replace(/\n/g, '<br>');
    
    if (additionalContent) {
      contentDiv.appendChild(additionalContent);
    }
    
    messageDiv.innerHTML = `<div class="message-avatar">ZW</div>`;
    messageDiv.appendChild(contentDiv);
    
    this.messagesContainer?.appendChild(messageDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer?.scrollTo({
        top: this.messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ZeroWasteChatbot();
});
