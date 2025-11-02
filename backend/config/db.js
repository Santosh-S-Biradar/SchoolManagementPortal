import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password", // 🔹 replace with your actual MySQL password
  database: "school_portal",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

export default db;
