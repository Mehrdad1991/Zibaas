
import React from 'react';
import ClinicPanel from '../../components/panels/ClinicPanel.tsx';

const ClinicDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 text-right">
      <h2 className="text-3xl font-black text-gray-900 mb-8">مدیریت کلینیک</h2>
      <ClinicPanel />
    </div>
  );
};

export default ClinicDashboard;
