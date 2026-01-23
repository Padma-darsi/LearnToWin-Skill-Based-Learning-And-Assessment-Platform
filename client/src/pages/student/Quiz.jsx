import { useEffect, useState } from "react";
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

  

  /* FETCH QUIZ QUESTIONS */
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



  /* TIMER */
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

  /* START SCREEN */
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

  /* RESULT SCREEN */
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

  /* QUESTION SCREEN */
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
/* ===================== */

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
