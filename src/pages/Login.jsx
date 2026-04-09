import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-[#0B0F19] min-h-screen flex items-center justify-center px-4 text-white">
      <div className="bg-[#121826] p-6 md:p-8 rounded-xl w-full max-w-md border border-gray-800">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-[#0B0F19] border border-gray-700 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-[#0B0F19] border border-gray-700 rounded"
        />

        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg">
          Login
        </button>

        <p className="text-gray-400 mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
