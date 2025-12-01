const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { firstName, lastName, email, phone, businessType, message } = JSON.parse(event.body);

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email to you (Dheeraj)
    const ownerEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
          .label { font-weight: bold; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Contact from Chatbot</h1>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">Name:</span> ${firstName} ${lastName}
            </div>
            <div class="info-row">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="info-row">
              <span class="label">Phone:</span> ${phone}
            </div>
            <div class="info-row">
              <span class="label">Business Type:</span> ${businessType}
            </div>
            <div class="info-row">
              <span class="label">Message:</span><br>${message}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Confirmation email to user
    const userEmailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Request Successfully Submitted</h1>
          </div>
          <div class="content">
            <div class="success">
              <strong>Thank you, ${firstName}!</strong><br>
              Your request has been successfully submitted.
            </div>
            <p>Hi ${firstName},</p>
            <p>Thank you for reaching out! I've received your message and will get back to you within 24 hours.</p>
            <p><strong>Your submitted information:</strong></p>
            <ul>
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Business Type:</strong> ${businessType}</li>
            </ul>
            <p>Looking forward to connecting with you!</p>
            <p>Best regards,<br><strong>Dheeraj Kumar</strong><br>Business Intelligence & Data Analytics Professional</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to owner
    await transporter.sendMail({
      from: `"Chatbot Contact" <${process.env.SMTP_USER}>`,
      to: 'engineerdheeraj97@gmail.com',
      subject: `New Chatbot Contact from ${firstName} ${lastName}`,
      html: ownerEmailHTML
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Dheeraj Kumar" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✅ Request Successfully Submitted',
      html: userEmailHTML
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Emails sent successfully' })
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};