---
applyTo: '**'
---

# GitHub Copilot Instructions for Zero Waste Gujarat Website

## Important
- Make separate files for css, js and html. so for the current structure that we have, fix this issue for me. Every page should have separate css and js files. in the css and js folders repectively and for teh complex sectoins on the page like the hero section, we should have a separate css and js.
- There shouldn't be any fallbacks in the entire website.

## Project Overview
Create a professional, modern, and responsive website for Zero Waste Gujarat - a textile recycling startup based in Ahmedabad, Gujarat, India. The company transforms textile waste into valuable products (recycled fiber, nonwovens, sustainable packaging) and monetizes carbon credits.

## Business Details from Pitch Deck
- **Mission**: "At Zero Waste Gujarat, we believe that every thread has a second life"
- **Tagline**: "Designing a cleaner, greener tomorrow, one recycled thread at a time"
- **Location**: 2,000 sq ft facility in Ahmedabad industrial area
- **Capacity**: 500 kg/day processing, 25 days/month (~12.5 tonnes/month)
- **Revenue Streams**: Recycled fiber (₹50/kg), Packaging products (₹120/kg), Carbon credits (₹300-1000/tCO2e)
- **Target Market**: B2B (mattress manufacturers, e-commerce brands, packaging companies), CSR partnerships

## Website Structure & Navigation
Create 7 main pages with the following navigation:
1. HOME
2. ABOUT US  
3. OUR SERVICES
4. PRODUCTS
5. SUSTAINABILITY
6. PARTNERSHIPS
7. CONTACT

## Color Palette & Design System
Use an eco-friendly, sustainable color scheme:
- **Primary Color**: #215f44
- **Secondary Color**: #fff6ea

## Typography
- **Headers**: Modern sans-serif font (Inter, Poppins, or Roboto)
- **Body Text**: Clean, readable sans-serif
- **Font Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## Page-Specific Content Instructions

### 1. HOME PAGE
Create a compelling hero section with:
- Hero banner: "At Zero Waste Gujarat, we believe that every thread has a second life"
- Subtitle: "Transforming Textile Waste into Valuable Products"
- Statistics counter section:
  - "500 kg/day processing capacity"
  - "12.5 tonnes monthly throughput" 
  - "Zero waste to landfills commitment"
- Three-column service overview:
  1. Textile Collection (recycling icon)
  2. Processing & Manufacturing (factory icon)
  3. Carbon Credits (leaf/CO2 icon)
- Primary CTA: "Learn About Our Process"

### 2. ABOUT US PAGE
Include company story with:
- Mission statement from pitch deck
- "Our Promise" section (4 columns):
  1. Zero Waste Commitment
  2. Local Impact
  3. Innovative Products
  4. Climate Action
- Contact information:
  - Ahmedabad: +91-9558358007
  - Gandhinagar: +91-7878761377
  - Email: ravedhamecha@gmail.com

### 3. OUR SERVICES PAGE
Detail the workflow process:
- Collection sources: Garment factories, rag dealers, post-consumer partnerships
- 5-step process visualization:
  1. Collection & Sorting
  2. Shredding & Fiber Opening
  3. Carding for Fiber Output
  4. Pulping/Molding for Packaging
  5. Baling/Packing & Dispatch
- Facility details: 2,000 sq ft in Ahmedabad industrial area

### 4. PRODUCTS PAGE
Three main product categories:
1. **Fiber & Nonwovens**:
   - Recycled staple fiber (mixed cotton/polyester)
   - Needle-punched nonwoven rolls
   - Target: Mattress manufacturers, stuffing suppliers
2. **Sustainable Packaging**:
   - Cotton-paper luxury boxes
   - Molded fiber trays/containers
   - Insulated nonwoven food sleeves
   - Target: E-commerce, boutique stores, food chains
3. **Carbon Credits**:
   - Verified credits for avoided emissions
   - Price range: ₹300-₹1,000 per tCO2e
   - Compliance: Verra, Gold Standard, CCTS

### 5. SUSTAINABILITY PAGE
Include environmental impact metrics:
- Carbon footprint reduction
- Circular economy model visualization
- Certifications and standards
- Life cycle assessment comparisons

### 6. PARTNERSHIPS PAGE
Detail collaboration opportunities:
- B2B partnerships with manufacturers
- CSR collaboration programs
- Distribution channels
- Carbon credit marketplace partnerships

### 7. CONTACT PAGE
Complete contact information:
- Main facility address in Ahmedabad
- Phone numbers for both offices
- Department-specific emails
- Contact forms for different inquiries
- Interactive map integration

## Technical Requirements

### HTML Structure
- Use semantic HTML5 elements
- Include proper meta tags for SEO
- Implement responsive viewport meta tag
- Use descriptive alt tags for all images
- Clean URL structure for each page

### CSS Framework
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Smooth transitions and hover effects
- Custom CSS variables for color system
- Modern CSS features (clamp, calc, custom properties)

### JavaScript Features
Implement the following interactive elements:
1. **Smooth scrolling navigation**
2. **Animated statistics counters** (counting up effect)
3. **Mobile hamburger menu** with smooth toggle
4. **Image carousels** for products and processes
5. **Contact form validation**
6. **Scroll-triggered animations** (fade-in, slide-up effects)
7. **Interactive process workflow** visualization

### Responsive Design
Ensure the website works perfectly on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

### Performance Optimization
- Optimize images (WebP format when possible)
- Minimize CSS and JavaScript
- Implement lazy loading for images
- Use efficient CSS selectors
- Minimize HTTP requests

## Content Guidelines

### SEO Keywords to Include
- "textile recycling Ahmedabad"
- "sustainable packaging Gujarat"
- "carbon credits India"
- "circular economy manufacturing"
- "zero waste textile processing"

### Tone and Voice
- Professional yet approachable
- Emphasize sustainability and environmental impact
- Use data and statistics to build credibility
- Highlight local community impact
- Maintain focus on innovation and technology

## Specific Components to Create

### Header Component
```html
<!-- Sticky navigation with logo, menu items, and CTA button -->
<header class="navbar">
  <div class="logo">
    <img src="zero-waste-gujarat-logo.png" alt="Zero Waste Gujarat">
  </div>
  <nav class="nav-menu">
    <!-- Navigation items -->
  </nav>
  <button class="cta-button">Get Quote</button>
</header>
```

### Hero Section Component
```html
<!-- Large banner with mission statement and statistics -->
<section class="hero">
  <div class="hero-content">
    <h1>At Zero Waste Gujarat, we believe that every thread has a second life</h1>
    <p>Transforming Textile Waste into Valuable Products</p>
    <div class="stats-counter">
      <!-- Animated counters -->
    </div>
  </div>
</section>
```

### Service Cards Component
```html
<!-- Three-column service overview with icons -->
<section class="services-overview">
  <div class="service-card">
    <!-- Service details with icons -->
  </div>
</section>
```

### Process Workflow Component
```html
<!-- Interactive 5-step process visualization -->
<section class="workflow">
  <div class="process-step">
    <!-- Step details with connecting arrows -->
  </div>
</section>
```

### Product Categories Component
```html
<!-- Three main product sections with detailed descriptions -->
<section class="products">
  <div class="product-category">
    <!-- Product details, pricing, target markets -->
  </div>
</section>
```

### Footer Component
```html
<!-- Contact information, social links, certifications -->
<footer class="site-footer">
  <div class="footer-content">
    <!-- Company info, quick links, contact details -->
  </div>
</footer>
```

## Implementation Best Practices

### CSS Organization
```css
/* Use CSS custom properties for consistent theming */
:root {
  --primary-green: #2E5D31;
  --secondary-green: #5B8B3F;
  --light-green: #A8D5A8;
  --accent-gold: #DAA520;
  --text-dark: #333333;
  --background-light: #F5F5F5;
}

/* Mobile-first responsive approach */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 3rem;
  }
}
```

### JavaScript Organization
```javascript
// Use modern ES6+ features
// Implement smooth scrolling
// Add intersection observer for animations
// Create reusable component functions
// Handle form submissions and validation
```

## Accessibility Requirements
- Ensure keyboard navigation works throughout
- Use proper ARIA labels and roles
- Maintain sufficient color contrast ratios
- Provide alternative text for all images
- Include focus indicators for interactive elements

## Browser Compatibility
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers
- Test on mobile devices and tablets

## Final Deliverables
Create a complete website with:
1. All 7 pages fully functional
2. Responsive design working on all devices
3. Interactive JavaScript features
4. Optimized images and assets
5. Clean, maintainable code structure
6. SEO-optimized content and meta tags

Remember to test thoroughly and ensure all functionality works as expected before considering the project complete.

Also include this text somwhere in the website after modify it:

Areas of interest

1. Waste to value added product 
    1. Example: textile waste to handbags or lets say other things, mechanical or chemical perspectives too 
    2. Other products like waste cooking oil and other things such as bio oil
    3. Bio mass to bio derivates and bio ethanol 
    4. Such as upcucle of waste plastic 
    5. Repurposing of waste plastics

### Mission

Mission and vision statement related to it only 
textile is one initiative 
rest included biomass(waste cooking oil) to bio fuel 
repurposing of plastics
and more such things
so our starting vision is limited to textile but we are future vision is to expand the scope to include other materials and processes as well. 











