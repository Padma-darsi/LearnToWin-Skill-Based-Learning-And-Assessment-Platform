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
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
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


/* ================================= */
/* AI PRACTICE QUIZ */
/* ================================= */

export const generatePracticeQuizAI = async ({
  skill,
  weakTopics = [],
  wrongAnswers = [],
}) => {

  const prompt = `
You are an expert technical assessment question generator.

Your task is to create a personalized practice quiz
based on a student's actual mistakes.

SELECTED SKILL:
${skill}

STUDENT'S ACTUAL WRONG ANSWERS:
${JSON.stringify(wrongAnswers, null, 2)}

RECOMMENDED WEAK TOPICS:
${JSON.stringify(weakTopics, null, 2)}

STRICT CONTENT RULES:

1. Generate exactly 5 NEW multiple-choice questions.

2. Every question MUST belong to the selected skill:
   "${skill}"

3. Analyze the actual wrong answers to identify the
   specific concepts the student does not understand.

4. Prioritize concepts from the actual wrong answers.
   Use recommended weak topics only as additional guidance.

5. Do NOT generate generic programming questions
   unrelated to the selected skill.

6. Do NOT introduce unrelated topics just to generate
   five questions.

7. For example, if the selected skill is Node.js:
   - Questions must test Node.js concepts.
   - Relevant topics may include Node.js modules,
     event loop, asynchronous programming,
     file system, streams, buffers, and Node.js APIs.
   - Do NOT generate generic for-loop, while-loop,
     or variable questions unless they are directly
     relevant to a specific mistake.

8. Create NEW questions. Do not copy the original
   questions or simply change their wording.

9. Questions must test understanding and application,
   not just memorization.

10. Keep questions beginner-friendly.

OUTPUT FORMAT:

Return ONLY a valid JSON array.

[
  {
    "question": "Question text",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "correctAnswer": 0
  }
]

FINAL VALIDATION:

- Exactly 5 questions.
- Exactly 4 options per question.
- correctAnswer must be an integer from 0 to 3.
- Every question must be relevant to ${skill}.
- Every question must target the student's weak concepts.
- No unrelated programming topics.
- No repeated questions.
- Return JSON only.
`;

  const completion =
    await client.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

  const rawText =
    completion.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error("AI returned an empty response");
  }

  const cleanedText = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const quiz = JSON.parse(cleanedText);

  if (
    !Array.isArray(quiz) ||
    quiz.length !== 5 ||
    quiz.some(
      (q) =>
        typeof q.question !== "string" ||
        !Array.isArray(q.options) ||
        q.options.length !== 4 ||
        !Number.isInteger(q.correctAnswer) ||
        q.correctAnswer < 0 ||
        q.correctAnswer > 3
    )
  ) {
    throw new Error("AI returned an invalid quiz format");
  }

  return quiz;
};
