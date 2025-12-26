
import React, { useState, useMemo } from 'react';
import { MOCK_SERVICES, MOCK_CLINICS, MOCK_TECHNICIANS } from '../constants';

const SearchResults: React.FC<any> = ({ onTabChange, onSelectClinic, onSelectTech }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'clinic' | 'tech'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const filteredItems = useMemo(() => {
    const cResults = MOCK_CLINICS.map(c => ({ ...c, type: 'clinic' }));
    const tResults = MOCK_TECHNICIANS.map(t => ({ ...t, type: 'tech' }));
    let combined = [...cResults, ...tResults];

    if (activeTab === 'clinic') combined = combined.filter(i => i.type === 'clinic');
    if (activeTab === 'tech') combined = combined.filter(i => i.type === 'tech');

    return combined.filter(i => (i as any).name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeTab, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      {/* Dynamic Search & Filter Bar */}
      <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-2xl shadow-slate-100 border border-slate-50 mb-12 flex flex-col lg:flex-row gap-6 items-center">
         <div className="relative flex-1 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="جستجوی کلینیک، متخصص یا تخصص..."
              className="w-full bg-slate-50 border-none rounded-3xl pr-16 pl-8 py-5 font-black focus:ring-2 focus:ring-pink-500 text-right text-lg shadow-inner transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex bg-slate-100 p-2 rounded-[28px] gap-2 w-full lg:w-auto">
            {[
              { id: 'all', label: 'همه موارد' },
              { id: 'clinic', label: 'کلینیک‌ها' },
              { id: 'tech', label: 'متخصصین' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 lg:flex-none px-8 py-4 rounded-[22px] text-xs font-black transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-pink-600 shadow-xl' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {tab.label}
              </button>
            ))}
         </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse justify-between items-end mb-10 gap-4 px-2">
         <div className="text-right">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">نتایج هوشمند زیباست</h2>
            <p className="text-slate-400 font-bold mt-2">یافتن بهترین مراکز و پزشکان بر اساس متدولوژی AI</p>
         </div>
         <span className="text-slate-400 text-xs font-black bg-white px-4 py-2 rounded-xl border border-slate-100">
           {toPersianDigits(filteredItems.length)} مورد فعال یافت شد
         </span>
      </div>

      {/* Grid: Mixed Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item: any) => (
          <div 
            key={item.id} 
            onClick={() => item.type === 'clinic' ? onSelectClinic(item) : onSelectTech(item)}
            className="group bg-white rounded-[50px] overflow-hidden border border-slate-50 shadow-sm hover:shadow-3xl transition-all duration-500 cursor-pointer flex flex-col h-full relative"
          >
            {/* Image Section */}
            <div className="aspect-[16/10] overflow-hidden relative">
               <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" alt={item.name} />
               <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black text-white shadow-xl ${item.type === 'clinic' ? 'bg-blue-600' : 'bg-pink-600'}`}>
                    {item.type === 'clinic' ? 'کلینیک تخصصی' : 'متخصص تایید شده'}
                  </div>
                  {item.isVerified && (
                    <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                       <span className="text-blue-600 text-[9px] font-black uppercase tracking-widest">Verified</span>
                       <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    </div>
                  )}
               </div>
            </div>

            {/* Content Section */}
            <div className="p-8 text-right space-y-4 flex-1 flex flex-col">
               <div className="flex justify-between items-start flex-row-reverse">
                  <h4 className="text-2xl font-black text-slate-900 group-hover:text-pink-600 transition-colors leading-tight">{item.name}</h4>
                  <div className="flex items-center gap-1 font-black text-amber-500 text-lg">
                    <span>{toPersianDigits(item.rating || '۴.۸')}</span>
                    <span className="text-sm">★</span>
                  </div>
               </div>

               <p className="text-slate-400 text-sm font-bold flex items-center justify-end gap-2">
                  {item.location || item.specialty}
                  <svg className="h-4 w-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
               </p>

               {item.type === 'clinic' ? (
                 <div className="flex flex-wrap gap-2 justify-end">
                    {item.services.slice(0, 3).map((sid: string) => (
                      <span key={sid} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100">
                         {MOCK_SERVICES.find(s => s.id === sid)?.name}
                      </span>
                    ))}
                 </div>
               ) : (
                 <p className="text-slate-500 text-xs font-medium line-clamp-2 italic leading-relaxed opacity-80">
                   {item.bio}
                 </p>
               )}

               <div className="mt-auto pt-8 flex justify-between items-center border-t border-slate-50">
                  <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs group-hover:bg-pink-600 transition-all shadow-xl shadow-slate-100 group-hover:shadow-pink-100 active:scale-95">
                    مشاهده پروفایل
                  </button>
                  <div className="text-right">
                     <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">Trusted By</span>
                     <span className="text-xs font-black text-slate-900">{toPersianDigits(item.reviewCount || 150)} نفر مراجع</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="py-40 text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="text-8xl grayscale">🕵️‍♂️</div>
           <div className="space-y-2">
              <h3 className="text-3xl font-black text-slate-400 tracking-tighter">متاسفانه نتیجه‌ای یافت نشد</h3>
              <p className="text-slate-300 font-bold">عبارت دیگری را جستجو کنید یا فیلتر دسته‌بندی را تغییر دهید.</p>
           </div>
           <button onClick={() => {setSearchQuery(''); setActiveTab('all');}} className="bg-pink-600 text-white px-10 py-4 rounded-2xl font-black shadow-2xl">پاکسازی جستجو</button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
