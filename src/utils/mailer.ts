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
        </head>
        <body style="margin: 0; padding: 0;">
          <table style="background-color: #f5f5f5;" border="0" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td style="padding: 20px 0;" align="center">
                  <table style="background-color: #ffffff; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;" border="0" width="814" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <td style="padding: 40px 0; text-align: center;" bgcolor="#0f172a">
                                  <img style="max-width: 80%; height: auto;" src="https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TKtsA5RdFyBcwRaT7Cn3ObivUMWk4uGgXp15s" alt="Yallburru Banner" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 40px;">
                          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
                          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                            Thank you for reaching out to Yallburru Community Services. We have received your message and appreciate you taking the time to contact us.
                          </p>
                          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                            We have received the following message:
                          </p>
                          <div style="margin: 20px 0; padding: 20px; background-color: #f8fafc; border-radius: 6px;">
                            <p style="margin: 0 0 10px 0; color: #333333; font-weight: 600;">${subject}</p>
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 10px 0;" />
                            <p style="margin: 0; color: #333333;">${content}</p>
                          </div>
                          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6; font-style: italic;">
                            Our team will review your message and get back to you as soon as possible. If your matter is urgent, please don't hesitate to call us directly at 1300 071 157.
                          </p>
                          <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">Best regards,</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                          <table border="0" width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                              <tr>
                                <td style="vertical-align: top;">
                                  <p style="margin: 0; font-size: 14px; color: #64748b;">Yallburru Community Services</p>
                                  <table style="margin-top: 20px;" border="0" cellspacing="0" cellpadding="0">
                                    <tbody>
                                      <tr>
                                        <td style="padding-right: 12px;">
                                          <a style="display: inline-block;" href="https://www.facebook.com/YallburruCommunityServices">
                                            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" width="34" height="34" />
                                          </a>
                                        </td>
                                        <td>
                                          <a style="display: inline-block;" href="https://www.yallburru.org.au">
                                            <img src="https://img.icons8.com/ios/50/internet--v1.png" alt="Website" width="34" height="34" />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td style="text-align: right; vertical-align: top;">
                                  <img style="width: 120px; height: auto;" src="https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TL8DuCZie6dNc7b4VYnFJ3o9QDAvHIygWtwqZ" alt="Yallburru Community Services Logo" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px; text-align: center; font-size: 12px; color: #666666; background-color: #f8fafc;">
                          &copy; ${new Date().getFullYear()} Yallburru Community Services. All rights reserved.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
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
