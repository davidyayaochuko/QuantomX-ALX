// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BookingPage from './pages/BookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import SignUpUser from './pages/SignUpUser';
import PaymentPage from './pages/PaymentPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Pages */}
        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/signup" element={<SignUpUser />} />

        {/* Login Pages */}
        <Route path="/" element={<LoginUser />} />
        <Route path="/admin" element={<LoginAdmin />} />

        {/* Main App Pages */}
        <Route path="/book" element={<BookingPage />} />
        <Route path="/history" element={<BookingHistoryPage />} />

        <Route path="/payment" element={<PaymentPage />} /> {/* ✅ added */}

      </Routes>
    </Router>
  );
}

export default App;
