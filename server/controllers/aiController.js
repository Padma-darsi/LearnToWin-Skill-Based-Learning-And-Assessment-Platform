import {
  generateAIAnalysis,
  generatePracticeQuizAI,
} from "../services/aiService.js"

/* ================================= */
/* ANALYZE QUIZ */
/* ================================= */

export const analyzeQuiz = async (
  req,
  res
) => {
  try {
    const { wrongAnswers } = req.body;

    if (
      !wrongAnswers ||
      wrongAnswers.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No wrong answers provided",
      });
    }

    const analysis =
      await generateAIAnalysis(
        wrongAnswers
      );

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};

/* ================================= */
/* GENERATE AI PRACTICE QUIZ */
/* ================================= */


/* GENERATE AI PRACTICE QUIZ */

export const generatePracticeQuiz = async (req, res) => {
  try {
    const {
      skill,
      weakTopics,
      wrongAnswers,
    } = req.body;

    if (
      !skill ||
      !Array.isArray(wrongAnswers) ||
      wrongAnswers.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Skill and wrong answers are required",
      });
    }

    const quiz = await generatePracticeQuizAI({
      skill,
      weakTopics,
      wrongAnswers,
    });

    res.status(200).json({
      success: true,
      quiz,
    });

  } catch (error) {
    console.log("AI Practice Quiz Error:", error);

    res.status(500).json({
      success: false,
      message: "AI Practice Quiz failed",
    });
  }
};
