// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import RegistrationPage from './pages/RegistrationPage';
import StructurePage from './pages/StructurePage';
import BrandingPage from './pages/BrandingPage';
import InvitePage from './pages/InvitePage';
import WorkspaceConfigurationPage from './pages/WorkspaceConfigurationPage';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/structure" element={<StructurePage />} />
        <Route path="/workspace-config" element={<WorkspaceConfigurationPage />} />
        <Route path="/branding" element={<BrandingPage />} />
        <Route path="/invites" element={<InvitePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
