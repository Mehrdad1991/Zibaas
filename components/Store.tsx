
import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';
import { Role } from '../store/roles';

interface StoreProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  userRole: Role | null;
  onViewProduct: (product: Product) => void;
  onGoToCheckout: () => void;
  onNavigate: (tab: any) => void;
}

const Store: React.FC<StoreProps> = ({ 
  cart, 
  onAddToCart, 
  onUpdateQuantity, 
  userRole,
  onViewProduct,
  onGoToCheckout,
  onNavigate
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const all = [
      { id: 'ALL', label: 'همه محصولات', icon: '🛍️' },
      { id: 'SKINCARE', label: 'مراقبت پوست', icon: '🧴' },
      { id: 'AFTERCARE', label: 'مراقبت بعد عمل', icon: '🩹' },
    ];
    
    // Professionals see more categories
    if (userRole === Role.Clinic || userRole === Role.Technician || userRole === Role.Admin) {
      all.push(
        { id: 'EQUIPMENT', label: 'تجهیزات پزشکی', icon: '⚡' },
        { id: 'CONSUMABLE', label: 'مواد مصرفی', icon: '🧪' },
        { id: 'FURNITURE', label: 'تجهیزات کلینیک', icon: '🛋️' }
      );
    }
    return all;
  }, [userRole]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const isProfessional = userRole === Role.Clinic || userRole === Role.Technician || userRole === Role.Admin;
      const canSee = isProfessional || p.category === 'SKINCARE' || p.category === 'AFTERCARE';
      
      const catMatch = activeCategory === 'ALL' || p.category === activeCategory;
      const searchMatch = p.name.includes(searchQuery) || p.brand.includes(searchQuery);
      
      return canSee && catMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, userRole]);

  const toPersianDigits = (n: number | string) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="bg-[#FAFBFF] min-h-screen">
      {/* Premium Store Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 md:top-24 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 w-full md:w-auto order-2 md:order-1">
             <div className="relative flex-1 md:w-[450px]">
                <input 
                  type="text" 
                  placeholder="جستجو در برندها و محصولات Zibaas..." 
                  className="w-full bg-slate-50 border-none rounded-3xl pr-14 pl-8 py-5 font-black text-sm focus:ring-2 focus:ring-pink-500 text-right shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg className="h-6 w-6 absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <button 
               onClick={() => onNavigate('cart')}
               className="relative p-5 bg-slate-900 text-white rounded-3xl shadow-2xl hover:bg-pink-600 transition-all group active:scale-95"
             >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-black w-7 h-7 rounded-xl flex items-center justify-center border-4 border-white animate-bounce">
                    {toPersianDigits(cartCount)}
                  </span>
                )}
             </button>
          </div>
          
          <div className="text-right order-1 md:order-2 space-y-1">
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">بازار تخصصی زیباست</h1>
             <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] opacity-60">Professional Medical Ecosystem</p>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="max-w-7xl mx-auto px-6 pb-8 overflow-x-auto no-scrollbar">
           <div className="flex gap-4 min-w-max justify-end">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-[22px] font-black text-xs transition-all ${
                    activeCategory === cat.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-white rounded-[50px] p-5 md:p-8 shadow-sm border border-slate-100 hover:shadow-4xl transition-all duration-700 group flex flex-col h-full cursor-pointer relative overflow-hidden"
              onClick={() => onViewProduct(product)}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[50px] -z-10 group-hover:bg-pink-50 transition-colors"></div>
              
              <div className="aspect-square rounded-[40px] overflow-hidden bg-slate-50 mb-8 relative p-4 flex items-center justify-center">
                <img src={product.image} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                <div className="absolute top-6 left-6">
                   <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest shadow-sm">{product.brand}</span>
                </div>
              </div>
              
              <div className="flex-1 text-right space-y-4">
                <h5 className="font-black text-slate-900 text-lg md:text-xl leading-tight line-clamp-2">{product.name}</h5>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5">
                      <span className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">{toPersianDigits(product.price.toLocaleString())}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Toman</span>
                   </div>
                </div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-full mt-8 py-5 bg-slate-50 text-slate-900 rounded-[28px] font-black text-xs hover:bg-pink-600 hover:text-white transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3"
              >
                <span>افزودن به سبد</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
