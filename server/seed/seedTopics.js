import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Concept from "../models/Concept.js";
import Topic from "../models/Topic.js";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await mongoose.connect("mongodb://127.0.0.1:27017/test");
console.log("MongoDB Connected ✅");

// Clear old data
await Concept.deleteMany({});
await Topic.deleteMany({});
console.log("Old data cleared ✅");

// Helper to create slug
const createSlug = (title) => title.toLowerCase().replace(/\s+/g, "-");

// Seed all concepts
const conceptsFolder = path.join(__dirname, "../content"); // Make sure this exists

const conceptNames = fs.readdirSync(conceptsFolder);

for (const conceptName of conceptNames) {
  const concept = await Concept.create({ title: conceptName });
  console.log(`✅ Concept seeded: ${conceptName}`);

  const topicFolder = path.join(conceptsFolder, conceptName);
  if (!fs.existsSync(topicFolder)) continue;

  const topicFiles = fs.readdirSync(topicFolder);
  for (const file of topicFiles) {
    const content = fs.readFileSync(path.join(topicFolder, file), "utf-8");
    const topicTitle = path.parse(file).name;

    await Topic.create({
      title: topicTitle,
      slug: createSlug(topicTitle),
      content,
      concept: concept._id,
    });

    console.log(`✅ Topic seeded: ${topicTitle}`);
  }
}

console.log("🎉 All concepts and topics seeded successfully!");
process.exit();
