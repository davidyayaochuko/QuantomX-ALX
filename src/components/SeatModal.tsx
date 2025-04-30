import React, { useState } from 'react';

interface SeatModalProps {
  seat: {
    id: number;
    [key: string]: any;
  };
  onClose: () => void;
  onBook: (id: number, time: string, includeParking: boolean, extraSpace: boolean) => void;
  parkingAvailable: number;
  selectedDate: Date;
}

const SeatModal: React.FC<SeatModalProps> = ({ 
  seat, 
  onClose, 
  onBook, 
  parkingAvailable, 
  selectedDate 
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [includeParking, setIncludeParking] = useState<boolean>(false);
  const [extraSpace, setExtraSpace] = useState<boolean>(false);

  const handleBook = () => {
    if (selectedTime) {
      onBook(seat.id, selectedTime, includeParking, extraSpace);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <>
      {/* Modal overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div 
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Book Workspace #{seat.id}
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Select a time for {formatDate(selectedDate)}
              </p>
            </div>
            
            {/* Time selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {times.map(time => (
                  <button
                    key={time}
                    className={`py-2 px-3 text-sm font-medium rounded-md ${
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
            </div>
            
            {/* Options */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="include-parking"
                  checked={includeParking}
                  onChange={(e) => setIncludeParking(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  disabled={parkingAvailable < 1}
                />
                <label htmlFor="include-parking" className="ml-2 text-sm text-gray-700">
                  Include parking {parkingAvailable > 0 
                    ? `(${parkingAvailable} available)` 
                    : '(No spaces available)'}
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="extra-space"
                  checked={extraSpace}
                  onChange={(e) => setExtraSpace(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="extra-space" className="ml-2 text-sm text-gray-700">
                  Need extra space
                </label>
              </div>
            </div>
            
            {/* Booking summary */}
            <div className="mb-6 bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Booking Summary</h4>
              <p className="text-sm text-gray-600 mb-1">Workspace: #{seat.id}</p>
              <p className="text-sm text-gray-600 mb-1">Date: {formatDate(selectedDate)}</p>
              <p className="text-sm text-gray-600">Duration: {selectedTime ? `${selectedTime} - ${(() => {
                // Add 2 hours to the selected time
                if (selectedTime) {
                  const [hours, minutes] = selectedTime.split(':').map(Number);
                  let endHours = hours + 2;
                  const endMinutes = minutes;
                  if (endHours > 23) endHours -= 24;
                  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
                }
                return '';
              })()}` : '-'}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBook}
                className={`py-2 px-4 rounded-md text-sm font-medium text-white ${
                  selectedTime 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!selectedTime}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatModal;


/////