// File: src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FloorPlan from '../components/FloorPlan';
import SeatGrid from '../components/SeatGrid';
import SeatList from '../components/SeatList';
import Calendar from '../components/Calendar';
import UserProfile from '../components/UserProfile';

const BookingPage = () => {
  const [view, setView] = useState('map'); // 'day', 'month', 'grid', 'list', 'map'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('WORKSPACE HUB');
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showTimes, setShowTimes] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sample user data
  const user = {
    name: 'John Doe',
    profileImage: '/api/placeholder/40/40'
  };

  const locations = ['WORKSPACE HUB', 'SOUTH WING', 'NORTH WING', 'EXECUTIVE FLOOR'];
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const tags = ['QUIET', 'COLLABORATIVE', 'MEETING', 'STANDING DESK', 'WINDOW VIEW'];
  const viewOptions = [
    { id: 'day', label: 'DAY' },
    { id: 'month', label: 'MONTH' },
    { id: 'grid', label: 'GRID' },
    { id: 'list', label: 'LIST' },
    { id: 'map', label: 'MAP' }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).toUpperCase();
  };

  const formatDateShort = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setShowLocations(false);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setShowTimes(false);
  };

  // Helper to change date by offset
  const changeDate = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown-container') && 
          !e.target.closest('.user-profile-button') &&
          !e.target.closest('.mobile-menu-button')) {
        setShowCalendar(false);
        setShowLocations(false);
        setShowTimes(false);
        setShowTags(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">QuantumX Workspace</h1>
              
              {/* Mobile menu button */}
              <button 
                className="ml-4 md:hidden mobile-menu-button p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setSelectedDate(new Date())}
                className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Today
              </button>
              <Link 
                to="/history" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Booking History
              </Link>
              
              {/* User profile button */}
              <button 
                className="user-profile-button flex items-center space-x-2 rounded-full focus:outline-none"
                onClick={() => setShowUserProfile(!showUserProfile)}
              >
                <span className="hidden md:block text-sm font-medium text-gray-700">{user.name}</span>
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
              </button>
            </div>
            
            {/* Mobile user profile button - always visible */}
            <button 
              className="md:hidden user-profile-button"
              onClick={() => setShowUserProfile(!showUserProfile)}
            >
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => {
                setSelectedDate(new Date());
                setShowMobileMenu(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Today
            </button>
            <Link 
              to="/history" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setShowMobileMenu(false)}
            >
              Booking History
            </Link>
            <div className="pt-4 pb-2">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">View Profile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View selector - desktop */}
      <div className="hidden md:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {viewOptions.map(option => (
              <button 
                key={option.id}
                className={`px-3 py-1 text-sm rounded-md ${
                  view === option.id ? 'bg-blue-100 text-blue-700 font-medium' : 
                  'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setView(option.id)}
              >
                {option.label}
              </button>
            ))}

            {/* Date selector */}
            <div className="flex items-center ml-4 relative dropdown-container">
              <button 
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => changeDate(-1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="text-sm font-medium text-gray-700 mx-2 px-2 py-1 hover:bg-gray-100 rounded"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {formatDate(selectedDate)}
              </button>
              <button 
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => changeDate(1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Calendar dropdown */}
              {showCalendar && (
                <div className="absolute top-full left-0 mt-1 z-10">
                  <Calendar onDateSelect={handleDateChange} />
                </div>
              )}
            </div>

            {/* Location selector */}
            <div className="flex items-center ml-auto relative dropdown-container">
              <button 
                className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                onClick={() => setShowLocations(!showLocations)}
              >
                <span>{selectedLocation}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Locations dropdown */}
              {showLocations && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg z-10 min-w-[200px]">
                  <div className="py-1">
                    {locations.map(location => (
                      <button
                        key={location}
                        className={`block w-full text-left px-4 py-2 text-sm ${selectedLocation === location ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleLocationChange(location)}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Time selector */}
              <div className="relative dropdown-container ml-2">
                <button 
                  className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => setShowTimes(!showTimes)}
                >
                  <span>{selectedTime}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Times dropdown */}
                {showTimes && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg z-10 min-w-[100px]">
                    <div className="py-1 max-h-60 overflow-y-auto">
                      {times.map(time => (
                        <button
                          key={time}
                          className={`block w-full text-left px-4 py-2 text-sm ${selectedTime === time ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => handleTimeChange(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags button */}
              <div className="relative dropdown-container ml-2">
                <button 
                  className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => setShowTags(!showTags)}
                >
                  <span>SPACE TAGS</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Tags dropdown */}
                {showTags && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-3">
                      <div className="text-xs font-medium text-gray-500 mb-2">Filter by amenities</div>
                      {tags.map(tag => (
                        <div key={tag} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`tag-${tag}`}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <label htmlFor={`tag-${tag}`} className="ml-2 text-sm text-gray-700">
                            {tag}
                          </label>
                        </div>
                      ))}
                      <button className="mt-2 w-full bg-blue-600 text-white rounded-md px-3 py-1 text-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view selector and controls */}
      <div className="md:hidden bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-2">
          {/* Date display and navigation */}
          <div className="flex justify-between items-center mb-3">
            <button 
              className="p-1 rounded-full bg-gray-100"
              onClick={() => changeDate(-1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button 
              className="flex items-center justify-center space-x-1 bg-white border border-gray-300 px-3 py-1 rounded-md"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span className="text-sm font-medium">{formatDateShort(selectedDate)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            
            <button 
              className="p-1 rounded-full bg-gray-100"
              onClick={() => changeDate(1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Calendar dropdown for mobile */}
          {showCalendar && (
            <div className="relative dropdown-container">
              <div className="absolute z-10 mt-1 w-full">
                <Calendar onDateSelect={handleDateChange} />
              </div>
            </div>
          )}
          
          {/* View switcher */}
          <div className="flex overflow-x-auto scrollbar-none py-1 -mx-1">
            {viewOptions.map(option => (
              <button 
                key={option.id}
                className={`flex-shrink-0 mx-1 px-3 py-1 text-sm rounded-md ${
                  view === option.id ? 'bg-blue-100 text-blue-700 font-medium' : 
                  'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setView(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Location and time selectors */}
          <div className="flex justify-between mt-2">
            <div className="relative dropdown-container">
              <button 
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md text-xs"
                onClick={() => setShowLocations(!showLocations)}
              >
                <span>{selectedLocation.split(' ')[0]}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Mobile locations dropdown */}
              {showLocations && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10 w-40">
                  <div className="py-1">
                    {locations.map(location => (
                      <button
                        key={location}
                        className={`block w-full text-left px-3 py-2 text-xs ${selectedLocation === location ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                        onClick={() => handleLocationChange(location)}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative dropdown-container">
              <button 
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md text-xs"
                onClick={() => setShowTimes(!showTimes)}
              >
                <span>{selectedTime}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Mobile times dropdown */}
              {showTimes && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg z-10 w-32">
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {times.map(time => (
                      <button
                        key={time}
                        className={`block w-full text-left px-3 py-1 text-xs ${selectedTime === time ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                        onClick={() => handleTimeChange(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative dropdown-container">
              <button 
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md text-xs"
                onClick={() => setShowTags(!showTags)}
              >
                <span>TAGS</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Mobile tags dropdown */}
              {showTags && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg z-10 w-52">
                  <div className="p-3">
                    <div className="text-xs font-medium text-gray-500 mb-2">Filter by amenities</div>
                    {tags.map(tag => (
                      <div key={tag} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`mobile-tag-${tag}`}
                          className="h-3 w-3 text-blue-600 rounded border-gray-300"
                        />
                        <label htmlFor={`mobile-tag-${tag}`} className="ml-2 text-xs text-gray-700">
                          {tag}
                        </label>
                      </div>
                    ))}
                    <button className="mt-2 w-full bg-blue-600 text-white rounded-md px-3 py-1 text-xs">
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          {view === 'map' && <FloorPlan selectedDate={selectedDate} selectedTime={selectedTime} />}
          {view === 'grid' && <SeatGrid selectedDate={selectedDate} selectedTime={selectedTime} />}
          {view === 'list' && <SeatList selectedDate={selectedDate} selectedTime={selectedTime} />}
          {view === 'day' && (
            <div className="text-center py-6 md:py-12">
              <h3 className="text-lg font-medium text-gray-900">Day View</h3>
              <p className="mt-2 text-sm text-gray-500">
                Bookings for {formatDateShort(selectedDate)}
              </p>
              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-blue-50 border border-blue-100 rounded-md p-3 md:p-4">
                      <div className="font-medium text-sm md:text-base">Time: {(8 + Math.floor(i/2))}:{i % 2 === 0 ? '00' : '30'}</div>
                      <div className="text-xs md:text-sm text-gray-600">Available Seats: {20 - i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {view === 'month' && (
            <div className="text-center py-6 md:py-12">
              <h3 className="text-lg font-medium text-gray-900">Month View</h3>
              <p className="mt-2 text-sm text-gray-500">
                Bookings for {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </p>
              <div className="mt-4 flex justify-center">
                <Calendar onDateSelect={handleDateChange} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8 md:mt-12 pb-6 text-center text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} QuantumX Workspace. All rights reserved.
      </footer>

      {/* User profile sidebar */}
      {showUserProfile && (
        <>
          {/* Overlay to close profile when clicking outside */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => setShowUserProfile(false)}
          ></div>
          
          {/* User profile component */}
          <UserProfile onClose={() => setShowUserProfile(false)} />
        </>
      )}
    </div>
  );
};

export default BookingPage;