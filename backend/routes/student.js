import express from "express";
import * as Student from "../models/student.js";
import ExcelJS from "exceljs";

const router = express.Router();

// other CRUD routes...

// Export to Excel (in-memory)
router.get("/export", async (req, res) => {
  try {
    const students = await Student.getAllStudents();

    // Create workbook in memory
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // Define columns
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Class", key: "class_name", width: 15 },
    ];

    // Add student rows
    students.forEach((student) => worksheet.addRow(student));

    // Send as downloadable file without saving it
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Excel export failed:", error);
    res.status(500).json({ message: "Error exporting Excel", error });
  }
});

export default router;
