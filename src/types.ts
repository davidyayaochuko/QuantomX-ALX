// src/types.ts

// Booking-related interfaces
export interface Seat {
    id: number;
    isBooked: boolean;
    time?: string | null;
    includeParking?: boolean;
    extraSpace?: boolean;
    type?: string;
    location?: string;
  }
  
  export interface SeatBooking {
    id: number;
    seatId: number;
    date?: string;
    time?: string;
    includeParking: boolean;
    extraSpace: boolean;
    bookingTime: string;
    cancelled?: boolean;
    cancelTime?: string;
  }
  
  // Component Props interfaces
  export interface FloorPlanProps {
    selectedDate: Date;
    selectedTime: string;
  }
  
  export interface SeatGridProps {
    selectedDate: Date;
    selectedTime: string;
  }
  
  export interface SeatListProps {
    selectedDate: Date;
    selectedTime: string;
  }
  
  export interface SeatProps {
    id: number;
    isBooked: boolean;
    onClick: () => void;
  }
  
  export interface SeatModalProps {
    seat: Seat;
    onClose: () => void;
    onBook: (id: number, time: string, includeParking: boolean, extraSpace: boolean) => void;
    parkingAvailable: number;
    selectedDate: Date;
  }
  
  export interface ParkingSpaceProps {
    total: number;
    booked: number;
  }
  
  export interface UserProfileProps {
    onClose: () => void;
  }
  
  export interface MeetingLabelProps {
    label: string;
    top: string | number;
    left: string | number;
  }
  
  // Type definitions for common patterns
  export type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';
  export type StatusFilter = 'all' | 'active' | 'cancelled';
  
  // Storage keys as constants
  export const SEATS_STORAGE_KEY = 'bookedSeats';
  export const PARKING_STORAGE_KEY = 'parkingSpaces';
  export const BOOKING_HISTORY_KEY = 'bookingHistory';