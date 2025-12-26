
import React from 'react';
import Auth from '../components/Auth';

const AuthPage: React.FC<any> = ({ onLogin, onTabChange }) => {
  return <Auth onClose={() => onTabChange('home')} onLogin={onLogin} />;
};

export default AuthPage;
