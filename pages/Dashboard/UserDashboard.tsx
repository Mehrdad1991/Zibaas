
import React from 'react';
import CustomerPanel from '../../components/panels/CustomerPanel.tsx';

const UserDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-8 text-right">
        <div>
          <h1 className="text-3xl font-black text-gray-900">سلام، علی عزیز</h1>
          <p className="text-gray-400 mt-1 font-medium">به پنل مدیریت خود خوش آمدید.</p>
        </div>
        <div className="hidden md:block">
           <span className="text-xs font-bold text-gray-400 bg-gray-100 px-4 py-2 rounded-full">امروز: ۲۰ آبان ۱۴۰۲</span>
        </div>
      </div>
      <CustomerPanel />
    </div>
  );
};

export default UserDashboard;
