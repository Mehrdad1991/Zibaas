
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
    <div className="min-h-screen bg-[#FAFAFA] pb-24 animate-in fade-in duration-1000">
      {/* Luxury Hero Header */}
      <div className="relative h-[500px] md:h-[600px] bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img src={technician.image} className="w-full h-full object-cover blur-2xl scale-110" alt="" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16 relative z-10">
           <button 
             onClick={onBack}
             className="absolute top-8 right-6 flex items-center gap-2 text-white/50 hover:text-pink-500 font-bold transition-all group"
           >
             <span className="text-sm">بازگشت به لیست متخصصین</span>
             <svg className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
           </button>

           <div className="flex flex-col md:flex-row-reverse items-center md:items-end gap-10 md:gap-16">
              {/* Profile Image with Golden Ring */}
              <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 via-pink-600 to-rose-400 rounded-[50px] md:rounded-[70px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative w-48 h-48 md:w-72 md:h-72 bg-slate-900 rounded-[45px] md:rounded-[65px] overflow-hidden border-4 border-slate-950">
                    <img src={technician.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" alt={technician.name} />
                 </div>
                 {technician.isVerified && (
                    <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-2xl shadow-2xl border-4 border-slate-950 animate-bounce">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    </div>
                 )}
              </div>

              {/* Title and Stats */}
              <div className="text-center md:text-right space-y-6 flex-1">
                 <div className="space-y-2">
                    <div className="inline-block bg-pink-600 px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2">Elite Certified Expert</div>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">{technician.name}</h1>
                    <p className="text-pink-500 text-xl md:text-3xl font-bold italic">{technician.role}</p>
                 </div>
                 
                 <div className="flex flex-wrap justify-center md:justify-end gap-10 border-t border-white/10 pt-8">
                    <div className="text-center">
                       <p className="text-white text-3xl font-black">{toPersianDigits(technician.experienceYears || 10)}+</p>
                       <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">سال تجربه</p>
                    </div>
                    <div className="text-center">
                       <p className="text-white text-3xl font-black">{toPersianDigits(technician.reviewCount)}</p>
                       <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">مراجع راضی</p>
                    </div>
                    <div className="text-center">
                       <div className="flex items-center justify-center gap-1 text-amber-400">
                          <span className="text-3xl font-black">{toPersianDigits(technician.rating)}</span>
                          <span className="text-xl">★</span>
                       </div>
                       <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">امتیاز جهانی</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Bio & Philosophy */}
          <div className="lg:col-span-8 space-y-12">
             {/* Philosophy Quote */}
             <div className="bg-white p-12 md:p-20 rounded-[60px] shadow-4xl border border-slate-50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-50 rounded-br-full -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="text-6xl text-pink-200 font-serif absolute top-10 right-10 opacity-50">“</div>
                <p className="text-2xl md:text-4xl font-black text-slate-800 leading-relaxed md:leading-[1.6] text-right italic relative z-10">
                   {technician.philosophy || "زیبایی واقعی در جزئیاتی نهفته است که نادیده گرفته می‌شوند. ماموریت من خلق تقارن و اعتماد به نفس است."}
                </p>
                <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                   <div className="text-right">
                      <h4 className="font-black text-slate-900">بیوگرافی حرفه‌ای</h4>
                      <p className="text-slate-500 mt-2 leading-loose font-medium text-lg">{technician.bio}</p>
                   </div>
                   <div className="flex gap-3">
                      {technician.awards?.map((award, i) => (
                        <div key={i} className="bg-amber-50 text-amber-700 px-4 py-2 rounded-2xl border border-amber-100 text-[10px] font-black flex items-center gap-2 whitespace-nowrap shadow-sm">
                           <span>🏆</span> {award}
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Dynamic Portfolio Grid */}
             <div className="space-y-10 text-right">
                <div className="flex flex-col items-end px-4">
                   <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter border-r-8 border-pink-600 pr-8">شاهکارهای اجرایی</h2>
                   <p className="text-slate-400 font-bold mt-2 pr-8 text-xl italic">ویترینی از نتایج درخشان و واقعی مراجعین</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {technician.portfolio.map((item) => (
                     <div key={item.id} className="group bg-white rounded-[55px] overflow-hidden shadow-sm hover:shadow-4xl transition-all duration-700 border border-slate-100">
                        <div className="aspect-[4/3] relative overflow-hidden m-4 rounded-[45px] border-4 border-white shadow-xl">
                           <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" alt={item.title} />
                           <div className="absolute top-6 left-6">
                              <span className="bg-slate-950/80 backdrop-blur-xl text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{item.tag || 'Clinical Case'}</span>
                           </div>
                        </div>
                        <div className="p-10 pt-4 space-y-3">
                           <h4 className="text-2xl font-black text-slate-900">{item.title}</h4>
                           <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Column: Services & VIP Card */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-slate-950 p-10 md:p-14 rounded-[60px] shadow-3xl text-white text-right space-y-10 sticky top-32 border border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px]"></div>
                
                <div className="space-y-4 relative z-10">
                   <div className="flex items-center justify-end gap-2 text-pink-500">
                      <span className="text-xs font-black uppercase tracking-widest">System Status</span>
                      <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                   </div>
                   <h3 className="text-3xl font-black tracking-tighter leading-tight">رزرو اختصاصی نوبت</h3>
                   <p className="text-slate-400 font-medium text-lg leading-relaxed opacity-80 italic">
                      به دلیل تقاضای بالا، اولویت با مراجعینی است که از طریق درگاه Zibaas رزرو خود را قطعی نمایند.
                   </p>
                </div>

                <div className="space-y-4 relative z-10">
                   {techServices.map(service => (
                     <button 
                       key={service.id}
                       onClick={() => onBookService(service)}
                       className="w-full p-6 rounded-[35px] bg-white/5 border border-white/10 hover:bg-white hover:text-slate-950 transition-all duration-500 group flex flex-row-reverse justify-between items-center"
                     >
                        <div className="text-right">
                           <p className="font-black text-xl">{service.name}</p>
                           <p className="text-[10px] opacity-40 uppercase font-bold tracking-widest">{toPersianDigits(service.duration)} Minutes Protocol</p>
                        </div>
                        <div className="text-left">
                           <p className="font-black text-xl text-pink-500 group-hover:text-slate-950">{toPersianDigits(service.price.toLocaleString())}</p>
                           <p className="text-[8px] opacity-40 uppercase font-black tracking-widest">Payable</p>
                        </div>
                     </button>
                   ))}
                </div>

                <div className="space-y-4 pt-4 relative z-10">
                   <button 
                     onClick={() => onBookService(techServices[0])}
                     className="w-full py-8 bg-pink-600 text-white rounded-[45px] font-black text-2xl shadow-3xl shadow-pink-900/40 hover:bg-white hover:text-slate-950 hover:scale-[1.02] transition-all active:scale-95"
                   >
                     شروع فرآیند رزرو فوری
                   </button>
                   <div className="flex gap-2">
                      <button className="flex-1 py-4 bg-white/5 rounded-3xl border border-white/5 text-xs font-black hover:bg-white/10 transition-all">ارسال پیام مستقیم</button>
                      <button className="px-6 py-4 bg-white/5 rounded-3xl border border-white/5 text-xs font-black hover:bg-white/10 transition-all">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                      </button>
                   </div>
                </div>

                <div className="pt-10 border-t border-white/5 text-center relative z-10">
                   <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-xs mx-auto">
                     رزرو شما در Zibaas تحت پوشش "بیمه تضمین کیفیت متخصصین" قرار دارد.
                   </p>
                </div>
             </div>

             {/* Scarcity / Availability Info */}
             <div className="bg-amber-50 p-8 rounded-[40px] border border-amber-100 text-right space-y-3">
                <div className="flex items-center justify-end gap-3 text-amber-700">
                   <span className="text-xs font-black uppercase">Availability Alert</span>
                   <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                </div>
                <p className="text-sm font-bold text-amber-900 leading-relaxed">
                   تنها {toPersianDigits(4)} اسلات زمانی برای هفته جاری باقی مانده است. برای جلوگیری از انتظار طولانی، رزرو خود را قطعی کنید.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;