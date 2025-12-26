
import React, { useState } from 'react';
import { Role } from '../store/roles';

interface RoleOnboardingProps {
  onSelectRole: (role: Role) => void;
}

const RoleOnboarding: React.FC<RoleOnboardingProps> = ({ onSelectRole }) => {
  const [selectedType, setSelectedType] = useState<Role | null>(null);

  const roles = [
    { 
      id: Role.User, 
      title: 'کاربر (مراجع)', 
      desc: 'رزرو نوبت، خرید محصولات و مشاوره هوشمند زیبایی', 
      icon: '👤',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: Role.Technician, 
      title: 'متخصص (تکنسین)', 
      desc: 'نمایش پورتفولیو حرفه‌ای، مدیریت مراجعین و اجاره اتاق عمل', 
      icon: '💉',
      color: 'bg-pink-50 text-pink-600'
    },
    { 
      id: Role.Clinic, 
      title: 'کلینیک (مدیر مرکز)', 
      desc: 'مدیریت یونیت‌ها، جذب متخصص و مانیتورینگ نوبت‌های درمانی', 
      icon: '🏥',
      color: 'bg-indigo-50 text-indigo-600'
    },
    { 
      id: Role.Admin, 
      title: 'مدیر کل سیستم (Admin)', 
      desc: 'نظارت بر عملکرد پلتفرم، تایید متخصصین و گزارشات مالی کل', 
      icon: '⚙️',
      color: 'bg-slate-900 text-white'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in zoom-in duration-500 text-right">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">هویت شما در زیباست؟</h1>
        <p className="text-gray-500 font-bold text-lg">لطفاً نقش خود را برای دسترسی به امکانات اختصاصی انتخاب کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedType(role.id)}
            className={`p-10 rounded-[50px] border-2 transition-all flex flex-col items-center gap-8 group relative overflow-hidden h-full ${
              selectedType === role.id ? 'border-pink-600 bg-pink-50 shadow-2xl shadow-pink-100' : 'border-gray-100 bg-white hover:border-pink-200 shadow-sm'
            }`}
          >
            <div className={`w-24 h-24 rounded-[35px] flex items-center justify-center text-5xl transition-transform ${role.color}`}>
              {role.icon}
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-gray-900">{role.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold leading-relaxed">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="mt-16 text-center animate-in slide-in-from-bottom-5">
          <button
            onClick={() => onSelectRole(selectedType)}
            className="bg-slate-900 text-white px-16 py-6 rounded-[35px] font-black text-xl shadow-4xl hover:bg-pink-600 transition-all"
          >
            تایید و ورود به پنل مدیریتی
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleOnboarding;
