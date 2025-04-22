// File: src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BookingPage from './pages/BookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import SignUpUser from './pages/SignUpUser';
import PaymentPage from './pages/PaymentPage';
import QuantumXSplitLandingPage from './pages/SplitLoginPage'; // Split landing page

import './App.css'; // keep this as is for global styles

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Split Landing Page as the default route */}
        <Route path="/" element={<QuantumXSplitLandingPage />} />

        {/* Login Pages */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/signup" element={<SignUpUser />} />

        {/* Main App Pages */}
        <Route path="/book" element={<BookingPage />} />
        <Route path="/history" element={<BookingHistoryPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/* Legacy route */}
        <Route path="/admin" element={<LoginAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
