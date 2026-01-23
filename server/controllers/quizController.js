import Quiz from "../models/Quiz.js";

/* ================= ADMIN ================= */
export const addQuiz = async (req, res) => {
  try {
    const { skillId, question, options, correctAnswer } = req.body;

    if (
      !skillId ||
      !question ||
      !Array.isArray(options) ||
      options.length !== 4 ||
      correctAnswer === undefined
    ) {
      return res.status(400).json({ message: "Invalid quiz data" });
    }

    const quiz = await Quiz.create({
      skill: skillId,          // ✅ MAP CORRECTLY
      question,
      options,
      correctAnswer,
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error("ADD QUIZ ERROR ❌", err);
    res.status(500).json({ message: "Quiz creation failed" });
  }
};

/* ================= STUDENT ================= */
export const getQuizBySkill = async (req, res) => {
  try {
    const { skillId } = req.params;

    const quizzes = await Quiz.find({ skill: skillId }).lean();

    res.status(200).json(quizzes);
  } catch (err) {
    console.error("LOAD QUIZ ERROR ❌", err);
    res.status(200).json([]); // ALWAYS array
  }
};



/* ================= ADMIN ================= */
export const getQuizBySkillAdmin = async (req, res) => {
  try {
    const { skillId } = req.params;

    const quizzes = await Quiz.find({ skill: skillId }).lean();
    res.status(200).json(quizzes);
  } catch (err) {
    console.error("ADMIN LOAD QUIZ ERROR ❌", err);
    res.status(500).json({ message: "Failed to load quizzes" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    await Quiz.findByIdAndDelete(quizId);
    res.status(200).json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { question, options, correctAnswer } = req.body;

    await Quiz.findByIdAndUpdate(quizId, {
      question,
      options,
      correctAnswer,
    });

    res.status(200).json({ message: "Quiz updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
