
import React, { useState } from 'react';
import { MOCK_CLINICS, MOCK_TECHNICIANS } from '../constants.tsx';
import { Link } from 'react-router-dom';

const SearchResults: React.FC = () => {
  const [viewMode, setViewMode] = useState<'clinics' | 'technicians'>('clinics');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter">نتایج جستجو</h2>
        <div className="bg-white p-2 rounded-[25px] shadow-sm border border-gray-100 flex gap-2">
           <button 
             onClick={() => setViewMode('clinics')}
             className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${viewMode === 'clinics' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
           >
             کلینیک‌ها
           </button>
           <button 
             onClick={() => setViewMode('technicians')}
             className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${viewMode === 'technicians' ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-pink-600'}`}
           >
             متخصصین
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {viewMode === 'clinics' ? (
          MOCK_CLINICS.map(clinic => (
            <Link key={clinic.id} to={`/clinic/${clinic.id}`} className="bg-white rounded-[35px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all p-4 group">
               <img src={clinic.image} className="w-full h-48 object-cover rounded-[28px] mb-4" />
               <h3 className="text-lg font-black text-gray-900 text-right">{clinic.name}</h3>
            </Link>
          ))
        ) : (
          MOCK_TECHNICIANS.map(tech => (
            <Link key={tech.id} to={`/technician/${tech.id}`} className="bg-white rounded-[35px] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center">
               <img src={tech.image} className="w-24 h-24 rounded-3xl object-cover mx-auto mb-4" />
               <h3 className="text-xl font-black text-gray-900">{tech.name}</h3>
               <p className="text-pink-600 font-bold text-sm">{tech.specialty}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
