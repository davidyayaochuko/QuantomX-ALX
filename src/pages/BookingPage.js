// File: src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FloorPlan from '../components/FloorPlan';
import Calendar from '../components/Calendar';
import SeatGrid from '../components/SeatGrid';
import SeatList from '../components/SeatList';

const BookingPage = () => {
  const [view, setView] = useState('map'); // 'day', 'month', 'grid', 'list', 'map'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('WORKSPACE HUB');
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showTimes, setShowTimes] = useState(false);
  const [showTags, setShowTags] = useState(false);

  const locations = ['WORKSPACE HUB', 'SOUTH WING', 'NORTH WING', 'EXECUTIVE FLOOR'];
  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const tags = ['QUIET', 'COLLABORATIVE', 'MEETING', 'STANDING DESK', 'WINDOW VIEW'];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setShowCalendar(false);
        setShowLocations(false);
        setShowTimes(false);
        setShowTags(false);
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
            <h1 className="text-xl font-bold text-gray-900">Workspace Booking</h1>
            <Link 
              to="/history" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Booking History
            </Link>
          </div>
        </div>
      </header>

      {/* View selector */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            <button 
              className={`px-3 py-1 text-sm rounded-md ${view === 'day' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setView('day')}
            >
              DAY
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${view === 'month' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setView('month')}
            >
              MONTH
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${view === 'grid' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setView('grid')}
            >
              GRID
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${view === 'list' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setView('list')}
            >
              LIST
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md ${view === 'map' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setView('map')}
            >
              MAP
            </button>

            {/* Date selector */}
            <div className="flex items-center ml-4 relative dropdown-container">
              <button 
                className="p-1 text-gray-400 hover:text-gray-600"
                onClick={() => setSelectedDate(prev => {
                  const newDate = new Date(prev);
                  newDate.setDate(newDate.getDate() - 1);
                  return newDate;
                })}
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
                onClick={() => setSelectedDate(prev => {
                  const newDate = new Date(prev);
                  newDate.setDate(newDate.getDate() + 1);
                  return newDate;
                })}
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

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {view === 'map' && <FloorPlan selectedDate={selectedDate} selectedTime={selectedTime} />}
          {view === 'grid' && <SeatGrid selectedDate={selectedDate} selectedTime={selectedTime} />}
          {view === 'list' && <SeatList selectedDate={selectedDate} selectedTime={selectedTime} />}
          {view === 'day' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Day View</h3>
              <p className="mt-2 text-sm text-gray-500">
                Day view shows all bookings for {formatDate(selectedDate)}.
              </p>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-blue-50 border border-blue-100 rounded-md p-4">
                      <div className="font-medium">Time Slot: {(8 + Math.floor(i/2))}:{i % 2 === 0 ? '00' : '30'}</div>
                      <div className="text-sm text-gray-600">Available Seats: {20 - i}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {view === 'month' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Month View</h3>
              <p className="mt-2 text-sm text-gray-500">
                Month view shows all bookings for {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}.
              </p>
              <div className="mt-4 flex justify-center">
                <Calendar onDateSelect={handleDateChange} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 pb-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Workspace Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default BookingPage;