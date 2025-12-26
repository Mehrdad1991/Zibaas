
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'فروردین', revenue: 45000000, bookings: 12 },
  { name: 'اردیبهشت', revenue: 52000000, bookings: 18 },
  { name: 'خرداد', revenue: 38000000, bookings: 10 },
  { name: 'تیر', revenue: 65000000, bookings: 25 },
  { name: 'مرداد', revenue: 78000000, bookings: 32 },
  { name: 'شهریور', revenue: 90000000, bookings: 40 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">پنل مدیریت هوشمند</h1>
            <p className="text-gray-500">گزارش عملکرد و تحلیل داده‌های مالی Zibaas</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">خروجی اکسل</button>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-pink-700 transition-colors">تعریف تخفیف هوشمند</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'درآمد کل', value: '۳۶۸,۰۰۰,۰۰۰ تومان', change: '+۱۲٪', color: 'text-green-600' },
            { label: 'رزروهای موفق', value: '۱۳۷ مورد', change: '+۸٪', color: 'text-green-600' },
            { label: 'نرخ تبدیل', value: '۲۴٪', change: '-۲٪', color: 'text-red-600' },
            { label: 'رضایت مشتری', value: '۴.۹ / ۵', change: '+۰.۲', color: 'text-green-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className={`text-sm mt-2 font-medium ${stat.color}`}>{stat.change} نسبت به ماه قبل</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800">تحلیل درآمد ماهانه</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#db2777" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#db2777" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800">تعداد رزروها</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                  <Tooltip 
                    cursor={{fill: '#fdf2f8'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="bookings" fill="#fb7185" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">آخرین تراکنش‌ها</h3>
          </div>
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-medium">مشتری</th>
                <th className="p-4 font-medium">سرویس</th>
                <th className="p-4 font-medium">مبلغ</th>
                <th className="p-4 font-medium">وضعیت</th>
                <th className="p-4 font-medium">تاریخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'سارا احمدی', service: 'فیلر لب', amount: '۲,۵۰۰,۰۰۰', status: 'پرداخت شده', date: '۱۴۰۲/۰۷/۱۲' },
                { name: 'محمد کریمی', service: 'کاشت مو', amount: '۱۵,۰۰۰,۰۰۰', status: 'در انتظار', date: '۱۴۰۲/۰۷/۱۱' },
                { name: 'نیلوفر راد', service: 'بوتاکس', amount: '۱,۲۰۰,۰۰۰', status: 'پرداخت شده', date: '۱۴۰۲/۰۷/۱۰' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{row.name}</td>
                  <td className="p-4">{row.service}</td>
                  <td className="p-4">{row.amount} تومان</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      row.status === 'پرداخت شده' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
