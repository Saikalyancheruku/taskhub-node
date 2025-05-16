/**
 * Comment Model Definition
 */
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'comments',
    underscored: true,         // this maps camelCase fields to snake_case columns
    timestamps: true,          // automatically manages created_at and updated_at
  });

  // Define associations
  Comment.associate = (models) => {
    Comment.belongsTo(models.Task, {
      foreignKey: 'task_id',
      as: 'task',
    });

    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Comment;
};
