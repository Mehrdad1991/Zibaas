
import React, { useState } from 'react';
import { MOCK_CLINICS, MOCK_TECHNICIANS, MOCK_SERVICES } from '../constants';
import { Clinic, Technician, Service } from '../types';

interface UnifiedBookingProps {
  onSelectClinic: (clinic: Clinic) => void;
  onSelectTech: (tech: Technician) => void;
}

const UnifiedBooking: React.FC<UnifiedBookingProps> = ({ onSelectClinic, onSelectTech }) => {
  const [viewMode, setViewMode] = useState<'clinics' | 'technicians'>('clinics');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClinics = MOCK_CLINICS.filter(c => c.name.includes(searchQuery) || c.location.includes(searchQuery));
  const filteredTechs = MOCK_TECHNICIANS.filter(t => t.name.includes(searchQuery) || t.specialty.includes(searchQuery));

  return (
    <div className="space-y-10 py-10 animate-in fade-in duration-700">
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-right">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">رزرو آنلاین خدمات</h2>
          <p className="text-gray-500 font-medium">بهترین کلینیک‌ها و متخصصین در دستان شما</p>
        </div>
        
        <div className="bg-white p-2 rounded-[25px] shadow-sm border border-gray-100 flex gap-2">
           <button 
             onClick={() => setViewMode('clinics')}
             className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${viewMode === 'clinics' ? 'bg-pink-600 text-white shadow-lg shadow-pink-200' : 'text-gray-400 hover:text-pink-600'}`}
           >
             کلینیک‌ها
           </button>
           <button 
             onClick={() => setViewMode('technicians')}
             className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${viewMode === 'technicians' ? 'bg-pink-600 text-white shadow-lg shadow-pink-200' : 'text-gray-400 hover:text-pink-600'}`}
           >
             متخصصین
           </button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white p-4 rounded-[30px] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
         <div className="relative flex-1 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder={viewMode === 'clinics' ? "جستجوی نام کلینیک یا منطقه..." : "جستجوی تخصص یا نام متخصص..."}
              className="w-full bg-gray-50 border-none rounded-2xl pr-12 pl-6 py-4 font-bold focus:ring-2 focus:ring-pink-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-gray-50 text-gray-600 px-6 py-4 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all">فیلتر پیشرفته</button>
            <button className="flex-1 md:flex-none bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-pink-600 transition-all">اعمال</button>
         </div>
      </div>

      {/* Results Grid - 2 columns on mobile for higher data density */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {viewMode === 'clinics' ? (
          filteredClinics.map(clinic => (
            <div 
              key={clinic.id} 
              onClick={() => onSelectClinic(clinic)}
              className="bg-white rounded-[35px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-40 md:h-64 relative overflow-hidden">
                <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={clinic.name} />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-amber-600 shadow-sm flex items-center gap-1">
                   <span>{clinic.rating}</span>
                   <span>★</span>
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col gap-2">
                 <h3 className="text-sm md:text-xl font-black text-gray-900 line-clamp-1">{clinic.name}</h3>
                 <p className="text-[10px] md:text-sm text-gray-400 font-bold flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {clinic.location}
                 </p>
                 <div className="mt-auto pt-2 flex flex-wrap gap-1">
                    {clinic.services.slice(0, 2).map(sid => (
                       <span key={sid} className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded-md text-[8px] font-black">
                          {MOCK_SERVICES.find(s => s.id === sid)?.name}
                       </span>
                    ))}
                 </div>
              </div>
            </div>
          ))
        ) : (
          filteredTechs.map(tech => (
            <div 
              key={tech.id} 
              onClick={() => onSelectTech(tech)}
              className="bg-white rounded-[35px] p-4 md:p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer text-center relative overflow-hidden group"
            >
               <div className="absolute top-0 left-0 w-16 h-16 bg-pink-50 rounded-br-[40px] -z-10 group-hover:bg-pink-100 transition-colors"></div>
               <div className="relative mb-4 md:mb-6">
                  <img src={tech.image} className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl object-cover mx-auto ring-4 ring-white shadow-lg group-hover:scale-105 transition-transform" alt={tech.name} />
                  {tech.isVerified && (
                     <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="تایید شده">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                     </div>
                  )}
               </div>
               <h3 className="text-xs md:text-xl font-black text-gray-900 mb-1">{tech.name}</h3>
               <p className="text-pink-600 font-bold text-[10px] md:text-sm mb-4 line-clamp-1">{tech.specialty}</p>
               <div className="flex justify-center items-center gap-2 py-2 border-t border-gray-50 mt-auto">
                  <span className="font-black text-gray-900 text-[10px] md:text-sm">{tech.rating}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UnifiedBooking;
