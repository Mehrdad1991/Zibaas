
import React from 'react';
import ClinicProfile from '../components/ClinicProfile';

const ClinicProfilePage: React.FC<any> = ({ selectedClinic, onTabChange, onBookService }) => {
  if (!selectedClinic) return <div className="py-20 text-center">کلینیکی انتخاب نشده است.</div>;
  return (
    <ClinicProfile 
      clinic={selectedClinic} 
      onBack={() => onTabChange('booking')} 
      onBookService={onBookService} 
    />
  );
};

export default ClinicProfilePage;
