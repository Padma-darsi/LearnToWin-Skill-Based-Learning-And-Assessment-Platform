import express from "express";
import Skill from "../models/Skill.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* GET ALL SKILLS */
router.get("/", protect, adminOnly, async (req, res) => {
  res.json(await Skill.find());
});

router.get("/", protect, adminOnly, async (req, res) => {
  const skills = await Skill.find().select("title");
  res.json(skills);
});


/* CREATE SKILL */
router.post("/", protect, adminOnly, async (req, res) => {
  const title = req.body.title || req.body.name; // ✅ FIX

  if (!title) {
    return res.status(400).json({ message: "Skill title required" });
  }

  const skill = await Skill.create({ title });
  res.status(201).json(skill);
});

/* UPDATE SKILL */
router.put("/:id", protect, adminOnly, async (req, res) => {
  const title = req.body.title || req.body.name; // ✅ FIX

  const skill = await Skill.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true }
  );

  res.json(skill);
});

/* DELETE SKILL */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
