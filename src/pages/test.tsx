import React from "react";
import { type Mail } from "../utils/mailer";

// Test data
const testMailOptions: Mail = {
  to: "test@example.com",
  subject: "Test Contact Form Submission",
  text: "This is a test message that could be quite long without any spaces likethisreallylongwordthatgoeson and on and on but should still be contained properly within the borders of our email template.",
  name: "John",
  fullName: "John Smith",
  phone: "(07) 1234 5678",
  preferred_contact: "Email",
};

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

export default function Test() {
  const html = generateAdminEmailHTML(testMailOptions);
  return (
    <div style={{ padding: "20px" }}>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}
