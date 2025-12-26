
import React from 'react';
import TechnicianPanel from '../../components/panels/TechnicianPanel.tsx';

const TechnicianDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 text-right">
      <h2 className="text-3xl font-black text-gray-900 mb-8">پنل تخصصی</h2>
      <TechnicianPanel />
    </div>
  );
};

export default TechnicianDashboard;
