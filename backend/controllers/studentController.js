import * as Student from "../models/student.js";

export const getStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error("❌ MySQL Error (addStudent):", error); // <-- add this line
    res.status(500).json({ message: "Error adding student", error });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    console.error("❌ MySQL Error (addStudent):", error); // <-- add this line
    res.status(500).json({ message: "Error adding student", error });
  }
};

export const addStudent = async (req, res) => {
  try {
    const id = await Student.createStudent(req.body);
    res.status(201).json({ message: "Student added", id });
  } catch (error) {
    console.error("❌ MySQL Error (addStudent):", error); // <-- add this line
    res.status(500).json({ message: "Error adding student", error });
  }
};

export const editStudent = async (req, res) => {
  try {
    await Student.updateStudent(req.params.id, req.body);
    res.json({ message: "Student updated" });
  }catch (error) {
    console.error("❌ MySQL Error (addStudent):", error); // <-- add this line
    res.status(500).json({ message: "Error adding student", error });
  }
};

export const removeStudent = async (req, res) => {
  try {
    await Student.deleteStudent(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    console.error("❌ MySQL Error (addStudent):", error); // <-- add this line
    res.status(500).json({ message: "Error adding student", error });
  }
};

