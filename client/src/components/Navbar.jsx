import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="student-navbar">
       
        <h1 className="brand-name" onClick={() => navigate("/student")}>
          Learn<span>To</span>Win
        </h1>

        <button className="home-btn" onClick={() => navigate("/student")}>
          Home
        </button>

        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <style>{studentNavbarCSS}</style>
    </>
  );
}



const studentNavbarCSS = `
.student-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #06103c;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 32px;
  z-index: 1000;
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
}


.brand-name {
  font-size: 22px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 1px;
  cursor: pointer;
}

.brand-name span {
  color: #38bdf8;
}


.home-btn {
  justify-self: center;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.45);
  padding: 8px 24px;
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


.logout-btn {
  justify-self: end;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.45);
  padding: 8px 24px;
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

.home-btn:active,
.logout-btn:active {
  transform: scale(0.96);
}

/* ================================
   RESPONSIVE MEDIA QUERIES
================================ */

/* TABLETS */
@media (max-width: 1024px) {
  .student-navbar {
    padding: 0 20px;
    height: 60px;
  }

  .brand-name {
    font-size: 20px;
  }

  .home-btn,
  .logout-btn {
    padding: 6px 18px;
    font-size: 13px;
  }
}

/* MOBILE DEVICES */
@media (max-width: 768px) {
  .student-navbar {
    grid-template-columns: auto auto auto;
    padding: 0 14px;
    height: 58px;
  }

  .brand-name {
    font-size: 18px;
  }

  .home-btn,
  .logout-btn {
    padding: 6px 14px;
    font-size: 12px;
    border-radius: 6px;
  }
}

/* SMALL MOBILE (VERY COMPACT) */
@media (max-width: 480px) {
  .student-navbar {
    padding: 0 10px;
    height: 56px;
  }

  .brand-name {
    font-size: 16px;
    letter-spacing: 0.5px;
  }

  .home-btn,
  .logout-btn {
    padding: 5px 12px;
    font-size: 11px;
  }
}

`;


