import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../pages/student/StudentDashboard";
import TopicContent from "../pages/student/TopicContent";
import Quiz from "../pages/student/Quiz";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="/student" element={<StudentDashboard />}>
        <Route path="topic/:topicId" element={<TopicContent />} />
        <Route path="/student/quiz/:skill" element={<Quiz />} />
      </Route>
    </Routes>
  );
}

