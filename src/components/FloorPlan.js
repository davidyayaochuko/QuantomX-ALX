// File: src/components/FloorPlan.js
import React, { useState, useEffect } from 'react';
import SeatModal from './SeatModal';

const SEATS_STORAGE_KEY = 'bookedSeats';
const PARKING_STORAGE_KEY = 'parkingSpaces';
const BOOKING_HISTORY_KEY = 'bookingHistory';

const FloorPlan = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [parkingTotal] = useState(10);
  const [parkingBooked, setParkingBooked] = useState(0);
  
  useEffect(() => {
    // Load booked seats from localStorage
    const storedBookings = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY)) || [];
    setBookedSeats(storedBookings.map(b => b.id));
    
    // Load parking info
    const storedParking = parseInt(localStorage.getItem(PARKING_STORAGE_KEY) || '0');
    setParkingBooked(storedParking);
  }, []);

  const handleBooking = (id, time, includeParking, extraSpace) => {
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
      bookingTime: new Date().toISOString()
    };
    
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    // Update parking if needed
    if (includeParking) {
      const newParkingBooked = parkingBooked + 1;
      setParkingBooked(newParkingBooked);
      localStorage.setItem(PARKING_STORAGE_KEY, newParkingBooked.toString());
    }

    // Add to booking history
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      seatId: id,
      time,
      includeParking,
      extraSpace,
      bookingTime: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    history.push(booking);
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(history));

    setSelectedSeat(null);
  };

  const handleCancelBooking = (seatId) => {
    // Remove from booked seats
    const updatedBookedSeats = bookedSeats.filter(id => id !== seatId);
    setBookedSeats(updatedBookedSeats);
    
    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY)) || [];
    
    // Find the booking to cancel
    const bookingToCancel = existingBookings.find(booking => booking.id === seatId);
    
    // Update parking if needed
    if (bookingToCancel && bookingToCancel.includeParking) {
      const newParkingBooked = Math.max(0, parkingBooked - 1);
      setParkingBooked(newParkingBooked);
      localStorage.setItem(PARKING_STORAGE_KEY, newParkingBooked.toString());
    }
    
    // Update bookings
    const updatedBookings = existingBookings.filter(booking => booking.id !== seatId);
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    // Update history
    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    const updatedHistory = history.map(booking => 
      booking.seatId === seatId ? {...booking, cancelled: true, cancelTime: new Date().toISOString()} : booking
    );
    
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
            if (window.confirm(`Do you want to cancel booking for seat ${id}?`)) {
              handleCancelBooking(id);
            }
          } else {
            setSelectedSeat({ id });
          }
        }}
      >
        <div 
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm 
            ${isBooked ? 'bg-red-500 cursor-pointer' : 'bg-green-500 cursor-pointer hover:bg-green-600'} 
            text-white font-semibold shadow-md transition-all duration-200`}
        >
          {id}
        </div>
      </div>
    );
  };

  // Helper for a room or meeting space
  const MeetingRoom = ({ id, width, height, top, left, label = "" }) => {
    return (
      <div 
        className="absolute bg-gray-200 rounded-md flex items-center justify-center"
        style={{ width, height, top, left }}
      >
        <span className="text-xs text-gray-600">{label || `Room ${id}`}</span>
      </div>
    );
  };

  // Helper for a desk group
  const DeskGroup = ({ children, className = "", style = {} }) => {
    return (
      <div className={`flex ${className}`} style={style}>
        {children}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
      {/* Office layout - this is a simplified representation */}
      <div className="relative w-full" style={{ minHeight: "600px" }}>
        {/* Top section */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-6">
            {/* Top left - Meeting pods */}
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Top right - Desk group 1-8 */}
            <div className="grid grid-cols-4 grid-rows-2 gap-4">
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
        </div>

        {/* Middle section - left side desks */}
        <div className="absolute left-4 top-40">
          <div className="flex flex-col space-y-8">
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={9} />
              <WorkspaceSeat id={10} />
              <WorkspaceSeat id={11} />
              <WorkspaceSeat id={12} />
            </DeskGroup>
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={13} />
              <WorkspaceSeat id={14} />
              <WorkspaceSeat id={15} />
              <WorkspaceSeat id={16} />
            </DeskGroup>
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={17} />
              <WorkspaceSeat id={18} />
              <WorkspaceSeat id={19} />
              <WorkspaceSeat id={20} />
            </DeskGroup>
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={21} />
              <WorkspaceSeat id={22} />
              <WorkspaceSeat id={23} />
              <WorkspaceSeat id={24} />
            </DeskGroup>
          </div>
        </div>

        {/* Middle section - right side desks */}
        <div className="absolute right-4 top-40">
          <div className="flex flex-col space-y-8">
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={25} />
              <WorkspaceSeat id={26} />
              <WorkspaceSeat id={27} />
              <WorkspaceSeat id={28} />
            </DeskGroup>
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={29} />
              <WorkspaceSeat id={30} />
              <WorkspaceSeat id={31} />
              <WorkspaceSeat id={32} />
            </DeskGroup>
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={33} />
              <WorkspaceSeat id={34} />
              <WorkspaceSeat id={35} />
              <WorkspaceSeat id={36} />
            </DeskGroup>
            <DeskGroup className="space-x-4">
              <WorkspaceSeat id={37} />
              <WorkspaceSeat id={38} />
              <WorkspaceSeat id={39} />
              <WorkspaceSeat id={40} />
            </DeskGroup>
          </div>
        </div>

        {/* Bottom section - Meeting rooms and additional seats */}
        <div className="absolute bottom-4 left-4">
          <div className="flex flex-col space-y-4">
            <WorkspaceSeat id={41} />
            <WorkspaceSeat id={42} />
            <WorkspaceSeat id={43} />
          </div>
        </div>

        {/* Meeting rooms at the bottom */}
        <MeetingRoom 
          id="A" 
          width="80px" 
          height="60px" 
          top="500px" 
          left="160px" 
          label="Meeting A"
        />
        <MeetingRoom 
          id="B" 
          width="80px" 
          height="60px" 
          top="500px" 
          left="250px" 
          label="Meeting B"
        />

        {/* Divider lines */}
        <div className="absolute top-32 left-0 w-full border-t border-blue-200 border-dashed"></div>
        <div className="absolute top-32 left-1/2 h-[400px] border-l border-blue-200 border-dashed"></div>
        <div className="absolute top-400 left-0 w-full border-t border-blue-200 border-dashed"></div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {/* Parking information */}
      <div className="mt-6 bg-white p-3 rounded-lg shadow-md">
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
        />
      )}
    </div>
  );
};

export default FloorPlan;