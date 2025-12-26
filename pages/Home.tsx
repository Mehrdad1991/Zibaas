
import React from 'react';
import { MOCK_SERVICES, MOCK_CLINICS } from '../constants';

interface HomeProps {
  onTabChange: (tab: any) => void;
  onShowLiveAdvisor: () => void;
  onSelectClinic: (clinic: any) => void;
}

const Home: React.FC<HomeProps> = ({ onTabChange, onShowLiveAdvisor, onSelectClinic }) => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="bg-[#FAFBFF] pb-24 animate-in fade-in duration-700">
      {/* Premium Horizontal Navigation Circles (High Density) */}
      <div className="bg-white border-b border-slate-100 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 md:gap-14 justify-start lg:justify-center min-w-max">
             {[
               { id: 'surgery', label: 'جراحی و اتاق عمل', icon: '🏥', color: 'bg-blue-50 text-blue-600' },
               { id: 'analysis', label: 'آنالیز هوشمند AI', icon: '✨', color: 'bg-pink-50 text-pink-600' },
               { id: 'booking', label: 'خدمات زیبایی', icon: '💉', color: 'bg-indigo-50 text-indigo-600' },
               { id: 'store', label: 'فروشگاه کالا', icon: '🛍️', color: 'bg-amber-50 text-amber-600' },
               { id: 'rental', label: 'اجاره فضای کاری', icon: '🔑', color: 'bg-emerald-50 text-emerald-600' },
               { id: 'tech-directory', label: 'بانک متخصصین', icon: '👨‍⚕️', color: 'bg-slate-100 text-slate-700' },
             ].map(item => (
               <button key={item.id} onClick={() => onTabChange(item.id as any)} className="flex flex-col items-center gap-3 group w-20 md:w-28 text-center">
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full md:rounded-[28px] ${item.color} flex items-center justify-center text-2xl md:text-4xl shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300 border border-white ring-2 ring-transparent group-hover:ring-pink-100`}>
                     {item.icon}
                  </div>
                  <span className="text-[10px] md:text-xs font-black text-slate-600 group-hover:text-pink-600 transition-colors tracking-tighter leading-tight whitespace-nowrap">{item.label}</span>
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Hero Banner (Condensed Premium) */}
      <div className="max-w-7xl mx-auto px-6 mt-6 mb-10">
         <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden aspect-[16/9] md:aspect-[25/8] bg-slate-900 group shadow-2xl shadow-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4000ms]" 
              alt="Premium Beauty Care"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/80 via-transparent to-transparent flex flex-col justify-center items-end px-8 md:px-20 text-white text-right">
               <div className="bg-pink-600/20 backdrop-blur-md border border-pink-500/30 px-4 py-1.5 rounded-full text-[9px] md:text-xs font-black uppercase tracking-[0.2em] mb-4">
                  Artificial Intelligence
               </div>
               <h1 className="text-2xl md:text-6xl font-black leading-tight mb-6 drop-shadow-2xl">
                 تجربه زیبایی <br/>
                 <span className="text-pink-500">با هوش مصنوعی</span>
               </h1>
               <div className="flex flex-wrap justify-end gap-3 md:gap-5">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onShowLiveAdvisor(); }} 
                    className="bg-white text-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-2xl text-xs md:text-lg font-black hover:bg-pink-600 hover:text-white transition-all shadow-xl flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 bg-pink-600 rounded-full animate-ping group-hover:bg-white"></div>
                    مشاوره صوتی
                  </button>
                  <button onClick={() => onTabChange('analysis')} className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-6 py-3 md:px-8 md:py-4 rounded-2xl text-xs md:text-lg font-black hover:bg-white/20 transition-all">آنالیز چهره AI</button>
               </div>
            </div>
         </div>
      </div>

      {/* Incredible Offers (Digikala Style - High Density) */}
      <div className="bg-[#ef394e] py-6 md:py-10 mb-12 overflow-hidden shadow-2xl shadow-red-200">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-6 overflow-x-auto no-scrollbar">
           <div className="flex flex-col items-center justify-center min-w-[140px] text-white text-center">
              <img src="https://www.digikala.com/static/files/bc3929ee.svg" className="w-20 md:w-32 mb-4" alt="Offer" />
              <div className="flex gap-1 text-xs md:text-xl font-black bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-xl border border-white/10 shadow-inner">
                 <span>{toPersianDigits('۱۲')}</span>:<span>{toPersianDigits('۴۵')}</span>:<span>{toPersianDigits('۰۸')}</span>
              </div>
              <button onClick={() => onTabChange('booking')} className="mt-4 text-[10px] md:text-sm font-black underline hover:text-pink-100 transition-colors">مشاهده همه</button>
           </div>
           
           <div className="flex gap-3 md:gap-4 pb-2">
              {MOCK_SERVICES.map(service => (
                <div 
                  key={service.id} 
                  className="min-w-[160px] md:min-w-[240px] bg-white rounded-[28px] md:rounded-[40px] p-3 md:p-5 flex flex-col gap-3 md:gap-5 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                  onClick={() => onTabChange('booking')}
                >
                   <div className="aspect-square md:aspect-[4/5] rounded-[20px] md:rounded-[30px] overflow-hidden bg-slate-50 relative">
                      <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={service.name} />
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] md:text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">٪۲۰-</div>
                   </div>
                   <div className="px-1 text-right">
                      <h4 className="text-[11px] md:text-base font-black text-slate-800 line-clamp-1">{service.name}</h4>
                      <div className="flex flex-col items-end mt-2 md:mt-4">
                         <div className="flex items-center gap-1.5">
                           <span className="text-sm md:text-2xl font-black text-slate-900">{toPersianDigits((service.price * 0.8).toLocaleString())}</span>
                           <span className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">Toman</span>
                         </div>
                         <span className="text-[9px] md:text-xs text-slate-300 line-through font-bold">{toPersianDigits(service.price.toLocaleString())}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Featured Services Grid (2 Column Mobile for Density) */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
         <div className="flex justify-between items-end mb-8 px-2">
            <button onClick={() => onTabChange('booking')} className="text-pink-600 font-black text-xs md:text-sm hover:underline flex items-center gap-2 group">
               مشاهده همه
               <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div className="text-right">
               <h3 className="text-xl md:text-4xl font-black text-slate-900 tracking-tighter">خدمات منتخب</h3>
               <p className="text-slate-400 font-bold text-[10px] md:text-base mt-1">پرطرفدارترین خدمات ماه جاری</p>
            </div>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {MOCK_SERVICES.map(service => (
              <div 
                key={service.id} 
                className="bg-white rounded-[24px] md:rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
                onClick={() => onTabChange('booking')}
              >
                 <div className="aspect-[4/3] md:aspect-square overflow-hidden relative">
                    <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={service.name} />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-xl text-[8px] md:text-[10px] font-black text-amber-500 flex items-center gap-0.5 shadow-lg">
                       <span>۴.۸</span>
                       <span>★</span>
                    </div>
                 </div>
                 <div className="p-3 md:p-6 text-right flex-1 flex flex-col gap-2 md:gap-4">
                    <div>
                       <h4 className="text-[10px] md:text-base font-black text-slate-800 line-clamp-1">{service.name}</h4>
                       <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{toPersianDigits(service.duration)} Minutes</p>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-3 md:pt-4 border-t border-slate-50">
                       <button className="bg-slate-50 text-slate-900 p-1.5 md:p-2.5 rounded-xl md:rounded-2xl hover:bg-pink-600 hover:text-white transition-all shadow-inner">
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                       </button>
                       <div className="flex items-center gap-1">
                          <span className="text-xs md:text-xl font-black text-slate-900">{toPersianDigits(service.price.toLocaleString())}</span>
                          <span className="text-[8px] md:text-[10px] text-slate-400 font-bold">T</span>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* AI Visual Assistant Section (High Impact) */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
         <div className="bg-slate-950 rounded-[48px] md:rounded-[80px] p-8 md:p-24 text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 md:gap-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            
            <div className="flex-1 space-y-6 md:space-y-10 relative z-10 text-right">
               <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                  <span className="text-[9px] md:text-[10px] font-black text-pink-500 tracking-[0.2em] uppercase">AI Aesthetic Analysis</span>
               </div>
               <h2 className="text-2xl md:text-6xl font-black leading-tight">
                  آنالیز تخصصی چهره <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-pink-500 to-rose-400">فقط با یک سلفی</span>
               </h2>
               <p className="text-slate-400 text-xs md:text-xl font-medium leading-relaxed max-w-2xl ml-auto opacity-80">
                 دستیار هوشمند Zibaas با اسکن تناسبات طلایی چهره شما، دقیق‌ترین پیشنهادهای زیبایی و درمانی را ارائه می‌دهد. پیش از هر اقدامی، نتیجه را شبیه‌سازی کنید.
               </p>
               <div className="flex justify-end gap-4 md:gap-6 pt-4">
                  <button onClick={() => onTabChange('analysis')} className="bg-pink-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg shadow-3xl shadow-pink-900/50 hover:bg-white hover:text-slate-950 transition-all active:scale-95">شروع آنالیز رایگان</button>
               </div>
            </div>
            
            <div className="w-full lg:w-1/3 relative flex justify-center">
               <div className="aspect-square w-48 md:w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] md:rounded-[50px] border border-white/10 p-6 md:p-10 flex items-center justify-center relative overflow-hidden group shadow-3xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/2103/2103533.png" className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_0_30px_rgba(219,39,119,0.5)]" alt="AI Scan" />
               </div>
               <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-white/10 backdrop-blur-3xl border border-white/20 p-4 md:p-8 rounded-2xl md:rounded-3xl text-center space-y-1 shadow-2xl">
                  <span className="text-2xl md:text-4xl">✨</span>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-pink-500">98% Accuracy</p>
               </div>
            </div>
         </div>
      </div>

      {/* Featured Clinics Grid (2 Column Mobile for Density) */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
         <div className="flex justify-between items-end mb-10 px-2">
            <button onClick={() => onTabChange('booking')} className="text-pink-600 font-black text-xs md:text-sm hover:underline">مشاهده همه</button>
            <div className="text-right">
               <h3 className="text-xl md:text-4xl font-black text-slate-900 tracking-tighter">کلینیک‌های برتر</h3>
               <p className="text-slate-400 font-bold text-[10px] md:text-base mt-1">مراکز درمانی دارای نشان اعتماد زیباست</p>
            </div>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
            {MOCK_CLINICS.map(clinic => (
              <div 
                key={clinic.id} 
                onClick={() => onSelectClinic(clinic)}
                className="bg-white rounded-[28px] md:rounded-[50px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-3xl transition-all duration-500 cursor-pointer group flex flex-col h-full"
              >
                 <div className="h-28 md:h-64 relative overflow-hidden">
                    <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={clinic.name} />
                    <div className="absolute top-3 right-3 md:top-5 md:right-5 bg-white/90 backdrop-blur px-3 py-1 md:px-4 md:py-2 rounded-xl text-[8px] md:text-[10px] font-black text-pink-600 shadow-xl border border-pink-50 uppercase tracking-widest">Premium</div>
                 </div>
                 <div className="p-4 md:p-8 flex-1 flex flex-col gap-3 md:gap-5 text-right">
                    <div>
                       <h4 className="text-xs md:text-2xl font-black text-slate-900 md:mb-2 line-clamp-1">{clinic.name}</h4>
                       <div className="flex items-center justify-end gap-1 text-[8px] md:text-sm text-slate-400 font-bold">
                          {clinic.location}
                          <svg className="w-3 h-3 md:w-4 md:h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                       </div>
                    </div>
                    <div className="mt-auto pt-3 md:pt-5 border-t border-slate-50 flex justify-between items-center">
                       <div className="flex items-center gap-1 font-black text-amber-500 text-[10px] md:text-lg">
                          <span>{toPersianDigits(clinic.rating)}</span>
                          <span>★</span>
                       </div>
                       <button className="bg-slate-900 text-white px-3 py-1.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-xs font-black group-hover:bg-pink-600 transition-colors shadow-lg shadow-slate-200">مشاهده کلینیک</button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Home;
