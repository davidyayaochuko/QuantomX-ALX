// File: src/components/SeatModal.js
import React, { useState, useEffect } from 'react';

const SeatModal = ({ seat, onClose, onBook, parkingAvailable, selectedDate }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [includeParking, setIncludeParking] = useState(false);
  const [extraSpace, setExtraSpace] = useState(false);
  
  if (!seat) return null;

  // Use selectedDate if provided, otherwise use current date
  const bookingDate = selectedDate || new Date();

  const sampleTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  const handleBook = () => {
    if (!selectedTime) return alert('Please select a time slot.');
    onBook(seat.id, selectedTime, includeParking, extraSpace, bookingDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seat {seat.id} - Details</h2>
          <button onClick={onClose} className="text-red-600 text-2xl">&times;</button>
        </div>

        {/* Date display - shows the selected date */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Booking for:</p>
          <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800">
            {formatDate(bookingDate)}
          </div>
        </div>

        <p className="font-semibold mb-2">Select a time slot:</p>
        <div className="grid grid-cols-4 gap-2 mb-4 max-h-40 overflow-y-auto">
          {sampleTimes.map((time) => (
            <button
              key={time}
              className={`px-3 py-1 rounded-md ${
                selectedTime === time
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <p className="font-semibold mb-2">Scheduled bookings (2-hour slots):</p>
        <div className="text-sm text-gray-700 space-y-2 max-h-32 overflow-y-auto mb-4 bg-gray-50 p-2 rounded">
          <div className="p-2 bg-gray-100 rounded">10:30–12:30 — Jane Smith</div>
          <div className="p-2 bg-gray-100 rounded">14:00–16:00 — John Doe</div>
        </div>

        {/* Add parking option */}
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="parking"
            checked={includeParking}
            onChange={() => setIncludeParking(!includeParking)}
            className="mr-2 h-4 w-4"
            disabled={parkingAvailable <= 0}
          />
          <label htmlFor="parking" className="text-sm">
            Include parking space
            {parkingAvailable <= 0 && <span className="text-red-500 ml-2">(Not available)</span>}
            {parkingAvailable > 0 && <span className="text-green-500 ml-2">({parkingAvailable} available)</span>}
          </label>
        </div>

        {/* Add extra space option */}
        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            id="extraSpace"
            checked={extraSpace}
            onChange={() => setExtraSpace(!extraSpace)}
            className="mr-2 h-4 w-4"
          />
          <label htmlFor="extraSpace" className="text-sm">
            Request extra workspace
          </label>
        </div>

        <div className="mt-4 text-sm bg-blue-50 p-3 rounded">
          <p className="font-medium">Booking summary:</p>
          <p>Date: {formatDate(bookingDate)}</p>
          <p>Time: {selectedTime || "Not selected"}</p>
          <p>Duration: {selectedTime ? `${selectedTime} - ${(() => {
            // Add 2 hours to the selected time
            const [hours, minutes] = selectedTime.split(':').map(Number);
            let endHours = hours + 2;
            const endMinutes = minutes;
            if (endHours > 23) endHours -= 24;
            return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
          })()}` : "N/A"} (2 hours)</p>
          <p>Extras: {[
            includeParking ? "Parking" : "", 
            extraSpace ? "Extra Space" : ""
          ].filter(Boolean).join(", ") || "None"}</p>
        </div>

        <button
          onClick={handleBook}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SeatModal;