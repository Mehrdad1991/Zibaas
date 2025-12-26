
import React from 'react';
import CustomerPanel from '../../components/panels/CustomerPanel.tsx';

const UserDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-gray-900 mb-8 text-right">میز کار من</h2>
      <CustomerPanel />
    </div>
  );
};

export default UserDashboard;
