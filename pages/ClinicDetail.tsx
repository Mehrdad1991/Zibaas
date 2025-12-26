
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CLINICS } from '../constants.tsx';
import ClinicProfile from '../components/ClinicProfile.tsx';

const ClinicDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clinic = MOCK_CLINICS.find(c => c.id === id);

  if (!clinic) return <div className="p-20 text-center font-black">کلینیک یافت نشد.</div>;

  return (
    <ClinicProfile 
      clinic={clinic} 
      onBack={() => navigate('/search')} 
      onBookService={() => {}} 
    />
  );
};

export default ClinicDetail;
