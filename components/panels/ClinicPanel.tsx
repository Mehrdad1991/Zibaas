
import React from 'react';

const ClinicPanel: React.FC = () => {
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 text-right">
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">کنترل‌پنل مدیریت کلینیک</h2>
        <div className="flex gap-2">
           <div className="bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm text-center">
              <p className="text-[8px] font-black text-slate-400 uppercase">Available Rooms</p>
              <p className="text-lg font-black text-slate-900">{toPersianDigits('۴ / ۱۲')}</p>
           </div>
           <div className="bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm text-center">
              <p className="text-[8px] font-black text-slate-400 uppercase">Active Staff</p>
              <p className="text-lg font-black text-slate-900">{toPersianDigits('۸ نفر')}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { l: 'درآمد امروز', v: '۴,۸۰۰,۰۰۰', i: '💰', c: 'text-emerald-600' },
          { l: 'رزروهای جدید', v: '۱۵ مورد', i: '🆕', c: 'text-blue-600' },
          { l: 'اتاق عمل رزرو شده', v: '۳ مورد', i: '🩺', c: 'text-rose-600' },
          { l: 'نظرات بی‌پاسخ', v: '۸ مورد', i: '💬', c: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-2">
             <div className="text-2xl mb-4">{stat.i}</div>
             <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.l}</p>
             <p className={`text-xl font-black ${stat.c}`}>{toPersianDigits(stat.v)}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div className="flex gap-2">
               <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black">تعریف اتاق جدید +</button>
               <button className="bg-slate-50 text-slate-600 px-6 py-2 rounded-xl text-xs font-black border border-slate-100">گزارش مالی</button>
            </div>
            <h3 className="text-xl font-black text-slate-900">وضعیت لحظه‌ای اتاق‌ها و یونیت‌ها</h3>
         </div>
         <div className="p-8 overflow-x-auto">
            <table className="w-full text-right">
               <thead className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                     <th className="pb-4">نام اتاق/یونیت</th>
                     <th className="pb-4">وضعیت</th>
                     <th className="pb-4">کاربر فعلی</th>
                     <th className="pb-4">زمان باقی‌مانده</th>
                     <th className="pb-4">عملیات</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                    { n: 'اتاق جراحی شماره ۱', s: 'Occupied', u: 'دکتر علوی', t: '۴۵ دقیقه' },
                    { n: 'یونیت پوست A', s: 'Available', u: '-', t: '-' },
                    { n: 'اتاق VIP', s: 'Cleaning', u: '-', t: '۱۵ دقیقه' },
                  ].map((row, i) => (
                    <tr key={i} className="text-sm font-bold text-slate-700">
                       <td className="py-6">{row.n}</td>
                       <td>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                            row.s === 'Available' ? 'bg-green-100 text-green-700' : 
                            row.s === 'Occupied' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>{row.s}</span>
                       </td>
                       <td className="text-slate-400">{row.u}</td>
                       <td className="font-black text-slate-900">{toPersianDigits(row.t)}</td>
                       <td>
                          <button className="text-pink-600 hover:underline">جزئیات</button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ClinicPanel;
