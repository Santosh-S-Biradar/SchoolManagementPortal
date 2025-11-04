import * as Teacher from "../models/teacher.js";
import ExcelJS from "exceljs";
import db from "../config/db.js"; // ensure this is imported for database connection


export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.getAllTeachers();
    res.json(teachers);
  } catch (error) {
    console.error("❌ MySQL Error (addTeacher):", error); 
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

export const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    console.error("❌ MySQL Error (addTeacher):", error); 
    res.status(500).json({ message: "Error fetching teacher", error });
  }
};

export const addTeacher = async (req, res) => {
  try {
    const id = await Teacher.createTeacher(req.body);
    res.status(201).json({ message: "Teacher added", id });
  } catch (error) {
    console.error("❌ MySQL Error (addTeacher):", error); 
    res.status(500).json({ message: "Error adding teacher", error });
  }
};

export const editTeacher = async (req, res) => {
  try {
    await Teacher.updateTeacher(req.params.id, req.body);
    res.json({ message: "Teacher updated" });
  } catch (error) {
    console.error("❌ MySQL Error (addTeacher):", error); 
    res.status(500).json({ message: "Error updating teacher", error });
  }
};

export const removeTeacher = async (req, res) => {
  try {
    await Teacher.deleteTeacher(req.params.id);
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    console.error("❌ MySQL Error (addTeacher):", error); 
    res.status(500).json({ message: "Error deleting teacher", error });
  }
};

export const exportTeachersToExcel = async (req, res) => {
  try {
    const [teachers] = await db.query("SELECT * FROM teachers");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Teachers");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Subject", key: "subject", width: 20 },
      { header: "Phone", key: "phone", width: 20 },
      { header: "Created At", key: "created_at", width: 25 },
    ];

    teachers.forEach((t) => worksheet.addRow(t));

    const filePath = "./exports/teachers.xlsx";
    await workbook.xlsx.writeFile(filePath);

    res.json({
      message: "Teachers exported successfully",
      path: filePath,
    });
  } catch (error) {
    res.status(500).json({ message: "Error exporting teachers", error });
  }
};


