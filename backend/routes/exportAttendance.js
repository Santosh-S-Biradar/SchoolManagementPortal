import express from "express";
import excel from "exceljs";
import fs from "fs";
import path from "path";
import db from "../config/db.js";

const router = express.Router();
console.log("✅ exportAttendance.js routes loaded");

// Get current directory path safely
const __dirname = path.resolve();

// ✅ Attendance Excel Export Route
router.get("/excel", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM attendance");

    if (!rows.length) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];

    worksheet.addRows(rows);

    // ✅ Ensure folder exists
    const exportDir = path.join(__dirname, "excel_reports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const filePath = path.join(exportDir, "attendance_report.xlsx");
    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Attendance Excel exported successfully ✅",
      file: filePath,
    });
  } catch (error) {
    console.error("❌ Error exporting attendance:", error);
    res.status(500).json({ message: "Error exporting attendance", error });
  }
});

export default router;
