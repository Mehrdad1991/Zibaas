
import React, { useState } from 'react';

interface PaymentProps {
  booking: any;
  onConfirm: () => void;
  onBack: () => void;
}

const Payment: React.FC<PaymentProps> = ({ booking, onConfirm, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handlePay = () => {
    if (!acceptedPolicy) return;
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-right flex flex-col h-full">
      <div className="space-y-3">
        <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Step 04: Final Settlement</div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">پیش‌فاکتور و تایید نهایی</h3>
        <p className="text-slate-400 font-bold text-base leading-relaxed">لطفاً جزئیات رزرو را بررسی کرده و قوانین لغو نوبت را تایید نمایید.</p>
      </div>

      <div className="bg-slate-950 rounded-[50px] p-10 md:p-14 text-white space-y-10 relative overflow-hidden shadow-4xl border border-white/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-[120px]"></div>
        
        <div className="flex justify-between items-end border-b border-white/10 pb-8 relative z-10">
          <div className="text-left">
             <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.3em] mb-2">Invoice No</p>
             <p className="text-lg font-black font-mono">ZB-{Math.floor(Math.random() * 90000) + 10000}</p>
          </div>
          <div className="text-right">
             <h4 className="font-black text-3xl md:text-5xl text-pink-500 mb-2">{booking.service?.name}</h4>
             <span className="px-4 py-1.5 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">Premium Aesthetic Service</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5">
               <span className="font-black text-lg">{booking.date}</span>
               <span className="text-slate-500 text-xs font-bold">تاریخ رزرو شده</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5">
               <span className="font-black text-lg">{toPersianDigits(booking.time)}</span>
               <span className="text-slate-500 text-xs font-bold">ساعت حضور</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5">
               <span className="font-black text-lg">{booking.patientName}</span>
               <span className="text-slate-500 text-xs font-bold">نام مراجع</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5">
               <span className="font-black text-lg">{toPersianDigits(booking.phone)}</span>
               <span className="text-slate-500 text-xs font-bold">شماره تماس</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
           <div className="flex flex-col items-center md:items-end order-2 md:order-1">
              <div className="flex items-center gap-3">
                 <span className="text-sm md:text-xl text-slate-400 font-bold">تومان</span>
                 <p className="text-5xl md:text-7xl font-black text-white tracking-tighter">{toPersianDigits((booking.service?.price || 0).toLocaleString())}</p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-pink-600 mt-4 font-black">Total Payable Amount</p>
           </div>
           <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[35px] text-center md:text-right order-1 md:order-2 max-w-xs">
              <p className="text-emerald-400 font-black text-xs mb-2">✓ بیمه کیفیت زیباست</p>
              <p className="text-[9px] text-slate-400 leading-relaxed font-bold">
                 رزرو شما تحت پوشش گارانتی ۱۰۰٪ رضایت زیباست است. مبلغ پرداختی تا زمان تایید نهایی شما نزد ما امانت می‌ماند.
              </p>
           </div>
        </div>
      </div>

      {/* Policy Agreement */}
      <button 
        onClick={() => setAcceptedPolicy(!acceptedPolicy)}
        className={`p-6 rounded-[30px] border-2 transition-all flex items-start gap-5 text-right group ${acceptedPolicy ? 'border-pink-600 bg-pink-50' : 'border-slate-100 bg-white hover:border-pink-200'}`}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${acceptedPolicy ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>
           {acceptedPolicy ? '✓' : ''}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-black text-slate-900 tracking-tight">قوانین و شرایط لغو نوبت را می‌پذیرم</p>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
             امکان لغو رایگان تا ۲۴ ساعت قبل از موعد نوبت وجود دارد. لغو در کمتر از ۲۴ ساعت مشمول ۲۰٪ جریمه کنسلی کادر درمان خواهد بود.
          </p>
        </div>
      </button>

      <div className="mt-auto pt-4 flex gap-4">
        <button onClick={onBack} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[32px] font-black">بازگشت</button>
        <button 
          disabled={!acceptedPolicy || isProcessing}
          onClick={handlePay}
          className={`flex-[2] py-6 rounded-[32px] font-black text-xl shadow-2xl transition-all relative overflow-hidden active:scale-95 ${
            !acceptedPolicy ? 'bg-slate-100 text-slate-300' : 'bg-pink-600 text-white shadow-pink-100 hover:bg-pink-700'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-4">
               <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
               <span className="animate-pulse tracking-tight">در حال اتصال به شاپرک...</span>
            </div>
          ) : 'تایید و پرداخت آنلاین فاکتور'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
