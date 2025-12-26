
import React from 'react';
import { MOCK_TECHNICIANS } from '../constants';
import { Technician } from '../types';

interface TechnicianDirectoryProps {
  onSelectTechnician: (tech: Technician) => void;
}

const TechnicianDirectory: React.FC<TechnicianDirectoryProps> = ({ onSelectTechnician }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">بانک متخصصین برتر</h1>
          <p className="text-gray-500">مجموعه‌ای از فریلنسرهای تایید شده در پلتفرم Zibaas</p>
        </div>
        <div className="flex gap-4">
           {['پوست', 'مو', 'جراحی'].map(cat => (
             <button key={cat} className="px-5 py-2 rounded-full bg-white border border-gray-100 text-sm font-bold hover:border-pink-500 hover:text-pink-600 transition-all">
                {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_TECHNICIANS.map(tech => (
          <div 
            key={tech.id} 
            className="group bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-pink-100 transition-all cursor-pointer text-center relative overflow-hidden"
            onClick={() => onSelectTechnician(tech)}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-pink-50 rounded-br-[60px] -z-10 group-hover:bg-pink-100 transition-colors"></div>
            <img src={tech.image} className="w-24 h-24 rounded-3xl object-cover mx-auto mb-6 ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform" alt={tech.name} />
            <h3 className="text-2xl font-black text-gray-900 mb-1">{tech.name}</h3>
            <p className="text-pink-600 font-bold text-sm mb-4">{tech.specialty}</p>
            <p className="text-gray-400 text-xs mb-6 line-clamp-2">{tech.bio}</p>
            
            <div className="flex justify-center items-center gap-4 py-4 border-t border-gray-50">
               <div className="flex items-center gap-1">
                  <span className="font-black text-gray-900">{tech.rating}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
               </div>
               <div className="w-px h-4 bg-gray-100"></div>
               <div className="text-xs text-gray-400">{tech.reviewCount} نظر</div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-gray-50 text-gray-900 rounded-2xl font-black text-sm group-hover:bg-pink-600 group-hover:text-white transition-all">
               مشاهده پروفایل و رزرو
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianDirectory;
