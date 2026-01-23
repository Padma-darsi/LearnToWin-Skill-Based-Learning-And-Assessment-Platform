import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="admin-navbar">
        {/* LEFT */}
        <h1 className="brand-name" onClick={() => navigate("/admin")}>
          Learn<span>To</span>Win
        </h1>

        {/* CENTER */}
        <button className="home-btn" onClick={() => navigate("/admin")}>
          Home
        </button>

        {/* RIGHT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <style>{adminNavbarCSS}</style>
    </>
  );
}

/* ================================
   PROFESSIONAL ADMIN NAVBAR CSS
================================ */

const adminNavbarCSS = `
.admin-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background:#06103c;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 32px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

/* BRAND */
.brand-name {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 1px;
  cursor: pointer;
}

.brand-name span {
  color: #38bdf8;
}

/* HOME */
.home-btn {
  justify-self: center;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 8px 22px;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.home-btn:hover {
  background: #ffffff;
  color: #020617;
}

/* LOGOUT */
.logout-btn {
  justify-self: end;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 8px 22px;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.logout-btn:hover {
  background: #ffffff;
  color: #020617;
}

/* ACTIVE PRESS */
.home-btn:active,
.logout-btn:active {
  transform: scale(0.96);
}

/* RESPONSIVE */
@media (max-width: 640px) {
  .brand-name {
    font-size: 18px;
  }

  .home-btn,
  .logout-btn {
    padding: 6px 14px;
    font-size: 13px;
  }
}
`;
