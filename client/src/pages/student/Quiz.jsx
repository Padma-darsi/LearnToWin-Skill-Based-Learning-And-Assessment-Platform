/*import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

export default function Quiz() {
  const { skillId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [skillTitle, setSkillTitle] = useState("Skill");

  

  /* FETCH QUIZ QUESTIONS 
  useEffect(() => {
    axiosInstance
      .get(`/quiz/skill/${skillId}`)
      .then(res => setQuestions(res.data))
      .catch(() => alert("Quiz not available"));
  }, [skillId]);



  


useEffect(() => {
  if (questions.length > 0) {
    // option 1 (nested skill object)
    setSkillTitle(
      questions[0]?.skill?.title ||
      questions[0]?.skillTitle ||
      "Skill"
    );
  }
}, [questions]);



  /* TIMER 
  useEffect(() => {
    if (!started || showResult) return;

    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, started]);

  if (!questions.length) {
    return <p className="quiz-loading">Loading quiz...</p>;
  }

  /* START SCREEN 
  if (!started) {
    return (
      <div className="quiz-page">
        <div className="quiz-card center">
          <h2 className="quiz-title">
            {skillTitle} Assessment
          </h2>

          <p className="quiz-subtitle">
            This test contains {questions.length} questions
          </p>

          <button className="primary-btn" onClick={() => setStarted(true)}>
            Start Quiz
          </button>
        </div>

        <style>{quizCSS}</style>
      </div>
    );
  }

  /* RESULT SCREEN 
  if (showResult) {
    const correct = questions.filter(
      (q, i) => q.options[q.correctAnswer] === answers[i]
    ).length;

    const wrong = questions.length - correct;

    return (
      <div className="quiz-page">
        <div className="quiz-card center">
          <h2 className="quiz-title">Quiz Completed 🎉</h2>

          <div className="result-box">
            <p>Total Questions: <strong>{questions.length}</strong></p>
            <p className="success">Correct: {correct}</p>
            <p className="error">Wrong: {wrong}</p>
            <h3 className="score">
              Score: {correct}/{questions.length}
            </h3>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/student")}
          >
            Go to Home
          </button>
        </div>

        <style>{quizCSS}</style>
      </div>
    );
  }

  /* QUESTION SCREEN 
  const question = questions[current];

  const handleSelect = (opt) => {
    setSelected(opt);
  };

  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = selected || null;
    setAnswers(updatedAnswers);
    setSelected("");

    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-header">
          <span>
            Question {current + 1} / {questions.length}
          </span>
          <span className="timer">⏱ {timeLeft}s</span>
        </div>

        <h3 className="question-text">{question.question}</h3>

        <div className="options">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`option-btn ${selected === opt ? "selected" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          className="primary-btn full"
          onClick={handleNext}
          disabled={!selected}
        >
          {current === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </div>

      <style>{quizCSS}</style>
    </div>
  );
}

/* ===================== */
/* 🎨 PROFESSIONAL CSS   */
/* ===================== 

const quizCSS = `
.quiz-page {
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  padding: 20px;
  margin-left:300px;
}

.quiz-card {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 10px 20px #0e1e65;
}

.center {
  text-align: center;
}

.quiz-title {
  color: #0e1e65;
  font-size: 26px;
  margin-bottom: 10px;
}

.quiz-subtitle {
  color: #0e1e65;
  margin-bottom: 25px;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: #0e1e65;
  font-weight: 600;
}

.timer {
  color: #1e3a8a;
}

.question-text {
  font-size: 20px;
  color: #020617;
  margin-bottom: 20px;
}

.options {
  margin-bottom: 20px;
}

.option-btn {
  width: 100%;
  text-align: left;
  padding: 12px 15px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #cbd5f5;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-btn:hover {
  background: #eef2ff;
}

.option-btn.selected {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}

.primary-btn {
  background: #0e1e65;
  color: #ffffff;
  border: none;
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.primary-btn.full {
  width: 100%;
}

.quiz-loading {
  padding: 40px;
  text-align: center;
}
`;
*/
 import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

export default function Quiz() {
  const { skillId } = useParams();

  const navigate = useNavigate();

  const timerRef = useRef(null);

  const [questions, setQuestions] = useState([]);

  const [started, setStarted] =
    useState(false);

  const [current, setCurrent] =
    useState(0);

  const [selected, setSelected] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState(15);

  const [showResult, setShowResult] =
    useState(false);

  const [skillTitle, setSkillTitle] =
    useState("Skill");

  // AI STATES

  const [aiAnalysis, setAiAnalysis] =
    useState([]);

  const [loadingAI, setLoadingAI] =
    useState(false);

  // AI QUIZ STATES

  const [loadingAIQuiz, setLoadingAIQuiz] =
    useState(false);

  const [isAIQuiz, setIsAIQuiz] =
    useState(false);

  /* FETCH QUIZ */

  useEffect(() => {
    axiosInstance
      .get(`/quiz/skill/${skillId}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch(() => {
        alert("Quiz not available");
      });
  }, [skillId]);

  /* SET SKILL TITLE */

  useEffect(() => {
    if (questions.length > 0) {
      setSkillTitle(
        questions[0]?.skill?.title ||
          questions[0]?.skillTitle ||
          "Skill"
      );
    }
  }, [questions]);

  /* TIMER */

  useEffect(() => {
    if (
      !started ||
      showResult ||
      questions.length === 0
    ) {
      return;
    }

    clearInterval(timerRef.current);

    setTimeLeft(15);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          handleNext(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () =>
      clearInterval(timerRef.current);

  }, [current, started, showResult]);

  /* LOADING */

  if (!questions.length) {
    return (
      <p className="quiz-loading">
        Loading quiz...
      </p>
    );
  }

  /* START SCREEN */

  if (!started) {
    return (
      <div className="quiz-page">
        <div className="quiz-card center">

          <div className="quiz-badge">
            {isAIQuiz
              ? "🤖 AI Generated Quiz"
              : "📘 Admin Quiz"}
          </div>

          <h2 className="quiz-title">
            {skillTitle} Assessment
          </h2>

          <p className="quiz-subtitle">
            This test contains{" "}
            {questions.length} questions
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              setStarted(true)
            }
          >
            {isAIQuiz
              ? "Start AI Quiz"
              : "Start Quiz"}
          </button>
        </div>

        <style>{quizCSS}</style>
      </div>
    );
  }

  /* AI ANALYSIS */

  const handleAIAnalysis = async (
    wrongAnswers
  ) => {
    try {
      setLoadingAI(true);

      const response =
        await axiosInstance.post(
          "/ai/analyze-quiz",
          {
            wrongAnswers,
          }
        );

      setAiAnalysis(
        response.data.analysis
      );

    } catch (error) {

      console.log(error);

      alert("AI analysis failed");

    } finally {

      setLoadingAI(false);

    }
  };

  /* GENERATE AI QUIZ */

  const handleGenerateAIQuiz =
    async () => {

      try {

        setLoadingAIQuiz(true);

        const weakTopics =
          aiAnalysis.flatMap(
            (item) =>
              item.recommendedTopics || []
          );

        const response =
          await axiosInstance.post(
            "/ai/generate-practice-quiz",
            {
              skill: skillTitle,
              weakTopics,
            }
          );

        const aiQuiz =
          response.data.quiz;

        clearInterval(timerRef.current);

        // IMPORTANT RESETS

        setQuestions(aiQuiz);

        setCurrent(0);

        setSelected("");

        setAnswers([]);

        setShowResult(false);

        setAiAnalysis([]);

        setTimeLeft(15);

        setStarted(false);

        setIsAIQuiz(true);

      } catch (error) {

        console.log(error);

        alert(
          "AI quiz generation failed"
        );

      } finally {

        setLoadingAIQuiz(false);

      }
    };

  /* RESULT SCREEN */

  if (showResult) {

    const wrongAnswers =
      questions
        .map((q, i) => ({
          question: q.question,

          selectedAnswer:
            answers[i],

          correctAnswer:
            q.options[
              q.correctAnswer
            ],

          options: q.options,
        }))
        .filter(
          (q) =>
            q.selectedAnswer !==
            q.correctAnswer
        );

    const correct =
      questions.length -
      wrongAnswers.length;

    const wrong =
      wrongAnswers.length;

    return (
      <div className="quiz-page">
        <div className="quiz-card center">

          <div className="quiz-badge result-badge">
            {isAIQuiz
              ? "🤖 AI Generated Quiz"
              : "📘 Admin Quiz"}
          </div>

          <h2 className="quiz-title">
            {isAIQuiz
              ? "AI Quiz Completed 🤖"
              : "Quiz Completed 🎉"}
          </h2>

          <div className="result-box">

            <p>
              Total Questions:
              <strong>
                {" "}
                {questions.length}
              </strong>
            </p>

            <p className="success">
              Correct: {correct}
            </p>

            <p className="error">
              Wrong: {wrong}
            </p>

            <h3 className="score">
              Score: {correct}/
              {questions.length}
            </h3>

          </div>

          {/* WRONG ANSWERS */}

          {wrongAnswers.length > 0 && (

            <div className="wrong-answer-section">

              <h3 className="wrong-title">
                Wrong Answers Review
              </h3>

              {wrongAnswers.map(
                (item, index) => (

                  <div
                    key={index}
                    className="wrong-card"
                  >

                    <p>
                      <strong>
                        Question:
                      </strong>{" "}
                      {item.question}
                    </p>

                    <p className="selected-answer">
                      <strong>
                        Your Answer:
                      </strong>{" "}
                      {item.selectedAnswer ||
                        "Not Answered"}{" "}
                      ❌
                    </p>

                    <p className="correct-answer">
                      <strong>
                        Correct Answer:
                      </strong>{" "}
                      {
                        item.correctAnswer
                      }{" "}
                      ✅
                    </p>

                  </div>
                )
              )}

              <button
                className="ai-btn"
                onClick={() =>
                  handleAIAnalysis(
                    wrongAnswers
                  )
                }
                disabled={loadingAI}
              >
                {loadingAI
                  ? "Analyzing..."
                  : "✨ Analyze Wrong Answers with AI"}
              </button>

            </div>
          )}

          {/* AI ANALYSIS */}

          {aiAnalysis.length > 0 && (

            <div className="ai-analysis-box">

              <h2 className="ai-heading">
                AI Learning Assistant
              </h2>

              <div className="ai-analysis-container">

                {aiAnalysis.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="ai-card"
                    >

                      <h3 className="ai-question">
                        {item.question}
                      </h3>

                      <div className="answer-row">

                        <p className="wrong-answer">
                          Your Answer:{" "}
                          {
                            item.yourAnswer
                          }
                        </p>

                        <p className="correct-answer">
                          Correct Answer:{" "}
                          {
                            item.correctAnswer
                          }
                        </p>

                      </div>

                      <div className="ai-section">
                        <h4>
                          💡 AI Explanation
                        </h4>

                        <p>
                          {
                            item.explanation
                          }
                        </p>
                      </div>

                      <div className="ai-section">
                        <h4>
                          🧠 Why Others Are Wrong
                        </h4>

                        <p>
                          {
                            item.whyOthersWrong
                          }
                        </p>
                      </div>

                      <div className="ai-section">
                        <h4>
                          🎯 Interview Tip
                        </h4>

                        <p>
                          {
                            item.interviewTip
                          }
                        </p>
                      </div>

                      <div className="ai-section">
                        <h4>
                          📈 Improvement Tip
                        </h4>

                        <p>
                          {
                            item.improvementTip
                          }
                        </p>
                      </div>

                      <div className="ai-section">

                        <h4>
                          📚 Recommended Topics
                        </h4>

                        <ul>
                          {item.recommendedTopics?.map(
                            (
                              topic,
                              i
                            ) => (
                              <li key={i}>
                                {topic}
                              </li>
                            )
                          )}
                        </ul>

                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* BUTTONS */}

          <div className="button-group">

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/student")
              }
            >
              Go to Home
            </button>

            {wrongAnswers.length > 0 && (

              <button
                className="ai-quiz-btn"
                onClick={
                  handleGenerateAIQuiz
                }
                disabled={
                  loadingAIQuiz
                }
              >
                {loadingAIQuiz
                  ? "Generating AI Quiz..."
                  : "🤖 Attempt AI Quiz"}
              </button>

            )}

          </div>

        </div>

        <style>{quizCSS}</style>
      </div>
    );
  }

  /* CURRENT QUESTION */

  const question = questions[current];

  /* SELECT OPTION */

  const handleSelect = (opt) => {
    setSelected(opt);
  };

  /* NEXT QUESTION */

  const handleNext = (
    autoSubmit = false
  ) => {

    clearInterval(timerRef.current);

    const updatedAnswers = [
      ...answers,
    ];

    updatedAnswers[current] =
      selected || null;

    setAnswers(updatedAnswers);

    // LAST QUESTION

    if (
      current ===
      questions.length - 1
    ) {

      setShowResult(true);

      return;
    }

    // NEXT QUESTION

    setCurrent((prev) => prev + 1);

    setSelected("");

    setTimeLeft(15);
  };

  return (
    <div className="quiz-page">

      <div className="quiz-card">

        <div className="quiz-top">

          <div className="quiz-type">
            {isAIQuiz
              ? "🤖 AI Generated Quiz"
              : "📘 Admin Quiz"}
          </div>

          <div className="quiz-header">

            <span>
              Question {current + 1} /{" "}
              {questions.length}
            </span>

            <span className="timer">
              ⏱ {timeLeft}s
            </span>

          </div>
        </div>

        <h3 className="question-text">
          {question.question}
        </h3>

        <div className="options">

          {question.options.map(
            (opt, i) => (

              <button
                key={i}
                onClick={() =>
                  handleSelect(opt)
                }
                className={`option-btn ${
                  selected === opt
                    ? "selected"
                    : ""
                }`}
              >
                {opt}
              </button>
            )
          )}
        </div>

        <button
          className="primary-btn full"
          onClick={() =>
            handleNext(false)
          }
        >
          {current ===
          questions.length - 1
            ? "Submit"
            : "Next"}
        </button>

      </div>

      <style>{quizCSS}</style>
    </div>
  );
}

/* CSS */

const quizCSS = `
.quiz-page{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#f8fafc;
  padding:20px;
  margin-left:300px;
}

.quiz-card{
  width:100%;
  max-width:900px;
  background:white;
  padding:30px;
  border-radius:16px;
  box-shadow:0 10px 20px rgba(0,0,0,0.1);
}

.center{
  text-align:center;
}

.quiz-badge{
  display:inline-block;
  padding:8px 16px;
  border-radius:999px;
  background:#e0e7ff;
  color:#1e3a8a;
  font-weight:600;
  margin-bottom:20px;
}

.result-badge{
  margin-bottom:10px;
}

.quiz-type{
  display:inline-block;
  background:#ede9fe;
  color:#6d28d9;
  padding:8px 14px;
  border-radius:999px;
  font-size:14px;
  font-weight:600;
  margin-bottom:20px;
}

.quiz-title{
  color:#0e1e65;
}

.quiz-subtitle{
  margin-top:10px;
}

.quiz-top{
  margin-bottom:20px;
}

.quiz-header{
  display:flex;
  justify-content:space-between;
  margin-top:10px;
  font-weight:bold;
}

.timer{
  color:#dc2626;
}

.question-text{
  margin-bottom:20px;
  font-size:22px;
  line-height:1.5;
}

.option-btn{
  width:100%;
  margin-bottom:12px;
  padding:14px;
  border-radius:10px;
  border:1px solid #cbd5e1;
  background:white;
  cursor:pointer;
  text-align:left;
  transition:0.2s;
  font-size:15px;
}

.option-btn:hover{
  background:#eef2ff;
}

.option-btn.selected{
  background:#1e3a8a;
  color:white;
}

.primary-btn{
  background:#0e1e65;
  color:white;
  border:none;
  padding:12px 20px;
  border-radius:10px;
  cursor:pointer;
  font-size:16px;
  transition:0.2s;
}

.primary-btn:hover{
  opacity:0.9;
}

.full{
  width:100%;
}

.result-box{
  margin-top:20px;
}

.success{
  color:green;
  font-weight:bold;
}

.error{
  color:red;
  font-weight:bold;
}

.score{
  margin-top:15px;
}

.wrong-answer-section{
  margin-top:30px;
}

.wrong-card{
  background:#f8fafc;
  padding:15px;
  border-radius:12px;
  margin-bottom:15px;
  text-align:left;
}

.ai-btn{
  margin-top:20px;
  background:#7c3aed;
  color:white;
  border:none;
  padding:12px 20px;
  border-radius:10px;
  cursor:pointer;
}

.ai-quiz-btn{
  background:#0f766e;
  color:white;
  border:none;
  padding:12px 20px;
  border-radius:10px;
  cursor:pointer;
}

.button-group{
  display:flex;
  gap:20px;
  justify-content:center;
  margin-top:30px;
  flex-wrap:wrap;
}

.ai-analysis-box{
  margin-top:40px;
  text-align:left;
}

.ai-heading{
  margin-bottom:20px;
  color:#6d28d9;
}

.ai-card{
  background:white;
  padding:20px;
  border-radius:14px;
  margin-bottom:20px;
  border:1px solid #e2e8f0;
}

.ai-question{
  margin-bottom:20px;
}

.answer-row{
  display:flex;
  gap:20px;
  flex-wrap:wrap;
  margin-bottom:20px;
}

.wrong-answer{
  background:#fee2e2;
  padding:10px;
  border-radius:8px;
}

.correct-answer{
  background:#dcfce7;
  padding:10px;
  border-radius:8px;
}

.ai-section{
  margin-bottom:18px;
}

.ai-section h4{
  margin-bottom:8px;
  color:#1e3a8a;
}

.quiz-loading{
  padding:40px;
  text-align:center;
  font-size:20px;
}

@media(max-width:768px){

  .quiz-page{
    margin-left:0;
    padding:15px;
  }

  .quiz-card{
    padding:20px;
  }

  .question-text{
    font-size:18px;
  }

  .button-group{
    flex-direction:column;
  }

  .primary-btn,
  .ai-quiz-btn{
    width:100%;
  }
}
`;