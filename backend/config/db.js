import mysql from "mysql2/promise";

let db;
try {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password@7749",  // your MySQL password if set
    database: "school_portal"
  });
  console.log("✅ Connected to MySQL database!");
} catch (err) {
  console.error("❌ MySQL connection failed:", err.message);
}

export default db;
