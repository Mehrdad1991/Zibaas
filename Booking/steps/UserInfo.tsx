
import React from 'react';

interface UserInfoProps {
  data: any;
  onChange: (field: string, val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ data, onChange, onNext, onBack }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-right flex flex-col h-full">
      <div className="space-y-3">
        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Step 03: Medical Record</div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">تکمیل اطلاعات پرونده مراجع</h3>
        <p className="text-slate-400 font-bold text-base leading-relaxed">اطلاعات شما برای هماهنگی با تیم درمانی و صدور بیمه خدمات در سیستم Zibaas ثبت می‌گردد.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 pr-4 block">نام و نام خانوادگی مراجع (مطابق شناسنامه)</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[25px] px-8 py-5 font-bold focus:border-pink-500 focus:bg-white text-right shadow-inner transition-all outline-none"
                placeholder="مثال: علی محمدی"
                value={data.patientName || ''}
                onChange={e => onChange('patientName', e.target.value)}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">👤</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 pr-4 block">شماره موبایل جهت دریافت کد رهگیری</label>
            <div className="relative">
              <input 
                type="tel" 
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[25px] px-8 py-5 font-bold focus:border-pink-500 focus:bg-white text-center shadow-inner transition-all outline-none"
                placeholder="۰۹********* "
                value={data.phone || ''}
                onChange={e => onChange('phone', e.target.value)}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">📱</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 pr-4 block">توضیحات تکمیلی، حساسیت‌ها یا سوابق پزشکی</label>
          <textarea 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[30px] px-8 py-5 font-bold focus:border-pink-500 focus:bg-white text-right h-44 shadow-inner leading-relaxed transition-all outline-none"
            placeholder="اگر مورد خاصی در پرونده شما مهم است بنویسید..."
            value={data.notes || ''}
            onChange={e => onChange('notes', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-[40px] text-white flex items-center gap-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
         <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl shrink-0">🛡️</div>
         <div className="flex-1 text-right">
            <h4 className="text-lg font-black mb-1">حریم خصوصی شما اولویت ماست</h4>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">اطلاعات پرونده شما تنها در اختیار پزشک معالج قرار می‌گیرد و بر اساس پروتکل‌های امنیتی Zibaas رمزنگاری شده است.</p>
         </div>
      </div>

      <div className="mt-auto pt-8 flex gap-4">
        <button onClick={onBack} className="flex-1 py-6 bg-slate-100 text-slate-400 rounded-[32px] font-black hover:bg-slate-200 transition-all">بازگشت</button>
        <button 
          disabled={!data.patientName || !data.phone}
          onClick={onNext}
          className="flex-[2] py-6 bg-pink-600 text-white rounded-[32px] font-black text-xl shadow-2xl shadow-pink-100 hover:bg-pink-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all active:scale-95"
        >
          تایید و صدور فاکتور رسمی
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
