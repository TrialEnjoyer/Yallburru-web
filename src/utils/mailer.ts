// turn linter off for this file
/* eslint-disable */

import nodemailer from 'nodemailer';
import { env } from '../env.js';

const transporter = nodemailer.createTransport({
  host: env.CONTACT_SMTP_HOST,
  port: Number(env.CONTACT_SMTP_PORT),
  secure: Number(env.CONTACT_SMTP_PORT) === 465,
  auth: {
    user: env.CONTACT_SMTP_USER,
    pass: env.CONTACT_SMTP_PASS,
  },
}) as nodemailer.Transporter;

/**
 * Generates HTML email template with consistent branding
 */

function generateEmailHTML(content: string, name: string, subject: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Yallburru Community Services</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #374151;
              margin: 0;
              padding: 0;
              background-color: #f3f4f6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              word-wrap: break-word;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .header {
              background: linear-gradient(to right, #FFFFFF, #FFFFFF);
              color: white;
              padding: 20px;
              text-align: center;
            }
            .logo {
              max-width: 200px;
              height: auto;
            }
            .content {
              padding: 40px 30px;
              color: #374151;
              word-wrap: break-word;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .content p {
              margin: 0 0 16px 0;
              padding: 0;
              max-width: 100%;
              word-wrap: break-word;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .content p:last-child {
              margin-bottom: 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 0.875rem;
              color: #6b7280;
              border-top: 1px solid #e5e7eb;
              background-color: #f9fafb;
              word-wrap: break-word;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .footer p {
              margin: 8px 0;
            }
            .footer a {
              color: #0369a1;
              text-decoration: none;
              word-wrap: break-word;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .footer a:hover {
              text-decoration: underline;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #0284c7;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
            }
            * {
              max-width: 100%;
              -ms-word-break: break-all;
              word-break: break-all;
              word-break: break-word;
              -webkit-hyphens: auto;
              -moz-hyphens: auto;
              hyphens: auto;
            }
            @media only screen and (max-width: 600px) {
              .container {
                width: 100%;
                border-radius: 0;
              }
              .content {
                padding: 30px 20px;
              }
            }
            .divider {
              border-bottom: 1px solid #e5e7eb;
              margin: 20px 0;
            }
            .message-container {
              margin: 20px 0;
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              background-color: #f9fafb;
            }

            .greeting {
              font-size: 1.25rem;
              font-weight: 600;
              color: #0c4a6e;
              margin-bottom: 16px;
            }

            .subject {
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 12px;
            }

            .intro-text {
              margin-bottom: 20px;
              color: #4b5563;
            }

            .outro-text {
              margin-top: 20px;
              color: #4b5563;
              font-style: italic;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 20px;">
          <div class="container">
            <div class="header">
              <img src="https://yallburru.org.au/banner.webp" alt="Yallburru Community Services" class="logo">
            </div>
            <div class="content">
              <div class="greeting">
                Hi ${name},
              </div>
              <div class="intro-text">
                Thank you for reaching out to Yallburru Community Services. We have received your message and appreciate you taking the time to contact us.
              </div>
              <div class="intro-text">
                We have recieved the following message:
              </div>
              <div class="message-container">
                <div class="subject">
                  ${subject}
                </div>
                <div class="divider"></div>
                ${content}
              </div>
              <div class="outro-text">
                Our team will review your message and get back to you as soon as possible. If your matter is urgent, please don't hesitate to call us directly at (07) 5632 5727.
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Yallburru Community Services. All rights reserved.</p>
              <p>55 Highland way, Upper Coomera, QLD, 4209</p>
              <p><a href="tel:0756325727">(07) 5632 5727</a> | <a href="mailto:admin@yallburru.org.au">admin@yallburru.org.au</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
  }


function generateAdminEmailHTML(mailOptions: Mail): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #374151;
              margin: 0;
              padding: 0;
              background-color: #f3f4f6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              margin-bottom: 20px;
            }
            .detail-row {
              margin-bottom: 15px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 10px;
            }
            .label {
              font-weight: 600;
              color: #1f2937;
            }
            .value {
              margin-top: 5px;
              color: #374151;
            }
            .message-content {
              background-color: #f9fafb;
              padding: 15px;
              border-radius: 6px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 20px;">
          <div class="container">
            <div class="header">
              <h2 style="color: #0c4a6e; margin: 0;">New Contact Form Submission</h2>
              <p style="color: #6b7280; margin-top: 5px;">Received on ${new Date().toLocaleString()}</p>
            </div>
  
            <div class="detail-row">
              <div class="label">Full Name:</div>
              <div class="value">${mailOptions.fullName}</div>
            </div>
  
            <div class="detail-row">
              <div class="label">Preferred Contact:</div>
              <div class="value">${mailOptions.preferred_contact}</div>
            </div>
  
            <div class="detail-row">
              <div class="label">Email Address:</div>
              <div class="value">${mailOptions.to}</div>
            </div>
  
            <div class="detail-row">
              <div class="label">Phone Number:</div>
              <div class="value">${mailOptions.phone}</div>
            </div>
  
            <div class="detail-row">
              <div class="label">Subject:</div>
              <div class="value">${mailOptions.subject}</div>
            </div>
  
            <div class="detail-row">
              <div class="label">Message:</div>
              <div class="message-content">${mailOptions.text}</div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

/**
 * Sends an email using the configured SMTP transport
 * @param {Mail} mailOptions - The email options including to, subject, and text
 * @returns {Promise<void>}
 * @throws {Error} If email sending fails
 */
export async function sendEmail(mailOptions: Mail): Promise<void> {
  try {
    if (!mailOptions.to || !mailOptions.subject || !mailOptions.text) {
      throw new Error('Missing required email fields');
    }

    // Generate HTML content for user confirmation email
    const userHtmlContent = generateEmailHTML(mailOptions.text, mailOptions.name, mailOptions.subject);

    // Send confirmation email to user
    const userEmailData = {
      from: env.CONTACT_EMAIL,
      to: mailOptions.to, // send to user and contact email    
      subject: `Thank you for contacting Yallburru Community Services`,
      text: mailOptions.text,
      html: userHtmlContent,
    };

    // Generate HTML content for admin notification email
    const adminHtmlContent = generateAdminEmailHTML(mailOptions);

    // Send detailed notification to admin
    const adminEmailData = {
      from: env.CONTACT_EMAIL,
      to: env.CONTACT_EMAIL, // Send to the admin email address
      subject: `New Contact Submission: ${mailOptions.subject}`,
      text: mailOptions.text,
      html: adminHtmlContent,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userEmailData),
      transporter.sendMail(adminEmailData),
    ]);

  } catch (error: unknown) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Type definition (you can move this to a separate types.ts file)
export interface Mail {
  to: string;
  subject: string;
  text: string;
  html?: string;
  name: string;
  fullName: string;
  phone: string;
  preferred_contact: string;
}
