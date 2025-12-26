
import React, { useState } from 'react';
import { MOCK_SERVICES, MOCK_TECHNICIANS } from '../../constants';
import { Service, Booking, Technician } from '../../types';
import { generateProfessionalBio } from '../../services/geminiService';

const MOCK_CLIENTS: Booking[] = [
  { id: 'b10', customerName: 'سارا سعیدی', serviceName: 'کاشت مو (SUT)', date: 'امروز', time: '۰۸:۰۰', price: 15000000, status: 'CONFIRMED', providerName: '', customerPhone: '09121234567', endTime: '۱۶:۰۰' },
  { id: 'b11', customerName: 'مریم گلی', serviceName: 'پاکسازی پوست', date: 'فردا', time: '۱۵:۳۰', price: 600000, status: 'PENDING', providerName: '', customerPhone: '09197654321' },
];

const TechnicianPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'schedule' | 'clients' | 'profile'>('clients');
  const [techData, setTechData] = useState<Technician>(MOCK_TECHNICIANS[0]);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handleGenerateAIBio = async () => {
    setIsGeneratingBio(true);
    const aiBio = await generateProfessionalBio(techData.name, techData.specialty, "8");
    if (aiBio) setTechData({ ...techData, bio: aiBio });
    setIsGeneratingBio(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Top Profile Card */}
      <div className="bg-white p-8 rounded-[40px] md:rounded-[60px] shadow-sm border border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="relative">
             <img src={techData.image} className="w-20 h-20 md:w-28 md:h-28 rounded-[30px] md:rounded-[40px] object-cover ring-8 ring-pink-50 shadow-2xl" alt={techData.name} />
             <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">✓</div>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-3 justify-end mb-1">
                <span className="bg-pink-600 text-white text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest">Verified Pro</span>
                <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{techData.name}</h2>
             </div>
             <p className="text-slate-400 font-bold text-xs md:text-lg">{techData.role}</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-2 rounded-[24px] md:rounded-[32px] w-full lg:w-auto overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'clients', label: 'مشتریان', icon: '👥' },
            { id: 'services', label: 'خدمات', icon: '💰' },
            { id: 'schedule', label: 'زمان‌بندی', icon: '📅' },
            { id: 'profile', label: 'پروفایل', icon: '⚙️' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 md:px-8 py-3 rounded-[18px] md:rounded-[24px] text-xs md:text-sm font-black transition-all whitespace-nowrap ${activeSubTab === tab.id ? 'bg-white text-pink-600 shadow-xl' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'clients' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-xl md:text-3xl font-black text-slate-900 border-r-8 border-pink-600 pr-4">نوبت‌های رزرو شده (امروز و فردا)</h3>
            <div className="space-y-4">
              {MOCK_CLIENTS.map(client => (
                <div key={client.id} className="bg-white p-6 md:p-10 rounded-[40px] md:rounded-[50px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center gap-6 flex-row-reverse w-full md:w-auto">
                     <div className="w-16 h-16 md:w-24 md:h-24 bg-pink-50 rounded-[24px] md:rounded-[35px] flex items-center justify-center text-pink-600 font-black text-2xl md:text-4xl shadow-inner">
                        {client.customerName?.charAt(0)}
                     </div>
                     <div className="text-right">
                        <h4 className="font-black text-slate-900 text-lg md:text-2xl mb-1">{client.customerName}</h4>
                        <div className="flex items-center gap-3 justify-end">
                          <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-wider">{client.serviceName}</p>
                          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
                          <span className="text-[10px] md:text-sm font-black text-pink-600">{client.time} تا {client.endTime || 'پایان'}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
                     <a href={`tel:${client.customerPhone}`} className="w-12 h-12 md:w-16 md:h-16 rounded-[20px] md:rounded-[28px] bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center shadow-inner">
                        <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                     </a>
                     <div className="text-right">
                        <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${client.status === 'CONFIRMED' ? 'bg-blue-600 text-white shadow-lg' : 'bg-amber-100 text-amber-700'}`}>
                          {client.status === 'CONFIRMED' ? 'Finalized' : 'Pending'}
                        </span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-slate-950 p-10 rounded-[50px] md:rounded-[60px] text-white space-y-10 shadow-3xl relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 rounded-full blur-[80px]"></div>
                <h3 className="text-2xl font-black tracking-tight relative z-10">داشبورد درآمدی</h3>
                <div className="space-y-6 relative z-10">
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Available to Withdraw</p>
                      <p className="text-3xl font-black">{toPersianDigits('۱۸,۵۰۰,۰۰۰')} <span className="text-xs font-normal">T</span></p>
                   </div>
                   <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Earned this Month</p>
                      <p className="text-xl font-black text-slate-300">{toPersianDigits('۴,۲۰۰,۰۰۰')} <span className="text-xs font-normal">T</span></p>
                   </div>
                   <button className="w-full py-5 bg-pink-600 rounded-3xl font-black text-lg shadow-3xl shadow-pink-900/50 hover:bg-white hover:text-slate-900 transition-all active:scale-95">تسویه موجودی فوری</button>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-8">
              <div className="bg-white p-10 md:p-16 rounded-[50px] md:rounded-[70px] border border-slate-100 shadow-sm space-y-10 text-right">
                 <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <button 
                      onClick={handleGenerateAIBio}
                      disabled={isGeneratingBio}
                      className="w-full md:w-auto flex items-center justify-center gap-3 bg-pink-50 text-pink-600 px-8 py-4 rounded-3xl text-sm font-black hover:bg-pink-100 transition-all shadow-inner border border-pink-100"
                    >
                      {isGeneratingBio ? 'در حال نگارش تخصصی...' : 'بازنویسی بایو با هوش مصنوعی ✨'}
                    </button>
                    <h3 className="text-2xl md:text-4xl font-black text-slate-900 border-r-8 border-pink-600 pr-6">بایوگرافی و برندینگ</h3>
                 </div>
                 <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest pr-4">Bio Presentation</label>
                    <textarea 
                      value={techData.bio} 
                      onChange={(e) => setTechData({...techData, bio: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-[32px] px-8 py-8 font-medium text-slate-700 focus:ring-2 focus:ring-pink-500 h-64 leading-relaxed text-right text-lg shadow-inner" 
                    />
                 </div>
                 <div className="flex justify-end gap-4 pt-6">
                    <button className="bg-slate-900 text-white px-12 py-5 rounded-3xl font-black text-lg shadow-3xl shadow-slate-200 hover:bg-pink-600 transition-all">ذخیره نهایی تغییرات</button>
                 </div>
              </div>
           </div>
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm text-center space-y-8">
                 <h4 className="text-xl font-black text-slate-900">وضعیت پورتفولیو</h4>
                 <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full rotate-[-90deg]">
                       <circle cx="64" cy="64" r="60" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                       <circle cx="64" cy="64" r="60" fill="transparent" stroke="#db2777" strokeWidth="8" strokeDasharray="377" strokeDashoffset="100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-900">٪۷۵</div>
                 </div>
                 <p className="text-xs text-slate-400 font-bold leading-relaxed">بایوگرافی شما توسط هوش مصنوعی تکمیل شده است. برای رسیدن به ۱۰۰٪، ۳ عکس جدید از نمونه‌کارها آپلود کنید.</p>
                 <button className="w-full py-4 bg-slate-50 rounded-2xl font-black text-sm text-slate-600 hover:bg-pink-50 hover:text-pink-600 transition-all border border-slate-100">مدیریت گالری نتایج</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianPanel;
