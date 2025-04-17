// File: src/components/SeatGrid.js
import React, { useState, useEffect } from 'react';
import SeatModal from './SeatModal';

const SEATS_STORAGE_KEY = 'bookedSeats';
const PARKING_STORAGE_KEY = 'parkingSpaces';
const BOOKING_HISTORY_KEY = 'bookingHistory';

const SeatGrid = ({ selectedDate, selectedTime }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [parkingTotal] = useState(10);
  const [parkingBooked, setParkingBooked] = useState(0);
  
  useEffect(() => {
    // Load booked seats from localStorage
    const storedBookings = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY)) || [];

    // Generate 24 seats with different types (desk, meeting, quiet, etc.)
    const generatedSeats = Array.from({ length: 24 }, (_, i) => {
      const id = i + 1;
      const booking = storedBookings.find(b => b.id === id);
      
      // Assign different types to seats
      let type = 'standard';
      if (id % 5 === 0) type = 'window';
      if (id % 7 === 0) type = 'standing';
      if (id % 8 === 0) type = 'quiet';
      
      return {
        id,
        type,
        isBooked: !!booking,
        time: booking ? booking.time : null,
        includeParking: booking ? booking.includeParking : false,
        extraSpace: booking ? booking.extraSpace : false
      };
    });

    setSeats(generatedSeats);

    // Load parking info
    const storedParking = parseInt(localStorage.getItem(PARKING_STORAGE_KEY) || '0');
    setParkingBooked(storedParking);
  }, [selectedDate, selectedTime]);

  const handleBooking = (id, time, includeParking, extraSpace) => {
    // Update seat booking
    const updated = seats.map((seat) =>
      seat.id === id ? { 
        ...seat, 
        isBooked: true, 
        time, 
        includeParking, 
        extraSpace 
      } : seat
    );
    setSeats(updated);
  
    // Save booked seats to localStorage
    const bookedSeats = updated
      .filter((seat) => seat.isBooked)
      .map((seat) => ({
        id: seat.id,
        time: seat.time,
        includeParking: seat.includeParking,
        extraSpace: seat.extraSpace
      }));
    
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(bookedSeats));
    
    // Update parking if needed
    if (includeParking) {
      const newParkingBooked = parkingBooked + 1;
      setParkingBooked(newParkingBooked);
      localStorage.setItem(PARKING_STORAGE_KEY, newParkingBooked.toString());
    }

    // Add to booking history
    const bookingTime = new Date().toISOString();
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      seatId: id,
      time,
      includeParking,
      extraSpace,
      bookingTime,
    };

    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    history.push(booking);
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(history));

    setSelectedSeat(null);
  };

  const handleCancelBooking = (seatId) => {
    // Find the seat to cancel
    const seatToCancel = seats.find(seat => seat.id === seatId);
    
    if (!seatToCancel || !seatToCancel.isBooked) return;
    
    // Update parking if needed
    if (seatToCancel.includeParking) {
      const newParkingBooked = Math.max(0, parkingBooked - 1);
      setParkingBooked(newParkingBooked);
      localStorage.setItem(PARKING_STORAGE_KEY, newParkingBooked.toString());
    }
    
    // Update seat booking status
    const updated = seats.map(seat => 
      seat.id === seatId ? {
        ...seat,
        isBooked: false,
        time: null,
        includeParking: false,
        extraSpace: false
      } : seat
    );
    
    setSeats(updated);
    
    // Update localStorage
    const bookedSeats = updated
      .filter(seat => seat.isBooked)
      .map(seat => ({
        id: seat.id,
        time: seat.time,
        includeParking: seat.includeParking,
        extraSpace: seat.extraSpace
      }));
    
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(bookedSeats));
    
    // Update history
    const history = JSON.parse(localStorage.getItem(BOOKING_HISTORY_KEY)) || [];
    const updatedHistory = history.map(booking => 
      booking.seatId === seatId ? {...booking, cancelled: true, cancelTime: new Date().toISOString()} : booking
    );
    
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const getSeatTypeInfo = (type) => {
    switch (type) {
      case 'window':
        return { label: 'Window', icon: '🪟', color: 'bg-green-500' };
      case 'standing':
        return { label: 'Standing Desk', icon: '⬆️', color: 'bg-purple-500' };
      case 'quiet':
        return { label: 'Quiet Zone', icon: '🤫', color: 'bg-blue-500' };
      default:
        return { label: 'Standard', icon: '💺', color: 'bg-gray-500' };
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Available Workspaces</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {seats.map((seat) => {
          const typeInfo = getSeatTypeInfo(seat.type);
          return (
            <div
              key={seat.id}
              className={`relative border rounded-lg overflow-hidden shadow-sm 
                ${seat.isBooked ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer'}`}
              onClick={() => {
                if (seat.isBooked) {
                  if (window.confirm(`Do you want to cancel booking for seat ${seat.id}?`)) {
                    handleCancelBooking(seat.id);
                  }
                } else {
                  setSelectedSeat(seat);
                }
              }}
            >
              <div className={`h-2 ${seat.isBooked ? 'bg-red-500' : typeInfo.color}`}></div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-lg">{seat.id}</span>
                  <span className="text-sm">{typeInfo.icon}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">{typeInfo.label}</div>
                
                {seat.isBooked && (
                  <div className="mt-2 text-xs">
                    <div className="text-red-600 font-medium">Booked</div>
                    <div className="text-gray-600">Time: {seat.time}</div>
                    {seat.includeParking && (
                      <div className="text-gray-600">With Parking</div>
                    )}
                    {seat.extraSpace && (
                      <div className="text-gray-600">Extra Space</div>
                    )}
                  </div>
                )}
                
                {!seat.isBooked && (
                  <div className="mt-2 text-xs">
                    <div className="text-green-600 font-medium">Available</div>
                    <div className="text-gray-600">for {selectedTime}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Parking status section */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium mb-2">Parking Availability</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Available spaces: {parkingTotal - parkingBooked}/{parkingTotal}</span>
          <span className={`text-sm font-medium ${parkingBooked >= parkingTotal ? 'text-red-600' : 'text-green-600'}`}>
            {parkingBooked >= parkingTotal ? 'No spaces available' : 'Spaces available'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
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

export default SeatGrid;