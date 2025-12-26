
import React from 'react';
import { Booking } from '../../types';

const MOCK_USER_BOOKINGS: Booking[] = [
  { id: 'b1', serviceName: 'بوتاکس پیشانی', providerName: 'کلینیک زیبا', date: '۱۴۰۲/۰۸/۲۰', time: '۱۰:۳۰', price: 1200000, status: 'CONFIRMED' },
  { id: 'b2', serviceName: 'فیشیال تخصصی', providerName: 'الناز رحیمی', date: '۱۴۰۲/۰۷/۱۵', time: '۱۶:۰۰', price: 850000, status: 'COMPLETED' },
];

const CustomerPanel: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 text-xs">موجودی کیف پول</p>
            <p className="text-xl font-black text-gray-900">۲,۴۵۰,۰۰۰ تومان</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 text-xs">رزروهای فعال</p>
            <p className="text-xl font-black text-gray-900">۱ مورد</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-400 text-xs">امتیاز وفاداری</p>
            <p className="text-xl font-black text-gray-900">۴۵۰ امتیاز</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">تاریخچه خدمات و رزروها</h3>
          <button className="text-pink-600 text-sm font-bold">مشاهده همه</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-medium">سرویس</th>
                <th className="p-4 font-medium">ارائه‌دهنده</th>
                <th className="p-4 font-medium">تاریخ و ساعت</th>
                <th className="p-4 font-medium">مبلغ</th>
                <th className="p-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_USER_BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{booking.serviceName}</td>
                  <td className="p-4 text-gray-600">{booking.providerName}</td>
                  <td className="p-4 text-gray-600 text-sm">{booking.date} - {booking.time}</td>
                  <td className="p-4 font-bold text-gray-900">{booking.price.toLocaleString()} تومان</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : 
                      booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status === 'CONFIRMED' ? 'تایید شده' : 'انجام شده'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-pink-600 p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">اطلاعات هویتی</h3>
          <p className="opacity-90 mb-6">برای استفاده از خدمات پزشکی، تکمیل پروفایل الزامی است.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 p-4 rounded-xl">نام: علی مرادی</div>
            <div className="bg-white/10 p-4 rounded-xl">کد ملی: تایید شده ✅</div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default CustomerPanel;
