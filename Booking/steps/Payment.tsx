
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
    // Simulate payment gateway delay
    setTimeout(() => {
      onConfirm();
    }, 2500);
  };

  const totalPrice = booking.service?.price || 0;
  const platformFee = Math.floor(totalPrice * 0.05); // 5% fee example

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-right flex flex-col h-full">
      <div className="space-y-3">
        <div className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Step 04: Secure Payment</div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">پیش‌فاکتور و تایید نهایی</h3>
        <p className="text-slate-400 font-bold text-base leading-relaxed">لطفاً پیش از اتصال به درگاه بانکی، اطلاعات رزرو خود را به دقت بررسی کنید.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Invoice Card */}
        <div className="lg:col-span-7 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
           <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <span className="font-black text-slate-900">جزئیات فاکتور رزرو</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Invoice No.</p>
                <p className="text-xs font-mono font-black">ZB-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
           </div>
           <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                 <div className="text-right">
                    <p className="font-black text-slate-900">{booking.service?.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold">خدمت انتخابی</p>
                 </div>
                 <span className="font-black text-slate-900">{toPersianDigits(totalPrice.toLocaleString())} تومان</span>
              </div>
              <div className="flex justify-between items-center">
                 <div className="text-right">
                    <p className="font-black text-slate-900">حق سرویس و بیمه Zibaas</p>
                    <p className="text-[10px] text-slate-400 font-bold">تضمین کیفیت و بازگشت وجه</p>
                 </div>
                 <span className="font-black text-slate-900">{toPersianDigits(platformFee.toLocaleString())} تومان</span>
              </div>
              <div className="pt-6 border-t border-dashed border-slate-200 flex justify-between items-center">
                 <span className="text-xl font-black text-slate-900">مبلغ قابل پرداخت:</span>
                 <div className="text-left">
                    <span className="text-3xl font-black text-pink-600">{toPersianDigits((totalPrice + platformFee).toLocaleString())}</span>
                    <span className="text-xs font-bold text-slate-400 mr-2">تومان</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-indigo-900 rounded-[40px] p-8 text-white space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              <h4 className="text-lg font-black flex items-center flex-row-reverse gap-3">
                 <span className="text-2xl">👤</span>
                 اطلاعات مراجع
              </h4>
              <div className="space-y-3 opacity-80 font-bold text-sm">
                 <div className="flex justify-between">
                    <span>{booking.patientName}</span>
                    <span className="text-indigo-300">نام:</span>
                 </div>
                 <div className="flex justify-between">
                    <span>{toPersianDigits(booking.phone)}</span>
                    <span className="text-indigo-300">تماس:</span>
                 </div>
                 <div className="flex justify-between">
                    <span>{booking.date} - {toPersianDigits(booking.time)}</span>
                    <span className="text-indigo-300">زمان:</span>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => setAcceptedPolicy(!acceptedPolicy)}
             className={`w-full p-6 rounded-[30px] border-2 transition-all flex items-start gap-4 text-right group ${acceptedPolicy ? 'border-pink-600 bg-pink-50' : 'border-slate-100 bg-white hover:border-pink-200'}`}
           >
             <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 mt-1 ${acceptedPolicy ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>
                {acceptedPolicy ? '✓' : ''}
             </div>
             <p className="text-[10px] font-bold text-slate-500 leading-relaxed">
                قوانین کنسلی (لغو رایگان تا ۲۴ ساعت قبل) و پروتکل‌های بهداشتی زیباست را مطالعه کرده و می‌پذیرم.
             </p>
           </button>
        </div>
      </div>

      <div className="mt-auto pt-8 flex gap-4">
        <button onClick={onBack} disabled={isProcessing} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[32px] font-black hover:bg-slate-200 transition-all">بازگشت</button>
        <button 
          disabled={!acceptedPolicy || isProcessing}
          onClick={handlePay}
          className={`flex-[2] py-6 rounded-[32px] font-black text-xl shadow-2xl transition-all relative overflow-hidden active:scale-95 ${
            !acceptedPolicy || isProcessing ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-pink-600 text-white shadow-pink-100 hover:bg-pink-700'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-4">
               <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
               <span className="animate-pulse">در حال تایید تراکنش...</span>
            </div>
          ) : 'پرداخت و نهایی‌سازی رزرو'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
