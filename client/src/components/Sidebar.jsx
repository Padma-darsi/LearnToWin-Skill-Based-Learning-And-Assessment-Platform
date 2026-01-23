import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; 


import "./Sidebar.css";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const [sidebar, setSidebar] = useState([]);
  const [openSkill, setOpenSkill] = useState(null);
  const [openConcepts, setOpenConcepts] = useState(null);

  const navigate = useNavigate();
 


  useEffect(() => {
    const loadSidebar = async () => {
      const res = await axiosInstance.get(
        "/student/sidebar"
      );
      setSidebar(Array.isArray(res.data) ? res.data : []);
    };
    loadSidebar();
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Learning Path</h3>

      {sidebar.map(skill => (
        <div key={skill._id} className="skill">

          <div
            className="skill-title"
            onClick={() =>
              setOpenSkill(openSkill === skill._id ? null : skill._id)
            }
          >
            <span className="arrow">
              {openSkill === skill._id ? "▼" : "▶"}
            </span>
            {skill.title}
          </div>

          {openSkill === skill._id && (
            <div className="skill-content">

              <div
                className="concepts-title"
                onClick={() =>
                  setOpenConcepts(
                    openConcepts === skill._id ? null : skill._id
                  )
                }
              >
                <span className="arrow">
                  {openConcepts === skill._id ? "▼" : "▶"}
                </span>
                Concepts
              </div>

              {openConcepts === skill._id && (
                <ul className="topics">
                  {skill.topics.length === 0 ? (
                    <li className="empty">No topics yet</li>
                  ) : (
                    skill.topics.map(topic => (
                      <li key={topic._id} className="topic-item" onClick={() => navigate(`/student/topic/${topic._id}`)}>
                        ▶ {topic.title}
                      </li>
                    ))
                  )}
                </ul>
              )}

              
              

              <div
  className="quiz"
  onClick={() => navigate(`/student/quiz/${skill._id}`)}
>
  ▶ Quiz
</div>

            </div>
          )}
        </div>
      ))}
    </aside>
  );
}












/*import { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const [sidebar, setSidebar] = useState([]);
  const [openSkill, setOpenSkill] = useState(null);
  const [openConcepts, setOpenConcepts] = useState(null);

  const navigate = useNavigate();
 


  useEffect(() => {
    const loadSidebar = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/student/sidebar"
      );
      setSidebar(Array.isArray(res.data) ? res.data : []);
    };
    loadSidebar();
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Learning Path</h3>

      {sidebar.map(skill => (
        <div key={skill._id} className="skill">

          <div
            className="skill-title"
            onClick={() =>
              setOpenSkill(openSkill === skill._id ? null : skill._id)
            }
          >
            <span className="arrow">
              {openSkill === skill._id ? "▼" : "▶"}
            </span>
            {skill.name}
          </div>

          {openSkill === skill._id && (
            <div className="skill-content">

              <div
                className="concepts-title"
                onClick={() =>
                  setOpenConcepts(
                    openConcepts === skill._id ? null : skill._id
                  )
                }
              >
                <span className="arrow">
                  {openConcepts === skill._id ? "▼" : "▶"}
                </span>
                Concepts
              </div>

              {openConcepts === skill._id && (
                <ul className="topics">
                  {skill.topics.length === 0 ? (
                    <li className="empty">No topics yet</li>
                  ) : (
                    skill.topics.map(topic => (
                      <li key={topic._id} className="topic-item" onClick={() => navigate(`/student/topic/${topic._id}`)}>
                        ▶ {topic.title}
                      </li>
                    ))
                  )}
                </ul>
              )}

              
              

              <div
  className="quiz"
  onClick={() => navigate(`/student/quiz/${skill._id}`)}
>
  ▶ Quiz
</div>

            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
*/