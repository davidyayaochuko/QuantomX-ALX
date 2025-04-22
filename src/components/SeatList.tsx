// File: src/components/SeatList.tsx
import React, { useState, useEffect } from 'react';
import SeatModal from './SeatModal';

const SEATS_STORAGE_KEY = 'bookedSeats';
const PARKING_STORAGE_KEY = 'parkingSpaces';
const BOOKING_HISTORY_KEY = 'bookingHistory';

interface SeatListProps {
  selectedDate: Date;
  selectedTime: string;
}

interface Seat {
  id: number;
  type: string;
  location: string;
  isBooked: boolean;
  time: string | null;
  includeParking: boolean;
  extraSpace: boolean;
}

interface TypeInfo {
  label: string;
  icon: string;
}

type FilterType = 'all' | 'available' | 'booked';

const SeatList: React.FC<SeatListProps> = ({ selectedDate, selectedTime }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [parkingTotal] = useState<number>(10);
  const [parkingBooked, setParkingBooked] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType>('all');
  
  useEffect(() => {
    // Load booked seats from localStorage
    const storedBookingsStr = localStorage.getItem(SEATS_STORAGE_KEY);
    const storedBookings: any[] = storedBookingsStr ? JSON.parse(storedBookingsStr) : [];

    // Generate 40 seats with different types (desk, meeting, quiet, etc.)
    const generatedSeats = Array.from({ length: 40 }, (_, i) => {
      const id = i + 1;
      const booking = storedBookings.find(b => b.id === id);
      
      // Assign different types to seats
      let type = 'standard';
      if (id % 5 === 0) type = 'window';
      if (id % 7 === 0) type = 'standing';
      if (id % 8 === 0) type = 'quiet';
      if (id % 10 === 0) type = 'meeting';
      
      // Assign different locations to seats
      let location = 'Main Area';
      if (id <= 8) location = 'North Wing';
      if (id > 8 && id <= 16) location = 'South Wing';
      if (id > 16 && id <= 24) location = 'East Wing';
      if (id > 24 && id <= 32) location = 'West Wing';
      if (id > 32) location = 'Central Hub';
      
      return {
        id,
        type,
        location,
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
  }, [selectedDate, selectedTime]);

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

  const getSeatTypeInfo = (type: string): TypeInfo => {
    switch (type) {
      case 'window':
        return { label: 'Window', icon: '🪟' };
      case 'standing':
        return { label: 'Standing Desk', icon: '⬆️' };
      case 'quiet':
        return { label: 'Quiet Zone', icon: '🤫' };
      case 'meeting':
        return { label: 'Meeting Area', icon: '👥' };
      default:
        return { label: 'Standard', icon: '💺' };
    }
  };

  const filteredSeats = seats.filter(seat => {
    if (filter === 'all') return true;
    if (filter === 'available') return !seat.isBooked;
    if (filter === 'booked') return seat.isBooked;
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Workspace List</h2>
        
        <div className="flex rounded-md shadow-sm">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium border ${
              filter === 'all' 
                ? 'bg-blue-50 border-blue-600 text-blue-600' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } rounded-l-md`}
          >
            All ({seats.length})
          </button>
          <button 
            onClick={() => setFilter('available')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === 'available' 
                ? 'bg-blue-50 border-blue-600 text-blue-600' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Available ({seats.filter(s => !s.isBooked).length})
          </button>
          <button 
            onClick={() => setFilter('booked')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === 'booked' 
                ? 'bg-blue-50 border-blue-600 text-blue-600' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } rounded-r-md`}
          >
            Booked ({seats.filter(s => s.isBooked).length})
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seat
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSeats.map((seat) => {
              const typeInfo = getSeatTypeInfo(seat.type);
              return (
                <tr key={seat.id} className={seat.isBooked ? 'bg-red-50' : 'hover:bg-blue-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${seat.isBooked ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {seat.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <span className="mr-1">{typeInfo.icon}</span> {typeInfo.label}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{seat.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      seat.isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {seat.isBooked ? 'Booked' : 'Available'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {seat.isBooked ? (
                      <div>
                        <div>Time: {seat.time}</div>
                        {seat.includeParking && <div>With Parking</div>}
                        {seat.extraSpace && <div>Extra Space</div>}
                      </div>
                    ) : (
                      <div>Available for {selectedTime}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {seat.isBooked ? (
                      <button 
                        onClick={() => {
                          if (window.confirm(`Do you want to cancel booking for seat ${seat.id}?`)) {
                            handleCancelBooking(seat.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button 
                        onClick={() => setSelectedSeat(seat)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Book
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default SeatList;