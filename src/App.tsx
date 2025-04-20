// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import StructurePage from './pages/StructurePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/structure" element={<StructurePage />} />
    </Routes>
  );
}

export default App;
