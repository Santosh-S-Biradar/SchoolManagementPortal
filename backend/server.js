// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the School Management Portal API 🚀");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));