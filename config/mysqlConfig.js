const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10, // Adjust the connection limit as needed
  multipleStatements: true, // Enable multiple statements
});

// Test the database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
  console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10, // Adjust the connection limit as needed
  });
  connection.release();
});

module.exports = db;
