import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/book");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-white flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Brand Logo or Name */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-700 tracking-wide mb-1">
            QuantumX
          </h1>
          <p className="text-sm text-gray-500">Workspace Booking Platform</p>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Log In to Your Space
        </h2>
        
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="you@quantumx.com"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          {/* Password Input */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
        <p className="mt-6 text-center text-sm text-gray-600">
          New to QuantumX?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
        <div className="mt-2 text-center">
          <Link to="/admin/login" className="text-blue-500 hover:underline font-medium">
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;