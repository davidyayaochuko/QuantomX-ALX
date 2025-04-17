// File: src/components/SeatModal.js
import React, { useState } from 'react';

const SeatModal = ({ seat, onClose, onBook, parkingAvailable }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [includeParking, setIncludeParking] = useState(false);
  const [extraSpace, setExtraSpace] = useState(false);

  if (!seat) return null;

  const sampleTimes = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15'];

  const handleBook = () => {
    if (!selectedTime) return alert('Please select a time slot.');
    onBook(seat.id, selectedTime, includeParking, extraSpace);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seat {seat.id} - Details</h2>
          <button onClick={onClose} className="text-red-600 text-2xl">&times;</button>
        </div>

        <p className="text-gray-600 mb-2">
          This space is <strong>not available at 08:00</strong>
        </p>
        <p className="font-semibold mb-2">Other available times:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {sampleTimes.map((time) => (
            <button
              key={time}
              className={`px-3 py-1 rounded-md ${
                selectedTime === time
                  ? 'bg-blue-600 text-white'
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        <p className="font-semibold mb-2">Scheduled bookings (Thu 17 Apr):</p>
        <div className="text-sm text-gray-700 space-y-2">
          <div className="p-2 bg-gray-100 rounded">10:30–12:00 — let seat = Ken_A;</div>
          <div className="p-2 bg-gray-100 rounded">14:00–17:00 — let seat = Ken_A;</div>
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