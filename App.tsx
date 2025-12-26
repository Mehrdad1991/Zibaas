
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_SERVICES, MOCK_CLINICS, MOCK_TECHNICIANS } from './constants';
import AIChatbot from './components/AIChatbot';
import BeforeAfterAnalysis from './components/BeforeAfterAnalysis';
import ClinicProfile from './components/ClinicProfile';
import RoomRental from './components/RoomRental';
import RoomDetail from './components/RoomDetail';
import TechnicianJoin from './components/TechnicianJoin';
import TechnicianProfile from './components/TechnicianProfile';
import TechnicianDirectory from './components/TechnicianDirectory';
import SurgicalBooking from './components/SurgicalBooking';
import UnifiedBooking from './components/UnifiedBooking';
import Breadcrumbs from './components/Breadcrumbs';
import ServiceBookingModal from './components/ServiceBookingModal';
import Store from './components/Store';
import MobileNav from './components/MobileNav';
import Auth from './components/Auth';
import RoleOnboarding from './components/RoleOnboarding';
import CustomerPanel from './components/panels/CustomerPanel';
import TechnicianPanel from './components/panels/TechnicianPanel';
import ClinicPanel from './components/panels/ClinicPanel';
import AdminPanel from './components/panels/AdminPanel';
import { Clinic, Service, Room, Technician, UserRole, Product, CartItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'booking' | 'analysis' | 'dashboard' | 'clinic' | 'rental' | 'room-detail' | 'tech-join' | 'tech-directory' | 'tech-profile' | 'surgery' | 'store'>('home');
  const [user, setUser] = useState<{ phone: string; role: UserRole | null } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [serviceToBook, setServiceToBook] = useState<Service | null>(null);
  const [providerToBook, setProviderToBook] = useState<Clinic | Technician | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const handleLogin = (phone: string) => {
    const isNewUser = true; 
    if (isNewUser) {
      setUser({ phone, role: null }); 
    } else {
      setUser({ phone, role: UserRole.CUSTOMER });
    }
    setShowAuth(false);
  };

  const handleSelectRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
      setActiveTab('dashboard');
    }
  };

  const renderHome = () => (
    <div className="bg-gray-50 pb-32 overflow-x-hidden">
      {/* 1. Quick Access (Circles) */}
      <div className="bg-white px-2 py-6 md:py-10 border-b border-gray-100 mb-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex gap-6 md:gap-12 justify-start lg:justify-center px-4">
          {[
            { id: 'booking', label: 'خدمات زیبایی', img: 'https://cdn-icons-png.flaticon.com/512/3104/3104631.png' },
            { id: 'surgery', label: 'اتاق عمل', img: 'https://cdn-icons-png.flaticon.com/512/2966/2966486.png' },
            { id: 'analysis', label: 'آنالیز AI', img: 'https://cdn-icons-png.flaticon.com/512/2103/2103533.png' },
            { id: 'store', label: 'فروشگاه کالا', img: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png' },
            { id: 'rental', label: 'اجاره فضا', img: 'https://cdn-icons-png.flaticon.com/512/2590/2590516.png' },
            { id: 'tech-directory', label: 'متخصصین', img: 'https://cdn-icons-png.flaticon.com/512/912/912318.png' },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id as any)} className="flex flex-col items-center gap-3 shrink-0 group">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center p-4 shadow-sm border border-gray-50 group-hover:border-pink-500 group-hover:bg-white group-hover:shadow-lg transition-all">
                <img src={item.img} className="w-full h-full object-contain" alt={item.label} />
              </div>
              <span className="text-[10px] md:text-sm font-black text-gray-700 whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 my-4">
        <div className="relative rounded-[32px] overflow-hidden aspect-[16/9] md:aspect-[16/4] bg-gray-900 shadow-2xl group">
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent flex flex-col justify-center items-end px-8 md:px-24 text-white text-right">
            <div className="bg-pink-600 px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase mb-4 animate-pulse">Zibaas Premium</div>
            <h1 className="text-2xl md:text-6xl font-black tracking-tighter leading-tight mb-6 drop-shadow-2xl">زیبایی هوشمند، <br/>انتخابی تخصصی</h1>
            <button onClick={() => setActiveTab('analysis')} className="bg-white text-pink-600 px-8 py-3 md:py-4 rounded-2xl text-xs md:text-lg font-black hover:bg-pink-600 hover:text-white transition-all shadow-2xl transform hover:-translate-y-1">شروع آنالیز رایگان چهره</button>
          </div>
        </div>
      </div>

      {/* 3. Amazing Offers (Refined High-Density Layout) */}
      <div className="max-w-7xl mx-auto px-0 md:px-4 mb-12">
        <div className="bg-pink-600 md:rounded-[40px] p-5 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-52 flex md:flex-col items-center justify-between md:justify-center gap-4 text-center shrink-0">
             <div className="text-right space-y-1">
                <h3 className="text-white text-2xl md:text-3xl font-black leading-none italic">شگفت‌انگیز</h3>
                <p className="text-pink-100 text-[10px] md:text-sm font-bold opacity-80">فقط برای امروز</p>
             </div>
             <img src="https://cdn-icons-png.flaticon.com/512/4213/4213943.png" className="hidden md:block w-24 h-24 invert opacity-30 animate-bounce-slow" />
             <div className="flex gap-2 text-white text-xs font-black bg-black/20 px-4 py-2 rounded-2xl backdrop-blur-md">
                <span>{toPersianDigits('۱۲')}</span>:<span>{toPersianDigits('۴۵')}</span>:<span>{toPersianDigits('۰۸')}</span>
             </div>
          </div>
          
          <div className="w-full flex gap-4 overflow-x-auto no-scrollbar pb-4 px-2">
            {MOCK_SERVICES.map(service => (
              <div 
                key={service.id} 
                className="min-w-[150px] md:min-w-[200px] bg-white rounded-[28px] p-3 md:p-4 flex flex-col gap-3 hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => setActiveTab('booking')}
              >
                <div className="aspect-square rounded-[20px] overflow-hidden bg-gray-50">
                   <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <h4 className="text-[11px] md:text-sm font-black text-gray-800 line-clamp-1 text-right px-1">{service.name}</h4>
                <div className="flex justify-between items-center mt-auto px-1">
                   <span className="bg-red-500 text-white text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-lg">۲۰٪-</span>
                   <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <span className="text-sm md:text-lg font-black text-gray-900">{toPersianDigits((service.price * 0.8).toLocaleString())}</span>
                        <span className="text-[9px] text-gray-400 font-bold">تومان</span>
                      </div>
                      <span className="text-[10px] text-gray-300 line-through opacity-60">{toPersianDigits(service.price.toLocaleString())}</span>
                   </div>
                </div>
              </div>
            ))}
            <div className="min-w-[120px] rounded-[28px] bg-white/10 flex flex-col items-center justify-center border-2 border-dashed border-white/40 text-white cursor-pointer hover:bg-white/20 transition-all">
               <span className="text-2xl font-black mb-2">←</span>
               <span className="text-[11px] font-black">مشاهده همه</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Promotional Banners (2-Column) */}
      <div className="max-w-7xl mx-auto px-4 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-32 md:h-52 rounded-[32px] bg-gradient-to-br from-indigo-600 to-blue-700 p-6 md:p-10 flex items-center justify-between text-white shadow-xl cursor-pointer hover:scale-[1.02] transition-all overflow-hidden relative">
           <div className="relative z-10 space-y-2 md:space-y-4">
              <h4 className="text-xl md:text-3xl font-black">رزرو آنی اتاق عمل</h4>
              <p className="text-[10px] md:text-sm font-medium opacity-80">ویژه جراحان و تکنسین‌های فریلنسر</p>
              <button onClick={() => setActiveTab('surgery')} className="bg-white text-blue-700 px-5 py-2 rounded-xl text-[10px] md:text-xs font-black">اطلاعات بیشتر</button>
           </div>
           <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" className="w-24 md:w-40 invert opacity-20 absolute -left-4 -bottom-4 rotate-12" />
        </div>
        <div className="h-32 md:h-52 rounded-[32px] bg-gradient-to-br from-pink-600 to-rose-700 p-6 md:p-10 flex items-center justify-between text-white shadow-xl cursor-pointer hover:scale-[1.02] transition-all overflow-hidden relative">
           <div className="relative z-10 space-y-2 md:space-y-4">
              <h4 className="text-xl md:text-3xl font-black">فروشگاه تجهیزات زیباست</h4>
              <p className="text-[10px] md:text-sm font-medium opacity-80">خرید نقد و اقساط انواع دستگاه‌ها</p>
              <button onClick={() => setActiveTab('store')} className="bg-white text-pink-700 px-5 py-2 rounded-xl text-[10px] md:text-xs font-black">ورود به فروشگاه</button>
           </div>
           <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" className="w-24 md:w-40 invert opacity-20 absolute -left-4 -bottom-4 -rotate-12" />
        </div>
      </div>

      {/* 5. Trust Indicators */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-[32px] border border-gray-100 p-6 md:p-10 grid grid-cols-3 gap-4 md:gap-10">
           {[
             { t: 'پزشکان برتر', d: 'تایید شده و مجرب', i: '👨‍⚕️' },
             { t: 'پرداخت امن', d: 'گارانتی بازگشت وجه', i: '🛡️' },
             { t: 'پشتیبانی AI', d: 'پاسخگویی ۲۴ ساعته', i: '🤖' }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center space-y-2 md:space-y-4">
                <div className="text-3xl md:text-5xl">{item.i}</div>
                <div className="space-y-1">
                  <h5 className="text-[11px] md:text-lg font-black text-gray-900">{item.t}</h5>
                  <p className="text-[8px] md:text-xs text-gray-400 font-bold">{item.d}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* 6. Top Clinics Grid (High Density) */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex justify-between items-end px-1">
           <div className="space-y-1">
              <h3 className="text-xl md:text-3xl font-black text-gray-900 border-r-4 border-pink-600 pr-4">برترین کلینیک‌های جراحی</h3>
              <p className="text-[10px] md:text-sm text-gray-400 font-bold pr-5">پیشنهاد شده توسط دستیار هوشمند زیباست</p>
           </div>
           <button onClick={() => setActiveTab('booking')} className="text-pink-600 text-xs md:text-sm font-black border-b-2 border-pink-100 pb-1">مشاهده همه</button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {MOCK_CLINICS.map(clinic => (
            <div 
              key={clinic.id} 
              onClick={() => { setSelectedClinic(clinic); setActiveTab('clinic'); window.scrollTo(0,0); }}
              className="bg-white border border-gray-100 rounded-[28px] md:rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={clinic.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={clinic.name} />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2 py-1 rounded-xl text-[10px] font-black text-amber-500 flex items-center gap-1 shadow-md">
                   <span>{toPersianDigits(clinic.rating)}</span>
                   <span>★</span>
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col gap-2 text-right">
                <h4 className="text-[12px] md:text-xl font-black text-gray-900 line-clamp-1">{clinic.name}</h4>
                <div className="flex items-center gap-1 justify-end text-[10px] md:text-sm text-gray-400 font-bold">
                   <span>{clinic.location}</span>
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                   </svg>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                   <span className="text-[10px] md:text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-lg">رزرو فوری</span>
                   <div className="flex -space-x-2 rtl:space-x-reverse">
                      {clinic.staff.slice(0, 2).map(s => (
                        <img key={s.id} src={s.image} className="w-6 h-6 md:w-10 md:h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (!user?.role) return <RoleOnboarding onSelectRole={handleSelectRole} />;
    
    switch (user.role) {
      case UserRole.CUSTOMER: return <CustomerPanel />;
      case UserRole.TECHNICIAN: return <TechnicianPanel />;
      case UserRole.CLINIC_ADMIN: return <ClinicPanel />;
      case UserRole.SELLER: return <div className="p-20 text-center font-black">بخش مدیریت فروشنده (به زودی)</div>;
      case UserRole.SUPER_ADMIN: return <AdminPanel />;
      default: return <CustomerPanel />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-600">
      <nav className="bg-white/95 backdrop-blur-xl sticky top-0 z-[60] border-b border-gray-100 h-16 md:h-20 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          {user ? (
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 hover:bg-pink-50 transition-all order-last md:order-first"
            >
               <span className="text-xs font-black text-gray-700 hidden sm:inline">{toPersianDigits(user.phone)}</span>
               <div className="w-8 h-8 bg-pink-600 text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg shadow-pink-100">
                  {user.role ? user.role[0] : '?'}
               </div>
            </button>
          ) : (
            <button 
              onClick={() => setShowAuth(true)}
              className="bg-gray-100 text-gray-900 px-5 md:px-8 py-2 md:py-2.5 rounded-2xl font-black text-[10px] md:text-sm hover:bg-pink-600 hover:text-white transition-all order-last md:order-first"
            >
              ورود | ثبت‌نام
            </button>
          )}
          
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-10 items-center">
              {[
                { id: 'home', label: 'خانه' },
                { id: 'booking', label: 'رزرو خدمات' },
                { id: 'store', label: 'فروشگاه' },
                { id: 'surgery', label: 'اتاق عمل' },
                { id: 'rental', label: 'اجاره فضا' }
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id as any)} 
                  className={`text-sm font-black transition-all relative group ${activeTab === item.id ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}`}
                >
                  {item.label}
                  {activeTab === item.id && <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-600 rounded-full"></span>}
                </button>
              ))}
            </div>
            <div className="text-2xl md:text-4xl font-black text-pink-600 cursor-pointer flex items-center gap-3" onClick={() => setActiveTab('home')}>
               <span className="hidden md:inline tracking-tighter italic">Zibaas</span>
               <div className="w-10 h-10 md:w-14 md:h-14 bg-pink-600 text-white rounded-[16px] md:rounded-[20px] flex items-center justify-center text-xl md:text-3xl font-black shadow-2xl shadow-pink-200">Z</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {activeTab === 'home' ? renderHome() : (
          <div className="max-w-7xl mx-auto w-full px-4 mb-24">
            <Breadcrumbs activeTab={activeTab} selectedClinic={selectedClinic} selectedRoom={selectedRoom} selectedTech={selectedTech} onNavigate={setActiveTab} />
            {activeTab === 'booking' && <UnifiedBooking onSelectClinic={c => { setSelectedClinic(c); setActiveTab('clinic'); }} onSelectTech={setSelectedTech} />}
            {activeTab === 'store' && <Store cart={cart} onAddToCart={handleAddToCart} onUpdateQuantity={updateCartQuantity} />}
            {activeTab === 'surgery' && <SurgicalBooking />}
            {activeTab === 'rental' && <RoomRental onViewRoomDetail={setSelectedRoom} userRole={user?.role || UserRole.CUSTOMER} isVerified={true} />}
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'clinic' && selectedClinic && <ClinicProfile clinic={selectedClinic} onBack={() => setActiveTab('booking')} onBookService={s => { setServiceToBook(s); setProviderToBook(selectedClinic); setIsBookingModalOpen(true); }} />}
            {activeTab === 'tech-profile' && selectedTech && <TechnicianProfile technician={selectedTech} onBack={() => setActiveTab('booking')} onBookService={s => { setServiceToBook(s); setProviderToBook(selectedTech); setIsBookingModalOpen(true); }} />}
            {activeTab === 'analysis' && <BeforeAfterAnalysis />}
          </div>
        )}
      </main>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} />

      {showAuth && <Auth onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
      {isBookingModalOpen && serviceToBook && providerToBook && (
        <ServiceBookingModal service={serviceToBook} provider={providerToBook} onClose={() => setIsBookingModalOpen(false)} onConfirm={() => setIsBookingModalOpen(false)} />
      )}
      <AIChatbot />
    </div>
  );
};

export default App;
