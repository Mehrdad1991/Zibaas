
import React, { useState, useEffect } from 'react';

interface BookingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onCancel: () => void;
}

const BookingLayout: React.FC<BookingLayoutProps> = ({ children, currentStep, onCancel }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes lock

  useEffect(() => {
    if (currentStep > 1 && currentStep < 5) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const steps = [
    { n: 1, l: 'انتخاب خدمت' },
    { n: 2, l: 'زمان حضور' },
    { n: 3, l: 'اطلاعات سیستم' },
    { n: 4, l: 'صدور فاکتور' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-start py-6 px-4 md:py-16 overflow-x-hidden">
      <div className="max-w-4xl w-full flex flex-col gap-6 md:gap-8">
        
        {/* System Trust Header */}
        <div className="flex justify-between items-center bg-white p-5 rounded-[30px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
             <button 
                onClick={onCancel}
                className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all border border-slate-100"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              {currentStep > 1 && currentStep < 5 && (
                <div className="hidden md:flex items-center gap-3 bg-rose-50 px-4 py-2 rounded-xl border border-rose-100">
                   <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                   <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">نوبت شما موقتاً رزرو شد: {formatTime(timeLeft)}</span>
                </div>
              )}
          </div>
          <div className="flex items-center gap-4 flex-row-reverse">
             <div className="text-right">
                <h1 className="text-lg md:text-xl font-black text-slate-900 leading-none">سیستم رزرواسیون زیباست</h1>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Authorized Booking Portal</p>
             </div>
             <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg">Z</div>
          </div>
        </div>

        {/* Dynamic Progress Engine */}
        {currentStep < 5 && (
          <div className="bg-slate-900 p-6 rounded-[35px] shadow-2xl flex items-center justify-between gap-2 px-8 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-600/10 to-transparent pointer-events-none"></div>
             {steps.map((s, i) => (
               <React.Fragment key={s.n}>
                 <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-500 ${
                      currentStep === s.n ? 'bg-pink-600 text-white scale-110 shadow-xl shadow-pink-900/50' : 
                      currentStep > s.n ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'
                    }`}>
                       {currentStep > s.n ? '✓' : s.n}
                    </div>
                    <span className={`text-[10px] font-black hidden md:block ${currentStep >= s.n ? 'text-white' : 'text-slate-600'}`}>{s.l}</span>
                 </div>
                 {i < steps.length - 1 && (
                   <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-700 ${currentStep > s.n ? 'w-full bg-emerald-500' : 'w-0'}`}></div>
                   </div>
                 )}
               </React.Fragment>
             ))}
          </div>
        )}

        {/* Step Body */}
        <div className="bg-white rounded-[50px] p-8 md:p-14 shadow-3xl border border-white relative min-h-[500px] flex flex-col">
           <div className="absolute top-10 left-10 opacity-[0.03] pointer-events-none">
              <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
           </div>
           {children}
        </div>

        {/* Integrity Bar */}
        {currentStep < 5 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { t: 'امنیت SSL', d: 'رمزنگاری بانکی', i: '🔒' },
               { t: 'تایید فوری', d: 'ثبت در سیستم کلینیک', i: '⚡' },
               { t: 'بیمه خدمات', d: 'گارانتی بازگشت وجه', i: '🛡️' },
               { t: 'پشتیبانی', d: '۲۴ ساعته آنلاین', i: '📞' },
             ].map((item, idx) => (
               <div key={idx} className="bg-white/60 backdrop-blur p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <span className="text-xl">{item.i}</span>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-900 leading-none">{item.t}</p>
                     <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">{item.d}</p>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingLayout;
