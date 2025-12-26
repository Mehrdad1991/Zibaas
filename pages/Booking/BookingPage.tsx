
import React, { useState } from 'react';

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-4">فرآیند رزرو نوبت</h1>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${step >= i ? 'w-12 bg-pink-600' : 'w-4 bg-gray-100'}`}></div>
            ))}
          </div>
        </header>

        <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
          {step === 1 && <div><h2 className="text-xl font-bold mb-4">گام اول: انتخاب خدمت و زمان</h2><p className="text-gray-400">Placeholder for Service Selection</p></div>}
          {step === 2 && <div><h2 className="text-xl font-bold mb-4">گام دوم: اطلاعات بیمار</h2><p className="text-gray-400">Placeholder for Patient Info</p></div>}
          {step === 3 && <div><h2 className="text-xl font-bold mb-4">گام سوم: تایید و پرداخت</h2><p className="text-gray-400">Placeholder for Payment</p></div>}
        </div>

        <div className="mt-12 flex justify-between gap-4">
          <button 
            disabled={step === 1}
            onClick={() => setStep(s => s - 1)}
            className="px-8 py-4 rounded-2xl font-black text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-0"
          >
            مرحله قبلی
          </button>
          <button 
            onClick={() => step < 3 ? setStep(s => s + 1) : alert('نوبت ثبت شد')}
            className="bg-pink-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-pink-100 hover:bg-pink-700 transition-all"
          >
            {step === 3 ? 'تایید نهایی رزرو' : 'مرحله بعدی'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
