
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import { Booking } from '../../types';

// Mock data for the technician
const TECH_BOOKINGS: Booking[] = [
  // Fixed: Added missing providerName property to comply with Booking interface
  { id: 'tb1', serviceName: 'فیشیال کلاسیک', providerName: 'الناز رحیمی', customerName: 'نیلوفر راد', date: '۱۴۰۲/۰۹/۲۰', time: '۰۹:۰۰', price: 850000, status: 'CONFIRMED' },
  // Fixed: Added missing providerName property to comply with Booking interface
  { id: 'tb2', serviceName: 'پاکسازی تخصصی', providerName: 'الناز رحیمی', customerName: 'مریم شاد', date: '۱۴۰۲/۰۹/۲۰', time: '۱۱:۳۰', price: 1200000, status: 'CONFIRMED' },
  // Fixed: Added missing providerName property to comply with Booking interface
  { id: 'tb3', serviceName: 'آنالیز پوست (هدیه)', providerName: 'الناز رحیمی', customerName: 'سارا رضایی', date: '۱۴۰۲/۰۹/۲۱', time: '۱۶:۰۰', price: 0, status: 'PENDING' },
];

const TECH_INVENTORY = [
  { id: 'i1', name: 'کارتریج لیزر تیتانیوم', usage: 75, status: 'OK' },
  { id: 'i2', name: 'ژل سونوگرافی (۵ لیتری)', usage: 20, status: 'LOW' },
  { id: 'i3', name: 'سری‌های یکبار مصرف هیدرودرمی', usage: 90, status: 'OK' },
];

const TechnicianPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'inventory'>('overview');

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-right">
      {/* Tech Profile Header & Status */}
      <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        <div className="flex flex-row-reverse items-center gap-6">
           <div className="relative">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-[35px] overflow-hidden border-4 border-white shadow-xl">
                 <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Tech" />
              </div>
              <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z"/></svg>
              </div>
           </div>
           <div className="text-right">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">استاد الناز رحیمی</h2>
              <p className="text-pink-600 font-bold text-sm">متخصص ارشد فیشیال و جوانسازی (Zibaas Verified)</p>
           </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
           <div className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-4 rounded-[25px] text-center shadow-xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Weekly Earnings</p>
              <p className="text-xl font-black text-pink-500">{toPersianDigits('۱۲,۴۵۰,۰۰۰')} <span className="text-[10px] text-white/50">T</span></p>
           </div>
           <div className="flex-1 md:flex-none bg-pink-50 text-pink-600 px-8 py-4 rounded-[25px] text-center border border-pink-100">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Active Room</p>
              <p className="text-sm font-black">اتاق VIP ۱ (جردن)</p>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-[22px] w-full md:w-max mr-auto flex-row-reverse">
        {[
          { id: 'overview', label: 'وضعیت کلی', icon: '📊' },
          { id: 'schedule', label: 'برنامه کاری', icon: '📅' },
          { id: 'inventory', label: 'مواد و تجهیزات', icon: '🧪' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-[18px] font-black text-xs transition-all flex items-center gap-2 ${
              activeTab === tab.id ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>{tab.label}</span>
            <span>{tab.icon}</span>
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
           {/* Main Column */}
           <div className="lg:col-span-8 space-y-8">
              {/* Rental Lock-in Card */}
              <div className="bg-indigo-900 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                 <div className="relative z-10 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
                    <div className="text-right space-y-4">
                       <h3 className="text-2xl font-black">مدیریت فضای کاری هوشمند</h3>
                       <p className="text-indigo-200 text-sm font-medium leading-relaxed max-w-md">
                          شما هم‌اکنون در «کلینیک تخصصی زیبا» مستقر هستید. رزرو شما تا پایان آذرماه معتبر است.
                       </p>
                       <div className="flex flex-row-reverse gap-3">
                          <button className="bg-white text-indigo-900 px-6 py-2.5 rounded-xl font-black text-xs hover:bg-indigo-50 transition-all">تمدید اجاره فضا</button>
                          <button className="bg-indigo-800 text-white px-6 py-2.5 rounded-xl font-black text-xs hover:bg-indigo-700 transition-all">تغییر کلینیک</button>
                       </div>
                    </div>
                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-white/10">🔑</div>
                 </div>
              </div>

              {/* Today's Agenda Brief */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex flex-row-reverse justify-between items-center">
                    <h3 className="font-black text-slate-900">نوبت‌های تایید شده امروز</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{toPersianDigits('۱۴۰۲/۰۹/۲۰')}</span>
                 </div>
                 <div className="divide-y divide-slate-50">
                    {TECH_BOOKINGS.filter(b => b.date === '۱۴۰۲/۰۹/۲۰').map(booking => (
                      <div key={booking.id} className="p-6 flex flex-row-reverse items-center justify-between hover:bg-slate-50 transition-all group">
                         <div className="flex flex-row-reverse items-center gap-4">
                            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center font-black">
                               {booking.customerName ? booking.customerName[0] : 'U'}
                            </div>
                            <div className="text-right">
                               <p className="font-black text-slate-900 text-sm">{booking.customerName}</p>
                               <p className="text-[10px] text-slate-400 font-bold">{booking.serviceName}</p>
                            </div>
                         </div>
                         <div className="text-left">
                            <p className="font-black text-slate-900 text-sm">ساعت {toPersianDigits(booking.time)}</p>
                            <button className="text-pink-600 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all">شروع فرآیند پذیرش</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="lg:col-span-4 space-y-8">
              {/* Platform Performance */}
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                 <h3 className="font-black text-slate-900 text-center">عملکرد شما در زیباست</h3>
                 <div className="space-y-6">
                    <div className="text-center">
                       <p className="text-4xl font-black text-slate-900">{toPersianDigits('۴.۹')}</p>
                       <div className="flex justify-center gap-1 text-amber-400 mt-1">★★★★★</div>
                       <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Satisfaction Score</p>
                    </div>
                    <div className="space-y-4">
                       {[
                         { l: 'نوبت‌های ماهانه', v: '۴۲ مورد', p: 85 },
                         { l: 'مشتریان وفادار', v: '۱۸ نفر', p: 40 },
                       ].map((stat, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black">
                               <span className="text-slate-400">{stat.l}</span>
                               <span className="text-slate-900">{toPersianDigits(stat.v)}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                               <div className="h-full bg-pink-600 rounded-full" style={{ width: `${stat.p}%` }}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* AI Coaching Lock-in */}
              <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden">
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-600/20 rounded-full blur-2xl"></div>
                 <h4 className="font-black text-lg flex items-center flex-row-reverse gap-3">
                    <span className="text-2xl">🧠</span>
                    دستیار هوشمند رشد
                 </h4>
                 <p className="text-xs text-slate-400 leading-relaxed text-right font-medium">
                    بر اساس تحلیل‌های Gemini، شما می‌توانید با اضافه کردن سرویس «مزوتراپی مو»، پتانسیل درآمدی خود را در این کلینیک تا ۲۵٪ افزایش دهید.
                 </p>
                 <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black hover:bg-white/10 transition-all">مشاهده تحلیل بازار منطقه</button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-12 animate-in slide-in-from-left-4 duration-500 text-right">
           <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-10 gap-6">
              <h3 className="text-2xl font-black text-slate-900">مدیریت تقویم کاری</h3>
              <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-2">
                 <button className="px-6 py-2 bg-white rounded-xl shadow-sm text-xs font-black text-slate-900">هفتگی</button>
                 <button className="px-6 py-2 text-xs font-bold text-slate-400">ماهانه</button>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((day, i) => (
                <div key={day} className="space-y-4">
                   <div className="text-center p-3 bg-slate-50 rounded-2xl">
                      <p className="text-[10px] font-black text-slate-400">{day}</p>
                      <p className="font-black text-slate-900">{toPersianDigits(20 + i)}</p>
                   </div>
                   <div className="space-y-2">
                      {i < 5 ? (
                        <div className="p-3 bg-pink-50 border border-pink-100 rounded-xl text-[10px] font-black text-pink-700 text-center">۸:۰۰ - ۱۷:۰۰</div>
                      ) : (
                        <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-300 text-center">تعطیل</div>
                      )}
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12 flex justify-center">
              <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-pink-600 transition-all">به‌روزرسانی ساعات کاری در Zibaas</button>
           </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-left-4 duration-500">
           {/* Specialized Tools Lock-in */}
           <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-row-reverse justify-between items-center bg-slate-900 text-white">
                 <h3 className="font-black">مصرفی‌های جاری (Zibaas Stock)</h3>
                 <span className="text-[10px] font-bold text-pink-500">ارسال خودکار فعال است</span>
              </div>
              <div className="divide-y divide-slate-50">
                 {TECH_INVENTORY.map(item => (
                   <div key={item.id} className="p-6 flex flex-row-reverse items-center justify-between">
                      <div className="text-right">
                         <p className="font-black text-slate-900 text-sm">{item.name}</p>
                         <p className={`text-[9px] font-bold uppercase mt-1 ${item.status === 'LOW' ? 'text-rose-500' : 'text-emerald-500'}`}>{item.status === 'LOW' ? 'Needs Refill' : 'Stock Optimal'}</p>
                      </div>
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${item.status === 'LOW' ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${item.usage}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-6 bg-slate-50 text-center">
                 <button className="text-pink-600 font-black text-xs hover:underline">مشاهده تاریخچه سفارشات تجهیزات</button>
              </div>
           </div>

           {/* Purchase CTA */}
           <div className="bg-pink-600 rounded-[40px] p-10 flex flex-col justify-center items-center text-center space-y-6 text-white shadow-2xl shadow-pink-200">
              <div className="text-5xl">🛍️</div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black">نیاز به ابزار جدید دارید؟</h3>
                 <p className="text-sm text-pink-100 leading-relaxed font-medium">
                    به‌عنوان تکنسین تایید شده زیباست، می‌توانید تمامی تجهیزات تخصصی و مواد مصرفی را با ۳۰٪ تخفیف ویژه و تسویه مدت‌دار از فروشگاه تهیه کنید.
                 </p>
              </div>
              <button className="bg-white text-pink-600 px-10 py-5 rounded-[28px] font-black text-sm shadow-2xl hover:scale-105 transition-all">
                 ورود به فروشگاه همکاران
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianPanel;
