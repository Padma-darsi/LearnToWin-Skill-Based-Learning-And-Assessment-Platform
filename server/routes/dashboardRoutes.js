import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  studentDashboard,
  adminDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/student", protect, studentDashboard);
router.get("/admin", protect, adminOnly, adminDashboard);

export default router;
