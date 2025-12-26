
import React from 'react';

interface BookingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onCancel: () => void;
}

const BookingLayout: React.FC<BookingLayoutProps> = ({ children, currentStep, onCancel }) => {
  const steps = [
    { n: 1, l: 'انتخاب خدمت' },
    { n: 2, l: 'زمان حضور' },
    { n: 3, l: 'اطلاعات شما' },
    { n: 4, l: 'تایید و پرداخت' }
  ];

  return (
    <div className="min-h-screen bg-[#FDF2F8] flex flex-col items-center justify-start py-8 px-4 md:py-20">
      <div className="max-w-3xl w-full flex flex-col gap-8 md:gap-12">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-sm border border-pink-100">
          <button 
            onClick={onCancel}
            className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-all border border-slate-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="text-right">
             <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-none">رزرو نوبت زیباست</h1>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Smart Aesthetic Booking</p>
          </div>
        </div>

        {/* Progress Stepper */}
        {currentStep < 5 && (
          <div className="bg-white p-6 rounded-[35px] border border-pink-50 shadow-sm flex items-center justify-between gap-2 px-8">
             {steps.map((s, i) => (
               <React.Fragment key={s.n}>
                 <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                      currentStep >= s.n ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'bg-slate-50 text-slate-300'
                    }`}>
                       {currentStep > s.n ? '✓' : s.n}
                    </div>
                    <span className={`text-[9px] font-black hidden md:block ${currentStep >= s.n ? 'text-slate-900' : 'text-slate-400'}`}>{s.l}</span>
                 </div>
                 {i < steps.length - 1 && (
                   <div className={`h-1 flex-1 rounded-full ${currentStep > s.n ? 'bg-pink-600' : 'bg-slate-50'}`}></div>
                 )}
               </React.Fragment>
             ))}
          </div>
        )}

        {/* Step Container */}
        <div className="bg-white rounded-[50px] p-8 md:p-12 shadow-3xl border border-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -z-10 opacity-60"></div>
           {children}
        </div>
      </div>
    </div>
  );
};

export default BookingLayout;
