import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const LoginAdmin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add your admin login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-white px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">QuantumX</h1>
          <p className="text-sm text-gray-500">Management Access Panel</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Management Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            placeholder="admin@quantumx.com"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />

          {/* Password */}
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-sm cursor-pointer text-gray-600 font-medium select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition duration-200"
            onClick={() => window.location.href = 'https://quantumxmanagement.netlify.app'}
          >
            Log In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/SignUpAdmin" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>

          <p className="mt-3 text-center text-sm text-gray-600">
            Not an admin?{" "}
            <Link to="/" className="text-blue-600 font-semibold hover:underline">
              Login as User
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;