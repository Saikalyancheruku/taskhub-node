const { sendEmail } = require('../services/email.service');

// Function to send email when task is created
const sendTaskCreationEmail = async (assignedUser, task, creator) => {
  const subject = `New Task Assigned: ${task.title}`;
  const html = `<p>Hi ${assignedUser.title},</p>
                <p>You have been assigned a new task: <strong>${task.title}</strong></p>
                <p><strong>Description:</strong> ${task.description}</p>
                <p><strong>Due Date:</strong> ${task.due_date}</p>
                <p>Best regards,<br>Task Management System</p>`;

  await sendEmail({
    to: assignedUser.email,
    subject,
    body: html
  });

  // Optionally, send email to the creator of the task
  const creatorSubject = `Task Created: ${task.title}`;
  const creatorHtml = `<p>Hi ${creator.username},</p>
                       <p>The task <strong>${task.title}</strong> has been created and assigned to ${assignedUser.name}.</p>
                       <p>Best regards,<br>Task Management System</p>`;

  await sendEmail({
    to: creator.email,
    subject: creatorSubject,
    body: creatorHtml
  });
};


// Function to send email when task status is updated
const sendTaskStatusUpdateEmail = async (assignedUser, task, oldStatus) => {
  const subject = `Task Status Updated: ${task.title}`;
  const html = `<p>Hi ${assignedUser.username},</p>
                <p>The status of your task "<strong>${task.title}</strong>" has been updated from "<strong>${oldStatus}</strong>" to "<strong>${task.status}</strong>".</p>
                <p>Best regards,<br>Task Management System</p>`;

  await sendEmail({
    to: assignedUser.email,
    subject,
    body: html
  });
};
const sendCommentEmail = async (task, commenter, assignedUser, creator, commentText) => {
  const subject = `New Comment on Task: ${task.title}`;
  const html = `<p>Hi ${assignedUser.username},</p>
                <p><strong>${commenter.username}</strong> has added a new comment on the task "<strong>${task.title}</strong>".</p>
                <p><strong>Comment:</strong> ${commentText}</p>
                <p>Best regards,<br>Task Management System</p>`;

  // Notify the assigned user
  await sendEmail({
    to: assignedUser.email,
    subject,
    body: html
  });

  // Notify the task creator if different from commenter and assigned user
  if (creator.email !== commenter.email && creator.email !== assignedUser.email) {
    const creatorHtml = `<p>Hi ${creator.username},</p>
                         <p><strong>${commenter.username}</strong> has added a comment on the task "<strong>${task.title}</strong>".</p>
                         <p><strong>Comment:</strong> ${commentText}</p>
                         <p>Best regards,<br>Task Management System</p>`;

    await sendEmail({
      to: creator.email,
      subject,
      body: creatorHtml
    });
  }
};



module.exports = { sendTaskCreationEmail, sendTaskStatusUpdateEmail, sendCommentEmail };