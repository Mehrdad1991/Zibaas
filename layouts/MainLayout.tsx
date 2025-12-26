
import React from 'react';
import MobileNav from '../components/MobileNav';

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: any) => void;
  cartCount: number;
  user: any;
  onAuthOpen: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  cartCount, 
  user,
  onAuthOpen 
}) => {
  const safePersian = (n: any) => {
    if (n === null || n === undefined) return '';
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x: string) => farsiDigits[parseInt(x)]);
  };

  const navItems = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'booking', label: 'خدمات زیبایی' },
    { id: 'tech-directory', label: 'متخصصین' },
    { id: 'store', label: 'تجهیزات پزشکی' },
    { id: 'surgery', label: 'کلینیک و اتاق عمل' },
    { id: 'rental', label: 'فضای کاری' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] text-slate-900 overflow-x-hidden font-vazir">
      <nav className="bg-white/90 backdrop-blur-2xl sticky top-0 z-[60] border-b border-slate-100 h-16 md:h-24 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
             {user && user.userId ? (
              <button onClick={() => onTabChange('dashboard')} className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 hover:bg-pink-50 transition-all group">
                 <div className="w-8 h-8 bg-pink-600 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg">
                   {user.role ? user.role[0] : 'U'}
                 </div>
                 <span className="text-xs font-bold text-slate-600 hidden sm:inline group-hover:text-pink-600">
                   {user.role === 'ADMIN' ? 'مدیر سیستم' : safePersian(user.phone || 'پنل کاربری')}
                 </span>
              </button>
            ) : (
              <button onClick={onAuthOpen} className="bg-slate-900 text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-2xl font-black text-xs md:text-sm hover:bg-pink-600 transition-all shadow-xl">
                ورود | عضویت
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-8 items-center">
              {navItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => onTabChange(item.id)} 
                  className={`text-[13px] font-black transition-all relative group py-2 ${activeTab === item.id ? 'text-pink-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('home')}>
               <div className="flex flex-col items-end">
                 <span className="text-xl md:text-3xl font-black text-slate-900 italic tracking-tighter leading-none">Zibaas</span>
                 <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest leading-none">Premium Care</span>
               </div>
               <div className="w-10 h-10 md:w-14 md:h-14 bg-pink-600 text-white rounded-2xl flex items-center justify-center text-xl md:text-3xl font-black shadow-2xl">Z</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-950 text-white pt-16 pb-32 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-right">
           <p className="text-slate-500 text-[10px] font-bold">
             © تمامی حقوق برای زیباست محفوظ است - {safePersian(new Date().getFullYear())}
           </p>
        </div>
      </footer>
      <MobileNav activeTab={activeTab} onTabChange={onTabChange} cartCount={cartCount} />
    </div>
  );
};

export default MainLayout;
