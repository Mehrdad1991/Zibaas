
import React from 'react';
import { Technician, Service } from '../types';
import { MOCK_SERVICES } from '../constants';

interface TechnicianProfileProps {
  technician: Technician;
  onBack: () => void;
  onBookService: (service: Service) => void;
}

const TechnicianProfile: React.FC<TechnicianProfileProps> = ({ technician, onBack, onBookService }) => {
  const techServices = MOCK_SERVICES.filter(s => technician.offeredServices.includes(s.id));
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 animate-in fade-in duration-700">
      <button 
        onClick={onBack}
        className="mb-8 md:mb-12 flex items-center gap-3 text-slate-400 hover:text-pink-600 font-black transition-all group text-sm md:text-base"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        بازگشت به بانک متخصصین
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        {/* Elite Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8 md:space-y-10">
          <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-sm border border-slate-100 text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-pink-50 rounded-bl-full -z-10"></div>
            <div className="relative mb-6 md:mb-10 group">
               <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-[50px] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
               <img src={technician.image} className="w-32 h-32 md:w-48 md:h-48 rounded-[28px] md:rounded-[44px] object-cover relative ring-4 md:ring-8 ring-white shadow-2xl" alt={technician.name} />
               {technician.isVerified && (
                 <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-blue-600 text-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-xl border-4 border-white">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                 </div>
               )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{technician.name}</h1>
            <p className="text-pink-600 font-black text-xs md:text-lg mb-6 md:mb-10 uppercase tracking-widest">{technician.specialty}</p>
            
            <div className="grid grid-cols-2 gap-6 md:gap-10 w-full mb-8 md:mb-12">
               <div className="text-right">
                  <p className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase mb-1">Reviews</p>
                  <p className="text-lg md:text-2xl font-black text-slate-900">{toPersianDigits(technician.reviewCount)}</p>
               </div>
               <div className="text-left">
                  <p className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase mb-1">Rating</p>
                  <p className="text-lg md:text-2xl font-black text-amber-500">{toPersianDigits(technician.rating)} ★</p>
               </div>
            </div>

            <button className="w-full py-4 md:py-6 bg-slate-900 text-white rounded-[24px] md:rounded-[36px] font-black text-sm md:text-lg hover:bg-pink-600 transition-all shadow-3xl shadow-slate-200 active:scale-95">
              رزرو مستقیم نوبت
            </button>
          </div>

          <div className="bg-slate-950 p-8 md:p-12 rounded-[40px] md:rounded-[60px] text-white space-y-6 md:space-y-8 shadow-3xl overflow-hidden relative border border-white/5">
             <div className="absolute top-0 left-0 w-32 h-32 bg-pink-600/10 rounded-full blur-[80px]"></div>
             <h3 className="text-lg md:text-2xl font-black border-r-4 border-pink-600 pr-4 tracking-tight">خلاصه تخصص</h3>
             <p className="text-slate-400 leading-relaxed md:leading-loose text-sm md:text-lg font-medium text-right italic opacity-90">
               "{technician.bio}"
             </p>
          </div>
        </div>

        {/* Professional Body (Grid-based Case Studies) */}
        <div className="lg:col-span-8 space-y-12 md:space-y-20">
          {/* Portfolio Grid (High Density) */}
          <section className="space-y-8 md:space-y-12 text-right">
            <h2 className="text-xl md:text-5xl font-black text-slate-900 tracking-tighter border-r-4 md:border-r-8 border-pink-600 pr-4 md:pr-6">نمونه کارها و نتایج (Portfolio)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {technician.portfolio.map(item => (
                <div key={item.id} className="group bg-white rounded-[32px] md:rounded-[50px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-3xl transition-all duration-500 flex flex-col">
                   <div className="aspect-[4/3] overflow-hidden relative border-4 md:border-8 border-white">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-10">
                         <span className="text-white text-[10px] md:text-xs font-black bg-pink-600 px-4 py-2 rounded-xl shadow-xl">مشاهده جزئیات مورد</span>
                      </div>
                   </div>
                   <div className="p-6 md:p-10 space-y-2 md:space-y-4">
                      <h4 className="text-lg md:text-3xl font-black text-slate-900 leading-tight">{item.title}</h4>
                      <p className="text-slate-400 text-xs md:text-base font-medium leading-relaxed opacity-80">{item.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Service Packages (Compact List) */}
          <section className="space-y-8 md:space-y-12 text-right">
            <h2 className="text-xl md:text-5xl font-black text-slate-900 tracking-tighter border-r-4 md:border-r-8 border-pink-600 pr-4 md:pr-6">پکیج‌های درمانی</h2>
            <div className="space-y-4 md:space-y-6">
              {techServices.map(service => (
                <div key={service.id} className="bg-white p-5 md:p-8 rounded-[28px] md:rounded-[48px] border border-slate-100 flex flex-col md:flex-row-reverse justify-between items-center gap-6 md:gap-10 group hover:border-pink-200 transition-all shadow-sm hover:shadow-3xl duration-500">
                   <div className="flex items-center gap-4 md:gap-10 flex-row-reverse w-full md:w-auto">
                      <div className="w-16 h-16 md:w-28 md:h-28 rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl border-2 md:border-4 border-white shrink-0 group-hover:rotate-2 transition-transform">
                         <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
                      </div>
                      <div className="text-right">
                         <h4 className="text-lg md:text-3xl font-black text-slate-900 mb-1 md:mb-3 leading-tight">{service.name}</h4>
                         <div className="flex gap-2 md:gap-4 items-center justify-end">
                            <span className="text-[8px] md:text-xs font-black text-slate-400 uppercase tracking-widest">{toPersianDigits(service.duration)} Min</span>
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-pink-500 rounded-full"></span>
                            <span className="text-[8px] md:text-xs font-black text-pink-500 uppercase tracking-widest">Elite Care</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                      <div className="text-center md:text-left">
                         <div className="text-xl md:text-4xl font-black text-slate-900 leading-none mb-1">{toPersianDigits(service.price.toLocaleString())}</div>
                         <div className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest">Toman</div>
                      </div>
                      <button 
                        onClick={() => onBookService(service)}
                        className="w-full md:w-auto bg-slate-900 text-white px-8 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-[30px] font-black text-xs md:text-lg group-hover:bg-pink-600 transition-all shadow-2xl shadow-slate-200 active:scale-95"
                      >
                        رزرو سریع
                      </button>
                   </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;
