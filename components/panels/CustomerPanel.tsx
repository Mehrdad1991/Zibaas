
import React, { useState } from 'react';
import { Booking, Product } from '../../types';
import { MOCK_PRODUCTS, MOCK_TECHNICIANS, MOCK_CLINICS } from '../../constants';

// Mock data for user context
const MOCK_USER_BOOKINGS: Booking[] = [
  { 
    id: 'b1', 
    serviceName: 'بوتاکس پیشانی (دیسپورت)', 
    providerName: 'کلینیک تخصصی زیبا', 
    date: '۱۴۰۲/۰۹/۱۵', 
    time: '۱۶:۳۰', 
    price: 1850000, 
    status: 'CONFIRMED' 
  },
  { 
    id: 'b2', 
    serviceName: 'فیشیال تخصصی پوست', 
    providerName: 'استاد الناز رحیمی', 
    date: '۱۴۰۲/۰۹/۲۲', 
    time: '۱۰:۰۰', 
    price: 950000, 
    status: 'PENDING' 
  },
];

const MOCK_USER_ORDERS = [
  {
    id: 'ord-102',
    date: '۱۴۰۲/۰۹/۰۵',
    status: 'DELIVERED',
    items: [
      { product: MOCK_PRODUCTS[3], quantity: 1 },
    ],
    total: 3200000
  },
  {
    id: 'ord-101',
    date: '۱۴۰۲/۰۸/۱۲',
    status: 'DELIVERED',
    items: [
      { product: MOCK_PRODUCTS[1], quantity: 2 },
    ],
    total: 3700000
  }
];

const CustomerPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'orders'>('overview');

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome & Loyalty Header */}
      <div className="bg-slate-900 rounded-[40px] md:rounded-[60px] p-8 md:p-14 text-white relative overflow-hidden shadow-4xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-right space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">سلام، وقت بخیر! 👋</h2>
            <p className="text-slate-400 font-medium text-lg italic opacity-80">خوشحالیم که دوباره شما را در زیباست می‌بینیم.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[35px] flex items-center gap-6">
             <div className="text-right">
                <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-1">Loyalty Points</p>
                <p className="text-3xl font-black">{toPersianDigits(1250)} <span className="text-xs font-bold text-slate-500">امتیاز</span></p>
             </div>
             <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-pink-900/50">💎</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-white p-2 rounded-[30px] shadow-sm border border-slate-100">
         {[
           { id: 'overview', label: 'پیش‌خوان', icon: '📊' },
           { id: 'bookings', label: 'نوبت‌های من', icon: '📅' },
           { id: 'orders', label: 'خریدها', icon: '📦' },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex-1 py-4 rounded-[22px] font-black text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
               activeTab === tab.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             <span className="text-lg">{tab.icon}</span>
             {tab.label}
           </button>
         ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'نوبت‌های فعال', val: MOCK_USER_BOOKINGS.length, icon: '📅', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'سفارشات کالا', val: MOCK_USER_ORDERS.length, icon: '📦', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'تخفیف‌های من', val: 3, icon: '🎟️', color: 'text-pink-600', bg: 'bg-pink-50' },
              { label: 'اعتبار کیف‌پول', val: '۸۵۰k', icon: '💳', color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex flex-col items-center md:items-end justify-center gap-2">
                <span className={`text-2xl p-3 ${stat.bg} rounded-2xl mb-2`}>{stat.icon}</span>
                <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{toPersianDigits(stat.val)}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             {/* My Favorite Technicians */}
             <div className="bg-white p-10 rounded-[50px] border border-slate-50 shadow-sm space-y-8">
                <div className="flex flex-row-reverse justify-between items-center">
                   <h3 className="text-xl font-black text-slate-900 border-r-4 border-pink-600 pr-4">پزشکان من</h3>
                   <button className="text-xs font-black text-pink-600 hover:underline">مشاهده همه</button>
                </div>
                <div className="space-y-4">
                   {MOCK_TECHNICIANS.slice(0, 2).map(tech => (
                     <div key={tech.id} className="flex flex-row-reverse items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-pink-200 transition-all cursor-pointer">
                        <img src={tech.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                        <div className="flex-1 text-right">
                           <h5 className="font-black text-slate-900 text-sm">{tech.name}</h5>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tech.specialty}</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">❤️</div>
                     </div>
                   ))}
                </div>
             </div>

             {/* My Favorite Clinics */}
             <div className="bg-white p-10 rounded-[50px] border border-slate-50 shadow-sm space-y-8">
                <div className="flex flex-row-reverse justify-between items-center">
                   <h3 className="text-xl font-black text-slate-900 border-r-4 border-pink-600 pr-4">کلینیک‌های من</h3>
                   <button className="text-xs font-black text-pink-600 hover:underline">مشاهده همه</button>
                </div>
                <div className="space-y-4">
                   {MOCK_CLINICS.slice(0, 2).map(clinic => (
                     <div key={clinic.id} className="flex flex-row-reverse items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-pink-200 transition-all cursor-pointer">
                        <img src={clinic.image} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="" />
                        <div className="flex-1 text-right">
                           <h5 className="font-black text-slate-900 text-sm">{clinic.name}</h5>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{clinic.location}</p>
                        </div>
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">📍</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="p-8 md:p-12 bg-white rounded-[50px] shadow-sm border border-slate-50 animate-in fade-in duration-500">
          <h3 className="text-2xl font-black text-slate-900 border-r-8 border-pink-600 pr-6 mb-10 text-right">تاریخچه و نوبت‌های پیش‌رو</h3>
          <div className="space-y-6">
            {MOCK_USER_BOOKINGS.map(booking => (
              <div key={booking.id} className="group bg-white rounded-[40px] p-6 md:p-8 border-2 border-slate-50 hover:border-pink-100 hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                 <div className="flex flex-row-reverse items-center gap-6 flex-1 w-full md:w-auto">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-100 rounded-[28px] md:rounded-[35px] flex items-center justify-center text-3xl md:text-4xl shadow-inner group-hover:bg-pink-50 transition-colors">💉</div>
                    <div className="text-right space-y-1">
                       <h4 className="text-lg md:text-2xl font-black text-slate-900">{booking.serviceName}</h4>
                       <p className="text-slate-400 font-bold text-xs md:text-sm">{booking.providerName}</p>
                       <div className="flex flex-wrap justify-end gap-2 mt-2">
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{booking.date}</span>
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">ساعت {toPersianDigits(booking.time)}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4">
                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.status === 'CONFIRMED' ? 'تایید شده' : 'در انتظار تایید'}
                    </span>
                    <button className="text-pink-600 font-black text-xs hover:underline">مشاهده جزئیات و لوکیشن</button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="p-8 md:p-12 bg-white rounded-[50px] shadow-sm border border-slate-50 animate-in fade-in duration-500">
           <h3 className="text-2xl font-black text-slate-900 border-r-8 border-pink-600 pr-6 mb-10 text-right">سفارشات محصولات</h3>
           <div className="space-y-6">
              {MOCK_USER_ORDERS.map(order => (
                <div key={order.id} className="bg-slate-50 rounded-[40px] p-6 md:p-8 border border-slate-100 space-y-6">
                   <div className="flex flex-row-reverse justify-between items-center border-b border-slate-200/50 pb-6">
                      <div className="text-right">
                         <h5 className="font-black text-slate-900 text-lg">سفارش #{toPersianDigits(order.id.split('-')[1])}</h5>
                         <p className="text-xs text-slate-400 font-bold">{order.date}</p>
                      </div>
                      <span className="bg-white text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black border border-emerald-100">تحویل داده شده</span>
                   </div>
                   
                   <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex flex-row-reverse items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100">
                           <img src={item.product.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="" />
                           <div className="flex-1 text-right">
                              <p className="font-black text-slate-900 text-sm">{item.product.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{toPersianDigits(item.quantity)} عدد × {toPersianDigits(item.product.price.toLocaleString())} تومان</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-row-reverse justify-between items-center pt-2">
                      <div className="text-right">
                         <span className="text-[10px] text-slate-400 font-black uppercase block mb-1">Total Paid</span>
                         <span className="text-xl font-black text-slate-900">{toPersianDigits(order.total.toLocaleString())} تومان</span>
                      </div>
                      <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-pink-600 transition-all">خرید مجدد</button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPanel;
