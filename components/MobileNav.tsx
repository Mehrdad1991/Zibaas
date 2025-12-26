
import React from 'react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
  cartCount: number;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange, cartCount }) => {
  const tabs = [
    { id: 'home', label: 'خانه', icon: (active: boolean) => (
      <svg className="h-6 w-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'booking', label: 'خدمات', icon: (active: boolean) => (
      <svg className="h-6 w-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'store', label: 'فروشگاه', icon: (active: boolean) => (
      <div className="relative">
        <svg className="h-6 w-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
            {cartCount}
          </span>
        )}
      </div>
    )},
    { id: 'surgery', label: 'اتاق عمل', icon: (active: boolean) => (
      <svg className="h-6 w-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )},
    { id: 'dashboard', label: 'زیباست من', icon: (active: boolean) => (
      <svg className="h-6 w-6" fill={active ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] px-2 py-2 flex justify-around items-center z-[60]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            onTabChange(tab.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-all relative ${
            activeTab === tab.id ? 'text-pink-600' : 'text-gray-400'
          }`}
        >
          {activeTab === tab.id && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-pink-600 rounded-full animate-in fade-in duration-300"></span>
          )}
          <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
            {tab.icon(activeTab === tab.id)}
          </div>
          <span className={`text-[10px] font-black transition-all ${activeTab === tab.id ? 'opacity-100' : 'opacity-80'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MobileNav;
