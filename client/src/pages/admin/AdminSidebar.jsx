import React from "react";
import "./Sidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">

        <h3 className="sidebar-heading">⚙️ Admin</h3>

        <div className="menu-item">Dashboard</div>
        <div className="menu-item">Manage Skills</div>
        <div className="menu-item">Manage Topics</div>

      </div>
    </aside>
  );
};

export default AdminSidebar;
