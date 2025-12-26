
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
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-400 hover:text-pink-600 font-black transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          بازگشت به بانک متخصصین
        </button>
        <div className="hidden md:flex gap-4">
           <button className="bg-white border border-slate-100 px-6 py-2.5 rounded-xl font-black text-xs text-slate-600 shadow-sm">ارسال پیام</button>
           <button className="bg-white border border-slate-100 px-6 py-2.5 rounded-xl font-black text-xs text-slate-600 shadow-sm">اشتراک‌گذاری</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Profile Sidebar (Elite Design) */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-12 md:p-16 rounded-[60px] md:rounded-[80px] shadow-sm border border-slate-50 text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-50 rounded-bl-full -z-10 opacity-60"></div>
            
            <div className="relative mb-10 group">
               <div className="absolute -inset-6 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-[60px] opacity-10 blur-2xl group-hover:opacity-30 transition-opacity"></div>
               <img src={technician.image} className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] md:rounded-[60px] object-cover relative ring-8 ring-white shadow-3xl" alt={technician.name} />
               {technician.isVerified && (
                 <div className="absolute -bottom-5 -right-5 bg-blue-600 text-white p-4 rounded-3xl shadow-2xl border-8 border-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                 </div>
               )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter leading-tight">{technician.name}</h1>
            <p className="text-pink-600 font-black text-xs md:text-xl mb-10 uppercase tracking-widest">{technician.specialty}</p>
            
            <div className="grid grid-cols-2 gap-10 w-full mb-12 border-y border-slate-50 py-8">
               <div className="text-center">
                  <p className="text-slate-400 text-[10px] font-black uppercase mb-1 tracking-widest">Satisfied Clients</p>
                  <p className="text-3xl font-black text-slate-900">{toPersianDigits(technician.reviewCount)}</p>
               </div>
               <div className="text-center">
                  <p className="text-slate-400 text-[10px] font-black uppercase mb-1 tracking-widest">Global Rating</p>
                  <p className="text-3xl font-black text-amber-500 flex items-center justify-center gap-2">
                    {toPersianDigits(technician.rating)}
                    <span className="text-xl">★</span>
                  </p>
               </div>
            </div>

            <button 
              onClick={() => onBookService(techServices[0])}
              className="w-full py-6 bg-slate-900 text-white rounded-[35px] font-black text-lg hover:bg-pink-600 transition-all shadow-3xl shadow-slate-200 active:scale-95"
            >
              رزرو مستقیم نوبت
            </button>
          </div>

          <div className="bg-slate-950 p-12 md:p-16 rounded-[60px] text-white space-y-8 shadow-3xl overflow-hidden relative border border-white/5">
             <div className="absolute top-0 left-0 w-32 h-32 bg-pink-600/10 rounded-full blur-[80px]"></div>
             <h3 className="text-2xl font-black border-r-8 border-pink-600 pr-6 tracking-tighter">بیوگرافی تخصصی</h3>
             <p className="text-slate-400 leading-relaxed md:leading-loose text-lg md:text-2xl font-medium text-right italic opacity-90">
               "{technician.bio}"
             </p>
          </div>
        </div>

        {/* Portfolio & Case Studies (High End) */}
        <div className="lg:col-span-8 space-y-24">
          <section className="space-y-12 text-right">
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter border-r-8 border-pink-600 pr-8">گالری نتایج و پورتفولیو</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {technician.portfolio.map(item => (
                <div key={item.id} className="group bg-white rounded-[60px] overflow-hidden shadow-sm border border-slate-50 hover:shadow-4xl transition-all duration-700 flex flex-col relative">
                   <div className="aspect-[4/3] overflow-hidden relative border-8 border-white rounded-[50px] m-3">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                         <span className="text-white text-[10px] font-black bg-pink-600 px-6 py-2.5 rounded-xl shadow-2xl self-end mb-4">View Case Details</span>
                         <h4 className="text-white text-2xl font-black">{item.title}</h4>
                      </div>
                   </div>
                   <div className="p-10 space-y-4 pt-4">
                      <h4 className="text-2xl font-black text-slate-900 leading-tight md:hidden">{item.title}</h4>
                      <p className="text-slate-400 text-lg font-medium leading-relaxed opacity-80">{item.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Service Menu */}
          <section className="space-y-12 text-right pb-12">
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter border-r-8 border-pink-600 pr-8">خدمات و پکیج‌ها</h2>
            <div className="space-y-6">
              {techServices.map(service => (
                <div key={service.id} className="bg-white p-8 md:p-12 rounded-[50px] md:rounded-[70px] border border-slate-50 flex flex-col lg:flex-row-reverse justify-between items-center gap-10 group hover:border-pink-200 transition-all shadow-sm hover:shadow-4xl duration-500 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[60px] -z-10 group-hover:bg-pink-50 transition-colors"></div>
                   <div className="flex items-center gap-10 flex-row-reverse w-full lg:w-auto">
                      <div className="w-24 h-24 md:w-40 md:h-40 rounded-[40px] md:rounded-[55px] overflow-hidden shadow-3xl border-4 md:border-8 border-white shrink-0 group-hover:rotate-2 transition-transform">
                         <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
                      </div>
                      <div className="text-right">
                         <h4 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 leading-tight tracking-tight">{service.name}</h4>
                         <div className="flex gap-4 items-center justify-end">
                            <span className="text-[10px] md:text-sm font-black text-slate-400 uppercase tracking-widest leading-none">{toPersianDigits(service.duration)} Minutes</span>
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            <span className="text-[10px] md:text-sm text-pink-500 font-black uppercase tracking-widest leading-none">VIP Protocol</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex flex-col lg:flex-row items-center gap-12 w-full lg:w-auto pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                      <div className="text-center lg:text-left">
                         <div className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-1">{toPersianDigits(service.price.toLocaleString())}</div>
                         <div className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-widest">Toman (Total Pack)</div>
                      </div>
                      <button 
                        onClick={() => onBookService(service)}
                        className="w-full lg:w-auto bg-slate-900 text-white px-12 md:px-16 py-5 md:py-6 rounded-[30px] md:rounded-[40px] font-black text-sm md:text-xl group-hover:bg-pink-600 transition-all shadow-3xl shadow-slate-100 active:scale-95"
                      >
                        رزرو نوبت
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
