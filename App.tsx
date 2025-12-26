
import React, { useState } from 'react';
import { ROUTES, RoutePath } from './routes';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import BookingLayout from './Booking/BookingLayout';
import Auth from './components/Auth';
import LiveAdvisor from './components/LiveAdvisor';
import AIChatbot from './components/AIChatbot';
import Breadcrumbs from './components/Breadcrumbs';
import { Clinic, Service, Technician, UserRole, CartItem, Product } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RoutePath>('home');
  const [user, setUser] = useState<{ phone: string; role: UserRole | null } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showLiveAdvisor, setShowLiveAdvisor] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);

  // Booking Step State
  const [bookingStep, setBookingStep] = useState(1);

  const route = ROUTES[activeTab] || ROUTES['home'];
  const PageComponent = route.component;

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
  };

  const handleSelectTech = (t: Technician) => {
    setSelectedTech(t);
    setActiveTab('tech-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectClinic = (c: Clinic) => {
    setSelectedClinic(c);
    setActiveTab('clinic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  const handleBookService = () => {
    setBookingStep(1);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageProps = {
    onTabChange: setActiveTab,
    user: user,
    onSelectClinic: handleSelectClinic,
    onSelectTech: handleSelectTech,
    onShowLiveAdvisor: () => setShowLiveAdvisor(true),
    selectedClinic: selectedClinic,
    selectedTech: selectedTech,
    selectedRoom: selectedRoom,
    onViewRoomDetail: (r: any, c: any) => { setSelectedRoom(r); setSelectedClinic(c); setActiveTab('rental'); },
    cart: cart,
    onAddToCart: handleAddToCart,
    onUpdateQuantity: updateCartQuantity,
    onBookService: handleBookService,
    onLogin: (phone: string) => { setUser({ phone, role: null }); setShowAuth(false); },
    onSelectRole: (role: UserRole) => { if (user) { setUser({ ...user, role }); setActiveTab('dashboard'); } },
    bookingStep,
    setBookingStep
  };

  const pageContent = (
    <div className={activeTab === 'home' ? '' : 'w-full'}>
      {route.layout === 'main' && activeTab !== 'home' && (
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs 
            activeTab={activeTab} 
            selectedClinic={selectedClinic} 
            selectedRoom={selectedRoom} 
            selectedTech={selectedTech} 
            onNavigate={setActiveTab} 
          />
        </div>
      )}
      <PageComponent {...pageProps} />
    </div>
  );

  // Render Logic
  if (activeTab === 'booking') {
    return (
      <BookingLayout currentStep={bookingStep} onCancel={() => { setActiveTab('home'); setBookingStep(1); }}>
        {pageContent}
      </BookingLayout>
    );
  }

  return (
    <div className="min-h-screen">
      {route.layout === 'main' ? (
        <MainLayout 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
          user={user}
          onAuthOpen={() => setShowAuth(true)}
        >
          {pageContent}
        </MainLayout>
      ) : route.layout === 'dashboard' ? (
        <DashboardLayout 
          user={user} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout}
        >
          {pageContent}
        </DashboardLayout>
      ) : (
        pageContent
      )}

      {showAuth && <Auth onClose={() => setShowAuth(false)} onLogin={pageProps.onLogin} />}
      {showLiveAdvisor && <LiveAdvisor onClose={() => setShowLiveAdvisor(false)} />}
      <AIChatbot />
    </div>
  );
};

export default App;
