export default function home() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px 50px",
          maxWidth: "650px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          
            boxShadow: "0 10px 20px #0e1e65",
        }}
      >
        <h1
          style={{
            color: "#06103c",
            fontSize: "30px",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          Welcome to the Admin Panel
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.8",
            marginBottom: "8px",
          }}
        >
          Manage skills, quizzes, and learning content with full administrative
          control and precision.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.8",
          }}
        >
          Monitor, update, and organize the platform to ensure a high-quality
          learning experience.
        </p>
      </div>
    </div>
  );
}
