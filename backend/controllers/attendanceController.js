import * as Attendance from "../models/attendance.js";

export const getAll = async (req, res) => {
  try {
    const data = await Attendance.getAllAttendance();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

export const getOne = async (req, res) => {
  try {
    const record = await Attendance.getAttendanceById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance", error });
  }
};

export const add = async (req, res) => {
  try {
    const id = await Attendance.createAttendance(req.body);
    res.status(201).json({ message: "Attendance added", id });
  } catch (error) {
    res.status(500).json({ message: "Error adding attendance", error });
  }
};

export const update = async (req, res) => {
  try {
    await Attendance.updateAttendance(req.params.id, req.body);
    res.json({ message: "Attendance updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance", error });
  }
};

export const remove = async (req, res) => {
  try {
    await Attendance.deleteAttendance(req.params.id);
    res.json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting attendance", error });
  }
};
