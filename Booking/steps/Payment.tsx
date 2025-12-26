
import React, { useState } from 'react';

interface PaymentProps {
  booking: any;
  onConfirm: () => void;
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ booking, onConfirm, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right">
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-slate-900">۴. تایید نهایی و پرداخت</h3>
        <p className="text-slate-400 font-bold text-sm italic">خلاصه رزرو خود را بررسی کرده و هزینه را پرداخت نمایید.</p>
      </div>

      <div className="bg-slate-900 rounded-[45px] p-8 md:p-12 text-white space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] -z-0"></div>
        <div className="flex justify-between items-center border-b border-white/10 pb-6 relative z-10">
          <span className="font-black text-xl md:text-3xl text-pink-500">{booking.service?.name}</span>
          <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Premium Service</span>
        </div>
        
        <div className="space-y-6 relative z-10">
          <div className="flex justify-between text-sm md:text-lg">
             <span className="font-black">{booking.date} - ساعت {toPersianDigits(booking.time)}</span>
             <span className="text-slate-500">زمان رزرو</span>
          </div>
          <div className="flex justify-between text-sm md:text-lg">
             <span className="font-black">{booking.patientName}</span>
             <span className="text-slate-500">نام مراجع</span>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-end">
             <div className="text-left">
                <p className="text-3xl md:text-5xl font-black text-pink-600">{toPersianDigits((booking.service?.price || 0).toLocaleString())}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-600 mt-2 font-black">Toman (Total Amount)</p>
             </div>
             <p className="text-xs md:text-base font-black text-slate-400">مبلغ قابل پرداخت</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-[30px] border border-amber-100 flex items-start gap-4 shadow-sm">
        <span className="text-3xl">🛡️</span>
        <p className="text-[11px] md:text-xs text-amber-900 font-black leading-relaxed">
           رزرو شما شامل "ضمانت طلایی بازگشت وجه" زیباست می‌باشد. در صورت لغو تا ۲۴ ساعت قبل از زمان نوبت، کل وجه به کیف پول شما بازگردانده می‌شود.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-[25px] font-black">بازگشت</button>
        <button 
          onClick={handlePay}
          className="flex-[2] py-5 bg-pink-600 text-white rounded-[25px] font-black text-lg shadow-2xl shadow-pink-100 hover:bg-pink-700 relative overflow-hidden active:scale-95 transition-all"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-3">
               <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
               <span className="animate-pulse">در حال اتصال...</span>
            </div>
          ) : 'تایید و پرداخت آنلاین'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
