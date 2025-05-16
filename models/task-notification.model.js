const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Sequelize instance
const Task = require('./task.model'); // Task model for associations
const User = require('./user.model'); // User model for associations

/**
 * TaskNotification Model Definition
 */
module.exports = (sequelize, DataTypes) => {
  const TaskNotification = sequelize.define('TaskNotification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('sent', 'pending'),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'task_notifications',
    timestamps: true,
  });

  // Define associations
  TaskNotification.associate = (models) => {
    TaskNotification.belongsTo(models.Task, { foreignKey: 'task_id' });
    TaskNotification.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return TaskNotification;
};
