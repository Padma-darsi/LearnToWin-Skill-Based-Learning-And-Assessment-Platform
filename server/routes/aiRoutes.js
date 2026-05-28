import express from "express";

import {
  analyzeQuiz,
  generatePracticeQuiz,
} from "../controllers/aiController.js";

const router = express.Router();

/* ANALYZE QUIZ */

router.post(
  "/analyze-quiz",
  analyzeQuiz
);

/* AI PRACTICE QUIZ */

router.post(
  "/generate-practice-quiz",
  generatePracticeQuiz
);

export default router;