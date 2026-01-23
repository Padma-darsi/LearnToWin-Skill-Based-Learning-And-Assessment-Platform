import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: String,
});

const conceptSchema = new mongoose.Schema({
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  name: String,
  topics: [topicSchema],
});

export default mongoose.model("Concept", conceptSchema);
