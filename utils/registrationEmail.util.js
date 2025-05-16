const { sendEmail } = require('../services/email.service');

const sendRegistrationSuccessEmail = async (toEmail, name) => {
  const subject = '✅ TaskHub Registration Successful';

  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h1 style="color: #4A90E2; margin: 0;">Welcome to TaskHub!</h1>
        <p style="font-size: 16px; color: #555;">Your registration was successful 🎉</p>
      </div>

      <p style="font-size: 15px; color: #333;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 15px; color: #333;">
        We’re excited to have you on board! Your account on <strong>TaskHub</strong> has been successfully created.
        You can now log in and start managing your tasks efficiently.
      </p>

      <div style="margin: 30px 0; text-align: center;">
        <a href="https://taskhubkc.netlify.app/" 
           style="display: inline-block; padding: 12px 25px; background-color: #4A90E2; color: #ffffff; font-size: 16px; text-decoration: none; border-radius: 6px;">
          Go to Login
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">
        If you have any questions or feedback, feel free to reach out to our support team.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 13px; color: #999; text-align: center;">
        © ${new Date().getFullYear()} TaskHub Inc. All rights reserved.
      </p>
    </div>
  `;

  return await sendEmail({ to: toEmail, subject, body });
};

module.exports = { sendRegistrationSuccessEmail };
