
import React, { useState } from 'react';

interface AuthProps {
  onClose: () => void;
  onLogin: (phone: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onClose, onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 11) {
      setStep('otp');
    }
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
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-10">
            <button onClick={onClose} className="text-gray-400 hover:text-pink-600 transition-colors">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-pink-600 tracking-tighter">Zibaas</span>
              <div className="w-8 h-8 bg-pink-600 text-white rounded-lg flex items-center justify-center font-black">Z</div>
            </div>
          </div>

          {step === 'phone' ? (
            <div className="space-y-8 animate-in slide-in-from-right-5 duration-300 text-right">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">ورود | ثبت‌نام</h2>
                <p className="text-sm text-gray-400 font-medium">سلام! شماره موبایل خود را وارد کنید.</p>
              </div>
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="۰۹********* "
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-center text-lg font-black focus:border-pink-600 focus:ring-0 transition-all outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={phone.length !== 11}
                  className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-100 hover:bg-pink-700 disabled:bg-gray-200 disabled:shadow-none transition-all"
                >
                  تایید و ادامه
                </button>
              </form>
              <p className="text-[10px] text-gray-400 leading-relaxed text-center px-6">
                با ورود به زیباست، <span className="text-blue-500 underline">شرایط زیباست</span> و <span className="text-blue-500 underline">قوانین حریم خصوصی</span> آن را می‌پذیرم.
              </p>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-left-5 duration-300 text-right">
              <button onClick={() => setStep('phone')} className="text-xs font-bold text-blue-500 flex items-center gap-1">
                <span>اصلاح شماره موبایل</span>
                <svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
              </button>
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">کد تایید را وارد کنید</h2>
                <p className="text-sm text-gray-400 font-medium">کد تایید برای شماره {phone} پیامک شد.</p>
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
                 <button className="text-xs font-black text-gray-400 hover:text-pink-600">ارسال مجدد کد (۲:۰۰)</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
