
import React from 'react';

interface ConfirmationProps {
  onFinish: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onFinish }) => {
  const trackingCode = "ZB-" + Math.floor(100000 + Math.random() * 900000);
  
  return (
    <div className="py-10 md:py-16 text-center space-y-12 animate-in zoom-in-95 duration-700 flex flex-col items-center">
      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-20 animate-pulse scale-150"></div>
        <div className="relative w-32 h-32 md:w-44 md:h-44 bg-emerald-500 text-white rounded-[45px] md:rounded-[60px] flex items-center justify-center text-6xl md:text-7xl shadow-3xl shadow-emerald-200 group-hover:rotate-6 transition-transform">
           ✓
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">رزرو شما با موفقیت قطعی شد!</h2>
        <p className="text-slate-500 font-bold text-base md:text-xl max-w-lg mx-auto leading-relaxed">
          پرونده شما در سیستم هوشمند زیباست ایجاد و برای کلینیک ارسال شد. همکاران ما به زودی جهت هماهنگی نهایی با شما تماس می‌گیرند.
        </p>
      </div>

      <div className="w-full max-w-md bg-slate-50 border border-slate-100 p-8 rounded-[40px] space-y-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-2 h-full bg-pink-600"></div>
         <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <span className="text-slate-900 font-black text-xl">{trackingCode}</span>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Tracking Number</span>
         </div>
         <div className="flex flex-col gap-3 text-right">
            <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
               <span className="text-pink-600">📍</span>
               آدرس کلینیک و لوکیشن برای شما پیامک شد.
            </div>
            <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
               <span className="text-pink-600">🕒</span>
               لطفاً ۱۵ دقیقه قبل از زمان رزرو در محل حضور داشته باشید.
            </div>
         </div>
      </div>

      <div className="bg-pink-600 p-8 rounded-[40px] text-white w-full max-w-md shadow-2xl shadow-pink-100 flex items-center gap-6 text-right">
         <div className="text-4xl">🎁</div>
         <div>
            <h4 className="font-black text-lg">هدیه وفاداری زیباست</h4>
            <p className="text-xs font-bold text-pink-100 opacity-80">یک کد تخفیف ۲۰٪ برای اولین خرید از فروشگاه زیباست به حساب شما افزوده شد.</p>
         </div>
      </div>

      <div className="pt-8 w-full max-w-md space-y-4">
        <button 
          onClick={onFinish}
          className="w-full bg-slate-900 text-white py-6 rounded-[32px] font-black text-xl shadow-3xl hover:bg-pink-600 transition-all active:scale-95"
        >
          ورود به پنل و مدیریت رزروها
        </button>
        <button 
          onClick={() => window.print()}
          className="w-full py-4 text-slate-400 font-black text-sm hover:text-slate-600 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          چاپ فاکتور و تاییدیه رسمی
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
