
import React from 'react';
import TechnicianProfile from '../components/TechnicianProfile';

const TechnicianProfilePage: React.FC<any> = ({ selectedTech, onTabChange, onBookService }) => {
  if (!selectedTech) return (
    <div className="py-32 text-center space-y-6">
      <div className="text-6xl grayscale">👤</div>
      <h3 className="text-xl font-black text-slate-400">متخصصی انتخاب نشده است</h3>
      <button 
        onClick={() => onTabChange('tech-directory')} 
        className="bg-pink-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg"
      >
        بازگشت به لیست متخصصین
      </button>
    </div>
  );

  return (
    <TechnicianProfile 
      technician={selectedTech} 
      onBack={() => onTabChange('tech-directory')} 
      onBookService={(service) => onBookService(service, selectedTech)} 
    />
  );
};

export default TechnicianProfilePage;
