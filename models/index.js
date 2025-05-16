require('dotenv').config(); 

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: 54066,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Import models
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.Team = require('./team.model')(sequelize, Sequelize.DataTypes);
db.UserTeam = require('./user_team.model')(sequelize, Sequelize.DataTypes);
db.Task = require('./task.model')(sequelize, Sequelize.DataTypes);
db.Comment = require('./comment.model')(sequelize, Sequelize.DataTypes);
db.TaskNotification = require('./task-notification.model')(sequelize, Sequelize.DataTypes);


db.User.belongsToMany(db.Team, { through: db.UserTeam, foreignKey: 'user_id' });
db.Team.belongsToMany(db.User, { through: db.UserTeam, foreignKey: 'team_id' });

db.Task.hasMany(db.Comment, { foreignKey: 'task_id' });
db.Comment.belongsTo(db.Task, { foreignKey: 'task_id' });

db.Task.hasMany(db.TaskNotification, { foreignKey: 'task_id' });
db.TaskNotification.belongsTo(db.Task, { foreignKey: 'task_id' });

db.User.hasMany(db.Task, { foreignKey: 'assigned_to' });
db.Task.belongsTo(db.User, { foreignKey: 'assigned_to' });

db.User.hasMany(db.Task, { foreignKey: 'created_by' });
db.Task.belongsTo(db.User, { foreignKey: 'created_by' });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Error syncing models with database:', err);
  });

module.exports = db;
