// config/database.js

const { Sequelize } = require('sequelize');

// Load database configuration
const { username, password, database, host, dialect } = require('./config.json');

// Initialize Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false // Set to true to log SQL queries
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
