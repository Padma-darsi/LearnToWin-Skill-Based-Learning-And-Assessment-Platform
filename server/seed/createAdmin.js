import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const hashed = await bcrypt.hash("padma123", 10);

await User.create({
  name: "padma",
  email: "padma230@gmail.com",
  password: hashed,
  role: "admin"
});

console.log("ADMIN CREATED");
process.exit();


