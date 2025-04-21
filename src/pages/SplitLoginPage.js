import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const QuantumXSplitLandingPage = () => {
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
      {/* Left Panel - User Portal */}
      <div 
        className={`relative flex-1 transition-all duration-700 ease-in-out ${
          hoverLeft ? 'md:flex-[1.4]' : hoverRight ? 'md:flex-[0.6]' : 'md:flex-1'
        }`}
        onMouseEnter={() => setHoverLeft(true)}
        onMouseLeave={() => setHoverLeft(false)}
      >
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-20 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className={`relative h-full flex flex-col justify-center px-8 py-16 md:py-0 md:px-12 lg:px-16 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-md mx-auto md:mx-0">
            <div className="inline-block rounded-full bg-white bg-opacity-20 px-5 py-1.5 mb-6 backdrop-blur-sm mt-8">
              <p className="text-sm text-white font-medium">User Portal</p>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Smart Workspace Booking</h2>
            
            <p className="mb-6 text-white text-opacity-90 text-base sm:text-lg">
              Book your ideal workspace with ease. Reserve meeting rooms, co-working spaces, 
              or private desks with our intuitive booking system.
            </p>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-5 mb-6">
              <p className="font-semibold mb-2 text-white">Streamlined User Experience</p>
              <p className="text-white text-opacity-90 text-sm sm:text-base">
                View available spaces, manage your reservations, and make secure payments—all in one place.
              </p>
            </div>
            
            <Link 
              to="/login" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white p-0.5 text-blue-700 shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600"
            >
              <span className="relative flex items-center space-x-2 rounded-full bg-white px-6 py-3 sm:px-8 sm:py-3.5 text-base font-semibold transition-all duration-300 group-hover:bg-opacity-0 group-hover:text-white">
                <span>User Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Admin Portal */}
      <div 
        className={`relative flex-1 transition-all duration-700 ease-in-out ${
          hoverRight ? 'md:flex-[1.4]' : hoverLeft ? 'md:flex-[0.6]' : 'md:flex-1'
        }`}
        onMouseEnter={() => setHoverRight(true)}
        onMouseLeave={() => setHoverRight(false)}
      >
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-36 h-36 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className={`relative h-full flex flex-col justify-center px-8 py-16 md:py-0 md:px-12 lg:px-16 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '150ms' }}>
          <div className="max-w-md mx-auto md:mx-0">
            <div className="inline-block rounded-full bg-white bg-opacity-20 px-5 py-1.5 mb-6 backdrop-blur-sm">
              <p className="text-sm text-white font-medium">Admin Portal</p>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Workspace Management</h2>
            
            <p className="mb-6 text-white text-opacity-90 text-base sm:text-lg">
              Efficiently manage your workspace operations. Oversee bookings, track usage, 
              and get valuable insights all in one dashboard.
            </p>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-5 mb-6">
              <p className="font-semibold mb-2 text-white">Administrative Control</p>
              <p className="text-white text-opacity-90 text-sm sm:text-base">
                Approve bookings, manage users, and view analytics to optimize your workspace utilization.
              </p>
            </div>
            
            <Link 
              to="/admin/login" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white p-0.5 text-purple-700 shadow-md transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600"
            >
              <span className="relative flex items-center space-x-2 rounded-full bg-white px-6 py-3 sm:px-8 sm:py-3.5 text-base font-semibold transition-all duration-300 group-hover:bg-opacity-0 group-hover:text-white">
                <span>Admin Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Logo Overlay */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">QuantumX</h1>
          <p className="text-sm text-white text-opacity-90">Workspace Management Platform</p>
        </div>
      </div>
    </div>
  );
};

export default QuantumXSplitLandingPage;