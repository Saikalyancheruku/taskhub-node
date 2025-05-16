module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define('UserTeam', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users', // table name
        key: 'id',
      },
    },
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'teams', // table name
        key: 'id',
      },
    },
  }, {
    tableName: 'user_teams',
    timestamps: false, // no createdAt/updatedAt
  });

  return UserTeam;
};
