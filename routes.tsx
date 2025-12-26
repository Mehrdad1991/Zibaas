
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import DashboardLayout from './layouts/DashboardLayout.tsx';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'));
const SearchResults = lazy(() => import('./pages/SearchResults.tsx'));
const ClinicDetail = lazy(() => import('./pages/ClinicDetail.tsx'));
const TechnicianDetail = lazy(() => import('./pages/TechnicianDetail.tsx'));
const BookingPage = lazy(() => import('./pages/Booking/BookingPage.tsx'));
const Login = lazy(() => import('./pages/Auth/Login.tsx'));
const Signup = lazy(() => import('./pages/Auth/Signup.tsx'));

// Dashboard Pages
const UserDashboard = lazy(() => import('./pages/Dashboard/UserDashboard.tsx'));
const ClinicDashboard = lazy(() => import('./pages/Dashboard/ClinicDashboard.tsx'));
const TechnicianDashboard = lazy(() => import('./pages/Dashboard/TechnicianDashboard.tsx'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">در حال بارگذاری...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/clinic/:id" element={<ClinicDetail />} />
          <Route path="/technician/:id" element={<TechnicianDetail />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="clinic" element={<ClinicDashboard />} />
          <Route path="technician" element={<TechnicianDashboard />} />
          <Route index element={<Navigate to="user" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
