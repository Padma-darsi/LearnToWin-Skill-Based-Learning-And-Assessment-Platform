import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function TopicContent() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!topicId) return;

    axiosInstance
      .get(`/student/topic/${topicId}`)
      .then(res => setTopic(res.data))
      .catch(err => console.error("TOPIC ERROR:", err));
  }, [topicId]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((scrollTop / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!topic) return <div className="topic-loading">Loading content…</div>;

  const renderContent = () => {
    const lines = topic.content.split("\n");
    const blocks = [];

    let paragraphBuffer = [];
    let codeBuffer = [];
    let inCodeBlock = false;

    lines.forEach(line => {
      const isCodeLine =
        line.startsWith("    ") ||
        line.startsWith("\t") ||
        line.trim().startsWith("```");

      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          blocks.push({ type: "code", content: codeBuffer.join("\n") });
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          if (paragraphBuffer.length) {
            blocks.push({ type: "text", content: paragraphBuffer.join(" ") });
            paragraphBuffer = [];
          }
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock || isCodeLine) {
        inCodeBlock = true;
        codeBuffer.push(line.replace(/^(\s{4}|\t)/, ""));
      } else if (line.trim() === "") {
        if (paragraphBuffer.length) {
          blocks.push({ type: "text", content: paragraphBuffer.join(" ") });
          paragraphBuffer = [];
        }
      } else {
        paragraphBuffer.push(line.trim());
      }
    });

    if (codeBuffer.length) {
      blocks.push({ type: "code", content: codeBuffer.join("\n") });
    }

    if (paragraphBuffer.length) {
      blocks.push({ type: "text", content: paragraphBuffer.join(" ") });
    }

    return blocks.map((block, index) =>
      block.type === "code" ? (
        <pre key={index} className="code-block">
          <code>{block.content}</code>
        </pre>
      ) : (
        <p key={index} className="topic-text">
          {block.content}
        </p>
      )
    );
  };

  return (
    <>
      <div className="reading-progress">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="topic-wrapper">
        <div className="breadcrumb">
          <span className="active">{topic.title}</span>
        </div>

        <div className="topic-card">
          <h1 className="topic-title">{topic.title}</h1>
          <div className="divider" />
          <div className="topic-body">{renderContent()}</div>
        </div>
      </div>

      <style>{css}</style>
    </>
  );
}

/* ====================== STYLES ====================== */

const css = `
.reading-progress {
  position: fixed;
  top: 64px;
  left: 0;
  height: 4px;
  width: 100%;
  z-index: 999;
}

.progress-fill {
  height: 100%;
  background: #38bdf8;
}

.topic-wrapper {
  margin-top: 96px;
  margin-left: 300px;
  padding: 40px;
  background: #ffffff;
  min-height: calc(100vh - 96px);
}

.topic-card {
  max-width: 2700px;
  margin: auto;
  background: #ffffff;
  padding: 48px 56px;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(6,16,60,0.15);
}

.topic-title {
  font-size: 32px;
  font-weight: 700;
  color: #06103c;
}

.topic-text {
  font-size: 17px;
  line-height: 1.9;
  color: #374151;
  margin-bottom: 22px;
}

.code-block {
  padding: 24px;
  border-radius: 14px;
  margin: 32px 0;
  font-size: 15px;
  overflow-x: auto;
}

/* =========================
   CLEAN RESPONSIVE FIX
========================= */

/* DESKTOP & LAPTOP */
@media (max-width: 1400px) {
  .topic-wrapper {
    margin-left: 300px; /* sidebar width */
  }
}

/* TABLETS */
@media (max-width: 1024px) {
  .topic-wrapper {
    margin-left: 260px; /* tablet sidebar */
    padding: 28px;
  }
}

/* SMALL TABLETS & MOBILE */
@media (max-width: 900px) {
  .topic-wrapper {
    margin-left: 0;
    padding: 22px;
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .topic-wrapper {
    margin-left: 0;
    width: 100%;
    padding: 18px;
  }
}

/* SMALL MOBILE */
@media (max-width: 480px) {
  .topic-wrapper {
    padding: 14px;
  }
}
`;
