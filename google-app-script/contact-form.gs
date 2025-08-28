/**
 * Zero Waste Gujarat Contact Form Handler
 * Google Apps Script for processing contact form submissions
 * 
 * This script:
 * 1. Receives form data via POST request
 * 2. Adds the data to a Google Sheet
 * 3. Sends confirmation email to user
 * 4. Sends notification email to admin
 */

// Configuration
const CONFIG = {
  SHEET_ID: '1FakkVktLgppJTSMpqHtCFNxOggsJal1XYyfXfXw9o6w',
  ADMIN_EMAIL: 'zerowastegujarat@gmail.com',
  ADMIN_NAME: 'Zero Waste Gujarat Team',
  COMPANY_NAME: 'Zero Waste Gujarat',
  PHONE_NUMBER: '+91-7878761377',
  ADDRESS: 'Plot No. XXX, Industrial Area Phase-II, Ahmedabad - 382XXX, Gujarat, India'
};

/**
 * Main function to handle form submissions
 * This function is triggered when the web app receives a POST request
 */
function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received POST request:', e);
    
    // Check if request has valid data
    if (!e || !e.parameter) {
      throw new Error('Invalid request: Missing form data');
    }
    
    // Extract form data
    const formData = {
      fullName: e.parameter.fullName || '',
      email: e.parameter.email || '',
      phone: e.parameter.phone || '',
      company: e.parameter.company || '',
      subject: e.parameter.subject || '',
      message: e.parameter.message || '',
      newsletter: e.parameter.newsletter === 'on' ? 'Yes' : 'No',
      timestamp: new Date(),
      source: 'Website Contact Form'
    };
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      throw new Error('Missing required fields');
    }
    
    // Validate email format
    if (!isValidEmail(formData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Process the form submission
    const result = processFormSubmission(formData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Sorry, there was an error processing your message. Please try again or contact us directly.',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Process the form submission
 */
function processFormSubmission(formData) {
  try {
    // Add to Google Sheet
    const sheetResult = addToSheet(formData);
    console.log('Data added to sheet:', sheetResult);
    
    // Send emails
    const emailResults = {
      userEmail: sendUserConfirmationEmail(formData),
      adminEmail: sendAdminNotificationEmail(formData)
    };
    
    console.log('Emails sent:', emailResults);
    
    return {
      sheetResult: sheetResult,
      emailResults: emailResults
    };
    
  } catch (error) {
    console.error('Error in processFormSubmission:', error);
    throw error;
  }
}

/**
 * Add form data to Google Sheet
 */
function addToSheet(formData) {
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.SHEET_ID).getActiveSheet();
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'Company',
        'Subject',
        'Message',
        'Newsletter Subscription',
        'Source',
        'Status'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#215f44');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }
    
    // Add form data to next row
    const rowData = [
      formData.timestamp,
      formData.fullName,
      formData.email,
      formData.phone,
      formData.company,
      formData.subject,
      formData.message,
      formData.newsletter,
      formData.source,
      'New'
    ];
    
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Format the new row
    const newRowRange = sheet.getRange(nextRow, 1, 1, rowData.length);
    newRowRange.setBorder(true, true, true, true, true, true);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    return {
      success: true,
      row: nextRow,
      message: 'Data successfully added to sheet'
    };
    
  } catch (error) {
    console.error('Error adding to sheet:', error);
    throw new Error('Failed to save data to sheet: ' + error.toString());
  }
}

/**
 * Send confirmation email to user
 */
function sendUserConfirmationEmail(formData) {
  try {
    const subject = `Thank you for contacting ${CONFIG.COMPANY_NAME}`;
    
    const htmlBody = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #215f44 0%, #2d6f4f 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
            Thank You for Contacting Us!
          </h1>
          <p style="color: #fff6ea; margin: 10px 0 0 0; font-size: 16px;">
            We've received your message and will respond within 24 hours
          </p>
        </div>
        
        <!-- Content -->
        <div style="background: #ffffff; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Hello ${formData.fullName},
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            Thank you for reaching out to ${CONFIG.COMPANY_NAME}. We have received your inquiry regarding "<strong>${formData.subject}</strong>" and our team will review your message carefully.
          </p>
          
          <!-- Summary Box -->
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #215f44; margin: 25px 0;">
            <h3 style="color: #215f44; margin: 0 0 15px 0; font-size: 18px;">Your Message Summary:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666666; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.email}</td>
              </tr>
              ${formData.phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666666;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.phone}</td>
              </tr>
              ` : ''}
              ${formData.company ? `
              <tr>
                <td style="padding: 8px 0; color: #666666;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #666666;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.subject}</td>
              </tr>
            </table>
          </div>
          
          <h3 style="color: #215f44; font-size: 18px; margin: 30px 0 15px 0;">What happens next?</h3>
          <ul style="color: #333333; line-height: 1.8; padding-left: 20px;">
            <li>Our team will review your inquiry within 2-4 hours</li>
            <li>We'll prepare a detailed response based on your specific needs</li>
            <li>You'll receive a personalized response within 24 hours</li>
            <li>If urgent, we may call you directly using the provided contact information</li>
          </ul>
          
          <!-- Contact Info -->
          <div style="background: #215f44; padding: 25px; border-radius: 8px; margin: 30px 0; color: #ffffff;">
            <h3 style="margin: 0 0 15px 0; color: #fff6ea;">Need Immediate Assistance?</h3>
            <p style="margin: 0 0 10px 0; font-size: 16px;">
              📞 Phone: <a href="tel:${CONFIG.PHONE_NUMBER}" style="color: #fff6ea; text-decoration: none;">${CONFIG.PHONE_NUMBER}</a>
            </p>
            <p style="margin: 0 0 10px 0; font-size: 16px;">
              ✉️ Email: <a href="mailto:${CONFIG.ADMIN_EMAIL}" style="color: #fff6ea; text-decoration: none;">${CONFIG.ADMIN_EMAIL}</a>
            </p>
            <p style="margin: 0; font-size: 14px; color: #fff6ea;">
              📍 ${CONFIG.ADDRESS}
            </p>
          </div>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            At Zero Waste Gujarat, we believe that every thread has a second life. Thank you for joining us in our mission to create a sustainable future through innovative textile recycling solutions.
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>The Zero Waste Gujarat Team</strong><br>
            <em style="color: #666666;">Designing a cleaner, greener tomorrow, one recycled thread at a time</em>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #666666; font-size: 12px;">
          <p style="margin: 0;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;
    
    const textBody = `
Hello ${formData.fullName},

Thank you for contacting ${CONFIG.COMPANY_NAME}. We have received your inquiry regarding "${formData.subject}" and will respond within 24 hours.

Your Message Summary:
- Name: ${formData.fullName}
- Email: ${formData.email}
${formData.phone ? `- Phone: ${formData.phone}\n` : ''}${formData.company ? `- Company: ${formData.company}\n` : ''}- Subject: ${formData.subject}

What happens next?
- Our team will review your inquiry within 2-4 hours
- We'll prepare a detailed response based on your specific needs
- You'll receive a personalized response within 24 hours
- If urgent, we may call you directly using the provided contact information

Need immediate assistance?
Phone: ${CONFIG.PHONE_NUMBER}
Email: ${CONFIG.ADMIN_EMAIL}

Best regards,
The Zero Waste Gujarat Team
"Designing a cleaner, greener tomorrow, one recycled thread at a time"

---
This is an automated confirmation email. Please do not reply to this email.
    `;
    
    MailApp.sendEmail({
      to: formData.email,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      name: CONFIG.COMPANY_NAME
    });
    
    return { success: true, message: 'User confirmation email sent' };
    
  } catch (error) {
    console.error('Error sending user email:', error);
    throw new Error('Failed to send confirmation email: ' + error.toString());
  }
}

/**
 * Send notification email to admin
 */
function sendAdminNotificationEmail(formData) {
  try {
    const subject = `🔔 New Contact Form Submission - ${formData.subject}`;
    
    const htmlBody = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #215f44 0%, #2d6f4f 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
            🔔 New Contact Form Submission
          </h1>
          <p style="color: #fff6ea; margin: 10px 0 0 0; font-size: 14px;">
            Received: ${formData.timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
        
        <!-- Content -->
        <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          
          <!-- Contact Details -->
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #215f44; margin-bottom: 25px;">
            <h3 style="color: #215f44; margin: 0 0 15px 0; font-size: 18px;">Contact Information:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666666; width: 120px; vertical-align: top;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; vertical-align: top;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #333333;">
                  <a href="mailto:${formData.email}" style="color: #215f44; text-decoration: none;">${formData.email}</a>
                </td>
              </tr>
              ${formData.phone ? `
              <tr>
                <td style="padding: 8px 0; color: #666666; vertical-align: top;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #333333;">
                  <a href="tel:${formData.phone}" style="color: #215f44; text-decoration: none;">${formData.phone}</a>
                </td>
              </tr>
              ` : ''}
              ${formData.company ? `
              <tr>
                <td style="padding: 8px 0; color: #666666; vertical-align: top;"><strong>Company:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; color: #666666; vertical-align: top;"><strong>Subject:</strong></td>
                <td style="padding: 8px 0; color: #333333;"><strong>${formData.subject}</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666666; vertical-align: top;"><strong>Newsletter:</strong></td>
                <td style="padding: 8px 0; color: #333333;">${formData.newsletter}</td>
              </tr>
            </table>
          </div>
          
          <!-- Message -->
          <div style="margin-bottom: 25px;">
            <h3 style="color: #215f44; margin: 0 0 15px 0; font-size: 18px;">Message:</h3>
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px; white-space: pre-wrap; line-height: 1.6; color: #333333;">${formData.message}</div>
          </div>
          
          <!-- Action Buttons -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${formData.email}?subject=Re: ${formData.subject}" 
               style="display: inline-block; background: #215f44; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px 10px 0; font-weight: 600;">
              📧 Reply via Email
            </a>
            ${formData.phone ? `
            <a href="tel:${formData.phone}" 
               style="display: inline-block; background: #28a745; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px 10px 0; font-weight: 600;">
              📞 Call Now
            </a>
            ` : ''}
            <a href="https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}" target="_blank"
               style="display: inline-block; background: #6f42c1; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; margin: 0 10px 10px 0; font-weight: 600;">
              📊 View Sheet
            </a>
          </div>
          
          <!-- Priority Indicator -->
          ${getPriorityIndicator(formData.subject)}
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px; text-align: center; border-top: 1px solid #e1e5e9; padding-top: 20px;">
            This notification was automatically generated from the Zero Waste Gujarat website contact form.
          </p>
        </div>
      </div>
    `;
    
    const textBody = `
🔔 NEW CONTACT FORM SUBMISSION

Contact Information:
- Name: ${formData.fullName}
- Email: ${formData.email}
${formData.phone ? `- Phone: ${formData.phone}\n` : ''}${formData.company ? `- Company: ${formData.company}\n` : ''}- Subject: ${formData.subject}
- Newsletter Subscription: ${formData.newsletter}
- Submitted: ${formData.timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

Message:
${formData.message}

---
Quick Actions:
- Reply: mailto:${formData.email}?subject=Re: ${formData.subject}
${formData.phone ? `- Call: ${formData.phone}\n` : ''}- View Sheet: https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}

This notification was automatically generated from the Zero Waste Gujarat website contact form.
    `;
    
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      body: textBody,
      name: 'Zero Waste Gujarat Website'
    });
    
    return { success: true, message: 'Admin notification email sent' };
    
  } catch (error) {
    console.error('Error sending admin email:', error);
    throw new Error('Failed to send admin notification: ' + error.toString());
  }
}

/**
 * Get priority indicator based on subject
 */
function getPriorityIndicator(subject) {
  const highPrioritySubjects = ['Partnership Opportunities', 'Carbon Credits', 'Technical Consultation'];
  const mediumPrioritySubjects = ['Product Inquiries', 'Service Requests', 'Custom Solution Development'];
  
  if (highPrioritySubjects.includes(subject)) {
    return `
      <div style="background: #dc3545; color: #ffffff; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
        <strong>🔴 HIGH PRIORITY</strong> - This inquiry requires immediate attention (within 4 hours)
      </div>
    `;
  } else if (mediumPrioritySubjects.includes(subject)) {
    return `
      <div style="background: #fd7e14; color: #ffffff; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
        <strong>🟡 MEDIUM PRIORITY</strong> - This inquiry should be handled within 12 hours
      </div>
    `;
  } else {
    return `
      <div style="background: #28a745; color: #ffffff; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
        <strong>🟢 STANDARD PRIORITY</strong> - This inquiry can be handled within 24 hours
      </div>
    `;
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Test function to verify the setup
 * You can run this function from the Google Apps Script editor to test
 */
function testFormSubmission() {
  const testData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+91-9876543210',
    company: 'Test Company',
    subject: 'Product Inquiries',
    message: 'This is a test message to verify the contact form functionality.',
    newsletter: 'Yes',
    timestamp: new Date(),
    source: 'Test Submission'
  };
  
  try {
    const result = processFormSubmission(testData);
    console.log('Test submission successful:', result);
    return result;
  } catch (error) {
    console.error('Test submission failed:', error);
    throw error;
  }
}

/**
 * Function to handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Zero Waste Gujarat Contact Form Handler is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
