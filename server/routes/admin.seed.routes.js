import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* ⚠️ TEMPORARY – REMOVE AFTER USE */
router.post("/create-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "padma230@gmail.com" });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash("padma123", 10);

    await User.create({
      name: "padma",
      email: "padma230@gmail.com",
      password: hashed,
      role: "admin"
    });

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Admin creation failed" });
  }
});

export default router;
