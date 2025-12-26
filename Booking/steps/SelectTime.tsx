
import React from 'react';
import Calendar from '../../components/Calendar';
import { Service } from '../../types';

interface SelectTimeProps {
  service: Service | null;
  onSelect: (date: string, time: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedDate: string;
  selectedTime: string;
}

const SelectTime: React.FC<SelectTimeProps> = ({ service, onSelect, onNext, onBack, selectedDate, selectedTime }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-right">
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-slate-900">۲. انتخاب زمان حضور</h3>
        <p className="text-slate-400 font-bold text-sm italic">زمان مناسب برای مراجعه به کلینیک را تعیین کنید.</p>
      </div>

      <Calendar 
        duration={service?.duration || 30} 
        onSelectSlot={onSelect} 
      />

      <div className="flex gap-4 pt-6 border-t border-slate-50">
        <button onClick={onBack} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-[25px] font-black hover:bg-slate-200 transition-colors">بازگشت</button>
        <button 
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
          className="flex-[2] py-5 bg-pink-600 text-white rounded-[25px] font-black text-lg shadow-2xl shadow-pink-100 hover:bg-pink-700 disabled:bg-slate-100 disabled:text-slate-300 transition-all"
        >
          تایید و ادامه
        </button>
      </div>
    </div>
  );
};

export default SelectTime;
