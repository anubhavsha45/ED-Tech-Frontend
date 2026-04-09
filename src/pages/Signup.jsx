import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="bg-[#0B0F19] min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-[#121826] p-6 md:p-8 rounded-xl w-full max-w-md border border-gray-800 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Create Account 🚀
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-[#0B0F19] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-[#0B0F19] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-[#0B0F19] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* BUTTON */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-medium hover:opacity-90 transition">
          Sign Up
        </button>

        {/* LOGIN LINK */}
        <p className="text-gray-400 mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
