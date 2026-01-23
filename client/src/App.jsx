import { Routes, Route } from "react-router-dom";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/admin/AdminLogin";

/* STUDENT */
import StudentDashboard from "./pages/student/StudentDashboard";
import Home from "./pages/student/Home";
import TopicContent from "./pages/student/TopicContent";
import Quiz from "./pages/student/Quiz";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageTopics from "./pages/admin/ManageTopics";
import ManageQuiz from "./pages/admin/ManageQuiz";
import AdminHome from "./pages/admin/AdminHome"

/* ROUTE GUARDS */
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminProtectedRoute";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* STUDENT */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<Home />} />
          <Route
          path="topic/:topicId"
          element={<TopicContent />}
        />

          {/* ✅ FIXED */}
          <Route path="/student/quiz/:skillId" element={<Quiz />} />
        </Route>
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
           <Route index element={<AdminHome />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="topics" element={<ManageTopics />} />
          <Route path="quiz" element={<ManageQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;





/*

import { Routes, Route } from "react-router-dom";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLogin from "./pages/admin/AdminLogin";


import StudentDashboard from "./pages/student/StudentDashboard";
import Home from "./pages/student/Home";
import TopicContent from "./pages/student/TopicContent";
import Quiz from "./pages/student/Quiz";


import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageTopics from "./pages/admin/ManageTopics";
import ManageQuiz from "./pages/admin/ManageQuiz";


import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      
      <Route element={<ProtectedRoute />}>
        <Route path="/student" element={<StudentDashboard />}>
          <Route index element={<Home />} />
          <Route path="topic/:topicId" element={<TopicContent />} />

          <Route path="quiz/:skillId" element={<Quiz />} />
        </Route>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<h2>Welcome Admin</h2>} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="topics" element={<ManageTopics />} />
          <Route path="quiz" element={<ManageQuiz />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;*/
