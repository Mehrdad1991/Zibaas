
import React from 'react';

interface UserInfoProps {
  data: any;
  onChange: (field: string, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ data, onChange, onNext, onBack }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-right">
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-slate-900">۳. اطلاعات مراجع</h3>
        <p className="text-slate-400 font-bold text-sm italic">لطفاً مشخصات فرد مراجع را با دقت وارد نمایید.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-black text-slate-400 pr-4 mb-2 block">نام و نام خانوادگی مراجع</label>
          <input 
            type="text" 
            className="w-full bg-slate-50 border-none rounded-[25px] px-8 py-5 font-bold focus:ring-2 focus:ring-pink-500 text-right shadow-inner"
            placeholder="مثال: علی محمدی"
            value={data.patientName || ''}
            onChange={e => onChange('patientName', e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-black text-slate-400 pr-4 mb-2 block">شماره تماس جهت هماهنگی</label>
          <input 
            type="tel" 
            className="w-full bg-slate-50 border-none rounded-[25px] px-8 py-5 font-bold focus:ring-2 focus:ring-pink-500 text-center shadow-inner"
            placeholder="۰۹********* "
            value={data.phone || ''}
            onChange={e => onChange('phone', e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-black text-slate-400 pr-4 mb-2 block">توضیحات تکمیلی (اختیاری)</label>
          <textarea 
            className="w-full bg-slate-50 border-none rounded-[30px] px-8 py-5 font-bold focus:ring-2 focus:ring-pink-500 text-right h-40 shadow-inner leading-relaxed"
            placeholder="اگر مورد خاص یا آلرژی دارید بنویسید..."
            value={data.notes || ''}
            onChange={e => onChange('notes', e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 pt-6 border-t border-slate-50">
        <button onClick={onBack} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-[25px] font-black">بازگشت</button>
        <button 
          disabled={!data.patientName || !data.phone}
          onClick={onNext}
          className="flex-[2] py-5 bg-pink-600 text-white rounded-[25px] font-black text-lg shadow-2xl shadow-pink-100 hover:bg-pink-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all"
        >
          تایید و پیش‌فاکتور
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
