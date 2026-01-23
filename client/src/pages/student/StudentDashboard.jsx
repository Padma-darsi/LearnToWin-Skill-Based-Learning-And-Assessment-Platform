import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

export default function StudentDashboard() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/student/sidebar")
      .then((res) => setSkills(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <div className="student-layout">
        <Sidebar skills={skills} />
        <main className="student-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

