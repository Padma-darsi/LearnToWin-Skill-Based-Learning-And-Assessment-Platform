import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ReactMarkdown from "react-markdown";

function Concepts({ selectedTopic }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!selectedTopic) return;

    axiosInstance.get(`/topics/${selectedTopic}`)
      .then(res => setContent(res.data.content))
      .catch(err => console.log(err));
  }, [selectedTopic]);

  return (
    <div className="concept-content">
      {content ? <ReactMarkdown>{content}</ReactMarkdown> : <p>Select a topic to view content</p>}
    </div>
  );
}

export default Concepts;
