import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/auth/login",
        { email, password }
      );

      // 🔐 store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ FORCE admin dashboard
      navigate("/admin", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Admin Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

export default AdminLogin;
