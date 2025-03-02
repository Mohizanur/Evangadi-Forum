require("dotenv").config();
const mysql2 = require("mysql2");

const dbConnection = mysql2
  .createPool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
    port: 3306, // Add explicit port
    waitForConnections: true,
    enableKeepAlive: true,
  })
  .promise();

// Add connection test
dbConnection
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    connection.release();
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

module.exports = dbConnection;
