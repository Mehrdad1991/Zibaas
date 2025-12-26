
import React from 'react';
import { Booking } from '../../types';

const MOCK_USER_BOOKINGS: Booking[] = [
  { id: 'b1', serviceName: 'بوتاکس پیشانی', providerName: 'کلینیک زیبا', date: '۱۴۰۲/۰۸/۲۰', time: '۱۰:۳۰', price: 1200000, status: 'CONFIRMED' },
  { id: 'b2', serviceName: 'فیشیال تخصصی', providerName: 'الناز رحیمی', date: '۱۴۰۲/۰۷/۱۵', time: '۱۶:۰۰', price: 850000, status: 'COMPLETED' },
];

const CustomerPanel: React.FC = () => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="text-right">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">پنل کاربری زیباست من</h2>
          <p className="text-slate-400 font-bold mt-2">خوش آمدید، علی مرادی عزیز ✨</p>
        </div>
        <div className="bg-white p-3 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-4">
           <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 text-xl font-black shadow-inner">Z</div>
           <div className="text-right pr-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loyalty Tier</p>
              <p className="text-sm font-black text-slate-900">عضویت طلایی (VIP)</p>
           </div>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 rounded-full blur-[60px] group-hover:scale-150 transition-transform duration-700"></div>
           <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur">💰</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Wallet</p>
           </div>
           <div className="relative z-10">
              <h3 className="text-3xl font-black">{toPersianDigits('۲,۴۵۰,۰۰۰')} <span className="text-xs font-normal opacity-60">تومان</span></h3>
              <button className="mt-6 w-full py-3 bg-pink-600 rounded-2xl font-black text-xs hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-pink-900/40">افزایش موجودی +</button>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl text-blue-600">🗓️</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Active Bookings</p>
           </div>
           <div>
              <h3 className="text-3xl font-black text-slate-900">{toPersianDigits('۱')} <span className="text-xs font-medium text-slate-400">مورد فعال</span></h3>
              <p className="text-[10px] text-blue-500 font-black mt-2">نوبت بعدی: فردا ۱۰:۳۰ (بوتاکس)</p>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl text-amber-600">⭐</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Loyalty Points</p>
           </div>
           <div>
              <h3 className="text-3xl font-black text-slate-900">{toPersianDigits('۴۵۰')} <span className="text-xs font-medium text-slate-400">امتیاز</span></h3>
              <p className="text-[10px] text-amber-600 font-black mt-2">٪۱۰ تخفیف در رزرو بعدی فعال شد</p>
           </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="text-xl font-black text-slate-900">تاریخچه خدمات و تراکنش‌ها</h3>
          <button className="bg-white px-6 py-2 rounded-xl text-xs font-black text-pink-600 border border-slate-100 shadow-sm hover:bg-pink-50 transition-all">مشاهده همه</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-6">سرویس / خدمت</th>
                <th className="p-6">ارائه‌دهنده</th>
                <th className="p-6">تاریخ و ساعت</th>
                <th className="p-6">مبلغ پرداختی</th>
                <th className="p-6">وضعیت نهایی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_USER_BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="p-6">
                     <div className="flex items-center gap-3 flex-row-reverse">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">💉</div>
                        <span className="font-black text-slate-900 group-hover:text-pink-600 transition-colors">{booking.serviceName}</span>
                     </div>
                  </td>
                  <td className="p-6 text-slate-600 font-bold text-sm">{booking.providerName}</td>
                  <td className="p-6 text-slate-400 text-xs font-black">{booking.date} - {booking.time}</td>
                  <td className="p-6 font-black text-slate-900">{toPersianDigits(booking.price.toLocaleString())} تومان</td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm ${
                      booking.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                      booking.status === 'COMPLETED' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {booking.status === 'CONFIRMED' ? 'تایید شده (در انتظار)' : 'انجام شده'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Health Advice Banner */}
      <div className="bg-gradient-to-br from-pink-600 to-rose-600 p-10 rounded-[50px] text-white relative overflow-hidden shadow-3xl shadow-pink-200/50">
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-right space-y-4">
               <h3 className="text-3xl font-black leading-tight">پیشنهاد هوشمند Zibaas AI</h3>
               <p className="text-pink-100 text-lg font-medium opacity-90 max-w-xl">
                 بر اساس سوابق اخیر شما، دستیار هوشمند پیشنهاد می‌کند ۴ هفته دیگر برای ترمیم فیلر لب خود نوبت رزرو کنید تا نتیجه بهتری بگیرید.
               </p>
               <button className="bg-white text-pink-600 px-8 py-3 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all">رزرو نوبت ترمیم هوشمند</button>
            </div>
            <div className="w-40 h-40 bg-white/20 backdrop-blur-xl rounded-[40px] flex items-center justify-center text-6xl shadow-2xl border border-white/20">🤖</div>
         </div>
      </div>
    </div>
  );
};

export default CustomerPanel;
