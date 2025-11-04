import express from "express";
import excel from "exceljs";
import db from "../config/db.js";

const router = express.Router();

console.log("✅ exportFullReport.js routes loaded");

router.get("/export/fullreport", async (req, res) => {
  try {
    const workbook = new excel.Workbook();

    // === STUDENTS SHEET ===
    const [students] = await db.query("SELECT * FROM students");
    const studentsSheet = workbook.addWorksheet("Students");
    studentsSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Class", key: "class", width: 15 },
      { header: "Section", key: "section", width: 15 },
    ];
    studentsSheet.addRows(students);

    // === TEACHERS SHEET ===
    const [teachers] = await db.query("SELECT * FROM teachers");
    const teachersSheet = workbook.addWorksheet("Teachers");
    teachersSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Subject", key: "subject", width: 20 },
    ];
    teachersSheet.addRows(teachers);

    // === ATTENDANCE SHEET ===
    const [attendance] = await db.query("SELECT * FROM attendance");
    const attendanceSheet = workbook.addWorksheet("Attendance");
    attendanceSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];
    attendanceSheet.addRows(attendance);

    // === MARKS SHEET ===
    const [marks] = await db.query("SELECT * FROM marks");
    const marksSheet = workbook.addWorksheet("Marks");
    marksSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Subject", key: "subject", width: 20 },
      { header: "Marks", key: "marks", width: 10 },
      { header: "Exam Date", key: "exam_date", width: 20 },
    ];
    marksSheet.addRows(marks);

    // === WRITE FILE ===
    const filePath = "./excel_reports/school_full_report.xlsx";
    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Full school Excel report generated successfully",
      file: filePath,
    });
  } catch (error) {
    console.error("❌ Error generating full report:", error);
    res.status(500).json({ message: "Error exporting full report", error });
  }
});

export default router;
