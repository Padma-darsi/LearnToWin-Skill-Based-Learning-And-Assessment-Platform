import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "./register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axiosInstance.post("/auth/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Floating lights */}
      <div className="floating-light light1"></div>
      <div className="floating-light light2"></div>
      <div className="floating-light light3"></div>
      <div className="floating-light light4"></div>
      <div className="floating-light light5"></div>
      <div className="floating-light light6"></div>
       <div className="floating-light light7"></div>

      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="input-wrapper">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M4 20c0-4 4-6 8-6s8 2 8 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-wrapper">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="6" width="16" height="12" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M4 6l8 7 8-7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-wrapper password-wrapper">
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 11V7a4 4 0 118 0v4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                /* Eye Off */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-.6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                /* Eye */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
            </span>
          </div>

        

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
