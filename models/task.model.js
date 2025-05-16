const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Sequelize instance
const User = require('./user.model'); // User model for associations

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('to_do', 'in_progress', 'done'),
      defaultValue: 'to_do',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
    },
    deadline: {
      type: DataTypes.DATEONLY,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      references: {
        model: User(sequelize, DataTypes), // Reference to User model
        key: 'id',
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: User(sequelize, DataTypes), // Reference to User model
        key: 'id',
      },
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      field: 'due_date',
    },
  }, {
    tableName: 'tasks',
    timestamps: true,
  });

  // Define associations
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: 'assigned_to', as: 'assignedUser' });
    Task.belongsTo(models.User, { foreignKey: 'created_by', as: 'createdUser' });
  };

  return Task;
};
