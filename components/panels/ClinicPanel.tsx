
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import { Booking, Product } from '../../types';

// Mock data specific to a Clinic instance
const CLINIC_BOOKINGS: Booking[] = [
  { id: 'cb1', serviceName: 'رینوپلاستی', providerName: 'دکتر علوی', customerName: 'سارا رضایی', date: '۱۴۰۲/۰۸/۲۵', time: '۰۹:۰۰', price: 45000000, status: 'CONFIRMED' },
  { id: 'cb2', serviceName: 'تزریق ژل لب', providerName: 'الناز رحیمی', customerName: 'مریم سپهری', date: '۱۴۰۲/۰۸/۲۵', time: '۱۱:۳۰', price: 3500000, status: 'PENDING' },
  { id: 'cb3', serviceName: 'کاشت مو', providerName: 'دکتر صادقی', customerName: 'احمد میرزایی', date: '۱۴۰۲/۰۸/۲۶', time: '۰۸:۰۰', price: 18000000, status: 'CONFIRMED' },
  { id: 'cb4', serviceName: 'بوتاکس', providerName: 'الناز رحیمی', customerName: 'نیلوفر راد', date: '۱۴۰۲/۰۸/۲۶', time: '۱۵:۰۰', price: 1200000, status: 'COMPLETED' },
];

const CLINIC_PURCHASES = [
  { id: 'pur-1', product: MOCK_PRODUCTS[0], date: '۱۴۰۲/۰۸/۱۰', amount: 1, status: 'DELIVERED' },
  { id: 'pur-2', product: MOCK_PRODUCTS[1], date: '۱۴۰۲/۰۸/۱۸', amount: 10, status: 'SHIPPED' },
  { id: 'pur-3', product: MOCK_PRODUCTS[2], date: '۱۴۰۲/۰۷/۰۵', amount: 2, status: 'DELIVERED' },
];

const ClinicPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'bookings' | 'inventory'>('overview');

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-emerald-600 bg-emerald-50';
      case 'PENDING': return 'text-amber-600 bg-amber-50';
      case 'COMPLETED': return 'text-blue-600 bg-blue-50';
      case 'DELIVERED': return 'text-emerald-600 bg-emerald-50';
      case 'SHIPPED': return 'text-blue-600 bg-blue-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 text-right">
      {/* Clinic Identity & Platform Status */}
      <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-slate-100 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        <div className="flex flex-row-reverse items-center gap-6">
           <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 rounded-[35px] overflow-hidden border-4 border-white shadow-xl">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Clinic Logo" />
           </div>
           <div className="text-right">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-tight">مدیریت کلینیک تخصصی زیبا</h2>
              <div className="flex flex-row-reverse items-center gap-2 mt-2">
                 <span className="text-xs font-bold text-slate-400">شناسه مرکز: ZB-4402</span>
                 <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-50 rounded-full border border-pink-100">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">Zibaas Integrated</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex gap-4">
           <div className="bg-slate-900 text-white p-6 rounded-[35px] shadow-2xl flex flex-col items-center justify-center min-w-[140px]">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Daily Revenue</span>
              <p className="text-2xl font-black text-pink-500">{toPersianDigits('۸,۲۰۰,۰۰۰')}</p>
              <span className="text-[8px] font-bold text-slate-400 mt-1">Toman Today</span>
           </div>
           <div className="bg-white border-2 border-slate-50 p-6 rounded-[35px] shadow-sm flex flex-col items-center justify-center min-w-[140px]">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Room Occupancy</span>
              <p className="text-2xl font-black text-slate-900">{toPersianDigits('۷۵٪')}</p>
              <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
              </div>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-2 rounded-[30px] w-full md:w-max mr-auto flex-row-reverse">
         {[
           { id: 'overview', label: 'پیش‌خوان کلینیک', icon: '📊' },
           { id: 'bookings', label: 'نوبت‌های زیباست', icon: '📅' },
           { id: 'inventory', label: 'تدارکات و انبار', icon: '📦' },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveView(tab.id as any)}
             className={`px-8 py-4 rounded-[22px] font-black text-xs md:text-sm transition-all flex items-center gap-3 ${
               activeView === tab.id ? 'bg-white text-pink-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             <span>{tab.label}</span>
             <span>{tab.icon}</span>
           </button>
         ))}
      </div>

      {/* Content Views */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
           {/* Room Status Cards */}
           <div className="lg:col-span-8 space-y-6">
              <h3 className="text-xl font-black text-slate-900 pr-4 border-r-4 border-pink-600">وضعیت لحظه‌ای فضاهای کلینیک</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { n: 'اتاق جراحی شماره ۱', s: 'در حال استفاده', u: 'دکتر علوی', t: 'رینوپلاستی', color: 'border-rose-200 bg-rose-50/30' },
                   { n: 'اتاق تزریق و زیبایی', s: 'آماده رزرو', u: '-', t: '-', color: 'border-emerald-200 bg-emerald-50/30' },
                   { n: 'یونیت پوست A', s: 'ریکاوری / نظافت', u: 'تکنسین الناز', t: 'فیشیال', color: 'border-amber-200 bg-amber-50/30' },
                   { n: 'اتاق VIP', s: 'آماده رزرو', u: '-', t: '-', color: 'border-emerald-200 bg-emerald-50/30' },
                 ].map((room, i) => (
                   <div key={i} className={`p-6 rounded-[35px] border-2 transition-all space-y-4 ${room.color}`}>
                      <div className="flex flex-row-reverse justify-between items-center">
                         <h4 className="font-black text-slate-900">{room.n}</h4>
                         <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${room.s === 'آماده رزرو' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-600'}`}>{room.s}</span>
                      </div>
                      <div className="flex flex-row-reverse justify-between text-xs">
                         <span className="text-slate-400 font-bold">پزشک/تکنسین:</span>
                         <span className="text-slate-900 font-black">{room.u}</span>
                      </div>
                      <div className="flex flex-row-reverse justify-between text-xs">
                         <span className="text-slate-400 font-bold">نوع خدمت:</span>
                         <span className="text-slate-900 font-black">{room.t}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Platform Notifications */}
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900 p-10 rounded-[50px] text-white space-y-8 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 left-0 w-full h-full bg-pink-600/10 pointer-events-none"></div>
                 <h3 className="text-xl font-black relative z-10">اعلان‌های پلتفرم</h3>
                 <div className="space-y-4 relative z-10">
                    {[
                      { t: 'پرداخت بیعانه موفق', d: 'رزرو سارا رضایی تایید شد.', i: '💰' },
                      { t: 'درخواست متخصص', d: 'الناز رحیمی نوبت جدید باز کرد.', i: '👤' },
                      { t: 'اتمام موجودی مواد', d: 'بوتاکس مصپورت رو به اتمام است.', i: '🧪' },
                    ].map((n, i) => (
                      <div key={i} className="flex flex-row-reverse items-start gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                         <span className="text-xl">{n.i}</span>
                         <div className="text-right">
                            <p className="text-xs font-black">{n.t}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{n.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-xs hover:bg-pink-700 transition-all">مشاهده تمامی پیام‌ها</button>
              </div>
           </div>
        </div>
      )}

      {activeView === 'bookings' && (
        <div className="bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-right-4 duration-500">
           <div className="p-8 border-b border-slate-50 flex flex-row-reverse justify-between items-center">
              <h3 className="text-xl font-black text-slate-900">لیست نوبت‌های رزرو شده (Zibaas Bookings)</h3>
              <div className="flex gap-2">
                 <button className="px-6 py-2 bg-slate-50 rounded-xl text-xs font-black text-slate-400">امروز</button>
                 <button className="px-6 py-2 bg-slate-50 rounded-xl text-xs font-black text-slate-400">فردا</button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                 <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <tr>
                       <th className="p-8">شناسه رزرو</th>
                       <th className="p-8">خدمت</th>
                       <th className="p-8">تکنسین / پزشک</th>
                       <th className="p-8">نام مراجع</th>
                       <th className="p-8">زمان حضور</th>
                       <th className="p-8">وضعیت</th>
                       <th className="p-8">عملیات</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {CLINIC_BOOKINGS.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors text-sm font-bold text-slate-700">
                         <td className="p-8 font-mono text-xs">{toPersianDigits(booking.id.toUpperCase())}</td>
                         <td className="p-8 text-slate-900">{booking.serviceName}</td>
                         <td className="p-8">{booking.providerName}</td>
                         <td className="p-8">{booking.customerName}</td>
                         <td className="p-8 text-left" dir="ltr">{toPersianDigits(booking.date)} | {toPersianDigits(booking.time)}</td>
                         <td className="p-8">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${getStatusColor(booking.status)}`}>
                               {booking.status === 'CONFIRMED' ? 'تایید شده' : booking.status === 'PENDING' ? 'در انتظار' : 'انجام شده'}
                            </span>
                         </td>
                         <td className="p-8">
                            <button className="text-pink-600 hover:underline">جزئیات</button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {activeView === 'inventory' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Zibaas Purchases History */}
              <div className="bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex flex-row-reverse justify-between items-center bg-slate-900 text-white">
                    <h3 className="text-lg font-black">تاریخچه خرید تجهیزات از زیباست</h3>
                    <button className="text-[10px] font-black text-pink-500 underline">ورود به فروشگاه</button>
                 </div>
                 <div className="divide-y divide-slate-50">
                    {CLINIC_PURCHASES.map(purchase => (
                      <div key={purchase.id} className="p-6 flex flex-row-reverse items-center gap-6 hover:bg-slate-50 transition-all">
                         <img src={purchase.product.image} className="w-16 h-16 rounded-2xl object-cover bg-slate-100 p-2 shadow-inner" alt="" />
                         <div className="flex-1 text-right">
                            <h5 className="font-black text-slate-900 text-sm">{purchase.product.name}</h5>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">تاریخ فاکتور: {toPersianDigits(purchase.date)}</p>
                         </div>
                         <div className="flex flex-col items-start gap-2">
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${getStatusColor(purchase.status)}`}>{purchase.status}</span>
                            <span className="text-[10px] font-black text-slate-400">{toPersianDigits(purchase.amount)} عدد</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Stock Management Suggestion */}
              <div className="bg-indigo-50 rounded-[50px] p-10 flex flex-col justify-center items-center text-center space-y-6 border border-indigo-100">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl shadow-indigo-200/50 animate-bounce">⚡</div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-indigo-950">شارژ هوشمند انبار کلینیک</h3>
                    <p className="text-sm text-indigo-700 leading-relaxed font-medium">
                       هوش مصنوعی زیباست تشخیص داده است که بر اساس نوبت‌های هفته آینده، شما به «۱۰ عدد بوتاکس دیسپورت» نیاز خواهید داشت.
                    </p>
                 </div>
                 <button className="bg-indigo-950 text-white px-10 py-5 rounded-[28px] font-black text-sm shadow-2xl hover:bg-indigo-800 transition-all active:scale-95">
                    سفارش فوری با یک کلیک
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClinicPanel;
