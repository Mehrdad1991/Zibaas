
import React from 'react';
import { Clinic, Service } from '../types';
import { MOCK_SERVICES } from '../constants';

interface ClinicProfileProps {
  clinic: Clinic;
  onBack: () => void;
  onBookService: (service: Service) => void;
}

const ClinicProfile: React.FC<ClinicProfileProps> = ({ clinic, onBack, onBookService }) => {
  const clinicServices = MOCK_SERVICES.filter(s => clinic.services.includes(s.id));
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-700">
      {/* Back Button (Elite Style) */}
      <button 
        onClick={onBack}
        className="mb-6 md:mb-10 flex items-center gap-3 text-slate-400 hover:text-pink-600 font-black transition-all group text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        بازگشت به لیست مراکز
      </button>

      {/* Hero Header (High End) */}
      <div className="relative h-[300px] md:h-[550px] rounded-[32px] md:rounded-[60px] overflow-hidden shadow-3xl mb-10 md:mb-16 border-4 md:border-8 border-white group">
        <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" alt={clinic.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6 md:p-12 text-right">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-center justify-end gap-2 md:gap-3">
               <span className="bg-pink-600 text-white text-[8px] md:text-[10px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest shadow-xl">Verified Clinic</span>
               <div className="flex gap-0.5 md:gap-1 text-amber-400">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-sm md:text-xl">★</span>)}
               </div>
            </div>
            <h1 className="text-2xl md:text-7xl font-black text-white drop-shadow-2xl">{clinic.name}</h1>
            <p className="text-xs md:text-2xl text-slate-200 font-medium flex items-center justify-end gap-2 md:gap-3 opacity-90">
              {clinic.address}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-7 md:w-7 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12 md:space-y-16">
          {/* Detailed About (Premium Glass) */}
          <section className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-pink-50 rounded-bl-full -z-10"></div>
            <h2 className="text-xl md:text-4xl font-black mb-6 md:mb-8 text-slate-900 border-r-4 md:border-r-8 border-pink-600 pr-4 md:pr-6 text-right">درباره مرکز درمانی</h2>
            <p className="text-slate-500 leading-relaxed md:leading-loose text-sm md:text-xl font-medium text-right whitespace-pre-line opacity-90">
              {clinic.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 md:pt-10 mt-8 md:mt-10 border-t border-slate-50">
               {[
                 { l: 'تأسیس', v: '۱۳۹۲', i: '📅' },
                 { l: 'پزشکان', v: '۱۲ متخصص', i: '👨‍⚕️' },
                 { l: 'رضایت', v: '۹۸٪', i: '⭐' },
                 { l: 'مساحت', v: '۴۵۰ متر', i: '🏢' },
               ].map((item, i) => (
                 <div key={i} className="text-center space-y-1">
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">{item.i}</div>
                    <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.l}</p>
                    <p className="text-sm md:text-lg font-black text-slate-900">{toPersianDigits(item.v)}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* High Density Services List (Digikala Style Grid) */}
          <section className="space-y-6 md:space-y-10 text-right">
            <h2 className="text-xl md:text-4xl font-black text-slate-900 border-r-4 md:border-r-8 border-pink-600 pr-4 md:pr-6">خدمات و تعرفه‌ها</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {clinicServices.map(service => (
                <div key={service.id} className="bg-white p-4 md:p-8 rounded-[28px] md:rounded-[40px] border border-slate-100 flex flex-col gap-4 md:gap-6 hover:shadow-2xl transition-all group">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-2xl md:rounded-[30px] overflow-hidden shadow-inner shrink-0 border border-white">
                       <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={service.name} />
                    </div>
                    <div className="text-right">
                       <h4 className="text-sm md:text-xl font-black text-slate-900 group-hover:text-pink-600 transition-colors leading-tight">{service.name}</h4>
                       <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">{toPersianDigits(service.duration)} Minutes</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-slate-50">
                    <button 
                      onClick={() => onBookService(service)}
                      className="bg-slate-900 text-white px-5 py-2 md:px-8 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs hover:bg-pink-600 transition-all shadow-xl shadow-slate-200"
                    >
                      رزرو نوبت
                    </button>
                    <div className="text-right">
                       <div className="text-sm md:text-2xl font-black text-slate-900">{toPersianDigits(service.price.toLocaleString())}</div>
                       <div className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase">Toman</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Sticky Action Card (Luxury Medical Design) */}
        <div className="lg:col-span-4">
          <div className="bg-slate-950 p-8 md:p-10 rounded-[40px] md:rounded-[60px] shadow-3xl sticky top-32 space-y-8 md:space-y-10 text-white text-right overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-600/20 rounded-full blur-[80px]"></div>
            
            <div className="space-y-3 md:space-y-4 relative z-10">
               <h3 className="text-xl md:text-3xl font-black tracking-tight">رزرو هوشمند</h3>
               <p className="text-slate-400 font-medium text-xs md:text-sm leading-relaxed opacity-80">
                 در کمترین زمان ممکن، اولین نوبت خالی برای شما توسط هوش مصنوعی پیدا خواهد شد.
               </p>
            </div>

            <div className="space-y-3 md:space-y-4 relative z-10">
              <div className="p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 space-y-1">
                <p className="text-[9px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em]">Next Available</p>
                <p className="text-base md:text-xl font-black">فردا - ساعت ۰۹:۳۰</p>
              </div>
              <div className="p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 space-y-1">
                <p className="text-[9px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em]">Trust Score</p>
                <p className="text-base md:text-xl font-black text-amber-500 flex items-center justify-end gap-1.5">
                   {toPersianDigits(clinic.rating)} / ۵
                   <span className="text-sm md:text-lg">★</span>
                </p>
              </div>
            </div>

            <button className="w-full py-4 md:py-6 bg-pink-600 text-white rounded-[20px] md:rounded-[30px] font-black text-sm md:text-lg shadow-3xl shadow-pink-900/50 hover:bg-white hover:text-slate-950 hover:scale-[1.02] transition-all relative z-10 active:scale-95">
              مشاوره فوری AI
            </button>
            
            <div className="pt-6 border-t border-white/5 text-center relative z-10">
               <p className="text-[8px] md:text-[10px] text-slate-500 font-bold leading-relaxed">
                 تمامی رزروها در Zibaas شامل تضمین بازگشت وجه و امنیت کامل اطلاعات پزشکی است.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
