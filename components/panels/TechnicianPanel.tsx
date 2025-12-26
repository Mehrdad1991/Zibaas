
import React from 'react';

const TechnicianPanel: React.FC = () => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-right">
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">میز کار متخصص (Freelance Hub)</h2>
        <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-4">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account Balance</span>
           <span className="text-xl font-black text-pink-500">{toPersianDigits('۱۸,۵۰۰,۰۰۰')} تومان</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900 border-r-4 border-pink-600 pr-4">نوبت‌های رزرو شده امروز</h3>
              <div className="py-12 text-center space-y-4">
                 <div className="text-6xl">📅</div>
                 <p className="text-slate-400 font-bold">نوبتی برای امروز ثبت نشده است.</p>
                 <button className="bg-pink-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-pink-100 transition-all hover:bg-pink-700">باز کردن اسلات زمانی جدید</button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900">آمار عملکرد کلی</h3>
              <div className="space-y-4">
                 {[
                   { label: 'رضایت مشتریان', val: '۴.۹ از ۵', color: 'text-amber-500' },
                   { label: 'نوبت‌های انجام شده', val: '۱۲۴ مورد', color: 'text-slate-900' },
                   { label: 'نرخ بازگشت مشتری', val: '٪۶۸', color: 'text-emerald-600' },
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                      <span className={`font-black ${stat.color}`}>{toPersianDigits(stat.val)}</span>
                      <span className="text-xs font-bold text-slate-400">{stat.label}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-900 p-8 rounded-[40px] text-white space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <h4 className="font-black text-lg">پیشنهاد هوشمند Zibaas</h4>
              <p className="text-xs text-indigo-200 leading-relaxed font-medium">بر اساس آنالیز بازار، تقاضا برای «فیشیال تخصصی» در منطقه شما ۱۵٪ افزایش یافته است. پیشنهاد می‌کنیم قیمت‌های خود را به‌روزرسانی کنید.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianPanel;
