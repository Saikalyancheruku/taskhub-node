const nodemailer = require('nodemailer');
require('dotenv').config(); // To use SMTP credentials from .env

// SMTP Transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
// Function to send email
const sendEmail = async ({ to, subject, body }) => {
  console.log('Sending email to:', to);
  try {
    const info = await transporter.sendMail({
      from: `"Task Manager" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: body // or `text: body` for plain text emails
    });

    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendEmail
};
