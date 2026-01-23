import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Quiz from "../models/Quiz.js";
import Concept from "../models/concept.js";

import { fileURLToPath } from "url";

// __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 READ SKILL NAME FROM TERMINAL
const skill = process.argv[2]; // react | node | express

if (!skill) {
  console.log("❌ Please provide skill name");
  console.log("👉 Example: node seed/seedQuiz.js react");
  process.exit();
}

// DB connect
await mongoose.connect("mongodb://127.0.0.1:27017/test");
console.log("MongoDB Connected ✅");

// 🔹 Dynamic quiz file
const filePath = path.join(__dirname, `../data/${skill}Quiz.json`);

if (!fs.existsSync(filePath)) {
  console.log("❌ Quiz file not found:", filePath);
  process.exit();
}

const quizData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Find concept
const concept = await Concept.findOne({ title: quizData.concept });

if (!concept) {
  console.log("❌ Concept not found:", quizData.concept);
  process.exit();
}

// Clear old quiz for this concept
await Quiz.deleteMany({ concept: concept._id });

// Insert new quiz
const formattedQuestions = quizData.questions.map(q => ({
  ...q,
  concept: concept._id
}));

await Quiz.insertMany(formattedQuestions);

console.log(`🎉 ${skill.toUpperCase()} quiz seeded successfully!`);
process.exit();
