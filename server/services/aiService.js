import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

/* ================================= */
/* AI ANALYSIS */
/* ================================= */

export const generateAIAnalysis =
  async (wrongAnswers) => {

    const prompt = `
You are an AI learning assistant.

Return ONLY valid JSON array.

Do not return markdown.
Do not return explanation outside JSON.
Do not use triple backticks.

JSON format:

[
  {
    "question": "",
    "yourAnswer": "",
    "correctAnswer": "",
    "explanation": "",
    "whyOthersWrong": "",
    "interviewTip": "",
    "improvementTip": "",
    "recommendedTopics": ["", "", ""]
  }
]

Analyze these wrong quiz answers:

${JSON.stringify(wrongAnswers, null, 2)}

For every question provide:
- beginner friendly explanation
- why answer is wrong
- why correct answer is correct
- interview insight
- improvement tip
- recommended topics
`;

    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const rawText =
      completion.choices[0].message.content;

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);

  };

/* ================================= */
/* AI PRACTICE QUIZ */
/* ================================= */

export const generatePracticeQuizAI =
  async ({
    skill,
    weakTopics,
  }) => {

    const prompt = `
You are an AI quiz generator.

Generate 5 NEW multiple choice questions.

Skill:
${skill}

Focus ONLY on these weak topics:
${weakTopics.join("\n")}

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- No extra text
- No triple backticks

JSON format:

[
  {
    "question": "",
    "options": [
      "",
      "",
      "",
      ""
    ],
    "correctAnswer": 0
  }
]

Rules:
- Exactly 4 options
- correctAnswer must be option index
- Questions must be beginner friendly
- Questions must test understanding
`;

    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const rawText =
      completion.choices[0].message.content;

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);

  };