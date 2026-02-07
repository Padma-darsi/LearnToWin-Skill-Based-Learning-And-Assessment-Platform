import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import './register.css'; // using same styles as register page

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/auth/login",
        { email, password }
      );

      console.log("LOGIN RESPONSE:", res.data);

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
    <div className="auth-container">
      {/* Floating bubbles */}
      <div className="floating-light light1"></div>
      <div className="floating-light light2"></div>
      <div className="floating-light light3"></div>
      <div className="floating-light light4"></div>
      <div className="floating-light light5"></div>
      <div className="floating-light light6"></div>
      <div className="floating-light light7"></div>

      <div className="auth-card">
        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="input-wrapper">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="2" />
                <path d="M4 6l8 7 8-7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-wrapper password-wrapper">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                // Eye Off
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                  <path d="M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-.6" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                // Eye
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </span>
          </div>

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <span onClick={() => navigate("/register")} style={{cursor: "pointer"}}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
