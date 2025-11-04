import express from "express";
import excel from "exceljs";
import db from "../config/db.js";

const router = express.Router();

console.log("✅ exportMarks.js routes loaded");

router.get("/export/excel", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM marks");

    if (!rows.length) {
      return res.status(404).json({ message: "No marks records found" });
    }

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Marks Report");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Subject", key: "subject", width: 20 },
      { header: "Marks", key: "marks", width: 10 },
      { header: "Exam Date", key: "exam_date", width: 20 },
    ];

    worksheet.addRows(rows);

    const filePath = "./excel_reports/marks_report.xlsx";
    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Marks Excel exported successfully",
      file: filePath,
    });
  } catch (error) {
    res.status(500).json({ message: "Error exporting marks", error });
  }
});

export default router;
