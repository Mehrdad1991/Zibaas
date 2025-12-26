
import React, { useState } from 'react';
import { Service, Clinic, Technician } from '../types';
import Calendar from './Calendar';

interface ServiceBookingModalProps {
  service: Service;
  provider: Clinic | Technician;
  onClose: () => void;
  onConfirm: (details: any) => void;
}

const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({ service, provider, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: '',
    patientName: '',
  });

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[40px] md:rounded-[60px] overflow-hidden shadow-3xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Stepper Header */}
        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <button onClick={onClose} className="text-slate-400 hover:text-pink-600 transition-colors p-2">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="text-right">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">رزرو هوشمند {service.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Provider: {provider.name}</p>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-4">
             {[1, 2, 3].map(i => (
               <React.Fragment key={i}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= i ? 'bg-pink-600 text-white shadow-lg shadow-pink-200' : 'bg-slate-100 text-slate-400'}`}>
                   {toPersianDigits(i)}
                 </div>
                 {i < 3 && <div className={`h-1 flex-1 rounded-full ${step > i ? 'bg-pink-600' : 'bg-slate-100'}`}></div>}
               </React.Fragment>
             ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <Calendar 
                duration={service.duration} 
                onSelectSlot={(date, time) => setBookingData({...bookingData, date, time})} 
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 text-right">
              <h4 className="text-lg font-black text-slate-900 border-r-4 border-pink-600 pr-3">اطلاعات تکمیلی مراجع</h4>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 pr-2">نام و نام خانوادگی بیمار</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right"
                      placeholder="نام کامل را وارد کنید..."
                      value={bookingData.patientName}
                      onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 pr-2">توضیحات یا سوابق پزشکی مرتبط (اختیاری)</label>
                    <textarea 
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-pink-500 text-right h-32"
                      placeholder="اگر آلرژی خاصی دارید یا نکته‌ای برای متخصص وجود دارد..."
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    />
                 </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 text-right">
              <h4 className="text-lg font-black text-slate-900 border-r-4 border-pink-600 pr-3">خلاصه رزرو و تایید نهایی</h4>
              <div className="bg-slate-50 rounded-[32px] p-8 space-y-6 border border-slate-100">
                 <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-black">{service.name}</span>
                    <span className="text-slate-400 text-xs font-bold">خدمت انتخاب شده</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-black">{bookingData.date} - ساعت {bookingData.time}</span>
                    <span className="text-slate-400 text-xs font-bold">زمان نوبت</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-black">{bookingData.patientName}</span>
                    <span className="text-slate-400 text-xs font-bold">نام مراجع</span>
                 </div>
                 <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                    <div className="text-right">
                       <p className="text-2xl font-black text-pink-600">{toPersianDigits(service.price.toLocaleString())} تومان</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Final Amount to Pay</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                       <span className="text-xs font-black">امنیت کامل اطلاعات</span>
                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                 <div className="text-xl">💳</div>
                 <p className="text-xs text-blue-800 leading-relaxed font-bold">
                    در مرحله بعد شما به درگاه پرداخت شاپرک متصل خواهید شد. هزینه پرداختی شامل ضمانت بازگشت وجه زیباست در صورت لغو تا ۲۴ ساعت قبل می‌باشد.
                 </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 md:p-10 border-t border-slate-50 bg-slate-50/30 flex gap-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="flex-1 py-4 md:py-5 bg-white border border-slate-200 text-slate-500 rounded-3xl font-black text-sm md:text-lg hover:bg-slate-50 transition-all"
            >
              مرحله قبل
            </button>
          )}
          <button 
            disabled={(step === 1 && (!bookingData.date || !bookingData.time)) || (step === 2 && !bookingData.patientName)}
            onClick={step === 3 ? () => onConfirm(bookingData) : handleNext}
            className={`flex-[2] py-4 md:py-5 rounded-3xl font-black text-sm md:text-lg shadow-xl transition-all ${
              (step === 1 && (!bookingData.date || !bookingData.time)) || (step === 2 && !bookingData.patientName)
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-pink-600 text-white shadow-pink-100 hover:bg-pink-700 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {step === 3 ? 'اتصال به درگاه و پرداخت' : 'تایید و ادامه'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingModal;
