
import React, { useState, useMemo } from 'react';
import { MOCK_CLINICS } from '../constants';
import { Clinic, Room } from '../types';
import { Role } from '../store/roles';

interface RoomRentalProps {
  onViewRoomDetail: (room: Room, clinic: Clinic) => void;
  userRole: Role | null;
  isVerified?: boolean;
}

const RoomRental: React.FC<RoomRentalProps> = ({ onViewRoomDetail, userRole, isVerified = false }) => {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minCapacity, setMinCapacity] = useState<number>(1);
  const [showFilters, setShowFilters] = useState(false);

  const allFeatures = useMemo(() => {
    const features = new Set<string>();
    MOCK_CLINICS.forEach(c => c.rooms.forEach(r => r.features.forEach(f => features.add(f))));
    return Array.from(features);
  }, []);

  const filteredRooms = useMemo(() => {
    if (!selectedClinic) return [];
    return selectedClinic.rooms.filter(room => {
      const priceMatch = room.pricePerHour <= maxPrice;
      const featureMatch = selectedFeatures.length === 0 || selectedFeatures.every(f => room.features.includes(f));
      return priceMatch && featureMatch;
    });
  }, [selectedClinic, maxPrice, selectedFeatures]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  // If user is not a technician or not verified, show a conversion landing page
  if (userRole !== Role.Technician || !isVerified) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-12 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
        </div>
        <div className="space-y-4">
           <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">ویژه متخصصین و فریلنسرها</h1>
           <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
             دسترسی به مجهزترین اتاق‌های جراحی و زیبایی شهر فقط برای متخصصین احراز هویت شده Zibaas امکان‌پذیر است.
           </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { t: 'احراز هویت', d: 'ارسال مدارک نظام پزشکی یا فنی‌حرفه‌ای', i: '📜' },
             { t: 'تایید سیستمی', d: 'بررسی مدارک توسط تیم نظارت در کمتر از ۲۴ ساعت', i: '⚡' },
             { t: 'رزرو فضا', d: 'دسترسی نامحدود به اتاق‌ها بصورت ساعتی و روزانه', i: '🔑' },
           ].map((item, idx) => (
             <div key={idx} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-3">
                <div className="text-3xl">{item.i}</div>
                <h4 className="font-black text-gray-900">{item.t}</h4>
                <p className="text-xs text-gray-400 font-medium">{item.d}</p>
             </div>
           ))}
        </div>
        <button className="bg-pink-600 text-white px-12 py-5 rounded-[25px] font-black text-lg shadow-2xl shadow-pink-200 hover:scale-105 transition-transform">
           شروع فرآیند احراز هویت
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">اجاره هوشمند اتاق کلینیک</h1>
          <p className="text-gray-500 text-lg font-medium italic">خوش آمدید، همکار گرامی. فضاهای کاری آماده رزرو هستند.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-4">
          <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">✓</div>
          <p className="text-sm text-green-800 font-black text-right">
            حساب شما تایید شده است. <br/>امکان رزرو فوری با تخفیف همکار فعال شد.
          </p>
        </div>
      </div>

      {!selectedClinic ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {MOCK_CLINICS.map(clinic => (
            <div 
              key={clinic.id} 
              className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all cursor-pointer group"
              onClick={() => setSelectedClinic(clinic)}
            >
              <div className="h-40 md:h-56 relative">
                <img src={clinic.image} className="w-full h-full object-cover" alt={clinic.name} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-[10px] md:text-xs font-black text-pink-600">
                  {clinic.rooms.length} اتاق آماده
                </div>
              </div>
              <div className="p-4 md:p-6 text-right">
                <h3 className="text-sm md:text-2xl font-black text-gray-900 mb-2 line-clamp-1">{clinic.name}</h3>
                <p className="text-[10px] md:text-sm text-gray-500 mb-6 flex items-center gap-1 justify-end">
                  {clinic.location}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400">ساعتی ۲۰۰k+</span>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] md:text-sm font-black group-hover:bg-pink-600 transition-colors">
                    انتخاب اتاق
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button 
              onClick={() => setSelectedClinic(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-pink-600 font-black transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              بازگشت به لیست کلینیک‌ها
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-2 rounded-2xl font-black text-sm transition-all ${showFilters ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              فیلترهای پیشرفته
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 animate-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              <div className="space-y-4">
                <label className="text-sm font-black text-gray-900 pr-2">محدوده قیمت (ساعتی)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="1000000" 
                  step="50000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-pink-600"
                />
                <div className="flex justify-between text-xs font-bold text-gray-400">
                  <span>۱,۰۰۰,۰۰۰+ تومان</span>
                  <span>{maxPrice.toLocaleString()} تومان</span>
                  <span>۰ تومان</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-black text-gray-900 pr-2">تجهیزات و ویژگی‌ها</label>
                <div className="flex flex-wrap gap-2 justify-end">
                  {allFeatures.slice(0, 10).map((feature, i) => (
                    <button
                      key={i}
                      onClick={() => toggleFeature(feature)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${selectedFeatures.includes(feature) ? 'bg-pink-600 text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-black text-gray-900 pr-2">ظرفیت نفرات</label>
                <div className="flex gap-2 justify-end">
                  {[1, 2, 3].map(n => (
                    <button
                      key={n}
                      onClick={() => setMinCapacity(n)}
                      className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${minCapacity === n ? 'bg-pink-600 text-white shadow-md' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => { setMaxPrice(1000000); setSelectedFeatures([]); setMinCapacity(1); }}
                  className="text-pink-600 text-[10px] font-bold hover:underline w-full text-center"
                >
                  پاکسازی فیلترها
                </button>
              </div>
            </div>
          )}

          <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-8 border-r-8 border-pink-600 pr-6 text-right">اتاق‌های موجود در {selectedClinic.name}</h2>
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredRooms.map(room => (
                  <div key={room.id} className="border border-gray-100 rounded-[40px] overflow-hidden flex flex-col md:flex-row-reverse gap-6 p-4 hover:border-pink-200 transition-all bg-gray-50/30 text-right">
                    <img src={room.image} className="w-full md:w-48 h-48 rounded-[30px] object-cover" alt={room.name} />
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">{room.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-4 justify-end">
                          {room.features.slice(0, 3).map((f, i) => (
                            <span key={i} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => onViewRoomDetail(room, selectedClinic)}
                          className="bg-gray-900 text-white px-6 py-2.5 rounded-2xl font-black text-xs hover:bg-pink-600 transition-all"
                        >
                          رزرو سریع
                        </button>
                        <div>
                          <span className="text-2xl font-black text-pink-600">{room.pricePerHour.toLocaleString()}</span>
                          <span className="text-[10px] text-gray-400 mr-1 font-bold">تومان / ساعت</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="text-5xl text-gray-200">🔍</div>
                <h3 className="text-xl font-black text-gray-400">هیچ اتاقی با این مشخصات پیدا نشد.</h3>
                <p className="text-sm text-gray-300">لطفا فیلترهای خود را تغییر دهید.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomRental;
