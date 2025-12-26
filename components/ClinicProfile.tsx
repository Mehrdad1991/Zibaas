
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
        <div className="flex gap-4">
            <div className="hidden md:flex bg-pink-50 text-pink-700 px-6 py-2.5 rounded-2xl border border-pink-100 items-center gap-3 shadow-sm">
                <span className="text-xs font-black uppercase tracking-widest">تضمین بازگشت وجه Zibaas ✅</span>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-6 py-2.5 rounded-2xl border border-emerald-100 flex items-center gap-3 shadow-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-black uppercase tracking-widest">رزرو آنلاین فعال</span>
            </div>
        </div>
      </div>

      {/* Hero Section (Conversion Focused) */}
      <div className="relative h-[450px] md:h-[700px] rounded-[60px] md:rounded-[80px] overflow-hidden shadow-3xl mb-16 border-8 border-white group">
        <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" alt={clinic.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-10 md:p-20 text-right">
          <div className="space-y-6 max-w-4xl ml-auto">
            <div className="flex items-center justify-end gap-3 mb-2">
               <div className="flex gap-1 text-amber-400 text-3xl">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
               </div>
               <span className="text-white font-black text-lg bg-white/10 px-4 py-1 rounded-full backdrop-blur-md">({toPersianDigits(clinic.rating)} / ۵ از ۱۲۰۰ نظر)</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-black text-white drop-shadow-2xl tracking-tighter leading-tight">{clinic.name}</h1>
            <div className="flex flex-col md:flex-row-reverse items-start md:items-center justify-end gap-6">
                <p className="text-xl md:text-3xl text-slate-300 font-medium flex items-center justify-end gap-4 opacity-90">
                    {clinic.address}
                    <div className="w-12 h-12 bg-pink-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                    </div>
                </p>
                <div className="h-10 w-px bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-3">
                    <span className="text-emerald-400 text-xl font-black">{toPersianDigits('۵۰۰۰+')} عمل موفق</span>
                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Certified Success</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Profile Info */}
        <div className="lg:col-span-8 space-y-24">
          
          {/* USP Section: Why this clinic? */}
          <section className="bg-slate-900 p-12 md:p-16 rounded-[60px] shadow-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]"></div>
            <div className="relative z-10 space-y-12">
                <div className="text-right space-y-4">
                    <h2 className="text-3xl md:text-6xl font-black tracking-tighter">چرا {clinic.name}؟</h2>
                    <p className="text-slate-400 text-xl font-medium">ما استانداردهای زیبایی را جابجا کرده‌ایم.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { t: 'تجهیزات ۲۰۲۴', d: 'استفاده از آخرین نسل لیزرهای Alma و تخت‌های جراحی هوشمند.', i: '⚡' },
                        { t: 'کادر فوق تخصص', d: 'تمامی پزشکان ما دارای بورد تخصصی و سابقه بین‌المللی هستند.', i: '👨‍⚕️' },
                        { t: 'استریلیزاسیون کوانتومی', d: 'بالاترین سطح بهداشت محیطی مطابق استانداردهای بیمارستانی.', i: '🛡️' },
                        { t: 'پشتیبانی ۲۴ ساعته', d: 'مانیتورینگ وضعیت بیمار تا ۷۲ ساعت پس از انجام خدمات.', i: '📞' },
                    ].map((usp, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] text-right group hover:bg-white hover:text-slate-900 transition-all duration-500">
                            <div className="text-4xl mb-6">{usp.i}</div>
                            <h4 className="text-2xl font-black mb-3">{usp.t}</h4>
                            <p className="text-sm font-medium opacity-60 leading-relaxed">{usp.d}</p>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* Social Proof: Before & After (The "Money" Maker) */}
          <section className="space-y-12 text-right">
            <div className="flex flex-col items-end">
                <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter border-r-8 border-pink-600 pr-8">نتایج واقعی مراجعین</h2>
                <p className="text-slate-400 font-bold mt-2 pr-8 text-xl">تغییراتی که با اطمینان اتفاق می‌افتند.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2].map(i => (
                    <div key={i} className="group bg-white rounded-[60px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-4xl transition-all duration-700">
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 flex">
                                <div className="w-1/2 h-full relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Before" />
                                    <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest">Before</div>
                                </div>
                                <div className="w-1/2 h-full relative overflow-hidden border-l-2 border-white">
                                    <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="After" />
                                    <div className="absolute top-6 right-6 bg-pink-600 px-4 py-1.5 rounded-xl text-white text-[10px] font-black uppercase tracking-widest">After</div>
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl p-6 rounded-[32px] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-2xl">
                                <p className="text-slate-900 font-black text-center text-sm">تغییر فرم لب - تزریق ۱ سی‌سی فیلر روسی</p>
                                <p className="text-pink-600 text-[10px] font-bold text-center mt-1">توسط دکتر مریم احمدی</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full py-6 bg-slate-50 border border-slate-100 rounded-[35px] text-slate-500 font-black hover:bg-pink-50 hover:text-pink-600 transition-all">مشاهده گالری کامل نمونه کارها (۳۵۰+ مورد)</button>
          </section>

          {/* Services Section (High Scarcity) */}
          <section className="space-y-12 text-right">
            <div className="flex justify-between items-end mb-4">
              <div className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-xl text-[10px] font-black animate-pulse">تنها ۳ نوبت خالی برای هفته آینده!</div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 border-r-8 border-pink-600 pr-8 tracking-tighter">خدمات و قیمت‌گذاری</h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {clinicServices.map(service => (
                <div key={service.id} className="bg-white p-8 md:p-12 rounded-[50px] border-2 border-slate-50 flex flex-col md:flex-row-reverse gap-10 hover:border-pink-500 hover:shadow-4xl transition-all group relative overflow-hidden">
                  <div className="w-full md:w-64 aspect-square bg-slate-100 rounded-[45px] overflow-hidden shrink-0 shadow-2xl group-hover:scale-105 transition-transform">
                       <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
                  </div>
                  <div className="flex-1 text-right space-y-6 flex flex-col justify-center">
                    <div>
                        <div className="flex items-center justify-end gap-3 mb-2">
                           <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[9px] font-black">بیشترین رضایت</span>
                           <h4 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight">{service.name}</h4>
                        </div>
                        <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed">تکنیک اختصاصی کلینیک با ماندگاری حداکثری و کمترین دوران نقاهت.</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row-reverse justify-between items-center pt-8 border-t border-slate-100 gap-8">
                        <div className="text-right">
                           <div className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">{toPersianDigits(service.price.toLocaleString())} <span className="text-sm text-slate-400">تومان</span></div>
                           <p className="text-[10px] text-pink-600 font-black uppercase tracking-widest mt-2 animate-bounce">٪۱۰ تخفیف ویژه رزرو آنلاین زیباست</p>
                        </div>
                        <button 
                            onClick={() => onBookService(service)}
                            className="w-full md:w-auto bg-slate-900 text-white px-16 py-6 rounded-[32px] font-black text-xl hover:bg-pink-600 transition-all shadow-3xl shadow-slate-100 active:scale-95"
                        >
                            رزرو نوبت همین حالا
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Persistant Sales Card */}
        <div className="lg:col-span-4">
          <div className="bg-white p-10 md:p-14 rounded-[60px] md:rounded-[80px] shadow-4xl sticky top-32 space-y-12 text-right overflow-hidden border border-slate-50">
            <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600/5 rounded-full blur-[80px]"></div>
            
            <div className="space-y-8 relative z-10">
               <div className="w-24 h-24 bg-pink-100 rounded-[35px] flex items-center justify-center text-4xl mx-auto md:ml-0 shadow-inner">💎</div>
               <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">رزرو اختصاصی با هدیه ویژه</h3>
               <p className="text-slate-500 font-bold text-lg leading-relaxed opacity-90">
                 با رزرو از طریق Zibaas، یک جلسه «آنالیز تخصصی پوست با هوش مصنوعی» به ارزش ۶۰۰ هزار تومان به عنوان هدیه دریافت کنید.
               </p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="p-8 bg-slate-50 rounded-[45px] border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-black text-slate-900 text-xl">{toPersianDigits('۴.۹')} از ۵</span>
                    <span className="text-[10px] text-slate-400 font-black uppercase">User Rating</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-600 w-[98%] rounded-full shadow-lg shadow-pink-200"></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                    این کلینیک در ماه گذشته ۱۲۰ نوبت موفق را از طریق Zibaas ثبت کرده است.
                </p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
                <button 
                onClick={() => onBookService(clinicServices[0])}
                className="w-full py-8 bg-pink-600 text-white rounded-[45px] font-black text-2xl shadow-3xl shadow-pink-200 hover:bg-pink-700 hover:scale-[1.02] transition-all relative active:scale-95"
                >
                ثبت درخواست مشاوره رایگان
                </button>
                <button className="w-full py-6 bg-slate-900 text-white rounded-[40px] font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-4">
                    <span>گفتگو با مشاور کلینیک</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                </button>
            </div>
            
            <div className="pt-10 border-t border-slate-50 text-center relative z-10">
               <p className="text-[10px] text-slate-400 font-bold leading-relaxed max-w-xs mx-auto">
                 امنیت تراکنش و کیفیت خدمات شما ۱۰۰٪ توسط Zibaas بیمه شده است.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
