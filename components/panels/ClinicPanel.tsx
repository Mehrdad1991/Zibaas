
import React, { useState } from 'react';
import { MOCK_CLINICS } from '../../constants';
import { Staff, Room } from '../../types';

const ClinicPanel: React.FC = () => {
  const clinic = MOCK_CLINICS[0];
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'staff' | 'rooms'>('staff');
  const [staffList, setStaffList] = useState<Staff[]>(clinic.staff);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', specialty: '' });

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handleAddStaff = () => {
    if (!newStaff.name) return;
    const s: Staff = {
      id: Date.now().toString(),
      name: newStaff.name,
      role: newStaff.role,
      specialty: newStaff.specialty,
      image: 'https://i.pravatar.cc/150?u=' + Date.now(),
      isPlatformUser: false
    };
    setStaffList([...staffList, s]);
    setShowAddStaff(false);
    setNewStaff({ name: '', role: '', specialty: '' });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Clinic Header */}
      <div className="bg-white p-8 md:p-12 rounded-[40px] md:rounded-[60px] shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
        <div className="flex items-center gap-6">
          <img src={clinic.image} className="w-20 h-20 md:w-28 md:h-28 rounded-[30px] md:rounded-[40px] object-cover shadow-2xl ring-8 ring-pink-50" alt={clinic.name} />
          <div className="text-right">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">{clinic.name}</h2>
            <p className="text-slate-400 font-bold text-xs md:text-lg mt-1">مدیریت متمرکز کلینیک هوشمند</p>
          </div>
        </div>
        <div className="flex bg-slate-100 p-2 rounded-[24px] md:rounded-[32px] overflow-x-auto no-scrollbar gap-2 w-full sm:w-auto">
          {[
            { id: 'staff', label: 'کادر درمان', icon: '👨‍⚕️' },
            { id: 'rooms', label: 'مدیریت اتاق‌ها', icon: '🏢' },
            { id: 'info', label: 'اطلاعات کلینیک', icon: '📝' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex-1 sm:flex-none px-6 md:px-10 py-3 rounded-[18px] md:rounded-[24px] text-xs md:text-sm font-black transition-all whitespace-nowrap ${activeSubTab === tab.id ? 'bg-white text-pink-600 shadow-xl' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <span className="text-lg ml-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'staff' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center px-4">
               <button 
                 onClick={() => setShowAddStaff(true)}
                 className="bg-pink-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all"
               >
                 افزودن عضو جدید +
               </button>
               <h3 className="text-xl md:text-3xl font-black text-slate-900 border-r-8 border-pink-600 pr-4">لیست پزشکان و کادر</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staffList.map(member => (
                <div key={member.id} className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-xl transition-all group">
                   <img src={member.image} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" alt={member.name} />
                   <div className="text-right flex-1">
                      <h4 className="font-black text-slate-900 text-lg">{member.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                      <p className="text-xs text-pink-600 font-black mt-1">{member.specialty}</p>
                   </div>
                   <button className="text-slate-300 hover:text-red-500 p-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-slate-950 p-8 rounded-[50px] text-white space-y-8 shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-600/10 rounded-full blur-[80px]"></div>
                <h3 className="text-xl font-black">آمار عملکردی کادر</h3>
                <div className="space-y-4">
                   {[
                     { l: 'رضایت کل', v: '۴.۹ از ۵', c: 'text-amber-400' },
                     { l: 'نوبت‌های امروز', v: '۱۸ نوبت', c: 'text-white' },
                     { l: 'تأخیر میانگین', v: '۴ دقیقه', c: 'text-slate-400' },
                   ].map((stat, i) => (
                     <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-black uppercase text-slate-500">{stat.l}</span>
                        <span className={`font-black ${stat.c}`}>{toPersianDigits(stat.v)}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {activeSubTab === 'rooms' && (
        <div className="space-y-8">
           <div className="flex justify-between items-center px-4">
              <div className="flex gap-4">
                 <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> آزاد
                 </span>
                 <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span> اشغال
                 </span>
              </div>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 border-r-8 border-pink-600 pr-4">وضعیت اتاق‌ها و یونیت‌ها</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinic.rooms.map(room => (
                <div key={room.id} className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                   <div className="relative mb-6 rounded-[28px] overflow-hidden aspect-video shadow-inner">
                      <img src={room.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={room.name} />
                      <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-[9px] font-black text-white shadow-xl ${room.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}>
                         {room.isAvailable ? 'Ready for Use' : 'Occupied'}
                      </div>
                   </div>
                   <div className="text-right space-y-4">
                      <h4 className="text-xl font-black text-slate-900">{room.name}</h4>
                      <div className="flex flex-wrap gap-2 justify-end">
                         {room.features.slice(0, 3).map((f, i) => (
                           <span key={i} className="text-[9px] font-black text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{f}</span>
                         ))}
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                         <button className="bg-slate-900 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black hover:bg-pink-600 transition-all shadow-lg">تنظیمات اتاق</button>
                         <div className="text-right">
                            <p className="text-lg font-black text-slate-900">{toPersianDigits(room.pricePerHour.toLocaleString())}</p>
                            <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Rate Per Hour</p>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[50px] p-10 shadow-3xl animate-in zoom-in-95 duration-300 space-y-8 text-right">
              <h3 className="text-2xl font-black text-slate-900">افزودن عضو جدید به کلینیک</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-black text-slate-400 pr-2">نام و نام خانوادگی</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right"
                      value={newStaff.name}
                      onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="text-xs font-black text-slate-400 pr-2">نقش عملیاتی</label>
                    <input 
                      type="text" 
                      placeholder="مثلا: جراح، تکنسین، دستیار"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right"
                      value={newStaff.role}
                      onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="text-xs font-black text-slate-400 pr-2">تخصص اصلی</label>
                    <input 
                      type="text" 
                      placeholder="مثلا: رینوپلاستی، تزریقات تخصصی"
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right"
                      value={newStaff.specialty}
                      onChange={e => setNewStaff({...newStaff, specialty: e.target.value})}
                    />
                 </div>
              </div>
              <div className="flex gap-4 pt-4">
                 <button onClick={handleAddStaff} className="flex-[2] py-4 bg-pink-600 text-white rounded-3xl font-black shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all">تایید و ثبت</button>
                 <button onClick={() => setShowAddStaff(false)} className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-3xl font-black">انصراف</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClinicPanel;
