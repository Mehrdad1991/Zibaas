
import React, { useState } from 'react';

interface CalendarProps {
  onSelectSlot: (date: string, time: string) => void;
  duration: number;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectSlot, duration }) => {
  const [selectedDate, setSelectedDate] = useState('۱۴۰۲/۰۸/۲۰');
  const [selectedTime, setSelectedTime] = useState('');

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const dates = [
    { label: 'شنبه', day: '۲۰', month: 'آبان', status: 'available' },
    { label: 'یکشنبه', day: '۲۱', month: 'آبان', status: 'available' },
    { label: 'دوشنبه', day: '۲۲', month: 'آبان', status: 'full' },
    { label: 'سه‌شنبه', day: '۲۳', month: 'آبان', status: 'available' },
    { label: 'چهارشنبه', day: '۲۴', month: 'آبان', status: 'available' },
  ];

  const slots = [
    { time: '۰۹:۰۰', status: 'available' },
    { time: '۰۹:۳۰', status: 'booked' },
    { time: '۱۰:۰۰', status: 'available' },
    { time: '۱۰:۳۰', status: 'available' },
    { time: '۱۱:۰۰', status: 'booked' },
    { time: '۱۱:۳۰', status: 'available' },
    { time: '۱۶:۰۰', status: 'available' },
    { time: '۱۶:۳۰', status: 'available' },
    { time: '۱۷:۰۰', status: 'available' },
  ];

  const handleSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    onSelectSlot(date, time);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Date Strip */}
      <div className="space-y-4">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest pr-2">۱. انتخاب روز</h4>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {dates.map((d, i) => (
            <button
              key={i}
              disabled={d.status === 'full'}
              onClick={() => setSelectedDate(`۱۴۰۲/۰۸/${d.day}`)}
              className={`flex flex-col items-center min-w-[80px] py-5 rounded-[24px] border-2 transition-all ${
                selectedDate.includes(d.day)
                  ? 'border-pink-600 bg-pink-50 text-pink-600 shadow-xl shadow-pink-100'
                  : d.status === 'full' 
                    ? 'border-slate-50 bg-slate-50 text-slate-300 cursor-not-allowed opacity-50'
                    : 'border-slate-100 bg-white text-slate-400 hover:border-pink-200'
              }`}
            >
              <span className="text-[10px] font-bold mb-1">{d.label}</span>
              <span className="text-2xl font-black">{toPersianDigits(d.day)}</span>
              <span className="text-[9px] font-medium opacity-60">{d.month}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slots Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">۲. انتخاب ساعت نوبت</h4>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">مدت خدمت: {toPersianDigits(duration)} دقیقه</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {slots.map((slot, i) => (
            <button
              key={i}
              disabled={slot.status === 'booked'}
              onClick={() => handleSelect(selectedDate, slot.time)}
              className={`py-4 rounded-2xl border-2 font-black transition-all ${
                selectedTime === slot.time
                  ? 'border-pink-600 bg-pink-600 text-white shadow-lg shadow-pink-200'
                  : slot.status === 'booked'
                    ? 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed line-through'
                    : 'border-slate-100 bg-white text-slate-600 hover:border-pink-600 hover:text-pink-600'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
