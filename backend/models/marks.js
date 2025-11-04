import db from "../config/db.js";

export const getAllMarks = async () => {
  const [rows] = await db.query("SELECT * FROM marks");
  return rows;
};

export const getMarksById = async (id) => {
  const [rows] = await db.query("SELECT * FROM marks WHERE id = ?", [id]);
  return rows[0];
};

export const createMark = async (data) => {
  const { student_id, subject, marks } = data;
  const [result] = await db.query(
    "INSERT INTO marks (student_id, subject, marks) VALUES (?, ?, ?)",
    [student_id, subject, marks]
  );
  return result.insertId;
};

export const updateMark = async (id, data) => {
  const { subject, marks } = data;
  await db.query("UPDATE marks SET subject=?, marks=? WHERE id=?", [
    subject,
    marks,
    id,
  ]);
};

export const deleteMark = async (id) => {
  await db.query("DELETE FROM marks WHERE id = ?", [id]);
};
