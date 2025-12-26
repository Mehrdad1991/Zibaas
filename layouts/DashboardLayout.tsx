
import React from 'react';
import { UserRole } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  activeTab: string;
  onTabChange: (tab: any) => void;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  user, 
  activeTab, 
  onTabChange, 
  onLogout 
}) => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  // Define menu items based on role
  const getMenuItems = () => {
    const common = [{ id: 'home', label: 'بازگشت به سایت', icon: '🏠' }];
    
    switch (user?.role) {
      case UserRole.CUSTOMER:
        return [
          { id: 'dashboard', label: 'زیباستِ من', icon: '👤' },
          { id: 'booking', label: 'رزروهای من', icon: '📅' },
          { id: 'analysis', label: 'تاریخچه آنالیز AI', icon: '✨' },
          ...common
        ];
      case UserRole.TECHNICIAN:
        return [
          { id: 'dashboard', label: 'میز کار متخصص', icon: '🛠️' },
          { id: 'rental', label: 'اجاره اتاق عمل', icon: '🔑' },
          { id: 'tech-profile', label: 'مدیریت پورتفولیو', icon: '🖼️' },
          ...common
        ];
      case UserRole.CLINIC_ADMIN:
        return [
          { id: 'dashboard', label: 'کنترل‌پنل کلینیک', icon: '🏥' },
          { id: 'surgery', label: 'مانیتورینگ اتاق عمل', icon: '🩺' },
          { id: 'tech-directory', label: 'جذب متخصص', icon: '👥' },
          ...common
        ];
      default:
        return common;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row-reverse overflow-x-hidden">
      {/* Dynamic Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 flex flex-col sticky top-0 md:h-screen shadow-2xl z-50 order-first md:order-last">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between md:justify-center">
          <div className="flex items-center gap-3 flex-row-reverse">
             <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-xl font-black text-white shadow-lg">Z</div>
             <div className="text-right">
                <span className="text-white font-black text-lg block leading-none">Zibaas</span>
                <span className="text-pink-500 text-[9px] font-black uppercase tracking-widest">Dashboard</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <div className="mb-4 px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">دسترسی‌های سریع</div>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all flex-row-reverse justify-end ${
                activeTab === item.id 
                  ? 'bg-pink-600 text-white shadow-xl shadow-pink-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-950/50">
           <div className="flex items-center justify-between flex-row-reverse mb-6">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl">👤</div>
              <div className="text-right">
                 <p className="text-[10px] text-slate-500 font-bold uppercase">{user?.role}</p>
                 <p className="text-white text-xs font-black">{toPersianDigits(user?.phone || '')}</p>
              </div>
           </div>
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-4 px-6 py-3 rounded-xl font-black text-xs text-rose-400 hover:bg-rose-500/10 transition-all flex-row-reverse justify-end"
           >
             <span className="text-lg">🚪</span>
             خروج از حساب
           </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex bg-white h-20 border-b px-12 items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-4 flex-row-reverse">
              <div className="bg-green-50 px-4 py-2 rounded-xl flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-green-700 uppercase">Live System</span>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-pink-600 transition-all">🔔</button>
              <button className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-pink-600 transition-all">⚙️</button>
           </div>
        </header>

        <main className="p-6 md:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
