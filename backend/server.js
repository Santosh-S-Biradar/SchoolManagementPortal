import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import exportRoutes from "./routes/exportExcel.js";
import teacherRoutes from "./routes/teacher.js";
import attendanceRoutes from "./routes/attendance.js";
import exportAttendanceRoutes from "./routes/exportAttendance.js";
import marksRoutes from "./routes/marks.js";
import exportMarksRoutes from "./routes/exportMarks.js";
import exportReportsRoutes from "./routes/exportReports.js";
import exportFullReportRoutes from "./routes/exportFullReport.js";


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/export/attendance", exportAttendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/marks", exportMarksRoutes);
app.use("/api/reports", exportReportsRoutes);
app.use("/api/reports", exportFullReportRoutes);


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
