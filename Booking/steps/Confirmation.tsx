
import React from 'react';

interface ConfirmationProps {
  onFinish: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onFinish }) => {
  return (
    <div className="py-12 md:py-20 text-center space-y-12 animate-in zoom-in-95 duration-700">
      <div className="relative inline-block group">
        <div className="absolute inset-0 bg-green-500 blur-3xl opacity-30 animate-pulse group-hover:scale-150 transition-transform"></div>
        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-green-500 text-white rounded-[45px] md:rounded-[65px] flex items-center justify-center text-6xl md:text-8xl shadow-3xl shadow-green-200">
           ✨
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">رزرو شما با موفقیت ثبت شد!</h2>
        <p className="text-slate-500 font-bold text-sm md:text-xl max-w-sm mx-auto leading-relaxed">
          نوبت شما در سیستم زیباست ثبت گردید. کد رهگیری برای شماره موبایل شما پیامک شد.
        </p>
      </div>

      <div className="pt-10">
        <button 
          onClick={onFinish}
          className="bg-slate-900 text-white px-12 py-5 rounded-[30px] font-black text-lg md:text-xl shadow-3xl hover:bg-pink-600 transition-all active:scale-95"
        >
          ورود به پنل کاربری زیباست
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
