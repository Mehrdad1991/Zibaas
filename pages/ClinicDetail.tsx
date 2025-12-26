
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CLINICS } from '../constants.tsx';
import ClinicProfile from '../components/ClinicProfile.tsx';

const ClinicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const clinic = MOCK_CLINICS.find(c => c.id === id);

  if (!clinic) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-gray-900 mb-4">کلینیک مورد نظر پیدا نشد.</h2>
        <button onClick={() => navigate('/search')} className="text-pink-600 font-bold underline">بازگشت به جستجو</button>
      </div>
    );
  }

  return (
    <ClinicProfile 
      clinic={clinic} 
      onBack={() => navigate(-1)} 
      onBookService={() => navigate('/booking')} 
    />
  );
};

export default ClinicDetail;
