import nodemailer from 'nodemailer';

// Create email transporter
export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'live.smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // false for 587, true for 465
    auth: {
      user: process.env.SMTP_USER || 'smtp@mailtrap.io',
      pass: process.env.SMTP_PASS || 'd465dfed8d9f73bbdf830420445c2c7f',
    },
  });
};

// Send contact form email
export const sendContactEmail = async (formData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'admin@cheaphualing.net',
    to: process.env.ADMIN_EMAIL || 'admin@cheaphualing.net',
    subject: 'New Contact Form Submission - Cheap Hauling',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
          
          <p><strong>Full Name:</strong> ${formData.fullName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          
          <h4 style="color: #374151; margin-top: 20px;">Message:</h4>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f97316;">
            ${formData.message}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>This email was sent from the Cheap Hauling contact form.</p>
          <p>Submission time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

// Send quote request email
export const sendQuoteEmail = async (formData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@aaanav.com',
    to: process.env.ADMIN_EMAIL || 'dev.aleahmad@gmail.com',
    subject: 'New Quote Request - Cheap Hauling',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          New Quote Request
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Customer Information</h3>
          
          <p><strong>Full Name:</strong> ${formData.fullName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          
          <h4 style="color: #374151; margin-top: 20px;">Move Details:</h4>
          <p><strong>Move From Date:</strong> ${formData.moveFrom ? new Date(formData.moveFrom).toLocaleDateString() : 'Not specified'}</p>
          <p><strong>Move To Date:</strong> ${formData.moveTo ? new Date(formData.moveTo).toLocaleDateString() : 'Not specified'}</p>
          
          ${formData.message ? `
            <h4 style="color: #374151; margin-top: 20px;">Additional Message:</h4>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f97316;">
              ${formData.message}
            </div>
          ` : ''}
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p>This email was sent from the Cheap Hauling quote request form.</p>
          <p>Submission time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
