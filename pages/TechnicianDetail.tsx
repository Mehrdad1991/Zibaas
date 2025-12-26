
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_TECHNICIANS } from '../constants.tsx';
import TechnicianProfile from '../components/TechnicianProfile.tsx';

const TechnicianDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tech = MOCK_TECHNICIANS.find(t => t.id === id);

  if (!tech) return <div className="p-20 text-center font-black">متخصص یافت نشد.</div>;

  return (
    <TechnicianProfile 
      technician={tech} 
      onBack={() => navigate('/search')} 
      onBookService={() => {}} 
    />
  );
};

export default TechnicianDetail;
