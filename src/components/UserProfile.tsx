// File: src/components/UserProfile.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface UserProfileProps {
    onClose: () => void;
}

interface Booking {
    id: string;
    seatId: number;
    date: string;
    time: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    position: string;
    department: string;
    profileImage: string;
    joinDate: string;
    recentBookings: Booking[];
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
    // Sample user data - this would come from your auth system/backend
    const user: User = {
        id: 'usr123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        department: 'Engineering',
        profileImage: '/api/placeholder/128/128',
        joinDate: '2023-05-15',
        recentBookings: [
            { id: 'bk001', seatId: 15, date: '2025-04-22', time: '09:00' },
            { id: 'bk002', seatId: 27, date: '2025-04-25', time: '13:30' },
            { id: 'bk003', seatId: 8, date: '2025-04-28', time: '10:00' }
        ]
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-40 flex flex-col h-full">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto">
                {/* User profile section */}
                <div className="flex flex-col items-center p-6 border-b border-gray-200">
                    <div className="relative">
                        <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-600">{user.position}</p>
                    <p className="text-sm text-gray-500">{user.department}</p>
                </div>

                {/* User details section */}
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Account Details</h3>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-700">{user.email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Member since</p>
                            <p className="text-gray-700">{formatDate(user.joinDate)}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Employee ID</p>
                            <p className="text-gray-700">{user.id}</p>
                        </div>
                    </div>
                </div>

                {/* Recent bookings section */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

                    <div className="space-y-3">
                        {user.recentBookings.map(booking => (
                            <div key={booking.id} className="bg-gray-50 p-3 rounded-md">
                                <div className="flex justify-between">
                                    <span className="font-medium">Seat #{booking.seatId}</span>
                                    <span className="text-sm text-blue-600">{booking.time}</span>
                                </div>
                                <p className="text-sm text-gray-600">{formatDate(booking.date)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Link to="/history" className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center">
                            View All Bookings
                        </Link>
                    </div>

                    <div className="mt-4">
                        <Link to="/payment" className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center">
                            Go to Payment
                        </Link>
                    </div>
                </div>
            </div>

            {/* Settings and logout section - fixed at bottom */}
            <div className="p-6 border-t border-gray-200 mt-auto">
                <div className="flex justify-between">
                    <button className="text-gray-700 hover:text-gray-900 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </button>

                    <button className="text-red-600 hover:text-red-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;