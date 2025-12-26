
import React from 'react';
import Auth from '../../components/Auth.tsx';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Auth onClose={() => navigate('/')} onLogin={(phone) => navigate('/dashboard')} />
    </div>
  );
};

export default Login;
