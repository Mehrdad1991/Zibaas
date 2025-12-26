
import React from 'react';
import { MOCK_SERVICES } from '../../constants';
import { Service } from '../../types';

interface SelectServiceProps {
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  onNext: () => void;
}

const SelectService: React.FC<SelectServiceProps> = ({ selectedService, onSelect, onNext }) => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-right flex flex-col h-full">
      <div className="space-y-3">
        <div className="inline-block bg-pink-50 text-pink-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-100">Step 01: Identification</div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">کدام خدمت را رزرو می‌کنید؟</h3>
        <p className="text-slate-400 font-bold text-base">انتخاب دقیق خدمت برای تخصیص بهترین متخصص و تجهیزات الزامی است.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_SERVICES.map(service => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`flex flex-row-reverse items-center gap-5 p-6 rounded-[35px] border-2 transition-all group relative overflow-hidden ${
              selectedService?.id === service.id 
                ? 'border-pink-600 bg-pink-50 shadow-xl shadow-pink-100' 
                : 'border-slate-100 bg-white hover:border-pink-200'
            }`}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl shrink-0 group-hover:scale-105 transition-transform">
               <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
            </div>
            <div className="flex-1 text-right space-y-2">
              <h4 className="font-black text-slate-900 text-lg md:text-xl">{service.name}</h4>
              <div className="flex items-center justify-end gap-3">
                <span className="text-[10px] font-black text-pink-600 bg-white px-2 py-0.5 rounded-lg border border-pink-100 shadow-sm">{toPersianDigits(service.duration)} دقیقه</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-none">Medical Grade</span>
              </div>
              <div className="mt-2 text-slate-900 font-black text-xl">
                {toPersianDigits(service.price.toLocaleString())} <span className="text-[10px] font-bold text-slate-400">تومان</span>
              </div>
            </div>
            {selectedService?.id === service.id && (
              <div className="absolute top-4 left-4 w-8 h-8 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-in zoom-in">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 p-6 rounded-[30px] border border-amber-100 flex items-start gap-4 shadow-inner">
         <span className="text-2xl">📋</span>
         <div className="text-right">
            <p className="text-[11px] text-amber-900 font-black mb-1">شرایط عمومی دریافت خدمات:</p>
            <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
               تایید این مرحله به منزله پذیرش «قوانین بهداشتی زیباست» و نداشتن بیماری‌های زمینه‌ای مغایر با پروتکل انتخابی می‌باشد.
            </p>
         </div>
      </div>

      <div className="mt-auto pt-8">
        <button 
          disabled={!selectedService}
          onClick={onNext}
          className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl shadow-2xl hover:bg-pink-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95 flex items-center justify-center gap-4 group"
        >
          <span>تایید و قفل موقت زمان</span>
          <svg className="w-6 h-6 rotate-180 group-hover:translate-x-[-4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
        </button>
      </div>
    </div>
  );
};

export default SelectService;
