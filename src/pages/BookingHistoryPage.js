// File: src/pages/BookingHistoryPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BOOKING_HISTORY_KEY = 'bookingHistory';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'cancelled'
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'thisWeek', 'thisMonth'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDateRange, setShowDateRange] = useState(false);

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

  // Removed the unused getDateOnly function

  const isDateInRange = (booking) => {
    if (dateFilter === 'all') return true;
    
    const bookingDate = booking.date ? new Date(booking.date) : new Date(booking.bookingTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateFilter === 'today') {
      return bookingDate.toDateString() === today.toDateString();
    }
    
    if (dateFilter === 'thisWeek') {
      const firstDay = new Date(today);
      const dayOfWeek = today.getDay();
      const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to get Monday
      firstDay.setDate(diff);
      
      const lastDay = new Date(firstDay);
      lastDay.setDate(lastDay.getDate() + 6);
      
      return bookingDate >= firstDay && bookingDate <= lastDay;
    }
    
    if (dateFilter === 'thisMonth') {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      return bookingDate >= firstDay && bookingDate <= lastDay;
    }
    
    if (dateFilter === 'custom') {
      if (!startDate && !endDate) return true;
      
      const start = startDate ? new Date(startDate) : new Date(0); // Beginning of time
      const end = endDate ? new Date(endDate) : new Date(8640000000000000); // End of time
      
      // Set end date to end of day
      if (endDate) {
        end.setHours(23, 59, 59, 999);
      }
      
      return bookingDate >= start && bookingDate <= end;
    }
    
    return true;
  };

  // Rest of your code remains unchanged
  const filteredBookings = bookings.filter(booking => {
    // Status filter
    const statusMatch = 
      filter === 'all' ? true :
      filter === 'active' ? !booking.cancelled :
      filter === 'cancelled' ? booking.cancelled :
      true;
    
    // Date filter
    const dateMatch = isDateInRange(booking);
    
    return statusMatch && dateMatch;
  });

  const handleDateFilterChange = (newFilter) => {
    setDateFilter(newFilter);
    if (newFilter === 'custom') {
      setShowDateRange(true);
    } else {
      setShowDateRange(false);
    }
  };

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-medium text-gray-900 mb-4 md:mb-0">Your Bookings</h2>
              
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                {/* Status filter */}
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
                
                {/* Date filter */}
                <div className="flex flex-col space-y-2">
                  <div className="flex rounded-md shadow-sm">
                    <button 
                      onClick={() => handleDateFilterChange('all')}
                      className={`px-3 py-2 text-sm font-medium border ${
                        dateFilter === 'all' 
                          ? 'bg-blue-50 border-blue-600 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } rounded-l-md`}
                    >
                      All Dates
                    </button>
                    <button 
                      onClick={() => handleDateFilterChange('today')}
                      className={`px-3 py-2 text-sm font-medium border-t border-b border-r ${
                        dateFilter === 'today' 
                          ? 'bg-blue-50 border-blue-600 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Today
                    </button>
                    <button 
                      onClick={() => handleDateFilterChange('thisWeek')}
                      className={`px-3 py-2 text-sm font-medium border-t border-b border-r ${
                        dateFilter === 'thisWeek' 
                          ? 'bg-blue-50 border-blue-600 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      This Week
                    </button>
                    <button 
                      onClick={() => handleDateFilterChange('thisMonth')}
                      className={`px-3 py-2 text-sm font-medium border-t border-b border-r ${
                        dateFilter === 'thisMonth' 
                          ? 'bg-blue-50 border-blue-600 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      This Month
                    </button>
                    <button 
                      onClick={() => handleDateFilterChange('custom')}
                      className={`px-3 py-2 text-sm font-medium border-t border-b border-r ${
                        dateFilter === 'custom' 
                          ? 'bg-blue-50 border-blue-600 text-blue-600' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } rounded-r-md`}
                    >
                      Custom
                    </button>
                  </div>
                  
                  {/* Custom date range */}
                  {showDateRange && (
                    <div className="flex space-x-2 items-center">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Start date"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="End date"
                      />
                    </div>
                  )}
                </div>
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
              <p className="mt-1 text-sm text-gray-500">No booking records match your current filters.</p>
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
                          Booked for: {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'} at {booking.time}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
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
                      {!booking.cancelled && (
                        <div className="col-span-2 mt-2">
                          <button 
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to cancel your booking for seat ${booking.seatId}?`)) {
                                // Handle cancellation
                                const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
                                const updatedHistory = history.map(b => 
                                  b.id === booking.id ? {...b, cancelled: true, cancelTime: new Date().toISOString()} : b
                                );
                                localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updatedHistory));
                                
                                // Also remove from active bookings
                                const seats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
                                const updatedSeats = seats.filter(s => s.id !== booking.seatId);
                                localStorage.setItem('bookedSeats', JSON.stringify(updatedSeats));
                                
                                // Update parking if needed
                                if (booking.includeParking) {
                                  const parkingData = JSON.parse(localStorage.getItem('parkingSpaces') || '{}');
                                  const dateKey = booking.date ? new Date(booking.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                                  parkingData[dateKey] = Math.max(0, (parkingData[dateKey] || 0) - 1);
                                  localStorage.setItem('parkingSpaces', JSON.stringify(parkingData));
                                }
                                
                                // Refresh bookings
                                setBookings(updatedHistory);
                              }
                            }}
                          >
                            Cancel Booking
                          </button>
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