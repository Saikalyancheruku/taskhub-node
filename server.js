const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/db.config.js');
const authRoutes = require('./routes/auth.routes.js');
const userRoutes = require('./routes/user.routes.js');
const teamRoutes = require('./routes/team.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const commentRoutes = require('./routes/comment.routes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');
// Initialize dotenv
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// const sequelize = new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASSWORD,
//   {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     pool: dbConfig.pool
//   }
// );
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: 54066,
  dialect: dbConfig.dialect,
  dialectOptions: {
  connectTimeout: 10000, // 10 seconds
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}

});


// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
 app.use('/api/teams', teamRoutes);
  app.use('/api/tasks', taskRoutes);
 app.use('/api/comments', commentRoutes);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
