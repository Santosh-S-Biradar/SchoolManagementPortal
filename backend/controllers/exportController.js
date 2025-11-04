import ExcelJS from "exceljs";
import db from "../config/db.js";
import fs from "fs";

export const exportStudentsToExcel = async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM students");

    // Create a new workbook and sheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Students");

    // Define columns
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Class", key: "class_name", width: 15 },
      { header: "Section", key: "section", width: 10 },
      { header: "Roll No", key: "roll_no", width: 10 },
      { header: "Created At", key: "created_at", width: 25 },
    ];

    // Add rows
    rows.forEach((student) => {
      worksheet.addRow(student);
    });

    // Make sure folder exists
    if (!fs.existsSync("excel_reports")) {
      fs.mkdirSync("excel_reports");
    }

    const filePath = `excel_reports/students_${Date.now()}.xlsx`;

    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({
      message: "Excel exported successfully!",
      downloadLink: filePath,
    });
  } catch (error) {
    console.error("❌ Excel Export Error:", error);
    res.status(500).json({ message: "Error exporting Excel", error });
  }
};
