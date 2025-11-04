import db from "../config/db.js";

export const getAllAttendance = async () => {
  const [rows] = await db.query("SELECT * FROM attendance");
  return rows;
};

export const getAttendanceById = async (id) => {
  const [rows] = await db.query("SELECT * FROM attendance WHERE id = ?", [id]);
  return rows[0];
};

export const createAttendance = async (data) => {
  const { student_id, date, status } = data;
  const [result] = await db.query(
    "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)",
    [student_id, date, status]
  );
  return result.insertId;
};

export const updateAttendance = async (id, data) => {
  const { student_id, date, status } = data;
  await db.query(
    "UPDATE attendance SET student_id=?, date=?, status=? WHERE id=?",
    [student_id, date, status, id]
  );
};

export const deleteAttendance = async (id) => {
  await db.query("DELETE FROM attendance WHERE id=?", [id]);
};
