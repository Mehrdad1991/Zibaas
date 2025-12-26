
import React, { useState, useEffect } from 'react';
import { ROUTES, RoutePath } from './routes';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import BookingLayout from './Booking/BookingLayout';
import Auth from './components/Auth';
import LiveAdvisor from './components/LiveAdvisor';
import AIChatbot from './components/AIChatbot';
import Breadcrumbs from './components/Breadcrumbs';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import Confirmation from './Booking/steps/Confirmation';
import { Clinic, Service, Technician, CartItem, Product } from './types';
import { Role, AuthState, loadAuth, saveAuth } from './store/roles';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RoutePath>('home');
  const [authState, setAuthState] = useState<AuthState>(loadAuth());
  const [showAuth, setShowAuth] = useState(false);
  const [showLiveAdvisor, setShowLiveAdvisor] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
    saveAuth(authState);
  }, [authState]);

  const handleLogin = (phone: string) => {
    setAuthState(prev => ({
      ...prev,
      phone: phone,
      userId: 'u-' + Math.random().toString(36).substr(2, 9),
      token: 'sk_' + Math.random().toString(36).substr(2, 20),
      role: prev.role || Role.User
    }));
    setShowAuth(false);
  };

  const handleSelectRole = (role: Role) => {
    setAuthState(prev => ({ ...prev, role }));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setAuthState({ role: null, userId: null, phone: null, token: null });
    setActiveTab('home');
  };

  const handleBookService = (s: Service) => {
    if (!authState.userId) {
      setShowAuth(true);
      return;
    }
    setPreSelectedService(s);
    setBookingStep(1);
    setActiveTab('booking');
  };

  const currentRoute = ROUTES[activeTab] || ROUTES['home'];
  const PageComponent = currentRoute?.component || (() => null);

  const pageProps = {
    onTabChange: setActiveTab,
    user: authState,
    onSelectClinic: (c: Clinic) => { setSelectedClinic(c); setActiveTab('clinic'); },
    onSelectTech: (t: Technician) => { setSelectedTech(t); setActiveTab('tech-profile'); },
    onShowLiveAdvisor: () => setShowLiveAdvisor(true),
    selectedClinic,
    selectedTech,
    selectedRoom,
    preSelectedService,
    onViewRoomDetail: (r: any, c: any) => { setSelectedRoom(r); setSelectedClinic(c); setActiveTab('rental'); },
    cart,
    onAddToCart: (product: Product) => {
        setCart(prev => {
          const existing = prev.find(item => item.product.id === product.id);
          if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
          return [...prev, { product, quantity: 1 }];
        });
    },
    onUpdateQuantity: (productId: string, delta: number) => {
        setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
    },
    onBookService: handleBookService,
    onLogin: handleLogin,
    onSelectRole: handleSelectRole,
    bookingStep,
    setBookingStep,
    userRole: authState.role,
    onViewProduct: (p: Product) => { setSelectedProduct(p); setActiveTab('product-detail'); },
    onGoToCheckout: () => {
      if (!authState.userId) {
        setShowAuth(true);
      } else {
        setActiveTab('checkout');
      }
    }
  };

  const content = (
    <div className="w-full">
      {currentRoute?.layout === 'main' && activeTab !== 'home' && (
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs activeTab={activeTab} selectedClinic={selectedClinic} selectedRoom={selectedRoom} selectedTech={selectedTech} onNavigate={setActiveTab} />
        </div>
      )}
      
      {activeTab === 'product-detail' && selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setActiveTab('store')} 
          onAddToCart={pageProps.onAddToCart}
          onBookService={handleBookService}
        />
      ) : activeTab === 'checkout' ? (
        <Checkout cart={cart} onBack={() => setActiveTab('cart')} onSuccess={() => setActiveTab('order-success')} />
      ) : activeTab === 'order-success' ? (
        <Confirmation onFinish={() => { setActiveTab('dashboard'); setCart([]); }} />
      ) : (
        <PageComponent {...pageProps} />
      )}
    </div>
  );

  if (activeTab === 'booking') {
    return (
      <BookingLayout currentStep={bookingStep} onCancel={() => setActiveTab('home')}>
        <PageComponent {...pageProps} />
      </BookingLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-vazir bg-[#FAFBFF]">
      {currentRoute?.layout === 'main' ? (
        <MainLayout 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
          user={authState} 
          onAuthOpen={() => setShowAuth(true)}
        >
          {content}
        </MainLayout>
      ) : currentRoute?.layout === 'dashboard' ? (
        <DashboardLayout 
          user={authState} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onLogout={handleLogout}
          onSelectRole={handleSelectRole}
        >
          {content}
        </DashboardLayout>
      ) : (
        content
      )}

      {showAuth && <Auth onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
      {showLiveAdvisor && <LiveAdvisor onClose={() => setShowLiveAdvisor(false)} />}
      <AIChatbot />
    </div>
  );
};

export default App;
