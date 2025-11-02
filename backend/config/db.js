// backend/config/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password@7749", // your MySQL password if set
  database: "school_portal",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

module.exports = db;
