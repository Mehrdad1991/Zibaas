
import React, { useState } from 'react';
import { MOCK_CLINICS } from '../constants';
import { Room, Clinic, SurgeryBooking } from '../types';

const SurgicalBooking: React.FC = () => {
  const surgeryClinics = MOCK_CLINICS.filter(c => c.rooms.some(r => r.type === 'SURGERY' || r.name.includes('جراحی')));
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(surgeryClinics[0]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(selectedClinic?.rooms[0] || null);
  const [selectedDate, setSelectedDate] = useState('۱۴۰۲/۰۸/۲۰');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const timeSlots = [
    { time: '۰۸:۰۰', status: 'booked', label: 'جراحی بلفاروپلاستی - دکتر کریمی' },
    { time: '۰۹:۰۰', status: 'booked', label: 'ریکاوری / استریل' },
    { time: '۱۰:۰۰', status: 'available', label: 'خالی' },
    { time: '۱۱:۰۰', status: 'available', label: 'خالی' },
    { time: '۱۲:۰۰', status: 'pending', label: 'در انتظار تایید - رزرو شده' },
    { time: '۱۳:۰۰', status: 'available', label: 'خالی' },
    { time: '۱۴:۰۰', status: 'available', label: 'خالی' },
    { time: '۱۵:۰۰', status: 'booked', label: 'رینوپلاستی - دکتر مرادی' },
    { time: '۱۶:۰۰', status: 'booked', label: 'ریکاوری' },
    { time: '۱۷:۰۰', status: 'available', label: 'خالی' },
  ];

  const persianDays = [
    { d: 'شنبه', n: '۲۰' },
    { d: 'یکشنبه', n: '۲۱' },
    { d: 'دوشنبه', n: '۲۲' },
    { d: 'سه‌شنبه', n: '۲۳' },
    { d: 'چهارشنبه', n: '۲۴' },
    { d: 'پنج‌شنبه', n: '۲۵' },
    { d: 'جمعه', n: '۲۶' },
  ];

  return (
    <div className="space-y-10 py-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">رزرواسیون هوشمند اتاق عمل</h2>
          <p className="text-gray-500 font-medium">مدیریت متمرکز و تقویم اختصاصی جراحی‌های کلینیک</p>
        </div>
        <div className="flex bg-white p-2 rounded-3xl shadow-sm border border-gray-100 gap-2">
           {surgeryClinics.map(c => (
             <button 
               key={c.id} 
               onClick={() => { setSelectedClinic(c); setSelectedRoom(c.rooms[0]); }}
               className={`px-6 py-3 rounded-2xl text-xs font-black transition-all ${selectedClinic?.id === c.id ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-50'}`}
             >
               {c.name}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Side */}
        <div className="lg:col-span-8 space-y-8">
          {/* Persian Week Picker */}
          <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100 flex justify-between gap-2 overflow-x-auto no-scrollbar">
             {persianDays.map((day, i) => (
               <button 
                 key={i} 
                 className={`flex-1 min-w-[80px] py-6 rounded-3xl flex flex-col items-center gap-2 transition-all ${day.n === '۲۰' ? 'bg-gray-900 text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-600'}`}
               >
                 <span className="text-[10px] font-bold uppercase">{day.d}</span>
                 <span className="text-2xl font-black">{day.n}</span>
               </button>
             ))}
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {selectedClinic?.rooms.map(room => (
               <button 
                 key={room.id}
                 onClick={() => setSelectedRoom(room)}
                 className={`p-6 rounded-[35px] border-2 text-right transition-all flex items-center gap-4 ${selectedRoom?.id === room.id ? 'border-pink-600 bg-pink-50/30' : 'border-gray-100 bg-white hover:border-pink-200'}`}
               >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${selectedRoom?.id === room.id ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    🩺
                 </div>
                 <div>
                    <h4 className="font-black text-gray-900">{room.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{room.features[0]}</p>
                 </div>
               </button>
             ))}
          </div>

          {/* Daily Timeline */}
          <div className="bg-white rounded-[50px] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-black text-gray-900">برنامه زمان‌بندی روزانه - {selectedRoom?.name}</h3>
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">امروز، ۲۰ آبان</span>
             </div>
             <div className="divide-y divide-gray-50">
                {timeSlots.map((slot, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="w-24 p-6 text-center border-l border-gray-50 font-black text-gray-400 text-sm">{slot.time}</div>
                    <div className="flex-1 p-6 relative">
                       {slot.status === 'booked' ? (
                         <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-2xl flex justify-between items-center animate-in slide-in-from-right-4">
                            <div>
                               <p className="text-blue-900 font-black text-sm">{slot.label}</p>
                               <p className="text-[10px] text-blue-600 font-bold uppercase">رزرو نهایی شده</p>
                            </div>
                            <button className="text-blue-400 hover:text-blue-600">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                               </svg>
                            </button>
                         </div>
                       ) : slot.status === 'pending' ? (
                         <div className="bg-amber-50 border-r-4 border-amber-500 p-4 rounded-2xl flex justify-between items-center italic">
                            <p className="text-amber-900 font-black text-sm">{slot.label}</p>
                            <span className="text-[10px] bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-bold">در انتظار پرداخت</span>
                         </div>
                       ) : (
                         <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-gray-300 font-bold text-sm">آماده رزرو برای جراحی...</p>
                            <button 
                              onClick={() => setIsBookingModalOpen(true)}
                              className="bg-gray-900 text-white px-6 py-2 rounded-xl text-xs font-black hover:bg-pink-600 transition-all"
                            >
                              ثبت رزرو جدید +
                            </button>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Info & Stats Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-pink-600 p-8 rounded-[45px] text-white shadow-2xl shadow-pink-100 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                 <h3 className="text-2xl font-black">وضعیت لحظه‌ای</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur">
                       <span className="text-sm opacity-80">اتاق‌های اشغال</span>
                       <span className="font-black">۳ از ۵</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur">
                       <span className="text-sm opacity-80">جراحی‌های امروز</span>
                       <span className="font-black text-lg">۱۲ مورد</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur">
                       <span className="text-sm opacity-80">میانگین استریل</span>
                       <span className="font-black">۴۵ دقیقه</span>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-white text-pink-600 rounded-2xl font-black text-sm shadow-xl">گزارش جامع عملیاتی</button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
           </div>

           <div className="bg-white p-8 rounded-[45px] shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-xl font-black text-gray-900">تجهیزات در دسترس</h3>
              <div className="space-y-3">
                 {[
                   { n: 'دستگاه ساکشن', s: 'آماده', c: 'bg-green-100 text-green-600' },
                   { n: 'مانیتورینگ علائم', s: 'در حال استفاده', c: 'bg-amber-100 text-amber-600' },
                   { n: 'تخت الکترونیکی', s: 'نیاز به سرویس', c: 'bg-red-100 text-red-600' },
                   { n: 'پمپ تزریق فیلر', s: 'آماده', c: 'bg-green-100 text-green-600' },
                 ].map((eq, i) => (
                   <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-2xl transition-all">
                      <span className="text-xs font-bold text-gray-600">{eq.n}</span>
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${eq.c}`}>{eq.s}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Booking Modal (Simplified) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[50px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-10 space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-black text-gray-900">فرم رزرو اتاق عمل</h3>
                    <button onClick={() => setIsBookingModalOpen(false)} className="text-gray-400 hover:text-pink-600 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 mr-4">نام جراح</label>
                       <input type="text" placeholder="دکتر ..." className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 mr-4">نام بیمار</label>
                       <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 mr-4">نوع جراحی</label>
                       <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500">
                          <option>رینوپلاستی (بینی)</option>
                          <option>بلفاروپلاستی (پلک)</option>
                          <option>کاشت ابرو</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 mr-4">نوع بیهوشی</label>
                       <div className="flex gap-2">
                          <button className="flex-1 py-4 rounded-2xl bg-pink-600 text-white font-black text-[10px]">کامل</button>
                          <button className="flex-1 py-4 rounded-2xl bg-gray-50 text-gray-400 font-black text-[10px]">موضعی</button>
                       </div>
                    </div>
                 </div>

                 <div className="p-6 bg-pink-50 rounded-[30px] border border-pink-100">
                    <p className="text-xs text-pink-800 leading-relaxed font-bold">
                       ⚠️ توجه: پس از ثبت رزرو، ۱۵ دقیقه زمان برای تایید نهایی و پرداخت بیعانه توسط جراح یا کلینیک در نظر گرفته شده است.
                    </p>
                 </div>

                 <div className="flex gap-4">
                    <button onClick={() => setIsBookingModalOpen(false)} className="flex-1 py-5 bg-gray-900 text-white rounded-[25px] font-black text-lg shadow-xl hover:bg-pink-600 transition-all">تایید و ثبت نهایی</button>
                    <button onClick={() => setIsBookingModalOpen(false)} className="px-10 py-5 bg-gray-50 text-gray-400 rounded-[25px] font-black">انصراف</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SurgicalBooking;
