
const { sendEmail } = require('../services/email.service');

const commonStyles = `
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
`;

const footer = `
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
  <p style="font-size: 13px; color: #999; text-align: center;">
    © ${new Date().getFullYear()} TaskHub Inc. All rights reserved.
  </p>
`;

// Function to send email when task is created
const sendTaskCreationEmail = async (assignedUser, task, creator) => {
  const subject = `📝 New Task Assigned: ${task.title}`;

  const html = `
    <div style="${commonStyles}">
      <h2 style="color: #4A90E2;">Hello ${assignedUser.name},</h2>
      <p style="font-size: 15px; color: #333;">You have been assigned a new task in <strong>TaskHub</strong>.</p>
      <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
        <tr><td><strong>Title:</strong></td><td>${task.title}</td></tr>
        <tr><td><strong>Description:</strong></td><td>${task.description}</td></tr>
        <tr><td><strong>Due Date:</strong></td><td>${task.due_date}</td></tr>
      </table>
      <p style="font-size: 14px; color: #555;">Please log in to TaskHub to view and manage this task.</p>
      ${footer}
    </div>
  `;

  await sendEmail({
    to: assignedUser.email,
    subject,
    body: html
  });

  // Email to task creator
  const creatorSubject = `✅ Task Created: ${task.title}`;
  const creatorHtml = `
    <div style="${commonStyles}">
      <h2 style="color: #4A90E2;">Hi ${creator.username},</h2>
      <p style="font-size: 15px; color: #333;">
        Your task "<strong>${task.title}</strong>" has been created and assigned to <strong>${assignedUser.name}</strong>.
      </p>
      ${footer}
    </div>
  `;

  await sendEmail({
    to: creator.email,
    subject: creatorSubject,
    body: creatorHtml
  });
};

// Function to send email when task status is updated
const sendTaskStatusUpdateEmail = async (assignedUser, task, oldStatus) => {
  const subject = `🔄 Task Status Updated: ${task.title}`;

  const html = `
    <div style="${commonStyles}">
      <h2 style="color: #4A90E2;">Hi ${assignedUser.username},</h2>
      <p style="font-size: 15px; color: #333;">
        The status of your task "<strong>${task.title}</strong>" has been updated:
      </p>
      <ul style="font-size: 14px; color: #444;">
        <li><strong>Previous Status:</strong> ${oldStatus}</li>
        <li><strong>Current Status:</strong> ${task.status}</li>
      </ul>
      <p style="font-size: 14px;">Please log in to TaskHub to view more details.</p>
      ${footer}
    </div>
  `;

  await sendEmail({
    to: assignedUser.email,
    subject,
    body: html
  });
};

// Function to send email when a comment is added on a task
const sendCommentEmail = async (task, commenter, assignedUser, creator, commentText) => {
  const subject = `💬 New Comment on Task: ${task.title}`;

  const html = `
    <div style="${commonStyles}">
      <h2 style="color: #4A90E2;">Hi ${assignedUser.username},</h2>
      <p style="font-size: 15px; color: #333;">
        <strong>${commenter.username}</strong> added a comment on the task "<strong>${task.title}</strong>".
      </p>
      <blockquote style="margin: 20px 0; padding: 10px; background-color: #f4f4f4; border-left: 5px solid #4A90E2; color: #333;">
        ${commentText}
      </blockquote>
      ${footer}
    </div>
  `;

  // Notify the assigned user
  await sendEmail({
    to: assignedUser.email,
    subject,
    body: html
  });

  // Notify the creator if they’re not the commenter or assignee
  if (creator.email !== commenter.email && creator.email !== assignedUser.email) {
    const creatorHtml = `
      <div style="${commonStyles}">
        <h2 style="color: #4A90E2;">Hi ${creator.username},</h2>
        <p style="font-size: 15px; color: #333;">
          <strong>${commenter.username}</strong> added a comment on the task "<strong>${task.title}</strong>".
        </p>
        <blockquote style="margin: 20px 0; padding: 10px; background-color: #f4f4f4; border-left: 5px solid #4A90E2; color: #333;">
          ${commentText}
        </blockquote>
        ${footer}
      </div>
    `;

    await sendEmail({
      to: creator.email,
      subject,
      body: creatorHtml
    });
  }
};

module.exports = {
  sendTaskCreationEmail,
  sendTaskStatusUpdateEmail,
  sendCommentEmail
};
