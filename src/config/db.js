// src/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

// The mysql2 library can connect directly using a connection URL
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL
});

module.exports = pool.promise();
