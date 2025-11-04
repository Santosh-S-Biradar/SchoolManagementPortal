import db from "../config/db.js";

export const getAllStudents = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM students", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

export const getStudentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM students WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

export const createStudent = (studentData) => {
  const { name, email, class_name, section, roll_no } = studentData;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO students (name, email, class, section, roll_no) VALUES (?, ?, ?, ?, ?)",
      [name, email, class_name, section, roll_no],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

export const updateStudent = (id, studentData) => {
  const { name, email, class_name, section, roll_no } = studentData;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE students SET name=?, email=?, class=?, section=?, roll_no=? WHERE id=?",
      [name, email, class_name, section, roll_no, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const deleteStudent = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM students WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
