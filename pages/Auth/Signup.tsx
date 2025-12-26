
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoleOnboarding from '../../components/RoleOnboarding.tsx';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <RoleOnboarding onSelectRole={(role) => navigate('/dashboard')} />
    </div>
  );
};

export default Signup;
