import express from "express";
import {
  getMarks,
  getMark,
  addMark,
  updateMark,
  deleteMark,
} from "../controllers/marksController.js";

const router = express.Router();

router.get("/", getMarks);
router.get("/:id", getMark);
router.post("/", addMark);
router.put("/:id", updateMark);
router.delete("/:id", deleteMark);

export default router;
