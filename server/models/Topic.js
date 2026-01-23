import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      default: "",
    },

    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Topic", topicSchema);
