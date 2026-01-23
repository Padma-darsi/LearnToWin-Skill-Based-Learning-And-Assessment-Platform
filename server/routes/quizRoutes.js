import express from "express";
import { addQuiz, getQuizBySkill,getQuizBySkillAdmin,deleteQuiz,updateQuiz } from "../controllers/quizController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/quiz", protect, adminOnly, addQuiz);
router.get("/quiz/skill/:skillId", protect, getQuizBySkill);

router.get(
  "/admin/quiz/skill/:skillId",
  protect,
  adminOnly,
  getQuizBySkillAdmin
);

router.delete(
  "/quiz/:quizId",
  protect,
  adminOnly,
  deleteQuiz
);

router.put(
  "/quiz/:quizId",
  protect,
  adminOnly,
  updateQuiz
);


export default router;

