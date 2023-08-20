const mysql2 = require("mysql2");
const util = require("util");
require("dotenv").config();

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
});

connection.query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) {
    console.log("Failed to connect to MySQL...");
    throw err;
  }
});

module.exports = connection;
