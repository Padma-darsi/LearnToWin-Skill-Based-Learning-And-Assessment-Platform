


import express from "express";
import Topic from "../models/Topic.js";

const router = express.Router();

/*
  GET /api/student/topic/:topicId
*/
router.get("/topic/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;

    const topic = await Topic.findById(topicId).lean();

    if (!topic) return res.status(404).json(null);

    res.status(200).json(topic);
  } catch (err) {
    console.error("TOPIC LOAD ERROR:", err);
    res.status(500).json(null);
  }
});

export default router;

