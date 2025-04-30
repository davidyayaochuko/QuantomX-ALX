// File: src/components/Calendar.tsx
import React, { useState, useEffect, ReactElement } from 'react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SEATS_STORAGE_KEY = 'bookedSeats';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

interface BookedDates {
  [key: string]: number;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookedDates, setBookedDates] = useState<BookedDates>({});

  useEffect(() => {
    // Load booked seats data to highlight dates with bookings
    const storedBookingsStr = localStorage.getItem(SEATS_STORAGE_KEY);
    const storedBookings: any[] = storedBookingsStr ? JSON.parse(storedBookingsStr) : [];
    
    // Create a map of dates with bookings
    const dates: BookedDates = {};
    storedBookings.forEach(booking => {
      // Using a simple format for date keys (YYYY-MM-DD)
      const bookingDate = new Date().toISOString().split('T')[0];
      dates[bookingDate] = (dates[bookingDate] || 0) + 1;
    });
    
    setBookedDates(dates);
  }, []);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = (): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = (): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day: number): void => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  // Generate calendar grid
  const renderCalendar = (): ReactElement[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days: ReactElement[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const hasBookings = bookedDates[dateString] > 0;
      
      days.push(
        <div 
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          className={`h-8 flex items-center justify-center rounded-full cursor-pointer relative
            ${isToday ? 'font-bold' : ''}
            ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}
          `}
        >
          {day}
          {hasBookings && (
            <span className="absolute bottom-0 w-1 h-1 bg-blue-600 rounded-full"></span>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;