
import React, { useState } from 'react';
import { ROUTES, RoutePath } from './routes';
import MainLayout from './layouts/MainLayout';
import Auth from './components/Auth';
import LiveAdvisor from './components/LiveAdvisor';
import AIChatbot from './components/AIChatbot';
import Breadcrumbs from './components/Breadcrumbs';
import ServiceBookingModal from './components/ServiceBookingModal';
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

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [serviceToBook, setServiceToBook] = useState<Service | null>(null);
  const [providerToBook, setProviderToBook] = useState<Clinic | Technician | null>(null);

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
  };

  const handleSelectClinic = (c: Clinic) => {
    setSelectedClinic(c);
    setActiveTab('clinic');
  };

  const content = (
    <div className={activeTab === 'home' ? '' : 'max-w-7xl mx-auto w-full px-4 mb-24'}>
      {activeTab !== 'home' && (
        <Breadcrumbs 
          activeTab={activeTab} 
          selectedClinic={selectedClinic} 
          selectedRoom={selectedRoom} 
          selectedTech={selectedTech} 
          onNavigate={setActiveTab} 
        />
      )}
      <PageComponent 
        onTabChange={setActiveTab}
        user={user}
        onSelectClinic={handleSelectClinic}
        onSelectTech={handleSelectTech}
        onShowLiveAdvisor={() => setShowLiveAdvisor(true)}
        selectedClinic={selectedClinic}
        selectedTech={selectedTech}
        selectedRoom={selectedRoom}
        onViewRoomDetail={(r: any, c: any) => { setSelectedRoom(r); setSelectedClinic(c); setActiveTab('rental'); }}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={updateCartQuantity}
        onBookService={(s: Service, p: Clinic | Technician) => { setServiceToBook(s); setProviderToBook(p); setIsBookingModalOpen(true); }}
        onLogin={(phone: string) => { setUser({ phone, role: null }); setShowAuth(false); }}
        onSelectRole={(role: UserRole) => { if (user) { setUser({ ...user, role }); setActiveTab('dashboard'); } }}
      />
    </div>
  );

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
          {content}
        </MainLayout>
      ) : route.layout === 'dashboard' ? (
        <div className="bg-gray-50 min-h-screen">
          <nav className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
             <button onClick={() => setActiveTab('home')} className="text-pink-600 font-black flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                بازگشت به سایت
             </button>
             <h1 className="font-black text-slate-800">پنل مدیریتی Zibaas</h1>
          </nav>
          <div className="max-w-7xl mx-auto px-4 py-8">
            {content}
          </div>
        </div>
      ) : content}

      {showAuth && <Auth onClose={() => setShowAuth(false)} onLogin={(phone) => { setUser({ phone, role: null }); setShowAuth(false); }} />}
      {showLiveAdvisor && <LiveAdvisor onClose={() => setShowLiveAdvisor(false)} />}
      {isBookingModalOpen && serviceToBook && providerToBook && (
        <ServiceBookingModal service={serviceToBook} provider={providerToBook} onClose={() => setIsBookingModalOpen(false)} onConfirm={() => setIsBookingModalOpen(false)} />
      )}
      <AIChatbot />
    </div>
  );
};

export default App;
