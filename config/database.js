const Sequelize = require('sequelize');

// Initialize Sequelize with the SQLite dialect
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite', // Change this to your SQLite database file path
});

module.exports = sequelize;

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
