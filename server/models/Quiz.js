import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number, // index (0–3)
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("Quiz", quizSchema);
