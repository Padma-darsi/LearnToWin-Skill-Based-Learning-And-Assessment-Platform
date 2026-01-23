




import express from "express";
import {
  getTopicsBySkill,
  createTopic,
  updateTopic,
  deleteTopic
} from "../controllers/AdminTopicController.js";

const router = express.Router();

router.get("/topics/skill/:skillId", getTopicsBySkill);
router.post("/topics", createTopic);
router.put("/topics/:id", updateTopic);
router.delete("/topics/:id", deleteTopic);

export default router;

