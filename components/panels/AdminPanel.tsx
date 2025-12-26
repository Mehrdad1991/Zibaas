
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: 'هفته ۱', revenue: 45000000 },
  { name: 'هفته ۲', revenue: 52000000 },
  { name: 'هفته ۳', revenue: 68000000 },
  { name: 'هفته ۴', revenue: 95000000 },
];

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { l: 'کل کاربران', v: '۴,۲۵۰', c: '+۱۵۰ امروز', color: 'text-blue-600' },
          { l: 'تراکنش‌های ماه', v: '۸۹۰ میلیون', c: '+۱۲٪ رشد', color: 'text-green-600' },
          { l: 'متخصصین فعال', v: '۱۲۴ نفر', c: '۵ مورد جدید', color: 'text-pink-600' },
          { l: 'درخواست تایید هویت', v: '۸ مورد', c: 'نیاز به بررسی', color: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
             <p className="text-gray-400 text-sm mb-1">{stat.l}</p>
             <h4 className="text-2xl font-black text-gray-900 mb-2">{stat.v}</h4>
             <p className={`text-xs font-bold ${stat.color}`}>{stat.c}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900">مدیریت عملیاتی اکوسیستم</h3>
            <div className="flex gap-4">
               <button className="bg-gray-50 px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all">گزارش مالی جامع</button>
            </div>
         </div>
         <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-400 text-xs">
               <tr>
                  <th className="p-6">نام کاربر / کلینیک</th>
                  <th className="p-6">نوع حساب</th>
                  <th className="p-6">وضعیت</th>
                  <th className="p-6">مجموع تراکنش</th>
                  <th className="p-6">عملیات کنترلی</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {[
                 { n: 'کلینیک زیبا', r: 'کلینیک', s: 'فعال', t: '۱۲۰ میلیون' },
                 { n: 'حمید صادقی', r: 'تکنسین', s: 'در انتظار تایید', t: '۰' },
                 { n: 'الناز رحیمی', r: 'تکنسین', s: 'فعال', t: '۱۸.۵ میلیون' },
               ].map((user, i) => (
                 <tr key={i} className="hover:bg-gray-50 transition-all text-sm">
                    <td className="p-6 font-bold text-gray-900">{user.n}</td>
                    <td className="p-6 text-gray-500">{user.r}</td>
                    <td className="p-6">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                         user.s === 'فعال' ? 'bg-green-100 text-green-700' : 
                         user.s === 'در انتظار تایید' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                       }`}>{user.s}</span>
                    </td>
                    <td className="p-6 font-black text-gray-900">{user.t} تومان</td>
                    <td className="p-6 flex gap-3">
                       {user.s === 'در انتظار تایید' ? (
                         <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md">تایید هویت</button>
                       ) : (
                         <button className="bg-amber-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold">مشاهده گزارش</button>
                       )}
                       <button className="bg-red-50 text-red-600 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all">تعلیق حساب</button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
           <h3 className="text-xl font-black text-gray-900 mb-6">تحلیل درآمد کل</h3>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#db2777" fill="#fdf2f8" strokeWidth={4} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-gray-900 p-10 rounded-[40px] text-white flex flex-col justify-center">
           <h3 className="text-2xl font-black mb-4">هوش مصنوعی Zibaas</h3>
           <p className="text-gray-400 text-sm leading-relaxed mb-8">در ۲۴ ساعت گذشته، Gemini موفق شده ۳۲ نوبت رزرو را بر اساس علایق کاربران بهینه کند و نرخ تبدیل سایت را ۵٪ ارتقا دهد.</p>
           <button className="bg-pink-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-pink-900/50">مشاهده تحلیل‌های پیشرفته هوشمند</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
