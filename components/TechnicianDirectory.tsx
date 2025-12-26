
import React, { useState } from 'react';
import { MOCK_TECHNICIANS } from '../constants';
import { Technician } from '../types';

interface TechnicianDirectoryProps {
  onSelectTechnician: (tech: Technician) => void;
}

const TechnicianDirectory: React.FC<TechnicianDirectoryProps> = ({ onSelectTechnician }) => {
  const [activeFilter, setActiveFilter] = useState('همه');
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const filteredTechs = MOCK_TECHNICIANS.filter(t => 
    activeFilter === 'همه' || t.specialty.includes(activeFilter) || t.role.includes(activeFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-right">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">بانک متخصصین برتر</h1>
          <p className="text-slate-400 font-bold text-lg">مجموعه‌ای از فریلنسرهای تایید شده در پلتفرم Zibaas</p>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2">
           {['همه', 'پوست', 'مو', 'جراحی'].map(cat => (
             <button 
               key={cat} 
               onClick={() => setActiveFilter(cat)}
               className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${activeFilter === cat ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'bg-white border border-slate-100 text-slate-400 hover:border-pink-500 hover:text-pink-600'}`}
             >
                {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTechs.map(tech => (
          <div 
            key={tech.id} 
            className="group bg-white rounded-[40px] md:rounded-[50px] p-8 md:p-10 shadow-sm border border-slate-50 hover:shadow-3xl hover:border-pink-100 transition-all cursor-pointer text-center relative overflow-hidden flex flex-col h-full"
            onClick={() => onSelectTechnician(tech)}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-slate-50 rounded-br-[60px] -z-10 group-hover:bg-pink-50 transition-colors"></div>
            <img src={tech.image} className="w-24 h-24 md:w-32 md:h-32 rounded-[30px] md:rounded-[40px] object-cover mx-auto mb-6 ring-8 ring-white shadow-2xl group-hover:scale-105 transition-transform" alt={tech.name} />
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1 leading-tight">{tech.name}</h3>
            <p className="text-pink-600 font-black text-[10px] md:text-sm mb-4 uppercase tracking-widest">{tech.specialty}</p>
            <p className="text-slate-400 text-xs md:text-sm mb-6 line-clamp-2 px-2 font-medium">{tech.bio}</p>
            
            <div className="flex justify-center items-center gap-4 py-4 border-t border-slate-50 mt-auto">
               <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900 text-sm md:text-lg">{toPersianDigits(tech.rating)}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
               </div>
               <div className="w-px h-4 bg-slate-100"></div>
               <div className="text-[10px] md:text-xs text-slate-400 font-bold">{toPersianDigits(tech.reviewCount)} نظر مراجعین</div>
            </div>
            
            <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl md:rounded-3xl font-black text-xs md:text-sm group-hover:bg-pink-600 transition-all shadow-xl shadow-slate-100 group-hover:shadow-pink-100 active:scale-95">
               مشاهده پروفایل و رزرو مستقیم
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianDirectory;
