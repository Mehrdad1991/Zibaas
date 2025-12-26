
import React from 'react';
import { Clinic, Room, Technician } from '../types';

interface BreadcrumbsProps {
  activeTab: string;
  selectedClinic?: Clinic | null;
  selectedRoom?: Room | null;
  selectedTech?: Technician | null;
  onNavigate: (tab: any) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  activeTab, 
  selectedClinic, 
  selectedRoom, 
  selectedTech, 
  onNavigate 
}) => {
  if (activeTab === 'home') return null;

  const crumbs = [{ label: 'خانه', tab: 'home' }];

  if (activeTab === 'booking') {
    crumbs.push({ label: 'رزرو خدمات', tab: 'booking' });
  } else if (activeTab === 'clinic') {
    crumbs.push({ label: 'رزرو خدمات', tab: 'booking' });
    crumbs.push({ label: selectedClinic?.name || 'کلینیک', tab: 'clinic' });
  } else if (activeTab === 'surgery') {
    crumbs.push({ label: 'رزرواسیون اتاق عمل', tab: 'surgery' });
  } else if (activeTab === 'store') {
    crumbs.push({ label: 'فروشگاه تجهیزات', tab: 'store' });
  } else if (activeTab === 'rental') {
    crumbs.push({ label: 'اجاره فضا', tab: 'rental' });
  } else if (activeTab === 'room-detail') {
    crumbs.push({ label: 'اجاره فضا', tab: 'rental' });
    crumbs.push({ label: selectedClinic?.name || 'کلینیک', tab: 'rental' });
    crumbs.push({ label: selectedRoom?.name || 'جزئیات اتاق', tab: 'room-detail' });
  } else if (activeTab === 'analysis') {
    crumbs.push({ label: 'آنالیز چهره (AI)', tab: 'analysis' });
  } else if (activeTab === 'dashboard') {
    crumbs.push({ label: 'پنل کاربری', tab: 'dashboard' });
  } else if (activeTab === 'tech-directory') {
    crumbs.push({ label: 'رزرو خدمات', tab: 'booking' });
    crumbs.push({ label: 'بانک متخصصین', tab: 'tech-directory' });
  } else if (activeTab === 'tech-profile') {
    crumbs.push({ label: 'رزرو خدمات', tab: 'booking' });
    crumbs.push({ label: 'متخصصین', tab: 'tech-directory' });
    crumbs.push({ label: selectedTech?.name || 'پروفایل متخصص', tab: 'tech-profile' });
  } else if (activeTab === 'tech-join') {
    crumbs.push({ label: 'همکاری با ما', tab: 'tech-join' });
  }

  return (
    <nav className="flex py-4 mb-4 overflow-x-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-500">
      <ol className="flex items-center space-x-2 rtl:space-x-reverse whitespace-nowrap">
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && (
              <svg 
                className="h-4 w-4 text-gray-300 mx-2 rotate-180" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            )}
            <button
              onClick={() => onNavigate(crumb.tab)}
              className={`text-xs font-black transition-colors ${
                index === crumbs.length - 1 
                  ? 'text-pink-600 cursor-default' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
              disabled={index === crumbs.length - 1}
            >
              {crumb.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
