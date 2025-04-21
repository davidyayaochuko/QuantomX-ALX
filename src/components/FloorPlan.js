// File: src/components/FloorPlan.js
import React, { useState, useEffect } from 'react';
import SeatModal from './SeatModal';

const SEATS_STORAGE_KEY = 'bookedSeats';
const PARKING_STORAGE_KEY = 'parkingSpaces';
const BOOKING_HISTORY_KEY = 'bookingHistory';

const FloorPlan = ({ selectedDate, selectedTime }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [parkingTotal] = useState(10);
  const [parkingBooked, setParkingBooked] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If a date is provided, filter bookings for that date
    const dateString = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    // Load booked seats from localStorage
    const storedBookings = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY)) || [];
    
    // Filter bookings for the selected date if needed
    const relevantBookings = selectedDate 
      ? storedBookings.filter(booking => {
          if (!booking.date) return false;
          return new Date(booking.date).toISOString().split('T')[0] === dateString;
        })
      : storedBookings;
    
    setBookedSeats(relevantBookings.map(b => b.id));
    
    // Load parking info
    try {
      // First, try to load as an object with date keys
      const parkingData = JSON.parse(localStorage.getItem(PARKING_STORAGE_KEY));
      
      if (typeof parkingData === 'object' && parkingData !== null) {
        // It's the new format with date keys
        setParkingBooked(parkingData[dateString] || 0);
      } else if (typeof parkingData === 'number') {
        // It's the old format (just a number)
        setParkingBooked(parkingData);
      } else {
        // Default to 0
        setParkingBooked(0);
      }
    } catch (error) {
      // If there's any error, just use 0
      setParkingBooked(0);
    }
  }, [selectedDate, selectedTime]);

  const handleBooking = (id, time, includeParking, extraSpace, bookingDate = new Date()) => {
    // Format the date
    const dateString = bookingDate.toISOString();
    const dateKey = dateString.split('T')[0];
    
    // Add the seat to booked seats
    const updatedBookedSeats = [...bookedSeats, id];
    setBookedSeats(updatedBookedSeats);
    
    // Get existing booked seats
    const existingBookings = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY)) || [];
    
    // Add new booking
    const newBooking = {
      id,
      time,
      includeParking,
      extraSpace,
      date: dateString,
      bookingTime: new Date().toISOString(),
      // Add end time (2 hours after start)
      endTime: (() => {
        const [hours, minutes] = time.split(':').map(Number);
        const endTime = new Date(bookingDate);
        endTime.setHours(hours + 2, minutes, 0, 0);
        return endTime.toISOString();
      })()
    };
    
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    // Update parking if needed
    if (includeParking) {
      const newParkingBooked = parkingBooked + 1;
      setParkingBooked(newParkingBooked);
      
      // Update parking storage - need to handle both formats
      try {
        const parkingData = JSON.parse(localStorage.getItem(PARKING_STORAGE_KEY) || '{}');
        
        // Handle the case where parking data is a number (old format)
        if (typeof parkingData === 'number') {
          // Convert to new format
          const newParkingData = {};
          newParkingData[dateKey] = parkingData + 1;
          localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(newParkingData));
        } else {
          // It's already the new format or empty object
          parkingData[dateKey] = (parkingData[dateKey] || 0) + 1;
          localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(parkingData));
        }
      } catch (error) {
        // If there's any error, create a new parking data object
        const newParkingData = {};
        newParkingData[dateKey] = 1;
        localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(newParkingData));
      }
    }

    // Add to booking history
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      seatId: id,
      time,
      date: dateString,
      includeParking,
      extraSpace,
      bookingTime: new Date().toISOString(),
      endTime: newBooking.endTime
    };

    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    history.push(booking);
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(history));

    setSelectedSeat(null);
  };

  const handleCancelBooking = (seatId) => {
    // Get current date string if selectedDate is provided
    const dateKey = selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    // Remove from booked seats
    const updatedBookedSeats = bookedSeats.filter(id => id !== seatId);
    setBookedSeats(updatedBookedSeats);
    
    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY)) || [];
    
    // Find the booking to cancel
    const bookingToCancel = existingBookings.find(booking => {
      // Match by ID and date if selectedDate is provided
      if (selectedDate && booking.date) {
        const bookingDateKey = new Date(booking.date).toISOString().split('T')[0];
        return booking.id === seatId && bookingDateKey === dateKey;
      }
      // Otherwise just match by ID
      return booking.id === seatId;
    });
    
    // Update parking if needed
    if (bookingToCancel && bookingToCancel.includeParking) {
      // Update UI state
      const newParkingBooked = Math.max(0, parkingBooked - 1);
      setParkingBooked(newParkingBooked);
      
      // Update storage - need to handle both formats
      try {
        const parkingData = JSON.parse(localStorage.getItem(PARKING_STORAGE_KEY));
        
        if (typeof parkingData === 'number') {
          // It's the old format - just decrement
          localStorage.setItem(PARKING_STORAGE_KEY, Math.max(0, parkingData - 1).toString());
        } else if (typeof parkingData === 'object' && parkingData !== null) {
          // It's the new format with date keys
          if (bookingToCancel.date) {
            const bookingDateKey = new Date(bookingToCancel.date).toISOString().split('T')[0];
            parkingData[bookingDateKey] = Math.max(0, (parkingData[bookingDateKey] || 0) - 1);
          } else {
            // If no date on booking, use current date
            parkingData[dateKey] = Math.max(0, (parkingData[dateKey] || 0) - 1);
          }
          localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(parkingData));
        }
      } catch (error) {
        // If there's any error, just set to 0
        const newParkingData = {};
        newParkingData[dateKey] = 0;
        localStorage.setItem(PARKING_STORAGE_KEY, JSON.stringify(newParkingData));
      }
    }
    
    // Update bookings
    let updatedBookings;
    if (selectedDate && bookingToCancel && bookingToCancel.date) {
      // If we have dates, filter by ID and date
      const bookingDateKey = new Date(bookingToCancel.date).toISOString().split('T')[0];
      updatedBookings = existingBookings.filter(booking => {
        if (!booking.date) return booking.id !== seatId;
        const bDateKey = new Date(booking.date).toISOString().split('T')[0];
        return !(booking.id === seatId && bDateKey === bookingDateKey);
      });
    } else {
      // Otherwise just filter by ID
      updatedBookings = existingBookings.filter(booking => booking.id !== seatId);
    }
    
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    // Update history
    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    const updatedHistory = history.map(booking => {
      // Match by seatId and date if available
      if (booking.seatId === seatId) {
        if (selectedDate && booking.date) {
          const bookingDateKey = new Date(booking.date).toISOString().split('T')[0];
          if (bookingDateKey === dateKey) {
            return {...booking, cancelled: true, cancelTime: new Date().toISOString()};
          }
        } else {
          return {...booking, cancelled: true, cancelTime: new Date().toISOString()};
        }
      }
      return booking;
    });
    
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  // Helper to create a workspace seat
  const WorkspaceSeat = ({ id, className = "" }) => {
    const isBooked = bookedSeats.includes(id);
    
    return (
      <div 
        className={`relative ${className}`}
        onClick={() => {
          if (isBooked) {
            // Show confirmation dialog for cancellation
            const dateMsg = selectedDate ? ` on ${selectedDate.toDateString()}` : '';
            if (window.confirm(`Do you want to cancel booking for seat ${id}${dateMsg}?`)) {
              handleCancelBooking(id);
            }
          } else {
            setSelectedSeat({ id });
          }
        }}
      >
        <div 
          className={`rounded-full flex items-center justify-center
            ${isBooked ? 'bg-red-500 cursor-pointer' : 'bg-green-500 cursor-pointer hover:bg-green-600'} 
            text-white font-semibold shadow-md transition-all duration-200`}
          style={{ 
            width: isMobile ? '28px' : '36px', 
            height: isMobile ? '28px' : '36px',
            fontSize: isMobile ? '10px' : '12px'
          }}
        >
          {id}
        </div>
      </div>
    );
  };

  // Helper for meeting pods
  const MeetingPod = ({ id, className = "" }) => {
    return (
      <div 
        className={`rounded-full bg-gray-300 flex items-center justify-center text-gray-600 ${className}`}
        style={{ 
          width: isMobile ? '32px' : '42px', 
          height: isMobile ? '32px' : '42px',
          fontSize: isMobile ? '9px' : '12px'
        }}
      >
        {id}
      </div>
    );
  };

  // Format the selected date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Create the meeting room labels
  const MeetingLabel = ({ label, top, left }) => (
    <div 
      className="absolute text-xs text-center bg-white bg-opacity-70 p-1 rounded"
      style={{ 
        top, 
        left, 
        fontSize: isMobile ? '8px' : '10px',
        width: isMobile ? '60px' : '70px'
      }}
    >
      {label}
    </div>
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
      {/* Date display */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Viewing workspaces for</h2>
        <p className="text-xl font-bold text-blue-700">{formatDate(selectedDate || new Date())}</p>
      </div>
      
      {/* Office layout using Flexbox and Grid for better mobile responsiveness */}
      <div className="relative bg-blue-50 border border-blue-100 rounded-lg p-4">
        {/* Meeting pods row */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-3">
            <MeetingPod id="" />
            <MeetingPod id="" />
            <MeetingPod id="" />
            <MeetingPod id="" />
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="w-full border-t border-blue-200 border-dashed my-2"></div>
        
        {/* Top seats grid */}
        <div className="flex justify-end mb-6">
          <div className="grid grid-cols-4 grid-rows-2 gap-2">
            <WorkspaceSeat id={1} />
            <WorkspaceSeat id={2} />
            <WorkspaceSeat id={3} />
            <WorkspaceSeat id={4} />
            <WorkspaceSeat id={5} />
            <WorkspaceSeat id={6} />
            <WorkspaceSeat id={7} />
            <WorkspaceSeat id={8} />
          </div>
        </div>
        
        {/* Horizontal divider */}
        <div className="w-full border-t border-blue-200 border-dashed my-2"></div>
        
        {/* Middle section with two columns */}
        <div className="flex">
          {/* Left column */}
          <div className="w-1/2 pr-2 border-r border-blue-200 border-dashed">
            <div className="space-y-5">
              <div className="flex justify-evenly">
                <WorkspaceSeat id={9} />
                <WorkspaceSeat id={10} />
                <WorkspaceSeat id={11} />
                <WorkspaceSeat id={12} />
              </div>
              <div className="flex justify-evenly">
                <WorkspaceSeat id={13} />
                <WorkspaceSeat id={14} />
                <WorkspaceSeat id={15} />
                <WorkspaceSeat id={16} />
              </div>
              <div className="flex justify-evenly">
                <WorkspaceSeat id={17} />
                <WorkspaceSeat id={18} />
                <WorkspaceSeat id={19} />
                <WorkspaceSeat id={20} />
              </div>
              <div className="flex justify-evenly">
                <WorkspaceSeat id={21} />
                <WorkspaceSeat id={22} />
                <WorkspaceSeat id={23} />
                <WorkspaceSeat id={24} />
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="w-1/2 pl-2">
            <div className="space-y-5">
              <div className="flex justify-evenly">
                <WorkspaceSeat id={25} />
                <WorkspaceSeat id={26} />
                <WorkspaceSeat id={27} />
                <WorkspaceSeat id={28} />
              </div>
              <div className="flex justify-evenly">
                <WorkspaceSeat id={29} />
                <WorkspaceSeat id={30} />
                <WorkspaceSeat id={31} />
                <WorkspaceSeat id={32} />
              </div>
              <div className="flex justify-evenly">
                <WorkspaceSeat id={33} />
                <WorkspaceSeat id={34} />
                <WorkspaceSeat id={35} />
                <WorkspaceSeat id={36} />
              </div>
              <div className="flex justify-evenly">
                <WorkspaceSeat id={37} />
                <WorkspaceSeat id={38} />
                <WorkspaceSeat id={39} />
                <WorkspaceSeat id={40} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal divider */}
        <div className="w-full border-t border-blue-200 border-dashed my-2"></div>
        
        {/* Bottom section */}
        <div className="flex mt-4">
          
          {/* Meeting rooms */}
          <div className="w-3/4 relative flex justify-around" style={{ minHeight: "60px" }}>
            <MeetingLabel label="Meeting A" top="20px" left="30%" />
            <MeetingLabel label="Meeting B" top="20px" left="70%" />
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow-sm text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Parking information */}
      <div className="mt-4 bg-white p-3 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Parking Spaces</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${parkingBooked >= parkingTotal ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {parkingTotal - parkingBooked} Available
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full ${parkingBooked / parkingTotal > 0.8 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${(parkingBooked / parkingTotal) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Modal for booking */}
      {selectedSeat && (
        <SeatModal
          seat={selectedSeat}
          onClose={() => setSelectedSeat(null)}
          onBook={handleBooking}
          parkingAvailable={parkingTotal - parkingBooked}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default FloorPlan;