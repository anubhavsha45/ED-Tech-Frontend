import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const defaultImages = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1537432376769-00a3f1c4c8d2",
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/enroll");
        setCourses(res.data.data.enrollCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="animate-pulse">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 sm:px-6 md:px-10 py-8 md:py-10">
      {/* 🔥 HERO */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Welcome back 👋
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Continue learning and level up your skills
          </p>

          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            You are enrolled in {courses.length} course
            {courses.length !== 1 && "s"}
          </p>
        </div>

        {/* ✅ FULL WIDTH BUTTON ON MOBILE */}
        <button
          onClick={() => navigate("/courses")}
          className="w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:scale-105 transition-all"
        >
          Explore Courses
        </button>
      </div>

      {/* 🔥 COURSES */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-5">Your Courses</h2>

        {courses.length === 0 ? (
          <div className="text-center py-16 border border-gray-800 rounded-xl bg-gray-900/50">
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              📚 You haven’t enrolled in any course yet
            </p>

            <button
              onClick={() => navigate("/courses")}
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((item) => {
              const course = item.course;

              const image =
                course.image ||
                defaultImages[Math.floor(Math.random() * defaultImages.length)];

              return (
                <div
                  key={item._id}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:scale-[1.03] transition-all"
                >
                  {/* 🔥 IMAGE FIXED RATIO */}
                  <img
                    src={image}
                    alt={course.title}
                    className="w-full h-36 sm:h-40 object-cover"
                  />

                  <div className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                      Enrolled
                    </span>

                    <h3 className="text-base sm:text-lg font-semibold mt-2">
                      {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      👨‍🏫 {course.createdBy?.name || "Unknown"}
                    </p>

                    <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">
                      {course.description || "No description available"}
                    </p>

                    {/* ✅ BUTTON FIX */}
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="mt-4 w-full py-2 text-sm rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 🔥 CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Ready to learn something new? 🚀
        </h3>

        <p className="text-gray-400 text-sm sm:text-base mb-4">
          Expand your skills with our curated content
        </p>

        <button
          onClick={() => navigate("/courses")}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600"
        >
          Browse All Courses
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
