
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';

const DashboardLayout: React.FC = () => {
  const menuItems = [
    { path: '/dashboard/user', label: 'میز کار من', icon: '👤' },
    { path: '/dashboard/technician', label: 'پنل تخصصی', icon: '💉' },
    { path: '/dashboard/clinic', label: 'مدیریت کلینیک', icon: '🏥' },
    { path: '/', label: 'بازگشت به سایت', icon: '🏠' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-[32px] p-4 shadow-sm border border-gray-100 sticky top-28">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-black transition-all ${
                      isActive 
                        ? 'bg-pink-600 text-white shadow-lg shadow-pink-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-pink-600'
                    }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
