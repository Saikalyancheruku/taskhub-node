const { Task, User } = require('../models');
const { sendTaskCreationEmail, sendTaskStatusUpdateEmail } = require('../utils/sendTaskEmail.util')
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assigned_to, created_by,priority } = req.body;

    // Create the task
    const task = await Task.create({
      title,
      description,
      dueDate,
      assigned_to,
      created_by,
      priority
    });

    // Get the user info
    const assignedUser = await User.findByPk(assigned_to);
    const creator = await User.findByPk(created_by);
   
    // Send an email to the assigned user and the creator
    await sendTaskCreationEmail(assignedUser, task, creator);

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    console.error('Error in createTask:', err);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// exports.updateTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { name, description, due_date, assigned_to, status } = req.body;

//     const task = await Task.findByPk(taskId);

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Save old status
//     const oldStatus = task.status;

//     task.name = name || task.name;
//     task.description = description || task.description;
//     task.due_date = due_date || task.due_date;
//     task.assigned_to = assigned_to || task.assigned_to;
//     task.status = status || task.status;

//     await task.save();

//     // Get the assigned user info
//     const assignedUser = await User.findByPk(task.assigned_to);

//     // Send email to the assigned user about the status update
//     await sendTaskStatusUpdateEmail(assignedUser, task, oldStatus);

//     res.status(200).json({ message: 'Task status updated successfully', task });
//   } catch (err) {
//     console.error('Error in updateTask:', err);
//     res.status(500).json({ message: 'Error updating task' });
//   }
// };
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { name, description, due_date, assigned_to, status } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const oldStatus = task.status;

    task.name = name || task.name;
    task.description = description || task.description;
    task.due_date = due_date || task.due_date;
    task.assigned_to = assigned_to || task.assigned_to;
    task.status = status || task.status;

    await task.save();

    // Get the assigned user info
    const assignedUser = await User.findByPk(task.assigned_to);

    // Send notification email
    await sendTaskStatusUpdateEmail(assignedUser, task, oldStatus);

    // ✅ Fetch the updated task with associations
    const updatedTask = await Task.findByPk(taskId, {
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'username'] },
        { model: User, as: 'createdUser', attributes: ['id', 'username'] }
      ]
    });

    // ✅ Return only the updated task (not wrapped)
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Error in updateTask:', err);
    res.status(500).json({ message: 'Error updating task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { teamId, userId } = req.query; // filter tasks by team or user

    let whereCondition = {};

    if (teamId) {
      whereCondition = { ...whereCondition, team_id: teamId };
    }

    if (userId) {
      whereCondition = { ...whereCondition, assigned_to: userId };
    }

    const tasks = await Task.findAll({
      where: whereCondition,
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'username'] }, // ✅ use the alias
        { model: User, as: 'createdUser', attributes: ['id', 'username'] },  // ✅ use the alias
      ],
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error in getAllTasks:', err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId, {
      include: [
        { model: User, as: 'assignedUser', attributes: ['id', 'username'] },
        { model: User, as: 'createdUser', attributes: ['id', 'username'] },
      ],
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error('Error in getTaskById:', err);
    res.status(500).json({ message: 'Error fetching task' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error in deleteTask:', err);
    res.status(500).json({ message: 'Error deleting task' });
  }
};
