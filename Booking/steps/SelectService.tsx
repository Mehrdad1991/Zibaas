
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
    <div className="space-y-8 animate-in fade-in duration-500 text-right">
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-slate-900">۱. انتخاب نوع خدمت</h3>
        <p className="text-slate-400 font-bold text-sm italic">لطفاً خدمتی که مایل به دریافت آن هستید را انتخاب کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_SERVICES.map(service => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`flex flex-row-reverse items-center gap-4 p-5 rounded-[32px] border-2 transition-all group ${
              selectedService?.id === service.id 
                ? 'border-pink-600 bg-pink-50' 
                : 'border-slate-100 bg-white hover:border-pink-200'
            }`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-inner shrink-0">
               <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
            </div>
            <div className="flex-1 text-right">
              <h4 className="font-black text-slate-900 text-sm md:text-lg">{service.name}</h4>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{toPersianDigits(service.duration)} Minutes</p>
              <div className="mt-2 text-pink-600 font-black text-sm md:text-lg">
                {toPersianDigits(service.price.toLocaleString())} <span className="text-[10px] font-bold text-slate-400">تومان</span>
              </div>
            </div>
            {selectedService?.id === service.id && (
              <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-slate-50">
        <button 
          disabled={!selectedService}
          onClick={onNext}
          className="w-full py-5 bg-pink-600 text-white rounded-[25px] font-black text-lg shadow-2xl shadow-pink-100 hover:bg-pink-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95"
        >
          تایید و انتخاب زمان
        </button>
      </div>
    </div>
  );
};

export default SelectService;
