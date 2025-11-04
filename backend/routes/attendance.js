import express from "express";
import {
  getAll,
  getOne,
  add,
  update,
  remove,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
