import db from "../config/db.js";

export const getAllTeachers = async () => {
  const [rows] = await db.execute("SELECT * FROM teachers");
  return rows;
};

export const getTeacherById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM teachers WHERE id = ?", [id]);
  return rows[0];
};

export const createTeacher = async (teacher) => {
  const { name, email, subject, phone } = teacher;
  const [result] = await db.execute(
    "INSERT INTO teachers (name, email, subject, phone) VALUES (?, ?, ?, ?)",
    [name, email, subject, phone]
  );
  return result.insertId;
};

export const updateTeacher = async (id, teacher) => {
  const { name, email, subject, phone } = teacher;
  await db.execute(
    "UPDATE teachers SET name = ?, email = ?, subject = ?, phone = ? WHERE id = ?",
    [name, email, subject, phone, id]
  );
};

export const deleteTeacher = async (id) => {
  await db.execute("DELETE FROM teachers WHERE id = ?", [id]);
};
