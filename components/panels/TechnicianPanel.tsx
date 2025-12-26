
import React, { useState } from 'react';
import { MOCK_SERVICES, MOCK_TECHNICIANS } from '../../constants';
import { Service, Booking, Technician, PortfolioItem, TimeSlot } from '../../types';
import { generateProfessionalBio } from '../../services/geminiService';

const MOCK_CLIENTS: Booking[] = [
  { id: 'b10', customerName: 'سارا سعیدی', serviceName: 'کاشت مو (SUT)', date: 'امروز', time: '۰۸:۰۰', price: 15000000, status: 'CONFIRMED', providerName: '', customerPhone: '09121234567', endTime: '۱۶:۰۰' },
  { id: 'b11', customerName: 'مریم گلی', serviceName: 'پاکسازی پوست', date: 'فردا', time: '۱۵:۳۰', price: 600000, status: 'PENDING', providerName: '', customerPhone: '09197654321' },
];

const TechnicianPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'schedule' | 'clients' | 'profile'>('clients');
  const [techData, setTechData] = useState<Technician>(MOCK_TECHNICIANS[0]);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const handleUpdateBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTechData({ ...techData, bio: e.target.value });
  };

  const handleGenerateAIBio = async () => {
    setIsGeneratingBio(true);
    const aiBio = await generateProfessionalBio(techData.name, techData.specialty, "8");
    if (aiBio) setTechData({ ...techData, bio: aiBio });
    setIsGeneratingBio(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <img src={techData.image} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-pink-50" alt={techData.name} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-black text-gray-900">{techData.name}</h2>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">تایید شده</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">{techData.role}</p>
          </div>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: 'clients', label: 'مشتریان', icon: '👥' },
            { id: 'services', label: 'خدمات و قیمت', icon: '💰' },
            { id: 'schedule', label: 'زمان‌بندی', icon: '📅' },
            { id: 'profile', label: 'مدیریت پروفایل', icon: '⚙️' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeSubTab === tab.id ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500 hover:text-pink-600'}`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'clients' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <span className="w-2 h-8 bg-pink-600 rounded-full"></span>
              نوبت‌های پیش رو
            </h3>
            {MOCK_CLIENTS.map(client => (
              <div key={client.id} className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm flex justify-between items-center group hover:shadow-md transition-all">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 font-black text-xl">
                      {client.customerName?.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-black text-gray-900 text-lg">{client.customerName}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-400 font-medium">{client.serviceName}</p>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg font-black">
                          {client.time} {client.endTime ? `تا ${client.endTime}` : ''}
                        </span>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <a href={`tel:${client.customerPhone}`} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                   </a>
                   <div className="text-left">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${client.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                        {client.status === 'CONFIRMED' ? 'تایید شده' : 'در انتظار'}
                      </span>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm h-fit">
             <h3 className="text-xl font-black mb-6 text-gray-900">وضعیت مالی</h3>
             <div className="space-y-4">
                <div className="p-5 bg-gray-900 rounded-3xl text-white">
                   <p className="text-xs opacity-60 mb-1">قابل برداشت</p>
                   <p className="text-2xl font-black">۱۸,۵۰۰,۰۰۰ <span className="text-xs font-normal">تومان</span></p>
                </div>
                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                   <p className="text-xs text-gray-400 mb-1">تسویه شده (ماه جاری)</p>
                   <p className="text-xl font-black text-gray-700">۴,۲۰۰,۰۰۰ <span className="text-xs font-normal">تومان</span></p>
                </div>
                <button className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-pink-100 hover:bg-pink-700 transition-colors">درخواست تسویه فوری</button>
             </div>
          </div>
        </div>
      )}

      {activeSubTab === 'schedule' && (
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-gray-900">مدیریت سانس‌های کاری</h3>
              <div className="flex gap-2">
                 <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-lg text-[10px] font-black italic">نکته: سیستم نوبت‌دهی بر اساس زمان هر خدمت هوشمند عمل می‌کند.</span>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'].map((day, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-3xl text-center border border-gray-100 hover:border-pink-300 transition-all">
                   <p className="text-sm font-black text-gray-900 mb-4">{day}</p>
                   <div className="space-y-2">
                      <div className="text-[10px] p-2 bg-white rounded-xl border border-gray-100 text-gray-400">۰۸:۰۰ - ۱۲:۰۰</div>
                      <div className="text-[10px] p-2 bg-pink-100 rounded-xl border border-pink-200 text-pink-600 font-bold">۱۳:۰۰ - ۲۰:۰۰</div>
                      <button className="w-full p-2 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:text-pink-600 hover:border-pink-300 transition-all">+</button>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0">💡</div>
              <p className="text-xs text-blue-800 leading-relaxed font-bold">
                شما خدماتی با زمان بیش از ۶ ساعت ارائه می‌دهید. سیستم به صورت خودکار در روزهایی که این خدمات رزرو شوند، سایر نوبت‌های کوچک را برای حفظ کیفیت کار شما مسدود می‌کند.
              </p>
           </div>
        </div>
      )}

      {/* Profile sub-tab remains mostly same but could include specialty equipment management */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-gray-900 border-r-8 border-pink-600 pr-4">اطلاعات تخصصی</h3>
                    <button 
                      onClick={handleGenerateAIBio}
                      disabled={isGeneratingBio}
                      className="flex items-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-pink-100 transition-all disabled:opacity-50"
                    >
                      {isGeneratingBio ? 'در حال نگارش...' : 'تولید متن هوشمند با Gemini ✨'}
                    </button>
                 </div>
                 <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-500 pr-2">بایوگرافی نمایشی</label>
                    <textarea 
                      value={techData.bio} 
                      onChange={handleUpdateBio}
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 font-medium text-gray-600 focus:ring-2 focus:ring-pink-500 h-48 leading-relaxed text-right" 
                    />
                 </div>
                 <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-pink-600 transition-all">بروزرسانی پروفایل</button>
              </div>
           </div>
           <div className="bg-pink-600 p-8 rounded-[40px] text-white space-y-6 shadow-2xl shadow-pink-200 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-4">آمار پذیرش</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur">
                      <span className="text-sm opacity-80">مشتریان وفادار</span>
                      <span className="font-black text-lg">۴۸ نفر</span>
                   </div>
                   <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur">
                      <span className="text-sm opacity-80">درآمد کل پلتفرم</span>
                      <span className="font-black text-lg">۱۸.۵ م</span>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianPanel;
