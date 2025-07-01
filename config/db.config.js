// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Destructure environment variables for easy access
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
// Sequelize Configuration
module.exports = {
  HOST: DB_HOST ,  // MySQL host
  USER: DB_USER ,  // MySQL username
  PASSWORD: DB_PASS ,  // MySQL password
  DB: DB_NAME, 
   port: 35561, // Database name
  dialect: "mysql",  // MySQL as the DBMS
  pool: {
    max: 5,  
    min: 0,  
    acquire: 30000,  
    idle: 10000  
  }
};
