
import React, { useState, useMemo } from 'react';
import { MOCK_SERVICES, MOCK_CLINICS } from '../constants';

const SearchResults: React.FC<any> = ({ onTabChange, onSelectClinic }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'clinic' | 'service'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const filteredItems = useMemo(() => {
    const sResults = MOCK_SERVICES.map(s => ({ ...s, type: 'service' }));
    const cResults = MOCK_CLINICS.map(c => ({ ...c, type: 'clinic' }));
    let combined = [...sResults, ...cResults];

    if (activeTab === 'clinic') combined = combined.filter(i => i.type === 'clinic');
    if (activeTab === 'service') combined = combined.filter(i => i.type === 'service');

    return combined.filter(i => (i as any).name.includes(searchQuery));
  }, [activeTab, searchQuery]);

  return (
    <div className="py-8 md:py-12 animate-in fade-in duration-700">
      {/* Search Header (Condensed) */}
      <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-sm border border-slate-100 mb-8 md:mb-12 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
         <div className="relative flex-1 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="جستجوی خدمت، کلینیک یا تخصص..."
              className="w-full bg-slate-50 border-none rounded-2xl pr-14 pl-6 py-4 md:py-6 font-black focus:ring-2 focus:ring-pink-500 text-right text-sm md:text-xl shadow-inner transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex bg-slate-100 p-1.5 md:p-2 rounded-2xl md:rounded-3xl gap-1 md:gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'همه' },
              { id: 'clinic', label: 'کلینیک‌ها' },
              { id: 'service', label: 'خدمات' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-none px-4 md:px-10 py-2 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black transition-all ${activeTab === tab.id ? 'bg-white text-pink-600 shadow-xl' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {tab.label}
              </button>
            ))}
         </div>
      </div>

      <div className="flex justify-between items-center mb-8 px-4">
         <span className="text-slate-400 text-[10px] md:text-sm font-bold tracking-tight">{toPersianDigits(filteredItems.length)} مورد پیدا شد</span>
         <h2 className="text-lg md:text-3xl font-black text-slate-900 border-r-4 border-pink-600 pr-3">نتایج جستجو</h2>
      </div>

      {/* High Density Grid - 2 Column Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
        {filteredItems.map((item: any) => (
          <div 
            key={item.id} 
            onClick={() => item.type === 'clinic' ? onSelectClinic(item) : onTabChange('booking')}
            className="bg-white rounded-[24px] md:rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
          >
            <div className="h-32 md:h-56 relative overflow-hidden">
               <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} />
               <div className={`absolute top-2 right-2 md:top-4 md:right-4 px-2 py-1 rounded-lg text-[8px] md:text-[10px] font-black text-white shadow-lg ${item.type === 'clinic' ? 'bg-blue-600' : 'bg-pink-600'}`}>
                  {item.type === 'clinic' ? 'کلینیک' : 'خدمت'}
               </div>
            </div>
            <div className="p-3 md:p-6 text-right space-y-2 md:space-y-4 flex-1 flex flex-col">
               <h4 className="text-[11px] md:text-lg font-black text-slate-900 line-clamp-1">{item.name}</h4>
               {item.type === 'clinic' ? (
                 <p className="text-[9px] md:text-sm text-slate-400 font-bold flex items-center justify-end gap-1">
                    {item.location}
                    <svg className="w-3 h-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                 </p>
               ) : (
                 <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs md:text-xl font-black text-slate-900">{toPersianDigits(item.price.toLocaleString())}</span>
                    <span className="text-[8px] md:text-[10px] text-slate-400 font-bold">تومان</span>
                 </div>
               )}
               <div className="mt-auto pt-3 md:pt-5 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[9px] md:text-xs font-black text-amber-500 flex items-center gap-0.5">
                    {toPersianDigits(item.rating || '۴.۸')}
                    <span>★</span>
                  </span>
                  <button className="text-pink-600 text-[9px] md:text-xs font-black group-hover:underline">مشاهده جزئیات</button>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="py-32 text-center space-y-6">
           <div className="text-6xl md:text-8xl opacity-20">🔍</div>
           <h3 className="text-xl md:text-3xl font-black text-slate-400">متاسفانه نتیجه‌ای یافت نشد</h3>
           <p className="text-xs md:text-base text-slate-300 font-bold">عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
