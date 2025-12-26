
import React, { useState } from 'react';
import { Booking, InventoryItem } from '../../types';

const MY_CLIENTS_BOOKINGS: Booking[] = [
  { id: 'ZB-T-101', serviceName: 'فیشیال تخصصی', providerName: 'الناز رحیمی', customerName: 'مریم سعادتی', customerPhone: '۰۹۱۲۳۴۵۶۷۸۹', date: '۱۴۰۲/۰۹/۲۵', time: '۰۹:۰۰', price: 1200000, status: 'CONFIRMED', paymentStatus: 'PAID', requiredTools: ['کارتریج هیدرودرمی', 'سرم آبرسان'] },
  { id: 'ZB-T-102', serviceName: 'آنالیز پوست', providerName: 'الناز رحیمی', customerName: 'سارا رضایی', customerPhone: '۰۹۱۹۸۷۶۵۴۳۲', date: '۱۴۰۲/۰۹/۲۵', time: '۱۱:۳۰', price: 450000, status: 'PENDING', paymentStatus: 'UNPAID', requiredTools: ['دستگاه اسکنر پوست'] },
  { id: 'ZB-T-103', serviceName: 'جوانسازی پوست', providerName: 'الناز رحیمی', customerName: 'نیلوفر راد', customerPhone: '۰۹۳۵۱۱۱۰۰۲۲', date: '۱۴۰۲/۰۹/۲۶', time: '۱۴:۰۰', price: 3500000, status: 'CONFIRMED', paymentStatus: 'PARTIAL', requiredTools: ['کوکتل مزوتراپی', 'آنژیوکت آبی'] },
  { id: 'ZB-T-104', serviceName: 'پاکسازی کلاسیک', providerName: 'الناز رحیمی', customerName: 'احمد کریمی', customerPhone: '۰۹۱۲۰۰۰۹۹۸۸', date: '۱۴۰۲/۰۹/۲۷', time: '۱۰:۰۰', price: 850000, status: 'COMPLETED', paymentStatus: 'PAID', requiredTools: ['پد پاک‌کننده'] },
];

const MY_PRO_INVENTORY: InventoryItem[] = [
  { id: 'pi1', name: 'کوکتل جوانساز توسکانی', category: 'مواد مصرفی', currentStock: 3, minRequired: 10, unit: 'ویال', lastOrdered: '۱۴۰۲/۰۹/۰۱' },
  { id: 'pi2', name: 'سرم هیالورونیک اسید', category: 'مواد مصرفی', currentStock: 12, minRequired: 5, unit: 'عدد', lastOrdered: '۱۴۰۲/۰۹/۱۰' },
  { id: 'pi3', name: 'کلاه و کاور یکبار مصرف', category: 'بهداشتی', currentStock: 80, minRequired: 100, unit: 'عدد', lastOrdered: '۱۴۰۲/۰۸/۲۰' },
];

const TechnicianPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'clients' | 'tools' | 'revenue'>('bookings');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'COMPLETED': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'PAID': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'UNPAID': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const sendNotification = (type: 'SMS' | 'REMINDER', phone: string) => {
    setNotificationStatus(`در حال ارسال ${type === 'SMS' ? 'پیامک' : 'یادآور نوبت'} به ${toPersianDigits(phone)}...`);
    setTimeout(() => setNotificationStatus(null), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 text-right font-vazir pb-24">
      {/* Top Professional Card */}
      <div className="bg-slate-950 rounded-[50px] p-8 md:p-14 text-white relative overflow-hidden shadow-4xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative z-10 flex flex-col md:flex-row-reverse justify-between items-center gap-10">
          <div className="flex flex-row-reverse items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Tech" />
              <div className="absolute inset-0 bg-pink-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-black text-xs">ویرایش عکس</div>
            </div>
            <div className="text-right space-y-2">
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">استاد الناز رحیمی</h2>
              <div className="flex flex-row-reverse items-center gap-3">
                 <span className="bg-pink-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Master Technician</span>
                 <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                 <span className="text-xs text-slate-400 font-bold">وضعیت: آنلاین در کلینیک زیبا</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[35px] text-center">
                <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-1">Weekly Revenue</p>
                <p className="text-2xl font-black tracking-tighter">{toPersianDigits('۱۴,۸۰۰,۰۰۰')}</p>
                <span className="text-[8px] text-slate-500 font-bold">تسویه شده در Zibaas</span>
             </div>
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[35px] text-center">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Active Room</p>
                <p className="text-sm font-black">اتاق VIP ۱</p>
                <span className="text-[8px] text-slate-500 font-bold">جردن، کلینیک زیبا</span>
             </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex bg-white p-2 rounded-[35px] shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
         {[
           { id: 'bookings', label: 'مدیریت رزرواسیون من', icon: '📅' },
           { id: 'tools', label: 'ابزارها و انبار مصرفی', icon: '🧪' },
           { id: 'clients', label: 'بانک مشتریان اختصاصی', icon: '👥' },
           { id: 'revenue', label: 'گزارش درآمد و تسویه', icon: '💳' },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveSubTab(tab.id as any)}
             className={`flex-1 min-w-[150px] py-4 rounded-[28px] font-black text-xs transition-all flex items-center justify-center gap-3 ${
               activeSubTab === tab.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'text-slate-400 hover:bg-slate-50'
             }`}
           >
             <span>{tab.icon}</span>
             <span>{tab.label}</span>
           </button>
         ))}
      </div>

      {/* Content Dispatcher */}
      <div className="min-h-[600px]">
         {activeSubTab === 'bookings' && (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4">
              {/* Timeline / List */}
              <div className="lg:col-span-8 space-y-6">
                 <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex flex-row-reverse justify-between items-center bg-slate-50/30">
                       <h3 className="text-xl font-black text-slate-900 border-r-4 border-pink-600 pr-4">نوبت‌های تایید شده</h3>
                       <div className="flex bg-white rounded-2xl p-1 border border-slate-200">
                          <button className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black">امروز</button>
                          <button className="px-5 py-2 text-slate-400 text-[10px] font-black hover:bg-slate-50">فردا</button>
                       </div>
                    </div>
                    
                    <div className="divide-y divide-slate-50">
                       {MY_CLIENTS_BOOKINGS.map(booking => (
                         <div 
                           key={booking.id} 
                           onClick={() => setSelectedBooking(booking)}
                           className={`p-8 flex flex-col md:flex-row-reverse items-center justify-between gap-6 hover:bg-slate-50 transition-all cursor-pointer group ${selectedBooking?.id === booking.id ? 'bg-pink-50/50' : ''}`}
                         >
                            <div className="flex flex-row-reverse items-center gap-6 w-full md:w-auto">
                               <div className="w-16 h-16 bg-white rounded-[25px] flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                                  {booking.serviceName.includes('فیشیال') ? '🧴' : '✨'}
                               </div>
                               <div className="text-right">
                                  <h4 className="text-lg font-black text-slate-900 leading-none mb-2">{booking.customerName}</h4>
                                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{booking.serviceName}</p>
                                  <div className="flex flex-row-reverse gap-3 mt-3">
                                     <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-lg">ساعت {toPersianDigits(booking.time)}</span>
                                     <span className={`text-[9px] font-black px-3 py-1 rounded-lg border ${getStatusStyle(booking.status)}`}>{booking.status}</span>
                                  </div>
                               </div>
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={(e) => { e.stopPropagation(); sendNotification('REMINDER', booking.customerPhone!); }} className="p-3 bg-white rounded-xl shadow-sm hover:text-pink-600 border border-slate-100" title="ارسال یادآور نوبت">🔔</button>
                               <button onClick={(e) => { e.stopPropagation(); sendNotification('SMS', booking.customerPhone!); }} className="p-3 bg-white rounded-xl shadow-sm hover:text-blue-600 border border-slate-100" title="ارسال پیام مستقیم">💬</button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Sidebar Info - Lock-in features */}
              <div className="lg:col-span-4 space-y-6">
                 {/* Booking Detail Card */}
                 {selectedBooking ? (
                   <div className="bg-white p-8 rounded-[50px] border-2 border-pink-100 shadow-3xl space-y-8 animate-in zoom-in-95">
                      <div className="text-right border-b border-slate-50 pb-6">
                         <span className="text-[9px] font-black text-pink-600 uppercase tracking-[0.2em]">Booking Record: {selectedBooking.id}</span>
                         <h3 className="text-2xl font-black text-slate-900 mt-1">{selectedBooking.customerName}</h3>
                         <p className="text-sm font-bold text-slate-400 mt-1" dir="ltr">{toPersianDigits(selectedBooking.customerPhone!)}</p>
                      </div>

                      <div className="space-y-4">
                         <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest text-right">ابزارها و مصرفی‌های مورد نیاز:</h4>
                         <div className="flex flex-wrap justify-end gap-2">
                            {selectedBooking.requiredTools?.map((tool, i) => (
                              <span key={i} className="bg-slate-50 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black border border-slate-100">
                                 {tool}
                              </span>
                            ))}
                         </div>
                         <button className="w-full py-4 bg-pink-50 text-pink-600 rounded-2xl text-[10px] font-black hover:bg-pink-100 transition-all">شارژ فوری مواد از فروشگاه Zibaas</button>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-[35px] space-y-4">
                         <div className="flex justify-between items-center">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black ${getStatusStyle(selectedBooking.paymentStatus!)}`}>
                               {selectedBooking.paymentStatus === 'PAID' ? 'تسویه شده' : 'در انتظار پرداخت'}
                            </span>
                            <span className="text-xs font-bold text-slate-400">وضعیت مالی:</span>
                         </div>
                         <div className="flex justify-between items-end pt-2 border-t border-slate-200">
                            <div className="text-left">
                               <p className="text-2xl font-black text-slate-900">{toPersianDigits(selectedBooking.price.toLocaleString())}</p>
                               <span className="text-[10px] font-bold text-slate-400">تومان</span>
                            </div>
                            <span className="text-xl font-black text-slate-900 tracking-tighter">مبلغ خدمات:</span>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <button className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-sm hover:bg-pink-600 transition-all shadow-xl shadow-slate-100">تغییر وضعیت به "انجام شد"</button>
                         <button className="w-full py-4 bg-white border border-slate-100 text-slate-400 rounded-3xl font-black text-xs hover:bg-rose-50 hover:text-rose-500 transition-all">لغو این نوبت</button>
                      </div>
                   </div>
                 ) : (
                   <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[50px] p-12 text-center flex flex-col items-center justify-center gap-6 opacity-60">
                      <div className="text-5xl">👆</div>
                      <p className="text-sm font-black text-slate-400 leading-relaxed">برای مشاهده جزئیات ابزارها، مدیریت مالی و ارسال یادآور، یک نوبت را از لیست انتخاب کنید.</p>
                   </div>
                 )}

                 {/* Platform Insight */}
                 <div className="bg-indigo-900 p-8 rounded-[45px] text-white space-y-4 relative overflow-hidden shadow-2xl">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5">💡</div>
                    <h5 className="font-black text-lg">پیشنهاد هوشمند رشد</h5>
                    <p className="text-[11px] text-indigo-200 leading-relaxed font-medium">
                       بر اساس آمار ۳ ماه گذشته شما، با افزودن پکیج «آنالیز تخصصی پوست» به خدمات‌تان، می‌توانید درآمد خالص خود را ۲۰٪ افزایش دهید.
                    </p>
                    <button className="text-pink-500 text-[10px] font-black underline">فعال‌سازی هوشمند پکیج</button>
                 </div>
              </div>
           </div>
         )}

         {activeSubTab === 'tools' && (
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-left-4">
              {/* Inventory Tracking */}
              <div className="lg:col-span-8 bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 bg-slate-900 text-white flex flex-row-reverse justify-between items-center">
                    <h3 className="text-xl font-black">مدیریت موجودی انبار شخصی</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Personal Medical Stock</p>
                 </div>
                 
                 <div className="divide-y divide-slate-50">
                    {MY_PRO_INVENTORY.map(item => (
                      <div key={item.id} className="p-8 flex flex-row-reverse items-center justify-between hover:bg-slate-50 transition-all">
                         <div className="flex flex-row-reverse items-center gap-6 w-1/3">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${item.currentStock < item.minRequired ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                               {item.category === 'مواد مصرفی' ? '🧪' : '🛡️'}
                            </div>
                            <div className="text-right">
                               <h4 className="font-black text-slate-900 text-lg leading-none mb-2">{item.name}</h4>
                               <span className="text-[9px] font-black bg-slate-100 px-3 py-1 rounded-lg uppercase text-slate-400 tracking-widest">{item.category}</span>
                            </div>
                         </div>

                         <div className="flex-1 px-10">
                            <div className="flex flex-row-reverse justify-between text-[10px] font-black mb-3">
                               <span className="text-slate-400">سطح موجودی</span>
                               <span className={item.currentStock < item.minRequired ? 'text-rose-600' : 'text-emerald-600'}>
                                  {toPersianDigits(item.currentStock)} {item.unit}
                               </span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                               <div 
                                  className={`h-full transition-all duration-1000 ${item.currentStock < item.minRequired ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                  style={{ width: `${Math.min(100, (item.currentStock / (item.minRequired * 1.5)) * 100)}%` }}
                                ></div>
                            </div>
                         </div>

                         <div className="text-left w-1/4">
                            <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-pink-600 transition-all shadow-lg active:scale-95">سفارش از Zibaas</button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Pro-Only Shop Teaser */}
              <div className="lg:col-span-4 space-y-6">
                 <div className="bg-pink-600 rounded-[50px] p-10 text-white space-y-8 shadow-4xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-white/5 pointer-events-none"></div>
                    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-white/10">🛍️</div>
                    <div className="space-y-3">
                       <h3 className="text-2xl font-black tracking-tighter leading-tight">فروشگاه اختصاصی <br/> تکنسین‌های زیباست</h3>
                       <p className="text-pink-100 text-[11px] leading-relaxed font-medium">
                          تجهیزات و مواد مصرفی برندهای معتبر را با ۳۰٪ تخفیف ویژه و امکان تسویه از درآمد رزرواسیون، خریداری کنید.
                       </p>
                    </div>
                    <button className="w-full py-6 bg-white text-pink-600 rounded-[35px] font-black text-xl hover:scale-105 transition-all shadow-2xl">ورود به بازار تخصصی</button>
                 </div>

                 <div className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm flex items-center flex-row-reverse gap-4">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl shadow-inner">📦</div>
                    <div className="text-right">
                       <h5 className="font-black text-slate-900 text-sm">ارسال فوری رایگان</h5>
                       <p className="text-[10px] text-slate-400 font-bold leading-relaxed">سفارشات تکنسین‌ها در کمتر از ۳ ساعت به کلینیک ارسال می‌شود.</p>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {activeSubTab === 'clients' && (
           <div className="space-y-10 animate-in zoom-in-95">
              <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
                    <div className="text-right">
                       <h3 className="text-2xl font-black text-slate-900 tracking-tighter">بانک مشتریان اختصاصی شما</h3>
                       <p className="text-slate-400 font-bold text-xs mt-1">مدیریت مراجعین و نرخ بازگشت مشتری (Retention Rate)</p>
                    </div>
                    <div className="flex gap-2">
                       <div className="relative">
                          <input type="text" placeholder="جستجوی مراجع..." className="bg-slate-50 border-none rounded-2xl pr-12 pl-6 py-4 font-bold text-sm focus:ring-2 focus:ring-pink-500 w-72 text-right shadow-inner" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
                       </div>
                    </div>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                       <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                          <tr>
                             <th className="p-8">نام مراجع</th>
                             <th className="p-8">تعداد مراجعات</th>
                             <th className="p-8">آخرین خدمت</th>
                             <th className="p-8">وضعیت وفاداری</th>
                             <th className="p-8">عملیات مدیریت</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {[
                            { n: 'مریم سعادتی', c: 12, s: 'فیشیال تخصصی', t: 'VIP' },
                            { n: 'احمد کریمی', c: 4, s: 'پاکسازی کلاسیک', t: 'Regular' },
                            { n: 'سارا رضایی', c: 1, s: 'آنالیز پوست', t: 'New' },
                          ].map((client, i) => (
                            <tr key={i} className="hover:bg-slate-50/80 transition-colors text-sm font-bold text-slate-700 group">
                               <td className="p-8">
                                  <div className="flex flex-row-reverse items-center gap-4">
                                     <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center font-black group-hover:shadow-sm transition-all">{client.n[0]}</div>
                                     <span className="text-slate-900 font-black">{client.n}</span>
                                  </div>
                               </td>
                               <td className="p-8">{toPersianDigits(client.c)} مرتبه</td>
                               <td className="p-8 text-xs">{client.s}</td>
                               <td className="p-8">
                                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${client.t === 'VIP' ? 'bg-indigo-50 text-indigo-600' : client.t === 'New' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                     {client.t}
                                  </span>
                               </td>
                               <td className="p-8">
                                  <button className="text-pink-600 font-black text-xs hover:underline">مشاهده پرونده و نتایج (AI Compare)</button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Retention Tool Card */}
              <div className="bg-slate-900 p-12 rounded-[60px] text-white flex flex-col md:flex-row-reverse items-center justify-between gap-10 shadow-4xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-600/10 to-transparent pointer-events-none"></div>
                 <div className="text-right space-y-4 relative z-10 flex-1">
                    <h3 className="text-3xl font-black tracking-tighter leading-tight">کمپین بازگشت مشتری خودکار</h3>
                    <p className="text-slate-400 font-medium leading-relaxed max-w-xl ml-auto">
                       با فعال‌سازی این ابزار، برای مشتریانی که بیش از ۳۰ روز از آخرین مراجعه‌شان گذشته است، پیامک هوشمند حاوی «کد تخفیف شارژ پوست» ارسال می‌شود تا آن‌ها را به رزرو مجدد ترغیب کند.
                    </p>
                 </div>
                 <button className="bg-pink-600 text-white px-12 py-6 rounded-[35px] font-black text-xl shadow-2xl shadow-pink-900/50 hover:bg-white hover:text-slate-950 transition-all active:scale-95 shrink-0 relative z-10">فعال‌سازی در زیباست</button>
              </div>
           </div>
         )}
      </div>

      {/* Persistent Notification Toast Simulator */}
      {notificationStatus && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10">
           <div className="bg-slate-900 text-white px-8 py-5 rounded-[30px] shadow-4xl border border-white/10 flex items-center gap-4">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
              <span className="font-bold text-sm">{notificationStatus}</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default TechnicianPanel;
