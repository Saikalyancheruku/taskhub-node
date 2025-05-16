const { Comment, Task, User } = require('../models');
const { sendCommentEmail} = require('../utils/sendTaskEmail.util')

exports.createComment = async (req, res) => {
  try {
    const { taskId, userId, comment } = req.body;

    const task = await Task.findByPk(taskId, {
      include: ['assignedUser', 'createdUser']
    });

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const commenter = await User.findByPk(userId);
    if (!commenter) return res.status(404).json({ message: 'User not found' });

    const newComment = await Comment.create({
      task_id: taskId,
      user_id: userId,
      comment
    });

    const enrichedComment = await Comment.findByPk(newComment.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'username'] }]
    });

    await sendCommentEmail(task, commenter, task.assignedUser, task.createdUser, comment);

    res.status(201).json(enrichedComment); // frontend expects full comment with user details
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const comments = await Comment.findAll({
      where: { task_id: taskId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
