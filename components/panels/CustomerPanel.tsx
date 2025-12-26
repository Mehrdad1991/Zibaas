
import React from 'react';
import { Booking } from '../../types';

const MOCK_USER_BOOKINGS: Booking[] = [
  { id: 'b1', serviceName: 'بوتاکس پیشانی', providerName: 'کلینیک زیبا', date: '۱۴۰۲/۰۸/۲۰', time: '۱۰:۳۰', price: 1200000, status: 'CONFIRMED' },
];

const CustomerPanel: React.FC = () => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">زیباستِ من (پنل کاربری)</h2>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Wallet Status</span>
           <span className="text-xl font-black text-emerald-600">{toPersianDigits('۲,۴۵۰,۰۰۰')} تومان</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-right space-y-4">
           <div className="text-3xl">🗓️</div>
           <h4 className="text-slate-400 font-bold text-xs uppercase">نوبت‌های پیش رو</h4>
           <p className="text-2xl font-black text-slate-900">{toPersianDigits('۱')} مورد</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-right space-y-4">
           <div className="text-3xl">⭐</div>
           <h4 className="text-slate-400 font-bold text-xs uppercase">امتیاز وفاداری</h4>
           <p className="text-2xl font-black text-slate-900">{toPersianDigits('۴۵۰')} امتیاز</p>
        </div>
        <div className="bg-pink-600 p-8 rounded-[40px] text-white text-right space-y-4 shadow-xl shadow-pink-100">
           <div className="text-3xl">🎁</div>
           <h4 className="text-pink-200 font-bold text-xs uppercase">تخفیف هوشمند فعال</h4>
           <p className="text-2xl font-black">٪۱۵ برای خدمات پوست</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <button className="text-xs font-black text-pink-600 hover:underline">مشاهده همه تراکنش‌ها</button>
          <h3 className="text-xl font-black text-slate-900">آخرین فعالیت‌ها</h3>
        </div>
        <div className="p-8 space-y-4">
          {MOCK_USER_BOOKINGS.map(b => (
            <div key={b.id} className="flex flex-col md:flex-row-reverse justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 gap-4">
              <div className="flex flex-row-reverse items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">💉</div>
                <div className="text-right">
                  <h5 className="font-black text-slate-900">{b.serviceName}</h5>
                  <p className="text-[10px] text-slate-400 font-bold">{b.providerName}</p>
                </div>
              </div>
              <div className="flex gap-8 items-center flex-row-reverse">
                <div className="text-right">
                  <p className="text-xs font-black text-slate-900">{b.date}</p>
                  <p className="text-[10px] text-slate-400 font-bold">ساعت {b.time}</p>
                </div>
                <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Confirmed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel;
