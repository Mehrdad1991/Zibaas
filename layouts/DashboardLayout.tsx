
import React, { useState } from 'react';
import { Role } from '../store/roles';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: any;
  activeTab: string;
  onTabChange: (tab: any) => void;
  onLogout: () => void;
  onSelectRole?: (role: Role) => void; // Added for role switching
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  user, 
  activeTab, 
  onTabChange, 
  onLogout,
  onSelectRole
}) => {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const getMenuItems = () => {
    const common = [{ id: 'home', label: 'بازگشت به سایت', icon: '🏠' }];
    
    switch (user?.role) {
      case Role.User:
        return [
          { id: 'dashboard', label: 'داشبورد من', icon: '👤' },
          { id: 'booking', label: 'نوبت‌های من', icon: '📅' },
          { id: 'store', label: 'سفارشات کالا', icon: '📦' },
          { id: 'analysis', label: 'گزارش‌های AI', icon: '✨' },
          ...common
        ];
      case Role.Technician:
        return [
          { id: 'dashboard', label: 'پنل متخصص', icon: '🛠️' },
          { id: 'rental', label: 'رزرو اتاق عمل', icon: '🔑' },
          { id: 'tech-profile', label: 'پورتفولیو من', icon: '🖼️' },
          ...common
        ];
      case Role.Clinic:
        return [
          { id: 'dashboard', label: 'مدیریت کلینیک', icon: '🏥' },
          { id: 'surgery', label: 'تقویم جراحی', icon: '🩺' },
          { id: 'store', label: 'تدارکات و انبار', icon: '📦' },
          ...common
        ];
      case Role.Admin:
        return [
          { id: 'dashboard', label: 'مدیریت کل', icon: '⚙️' },
          { id: 'tech-directory', label: 'تایید متخصصین', icon: '👥' },
          ...common
        ];
      default:
        return common;
    }
  };

  const roleLabels: Record<Role, string> = {
    [Role.User]: 'مراجع (کاربر عادی)',
    [Role.Technician]: 'متخصص (تکنسین)',
    [Role.Clinic]: 'مدیر کلینیک',
    [Role.Admin]: 'مدیر سیستم (ادمین)',
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row-reverse overflow-x-hidden font-vazir">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-slate-900 flex flex-col sticky top-0 md:h-screen shadow-2xl z-50 order-first md:order-last">
        <div className="p-8 border-b border-slate-800 flex items-center justify-between flex-row-reverse">
          <div className="flex items-center gap-3 flex-row-reverse cursor-pointer" onClick={() => onTabChange('home')}>
             <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-pink-900/40">Z</div>
             <span className="text-white font-black text-lg">Zibaas</span>
          </div>
          <div className="md:hidden">
             {/* Mobile menu toggle could go here */}
          </div>
        </div>

        {/* Current Identity Info */}
        <div className="px-6 py-6 bg-white/5 border-b border-white/5">
           <div className="flex flex-row-reverse items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl border border-white/10 shadow-inner">
                 {user?.role === Role.User ? '👤' : user?.role === Role.Technician ? '💉' : '🏥'}
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-0.5">Current Identity</p>
                 <p className="text-sm font-black text-white">{roleLabels[user?.role as Role] || 'ناشناس'}</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all flex-row-reverse justify-end group ${
                activeTab === item.id 
                  ? 'bg-pink-600 text-white shadow-xl shadow-pink-900/50' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`text-xl transition-transform ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Role Switcher - DEVELOPER/DEMO MODE */}
        <div className="p-6 border-t border-slate-800 space-y-4">
           <div className="relative">
             <button 
               onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
               className="w-full py-4 bg-white/5 border border-white/10 text-slate-400 rounded-2xl text-[10px] font-black flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
             >
                <svg className={`w-4 h-4 transition-transform ${showRoleSwitcher ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                تغییر هویت (مشاهده سایر پنل‌ها)
             </button>
             
             {showRoleSwitcher && (
               <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-2">
                  {(Object.keys(roleLabels) as Role[]).map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        onSelectRole?.(role);
                        setShowRoleSwitcher(false);
                      }}
                      className={`w-full p-4 text-right text-[10px] font-black transition-all hover:bg-pink-600 hover:text-white border-b border-slate-700 last:border-none ${user?.role === role ? 'text-pink-500' : 'text-slate-300'}`}
                    >
                      {roleLabels[role]}
                    </button>
                  ))}
               </div>
             )}
           </div>

           <button 
             onClick={onLogout}
             className="w-full py-4 bg-rose-500/10 text-rose-500 rounded-2xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
           >
             خروج از سیستم زیباست
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/50 backdrop-blur-md h-20 md:h-24 px-6 md:px-10 flex items-center justify-between border-b border-slate-200 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-pink-600 transition-all">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              </button>
              <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center font-black text-pink-600">
                 {user?.phone ? user.phone.slice(-2) : '??'}
              </div>
           </div>
           <div className="text-right">
              <h2 className="text-lg md:text-xl font-black text-slate-900">میز کار {roleLabels[user?.role as Role]?.split('(')[0]}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dashboard System Management</p>
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
