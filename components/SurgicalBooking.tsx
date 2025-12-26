
import React, { useState, useMemo } from 'react';
import { MOCK_CLINICS } from '../constants';
import { Room, Clinic } from '../types';

const SurgicalBooking: React.FC = () => {
  // Filter only clinics that have rooms categorized as surgery or medical
  const surgeryClinics = useMemo(() => 
    MOCK_CLINICS.filter(c => c.rooms.length > 0), 
  []);

  const [selectedClinic, setSelectedClinic] = useState<Clinic>(surgeryClinics[0]);
  const [selectedRoom, setSelectedRoom] = useState<Room>(selectedClinic.rooms[0]);
  const [selectedDate, setSelectedDate] = useState('۱۴۰۲/۰۸/۲۰');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock schedule data for the selected room
  const roomSchedule = [
    { time: '۰۸:۰۰', status: 'booked', label: 'رینوپلاستی - دکتر حسینی' },
    { time: '۰۹:۰۰', status: 'booked', label: 'ریکاوری / استریل' },
    { time: '۱۰:۰۰', status: 'available', label: 'آماده رزرو' },
    { time: '۱۱:۰۰', status: 'available', label: 'آماده رزرو' },
    { time: '۱۲:۰۰', status: 'pending', label: 'در انتظار تایید (رزرو موقت)' },
    { time: '۱۳:۰۰', status: 'available', label: 'آماده رزرو' },
    { time: '۱۴:۰۰', status: 'booked', label: 'بلفاروپلاستی - دکتر راد' },
    { time: '۱۵:۰۰', status: 'booked', label: 'ریکاوری' },
    { time: '۱۶:۰۰', status: 'available', label: 'آماده رزرو' },
  ];

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handleClinicChange = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setSelectedRoom(clinic.rooms[0]);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      {/* Step 1: Clinic Selector Bar */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="text-right space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">اجاره هوشمند فضای درمانی</h1>
            <p className="text-slate-500 font-bold">انتخاب کلینیک و مدیریت اتاق‌های عمل فعال در پلتفرم زیباست</p>
          </div>
          <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-100 flex gap-2 overflow-x-auto no-scrollbar max-w-full">
            {surgeryClinics.map(clinic => (
              <button 
                key={clinic.id}
                onClick={() => handleClinicChange(clinic)}
                className={`px-6 py-3 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${selectedClinic.id === clinic.id ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {clinic.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Room Browser & Timeline */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Room Selection Cards */}
          <div className="space-y-4 text-right">
            <h3 className="text-xl font-black text-slate-900 flex items-center justify-end gap-3">
               اتاق‌های در دسترس در {selectedClinic.name}
               <span className="w-2 h-6 bg-pink-600 rounded-full"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {selectedClinic.rooms.map(room => (
                 <div 
                   key={room.id}
                   onClick={() => setSelectedRoom(room)}
                   className={`p-6 rounded-[35px] border-2 cursor-pointer transition-all flex flex-row-reverse gap-5 group ${selectedRoom.id === room.id ? 'border-pink-600 bg-pink-50/30 shadow-xl shadow-pink-100' : 'border-slate-100 bg-white hover:border-pink-200'}`}
                 >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner bg-slate-100 shrink-0">
                       <img src={room.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={room.name} />
                    </div>
                    <div className="flex-1 text-right flex flex-col justify-center">
                       <h4 className="font-black text-slate-900 text-lg">{room.name}</h4>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 line-clamp-1">{room.features.slice(0, 2).join(' • ')}</p>
                       <div className="mt-2 flex items-center justify-end gap-1">
                          <span className="text-pink-600 font-black">{toPersianDigits(room.pricePerHour.toLocaleString())}</span>
                          <span className="text-[9px] text-slate-400 font-bold">تومان / ساعت</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Daily Schedule Timeline for the selected room */}
          <div className="bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row-reverse justify-between items-center bg-slate-50/50 gap-4">
                <div className="text-right">
                   <h3 className="font-black text-slate-900 text-xl">برنامه زمان‌بندی: {selectedRoom.name}</h3>
                   <p className="text-xs text-slate-400 font-bold">نمایش وضعیت ۲۴ ساعته اتاق برای تاریخ انتخابی</p>
                </div>
                <div className="flex bg-white rounded-2xl border border-slate-200 p-1">
                   <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black">امروز</button>
                   <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-black">فردا</button>
                   <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-black">تقویم</button>
                </div>
             </div>

             <div className="divide-y divide-slate-50">
                {roomSchedule.map((slot, i) => (
                  <div key={i} className="flex items-center group hover:bg-slate-50/50 transition-colors">
                    <div className="w-24 p-6 text-center border-l border-slate-50 font-black text-slate-400 text-sm">
                       {toPersianDigits(slot.time)}
                    </div>
                    <div className="flex-1 p-6">
                       {slot.status === 'booked' ? (
                         <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-2xl flex justify-between items-center animate-in slide-in-from-right-4">
                            <div className="text-right">
                               <p className="text-blue-900 font-black text-sm">{slot.label}</p>
                               <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Reserved & Sterilized</p>
                            </div>
                            <span className="text-blue-400">🔒</span>
                         </div>
                       ) : slot.status === 'pending' ? (
                         <div className="bg-amber-50 border-r-4 border-amber-500 p-4 rounded-2xl flex flex-row-reverse justify-between items-center italic">
                            <div className="text-right">
                               <p className="text-amber-900 font-black text-sm">{slot.label}</p>
                               <span className="text-[10px] bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-bold">رزرو موقت (۱۵ دقیقه تا انقضا)</span>
                            </div>
                            <span className="text-amber-400 animate-pulse">⏳</span>
                         </div>
                       ) : (
                         <div className="flex flex-row-reverse justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                            <p className="text-slate-300 font-bold text-sm">این بازه زمانی برای اجاره آماده است...</p>
                            <button 
                              onClick={() => setIsBookingModalOpen(true)}
                              className="bg-slate-900 text-white px-8 py-2.5 rounded-xl text-xs font-black hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                            >
                              رزرو این ساعت +
                            </button>
                         </div>
                       )}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Room Details & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
           {/* Detailed ID Card of the Selected Room */}
           <div className="bg-slate-900 rounded-[50px] p-8 md:p-10 text-white shadow-3xl sticky top-28 space-y-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-600/10 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                 <div className="aspect-video rounded-[30px] overflow-hidden shadow-2xl border-2 border-white/10">
                    <img src={selectedRoom.image} className="w-full h-full object-cover" alt={selectedRoom.name} />
                 </div>
                 
                 <div className="text-right space-y-2">
                    <span className="bg-pink-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Room Specifications</span>
                    <h2 className="text-3xl font-black tracking-tighter">{selectedRoom.name}</h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed italic">{selectedRoom.description}</p>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] text-right border-b border-white/10 pb-2">تجهیزات تخصصی این اتاق</h4>
                    <div className="grid grid-cols-1 gap-3">
                       {selectedRoom.features.map((feature, idx) => (
                         <div key={idx} className="flex flex-row-reverse items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-emerald-400 text-lg">✓</span>
                            <span className="text-xs font-bold text-slate-200">{feature}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/10 text-right">
                    <div className="flex flex-col items-end mb-6">
                       <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Base Rate</span>
                       <div className="flex items-center gap-2">
                          <span className="text-3xl font-black text-pink-500">{toPersianDigits(selectedRoom.pricePerHour.toLocaleString())}</span>
                          <span className="text-xs font-bold text-slate-400">تومان / ساعت</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => setIsBookingModalOpen(true)}
                      className="w-full py-6 bg-white text-slate-950 rounded-[35px] font-black text-xl hover:bg-pink-600 hover:text-white transition-all shadow-3xl active:scale-95"
                    >
                      ثبت درخواست رزرواسیون
                    </button>
                 </div>
              </div>
           </div>

           {/* Clinic Trust Indicator */}
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-3xl shadow-inner">🛡️</div>
              <div className="space-y-1">
                 <h4 className="font-black text-slate-900 italic">استاندارد زیباست</h4>
                 <p className="text-[10px] text-slate-400 font-bold leading-relaxed px-4">
                    این کلینیک تمامی پروتکل‌های استریلیزاسیون را مطابق با آخرین متدهای وزارت بهداشت رعایت کرده و تحت نظارت پلتفرم می‌باشد.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Modern Booking Form Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[60px] overflow-hidden shadow-4xl animate-in zoom-in-95 duration-300">
              <div className="p-10 md:p-14 space-y-10">
                 <div className="flex justify-between items-center">
                    <button onClick={() => setIsBookingModalOpen(false)} className="text-slate-400 hover:text-pink-600 transition-colors">
                       <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="text-right">
                       <h3 className="text-3xl font-black text-slate-900 tracking-tighter">جزئیات رزرو اتاق عمل</h3>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Surgical Room Reservation Form</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-400 pr-4 block">نام جراح یا تکنسین اصلی</label>
                       <input type="text" placeholder="دکتر ..." className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-400 pr-4 block">نام مراجع (بیمار)</label>
                       <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-400 pr-4 block">نوع عمل جراحی / خدمت</label>
                       <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right shadow-inner">
                          <option>رینوپلاستی (بینی)</option>
                          <option>بلفاروپلاستی (پلک)</option>
                          <option>کاشت ابرو</option>
                          <option>لیپوساکشن غبغب</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black text-slate-400 pr-4 block">مدت زمان حدودی (ساعت)</label>
                       <div className="flex gap-2">
                          {[1, 2, 3, 4].map(n => (
                            <button key={n} className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all ${n === 2 ? 'bg-pink-600 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                               {toPersianDigits(n)}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="p-6 bg-pink-50 rounded-[35px] border border-pink-100 flex items-start flex-row-reverse gap-4">
                    <span className="text-2xl">⚠️</span>
                    <p className="text-[11px] text-pink-900 leading-relaxed font-bold text-right">
                       پس از ثبت درخواست، تیم پشتیبانی زیباست با کلینیک مقصد هماهنگی‌های لازم را انجام داده و تاییدیه نهایی را ظرف حداکثر ۳۰ دقیقه برای شما پیامک خواهد کرد.
                    </p>
                 </div>

                 <div className="flex gap-4">
                    <button onClick={() => setIsBookingModalOpen(false)} className="flex-[2] py-6 bg-slate-950 text-white rounded-[32px] font-black text-xl shadow-4xl hover:bg-pink-600 transition-all active:scale-95">ارسال درخواست رزرو نهایی</button>
                    <button onClick={() => setIsBookingModalOpen(false)} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[32px] font-black text-lg">انصراف</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SurgicalBooking;
