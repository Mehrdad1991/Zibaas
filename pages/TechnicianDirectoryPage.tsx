
import React from 'react';
import TechnicianDirectory from '../components/TechnicianDirectory';

const TechnicianDirectoryPage: React.FC<any> = ({ onSelectTech }) => {
  return <TechnicianDirectory onSelectTechnician={onSelectTech} />;
};

export default TechnicianDirectoryPage;
