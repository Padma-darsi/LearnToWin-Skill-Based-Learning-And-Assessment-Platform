import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function ManageQuiz() {
  const [skills, setSkills] = useState([]);
  const [skillId, setSkillId] = useState("");

  const [quizList, setQuizList] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  /* ================= LOAD SKILLS ================= */
  useEffect(() => {
    axiosInstance
      .get("/admin/skills")
      .then(res => setSkills(res.data))
      .catch(() => alert("Failed to load skills"));
  }, []);

  /* ================= LOAD QUIZZES BY SKILL ================= */
  useEffect(() => {
    if (!skillId) {
      setQuizList([]);
      return;
    }

    axiosInstance
      .get(`/admin/quiz/skill/${skillId}`)
      .then(res => setQuizList(res.data))
      .catch(() => setQuizList([]));
  }, [skillId]);

  /* ================= ADD QUIZ ================= */
  const addQuiz = async () => {
    if (!skillId) {
      alert("Please select a skill");
      return;
    }

    if (!form.question.trim()) {
      alert("Question is required");
      return;
    }

    try {
      await axiosInstance.post("/quiz", {
        skillId,
        ...form,
      });

      alert("✅ Quiz added successfully");

      setForm({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });

      const res = await axiosInstance.get(`/admin/quiz/skill/${skillId}`);
      setQuizList(res.data);

    } catch (err) {
      alert("❌ Failed to add quiz");
    }
  };

  /* ================= DELETE QUIZ ================= */
  const handleDelete = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await axiosInstance.delete(`/quiz/${quizId}`);
      setQuizList(prev => prev.filter(q => q._id !== quizId));
    } catch {
      alert("❌ Delete failed");
    }
  };

  /* ================= EDIT QUIZ ================= */
  const handleEdit = (quiz) => {
    setEditingQuiz(quiz);
    setForm({
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
    });
  };

  /* ================= UPDATE QUIZ ================= */
  const updateQuiz = async () => {
    try {
      await axiosInstance.put(`/quiz/${editingQuiz._id}`, form);

      alert("✅ Quiz updated");

      setEditingQuiz(null);
      setForm({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });

      const res = await axiosInstance.get(`/admin/quiz/skill/${skillId}`);
      setQuizList(res.data);

    } catch {
      alert("❌ Update failed");
    }
  };

  return (
    <div className="manage-quiz-wrapper" style={{ padding: "20px" }}>
      <h2>Manage Quiz</h2>

      {/* ================= SKILL SELECT ================= */}
      <select
        value={skillId}
        onChange={e => setSkillId(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px" }}
      >
        <option value="">Select Skill</option>
        {skills.map(skill => (
          <option key={skill._id} value={skill._id}>
            {skill.title}
          </option>
        ))}
      </select>

      {/* ================= QUIZ FORM ================= */}
      <div className="quiz-form-box" style={{ marginBottom: "20px" }}>
        <input
          placeholder="Question"
          value={form.question}
          onChange={e => setForm({ ...form, question: e.target.value })}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        {form.options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={e => {
              const options = [...form.options];
              options[i] = e.target.value;
              setForm({ ...form, options });
            }}
            style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          />
        ))}

        <select
          value={form.correctAnswer}
          onChange={e =>
            setForm({ ...form, correctAnswer: Number(e.target.value) })
          }
          style={{ padding: "8px", marginBottom: "10px" }}
        >
          <option value={0}>Correct: Option 1</option>
          <option value={1}>Correct: Option 2</option>
          <option value={2}>Correct: Option 3</option>
          <option value={3}>Correct: Option 4</option>
        </select>

        <br />

        <button onClick={editingQuiz ? updateQuiz : addQuiz}>
          {editingQuiz ? "Update Quiz" : "Add Quiz"}
        </button>

        {editingQuiz && (
          <button
            onClick={() => {
              setEditingQuiz(null);
              setForm({
                question: "",
                options: ["", "", "", ""],
                correctAnswer: 0,
              });
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ================= QUIZ TABLE ================= */}
      {quizList.length > 0 && (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizList.map(q => (
              <tr key={q._id}>
                <td>{q.question}</td>
                <td>{q.options[q.correctAnswer]}</td>
                <td>
                  <button onClick={() => handleEdit(q)}>Edit</button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= PROFESSIONAL CSS ================= */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Inter", system-ui, sans-serif;
        }

        .manage-quiz-wrapper {
          max-width: 1000px;
          margin: 30px auto;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(6, 16, 60, 0.15);
          border: 1px solid rgba(6, 16, 60, 0.08);
          
        }

        .manage-quiz-wrapper h2 {
          font-size: 26px;
          font-weight: 700;
          color: #06103c;
          margin-bottom: 24px;
          border-left: 5px solid #4f46e5;
          padding-left: 14px;
        }

        .quiz-form-box {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid rgba(6, 16, 60, 0.06);
        }

        table {
          border-collapse: collapse;
          margin-top: 24px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(6, 16, 60, 0.08);
        }

        thead th {
          background: #06103c;
          color: #ffffff;
          font-weight: 600;
        }

        tbody tr:hover {
          background: #eef2ff;
        }

        button {
          background: #06103c;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        button:hover {
          background: #4f46e5;
        }

        button:last-child {
          background:  #06103c;
        }

        button:last-child:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}
