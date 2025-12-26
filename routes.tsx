
import React from 'react';
import Home from './layouts/Home';
import SearchResults from './pages/SearchResults';
import ClinicProfilePage from './pages/ClinicProfilePage';
import TechnicianProfilePage from './pages/TechnicianProfilePage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import StorePage from './pages/StorePage';
import SurgeryPage from './pages/SurgeryPage';
import RentalPage from './pages/RentalPage';
import AnalysisPage from './pages/AnalysisPage';
import TechnicianDirectoryPage from './pages/TechnicianDirectoryPage';
import TechnicianJoinPage from './pages/TechnicianJoinPage';
import CartPage from './pages/CartPage';

export type RoutePath = 
  | 'home' 
  | 'search' 
  | 'clinic' 
  | 'tech-profile' 
  | 'booking' 
  | 'dashboard' 
  | 'auth' 
  | 'store' 
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'surgery' 
  | 'rental' 
  | 'analysis'
  | 'tech-directory'
  | 'tech-join';

export interface RouteConfig {
  path: RoutePath;
  component: React.FC<any>;
  layout: 'main' | 'dashboard' | 'none';
}

export const ROUTES: Record<RoutePath, RouteConfig> = {
  home: { path: 'home', component: Home, layout: 'main' },
  search: { path: 'search', component: SearchResults, layout: 'main' },
  clinic: { path: 'clinic', component: ClinicProfilePage, layout: 'main' },
  'tech-profile': { path: 'tech-profile', component: TechnicianProfilePage, layout: 'main' },
  booking: { path: 'booking', component: BookingPage, layout: 'main' },
  dashboard: { path: 'dashboard', component: DashboardPage, layout: 'dashboard' },
  auth: { path: 'auth', component: AuthPage, layout: 'none' },
  store: { path: 'store', component: StorePage, layout: 'main' },
  cart: { path: 'cart', component: CartPage, layout: 'main' },
  'product-detail': { path: 'product-detail', component: () => null, layout: 'main' },
  'checkout': { path: 'checkout', component: () => null, layout: 'main' },
  'order-success': { path: 'order-success', component: () => null, layout: 'main' },
  surgery: { path: 'surgery', component: SurgeryPage, layout: 'main' },
  rental: { path: 'rental', component: RentalPage, layout: 'main' },
  analysis: { path: 'analysis', component: AnalysisPage, layout: 'main' },
  'tech-directory': { path: 'tech-directory', component: TechnicianDirectoryPage, layout: 'main' },
  'tech-join': { path: 'tech-join', component: TechnicianJoinPage, layout: 'main' },
};
