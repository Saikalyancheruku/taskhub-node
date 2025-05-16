/**
 * Team Model Definition
 */
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'manager_id',
    },
  }, {
    tableName: 'teams',
    timestamps: true,
  });

  
  Team.associate = (models) => {
     Team.belongsTo(models.User, {
    foreignKey: 'managerId',
    as: 'manager'
  });
  };

  return Team;
};
