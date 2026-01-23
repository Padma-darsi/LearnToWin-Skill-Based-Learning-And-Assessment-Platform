import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

/*
  GET /api/student/sidebar
*/
router.get("/sidebar", async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate({
        path: "topics",
        select: "title",
      })
      .lean();

    res.status(200).json(skills);
  } catch (err) {
    console.error("SIDEBAR ERROR:", err);
    res.status(500).json([]);
  }
});

export default router;





/*
import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();


 

router.get("/sidebar", async (req, res) => {
  try {
    const skills = await Skill.find()
      .populate({
        path: "topics",
        select: "title", // only what sidebar needs
      })
      .lean();

    res.status(200).json(skills);
  } catch (err) {
    console.error("SIDEBAR ERROR:", err);
    res.status(500).json([]);
  }
});

export default router;*/
