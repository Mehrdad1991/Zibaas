
import React from 'react';
import RoleOnboarding from '../../components/RoleOnboarding.tsx';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <RoleOnboarding onSelectRole={(role) => navigate('/dashboard')} />
    </div>
  );
};

export default Signup;
