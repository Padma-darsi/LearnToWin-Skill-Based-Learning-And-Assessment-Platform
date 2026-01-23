import { Outlet, Link } from "react-router-dom";
import "./admin.css";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  return (
    <>
      <AdminNavbar />

      <div className="admin-panel">
        <aside className="admin-sidebar">
          <h2 className="sidebar-title">Admin Panel</h2>

          <nav className="sidebar-links">
            <Link to="skills">Skills</Link>
            <Link to="topics">Topics</Link>
            <Link to="quiz">Quiz</Link>
          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

