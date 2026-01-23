import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

router.get("/skills", async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
});

export default router;

