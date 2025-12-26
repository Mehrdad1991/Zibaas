
import React from 'react';
import { Role } from '../store/roles';

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
  const getMenuItems = () => {
    const common = [{ id: 'home', label: 'بازگشت به سایت', icon: '🏠' }];
    
    switch (user?.role) {
      case Role.User:
        return [
          { id: 'dashboard', label: 'میز کار من', icon: '👤' },
          { id: 'booking', label: 'نوبت‌های من', icon: '📅' },
          { id: 'analysis', label: 'گزارش‌های AI', icon: '✨' },
          ...common
        ];
      case Role.Technician:
        return [
          { id: 'dashboard', label: 'مدیریت برند شخصی', icon: '🛠️' },
          { id: 'rental', label: 'رزرو اتاق عمل', icon: '🔑' },
          { id: 'tech-profile', label: 'ویرایش پورتفولیو', icon: '🖼️' },
          ...common
        ];
      case Role.Clinic:
        return [
          { id: 'dashboard', label: 'پنل مدیریت کلینیک', icon: '🏥' },
          { id: 'surgery', label: 'تقویم جراحی‌ها', icon: '🩺' },
          ...common
        ];
      case Role.Admin:
        return [
          { id: 'dashboard', label: 'داشبورد مدیریتی', icon: '⚙️' },
          { id: 'tech-directory', label: 'تایید متخصصین', icon: '👥' },
          { id: 'store', label: 'تراکنش‌های مالی', icon: '💰' },
          ...common
        ];
      default:
        return common;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row-reverse overflow-x-hidden font-vazir">
      <aside className="w-full md:w-72 bg-slate-900 flex flex-col sticky top-0 md:h-screen shadow-2xl z-50 order-first md:order-last">
        <div className="p-8 border-b border-slate-800 flex items-center justify-center">
          <div className="flex items-center gap-3 flex-row-reverse" onClick={() => onTabChange('home')}>
             <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-xl font-black text-white">Z</div>
             <span className="text-white font-black text-lg">Zibaas</span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all flex-row-reverse justify-end ${
                activeTab === item.id 
                  ? 'bg-pink-600 text-white' 
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
           <button 
             onClick={onLogout}
             className="w-full py-3 bg-rose-500/10 text-rose-400 rounded-xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all"
           >
             خروج از سیستم
           </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-6 md:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
