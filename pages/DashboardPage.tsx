
import React from 'react';
import RoleOnboarding from '../components/RoleOnboarding';
import CustomerPanel from '../components/panels/CustomerPanel';
import TechnicianPanel from '../components/panels/TechnicianPanel';
import ClinicPanel from '../components/panels/ClinicPanel';
import AdminPanel from '../components/panels/AdminPanel';
import { Role } from '../store/roles';

const DashboardPage: React.FC<any> = ({ user, onSelectRole }) => {
  // 1. Initial State: No User Logged In
  if (!user || !user.userId) return (
    <div className="py-20 text-center space-y-6">
       <div className="text-6xl grayscale">🔒</div>
       <h2 className="text-3xl font-black text-slate-900">دسترسی محدود شده است</h2>
       <p className="text-slate-500 font-bold">برای دسترسی به پنل کاربری ابتدا باید وارد حساب خود شوید.</p>
    </div>
  );

  // 2. State: Logged in but No Role Selected (First time Onboarding)
  if (!user.role) return <RoleOnboarding onSelectRole={onSelectRole} />;
  
  // 3. Dispatcher based on Role (The User's defined Role Enum)
  switch (user.role) {
    case Role.User: 
      return <CustomerPanel />;
    case Role.Technician: 
      return <TechnicianPanel />;
    case Role.Clinic: 
      return <ClinicPanel />;
    case Role.Admin:
      return <AdminPanel />;
    default: 
      return <CustomerPanel />;
  }
};

export default DashboardPage;
