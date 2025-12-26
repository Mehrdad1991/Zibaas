
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
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] text-slate-900 overflow-x-hidden">
      {/* Premium Navigation */}
      <nav className="bg-white/80 backdrop-blur-2xl sticky top-0 z-[60] border-b border-slate-100 h-16 md:h-24 flex items-center transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
             {user ? (
              <button onClick={() => onTabChange('dashboard')} className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 hover:bg-pink-50 hover:border-pink-100 transition-all group">
                 <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg shadow-pink-200">
                   {user.role ? user.role[0] : '?'}
                 </div>
                 <span className="text-xs font-bold text-slate-600 hidden sm:inline group-hover:text-pink-600">{toPersianDigits(user.phone)}</span>
              </button>
            ) : (
              <button onClick={onAuthOpen} className="bg-slate-900 text-white px-6 md:px-8 py-2.5 md:py-3.5 rounded-2xl font-black text-[10px] md:text-sm hover:bg-pink-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                ورود | عضویت
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-12">
            <div className="hidden lg:flex gap-10 items-center">
              {[
                { id: 'home', label: 'صفحه اصلی' },
                { id: 'booking', label: 'خدمات زیبایی' },
                { id: 'store', label: 'تجهیزات پزشکی' },
                { id: 'surgery', label: 'کلینیک و اتاق عمل' },
                { id: 'rental', label: 'فضای کاری' }
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => onTabChange(item.id)} 
                  className={`text-sm font-bold transition-all relative group py-2 ${activeTab === item.id ? 'text-pink-600' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600 rounded-full animate-in fade-in slide-in-from-bottom-1"></span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('home')}>
               <div className="flex flex-col items-end">
                 <span className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter italic leading-none">Zibaas</span>
                 <span className="text-[8px] font-black text-pink-500 tracking-[0.3em] uppercase">Premium Care</span>
               </div>
               <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-tr from-pink-600 to-rose-500 text-white rounded-2xl flex items-center justify-center text-xl md:text-3xl font-black shadow-2xl shadow-pink-200 group-hover:rotate-6 transition-transform">Z</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-32 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 text-right">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center justify-end gap-4">
               <div className="flex flex-col items-end">
                 <span className="text-3xl font-black text-white tracking-tighter italic leading-none">Zibaas</span>
                 <span className="text-[10px] font-black text-pink-500 tracking-[0.2em] uppercase">Advanced Aesthetics</span>
               </div>
               <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-2xl shadow-pink-900">Z</div>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-lg ml-auto text-sm md:text-base">
              زیباست، اولین اکوسیستم هوشمند و تخصصی خدمات زیبایی و درمانی در ایران است که با بهره‌گیری از هوش مصنوعی، مسیری مطمئن میان مراجعین، متخصصین و کلینیک‌های برتر ایجاد کرده است.
            </p>
            <div className="flex justify-end gap-5">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-pink-600 transition-all cursor-pointer border border-slate-800">
                    <div className="w-5 h-5 bg-slate-400 rounded-full"></div>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-lg font-black text-white border-r-4 border-pink-600 pr-4">دسترسی سریع</h4>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li className="hover:text-pink-500 cursor-pointer transition-colors">سوالات متداول (FAQ)</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">راهنمای رزرو هوشمند</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">قوانین و حریم خصوصی</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">همکاری با کلینیک‌ها</li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-lg font-black text-white border-r-4 border-pink-600 pr-4">ارتباط با ما</h4>
            <div className="space-y-4 text-slate-400 font-bold text-sm">
               <div className="flex items-center justify-end gap-3">
                  <span>۰۲۱ - ۲۲۰۰۰۰۰۰</span>
                  <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-pink-500">📞</div>
               </div>
               <div className="flex items-center justify-end gap-3">
                  <span>info@zibaas.ir</span>
                  <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-pink-500">✉️</div>
               </div>
               <p className="text-[11px] leading-relaxed text-slate-500">تهران، خیابان جردن، مجتمع تجاری پزشکی نگین، واحد ۴۰۲</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] md:text-xs font-bold order-2 md:order-1">
            © تمامی حقوق معنوی و پلتفرم برای "زیباست" محفوظ است - {toPersianDigits(new Date().getFullYear())}
          </p>
          <div className="flex gap-6 order-1 md:order-2">
             <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <span className="text-[8px] font-black">ENAMAD</span>
             </div>
             <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                <span className="text-[8px] font-black">SAMANDEHI</span>
             </div>
          </div>
        </div>
      </footer>

      <MobileNav activeTab={activeTab} onTabChange={onTabChange} cartCount={cartCount} />
    </div>
  );
};

export default MainLayout;
