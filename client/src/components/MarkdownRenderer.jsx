import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px"
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
