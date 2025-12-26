
import React, { useState } from 'react';
import { MOCK_CLINICS } from '../../constants';
import { Staff } from '../../types';

const ClinicPanel: React.FC = () => {
  const clinic = MOCK_CLINICS[0];
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'staff' | 'rooms'>('staff');
  const [staffList, setStaffList] = useState<Staff[]>(clinic.staff);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', specialty: '' });

  const handleAddStaff = () => {
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <img src={clinic.image} className="w-20 h-20 rounded-[30px] object-cover shadow-md" />
          <div>
            <h2 className="text-2xl font-black text-gray-900">{clinic.name}</h2>
            <p className="text-gray-400 text-sm">پنل مدیریت کلینیک</p>
          </div>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
          {['staff', 'rooms', 'info'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveSubTab(tab as any)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeSubTab === tab ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500'}`}
            >
              {tab === 'staff' ? 'پزشکان و تکنسین‌ها' : tab === 'rooms' ? 'مدیریت اتاق‌ها' : 'اطلاعات کلینیک'}
            </button>
          ))}
        </div>
      </div>

      {activeSubTab === 'staff' && (
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-2xl font-black text-gray-900">لیست کادر درمانی</h3>
               <p className="text-sm text-gray-400">پزشکان داخلی و متخصصین مهمان کلینیک</p>
            </div>
            <button 
              onClick={() => setShowAddStaff(true)}
              className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl"
            >
              + افزودن پزشک جدید
            </button>
          </div>

          {showAddStaff && (
            <div className="mb-10 p-8 bg-gray-50 rounded-[30px] border border-gray-100 animate-in slide-in-from-top-4">
               <h4 className="font-black text-lg mb-6">ثبت مشخصات متخصص جدید</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <input 
                    placeholder="نام و نام خانوادگی" 
                    className="bg-white border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-500"
                    value={newStaff.name}
                    onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                  />
                  <input 
                    placeholder="سمت (مثلا: جراح پلاستیک)" 
                    className="bg-white border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-500"
                    value={newStaff.role}
                    onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                  />
                  <input 
                    placeholder="تخصص" 
                    className="bg-white border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-pink-500"
                    value={newStaff.specialty}
                    onChange={e => setNewStaff({...newStaff, specialty: e.target.value})}
                  />
               </div>
               <div className="flex justify-end gap-4">
                  <button onClick={() => setShowAddStaff(false)} className="text-gray-500 font-bold px-6">انصراف</button>
                  <button onClick={handleAddStaff} className="bg-pink-600 text-white px-8 py-3 rounded-xl font-bold">تایید و ثبت</button>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffList.map(member => (
              <div key={member.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-5 group hover:border-pink-300 transition-all">
                <img src={member.image} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white" />
                <div>
                   <h4 className="font-bold text-gray-900">{member.name}</h4>
                   <p className="text-xs text-pink-600 font-bold mb-1">{member.role}</p>
                   {!member.isPlatformUser && <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">متخصص مهمان</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicPanel;
