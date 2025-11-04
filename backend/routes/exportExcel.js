import express from "express";
import { exportStudentsToExcel } from "../controllers/exportController.js";

const router = express.Router();

router.get("/students", exportStudentsToExcel);

export default router;
