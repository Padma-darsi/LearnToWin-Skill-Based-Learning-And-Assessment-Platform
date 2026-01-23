const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  skill: String,
  question: String,
  options: [String],
  correctAnswer: Number
});

module.exports = mongoose.model("Question", questionSchema);
