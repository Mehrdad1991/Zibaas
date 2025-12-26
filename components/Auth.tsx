
import React, { useState } from 'react';

type Lang = 'fa' | 'en' | 'ar';

interface AuthProps {
  onClose: () => void;
  onLogin: (phone: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onClose, onLogin }) => {
  const [lang, setLang] = useState<Lang>('fa');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const translations = {
    fa: {
      title: 'ورود | ثبت‌نام',
      subtitle: 'سلام! شماره موبایل خود را وارد کنید.',
      placeholder: '۰۹*********',
      button: 'تایید و ادامه',
      privacy: 'با ورود به زیباست، شرایط زیباست و قوانین حریم خصوصی آن را می‌پذیرم.',
      otpTitle: 'کد تایید را وارد کنید',
      otpSubtitle: 'کد تایید برای شماره {phone} پیامک شد.',
      editPhone: 'اصلاح شماره موبایل',
      resend: 'ارسال مجدد کد (۲:۰۰)',
      dir: 'rtl'
    },
    en: {
      title: 'Login | Sign Up',
      subtitle: 'Hello! Please enter your mobile number.',
      placeholder: '09xxxxxxxxx',
      button: 'Confirm & Continue',
      privacy: 'By entering Zibaas, I accept the terms and privacy policy.',
      otpTitle: 'Enter Verification Code',
      otpSubtitle: 'Code sent to {phone}.',
      editPhone: 'Edit Phone Number',
      resend: 'Resend code (2:00)',
      dir: 'ltr'
    },
    ar: {
      title: 'تسجيل الدخول | اشتراك',
      subtitle: 'أهلاً! يرجى إدخال رقم هاتفك المحمول.',
      placeholder: '٠٩*********',
      button: 'تأكيد واستمرار',
      privacy: 'بدخولك إلى زیباست، فإنك توافق على الشروط وسياسة الخصوصية.',
      otpTitle: 'أدخل رمز التحقق',
      otpSubtitle: 'تم إرسال الرمز إلى {phone}.',
      editPhone: 'تعديل رقم الهاتف',
      resend: 'إعادة إرسال الرمز (٢:٠٠)',
      dir: 'rtl'
    }
  };

  const t = translations[lang];

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const formatNumber = (num: string) => {
    if (lang === 'en') return num;
    return new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'ar-EG', { useGrouping: false }).format(Number(num) || 0);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      onLogin(phone);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 md:p-12" dir={t.dir}>
          
          {/* Header & Language Switcher */}
          <div className={`flex justify-between items-center mb-10 ${t.dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
            <button onClick={onClose} className="text-gray-400 hover:text-pink-600 transition-colors">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
               {(['fa', 'en', 'ar'] as Lang[]).map(l => (
                 <button 
                   key={l}
                   onClick={() => setLang(l)}
                   className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                 >
                   {l}
                 </button>
               ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-pink-600 tracking-tighter">Zibaas</span>
              <div className="w-8 h-8 bg-pink-600 text-white rounded-lg flex items-center justify-center font-black">Z</div>
            </div>
          </div>

          {step === 'phone' ? (
            <div className={`space-y-8 animate-in duration-300 ${t.dir === 'rtl' ? 'slide-in-from-right-5 text-right' : 'slide-in-from-left-5 text-left'}`}>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{t.title}</h2>
                <p className="text-sm text-gray-400 font-medium">{t.subtitle}</p>
              </div>
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder={t.placeholder}
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-center text-lg font-black focus:border-pink-600 focus:ring-0 transition-all outline-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={phone.length < 10}
                  className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-100 hover:bg-pink-700 disabled:bg-gray-200 disabled:shadow-none transition-all"
                >
                  {t.button}
                </button>
              </form>
              <p className="text-[10px] text-gray-400 leading-relaxed text-center px-6">
                {t.privacy}
              </p>
            </div>
          ) : (
            <div className={`space-y-8 animate-in duration-300 ${t.dir === 'rtl' ? 'slide-in-from-left-5 text-right' : 'slide-in-from-right-5 text-left'}`}>
              <button onClick={() => setStep('phone')} className={`text-xs font-bold text-blue-500 flex items-center gap-1 ${t.dir === 'ltr' ? 'flex-row-reverse' : ''}`}>
                <span>{t.editPhone}</span>
                <svg className={`h-3 w-3 ${t.dir === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
              </button>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{t.otpTitle}</h2>
                <p className="text-sm text-gray-400 font-medium">
                  {t.otpSubtitle.replace('{phone}', phone)}
                </p>
              </div>
              <div className="flex justify-between gap-2" dir="ltr">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    autoFocus={i === 0}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-full aspect-square bg-gray-50 border-2 border-gray-100 rounded-2xl text-center text-2xl font-black focus:border-pink-600 focus:ring-0 transition-all outline-none"
                  />
                ))}
              </div>
              <div className="text-center">
                 <button className="text-xs font-black text-gray-400 hover:text-pink-600">{t.resend}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
