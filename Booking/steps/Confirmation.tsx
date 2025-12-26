
import React from 'react';

interface ConfirmationProps {
  onFinish: () => void;
  type?: 'BOOKING' | 'ORDER';
}

const Confirmation: React.FC<ConfirmationProps> = ({ onFinish, type = 'BOOKING' }) => {
  const trackingCode = "ZB-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('fa-IR');
  
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="py-12 md:py-20 text-center space-y-12 animate-in zoom-in-95 duration-700 flex flex-col items-center max-w-3xl mx-auto px-4">
      {/* Success Animation Container */}
      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-500 blur-[100px] opacity-20 animate-pulse scale-150"></div>
        <div className="relative w-32 h-32 md:w-44 md:h-44 bg-emerald-500 text-white rounded-[50px] md:rounded-[70px] flex items-center justify-center text-6xl md:text-8xl shadow-4xl shadow-emerald-200 group-hover:rotate-6 transition-transform">
           ✓
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">
          {type === 'BOOKING' ? 'رزرو شما تایید شد!' : 'خرید شما با موفقیت ثبت شد!'}
        </h2>
        <p className="text-slate-500 font-bold text-lg md:text-2xl max-w-xl mx-auto leading-relaxed italic">
          {type === 'BOOKING' 
            ? 'تاییدیه زمان حضور و آدرس کلینیک برای شما پیامک شد. خوشحالیم که همراه مایید.'
            : 'سفارش شما در مرحله پردازش قرار گرفت. تیم Zibaas Express به زودی با شما تماس می‌گیرد.'}
        </p>
      </div>

      {/* Digital Receipt Card */}
      <div className="w-full bg-white border-2 border-slate-100 p-10 md:p-14 rounded-[60px] shadow-sm space-y-10 relative overflow-hidden text-right print:border-none print:shadow-none">
         <div className="absolute top-0 right-0 w-full h-4 bg-slate-900"></div>
         
         <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-6 border-b border-slate-50 pb-8">
            <div className="text-right">
               <h3 className="text-2xl font-black text-slate-900">رسید دیجیتال Zibaas</h3>
               <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Digital Official Invoice</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-3xl">
               <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-4xl">🧾</div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-slate-900">{toPersianDigits(trackingCode)}</span>
                  <span className="text-slate-400 font-bold">شماره پیگیری:</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-slate-900">{toPersianDigits(orderDate)}</span>
                  <span className="text-slate-400 font-bold">تاریخ ثبت:</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="font-black text-slate-900">پرداخت آنلاین (موفق)</span>
                  <span className="text-slate-400 font-bold">وضعیت پرداخت:</span>
               </div>
            </div>
            
            <div className="flex flex-col items-center justify-center border-r-2 border-dashed border-slate-100 pr-10">
               <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 mb-2">
                  {/* QR Code Placeholder */}
                  <div className="grid grid-cols-3 gap-1 opacity-20">
                     {[...Array(9)].map((_,i) => <div key={i} className="w-4 h-4 bg-slate-900 rounded-sm"></div>)}
                  </div>
               </div>
               <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Scan for E-Invoice</p>
            </div>
         </div>

         <div className="pt-8 border-t border-slate-50 text-center">
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
              این رسید به منزله تایید نهایی در پلتفرم زیباست می‌باشد. جزئیات کامل در بخش «داشبورد من» قابل مشاهده است.
            </p>
         </div>
      </div>

      {/* Rewards Card */}
      <div className="bg-gradient-to-l from-pink-600 to-rose-500 p-8 rounded-[45px] text-white w-full shadow-4xl shadow-pink-200 flex items-center justify-between px-10">
         <div className="text-right">
            <h4 className="font-black text-2xl tracking-tighter">هدیه ویژه زیباست 🎁</h4>
            <p className="text-sm font-bold text-pink-100 mt-1 opacity-90">٪۱۵ تخفیف روی خرید بعدی شما لحاظ شد.</p>
         </div>
         <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center text-3xl">✨</div>
      </div>

      <div className="pt-4 w-full flex flex-col md:flex-row gap-4">
        <button 
          onClick={onFinish}
          className="flex-1 bg-slate-900 text-white py-6 rounded-[35px] font-black text-xl shadow-4xl hover:bg-pink-600 transition-all active:scale-95"
        >
          بازگشت به پنل کاربری
        </button>
        <button 
          onClick={() => window.print()}
          className="flex-1 py-6 bg-white border-2 border-slate-100 text-slate-400 font-black text-xl hover:text-slate-900 rounded-[35px] flex items-center justify-center gap-3 transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          چاپ فاکتور رسمی
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
