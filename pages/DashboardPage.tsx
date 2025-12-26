
import React from 'react';
import RoleOnboarding from '../components/RoleOnboarding';
import CustomerPanel from '../components/panels/CustomerPanel';
import TechnicianPanel from '../components/panels/TechnicianPanel';
import ClinicPanel from '../components/panels/ClinicPanel';
import AdminPanel from '../components/panels/AdminPanel';
import { UserRole } from '../types';

const DashboardPage: React.FC<any> = ({ user, onSelectRole }) => {
  if (!user?.role) return <RoleOnboarding onSelectRole={onSelectRole} />;
  
  switch (user.role) {
    case UserRole.CUSTOMER: return <CustomerPanel />;
    case UserRole.TECHNICIAN: return <TechnicianPanel />;
    case UserRole.CLINIC_ADMIN: return <ClinicPanel />;
    case UserRole.SUPER_ADMIN: return <AdminPanel />;
    default: return <CustomerPanel />;
  }
};

export default DashboardPage;
