import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function TopicView() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/topics/${topicId}`)
      .then(res => setTopic(res.data));
  }, [topicId]);

  if (!topic) return <p>Loading...</p>;

  return (
    <div className="topic-content">
      <h1>{topic.title}</h1>

      {/* ✅ MARKDOWN RENDER HERE */}
      <ReactMarkdown>
        {topic.markdown}
      </ReactMarkdown>
    </div>
  );
}
