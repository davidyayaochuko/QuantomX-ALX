// src/components/Seat.js
import React from 'react';

const Seat = ({ id, isBooked, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-16 h-16 flex items-center justify-center rounded-md text-white text-sm font-bold transition-all duration-300
        ${isBooked ? 'bg-red-500 opacity-60 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
      `}
    >
      {id}
    </div>
  );
};

export default Seat;
