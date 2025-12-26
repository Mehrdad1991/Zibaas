
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../../constants';
import { Booking, Product, InventoryItem } from '../../types';

const CLINIC_BOOKINGS: Booking[] = [
  { id: 'cb1', serviceName: 'رینوپلاستی', providerName: 'دکتر علوی', customerName: 'سارا رضایی', customerPhone: '۰۹۱۲۱۱۱۱۱۱۱', date: '۱۴۰۲/۰۸/۲۵', time: '۰۹:۰۰', price: 45000000, status: 'CONFIRMED', paymentStatus: 'PAID', priority: 'HIGH' },
  { id: 'cb2', serviceName: 'تزریق ژل لب', providerName: 'الناز رحیمی', customerName: 'مریم سپهری', customerPhone: '۰۹۱۲۲۲۲۲۲۲۲', date: '۱۴۰۲/۰۸/۲۵', time: '۱۱:۳۰', price: 3500000, status: 'PENDING', paymentStatus: 'UNPAID', priority: 'NORMAL' },
  { id: 'cb3', serviceName: 'کاشت مو', providerName: 'دکتر صادقی', customerName: 'احمد میرزایی', customerPhone: '۰۹۱۲۳۳۳۳۳۳۳', date: '۱۴۰۲/۰۸/۲۶', time: '۰۸:۰۰', price: 18000000, status: 'CONFIRMED', paymentStatus: 'PARTIAL', priority: 'HIGH' },
  { id: 'cb4', serviceName: 'بوتاکس', providerName: 'الناز رحیمی', customerName: 'نیلوفر راد', customerPhone: '۰۹۱۲۴۴۴۴۴۴۴', date: '۱۴۰۲/۰۸/۲۶', time: '۱۵:۰۰', price: 1200000, status: 'COMPLETED', paymentStatus: 'PAID', priority: 'NORMAL' },
  { id: 'cb5', serviceName: 'بلفاروپلاستی', providerName: 'دکتر علوی', customerName: 'رضا حسینی', customerPhone: '۰۹۱۲۵۵۵۵۵۵۵', date: '۱۴۰۲/۰۸/۲۷', time: '۱۴:۰۰', price: 12000000, status: 'CONFIRMED', paymentStatus: 'UNPAID', priority: 'HIGH' },
];

const CLINIC_INVENTORY: InventoryItem[] = [
  { id: 'i1', name: 'بوتاکس مصپورت', category: 'مواد مصرفی', currentStock: 12, minRequired: 20, unit: 'ویال', lastOrdered: '۱۴۰۲/۰۸/۰۵' },
  { id: 'i2', name: 'فیلر لب نورامیس', category: 'مواد مصرفی', currentStock: 45, minRequired: 30, unit: 'سی‌سی', lastOrdered: '۱۴۰۲/۰۸/۱۰' },
  { id: 'i3', name: 'کارتریج لیزر', category: 'قطعات', currentStock: 2, minRequired: 5, unit: 'عدد', lastOrdered: '۱۴۰۲/۰۷/۱۵' },
  { id: 'i4', name: 'الکل ضدعفونی', category: 'بهداشتی', currentStock: 15, minRequired: 10, unit: 'لیتر', lastOrdered: '۱۴۰۲/۰۸/۱۲' },
];

const ClinicPanel: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'bookings' | 'inventory' | 'clients'>('overview');
  const [showNotificationModal, setShowNotificationModal] = useState<{ isOpen: boolean, type: 'SMS' | 'EMAIL', to: string } | null>(null);

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-emerald-600 bg-emerald-50';
      case 'PENDING': return 'text-amber-600 bg-amber-50';
      case 'COMPLETED': return 'text-blue-600 bg-blue-50';
      case 'PAID': return 'text-emerald-700 bg-emerald-100';
      case 'UNPAID': return 'text-rose-700 bg-rose-100';
      case 'PARTIAL': return 'text-amber-700 bg-amber-100';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 text-right font-vazir pb-20">
      {/* Clinic Identity & Platform Status */}
      <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-sm border border-slate-100 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        <div className="flex flex-row-reverse items-center gap-6">
           <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-100 rounded-[40px] overflow-hidden border-4 border-white shadow-xl group cursor-pointer relative">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Clinic Logo" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-black">ویرایش پروفایل</div>
           </div>
           <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">مدیریت کلینیک تخصصی زیبا</h2>
              <div className="flex flex-row-reverse items-center gap-4 mt-3">
                 <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg">کد شعبه: ZB-4402-JORDAN</span>
                 <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Business Verified</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex gap-4">
           <div className="bg-slate-900 text-white p-6 rounded-[40px] shadow-3xl flex flex-col items-center justify-center min-w-[160px] border border-white/5">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Weekly Growth</span>
              <p className="text-3xl font-black text-pink-500 tracking-tighter">+{toPersianDigits('۱۲٪')}</p>
              <span className="text-[9px] font-bold text-slate-400 mt-2">Zibaas Insights</span>
           </div>
           <button 
             onClick={() => setActiveView('inventory')}
             className="bg-white border-2 border-slate-50 p-6 rounded-[40px] shadow-sm flex flex-col items-center justify-center min-w-[160px] hover:border-pink-200 transition-all group"
           >
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-pink-600">Low Stock Alerts</span>
              <p className="text-3xl font-black text-rose-600">{toPersianDigits('۲')}</p>
              <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                 <div className="h-full bg-rose-500 w-full animate-pulse"></div>
              </div>
           </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex bg-slate-100 p-2 rounded-[35px] w-full md:w-max mr-auto flex-row-reverse border border-slate-200/50">
         {[
           { id: 'overview', label: 'پیش‌خوان مدیریتی', icon: '📊' },
           { id: 'bookings', label: 'مدیریت رزرواسیون', icon: '📅' },
           { id: 'inventory', label: 'انبار و تدارکات', icon: '📦' },
           { id: 'clients', label: 'باشگاه مشتریان', icon: '👥' },
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveView(tab.id as any)}
             className={`px-8 py-4 rounded-[28px] font-black text-xs md:text-sm transition-all flex items-center gap-3 ${
               activeView === tab.id ? 'bg-white text-pink-600 shadow-xl' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             <span>{tab.label}</span>
             <span>{tab.icon}</span>
           </button>
         ))}
      </div>

      {/* Content Dispatcher */}
      <div className="min-h-[500px]">
        {activeView === 'overview' && <ClinicOverview toPersian={toPersianDigits} getStatusColor={getStatusColor} bookings={CLINIC_BOOKINGS} inventory={CLINIC_INVENTORY} />}
        {activeView === 'bookings' && <ClinicBookingsManagement toPersian={toPersianDigits} getStatusColor={getStatusColor} bookings={CLINIC_BOOKINGS} onNotify={(type, to) => setShowNotificationModal({ isOpen: true, type, to })} />}
        {activeView === 'inventory' && <ClinicInventoryManagement toPersian={toPersianDigits} inventory={CLINIC_INVENTORY} />}
        {activeView === 'clients' && <ClinicClientManagement toPersian={toPersianDigits} bookings={CLINIC_BOOKINGS} />}
      </div>

      {/* Notification Simulator Modal */}
      {showNotificationModal?.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[50px] shadow-4xl overflow-hidden p-10 space-y-8 animate-in zoom-in-95">
              <div className="text-center space-y-4">
                 <div className="w-20 h-20 bg-pink-100 rounded-[30px] flex items-center justify-center text-4xl mx-auto shadow-inner">
                    {showNotificationModal.type === 'SMS' ? '📱' : '✉️'}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter">ارسال {showNotificationModal.type === 'SMS' ? 'پیامک' : 'ایمیل'} به مراجع</h3>
                 <p className="text-slate-400 font-bold text-sm">گیرنده: <span className="text-slate-900" dir="ltr">{toPersianDigits(showNotificationModal.to)}</span></p>
              </div>
              
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pr-2">متن پیام ارسالی</label>
                 <textarea 
                    className="w-full bg-slate-50 border-none rounded-[30px] p-6 font-bold text-sm text-slate-600 focus:ring-2 focus:ring-pink-500 shadow-inner h-40 leading-relaxed"
                    defaultValue={`سلام ${CLINIC_BOOKINGS.find(b => b.customerPhone === showNotificationModal.to)?.customerName} عزیز، نوبت شما در کلینیک زیبا برای تاریخ ${CLINIC_BOOKINGS[0].date} ساعت ${CLINIC_BOOKINGS[0].time} تایید شد. منتظر حضور شما هستیم.`}
                 />
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setShowNotificationModal(null)} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-3xl font-black">انصراف</button>
                 <button onClick={() => setShowNotificationModal(null)} className="flex-[2] py-5 bg-pink-600 text-white rounded-3xl font-black shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all">ارسال فوری از طریق پنل Zibaas</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Components for Organizational Clarity ---

const ClinicOverview = ({ toPersian, getStatusColor, bookings, inventory }: any) => {
  const upcoming = bookings.filter((b: any) => b.status === 'CONFIRMED').slice(0, 3);
  const lowStock = inventory.filter((i: any) => i.currentStock < i.minRequired);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-6">
      {/* Priority Appointments */}
      <div className="lg:col-span-8 space-y-6">
         <div className="flex flex-row-reverse justify-between items-center px-2">
            <h3 className="text-xl font-black text-slate-900 border-r-4 border-pink-600 pr-4">نوبت‌های اولویت‌دار امروز</h3>
            <span className="text-[10px] font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-lg">۳ نوبت HIGH PRIORITY</span>
         </div>
         <div className="grid grid-cols-1 gap-4">
            {upcoming.map((booking: any) => (
              <div key={booking.id} className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row-reverse items-center justify-between gap-6 hover:shadow-xl transition-all group">
                 <div className="flex flex-row-reverse items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-[28px] flex items-center justify-center text-3xl shadow-inner border border-slate-100">
                       {booking.serviceName.includes('رینو') ? '👃' : '💉'}
                    </div>
                    <div className="text-right">
                       <h4 className="font-black text-slate-900 text-lg leading-none mb-2">{booking.customerName}</h4>
                       <p className="text-slate-400 font-bold text-xs">{booking.serviceName} • {booking.providerName}</p>
                       <div className="flex flex-row-reverse gap-2 mt-3">
                          <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md">ساعت {toPersian(booking.time)}</span>
                          {booking.priority === 'HIGH' && <span className="text-[9px] font-black bg-rose-100 text-rose-600 px-2 py-1 rounded-md animate-pulse">اولویت بالا</span>}
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black hover:bg-pink-600 transition-all shadow-lg shadow-slate-100">پذیرش مراجع</button>
                    <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:text-pink-600 transition-colors border border-slate-100">📞</button>
                 </div>
              </div>
            ))}
         </div>

         {/* Occupancy Stats Section */}
         <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm space-y-10">
            <h3 className="font-black text-slate-900 text-center">مانیتورینگ ظرفیت مرکز</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { l: 'اتاق جراحی', v: 85, c: 'bg-emerald-500' },
                 { l: 'واحد تزریقات', v: 60, c: 'bg-blue-500' },
                 { l: 'مشاوره حضوری', v: 30, c: 'bg-pink-500' },
                 { l: 'تکنسین‌های فعال', v: 95, c: 'bg-indigo-500' },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full border-[6px] border-slate-50 flex items-center justify-center relative">
                       <span className="font-black text-slate-900 text-lg">{toPersian(stat.v)}٪</span>
                       <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-pink-600 rotate-45"></div>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.l}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Sidebar: Inventory & Alerts */}
      <div className="lg:col-span-4 space-y-6">
         <div className="bg-slate-900 p-8 rounded-[50px] text-white space-y-8 shadow-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-black relative z-10 flex items-center flex-row-reverse gap-3">
               <span className="text-2xl">⚠️</span>
               هشدارهای انبار
            </h3>
            <div className="space-y-4 relative z-10">
               {lowStock.map((item: any) => (
                 <div key={item.id} className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-row-reverse items-center justify-between">
                    <div className="text-right">
                       <p className="text-xs font-black">{item.name}</p>
                       <p className="text-[10px] text-rose-400 font-bold mt-1">باقی‌مانده: {toPersian(item.currentStock)} {item.unit}</p>
                    </div>
                    <button className="bg-pink-600 text-white p-2.5 rounded-xl shadow-lg hover:scale-105 transition-transform">🛒</button>
                 </div>
               ))}
            </div>
            <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black hover:bg-white/20 transition-all">شارژ خودکار انبار زیباست</button>
         </div>

         <div className="bg-pink-50 p-8 rounded-[45px] border border-pink-100 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-xl shadow-pink-200 animate-bounce">💡</div>
            <h4 className="font-black text-slate-900">پیشنهاد بیزنس هوشمند</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold px-4">
              بر اساس داده‌های منطقه‌ای Zibaas، تقاضا برای «لیفت ابرو» در جردن ۲۰٪ افزایش یافته است. تکنسین‌های متخصص را جذب کنید.
            </p>
            <button className="text-pink-600 text-[10px] font-black underline">مشاهده تکنسین‌های آماده همکاری</button>
         </div>
      </div>
    </div>
  );
};

const ClinicBookingsManagement = ({ toPersian, getStatusColor, bookings, onNotify }: any) => {
  return (
    <div className="bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-right-8">
       <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row-reverse justify-between items-center gap-6">
          <div className="text-right space-y-1">
             <h3 className="text-2xl font-black text-slate-900 tracking-tighter">دفتر رزرواسیون یکپارچه</h3>
             <p className="text-slate-400 font-bold text-xs">مدیریت تمامی نوبت‌های دریافتی از پلتفرم زیباست و رزروهای مستقیم کلینیک</p>
          </div>
          <div className="flex gap-2">
             <div className="relative">
                <input type="text" placeholder="جستجوی مراجع یا جراح..." className="bg-slate-50 border-none rounded-2xl pr-10 pl-6 py-3 text-xs font-bold focus:ring-2 focus:ring-pink-500 w-64 text-right" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
             </div>
             <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-pink-600 transition-all">+ ثبت رزرو جدید</button>
          </div>
       </div>

       <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
             <thead className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <tr>
                   <th className="p-8">اطلاعات مراجع</th>
                   <th className="p-8">خدمت و متخصص</th>
                   <th className="p-8">زمان حضور</th>
                   <th className="p-8">مبلغ (تومان)</th>
                   <th className="p-8">وضعیت پرداخت</th>
                   <th className="p-8">وضعیت رزرو</th>
                   <th className="p-8">عملیات</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
                {bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors text-sm font-bold text-slate-700 group">
                     <td className="p-8">
                        <div className="flex flex-row-reverse items-center gap-3">
                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all">{booking.customerName[0]}</div>
                           <div className="text-right">
                              <p className="text-slate-900 font-black">{booking.customerName}</p>
                              <p className="text-[10px] text-slate-400" dir="ltr">{toPersian(booking.customerPhone)}</p>
                           </div>
                        </div>
                     </td>
                     <td className="p-8">
                        <p className="text-slate-900 font-black">{booking.serviceName}</p>
                        <p className="text-[10px] text-pink-600">{booking.providerName}</p>
                     </td>
                     <td className="p-8 text-xs">
                        <p className="font-black">{toPersian(booking.date)}</p>
                        <p className="text-slate-400">ساعت {toPersian(booking.time)}</p>
                     </td>
                     <td className="p-8 font-black text-slate-900">{toPersian(booking.price.toLocaleString())}</td>
                     <td className="p-8">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${getStatusColor(booking.paymentStatus)}`}>
                           {booking.paymentStatus === 'PAID' ? 'تسویه شده' : booking.paymentStatus === 'UNPAID' ? 'پرداخت نشده' : 'علی‌الحساب'}
                        </span>
                     </td>
                     <td className="p-8">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${getStatusColor(booking.status)}`}>
                           {booking.status === 'CONFIRMED' ? 'تایید شده' : booking.status === 'PENDING' ? 'در انتظار' : 'انجام شده'}
                        </span>
                     </td>
                     <td className="p-8">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => onNotify('SMS', booking.customerPhone)} className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm hover:text-pink-600" title="ارسال یادآور SMS">📱</button>
                           <button className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm hover:text-emerald-600" title="تغییر وضعیت">✅</button>
                           <button className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm hover:text-rose-600" title="لغو رزرو">❌</button>
                        </div>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
       
       <div className="p-8 bg-slate-50 flex flex-row-reverse justify-between items-center">
          <div className="flex gap-2">
             <button className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold hover:bg-pink-600 hover:text-white transition-all">۱</button>
             <button className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold hover:bg-pink-600 hover:text-white transition-all">۲</button>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Showing {toPersian(bookings.length)} Records Total</p>
       </div>
    </div>
  );
};

const ClinicInventoryManagement = ({ toPersian, inventory }: any) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-left-8">
       {/* Main Inventory List */}
       <div className="lg:col-span-8 bg-white rounded-[50px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-row-reverse justify-between items-center bg-slate-900 text-white">
             <div className="text-right">
                <h3 className="text-xl font-black tracking-tight">موجودی انبار کلینیک (Medical Stock)</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Real-time Consumables Tracking</p>
             </div>
             <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black border border-white/10 transition-all">خروجی اکسل انبار</button>
          </div>
          
          <div className="divide-y divide-slate-50">
             {inventory.map((item: InventoryItem) => (
               <div key={item.id} className="p-8 flex flex-row-reverse items-center justify-between hover:bg-slate-50 transition-all">
                  <div className="flex flex-row-reverse items-center gap-6 w-1/3">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${item.currentStock < item.minRequired ? 'bg-rose-100 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                        {item.category === 'مواد مصرفی' ? '🧪' : '🛡️'}
                     </div>
                     <div className="text-right">
                        <h4 className="font-black text-slate-900 text-lg leading-none mb-2">{item.name}</h4>
                        <span className="text-[9px] font-black bg-slate-100 px-2 py-0.5 rounded-md uppercase text-slate-400 tracking-widest">{item.category}</span>
                     </div>
                  </div>

                  <div className="flex-1 px-10">
                     <div className="flex flex-row-reverse justify-between text-[10px] font-black mb-2">
                        <span className="text-slate-400">سطح موجودی</span>
                        <span className={item.currentStock < item.minRequired ? 'text-rose-600' : 'text-emerald-600'}>
                           {toPersian(item.currentStock)} {item.unit}
                        </span>
                     </div>
                     <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                           className={`h-full transition-all duration-1000 ${item.currentStock < item.minRequired ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                           style={{ width: `${Math.min(100, (item.currentStock / (item.minRequired * 1.5)) * 100)}%` }}
                        ></div>
                     </div>
                  </div>

                  <div className="text-left w-1/4">
                     <p className="text-[9px] text-slate-400 font-bold mb-2">آخرین سفارش: {toPersian(item.lastOrdered)}</p>
                     <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black hover:bg-pink-600 transition-all">سفارش مجدد</button>
                  </div>
               </div>
             ))}
          </div>
       </div>

       {/* Side Tools: Smart Ordering */}
       <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 p-10 rounded-[50px] text-white space-y-10 shadow-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full bg-white/[0.03] pointer-events-none"></div>
             <div className="space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-white/10">🤖</div>
                <h3 className="text-2xl font-black leading-tight">تامین هوشمند <br/> با Zibaas AI</h3>
                <p className="text-indigo-200 text-xs font-medium leading-relaxed">بر اساس حجم نوبت‌های رزرو شده در ۱۰ روز آینده، سیستم پیشنهاد می‌دهد اقلام زیر را همین حالا شارژ کنید تا با اختلال در خدمات مواجه نشوید.</p>
             </div>
             
             <div className="space-y-3">
                <div className="flex flex-row-reverse justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                   <span className="text-[10px] font-black">بوتاکس مصپورت (۵ عدد)</span>
                   <span className="text-emerald-400 text-xs">✓ اضافه شد</span>
                </div>
                <div className="flex flex-row-reverse justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                   <span className="text-[10px] font-black">آنژیوکت آبی (۲۰ عدد)</span>
                   <button className="text-pink-500 text-[10px] font-black">+ افزودن</button>
                </div>
             </div>

             <button className="w-full py-6 bg-pink-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-pink-900/40 hover:scale-105 transition-all">تکمیل سفارش کلی</button>
          </div>

          <div className="bg-white p-8 rounded-[45px] border border-slate-100 shadow-sm flex items-center flex-row-reverse gap-4">
             <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📦</div>
             <div className="text-right">
                <h5 className="font-black text-slate-900 text-sm italic">ارسال Express فعال است</h5>
                <p className="text-[10px] text-slate-400 font-bold leading-relaxed">سفارشات مواد مصرفی شما در کمتر از ۲ ساعت توسط پیک اختصاصی زیباست به کلینیک تحویل می‌گردد.</p>
             </div>
          </div>
       </div>
    </div>
  );
};

const ClinicClientManagement = ({ toPersian, bookings }: any) => {
  // Mock grouping logic
  const clients = [
    { name: 'سارا رضایی', lastVisit: '۱۴۰۲/۰۸/۲۵', totalVisits: 8, points: 1250, phone: '۰۹۱۲۱۱۱۱۱۱۱', tag: 'VIP' },
    { name: 'نیلوفر راد', lastVisit: '۱۴۰۲/۰۸/۲۶', totalVisits: 3, points: 450, phone: '۰۹۱۲۴۴۴۴۴۴۴', tag: 'Regular' },
    { name: 'مریم سپهری', lastVisit: '۱۴۰۲/۰۸/۲۵', totalVisits: 1, points: 100, phone: '۰۹۱۲۲۲۲۲۲۲۲', tag: 'New' },
  ];

  return (
    <div className="space-y-10 animate-in zoom-in-95">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { l: 'کل پرونده‌ها', v: '۴۸۰', i: '📁', c: 'text-indigo-600' },
            { l: 'مشتریان وفادار', v: '۱۲۴', i: '⭐', c: 'text-amber-600' },
            { l: 'نرخ بازگشت', v: '۷۸٪', i: '🔄', c: 'text-emerald-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center gap-4 group hover:shadow-xl transition-all">
               <div className="text-4xl group-hover:scale-110 transition-transform">{s.i}</div>
               <div className="text-center">
                  <p className={`text-3xl font-black ${s.c}`}>{toPersian(s.v)}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.l}</p>
               </div>
            </div>
          ))}
       </div>

       <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row-reverse justify-between items-center">
             <h3 className="text-xl font-black text-slate-900 border-r-4 border-pink-600 pr-4">بانک اطلاعاتی مراجعین مرکز</h3>
             <button className="text-xs font-black text-pink-600 flex items-center gap-2 hover:gap-4 transition-all">
                <span>مشاهده آنالیزهای AI مراجعین</span>
                <span className="rotate-180">←</span>
             </button>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-right border-collapse">
                <thead className="bg-slate-50/30 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                   <tr>
                      <th className="p-8">نام مراجع</th>
                      <th className="p-8">شماره تماس</th>
                      <th className="p-8">تعداد مراجعات</th>
                      <th className="p-8">آخرین حضور</th>
                      <th className="p-8">امتیاز وفاداری</th>
                      <th className="p-8">دسته‌بندی</th>
                      <th className="p-8">عملیات</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {clients.map((client, i) => (
                     <tr key={i} className="hover:bg-slate-50/50 transition-colors text-sm font-bold text-slate-700">
                        <td className="p-8 text-slate-900 font-black">{client.name}</td>
                        <td className="p-8" dir="ltr">{toPersian(client.phone)}</td>
                        <td className="p-8">{toPersian(client.totalVisits)} بار</td>
                        <td className="p-8">{toPersian(client.lastVisit)}</td>
                        <td className="p-8">
                           <div className="flex flex-row-reverse items-center gap-2">
                              <span className="text-amber-500">⭐</span>
                              <span>{toPersian(client.points)}</span>
                           </div>
                        </td>
                        <td className="p-8">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${
                             client.tag === 'VIP' ? 'bg-indigo-100 text-indigo-700' : 
                             client.tag === 'New' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                           }`}>{client.tag}</span>
                        </td>
                        <td className="p-8">
                           <button className="text-pink-600 hover:underline">مشاهده پرونده کامل</button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {/* Lock-in CTA */}
       <div className="bg-slate-900 p-12 rounded-[60px] text-white flex flex-col md:flex-row-reverse items-center justify-between gap-10 shadow-4xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px]"></div>
          <div className="text-right space-y-4 relative z-10 flex-1">
             <h3 className="text-3xl font-black tracking-tighter">کمپین وفادارسازی مراجعین</h3>
             <p className="text-slate-400 font-medium leading-relaxed max-w-xl ml-auto">
               با فعال‌سازی سیستم «تخفیف هوشمند مراجعین وفادار»، زیباست به‌صورت خودکار پس از هر ۳ مراجعه، یک کد تخفیف اختصاصی برای مراجعین شما پیامک می‌کند تا نرخ بازگشت مشتریان مرکزتان را تا ۳۵٪ افزایش دهید.
             </p>
          </div>
          <button className="bg-pink-600 text-white px-12 py-6 rounded-[35px] font-black text-xl shadow-2xl shadow-pink-900/50 hover:bg-white hover:text-slate-950 transition-all active:scale-95 shrink-0 relative z-10">فعال‌سازی سیستم Loyalty</button>
       </div>
    </div>
  );
};

export default ClinicPanel;
