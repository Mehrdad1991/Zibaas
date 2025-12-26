
import React, { useState, useMemo } from 'react';
import { Service, Clinic, Technician } from '../types';

interface ServiceBookingModalProps {
  service: Service;
  provider: Clinic | Technician;
  onClose: () => void;
  onConfirm: (bookingDetails: { date: string; time: string; notes: string }) => void;
}

const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({ service, provider, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('۱۴۰۲/۰۸/۲۰');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');

  // Helper to convert numbers to Persian digits
  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  // Logic to generate slots based on service duration
  const dynamicSlots = useMemo(() => {
    const slots = [];
    const startHour = 8;
    const endHour = 20;
    const durationMins = service.duration;

    if (durationMins >= 420) { // More than 7 hours = Full Day or Half Day blocks
      if (durationMins >= 480) {
        slots.push({ start: '۰۸:۰۰', end: toPersianDigits(Math.floor(8 + durationMins/60)) + ':۰۰', label: 'نوبت تمام‌روز' });
      } else {
        slots.push({ start: '۰۸:۰۰', end: toPersianDigits(Math.floor(8 + durationMins/60)) + ':۰۰', label: 'شیفت صبح' });
        slots.push({ start: '۱۴:۰۰', end: toPersianDigits(Math.floor(14 + durationMins/60)) + ':۰۰', label: 'شیفت عصر' });
      }
    } else if (durationMins >= 180) { // 3 to 7 hours = Multi-hour blocks
      let current = startHour;
      while (current + durationMins / 60 <= endHour) {
        const end = current + durationMins / 60;
        slots.push({ 
          start: `${toPersianDigits(current.toString().padStart(2, '0'))}:۰۰`, 
          end: `${toPersianDigits(Math.floor(end).toString().padStart(2, '0'))}:${toPersianDigits((end % 1 * 60).toString().padStart(2, '0'))}`,
          label: 'نوبت جراحی/تخصصی'
        });
        current += Math.max(durationMins / 60, 4); // At least 4 hours between long starts
      }
    } else { // Less than 3 hours = Hourly blocks
      let current = startHour;
      while (current + durationMins / 60 <= endHour) {
        const startTime = `${toPersianDigits(current.toString().padStart(2, '0'))}:۰۰`;
        slots.push({ start: startTime, label: '' });
        current += durationMins / 60 >= 1 ? 1 : 0.5; // Increments of 1h or 30m
      }
    }
    return slots;
  }, [service.duration]);

  const dates = [
    { label: 'شنبه', day: '۲۰', month: 'آبان' },
    { label: 'یکشنبه', day: '۲۱', month: 'آبان' },
    { label: 'دوشنبه', day: '۲۲', month: 'آبان' },
    { label: 'سه‌شنبه', day: '۲۳', month: 'آبان' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[50px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-2xl font-black text-gray-900">رزرو {service.name}</h3>
            <div className="flex items-center gap-2 mt-1">
               <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-lg text-[10px] font-black">
                 زمان مورد نیاز: {toPersianDigits(service.duration)} دقیقه
               </span>
               <span className="text-xs text-gray-400 font-medium">| توسط {provider.name}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-pink-600 transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {/* Date Selection */}
          <section className="space-y-4">
            <h4 className="text-sm font-black text-gray-400 pr-2">۱. انتخاب تاریخ</h4>
            <div className="grid grid-cols-4 gap-3">
              {dates.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(`۱۴۰۲/۰۸/${d.day}`)}
                  className={`flex flex-col items-center p-4 rounded-3xl border-2 transition-all ${
                    selectedDate.includes(d.day)
                      ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-lg shadow-pink-100'
                      : 'border-gray-100 hover:border-pink-200 text-gray-400'
                  }`}
                >
                  <span className="text-[10px] font-bold">{d.label}</span>
                  <span className="text-xl font-black">{toPersianDigits(d.day)}</span>
                  <span className="text-[10px] opacity-60">{d.month}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Dynamic Time Slot Selection */}
          <section className="space-y-4">
            <h4 className="text-sm font-black text-gray-400 pr-2">۲. انتخاب سانس (بر اساس مدت زمان خدمت)</h4>
            <div className={`grid gap-3 ${service.duration >= 180 ? 'grid-cols-1' : 'grid-cols-3 md:grid-cols-4'}`}>
              {dynamicSlots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(slot.start)}
                  className={`relative p-4 rounded-3xl border-2 text-right transition-all flex flex-col justify-center ${
                    selectedTime === slot.start
                      ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-md'
                      : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-pink-200'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg font-black">{slot.start}</span>
                    {slot.end && <span className="text-[10px] opacity-60">تا {slot.end}</span>}
                  </div>
                  {slot.label && (
                    <span className={`text-[9px] font-bold mt-1 ${selectedTime === slot.start ? 'text-pink-400' : 'text-gray-400'}`}>
                      {slot.label}
                    </span>
                  )}
                  {selectedTime === slot.start && (
                    <div className="absolute -top-2 -left-2 bg-pink-600 text-white p-1 rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {dynamicSlots.length === 0 && (
              <p className="text-center py-8 text-gray-400 font-bold bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                متاسفانه برای این تاریخ نوبت خالی با این مدت زمان یافت نشد.
              </p>
            )}
          </section>

          {/* Notes */}
          <section className="space-y-4">
            <h4 className="text-sm font-black text-gray-400 pr-2">۳. ملاحظات پزشکی یا توضیحات</h4>
            <textarea
              placeholder="اگر حساسیت دارویی دارید یا نکته خاصی برای جراح/متخصص وجود دارد بنویسید..."
              className="w-full bg-gray-50 border-none rounded-3xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-pink-500 h-24 text-right"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>

          {/* Summary Box */}
          <div className="bg-gray-900 rounded-[35px] p-6 text-white flex justify-between items-center shadow-xl border border-gray-800">
            <div>
              <p className="text-[10px] opacity-60 mb-1">هزینه نهایی خدمت</p>
              <p className="text-2xl font-black">{toPersianDigits(service.price.toLocaleString())} <span className="text-xs font-normal opacity-70">تومان</span></p>
            </div>
            <div className="text-left">
              <p className="text-[10px] opacity-60 mb-1">تعهد زمانی</p>
              <p className="text-lg font-black">{toPersianDigits(service.duration)} دقیقه</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100">
          <button
            disabled={!selectedTime}
            onClick={() => onConfirm({ date: selectedDate, time: selectedTime, notes })}
            className={`w-full py-5 rounded-[25px] font-black text-lg shadow-xl transition-all ${
              selectedTime 
                ? 'bg-pink-600 text-white hover:bg-pink-700 hover:scale-[1.02] shadow-pink-200' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            تایید و ثبت نهایی رزرو
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingModal;
