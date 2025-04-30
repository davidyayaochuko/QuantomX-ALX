// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Layout from './components/Layout/Layout';

// Management & Organization Wizard Pages
import RegistrationPage from './pages/RegistrationPage';
import StructurePage from './pages/StructurePage';
import WorkspaceConfigurationPage from './pages/WorkspaceConfigurationPage';
import BrandingPage from './pages/BrandingPage';
import InvitePage from './pages/InvitePage';

// Public / Booking / Auth Pages
import QuantumXSplitLandingPage from './pages/SplitLoginPage';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import SignUpUser from './pages/SignUpUser';
import BookingPage from './pages/BookingPage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import PaymentPage from './pages/PaymentPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/** Public Landing & Auth */}
        <Route path="/" element={<QuantumXSplitLandingPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/** Booking & History */}
        <Route path="/book" element={<BookingPage />} />
        <Route path="/history" element={<BookingHistoryPage />} />
        <Route path="/payment" element={<PaymentPage />} />

        {/** Management & Organization Wizard under /management/* */}
        <Route path="/management" element={<Layout />}>
          {/** Redirect /management → /management/register */}
          <Route index element={<Navigate to="register" replace />} />

          <Route path="register" element={<RegistrationPage />} />
          <Route path="structure" element={<StructurePage />} />
          <Route path="workspace-config" element={<WorkspaceConfigurationPage />} />
          <Route path="branding" element={<BrandingPage />} />
          <Route path="invites" element={<InvitePage />} />
        </Route>

        {/** Catch-all: redirect unknown URLs back to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
