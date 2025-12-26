
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import Home from './pages/Home.tsx';
import SearchResults from './pages/SearchResults.tsx';
import ClinicDetail from './pages/ClinicDetail.tsx';
import TechnicianDetail from './pages/TechnicianDetail.tsx';
import Login from './pages/Auth/Login.tsx';
import Signup from './pages/Auth/Signup.tsx';
import UserDashboard from './pages/Dashboard/UserDashboard.tsx';
import ClinicDashboard from './pages/Dashboard/ClinicDashboard.tsx';
import TechnicianDashboard from './pages/Dashboard/TechnicianDashboard.tsx';
import AIChatbot from './components/AIChatbot.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/clinic/:id" element={<ClinicDetail />} />
          <Route path="/technician/:id" element={<TechnicianDetail />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>

        {/* Dashboard Routes with Sidebar Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="clinic" element={<ClinicDashboard />} />
          <Route path="technician" element={<TechnicianDashboard />} />
          <Route index element={<Navigate to="user" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Global Components */}
      <AIChatbot />
    </BrowserRouter>
  );
};

export default App;
