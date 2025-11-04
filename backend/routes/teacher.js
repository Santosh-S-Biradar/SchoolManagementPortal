import express from "express";
import { exportTeachersToExcel } from "../controllers/teacherController.js";


import {
  getTeachers,
  getTeacher,
  addTeacher,
  editTeacher,
  removeTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.post("/", addTeacher);
router.put("/:id", editTeacher);
router.delete("/:id", removeTeacher);
router.get("/export/excel", exportTeachersToExcel);



export default router;
