
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../components/Auth.tsx';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Auth 
          onClose={() => navigate('/')} 
          onLogin={(phone) => navigate('/dashboard')} 
        />
      </div>
    </div>
  );
};

export default Login;
