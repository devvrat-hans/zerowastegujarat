// Chatbot JavaScript for Zero Waste Gujarat
// Handles chatbot functionality with predefined Q&A

class ZeroWasteChatbot {
    constructor() {
        this.currentCategory = null;
        this.currentView = 'categories';
        this.isOpen = false;
        this.questions = this.initializeQuestions();
        
        this.init();
    }

    // Initialize chatbot questions and answers based on knowledge base
    initializeQuestions() {
        return {
            about: {
                title: "About Our Company",
                icon: "🏢",
                questions: [
                    {
                        q: "What is Zero Waste Gujarat's mission?",
                        a: "At Zero Waste Gujarat, we believe every discarded thread holds the potential to weave a sustainable future. Our mission is to transform textile waste into valuable resources while creating measurable environmental impact through innovative recycling and carbon credit generation."
                    },
                    {
                        q: "Where is Zero Waste Gujarat located?",
                        a: "We operate from our 2,000 sq ft state-of-the-art facility in Ahmedabad's industrial area, Gujarat. Our strategic location allows us to serve Gujarat's textile ecosystem effectively, as Gujarat contributes 33.4% of India's textile exports."
                    },
                    {
                        q: "What is your daily processing capacity?",
                        a: "We currently process 500 kg of mixed textile waste daily, which translates to 12.5 tonnes monthly. Our facility operates 25 days per month with advanced machinery including industrial shredders, carding systems, and needle-punch lines."
                    },
                    {
                        q: "Who founded Zero Waste Gujarat?",
                        a: "Zero Waste Gujarat was founded by Ravi Dhamecha, who brings 12+ years of operations management experience across textile manufacturing, retail, and rural development. The company emerged from recognizing Gujarat's unique position in India's textile ecosystem."
                    },
                    {
                        q: "What are your future expansion plans?",
                        a: "We're scaling to 2,000 kg daily capacity by 2027, expanding into chemical recycling technologies, and aiming to become Gujarat's leading textile waste-to-value enterprise. We also plan to explore biomass to biofuel, plastic repurposing, and bio-derivatives extraction."
                    },
                    {
                        q: "Didn't find your question?",
                        a: "contact"
                    }
                ]
            },
            
            services: {
                title: "Our Services",
                icon: "🔄",
                questions: [
                    {
                        q: "What is your textile recycling process?",
                        a: "Our proprietary 5-step process includes: 1) Collection & Sorting (multi-stream waste with quality control), 2) Shredding & Fiber Opening (size reduction and contamination removal), 3) Carding for Fiber Output (alignment and web formation), 4) Pulping/Molding for Packaging (paper-based products with FSSAI compliance), and 5) Baling/Packing & Dispatch (quality testing and logistics)."
                    },
                    {
                        q: "What types of textile waste do you collect?",
                        a: "We collect from four main sources: Garment Factories (pre-consumer waste from Ahmedabad's textile corridor), Rag Dealers (post-consumer textiles through established networks), Post-Consumer Partnerships (direct collection from retail and hospitality), and CSR Initiatives (corporate waste management contracts)."
                    },
                    {
                        q: "What equipment and technology do you use?",
                        a: "Our facility features German Trutzschler carding systems, Korean needle-punch lines, and Indian-manufactured support equipment. We have a team of 8 skilled operators, 1 quality controller, and 1 operations manager. We're pursuing ISO 9001 certification and have FSSAI certification for food-contact products."
                    },
                    {
                        q: "What certifications do you have?",
                        a: "We have FSSAI certification for food-contact products and ISO 9001 certification is pending. Our carbon credit processes comply with Verra VCS, Gold Standard, and Indian CCTS standards."
                    },
                    {
                        q: "Do you offer facility tours?",
                        a: "Yes, we offer site visits by appointment. You can schedule a facility tour to see our operations firsthand and understand our recycling process. Please contact us to arrange a visit."
                    },
                    {
                        q: "Didn't find your question?",
                        a: "contact"
                    }
                ]
            },
            
            products: {
                title: "Products & Pricing",
                icon: "📦",
                questions: [
                    {
                        q: "What products do you manufacture?",
                        a: "We produce three main categories: 1) Fiber & Nonwovens (recycled staple fiber and needle-punched nonwoven rolls), 2) Sustainable Packaging (cotton-paper luxury boxes and molded fiber trays), and 3) Carbon Credits (verified credits for avoided emissions)."
                    },
                    {
                        q: "What are your fiber product specifications?",
                        a: "Our Recycled Staple Fiber has 1.5-15 dtex denier range and 25-64mm length, priced at ₹60-90/kg (versus ₹120-150/kg virgin). Our Needle-Punched Nonwoven Rolls are 150-600 GSM, 2-8mm thickness, priced at ₹120-200/kg with 200-800 N/50mm tensile strength and 65-90% compression recovery."
                    },
                    {
                        q: "What packaging products do you offer?",
                        a: "We manufacture Cotton-Paper Luxury Boxes (₹40-150/piece for jewelry, cosmetics, electronics) and Molded Fiber Trays (₹8-25/piece for electronics packaging and food containers). Our packaging is FSSAI certified and biodegradable within 60-120 days."
                    },
                    {
                        q: "How do carbon credits work?",
                        a: "We generate verified carbon credits through waste diversion methodology. Current pricing is ₹300-800/tCO₂e (market dependent). We produce 6.25 tCO₂e monthly, scalable with capacity. Our credits comply with Verra VCS, Gold Standard, and Indian CCTS standards."
                    },
                    {
                        q: "Who are your target customers?",
                        a: "Our customers include mattress manufacturers and automotive stuffing companies (for fiber products), premium retail brands and e-commerce companies (for packaging), and corporations seeking carbon credits for sustainability goals."
                    },
                    {
                        q: "Didn't find your question?",
                        a: "contact"
                    }
                ]
            },
            
            sustainability: {
                title: "Sustainability",
                icon: "🌱",
                questions: [
                    {
                        q: "What is your environmental impact?",
                        a: "Per tonne processed, we achieve: 0.5 tCO₂e carbon saved, 85% waste diverted from landfills, 2,500 liters water saved (vs virgin production), 40% energy savings versus virgin fiber manufacturing, and 90% fewer chemicals than virgin processing."
                    },
                    {
                        q: "What are your 2030 sustainability goals?",
                        a: "Our 2030 targets include: Net-positive carbon impact through expanded credit generation (500 tCO₂e annually vs current 75 tCO₂e), processing 1,000 tonnes annually (vs current 150 tonnes), and investing 8% of revenue in R&D focused on chemical recycling technologies."
                    },
                    {
                        q: "How do you contribute to circular economy?",
                        a: "We build closed-loop systems where waste becomes input, creating economic value while eliminating environmental impact. We achieve 95% material recovery rates through mechanical recycling and innovative processing, ensuring every kilogram diverted from landfills creates value."
                    },
                    {
                        q: "What is your carbon footprint reduction?",
                        a: "Currently, we avoid 75 tCO₂e annually through our operations. Our monthly impact includes 6.25 tCO₂e avoided through waste diversion and virgin material displacement, contributing to India's net-zero goals and corporate sustainability targets."
                    },
                    {
                        q: "How do you ensure quality and sustainability?",
                        a: "We maintain strict quality control with dedicated personnel, pursue relevant certifications (ISO 9001, FSSAI), and follow verified carbon credit methodologies. Our processes are designed for maximum material recovery and minimum environmental impact."
                    },
                    {
                        q: "Didn't find your question?",
                        a: "contact"
                    }
                ]
            },
            
            partnerships: {
                title: "Partnerships",
                icon: "🤝",
                questions: [
                    {
                        q: "What partnership opportunities do you offer?",
                        a: "We offer B2B partnerships with manufacturers, CSR collaboration programs, distribution channel partnerships, and carbon credit marketplace partnerships. We currently have 8 active suppliers and 4 customers with 95% supplier retention and 100% on-time delivery."
                    },
                    {
                        q: "Can you share success stories?",
                        a: "Key successes include: Ahmedabad Garment Cluster (40 tonnes processed, ₹2.4 lakh cost savings over 18 months), Premium Mattress Manufacturer (30% raw material cost reduction over 12 months), and E-commerce Packaging Partner (100% plastic replacement, 25% cost reduction over 8 months)."
                    },
                    {
                        q: "What benefits do partners receive?",
                        a: "Partners enjoy zero disposal costs, sustainability certification support, cost reductions (up to 30% in raw materials), reliable supply chain, enhanced brand sustainability positioning, and improved customer preference through eco-friendly products."
                    },
                    {
                        q: "How do you support CSR initiatives?",
                        a: "We provide comprehensive CSR partnership programs including corporate waste management contracts, sustainability reporting support, custom solution development, and technical consultation. We help companies achieve their environmental goals measurably."
                    },
                    {
                        q: "What industries do you serve?",
                        a: "We serve textile manufacturing, mattress and home furnishing, e-commerce and retail, packaging companies, automotive (for stuffing), hospitality (for waste management), and any organization seeking carbon credits or sustainable materials."
                    },
                    {
                        q: "Didn't find your question?",
                        a: "contact"
                    }
                ]
            }
        };
    }

    // Initialize chatbot
    init() {
        this.bindEvents();
        this.loadChatbotCSS();
    }

    // Load chatbot CSS
    loadChatbotCSS() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = './css/chatbot.css';
        cssLink.id = 'chatbot-css';
        document.head.appendChild(cssLink);
    }

    // Bind event listeners
    bindEvents() {
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });

        // If DOM is already loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
            });
        } else {
            setTimeout(() => {
                this.setupEventListeners();
            }, 100);
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Toggle chatbot
        const toggle = document.getElementById('chatbot-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChatbot());
        }

        // Close chatbot
        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChatbot());
        }

        // Overlay click to close
        const overlay = document.getElementById('chatbot-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => this.closeChatbot());
        }

        // Category clicks
        const categories = document.querySelectorAll('.chatbot-category');
        categories.forEach(category => {
            category.addEventListener('click', (e) => {
                const categoryName = e.currentTarget.dataset.category;
                this.showQuestions(categoryName);
            });
        });

        // Back buttons
        const backToCategoriesBtn = document.getElementById('back-to-categories');
        if (backToCategoriesBtn) {
            backToCategoriesBtn.addEventListener('click', () => this.showCategories());
        }

        const backToQuestionsBtn = document.getElementById('back-to-questions');
        if (backToQuestionsBtn) {
            backToQuestionsBtn.addEventListener('click', () => this.showQuestions(this.currentCategory));
        }

        const backFromContactBtn = document.getElementById('back-from-contact');
        if (backFromContactBtn) {
            backFromContactBtn.addEventListener('click', () => this.showQuestions(this.currentCategory));
        }

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeChatbot();
            }
        });
    }

    // Toggle chatbot window
    toggleChatbot() {
        if (this.isOpen) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    // Open chatbot
    openChatbot() {
        const window = document.getElementById('chatbot-window');
        const overlay = document.getElementById('chatbot-overlay');
        
        if (window && overlay) {
            window.classList.add('open');
            overlay.classList.add('active');
            this.isOpen = true;
            this.showCategories();
        }
    }

    // Close chatbot
    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        const overlay = document.getElementById('chatbot-overlay');
        
        if (window && overlay) {
            window.classList.remove('open');
            overlay.classList.remove('active');
            this.isOpen = false;
        }
    }

    // Show categories view
    showCategories() {
        this.hideAllViews();
        const categoriesView = document.getElementById('categories-view');
        if (categoriesView) {
            categoriesView.style.display = 'block';
            this.currentView = 'categories';
        }
    }

    // Show questions for a category
    showQuestions(categoryName) {
        this.currentCategory = categoryName;
        this.hideAllViews();
        
        const questionsView = document.getElementById('questions-view');
        const categoryTitle = document.getElementById('category-title');
        const questionsContainer = document.getElementById('chatbot-questions');
        
        if (questionsView && categoryTitle && questionsContainer) {
            // Set category title
            const category = this.questions[categoryName];
            categoryTitle.innerHTML = `${category.icon} ${category.title}`;
            
            // Clear and populate questions
            questionsContainer.innerHTML = '';
            
            category.questions.forEach((item, index) => {
                const questionEl = document.createElement('div');
                questionEl.className = 'chatbot-question';
                
                if (item.a === 'contact') {
                    questionEl.className += ' contact-option';
                }
                
                questionEl.textContent = item.q;
                questionEl.addEventListener('click', () => {
                    if (item.a === 'contact') {
                        this.showContact();
                    } else {
                        this.showAnswer(item.q, item.a);
                    }
                });
                
                questionsContainer.appendChild(questionEl);
            });
            
            questionsView.style.display = 'block';
            this.currentView = 'questions';
        }
    }

    // Show answer for a question
    showAnswer(question, answer) {
        this.hideAllViews();
        
        const answerView = document.getElementById('answer-view');
        const answerContent = document.getElementById('answer-content');
        
        if (answerView && answerContent) {
            answerContent.innerHTML = `
                <h4>${question}</h4>
                <p>${this.formatAnswer(answer)}</p>
            `;
            
            answerView.style.display = 'block';
            this.currentView = 'answer';
        }
    }

    // Show contact information
    showContact() {
        this.hideAllViews();
        
        const contactView = document.getElementById('contact-view');
        if (contactView) {
            contactView.style.display = 'block';
            this.currentView = 'contact';
        }
    }

    // Hide all views
    hideAllViews() {
        const views = document.querySelectorAll('.chatbot-view');
        views.forEach(view => {
            view.style.display = 'none';
        });
    }

    // Format answer text (handle lists, etc.)
    formatAnswer(answer) {
        // Convert bullet points to HTML lists
        if (answer.includes('•')) {
            const parts = answer.split('•');
            if (parts.length > 1) {
                const intro = parts[0].trim();
                const items = parts.slice(1).map(item => `<li>${item.trim()}</li>`).join('');
                return `${intro}<ul>${items}</ul>`;
            }
        }
        
        // Convert numbered lists
        if (answer.match(/\d+\)/)) {
            const parts = answer.split(/\d+\)/);
            if (parts.length > 1) {
                const intro = parts[0].trim();
                const items = parts.slice(1).map(item => `<li>${item.trim()}</li>`).join('');
                return `${intro}<ol>${items}</ol>`;
            }
        }
        
        // Convert line breaks
        return answer.replace(/\n/g, '<br>');
    }

    // Get current view
    getCurrentView() {
        return this.currentView;
    }

    // Get current category
    getCurrentCategory() {
        return this.currentCategory;
    }
}

// Initialize chatbot when the script loads
let zeroWasteChatbot;

// Initialize chatbot based on DOM state
function initializeChatbot() {
    if (!zeroWasteChatbot) {
        zeroWasteChatbot = new ZeroWasteChatbot();
    }
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
} else {
    // Small delay to ensure templates are loaded
    setTimeout(initializeChatbot, 200);
}

// Make chatbot globally available
window.ZeroWasteChatbot = ZeroWasteChatbot;
window.zeroWasteChatbot = zeroWasteChatbot;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ZeroWasteChatbot };
}
