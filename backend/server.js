import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
