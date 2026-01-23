// src/routes/AdminProtectedRoute.jsx

// src/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // 🔥 THIS WAS MISSING
}
