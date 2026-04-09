import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-12 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 max-w-7xl mx-auto">
        {/* LEFT TEXT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Learn Smarter with <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Courses
            </span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-lg mx-auto md:mx-0">
            Generate notes, quizzes, and solve doubts instantly from your
            lectures. One platform to master everything faster.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg text-center"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800 text-center"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
            alt="AI Learning"
            className="w-[250px] md:w-[350px] opacity-90"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-12 py-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-[#121826] p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
          <h3 className="text-lg md:text-xl font-semibold">AI Notes</h3>
          <p className="text-gray-400 mt-3 text-sm">
            Convert lectures into structured, exam-ready notes instantly.
          </p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
          <h3 className="text-lg md:text-xl font-semibold">Smart Quiz</h3>
          <p className="text-gray-400 mt-3 text-sm">
            Generate MCQs automatically and test your knowledge.
          </p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-gray-800 hover:scale-105 transition">
          <h3 className="text-lg md:text-xl font-semibold">AI Doubt Solver</h3>
          <p className="text-gray-400 mt-3 text-sm">
            Ask anything and get answers with lecture context.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-[#0B0F19] to-[#0f172a]">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* CARD 1 */}
          <div className="bg-[#121826] p-8 rounded-2xl border border-gray-800 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2 transition">
            <h3 className="text-xl font-semibold mb-3">1. Create Course</h3>
            <p className="text-gray-400">
              Organize your learning by creating structured courses and topics.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-[#121826] p-8 rounded-2xl border border-gray-800 shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition">
            <h3 className="text-xl font-semibold mb-3">2. Add Lectures</h3>
            <p className="text-gray-400">
              Upload your lecture content and build your knowledge base.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-[#121826] p-8 rounded-2xl border border-gray-800 shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-2 transition">
            <h3 className="text-xl font-semibold mb-3">3. Use AI</h3>
            <p className="text-gray-400">
              Generate notes, quizzes, and solve doubts instantly using AI.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          What Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* TESTIMONIAL 1 */}
          <div className="bg-[#121826] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-300">
              “This platform saved me hours of study time. The AI notes are
              insanely helpful!”
            </p>
            <h4 className="mt-4 font-semibold text-blue-400">– Rahul Sharma</h4>
          </div>

          {/* TESTIMONIAL 2 */}
          <div className="bg-[#121826] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-300">
              “Quiz generation is next level. I prepare for exams much faster
              now.”
            </p>
            <h4 className="mt-4 font-semibold text-purple-400">
              – Ananya Gupta
            </h4>
          </div>

          {/* TESTIMONIAL 3 */}
          <div className="bg-[#121826] p-6 rounded-xl border border-gray-800">
            <p className="text-gray-300">
              “The doubt solver feels like a personal teacher. Amazing
              experience!”
            </p>
            <h4 className="mt-4 font-semibold text-indigo-400">
              – Arjun Verma
            </h4>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
