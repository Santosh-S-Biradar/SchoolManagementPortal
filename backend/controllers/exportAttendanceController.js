import db from "../config/db.js";
import ExcelJS from "exceljs";
import fs from "fs";

export const exportAttendanceToExcel = async (req, res) => {
  try {
    // Fetch attendance with student names
    const [rows] = await db.query(`
      SELECT a.id, s.name AS student_name, a.date, a.status
      FROM attendance a
      JOIN students s ON a.student_id = s.id
    `);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    // Create Excel Workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    // Headers
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Student Name", key: "student_name", width: 25 },
      { header: "Date", key: "date", width: 20 },
      { header: "Status", key: "status", width: 15 },
    ];

    // Add data
    rows.forEach((record) => worksheet.addRow(record));

    // Ensure reports directory exists
    const dir = "./excel_reports";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filePath = `${dir}/attendance_report.xlsx`;
    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Attendance Excel exported successfully",
      file: filePath,
    });
  } catch (error) {
    console.error("Error exporting attendance Excel:", error);
    res.status(500).json({ message: "Error exporting attendance Excel", error });
  }
};
