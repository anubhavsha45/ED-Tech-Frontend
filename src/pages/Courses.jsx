import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
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
        const res = await API.get("/course/overview");
        setCourses(res.data.data.courses);
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
        <p className="animate-pulse">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-3 sm:px-6 md:px-10 py-8 md:py-10 overflow-x-hidden">
      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-10 left-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-purple-600/20 blur-[100px] sm:blur-[120px] -translate-x-1/2 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 🔥 HEADER */}
        <div className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Explore Courses 🚀
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Find your next skill and start learning today
          </p>
        </div>

        {/* 🔥 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.map((course) => {
            const image =
              course.image ||
              defaultImages[Math.floor(Math.random() * defaultImages.length)];

            return (
              <div
                key={course._id}
                className="group w-full bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] md:hover:scale-[1.04] hover:shadow-[0_10px_40px_rgba(99,102,241,0.25)]"
              >
                {/* 🔥 IMAGE */}
                <div className="relative overflow-hidden">
                  <img
                    src={image}
                    alt={course.title}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* 🔥 CONTENT */}
                <div className="p-4 flex flex-col justify-between min-h-[180px] sm:min-h-[200px]">
                  <div>
                    {/* Badge */}
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400">
                      Course
                    </span>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold mt-2 group-hover:text-indigo-400 transition">
                      {course.title}
                    </h3>

                    {/* Teacher */}
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      <span className="text-gray-500">by</span>{" "}
                      <span className="text-white font-medium">
                        {course.createdBy?.name || "Unknown"}
                      </span>
                    </p>

                    {/* Description */}
                    <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">
                      {course.description || "No description available"}
                    </p>
                  </div>

                  {/* 🔥 BUTTON */}
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="mt-4 w-full py-2.5 rounded-lg text-sm sm:text-base bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 active:scale-95 md:hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all"
                  >
                    View Course →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🔥 EMPTY STATE */}
        {courses.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-400 text-sm sm:text-base">
              No courses available right now 😔
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
