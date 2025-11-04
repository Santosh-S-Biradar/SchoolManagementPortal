import express from "express";
import excel from "exceljs";
import db from "../config/db.js";

const router = express.Router();
console.log("✅ exportReports.js routes loaded");

router.get("/export/full-report", async (req, res) => {
  try {
    const workbook = new excel.Workbook();

    // --- 1️⃣ Students Sheet ---
    const [students] = await db.query("SELECT * FROM students");
    const studentsSheet = workbook.addWorksheet("Students");
    studentsSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Class", key: "class", width: 15 },
      { header: "Section", key: "section", width: 10 },
    ];
    studentsSheet.addRows(students);

    // --- 2️⃣ Teachers Sheet ---
    const [teachers] = await db.query("SELECT * FROM teachers");
    const teachersSheet = workbook.addWorksheet("Teachers");
    teachersSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 25 },
      { header: "Subject", key: "subject", width: 20 },
    ];
    teachersSheet.addRows(teachers);

    // --- 3️⃣ Attendance Sheet ---
    const [attendance] = await db.query("SELECT * FROM attendance");
    const attendanceSheet = workbook.addWorksheet("Attendance");
    attendanceSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];
    attendanceSheet.addRows(attendance);

    // --- 4️⃣ Marks Sheet ---
    const [marks] = await db.query("SELECT * FROM marks");
    const marksSheet = workbook.addWorksheet("Marks");
    marksSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Subject", key: "subject", width: 20 },
      { header: "Marks", key: "marks", width: 10 },
    ];
    marksSheet.addRows(marks);

    // Save file to server
    const filePath = "./excel_reports/full_school_report.xlsx";
    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Full school report exported successfully!",
      file: filePath,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating full report", error });
  }
});

export default router;
