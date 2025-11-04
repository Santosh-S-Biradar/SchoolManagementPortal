import db from "../config/db.js";

// ✅ Get all marks
export const getMarks = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM marks");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching marks", error });
  }
};

// ✅ Get single mark by ID
export const getMark = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM marks WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Mark not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mark", error });
  }
};

// ✅ Add a new mark
export const addMark = async (req, res) => {
  try {
    const { student_id, subject, marks } = req.body;
    const [result] = await db.query(
      "INSERT INTO marks (student_id, subject, marks) VALUES (?, ?, ?)",
      [student_id, subject, marks]
    );
    res.status(201).json({ message: "Mark added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error adding mark", error });
  }
};

// ✅ Update a mark
export const updateMark = async (req, res) => {
  try {
    const { subject, marks } = req.body;
    await db.query("UPDATE marks SET subject=?, marks=? WHERE id=?", [
      subject,
      marks,
      req.params.id,
    ]);
    res.json({ message: "Mark updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating mark", error });
  }
};

// ✅ Delete a mark
export const deleteMark = async (req, res) => {
  try {
    await db.query("DELETE FROM marks WHERE id=?", [req.params.id]);
    res.json({ message: "Mark deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mark", error });
  }
};
