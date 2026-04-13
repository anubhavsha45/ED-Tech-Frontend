import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Signup from "./../pages/Signup";
import Courses from "./../pages/Courses";
import ViewCourse from "../pages/ViewCourse";
import StudentDashboard from "./../pages/StudentDashboard";
import ProtectedRoute from "./../components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<ViewCourse />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
