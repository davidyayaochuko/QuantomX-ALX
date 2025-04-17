// File: src/pages/BookingHistoryPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BOOKING_HISTORY_KEY = 'bookingHistory';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'cancelled'

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    // Sort by booking date, newest first
    history.sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
    setBookings(history);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'active') return !booking.cancelled;
    if (filter === 'cancelled') return booking.cancelled;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Booking History</h1>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              &larr; Back to Booking
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Filters */}
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Your Bookings</h2>
              
              <div className="flex rounded-md shadow-sm">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-medium border ${
                    filter === 'all' 
                      ? 'bg-blue-50 border-blue-600 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } rounded-l-md`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                    filter === 'active' 
                      ? 'bg-blue-50 border-blue-600 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setFilter('cancelled')}
                  className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                    filter === 'cancelled' 
                      ? 'bg-blue-50 border-blue-600 text-blue-600' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } rounded-r-md`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>

          {/* Booking list */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">No booking records match your current filter.</p>
              <div className="mt-6">
                <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Book a workspace
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <li key={booking.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${booking.cancelled ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-800'}`}>
                        {booking.seatId}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Workspace #{booking.seatId}
                        </div>
                        <div className="text-sm text-gray-500">
                          Booked for: {booking.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-6 text-right text-sm text-gray-500">
                        <div>Booked on:</div>
                        <div>{formatDate(booking.bookingTime)}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.cancelled 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {booking.cancelled ? 'Cancelled' : 'Active'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Workspace area: {booking.extraSpace ? 'Extra space' : 'Standard'}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        <span>Parking: {booking.includeParking ? 'Included' : 'Not included'}</span>
                      </div>
                      {booking.cancelled && (
                        <div className="flex items-center col-span-2 mt-1 text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span>Cancelled on: {formatDate(booking.cancelTime)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="mt-12 pb-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Workspace Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default BookingHistoryPage;