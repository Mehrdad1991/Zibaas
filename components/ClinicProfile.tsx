
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
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      {/* Dynamic Header */}
      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-400 hover:text-pink-600 font-black transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          بازگشت به لیست مراکز
        </button>
        <div className="bg-emerald-50 text-emerald-700 px-6 py-2.5 rounded-2xl border border-emerald-100 flex items-center gap-3 shadow-sm">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
           <span className="text-xs font-black uppercase tracking-widest">Clinic Status: Verified</span>
        </div>
      </div>

      {/* Hero Section (Elite) */}
      <div className="relative h-[400px] md:h-[650px] rounded-[60px] md:rounded-[80px] overflow-hidden shadow-3xl mb-16 border-8 border-white group">
        <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" alt={clinic.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent flex flex-col justify-end p-10 md:p-20 text-right">
          <div className="space-y-4 max-w-4xl ml-auto">
            <div className="flex items-center justify-end gap-3 mb-2">
               <div className="flex gap-1 text-amber-400 text-2xl">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
               </div>
               <span className="text-white/60 font-bold text-sm">({toPersianDigits(clinic.rating)} / ۵ امتیاز کاربران)</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-white drop-shadow-2xl tracking-tighter">{clinic.name}</h1>
            <p className="text-xl md:text-3xl text-slate-300 font-medium flex items-center justify-end gap-4 opacity-90">
              {clinic.address}
              <div className="w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
              </div>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Profile Info */}
        <div className="lg:col-span-8 space-y-20">
          <section className="bg-white p-12 md:p-16 rounded-[60px] shadow-sm border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-bl-full -z-10 opacity-40"></div>
            <h2 className="text-3xl md:text-5xl font-black mb-10 text-slate-900 border-r-8 border-pink-600 pr-8 text-right tracking-tighter">اطلاعات و تجهیزات</h2>
            <p className="text-slate-500 leading-relaxed md:leading-loose text-lg md:text-2xl font-medium text-right whitespace-pre-line opacity-90 mb-12">
              {clinic.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-10 mt-10 border-t border-slate-50">
               {[
                 { l: 'تأسیس کلینیک', v: '۱۳۹۲', i: '🏥' },
                 { l: 'پزشکان برتر', v: '۱۲ متخصص', i: '👨‍⚕️' },
                 { l: 'رضایت نهایی', v: '۹۸٪', i: '💎' },
                 { l: 'فضای تخصصی', v: '۴۵۰ متر', i: '🏢' },
               ].map((item, i) => (
                 <div key={i} className="text-center space-y-2 group">
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{item.i}</div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{item.l}</p>
                    <p className="text-xl font-black text-slate-900">{toPersianDigits(item.v)}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="space-y-12 text-right">
            <div className="flex justify-between items-end mb-4">
              <button className="text-pink-600 font-black text-sm hover:underline">مشاهده تعرفه کامل</button>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 border-r-8 border-pink-600 pr-8 tracking-tighter">خدمات کلینیک</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clinicServices.map(service => (
                <div key={service.id} className="bg-white p-8 md:p-10 rounded-[50px] border border-slate-50 flex flex-col gap-8 hover:shadow-3xl transition-all group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-slate-50 rounded-br-[40px] -z-10 group-hover:bg-pink-50 transition-colors"></div>
                  <div className="flex items-center justify-between flex-row-reverse">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[40px] overflow-hidden shadow-2xl shrink-0 border-4 border-white group-hover:rotate-2 transition-transform">
                       <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
                    </div>
                    <div className="text-right">
                       <h4 className="text-xl md:text-3xl font-black text-slate-900 leading-tight mb-2">{service.name}</h4>
                       <div className="flex gap-3 justify-end items-center">
                          <span className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-widest">Elite Service</span>
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                          <span className="text-[10px] md:text-xs text-pink-500 font-black uppercase tracking-widest">{toPersianDigits(service.duration)} Min</span>
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t border-slate-50 mt-auto">
                    <button 
                      onClick={() => onBookService(service)}
                      className="bg-slate-900 text-white px-10 py-4 rounded-[22px] font-black text-sm hover:bg-pink-600 transition-all shadow-2xl shadow-slate-100 active:scale-95"
                    >
                      رزرو آنلاین نوبت
                    </button>
                    <div className="text-right">
                       <div className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">{toPersianDigits(service.price.toLocaleString())}</div>
                       <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Toman (Final Price)</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Elite Sidebar Card */}
        <div className="lg:col-span-4">
          <div className="bg-slate-950 p-10 md:p-14 rounded-[60px] md:rounded-[80px] shadow-3xl sticky top-32 space-y-12 text-white text-right overflow-hidden border border-white/5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px]"></div>
            
            <div className="space-y-6 relative z-10">
               <div className="inline-block bg-pink-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Smart Booking</div>
               <h3 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight">رزرو هوشمند زیباست</h3>
               <p className="text-slate-400 font-medium text-sm md:text-lg leading-relaxed opacity-80">
                 سیستم Zibaas AI با تحلیل زمان‌های خالی کلینیک، سریع‌ترین نوبت ممکن را برای شما رزرو می‌کند.
               </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="p-8 bg-white/5 rounded-[35px] border border-white/5 space-y-2 flex flex-col items-center">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Clinic Rating</p>
                <p className="text-4xl font-black text-amber-500 flex items-center gap-3">
                   {toPersianDigits(clinic.rating)} / ۵
                   <span className="text-2xl">★</span>
                </p>
              </div>
              <div className="p-8 bg-white/5 rounded-[35px] border border-white/5 space-y-2 text-center">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Status</p>
                <p className="text-lg font-black text-emerald-500 uppercase tracking-widest">Active & Booking</p>
              </div>
            </div>

            <button 
              onClick={() => onBookService(clinicServices[0])}
              className="w-full py-6 md:py-8 bg-pink-600 text-white rounded-[30px] md:rounded-[45px] font-black text-lg md:text-2xl shadow-3xl shadow-pink-900/50 hover:bg-white hover:text-slate-950 hover:scale-[1.02] transition-all relative z-10 active:scale-95"
            >
              درخواست مشاوره فوری
            </button>
            
            <div className="pt-10 border-t border-white/5 text-center relative z-10">
               <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-xs mx-auto">
                 رزرو شما در Zibaas تحت پوشش "تضمین طلایی مراجعات" است. امنیت و کیفیت خدمات اولویت ماست.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
