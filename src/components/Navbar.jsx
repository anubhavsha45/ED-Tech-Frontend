import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-800">
      <h1 className="text-lg md:text-xl font-bold text-white">Learnify AI</h1>

      <div className="flex gap-4 md:gap-6 items-center text-sm md:text-base">
        <Link to="/" className="text-gray-300 hover:text-white">
          Home
        </Link>
        <Link to="/login" className="text-gray-300 hover:text-white">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-gradient-to-r from-blue-500 to-purple-600 px-3 md:px-4 py-2 rounded-lg text-white"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
