
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard/user', label: 'پنل کاربر', icon: '👤' },
    { path: '/dashboard/technician', label: 'پنل متخصص', icon: '💉' },
    { path: '/dashboard/clinic', label: 'مدیریت کلینیک', icon: '🏥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 sticky top-28">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${
                    location.pathname === item.path
                      ? 'bg-pink-600 text-white shadow-lg'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-pink-600'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
