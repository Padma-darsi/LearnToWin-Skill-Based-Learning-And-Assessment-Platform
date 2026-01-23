import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

import adminSkillRoutes from "./routes/adminSkillRoutes.js";
import adminTopicRoutes from "./routes/adminTopicRoutes.js";

import studentSidebarRoutes from "./routes/studentSidebarRoutes.js";
import studentSkillRoutes from "./routes/studentSkillRoutes.js";
import studentTopicRoutes from "./routes/studentTopicRoutes.js";

import quizRoutes from "./routes/quizRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* AUTH */
app.use("/api/auth", authRoutes);

/* ADMIN */
app.use("/api/admin/skills", adminSkillRoutes);
app.use("/api/admin", adminTopicRoutes);



/* STUDENT (VERY IMPORTANT ORDER) */
app.use("/api/student", studentSidebarRoutes);
app.use("/api/student/skills", studentSkillRoutes);
app.use("/api/student", studentTopicRoutes);


app.use("/api", quizRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅ to LearnToWin_db");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error(err));
