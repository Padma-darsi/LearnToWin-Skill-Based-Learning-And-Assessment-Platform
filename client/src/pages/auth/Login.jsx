
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    console.log("LOGIN RESPONSE:", res.data);

    // save auth in redux
    dispatch(loginSuccess(res.data));

    const role = res.data.user.role;

    if (role === "student") {
      navigate("/student");
    } else if (role === "admin") {
      navigate("/admin");
    }

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.text}>
          Don't have an account? <span style={styles.link} onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: " #0e1e65 ",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: " white",
    boxShadow: "0 10px 20px #0e1e65",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#2563eb",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
