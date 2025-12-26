
import React from 'react';
import TechnicianJoin from '../components/TechnicianJoin';

const TechnicianJoinPage: React.FC<any> = ({ onTabChange }) => {
  return <TechnicianJoin onStart={() => onTabChange('auth')} />;
};

export default TechnicianJoinPage;
