import React, { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/book"); // Redirect after login
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-700 tracking-wide mb-1">
            QuantumX
          </h1>
          <p className="text-sm text-gray-500">Workspace Booking Platform</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@quantumx.com"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-sm cursor-pointer text-blue-600 font-medium select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
          <br />
          <Link to="/admin" className="mt-2 inline-block text-blue-500 hover:underline font-medium">
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;


/////