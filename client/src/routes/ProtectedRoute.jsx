import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { token, user } = useSelector((state) => state.auth);

  // ❌ BEFORE: wrong role check
  // ✅ NOW: correct check
  if (!token || !user || user.role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
