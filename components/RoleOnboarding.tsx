
import React, { useState } from 'react';
import { UserRole } from '../types';

interface RoleOnboardingProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleOnboarding: React.FC<RoleOnboardingProps> = ({ onSelectRole }) => {
  const [selectedType, setSelectedType] = useState<UserRole | null>(null);

  const roles = [
    { 
      id: UserRole.CUSTOMER, 
      title: 'کاربر عادی', 
      desc: 'رزرو نوبت، خرید محصول و مشاوره هوشمند', 
      icon: '👤',
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      id: UserRole.TECHNICIAN, 
      title: 'متخصص (تکنسین)', 
      desc: 'ارائه خدمات، اجاره اتاق و مدیریت پورتفولیو', 
      icon: '💉',
      color: 'bg-pink-50 text-pink-600'
    },
    { 
      id: UserRole.CLINIC_ADMIN, 
      title: 'مدیر کلینیک', 
      desc: 'ثبت کلینیک، مدیریت کادر درمان و اجاره فضا', 
      icon: '🏥',
      color: 'bg-indigo-50 text-indigo-600'
    },
    { 
      id: UserRole.SELLER, 
      title: 'فروشنده تجهیزات', 
      desc: 'فروش دستگاه‌ها، مصرفی‌ها و محصولات زیبایی', 
      icon: '📦',
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">به زیباست خوش آمدید!</h1>
        <p className="text-gray-500 font-bold">نقش خود را در پلتفرم انتخاب کنید تا فرآیند ثبت‌نام تکمیل شود.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedType(role.id)}
            className={`p-8 rounded-[40px] border-2 text-right transition-all flex items-center gap-6 group ${
              selectedType === role.id ? 'border-pink-600 bg-pink-50 shadow-xl' : 'border-gray-100 bg-white hover:border-pink-200'
            }`}
          >
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform ${role.color}`}>
              {role.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-gray-900 mb-1">{role.title}</h3>
              <p className="text-xs text-gray-400 font-bold leading-relaxed">{role.desc}</p>
            </div>
            {selectedType === role.id && (
               <div className="bg-pink-600 text-white p-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
               </div>
            )}
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="mt-12 text-center animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => onSelectRole(selectedType)}
            className="bg-gray-900 text-white px-12 py-5 rounded-[25px] font-black text-lg shadow-2xl hover:bg-pink-600 transition-all flex items-center gap-4 mx-auto"
          >
            تکمیل ثبت‌نام و ورود
            <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleOnboarding;
