
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const navLinks = [
    { path: '/', label: 'خانه' },
    { path: '/search', label: 'رزرو خدمات' },
    { path: '/store', label: 'فروشگاه' },
    { path: '/dashboard', label: 'پنل مدیریت' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-xl sticky top-0 z-[60] border-b border-gray-100 h-16 md:h-20 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link 
            to="/auth/login"
            className="bg-gray-100 text-gray-900 px-5 md:px-8 py-2 md:py-2.5 rounded-2xl font-black text-[10px] md:text-sm hover:bg-pink-600 hover:text-white transition-all"
          >
            ورود | ثبت‌نام
          </Link>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex gap-10 items-center">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-black transition-all relative group ${
                  activePath === link.path ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'
                }`}
              >
                {link.label}
                {activePath === link.path && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
          <Link to="/" className="text-2xl md:text-4xl font-black text-pink-600 flex items-center gap-3">
             <span className="hidden md:inline tracking-tighter italic">Zibaas</span>
             <div className="w-10 h-10 md:w-14 md:h-14 bg-pink-600 text-white rounded-[16px] md:rounded-[20px] flex items-center justify-center text-xl md:text-3xl font-black shadow-2xl shadow-pink-200">Z</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
