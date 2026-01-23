import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true , unique: true,}, // ✅ FIXED

  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
});

export default mongoose.model("Skill", skillSchema);
