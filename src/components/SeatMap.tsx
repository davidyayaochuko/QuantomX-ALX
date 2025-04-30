// File: src/components/SeatMap.tsx
import React, { useState, useEffect } from 'react';
import Seat from './Seat';
import SeatModal from './SeatModal';
import ParkingSpace from './ParkingSpace';

const SEATS_STORAGE_KEY = 'bookedSeats';
const PARKING_STORAGE_KEY = 'parkingSpaces';
const BOOKING_HISTORY_KEY = 'bookingHistory';

interface SeatData {
  id: number;
  isBooked: boolean;
  time: string | null;
  includeParking: boolean;
  extraSpace: boolean;
}

const SeatMap: React.FC = () => {
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<SeatData | null>(null);
  const [parkingTotal] = useState<number>(10);
  const [parkingBooked, setParkingBooked] = useState<number>(0);
  
  useEffect(() => {
    // Load booked seats from localStorage
    const storedBookingsStr = localStorage.getItem(SEATS_STORAGE_KEY);
    const storedBookings: any[] = storedBookingsStr ? JSON.parse(storedBookingsStr) : [];

    // Generate 12 seats and mark booked ones
    const generatedSeats = Array.from({ length: 12 }, (_, i) => {
      const booking = storedBookings.find(b => b.id === i + 1);
      return {
        id: i + 1,
        isBooked: !!booking,
        time: booking ? booking.time : null,
        includeParking: booking ? booking.includeParking : false,
        extraSpace: booking ? booking.extraSpace : false
      };
    });

    setSeats(generatedSeats);

    // Load parking info
    const storedParkingStr = localStorage.getItem(PARKING_STORAGE_KEY);
    const storedParking = storedParkingStr ? parseInt(storedParkingStr) : 0;
    setParkingBooked(storedParking);
  }, []);

  const handleBooking = (id: number, time: string, includeParking: boolean, extraSpace: boolean): void => {
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

    const historyStr = localStorage.getItem(BOOKING_HISTORY_KEY);
    const history = historyStr ? JSON.parse(historyStr) : [];
    history.push(booking);
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(history));

    setSelectedSeat(null);
  };

  const handleCancelBooking = (seatId: number): void => {
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
    const historyStr = localStorage.getItem(BOOKING_HISTORY_KEY);
    const history = historyStr ? JSON.parse(historyStr) : [];
    const updatedHistory = history.map((booking: any) => 
      booking.seatId === seatId ? {...booking, cancelled: true, cancelTime: new Date().toISOString()} : booking
    );
    
    localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seat Booking</h1>

      <div className="flex justify-between items-start mb-8">
        <div className="grid grid-cols-4 gap-4">
          {seats.map((seat) => (
            <Seat
              key={seat.id}
              id={seat.id}
              isBooked={seat.isBooked}
              onClick={() => {
                if (!seat.isBooked) {
                  setSelectedSeat(seat);
                } else {
                  // Show confirmation dialog for cancellation
                  if (window.confirm(`Do you want to cancel booking for seat ${seat.id}?`)) {
                    handleCancelBooking(seat.id);
                  }
                }
              }}
            />
          ))}
        </div>
        
        <ParkingSpace total={parkingTotal} booked={parkingBooked} />
      </div>

      {/* Modal appears here */}
      {selectedSeat && (
        <SeatModal
          seat={selectedSeat}
          onClose={() => setSelectedSeat(null)}
          onBook={handleBooking}
          parkingAvailable={parkingTotal - parkingBooked}
          selectedDate={new Date()} // Pass the current date as a default
        />
      )}
    </div>
  );
};

export default SeatMap;