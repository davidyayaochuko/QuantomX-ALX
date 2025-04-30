// File: src/components/ParkingSpace.tsx
import React from 'react';

interface ParkingSpaceProps {
  total: number;
  booked: number;
}

const ParkingSpace: React.FC<ParkingSpaceProps> = ({ total, booked }) => {
  const available = total - booked;
  
  // Calculate percentage for progress bar
  const percentage = (booked / total) * 100;
  
  return (
    <div className="p-4 border rounded-lg bg-white shadow-md w-64">
      <h3 className="text-xl font-semibold mb-3">Parking Space</h3>
      
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Usage</span>
        <span className="text-sm font-medium">{booked}/{total}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className={`h-2.5 rounded-full ${percentage > 80 ? 'bg-red-600' : 'bg-green-600'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex flex-col">
        <p className="text-sm text-gray-600">Total: {total}</p>
        <p className="text-sm text-gray-600">Booked: {booked}</p>
        <p className={`text-sm font-medium ${available > 0 ? 'text-green-600' : 'text-red-600'}`}>
          Available: {available}
        </p>
      </div>
    </div>
  );
};

export default ParkingSpace;