
import React from 'react';
import { Room, Clinic } from '../types';

interface RoomDetailProps {
  room: Room;
  clinic: Clinic;
  onBack: () => void;
  onBook: () => void;
}

const RoomDetail: React.FC<RoomDetailProps> = ({ room, clinic, onBack, onBook }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-pink-600 font-bold transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        بازگشت به لیست اتاق‌ها
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Gallery */}
          <div className="space-y-4">
             <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl relative">
                <img src={room.image} className="w-full h-full object-cover" alt={room.name} />
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-pink-600 font-black shadow-lg">
                  نمای اصلی
                </div>
             </div>
             <div className="grid grid-cols-3 gap-4">
               {room.gallery.slice(1).map((img, idx) => (
                 <div key={idx} className="h-32 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                 </div>
               ))}
             </div>
          </div>

          {/* Title & Description */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">{room.name}</h1>
                <p className="text-gray-500 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  مستقر در {clinic.name}
                </p>
              </div>
              <div className="text-left">
                 <div className="text-3xl font-black text-pink-600">{room.pricePerHour.toLocaleString()}</div>
                 <div className="text-sm text-gray-400">تومان به ازای هر ساعت</div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-gray-800">توضیحات فضا</h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {room.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-50">
               {[
                 { label: 'ظرفیت', val: '۱ تا ۲ نفر', icon: '👥' },
                 { label: 'متراژ', val: '۱۸ متر مربع', icon: '📏' },
                 { label: 'استریلیزاسیون', val: 'کلاس B', icon: '✨' },
                 { label: 'نورپردازی', val: 'هوشمند', icon: '💡' },
               ].map((item, i) => (
                 <div key={i} className="text-center">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                    <div className="font-bold text-gray-800 text-sm">{item.val}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Amenities/Features */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-black mb-8 text-gray-900 border-r-4 border-pink-600 pr-4">امکانات و تجهیزات تخصصی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-pink-50/50 border border-pink-100/50">
                   <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                   </div>
                   <span className="font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Booking Widget */}
        <div className="lg:col-span-4">
           <div className="bg-white p-8 rounded-3xl shadow-2xl border border-pink-50 sticky top-28 space-y-6">
              <h3 className="text-2xl font-black text-gray-900">بررسی دسترس‌پذیری</h3>
              
              <div className="space-y-4">
                <div>
                   <label className="text-sm font-bold text-gray-500 mb-2 block">انتخاب تاریخ</label>
                   <div className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 flex justify-between items-center cursor-pointer hover:border-pink-300 transition-colors">
                      <span className="font-bold">امروز، ۱۸ مهر</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                   </div>
                </div>

                <div>
                   <label className="text-sm font-bold text-gray-500 mb-2 block">ساعت شروع و پایان</label>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center font-bold">۰۹:۰۰</div>
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center font-bold">۱۱:۰۰</div>
                   </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-3">
                 <div className="flex justify-between text-gray-500">
                    <span>اجاره (۲ ساعت)</span>
                    <span>{(room.pricePerHour * 2).toLocaleString()} تومان</span>
                 </div>
                 <div className="flex justify-between text-gray-500">
                    <span>کارمزد پلتفرم</span>
                    <span>۰ تومان (رایگان)</span>
                 </div>
                 <div className="flex justify-between items-center pt-3 text-xl font-black text-gray-900">
                    <span>جمع کل:</span>
                    <span className="text-pink-600">{(room.pricePerHour * 2).toLocaleString()} تومان</span>
                 </div>
              </div>

              <button 
                onClick={onBook}
                className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-100 hover:bg-pink-700 hover:scale-[1.02] transition-all"
              >
                تایید و پرداخت آنلاین
              </button>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl text-amber-800 text-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
                 <p>لطفاً نیم ساعت قبل از زمان رزرو جهت هماهنگی استریلیزاسیون در محل حضور داشته باشید.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
