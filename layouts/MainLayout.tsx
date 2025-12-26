
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import MobileNav from '../components/MobileNav.tsx';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MobileNav activeTab="home" onTabChange={() => {}} cartCount={0} />
      {/* Footer can be added here */}
    </div>
  );
};

export default MainLayout;
