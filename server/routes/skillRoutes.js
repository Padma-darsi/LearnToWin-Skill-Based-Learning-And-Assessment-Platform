import express from "express";
import { getSkillTree } from "../controllers/skillController.js";

const router = express.Router();

router.get("/tree", getSkillTree);

export default router;
