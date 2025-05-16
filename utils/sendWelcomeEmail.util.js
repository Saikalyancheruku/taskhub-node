const { sendEmail } = require('../services/email.service');

const sendWelcomeEmail = async (toEmail, name, password) => {
  const subject = '🎉 Welcome to TaskHub - Your Account Details Inside';

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #f9f9f9;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #4A90E2;">Welcome to TaskHub</h1>
        <p style="font-size: 16px; color: #555;">Empowering your productivity, one task at a time</p>
      </div>
      
      <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 15px; color: #333;">We’re excited to have you onboard! Your TaskHub account has been created successfully. Below are your login credentials:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; background-color: #f0f0f0;"><strong>Email:</strong></td>
          <td style="padding: 8px; background-color: #f0f0f0;">${toEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Password:</strong></td>
          <td style="padding: 8px;"><strong>${password}</strong></td>
        </tr>
      </table>

      <p style="font-size: 15px; color: #333;">Please make sure to change your password after your first login for security purposes.</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://taskhubkc.netlify.app/" style="display: inline-block; padding: 10px 20px; background-color: #4A90E2; color: #fff; text-decoration: none; border-radius: 5px;">Login to TaskHub</a>
      </div>

      <p style="margin-top: 40px; font-size: 14px; color: #888;">If you did not sign up for TaskHub, please disregard this email.</p>
      <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 13px; color: #aaa; text-align: center;">© ${new Date().getFullYear()} TaskHub Inc. All rights reserved.</p>
    </div>
  `;

  return await sendEmail({ to: toEmail, subject, body });
};

module.exports = { sendWelcomeEmail };
