export default function Home() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        marginTop:"100px",
        marginLeft:"350px"
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "45px 54px",
          maxWidth: "680px",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          boxShadow: "0 10px 20px #0e1e65",
            
            
        }}
      >
        <h1
          style={{
            color: "#06103c",
            fontSize: "30px",
            fontWeight: "800",
            marginBottom: "18px",
            letterSpacing: "0.4px",
          }}
        >
          Welcome to Your Learning Dashboard
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#374151",
            lineHeight: "1.9",
            marginBottom: "10px",
          }}
        >
          Select skills from the sidebar to learn structured topics and validate
          your progress through skill-based quizzes.
        </p>

     
      </div>
    </div>
  );
}

