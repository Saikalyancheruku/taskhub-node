const { sendEmail } = require('../services/email.service');

const sendWelcomeEmail = async (toEmail, name, password) => {
  const subject = 'Welcome to Task Manager';
  const body = `
    <h2>Welcome, ${name}!</h2>
    <p>Your account has been created successfully.</p>
    <p><strong>Login Credentials:</strong></p>
    <ul>
      <li>Email: ${toEmail}</li>
      <li>Password: <strong>${password}</strong></li>
    </ul>
    <p>Please change your password after logging in.</p>
  `;

  return await sendEmail({ to: toEmail, subject, body });
};

module.exports = { sendWelcomeEmail };
